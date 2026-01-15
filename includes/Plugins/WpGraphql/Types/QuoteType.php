<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class QuoteType
 * 
 * GraphQL type definition for Quote
 */
class QuoteType
{
    /**
     * Registers the Quote type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'Quote',
            [
                'description' => __('A booking quote', 'wpcbooking'),
                'fields'      => [
                    'id' => [
                        'type'        => 'ID',
                        'description' => __('The ID of the quote', 'wpcbooking'),
                    ],
                    'currency' => [
                        'type'        => 'String',
                        'description' => __('Currency code', 'wpcbooking'),
                    ],
                    'total_base' => [
                        'type'        => 'Float',
                        'description' => __('Base total', 'wpcbooking'),
                    ],
                    'total_quote' => [
                        'type'        => 'Float',
                        'description' => __('Quote total', 'wpcbooking'),
                    ],
                    'shipping_total' => [
                        'type'        => 'Float',
                        'description' => __('Shipping total', 'wpcbooking'),
                    ],
                    'cart_total' => [
                        'type'        => 'Float',
                        'description' => __('Cart total', 'wpcbooking'),
                    ],
                    'form_id' => [
                        'type'        => 'ID',
                        'description' => __('Associated form ID', 'wpcbooking'),
                    ],
                    'blocks' => [
                        'type'        => ['list_of' => 'Block'],
                        'description' => __('Quote blocks', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
