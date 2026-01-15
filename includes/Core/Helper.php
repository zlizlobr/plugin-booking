<?php

use Wpcbooking\CPT\Booking;
use Wpcbooking\CPT\Quote;
use Wpcbooking\Controllers\BookingController;

/**
 * Load a template file with variables
 *
 * @param string $template_name Template name (without .php extension)
 * @param array $args Variables to pass to template
 * @param string $template_path Template path (default: includes/Views/)
 * @return string Rendered template content
 */
function booking_get_template($template_name, $args = [], $template_path = '')
{

    if (empty($template_path))  $template_path = WPCBOOKING_PLUGIN_DIR . 'includes/Views/';

    $template_file = $template_path . $template_name . (pathinfo($template_name, PATHINFO_EXTENSION) ? '' : '.php');
    if (!file_exists($template_file)) {
        error_log('template_file not found: ' . $template_file);
        return '';
    }

    // Extract variables to make them available in template
    if (!empty($args) && is_array($args))  extract($args);

    // Start output buffering
    ob_start();

    // Include the template file
    try {
        include $template_file;
    } catch (\Exception $e) {
        error_log('[Helper] Error loading template: ' . $template_file . ': ' . print_r($e, true));
    }

    // Return the buffered content
    $result = ob_get_clean();
    return $result;
}

/**
 * Check if current page is booking edit page.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return bool True if current page is booking edit page
 */
function booking_is_edit_page()
{
    global $pagenow;

    if (!is_admin() || (defined('DOING_AJAX') && DOING_AJAX)) return false;

    if (
        $pagenow === 'post-new.php' &&
        isset($_GET['post_type']) &&
        ($_GET['post_type'] === Booking::SLUG)
    ) {
        return true;
    }

    if ($pagenow === 'post.php' && isset($_GET['post'])) {
        $post_id = intval($_GET['post']);
        $post_type = get_post_type($post_id);
        if ($post_type === Booking::SLUG) {
            return true;
        }
    }

    return false;
}

/**
 * Get booking design options.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param int $booking_id Booking post ID
 * @return array Design options array
 */
function get_booking_options_design($booking_id): array
{
    $options = get_post_meta($booking_id, '_booking_options_form_design', true);
    return is_array($options) ? $options : [];
}

/**
 * Get booking basic options.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param int $booking_id Booking post ID
 * @return array Basic options array
 */
function get_booking_options_basics($booking_id): array
{
    $options = get_post_meta($booking_id, '_booking_options_setup_basics', true);
    return is_array($options) ? $options : [];
}
/**
 * Get booking WooCommerce options.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param int $booking_id Booking post ID
 * @return array WooCommerce options array
 */
function get_booking_options_woocommerce($booking_id): array
{
    $options = get_post_meta($booking_id, '_woocommerce_settings', true);
    return is_array($options) ? $options : [];
}

/**
 * Get booking summary step options with processed URLs.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param int $booking_id Booking post ID
 * @return array Summary options array with processed icon and term page URLs
 */
function get_booking_options_summary($booking_id): array
{
    $options = get_post_meta($booking_id, '_booking_options_summary_step', true);
    if (!is_array($options)) {
        return [];
    }

    // Přidat URL pro send_button_icon pokud existuje
    if (isset($options['send_button_icon']) && !empty($options['send_button_icon'])) {
        $icon_url = wp_get_attachment_url($options['send_button_icon']);
        if ($icon_url) {
            $options['send_button_icon'] = $icon_url;
        }
    }

    // Přidat page_url pro každý term v terms poli
    if (isset($options['terms']) && is_array($options['terms'])) {
        global $wp_rewrite;

        foreach ($options['terms'] as $key => $term) {
            if (isset($term['page_id']) && !empty($term['page_id'])) {
                if ($wp_rewrite instanceof WP_Rewrite) {
                    $page_url = get_permalink($term['page_id']);
                    if ($page_url) {
                        $options['terms'][$key]['page_url'] = $page_url;
                    }
                } else {
                    // Fallback když wp_rewrite není dostupný
                    $options['terms'][$key]['page_url'] = home_url('?page_id=' . $term['page_id']);
                }
            }
        }
    }
    return $options;
}

