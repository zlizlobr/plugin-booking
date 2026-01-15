<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class QuoteDataInputType
 * 
 * GraphQL input type definition for QuoteDataInput
 */
class QuoteDataInputType
{
    /**
     * Registers the QuoteDataInput type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_input_type(
            'QuoteDataInput',
            [
                'description' => __('Input for updating quote data', 'wpcbooking'),
                'fields'      => [
                    'total_quote' => [
                        'type'        => 'Float',
                        'description' => __('Quote total', 'wpcbooking'),
                    ],
                    'total_base' => [
                        'type'        => 'Float',
                        'description' => __('Base total', 'wpcbooking'),
                    ],
                    'shipping_total' => [
                        'type'        => 'Float',
                        'description' => __('Shipping total', 'wpcbooking'),
                    ],
                    'cart_total' => [
                        'type'        => 'Float',
                        'description' => __('Cart total', 'wpcbooking'),
                    ],
                    'currency' => [
                        'type'        => 'String',
                        'description' => __('Currency code', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
