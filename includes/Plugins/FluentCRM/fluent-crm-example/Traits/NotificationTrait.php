<?php

namespace NBH\Includes\Traits;

/**
 * Trait for handling notifications and error logging.
 */
trait NotificationTrait
{
    /**
     * Display admin notice with specified message and status.
     *
     * @param string $message Message to display
     * @param string $status Notice status (error|warning|success|info)
     * @return void
     */
    protected function add_notice(string $message, string $status = 'warning'): void
    {
        \add_action('admin_notices', function () use ($status, $message) {
            echo sprintf(
                '<div class="notice notice-%s is-dismissible"><p>%s</p></div>',
                \esc_attr($status),
                \esc_html($message)
            );
        });
    }

    /**
     * Log error message with optional context.
     *
     * @param string $message Error message to log
     * @param array $context Additional context data
     * @return void
     */
    protected function log_error(string $message, array $context = []): void
    {
        $log_message = sprintf('[ERROR] %s', $message);
        
        if (!empty($context)) {
            $log_message .= ' Context: ' . json_encode($context);
        }
        
     }

    /**
     * Handle error with notification and logging.
     *
     * @param string $message Error message
     * @param array $context Additional context data
     * @param bool $show_admin_notice Whether to show admin notice
     * @return void
     */
    protected function handle_error(string $message, array $context = []): void
    {
        $this->log_error($message, $context);
        
        if (defined('NBH_IS_DEV') && NBH_IS_DEV && \is_admin()) {
            $this->add_notice($message, 'error');
        }
    }

    /**
     * Handle WP_Error with notification and logging.
     *
     * @param \WP_Error $wp_error WordPress error object
     * @param string $prefix Error message prefix
     * @param array $context Additional context data
     * @return void
     */
    protected function handle_wp_error(\WP_Error $wp_error, string $prefix = '', array $context = []): void
    {
        $message = $prefix ? sprintf('%s: %s', $prefix, $wp_error->get_error_message()) : $wp_error->get_error_message();
        $this->handle_error($message, $context);
    }
} 