/**
 * Get quote currency, falling back to booking WooCommerce default currency.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param int $quote_id Quote post ID
 * @param int $booking_id Booking post ID
 * @return string|null Currency code or null
 */
function get_quote_currency(int $quote_id, int $booking_id): ?string
{
    $quote_currency = get_post_meta($quote_id, '_quote_currency', true);
    if (isset($quote_currency) && !empty($quote_currency)) {
        return $quote_currency;
    }

    $woocommerce_options = get_booking_options_woocommerce($booking_id);
    return $woocommerce_options['woo_default_currency'] ?? 'DKK';
}

/**
 * Get all registered block names from Blocks directory.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return array Array of block names with 'booking/' prefix
 */
function booking_get_all_block_names(): array
{
    $blocks_dir = WPCBOOKING_INCLUDES_DIR . '/Blocks/';
    $block_files = glob($blocks_dir . '*.php');
    $block_names = [];
    if (booking_can_loading_scripts()) {
        foreach ($block_files as $file) {
            $filename = basename($file, '.php');
            if ($filename === 'AbstractBlock' || $filename === 'AbstractProductBlock' || $filename === 'BookingForm') continue;
            $full_class_name = 'Wpcbooking\Blocks\\' . $filename;
            if (class_exists($full_class_name)) {
                $block_name = $full_class_name::get_block_name();
                if (!empty($block_name)) {
                    $block_names[] = 'booking/' . $block_name;
                }
            }
        }
    }
    return $block_names;
}


/**
 * Get booking URL from default page or current URL.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param int $booking_id Booking post ID
 * @return string|null Booking URL or null
 */
function get_booking_url(int $booking_id): ?string
{
    $form_options = get_booking_options_basics($booking_id);
    if (!isset($form_options['default_page_id'])) {
        return booking_get_current_url();
    }

    // Check if $wp_rewrite is available before calling get_permalink
    global $wp_rewrite;
    if (!$wp_rewrite instanceof WP_Rewrite) {
        // Fallback: build URL manually or return base URL
        $page_id = $form_options['default_page_id'];
        return home_url('?page_id=' . $page_id);
    }

    return esc_url(get_permalink($form_options['default_page_id']));
}

/**
 * Get current page URL.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return string Current URL or empty string if AJAX request
 */
