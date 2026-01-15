<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class TimePicker extends AbstractBlock
{
    protected static $BLOCK_NAME = 'time-picker';
    protected static $BLOCK_ICON = 'clock';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('TimePicker Input', 'wpcbooking');
        $this->block_description = __('Display a time picker input field with time restrictions', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'clock';
        $this->block_keywords = ['booking', 'time', 'picker', 'input', 'form', 'clock'];
    }

    protected function init_hooks(): void
    {
        parent::init_hooks();
        add_filter('wpcbooking_public_styles_deps', [$this, 'public_styles_deps']);
    }

    public function public_styles_deps($deps)
    {
        return array_merge($deps, ['flatpickr-css']);
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
                'type' => 'group',
                'id' => 'general',
                'label' => __('General', 'wpcbooking'),
                'items' => $this->get_tab_general(),
                'tab' => 'general',
            ],
            [
                'type' => 'group',
                'id' => 'advanced',
                'label' => __('Advanced', 'wpcbooking'),
                'items' => $this->get_tab_advanced(),
                'tab' => 'advanced',
            ],
            [
                'type' => 'group',
                'id' => 'calculation_quote',
                'label' => __('Calculation Quote', 'wpcbooking'),
                'items' => $this->get_tab_calculation_quote(),
                'tab' => 'calculation_quote',
            ],
            'field_id' => [
                'type' => 'hidden',
                'id' => 'field_id',
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
            'time_picker_options' => [
                'id' => 'time_picker_options',
                'type' => 'group',
                'label' => __('Time Options', 'wpcbooking'),
                'items' => $this->get_time_options(),
            ],
        ];
    }

    protected function get_time_options(): array
    {
        return [
            'display_format' => [
                'id' => 'display_format',
                'type' => 'radio',
                'label' => __('Display Format', 'wpcbooking'),
                'description' => __('The format displayed when editing a post', 'wpcbooking'),
                'options' => [
                    'g:i a' => '7:41 am',
                    'H:i:s' => '07:41:22',
                    'other' => 'Custom',
                ],
                'default' => 'g:i a',
            ],
            'set_custom_format' => [
                'id' => 'set_custom_format',
                'type' => 'text',
                'label' => __('Set custom Time format', 'wpcbooking'),
                'default' => 'g:i a',
                'conditions' => [
                    [
                        'field' => '#.display_format',
                        'condition' => '==',
                        'value' => 'other',
                    ],
                ],
            ],
            'min_time' => [
                'id' => 'min_time',
                'type' => 'text',
                'label' => __('Min Time', 'wpcbooking'),
                'placeholder' => '12:00',
            ],
            'max_time' => [
                'id' => 'max_time',
                'type' => 'text',
                'label' => __('Max Time', 'wpcbooking'),
                'placeholder' => '23:59',
            ],
            'minute_increment' => [
                'id' => 'minute_increment',
                'type' => 'select',
                'label' => __('Minute Increment', 'wpcbooking'),
                'description' => __('Select the step for minute selection', 'wpcbooking'),
                'options' => [
                    '1' => __('1 minute', 'wpcbooking'),
                    '5' => __('5 minutes', 'wpcbooking'),
                    '15' => __('15 minutes', 'wpcbooking'),
                ],
                'default' => '1',
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
            ],
            'required' => [
                'id' => 'required',
                'type' => 'toggle',
                'label' => __('Required', 'wpcbooking'),
            ]
        ];
    }

    protected function get_tab_calculation_quote(): array
    {
        return [
            'apply_calculation' => [
                'id' => 'apply_calculation',
                'type' => 'toggle',
                'label' => __('Apply price calculation', 'wpcbooking'),
            ],
            'busy_day_calculation' => [
                'id' => 'busy_day_calculation',
                'type' => 'multi_group',
                'label' => __('Busy day calculation', 'wpcbooking'),
                'items' => [
                    'quotes_in_day' => [
                        'id' => 'quotes_in_day',
                        'type' => 'number',
                        'label' => __('Events in day', 'wpcbooking'),
                    ],
                    'price_increase' => [
                        'id' => 'price_increase',
                        'type' => 'number',
                        'label' => __('Price Increase (%)', 'wpcbooking'),
                    ],
                ],
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

    public static function prepare_block(array $attributes): array
    {
        // Extract general and advanced settings
        $general = $attributes['general'] ?? [];
        $advanced = $attributes['advanced'] ?? [];

        // Get time picker options - handle both old and new naming
        $options_field_type = $general['time_picker_options'] ?? $general['timepicker_options'] ?? [];

        // Get icon URL
        $general['icon_url'] = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;

        // Get label and placeholder
        $label = $general['label'] ?? __('Label', 'wpcbooking');
        $placeholder = $general['placeholder'] ?? false;

        // Get field ID
        $key = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);

        // Prepare field configuration
        $field = [
            'type' => 'time_picker',
            'class' => 'w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
            'id' => esc_attr($key),
            'name' => esc_attr($key),
            'default_value' => '',
            'min_time' => $options_field_type['min_time'] ?? '',
            'max_time' => $options_field_type['max_time'] ?? '',
            'min_hour' => '',
            'max_hour' => '',
            'min_min' => '',
            'max_min' => '',
            'min_sec' => '',
            'max_sec' => '',
        ];

        // Merge time picker options
        $field = array_merge($field, $options_field_type);

        // Handle display format
        $default_format = 'g:i a';
        $raw_display_format = $options_field_type['display_format'] ?? '';

        // Get custom format if display_format is 'other'
        if ('other' === $raw_display_format) {
            $custom_format = $options_field_type['set_custom_format'] ?? $default_format;
            $display_format = $custom_format;
        } else {
            $display_format = $raw_display_format ?: $default_format;
        }

        // Map PHP formats to Flatpickr formats
        // Flatpickr format tokens:
        // g = hour (1-12) without leading zeros
        // h = hour (01-12) with leading zeros
        // H = hour (00-23) with leading zeros  
        // i = minutes (00-59)
        // S = seconds (00-59)
        // K = AM/PM uppercase
        $flatpickr_format_map = [
            'g:i a' => 'g:i K',      // 12-hour without leading zero with AM/PM (e.g., 2:30 PM)
            'H:i:s' => 'H:i:S',      // 24-hour with seconds (e.g., 14:30:22)
            'H:i' => 'H:i',          // 24-hour without seconds (e.g., 14:30)
            'g:i' => 'g:i K',        // 12-hour without leading zero with AM/PM (e.g., 2:30 PM)
        ];

        // Map custom formats - try to convert common PHP time formats to Flatpickr
        $flatpickr_format = $flatpickr_format_map[$display_format] ?? $display_format;

        // If custom format, try to convert PHP format tokens to Flatpickr tokens
        if (!isset($flatpickr_format_map[$display_format])) {
            // Convert common PHP time format tokens to Flatpickr tokens
            $flatpickr_format = str_replace(
                ['a', 'A'],  // PHP lowercase/uppercase AM/PM
                ['K', 'K'],  // Flatpickr AM/PM (always uppercase)
                $display_format
            );
        }

        $field['display_format'] = $display_format;
        $field['flatpickr_format'] = $flatpickr_format;
        $field['return_format'] = $display_format;

        // Ensure time_picker_options are passed to general for JS component
        // Remove old timepicker_options if exists
        unset($general['timepicker_options']);

        $general['time_picker_options'] = array_merge($options_field_type, [
            'display_format' => $flatpickr_format,
            'minute_increment' => $options_field_type['minute_increment'] ?? '1',
        ]);

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
            'id' => $key,
            'field' => $field,
            'general' => $general,
            'advanced' => $advanced,
            'block_icon' => static::get_block_icon(),
        ]);
        $quote_id = static::get_current_quote_id();
        if (is_int($quote_id)) {
            $prepared_attributes['value'] = static::get_quote_value('', $quote_id, $attributes);
        }

        return $prepared_attributes;
    }
    public static function enqueue_scripts()
    {
        // Flatpickr CSS - načítání přes CDN
        wp_enqueue_style(
            'flatpickr-css',
            'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
            [],
            '4.6.13'
        );

        // Flatpickr JS - načítání přes CDN
        wp_enqueue_script(
            'flatpickr-js',
            'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.js',
            [],
            '4.6.13',
            true
        );
    }

    public static function public_scripts_deps($attrs)
    {
        return array_merge($attrs, ['flatpickr-js']);
    }

    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!$field_id || !$this->is_valid_quote_id($quote_id)) return null;
        //dev: set timestamp for unique value
        $data = [$field_id => $value];
        $this->save_meta_data($quote_id, $data);
        return $data;
    }

    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);

        if (empty($value)) {
            return null;
        }

        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? __('Time', 'wpcbooking');

        return [
            'block_type' => 'booking/time-picker',
            'label' => $label,
            'value' => $value,
        ];
    }
}
