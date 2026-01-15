<?php

namespace Wpcbooking\Blocks;


abstract class AbstractProductBlock extends AbstractBlock
{
    /**d
     * Registered trigger field IDs for this block instance
     * 
     * @var array<string>
     */
    protected array $registered_trigger_fields = [];

    protected function init_hooks(): void
    {
        parent::init_hooks();

        $block_name = static::get_block_name();
    }


    /**
     * Returns the base block tabs configuration.
     *
     * @return array Array of tab definitions with tab keys and labels.
     */
    protected function get_block_tabs(): array
    {
        return [
            'products' => __('Selected Products', 'wpcbooking'),
            'frontend_conditions' => __('Frontend Conditions', 'wpcbooking'),
            'documentation' => __('Documentation', 'wpcbooking'),
        ];
    }

    /**
     * Returns the block attribute items configuration.
     *
     * @return array Array of block attribute definitions including field configurations.
     */
    protected function get_block_attribute_items(): array
    {
        return [
            'field_id' => [
                'type'     => 'hidden',
                'id'      => 'field_id',
                'value' => $this->get_unique_id(),
            ],
            [
                'id' => 'product_definitions',
                'type' => 'multi_group',
                'description' => __('', 'wpcbooking'),
                'items' => $this->get_tab_product_definitions(),
                'min' => 1,
                'tab' => 'products',
            ],
            [
                'id' => 'items',
                'type' => 'group',
                'description' => __('', 'wpcbooking'),
                'items' => $this->get_tab_frontend_conditions(),
                'min' => 1,
                'tab' => 'frontend_conditions',
            ],
            [
                'type' => 'html',
                'id' => 'documentation_content',
                'content' => $this->get_block_documentation(),
                'tab' => 'documentation',
            ]
        ];
    }


    /**
     * Returns the product definitions tab configuration.
     *
     * @return array Array of product definition fields including filters, categories, tags, and price settings.
     */
    protected function get_tab_product_definitions(): array
    {
        return [
            [
                'id' => 'label_group',
                'type' => 'text',
                'description' => __('', 'wpcbooking'),
                'label' => __('Label', 'wpcbooking'),
                'tab' => 'included_products',
                'placeholder' => __('Label for product', 'wpcbooking'),
            ],
            [
                'id' => 'filter',
                'type' => 'select',
                'options' => [
                    'by_terms' => __('By Category and Tag', 'wpcbooking'),
                    'by_ids' => __('Pick Products', 'wpcbooking'),
                ],
                'label' => __('Filter Products', 'wpcbooking'),
                'default' => 'by_terms',
                'required' => true,
            ],
            [
                'id' => 'product_cat',
                'type' => 'multi_term',
                'label' => __('Product Category', 'wpcbooking'),
                'taxonomy' => 'product_cat',
                'conditions' => [
                    [
                        'field'     => '#.filter',
                        'condition' => '==',
                        'value'     => 'by_terms',
                    ]
                ]
            ],
            [
                'id' => 'product_tag',
                'type' => 'multi_term',
                'label' => __('Product Tag', 'wpcbooking'),
                'taxonomy' => 'product_tag',
                'conditions' => [
                    [
                        'field'     => '#.filter',
                        'condition' => '==',
                        'value'     => 'by_terms',
                    ],
                ],
            ],
            [
                'type'        => 'post',
                'id'          => 'product_ids',
                'label'       => __('Product ID', 'wpcbooking'),
                'description' => __('', 'wpcbooking'),
                'post_type'   => 'product',
                'conditions' => [
                    [
                        'field'     => '#.filter',
                        'condition' => '==',
                        'value'     => 'by_ids',
                    ],
                ],
            ],
            'price_type' => [
                'id' => 'price_type',
                'type' => 'select',
                'label' => __('Price Type', 'wpcbooking'),
                'options' => [
                    'fixed' => __('Fixed Price', 'wpcbooking'),
                    'per_field' => __('Price per Field', 'wpcbooking'),
                    'percentage' => __('Percentage', 'wpcbooking'),
                    'table' => __('Table', 'wpcbooking'),
                ],
                'default' => 'fixed',
            ],

            'fixed_price' => $this->get_group_price_fixed_price_settings(),
            'per_field' => $this->get_group_price_per_field_settings(),
            'apply_display_conditions' => [
                'type' => 'toggle',
                'id' => 'apply_display_conditions',
                'label' => __('Apply display conditions', 'wpcbooking'),
            ],
            'display_conditions' => $this->get_repeater_display_conditions(),
            'percentage' => $this->get_group_price_percentage_settings(),
            'table_price' => $this->get_group_price_table_settings(),
            'add_included_products' => [
                'type' => 'toggle',
                'id' => 'add_included_products',
                'label' => __('Include Products', 'wpcbooking'),
            ],
            'apply_display_total' => [
                'type' => 'toggle',
                'id' => 'apply_display_total',
                'label' => __('Display in Total summary', 'wpcbooking'),
            ],
            [
                'type'        => 'multi_post',
                'id'          => 'included_products',
                'label'       => __('Included Products', 'wpcbooking'),
                'description' => __('Select products to include in the booking', 'wpcbooking'),
                'post_type'   => 'product',
                'conditions' => [
                    [
                        'field'     => '#.add_included_products',
                        'condition' => '==',
                        'value'     => '1',
                    ],
                ],
            ],


        ];
    }

    /**
     * Returns the fixed price group settings configuration.
     *
     * @return array Array of fixed price field definitions including price and quantity settings.
     */
    protected function get_group_price_fixed_price_settings(): array
    {
        return [
            'id' => 'fixed_price',
            'type' => 'group',
            'label' => __('Fixed Price', 'wpcbooking'),
            'items' => [
                'price_in_currency' => $this->get_repeater_price_in_currency(),
                'quantity' => $this->get_group_quantity_settings(),
            ],
            'conditions' => [
                [
                    'field'     => '#.price_type',
                    'condition' => '==',
                    'value'     => 'fixed',
                ],
            ],
        ];
    }

    /**
     * Returns the per field price group settings configuration.
     *
     * @return array Array of per field price definitions including price and quantity settings.
     */
    protected function get_group_price_per_field_settings(): array
    {
        return [

            'type' => 'group',
            'id' => 'per_field',
            'label' => __('Per Field Price', 'wpcbooking'),
            'items' =>
            [
                'definition_conditions' => $this->get_repeater_definition_conditions(),
                'price_in_currency' => $this->get_repeater_price_in_currency(),
                'quantity' => $this->get_group_quantity_settings(),
                'min_price' => $this->get_repeater_min_price(),
            ],
            'conditions' => [
                [
                    'field'     => '#.price_type',
                    'condition' => '==',
                    'value'     => 'per_field',
                ],
            ],
        ];
    }

