<?php
/**
 * NotificationTrait - Provides notification and logging functionality for WP Booking plugin.
 *
 * @class NotificationTrait
 * @version 1.0.0
 * @package Wpcbooking\Traits
 */
namespace Wpcbooking\Traits;

/**
 * Trait providing notification and logging capabilities for admin notices and error handling.
 *
 * @version 1.0.0
 * @package Wpcbooking\Traits
 */
trait NotificationTrait
{
    /**
     * Adds a dismissible admin notice with specified message and status.
     *
     * @since 1.0.0
     * @param string $message The notice message to display.
     * @param string $status The notice status (warning, error, success, info).
     * @return void
     */
    protected function add_notice(string $message, string $status = 'warning'): void
    {
        $notice_id = md5($message . $status);
        \add_action('admin_notices', function () use ($status, $message, $notice_id) {
            echo sprintf(
                '<div class="notice notice-%s is-dismissible wpcbooking-dismissible" data-notice-id="%s"><p>%s</p></div>',
                \esc_attr($status),
                esc_attr($notice_id),
                \esc_html($message)
            );
        });
        \add_action('admin_footer', function () {
            ?>
            <script type="text/javascript">
            (function($){
                $(document).on('click', '.wpcbooking-dismissible .notice-dismiss', function(){
                    var $notice = $(this).closest('.wpcbooking-dismissible');
                    var noticeId = $notice.data('notice-id');
                    if(noticeId) {
                        $.post(ajaxurl, {
                            action: 'wpcbooking_dismiss_notice',
                            notice_id: noticeId
                        });
                    }
                });
            })(jQuery);
            </script>
            <?php
        });
    }

    /**
     * Saves a log message to WordPress transient storage for later display.
     *
     * @since 1.0.0
     * @param string $message The log message to store.
     * @param string $status The log status (error, warning, info).
     * @return void
     */
    protected function save_log_to_transient(string $message, string $status = 'error'): void
    {
        $transient_key = 'wpcbooking_logs';
        $logs = get_transient($transient_key);
        if (!is_array($logs)) {
            $logs = [];
        }
        $logs[] = [
            'message' => $message,
            'status' => $status,
            'timestamp' => time(),
        ];
        set_transient($transient_key, $logs, 12 * HOUR_IN_SECONDS);
    }

    /**
     * Displays stored logs as admin notices and clears the transient.
     *
     * @since 1.0.0
     * @return void
     */
    protected function show_logs_as_admin_notices(): void
    {
        if (!current_user_can('administrator')) {
            return;
        }
        $transient_key = 'wpcbooking_logs';
        $logs = get_transient($transient_key);
        if (is_array($logs) && !empty($logs)) {
            foreach ($logs as $log) {
                $this->add_notice($log['message'], $log['status']);
            }
            delete_transient($transient_key);
        }
    }

    /**
     * Logs an error message to both error log and transient storage.
     *
     * @since 1.0.0
     * @param string $message The error message to log.
     * @param array $context Additional context data for the error.
     * @return void
     */
    protected function log_error(string $message, array $context = []): void
    {
        $log_message = sprintf('[ERROR] %s', $message);
        
        if (!empty($context)) {
            $log_message .= ' Context: ' . json_encode($context);
        }
        
        error_log($log_message);
        $this->save_log_to_transient($log_message, 'error');
    }

    /**
     * Handles errors by logging them and optionally displaying admin notices in development mode.
     *
     * @since 1.0.0
     * @param string $message The error message to handle.
     * @param array $context Additional context data for the error.
     * @return void
     */
    protected function handle_error(string $message, array $context = []): void
    {
        $this->log_error($message, $context);
        
        if (defined('WPCBOOKING_DEV') && WPCBOOKING_DEV && \is_admin()) {
            $this->add_notice($message, 'error');
        }
    }

    /**
     * Handles WordPress errors by extracting the error message and logging it.
     *
     * @since 1.0.0
     * @param \WP_Error $wp_error The WordPress error object to handle.
     * @param string $prefix Optional prefix to add to the error message.
     * @param array $context Additional context data for the error.
     * @return void
     */
    protected function handle_wp_error(\WP_Error $wp_error, string $prefix = '', array $context = []): void
    {
        $message = $prefix ? sprintf('%s: %s', $prefix, $wp_error->get_error_message()) : $wp_error->get_error_message();
        $this->handle_error($message, $context);
    }

    /**
     * Registers the admin notices hook to display stored logs.
     *
     * @since 1.0.0
     * @return void
     */
    public function maybe_show_admin_logs(): void
    {
        \add_action('admin_notices', function () {
            $this->show_logs_as_admin_notices();
        });
    }

    /**
     * Registers the AJAX handler for dismissing admin notices.
     *
     * @since 1.0.0
     * @return void
     */
    public static function register_ajax_dismiss_notice(): void
    {
        \add_action('wp_ajax_wpcbooking_dismiss_notice', [static::class, 'ajax_dismiss_notice']);
    }

    /**
     * AJAX handler that removes a specific notice from the transient storage.
     *
     * @since 1.0.0
     * @return void
     */
    public static function ajax_dismiss_notice(): void
    {
        if (!current_user_can('administrator')) {
            wp_send_json_error('Unauthorized', 403);
        }
        $notice_id = isset($_POST['notice_id']) ? sanitize_text_field($_POST['notice_id']) : '';
        if (!$notice_id) {
            wp_send_json_error('Missing notice_id', 400);
        }
        $transient_key = 'wpcbooking_logs';
        $logs = get_transient($transient_key);
        if (is_array($logs)) {
            $logs = array_filter($logs, function($log) use ($notice_id) {
                $log_id = md5($log['message'] . $log['status']);
                return $log_id !== $notice_id;
            });
            set_transient($transient_key, $logs, 12 * HOUR_IN_SECONDS);
        }
        wp_send_json_success();
    }
} 