<?php

namespace Wpcbooking\Controllers;

use Wpcbooking\CPT\Booking;

/**
 * Admin controller for handling admin area functionality.
 * Manages admin assets, options page, and admin-specific hooks.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class AdminController
{

    /**
     * Initialize admin controller.
     * Sets up admin hooks and options page.
     *
     * @package Wpcbooking
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->init_hooks();
    }

	/**
	 * Initialize WordPress hooks for admin area.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function init_hooks()
	{
		add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
		add_action('admin_head', [$this, 'add_menu_icon_styles']);
		add_filter('wpcbooking/allowed_post_types', [$this, 'extend_allowed_post_types']);
		$this->register_options_page();
	}

    /**
     * Enqueue admin assets (CSS and JavaScript).
     * Only loads assets on allowed post type edit pages.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $hook Current admin page hook
     * @return void
     */
    public function enqueue_admin_assets($hook)
    {
        // Načítat skripty pouze pro naše CPT (+ rozšířené přes filter)
        $allowed_post_types = apply_filters('wpcbooking/allowed_post_types', []);
        $current_screen = get_current_screen();

        // Kontrola, zda jsme na stránce s našimi CPT a jde o edit
        if (!$current_screen || !in_array($current_screen->post_type, $allowed_post_types) || $current_screen->base !== 'post') {
            return;
        }

        wp_enqueue_style(
            'wpcbooking-admin',
            WPCBOOKING_PLUGIN_URL . 'assets/css/dist/admin.min.css',
            [],
            WPCBOOKING_VERSION
        );

        $api_key = booking_get_maps_api_key();

        if (isset($api_key)) {
            wp_enqueue_script(
                'google-maps-api',
                "https://maps.googleapis.com/maps/api/js?key={$api_key}&libraries=places,geometry,directions",
                [],
                null,
                true
            );
        }

        // Get wpify-custom-fields script handle to ensure proper loading order
        $wpify_handle = null;
        if (function_exists('wpify_custom_fields')) {
            $custom_fields = wpify_custom_fields();
            $wpify_handle = $custom_fields->get_script_handle();
        }

        // Enqueue Google Maps JavaScript API
        $admin_dependencies = ['jquery', 'wp-hooks'];
        if ($wpify_handle) {
            $admin_dependencies[] = $wpify_handle;
        }

        // Flatpickr CSS - načítání přes CDN pro admin time picker
        wp_enqueue_style(
            'flatpickr-css',
            'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
            [],
            '4.6.13'
        );

        // Flatpickr JS - načítání přes CDN pro admin time picker
        wp_enqueue_script(
            'flatpickr-js',
            'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.js',
            [],
            '4.6.13',
            true
        );

        wp_enqueue_script(
            'wpcbooking-admin',
            WPCBOOKING_PLUGIN_URL . 'assets/js/dist/admin.js',
            array_merge($admin_dependencies, ['flatpickr-js']),
            WPCBOOKING_VERSION,
            true
        );

        wp_localize_script(
            'wpcbooking-admin',
            'wpcbooking_admin_vars',
            [
                'booking_blocks' => booking_get_all_block_names(),
                'bookingNumberFields' => $this->get_booking_number_fields(),
                'debug' => [
                    'screen' => function_exists('get_current_screen') && get_current_screen() ? get_current_screen()->id : null,
                    'post_type' => function_exists('get_current_screen') && get_current_screen() ? get_current_screen()->post_type : null,
                    'allowed_post_types' => $allowed_post_types,
                ]
            ]
        );
    }

    /**
     * Extend allowed post types for admin assets.
     * Adds 'product' post type to allowed types.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $types Current allowed post types
     * @return array Extended post types array
     */
    public function extend_allowed_post_types($types)
    {
        if (!is_array($types)) {
            $types = [];
        }
        // Přidej produkt pro použití fieldů v produktech
        if (!in_array('product', $types, true)) {
            $types[] = 'product';
        }
        return $types;
    }
    /**
     * Get number input fields from current booking post.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Array of field objects with field_id and label
     */
    private function get_booking_number_fields()
    {
        $post_id = get_the_ID();
        if (!$post_id || $post_id <= 0) {
            return [];
        }
        $fields = extract_block_fields_from_booking($post_id, 'booking/number-input');
        return $fields;
    }

	/**
	 * Register plugin options page using WPify Custom Fields.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_options_page()
	{
		if (!function_exists('wpify_custom_fields')) {
			return;
		}

		wpify_custom_fields()->create_options_page(
			array(
				'type'            => \Wpify\CustomFields\Integrations\Options::TYPE_OPTIONS,
				'parent_slug'     => 'edit.php?post_type=' . Booking::SLUG,
				'page_title'      => __('Options', 'wpcbooking'),
				'menu_title'      => __('Options', 'wpcbooking'),
				'menu_slug'       => 'wpcbooking-options',
				'capability'      => 'manage_options',
				'option_name'     => 'wpcbooking_options',
				'success_message' => __('Settings saved successfully.', 'wpcbooking'),
				'items'           => array(
					'google_maps_api_key' => array(
						'type'        => 'text',
						'label'       => __('Google Maps API Key', 'wpcbooking'),
						'description' => __('Enter your Google Maps API key. This key will be used for all Google Maps functionality in the plugin.', 'wpcbooking'),
						'required'    => false,
					),
				),
			)
		);
	}

	/**
	 * Add custom CSS styles for booking menu icon.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function add_menu_icon_styles()
	{
		?>
		<style>
			#adminmenu #menu-posts-booking .wp-menu-image img {
				width: 20px;
				height: 20px;
				opacity: 0.6;
				transition: opacity 0.2s;
			}
			#adminmenu #menu-posts-booking:hover .wp-menu-image img,
			#adminmenu #menu-posts-booking.current .wp-menu-image img,
			#adminmenu #menu-posts-booking.wp-has-current-submenu .wp-menu-image img {
				opacity: 1;
			}
			#adminmenu #menu-posts-booking .wp-menu-image {
				padding-top: 0;
			}
		</style>
		<?php
	}
}
