<?php

namespace NBH\Includes\Services;

use NBH\Includes\FluentCRMIntegration;

/**
 * Service for determining and managing FluentCRM tags and lists
 * 
 * This service analyzes orders/hospitals and determines which tags and lists
 * should be assigned to contacts, then delegates the actual attachment to ContactService.
 * 
 * Can be called from:
 * - Order hooks (real-time processing)
 * - Daily cron job (batch maintenance)
 */
class ListTagService
{
    private ContactService $contact_service;
    
    // Runtime cache for performance optimization during batch processing (per PHP process)
    private array $cache_hospital_list_ids = [];      // hospital_id => fluent_list_id
    private array $cache_hospital_names = [];         // hospital_id => hospital_name
    private array $cache_tag_names = [];              // tag_id => tag_name
    private array $cache_list_names = [];             // list_id => list_name
    private array $cache_year_tags = [];              // year => tag_id
    
    // Transient cache keys (persists between PHP processes - cron batches & AJAX requests)
    private const TRANSIENT_PREFIX = 'nbh_cache_';
    private const TRANSIENT_EXPIRY = 3600;  // 1 hour
    
    public function __construct(ContactService $contact_service)
    {
        $this->contact_service = $contact_service;
    }
    
    // ========================================
    // HYBRID CACHE METHODS (Runtime + Transients)
    // ========================================
    
    /**
     * Get hospital FluentCRM list ID with 2-layer cache
     * Layer 1: Runtime cache (fastest, resets per PHP process)
     * Layer 2: Transient cache (slower, persists between processes/batches)
     * 
     * @param int $hospital_id Hospital post ID
     * @return int|null FluentCRM list ID or null
     */
    private function get_hospital_list_id_cached($hospital_id)
    {
        // Layer 1: Runtime cache
        if (isset($this->cache_hospital_list_ids[$hospital_id])) {
            return $this->cache_hospital_list_ids[$hospital_id];
        }
        
        // Layer 2: Transient cache (persists between cron batches!)
        $transient_key = self::TRANSIENT_PREFIX . 'h_list_' . $hospital_id;
        $cached = get_transient($transient_key);
        
        if ($cached !== false) {
            $this->cache_hospital_list_ids[$hospital_id] = $cached;
            return $cached;
        }
        
        // Layer 3: Database query (slowest)
        $list_id = get_post_meta($hospital_id, FluentCRMIntegration::META_LIST_ID, true);
        $list_id = !empty($list_id) ? (int) $list_id : null;
        
        // Save to both caches
        $this->cache_hospital_list_ids[$hospital_id] = $list_id;
        set_transient($transient_key, $list_id, self::TRANSIENT_EXPIRY);
        
        return $list_id;
    }
    
    /**
     * Get hospital name with 2-layer cache
     * 
     * @param int $hospital_id Hospital post ID
     * @return string Hospital name
     */
    private function get_hospital_name_cached($hospital_id)
    {
        // Layer 1: Runtime cache
        if (isset($this->cache_hospital_names[$hospital_id])) {
            return $this->cache_hospital_names[$hospital_id];
        }
        
        // Layer 2: Transient cache
        $transient_key = self::TRANSIENT_PREFIX . 'h_name_' . $hospital_id;
        $cached = get_transient($transient_key);
        
        if ($cached !== false) {
            $this->cache_hospital_names[$hospital_id] = $cached;
            return $cached;
        }
        
        // Layer 3: Database query
        $name = get_the_title($hospital_id);
        
        // Save to both caches
        $this->cache_hospital_names[$hospital_id] = $name;
        set_transient($transient_key, $name, self::TRANSIENT_EXPIRY);
        
        return $name;
    }
    
    /**
     * Clear cache for specific hospital (call when hospital is updated/deleted)
     * 
     * @param int $hospital_id Hospital post ID
     * @return void
     */
    public function clear_hospital_cache($hospital_id)
    {
        // Clear runtime cache
        unset($this->cache_hospital_list_ids[$hospital_id]);
        unset($this->cache_hospital_names[$hospital_id]);
        
        // Clear transient cache
        delete_transient(self::TRANSIENT_PREFIX . 'h_list_' . $hospital_id);
        delete_transient(self::TRANSIENT_PREFIX . 'h_name_' . $hospital_id);
    }
    
    /**
     * Universal entry point - process entity (order or hospital)
     * Determines entity type and processes accordingly
     * 
     * @param int $entity_id Post ID (can be order or hospital)
     * @return bool Success
     */
    public function process_entity($entity_id)
    {
        if (empty($entity_id)) {
            return false;
        }
        
        // Try to get post type (for standard posts)
        $post_type = get_post_type($entity_id);
        
        // For HPOS orders, post_type might be false, so check if it's an order
        if (!$post_type) {
            $order = wc_get_order($entity_id);
            if ($order) {
                return $this->process_order($entity_id);
            }
            return false;
        }
        
        switch ($post_type) {
            case 'shop_order':
                // Standard WooCommerce order (legacy)
                return $this->process_order($entity_id);
                
            case 'hospital':
                // Hospital creator - update their contact
                return $this->process_hospital_creator($entity_id);
                
            default:
                return false;
        }
    }
    
    /**
     * Process order - handle buyer and gift recipient contacts
     * Main entry point called from order hooks (woocommerce_order_status_completed)
     * 
     * OPTIMIZED: Pre-fetches orders to avoid duplicate queries
     * 
     * @param int|\WC_Order $order_id Order ID or order object
     * @return bool Success
     */
    public function process_order($order_id)
    {
        $t_start = microtime(true);
        // error_log("[FLUENT] process_order START for order #{$order_id}");
        
        $order = is_object($order_id) ? $order_id : wc_get_order($order_id);
        
        if (!$order) {
            // error_log("[FLUENT] process_order: Order not found");
            return false;
        }
        
        $buyer_email = $order->get_billing_email();
        $gift_email = $order->get_meta('_gift_email', true);
        
        $t1 = microtime(true);
        // Pre-fetch buyer orders (max 15, avg 3) - only if buyer email exists
        $buyer_orders = null;
        if (!empty($buyer_email)) {
            $buyer_orders = wc_get_orders([
                'billing_email' => $buyer_email,
                'limit' => -1,
                'status' => ['completed']
            ]);
        }
        $t2 = microtime(true);
        // error_log(sprintf("[FLUENT] Fetching buyer orders took %.2f seconds", $t2 - $t1));
        
        $t3 = microtime(true);
        // Pre-fetch gift recipient orders ONLY if needed (different email)
        $gift_orders = null;
        if (!empty($gift_email) && $gift_email !== $buyer_email) {
            $gift_orders = wc_get_orders([
                'billing_email' => $gift_email,
                'limit' => -1,
                'status' => ['completed']
            ]);
        } elseif (!empty($gift_email) && $gift_email === $buyer_email) {
            // Same person → reuse buyer orders
            $gift_orders = $buyer_orders;
        }
        $t4 = microtime(true);
        // error_log(sprintf("[FLUENT] Fetching gift orders took %.2f seconds", $t4 - $t3));
        
        $t5 = microtime(true);
        // 1. Process buyer contact (with pre-fetched orders)
        if (!empty($buyer_email)) {
            $this->process_buyer_contact($order, $buyer_orders);
        }
        $t6 = microtime(true);
        // error_log(sprintf("[FLUENT] process_buyer_contact took %.2f seconds", $t6 - $t5));
        
        $t7 = microtime(true);
        // 2. Process gift recipient if exists (with pre-fetched orders)
        if (!empty($gift_email)) {
            $this->process_gift_recipient($order, $gift_orders);
        }
        $t8 = microtime(true);
        // error_log(sprintf("[FLUENT] process_gift_recipient took %.2f seconds", $t8 - $t7));
        
        $t_end = microtime(true);
        // error_log(sprintf("[FLUENT] process_order TOTAL: %.2f seconds", $t_end - $t_start));
        
        return true;
    }
    