function booking_get_current_url()
{
    if (defined('DOING_AJAX') && DOING_AJAX) return '';
    if (isset($_SERVER['HTTP_HOST'], $_SERVER['REQUEST_URI'])) {
        return (is_ssl() ? 'https' : 'http') . '://' . filter_var($_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'], FILTER_SANITIZE_URL);
    }
    return '';
}

/**
 * Get quote hash from session or generate new one.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param int|null $booking_id Booking post ID (default: null, uses current booking ID)
 * @return string Quote hash
 */
function get_quote_hash($booking_id = null)
{

    if (!$booking_id && get_current_booking_id())
        $booking_id = get_current_booking_id();


    // Check if WooCommerce session is active and form ID is provided
    if (booking_active_wc_session() && isset($booking_id)) {
        // Get booking session data
        $session_booking = WC()->session->get('booking_' . $booking_id, false);
        // Return existing hash if it's valid
        if (
            is_array($session_booking) &&
            isset($session_booking['_quote_hash']) &&
            !exist_quote_by_hash($session_booking['_quote_hash'])
        ) {

            $status = get_post_meta($session_booking['_quote_hash'], '_quote_status', true);
            if (isset($status) && $status === 'unfinished') {
                return $session_booking['_quote_hash'];
            } else {
                WC()->session->__unset('booking_' . $booking_id);
                return generat_quote_hash();
            }
        }
    }

    // Generate and return new hash if no valid existing hash found
    return generat_quote_hash();
}

/**
 * Get current booking ID from WooCommerce session.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return int|null Current booking ID or null
 */
function get_current_booking_id()
{
    return booking_active_wc_session() ? WC()->session->get('_booking_current_id') ?? null : null;
}

/**
 * Check if WooCommerce session is active and initialize if needed.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return bool True if WooCommerce session is active
 */
function booking_active_wc_session()
{
    // Check if WooCommerce exists
    if (!class_exists('WooCommerce')) {
        return false;
    }

    // Initialize session if null
    if (is_null(WC()->session)) {
        WC()->session = new WC_Session_Handler();
        WC()->session->init();
    }

    // Set customer session cookie
    WC()->session->set_customer_session_cookie(true);

    // Return session status
    return WC()->session instanceof WC_Session;
}
/**
 * Check if quote exists by hash.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param string $hash Quote hash
 * @return int|false Quote post ID or false if not found
 */
function exist_quote_by_hash($hash)
{
    global $wpdb;

    $post_statuses = ['publish'];
    $placeholders = implode(',', array_fill(0, count($post_statuses), '%s'));

    $query = $wpdb->prepare(
        "SELECT ID
            FROM $wpdb->posts
            WHERE post_name = %s
            AND post_type = %s
            AND post_status IN ($placeholders)
            LIMIT 1",
        array_merge([$hash, Quote::SLUG], $post_statuses)
    );
    $post_id = $wpdb->get_var($query);
    return $post_id ? (int) $post_id : false;
}

/**
 * Generate unique quote hash using UUID v4.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return string Unique quote hash
 */
function generat_quote_hash()
{
    global $wpdb;
    $uuid_data = PHP_MAJOR_VERSION < 7 ? openssl_random_pseudo_bytes(16) : random_bytes(16);
    $uuid_data[6] = chr(ord($uuid_data[6]) & 0x0f | 0x40);    // Set version to 0100
    $uuid_data[8] = chr(ord($uuid_data[8]) & 0x3f | 0x80);    // Set bits 6-7 to 10
    $uuid = vsprintf('%s%s%s%s%s%s%s%s', str_split(bin2hex($uuid_data), 4));
    /**
     * Generate unique hash...,
     */
    $get_quote_uid = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s",
            $uuid
        )
    );
    if ($get_quote_uid) {
        return generat_quote_hash();
    }
    return $uuid;
}
/**
 * Get Google Maps API key from options or fallback to default.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return string Google Maps API key
 */
function booking_get_maps_api_key()
{
    $options = get_option('wpcbooking_options', array());
    $api_key = isset($options['google_maps_api_key']) ? $options['google_maps_api_key'] : '';

    return $api_key;
}
/**
 * Check if scripts can be loaded on current page.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @return bool True if scripts can be loaded (admin edit pages or frontend quote pages)
 */
function booking_can_loading_scripts()
{
    global $pagenow;

    if (!is_admin() || (defined('DOING_AJAX') && DOING_AJAX)) return true;

    // Allow on single quote frontend page
    if (is_singular(Quote::SLUG)) {
        return true;
    }

    // Ověření post.php?post=24702 a custom CPT z pluginu
    if ($pagenow === 'post.php') {
        $post_id = null;

        // Check GET parameter (when editing)
        if (isset($_GET['post'])) {
            $post_id = intval($_GET['post']);
        }
        // Check POST parameter (when saving)
        elseif (isset($_POST['post_ID'])) {
            $post_id = intval($_POST['post_ID']);
        }

        if ($post_id) {
            $post_type = get_post_type($post_id);

            // Kontrola zda jde o custom CPT z pluginu
            if ($post_type === Booking::SLUG || $post_type === Quote::SLUG) {
                return true;
            }
        }
    }

    return false;
}
/**
 * Get quote post ID by hash.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param string $hash Quote hash
 * @return int|false Quote post ID or false if not found
 */
