<?php

namespace Wpcbooking\Api;

use Wpcbooking\Api\abstractAPI;

class googleDistanceAPI extends abstractAPI
{
    protected string $apiKey;

    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
        $this->set_api_url('https://maps.googleapis.com/maps/api/distancematrix/');
    }
    /**
     * Get distance from Google Distance Matrix API.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param float $originLat Origin latitude
     * @param float $originLng Origin longitude
     * @param float $destLat Destination latitude
     * @param float $destLng Destination longitude
     * @return float|null Distance in kilometers or null on error
     */
    public function get_distance(float $originLat, float $originLng, float $destLat, float $destLng): float|array|null
    {
        $params = [
            'origins' => "{$originLat},{$originLng}",
            'destinations' => "{$destLat},{$destLng}",
            'key' => $this->apiKey
        ];

        $response = $this->make_request('json', $params, 'GET');
        $elements = $response['rows'][0]['elements'][0] ?? null;
        if (
            !isset($response['success']) || $response['success'] != 1 ||
            !isset($response['data']) || !isset($response['data']['rows'])
        ) {
            error_log(sprintf('Hey Bro:Invalid response from API  %s', $elements['status']));
            return null;
        }

        return $this->get_shortest_distance($response);
    }
    /**
     * Get default headers for API requests.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Headers array
     */
    public function get_default_headers(): array
    {
        return [
            'Content-Type' => 'application/json'
        ];
    }

    /**
     * Extract shortest distance from Google Distance Matrix API response.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $response Response array from Google Distance Matrix API
     * @return float|null Distance in kilometers or null if no valid distance found
     */
    function get_shortest_distance(array $response): float|null
    {

        $shortest_distance = null;

        // Iterate through all rows and elements to find the shortest distance
        foreach ($response['data']['rows'] as $row) {
            if (isset($row['elements']) && is_array($row['elements'])) {
                foreach ($row['elements'] as $element) {
                    if (
                        isset($element['status']) && $element['status'] == 'OK' &&
                        isset($element['distance']) && isset($element['distance']['value'])
                    ) {

                        $current_distance = $element['distance']['value'];
                        // Initialize shortest distance or update it if current is shorter
                        if ($shortest_distance === null || $current_distance < $shortest_distance) {
                            $shortest_distance = $current_distance;
                        }
                    }
                }
            }
        }

        if ($shortest_distance === null) {
            return null;
        }

        return round($shortest_distance / 1000, 0);
    }
}
