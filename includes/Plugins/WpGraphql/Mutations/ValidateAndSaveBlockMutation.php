<?php

namespace Wpcbooking\Plugins\WpGraphql\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use Wpcbooking\Traits\ValidatesBlockTrait;


/** 
 * Class ValidateAndSaveBlockMutation
 * 
 * Simple mutation for validating and saving block data
 */
class ValidateAndSaveBlockMutation implements MutationInterface
{
    use ValidatesBlockTrait;
    /**
     * Registers the validateAndSaveBlock mutation.
     */
    public static function register_mutation(): void
    {
        register_graphql_mutation(
            'validateAndSaveBlock',
            [
                'inputFields'         => self::get_input_fields(),
                'outputFields'        => self::get_output_fields(),
                'mutateAndGetPayload' => self::mutate_and_get_payload(),
            ]
        );
    }

    /**
     * Defines input fields
     */
    public static function get_input_fields(): array
    {
        return [
            'blockName' => [
                'type'        => 'String',
                'description' => __('Block name', 'wpcbooking')
            ],
            'blockData' => [
                'type'        => 'String',
                'description' => __('Block data as JSON string', 'wpcbooking')
            ],
            'quoteHash' => [
                'type'        => 'String',
                'description' => __('Quote hash', 'wpcbooking')
            ]
        ];
    }

    /**
     * Defines output fields
     */
    public static function get_output_fields(): array
    {
        return [
            'success' => [
                'type'        => 'Boolean',
                'description' => __('Whether the operation was successful', 'wpcbooking')
            ],
            'value' => [
                'type'        => 'String',
                'description' => __('JSON response data', 'wpcbooking')
            ],
            'errors' => [
                'type'        => ['list_of' => 'String'],
                'description' => __('List of error messages', 'wpcbooking')
            ]
        ];
    }

    /**
     * Mutation processing
     */
    public static function mutate_and_get_payload(): callable
    {
        return static function ($input, AppContext $context, ResolveInfo $info) {
            return self::process_mutation($input, $context, $info);
        };
    }

    /**
     * Process mutation logic
     */
    private static function process_mutation($input, AppContext $context, ResolveInfo $info): array
    {
        try {
            // Convert json check base input data
            $block_data = self::validate_input($input);
            // Initialize booking controller
            self::init_booking_controller($block_data['booking_id']);
            WC()->session->__unset('booking_' . $block_data['booking_id']);

            if (booking_active_wc_session() && isset($block_data['booking_id'])) {
                WC()->session->set('booking_' . $block_data['booking_id'], ['_quote_hash' => $input['quoteHash']]);
            }
            $basics = self::get_booking_controller()->get_booking_options_basics();
            $validation_error = self::validate_single_block($block_data);
            if ($validation_error !== null) {
                return [
                    'success' => false,
                    'value' => '',
                    'errors' => $validation_error
                ];
            }
            $field_id = $block_data['field_id'];
            $block_data['quoteData']['quoteHash'] = $input['quoteHash'];
            // Create quote if needed
            $qoute_id = null;
            if (isset($input['quoteHash']) && !empty($input['quoteHash'])) {
                $qoute_id = booking_get_quote_id_by_hash($input['quoteHash']);
            }

            if (!$qoute_id) {
                $qoute_id = self::create_quote_if_needed(
                    $field_id,
                    $basics,
                    $block_data['quoteData']
                );
            } elseif ($qoute_id) {
                self::set_quote_id($qoute_id);
            }
            // Save block data
            $value = '';
            if (isset($qoute_id) && is_int($qoute_id)) {
                $value = $block_data['value'] ?? null;
                $save_data = self::save_single_block($field_id,  $value);
                $current_step = self::get_booking_controller()->get_block_step($field_id);
                $max_reached_step = get_post_meta($qoute_id, '_max_reached_step', true);
                if ($current_step > $max_reached_step) {
                    update_post_meta($qoute_id, '_max_reached_step', $current_step);
                }
                $block = self::get_block($block_data['field_id']);
                if ($block && isset($block['blockName'])) {
                    $value = apply_filters('wpcbooking_quote_value_' . $block['blockName'], [], $qoute_id, $block);
                }
            }
            return [
                'success' => true,
                'value' => wp_json_encode($value),
                'errors' => []
            ];
        } catch (\Exception $e) {

            error_log('🟢[ValidateAndSaveBlockMutation] Error: ' . $e->getMessage());
            error_log('code line: ' . $e->getLine());
            error_log('code file: ' . $e->getFile());
            error_log('code trace: ' . $e->getTraceAsString());
            return [
                'success' => false,
                'value' => '',
                'errors' => [$field_id => $e->getMessage()]
            ];
        }
    }

    /**
     * Validate input data
     */
    protected static function validate_input($input): array
    {
        if (!isset($input['quoteHash'])) {
            throw new \Exception(__('Quote Hash is required', 'wpcbooking'));
        }

        if (!isset($input['blockName'])) {
            throw new \Exception(__('Block name not defined', 'wpcbooking'));
        }

        if (!isset($input['blockData'])) {
            throw new \Exception(__('Block data is required', 'wpcbooking'));
        }

        $block_data = json_decode($input['blockData'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception(__('Invalid JSON data', 'wpcbooking'));
        }

        if (!isset($block_data['booking_id']) || !is_numeric($block_data['booking_id'])) {
            throw new \Exception(__('Booking ID is required', 'wpcbooking'));
        }
        if (!isset($block_data['field_id'])) {
            throw new \Exception(__('Field ID is required', 'wpcbooking'));
        }
        return $block_data;
    }

    /**
     * Create quote if needed
     */
    private static function create_quote_if_needed(string $field_id, array $basics, array $data): int|null
    {
        if ($basics['create_condition'] == '1' && isset($basics['condition_field']) && $basics['condition_field'] !== $field_id)  return null;
        $quote_id = self::create_quote_post($data);

        self::set_quote_id($quote_id);

        $blocks = self::get_booking_controller()->get_booking_blocks();
        if (!is_array($blocks)) {
            throw new \Exception('Failed to get booking sections');
        }
        self::save_blocks($blocks, $data['formData'], $data['maxReachedStep'] ?? 1);
        return $quote_id;
    }



    /**
     * Create Quote CPT post
     */
    private static function create_quote_post(array $data): int|\WP_Error
    {
        $quote_id = wp_insert_post([
            'post_title'   => sanitize_text_field($data['title'] ?? '#Draft Quote'),
            'post_name'    => $data['quoteHash'],
            'post_status'  => 'draft',
            'post_type'    => \Wpcbooking\CPT\Quote::SLUG
        ]);
        if (is_wp_error($quote_id)) {
            throw new \Exception($quote_id->get_error_message());
        }
        if (isset($data['bookingId'])) {
            update_post_meta($quote_id, '_booking_id', $data['bookingId']);
            update_post_meta($quote_id, '_quote_currency', get_quote_currency($quote_id, $data['bookingId']));

            // ⚠️ CRITICAL FIX: Save quote hash to WC session so it persists across page refreshes
            if (booking_active_wc_session()) {
                WC()->session->set('booking_' . $data['bookingId'], [
                    '_quote_hash' => $data['quoteHash'],
                    '_quote_id' => $quote_id,
                    '_booking_id' => $data['bookingId']
                ]);
            }
        }
        return $quote_id;
    }

    /**
     * Get quote id by hash
     */
    private static function get_quote_id_by_hash($hash): int|null
    {
        return exist_quote_by_hash($hash);
    }
}
