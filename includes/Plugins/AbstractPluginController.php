<?php

namespace Wpcbooking\Plugins;

use Wpcbooking\Traits\NotificationTrait;

abstract class AbstractPluginController
{
    use NotificationTrait;
    protected $is_plugin_active;

    public function __construct()
    {
        $this->is_plugin_active = $this->check_plugin_active();

        if (!$this->is_plugin_active) {
            $this->add_notice($this->get_notification_message(), 'error');
            return;
        }

        $this->init_hooks();
    }

    abstract protected function check_plugin_active();

    abstract protected function get_notification_message();

    abstract protected function init_hooks();

    public function is_plugin_active()
    {
        return $this->is_plugin_active;
    }
}
