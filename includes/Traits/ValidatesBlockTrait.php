<?php

namespace Wpcbooking\Traits;

/**
 * Trait providing block validation and saving functionality.
 * Handles validation and saving of booking form blocks.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
trait ValidatesBlockTrait
{
    use ManagesBookingControllerTrait;

    /**
     * Validate single block data.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $block_data Block data with field_id and value
     * @return array|null Array of error messages or null if valid
     */
    private static function validate_single_block($block_data): array|null
    {

        $block = self::get_block($block_data['field_id']);
        if (!isset($block_data['field_id']) || strlen($block_data['field_id']) < 3 || $block_data['field_id'] === 'undefined') {
            return [__('Invalid field ID', 'wpcbooking')];
        }
        if (!$block) {
            return [__('Block not found', 'wpcbooking')];
        }
        $block_name_parts = explode('/', $block['blockName']);
        $block_name = 'wpcbooking_validate_block_' . $block['blockName'];
        $errors = apply_filters($block_name, [], $block_data['value'] ?? '', $block);
        $result = empty($errors) ? null : $errors;
        return $result;
    }

    /**
     * Validate blocks for specific step.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $blocks_data Array of block data indexed by field_id
     * @param int $step Step number to validate
     * @return array|null Array of errors indexed by field_id or null if valid
     */
    private static function validate_blocks(array $blocks_data, $step): array|null
    {
        $errors = [];
        foreach ($blocks_data as $field_id => $value) {

            $block_step = self::$booking_controller->get_block_step($field_id);
            if ($block_step !== $step) continue;
            // Transform to expected format
            $block_data = [
                'field_id' => $field_id,
                'value' => $value
            ];

            $error = self::validate_single_block($block_data);
            if ($error !== null) {
                $errors[$field_id] = $error;
            }
        }

        $result = empty($errors) ? null : $errors;
        return $result;
    }

    /**
     * Validate all blocks regardless of step.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $blocks_data Array of block data indexed by field_id
     * @return array|null Array of errors indexed by field_id or null if valid
     */
    private static function validate_al_blocks(array $blocks_data): array|null
    {
        $errors = [];
        foreach ($blocks_data as $field_id => $value) {
            // Transform to expected format
            $block_data = [
                'field_id' => $field_id,
                'value' => $value
            ];

            $error = self::validate_single_block($block_data);
            if ($error !== null) {
                $errors[$field_id] = $error;
            }
        }

        $result = empty($errors) ? null : $errors;
        return $result;
    }

    /**
     * Save single block data using block-specific filter.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $field_id Block field ID
     * @param mixed $value Block value to save
     * @return array|null Array of data to save or null if block not found
     */
    private static function save_single_block(string $field_id, mixed $value): ?array
    {
        if ($field_id == '' || !isset($field_id) || empty($field_id)) return null;
        $block = self::get_block($field_id);
        if (!isset($block) || !is_array($block) || empty($block)) return null;


        $data = apply_filters(
            sprintf('wpcbooking_save_block_%s', $block['blockName']),
            [],
            self::get_quote_id(),
            $value,
            $block
        );
        return is_array($data) ? $data : [];
    } 

    /**
     * Save blocks data sorted by type (number inputs first, then others, then products).
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $blocks Array of block configurations indexed by step
     * @param array $booking_inputs Array of input values indexed by field_id
     * @param int $step Maximum step number to process
     * @return array Merged array of saved block data
     */
    private static function save_blocks(array $blocks, array $booking_inputs, int $step = 1): array
    {

        $all_inner_blocks = [];

        foreach ($blocks as $step_num => $blocks_step) {
            if ($step_num > $step) break;

            if (isset($blocks_step['innerBlocks']) && is_array($blocks_step['innerBlocks'])) {
                foreach ($blocks_step['innerBlocks'] as $block) {
                    $all_inner_blocks[] = $block;
                }
            }
        }

        usort($all_inner_blocks, function ($a, $b) {
            $block_name_a = $a['blockName'] ?? '';
            $block_name_b = $b['blockName'] ?? '';

            $is_number_a = $block_name_a === 'booking/number-input';
            $is_number_b = $block_name_b === 'booking/number-input';
            $is_product_a = in_array($block_name_a, ['booking/product-list', 'booking/product-grid']);
            $is_product_b = in_array($block_name_b, ['booking/product-list', 'booking/product-grid']);

            if ($is_number_a && !$is_number_b) return -1;
            if (!$is_number_a && $is_number_b) return 1;
            if ($is_product_a && !$is_product_b) return 1;
            if (!$is_product_a && $is_product_b) return -1;

            return 0;
        });
        $save_data = [];
        foreach ($all_inner_blocks as $block) {
            $field_id = $block['attrs']['field_id'] ?? null;
            if (!$field_id) continue;
            $value = $booking_inputs[$field_id] ?? null;
            if (!$value) continue;
            try {
                $save_data = array_merge($save_data, self::save_single_block($field_id, $value));
            } catch (\Throwable $th) {
                error_log('🔍 [ValidatesBlockTrait] save_single_block: ' . $block['blockName'] . ' - ' . $th->getMessage());
                error_log('code line: ' . $th->getLine());
                error_log('code file: ' . $th->getFile());
                error_log('code trace: ' . $th->getTraceAsString());
                throw new \Exception('[' . $block['blockName'] . '] ' . $th->getMessage());
            }
        }
        return $save_data;
    }

    /**
     * Univerzální funkce pro výpočet a uložení cen s procenty pro všechny steps
     * 
     * @param int $quote_id Quote ID
     * @param array $step_data Pole s daty pro každý step. Může být ve formátu:
     *   - ['step_id' => ['base_price' => float, 'percentages' => array]] (formát z Quote.php)
     *   - ['step_id' => ['price_step' => float]] (formát z SaveStepMutation.php)
     * @param float $total_base_price Celková základní cena pro výpočet procent
     * @param array|null $step_percentages Volitelné pole s procenty ve formátu ['step_id' => [percentage_array]]
     *   Pokud není zadáno, očekává se v $step_data['percentages']
     * @param array $options Volitelné nastavení:
     *   - 'save_meta' => bool (default: true) - zda ukládat do post_meta
     *   - 'update_summary_data' => array|null (default: null) - pokud je pole, aktualizuje summary_data
     *   - 'log_enabled' => bool (default: false) - zda logovat do error_log
     * @return array Pole s výsledky:
     *   - 'quote_price' => float - celková finální cena
     *   - 'total_percentage_price' => float - celková procentuální částka
     *   - 'step_prices' => array - ceny pro každý step ['step_id' => ['base_price', 'percentage_price', 'final_price']]
     */
    protected static function calculate_and_save_step_prices(
        int $quote_id,
        array $step_data,
        float $total_base_price,
        ?array $step_percentages = null,
        array $options = []
    ): array {
       
        
        $save_meta = $options['save_meta'] ?? true;
        $update_summary_data = $options['update_summary_data'] ?? null;
        $log_enabled = $options['log_enabled'] ?? false;
        
       
        $quote_price = 0;
        $total_percentage_price = 0;
        $step_prices_result = [];

        foreach ($step_data as $step_id => $data) {
               
            // Získat base_price podle formátu vstupních dat
            $base_price = $data['base_price'] ?? $data['price_step'] ?? 0;
            $step_price = $base_price;
            $step_percentage_amount = 0;
            
         
            // Získat percentages - buď z $step_percentages nebo z $data['percentages']
            $percentages = null;
            if ($step_percentages !== null && isset($step_percentages[$step_id])) {
                $percentages = $step_percentages[$step_id];
            } elseif (isset($data['percentages']) && is_array($data['percentages'])) {
                $percentages = $data['percentages'];
            }

            // Vypočítat procentuální částky
            if (!empty($percentages) && is_array($percentages)) {
                 foreach ($percentages as $index => $percentage) {
                    if (!isset($percentage['price_increase']) || $percentage['price_increase'] == 0) {
                        continue;
                    }
 
                    $increase = round($total_base_price * ($percentage['price_increase'] / 100), 0);
                    $operation = $percentage['operation'] ?? 'add';
                    
                  
                    if ($operation === 'add') {
                        $step_price += $increase;
                        $step_percentage_amount += $increase;
                    } else {
                        $step_price -= $increase;
                        $step_percentage_amount -= $increase;
                    }

                   
                }
            }

            $total_percentage_price += $step_percentage_amount;
            
           

            // Uložit do post_meta pokud je povoleno
            if ($save_meta) {
                 $result_base = update_post_meta($quote_id, '_step_' . $step_id . '_base_price', $base_price);
                $result_percentage = update_post_meta($quote_id, '_step_' . $step_id . '_percentage_price', $step_percentage_amount);
                 }

            // Uložit výsledky
            $step_prices_result[$step_id] = [
                'base_price' => $base_price,
                'percentage_price' => $step_percentage_amount,
                'final_price' => $step_price,
            ];

            // Aktualizovat summary_data pokud je zadáno
            if ($update_summary_data !== null && isset($update_summary_data[$step_id])) {
                $update_summary_data[$step_id]['price_step'] = $step_price;
            }

            $quote_price += $step_price;
        }

        // Uložit celkové ceny
        if ($save_meta) {
            $result_quote = update_post_meta($quote_id, '_quote_price', $quote_price);
            $result_total_percentage = update_post_meta($quote_id, '_total_percentage_price', $total_percentage_price);
            }

        // Uložit aktualizované summary_data pokud je zadáno
        if ($update_summary_data !== null && $save_meta) {
              $result_summary = update_post_meta($quote_id, '_summary_data', $update_summary_data);
         }

        return [
            'quote_price' => $quote_price,
            'total_percentage_price' => $total_percentage_price,
            'step_prices' => $step_prices_result,
        ];
    }
}