    /**
     * Process hospital creator contact
     * Updates tags/lists for hospital creator when hospital is created/updated
     * 
     * @param int $hospital_id Hospital post ID
     * @return bool Success
     */
    public function process_hospital_creator($hospital_id)
    {
        // Get hospital creator email
        $creator_email = get_post_meta($hospital_id, 'hospital_email', true);
        
        if (empty($creator_email)) {
            return false;
        }
        
        // Get ALL COMPLETED orders for this email
        $completed_orders = wc_get_orders([
            'billing_email' => $creator_email,
            'limit' => -1,
            'status' => ['completed']
        ]);
        
        // Prepare contact data
        $contact_data = [
            'email' => $creator_email,
            'status' => 'subscribed'
        ];
        
        // Determine tags based on ALL orders from this email (pre-load for performance)
        $contact_data['tags'] = $this->determine_tags_for_email($creator_email, $completed_orders);
        
        // Determine lists - collect from ALL orders, not just latest one
        $contact_data['list'] = $this->determine_lists_for_email_all_orders($creator_email, $completed_orders);
        
        // Calculate and add donation statistics custom fields (if has orders)
        if (!empty($completed_orders)) {
            $total_donation = 0;
            $max_single_order = 0;
            foreach ($completed_orders as $order_item) {
                $order_total = (float) $order_item->get_total();
                $total_donation += $order_total;
                if ($order_total > $max_single_order) {
                    $max_single_order = $order_total;
                }
            }
            $order_count = count($completed_orders);
            $average_donation = $order_count > 0 ? ($total_donation / $order_count) : 0;
            
            $contact_data['custom_values'] = [
                FluentCRMIntegration::FIELD_TOTAL_DONATIONS => round($total_donation),
                FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => $order_count,
                FluentCRMIntegration::FIELD_AVERAGE_DONATION => round($average_donation),
                FluentCRMIntegration::FIELD_HIGHEST_DONATION => round($max_single_order)
            ];
        }
        
        // Add/update contact (tags/lists cleanup + custom fields handled in ContactService)
        return $this->contact_service->add_fluent_contact($contact_data);
    }
    
    /**
     * Process buyer contact from order
     * 
     * @param \WC_Order $order Order object
     * @param array|null $completed_orders Pre-fetched completed orders (optimization)
     * @return bool Success
     */
    private function process_buyer_contact($order, $completed_orders = null)
    {
        $email = $order->get_billing_email();
        
        if (empty($email)) {
            return false;
        }
        
        // Get ALL COMPLETED orders for statistics (if not provided)
        if ($completed_orders === null) {
            $completed_orders = wc_get_orders([
                'billing_email' => $email,
                'limit' => -1,
                'status' => ['completed']
            ]);
        }
        
        // STEP 1: Get or create contact
        $contact_data = [
            'email' => $email,
            'first_name' => $order->get_billing_first_name(),
            'last_name' => $order->get_billing_last_name(),
            'status' => 'subscribed'
        ];
        
        // Determine tags based on ALL orders from this email (pre-load for performance)
        $contact_data['tags'] = $this->determine_tags_for_email($email, $completed_orders);
        
        // Determine lists - collect from ALL orders, not just current one
        $contact_data['list'] = $this->determine_lists_for_email_all_orders($email, $completed_orders);
        
        // Calculate and add donation statistics custom fields
        if (!empty($completed_orders)) {
            $total_donation = 0;
            $max_single_order = 0;
            foreach ($completed_orders as $order_item) {
                $order_total = (float) $order_item->get_total();
                $total_donation += $order_total;
                if ($order_total > $max_single_order) {
                    $max_single_order = $order_total;
                }
            }
            $order_count = count($completed_orders);
            $average_donation = $order_count > 0 ? ($total_donation / $order_count) : 0;
            
            $contact_data['custom_values'] = [
                FluentCRMIntegration::FIELD_TOTAL_DONATIONS => round($total_donation),
                FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => $order_count,
                FluentCRMIntegration::FIELD_AVERAGE_DONATION => round($average_donation),
                FluentCRMIntegration::FIELD_HIGHEST_DONATION => round($max_single_order)
            ];
        }
        
        // STEP 2: Add/update contact (tags/lists cleanup + custom fields handled in ContactService)
        return $this->contact_service->add_fluent_contact($contact_data);
    }
    
    /**
     * Process gift recipient from order
     * Uses SAME logic as process_all_gift_recipients()
     * 
     * @param \WC_Order $order Order object
     * @param array|null $completed_orders Pre-fetched completed orders (optimization)
     * @return bool Success
     */
    private function process_gift_recipient($order, $completed_orders = null)
    {
        $gift_email = $order->get_meta('_gift_email', true);
        $gift_name = $order->get_meta('_gift_name', true);
        $gift_surname = $order->get_meta('_gift_surname', true);
        
        // Both email AND name must be filled
        if (empty($gift_email) || empty($gift_name)) {
            return false;
        }
        
        // Check if gift recipient has their own completed orders (if not provided)
        if ($completed_orders === null) {
            $completed_orders = wc_get_orders([
                'billing_email' => $gift_email,
                'limit' => -1,
                'status' => ['completed']
            ]);
        }
        
        $has_own_orders = !empty($completed_orders);
        
        $tags = [];
        $lists = [FluentCRMIntegration::LIST_GIFT_RECIPIENTS]; // Always include "Obdrželi dar"
        $custom_values = [
            FluentCRMIntegration::FIELD_TOTAL_DONATIONS => 0,
            FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => 0,
            FluentCRMIntegration::FIELD_AVERAGE_DONATION => 0,
            FluentCRMIntegration::FIELD_HIGHEST_DONATION => 0
        ];
        
        if ($has_own_orders) {
            // Gift recipient WHO ALSO has their own orders → full logic
            $tags = $this->determine_tags_for_email($gift_email, $completed_orders);
            $order_lists = $this->determine_lists_for_email_all_orders($gift_email, $completed_orders);
            $lists = array_merge($lists, $order_lists);
            
            // Calculate donation statistics
            $total_donation = 0;
            $max_single_order = 0;
            foreach ($completed_orders as $order_item) {
                $order_total = (float) $order_item->get_total();
                $total_donation += $order_total;
                if ($order_total > $max_single_order) {
                    $max_single_order = $order_total;
                }
            }
            $order_count = count($completed_orders);
            $average_donation = $order_count > 0 ? ($total_donation / $order_count) : 0;
            
            $custom_values = [
                FluentCRMIntegration::FIELD_TOTAL_DONATIONS => round($total_donation),
                FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => $order_count,
                FluentCRMIntegration::FIELD_AVERAGE_DONATION => round($average_donation),
                FluentCRMIntegration::FIELD_HIGHEST_DONATION => round($max_single_order)
            ];
        } else {
            // Gift recipient WITHOUT own orders → minimal logic
            // 1. Gender tag (if detectable)
            $gender_tag_id = $this->detect_gender_from_name($gift_name);
            if ($gender_tag_id === 'mr') {
                $tags[] = FluentCRMIntegration::TAG_GENDER_MALE;
            } elseif ($gender_tag_id === 'ms') {
                $tags[] = FluentCRMIntegration::TAG_GENDER_FEMALE;
            }
            
            // 2. Add "Bez nákupu" list
            $lists[] = FluentCRMIntegration::LIST_NO_ORDERS;
            
            // 3. Check if creator of public hospital
            $creator_hospital_lists = $this->get_creator_hospital_list_ids($gift_email);
            if (!empty($creator_hospital_lists)) {
                $lists = array_merge($lists, $creator_hospital_lists);
            } else {
                // Not a creator → add "Bez nemocnice"
                $lists[] = FluentCRMIntegration::LIST_NO_HOSPITAL;
            }
        }
        
        // Prepare contact data
        $contact_data = [
            'email' => $gift_email,
            'first_name' => $gift_name,
            'last_name' => $gift_surname,
            'status' => 'subscribed',
            'tags' => $tags,
            'list' => array_unique($lists),
            'custom_values' => $custom_values
        ];
        
        // Delegate to ContactService
        return $this->contact_service->add_fluent_contact($contact_data);
    }
    
