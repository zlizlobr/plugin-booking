<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class SummaryOptionsType
 * 
 * GraphQL type definition for SummaryOptions
 */
class SummaryOptionsType
{
    /**
     * Registers the SummaryOptions type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'SummaryOptions',
            [
                'description' => __('Summary options', 'wpcbooking'),
                'fields'      => [
                    'text' => [
                        'type'        => 'String',
                        'description' => __('Summary text', 'wpcbooking'),
                    ],
                    'label_price' => [
                        'type'        => 'String',
                        'description' => __('Price label', 'wpcbooking'),
                    ],
                    'label_total' => [
                        'type'        => 'String',
                        'description' => __('Total label', 'wpcbooking'),
                    ],
                    'send_button_text' => [
                        'type'        => 'String',
                        'description' => __('Send button text', 'wpcbooking'),
                    ],
                    'send_button_icon' => [
                        'type'        => 'String',
                        'description' => __('Send button icon', 'wpcbooking'),
                    ],
                    'show_calculations' => [
                        'type'        => 'Boolean',
                        'description' => __('Show calculations', 'wpcbooking'),
                    ],
                    'terms' => [
                        'type'        => ['list_of' => 'Term'],
                        'description' => __('Terms and conditions', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
