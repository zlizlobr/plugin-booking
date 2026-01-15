<?php

namespace Wpcbooking\Api;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Universal abstract class for communication with any API
 */
abstract class abstractAPI
{
    /**
     * API base URL
     */
    protected string $apiBaseUrl;

    /**
     * testEndpoint base URL
     */
    protected ?string $testEndpoint = null;


    /**
     * Content-Type header
     */
    protected string $contentType = 'application/json';

    /**
     * API version
     */
    protected ?string $apiVersion = null;

    /**
     * API timeout
     */
    protected ?int $apiTimeout = 30;


    /**
     * Initialize API with authentication credentials
     */
    public function __construct() {}

    /**
     * Set  API version
     * 
     * @param string|null $apiVersion API version
     * @return self
     */
    public function set_api_version(string $apiVersion): self
    {
        $this->apiVersion = $apiVersion;
        return $this;
    }

    /**
     * Set testEndpoint
     * 
     * @param string $testEndpoint Base URL for API
     * @return self
     */
    public function set_test_endpoint(string $testEndpoint): self
    {
        $this->testEndpoint = $testEndpoint;
        return $this;
    }

    /**
     * Set Base URL for API
     * 
     * @param string $apiBaseUrl Base URL for API
     * @return self
     */
    public function set_api_url(string $apiBaseUrl): self
    {
        $this->apiBaseUrl = $apiBaseUrl;
        return $this;
    }

    /**
     * Set  API version
     * 
     * @param int|null $apiVersion API version
     * @return self
     */
    public function set_api_timeout(int $apiTimeout): self
    {
        $this->apiTimeout = $apiTimeout;
        return $this;
    }

    /**
     * Set Content-Type header
     * 
     * @param string $contentType Content-Type value
     * @return self
     */
    public function set_content_type(string $contentType): self
    {
        $this->contentType = $contentType;
        return $this;
    }

    /**
     * Default headers for API communication
     * This method must be implemented by child classes to define API-specific headers
     * 
     * @return array|\WP_Error Headers for API requests
     */
    abstract protected function get_default_headers(): array|\WP_Error;

    /**
     * Extend headers with additional values
     * 
     * @return array|\WP_Error Combined headers
     */
    protected function get_headers(): array|\WP_Error
    {
        $defaultHeaders = $this->get_default_headers();

        if (is_wp_error($defaultHeaders)) {
            return $defaultHeaders;
        }

        return array_merge($defaultHeaders);
    }

    /**
     * Makes HTTP request to the Raynet API
     * 
     * @param string $endpoint API endpoint
     * @param array $options Request data
     * @param string $method HTTP method (GET, POST, PUT, DELETE)
     * @return array Response data
     */
    public function make_request(
        string $endpoint,
        array $options = [],
        string $method = 'GET',
    ): array {
        // Prepare headers
        $headers = $this->get_headers();
        if (is_wp_error($headers)) {
            return [
                'success' => false,
                'error'   => 'wp_error',
                'message' => $headers->get_error_message(),
                'code'    => $headers->get_error_code()
            ];
        }

        // Prepare endpoint URL
        $endpointUrl = rtrim($this->apiBaseUrl, '/') . '/' . ltrim($endpoint, '/');

        $args = [
            'headers' => $headers,
            'timeout' => $this->apiTimeout
        ];

        if (!empty($options) && ($method === 'POST' || $method === 'PUT' || $method === 'PATCH')) {
            $args['body'] = \json_encode($options);
        } elseif (!empty($options) && $method === 'GET') {
            // Add query parameters for GET requests
            $endpointUrl = add_query_arg($options, $endpointUrl);
        }

        // Execute request based on method
        $response = $this->execute_request($method, $endpointUrl, $args);

        // Add log if error occurs
        if (is_wp_error($response)) {
            error_log('API Error: ' . $response->get_error_message());
        } elseif (isset($response['response']['code']) && $response['response']['code'] >= 400) {
            error_log('API HTTP Error: ' . $response['response']['code'] . ' ' . $response['response']['message']);
            error_log('API Error Body: ' . (isset($response['body']) ? $response['body'] : 'No body'));
        }

        return $this->handle_response($response);
    }

    /**
     * Executes the HTTP request using WordPress functions
     * 
     * @param string $method HTTP method
     * @param string $url API URL
     * @param array $args Request arguments
     * @return array|\WP_Error Response or error
     */
    protected function execute_request(string $method, string $url, array $args): array|\WP_Error
    {
        switch ($method) {
            case 'POST':
                return wp_remote_post($url, $args);
            case 'PUT':
                return wp_remote_request($url, array_merge($args, ['method' => 'PUT']));
            case 'DELETE':
                return wp_remote_request($url, array_merge($args, ['method' => 'DELETE']));
            case 'PATCH':
                return wp_remote_request($url, array_merge($args, ['method' => 'PATCH']));
            case 'GET':
            default:
                return wp_remote_get($url, $args);
        }
    }

    /**
     * Parses the raw API response
     * 
     * @param array|\WP_Error $response WordPress HTTP API response
     * @return array|null Parsed JSON response or null
     */
    protected function parse_response(array|\WP_Error $response): ?array
    {
        if (!is_wp_error($response) && isset($response['body'])) {
            return json_decode($response['body'], true);
        }
        return null;
    }

    /**
     * Handles API response and errors
     * 
     * @param array|\WP_Error $response WordPress HTTP API response
     * @return array Response data or error information with structure:
     *     [
     *        'success' => bool,
     *        'data'    => array (when success is true)
     *        'error'   => string (when success is false)
     *        'message' => string (when success is false)
     *        'code'    => int (when success is false)
     *     ]
     */
    protected function handle_response(array|\WP_Error $response): array
    {
        // Handle WordPress errors
        if (is_wp_error($response)) {
            return [
                'success' => false,
                'error'   => 'wp_error',
                'message' => $response->get_error_message(),
                'code'    => $response->get_error_code()
            ];
        }

        // Parse response body
        $body = $this->parse_response($response);
        $statusCode = isset($response['response']['code']) ? $response['response']['code'] : 0;

        // Handle HTTP errors
        if ($statusCode >= 400) {
            $errorMessage = isset($response['response']['message']) ? $response['response']['message'] : 'Unknown error';

            // Extract more detailed error message from body if available
            if ($body && isset($body['message'])) {
                $errorMessage = $body['message'];
            }

            return [
                'success' => false,
                'error'   => 'api_error',
                'message' => $errorMessage,
                'code'    => $statusCode,
                'data'    => $body
            ];
        }

        // Return successful response
        return [
            'success' => true,
            'data'    => $body
        ];
    }

    /**
     * Tests API credentials by making a simple request
     * 
     * @return array Response with authentication status and structure:
     *     [
     *        'success' => bool,
     *        'message' => string,
     *        'data'    => array (when success is true),
     *        'error'   => string (when success is false)
     *     ]
     */
    public function auth_test(): array
    {
        if (is_null($this->testEndpoint)) {
            return [
                'success' => false,
                'message' => 'Endpoint not set',
                'error'   => 'auth_error'
            ];
        }

        $response = $this->make_request($this->testEndpoint, [], 'GET');

        if (isset($response['success']) && $response['success']) {
            return [
                'success' => true,
                'message' => 'Authentication successful',
                'data'    => $response['data']
            ];
        }

        return [
            'success' => false,
            'message' => isset($response['message']) ? $response['message'] : 'Authentication failed',
            'error'   => isset($response['error']) ? $response['error'] : 'auth_error'
        ];
    }
}