    /**
     * Determine ALL tags for contact based on email
     * Analyzes all orders and generates appropriate tags
     * 
     * @param string $email Contact email
     * @return array Tag IDs
     */
    private function determine_tags_for_email($email, $completed_orders = null)
    {
        $tag_ids = [];
        
        // Get ALL COMPLETED orders for this email (if not provided - performance optimization)
        // NOTE: Only completed orders count for repeat donor and price range tags
        if ($completed_orders === null) {
            $completed_orders = wc_get_orders([
                'billing_email' => $email,
                'limit' => -1,
                'status' => ['completed']
            ]);
        }
        
        if (empty($completed_orders)) {
            return $tag_ids;
        }
        
        $all_orders = $completed_orders;
        
        // 1. Year tags - ALL YEARS customer ordered
        $years = [];
        foreach ($all_orders as $order) {
            $year = date('Y', $order->get_date_created()->getTimestamp());
            if (!in_array($year, $years)) {
                $years[] = $year;
                $year_tag_id = $this->get_or_create_year_tag($year);
                if ($year_tag_id) {
                    $tag_ids[] = $year_tag_id;
                }
            }
        }
        
        // 2. Gender tag
        // Priority: 1) Latest order _billing_sex, 2) Existing gender tag from FluentCRM, 3) Skip
        $latest_order = $all_orders[0]; // orders are sorted by date DESC
        $gender = $latest_order->get_meta('_billing_sex', true);
        
        if (!empty($gender)) {
            // Use gender from latest order
            if ($gender === 'mr') {
                $tag_ids[] = FluentCRMIntegration::TAG_GENDER_MALE;
            } elseif ($gender === 'ms') {
                $tag_ids[] = FluentCRMIntegration::TAG_GENDER_FEMALE;
            }
        } else {
            // Check if contact already has gender tag in FluentCRM
            $existing_gender_tag = $this->get_existing_gender_tag($email);
            if ($existing_gender_tag) {
                $tag_ids[] = $existing_gender_tag;
            }
            // If no existing gender tag, we skip it (don't determine from name)
        }
        
        // 3. Repeat donor tag - ONLY HIGHEST CATEGORY
        $repeat_count = count($all_orders);
        $repeat_tag_id = $this->get_repeat_donor_tag_id($repeat_count);
        if ($repeat_tag_id) {
            $tag_ids[] = $repeat_tag_id;
        }
        
        // 4. Price range tag - ONLY HIGHEST CATEGORY (max single order)
        $max_price = 0;
        foreach ($all_orders as $order) {
            $order_total = $order->get_total();
            if ($order_total > $max_price) {
                $max_price = $order_total;
            }
        }
        
        $price_tag_id = $this->get_price_range_tag_id($max_price);
        if ($price_tag_id) {
            $tag_ids[] = $price_tag_id;
        }
        
        return $tag_ids;
    }
    
    /**
     * Determine tags for gift recipient
     * Only year + gender (no repeat donor or price tags)
     * 
     * @param \WC_Order $order Order object
     * @return array Tag IDs
     */
    private function determine_tags_for_gift($order)
    {
        $tag_ids = [];
        
        // 1. Year tag (auto-create if doesn't exist)
        $order_year = date('Y', $order->get_date_created()->getTimestamp());
        $year_tag_id = $this->get_or_create_year_tag($order_year);
        if ($year_tag_id) {
            $tag_ids[] = $year_tag_id;
        }
        
        // 2. Gender tag
        // Priority: 1) _gift_sex from order, 2) Existing gender tag in FluentCRM, 3) Detect from name
        $gift_email = $order->get_meta('_gift_email', true);
        $gift_sex = $order->get_meta('_gift_sex', true);
        $gift_name = $order->get_meta('_gift_name', true);
        
        if (!empty($gift_sex)) {
            // Use gender from order meta
            if ($gift_sex === 'mr') {
                $tag_ids[] = FluentCRMIntegration::TAG_GENDER_MALE;
            } elseif ($gift_sex === 'ms') {
                $tag_ids[] = FluentCRMIntegration::TAG_GENDER_FEMALE;
            }
        } else {
            // Check if gift recipient already has gender tag in FluentCRM
            $existing_gender_tag = null;
            if (!empty($gift_email)) {
                $existing_gender_tag = $this->get_existing_gender_tag($gift_email);
            }
            
            if ($existing_gender_tag) {
                // Use existing gender tag
                $tag_ids[] = $existing_gender_tag;
            } elseif (!empty($gift_name)) {
                // Last resort: detect from name
                $detected_gender = $this->detect_gender_from_name($gift_name);
                if ($detected_gender === 'mr') {
                    $tag_ids[] = FluentCRMIntegration::TAG_GENDER_MALE;
                } elseif ($detected_gender === 'ms') {
                    $tag_ids[] = FluentCRMIntegration::TAG_GENDER_FEMALE;
                }
            }
        }
        
        return $tag_ids;
    }
    
    /**
     * Determine lists for contact (single order context)
     * Logic:
     * 1. If order has PUBLIC hospital → use hospital list
     * 2. Else if contact is PUBLIC hospital creator → no "Bez nemocnice"
     * 3. Else if contact has ANY PUBLIC hospital orders → no "Bez nemocnice"
     * 4. Else → add to "Bez nemocnice" (includes PRIVATE hospital creators/orders)
     * 
     * @param string $email Contact email
     * @param \WC_Order $order Order object
     * @return array List IDs
     */
    private function determine_lists_for_email($email, $order)
    {
        // Get hospital list IDs from current order
        $hospital_list_ids = $this->get_hospital_list_ids_from_order($order);
        
        // If current order has PUBLIC hospital list → use it
        if (!empty($hospital_list_ids)) {
            return $hospital_list_ids;
        }
        
        // Check if contact is PUBLIC hospital creator (has FluentCRM list)
        if ($this->is_public_hospital_creator($email)) {
            return []; // No "Bez nemocnice" for PUBLIC hospital creators
        }
        
        // Check if contact has ANY PUBLIC hospital orders (orders with FluentCRM list)
        if ($this->contact_has_public_hospital_orders($email)) {
            return []; // No "Bez nemocnice" for those who ordered for PUBLIC hospitals
        }
        
        // Contact has never ordered for PUBLIC hospital → "Bez nemocnice"
        // This includes: PRIVATE hospital creators, PRIVATE hospital orders, no hospital at all
        return [FluentCRMIntegration::LIST_NO_HOSPITAL];
    }
    
