<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class TextInput extends AbstractBlock
{
    protected static $BLOCK_NAME = 'text-input';
    protected static $BLOCK_ICON = 'text';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Text Input', 'wpcbooking');
        $this->block_description = __('Display a text input field with validation', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'text';
        $this->block_keywords = ['booking', 'text', 'input', 'form'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'general' => __('General', 'wpcbooking'),
            'advanced' => __('Advanced', 'wpcbooking'),
            'user' => __('User', 'wpcbooking'),
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
                'id' => 'user',
                'label' => __('User', 'wpcbooking'),
                'items' => $this->get_tab_user(),
                'tab' => 'user',
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

    protected function get_tab_user(): array
    {
        return [
            'user_field' => [
                'id' => 'user_field',
                'type' => 'select',
                'label' => __('User Field Mapping', 'wpcbooking'),
                'default' => '',
                'description' => __('Map this field to a WordPress user field', 'wpcbooking'),
                'options' => [
                    '' => __('- Select Field -', 'wpcbooking'),
                    'first_name' => __('First Name', 'wpcbooking'),
                    'last_name' => __('Last Name', 'wpcbooking'),
                    'first_last_name' => __('First & Last Name (combined)', 'wpcbooking'),
                    'user_login' => __('Username', 'wpcbooking'),
                    'display_name' => __('Display Name', 'wpcbooking'),
                    'nickname' => __('Nickname', 'wpcbooking'),
                    'user_url' => __('Website', 'wpcbooking'),
                    'description' => __('Biographical Info', 'wpcbooking'),
                    'billing_company' => __('Billing Company', 'wpcbooking'),
                    'billing_address_1' => __('Billing Address 1', 'wpcbooking'),
                    'billing_address_2' => __('Billing Address 2', 'wpcbooking'),
                    'billing_city' => __('Billing City', 'wpcbooking'),
                    'billing_state' => __('Billing State', 'wpcbooking'),
                    'billing_postcode' => __('Billing Postcode', 'wpcbooking'),
                    'billing_country' => __('Billing Country', 'wpcbooking'),
                    'shipping_company' => __('Shipping Company', 'wpcbooking'),
                    'shipping_address_1' => __('Shipping Address 1', 'wpcbooking'),
                    'shipping_address_2' => __('Shipping Address 2', 'wpcbooking'),
                    'shipping_city' => __('Shipping City', 'wpcbooking'),
                    'shipping_state' => __('Shipping State', 'wpcbooking'),
                    'shipping_postcode' => __('Shipping Postcode', 'wpcbooking'),
                    'shipping_country' => __('Shipping Country', 'wpcbooking'),
                ],
            ],
        ];
    }

    public static function prepare_block(array $attributes): array
    {
        // Extract general and advanced settings
        $general = $attributes['general'] ?? [];
        $advanced = $attributes['advanced'] ?? [];

        // Get icon URL
        $general['icon_url'] = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;

        // Get label and placeholder
        $label = $general['label'] ?? __('Label', 'wpcbooking');
        $placeholder = $general['placeholder'] ?? ($advanced['placeholder'] ?? false);
        
        // Add placeholder to general for consistency with JSX
        if ($placeholder) {
            $general['placeholder'] = $placeholder;
        }

        // Get field ID
        $id = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);

        // Prepare field configuration
        $field = [
            'type' => 'text',
            'class' => 'w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
            'id' => esc_attr($id),
            'name' => esc_attr($id),
         ];

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

        $quote_id = static::get_current_quote_id();
        if (is_int($quote_id)) {
            $prepared_attributes['value'] = static::get_quote_value('', $quote_id, $attributes);
        }
        return $prepared_attributes;
    }

    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!$field_id || !$this->is_valid_quote_id($quote_id))  return null;
        $data = [$field_id => $value];
        $user_field = $block['attrs']['user']['user_field'] ?? null;
        if ($user_field && $user_field !== '') {
            if ($user_field === 'first_last_name') {
                $user_name = explode(' ', (string) $value, 2);
                $data['_user_first_name'] = $user_name[0] ?? '';
                $data['_user_last_name'] = $user_name[1] ?? '';
            } elseif (strpos($user_field, 'billing_') === 0 || strpos($user_field, 'shipping_') === 0) {
                $data['_' . $user_field] = $value;
            } else {
                $data['_user_' . $user_field] = $value;
            }
            $email = get_post_meta($quote_id, '_user_email', true);
            if ($email) {
                $this->add_fluent_contact(['email' => $email, 'first_name' => $data['_user_first_name'], 'last_name' => $data['_user_last_name']]);
            }
        }
        $this->save_meta_data($quote_id, $data);
        return $data;
    }
    
    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);
        
        if (empty($value)) {
            return null;
        }
        
        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? __('Text', 'wpcbooking');
        
        return [
            'block_type' => 'booking/text-input',
            'label' => $label,
            'value' => $value,
        ];
    }
    
}
