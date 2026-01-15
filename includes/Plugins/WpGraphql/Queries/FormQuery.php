<?php

namespace Wpcbooking\Plugins\WpGraphql\Queries;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use Wpcbooking\CPT\Booking;

/**
 * Class FormQuery
 * 
 * GraphQL query for retrieving form data
 */
class FormQuery implements QueryInterface
{
    /**
     * Registers the form query field.
     *
     * @return void
     */
    public static function register_query(): void
    {
        register_graphql_field(
            'RootQuery',
            'form',
            [
                'type'        => 'Form',
                'description' => __('Get a form by ID', 'wpcbooking'),
                'args'        => self::get_query_fields(),
                'resolve'     => self::get_resolver(),
            ]
        );
    }

    /**
     * Defines the query field configuration.
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_query_fields(): array
    {
        return [
            'id' => [
                'type'        => 'ID',
                'description' => __('The ID of the form', 'wpcbooking'),
            ],
        ];
    }

    /**
     * Defines closure for query processing
     *
     * @return callable(array<string,mixed> $source, array<string,mixed> $args, AppContext $context, ResolveInfo $info): mixed
     */
    public static function get_resolver(): callable
    {
        return function ($source, array $args, AppContext $context, ResolveInfo $info) {
            $form_id = $args['id'] ?? null;
            
            if (!$form_id) {
                throw new UserError(__('Form ID is required', 'wpcbooking'));
            }

            // Get the form post
            $form_post = get_post($form_id);
            
            if (!$form_post || $form_post->post_type !== Booking::SLUG) {
                throw new UserError(__('Form not found', 'wpcbooking'));
            }

            return $form_post;
        };
    }
}