    /**
     * Determine lists for contact (all orders context - for batch sync)
     * Collects ALL hospital lists from ALL completed orders
     * 
     * Logic:
     * 1. Collect ALL PUBLIC hospital lists from ALL orders
     * 2. If has any PUBLIC hospital lists → return them (no "Bez nemocnice")
     * 3. Else if contact is PUBLIC hospital creator → no lists (no "Bez nemocnice")
     * 4. Else → add to "Bez nemocnice"
     * 
     * @param string $email Contact email
     * @param array $completed_orders Array of WC_Order objects
     * @return array List IDs
     */
    private function determine_lists_for_email_all_orders($email, $completed_orders)
    {
        $all_hospital_list_ids = [];
        
        // Collect hospital lists from ALL orders
        foreach ($completed_orders as $order) {
            $hospital_list_ids = $this->get_hospital_list_ids_from_order($order);
            if (!empty($hospital_list_ids)) {
                $all_hospital_list_ids = array_merge($all_hospital_list_ids, $hospital_list_ids);
            }
        }
        
        // Check if contact is PUBLIC hospital creator - add their hospital lists
        $creator_hospital_lists = $this->get_creator_hospital_list_ids($email);
        if (!empty($creator_hospital_lists)) {
            $all_hospital_list_ids = array_merge($all_hospital_list_ids, $creator_hospital_lists);
        }
        
        // DEBUG: Log what we collected before filtering
        // error_log("DEBUG determine_lists_for_email_all_orders({$email}): Before filtering = [" . implode(', ', array_map(function($v) { return var_export($v, true); }, $all_hospital_list_ids)) . "]");
        
        // Remove duplicates and filter out falsy values (0, false, null, empty strings)
        $all_hospital_list_ids = array_unique($all_hospital_list_ids);
        $all_hospital_list_ids = array_filter($all_hospital_list_ids, function($list_id) {
            return !empty($list_id) && is_numeric($list_id) && $list_id > 0;
        });
        $all_hospital_list_ids = array_values($all_hospital_list_ids); // Re-index array
        
        // If has ANY PUBLIC hospital lists (from orders OR as creator) → return them
        if (!empty($all_hospital_list_ids)) {
            // DEBUG: Log what we're returning
            // error_log("DEBUG determine_lists_for_email_all_orders({$email}): Returning hospital lists = [" . implode(', ', $all_hospital_list_ids) . "]");
            return $all_hospital_list_ids;
        }
        
        // Contact has never ordered for PUBLIC hospital AND is not creator → "Bez nemocnice"
        // DEBUG: Log what we're returning
        // error_log("DEBUG determine_lists_for_email_all_orders({$email}): No public hospitals, returning LIST_NO_HOSPITAL = " . FluentCRMIntegration::LIST_NO_HOSPITAL);
        return [FluentCRMIntegration::LIST_NO_HOSPITAL];
    }
    
    // ========================================
    // CRON JOB METHODS
    // ========================================
    