    /**
     * Returns the percentage price group settings configuration.
     *
     * @return array Array of percentage price definitions including add/subtract and value settings.
     */
    protected function get_group_price_percentage_settings(): array
    {
        return [
            'type'  => 'group',
            'id'    => 'price_percentage_settings',
            'label' => __('Price Settings', 'wpcbooking'),
            'items' => [
                'add_substract' => $this->get_block_add_substract(),
                'value' => [
                    'id' => 'value',
                    'type'  => 'number',
                    'label' => __('Value', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                    'max' => 100,
                ],
            ],
            'conditions' => [
                [
                    'field'     => '#.price_type',
                    'condition' => '==',
                    'value'     => 'percentage',
                ],
            ]
        ];
    }

    protected function get_block_add_substract(array $attributes = []): array
    {
        return array_merge([
            'type'  => 'select',
            'label' => __('Add/Substract', 'wpcbooking'),
            'options' => [
                'add' => __('Add', 'wpcbooking'),
                'substract' => __('Substract', 'wpcbooking'),
            ],
            'default' => 'add',

        ], $attributes);
    }

    /**
     * Returns the table price group settings configuration.
     *
     * @return array Array of table price definitions including row, column, and price table settings.
     */
    protected function get_group_price_table_settings(): array
    {
        return [
            'id' => 'table_price',
            'type' => 'group',
            'label' => __('Price options', 'wpcbooking'),
            'items' => [
                'row' => $this->get_booking_fields([
                    'label' => __('Value for Row', 'wpcbooking'),
                    'id' => 'row_field',
                    'className' => 'js-row-field',
                ]),
                'column' => $this->get_booking_fields([
                    'label' => __('Value for Column', 'wpcbooking'),
                    'id' => 'column_field',
                    'className' => 'js-column-field',
                ]),
                'price_settings' => [
                    'type' => 'multi_group',
                    'label' => __('Price Settings', 'wpcbooking'),
                    'items' => [
                        'woo_currency_filter' => [
                            'id' => 'woo_currency_filter',
                            'type'  => 'select',
                            'label' => __('Price Value', 'wpcbooking'),
                            'options' => $this->get_booking_currency($this->get_booking_id()),
                            'default' => 'DKK',
                        ],
                        'price_table' => $this->get_price_table(),
                    ],
                ],
                'quantity' => $this->get_group_quantity_settings(),
            ],
            'className' => 'js-table-price',
            'conditions' => [
                [
                    'field'     => '#.price_type',
                    'condition' => '==',
                    'value'     => 'table',
                ],
            ],
        ];
    }

    /**
     * Returns the price in currency repeater field configuration.
     *
     * @param array $attributes Optional additional attributes to merge with the field configuration.
     * @return array Array of price in currency field definitions with currency selector and price input.
     */
    protected function get_repeater_price_in_currency($attributes = []): array
    {
        return array_merge($attributes, [
            'id' => 'price_in_currency',
            'type' => 'multi_group',
            'label' => __('Price in Currency', 'wpcbooking'),
            'items' => [
                'woo_currency_filter' => [
                    'id' => 'woo_currency_filter',
                    'type'  => 'select',
                    'label' => __('Price Value', 'wpcbooking'),
                    'options' => $this->get_woo_currencies(),
                    'default' => 'DKK',
                ],
                'price' => [
                    'id' => 'price',
                    'type'  => 'number',
                    'label' => __('Price Value', 'wpcbooking'),
                    'default' => 0,
                ],
            ]
        ]);
    }

    /**
     * Returns the minimum price repeater field configuration.
     *
     * @return array Array of minimum price field definitions with currency selector and price value.
     */
    protected function get_repeater_min_price(): array
    {
        return [
            'type' => 'multi_group',
            'label' => __('Min price', 'wpcbooking'),
            'id' => 'min_price',
            'items' => [
                'woo_currency_filter' => [
                    'id' => 'woo_currency_filter',
                    'type'  => 'select',
                    'label' => __('Price Value', 'wpcbooking'),
                    'options' => $this->get_woo_currencies(),
                    'default' => 'DKK',
                ],
                'price' => [
                    'id' => 'price',
                    'type'  => 'number',
                    'label' => __('Value', 'wpcbooking'),
                    'default' => 0,
                ],
            ],
        ];
    }

    /**
     * Returns the definition conditions repeater field configuration.
     *
     * @return array Array of definition condition fields including type, price, booking fields, and range settings.
     */
    protected function get_repeater_definition_conditions(): array
    {
        return [
            'type' => 'multi_group',
            'id' => 'definition_conditions',
            'label' => __('Definition Conditions', 'wpcbooking'),
            'items' => [
                'type' => [
                    'id' => 'type',
                    'type'  => 'select',
                    'label' => __('Type', 'wpcbooking'),
                    'options' => [
                        'display_from_to' => __('Price from to field', 'wpcbooking'),
                    ],
                    'default' => 'display_from_to',
                ],
                'booking_fields' => $this->get_booking_fields(['conditions' => [
                    [
                        'field'     => '#.type',
                        'condition' => '==',
                        'value'     => 'display_from_to',
                    ],
                ]]),
                'from' => [
                    'id' => 'from',
                    'type'  => 'number',
                    'label' => __('From', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                    'conditions' => [
                        [
                            'field'     => '#.type',
                            'condition' => '==',
                            'value'     => 'display_from_to',
                        ],
                    ],
                ],
                'to' => [
                    'id' => 'to',
                    'type'  => 'number',
                    'label' => __('To', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                    'conditions' => [
                        [
                            'field'     => '#.type',
                            'condition' => '==',
                            'value'     => 'display_from_to',
                        ],
                    ],
                ],
            ],
        ];
    }

    protected function get_repeater_display_conditions(): array
    {
        return [
            'type' => 'multi_group',
            'id' => 'display_conditions',
            'label' => __('Display Conditions', 'wpcbooking'),
            'items' => [
                'type' => [
                    'id' => 'type',
                    'type'  => 'select',
                    'label' => __('Type', 'wpcbooking'),
                    'options' => [
                        'display_from_to' => __('Price from to field', 'wpcbooking'),
                    ],
                    'default' => 'display_from_to',
                    'description' => __('These conditions use AND. So all conditions need to apply for the products to show.', 'wpcbooking'),
                ],
                'booking_fields' => $this->get_booking_fields(['conditions' => [
                    [
                        'field'     => '#.type',
                        'condition' => '==',
                        'value'     => 'display_from_to',
                    ],
                ]]),
                'from' => [
                    'id' => 'from',
                    'type'  => 'number',
                    'label' => __('From < n', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                    'conditions' => [
                        [
                            'field'     => '#.type',
                            'condition' => '==',
                            'value'     => 'display_from_to',
                        ],
                    ],
                ],
                'to' => [
                    'id' => 'to',
                    'type'  => 'number',
                    'label' => __('To >= n', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                    'conditions' => [
                        [
                            'field'     => '#.type',
                            'condition' => '==',
                            'value'     => 'display_from_to',
                        ],
                    ],
                ],
            ],
            'conditions' => [
                [
                    'field'     => '#.apply_display_conditions',
                    'condition' => '==',
                    'value'     => '1',
                ],
            ],
        ];
    }

    /**
     * Returns the quantity group settings configuration.
     *
     * @return array Array of quantity field definitions including type selector, booking fields, and value.
     */
    protected function get_group_quantity_settings(): array
    {
        return [
            'type' => 'group',
            'items' => [
                'type' => [
                    'type' => 'select',
                    'id' => 'type',
                    'label' => __('Quantity Type', 'wpcbooking'),
                    'options' => [
                        'fixed' => __('Qty', 'wpcbooking'),
                        'per_field' => __('Qty per Field', 'wpcbooking'),
                    ],
                    'default' => 'fixed',
                ],
                'booking_fields' => $this->get_booking_fields(['conditions' => [
                    [
                        'field'     => '#.type',
                        'condition' => '==',
                        'value'     => 'per_field',
                    ],
                ]]),
                'value' => [
                    'id' => 'value',
                    'type' => 'number',
                    'label' => __('Value', 'wpcbooking'),
                    'default' => 1,
                    'conditions' => [
                        [
                            'field'     => '#.type',
                            'condition' => '==',
                            'value'     => 'fixed',
                        ],
                    ],
                ]
            ]
        ];
    }

    /**
     * Returns the frontend conditions tab configuration.
     *
     * @return array Array of frontend condition fields including free products settings and conditions.
     */
    protected function get_tab_frontend_conditions(): array
    {
        return [
            'apply_on_free_products' => [
                'id' => 'apply_on_free_products',
                'type' => 'toggle',
                'label' => __('Apply on free products', 'wpcbooking'),
            ],
            'free_products' => $this->get_repeater_free_products(),
            'free_products_conditions' => $this->get_repeater_free_products_conditions(),
        ];
    }

    /**
     * Returns the free products repeater field configuration.
     *
     * @return array Array of free products field definitions with product selector and free quantity.
     */
    protected function get_repeater_free_products(): array
    {
        return [
            'type' => 'multi_group',
            'label' => __('Free Products', 'wpcbooking'),
            'items' => [
                [
                    'type'        => 'post',
                    'id'          => 'product',
                    'label'       => __('Product', 'wpcbooking'),
                    'description' => __('Select product', 'wpcbooking'),
                    'post_type'   => 'product',
                ],
                'free' => [
                    'id' => 'free',
                    'type' => 'number',
                    'label' => __('Free', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                ],
            ],
        ];
    }

    /**
     * Returns the free products conditions repeater field configuration.
     *
     * @return array Array of allowed products field definitions with product selector and allowed quantity.
     */
    protected function get_repeater_free_products_conditions(): array
    {
        return [
            'type' => 'multi_group',
            'id' => 'allowed_products_to_select',
            'label' => __('Allowed Products to Select', 'wpcbooking'),
            'items' => [
                [
                    'type'        => 'post',
                    'id'          => 'product',
                    'label'       => __('Product', 'wpcbooking'),
                    'description' => __('Select product', 'wpcbooking'),
                    'post_type'   => 'product',
                ],
                'allowed' => [
                    'id' => 'allowed',
                    'type' => 'number',
                    'label' => __('Allowed', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                ],
            ],
        ];
    }

    /**
     * Returns the definitions repeater field configuration.
     *
     * @return array Array of definition fields including price, quantity, booking fields, and value settings.
     */
    protected function get_definitions_repeater(): array
    {
        return [
            'type' => 'multi_group',
            'label' => __('Definitions', 'wpcbooking'),
            'items' => [
                'price_in_currency' => $this->get_repeater_price_in_currency(),
                'quantity' => $this->get_group_quantity_settings(),
                'booking_fields' => $this->get_booking_fields(['conditions' => [
                    [
                        'field'     => '#.quantity',
                        'condition' => '==',
                        'value'     => 'per_field',
                    ],
                ]]),
                'value' => [
                    'id' => 'value',
                    'type' => 'number',
                    'label' => __('Value', 'wpcbooking'),
                    'default' => 1,
                    'conditions' => [
                        [
                            'field'     => '#.quantity',
                            'condition' => '==',
                            'value'     => 'fixed',
                        ],
                    ],
                ]
            ],
            'conditions' => [
                [
                    'field'     => '#.type',
                    'condition' => '==',
                    'value'     => 'per_field',
                ],
            ],
        ];
    }

    /**
     * Returns the definitions conditions repeater field configuration.
     *
     * @return array Array of definition condition fields including booking fields and range settings.
     */
    protected function get_definitions_conditions_repeater(): array
    {
        return [
            'type' => 'multi_group',
            'label' => __('Definitions', 'wpcbooking'),
            'items' => [
                'booking_fields' => $this->get_booking_fields(),
                'from' => [
                    'id' => 'from',
                    'type' => 'number',
                    'label' => __('From', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                ],
                'to' => [
                    'id' => 'to',
                    'type' => 'number',
                    'label' => __('To', 'wpcbooking'),
                    'default' => 0,
                    'min' => 0,
                ],
            ],
            'conditions' => [
                [
                    'field'     => '#.value_type',
                    'condition' => '==',
                    'value'     => 'per_field',
                ],
            ],
        ];
    }

    /**
     * Prepares block attributes by processing product definitions and filtering products.
     *
     * @param array $attributes The block attributes to prepare.
     * @return array The prepared attributes with processed products and configurations.
     */
    public static function prepare_block(array $attributes): array
    {
        $product_definitions_raw = $attributes['product_definitions'] ?? [];
        $product_definitions = [];
        $all_product_ids = [];

        if (is_array($product_definitions) && !empty($product_definitions)) {
            foreach ($product_definitions as $row_condition => $definition) {
                if (isset($definition['filter']) && $definition['filter'] === 'by_terms') {
                    $tax_query = [];

                    if (!empty($definition['product_cat']) && is_array($definition['product_cat'])) {
                        $tax_query[] = [
                            'taxonomy' => 'product_cat',
                            'field'    => 'term_id',
                            'terms'    => array_map('intval', $definition['product_cat']),
                            'operator' => 'IN',
                        ];
                    }

                    if (!empty($definition['product_tag']) && is_array($definition['product_tag'])) {
                        $tax_query[] = [
                            'taxonomy' => 'product_tag',
                            'field'    => 'term_id',
                            'terms'    => array_map('intval', $definition['product_tag']),
                            'operator' => 'IN',
                        ];
                    }

                    if (!empty($tax_query)) {
                        $query_args = [
                            'post_type'      => 'product',
                            'posts_per_page' => -1,
                            'fields'         => 'ids',
                            'post_status'    => 'publish',
                            'tax_query'      => $tax_query,
                        ];

                        $query = new \WP_Query($query_args);
                        if (!empty($query->posts)) {
                            $all_product_ids = array_merge($all_product_ids, array_map('intval', $query->posts));
                        }
                    }
                } elseif (isset($definition['product_ids'])) {
                    $product_ids = $definition['product_ids'];
                    if (is_array($product_ids)) {
                        $all_product_ids = array_merge($all_product_ids, array_map('intval', $product_ids));
                    } else {
                        $all_product_ids[] = intval($product_ids);
                    }
                }
            }
            $all_product_ids = array_values(array_unique(array_filter($all_product_ids)));
        }

        if (empty($all_product_ids) && !empty($product_definitions_raw)) {
            foreach ($product_definitions_raw as $definition) {
                if (isset($definition['filter']) && $definition['filter'] === 'by_terms') {
                    $tax_query = [];

                    if (!empty($definition['product_cat']) && is_array($definition['product_cat'])) {
                        $tax_query[] = [
                            'taxonomy' => 'product_cat',
                            'field'    => 'term_id',
                            'terms'    => array_map('intval', $definition['product_cat']),
                            'operator' => 'IN',
                        ];
                    }

                    if (!empty($definition['product_tag']) && is_array($definition['product_tag'])) {
                        $tax_query[] = [
                            'taxonomy' => 'product_tag',
                            'field'    => 'term_id',
                            'terms'    => array_map('intval', $definition['product_tag']),
                            'operator' => 'IN',
                        ];
                    }

                    if (!empty($tax_query)) {
                        $query_args = [
                            'post_type'      => 'product',
                            'posts_per_page' => -1,
                            'fields'         => 'ids',
                            'post_status'    => 'publish',
                            'tax_query'      => $tax_query,
                        ];

                        $query = new \WP_Query($query_args);
                        if (!empty($query->posts)) {
                            $all_product_ids = array_merge($all_product_ids, array_map('intval', $query->posts));
                        }
                    }
                } elseif (isset($definition['product_ids'])) {
                    $product_ids = $definition['product_ids'];
                    if (is_array($product_ids)) {
                        $all_product_ids = array_merge($all_product_ids, array_map('intval', $product_ids));
                    } else {
                        $all_product_ids[] = intval($product_ids);
                    }
                }
            }
            $all_product_ids = array_values(array_unique(array_filter($all_product_ids)));
        }

        $per_field_minimums = [];
        foreach ($product_definitions_raw as $row => $definition) {
            $apply_display_conditions = !empty($definition['apply_display_conditions']);
            $has_per_field_price = isset($definition['price_type']) && $definition['price_type'] === 'per_field';
            if ($apply_display_conditions || $has_per_field_price) {
                $display_condition = $definition['display_conditions'][0] ?? [];

                $field_id = $display_condition['booking_fields'] ?? null;

                $from_value = $display_condition['from'] ?? 0;
                $to_value = $display_condition['to'] ?? 0;

                $min_price = [];
                if ($has_per_field_price && !empty($definition['per_field']['min_price']) && is_array($definition['per_field']['min_price'])) {
                    foreach ($definition['per_field']['min_price'] as $price_item) {
                        if (isset($price_item['woo_currency_filter']) && isset($price_item['price'])) {
                            $min_price[$price_item['woo_currency_filter']] = $price_item['price'];
                        }
                    }
                }
                switch ($definition['price_type']) {
                    case 'per_field':
                        $product_options = $definition['per_field'] ?? [];
                        $product_price = [
                            'price' => static::map_price_in_currency_to_array($product_options['price_in_currency']) ?? 0,
                            'qty' => $product_options['quantity'] ?? 1,
                        ];
                        break;
                    case 'fixed':
                        break;
                }
                $per_field_minimums[] = [
                    'row' => $row,
                    'field_id' => $field_id,
                    'from_value' => $apply_display_conditions ? $from_value : 0,
                    'to_value' => $apply_display_conditions ? $to_value : 0,
                    'min_price' => $min_price,
                    'product_price' => $product_price,
                ];
            }
        }

        $enable_attribute_filter = !empty($attributes['items']['enable_attribute_filter']);
        $filter_attribute = $enable_attribute_filter ? ($attributes['items']['filter_attribute'] ?? '') : '';

        $processed_products = [];
        if (!empty($all_product_ids)) {
            foreach ($all_product_ids as $product_id) {
                $product = wc_get_product($product_id);

                if (!$product || $product->get_status() !== 'publish' || !$product->is_purchasable()) {
                    continue;
                }

                $attribute_terms = [];
                if (!empty($filter_attribute)) {
                    $terms = wp_get_post_terms($product_id, $filter_attribute, ['fields' => 'all']);
                    if (!is_wp_error($terms) && !empty($terms)) {
                        foreach ($terms as $term) {
                            $attribute_terms[] = [
                                'id' => $term->term_id,
                                'name' => $term->name,
                                'slug' => $term->slug,
                            ];
                        }
                    }
                }

                $processed_products[] = [
                    'id' => $product->get_id(),
                    'title' => $product->get_name(),
                    'short_description' => $product->get_short_description(),
                    'image' => self::get_product_image_or_placeholder($product, 'medium', ['loading' => 'lazy']),
                    'has_included_products' => false,
                    'included_products' => [],
                    'attribute_terms' => $attribute_terms,
                ];
            }
        }

        $number_allowed = null;
        if (isset($attributes['items']) && is_array($attributes['items']) && !empty($attributes['items'])) {
            $number_allowed = null;
        } elseif (static::get_block_name() === 'product-list') {
            $number_allowed = 1;
        }


        $prepared_attributes = array_merge($attributes, [
            'general' => [
                'number_allowed' => $number_allowed,
                'products' => $processed_products,
                'filter_attribute' => $filter_attribute,
            ],
            'block_icon' => static::get_block_icon(),
            'count_products' => self::count_products($product_definitions_raw),
            'per_field_minimums' => $per_field_minimums,
        ]);
        $quote_id = static::get_current_quote_id();
        if (is_int($quote_id)) {
            $prepared_attributes['value'] = static::get_quote_value('', $quote_id, $attributes);
        }
        return $prepared_attributes;
    }

    protected function ged_conditions_mapping(array $product_definitions): array
    {
        $conditions_mapping = [];

        if (!is_array($product_definitions) || empty($product_definitions)) {
            return $conditions_mapping;
        }

        foreach ($product_definitions as $row_index => $definition) {
            if (isset($definition['filter']) && $definition['filter'] === 'by_terms') {
                $tax_query = [];
                if (!empty($definition['product_cat']) && is_array($definition['product_cat'])) {
                    $tax_query[] = [
                        'taxonomy' => 'product_cat',
                        'field'    => 'term_id',
                        'terms'    => array_map('intval', $definition['product_cat']),
                        'operator' => 'IN',
                    ];
                }

                if (!empty($definition['product_tag']) && is_array($definition['product_tag'])) {
                    $tax_query[] = [
                        'taxonomy' => 'product_tag',
                        'field'    => 'term_id',
                        'terms'    => array_map('intval', $definition['product_tag']),
                        'operator' => 'IN',
                    ];
                }

                if (!empty($tax_query)) {
                    $query_args = [
                        'post_type'      => 'product',
                        'posts_per_page' => -1,
                        'fields'         => 'ids',
                        'post_status'    => 'publish',
                        'tax_query'      => $tax_query,
                    ];

                    $query = new \WP_Query($query_args);
                    if (!empty($query->posts)) {
                        $conditions_mapping[$row_index] = array_map('intval', $query->posts);
                    }
                }
            } elseif (isset($definition['product_ids'])) {
                $product_ids = $definition['product_ids'];
                if (is_array($product_ids)) {
                    $conditions_mapping[$row_index] = array_map('intval', $product_ids);
                } else {
                    $conditions_mapping[$row_index] = intval($product_ids);
                }
            }
        }

        return $conditions_mapping;
    }

    /**
     * Counts the total number of purchasable products from product definitions.
     *
     * @param array $items The product definition items to count from.
     * @return int The total count of purchasable products.
     */
    public static function count_products(array $items): int
    {
        $count = 0;

        foreach ($items as $item) {
            switch ($item['filter']) {
                case 'by_ids':
                    $count += 1;
                    break;
                case 'by_terms':
                    $tax_query = [];

                    if (!empty($item['product_cat']) && is_array($item['product_cat'])) {
                        $tax_query[] = [
                            'taxonomy' => 'product_cat',
                            'field'    => 'term_id',
                            'terms'    => array_map('intval', $item['product_cat']),
                            'operator' => 'IN',
                        ];
                    }

                    if (!empty($item['product_tag']) && is_array($item['product_tag'])) {
                        $tax_query[] = [
                            'taxonomy' => 'product_tag',
                            'field'    => 'term_id',
                            'terms'    => array_map('intval', $item['product_tag']),
                            'operator' => 'IN',
                        ];
                    }

                    if (!empty($tax_query)) {
                        $query_args = [
                            'post_type'      => 'product',
                            'posts_per_page' => -1,
                            'fields'         => 'ids',
                            'post_status'    => 'publish',
                            'tax_query'      => $tax_query,
                        ];

                        $query = new \WP_Query($query_args);
                        $product_ids = $query->posts;

                        foreach ($product_ids as $product_id) {
                            $product = wc_get_product($product_id);
                            if ($product && $product->is_purchasable()) {
                                $count++;
                            }
                        }
                    }
                    break;
            }
        }
        return $count;
    }

    /**
     * Returns the price table field configuration.
     *
     * @return array Array of price table field definition with default data.
     */
    protected function get_price_table(): array
    {
        return [
            'type' => 'price_table',
            'default' => wp_json_encode($this->get_default_table_data()),
        ];
    }

    /**
     * Returns the default price table data structure.
     *
     * @return array Array of default price values indexed by quantity.
     */
    private function get_default_table_data(): array
    {
        return [];
    }

    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!$field_id || !$this->is_valid_quote_id($quote_id)) return null;
        $data = $this->set_products($quote_id, $field_id, $value, $block);
        $data[$field_id] = $value;
        $this->save_meta_data($quote_id, $data);
        return $data;
    }

    public function set_products(int $quote_id,  string $field_id, array $products, array $block = [])
    {
        $currency = $this->get_quote_currency($quote_id);
        $products_data = $block['attrs']['product_definitions'] ?? [];

        $current_booking_id = static::get_booking_id($quote_id);
        self::init_booking_controller($current_booking_id);

        $default_products = [];
        $field_total = 0;
        $percentage = [];
        foreach ($products as $index => $_product) {
            $product = is_string($_product) ? json_decode($_product, true) : (array) $_product;
            if (!isset($product['field_id']) || $product['field_id'] !== $field_id) continue;
            $processed_product = $this->process_product_item(
                $product,
                $products_data,
                $quote_id,
                $block,
                $currency
            );

            if ($processed_product === null) {
                continue;
            }

            $default_products[] = $processed_product['product'];
            $percentage[] = $processed_product['percentage'];
            $field_total += $processed_product['item_total'];
        }

        return [
            $field_id . '_products' => $default_products,
            $field_id . '_total' => $field_total,
            $field_id . '_percentage' => $percentage
        ];
    }

    protected function process_product_item($product, array $products_data, int $quote_id, array $block = [], string $currency = 'DKK'): ?array
    {
        try {
            $conditions_mapping = self::ged_conditions_mapping($block['attrs']['product_definitions']);
            $product_id = $product['product_id'] ?? null;
            if ($product_id && !empty($conditions_mapping)) {
                $found_row = $this->find_row_by_product_id($product_id, $conditions_mapping);
                if ($found_row !== null) {
                    $product['row'] = $found_row;
                }
            }
            $matched_definition = isset($found_row) ?  $products_data[$found_row] ?? [] : [];
            if (empty($matched_definition)) {
                return null;
            }

            $wc_product = wc_get_product($product['product_id'] ?? null);
            if (!$wc_product) {
                error_log(sprintf('[process_product_item] Invalid WC product ID: %s', $product['product_id'] ?? 'null'));
                return null;
            }

            $add_product = $this->build_base_product_data($product, $matched_definition, $wc_product, $currency);

            $price_calculation = $this->calculate_product_price_and_quantity(
                $matched_definition,
                $quote_id,
                $currency,
                $wc_product
            );

            $add_product = array_merge($add_product, $price_calculation['product_updates']);
            $add_product['price'][$currency] = $price_calculation['price'];
            $add_product['qty_type'] = $price_calculation['qty_type'];
            $add_product['qty'] = $price_calculation['qty'];
            $add_product['show_in_total'] = isset($matched_definition['apply_display_total']) && $matched_definition['apply_display_total'] == '1' ? true : false;
            $item_total = is_numeric($price_calculation['price'])
                ? $price_calculation['price'] * $price_calculation['qty']
                : 0;
            return [
                'product' => $add_product,
                'percentage' => $add_product['percentage'],
                'item_total' => $item_total
            ];
        } catch (\Exception $e) {
            error_log('🔍 [AbstractProductBlock] process_product_item: ' . $e->getMessage());
            error_log('code line: ' . $e->getLine());
            error_log('code file: ' . $e->getFile());
            error_log('code trace: ' . $e->getTraceAsString());
            return null;
        }
    }

    protected function build_base_product_data(array $product, array $matched_definition, $wc_product, string $currency): array
    {
        $included_product_ids = [];
        if (
            isset($matched_definition['add_included_products']) &&
            $matched_definition['add_included_products'] === true &&
            isset($matched_definition['included_products']) &&
            is_array($matched_definition['included_products'])
        ) {
            foreach ($matched_definition['included_products'] as $included_product) {
                if (is_array($included_product) && isset($included_product['id'])) {
                    $included_product_ids[] = (int) $included_product['id'];
                } elseif (is_numeric($included_product)) {
                    $included_product_ids[] = (int) $included_product;
                }
            }
        }

        return [
            'product_id' => $product['product_id'] ?? null,
            'price_type' => $matched_definition['price_type'] ?? 'value',
            'percentage' => [
                'price_increase' => 0,
                'operation' => 'add'
            ],
            'qty_type' => $matched_definition['quantity_type'] ?? 'not_connected',
            'qty' => $matched_definition['qty_value'] ?? 1,
            'row' => $product['row'] ?? null,
            'price' => [
                $currency => 0
            ],
            'total_price' => 0,
            'total_percentage' => 0,
            'name' => $wc_product->get_name() ?? '',
            'included' => $included_product_ids,
        ];
    }

    protected function calculate_product_price_and_quantity(
        array $matched_definition,
        int $quote_id,
        string $currency,
        $wc_product
    ): array {
        $price_type = $matched_definition['price_type'] ?? 'value';
        switch ($price_type) {
            case 'table':
                return $this->calculate_table_price($matched_definition, $quote_id, $currency, $wc_product);
            case 'percentage':
                return $this->calculate_percentage_price($matched_definition);
            case 'per_field':
                return $this->calculate_value_per_field($matched_definition, $quote_id, $currency, $wc_product);
            case 'fixed':
            default:
                return $this->calculate_value_price($matched_definition, $quote_id, $currency);
        }
    }

    protected function calculate_table_price(
        array $matched_definition,
        int $quote_id,
        string $currency,
        $wc_product
    ): array {
        $table_options = $matched_definition['table_price'] ?? [];
        $table = isset($table_options['price_settings']) && is_string($table_options['price_settings'])
            ? json_decode($table_options['price_settings'], true)
            : $table_options['price_settings'] ?? [];
        $table = $this->get_table_by_currency($table, $currency);

        $row_field_id = $table_options['row_field'];
        $column_field_id = $table_options['column_field'];
        $row = $row_field_id !== 'none' ? $this->get_number_value($quote_id, $row_field_id) : null;
        $column = $column_field_id !== 'none' ? $this->get_number_value($quote_id, $column_field_id) : null;

        $price = $this->get_table_price_value($table, $row_field_id, $column_field_id, $row, $column);

        $quantity_result = $this->calculate_quantity_from_options($table_options['quantity'] ?? [], $quote_id);

        $product_name = $this->build_table_product_name(
            $wc_product,
            $row_field_id,
            $column_field_id,
            $row,
            $column,
            $quantity_result
        );

        return [
            'price' => $price,
            'qty_type' => $quantity_result['qty_type'],
            'qty' => $quantity_result['qty'],
            'product_updates' => [
                'table' => [$currency => $table],
                'table_row_field' => $table_options['row_field'] ?? null,
                'table_column_field' => $table_options['column_field'] ?? null,
                'qty_field' => $quantity_result['qty_field'] ?? null,
                'name' => $product_name,
            ]
        ];
    }
    protected function calculate_value_per_field(
        array $matched_definition,
        int $quote_id,
        string $currency,
        $wc_product
    ): array {
        $per_field_options = $matched_definition['per_field'] ?? [];
        $price = $this->get_price_by_conditions($per_field_options['definition_conditions'] ?? [], $per_field_options['price_in_currency'] ?? [], $quote_id, $currency);
        $quantity_result = $this->calculate_quantity_from_options($per_field_options['quantity'] ?? [], $quote_id);
        $return =  [
            'price' => $price,
            'qty_type' => $quantity_result['qty_type'],
            'qty' => $quantity_result['qty'],
            'product_updates' => [
                'qty_field' => $quantity_result['qty_field'] ?? null,
                'name' => $wc_product->get_name() ?? '',
                'min_price' => $per_field_options['min_price'] ?? 0,
            ]
        ];
        return $return;
    }

    protected function get_price_by_conditions(array $price_conditions, array $price_in_currency, int $quote_id, string $currency): float
    {
        $number_fields = [];
        foreach ($price_conditions as $price_condition) {
            switch ($price_condition['type']) {
                case 'display_from_to':
                    $booking_fields = $price_condition['booking_fields'];
                    if (!$booking_fields) break;
                    if (isset($number_fields[$booking_fields])) {
                        $field_value = $number_fields[$booking_fields];
                    } else {
                        $field_value = $this->get_number_value($quote_id, $booking_fields);
                        $number_fields[$booking_fields] = $field_value;
                    }
                    $from = $price_condition['from'] ?? 0;
                    $to = $price_condition['to'] ?? 0;
                    if ($field_value >= $from && $field_value <= $to) {
                        foreach ($price_in_currency as $price) {
                            if (isset($price['woo_currency_filter']) && $price['woo_currency_filter'] === $currency) {
                                return $price['price'] ?? 0;
                            }
                        }
                    }
                    break;
            }
            if (isset($price_condition['field']) && isset($price_condition['value']) && $price_condition['field'] === $quote_id && $price_condition['value'] === $currency) {
                return $price_condition['price'] ?? 0;
            }
        }
        return 0;
    }
    protected function get_table_price_value(?array $table, string $row_field_id, string $column_field_id, $row, $column): float
    {
        if (
            $row_field_id !== 'none' &&
            $column_field_id !== 'none' &&
            $row !== null &&
            $column !== null
        ) {
            return $this->get_price_by_row_and_column($table, $row, $column);
        } elseif ($row_field_id !== 'none' && $row !== null) {
            return $this->get_row_by_field_id($table, $row);
        } elseif ($column_field_id !== 'none' && $column !== null) {
            return $this->get_column_by_field_id($table, $column);
        }

        return 0;
    }

    protected function build_table_product_name(
        $wc_product,
        string $row_field_id,
        string $column_field_id,
        $row,
        $column,
        array $quantity_result
    ): string {
        $column_label = $column_field_id !== 'none' ? sprintf(
            '(%d %s)',
            $column,
            static::get_field_label($column_field_id, $column),
        ) : '';

        $row_label = $row_field_id !== 'none' ? sprintf(
            '%s%d (%s)',
            $column_label !== '' ? ' x ' : '',
            $row,
            static::get_field_label($row_field_id, $row),
        ) : '';

        $label_qty = isset($quantity_result['qty_field']) && $quantity_result['qty_field'] !== '' ? sprintf(
            __('%d (per %s)', 'wpcbooking'),
            $quantity_result['qty'],
            static::get_field_label($quantity_result['qty_field'], $quantity_result['qty']),
        ) : '';

        return sprintf('%s %s %s %s', $wc_product->get_name() ?? '', $column_label, $row_label, $label_qty);
    }

    protected function calculate_percentage_price(array $matched_definition): array
    {
        $percentage_options = $matched_definition['price_percentage_settings'] ?? [];

        return [
            'price' => 0,
            'qty_type' => 'not_connected',
            'qty' => 1,
            'product_updates' => [
                'percentage' => [
                    'operation' => $percentage_options['add_substract'] ?? 'add',
                    'price_increase' => $percentage_options['value'] ?? 0
                ]
            ]
        ];
    }

    protected static function map_price_in_currency_to_array(array $price_in_currency): array
    {
        $mapped = [];
        if (is_array($price_in_currency) && !empty($price_in_currency)) {
            foreach ($price_in_currency as $price_item) {
                if (isset($price_item['woo_currency_filter']) && isset($price_item['price'])) {
                    $mapped[$price_item['woo_currency_filter']] = $price_item['price'];
                }
            }
        }
        return $mapped;
    }

    protected function calculate_value_price(array $matched_definition, int $quote_id, string $currency): array
    {
        $per_field_options = $matched_definition['fixed_price'] ?? [];
        $price_settings = $per_field_options['price_in_currency'] ?? [];
        $price = $price_settings[$currency] ?? 0;
        $quantity_result = ['qty_type' => 'not_connected', 'qty' => 1, 'qty_field' => null];
        if (isset($per_field_options['quantity']) && is_array($per_field_options['quantity'])) {
            $quantity_result = $this->calculate_quantity_from_options($per_field_options['quantity'] ?? [], $quote_id);
        }
        $return = [
            'price' => $price,
            'qty_type' => $quantity_result['qty_type'],
            'qty' => $quantity_result['qty'],
            'product_updates' => [
                'qty_field' => $quantity_result['qty_field'] ?? null,
            ]
        ];
        return $return;
    }

    protected function calculate_quantity_from_options(array $quantity_options, int $quote_id): array
    {
        $qty_type = $quantity_options['type'] ?? 'not_connected';
        $qty = 1;
        $qty_field = null;

        if ($qty_type === 'per_field') {
            $qty_field = $quantity_options['booking_fields'] ?? null;
            if ($qty_field) {
                $qty = $this->get_number_value($quote_id, $qty_field);
            }
        } else {
            $qty = $quantity_options['value'] ?? 1;
        }

        return [
            'qty_type' => $qty_type,
            'qty' => $qty,
            'qty_field' => $qty_field
        ];
    }

    protected function find_row_by_product_id(int $product_id, array $conditions_mapping): ?int
    {
        foreach ($conditions_mapping as $row => $products) {
            if (is_array($products)) {
                if (in_array($product_id, $products, true)) {
                    return $row;
                }
            } else {
                if ((int)$products === $product_id) {
                    return $row;
                }
            }
        }
        return null;
    }


    protected function get_table_by_currency(array $price_settings, string $currency): ?array
    {
        foreach ($price_settings as $setting) {
            if (isset($setting['woo_currency_filter']) && $setting['woo_currency_filter'] === $currency) {
                $price_table = $setting['price_table'] ?? null;

                if ($price_table) {
                    return is_string($price_table) ? json_decode($price_table, true) : $price_table;
                }
            }
        }

        return null;
    }

    protected function get_number_value(int $quote_id, string $field_id, array $block = []): ?float
    {
        $value = get_post_meta($quote_id, $field_id, true);
        if ($value !== '' && floatval($value)) {
            return floatval($value);
        } else {
            return $block['general']['default'] ?? 1;
        }
    }

    protected function get_row_by_field_id(array $price_table, string $field_id): ?int
    {
        if (empty($price_table)) {
            return null;
        }

        $available_row_ids = array_keys($price_table);
        sort($available_row_ids, SORT_NUMERIC);

        $closest_id = null;

        if (isset($price_table[$field_id])) {
            $closest_id = $field_id;
        } else {
            foreach ($available_row_ids as $id) {
                if ($id >= $field_id) {
                    $closest_id = $id;
                    break;
                }
            }

            if ($closest_id === null) {
                $closest_id = end($available_row_ids);
            }
        }

        $row_data = $price_table[$closest_id];
        if (is_array($row_data) && !empty($row_data)) {
            $first_value = reset($row_data);
            return (int)$first_value;
        }

        return null;
    }

    protected function get_column_by_field_id(array $price_table, string $field_id): ?int
    {
        if (empty($price_table)) {
            return null;
        }

        $all_column_ids = [];
        foreach ($price_table as $row_data) {
            if (is_array($row_data)) {
                $all_column_ids = array_merge($all_column_ids, array_keys($row_data));
            }
        }
        $available_column_ids = array_unique($all_column_ids);
        sort($available_column_ids);

        if (empty($available_column_ids)) {
            return null;
        }

        $closest_id = null;

        foreach ($price_table as $row_data) {
            if (isset($row_data[$field_id])) {
                $closest_id = $field_id;
                break;
            }
        }

        if ($closest_id === null) {
            foreach ($available_column_ids as $id) {
                if ($id >= $field_id) {
                    $closest_id = $id;
                    break;
                }
            }

            if ($closest_id === null) {
                $closest_id = end($available_column_ids);
            }
        }

        foreach ($price_table as $row_data) {
            if (isset($row_data[$closest_id])) {
                $value = $row_data[$closest_id];
                return (int)$value;
            }
        }

        return null;
    }

    protected function get_price_by_row_and_column(array $price_table, string $row_id, string $column_id): ?float
    {
        if (empty($price_table)) {
            return 0;
        }

        $available_rows = array_keys($price_table);
        sort($available_rows, SORT_NUMERIC);

        $all_columns = [];
        foreach ($price_table as $row_data) {
            if (is_array($row_data)) {
                $all_columns = array_merge($all_columns, array_keys($row_data));
            }
        }
        $available_columns = array_unique($all_columns);
        sort($available_columns, SORT_NUMERIC);

        if (isset($price_table[$row_id][$column_id])) {
            return $price_table[$row_id][$column_id] ?? 0;
        }

        $closest_row_id = null;
        foreach ($available_rows as $id) {
            if ($id >= $row_id) {
                $closest_row_id = $id;
                break;
            }
        }
        if ($closest_row_id === null) {
            $closest_row_id = end($available_rows);
        }

        $closest_column_id = null;
        foreach ($available_columns as $id) {
            if ($id >= $column_id) {
                $closest_column_id = $id;
                break;
            }
        }
        if ($closest_column_id === null) {
            $closest_column_id = end($available_columns);
        }

        if (isset($price_table[$closest_row_id][$closest_column_id])) {
            return $price_table[$closest_row_id][$closest_column_id] ?? 0;
        }

        return 0;
    }

    public static function get_quote_value($value, $quote_id, $attrs = []): mixed
    {
        $field_id = $attrs['attrs']['field_id'] ?? '';
        if ($field_id) {
            $products = get_post_meta($quote_id, $field_id . '_products', true);
            return is_array($products) ? wp_unslash($products) : [];
        }
        return $value;
    }

    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {

        $value = get_post_meta($quote_id, $field_id, true);
        $products_data = get_post_meta($quote_id, $field_id . '_products', true);
        if (empty($value) || !is_array($products_data)) {
            return null;
        }

        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? '';

        // Build products array with names and images
        $products = [];
        foreach ($products_data as $product_data) {
            $product_id = $product_data['product_id'] ?? null;
            if (!$product_id) continue;

            $product = wc_get_product($product_id);
            if (!$product)  continue;
            $products[] = [
                'name' => $product->get_name(),
                'image' => $this->get_product_image_src_or_placeholder($product, 'thumbnail'),
            ];
        }
        if (empty($products))  return null;

        return [
            'block_type' => 'booking/' . static::get_block_name(),
            'label' => $label,
            'products' => $products,
        ];
    }

    protected static function get_field_label(string $field_id, $count = 1): string
    {
        $block = static::get_block($field_id);
        $label_options = $block['attrs']['general']['number_options'] ?? [];
        if (empty($label_options)) return __('Field', 'wpcbooking');

        return $count > 1 ? $label_options['plural'] : $label_options['singular'];
    }

    private static function get_product_image_or_placeholder($product, $size = 'medium', $attr = []): string
    {
        $thumbnail_id = $product->get_image_id();

        if (!$thumbnail_id) {
            return function_exists('wc_placeholder_img')
                ? wc_placeholder_img($size, $attr)
                : '';
        }

        $image_path = get_attached_file($thumbnail_id);

        if (!$image_path || !file_exists($image_path)) {
            return function_exists('wc_placeholder_img')
                ? wc_placeholder_img($size, $attr)
                : '';
        }

        return $product->get_image($size, $attr);
    }

    private static function get_product_image_src_or_placeholder($product, $size = 'medium'): string
    {
        $thumbnail_id = $product->get_image_id();

        if (!$thumbnail_id) {
            // Get WooCommerce placeholder image src
            if (function_exists('wc_placeholder_img_src')) {
                return wc_placeholder_img_src($size);
            }
            return '';
        }

        $image_path = get_attached_file($thumbnail_id);

        if (!$image_path || !file_exists($image_path)) {
            if (function_exists('wc_placeholder_img_src')) {
                return wc_placeholder_img_src($size);
            }
            return '';
        }

        // wp_get_attachment_image_src returns [src, width, height, is_intermediate]
        $image_src_data = wp_get_attachment_image_src($thumbnail_id, $size);
        if ($image_src_data && isset($image_src_data[0])) {
            return $image_src_data[0];
        }

        // Fallback: use Woo placeholder if for some reason src isn't available
        if (function_exists('wc_placeholder_img_src')) {
            return wc_placeholder_img_src($size);
        }
        return '';
    }

    public function update_block(int $quote_id, array $post_data = [], array $block = []): void
    {
        $field_id = $block['attrs']['field_id'] ?? '';
        if (!is_admin() || !$field_id || !$this->is_valid_quote_id($quote_id)) return;

        $products_raw = $post_data[$field_id] ?? [];
        if (empty($products_raw) || !is_array($products_raw)) {
            return;
        }

        $mapped_products = [];
        foreach ($products_raw as $index => $product_input) {
            if (!is_array($product_input)) {
                continue;
            }

            $mapped_products[] = $this->map_post_data_to_product($product_input, $field_id);
        }

        $data = $this->set_products($quote_id, $field_id, $mapped_products, $block);
        $data[$field_id . '_products'] = $mapped_products;
        $this->save_meta_data($quote_id, $data);
    }

    protected function map_post_data_to_product(array $input, string $field_id): array
    {
        $product = [
            'field_id' => $field_id,
            'product_id' => $input['product_id'] ?? null,
            'price_type' => $input['price_type'] ?? 'fixed',
        ];

        switch ($product['price_type']) {
            case 'fixed':
            case 'per_field':
                $product['qty_type'] = $this->map_qty_type($input['qty_type'] ?? 'not_connected');
                $product['qty'] = isset($input['qty']) ? intval($input['qty']) : 1;
                $product['qty_field'] = $input['qty_field'] ?? null;
                $product['price'] = isset($input['price']) ? floatval($input['price']) : 0;
                break;

            case 'percentage':

                $product['percentage_operation'] = $input['percentage_operation'] ?? 'add';
                $product['percentage_value'] = isset($input['percentage_value']) ? floatval($input['percentage_value']) : 0;
                $product['price'] = isset($input['price']) ? floatval($input['price']) : 0;
                break;

            case 'table':
                $product['qty_type'] = $this->map_qty_type($input['qty_type'] ?? 'not_connected');
                $product['qty'] = isset($input['qty']) ? intval($input['qty']) : 1;
                $product['qty_field'] = $input['qty_field'] ?? null;
                if (isset($input['table'])) {
                    $product['table'] = wp_unslash($input['table']);
                }
                if (isset($input['table_row_field'])) {
                    $product['table_row_field'] = $input['table_row_field'];
                }
                if (isset($input['table_column_field'])) {
                    $product['table_column_field'] = $input['table_column_field'];
                }
                if (isset($input['row'])) {
                    $product['row'] = intval($input['row']);
                }
                $product['price'] = isset($input['price']) ? floatval($input['price']) : 0;
                break;
        }
        return $product;
    }

    protected function map_qty_type(string $type): string
    {
        if ($type === 'field_connected') {
            return 'per_field';
        }
        if ($type === 'not_connected') {
            return 'fixed';
        }
        return $type;
    }
}
