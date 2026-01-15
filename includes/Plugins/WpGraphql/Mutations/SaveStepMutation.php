<?php

namespace Wpcbooking\Plugins\WpGraphql\Mutations;

use Error;
use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use Wpcbooking\Traits\ValidatesBlockTrait;

/**
 * Class SaveStepMutation
 * 
 * GraphQL mutation for saving booking step data
 */
class SaveStepMutation implements MutationInterface
{
    use ValidatesBlockTrait;
    /**
     * Registers the saveStep mutation.
     *
     * @return void
     */
    public static function register_mutation(): void
    {
        register_graphql_mutation(
            'saveStep',
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
            'bookingId' => [
                'type'        => 'String',
                'description' => __('Booking ID', 'wpcbooking')
            ],
            'step' => [
                'type'        => 'Int',
                'description' => __('Step number', 'wpcbooking')
            ],
            'formData' => [
                'type'        => 'String',
                'description' => __('Form data as JSON string', 'wpcbooking')
            ],
            'quoteHash' => [
                'type'        => 'String',
                'description' => __('Quote hash', 'wpcbooking')
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
                'description' => __('Whether the save was successful', 'wpcbooking')
            ],
            'summaryData' => [
                'type'        => 'String',
                'description' => __('Step summary data as JSON string', 'wpcbooking')
            ],
            'errors' => [
                'type'        => 'String',
                'description' => __('Error messages as JSON string', 'wpcbooking')
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
                $booking_id = $input['bookingId'] ?? null;
                $step = $input['step'] ?? null;
                $form_data = $input['formData'] ?? null;
                $quote_hash = $input['quoteHash'] ?? null;
                if (!$booking_id) {
                    throw new UserError(__('Booking ID is required', 'wpcbooking'));
                }

                if ($step === null) {
                    throw new UserError(__('Step number is required', 'wpcbooking'));
                }

                if (!$form_data) {
                    throw new UserError(__('Form data is required', 'wpcbooking'));
                }

                $booking_inputs = json_decode($form_data, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new UserError(__('Invalid form data JSON', 'wpcbooking'));
                }
                self::init_booking_controller($booking_id);

                $validation_error = self::validate_blocks($booking_inputs, $step);
                if ($validation_error !== null) {
                    return [
                        'success' => false,
                        'summaryData' => null,
                        'errors' => json_encode($validation_error),
                    ];
                }

                $quote_id = null;
                if ($quote_hash && !empty($quote_hash)) {
                    $quote_id = booking_get_quote_id_by_hash($quote_hash);
                }
                self::set_quote_id($quote_id);
                if ($quote_id) {
                    $max_reached_step = get_post_meta($quote_id, '_max_reached_step', true);
                    $processed_data = self::process_bookign_data($quote_id, $max_reached_step, $booking_inputs);
                    $summary_json = json_encode($processed_data);
                    if ($summary_json === false) {
                        throw new \Exception('Failed to encode summary data: ' . json_last_error_msg());
                    }
                    return [
                        'success' => true,
                        'summaryData' => $summary_json,
                        'errors' => null,
                    ];
                } else {
                    return [
                        'success' => true,
                        'summaryData' => null,
                        'errors' => null,
                    ];
                }
            } catch (\Exception $e) {
                error_log('❌ [SaveStepMutation] Exception caught: ' . $e->getMessage());
                return [
                    'success' => false,
                    'summaryData' => null,
                    'errors' => json_encode([$e->getMessage()]),
                ];
            }
        };
    }

    protected static function get_step_sections($step): array
    {
        $booking_controller = self::get_booking_controller();
        return $booking_controller->get_step_sections($step);
    }


    protected static function process_bookign_data(int $quote_id, $step, array $booking_inputs): array
    {

        $booking_controller = self::get_booking_controller();

        // Get all step sections (blocks organized by step)
        $blocks = $booking_controller->get_booking_blocks();
        if (!is_array($blocks)) {
            throw new \Exception('Failed to get booking sections');
        }
        // Save all data
        $save_data = self::save_blocks($blocks, $booking_inputs, $step);
        $summary_data = [];

        $total = 0;
        $products = [];
        foreach ($blocks as $step_num => $blocks_step) {
            if ($step_num <= $step) {
                $percentages = [];
                $summary_data[$step_num] = self::process_summary_data($quote_id, $blocks_step, $total, $percentages);
                $products = array_merge($products, self::process_products($blocks_step, $save_data, $step_num));
                $step_percentages[$step_num] = $percentages;
            }
        }
        update_post_meta($quote_id, '_total_price', $total);
        // Calculate total percentage pomocí univerzální funkce
        $result = self::calculate_and_save_step_prices(
            $quote_id,
            $summary_data,
            $total,
            $step_percentages,
            [
                'save_meta' => true,
                'update_summary_data' => $summary_data,
                'log_enabled' => false
            ]
        );
        $summary_data = self::update_summary_data_prices($summary_data, $result);
        $quote_price = $result['quote_price'];
        return [
            'save_data' => $save_data,
            'shipping_total' => 0,
            'total_price' => $total,
            'quote_price' => $quote_price,
            'summary_data' => $summary_data,
            'products' => $products ?? []
        ];
    }