    /**
     * Process all contacts - called from daily cron
     * Updates tags and lists for all existing contacts
     * 
     * @param int $batch_size Number of contacts per batch
     * @param int $offset Starting offset
     * @return array Processing results
     */
    public function process_all_contacts($batch_size = 100, $offset = 0)
    {
        if (!function_exists('FluentCrmApi')) {
            return ['processed' => 0, 'total' => 0, 'completed' => true, 'logs' => []];
        }
        
        $contact_api = FluentCrmApi('contacts');
        $logs = [];
        
        // Get total count (ALL statuses)
        $total = $contact_api->getInstance()
            ->count();
        
        // Get batch of contacts (ALL statuses)
        $contacts = $contact_api->getInstance()
            ->skip($offset)
            ->take($batch_size)
            ->get();
        
        $processed = 0;
        
        foreach ($contacts as $contact) {
            // Find all COMPLETED orders for statistics
            $completed_orders = wc_get_orders([
                'billing_email' => $contact->email,
                'limit' => -1,
                'status' => ['completed']
            ]);
            
            $order_count = count($completed_orders);
            
            if (!empty($completed_orders)) {
                $logs[] = ['type' => 'info', 'message' => "✓ {$contact->email} | {$contact->first_name} {$contact->last_name}"];
                
                // Calculate donation statistics
                $total_donation = 0;
                $max_single_order = 0;
                foreach ($completed_orders as $order) {
                    $order_total = (float) $order->get_total();
                    $total_donation += $order_total;
                    if ($order_total > $max_single_order) {
                        $max_single_order = $order_total;
                    }
                }
                $average_donation = $order_count > 0 ? ($total_donation / $order_count) : 0;
                
                // Determine tags based on ALL orders (pass pre-loaded orders for performance)
                $tags = $this->determine_tags_for_email($contact->email, $completed_orders);
                
                // Determine lists - collect from ALL orders, not just latest
                $lists = $this->determine_lists_for_email_all_orders($contact->email, $completed_orders);
                
                // Get current tags for comparison
                $current_tags = $contact->tags->pluck('id')->toArray();
                $tag_names = $this->get_tag_names_from_ids($tags);
                
                // Log decisions
                $logs[] = ['type' => 'info', 'message' => "  └─ Objednávky: {$order_count}x completed"];
                $logs[] = ['type' => 'info', 'message' => "  └─ Total donation: " . number_format($total_donation, 0, ',', ' ') . " Kč"];
                $logs[] = ['type' => 'info', 'message' => "  └─ Max single order: " . number_format($max_single_order, 0, ',', ' ') . " Kč"];
                $logs[] = ['type' => 'info', 'message' => "  └─ Average donation: " . number_format($average_donation, 0, ',', ' ') . " Kč"];
                
                $logs[] = ['type' => 'info', 'message' => "  └─ Tagy: " . implode(', ', $tag_names)];
                
                if (!empty($lists)) {
                    $list_names = $this->get_list_names_from_ids($lists);
                    $logs[] = ['type' => 'info', 'message' => "  └─ Listy: " . implode(', ', $list_names)];
                } else {
                    // DEBUG: Empty lists
                    $logs[] = ['type' => 'warning', 'message' => "  └─ Listy: (PRÁZDNÉ - BUG!) - měl by být 'Bez nemocnice'"];
                }
                
                $logs[] = ['type' => 'success', 'message' => "  └─ Custom fields aktualizovány (total/number/average/highest)"];
                
                // Check "Bez nemocnice" removal
                $is_in_no_hospital = in_array(FluentCRMIntegration::LIST_NO_HOSPITAL, $contact->lists->pluck('id')->toArray());
                $should_be_in_no_hospital = in_array(FluentCRMIntegration::LIST_NO_HOSPITAL, $lists);
                
                if ($is_in_no_hospital && !$should_be_in_no_hospital) {
                    $logs[] = ['type' => 'warning', 'message' => "  └─ Odebrán z 'Bez nemocnice' (má hospital nebo je creator)"];
                    
                    // Find PUBLIC hospital orders to show why
                    $hospital_orders_info = $this->get_hospital_orders_info($contact->email);
                    if (!empty($hospital_orders_info)) {
                        foreach ($hospital_orders_info as $info) {
                            $logs[] = ['type' => 'info', 'message' => "     → Order #{$info['order_id']}: {$info['hospital_name']} (Hospital ID #{$info['hospital_id']}, List ID #{$info['list_id']})"];
                        }
                    }
                    
                    // Check if PUBLIC hospital creator
                    if ($this->is_public_hospital_creator($contact->email)) {
                        // Find PUBLIC hospitals (with FluentCRM list) for this email
                        global $wpdb;
                        $public_hospitals = $wpdb->get_results($wpdb->prepare(
                            "SELECT p.ID, p.post_title, pm_list.meta_value as list_id
                            FROM {$wpdb->posts} p
                            INNER JOIN {$wpdb->postmeta} pm_email ON p.ID = pm_email.post_id
                            INNER JOIN {$wpdb->postmeta} pm_list ON p.ID = pm_list.post_id
                            WHERE p.post_type = 'hospital'
                            AND p.post_status = 'publish'
                            AND pm_email.meta_key = 'hospital_email'
                            AND pm_email.meta_value = %s
                            AND pm_list.meta_key = '_fluent_list_id'
                            AND pm_list.meta_value != ''",
                            $contact->email
                        ));
                        
                        if (!empty($public_hospitals)) {
                            foreach ($public_hospitals as $hospital) {
                                $logs[] = ['type' => 'info', 'message' => "     → Je creator VEŘEJNÉ nemocnice: {$hospital->post_title} (Hospital ID: {$hospital->ID}, List ID: {$hospital->list_id})"];
                            }
                        }
                    }
                }
                
                // Prepare contact data with updated tags/lists + custom fields (1 API call instead of 2)
                $contact_data = [
                    'email' => $contact->email,
                    'tags' => $tags,
                    'list' => $lists,
                    'custom_values' => [
                        FluentCRMIntegration::FIELD_TOTAL_DONATIONS => round($total_donation, 2),
                        FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => $order_count,
                        FluentCRMIntegration::FIELD_AVERAGE_DONATION => round($average_donation, 2),
                        FluentCRMIntegration::FIELD_HIGHEST_DONATION => round($max_single_order, 2)
                    ]
                ];
                
                // Add/update tags, lists AND custom fields in ONE API call (huge performance boost!)
                $this->contact_service->add_fluent_contact($contact_data);
            } else {
                // Contact has NO completed orders - clean up tags/lists and mark as "Bez nákupu"
                $logs[] = ['type' => 'warning', 'message' => "⊘ {$contact->email} | {$contact->first_name} {$contact->last_name} | Žádné completed objednávky"];
                
                // Determine gender tag (only tag they should have)
                $tags = [];
                $gender_tag_id = $this->detect_gender_from_name($contact->first_name);
                if ($gender_tag_id === 'mr') {
                    $tags[] = FluentCRMIntegration::TAG_GENDER_MALE;
                } elseif ($gender_tag_id === 'ms') {
                    $tags[] = FluentCRMIntegration::TAG_GENDER_FEMALE;
                }
                
                // Determine lists: "Bez nákupu" + hospital or "Bez nemocnice"
                $lists = [FluentCRMIntegration::LIST_NO_ORDERS];
                
                // PRESERVE "Obdrželi dar" list if contact already has it
                // (they may be gift recipients from migrated orders)
                $existing_list_ids = $contact->lists->pluck('id')->toArray();
                if (in_array(FluentCRMIntegration::LIST_GIFT_RECIPIENTS, $existing_list_ids)) {
                    $lists[] = FluentCRMIntegration::LIST_GIFT_RECIPIENTS;
                }
                
                // Check if creator of public hospital
                $creator_hospital_lists = $this->get_creator_hospital_list_ids($contact->email);
                if (!empty($creator_hospital_lists)) {
                    $lists = array_merge($lists, $creator_hospital_lists);
                } else {
                    // Not a creator → add "Bez nemocnice"
                    $lists[] = FluentCRMIntegration::LIST_NO_HOSPITAL;
                }
                
                // Prepare contact data (empty donations, only gender tag if detected)
                $contact_data = [
                    'email' => $contact->email,
                    'tags' => $tags,
                    'list' => $lists,
                    'custom_values' => [
                        FluentCRMIntegration::FIELD_TOTAL_DONATIONS => 0,
                        FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => 0,
                        FluentCRMIntegration::FIELD_AVERAGE_DONATION => 0,
                        FluentCRMIntegration::FIELD_HIGHEST_DONATION => 0
                    ]
                ];
                
                // Update contact
                $this->contact_service->add_fluent_contact($contact_data);
                
                // Log decisions
                if (!empty($tags)) {
                    $tag_names = $this->get_tag_names_from_ids($tags);
                    $logs[] = ['type' => 'info', 'message' => "  └─ Tagy: " . implode(', ', $tag_names)];
                } else {
                    $logs[] = ['type' => 'info', 'message' => "  └─ Tagy: (žádné - gender nelze detekovat)"];
                }
                
                $list_names = $this->get_list_names_from_ids($lists);
                $logs[] = ['type' => 'info', 'message' => "  └─ Listy: " . implode(', ', $list_names)];
                $logs[] = ['type' => 'info', 'message' => "  └─ Custom fields vynulovány (bez objednávek)"];
            }
            
            // Always increment processed for ALL contacts (with or without orders)
            $processed++;
        }
        
        // Calculate progress - use count of fetched contacts, not processed
        $current = min($offset + count($contacts), $total);
        $completed = $current >= $total || count($contacts) < $batch_size;
        
        // Process gift recipients on completion
        if ($completed) {
            $logs[] = ['type' => 'info', 'message' => '═══ Zpracování gift recipients ═══'];
            $gift_result = $this->process_all_gift_recipients();
            
            if ($gift_result['processed'] > 0) {
                $logs[] = ['type' => 'success', 'message' => "✓ Gift recipients: {$gift_result['processed']} kontaktů přidáno do 'Obdrželi dar'"];
            } else {
                $logs[] = ['type' => 'info', 'message' => "⊘ Gift recipients: žádní noví (již zpracováno)"];
            }
        }
        
        return [
            'processed' => $processed,
            'logs' => $logs,
            'progress' => [
                'current' => $current,
                'total' => $total,
                'percentage' => $total > 0 ? round(($current / $total) * 100) : 0
            ],
            'completed' => $completed
        ];
    }
    
