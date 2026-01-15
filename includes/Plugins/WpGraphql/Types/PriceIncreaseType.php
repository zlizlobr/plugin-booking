<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class PriceIncreaseType
 * 
 * GraphQL type definition for PriceIncrease
 */
class PriceIncreaseType
{
    /**
     * Registers the PriceIncrease type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'PriceIncrease',
            [
                'description' => __('Price increase information', 'wpcbooking'),
                'fields'      => [
                    'operation' => [
                        'type'        => 'String',
                        'description' => __('Operation type', 'wpcbooking'),
                    ],
                    'price_increase' => [
                        'type'        => 'Float',
                        'description' => __('Price increase amount', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
