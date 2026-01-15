<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class InnerBlockType
 * 
 * GraphQL type definition for InnerBlock
 */
class InnerBlockType
{
    /**
     * Registers the InnerBlock type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'InnerBlock',
            [
                'description' => __('An inner block', 'wpcbooking'),
                'fields'      => [
                    'key' => [
                        'type'        => 'String',
                        'description' => __('Block key', 'wpcbooking'),
                    ],
                    'value' => [
                        'type'        => 'String',
                        'description' => __('Block value', 'wpcbooking'),
                    ],
                    'price' => [
                        'type'        => 'Float',
                        'description' => __('Block price', 'wpcbooking'),
                    ],
                    'price_increase' => [
                        'type'        => 'PriceIncrease',
                        'description' => __('Price increase', 'wpcbooking'),
                    ],
                    'inputs' => [
                        'type'        => ['list_of' => 'Input'],
                        'description' => __('Block inputs', 'wpcbooking'),
                    ],
                    'render_data' => [
                        'type'        => 'String',
                        'description' => __('Render data', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
