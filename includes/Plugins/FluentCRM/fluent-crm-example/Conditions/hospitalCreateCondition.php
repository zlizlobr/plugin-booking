<?php

namespace NBH\Includes\Conditions;

use FluentCrm\App\Services\Libs\ConditionAssessor;
use FluentCrm\App\Models\FunnelSubscriber;

/**
 * @version 1.0.0
 * @author Radek Chaloupka
 * Handles the automation conditions for hospital creation.
 * Integrates with FluentCRM to assess hospital creation conditions in automation funnels.
 */
class hospitalCreateCondition
{
    private const GROUP_KEY = 'hospital';

    /**
     * Constructor
     * 
     * Sets up the condition filters for hospital creation assessment.
     */
    public function __construct()
    {
        add_filter('nbh_hospital_conditions', array($this, 'add_hospital_conditions'), 10, 2);
        add_filter('fluentcrm_automation_conditions_assess_' . self::GROUP_KEY, array($this, 'assess_automation_conditions'), 10, 5);
    }

    /**
     * Add hospital conditions to the plugin.
     *
     * @param array $children
     * @param object $funnel
     * @return array
     */
    public function add_hospital_conditions($children, $funnel)
    {

        // Only available for hospital create trigger
        if ($funnel->trigger_name !== 'nbh_hospital_create_update') {
            return $children;
        }


        $children[] = [
            'value'             => 'has_orders',
            'label'             => __('Has orders', 'nbh'),
            'type'              => 'single_assert_option',
            'options'           => [
                'yes' => __('Yes', 'nbh'),
                'no'  => __('No', 'nbh')
            ],
            'is_multiple'       => false,
            'disabled'          => false,
            'help'              => __('Check if the hospital has any orders (count > 0)', 'nbh'),
            'value_description' => __('This will check if the current hospital has any completed orders', 'nbh')
        ];

        $children[] = [
            'value'             => 'current_user_has_orders',
            'label'             => __('User has hospital orders', 'nbh'),
            'type'              => 'single_assert_option',
            'options'           => [
                'yes' => __('Yes', 'nbh'),
                'no'  => __('No', 'nbh')
            ],
            'is_multiple'       => false,
            'disabled'          => false,
            'help'              => __('Check if the current user has any orders from this hospital', 'nbh'),
            'value_description' => __('This will check if the current contact has purchased from the current hospital', 'nbh')
        ];

        
        return $children;
    }

    /**
     * Assess automation conditions.
     *
     * @param bool $result
     * @param array $conditions
     * @param object $subscriber
     * @param object $sequence
     * @param int $funnelSubscriberId
     * @return bool
     */
    public function assess_automation_conditions($result, $conditions, $subscriber, $sequence = null, $funnelSubscriberId = null)
    {

        $hospital_id = null;
        if ($funnelSubscriberId) {
            $funnelSub = FunnelSubscriber::find($funnelSubscriberId);
            if ($funnelSub) {
                $hospital_id = $funnelSub->source_ref_id ?? null;
            } else {
            }
        } elseif ($subscriber->funnel_subscriber_id) {
            $funnelSub = FunnelSubscriber::find($subscriber->funnel_subscriber_id);
            if ($funnelSub) {
                $hospital_id = $funnelSub->source_ref_id ?? null;
            } else {
            }
        } else {
        }


        if (!is_numeric($hospital_id) || !get_post($hospital_id)) {
            return $result;
        }

        $hospital_post = get_post($hospital_id);

        // Prepare input values for condition assessment
        $input_values = [];


        foreach ($conditions as $index => $condition) {
            $data_key = $condition['data_key'];
            $operator = $condition['operator'];
            $data_value = $condition['data_value'];


            switch ($data_key) {
                case 'has_orders':
                    $assessed_value = $this->assess_hospital_has_orders($hospital_id);
                    $input_values['has_orders'] = $assessed_value;
                    break;

                case 'current_user_has_orders':
                    $assessed_value = $this->assess_user_has_hospital_orders($hospital_id, $subscriber);
                    $input_values['current_user_has_orders'] = $assessed_value;
                    break;

                default:
                    break;
            }
        }


        // Evaluate conditions using ConditionAssessor
        $final_result = ConditionAssessor::matchAllConditions($conditions, $input_values);

        return $final_result;
    }

    /**
     * Assess if hospital has orders
     *
     * @param int $hospital_id
     * @return string
     */
    private function assess_hospital_has_orders($hospital_id)
    {
        
        try {
            // Use existing function to get hospital orders
            if (function_exists('adev_nbh_get_order_items_by_hospital_id')) {
                $order_items = adev_nbh_get_order_items_by_hospital_id($hospital_id);
                $result = !empty($order_items) ? 'yes' : 'no';
                return $result;
            } else {
            }
            return 'no';
        } catch (\Exception $e) {
            return 'no';
        }
    }

    /**
     * Assess if current user has orders from hospital
     *
     * @param int $hospital_id
     * @param object $subscriber
     * @return string
     */
    private function assess_user_has_hospital_orders($hospital_id, $subscriber)
    {

        // Get hospital creator email
        $hospital_email = get_field('hospital_email', $hospital_id);
        if (!$hospital_email) {
            $hospital_email = get_post_meta($hospital_id, 'hospital_email', true);
        }
        
        
        if (!$hospital_email) {
            return 'no';
        }

        try {
            // Get all orders by hospital creator email (not subscriber email!)
            if (!function_exists('wc_get_orders')) {
                return 'no';
            }

            
            // Search orders by billing email AND by hospital creator email meta
            $user_orders_billing = wc_get_orders([
                'billing_email' => $hospital_email,
                'limit' => -1,
                'status' => ['completed']
            ]);
            
            $user_orders_meta = wc_get_orders([
                'meta_query' => [
                    [
                        'key' => '_hospital_creator_email',
                        'value' => $hospital_email,
                        'compare' => '='
                    ]
                ],
                'limit' => -1,
                'status' => ['completed']
            ]);
            
            // Merge both result sets
            $all_orders = array_merge($user_orders_billing, $user_orders_meta);
            // Remove duplicates by order ID
            $unique_orders = [];
            foreach ($all_orders as $order) {
                $unique_orders[$order->get_id()] = $order;
            }
            $user_orders = array_values($unique_orders);


            $has_hospital_orders = false;
            
            // Check each order for items with this hospital_id
            foreach ($user_orders as $order) {
                
                foreach ($order->get_items() as $item) {
                    $item_hospital_id = $item->get_meta('hospital_id', true);
                    
                    if ((int)$item_hospital_id === (int)$hospital_id) {
                        $has_hospital_orders = true;
                        break 2; // Break both loops
                    }
                }
            }

            $result = $has_hospital_orders ? 'yes' : 'no';
            return $result;

        } catch (\Exception $e) {
            return 'no';
        }
    }
}
