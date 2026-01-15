<?php
namespace Wpcbooking\Uninstall;

// If uninstall not called from WordPress, exit
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// Define plugin prefix
define('WPCBOOKING_UNINSTALL', true);