    /**
     * Process all gift recipients - called from daily cron
     * Ensures all gift recipients are in "Obdrželi dar" list
     * 
     * @return array Processing results
     */
    public function process_all_gift_recipients()
    {
        if (!function_exists('FluentCrmApi')) {
            return ['processed' => 0, 'total' => 0];
        }
        
        global $wpdb;
        
        // Find all unique gift emails from ALL orders (HPOS tables)
        $gift_recipients = $wpdb->get_results(
            "SELECT DISTINCT 
                om_email.meta_value as gift_email,
                om_name.meta_value as gift_name,
                om_surname.meta_value as gift_surname,
                om_sex.meta_value as gift_sex,
                o.id as order_id,
                o.date_created_gmt as order_date
            FROM {$wpdb->prefix}wc_orders_meta om_email
            INNER JOIN {$wpdb->prefix}wc_orders o ON om_email.order_id = o.id
            LEFT JOIN {$wpdb->prefix}wc_orders_meta om_name ON o.id = om_name.order_id AND om_name.meta_key = '_gift_name'
            LEFT JOIN {$wpdb->prefix}wc_orders_meta om_surname ON o.id = om_surname.order_id AND om_surname.meta_key = '_gift_surname'
            LEFT JOIN {$wpdb->prefix}wc_orders_meta om_sex ON o.id = om_sex.order_id AND om_sex.meta_key = '_gift_sex'
            WHERE om_email.meta_key = '_gift_email'
            AND om_email.meta_value != ''
            AND om_email.meta_value IS NOT NULL
            AND o.status IN ('wc-completed', 'wc-processing', 'wc-on-hold')
            ORDER BY om_email.meta_value, o.date_created_gmt DESC"
        );
        
        $processed = 0;
        $processed_emails = [];
        
        foreach ($gift_recipients as $recipient) {
            // Skip if already processed (we only want unique emails)
            if (in_array($recipient->gift_email, $processed_emails)) {
                continue;
            }
            
            // Check if gift recipient has their own completed orders
            $completed_orders = wc_get_orders([
                'billing_email' => $recipient->gift_email,
                'limit' => -1,
                'status' => ['completed']
            ]);
            
            $has_own_orders = !empty($completed_orders);
            
            $tags = [];
            $lists = [FluentCRMIntegration::LIST_GIFT_RECIPIENTS]; // Always include "Obdrželi dar"
            $custom_values = [
                FluentCRMIntegration::FIELD_TOTAL_DONATIONS => 0,
                FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => 0,
                FluentCRMIntegration::FIELD_AVERAGE_DONATION => 0,
                FluentCRMIntegration::FIELD_HIGHEST_DONATION => 0
            ];
            
            if ($has_own_orders) {
                // Gift recipient WHO ALSO has their own orders → full logic
                $tags = $this->determine_tags_for_email($recipient->gift_email, $completed_orders);
                $order_lists = $this->determine_lists_for_email_all_orders($recipient->gift_email, $completed_orders);
                $lists = array_merge($lists, $order_lists);
                
                // Calculate donation statistics
                $total_donation = 0;
                $max_single_order = 0;
                foreach ($completed_orders as $order) {
                    $order_total = (float) $order->get_total();
                    $total_donation += $order_total;
                    if ($order_total > $max_single_order) {
                        $max_single_order = $order_total;
                    }
                }
                $order_count = count($completed_orders);
                $average_donation = $order_count > 0 ? ($total_donation / $order_count) : 0;
                
                $custom_values = [
                    FluentCRMIntegration::FIELD_TOTAL_DONATIONS => round($total_donation),
                    FluentCRMIntegration::FIELD_NUMBER_OF_DONATIONS => $order_count,
                    FluentCRMIntegration::FIELD_AVERAGE_DONATION => round($average_donation),
                    FluentCRMIntegration::FIELD_HIGHEST_DONATION => round($max_single_order)
                ];
            } else {
                // Gift recipient WITHOUT own orders → minimal logic
                // 1. Gender tag (if detectable)
                $gender_tag_id = $this->detect_gender_from_name($recipient->gift_name);
                if ($gender_tag_id === 'mr') {
                    $tags[] = FluentCRMIntegration::TAG_GENDER_MALE;
                } elseif ($gender_tag_id === 'ms') {
                    $tags[] = FluentCRMIntegration::TAG_GENDER_FEMALE;
                }
                
                // 2. Add "Bez nákupu" list
                $lists[] = FluentCRMIntegration::LIST_NO_ORDERS;
                
                // 3. Check if creator of public hospital
                $creator_hospital_lists = $this->get_creator_hospital_list_ids($recipient->gift_email);
                if (!empty($creator_hospital_lists)) {
                    $lists = array_merge($lists, $creator_hospital_lists);
                } else {
                    // Not a creator → add "Bez nemocnice"
                    $lists[] = FluentCRMIntegration::LIST_NO_HOSPITAL;
                }
            }
            
            // Prepare contact data
            $contact_data = [
                'email' => $recipient->gift_email,
                'first_name' => $recipient->gift_name ?? '',
                'last_name' => $recipient->gift_surname ?? '',
                'status' => 'subscribed',
                'tags' => $tags,
                'list' => array_unique($lists),
                'custom_values' => $custom_values
            ];
            
            $this->contact_service->add_fluent_contact($contact_data);
            
            $processed++;
            $processed_emails[] = $recipient->gift_email;
        }
        
        return [
            'processed' => $processed,
            'total' => count($processed_emails)
        ];
    }
    
    // ========================================
    // HELPER METHODS - Tag cleanup
    // ========================================
    
    /**
     * Get existing gender tag from FluentCRM contact (if any)
     * 
     * @param string $email Contact email
     * @return int|null Gender tag ID (12 = male, 10 = female) or null
     */
    private function get_existing_gender_tag($email)
    {
        if (!function_exists('FluentCrmApi')) {
            return null;
        }
        
        try {
            $contact = FluentCrmApi('contacts')->getContact($email);
            
            if (!$contact) {
                return null;
            }
            
            $current_tags = $contact->tags->pluck('id')->toArray();
            
            // Check if contact has male gender tag
            if (in_array(FluentCRMIntegration::TAG_GENDER_MALE, $current_tags)) {
                return FluentCRMIntegration::TAG_GENDER_MALE;
            }
            
            // Check if contact has female gender tag
            if (in_array(FluentCRMIntegration::TAG_GENDER_FEMALE, $current_tags)) {
                return FluentCRMIntegration::TAG_GENDER_FEMALE;
            }
            
            return null;
            
        } catch (\Exception $e) {
            return null;
        }
    }
    
    // ========================================
    // HELPER METHODS - Contact checks
    // ========================================
    
