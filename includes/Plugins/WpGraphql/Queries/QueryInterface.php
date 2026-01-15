<?php

namespace Wpcbooking\Plugins\WpGraphql\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

/**
 * Interface QueryInterface
 * 
 * Basic interface for all WPGraphQL queries
 */
interface QueryInterface
{
    /**
     * Registers query to WPGraphQL
     *
     * @return void
     */
    public static function register_query(): void;

    /**
     * Defines query field configuration
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_query_fields(): array;

    /**
     * Defines closure for query processing
     *
     * @return callable(array<string,mixed> $source, array<string,mixed> $args, AppContext $context, ResolveInfo $info): mixed
     */
    public static function get_resolver(): callable;
}
