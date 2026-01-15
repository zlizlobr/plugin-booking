<?php

namespace Wpcbooking\Controllers;

use Wpcbooking\Models\BlocksModel;

/**
 * Booking controller for managing booking form rendering and data.
 * Handles template rendering, block processing, and booking configuration.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class BookingController
{
    private int $booking_id;
    private array $settings_design;
    private array $settings_basics;
    private array $settings_woocommerce;
    private array $settings_summary;
    private array $blocks;
    private array $all_blocks;
    private static $instance = null;
    /**
     * Initialize booking controller with booking ID.
     * Loads booking settings and blocks configuration.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $booking_id Booking post ID
     */
    public function __construct(int $booking_id)
    {
        $this->booking_id = $booking_id;
        $this->settings_design = get_booking_options_design($this->booking_id);
        $this->settings_basics = get_booking_options_basics($this->booking_id);
        $this->settings_woocommerce  = get_booking_options_woocommerce($this->booking_id);
        $this->settings_summary = get_booking_options_summary($this->booking_id);

        $this->blocks = BlocksModel::get_step_blocks($this->booking_id);
        $this->all_blocks = BlocksModel::get_all_blocks_config($this->booking_id);
    }

    /**
     * Get singleton instance of booking controller.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $booking_id Booking post ID
     * @return self Booking controller instance
     */
    public static function get_instance(int $booking_id): self
    {
        if (self::$instance === null) {
            self::$instance = new self($booking_id);
        }
        return self::$instance;
    }
    /**
     * Get header template for booking step.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $step Step number
     * @return string Rendered header template HTML
     */
    public function get_header_template($step)
    {
        return booking_get_template('Booking/header', [
            'title' => $this->settings_design['title'] ?? '',
            'colored_text' => $this->settings_design['colored_text'] ?? null,
            'black_text' => $this->settings_design['black_text'] ?? null,
            'step' => $step,
        ]);
    }
    /**
     * Get content template for booking step.
     * Renders blocks or summary section.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $step Step number
     * @return string|null Rendered content template HTML or null
     */
    public function get_content_template($step)
    {
        $block = $this->blocks[$step] ?? false;

        if (!$block)  return;

        if ($block === 'summary') {
            return booking_get_template(
                'section/summary',
                compact(
                    'form_id'
                )
            );
        } else {
            try {
                $processed_block = $this->process_inner_blocks($block);

                $serialized = serialize_block($processed_block);

                $result = str_replace(']]>', ']]&gt;', apply_filters('the_content', $serialized));
                return $result;
            } catch (\Throwable $th) {
                error_log(sprintf(
                    '[ERROR] Render gutenberg blocks: %s | File: %s | Line: %d',
                    $th->getMessage(),
                    $th->getFile(),
                    $th->getLine()
                ));
                return;
            }
        }
    }
    /**
     * Get background image template for booking step.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $step Step number
     * @return string|null Rendered background template HTML or null
     */
    public function get_background_template($step)
    {
        $attributes = $this->get_block_attributes($step);
        if (!isset($attributes["show_background"]) || $attributes["show_background"] != '1' || !isset($this->settings_design['background_image'])) {
            return;
        }
        $image = get_attached_file($this->settings_design['background_image'], "full");
        if (!$image) return;
        return booking_get_template(
            'Booking/bg-image',
            [
                'bg_image' => $image,
                'step' => $step
            ]
        );
    }
    /**
     * Get block attributes for specific step.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $step Step number
     * @return array Block attributes array
     */
    private function get_block_attributes($step)
    {
        $block = $this->blocks[$step] ?? false;
        if (!$block) return [];
        return $block['attrs'];
    }

    /**
     * Process inner blocks and prepare for serialization.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $block Block array with innerBlocks
     * @return array Processed block array
     */
    private function process_inner_blocks($block)
    {

        if (isset($block['innerBlocks']) && !empty($block['innerBlocks'])) {
            $inner_html = '';
            $inner_content = [];

            foreach ($block['innerBlocks'] as $index => $inner_block) {

                try {
                    $serialized_inner = serialize_block($inner_block);
                    $inner_html .= $serialized_inner;
                    $inner_content[] = $serialized_inner;
                } catch (\Throwable $th) {
                    // Skip failed block
                    error_log('[BookingController]  serializing inner block ' . $index . ': ' . $th->getMessage());
                }
            }

            $block['innerHTML'] = $inner_html;
            $block['innerContent'] = $inner_content;
        }
        return $block;
    }
    /**
     * Get all booking steps with configuration.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Array of step configurations indexed by step number
     */
    public function get_booking_steps(): array
    {
        $steps = [];
        $index = 1;
        foreach ($this->all_blocks as $block) {
            if ($block['blockName'] !== 'booking/step-section') continue;
            $steps[$index] = $block['attrs'] ?? [];
            $steps[$index]['thumbnail_src'] = $block['attrs']['thumbnail_id'] ? get_attached_file($block['attrs']['thumbnail_id'], 'full') : '';
            if (isset($block['attrs']['condition']) && $block['attrs']['condition'] !== null) {
                $steps[$index]['condition'] = $block['attrs']['condition'];
            }
            $index++;
        }
        return $steps;
    }
    /**
     * Get all booking sections (blocks grouped by step).
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Array of sections indexed by step number
     */
    public function get_booking_sections(): array
    {

        $steps = [];
        $step = 1;
        foreach ($this->all_blocks as $block) {
            if ($block['blockName'] == 'booking/step-section') {
                $steps[$step] =  $this->prepare_blocks($block['innerBlocks'] ?? []);
                $step++;
            }
        }
        return $steps;
    }
    /**
     * Get all booking blocks with full configuration.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Array of block configurations indexed by step number
     */
    public function get_booking_blocks(): array
    {

        $blocks = [];
        $step = 1;
        foreach ($this->all_blocks as $block) {
            if ($block['blockName'] !== 'booking/step-section') continue;
            $blocks[$step] = $block['attrs'] ?? [];
            $blocks[$step]['thumbnail_src'] = $block['attrs']['thumbnail_id'] ? get_attached_file($block['attrs']['thumbnail_id'], 'full') : '';
            if (isset($block['attrs']['condition']) && $block['attrs']['condition'] !== null) {
                $blocks[$step]['condition'] = $block['attrs']['condition'] ?? [];
            }
            $blocks[$step]['innerBlocks'] =  $this->prepare_blocks($block['innerBlocks'] ?? []);

            $step++;
        }
        return $blocks;
    }

    /**
     * Get sections for specific step.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $step Step number
     * @return array Array of block configurations for the step
     * @throws \Exception If step not found
     */
    public function get_step_sections($step): array
    {
        $sections = $this->get_booking_sections();
        if (!isset($sections[$step])) {
            throw new \Exception(__('Step not found', 'wpcbooking'));
        }
        return $sections[$step];
    }

    /**
     * Prepare blocks by applying filters for attributes and rules.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $blocks Array of block arrays
     * @return array Prepared blocks array
     */
    private function prepare_blocks($blocks)
    {
        foreach ($blocks as $key => $block) {
            $block_name = $block['blockName'] ?? 'unknown';

            $build_attrs = $block;

            $prepare_filter = sprintf('wpcbooking_prepare_block_%s', $block_name);
            $build_attrs['attrs'] = apply_filters($prepare_filter, $block['attrs'] ?? []);

            $rules_filter = sprintf('wpcbooking_block_rules/%s', $block_name);
            $build_attrs['rules'] = apply_filters($rules_filter, [], $build_attrs);

            $blocks[$key] = $build_attrs;
        }
        return $blocks;
    }
    /**
     * Get block by field ID key.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $key Block field ID
     * @return array|null Block array or null if not found
     */
    public function get_block($key): ?array
    {
        foreach ($this->all_blocks as $i => $block) {
            if (isset($block['blockName']) && $block['blockName'] == 'booking/step-section') {
                foreach ($block['innerBlocks'] ?? [] as $inner_block) {
                    if ($inner_block['attrs']['field_id'] == $key) {
                        return $inner_block;
                    }
                }
            }
        }
        return null;
    }

    /**
     * Get step number for block by field ID key.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $key Block field ID
     * @return int|null Step number or null if not found
     */
    public function get_block_step($key): ?int
    {
        foreach ($this->all_blocks as $step => $block) {
            foreach ($block['innerBlocks'] ?? [] as $inner_block) {
                if ($inner_block['attrs']['field_id'] == $key) {
                    return $step;
                }
            }
        }
        return null;
    }

    /**
     * Get all booking options (design, basics, woocommerce, summary).
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Array with all booking option groups
     */
    public function get_booking_options(): array
    {
        return [
            'design' => $this->get_booking_options_design(),
            'basics' => $this->get_booking_options_basics(),
            'woocommerce' => $this->get_booking_options_woocommerce(),
            'summary' => $this->get_booking_options_summary(),
        ];
    }
    /**
     * Get booking design options.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Design options array
     */
    public function get_booking_options_design(): array
    {
        return $this->settings_design;
    }
    /**
     * Get booking basic options.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Basic options array
     */
    public function get_booking_options_basics(): array
    {
        return $this->settings_basics;
    }
    /**
     * Get booking WooCommerce options.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array WooCommerce options array
     */
    public function get_booking_options_woocommerce(): array
    {
        return $this->settings_woocommerce;
    }
    /**
     * Get booking summary step options.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Summary options array
     */
    public function get_booking_options_summary(): array
    {
        return $this->settings_summary;
    }
    /**
     * Get quote currency, falling back to booking WooCommerce default currency.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $quote_id Quote post ID
     * @return string|null Currency code or null
     */
    public function get_quote_currency(int $quote_id): ?string
    {
        return get_quote_currency($quote_id, $this->booking_id);
    }
}
