<?php

namespace NBH\Includes\Blocks;

use NBH\Includes\Traits\NotificationTrait;

/**
 * Gift Message Conditional Block for FluentCRM
 */
class GiftMessageConditionalBlock
{
    use NotificationTrait;

    private const BLOCK_NAME = 'nbh/gift-message-conditional';
    private static $subscriber_context = null;

    /**
     * Register the block
     */
    public function register(): void
    {
        add_action('wp_loaded', [$this, 'register_block_assets'], 5);
        add_action('wp_loaded', [$this, 'register_block_type'], 10);
        add_filter('fluent_crm/allowed_block_types', [$this, 'add_to_allowed_blocks']);
        add_filter('fluent_crm/parse_campaign_email_text', [$this, 'set_subscriber_context'], 5, 2);
    }

    /**
     * Register block assets
     */
    public function register_block_assets(): void
    {
        wp_register_script(
            'nbh-gift-message-conditional-block',
            get_template_directory_uri() . '/dist/js/gift-message-conditional-block.js',
            [
                'wp-blocks',
                'wp-element',
                'wp-block-editor',
                'wp-components',
                'wp-i18n'
            ],
            wp_get_theme()->get('Version'),
            true
        );
        
        // Enqueue script and styles immediately for FluentCRM context
        if (is_admin() && isset($_GET['page']) && $_GET['page'] === 'fluentcrm-admin') {
            wp_enqueue_script('nbh-gift-message-conditional-block');
            wp_enqueue_style('nbh-gift-message-conditional-block-editor');
        }

        // Register block editor styles
        wp_register_style(
            'nbh-gift-message-conditional-block-editor',
            get_template_directory_uri() . '/dist/css/gift-message-conditional-block-editor.css',
            ['wp-edit-blocks'],
            wp_get_theme()->get('Version')
        );

        // Register block frontend styles
        wp_register_style(
            'nbh-gift-message-conditional-block',
            get_template_directory_uri() . '/dist/css/gift-message-conditional-block-style.css',
            [],
            wp_get_theme()->get('Version')
        );
    }

    /**
     * Register the block type
     */
    public function register_block_type(): void
    {
        if (!function_exists('register_block_type')) {
            return;
        }

        // Enqueue editor styles for FluentCRM
        if (is_admin()) {
            wp_enqueue_style('nbh-gift-message-conditional-block-editor');
        }

        register_block_type(self::BLOCK_NAME, [
            'editor_script' => 'nbh-gift-message-conditional-block',
            'editor_style'  => 'nbh-gift-message-conditional-block-editor',
            'style'         => 'nbh-gift-message-conditional-block',
            'render_callback' => [$this, 'render_block'],
            'supports' => [
                'html' => false,
            ],
        ]);
    }

    /**
     * Add block to FluentCRM allowed blocks
     */
    public function add_to_allowed_blocks(array $blocks): array
    {
        $blocks[] = self::BLOCK_NAME;
        return $blocks;
    }

    /**
     * Set subscriber context for email parsing
     */
    public function set_subscriber_context($content, $subscriber)
    {
        self::$subscriber_context = $subscriber;
        return $content;
    }

    /**
     * Render the block
     */
    public function render_block(array $attributes, string $content): string
    {
        // If no content, return empty
        if (empty($content)) {
            return '';
        }

        $subscriber = $this->get_subscriber_from_context();
        
        if (!$subscriber) {
            return $content;
        }

        $order = $this->get_latest_order_for_subscriber($subscriber);
        
        if (!$order) {
            return $content;
        }

        $gift_message = $order->get_meta('_gift_message');
        $has_message = !empty($gift_message);

        // Show content only when message exists
        if ($has_message) {
            return $content;
        }

        // Don't show content when message is empty
        return '';
    }

    /**
     * Get subscriber from various contexts
     */
    private function get_subscriber_from_context()
    {
        // Priority 1: Global subscriber context set by email parsing
        if (self::$subscriber_context) {
            return self::$subscriber_context;
        }

        // Priority 2: FluentCRM BlockParserHelper context
        if (class_exists('\FluentCrm\App\Services\BlockParserHelper')) {
            $helper = new \FluentCrm\App\Services\BlockParserHelper();
            if (method_exists($helper, 'getSubscriber')) {
                $subscriber = $helper->getSubscriber();
                if ($subscriber) {
                    return $subscriber;
                }
            }
        }

        // Priority 3: Current FluentCRM contact
        if (function_exists('fluentcrm_get_current_contact')) {
            return fluentcrm_get_current_contact();
        }

        return null;
    }

    /**
     * Get latest order for subscriber
     */
    private function get_latest_order_for_subscriber($subscriber)
    {
        if (!$subscriber || !$subscriber->email) {
            return null;
        }

        $orders = wc_get_orders([
            'billing_email' => $subscriber->email,
            'limit' => 1,
            'orderby' => 'date',
            'order' => 'DESC',
            'status' => ['completed', 'processing']
        ]);

        return !empty($orders) ? $orders[0] : null;
    }
}
