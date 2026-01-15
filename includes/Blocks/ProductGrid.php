<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractProductBlock;

class ProductGrid extends AbstractProductBlock
{
    protected static $BLOCK_NAME = 'product-grid';
    protected static $BLOCK_ICON = 'grid-view';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Product Grid', 'wpcbooking');
        $this->block_description = __('Display a booking product grid', 'wpcbooking');
        $this->block_category = 'woocommerce';
        $this->block_icon = 'grid-view';
        $this->block_keywords = ['booking', 'product', 'grid',];
    }

    protected function get_tab_frontend_conditions(): array
    {
        $parent_conditions = parent::get_tab_frontend_conditions();

        $loading_config = [
            'label_pick_later' => [
                'id' => 'label_pick_later',
                'type' => 'text',
                'label' => __('Label Pick Later', 'wpcbooking'),
                'default' => __('Pick later', 'wpcbooking'),
            ],
            'loading_mode' => [
                'id' => 'loading_mode',
                'type' => 'select',
                'label' => __('Loading Mode', 'wpcbooking'),
                'options' => [
                    'all' => __('All at once', 'wpcbooking'),
                    'button' => __('Load more button', 'wpcbooking'),
                    'scroll' => __('Infinite scroll', 'wpcbooking'),
                ],
                'default' => 'all',
            ],
            'items_per_load' => [
                'id' => 'items_per_load',
                'type' => 'number',
                'label' => __('Items per load', 'wpcbooking'),
                'default' => 6,
                'min' => 1,
                'conditions' => [
                    [
                        'field' => '#.loading_mode',
                        'condition' => '!=',
                        'value' => 'all',
                    ],
                ],
            ],
            'enable_attribute_filter' => [
                'id' => 'enable_attribute_filter',
                'type' => 'toggle',
                'label' => __('Enable Attribute Filter', 'wpcbooking'),
            ],
            'filter_attribute' => [
                'id' => 'filter_attribute',
                'type' => 'select',
                'label' => __('Filter by Attribute', 'wpcbooking'),
                'options' => $this->get_product_attributes_options(),
                'default' => '',
                'conditions' => [
                    [
                        'field' => '#.enable_attribute_filter',
                        'condition' => '==',
                        'value' => '1',
                    ],
                ],
            ],
        ];

        return array_merge($loading_config, $parent_conditions);
    }

    protected function get_product_attributes_options(): array
    {
        $options = ['' => __('None', 'wpcbooking')];

        $attribute_taxonomies = wc_get_attribute_taxonomies();

        if (!empty($attribute_taxonomies)) {
            foreach ($attribute_taxonomies as $attribute) {
                $options['pa_' . $attribute->attribute_name] = $attribute->attribute_label;
            }
        }
        return $options;
    }
}
