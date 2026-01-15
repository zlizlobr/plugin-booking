<?php

namespace Wpcbooking\Plugins\WpGraphql\Queries;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

/**
 * Class QuoteByHashQuery
 * 
 * GraphQL query for retrieving quote data by hash
 */
class QuoteByHashQuery implements QueryInterface
{
    /**
     * Registers the quoteByHash query field.
     *
     * @return void
     */
    public static function register_query(): void
    {
        register_graphql_field(
            'RootQuery',
            'quoteByHash',
            [
                'type'        => 'Quote',
                'description' => __('Get a quote by hash', 'wpcbooking'),
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
            'hash' => [
                'type'        => 'String',
                'description' => __('The hash of the quote', 'wpcbooking'),
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
            $hash = $args['hash'] ?? null;
            
            if (!$hash) {
                throw new UserError(__('Quote hash is required', 'wpcbooking'));
            }

            // Find quote by hash - this would need to be implemented based on your data structure
            // For now, returning null as placeholder
            $quote = get_posts([
                'post_type' => 'aquote', // Assuming this is the quote post type
                'meta_query' => [
                    [
                        'key' => 'quote_hash',
                        'value' => $hash,
                        'compare' => '='
                    ]
                ],
                'posts_per_page' => 1
            ]);

            if (empty($quote)) {
                throw new UserError(__('Quote not found', 'wpcbooking'));
            }

            return $quote[0];
        };
    }
}
