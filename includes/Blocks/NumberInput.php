<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class NumberInput extends AbstractBlock
{
    protected static $BLOCK_NAME = 'number-input';
    protected static $BLOCK_ICON = 'calculator';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Number Input', 'wpcbooking');
        $this->block_description = __('Display a number input field with validation and options', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'calculator';
        $this->block_keywords = ['booking', 'number', 'input', 'form', 'quantity'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'general' => __('General', 'wpcbooking'),
            'advanced' => __('Advanced', 'wpcbooking'),
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
            'default' => [
                'id' => 'default',
                'type' => 'number',
                'label' => __('Default number', 'wpcbooking'),
                'min' => 0,
            ],
            'number_options' => [
                'id' => 'number_options',
                'type' => 'group',
                'label' => __('Number Options', 'wpcbooking'),
                'items' => $this->get_number_options(),
            ],
            'add_after' => [
                'id' => 'add_after',
                'type' => 'number',
                'label' => __('Add after', 'wpcbooking'),
                'default' => 1,
                'min' => 0,
            ],
        ];
    }

    protected function get_number_options(): array
    {
        return [
            'min' => [
                'id' => 'min',
                'type' => 'number',
                'label' => __('Minimum Value', 'wpcbooking'),
                'min' => 0,
            ],
            'max' => [
                'id' => 'max',
                'type' => 'number',
                'label' => __('Maximum Value', 'wpcbooking'),
                'min' => 0,
            ],
            'singular' => [
                'id' => 'singular',
                'type' => 'text',
                'label' => __('Singular', 'wpcbooking'),
            ],

            'plural' => [
                'id' => 'plural',
                'type' => 'text',
                'label' => __('Plural', 'wpcbooking'),
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

    public static function prepare_block(array $attributes): array
    {
        // Extract general and advanced settings
        $general = $attributes['general'] ?? [];
        $advanced = $attributes['advanced'] ?? [];

        // Get icon URL
        $icon = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;
        $general['icon_url'] = $icon;

        // Get label and placeholder
        $label = $general['label'] ?? __('Label', 'wpcbooking');
        $placeholder = $general['placeholder'] ?? false;

        // Get field ID
        $key = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);

        // Prepare field configuration
        $field = [
            'id' => $key,
            'name' => $key,
            'label-field' => esc_html($label),
            'default_value' => $general['default'] ?? 1,
         ];

        // Get number options
        $options_field_type = $general['number_options'] ?? [];
        $field = array_merge($field, $options_field_type);

        if (isset($options_field_type['singular'])) {
            $field['singular'] = esc_html($options_field_type['singular']);
        }
        if (isset($options_field_type['plural'])) {
            $field['plural'] = esc_html($options_field_type['plural']);
        }
        if (isset($options_field_type['max'])) {
            $field['max'] = esc_html($options_field_type['max']);
        }
        if (isset($options_field_type['min'])) {
            $field['min'] = esc_html($options_field_type['min']);
        }

        // Variable add quantity
        $field["add_after"] = $general["add_after"] ?? 1;

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
            'icon' => $icon,
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
    public function get_block_rules($rules, $attrs): array
    {
        $block_attrs = $attrs['attrs'] ?? $attrs;
        $rules['number'] = true;

        // Get number options from general settings
        $number_options = $block_attrs['general']['number_options'] ?? [];
        if (isset($number_options['min'])) {
            $rules['min'] = (int) $number_options['min'];
        } else {
            $rules['min'] = 1;
        }

        if (isset($number_options['max'])) {
            $rules['max'] = (int) $number_options['max'];
        }

        $rules['required'] = isset($block_attrs['advanced']['required']) && $block_attrs['advanced']['required'] == 1;

        return $rules;
    }

    public function validate_block($errors, $value, $block): array
    {
        $required = isset($block['attrs']['advanced']['required']) && $block['attrs']['advanced']['required'] == 1;
        $value = trim($value);

        // Check required
        if ($required && ($value === '' || $value === null)) {
            $label = $block['attrs']['general']['label'] ?? __('Number', 'wpcbooking');
            $errors[] = sprintf(__('The %s is required.', 'wpcbooking'), $label);
            return $errors;
        }

        // If value is empty and not required, it's valid
        if ($value === '' || $value === null) {
            return $errors;
        }

        // Check if it's a valid number
        if (!is_numeric($value)) {
            $errors[] = __('Please enter a valid number.', 'wpcbooking');
            return $errors;
        }

        $number_value = (float) $value;
        $number_options = $block['attrs']['general']['number_options'] ?? [];

        // Check minimum value
        if (isset($number_options['min']) && $number_value < (float) $number_options['min']) {
            $min = $number_options['min'];
            $errors[] = sprintf(__('The value must be at least %s.', 'wpcbooking'), $min);
        }

        // Check maximum value
        if (isset($number_options['max']) && $number_value > (float) $number_options['max']) {
            $max = $number_options['max'];
            $errors[] = sprintf(__('The value must be at most %s.', 'wpcbooking'), $max);
        }

        return $errors;
    }

    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        $value = isset($block['attrs']['general']['default']) && '' === $value || null === $value ? $block['attrs']['general']['default'] : $value;

        if (!$field_id) return null;
        $data = [$field_id => $value];
        $this->save_meta_data($quote_id, $data);
        return $data;
    }

    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);

        if (empty($value) && $value !== 0 && $value !== '0') {
            return null;
        }

        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? __('Number', 'wpcbooking');
        $suffix = $block['attrs']['general']['suffix'] ?? '';

        return [
            'block_type' => 'booking/number-input',
            'label' => $label,
            'value' => $value,
            'suffix' => $suffix,
        ];
    }
}
