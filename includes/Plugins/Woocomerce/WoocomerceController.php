<?php

namespace Wpcbooking\Plugins\Woocomerce;

use Wpcbooking\Plugins\AbstractPluginController;

class WoocomerceController extends AbstractPluginController
{
    const PLUGIN_NAME = 'WooCommerce';
    const PLUGIN_SLUG = 'woocommerce';
    use \Wpcbooking\Traits\WooCommerceTrait;
    protected function check_plugin_active()
    {
        return class_exists('WooCommerce');
    }

    protected function get_notification_message()
    {
        return __('WooCommerce plugin is required for Woo Enterprise Tracking to function properly. Please install and activate WooCommerce.', 'woo-enterprise-tracking');
    }

    protected function init_hooks()
    {
        add_filter('booking_options_tabs', [$this, 'add_woocommerce_tab']);
        add_filter('booking_options_items', [$this, 'add_woocommerce_options']);
    }

    public function init_admin_hooks() {}

    /**
     * Add WooCommerce tab to booking options
     */
    public function add_woocommerce_tab($tabs)
    {
        $tabs['integrations'] = __('Integrations', 'wpcbooking');
        return $tabs;
    }

    /**
     * Add WooCommerce options to booking options items
     */
    public function add_woocommerce_options($items)
    {
        $items['_woocommerce_settings'] = [
            'type' => 'group',
            'id' => '_woocommerce_settings',
            'tab' => 'integrations',
            'label' => __('WooCommerce settings', 'wpcbooking'),
            'items' => [
                'woo_currency' => [
                    'type' => 'multi_select',
                    'id' => 'woo_currency',
                    'label' => __('Available currencies', 'wpcbooking'),
                    'description' => __('Select currencies that will be available in the booking system', 'wpcbooking'),
                    'options' => $this->get_woo_currencies(),
                    'default' => ['DKK'],
                ],
                'woo_default_currency' => [
                    'type' => 'select',
                    'id' => 'woo_default_currency',
                    'label' => __('Default currency', 'wpcbooking'),
                    'description' => __('Currency that will be displayed as default', 'wpcbooking'),
                    'options' => $this->get_woo_currencies(),
                    'default' => 'DKK',
                ],
                'default_shipping' => [
                    'type' => 'toggle',
                    'id' => 'default_shipping',
                    'label' => __('Default shipping', 'wpcbooking'),
                    'description' => __('Enable automatic shipping settings', 'wpcbooking'),
                    'default' => false,
                ],
                'aff_shipping_method' => [
                    'type' => 'select',
                    'id' => 'aff_shipping_method',
                    'label' => __('Shipping method', 'wpcbooking'),
                    'description' => __('Select shipping method for bookings', 'wpcbooking'),
                    'options' => $this->get_shipping_method_options(),
                    'conditions' => [
                        [
                            'field' => 'default_shipping',
                            'condition' => '==',
                            'value' => true,
                        ],
                    ],
                ],
            ],
        ];
        return $items;
    }

    /**
     * Get shipping method options for select field
     */
    private function get_shipping_method_options(): array
    {
        $options = [
            'flat_rate' => __('Flat rate', 'wpcbooking'),
            'free_shipping' => __('Free shipping', 'wpcbooking'),
            'local_pickup' => __('Local pickup', 'wpcbooking'),
            'express' => __('Express shipping', 'wpcbooking'),
        ];

        return apply_filters('wpcbooking_woocommerce_shipping_method_options', $options);
    }
}