    /**
     * Check if email is a hospital creator (ANY hospital - public or private)
     * 
     * @param string $email Contact email
     * @return bool
     */
    private function is_hospital_creator($email)
    {
        global $wpdb;
        
        $hospital_count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM {$wpdb->postmeta} pm
            INNER JOIN {$wpdb->posts} p ON pm.post_id = p.ID
            WHERE p.post_type = 'hospital'
            AND p.post_status = 'publish'
            AND pm.meta_key = 'hospital_email'
            AND pm.meta_value = %s",
            $email
        ));
        
        return (int) $hospital_count > 0;
    }
    
    /**
     * Get FluentCRM list IDs for hospitals where contact is creator
     * 
     * @param string $email Contact email
     * @return array FluentCRM list IDs
     */
    private function get_creator_hospital_list_ids($email)
    {
        global $wpdb;
        
        // Use runtime cache
        $cache_key = 'creator_lists_' . md5($email);
        if (isset($this->cache_hospital_list_ids[$cache_key])) {
            return $this->cache_hospital_list_ids[$cache_key];
        }
        
        // Check transient cache
        $transient_key = self::TRANSIENT_PREFIX . $cache_key;
        $cached = get_transient($transient_key);
        if (false !== $cached) {
            $this->cache_hospital_list_ids[$cache_key] = $cached;
            return $cached;
        }
        
        // Find hospitals where:
        // 1. Email matches hospital_email
        // 2. Hospital has _fluent_list_id meta (= is public)
        $list_ids = $wpdb->get_col($wpdb->prepare(
            "SELECT DISTINCT pm_list.meta_value
            FROM {$wpdb->postmeta} pm_email
            INNER JOIN {$wpdb->posts} p ON pm_email.post_id = p.ID
            INNER JOIN {$wpdb->postmeta} pm_list ON p.ID = pm_list.post_id
            WHERE p.post_type = 'hospital'
            AND p.post_status = 'publish'
            AND pm_email.meta_key = 'hospital_email'
            AND pm_email.meta_value = %s
            AND pm_list.meta_key = '_fluent_list_id'
            AND pm_list.meta_value != ''",
            $email
        ));
        
        // Convert to integers
        $list_ids = array_map('intval', $list_ids);
        
        // Cache results
        $this->cache_hospital_list_ids[$cache_key] = $list_ids;
        set_transient($transient_key, $list_ids, self::TRANSIENT_EXPIRY);
        
        return $list_ids;
    }
    
    /**
     * Check if email is a PUBLIC hospital creator (has FluentCRM list)
     * 
     * @param string $email Contact email
     * @return bool
     */
    private function is_public_hospital_creator($email)
    {
        $list_ids = $this->get_creator_hospital_list_ids($email);
        return !empty($list_ids);
    }
    
    /**
     * Check if contact has ANY orders with hospital_id (public or private)
     * 
     * @param string $email Contact email
     * @return bool
     */
    private function contact_has_hospital_orders($email)
    {
        global $wpdb;
        
        // For HPOS (High-Performance Order Storage) compatibility
        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(DISTINCT oim.order_item_id)
            FROM {$wpdb->prefix}woocommerce_order_items oi
            INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta oim 
                ON oi.order_item_id = oim.order_item_id
            LEFT JOIN {$wpdb->posts} p 
                ON oi.order_id = p.ID AND p.post_type = 'shop_order'
            LEFT JOIN {$wpdb->prefix}wc_orders wo
                ON oi.order_id = wo.id
            WHERE oi.order_item_type = 'line_item'
            AND oim.meta_key = 'hospital_id'
            AND oim.meta_value != ''
            AND oim.meta_value IS NOT NULL
            AND (
                (wo.billing_email = %s AND wo.status IN ('wc-completed', 'wc-processing', 'wc-on-hold'))
                OR
                (p.ID IS NOT NULL AND p.post_status IN ('wc-completed', 'wc-processing', 'wc-on-hold')
                 AND EXISTS (
                    SELECT 1 FROM {$wpdb->postmeta} pm 
                    WHERE pm.post_id = p.ID 
                    AND pm.meta_key = '_billing_email' 
                    AND pm.meta_value = %s
                 ))
            )",
            $email,
            $email
        ));
        
        return (int) $count > 0;
    }
    
    /**
     * Check if contact has ANY orders with PUBLIC hospital_id (has FluentCRM list)
     * 
     * @param string $email Contact email
     * @return bool
     */
    private function contact_has_public_hospital_orders($email)
    {
        global $wpdb;
        
        // For HPOS (High-Performance Order Storage) compatibility
        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(DISTINCT oim.order_item_id)
            FROM {$wpdb->prefix}woocommerce_order_items oi
            INNER JOIN {$wpdb->prefix}woocommerce_order_itemmeta oim 
                ON oi.order_item_id = oim.order_item_id
            INNER JOIN {$wpdb->postmeta} pm_list
                ON CAST(oim.meta_value AS UNSIGNED) = pm_list.post_id
                AND pm_list.meta_key = '_fluent_list_id'
                AND pm_list.meta_value != ''
            LEFT JOIN {$wpdb->posts} p 
                ON oi.order_id = p.ID AND p.post_type = 'shop_order'
            LEFT JOIN {$wpdb->prefix}wc_orders wo
                ON oi.order_id = wo.id
            WHERE oi.order_item_type = 'line_item'
            AND oim.meta_key = 'hospital_id'
            AND oim.meta_value != ''
            AND oim.meta_value IS NOT NULL
            AND (
                (wo.billing_email = %s AND wo.status IN ('wc-completed', 'wc-processing', 'wc-on-hold'))
                OR
                (p.ID IS NOT NULL AND p.post_status IN ('wc-completed', 'wc-processing', 'wc-on-hold')
                 AND EXISTS (
                    SELECT 1 FROM {$wpdb->postmeta} pm 
                    WHERE pm.post_id = p.ID 
                    AND pm.meta_key = '_billing_email' 
                    AND pm.meta_value = %s
                 ))
            )",
            $email,
            $email
        ));
        
        return (int) $count > 0;
    }
    
    /**
     * Get hospital list IDs from order
     * 
     * @param \WC_Order $order Order object
     * @return array Hospital list IDs
     */
    private function get_hospital_list_ids_from_order($order)
    {
        $list_ids = [];
        $items = $order->get_items();
        
        foreach ($items as $item) {
            $hospital_id = $item->get_meta('hospital_id', true);
            
            if (!empty($hospital_id)) {
                // Use hybrid cache (persists between cron batches!)
                $list_id = $this->get_hospital_list_id_cached($hospital_id);
                
                if ($list_id !== null) {
                    $list_ids[] = $list_id;
                }
            }
        }
        
        return array_unique($list_ids);
    }
    
    // ========================================
    // HELPER METHODS - Tags
    // ========================================
    
    /**
     * Get or create year tag (auto-creates for new years like 2026, 2027, etc.)
     * 
     * @param string $year Year (e.g. "2026")
     * @return int|null Tag ID or null on failure
     */
    private function get_or_create_year_tag($year)
    {
        // Check cache first (avoids DB query during batch processing)
        if (isset($this->cache_year_tags[$year])) {
            return $this->cache_year_tags[$year];
        }
        
        if (!function_exists('FluentCrmApi')) {
            return null;
        }
        
        try {
            $tagApi = FluentCrmApi('tags');
            
            // Try to find existing tag by slug (more reliable than title)
            $existingTag = $tagApi->getInstance()->where('slug', $year)->first();
            
            if ($existingTag) {
                $this->cache_year_tags[$year] = (int) $existingTag->id;
                return $this->cache_year_tags[$year];
            }
            
            // Create new year tag
            $description = "Zákazníci s objednávkami z roku {$year}";
            $importedTags = $tagApi->importBulk([
                [
                    'title' => $year,
                    'slug' => $year,
                    'description' => $description
                ]
            ]);
            
            $tag_id = (!empty($importedTags) && isset($importedTags[0]->id)) ? (int) $importedTags[0]->id : null;
            $this->cache_year_tags[$year] = $tag_id;
            return $tag_id;
        } catch (\Exception $e) {
            return null;
        }
    }
    
    /**
     * Get repeat donor tag ID based on order count
     * Returns ONLY the highest category
     * 
     * @param int $order_count Number of orders
     * @return int|null FluentCRM tag ID or null
     */
    private function get_repeat_donor_tag_id($order_count)
    {
        if ($order_count <= 0) {
            return null;
        }
        
        if ($order_count === 1) {
            return FluentCRMIntegration::TAG_DONOR_1X;       // 1x-donor
        } elseif ($order_count === 2) {
            return FluentCRMIntegration::TAG_DONOR_2X;       // 2x-donor
        } elseif ($order_count === 3) {
            return FluentCRMIntegration::TAG_DONOR_3X;       // 3x-donor
        } elseif ($order_count >= 4 && $order_count <= 5) {
            return FluentCRMIntegration::TAG_DONOR_4_5X;     // 4-5x-donor
        } else {
            return FluentCRMIntegration::TAG_DONOR_VIP;      // vip-donor (6+)
        }
    }
    
    /**
     * Get price range tag ID based on highest single order total
     * Returns ONLY the highest category
     * 
     * @param float $total_price Order total
     * @return int|null FluentCRM tag ID or null
     */
    private function get_price_range_tag_id($total_price)
    {
        if ($total_price <= 0) {
            return null;
        }
        
        if ($total_price <= 300) {
            return FluentCRMIntegration::TAG_PRICE_SMALL;    // small-donor (0-300 Kč)
        } elseif ($total_price <= 1000) {
            return FluentCRMIntegration::TAG_PRICE_MEDIUM;   // medium-donor (301-1000 Kč)
        } elseif ($total_price <= 3000) {
            return FluentCRMIntegration::TAG_PRICE_LARGE;    // large-donor (1001-3000 Kč)
        } else {
            return FluentCRMIntegration::TAG_PRICE_MEGA;     // mega-donor (3000+ Kč)
        }
    }
    
    /**
     * Detect gender from first name using Vokativ library + whitelist
     * Returns 'mr' for male, 'ms' for female, or null if detection fails
     * 
     * Same logic as nbh-migration for consistency (96% accuracy)
     * 
     * @param string $first_name First name to analyze
     * @return string|null 'mr', 'ms', or null
     */
    private function detect_gender_from_name($first_name)
    {
        if (empty($first_name)) {
            return null;
        }
        
        // PRIORITY 1: Check whitelist (names without diacritics, diminutives, foreign names)
        $gender_whitelist = [
            // Česká jména bez háčků/diakritiky
            'Eliska' => 'ms',     'Sarka' => 'ms',      'Anezka' => 'ms',
            'Miluse' => 'ms',     'Roza' => 'ms',       'Blazena' => 'ms',
            'Katerina' => 'ms',   'Vladimira' => 'ms',  'ELISKA' => 'ms',
            
            // České zdrobněliny
            'Hanka' => 'ms',      'Jindra' => 'ms',     'Jarka' => 'ms',
            'Zuzka' => 'ms',      'Bara' => 'ms',       'Hata' => 'ms',
            'Maca' => 'ms',       'Stana' => 'ms',      'Stàňa' => 'ms',
            'Tatana' => 'ms',     'Ivuška' => 'ms',     'Jája' => 'ms',
            'Anička' => 'ms',     'Adriannka' => 'ms',  'Moricka' => 'ms',
            'Jolanka' => 'ms',    'Bashka' => 'ms',     'Rada' => 'ms',
            'Leka' => 'ms',       'Ka' => 'ms',
            
            // Cizí ženská jména (končí na souhlásku nebo neobvyklou koncovku)
            'Dagmar' => 'ms',     'Thi' => 'ms',        'Hester' => 'ms',
            'Rút' => 'ms',        'Nikol' => 'ms',      'Karin' => 'ms',
            'Ingrid' => 'ms',     'Miriam' => 'ms',     'Phillippa' => 'ms',
            'Messina' => 'ms',    'Adeola' => 'ms',
            
            // Slovenská/balkánská jména
            'Ľuba' => 'ms',       'Ognjenka' => 'ms',   'Blaga' => 'ms',
            'Bystrica' => 'ms',
            
            // Ostatní ženská jména
            'Mirela' => 'ms',     'Lujza' => 'ms',      'Nada' => 'ms',
            'Ilja' => 'ms',       'E' => 'ms',          'Renara' => 'ms',
            'Salome' => 'ms',     'Oresta' => 'ms',     'Síta' => 'ms',
            'Beatrica' => 'ms',   'Réza' => 'ms',       'Kroupova' => 'ms',
            
            // Mužská jména
            'Farid' => 'mr',       'Dusan' => 'mr',
        ];
        
        if (isset($gender_whitelist[$first_name])) {
            return $gender_whitelist[$first_name];
        }
        
        // PRIORITY 2: Use Vokativ library (96% accuracy for Czech names)
        try {
            // Use Granam\CzechVocative\CzechName library
            if (!class_exists('Granam\CzechVocative\CzechName')) {
                return null;
            }
            
            $czech_name = new \Granam\CzechVocative\CzechName();
            $is_male = $czech_name->isMale($first_name);
            
            return $is_male ? 'mr' : 'ms';
            
        } catch (\Exception $e) {
            return null;
        }
    }
    
    /**
     * Get PUBLIC hospital orders info for logging (only hospitals with FluentCRM list)
     * 
     * @param string $email Contact email
     * @return array Array of ['order_id' => X, 'hospital_id' => Y, 'hospital_name' => Z, 'list_id' => W]
     */
    private function get_hospital_orders_info($email)
    {
        global $wpdb;
        
        $info = [];
        
        // Get all orders for this email
        $orders = wc_get_orders([
            'billing_email' => $email,
            'limit' => -1,
            'status' => ['completed']
        ]);
        
        foreach ($orders as $order) {
            $items = $order->get_items();
            
            foreach ($items as $item) {
                $hospital_id = $item->get_meta('hospital_id', true);
                
                if (!empty($hospital_id)) {
                    // Use hybrid cache (persists between batches!)
                    $list_id = $this->get_hospital_list_id_cached($hospital_id);
                    
                    if ($list_id !== null) {
                        $hospital_name = $this->get_hospital_name_cached($hospital_id);
                        
                        $info[] = [
                            'order_id' => $order->get_id(),
                            'hospital_id' => $hospital_id,
                            'hospital_name' => $hospital_name,
                            'list_id' => $list_id
                        ];
                    }
                }
            }
        }
        
        return $info;
    }
    
    /**
     * Get tag names from IDs for logging
     * 
     * @param array $tag_ids Tag IDs
     * @return array Tag names
     */
    private function get_tag_names_from_ids($tag_ids)
    {
        if (empty($tag_ids) || !function_exists('FluentCrmApi')) {
            return [];
        }
        
        $tag_map = [
            FluentCRMIntegration::TAG_GENDER_MALE => 'Muž',
            FluentCRMIntegration::TAG_GENDER_FEMALE => 'Žena',
            FluentCRMIntegration::TAG_DONOR_1X => '1x-donor',
            FluentCRMIntegration::TAG_DONOR_2X => '2x-donor',
            FluentCRMIntegration::TAG_DONOR_3X => '3x-donor',
            FluentCRMIntegration::TAG_DONOR_4_5X => '4-5x-donor',
            FluentCRMIntegration::TAG_DONOR_VIP => 'vip-donor',
            FluentCRMIntegration::TAG_PRICE_SMALL => 'small-donor',
            FluentCRMIntegration::TAG_PRICE_MEDIUM => 'medium-donor',
            FluentCRMIntegration::TAG_PRICE_LARGE => 'large-donor',
            FluentCRMIntegration::TAG_PRICE_MEGA => 'mega-donor',
        ];
        
        $names = [];
        
        foreach ($tag_ids as $tag_id) {
            if (isset($tag_map[$tag_id])) {
                $names[] = $tag_map[$tag_id];
            } else {
                // Check cache first, then get from database (year tags, custom tags)
                if (!isset($this->cache_tag_names[$tag_id])) {
                    $tag = FluentCrmApi('tags')->getInstance()->where('id', $tag_id)->first();
                    $this->cache_tag_names[$tag_id] = $tag ? $tag->title : null;
                }
                
                if ($this->cache_tag_names[$tag_id] !== null) {
                    $names[] = $this->cache_tag_names[$tag_id];
                }
            }
        }
        
        return $names;
    }
    
    /**
     * Get list names from IDs for logging
     * 
     * @param array $list_ids List IDs
     * @return array List names
     */
    private function get_list_names_from_ids($list_ids)
    {
        if (empty($list_ids) || !function_exists('FluentCrmApi')) {
            return [];
        }
        
        $names = [];
        
        foreach ($list_ids as $list_id) {
            if ($list_id === FluentCRMIntegration::LIST_NO_HOSPITAL) {
                $names[] = 'Bez nemocnice';
            } elseif ($list_id === FluentCRMIntegration::LIST_GIFT_RECIPIENTS) {
                $names[] = 'Obdrželi dar';
            } elseif ($list_id === FluentCRMIntegration::LIST_NO_ORDERS) {
                $names[] = 'Bez nákupu';
            } else {
                // Check cache first, then get hospital list name from database
                if (!isset($this->cache_list_names[$list_id])) {
                    $list = FluentCrmApi('lists')->getInstance()->where('id', $list_id)->first();
                    $this->cache_list_names[$list_id] = $list ? $list->title : null;
                }
                
                if ($this->cache_list_names[$list_id] !== null) {
                    $names[] = $this->cache_list_names[$list_id];
                }
            }
        }
        
        return $names;
    }
}

