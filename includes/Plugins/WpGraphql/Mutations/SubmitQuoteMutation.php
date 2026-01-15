<?php

namespace Wpcbooking\Plugins\WpGraphql\Mutations;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use Wpcbooking\CPT\Quote;
use Wpcbooking\Traits\ValidatesBlockTrait;

/**
 * Class SubmitQuoteMutation
 * 
 * GraphQL mutation for submitting an order
 */
class SubmitQuoteMutation implements MutationInterface
{
    use ValidatesBlockTrait;
    /**
     * Registers the submitOrder mutation.
     *
     * @return void
     */
    public static function register_mutation(): void
    {
        register_graphql_mutation(
            'submitQuote',
            [
                'inputFields'         => self::get_input_fields(),
                'outputFields'        => self::get_output_fields(),
                'mutateAndGetPayload' => self::mutate_and_get_payload(),
            ]
        );
    }

    /**
     * Defines the mutation input field configuration.
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_input_fields(): array
    {
        return [
            'quoteHash' => [
                'type'        => 'String',
                'description' => __('Quote hash', 'wpcbooking')
            ],
            'bookingId' => [
                'type'        => 'ID',
                'description' => __('Booking ID', 'wpcbooking')
            ],
            'termsConditions' => [
                'type'        => ['list_of' => 'Int'],
                'description' => __('Terms and conditions (array of term indices)', 'wpcbooking')
            ],
            'formData' => [
                'type'        => 'String',
                'description' => __('Form data as JSON string', 'wpcbooking')
            ]
        ];
    }

    /**
     * Defines the mutation output field configuration.
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_output_fields(): array
    {
        return [
            'success' => [
                'type'        => 'Boolean',
                'description' => __('Whether the submission was successful', 'wpcbooking')
            ],
            'quote_id' => [
                'type'        => 'ID',
                'description' => __('Created order ID', 'wpcbooking')
            ],
            'errors' => [
                'type'        => ['list_of' => 'String'],
                'description' => __('Error messages', 'wpcbooking')
            ]
        ];
    }

    /**
     * Defines closure for mutation processing
     *
     * @return callable(array<string,mixed> $input, AppContext $context, ResolveInfo $info): array<string,mixed>
     */
    public static function mutate_and_get_payload(): callable
    {
        return function (array $input, AppContext $context, ResolveInfo $info) {
            try {
                $block_data = self::validate_input($input);
                $quote_hash = $input['quoteHash'] ?? null;
                $booking_id = $input['bookingId'] ?? null;
                $terms_conditions = $input['termsConditions'] ?? [];
                // Get quote ID from hash
                $quote_id = booking_get_quote_id_by_hash($quote_hash);

                if (!$quote_id) {
                    error_log('🔍 [SubmitQuoteMutation] quote not found by hash');
                    return [
                        'success' => false,
                        'summaryData' => null,
                        'errors' => __('Quote not found by hash', 'wpcbooking'),
                     ];
                }
                self::init_booking_controller($booking_id);
                unset($block_data['terms_conditions']);
                $validation_error = self::validate_al_blocks($block_data);
                if ($validation_error !== null) {
                    error_log('❌ [SaveStepMutation] validation_error: ' . print_r($validation_error, true));
                    return [
                        'success' => false,
                        'summaryData' => null,
                        'errors' => json_encode($validation_error),
                     ];
                }

                // Get the quote post
                $quote_post = get_post($quote_id);

                if (!$quote_post || $quote_post->post_type !== Quote::SLUG) {
                    return [
                        'success' => false,
                        'summaryData' => null,
                        'errors' => __('Quote not found', 'wpcbooking'),
                     ];
                }

                // Get summary options to validate terms


                if (!empty($errors)) {
                    return [
                        'success' => false,
                        'order_id' => null,
                        'errors' => $errors
                    ];
                }

                // Publish the post and update last edit date
                wp_update_post([
                    'ID' => $quote_id,
                    'post_title' => sprintf(__('%d# Quote: %s', 'wpcbooking'), $quote_id, get_post_meta($quote_id, '_user_email', true) ?? ''),
                    'post_status' => 'publish',
                    'post_modified' => current_time('mysql'),
                    'post_modified_gmt' => current_time('mysql', 1)
                ]);
                Quote::update_quote_status($quote_id, 'submitted');

                // Submit order - this would need to be implemented based on your business logic
                // For now, returning success as placeholder
                WC()->session->__unset('booking_' . $booking_id);
                return [
                    'success' => true,
                    'quote_id' => $quote_id, // Placeholder
                    'errors' => []
                ];
            } catch (\Exception $e) {
                error_log('❌ [SubmitQuoteMutation] error: ' . $e->getMessage());
                return [
                    'success' => false,
                    'errors' => $e->getMessage(),
                    'quote_id' => $quote_id, // Placeholder
                ];
            }
        };
    }

    protected static function validate_input($input): array
    {

        $block_data = json_decode($input['formData'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception(__('Invalid JSON data', 'wpcbooking'));
        }

        if (!isset($input['bookingId']) || !is_numeric($input['bookingId'])) {
            throw new \Exception(__('Booking ID is required', 'wpcbooking'));
        }
        $validate_terms_error = static::validate_terms($input['termsConditions'], $input['bookingId']);
        if (!empty($validate_terms_error)) {
            throw new \Exception(implode('<br>', $validate_terms_error));
        }
        if (!isset($input['quoteHash'])) {
            throw new \Exception(__('Quote hash is required', 'wpcbooking'));
        }
        return $block_data;
    }

    protected static function validate_terms($terms_conditions, $booking_id): array
    {
        $summary_options = get_booking_options_summary((int) $booking_id);

        $terms_errors = [];
        if (isset($summary_options['terms']) && is_array($summary_options['terms']) && !empty($summary_options['terms'])) {

            foreach ($summary_options['terms'] as $term) {
                // Check if term has required fields
                if (!isset($term['page_id']) || empty($term['page_id'])) {
                    continue;
                }
                // Check if term is required
                if (isset($term['required']) && $term['required'] == 1) {
                    // Get page title for error message
                    $term_page_title = get_the_title($term['page_id']);

                    // Check if this term index is in termsConditions array
                    // Frontend sends array of indices as integers
                    $is_found = in_array($term['page_id'], $terms_conditions, true);

                    if (!$is_found) {
                        $terms_errors[] = sprintf(
                            __('You must agree to %s', 'wpcbooking'),
                            $term_page_title
                        );
                    }
                }
            }
        }
        return $terms_errors;
    }
}
