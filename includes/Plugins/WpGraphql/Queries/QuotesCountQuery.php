<?php

namespace Wpcbooking\Plugins\WpGraphql\Queries;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

/**
 * Class QuotesCountQuery
 * 
 * GraphQL query for getting count of quotes for a specific date
 */
class QuotesCountQuery implements QueryInterface
{
    /**
     * Registers the quotes count query field.
     *
     * @return void
     */
    public static function register_query(): void
    {
        register_graphql_field(
            'RootQuery',
            'getQuotesCountForDate',
            [
                'type'        => 'Int',
                'description' => __('Get count of quotes for a specific date and field', 'wpcbooking'),
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
            'fieldId' => [
                'type'        => ['non_null' => 'String'],
                'description' => __('The field ID to check', 'wpcbooking'),
            ],
            'dateValue' => [
                'type'        => ['non_null' => 'String'],
                'description' => __('The date value in YYYY-MM-DD format', 'wpcbooking'),
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
            global $wpdb;

            $field_id = $args['fieldId'] ?? null;
            $date_value = $args['dateValue'] ?? null;

            // Validate required parameters
            if (empty($field_id)) {
                throw new UserError(__('Field ID is required', 'wpcbooking'));
            }

            if (empty($date_value)) {
                throw new UserError(__('Date value is required', 'wpcbooking'));
            }

            // Validate date format (YYYY-MM-DD)
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date_value)) {
                throw new UserError(__('Date value must be in YYYY-MM-DD format', 'wpcbooking'));
            }

            // Get count of quotes for the date
            $count = $wpdb->get_var($wpdb->prepare(
                "SELECT COUNT(DISTINCT pm.post_id) 
                        FROM {$wpdb->postmeta} pm
                        JOIN {$wpdb->posts} p ON pm.post_id = p.ID
                        WHERE pm.meta_key = %s 
                        AND pm.meta_value = %s
                        AND p.post_status = 'publish'",
                $field_id,
                $date_value
            ));

            return (int) $count;
        };
    }
}

