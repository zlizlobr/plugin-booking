<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class EmailInput extends AbstractBlock
{
    protected static $BLOCK_NAME = 'email-input';
    protected static $BLOCK_ICON = 'email-alt';
    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Email Input', 'wpcbooking');
        $this->block_description = __('Display an email input field with validation', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'email-alt';
        $this->block_keywords = ['booking', 'email', 'input', 'form'];
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
                'id' => 'user',
                'type' => 'group',
                'label' => __('User', 'wpcbooking'),
                'items' => $this->get_tab_user(),
                'tab' => 'user',
            ],
            'field_id' => [
                'type' => 'text',
                'id' => 'field_id',
                'default' => $this->get_unique_id(),
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
                'default' => '',
            ],
            'required' => [
                'id' => 'required',
                'type' => 'toggle',
                'label' => __('Required', 'wpcbooking'),
                'default' => false,
            ]
        ];
    }

    protected function get_tab_user(): array
    {
        return [
            'create_account' => [
                'id' => 'create_account',
                'type' => 'toggle',
                'label' => __('Create Account', 'wpcbooking'),
                'default' => false,
                'description' => __('Automatically create WordPress user account with this email', 'wpcbooking'),
            ],
            'user_role' => [
                'id' => 'user_role',
                'type' => 'select',
                'label' => __('User Role', 'wpcbooking'),
                'default' => 'subscriber',
                'options' => [
                    'subscriber' => __('Subscriber', 'wpcbooking'),
                    'customer' => __('Customer', 'wpcbooking'),
                ],
                'conditions' => [
                    [
                        'field' => '#.create_account',
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
            'type' => 'email',
            'class' => 'w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
            'id' => $id,
            'name' => $id,
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

    public function validate_block($errors, $value, $block): array
    {
        $required = isset($block['attrs']['advanced']['required']) && $block['attrs']['advanced']['required']  == 1;
        $value = trim($value);
        if ($required && $value == '') {
            $errors[] = sprintf(__('The %s is required.', 'wpcbooking'), 'Block name');
        }

        if ($value != '' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $errors[] = sprintf(__('The %s is not validate.', 'wpcbooking'), $value);
        }
        return $errors;
    }

    public function get_block_rules($rules, $attrs): array
    {
        $block_attrs = $attrs['attrs'] ?? $attrs;
        $rules['required'] = isset($block_attrs['advanced']['required']) && $block_attrs['advanced']['required'] == 1;
        $rules['email'] = true;
        return $rules;
    }

    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!$field_id || !$this->is_valid_quote_id($quote_id))  return null;

        $data = [$field_id => $value, '_user_email' => $value];
        $user_settings = $block['attrs']['user'] ?? [];
        $create_account = $user_settings['create_account'] ?? false;
        if ($create_account && !empty($value) && is_email($value)) {
            $this->add_fluent_contact([
                'email' => $value,
                'first_name' => get_post_meta($quote_id, '_user_first_name', true) ?: '',
                'last_name' => get_post_meta($quote_id, '_user_last_name', true) ?: ''
            ]);
            $this->create_wp_user($quote_id, $value, $block);
        }
        $this->save_meta_data($quote_id, $data);
        return $data;
    }


    protected function create_wp_user(int $quote_id, string $email, array $block): void
    {
        if (email_exists($email)) {
            $user = get_user_by('email', $email);
            if ($user) {
                update_post_meta($quote_id, '_user_id', $user->ID);
                update_post_meta($quote_id, '_creator_user_id', $user->ID);
            }
            return;
        }

        $user_settings = $block['attrs']['user'] ?? [];
        $user_role = $user_settings['user_role'] ?? 'subscriber';

        $first_name = get_post_meta($quote_id, '_user_first_name', true) ?: '';
        $last_name = get_post_meta($quote_id, '_user_last_name', true) ?: '';

        $username = $this->generate_username($email, $first_name, $last_name);
        $password = wp_generate_password(12, true, true);

        $userdata = [
            'user_login' => $username,
            'user_email' => $email,
            'user_pass' => $password,
            'role' => $user_role,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'display_name' => trim($first_name . ' ' . $last_name) ?: $username,
        ];

        $user_id = wp_insert_user($userdata);

        if (is_wp_error($user_id)) {
            error_log(sprintf(
                '❌ [EmailInput] Failed to create user: %s',
                $user_id->get_error_message()
            ));
            return;
        }

        update_post_meta($quote_id, '_user_id', $user_id);

        do_action('wpcbooking_user_created', $user_id, $quote_id, $email, $password);
    }


    protected function generate_username(string $email, string $first_name = '', string $last_name = ''): string
    {
        if ($first_name && $last_name) {
            $base = sanitize_user(strtolower($first_name . '.' . $last_name));
        } else {
            $base = sanitize_user(strtolower(strstr($email, '@', true)));
        }

        $username = $base;
        $counter = 1;

        while (username_exists($username)) {
            $username = $base . $counter;
            $counter++;
        }

        return $username;
    }

    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);

        if (empty($value)) {
            return null;
        }

        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? __('Email', 'wpcbooking');

        return [
            'block_type' => 'booking/email-input',
            'label' => $label,
            'value' => $value,
        ];
    }
}
