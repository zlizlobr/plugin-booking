<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class InputType
 * 
 * GraphQL type definition for Input
 */
class InputType
{
    /**
     * Registers the Input type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'Input',
            [
                'description' => __('An input field', 'wpcbooking'),
                'fields'      => [
                    'name' => [
                        'type'        => 'String',
                        'description' => __('Input name', 'wpcbooking'),
                    ],
                    'value' => [
                        'type'        => 'String',
                        'description' => __('Input value', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
