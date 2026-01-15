<?php

namespace NBH\Includes\SmartCodes;

use NBH\Includes\Traits\NotificationTrait;
use FluentCrm\App\Models\FunnelSubscriber;
use Granam\CzechVocative\CzechName;

/**
 * Donor smart codes for FluentCRM.
 */
class DonorSmartCode
{
    use NotificationTrait;

    // Default fallback values
    private const DEFAULT_GREETING = 'Milý/á dárce/dárkyně,';
    private const DEFAULT_GREETING_HERO = 'Milý/á hrdino/hrdinko naší mise,';
    private const DEFAULT_GREETING_FORMAL = 'Vážený/á dárce/dárkyně,';
    /**
     * Get the smart code group key.
     *
     * @return string
     */
    public function get_group_key(): string
    {
        return 'donor';
    }

    /**
     * Get the smart code group title.
     *
     * @return string
     */
    public function get_group_title(): string
    {
        return 'Donor';
    }

    /**
     * Get all smart codes for this group.
     *
     * @return array
     */
    public function get_smart_codes(): array
    {
        return [
            '{{donor.addressing}}' => __('Addressing (Milý Petře,)', 'nbh'),
            '{{donor.hero}}' => __('Hero (Milý Petře, hrdino naší mise,)', 'nbh'),
            '{{donor.greeting}}' => __('Time-based (Dobré ráno Petře,)', 'nbh'),
            '{{donor.formal_name}}' => __('Formal (Vážený pane Novák,)', 'nbh'),
            '{{donor.vokativ}}' => __('Salutation (Petře,)', 'nbh'),
            '{{donor.first_name}}' => __('Jméno dárce (Petr)', 'nbh'),
            '{{donor.last_name}}' => __('Příjmení dárce (Novák)', 'nbh'),
            '{{donor.full_name}}' => __('Celé jméno dárce (Petr Novák)', 'nbh'),
            '{{donor.last_donation_amount}}' => __('Částka posledního daru (850 Kč)', 'nbh'),
            '{{donor.last_donation_year}}' => __('Rok posledního daru (2024)', 'nbh')
        ];
    }

    /**
     * Register this smart code group with FluentCRM.
     *
     * @return void
     */
    public function init(): void
    {
        // Register smart code group
        add_filter('fluent_crm/smartcode_groups', [$this, 'pushSmartCodes']);
        
        // Register callback for parsing
        add_filter(
            'fluent_crm/smartcode_group_callback_' . $this->get_group_key(),
            [$this, 'parse_smart_code'],
            10,
            4
        );
    }

    /**
     * Push smart codes to FluentCRM.
     *
     * @param array $codes Existing smart codes
     * @return array Modified smart codes array
     */
    public function pushSmartCodes(array $codes): array
    {
        $codes[] = [
            'key'        => $this->get_group_key(),
            'title'      => $this->get_group_title(),
            'shortcodes' => $this->get_smart_codes()
        ];

        return $codes;
    }

    /**
     * Parse smart code value for donor group.
     *
     * @param string $code Smart code to parse
     * @param string $valueKey Key to retrieve
     * @param mixed $defaultValue Default value if key not found
     * @param object $subscriber FluentCRM subscriber object
     * @return mixed Parsed value or default value
     */
    public function parse_smart_code(string $code, string $valueKey, $defaultValue, object $subscriber)
    {

        return $this->safe_execute(function() use ($valueKey, $subscriber, $defaultValue) {
            $order_id = null;
            $order = null;
            
            // Try to get order if we have subscriber
            if ($subscriber && $subscriber->email) {
                $order_id = $this->get_order_id_from_subscriber($subscriber);
                $order = wc_get_order($order_id);
            }

            $result = $this->get_donor_value($valueKey, $order, $subscriber, $defaultValue);
            
            return $result;
        }, self::DEFAULT_GREETING);
    }

