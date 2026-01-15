<?php

namespace NBH\Includes\SmartCodes;

use NBH\Includes\Traits\NotificationTrait;
use FluentCrm\App\Models\FunnelSubscriber;

/**
 * Hospital smart codes for FluentCRM.
 */
class HospitalSmartCode
{
    use NotificationTrait;

    /**
     * Initialize this smart code group with FluentCRM.
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
     * Get the smart code group key.
     *
     * @return string
     */
    public function get_group_key(): string
    {
        return 'hospital';
    }

    /**
     * Get the smart code group title.
     *
     * @return string
     */
    public function get_group_title(): string
    {
        return __('Hospital', 'nbh');
    }

    /**
     * Get the smart codes array.
     *
     * @return array
     */
    public function get_smart_codes(): array
    {
        return [
            '{{hospital.name}}' => __('Hospital Name', 'nbh'),
            '{{hospital.email}}' => __('Hospital Email', 'nbh'),
            '##hospital.link##' => __('Hospital Link', 'nbh'),
        ];
    }

    /**
     * Parse smart code value for hospital group.
     *
     * @param string $code Smart code to parse
     * @param string $valueKey Key to retrieve
     * @param mixed $defaultValue Default value if key not found
     * @param object $subscriber FluentCRM subscriber object
     * @return mixed Parsed value or default value
     */
    public function parse_smart_code(string $code, string $valueKey, $defaultValue, object $subscriber)
    {
        $hospital_id = $this->get_hospital_id_from_subscriber($subscriber);
        
        if (!$hospital_id) {
            return $defaultValue;
        }
        
        $result = $this->safe_execute(function() use ($hospital_id, $valueKey, $defaultValue) {
            return $this->get_hospital_value($hospital_id, $valueKey, $defaultValue);
        }, $defaultValue);
        
        return $result;
    }

    /**
     * Get hospital value based on key.
     *
     * @param int $hospital_id
     * @param string $valueKey
     * @param mixed $defaultValue
     * @return mixed
     */
    private function get_hospital_value(int $hospital_id, string $valueKey, $defaultValue)
    {
        switch ($valueKey) {
            case 'name':
                return esc_html(get_the_title($hospital_id));
            case 'email':
                if (!$hospital_id || !get_post($hospital_id)) {
                    return '';
                }
                $hospital_email = get_field('hospital_email', $hospital_id);
                return !empty($hospital_email) ? sanitize_email($hospital_email) : '';
            case 'link':
                return esc_url(get_permalink($hospital_id));
            default:
                return $defaultValue;
        }
    }

    /**
     * Get hospital ID from FluentCRM subscriber context.
     *
     * @param object $subscriber FluentCRM subscriber object
     * @return int|null Hospital ID or null if not found
     */
    private function get_hospital_id_from_subscriber(object $subscriber): ?int
    {
        $hospital_id = null;
        
        $funnelSub = FunnelSubscriber::where('subscriber_id', $subscriber->id)
            ->whereNotNull('source_ref_id')
            ->orderBy('created_at', 'DESC')
            ->first();
        if ($funnelSub) {
            $hospital_id = $funnelSub->source_ref_id ?? null;
        } else {
            return null;
        }

        if (!is_numeric($hospital_id)) {
            return null;
        }
        
        $post = get_post($hospital_id);
        if (!$post) {
            return null;
        }

        // Check if source_ref_id is an order - if yes, get hospital_id from order products
        if ($post->post_type === 'shop_order' || strpos($post->post_type, 'shop_order') !== false) {
            $order = wc_get_order($hospital_id);
            if (!$order) {
                return null;
            }
            
            // Get hospital_id from first product in order
            foreach ($order->get_items() as $item) {
                $product_id = $item->get_product_id();
                $item_hospital_id = wc_get_order_item_meta($item->get_id(), 'hospital_id', true);
                
                if ($item_hospital_id && is_numeric($item_hospital_id)) {
                    // Verify it's a hospital post
                    $hospital_post = get_post($item_hospital_id);
                    if ($hospital_post && $hospital_post->post_type === 'hospital') {
                        return (int) $item_hospital_id;
                    }
                }
            }
            
            return null;
        }
        
        // If it's already a hospital post, return it
        if ($post->post_type === 'hospital') {
            return (int) $hospital_id;
        }
        
        return null;
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
}
