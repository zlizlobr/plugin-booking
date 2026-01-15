<?php

namespace Wpcbooking\Plugins\WpGraphql\Types;

/**
 * Class FormType
 * 
 * GraphQL type definition for Form
 */
class FormType
{
    /**
     * Registers the Form type.
     *
     * @return void
     */
    public static function register_type(): void
    {
        register_graphql_object_type(
            'Form',
            [
                'description' => __('A booking form', 'wpcbooking'),
                'fields'      => [
                    'id' => [
                        'type'        => 'ID',
                        'description' => __('The ID of the form', 'wpcbooking'),
                    ],
                    'title' => [
                        'type'        => 'String',
                        'description' => __('The title of the form', 'wpcbooking'),
                    ],
                    'formOptions' => [
                        'type'        => 'FormOptions',
                        'description' => __('Form options', 'wpcbooking'),
                    ],
                    'summaryOptions' => [
                        'type'        => 'SummaryOptions',
                        'description' => __('Summary options', 'wpcbooking'),
                    ],
                    'blocks' => [
                        'type'        => ['list_of' => 'Block'],
                        'description' => __('Form blocks', 'wpcbooking'),
                    ],
                    'quote' => [
                        'type'        => 'Quote',
                        'description' => __('Associated quote', 'wpcbooking'),
                    ],
                ],
            ]
        );
    }
}