    protected static function process_summary_data(int $quote_id, array $blocks_step, &$total, &$percentages): array
    {
        $price_step = 0;
        $item_output = '';
        $step_data = [];
        $step_data['thumbnail_src'] = $blocks_step['thumbnail_src'];
        $step_data['label_summary'] = $blocks_step['label_summary'] ?? '';
        $step_data['conditions'] = $blocks_step['conditions'] ?? [];
        // Process inner blocks
        $render_data = [];
        if (isset($blocks_step['innerBlocks']) && is_array($blocks_step['innerBlocks'])) {
            foreach ($blocks_step['innerBlocks'] as $inner_block) {
                $field_id = $inner_block['attrs']['field_id'] ?? null;
                if (!$field_id) continue;
                $block_price = apply_filters(sprintf('wpcbooking_block_price_%s', $inner_block['blockName']), 0, $quote_id, $field_id, $inner_block);
                $_percentage = get_post_meta($quote_id, $field_id . '_percentage', true);
                if (is_array($_percentage) && !empty($_percentage)) {
                    foreach ($_percentage as $percentage) {
                        $percentages[] = $percentage;
                    }
                }
                // Get render data via filter (new approach - returns structured data, not HTML)
                $field_render_data = apply_filters('wpcbooking_block_render_data_' . $inner_block['blockName'], null, $quote_id, $field_id, $inner_block);
                if ($field_render_data !== null) {
                    $render_data[] = $field_render_data;
                }
            }
            $price_step += is_numeric($block_price) ? $block_price : 0;
            $total += is_numeric($block_price) ? $block_price : 0;
        }
        // Add block data
        return [
            'data' => $step_data,
            'price_step' => $price_step,
            'item_output' => $item_output,
            'render_data' => $render_data,
        ];
    }

    protected static function process_products(array $blocks_step, array $save_data, int $step_num): array
    {
        if (!isset($blocks_step['innerBlocks']) || !is_array($blocks_step['innerBlocks'])) {
            return [];
        }

        $products = [];

        foreach ($blocks_step['innerBlocks'] as $inner_block) {
            if (
                $inner_block['blockName'] !== 'booking/product-grid' &&
                $inner_block['blockName'] !== 'booking/product-list'
            ) {
                continue;
            }

            $field_id = $inner_block['attrs']['field_id'] ?? null;
            if (!$field_id) continue;

            $_products = $save_data[$field_id . '_products'] ?? [];
            foreach ($_products as $product) {
                $products[] = [
                    'product_id' => $product['product_id'] ?? 0,
                    'name' => $product['name'] ?? '',
                    'label' => $product['label'] ?? '',
                    'title' => $product['title'] ?? $product['name'] ?? '',
                    'price' => $product['price'] ?? 0,
                    'value' => $product['price'] ?? 0,
                    'quantity' => $product['qty'] ?? 1,
                    'step' => $step_num,
                    'field_id' => $field_id,
                    'row' => $product['row'] ?? null,
                    'price_type' => $product['price_type'] ?? 'value',
                    'qty_type' => $product['qty_type'] ?? 'not_connected',
                    'qty_field' => $product['qty_field'] ?? '',
                    'percentage' => $product['percentage'] ?? null,
                    'show_in_total' => $product['show_in_total'] ?? false,
                ];
            }
        }

        return $products;
    }

    protected static function update_summary_data_prices(array $summary_data, array $result): array
    {
        if (!isset($result['step_prices']) || !is_array($result['step_prices'])) {
            return $summary_data;
        }

        foreach ($summary_data as $step_id => &$step_data) {
            if (isset($result['step_prices'][$step_id]['final_price'])) {
                $step_data['price_step'] = $result['step_prices'][$step_id]['final_price'];
            }
        }

        return $summary_data;
    }
}