function booking_get_quote_id_by_hash($hash): int|false
{
    global $wpdb;
    $post_statuses = ['draft', 'publish'];
    $placeholders = implode(',', array_fill(0, count($post_statuses), '%s'));
    $query = $wpdb->prepare(
        "SELECT ID
            FROM $wpdb->posts
            WHERE post_name = %s
            AND post_type = %s
            AND post_status IN ($placeholders)
            LIMIT 1",
        array_merge([$hash, Quote::SLUG], $post_statuses)
    );
    $post_id = $wpdb->get_var($query);
    return $post_id ? (int) $post_id : false;
}
/**
 * Extract fields from post content as fallback
 * Uses BookingController for parsing blocks
 * @param int $post_id Post ID (booking_id)
 * @param string|array|null $filter_block_name Optional blockName filter(s). Can be single block name or array of block names
 * @return array Array of fields
 */
function extract_block_fields_from_booking(int $post_id, string|array|null $filter_block_name = null): array
{
    if (!$post_id || $post_id <= 0) {
        return [];
    }
    if (get_post_type($post_id) !== Booking::SLUG) {
        return [];
    }
    try {
        $booking_controller = BookingController::get_instance($post_id);
        $booking_sections = $booking_controller->get_booking_sections();
        if (!is_array($booking_sections)) {
            return [];
        }
        $fields = [];

        // Prepare filter array
        $filter_block_names = [];
        if ($filter_block_name) {
            $filter_block_names = is_array($filter_block_name) ? $filter_block_name : [$filter_block_name];
        }

        // Iterate through all steps and their blocks
        foreach ($booking_sections as $step => $blocks) {
            if (!is_array($blocks)) {
                continue;
            }
            foreach ($blocks as $block) {
                // Filter by blockName if filter is provided
                if (!empty($filter_block_names)) {
                    $block_name = $block['blockName'] ?? '';
                    if (!in_array($block_name, $filter_block_names, true)) {
                        continue;
                    }
                }

                if (!isset($block['attrs']['field_id'])) {
                    continue;
                }

                $prepared_attrs = $block['attrs'] ?? [];
                $field_id = $prepared_attrs['field_id'];
                $label = $prepared_attrs['general']['label'] ?? $prepared_attrs['label'] ?? '';

                if (empty($field_id) || empty($label)) {
                    continue;
                }

                $fields[] = [
                    'field_id' => sanitize_text_field($field_id),
                    'label' => sanitize_text_field($label)
                ];
            }
        }
        return $fields;
    } catch (\Throwable $th) {
        error_log(sprintf(
            "[%s] Error extracting fields from post content:\n%s \nFile: %s \nLine: %d",
            'HELPERR',
            $th->getMessage(),
            $th->getFile(),
            $th->getLine()
        ));
        return [];
    }
}

/**
 * Get confirmed step options from booking
 * 
 * @param int $booking_id Booking post ID
 * @return array Confirmed step options
 */
function booking_get_confirmed_options(int $booking_id): array
{
    $options = get_post_meta($booking_id, '_booking_options_confirmed_step', true);
    if (!is_array($options)) {
        return [];
    }

    if (isset($options['icon_id']) && !empty($options['icon_id'])) {
        $icon_url = wp_get_attachment_url($options['icon_id']);
        if ($icon_url) {
            $options['icon_id'] = $icon_url;
        }
    }

    return $options;
}

/**
 * Get block ID from block array
 * 
 * @param array $block Block array with attrs
 * @return string|null Block field_id or null
 */
function booking_get_block_id(array $block): ?string
{
    return $block['attrs']['field_id'] ?? null;
}

/**
 * Check if products condition is met
 * 
 * @param array $condition Condition array with condition_type, product_condition, ids, operator
 * @param array $product_ids Array of product IDs from quote
 * @return bool True if condition is met
 */