    /**
     * Get donor value based on key.
     *
     * @param string $valueKey
     * @param object $order WooCommerce order
     * @param object $subscriber FluentCRM subscriber
     * @param mixed $defaultValue
     * @return mixed
     */
    private function get_donor_value(string $valueKey, object $order, object $subscriber, $defaultValue)
    {
        
        
        switch ($valueKey) {
            case 'addressing':
                return $this->get_addressing_for_order($order);
            case 'hero':
                
                return $this->get_hero_for_order($order);
            case 'greeting':
                return $this->get_greeting_for_order($order);
            case 'formal_name':
                return $this->get_formal_name_for_order($order);
            case 'vokativ':
                return $this->get_vokativ_for_order($order);
            case 'first_name':
                return $this->get_first_name_for_order($order);
            case 'last_name':
                return $this->get_last_name_for_order($order);
            case 'full_name':
                return $this->get_full_name_for_order($order);
            case 'last_donation_amount':
                return $this->get_last_donation_amount($subscriber);
            case 'last_donation_year':
                return $this->get_last_donation_year($subscriber);
            default:
                return self::DEFAULT_GREETING;
        }
    }

    /**
     * Get order ID from FluentCRM subscriber context.
     *
     * @param object $subscriber FluentCRM subscriber object
     * @return int|null Order ID or null if not found
     */
    private function get_order_id_from_subscriber(object $subscriber): ?int
    {
        $order_id = null;
        
        $funnelSub = FunnelSubscriber::where('subscriber_id', $subscriber->id)
            ->whereNotNull('source_ref_id')
            ->orderBy('created_at', 'DESC')
            ->first();
        if ($funnelSub) {
            $order_id = $funnelSub->source_ref_id ?? null;
        } else {
            
            return null;
        }

        if (!is_numeric($order_id)) {
            
            return null;
        }
        
        // For WooCommerce orders, we don't check get_post() as orders are custom post types
        $order = wc_get_order($order_id);
        if (!$order) {
            
            return null;
        }

        return (int) $order_id;
    }

    /**
     * Get addressing for contact from order (Milý Petře,).
     *
     * @param object $order WooCommerce order
     * @return string Addressing text
     */
    private function get_addressing_for_order($order): string
    {
        if (!$order) {
            return self::DEFAULT_GREETING;
        }

        $first_name = $order->get_billing_first_name();
        $sex = $order->get_meta('_billing_sex', true);

        if (!$first_name && !$sex) {
            return self::DEFAULT_GREETING;
        }

        // Determine gender from sex or name
        $gender = null;
        if (in_array($sex, ['ms', 'mrs', 'female', 'paní'])) {
            $gender = 'female';
        } elseif (in_array($sex, ['mr', 'male', 'pan'])) {
            $gender = 'male';
        } elseif ($first_name) {
            $gender = $this->determine_gender($first_name);
        }

        // Set prefix based on gender
        if ($gender === 'female') {
            $prefix = 'Milá';
            $fallback_target = 'dárkyně';
        } elseif ($gender === 'male') {
            $prefix = 'Milý';
            $fallback_target = 'dárče';
        } else {
            // Fallback za fallback: pokud se nepodaří určit pohlaví
            return self::DEFAULT_GREETING;
        }

        // If we have first name, try to get vocative
        if ($first_name) {
            try {
                $czechName = new CzechName();
                $vokativ = $czechName->vocative($first_name);
                return implode(' ', [$prefix, $vokativ]) . ',';
            } catch (\Exception $e) {
                // Fall through to use fallback target
            }
        }

        // Use fallback target (dárče/dárkyně) if no name or vocative failed
        return implode(' ', [$prefix, $fallback_target]) . ',';
    }

    /**
     * Get hero addressing for contact from order (Milý Petře, hrdino naší mise,).
     *
     * @param object $order WooCommerce order
     * @return string Hero addressing text
     */
    private function get_hero_for_order($order): string
    {
        
        
        if (!$order) {
            return self::DEFAULT_GREETING_HERO;
        }

        $first_name = $order->get_billing_first_name();
        $sex = $order->get_meta('_billing_sex', true);
        
        

        if (!$first_name && !$sex) {
            return self::DEFAULT_GREETING_HERO;
        }

        // Determine gender from sex or name
        $gender = null;
        if (in_array($sex, ['ms', 'mrs', 'female'])) {
            $gender = 'female';
            
        } elseif (in_array($sex, ['mr', 'male'])) {
            $gender = 'male';
            
        } elseif ($first_name) {
            $gender = $this->determine_gender($first_name);
            
        }
        
        

        // Set prefix and hero based on gender
        if ($gender === 'female') {
            $prefix = 'Milá';
            $hero = 'hrdinko';
            $fallback_target = 'dárkyně';
        } elseif ($gender === 'male') {
            $prefix = 'Milý';
            $hero = 'hrdino';
            $fallback_target = 'dárče';
        } else {
            // Fallback za fallback: pokud se nepodaří určit pohlaví
            return self::DEFAULT_GREETING_HERO;
        }

        // If we have first name, try to get vocative using CzechName library
        if ($first_name) {
            try {
                $czechName = new CzechName();
                $vokativ = $czechName->vocative($first_name);
                return implode(' ', [$prefix, $vokativ]) . ', ' . $hero . ' naší mise,';
            } catch (\Throwable $e) {
                // Fall through to use fallback target
            }
        }

        // Use fallback target (hero only) if no name or vocative failed
        $fallback_result = implode(' ', [$prefix, $hero]) . ' naší mise,';
        
        return $fallback_result;
    }

