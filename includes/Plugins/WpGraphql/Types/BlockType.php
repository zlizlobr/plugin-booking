<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class BlockType
 * 
 * GraphQL type definition for Block
 */
class BlockType
{
    /**
     * Registers the Block type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'Block',
            [
                'description' => __('A form block', 'wpcbooking'),
                'fields'      => [
                    'step' => [
                        'type'        => 'Int',
                        'description' => __('Block step', 'wpcbooking'),
                    ],
                    'data' => [
                        'type'        => 'BlockData',
                        'description' => __('Block data', 'wpcbooking'),
                    ],
                    'innerBlocks' => [
                        'type'        => ['list_of' => 'InnerBlock'],
                        'description' => __('Inner blocks', 'wpcbooking'),
                    ],
                    'price_step' => [
                        'type'        => 'Float',
                        'description' => __('Price step', 'wpcbooking'),
                    ],
                    'value_step' => [
                        'type'        => 'Float',
                        'description' => __('Value step', 'wpcbooking'),
                    ],
                    'item_output' => [
                        'type'        => 'String',
                        'description' => __('Item output', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