function booking_check_products_condition(array $condition, array $product_ids): bool
{
    if (empty($product_ids)) {
        return false;
    }

    $required_ids = array_map('intval', $condition['ids'] ?? []);

    if (empty($required_ids)) {
        return true;
    }

    $operator = $condition['operator'] ?? 'OR';
    $product_condition = $condition['product_condition'] ?? 'included_products';

    if ($product_condition === 'included_products') {
        if ($operator === 'OR') {
            return count(array_intersect($required_ids, $product_ids)) > 0;
        } else {
            return count(array_diff($required_ids, $product_ids)) === 0;
        }
    }

    if ($product_condition === 'excluded_products') {
        if ($operator === 'OR') {
            return count(array_intersect($required_ids, $product_ids)) === 0;
        } else {
            return count(array_diff($required_ids, $product_ids)) > 0;
        }
    }

    return true;
}

/**
 * Check single condition
 * 
 * @param array $condition Condition array
 * @param array $product_ids Array of product IDs
 * @return bool True if condition is met
 */
function booking_check_single_condition(array $condition, array $product_ids): bool
{
    $condition_type = $condition['condition_type'] ?? 'none';

    // If condition type is 'none', always return true (no filtering)
    if ($condition_type === 'none' || empty($condition_type)) {
        return true;
    }

    switch ($condition_type) {
        case 'products':
            return booking_check_products_condition($condition, $product_ids);
        default:
            return true;
    }
}

/**
 * Check step conditions
 * 
 * @param array|null $conditions Conditions array
 * @param array $product_ids Array of product IDs from quote
 * @return bool True if all conditions are met
 */
function booking_check_step_conditions(?array $conditions, array $product_ids): bool
{
    if (empty($conditions)) {
        return true;
    }

    foreach ($conditions as $condition) {
        if (!is_array($condition)) {
            continue;
        }

        if (!booking_check_single_condition($condition, $product_ids)) {
            return false;
        }
    }

    return true;
}

/**
 * Get all unique product IDs from quote post meta
 * 
 * @param int $quote_id Quote post ID
 * @return array Array of unique product IDs
 */
function booking_get_quote_products(int $quote_id): array
{
    $product_ids = [];
    $post_meta = get_post_meta($quote_id);

    foreach ($post_meta as $meta_key => $meta_value) {
        if (strpos($meta_key, '_products') !== false) {
            $products = maybe_unserialize($meta_value[0] ?? []);

            if (is_array($products)) {
                foreach ($products as $product) {
                    $product_id = (int) ($product['product_id'] ?? $product['id'] ?? 0);
                    if ($product_id > 0) {
                        $product_ids[] = $product_id;
                    }
                }
            }
        }
    }

    return array_values(array_unique($product_ids));
}

/**
 * Prepare summary blocks layout for quote display
 * 
 * @param array $blocks Array of step blocks from BookingController
 * @param int $quote_id Quote post ID
 * @return array Prepared blocks data with prices and labels
 */
