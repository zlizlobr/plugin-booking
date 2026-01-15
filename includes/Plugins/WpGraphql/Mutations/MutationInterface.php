<?php

namespace Wpcbooking\Plugins\WpGraphql\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;

/**
 * Interface MutationInterface
 * 
 * Basic interface for all WPGraphQL mutations
 */
interface MutationInterface
{
    /**
     * Registers mutation to WPGraphQL
     *
     * @return void
     */
    public static function register_mutation(): void;

    /**
     * Defines input fields for mutation
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_input_fields(): array;

    /**
     * Defines output fields for mutation
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_output_fields(): array;

    /**
     * Defines closure for mutation processing
     *
     * @return callable(array<string,mixed> $input, AppContext $context, ResolveInfo $info): array<string,mixed>
     */
    public static function mutate_and_get_payload(): callable;
}