    /**
     * Get time-based greeting for contact from order (Dobré ráno Petře,).
     *
     * @param object $order WooCommerce order
     * @return string Time-based greeting
     */
    private function get_greeting_for_order($order): string
    {
        // Determine greeting based on time of day
        $hour = (int) current_time('H');
        if ($hour < 12) {
            $greeting = 'Dobré ráno';
        } elseif ($hour < 18) {
            $greeting = 'Dobrý den';
        } else {
            $greeting = 'Dobrý večer';
        }

        // If no order, return time-based greeting without name
        if (!$order) {
            return $greeting . ',';
        }

        $first_name = $order->get_billing_first_name();

        // If no first name, return time-based greeting without name
        if (!$first_name) {
            return $greeting . ',';
        }

        try {
            $czechName = new CzechName();
            $vokativ = $czechName->vocative($first_name);
            return $greeting . ' ' . $vokativ . ',';
        } catch (\Exception $e) {
            // If vocative fails, return time-based greeting without name
            return $greeting . ',';
        }
    }

    /**
     * Get formal name for contact from order (Vážený pane Novák,).
     *
     * @param object $order WooCommerce order
     * @return string Formal name
     */
    private function get_formal_name_for_order($order): string
    {
        if (!$order) {
            return self::DEFAULT_GREETING_FORMAL;
        }

        $first_name = $order->get_billing_first_name();
        $last_name = $order->get_billing_last_name();
        $sex = $order->get_meta('_billing_sex', true);

        if (!$first_name && !$last_name && !$sex) {
            return self::DEFAULT_GREETING_FORMAL;
        }

        // Determine gender from sex or name
        $gender = null;
        if (in_array($sex, ['ms', 'mrs', 'female', 'paní'])) {
            $gender = 'female';
        } elseif (in_array($sex, ['mr', 'male', 'pan'])) {
            $gender = 'male';
        } elseif ($first_name) {
            $gender = $this->determine_gender($first_name);
        }

        // Set title based on gender
        if ($gender === 'female') {
            $title = 'Vážená paní';
            $fallback_target = 'dárkyně';
        } elseif ($gender === 'male') {
            $title = 'Vážený pane';
            $fallback_target = 'dárče';
        } else {
            // Fallback za fallback: pokud se nepodaří určit pohlaví
            return self::DEFAULT_GREETING_FORMAL;
        }

        // If we have last name, use it with title
        if ($last_name) {
            try {
                $czechName = new CzechName();
                $last_name_vocative = $czechName->vocative($last_name, ($gender === 'female'), true);
                return implode(' ', [$title, $last_name_vocative]) . ',';
            } catch (\Exception $e) {
                // Fallback to generic addressing if vocative fails
                $formal_prefix = ($gender === 'female') ? 'Vážená' : 'Vážený';
                return implode(' ', [$formal_prefix, $fallback_target]) . ',';
            }
        }

        // Use fallback target (dárče/dárkyně) if no last name
        $formal_prefix = ($gender === 'female') ? 'Vážená' : 'Vážený';
        return implode(' ', [$formal_prefix, $fallback_target]) . ',';
    }

    /**
     * Get vocative for contact from order (Petře,).
     *
     * @param object $order WooCommerce order
     * @return string Vocative form
     */
    private function get_vokativ_for_order($order): string
    {
        if (!$order) {
            return self::DEFAULT_GREETING;
        }

        $first_name = $order->get_billing_first_name();

        if (!$first_name) {
            return self::DEFAULT_GREETING;
        }

        try {
            $czechName = new CzechName();
            return $czechName->vocative($first_name) . ',';
        } catch (\Exception $e) {
            return self::DEFAULT_GREETING;
        }
    }

