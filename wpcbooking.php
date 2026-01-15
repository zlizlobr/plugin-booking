<?php

/**
 * Plugin Name: Booking
 * Plugin URI: https://yourwebsite.com/wpcbooking
 * Description: refaktor a preact acf-flowform
 * Version: 1.0.0
 * Author: Artevio
 * Author URI: https://yourwebsite.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: wpcbooking
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Network: false
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('WPCBOOKING_VERSION', current_time('YmdHis'));
define('WPCBOOKING_DEV', true);
define('WPCBOOKING_PLUGIN_FILE', __FILE__);
define('WPCBOOKING_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WPCBOOKING_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WPCBOOKING_INCLUDES_DIR', WPCBOOKING_PLUGIN_DIR . 'includes/');

// Load Composer autoloader early
$autoloader = WPCBOOKING_PLUGIN_DIR . 'vendor/autoload.php';
if (file_exists($autoloader)) {
    require_once $autoloader;
}

// Initialize plugin only once using static variable
static $loader_initialized = false;
if (!$loader_initialized) {
    Wpcbooking\Core\Loader::get_instance();
    $loader_initialized = true;
}

// Activation hook
register_activation_hook(__FILE__, function () {
    require_once WPCBOOKING_INCLUDES_DIR . 'Core/Activator.php';
    Wpcbooking\Core\Activator::activate();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function () {
    require_once WPCBOOKING_INCLUDES_DIR . 'Core/Deactivator.php';
    Wpcbooking\Core\Deactivator::deactivate();
});