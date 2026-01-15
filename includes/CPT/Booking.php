<?php

namespace Wpcbooking\CPT;

use Wpcbooking\Models\CustomPostTypeRegistrar;
use Wpcbooking\CPT\BookingOptions;

/**
 * Booking custom post type handler.
 * Manages booking post type registration, templates, and hooks.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class Booking
{
	public const SLUG = 'booking';

	/**
	 * Initialize booking post type.
	 * Registers post type and sets up hooks.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 */
	public function __construct()
	{
		$this->register_post_type();
		$this->init_hooks();
	}
	/**
	 * Initialize WordPress hooks for booking post type.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function init_hooks()
	{
		add_filter('template_include', [$this, 'single_template'], 10);
		add_filter('query_vars', [$this, 'add_query_vars'], 10);
		add_action('save_post_' . self::SLUG, [$this, 'save_booking'], 10, 3);
		add_action('init', [$this, 'add_rewrite_rules']);
		add_filter('wpcbooking/allowed_post_types', [$this, 'allowed_post_types']);
	}

	/**
	 * Register booking custom post type.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_post_type()
	{
		$cpt = new CustomPostTypeRegistrar(self::SLUG, __('Booking', 'wpcbooking'), [
			'labels' => [
				'name'                     => __('Bookings', 'wpcbooking'),
				'singular_name'            => __('Booking', 'wpcbooking'),
				'add_new'                  => __('Add New', 'wpcbooking'),
				'add_new_item'             => __('Add New Booking', 'wpcbooking'),
				'edit_item'                => __('Edit Booking', 'wpcbooking'),
				'new_item'                 => __('New Booking', 'wpcbooking'),
				'view_item'                => __('View Booking', 'wpcbooking'),
				'view_items'               => __('View Bookings', 'wpcbooking'),
				'search_items'             => __('Search Bookings', 'wpcbooking'),
				'not_found'                => __('No bookings found', 'wpcbooking'),
				'not_found_in_trash'       => __('No bookings found in Trash', 'wpcbooking'),
				'all_items'                => __('All Bookings', 'wpcbooking'),
				'archives'                 => __('Booking Archives', 'wpcbooking'),
				'attributes'               => __('Booking Attributes', 'wpcbooking'),
				'insert_into_item'         => __('Insert into booking', 'wpcbooking'),
				'uploaded_to_this_item'    => __('Uploaded to this booking', 'wpcbooking'),
				'featured_image'           => __('Featured Image', 'wpcbooking'),
				'set_featured_image'       => __('Set featured image', 'wpcbooking'),
				'remove_featured_image'    => __('Remove featured image', 'wpcbooking'),
				'use_featured_image'       => __('Use as featured image', 'wpcbooking'),
				'menu_name'                => __('Bookings', 'wpcbooking'),
				'filter_items_list'        => __('Filter bookings list', 'wpcbooking'),
				'items_list_navigation'    => __('Bookings list navigation', 'wpcbooking'),
				'items_list'               => __('Bookings list', 'wpcbooking'),
				'item_published'           => __('Booking published.', 'wpcbooking'),
				'item_published_privately' => __('Booking published privately.', 'wpcbooking'),
				'item_reverted_to_draft'   => __('Booking reverted to draft.', 'wpcbooking'),
				'item_scheduled'           => __('Booking scheduled.', 'wpcbooking'),
				'item_updated'             => __('Booking updated.', 'wpcbooking'),
			],
			'supports'            => array('title', 'editor'),
			'show_in_rest' => true,
			'menu_icon' => 'dashicons-buddicons-pm',
		]);
		add_action('init', [$cpt, 'register']);
		add_action('init', [$this, 'init_booking_options'], 20);
	}

	/**
	 * Initialize booking options metabox.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function init_booking_options()
	{
		try {
			new BookingOptions();
		} catch (\Exception $e) {
			error_log('[CPT Booking] Error: ' . $e->getMessage() . print_r($e, true));
		}
	}

	/**
	 * Filter single booking template.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param string $template Current template path
	 * @return string Template path for booking single view
	 */
	function single_template($template)
	{
		// todo: přesunout do CustomPostTypeRegistrar jako methodu	
		if (is_singular(self::SLUG)) {
			$template = WPCBOOKING_PLUGIN_DIR . 'includes/Views/CPT/single-' . self::SLUG . '.php';
		}
		return $template;
	}

	/**
	 * Add custom query variables for booking URLs.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $vars Current query variables
	 * @return array Extended query variables array
	 */
	public function add_query_vars($vars)
	{
		$vars[] = 'aff_step';
		$vars[] = 'aff_quote_edit';
		$vars[] = 'aff_edit_summary';
		return $vars;
	}

	/**
	 * Save booking post meta data.
	 * Handles Google Maps store location data.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $post_id Post ID
	 * @param \WP_Post $post Post object
	 * @param bool $update Whether this is an existing post being updated
	 * @return void
	 */
	public function save_booking($post_id, $post, $update)
	{
		if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || wp_is_post_revision($post_id)) {
			return;
		}

		if (!isset($_POST['_wpnonce']) || !wp_verify_nonce($_POST['_wpnonce'], 'update-post_' . $post_id)) {
			return;
		}

		if (!current_user_can('edit_post', $post_id)) {
			return;
		}

		// Uložit Google Maps data
		if (isset($_POST['map_store_location'])) {
			$map_data = stripslashes($_POST['map_store_location']);
			$map_data = sanitize_text_field($map_data);

			$decoded_data = json_decode($map_data, true);

			if (json_last_error() === JSON_ERROR_NONE && is_array($decoded_data)) {
				$validated_data = $this->validate_map_data($decoded_data);
				$options = get_booking_options_basics($post_id);
				$options['store_location'] = $validated_data;
				update_post_meta($post_id, '_booking_options_basics', $options);
			}
		}
	}

	/**
	 * Validate and sanitize Google Maps data.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $data Raw map data array
	 * @return array Validated and sanitized map data
	 */
	private function validate_map_data($data)
	{
		$validated = [];

		// Validovat adresu
		if (isset($data['address']) && is_string($data['address'])) {
			$validated['address'] = sanitize_text_field($data['address']);
		}

		// Validovat latitude
		if (isset($data['lat']) && is_numeric($data['lat'])) {
			$validated['lat'] = floatval($data['lat']);
		}

		// Validovat longitude
		if (isset($data['lng']) && is_numeric($data['lng'])) {
			$validated['lng'] = floatval($data['lng']);
		}

		// Validovat country code
		if (isset($data['country_code']) && is_string($data['country_code'])) {
			$validated['country_code'] = sanitize_text_field($data['country_code']);
		}

		return $validated;
	}

	/**
	 * Add rewrite rules for booking post type.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function add_rewrite_rules()
	{
		add_rewrite_rule(
			'^' . self::SLUG . '/([^/]+)/?$',
			'index.php?post_type=' . self::SLUG . '&name=$matches[1]',
			'top'
		);
		flush_rewrite_rules();
	}

	/**
	 * Add booking post type to allowed post types filter.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $post_types Current allowed post types
	 * @return array Extended post types array
	 */
	public function allowed_post_types($post_types)
	{
		$post_types[] = self::SLUG;
		return $post_types;
	}
}
