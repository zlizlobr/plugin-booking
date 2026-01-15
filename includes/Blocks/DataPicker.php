<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class DataPicker extends AbstractBlock
{
    protected static $BLOCK_NAME = 'date-picker';
    protected static $BLOCK_ICON = 'calendar-alt';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Date Picker', 'wpcbooking');
        $this->block_description = __('Display a date picker input field with calendar options', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'calendar-alt';
        $this->block_keywords = ['booking', 'date', 'picker', 'calendar'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'general' => __('General', 'wpcbooking'),
            'advanced' => __('Advanced', 'wpcbooking'),
            'calculation_quote' => __('Calculation Quote', 'wpcbooking'),
            'documentation' => __('Documentation', 'wpcbooking'),
        ];
    }

    protected function get_block_attribute_items(): array
    {
        return [
            [
                'id' => 'general',
                'type' => 'group',
                'label' => __('General', 'wpcbooking'),
                'items' => $this->get_tab_general(),
                'tab' => 'general',
            ],
            [
                'id' => 'advanced',
                'type' => 'group',
                'label' => __('Advanced', 'wpcbooking'),
                'items' => $this->get_tab_advanced(),
                'tab' => 'advanced',
            ],
            [
                'id' => 'calculation_quote',
                'type' => 'group',
                'label' => __('Calculation Quote', 'wpcbooking'),
                'items' => $this->get_tab_calculation_quote(),
                'tab' => 'calculation_quote',
            ],
            'field_id' => [
                'id' => 'field_id',
                'type' => 'hidden',
                'value' => $this->get_unique_id(),
            ],
            [
                'type' => 'html',
                'id' => 'documentation_content',
                'content' => $this->get_block_documentation(),
                'tab' => 'documentation',
            ]
        ];
    }


    protected function get_tab_general(): array
    {
        return [
            'thumbnail_id' => [
                'id' => 'thumbnail_id',
                'type' => 'attachment',
                'label' => __('SVG Icon', 'wpcbooking'),
                'attachment_type' => 'image',
                'mime_types' => 'svg',
            ],
            'label' => [
                'id' => 'label',
                'type' => 'text',
                'label' => __('Label', 'wpcbooking'),
                'default' => 'title',
            ],
            'date_picker_options' => [
                'id' => 'date_picker_options',
                'type' => 'group',
                'label' => __('Calendar Options', 'wpcbooking'),
                'items' => $this->get_date_picker_options_items(),
            ],
        ];
    }

    protected function get_date_picker_options_items(): array
    {
        return [
            'mode' => [
                'id' => 'mode',
                'type' => 'select',
                'label' => __('Mode', 'wpcbooking'),
                'description' => __('Choose the operational mode', 'wpcbooking'),
                'options' => [
                    'default' => __('Default', 'wpcbooking'),
                    'custom-select' => __('Custom Select (months, years, time)', 'wpcbooking'),
                ],
                'default' => 'default',
            ],
            'dateMax' => [
                'id' => 'dateMax',
                'type' => 'text',
                'label' => __('Maximum Date', 'wpcbooking'),
                'description' => __('Set maximum selectable date (format: YYYY-MM-DD)', 'wpcbooking'),
                'default' => '2050-12-31',
            ],
            'dateFormat' => [
                'id' => 'dateFormat',
                'type' => 'select',
                'label' => __('Date Format', 'wpcbooking'),
                'description' => __('Choose the date display format', 'wpcbooking'),
                'options' => [
                    'DD/MM/YYYY' => '25/11/2024',
                    'MM/DD/YYYY' => '11/25/2024',
                    'YYYY-MM-DD' => '2024-11-25',
                    'MMMM DD, YYYY' => 'November 25, 2024',
                    'other' => __('Custom', 'wpcbooking'),
                ],
                'default' => 'DD/MM/YYYY',
            ],
            'custom_date_format' => [
                'id' => 'custom_date_format',
                'type' => 'text',
                'label' => __('Custom Date Format', 'wpcbooking'),
                'description' => __('Enter custom date format (e.g., d/m/Y)', 'wpcbooking'),
                'default' => 'd/m/Y',
                'conditions' => [
                    [
                        'field' => '#.dateFormat',
                        'condition' => '==',
                        'value' => 'other',
                    ],
                ],
            ],
            'dateLocale' => [
                'id' => 'dateLocale',
                'type' => 'select',
                'label' => __('Locale', 'wpcbooking'),
                'description' => __('Choose the language/locale', 'wpcbooking'),
                'options' => [
                    'en' => __('English', 'wpcbooking'),
                    'cs' => __('Czech', 'wpcbooking'),
                    'de' => __('German', 'wpcbooking'),
                    'fr' => __('French', 'wpcbooking'),
                    'es' => __('Spanish', 'wpcbooking'),
                    'da' => __('Danish', 'wpcbooking'),
                    'other' => __('Custom', 'wpcbooking'),
                ],
                'default' => 'en',
            ],
            'custom_locale' => [
                'id' => 'custom_locale',
                'type' => 'text',
                'label' => __('Custom Locale', 'wpcbooking'),
                'description' => __('Enter custom locale code (e.g., cs)', 'wpcbooking'),
                'default' => 'cs',
                'conditions' => [
                    [
                        'field' => '#.custom_locale',
                        'condition' => '==',
                        'value' => 'other',
                    ],
                ],
            ],
            'replaceTodayWithText' => [
                'id' => 'replaceTodayWithText',
                'type' => 'text',
                'label' => __('Replace "Today" Text', 'wpcbooking'),
                'description' => __('Custom text to replace "Today" (e.g., Dnes)', 'wpcbooking'),
                'default' => 'Dnes',
            ],
            'custom_arrows' => [
                'id' => 'custom_arrows',
                'type' => 'toggle',
                'label' => __('Custom Navigation Arrows', 'wpcbooking'),
                'description' => __('Enable custom navigation arrows', 'wpcbooking'),
                'default' => false,
            ],
            'arrow_prev_text' => [
                'id' => 'arrow_prev_text',
                'type' => 'text',
                'label' => __('Previous Arrow Text', 'wpcbooking'),
                'description' => __('Enter custom text for previous month arrow (e.g., ←)', 'wpcbooking'),
                'default' => '←',
                'conditions' => [
                    [
                        'field' => '#.custom_arrows',
                        'condition' => '==',
                        'value' => true,
                    ],
                ],
            ],
            'arrow_next_text' => [
                'id' => 'arrow_next_text',
                'type' => 'text',
                'label' => __('Next Arrow Text', 'wpcbooking'),
                'description' => __('Enter custom text for next month arrow (e.g., →)', 'wpcbooking'),
                'default' => '→',
                'conditions' => [
                    [
                        'field' => '#.custom_arrows',
                        'condition' => '==',
                        'value' => true,
                    ],
                ],
            ],
            'allow_past_dates' => [
                'id' => 'allow_past_dates',
                'type' => 'toggle',
                'label' => __('Allow Past Dates', 'wpcbooking'),
                'description' => __('Enable to allow selection of dates in the past', 'wpcbooking'),
            ],
        ];
    }

    protected function get_tab_advanced(): array
    {
        return [
            'placeholder' => [
                'id' => 'placeholder',
                'type' => 'text',
                'label' => __('Placeholder Text', 'wpcbooking'),
                'default' => '',
            ],
            'required' => [
                'id' => 'required',
                'type' => 'toggle',
                'label' => __('Required', 'wpcbooking'),
                'default' => false,
            ],
            'edit_in_qoute' => [
                'id' => 'edit_in_qoute',
                'type' => 'toggle',
                'label' => __('Edit in Quote', 'wpcbooking'),
                'default' => false,
            ],
        ];
    }

    protected function get_tab_calculation_quote(): array
    {
        return [
            'apply_calculation' => [
                'id' => 'apply_calculation',
                'type' => 'toggle',
                'label' => __('Apply price calculation', 'wpcbooking'),
                'default' => false,
            ],
            'busy_day_calculation' => [
                'id' => 'busy_day_calculation',
                'type' => 'multi_group',
                'label' => __('Busy day calculation', 'wpcbooking'),
                'items' => $this->get_busy_day_calculation_items(),
                'conditions' => [
                    [
                        'field' => '#.apply_calculation',
                        'condition' => '==',
                        'value' => true,
                    ],
                ],
            ],
        ];
    }

    protected function get_busy_day_calculation_items(): array
    {
        return [
            'quotes_in_day' => [
                'id' => 'quotes_in_day',
                'type' => 'number',
                'label' => __('Events in day', 'wpcbooking'),
                'default' => 0,
                'min' => 0,
            ],
            'price_increase' => [
                'id' => 'price_increase',
                'type' => 'number',
                'label' => __('Price Increase (%)', 'wpcbooking'),
                'default' => 0,
                'min' => 0,
            ],
        ];
    }

    public static function prepare_block(array $attributes): array
    {
        // Extract general and advanced settings
        $general = $attributes['general'] ?? [];
        $advanced = $attributes['advanced'] ?? [];

        // Get icon URL
        $general['icon_url']    = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;

        // Get label and placeholder
        $label = $general['label'] ?? __('Label', 'wpcbooking');
        $placeholder = $general['placeholder'] ?? false;

        // Get field ID
        $id = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);
        // Prepare field configuration
        $field = [
            'type' => 'date_picker',
            'class' => 'aff-input-date w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
            'id' => esc_attr($id),
            'name' => esc_attr($id),
            'default_value' => '',
        ];

        // Merge date picker options
        $date_picker_options = $general['date_picker_options'] ?? [];
        $field = array_merge($field, $date_picker_options);

        // Handle date format
        if (isset($field['dateFormat']) && 'other' === $field['dateFormat']) {
            $field['dateFormat'] = $field['custom_date_format'] ?? 'd/m/Y';
        }

        // Handle locale
        if (isset($field['dateLocale']) && 'other' === $field['dateLocale']) {
            $field['dateLocale'] = $field['custom_locale'] ?? 'cs';
        }

        // Handle custom arrows
        if (isset($field['custom_arrows']) && $field['custom_arrows']) {
            $field['templates'] = [
                'arrowPrev' => '<button data-vc-arrow="prev">' . esc_html($field['arrow_prev_text'] ?? '←') . '</button>',
                'arrowNext' => '<button data-vc-arrow="next">' . esc_html($field['arrow_next_text'] ?? '→') . '</button>'
            ];
        }

        // Set default values for required fields
        if (!isset($field['mode'])) {
            $field['mode'] = 'default';
        }

        if (!isset($field['dateMax'])) {
            $field['dateMax'] = '2050-12-31';
        }

        if (!isset($field['dateFormat'])) {
            $field['dateFormat'] = 'd/m/Y';
        }

        if (!isset($field['dateLocale'])) {
            $field['dateLocale'] = 'en';
        }

        if (!isset($field['replaceTodayWithText'])) {
            $field['replaceTodayWithText'] = 'Dnes';
        }

        // Set return format for compatibility
        $field['return_format'] = $field['dateFormat'] ?? 'd/m/Y';

        // Handle required field
        if (!empty($advanced['required']) && is_array($advanced['required']) && $advanced['required'] === 'Required') {
            $field['required'] = true;
        }

        // Handle placeholder
        if (isset($placeholder)) {
            $field['placeholder'] = esc_html($placeholder);
        }

        // Prepare the attributes array with all necessary data
        $prepared_attributes = array_merge($attributes, [
            'label' => $label,
            'placeholder' => $placeholder,
            'id' => $id,
            'field' => $field,
            'general' => $general,
            'advanced' => $advanced,
            'block_icon' => static::get_block_icon(),
        ]);

        // Load price_increase and quotes_count if calculation is enabled
        $quote_id = static::get_current_quote_id();
        if (is_int($quote_id)) {
            $prepared_attributes['value'] = static::get_quote_value('', $quote_id, $attributes);
        }
        if (is_int($quote_id) && isset($attributes['calculation_quote']['apply_calculation']) && $attributes['calculation_quote']['apply_calculation'] == 1) {
            $prepared_attributes['quote_id'] = $quote_id;
            $prepared_attributes['price_increase'] = get_post_meta($quote_id, $id . '_price_increase', true) ?? [];

            $prepared_attributes['quotes_count'] = static::get_quotes_count_for_date($id, $prepared_attributes['value'] ?? []);
        }

        return $prepared_attributes;
    }
    public static function enqueue_scripts()
    {
        // Calendar je nyní čistý Preact komponent bez závislostí na Vanilla Calendar
        // Žádné další skripty nejsou potřeba
    }

    public static function public_scripts_deps($attrs)
    {
        // Calendar již nepotřebuje vanilla-calendar-pro ani preline-datepicker
        return $attrs;
    }

    public function get_block_rules($rules, $attrs): array
    {
        $block_attrs = $attrs['attrs'] ?? $attrs;
        $rules['required'] = isset($block_attrs['advanced']['required']) && $block_attrs['advanced']['required'] == 1;
        $rules['date'] = true;
        return $rules;
    }
    public function update_block(int $quote_id, array $post_data = [], array $block = []): void
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!is_admin() || !$field_id || !$this->is_valid_quote_id($quote_id)) return;
        $data[$field_id] = $post_data[$field_id] ?? null;
        $percentage_data = $post_data[$field_id . '_percentage'] ?? null;
        if ($percentage_data) {
            $data[$field_id . '_percentage'] = [
                'price_increase' => $percentage_data['price_increase'] ?? 0,
                'operation' => isset($percentage_data['operation']) && $percentage_data['operation'] === '-' ? 'subtract' : 'add'
            ];
            $data[$field_id . '_fee_amount'] = $percentage_data['price'] ?? 0;
            $data[$field_id . '_fee_label'] = $percentage_data['label'] ?? __('Day occupancy Fee', 'wpcbooking');
        }
         $this->save_meta_data($quote_id, $data);
    }
    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!$field_id || !$this->is_valid_quote_id($quote_id)) return null;
        $calculation_quote = $block['attrs']['calculation_quote'] ?? [];
        $data = $this->calculate_busy_day_price_increase($calculation_quote, $field_id, $value);
        $data[$field_id] = $value;
        $this->save_meta_data($quote_id, $data);
        return $data;
    }

    protected function calculate_busy_day_price_increase(array $calculation_quote, string $field_id, string $value): array
    {
        global $wpdb;

        $data = [];

        if (!isset($calculation_quote['apply_calculation']) || $calculation_quote['apply_calculation'] !== '1' || !$field_id || !$value) {
            return $data;
        }

        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(DISTINCT pm.post_id) 
                    FROM {$wpdb->postmeta} pm
                    JOIN {$wpdb->posts} p ON pm.post_id = p.ID
                    WHERE pm.meta_key = %s 
                    AND pm.meta_value = %s
                    AND p.post_status = 'publish'",
            $field_id,
            $value
        ));

        $busy_day_calculation = $calculation_quote['busy_day_calculation'] ?? [];

        if (!empty($busy_day_calculation) && is_array($busy_day_calculation)) {
            $calculation_table = ['quotes_in_day' => [], 'price_increase' => []];

            foreach ($busy_day_calculation as $index => $item) {
                if (isset($item['quotes_in_day']) && isset($item['price_increase'])) {
                    $calculation_table['quotes_in_day'][$index] = $item['quotes_in_day'];
                    $calculation_table['price_increase'][$index] = $item['price_increase'];
                }
            }

            $check_increase = $this->find_nearest_key($calculation_table['quotes_in_day'], $count, 'down') ?? 0;

            if (!empty($check_increase) && isset($calculation_table['price_increase'][$check_increase])) {
                $data[$field_id . '_percentage'] = [[
                    'price_increase' => $calculation_table['price_increase'][$check_increase] ?? 0,
                    'operation' => 'add'
                ]];
            }
        }

        return $data;
    }

    protected function find_nearest_key(array $values, int $target, string $direction = 'nearest'): ?int
    {
        ksort($values);

        if (in_array($target, $values, true)) {
            return array_search($target, $values, true);
        }

        $closestKey = null;
        $closestValue = null;

        foreach ($values as $key => $value) {
            if ($direction === 'up' && $value >= $target) {
                $closestKey = $key;
                break;
            } elseif ($direction === 'down' && $value <= $target) {
                $closestKey = $key;
            } elseif ($direction === 'nearest') {
                if ($closestValue === null || abs($value - $target) < abs($closestValue - $target)) {
                    $closestKey = $key;
                    $closestValue = $value;
                }
            }
        }

        return $closestKey;
    }

    /**
     * Get count of quotes for a specific date
     *
     * @param string $field_id The field ID
     * @param string $date_value The date value (YYYY-MM-DD format)
     * @return int Number of quotes for the date
     */
    public static function get_quotes_count_for_date(string $field_id, string $date_value): int
    {
        global $wpdb;

        if (empty($field_id) || empty($date_value)) {
            return 0;
        }

        $count = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(DISTINCT pm.post_id) 
                    FROM {$wpdb->postmeta} pm
                    JOIN {$wpdb->posts} p ON pm.post_id = p.ID
                    WHERE pm.meta_key = %s 
                    AND pm.meta_value = %s
                    AND p.post_status = 'publish'",
            $field_id,
            $date_value
        ));

        return (int) $count;
    }

    /**
     * Get render data for summary section
     *
     * @param mixed $default Default value
     * @param int $quote_id Quote ID
     * @param string $field_id Field ID
     * @param array $block Block attributes
     * @return array|null Structured data for frontend rendering
     */
    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);

        if (empty($value)) {
            return null;
        }

        // Get label from block attributes
        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? __('Date', 'wpcbooking');

        // Format date if needed
        $date_format = $block['attrs']['general']['date_picker_options']['dateFormat'] ?? 'DD/MM/YYYY';
        $formatted_value = $this->format_date_for_display($value, $date_format);

        return [
            'block_type' => 'booking/date-picker',
            'label' => $label,
            'value' => $value,
            'formatted_value' => $formatted_value,
        ];
    }

    /**
     * Format date for display
     *
     * @param string $value Date value
     * @param string $format Desired format
     * @return string Formatted date
     */
    protected function format_date_for_display(string $value, string $format): string
    {
        try {
            $date = new \DateTime($value);

            // Convert format to PHP date format
            $php_format = match ($format) {
                'DD/MM/YYYY' => 'd/m/Y',
                'MM/DD/YYYY' => 'm/d/Y',
                'YYYY-MM-DD' => 'Y-m-d',
                'MMMM DD, YYYY' => 'F d, Y',
                default => $format,
            };

            return $date->format($php_format);
        } catch (\Exception $e) {
            return $value;
        }
    }
}
