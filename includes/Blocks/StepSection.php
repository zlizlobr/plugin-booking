<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class StepSection extends AbstractBlock
{
    protected static $BLOCK_NAME = 'step-section';
    protected static $BLOCK_ICON = 'welcome-widgets-menus';

    public function __construct()
    {
        parent::__construct();
    }
    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Step Section', 'wpcbooking');
        $this->block_description = __('Display a step section with icon, title, and description', 'wpcbooking');
        $this->block_category = 'booking-cat-form';
        $this->block_icon = 'welcome-widgets-menus';
        $this->block_keywords = ['booking', 'step', 'section', 'icon', 'title', 'description'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'options' => 'Form Fields',
            'conditions' => 'Conditions',
            'documentation' => __('Documentation', 'wpcbooking'),
        ];
    }

    public static function is_allowed_step_render(): bool
    {
        return false;
    }
    function allow_booking_blocks(): array
    {
        static $cached_blocks = null;

        if ($cached_blocks !== null) {
            return $cached_blocks;
        }

        $blocks = booking_get_all_block_names();
        $allowed_blocks = [];

        foreach ($blocks as $block_name) {
            if ($block_name !== 'booking/step-section') {
                $allowed_blocks[] = $block_name;
            }
        }

        $cached_blocks = $allowed_blocks;
        return $allowed_blocks;
    }
    protected function get_block_attribute_items(): array
    {
        return [
            'inner_blocks' =>
            [
                'id' => 'inner_blocks',
                'type'        => 'inner_blocks',
                'description' => __('Add fields to the step', 'wpcbooking'),
                'allowed_blocks' =>  $this->allow_booking_blocks(),
                'template' => [],
                'template_lock' => false,
            ],
            'thumbnail_id' => [
                'id' => 'thumbnail_id',
                'type' => 'attachment',
                'label' => __('Icon', 'wpcbooking'),
                'attachment_type' => 'image',
                'position' => 'inspector',
                'tab' => 'options',
            ],
            'thumbnail_id_mail' => [
                'id' => 'thumbnail_id_mail',
                'type' => 'attachment',
                'label' => __('Icon Mail', 'wpcbooking'),
                'attachment_type' => 'image',
                'mime_types' => 'jpeg, jpg, png, gif',
                'position' => 'inspector',
                'tab' => 'options',
            ],
            'title' => [
                'id' => 'title',
                'type' => 'text',
                'label' => __('Title', 'wpcbooking'),
                'position' => 'inspector',
                'tab' => 'options',
            ],
            'excerpt' => [
                'id' => 'excerpt',
                'type' => 'wysiwyg',
                'label' => __('Description', 'wpcbooking'),
                'position' => 'inspector',
                'tab' => 'options',
            ],
            'show_background' => [
                'id' => 'show_background',
                'type' => 'toggle',
                'label' => __('Show Background', 'wpcbooking'),
                'position' => 'inspector',
                'tab' => 'options',
            ],
            'label_summary' => [
                'id' => 'label_summary',
                'type' => 'text',
                'label' => __('Label in summary', 'wpcbooking'),
                'placeholder' => 'List of choices from step',
                'position' => 'inspector',
                'tab' => 'options',
            ],
            'conditions' => [
                'id' => 'conditions',
                'type' => 'multi_group',
                'label' => __('Conditions Step', 'wpcbooking'),
                'items' => $this->get_conditions(),
                'tab' => 'conditions',
            ],
            [
                'type' => 'html',
                'id' => 'documentation_content',
                'content' => $this->get_block_documentation(),
                'tab' => 'documentation',
            ]
        ];
    }

    public function get_conditions(): array
    {
        return [
            [
                'id' => 'condition_type',
                'type' => 'select',
                'options' => [
                    'none' => __('Disable', 'wpcbooking'),
                    'products' => __('Products in Cart', 'wpcbooking'),
                ],
                'label' => __('Filter Products', 'wpcbooking'),
                'default' => 'none',
                'required' => true,
            ],
            [
                'id' => 'product_condition',
                'type' => 'select',
                'options' => [
                    'included_products' => __('Included Products', 'wpcbooking'),
                    'excluded_products' => __('Excluded Products', 'wpcbooking'),
                ],
                'label' => __('Filter Products', 'wpcbooking'),
                'default' => 'products',
                'required' => true,
                'conditions' => [
                    [
                        'field'     => '#.condition_type',
                        'condition' => '==',
                        'value'     => 'products',
                    ],
                ],
            ],
            [
                'type'        => 'multi_post',
                'id'          => 'ids',
                'label'       => __('Select Products', 'wpcbooking'),
                'post_type'   => 'product',
                'conditions' => [
                    [
                        'field'     => '#.condition_type',
                        'condition' => '==',
                        'value'     => 'products',
                    ],
                ],
            ],
            [
                'id' => 'operator',
                'type' => 'select',
                'options' => [
                    'AND' => __('AND', 'wpcbooking'),
                    'OR' => __('OR', 'wpcbooking'),
                ],
                'label' => __('Logical Operator', 'wpcbooking'),
                'default' => 'OR',
                'required' => true,
                'conditions' => [
                    [
                        'field'     => '#.condition_type',
                        'condition' => '!=',
                        'value'     => 'none',
                    ],
                ],
            ]
        ];
    }
    public function render_block($attributes, $content, $block): string
    {
        $attributes['number_blocks'] = [];
        // Add tu render number fields for guttenberg editor
        foreach ($block->inner_blocks as $inner_block) {
            if ($inner_block->name !== 'booking/number-input') continue;
            $attributes['number_blocks'][$inner_block->attributes['field_id']] = $inner_block->attributes['general']['label'] ?? 'None';
        }
        $prepared_attributes = static::prepare_block($attributes);
        return $this->get_block_template(static::get_block_name(), $prepared_attributes);
    }

    public static function prepare_block(array $attributes): array
    {
        $booking_id = $attributes['booking_id'] ?? get_the_ID();
        $global_options = get_booking_options_design($booking_id);
        if (isset($attributes['innerBlocks']) && !empty($attributes['innerBlocks'])) {
            $inner_html = '';
            $inner_content = [];

            foreach ($attributes['innerBlocks'] as $index => $inner_block) {
                try {
                    $serialized_inner = serialize_block($inner_block);
                    $inner_html .= $serialized_inner;
                    $inner_content[] = $serialized_inner;
                } catch (\Throwable $th) {
                    error_log('ERROR serializing inner block ' . $index . ': ' . $th->getMessage());
                }
            }
        }
        $attributes = array_merge(
            $attributes,
            $global_options,
            [
                'allowedBlocks' => booking_get_all_block_names(),
                'template' => [],
                'number_blocks' => $attributes['number_blocks'] ?? [],
                'excerpt' => $attributes['excerpt'] ?? '',
                'step_label' => $attributes['title'] ?? '',
                'icon_url' => !empty($attributes['thumbnail_id']) ? wp_get_attachment_image_url($attributes['thumbnail_id'], 'full') : null
            ]
        );
        
        return $attributes;
    }
    public function update_block(int $quote_id, array $post_data = [], array $block = []): void {}
}
