<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class FormOptionsType
 * 
 * GraphQL type definition for FormOptions
 */
class FormOptionsType
{
    /**
     * Registers the FormOptions type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'FormOptions',
            [
                'description' => __('Form options', 'wpcbooking'),
                'fields'      => [
                    'prev' => [
                        'type'        => 'String',
                        'description' => __('Previous button text', 'wpcbooking'),
                    ],
                    'next' => [
                        'type'        => 'String',
                        'description' => __('Next button text', 'wpcbooking'),
                    ],
                    'submit' => [
                        'type'        => 'String',
                        'description' => __('Submit button text', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