function booking_prepare_summary_blocks_layout(array $blocks, int $quote_id): array
{
    $prepared_blocks = [];
    // Get all unique product IDs once for condition checking
    $product_ids = booking_get_quote_products($quote_id);
    $step_loop = 1;
    foreach ($blocks as $step => $block) {
        $attrs = $block['attrs'] ?? [];

        // Check step conditions - try multiple locations
        // First check directly in block, then in attrs (for compatibility)
        $conditions = $block['conditions'] ?? $block['condition'] ?? $attrs['conditions'] ?? $attrs['condition'] ?? null;

        if (!booking_check_step_conditions($conditions, $product_ids)) {
            continue; // Skip this step if conditions not met
        }

        $title = $attrs['step_title'] ?? sprintf(__('Step %d', 'wpcbooking'), $step);

        $label_meta = get_post_meta($quote_id, '_step_' . $step . '_label', true);
        $label = '' == $label_meta
            ? sprintf('%s %s', $attrs['label_summary'] ?? __('List of choices from step', 'wpcbooking'), $title)
            : $label_meta;
        $meta_label = get_post_meta($quote_id, '_step_' . $step . '_label', true);
        $base_price = (float) get_post_meta($quote_id, '_step_' . $step . '_base_price', true);
        $percentage_price = (float) get_post_meta($quote_id, '_step_' . $step . '_percentage_price', true);
        
        $thumbnail_id = $block['thumbnail_id'] ?? null;
        $thumbnail_id_mail = $block['thumbnail_id_mail'] ?? $thumbnail_id;
        
        $thumbnail_src = '';
        if ($thumbnail_id && is_numeric($thumbnail_id)) {
            $thumbnail_src = wp_get_attachment_image_url($thumbnail_id, "full") ?: '';
        }
        
        $thumbnail_src_mail = '';
        if ($thumbnail_id_mail && is_numeric($thumbnail_id_mail)) {
            $thumbnail_src_mail = wp_get_attachment_image_url($thumbnail_id_mail, "full") ?: '';
        }
        
        $prepared_blocks[$step] = [
            'label' => strlen($meta_label) > 3 ? $meta_label : $label,
            'value' => $base_price + $percentage_price,
            'thumbnail_src' => $thumbnail_src,
            'thumbnail_src_mail' => $thumbnail_src_mail,
            'show_calculations' => 1,
            'innerBlocks' => $block['innerBlocks'] ?? [],
        ];
        $step_loop++;
    }

    return $prepared_blocks;
}

/**
 * Render block data for quote summary display
 * Uses existing hook system from AbstractBlock to get structured data,
 * then converts to HTML for quote page rendering
 * 
 * @param array $block Block array
 * @param int $quote_id Quote post ID
 * @param string $field_id Block field ID
 * @return string|null Rendered HTML or null
 */
function booking_apply_render_data(array $block, int $quote_id, string $field_id): ?string
{
    $block_name = $block['blockName'] ?? 'unknown';

    $filter_name = "wpcbooking_block_render_data_{$block_name}";
    // Call existing block hook to get structured data
    $render_data = apply_filters(
        $filter_name,
        get_post_meta($quote_id, $field_id, true) ?? '',
        $quote_id,
        $field_id,
        $block
    );
    // If no data returned, return null
    if (empty($render_data) || !is_array($render_data)) {
        return null;
    }

    // Convert structured data to HTML based on block_type
    $html = booking_convert_block_data_to_html($render_data);
    return $html;
}

/**
 * Convert structured block data to HTML
 * Mimics the composite React components but outputs PHP HTML
 * 
 * @param array $data Structured data from get_block_render_data()
 * @return string HTML output
 */
