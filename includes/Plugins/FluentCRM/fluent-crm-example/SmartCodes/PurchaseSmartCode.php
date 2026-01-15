<?php

namespace NBH\Includes\SmartCodes;

use NBH\Includes\Traits\NotificationTrait;
use FluentCrm\App\Models\FunnelSubscriber;

/**
 * Purchase smart codes for FluentCRM.
 */
class PurchaseSmartCode
{
    use NotificationTrait;
    /**
     * Get the smart code group key.
     *
     * @return string
     */
    public function get_group_key(): string
    {
        return 'purchase';
    }

    /**
     * Get the smart code group title.
     *
     * @return string
     */
    public function get_group_title(): string
    {
        return 'Purchase';
    }

    /**
     * Get all smart codes for this group.
     *
     * @return array
     */
    public function get_smart_codes(): array
    {
        return [
            '{{purchase.billing_email}}' => __('Billing Email', 'nbh'),
            '##purchase.certificate_url##' => __('Certificate URL', 'nbh')
        ];
    }

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
     * Parse smart code value for purchase group.
     *
     * @param string $code Smart code to parse
     * @param string $valueKey Key to retrieve
     * @param mixed $defaultValue Default value if key not found
     * @param object $subscriber FluentCRM subscriber object
     * @return mixed Parsed value or default value
     */
    public function parse_smart_code(string $code, string $valueKey, $defaultValue, object $subscriber)
    {
        $result = $this->safe_execute(function() use ($valueKey, $subscriber, $defaultValue) {
            return $this->get_purchase_value($valueKey, $subscriber, $defaultValue);
        }, $defaultValue);
        
        return $result;
    }

    /**
     * Get purchase value based on key.
     *
     * @param string $valueKey
     * @param object $subscriber
     * @param mixed $defaultValue
     * @return mixed
     */
    private function get_purchase_value(string $valueKey, object $subscriber, $defaultValue)
    {
        switch ($valueKey) {
            case 'billing_email':
                return $this->get_billing_email_for_subscriber($subscriber);
            case 'certificate_url':
                return $this->get_certificate_url_for_subscriber($subscriber);
            default:
                return $defaultValue;
        }
    }

    /**
     * Get billing email for subscriber.
     *
     * @param object $subscriber FluentCRM subscriber
     * @return string Billing email
     */
    private function get_billing_email_for_subscriber($subscriber): string
    {
        // Try to get from user meta first
        if (isset($subscriber->user_id) && $subscriber->user_id) {
            $billing_email = get_user_meta($subscriber->user_id, 'billing_email', true);
            if ($billing_email) {
                return $billing_email;
            }
        }

        // Fallback to subscriber email
        return $subscriber->email ?? '';
    }

    /**
     * Get certificate URL for subscriber.
     *
     * @param object $subscriber FluentCRM subscriber
     * @return string Certificate URL
     */
    private function get_certificate_url_for_subscriber($subscriber): string
    {
        // Get order from funnel subscriber
        $funnel_subscriber = FunnelSubscriber::where('subscriber_id', $subscriber->id)
            ->whereNotNull('source_ref_id')
            ->orderBy('created_at', 'DESC')
            ->first();
        
        if (!$funnel_subscriber || !$funnel_subscriber->source_ref_id) {
            return '';
        }

        $order_id = $funnel_subscriber->source_ref_id;
        
        $order = wc_get_order($order_id);
        if (!$order) {
            return '';
        }

        // Get certificate URL from order meta
        $certificate_url = $order->get_meta('_certificate_url', true);
        
        // Handle if it's an ACF Link field (array with 'url', 'title', 'target')
        if (is_array($certificate_url) && !empty($certificate_url['url'])) {
            $certificate_url = $certificate_url['url'];
        }
        // Handle if it's a simple array
        elseif (is_array($certificate_url) && !empty($certificate_url[0])) {
            $certificate_url = $certificate_url[0];
        }
        
        if (!empty($certificate_url) && is_string($certificate_url)) {
            return $certificate_url;
        }

        // Generate certificate URL if not exists
        $certificate_url = home_url('/certifikat/?order_id=' . $order_id);
        
        $order->update_meta_data('_certificate_url', $certificate_url);
        $order->save_meta_data();

        return $certificate_url;
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
