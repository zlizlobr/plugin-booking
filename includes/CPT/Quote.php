<?php

namespace Wpcbooking\CPT;

use Wpcbooking\Models\CustomPostTypeRegistrar;
use Wpcbooking\CPT\Booking;
use Wpcbooking\Controllers\BookingController;
use Wpcbooking\Traits\WooCommerceTrait;
use Wpcbooking\Traits\ValidatesBlockTrait;

/**
 * Quote custom post type handler.
 * Manages quote post type, status, WooCommerce integration, and admin interface.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class Quote
{
	use WooCommerceTrait;
	use ValidatesBlockTrait;
	public const SLUG = 'quote';

	/**
	 * Initialize quote post type.
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
	 * Initialize WordPress hooks for quote post type.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function init_hooks()
	{
		add_action('init', [$this, 'load_init_hooks']);
		add_filter('wpcbooking/allowed_post_types', [$this, 'allowed_post_types']);
		add_filter('wpcbooking_quote_statuses', [$this, 'set_quote_statuses'], 10);
		add_action('admin_head', [$this, 'hide_add_button'], 10);
		add_filter('wp_count_posts', [$this, 'no_draft_count_posts'], 10, 2);
		add_filter('manage_' . self::SLUG . '_posts_columns', [$this, 'add_column']);
		add_action('manage_' . self::SLUG . '_posts_custom_column', [$this, 'column_content'], 10, 2);
		add_filter('manage_edit-' . self::SLUG . '_sortable_columns', [$this, 'column_sortable']);
		add_action('pre_get_posts', [$this, 'filter_quotes_by_status'], 10);
		add_action('admin_init', [$this, 'track_post_edit_open'], 10);
		add_filter('template_include', [$this, 'single_template'], 10);
		add_filter('query_vars', [$this, 'add_query_vars'], 10);
		add_action('load-post.php', [$this, 'edit_quote_display_notices']);
		add_filter("views_edit-" . self::SLUG, [$this, 'custom_quote_views'], 9999999999);
		add_action('admin_menu', [$this, 'fix_quotes_menu_url'], 99);
		add_action('woocommerce_order_status_changed', [$this, 'on_order_status_changed'], 10, 3);
		add_action('add_meta_boxes', [$this, 'add_custom_meta_boxes'], 10);
		add_action('save_post_' . self::SLUG, [$this, 'save_quote_summary'], 20, 3);

		// WooCommerce hooks for quote checkout
		add_action('wpcbooking_accepts_quote_init', [$this, 'init_cart_for_quote'], 10);
		add_action('wpcbooking_accepts_quote_init', [$this, 'prefill_billing_fields']);
		add_action('woocommerce_cart_calculate_fees', [$this, 'add_fees_for_item']);
		add_action('woocommerce_before_calculate_totals', [$this, 'set_custom_price_products']);
		add_filter('woocommerce_form_field_args', [$this, 'class_to_checkout_fields'], 999, 3);
	}
	/**
	 * Load hooks that need to run on init action.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function load_init_hooks()
	{
		$this->rewrite_rules();
		$this->register_metaboxes();
	}

	/**
	 * Register quote custom post type.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_post_type()
	{
		$cpt = new CustomPostTypeRegistrar(
			self::SLUG,
			__('Quote', 'wpcbooking'),
			[
				'labels' => [
					'name'                     => __('All Quotes', 'wpcbooking'),
					'singular_name'            => __('Quote', 'wpcbooking'),
					'add_new'                  => __('Add New', 'wpcbooking'),
					'add_new_item'             => __('Add New Quote', 'wpcbooking'),
					'edit_item'                => __('Edit Quote', 'wpcbooking'),
					'new_item'                 => __('New Quote', 'wpcbooking'),
					'view_item'                => __('View Quote', 'wpcbooking'),
					'view_items'               => __('View Quotes', 'wpcbooking'),
					'search_items'             => __('Search Quotes', 'wpcbooking'),
					'not_found'                => __('No quotes found', 'wpcbooking'),
					'not_found_in_trash'       => __('No quotes found in Trash', 'wpcbooking'),
					'all_items'                => __('All Quotes', 'wpcbooking'),
					'archives'                 => __('Quote Archives', 'wpcbooking'),
					'attributes'               => __('Quote Attributes', 'wpcbooking'),
					'insert_into_item'         => __('Insert into quote', 'wpcbooking'),
					'uploaded_to_this_item'    => __('Uploaded to this quote', 'wpcbooking'),
					'featured_image'           => __('Featured Image', 'wpcbooking'),
					'set_featured_image'       => __('Set featured image', 'wpcbooking'),
					'remove_featured_image'    => __('Remove featured image', 'wpcbooking'),
					'use_featured_image'       => __('Use as featured image', 'wpcbooking'),
					'menu_name'                => __('Quotes', 'wpcbooking'),
					'filter_items_list'        => __('Filter quotes list', 'wpcbooking'),
					'items_list_navigation'    => __('Quotes list navigation', 'wpcbooking'),
					'items_list'               => __('Quotes list', 'wpcbooking'),
					'item_published'           => __('Quote published.', 'wpcbooking'),
					'item_published_privately' => __('Quote published privately.', 'wpcbooking'),
					'item_reverted_to_draft'   => __('Quote reverted to draft.', 'wpcbooking'),
					'item_scheduled'           => __('Quote scheduled.', 'wpcbooking'),
					'item_updated'             => __('Quote updated.', 'wpcbooking'),
				],
				'public' => true,
				'show_ui' => true,
				'show_in_menu' => 'edit.php?post_type=' . Booking::SLUG,
				'rewrite'  => ['slug' => 'quote'],
				'supports'            => array('title'),
			]
		);
		add_action('init', [$cpt, 'register']);
	}

	/**
	 * Add quote post type to allowed post types filter.
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

	/**
	 * Set default quote statuses.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $statuses Current statuses array
	 * @return array Merged statuses array with defaults
	 */
	public function set_quote_statuses($statuses)
	{
		return array_merge([
			'unfinished' => __('Unfinished', 'wpcbooking'),
			'submitted' => __('Submitted', 'wpcbooking'),
			'read' => __('Read', 'wpcbooking'),
			'confirmed' => __('Confirmed', 'wpcbooking'),
			'sent' => __('Sent', 'wpcbooking'),
			'opened' => __('Opened', 'wpcbooking'),
			'accepted' => __('Accepted', 'wpcbooking'),
			'paid' => __('Paid', 'wpcbooking'),
		], $statuses);
	}


	/**
	 * Hide "Add New" button for quote post type in admin.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function hide_add_button()
	{
		$post_type = isset($_GET['post_type']) ? $_GET['post_type'] : '';
		if ($post_type === self::SLUG) {
			echo '<style>
            .page-title-action {
                display: none !important;
            }
        </style>';
		}
	}

	/**
	 * Exclude draft posts from quote count.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param object $counts Post counts object
	 * @param string $post_type Post type
	 * @return object Modified counts object
	 */
	public function no_draft_count_posts($counts, $post_type)
	{
		if (is_admin() && $post_type === self::SLUG) {
			if (isset($counts->draft) && isset($counts->total_posts)) {
				$counts->total_posts -= $counts->draft;
			}
		}
		return $counts;
	}

	/**
	 * Add status column to quotes list table.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $columns Current columns array
	 * @return array Modified columns array
	 */
	public function add_column($columns)
	{
		$new_columns = [];
		foreach ($columns as $key => $value) {
			$new_columns[$key] = $value;
			if ($key === 'title') {
				$new_columns['quote_status'] = __('Status', 'wpcbooking');
			}
		}
		return $new_columns;
	}

	/**
	 * Display content for custom columns in quotes list.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param string $column Column name
	 * @param int $post_id Post ID
	 * @return void
	 */
	public function column_content($column, $post_id)
	{
		if ($column === 'quote_status') {
			echo self::get_quote_status_label($post_id);
		}
	}

	/**
	 * Make status column sortable.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $columns Current sortable columns
	 * @return array Extended sortable columns array
	 */
	public function column_sortable($columns)
	{
		$columns['quote_status_column'] = 'quote_status';
		return $columns;
	}

	/**
	 * Filter quotes by status in admin list.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param \WP_Query $query WordPress query object
	 * @return void
	 */
	public function filter_quotes_by_status($query)
	{
		global $pagenow;
		if (is_admin() && $pagenow === 'edit.php' && isset($_GET['quote_status']) && $_GET['quote_status'] !== '') {
			$post_type = $query->get('post_type');
			if (!$post_type && isset($_GET['post_type'])) {
				$post_type = $_GET['post_type'];
			}

			if ($post_type === self::SLUG) {
				$meta_query = $query->get('meta_query');
				if (!is_array($meta_query)) {
					$meta_query = [];
				}
				if ($_GET['quote_status'] === 'unfinished') {
					$meta_query[] = [
						'relation' => 'OR',
						[
							'key' => '_quote_status',
							'value' => 'unfinished',
							'compare' => '=',
						],
						[
							'key' => '_quote_status',
							'compare' => 'NOT EXISTS',
						],
					];
				} else {
					$meta_query[] = [
						'key' => '_quote_status',
						'value' => sanitize_text_field($_GET['quote_status']),
					];
				}
				$query->set('meta_query', $meta_query);
			}
		}

		$orderby = $query->get('orderby');
		if ('quote_status' === $orderby) {
			$query->set('meta_key', '_quote_status');
			$query->set('orderby', 'meta_value');
		}
	}
	/**
	 * Add custom meta boxes for quote edit screen.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function add_custom_meta_boxes()
	{
		add_meta_box(
			'quote_edit',
			__('Quote Summary', 'wpcbooking'),
			[$this, 'quote_edit_callback'],
			self::SLUG,
			'normal',
			'high'
		);
	}
	/**
	 * Render quote edit metabox content.
	 * Outputs admin summary React component data.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param \WP_Post $post Post object
	 * @return void
	 */
	public function quote_edit_callback($post)
	{
		try {
			$quote_id = $post->ID;
			$booking_id = get_post_meta($quote_id, '_booking_id', true);
			self::init_booking_controller($booking_id);
			$booking_controller = self::get_booking_controller();
			$booking_options = $booking_controller->get_booking_options();
			$step_sections = $booking_controller->get_booking_sections();
			$steps = $booking_controller->get_booking_steps();
			$values = [];
			$max_steps = get_post_meta($quote_id, '_max_reached_step', true);
			if ($max_steps) {
				$steps = array_filter($steps, fn($key) => $key <= $max_steps, ARRAY_FILTER_USE_KEY);
				$filtered_step_sections = [];
				foreach ($step_sections as $key => $section) {
					if ($key <= $max_steps) {
						$filtered_step_sections[$key] = $section;
						foreach ($section ?? [] as $_block) {
							if (!isset($_block['attrs']['field_id']) || empty($_block['attrs']['field_id'])) continue;
							$field_id = $_block['attrs']['field_id'];
							$values[$field_id] = apply_filters('wpcbooking_quote_value_' . $_block['blockName'], get_post_meta($quote_id, $field_id, true), $quote_id, $_block);
						}
					}
				}
				$step_sections = $filtered_step_sections;
			}

			foreach ($steps as $step_key => &$step) {
				if (!empty($step['thumbnail_id'])) {
					$step['thumbnail_url'] = wp_get_attachment_image_url($step['thumbnail_id'], 'full');
				}
				$meta_label = get_post_meta($quote_id, '_step_' . $step_key . '_label', true);
				if ($meta_label !== '') {
					$step['label_summary'] = $meta_label;
				}
				$step['base_price'] = (float) get_post_meta($quote_id, '_step_' . $step_key . '_base_price', true) ?: 0;
				$step['percentage_price'] = (float) get_post_meta($quote_id, '_step_' . $step_key . '_percentage_price', true) ?: 0;
			}
			unset($step);

			$woocommerce_settings = $booking_options['woocommerce'] ?? [];
			$summary_settings = $booking_options['summary'] ?? [];
			$design_settings = $booking_options['design'] ?? [];
			$basics_settings = $booking_options['basics'] ?? [];
			$admin_data = [
				'postId' => $quote_id,
				'bookingId' => $booking_id,
				'pluginUrl' => WPCBOOKING_PLUGIN_URL,
				'graphqlEndpoint' => home_url('/graphql'),

				'formatConfig' => [
					'decimalSeparator' => get_option('woocommerce_price_decimal_sep', ','),
					'thousandSeparator' => get_option('woocommerce_price_thousand_sep', '.'),
					'numberOfDecimals' => intval(get_option('woocommerce_price_num_decimals', 2)),
					'currencySymbol' => function_exists('get_woocommerce_currency_symbol')
						? get_woocommerce_currency_symbol($woocommerce_settings['woo_default_currency'] ?? 'DKK')
						: 'kr.',
					'currencyPosition' => get_option('woocommerce_currency_pos', 'right_space'),
				],

				'summarySettings' => [
					'labelSummary' => $summary_settings['label_summary'] ?? __('Summary', 'wpcbooking'),
					'labelPrice' => $summary_settings['label_price'] ?? __('Price', 'wpcbooking'),
					'labelTotal' => $summary_settings['label_total'] ?? __('Total', 'wpcbooking'),
					'editSummary' => $summary_settings['edit_summary'] ?? true,
				],

				'designSettings' => [
					'coloredText' => $design_settings['colored_text'] ?? '',
					'blackText' => $design_settings['black_text'] ?? '',
					'backgroundImage' => $design_settings['background_image'] ?? null,
				],

				'basicsSettings' => [
					'title' => $basics_settings['title'] ?? '',
					'nextButtonText' => $basics_settings['next_button_text'] ?? __('Next', 'wpcbooking'),
					'prevButtonText' => $basics_settings['prev_button_text'] ?? __('Previous', 'wpcbooking'),
					'saveButtonText' => $basics_settings['save_button_text'] ?? __('Save', 'wpcbooking'),
				],

				'labels' => [
					'addFee' => __('Add fee', 'wpcbooking'),
					'label' => __('Label', 'wpcbooking'),
					'loading' => __('Loading...', 'wpcbooking'),
					'error' => __('Error', 'wpcbooking'),
					'save' => __('Save', 'wpcbooking'),
					'delete' => __('Delete', 'wpcbooking'),
				],
				'values' => $values ?? [],
				'steps' => $steps ?? [],
				'stepSections' => $step_sections ?? [],
				'number_fields' => $this->get_dynamic_booking_fields_options($booking_id),
				'summaryData' => get_post_meta($quote_id, '_summary_data', true) ?: [],
				'totalPrice' => (float) get_post_meta($quote_id, '_total_price', true) ?: 0,
				'percentagePrice' => (float) get_post_meta($quote_id, '_total_percentage_price', true) ?: 0,
				'quotePrice' => (float) get_post_meta($quote_id, '_quote_price', true) ?: 0,
				'nonce' => wp_create_nonce('edit_summary_quote_' . $quote_id),
			];
		} catch (\Exception $e) {
			error_log('[Quote] Error in quote_edit_callback: ' . $e->getMessage());
			error_log('[Quote] Trace: ' . $e->getTraceAsString());
			error_log('[Quote] File: ' . $e->getFile());
			error_log('[Quote] Line: ' . $e->getLine());
			error_log('[Quote] Code: ' . $e->getCode());
			error_log('[Quote] Message: ' . $e->getMessage());
			error_log('[Quote] Previous: ' . print_r($e->getPrevious(), true));
			return;
		}
?>
		<script type="text/javascript">
			window.wpcbookingAdminData = <?php echo wp_json_encode($admin_data); ?>;
		</script>
		<div id="admin-summary-root"></div>
<?php
	}
	/**
	 * Register quote information metabox using WPify Custom Fields.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_metaboxes()
	{
		wpify_custom_fields()->create_metabox([
			'id' => 'quote_info',
			'title' => __('Quote Information', 'wpcbooking'),
			'post_types' => [self::SLUG],
			'context' => 'side',
			'priority' => \Wpify\CustomFields\Integrations\Metabox::PRIORITY_DEFAULT,
			'items' => $this->get_quote_info_fields(),
		]);
	}

	/**
	 * Get quote information fields configuration.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return array Fields configuration array
	 */
	private function get_quote_info_fields(): array
	{
		$statuses = apply_filters('wpcbooking_quote_statuses', []);
		$status_options = [];
		$tips = [
			'unfinished' => __('User started filling out the booking but didn\'t complete it', 'wpcbooking'),
			'submitted' => __('User completed the booking form', 'wpcbooking'),
			'read' => __('Admin opened and viewed the booking', 'wpcbooking'),
			'confirmed' => __('Admin created an offer, added price, and confirmed it', 'wpcbooking'),
			'sent' => __('System sent the offer to the customer', 'wpcbooking'),
			'opened' => __('Customer opened and viewed the offer', 'wpcbooking'),
			'accepted' => __('Customer accepted the offer, order created', 'wpcbooking'),
			'paid' => __('Customer paid for the order', 'wpcbooking'),
		];

		foreach ($statuses as $index => $value) {
			$tip = isset($tips[$index]) ? ' - ' . $tips[$index] : '';
			$status_options[$index] = $value . $tip;
		}

		return [
			'_max_reached_step:' => [
				'type' => 'input',
				'id' => '_max_reached_step',
				'label' => __('Max Reached Step', 'wpcbooking'),
				
			],
			'_quote_status' => [
				'type' => 'select',
				'label' => __('Status', 'wpcbooking'),
				'options' => $status_options,
				'default' => 'unfinished',
			],

			'_quote_currency' => [
				'type' => 'select',
				'label' => __('Currency', 'wpcbooking'),
				'options' => $this->get_woo_currencies(),
				'default' => 'DKK',
			],
		];
	}
	/**
	 * Get max reached step content for display.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return string HTML content or empty string
	 */
	public function get_max_reached_step_content(): string
	{	
		$quote_id = get_the_ID();
		error_log('quote_id: ' . $quote_id);
		$max_reached_step = get_post_meta($quote_id, '_max_reached_step', true);
		if (!$max_reached_step) {
			return '';
		}
		$edit_date = get_post_meta($quote_id, '_edit_date', true);
		$max_reached_step = intval($max_reached_step);
		$max_reached_step_label = __('Proccess step: %s', 'wpcbooking');
		$max_reached_step_label = sprintf($max_reached_step_label, $max_reached_step);
		return '<label>' . $max_reached_step_label . '</label><br>'.
		$edit_date;
	}


	/**
	 * Track when quote edit page is opened and update status to 'read'.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function track_post_edit_open()
	{
		if (is_admin() && isset($_GET['post']) && isset($_GET['action']) && $_GET['action'] === 'edit') {
			$post_id = intval($_GET['post']);
			if (get_post_type($post_id) !== self::SLUG) return;
			$status = get_post_meta($post_id, '_quote_status', true);

			if ($status === 'submitted') {
				self::update_quote_status($post_id, 'read');
			}
		}
	}

	/**
	 * Filter single quote template and initialize cart.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param string $template Current template path
	 * @return string Template path for quote single view
	 */
	public function single_template($template)
	{
		if (is_singular(self::SLUG)) {
			$plugin_template = WPCBOOKING_PLUGIN_DIR . 'includes/Views/CPT/Quote/single-quote.php';
			if (file_exists($plugin_template)) {
				// Initialize cart for quote
				$quote_id = get_the_ID();
				if ($quote_id) {
					do_action('wpcbooking_accepts_quote_init', $quote_id);
				}
				return $plugin_template;
			}
		}
		return $template;
	}

	/**
	 * Display error notices on quote edit page.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function edit_quote_display_notices(): void
	{
		if (!isset($_GET['post'])) return;
		$quote_id = intval($_GET['post']);
		$quote = get_post($quote_id);
		if ($quote && self::SLUG === $quote->post_type) {
			$this->display_notices($quote);
		}
	}

	/**
	 * Display error notices for quote.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param object|int $quote Quote post object or post ID
	 * @return void
	 */
	public static function display_notices(object|int $quote): void
	{
		if (is_numeric($quote)) {
			$quote_id = $quote;
		} elseif (is_object($quote) && $quote instanceof \WP_Post) {
			$quote_id = $quote->ID;
		}
		if (!isset($quote_id)) return;
		$notices = get_post_meta($quote_id, '_notices_error', true);

		if (!isset($notices) || !is_array($notices) || empty($notices)) return;
		add_action('admin_notices', function () use ($notices, $quote_id) {
			foreach ($notices as $i => $item) {
				if (isset($item['notice']) && !empty($item['notice'])) {
					echo '<div class="notice notice-error is-dismissible"><p>' . htmlspecialchars($item['notice']) . '</p></div>';
				}
			}
		});
	}

	/**
	 * Add custom query variables for quote URLs.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $vars Current query variables
	 * @return array Extended query variables array
	 */
	public function add_query_vars($vars)
	{
		$vars[] = 'quote_user_hash';
		return $vars;
	}

	/**
	 * Add rewrite rules for quote post type.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function rewrite_rules()
	{
		add_rewrite_rule(
			'^my_quote/([^/]+)/([^/]+)/?$',
			'index.php?post_type=' . self::SLUG . '&name=$matches[1]&quote_user_hash=$matches[2]',
			'top'
		);
	}

	/**
	 * Get quote status label by quote ID.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @return string Status label
	 */
	public static function get_quote_status_label($quote_id)
	{
		$statuses = apply_filters('wpcbooking_quote_statuses', []);
		$meta_value = get_post_meta($quote_id, '_quote_status', true);
		return $statuses[$meta_value] ?? __('Unfinished', 'wpcbooking');
	}

	/**
	 * Customize quote list views with status filters.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $views Current views array
	 * @return array Modified views array with status filters
	 */
	public function custom_quote_views($views)
	{
		global $wpdb;
		$statuses = apply_filters('wpcbooking_quote_statuses', []);
		$counts = [];

		$unfinished_count = $wpdb->get_var($wpdb->prepare(
			"SELECT COUNT(DISTINCT p.ID) FROM {$wpdb->posts} p
			LEFT JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = '_quote_status'
			WHERE p.post_type = %s
			AND p.post_status IN ('draft', 'publish', 'pending', 'future', 'private')
			AND (pm.meta_value = 'unfinished' OR pm.meta_value IS NULL)",
			self::SLUG
		));
		$counts['unfinished'] = $unfinished_count;

		foreach ($statuses as $status_key => $status_label) {
			if ($status_key === 'unfinished') continue;
			$count = $wpdb->get_var($wpdb->prepare(
				"SELECT COUNT(*) FROM {$wpdb->posts} p
				INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
				WHERE p.post_type = %s
				AND p.post_status IN ('draft', 'publish', 'pending', 'future', 'private')
				AND pm.meta_key = '_quote_status'
				AND pm.meta_value = %s",
				self::SLUG,
				$status_key
			));
			$counts[$status_key] = $count;
		}

		$new_views = [];
		$total_count = array_sum($counts);
		$current_view = isset($_GET['quote_status']) ? $_GET['quote_status'] : '';
		$all_url = admin_url('edit.php?post_type=' . self::SLUG);
		$all_class = empty($current_view) ? 'current' : '';
		$new_views['all'] = sprintf(
			'<a href="%s" class="%s">%s <span class="count">(%d)</span></a>',
			esc_url($all_url),
			$all_class,
			__('All', 'wpcbooking'),
			$total_count
		);

		foreach ($statuses as $status_key => $status_label) {
			$count = $counts[$status_key];
			$url = add_query_arg('quote_status', $status_key, admin_url('edit.php?post_type=' . self::SLUG));
			$class = ($current_view === $status_key) ? 'current' : '';
			$label_parts = explode(' – ', $status_label, 2);
			$main_label = $label_parts[0];
			$note = isset($label_parts[1]) ? $label_parts[1] : '';
			$display_label = $main_label;
			if (!empty($note)) {
				$display_label .= ' <span class="description">(' . esc_html($note) . ')</span>';
			}
			$new_views[$status_key] = sprintf(
				'<a href="%s" class="%s">%s <span class="count">(%d)</span></a>',
				esc_url($url),
				$class,
				$display_label,
				$count
			);
		}

		if (isset($views['trash'])) {
			$new_views['trash'] = $views['trash'];
		}
		return $new_views;
	}

	/**
	 * Fix quotes menu URL to show submitted quotes by default.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function fix_quotes_menu_url()
	{
		global $submenu;
		foreach ($submenu as $menu_slug => &$items) {
			foreach ($items as $k => $item) {
				$url_key = null;
				$title_key = null;
				foreach ($item as $key => $value) {
					if (is_string($value) && strpos($value, 'edit.php?post_type=' . self::SLUG) === 0 && strpos($value, 'quote_status=') === false) {
						$url_key = $key;
					}
					if ($value === 'All Quotes') {
						$title_key = $key;
					}
				}
				if ($url_key !== null && $title_key !== null) {
					$submenu[$menu_slug][$k][$url_key] = add_query_arg('quote_status', 'submitted', $item[$url_key]);
				}
			}
		}
	}

	/**
	 * Handle WooCommerce order status change and update quote status to 'paid'.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $order_id WooCommerce order ID
	 * @param string $old_status Old order status
	 * @param string $new_status New order status
	 * @return void
	 */
	public function on_order_status_changed($order_id, $old_status, $new_status)
	{
		$order = wc_get_order($order_id);
		if (!$order) {
			return;
		}
		$quote_id = get_post_meta($order_id, '_quote_id', true);
		if ($quote_id && $order->is_paid()) {
			self::update_quote_status($quote_id, 'paid');
		}
	}

	/**
	 * Get dynamic booking fields options from post content (fallback for initial load)
	 * JS will update options dynamically from Gutenberg editor
	 *
	 * @since 1.0.0
	 * @param int|null $post_id Post ID
	 * @param string $block_name Block name to extract fields from
	 * @return array Array of options in format ['value' => 'label']
	 */
	protected function get_dynamic_booking_fields_options(?int $post_id, string|array|null $block_name = 'booking/number-input'): array
	{
		// Default option
		$options = [
			'none' => __('None', 'wpcbooking'),
		];
		if (!$post_id || $post_id <= 0) {
			return $options;
		}

		// Extract fields from post content as fallback
		// JS will update options dynamically when blocks are added/changed
		$stored_fields = extract_block_fields_from_booking($post_id, $block_name);
		if (!is_array($stored_fields) || empty($stored_fields)) {
			return $options;
		}

		// Convert stored fields to options format
		foreach ($stored_fields as $field) {
			if (!isset($field['field_id']) || !isset($field['label'])) {
				continue;
			}

			$field_id = sanitize_text_field($field['field_id']);
			$label = sanitize_text_field($field['label']);

			if (empty($field_id) || empty($label)) {
				continue;
			}

			$options[$field_id] = $label;
		}

		return $options;
	}

	/**
	 * Update quote status and optionally trigger status changed hook.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @param string $status New status
	 * @param bool $trigger_hook Whether to trigger wpcbooking_quote_status_changed action
	 * @return void
	 */
	public static function update_quote_status(int $quote_id, string $status, bool $trigger_hook = true)
	{
		$old_status = get_post_meta($quote_id, '_quote_status', true);
		update_post_meta($quote_id, '_quote_status', $status);

		if ($trigger_hook && $old_status !== $status) {
			do_action('wpcbooking_quote_status_changed', $quote_id, $old_status, $status);
		}
	}

	/**
	 * Save Admin Summary data when saving Quote CPT.
	 * Handles block data, prices, and totals saving.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $post_id Quote post ID
	 * @param \WP_Post $post Post object
	 * @param bool $update Whether this is an existing post being updated
	 * @return void
	 */
	public function save_quote_summary(int $post_id, \WP_Post $post, bool $update): void
	{

		if (!is_admin()) return;

		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
			return;
		}

		if (wp_is_post_revision($post_id)) {
			return;
		}

		if (!current_user_can('edit_post', $post_id)) {
			return;
		}

		if (isset($_POST['nonce'])) {
			$nonce = $_POST['nonce'];

			if (!wp_verify_nonce($nonce, 'edit_summary_quote_' . $post_id)) {
				return;
			}
		}

		$booking_id = get_post_meta($post_id, '_booking_id', true);
		if (!$booking_id) {
			error_log('[Quote Save] ❌ No booking_id found for quote ID: ' . $post_id);
			return;
		}
		self::trigger_quote_status_changed($post_id);
		// Inicializovat booking controller
		self::init_booking_controller($booking_id);
		$booking_controller = self::get_booking_controller();
		try {
			// PHASE 1: Block-level data (FILTRACÍ přes AbstractBlock)
			// DŮLEŽITÉ: Ukládáme blocks PRVNÍ, protože ceny závisí na uložených block datech!
			$this->save_summary_blocks($post_id);

			// PHASE 2: Backend Price Recalculation
			// DŮLEŽITÉ: Nepřebíráme frontend ceny, ale počítáme je SPOLEHLIVĚ na backendu!


			// PHASE 3: Global Totals
		} catch (\Exception $e) {
			error_log('[Quote Save] Error saving quote ID ' . $post_id . ': ' . $e->getMessage());
			error_log('[Quote Save] File: ' . $e->getFile());
			error_log('[Quote Save] Line: ' . $e->getLine());
			error_log('[Quote Save] Trace: ' . $e->getTraceAsString());
		}
	}

	/**
	 * Trigger quote status changed action if status was updated.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @return void
	 */
	protected function trigger_quote_status_changed(int $quote_id): void
	{

		if (!isset($_POST['_quote_status'])) return;
		$old_status = get_post_meta($quote_id, '_quote_status', true);
		$status = $_POST['_quote_status'];
		do_action('wpcbooking_quote_status_changed', $quote_id, $old_status, $status);
	}

	/**
	 * Save total prices from Admin Summary.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @return void
	 */
	private function save_summary_totals(int $quote_id): void
	{
		if (isset($_POST['totalPrice'])) {
			$total_base = floatval($_POST['totalPrice']);
			update_post_meta($quote_id, '_total_price', $total_base);
		}

		if (isset($_POST['percentagePrice'])) {
			$total_percentage = floatval($_POST['percentagePrice']);
			update_post_meta($quote_id, '_total_percentage_price', $total_percentage);
		}

		if (isset($_POST['quotePrice'])) {
			$final_total = floatval($_POST['quotePrice']);
			update_post_meta($quote_id, '_quote_price', $final_total);
		}
	}

	/**
	 * Save block-level data using wpcbooking_save_block_ filters.
	 * Blocks are sorted before saving (number inputs first, products last).
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @return void
	 */
	private function save_summary_blocks(int $quote_id): void
	{
		$booking_id = get_post_meta($quote_id, '_booking_id', true);
		if (!$booking_id) {
			error_log('[Blocks] ❌ No booking_id found');
			return;
		}
		self::init_booking_controller($booking_id);
		$booking_controller = self::get_booking_controller();
		$step_sections = $booking_controller->get_booking_sections();
		usort($step_sections, function ($a, $b) {
			$block_name_a = $a['blockName'] ?? '';
			$block_name_b = $b['blockName'] ?? '';

			$is_number_a = $block_name_a === 'booking/number-input';
			$is_number_b = $block_name_b === 'booking/number-input';
			$is_product_a = in_array($block_name_a, ['booking/product-list', 'booking/product-grid']);
			$is_product_b = in_array($block_name_b, ['booking/product-list', 'booking/product-grid']);

			// Number inputs PRVNÍ
			if ($is_number_a && !$is_number_b) return -1;
			if (!$is_number_a && $is_number_b) return 1;

			// Product blocks POSLEDNÍ
			if ($is_product_a && !$is_product_b) return 1;
			if (!$is_product_a && $is_product_b) return -1;

			return 0;
		});
		$blocks_processed = 0;
		$blocks_skipped = 0;
		$blocks_validated = 0;
		// ITEROVAT přes SEŘAZENÉ blocks
		$errors = [];
		$step = 1;
		foreach ($step_sections as $blocks) {
			$this->save_step_data($quote_id,  $step);
			foreach ($blocks as $block) {
				$block_name = $block['blockName'] ?? 'unknown';
				$blocks_validated++;
				$action_name = sprintf('wpcbooking_update_block_%s', $block_name);
				do_action($action_name, $quote_id, $_POST, $block);
			}
			$step++;
		}
		$this->save_summary_totals($quote_id);
	}

	/**
	 * Save step data (label, prices) for specific step.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @param int $step_id Step number
	 * @return void
	 */
	private function save_step_data(int $quote_id, int $step_id): void
	{
		$label = $_POST['label_step_' . $step_id] ?? null;
		if ($label) {
			update_post_meta($quote_id, '_step_' . $step_id . '_label', $label);
		}
		$base_price = $_POST['step_base_price_' . $step_id] ?? 0;
		update_post_meta($quote_id, '_step_' . $step_id . '_base_price', $base_price);

		$percentage_price = $_POST['step_percentage_price_' . $step_id] ?? 0;
		update_post_meta($quote_id, '_step_' . $step_id . '_percentage_price', $percentage_price);

		$total_price = $_POST['step_total_price_' . $step_id] ?? 0;
		update_post_meta($quote_id, '_step_' . $step_id . '_total_price', $total_price);
	}

	/**
	 * Initialize WooCommerce cart from quote data.
	 * Triggered by 'wpcbooking_accepts_quote_init' action.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @return bool True on success, false on failure
	 */
	public function init_cart_for_quote(int $quote_id): bool
	{
		$booking_id = get_post_meta($quote_id, '_booking_id', true);
		if (!$booking_id) {
			return false;
		}

		// Initialize WooCommerce cart and session
		if (!WC()->cart) {
			wc_load_cart();
		}

		booking_active_wc_session();
		WC()->cart->empty_cart();

		// Get booking blocks using BookingController
		self::init_booking_controller($booking_id);
		$controller = self::get_booking_controller();
		$sections = $controller->get_booking_sections();

		// Disable purchasable check
		add_filter('woocommerce_is_purchasable', '__return_true', 99999);

		if (is_array($sections) && !empty($sections)) {
			foreach ($sections as $step => $blocks) {
				foreach ($blocks as $block) {
					$field_id = booking_get_block_id($block);
					if (!$field_id) continue;

					$this->add_block_products_to_cart($quote_id, $block, $field_id);
				}
			}
		}

		WC()->session->set('quote_id', $quote_id);

		$notices = wc_get_notices('error');
		if (!empty($notices)) {
			update_post_meta($quote_id, '_notices_error', $notices);
			return false;
		}

		return true;
	}

	/**
	 * Add products to cart based on block type.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @param array $block Block data
	 * @param string $field_id Block field ID
	 * @return void
	 */
	private function add_block_products_to_cart(int $quote_id, array $block, string $field_id): void
	{
		$block_name = $block['blockName'] ?? '';

		switch ($block_name) {
			case 'booking/product-list':
			case 'booking/product-grid':
				$products = get_post_meta($quote_id, $field_id . '_products', true);
				if (is_array($products)) {
					$new_prices = [];
					foreach ($products as $product) {
						if (isset($product['product_id'], $product['qty'])) {
							$price = (float) ($product['price'] ?? 0);
							// Add product to cart with custom price in cart_item_data
							WC()->cart->add_to_cart(
								$product['product_id'],
								$product['qty'] ?? 1,
								0,
								[],
								['quote_custom_price' => $price]
							);
							$new_prices[$product['product_id']] = $price;
						}
					}
					foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
						// Only set price if product is in new_prices (was just added)
						if (isset($new_prices[$cart_item['product_id']])) {
							$price = $new_prices[$cart_item['product_id']];
							WC()->cart->cart_contents[$cart_item_key]['data']->set_price($price);
						}
					}

					// Log entire cart state after price setting
					$cart_log = [];
					foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
						$cart_log[] = [
							'cart_item_key' => $cart_item_key,
							'product_id' => $cart_item['product_id'],
							'quantity' => $cart_item['quantity'],
							'price' => $cart_item['data']->get_price(),
							'quote_custom_price' => $cart_item['quote_custom_price'] ?? 'not set',
							'line_total' => $cart_item['line_total'] ?? 'not calculated',
						];
					}
				}
				break;
		}
	}

	/**
	 * Prefill WooCommerce billing fields from quote meta.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @return void
	 */
	public function prefill_billing_fields(int $quote_id): void
	{
		$customer = WC()->customer;
		if (!$customer) return;

		$email = get_post_meta($quote_id, '_user_mail', true);
		if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$customer->set_billing_email($email);
		}

		$first_name = get_post_meta($quote_id, '_user_first_name', true);
		if ($first_name) {
			$customer->set_billing_first_name($first_name);
		}

		$last_name = get_post_meta($quote_id, '_user_last_name', true);
		if ($last_name) {
			$customer->set_billing_last_name($last_name);
		}

		$phone = get_post_meta($quote_id, '_user_phone', true);
		if ($phone) {
			$customer->set_billing_phone($phone);
		}

		$country = get_post_meta($quote_id, '_country_short', true);
		if ($country) {
			$customer->set_billing_country(strtoupper($country));
		}

		$customer->save();
	}

	/**
	 * Get booking sections for quote.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param int $quote_id Quote post ID
	 * @return array|null Sections array or null on failure
	 */
	private function get_booking_sections_for_quote(int $quote_id): ?array
	{
		$booking_id = get_post_meta($quote_id, '_booking_id', true);
		if (!$booking_id) return null;

		self::init_booking_controller($booking_id);
		$controller = self::get_booking_controller();
		return $controller->get_booking_sections();
	}

	/**
	 * Add fees to WooCommerce cart based on step prices.
	 * Hook: woocommerce_cart_calculate_fees
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param \WC_Cart $cart WooCommerce cart object
	 * @return void
	 */
	public function add_fees_for_item($cart): void
	{
		if (empty($cart)) return;
		if (is_admin() && !defined('DOING_AJAX')) return;

		$quote_id = WC()->session->get('quote_id');
		if (!$quote_id || !get_post($quote_id)) return;

		$sections = $this->get_booking_sections_for_quote($quote_id);
		if (!$sections) return;
		$new_prices = [];

		if (is_array($sections) && !empty($sections)) {
			foreach ($sections as $step => $blocks) {
				foreach ($blocks as $block) {
					$field_id = booking_get_block_id($block);
					if (!$field_id) continue;

					$block_name = $block['blockName'] ?? '';

					switch ($block_name) {
						case 'booking/date-picker':
						case 'booking/google-map':
							$percentage_data = get_post_meta($quote_id, $field_id . '_percentage', true);
							if (
								!is_array($percentage_data
									|| !isset($percentage_data['price_increase'])
									|| $percentage_data['price_increase']) == 0
							) break;
							$fee_amount =  get_post_meta($quote_id, $field_id . '_fee_amount', true);
							$fee_label =  get_post_meta($quote_id, $field_id . '_fee_label', true);
							if (!is_numeric($fee_amount) || (float)$fee_amount == 0) break;
							WC()->cart->add_fee($fee_label !== '' ? $fee_label : __('Special Fee', 'wpcbooking'), $fee_amount, true);
							break;
					}
				}
			}
		}
	}

	/**
	 * Set custom prices for products in cart based on quote data.
	 * Hook: woocommerce_before_calculate_totals
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param \WC_Cart $cart WooCommerce cart object
	 * @return void
	 */
	public function set_custom_price_products($cart): void
	{
		if (is_admin() && !defined('DOING_AJAX')) return;

		$quote_id = WC()->session->get('quote_id');
		if (!$quote_id || !get_post($quote_id)) return;

		$sections = $this->get_booking_sections_for_quote($quote_id);
		if (!$sections) return;
		$new_prices = [];

		if (is_array($sections) && !empty($sections)) {
			foreach ($sections as $step => $blocks) {
				foreach ($blocks as $block) {
					$field_id = booking_get_block_id($block);
					if (!$field_id) continue;

					$block_name = $block['blockName'] ?? '';

					switch ($block_name) {
						case 'booking/product-list':
						case 'booking/product-grid':
							$products = get_post_meta($quote_id, $field_id . '_products', true);
							if (is_array($products)) {
								foreach ($products as $product) {
									if (isset($product['product_id'])) {
										if (isset($product['price'])) {
											$new_prices[$product['product_id']] = (float) $product['price'];
										} elseif (isset($product['total_percentage'])) {
											$new_prices[$product['product_id']] = (float) $product['total_percentage'];
										}
									}
								}
							}
							break;
					}
				}
			}
		}

		// Apply new prices
		if (!empty($new_prices)) {
			foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
				// First check if custom price was set via cart_item_data
				if (isset($cart_item['quote_custom_price'])) {
					$cart_item['data']->set_price((float) $cart_item['quote_custom_price']);
				} elseif (isset($new_prices[$cart_item['product_id']])) {
					$cart_item['data']->set_price($new_prices[$cart_item['product_id']]);
				}
			}
		} else {
			// Even if new_prices is empty, check for cart_item_data prices
			foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
				if (isset($cart_item['quote_custom_price'])) {
					$cart_item['data']->set_price((float) $cart_item['quote_custom_price']);
				}
			}
		}
	}

	/**
	 * Add custom CSS classes to WooCommerce checkout fields.
	 * Hook: woocommerce_form_field_args
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @param array $args Field arguments
	 * @param string $key Field key
	 * @param mixed $value Field value
	 * @return array Modified field arguments
	 */
	public function class_to_checkout_fields($args, $key, $value): array
	{
		if (!is_singular(self::SLUG)) return $args;

		if (strpos($key, 'billing_') === 0) {
			switch ($key) {
				case 'billing_first_name':
					$args['class'] = ['form-row-first'];
					break;
				case 'billing_last_name':
					$args['class'] = ['form-row-last'];
					break;
				default:
					$args['class'] = ['form-row-wide'];
					break;
			}
		}

		return $args;
	}
}
