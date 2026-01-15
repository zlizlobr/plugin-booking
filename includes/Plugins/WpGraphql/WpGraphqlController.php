<?php

namespace Wpcbooking\Plugins\WpGraphql;

use Wpcbooking\Plugins\AbstractPluginController;

class WpGraphqlController extends AbstractPluginController
{
    const PLUGIN_NAME = 'WPGraphQL';
    const PLUGIN_SLUG = 'wpgraphql';

    protected function check_plugin_active()
    {
        return is_plugin_active('wp-graphql/wp-graphql.php');
    }

    protected function get_notification_message()
    {
        return __('WPGraphQL plugin is required for WPC Booking to function properly. Please install and activate WPGraphQL.', 'wpcbooking');
    }

    protected function init_hooks()
    {
        add_action(get_graphql_register_action(), [$this, 'register_types'], 5);
        add_action(get_graphql_register_action(), [$this, 'register_queries'], 10);
        add_action(get_graphql_register_action(), [$this, 'register_mutations'], 15);
    }

    public function register_mutations()
    {
        $mutations_dir = WPCBOOKING_INCLUDES_DIR . '/Plugins/WpGraphql/Mutations/';

        if (!is_dir($mutations_dir)) {
            return;
        }

        $files = glob($mutations_dir . '*.php');

        foreach ($files as $file) {
            $filename = basename($file, '.php');
            if ($filename === 'MutationInterface') continue;

            $class_name = "\\Wpcbooking\\Plugins\\WpGraphql\\Mutations\\{$filename}";

            if (class_exists($class_name) && method_exists($class_name, 'register_mutation')) {
                $class_name::register_mutation();
            }
        }
    }

    public function register_queries()
    {
        $queries_dir = WPCBOOKING_INCLUDES_DIR . '/Plugins/WpGraphql/Queries/';

        if (!is_dir($queries_dir)) {
            return;
        }

        $files = glob($queries_dir . '*.php');

        foreach ($files as $file) {
            $filename = basename($file, '.php');
            if ($filename === 'QueryInterface') continue;

            $class_name = "\\Wpcbooking\\Plugins\\WpGraphql\\Queries\\{$filename}";

            if (class_exists($class_name) && method_exists($class_name, 'register_query')) {
                $class_name::register_query();
            }
        }
    }

    public function register_types()
    {
        $types_dir = WPCBOOKING_INCLUDES_DIR . '/Plugins/WpGraphql/Types/';

        if (!is_dir($types_dir)) {
            return;
        }

        $files = glob($types_dir . '*.php');

        foreach ($files as $file) {
            $filename = basename($file, '.php');
            if ($filename === 'TypeInterface') continue;

            $class_name = "\\Wpcbooking\\Plugins\\WpGraphql\\Types\\{$filename}";

            if (class_exists($class_name) && method_exists($class_name, 'register_type')) {
                $class_name::register_type();
            }
        }
    }
}
