<?php

namespace Wpcbooking\Plugins\WpGraphql\Queries;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use Wpcbooking\Api\googleDistanceAPI;

/**
 * Class DistanceQuery
 * 
 * GraphQL query for calculating distance between two coordinates using Google Distance Matrix API
 */
class DistanceQuery implements QueryInterface
{
    /**
     * Registers the distance query field.
     *
     * @return void
     */
    public static function register_query(): void
    {
        register_graphql_field(
            'RootQuery',
            'calculateDistance',
            [
                'type'        => 'Float',
                'description' => __('Calculate distance between two coordinates in kilometers', 'wpcbooking'),
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
            'originLat' => [
                'type'        => ['non_null' => 'Float'],
                'description' => __('Latitude of the origin point', 'wpcbooking'),
            ],
            'originLng' => [
                'type'        => ['non_null' => 'Float'],
                'description' => __('Longitude of the origin point', 'wpcbooking'),
            ],
            'destLat' => [
                'type'        => ['non_null' => 'Float'],
                'description' => __('Latitude of the destination point', 'wpcbooking'),
            ],
            'destLng' => [
                'type'        => ['non_null' => 'Float'],
                'description' => __('Longitude of the destination point', 'wpcbooking'),
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
            $origin_lat = $args['originLat'] ?? null;
            $origin_lng = $args['originLng'] ?? null;
            $dest_lat = $args['destLat'] ?? null;
            $dest_lng = $args['destLng'] ?? null;
            
            // Validate required parameters
            if ($origin_lat === null || $origin_lng === null) {
                throw new UserError(__('Origin coordinates (originLat and originLng) are required', 'wpcbooking'));
            }

            if ($dest_lat === null || $dest_lng === null) {
                throw new UserError(__('Destination coordinates (destLat and destLng) are required', 'wpcbooking'));
            }

            // Validate coordinate ranges
            if ($origin_lat < -90 || $origin_lat > 90) {
                throw new UserError(__('Origin latitude must be between -90 and 90', 'wpcbooking'));
            }

            if ($origin_lng < -180 || $origin_lng > 180) {
                throw new UserError(__('Origin longitude must be between -180 and 180', 'wpcbooking'));
            }

            if ($dest_lat < -90 || $dest_lat > 90) {
                throw new UserError(__('Destination latitude must be between -90 and 90', 'wpcbooking'));
            }

            if ($dest_lng < -180 || $dest_lng > 180) {
                throw new UserError(__('Destination longitude must be between -180 and 180', 'wpcbooking'));
            }

            // Get API key
            $api_key = booking_get_maps_api_key();
            
            if (empty($api_key)) {
                throw new UserError(__('Google Maps API key is not configured', 'wpcbooking'));
            }

            // Initialize Google Distance API
            try {
                $distance_api = new googleDistanceAPI($api_key);
            } catch (\Exception $e) {
                error_log('❌ [DistanceQuery] Failed to initialize GoogleDistanceAPI: ' . $e->getMessage());
                throw new UserError(__('Failed to initialize distance API: ', 'wpcbooking') . $e->getMessage());
            }

            // Calculate distance
            try {
                $distance = $distance_api->get_distance(
                    (float) $origin_lat,
                    (float) $origin_lng,
                    (float) $dest_lat,
                    (float) $dest_lng
                );
            } catch (\Exception $e) {
                error_log('❌ [DistanceQuery] Exception during distance calculation: ' . $e->getMessage());
                error_log('❌ [DistanceQuery] Exception trace: ' . $e->getTraceAsString());
                throw new UserError(__('Distance calculation error: ', 'wpcbooking') . $e->getMessage());
            }

            if ($distance === null) {
                throw new UserError(__('Unable to calculate distance. Please check your coordinates and API configuration.', 'wpcbooking'));
            }
            
            return (float) $distance;
        };
    }
}