function booking_convert_block_data_to_html(array $data): string
{
    $block_type = $data['block_type'] ?? '';
    $label = $data['label'] ?? '';
    $value = $data['value'] ?? '';
    $output = '<div class="ml-[25px] flex items-center mb-2">';
    switch ($block_type) {
        case 'booking/number-input':
            if (!$value && $value !== 0 && $value !== '0') break;

            $suffix = $data['suffix'] ?? '';
            $output .= '<label class="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">';
            $output .= esc_html($label) . ':';
            $output .= '</label>';
            $output .= '<span class="text-base text-th-grey font-medium align-middle">';
            $output .= esc_html($value) . ($suffix ? ' ' . esc_html($suffix) : '');
            $output .= '</span>';
            break;

        case 'booking/text-input':
        case 'booking/email-input':
        case 'booking/phone-input':
        case 'booking/time-picker':
            if (empty($value)) break;

            $output .= '<label class="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">';
            $output .= esc_html($label) . ':';
            $output .= '</label>';
            $output .= '<span class="text-base text-th-grey font-medium align-middle">';
            $output .= esc_html($value);
            $output .= '</span>';
            break;

        case 'booking/date-picker':
            if (empty($value)) break;

            $formatted_value = $data['formatted_value'] ?? $value;
            $output .= '<label class="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">';
            $output .= esc_html($label) . ':';
            $output .= '</label>';
            $output .= '<span class="text-base text-th-grey font-medium align-middle">';
            $output .= esc_html($formatted_value);
            $output .= '</span>';
            break;

        case 'booking/google-map':
            $parsed_address = $data['parsed_address'] ?? [];
            if (empty($parsed_address)) break;

            $output .= '<label class="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">';
            $output .= esc_html($label) . ':';
            $output .= '</label>';
            $output .= '<div class="text-base text-th-grey font-medium">';
            if (!empty($parsed_address['address'])) {
                $output .= '<div>' . esc_html($parsed_address['address']) . '</div>';
            }
            if (!empty($parsed_address['city']) || !empty($parsed_address['country'])) {
                $output .= '<div>';
                if (!empty($parsed_address['city'])) {
                    $output .= esc_html($parsed_address['city']);
                }
                if (!empty($parsed_address['country'])) {
                    $output .= (!empty($parsed_address['city']) ? ', ' : '') . esc_html($parsed_address['country']);
                }
                $output .= '</div>';
            }
            $output .= '</div>';
            break;

        case 'booking/icons-list':
            $items = $data['items'] ?? [];
            
            if (empty($items)) {
                return '';
            }

            $label = $data['label'] ?? '';
            $output = '<div class="ml-[25px] flex items-center">';
            
            if (!empty($label)) {
                $output .= '<label class="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">';
                $output .= esc_html($label) . ':';
                $output .= '</label>';
            }
            
            $output .= '<ul class="flex flex-col gap-10p">';

            foreach ($items as $item) {
                $output .= '<li class="flex items-center gap-x-5 p-4">';
                $output .= '<div class="w-50p h-50p flex items-center justify-center rounded-full bg-white border border-th-grey">';
                if (!empty($item['icon'])) {
                    $output .= '<div style="--mask-img: url(\'' . esc_url($item['icon']) . '\');" class="w-25p h-25p cs-mask bg-black"></div>';
                }
                $output .= '</div>';
                $output .= '<div class="text-th-grey font-medium text-base">';
                $output .= esc_html($item['label'] ?? '');
                $output .= '</div>';
                $output .= '</li>';
            }

            $output .= '</ul>';
            $output .= '</div>';
            return $output;

        case 'booking/product-list':
        case 'booking/product-grid':
            $products = $data['products'] ?? [];
            if (empty($products)) break;

            $output = '<div class="mt-4 ml-25px mb-25px">';
            $output .= '<ul class="flex flex-row flex-wrap gap-2">';
            foreach ($products as $product) {
                $output .= '<li class="flex items-start gap-x-2 p-2">';

                $output .= '<span class="w-50p h-50p rounded-full" style="width:50px; height:50px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">';
                $output .= '<img src="' . esc_url($product['image']) . '" ';
                $output .= 'width="50" height="50" ';
                $output .= 'style="display:block; width:50px; height:50px; border-radius:50%; object-fit:cover; border:0;" ';
                $output .= 'alt="' . esc_attr($product['name'] ?? '') . '" />';
                $output .= '</span>';

                $output .= '<div class="text-th-grey font-medium text-base" style="color:#6B7280; font-weight:500; font-size:1rem;">';
                $output .= esc_html($product['name'] ?? '');
                $output .= '</div>';
                $output .= '</li>';
            }
            $output .= '</ul>';
            $output .= '</div>';
            return $output;

        default:
            // Generic fallback for unknown block types
            if (empty($value)) break;

            $output .= '<label class="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">';
            $output .= esc_html($label) . ':';
            $output .= '</label>';
            $output .= '<span class="text-base text-th-grey font-medium align-middle">';
            if (is_array($value)) {
                $output .= '<pre class="text-xs">' . esc_html(print_r($value, true)) . '</pre>';
            } else {
                $output .= esc_html($value);
            }
            $output .= '</span>';
            break;
    }

    $output .= '</div>';

    return $output;
}
