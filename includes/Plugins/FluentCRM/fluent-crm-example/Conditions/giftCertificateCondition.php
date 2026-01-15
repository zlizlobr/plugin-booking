<?php

namespace NBH\Includes\Conditions;

/**
 * Gift Certificate Condition for FluentCRM
 * 
 * Checks if user selected "Send certificate directly to recipient" 
 * and provided gift email during WooCommerce checkout.
 */
class giftCertificateCondition
{
    public function __construct()
    {
        $this->init();
    }
    
    /**
     * Initialize the condition
     */
    public function init()
    {
        // Register this condition to WooCommerce order conditions (higher priority than FluentCampaign Pro)
        add_filter('fluent_crm/woo_order_conditions', array($this, 'addToWooOrderConditions'), 20, 1);
        add_filter('fluentcrm_automation_conditions_assess_woo_order', array($this, 'assessWooOrderCondition'), 10, 5);
    }

    /**
     * Add gift certificate condition to WooCommerce order conditions
     *
     * @param array $conditions Existing order conditions
     * @return array Updated conditions
     */
    public function addToWooOrderConditions($conditions)
    {
        $conditions[] = [
            'value'             => 'gift_certificate_selected',
            'label'             => __('Gift Certificate Selected', 'nbh'),
            'type'              => 'single_assert_option',
            'options'           => [
                'yes' => __('Yes', 'nbh'),
                'no'  => __('No', 'nbh')
            ],
            'disabled'          => false,
            'value_description' => __('Check if customer selected to send certificate directly to recipient', 'nbh')
        ];
        
        return $conditions;
    }

    /**
     * Assess WooCommerce order condition
     *
     * @param bool $result Current result
     * @param array $conditions Conditions to assess
     * @param object $subscriber FluentCRM subscriber
     * @param object $sequence Sequence object
     * @param int $funnelSubscriberId Funnel subscriber ID
     * @return bool
     */
    public function assessWooOrderCondition($result, $conditions, $subscriber, $sequence = null, $funnelSubscriberId = null)
    {
        foreach ($conditions as $condition) {
            if ($condition['data_key'] === 'gift_certificate_selected') {
                $expectedValue = $condition['data_value'];
                $conditionResult = $this->assessOrderCondition($subscriber, $expectedValue, $funnelSubscriberId);
                
                // Return the actual condition result, not just false on failure
                $result = $conditionResult;
            }
        }
        
        return $result;
    }



    /**
     * Assess order condition based on WooCommerce order data
     *
     * @param mixed $subscriber FluentCRM subscriber
     * @param string $expectedValue Expected value ('yes' or 'no')
     * @param mixed $funnel_subscriber_id Funnel subscriber ID
     * @return bool
     */
    public function assessOrderCondition($subscriber, $expectedValue, $funnel_subscriber_id)
    {
        // Try to get order from funnel subscriber source_ref_id first
        $order = $this->getOrderFromFunnelSubscriber($funnel_subscriber_id);
        
        // If no order from funnel subscriber, try the old way
        if (!$order) {
            $order = $this->getLatestOrderForSubscriber($subscriber);
        }
        
        if (!$order) {
            return $expectedValue === 'no';
        }

        // Check if gift certificate was selected and email provided
        $giftSelfsend = $order->get_meta('_gift_selfsend', true);
        $giftEmail = $order->get_meta('_gift_email', true);
        
        $hasGiftCertificate = ($giftSelfsend === '1' && !empty($giftEmail) && is_email($giftEmail));
        
        $result = false;
        if ($expectedValue === 'yes') {
            $result = $hasGiftCertificate;
        } else {
            $result = !$hasGiftCertificate;
        }
        
        return $result;
    }

    /**
     * Get the latest WooCommerce order for a subscriber
     *
     * @param object $subscriber FluentCRM subscriber
     * @return \WC_Order|false
     */
    private function getLatestOrderForSubscriber($subscriber)
    {
        
        if (!$subscriber || !$subscriber->email) {
            return false;
        }


        // First try to get orders by billing email
        $orders = wc_get_orders([
            'billing_email' => $subscriber->email,
            'limit'         => 1,
            'orderby'       => 'date',
            'order'         => 'DESC',
            'status'        => ['completed', 'processing']
        ]);

        // If no orders found by email and we have user_id, try by customer_id
        if (empty($orders) && !empty($subscriber->user_id)) {
            
            $orders = wc_get_orders([
                'customer_id' => $subscriber->user_id,
                'limit'       => 1,
                'orderby'     => 'date',
                'order'       => 'DESC',
                'status'      => ['completed', 'processing']
            ]);
        }

        
        if (!empty($orders)) {
            $order = $orders[0];
            return $order;
        }
        
        return false;
    }

    /**
     * Get order from funnel subscriber source_ref_id
     *
     * @param int $funnel_subscriber_id Funnel subscriber ID
     * @return \WC_Order|false
     */
    private function getOrderFromFunnelSubscriber($funnel_subscriber_id)
    {
        
        if (!$funnel_subscriber_id) {
            return false;
        }

        // Get funnel subscriber from FluentCRM
        if (!class_exists('\FluentCrm\App\Models\FunnelSubscriber')) {
            return false;
        }

        $funnelSubscriber = \FluentCrm\App\Models\FunnelSubscriber::find($funnel_subscriber_id);
        
        if (!$funnelSubscriber) {
            return false;
        }


        $source_ref_id = $funnelSubscriber->source_ref_id;
        
        if (!$source_ref_id) {
            return false;
        }


        // Get WooCommerce order
        $order = wc_get_order($source_ref_id);
        
        if (!$order) {
            return false;
        }

        return $order;
    }
}
