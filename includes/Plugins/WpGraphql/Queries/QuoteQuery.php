<?php

namespace Wpcbooking\Plugins\WpGraphql\Queries;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

/**
 * Class QuoteQuery
 * 
 * GraphQL query for retrieving quote data by ID
 */
class QuoteQuery implements QueryInterface
{
    /**
     * Registers the quote query field.
     *
     * @return void
     */
    public static function register_query(): void
    {
        register_graphql_field(
            'RootQuery',
            'quote',
            [
                'type'        => 'Quote',
                'description' => __('Get a quote by ID', 'wpcbooking'),
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
                'description' => __('The ID of the quote', 'wpcbooking'),
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
            $quote_id = $args['id'] ?? null;
            
            if (!$quote_id) {
                throw new UserError(__('Quote ID is required', 'wpcbooking'));
            }

            // Get the quote post
            $quote_post = get_post($quote_id);
            
            if (!$quote_post || $quote_post->post_type !== 'aquote') {
                throw new UserError(__('Quote not found', 'wpcbooking'));
            }

            return $quote_post;
        };
    }
}
