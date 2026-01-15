<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class IconsList extends AbstractBlock
{
    protected static $BLOCK_NAME = 'icons-list';
    protected static $BLOCK_ICON = 'ellipsis';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Pick Icons', 'wpcbooking');
        $this->block_description = __('Display a list of icons for selection', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'ellipsis';
        $this->block_keywords = ['booking', 'icons', 'list', 'selection', 'svg'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'icons' => __('Icons', 'wpcbooking'),
            'documentation' => __('Documentation', 'wpcbooking'),
        ];
    }

    protected function get_block_attribute_items(): array
    {
        return [
            [
                'type' => 'group',
                'id' => 'general',
                'label' => __('Icons', 'wpcbooking'),
                'items' => $this->get_tab_icons(),
                'tab' => 'icons',
            ],
            /*[
                'type' => 'group',
                'id' => 'advanced',
                'label' => __('Advanced', 'wpcbooking'),
                'items' => $this->get_tab_advanced(),
                'tab' => 'advanced',
            ],*/
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


    protected function get_tab_icons(): array
    {
        return [
            'icons' => [
                'id' => 'icons',
                'type' => 'multi_group',
                'label' => __('Icons', 'wpcbooking'),
                'items' => $this->get_icon_fields(),
                'min' => 0,
            ],
            'number_allowed' => [
                'id' => 'number_allowed',
                'type' => 'number',
                'label' => __('Number of Choices Allowed', 'wpcbooking'),
                'default' => 1,
            ],
            'label' => [
                'id' => 'label',
                'type' => 'text',
                'label' => __('Label', 'wpcbooking'),
            ],
        ];
    }

    protected function get_icon_fields(): array
    {
        return [
            'label' => [
                'id' => 'label',
                'type' => 'textarea',
                'label' => __('Label', 'wpcbooking'),
                'rows' => 4,
            ],
            'icon' => [
                'id' => 'icon',
                'type' => 'attachment',
                'label' => __('SVG Ikona', 'wpcbooking'),
                'attachment_type' => 'image',
                'mime_types' => 'svg',
            ],
            'thumbnail_id_mail' => [
                'id' => 'thumbnail_id_mail',
                'type' => 'attachment',
                'label' => __('Email Ikona', 'wpcbooking'),
                'attachment_type' => 'image',
                'mime_types' => 'png',
            ],

        ];
    }

    protected function get_tab_advanced(): array
    {
        return [];
    }

    public static function prepare_block(array $attributes): array
    {
        // Extract general settings
        $general = $attributes['general'] ?? false;

        if (!$general) {
            return $attributes;
        }

        // Get icons repeater
        $icons_repeater = $general['icons'] ?? false;

        if (!$icons_repeater || !is_array($icons_repeater)) {
            return $attributes;
        }

        // Get number allowed and field ID
        $number_allowed = $general['number_allowed'] ?? 1;
        $id = $attributes['field_id'] ?? '';

        // Process icons data
        $processed_icons = [];
        foreach ($icons_repeater as $index => $row) {
            $label = strip_tags($row["label"]);
            $slug = sanitize_title($label);
            $icon_url = wp_get_attachment_image_url($row["icon"] ?? null, "full");

            $processed_icons[] = [
                'label' => $label,
                'slug' => $slug,
                'icon' => $row["icon"] ?? null,
                'icon_url' => $icon_url,
            ];
        }
        $general['icons'] = $processed_icons;
        // Prepare the attributes array with all necessary data
        $prepared_attributes = array_merge($attributes, [
            'icons_repeater' => $processed_icons,
            'number_allowed' => $number_allowed,
            'id' => $id,
            'label' => __('Pick icons', 'wpcbooking'),
            'general' => $general,
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
        $rules['required'] = true;
        return $rules;
    }
    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;

        if (!$field_id || !$this->is_valid_quote_id($quote_id)) return null;
        $data = [$field_id => $value];
        $this->save_meta_data($quote_id, $data);
        return $data;
    }

    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);
        $icons_data = $block['attrs']['general']['icons'] ?? [];
         $selected_values = array_filter(array_map('trim', explode(',', $value)));
        
        $items = [];
        foreach ($selected_values as $selected_value) {
            foreach ($icons_data as $icon_item) {
                error_log('[IconsList] Icon item: ' . print_r($icon_item, true));
                if ((isset($icon_item['label']) && $icon_item['label'] === $selected_value) || 
                    (isset($icon_item['slug']) && $icon_item['slug'] === $selected_value)) {
                    $items[] = [
                        'label' => $icon_item['label'],
                        'icon' => $icon_item['icon_url'] ?? '',
                     ];
                    break;
                } 
            }
        } 

        $data = [
            'block_type' => 'booking/icons-list',
            'label' => $block['attrs']['general']['label'] ?? '',
            'value' => $value,
            'items' => $items,
        ];
         return $data;
    }
}