    /**
     * Determine gender from Czech first name using CzechName library.
     *
     * @param string $first_name First name
     * @return string 'male', 'female', or 'unknown'
     */
    private function determine_gender(string $first_name): string
    {
        if (!$first_name) {
            return 'unknown';
        }

        try {
            $czechName = new CzechName();
            $is_male = $czechName->isMale($first_name);
            return $is_male ? 'male' : 'female';
        } catch (\Exception $e) {
            // Fallback to simple detection if CzechName fails
        $first_name = strtolower(trim($first_name));
        
        // Common Czech female name endings
        $female_endings = ['a', 'e', 'ie'];
        
        // Check if name ends with typical female endings
        foreach ($female_endings as $ending) {
            if (substr($first_name, -strlen($ending)) === $ending) {
                return 'female';
            }
        }
        
        // Most other Czech names are male
        return 'male';
        }
    }

    /**
     * Safe execution wrapper for smart code parsing.
     *
     * @param callable $callback
     * @param mixed $defaultValue
     * @return mixed
     */
    private function safe_execute(callable $callback, $defaultValue)
    {
        try {
            return $callback();
        } catch (\Throwable $th) {
            $this->handle_error($th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'smart_code_class' => get_class($this)
            ]);
            return $defaultValue;
        }
    }

    /**
     * Get first name from order (no declension)
     *
     * @param object|null $order WooCommerce order
     * @return string First name or empty string
     */
    private function get_first_name_for_order($order): string
    {
        if (!$order) {
            return '';
        }
        
        return $order->get_billing_first_name() ?: '';
    }

    /**
     * Get last name from order (no declension)
     *
     * @param object|null $order WooCommerce order
     * @return string Last name or empty string
     */
    private function get_last_name_for_order($order): string
    {
        if (!$order) {
            return '';
        }
        
        return $order->get_billing_last_name() ?: '';
    }

    /**
     * Get full name from order (no declension)
     *
     * @param object|null $order WooCommerce order
     * @return string Full name or empty string
     */
    private function get_full_name_for_order($order): string
    {
        if (!$order) {
            return '';
        }
        
        $first_name = $order->get_billing_first_name();
        $last_name = $order->get_billing_last_name();
        
        if ($first_name && $last_name) {
            return $first_name . ' ' . $last_name;
        } elseif ($first_name) {
            return $first_name;
        } elseif ($last_name) {
            return $last_name;
        }
        
        return '';
    }

    /**
     * Get last donation amount for subscriber
     *
     * @param object $subscriber FluentCRM subscriber
     * @return string Formatted amount (e.g., "850 Kč") or empty string
     */
    private function get_last_donation_amount($subscriber): string
    {
        if (!$subscriber || !$subscriber->email) {
            return '';
        }

        $last_order = $this->get_last_order_by_email($subscriber->email);
        
        if (!$last_order) {
            return '';
        }

        // Get order_totalprice meta (from production)
        $total_price = $last_order->get_meta('order_totalprice', true);
        
        if (empty($total_price)) {
            // Fallback to WooCommerce total
            $total_price = $last_order->get_total();
        }

        if (empty($total_price) || $total_price == 0) {
            return '';
        }

        // Format as Czech currency
        return number_format((float) $total_price, 0, ',', ' ') . ' Kč';
    }

    /**
     * Get last donation year for subscriber
     *
     * @param object $subscriber FluentCRM subscriber
     * @return string Year (e.g., "2024") or empty string
     */
    private function get_last_donation_year($subscriber): string
    {
        if (!$subscriber || !$subscriber->email) {
            return '';
        }

        $last_order = $this->get_last_order_by_email($subscriber->email);
        
        if (!$last_order) {
            return '';
        }

        $date_created = $last_order->get_date_created();
        
        if (!$date_created) {
            return '';
        }

        return $date_created->format('Y');
    }

    /**
     * Get last WooCommerce order by email
     *
     * @param string $email Customer email
     * @return \WC_Order|null Last order or null
     */
    private function get_last_order_by_email(string $email): ?\WC_Order
    {
        // Get orders by email, sorted by date descending
        $orders = wc_get_orders([
            'billing_email' => $email,
            'limit' => 1,
            'orderby' => 'date',
            'order' => 'DESC',
            'return' => 'objects'
        ]);

        if (empty($orders)) {
            return null;
        }

        return $orders[0];
    }
}
