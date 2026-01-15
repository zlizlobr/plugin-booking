<?php

namespace Wpcbooking\Core;

use Wpcbooking\Blocks\StepSection;
use Wpcbooking\Blocks\BookingForm;

/**
 * Blocks loader and Gutenberg integration.
 * Handles block registration and Gutenberg editor customization.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class Blocks
{

	/**
	 * Initialize blocks loader.
	 * Loads blocks and sets up Gutenberg hooks.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 */
	public function __construct()
	{
		$this->load_blocks();
		$this->init_hooks();
	}
	/**
	 * Initialize WordPress hooks for Gutenberg integration.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	protected function init_hooks(): void
	{
		add_filter('allowed_block_types', [$this, 'allow_gutenberg_blocks'], 99);
		add_filter('block_categories_all', [$this, 'add_block_categories'], 99, 2);
		add_filter('enqueue_block_editor_assets', [$this, 'remove_gutenberg_script_basethema'], 1);
	}

	/**
	 * Load all block classes from Blocks directory.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	protected function load_blocks(): void
	{
		$blocks_dir = WPCBOOKING_INCLUDES_DIR . 'Blocks/';
		$block_files = glob($blocks_dir . '*.php');

		if (booking_can_loading_scripts()) {
			new StepSection();

			foreach ($block_files as $file) {
				$filename = basename($file, '.php');
				if ($filename === 'AbstractBlock' || $filename === 'AbstractProductBlock' || $filename === 'StepBlock') continue;

				$class_name = 'Wpcbooking\\Blocks\\' . $filename;

				if (class_exists($class_name)) {
					try {
						$class_name::get_instance();
					} catch (\Exception $e) {
						// Skip failed block
						error_log('[Blocks] Error loading block: ' . $class_name . ': ' . $e->getMessage());
					}
				}
			}
		} else {
			new BookingForm();
		}
	}

	/**
	 * Filter allowed Gutenberg block types for booking editor.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array|null $allowed_blocks Currently allowed blocks
	 * @return array Allowed block types
	 */
	public function allow_gutenberg_blocks($allowed_blocks)
	{

		if (!booking_can_loading_scripts()) {
			return $allowed_blocks ?? [];
		}
		$default_blocks	 = ['core/heading', 'core/heading', 'core/paragraph'];
		$booking_blocks = apply_filters('booking_editor_allowed_block_types', booking_get_all_block_names());
		$result =  array_merge($default_blocks, $booking_blocks);
		return is_array($result) ? $result : $booking_blocks;
	}

	/**
	 * Add custom block categories for booking editor.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $block_categories Existing block categories
	 * @param \WP_Block_Editor_Context $editor_context Block editor context
	 * @return array Modified block categories
	 */
	public function add_block_categories(array $block_categories, \WP_Block_Editor_Context $editor_context): array
	{
		if (!booking_is_edit_page()) return $block_categories;

		if (! empty($editor_context->post)) {
			$block_categories[]  = [
				'slug'  => 'booking-cat-form',
				'title' => __('Forms', 'booking'),
				'icon'  => null
			];
			$block_categories[] = [
				'slug'  => 'booking-cat-fields',
				'title' => __('Fields Booking', 'booking'),
				'icon'  => null
			];
		}
		return $block_categories;
	}
	/**
	 * Remove BaseTheme Gutenberg scripts from booking editor.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function remove_gutenberg_script_basethema()
	{
		if (booking_is_edit_page()) {
			remove_action('enqueue_block_editor_assets', 'enqeue_gutenberg_script');
		}
	}
}
