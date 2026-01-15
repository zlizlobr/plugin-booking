<?php

namespace Wpcbooking\Core;

use Wpcbooking\Controllers\AdminController;
use Wpcbooking\Controllers\PublicController;
use Wpcbooking\Plugins\Woocomerce\WoocomerceController;
use Wpcbooking\Plugins\WpGraphql\WpGraphqlController;
use Wpcbooking\Plugins\FluentCRM\FluentCRMController;
use Wpcbooking\CPT\Booking;
use Wpcbooking\CPT\Quote;
use Wpcbooking\Core\Blocks;
use Wpcbooking\Core\FieldLoader;
use Wpcbooking\Traits\NotificationTrait;

/**
 * Main plugin loader class.
 * Handles plugin initialization, dependency loading, and textdomain setup.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class Loader
{
    use NotificationTrait;
    const FORM_POST_TYPE = 'abooking';
    const QUOTE_POST_TYPE = 'aquote';
    private static $instance = null;
    private $required_files = [
        'includes/Core/Helper.php',
        'vendor/wpify/custom-fields/custom-fields.php',
    ];

    /**
     * Get loader singleton instance.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return Loader Loader instance
     */
    public static function get_instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Initialize loader.
     * Checks WPGraphQL dependency and loads required files and dependencies.
     *
     * @package Wpcbooking
     * @since 1.0.0
     */
    private function __construct()
    {
        if (!$this->is_wp_graphql_active()) {
            $this->add_notice(
                __('Pro správnou funkčnost je nutné mít nainstalovaný a aktivní plugin WPGraphQL. Prosím, nainstalujte a aktivujte plugin <a href="https://github.com/wp-graphql/wp-graphql/releases" target="_blank">WPGraphQL</a>.', 'wpcbooking'),
                'error'
            );
            return;
        }
        $this->load_required_files();
        $this->load_dependencies();
        $this->load_textdomain();
    }


    /**
     * Check if WPGraphQL plugin is active.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return bool True if WPGraphQL is active
     */
    private function is_wp_graphql_active()
    {
        if (!function_exists('is_plugin_active')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        return is_plugin_active('wp-graphql/wp-graphql.php');
    }

	/**
	 * Load and initialize plugin dependencies.
	 * Initializes controllers, CPTs, and core components.
	 *
	 * @package Wpcbooking
	 * @since 1.0.0
	 *
	 * @return void
	 */
	private function load_dependencies()
	{
		// List of instances to initialize
		$instances = [
			'FieldLoader' => FieldLoader::class,
			'AdminController' => AdminController::class,
			'PublicController' => PublicController::class,
			'WoocomerceController' => WoocomerceController::class,
			'WpGraphqlController' => WpGraphqlController::class,
			'FluentCRMController' => FluentCRMController::class,
			'Booking' => Booking::class,
			'Quote' => Quote::class,
			'Blocks' => Blocks::class,
		];

		// Initialize each instance with error handling
		// todo: controla aby se opakovaně neinicializoval class
		foreach ($instances as $name => $class) {
			try {
				new $class();
			} catch (\Exception $e) {
				error_log('[Loader] Error initializing ' . $name . ': ' . $e->getMessage());
			} catch (\Error $e) {
				error_log('[Loader] Fatal error initializing ' . $name . ': ' . $e->getMessage());
			}
		}
	}

    /**
     * Load required plugin files.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    private function load_required_files(): void
    {
        foreach ($this->required_files as $path_file) {
            if (file_exists(WPCBOOKING_PLUGIN_DIR . $path_file)) {
                try {
                    require_once WPCBOOKING_PLUGIN_DIR . $path_file;
                } catch (\Exception $e) {
                    error_log('[Loader] Error loading FILES: ' . $path_file . ': ' . print_r($e, true));
                }
            } else {
                error_log('[Loader] File not found: ' . WPCBOOKING_PLUGIN_DIR . $path_file);
            }
        }
    }

    /**
     * Load plugin textdomain for translations.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    private function load_textdomain()
    {
        load_plugin_textdomain(
            'wpcbooking',
            false,
            dirname(plugin_basename(WPCBOOKING_PLUGIN_FILE)) . '/languages/'
        );
    }
}
