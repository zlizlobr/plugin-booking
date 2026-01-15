<?php

namespace NBH\Includes\Blocks;

use NBH\Includes\Traits\NotificationTrait;

/**
 * Hospital Image Gutenberg Block for FluentCRM emails.
 */
class HospitalImageBlock
{
    use NotificationTrait;

    /**
     * Block name/slug
     */
    const BLOCK_NAME = 'nbh/hospital-image';

    /**
     * Register the hospital image block.
     *
     * @return void
     */
    public function register(): void
    {
        // Register block script and type immediately
        add_action('wp_loaded', [$this, 'register_block_assets'], 5);
        add_action('wp_loaded', [$this, 'register_block_type'], 10);
        
        // Add to FluentCRM allowed blocks
        add_filter('fluent_crm/allowed_block_types', [$this, 'add_to_allowed_blocks']);
        
        // Hook into FluentCRM email parsing to set subscriber context
        add_filter('fluent_crm/parse_campaign_email_text', [$this, 'set_subscriber_context'], 5, 2);
    }

    /**
     * Register block assets (JS/CSS).
     *
     * @return void
     */
    public function register_block_assets(): void
    {
        // Register block editor script
        wp_register_script(
            'nbh-hospital-image-block',
            get_template_directory_uri() . '/dist/js/hospital-image-block.js',
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
        
        // Enqueue script immediately for FluentCRM context
        if (is_admin() && isset($_GET['page']) && $_GET['page'] === 'fluentcrm-admin') {
            wp_enqueue_script('nbh-hospital-image-block');
        }

        // Register block editor styles
        wp_register_style(
            'nbh-hospital-image-block-editor',
            get_template_directory_uri() . '/dist/css/hospital-image-block-editor.css',
            ['wp-edit-blocks'],
            wp_get_theme()->get('Version')
        );

        // Register block frontend styles
        wp_register_style(
            'nbh-hospital-image-block',
            get_template_directory_uri() . '/dist/css/hospital-image-block-style.css',
            [],
            wp_get_theme()->get('Version')
        );
    }

    /**
     * Register the block type.
     *
     * @return void
     */
    public function register_block_type(): void
    {
        if (!function_exists('register_block_type')) {
            return;
        }

        register_block_type(self::BLOCK_NAME, [
            'editor_script' => 'nbh-hospital-image-block',
            'editor_style'  => 'nbh-hospital-image-block-editor',
            'style'         => 'nbh-hospital-image-block',
            'attributes'    => [
                'width' => [
                    'type'    => 'string',
                    'default' => '100%'
                ],
                'aspectRatio' => [
                    'type'    => 'string',
                    'default' => '1'
                ],
                'alignment' => [
                    'type'    => 'string',
                    'default' => 'center'
                ]
            ],
            'render_callback' => [$this, 'render_block']
        ]);
    }

    /**
     * Render the hospital image block.
     * This method will automatically detect the hospital_id from FluentCRM context.
     *
     * @param array $attributes Block attributes
     * @return string Block HTML
     */
    public function render_block(array $attributes): string
    {
        $width = $attributes['width'] ?? '100%';
        $aspect_ratio = $attributes['aspectRatio'] ?? '1';
        $alignment = $attributes['alignment'] ?? 'center';

        // Try to get hospital_id from FluentCRM context
        $hospital_id = $this->get_hospital_id_from_context();

        if (!$hospital_id) {
            // Return placeholder for editor preview
            return sprintf(
                '<div style="width: 100%%; max-width: 100%%; height: 300px; max-height: 300px; background-color: #f0f6fc; border: 2px dashed #0073aa; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #0073aa; font-size: 16px; font-weight: 500; text-align: %s; box-sizing: border-box; margin: 2em auto;">%s</div>',
                esc_attr($alignment),
                __('Zde se zobrazí obrázek nemocnice', 'nbh')
            );
        }

        // Get hospital image using the same logic as SmartCode
        $hospital_zadani_id = get_field('hospital_zadani', $hospital_id);
        
        if (!$hospital_zadani_id || !is_numeric($hospital_zadani_id)) {
            return '<p style="text-align: center; color: #999;">' . 
                   __('Hospital image not available.', 'nbh') . '</p>';
        }

        $map_image_id = get_field('map_image', $hospital_zadani_id);
        
        if (!$map_image_id || !is_numeric($map_image_id)) {
            return '<p style="text-align: center; color: #999;">' . 
                   __('Hospital image not available.', 'nbh') . '</p>';
        }

        $image_url = wp_get_attachment_image_url($map_image_id, 'full');
        
        if (!$image_url) {
            return '<p style="text-align: center; color: #999;">' . 
                   __('Hospital image not available.', 'nbh') . '</p>';
        }

        $hospital_name = get_the_title($hospital_id);
        $alt_text = esc_attr($hospital_name);

        // Generate block HTML with background image
        $align_class = $alignment ? 'align' . $alignment : '';
        
        return sprintf(
            '<div style="width: 100%%; max-width: 100%%; height: 300px; max-height: 300px; text-align: %s; display: block; margin: 2em auto; box-sizing: border-box; overflow: hidden;">
                <img src="%s" alt="%s" style="width: 100%%; height: 100%%; object-fit: cover; object-position: center center; display: block; border: 0; outline: none;" />
            </div>',
            esc_attr($alignment),
            esc_url($image_url),
            $alt_text
        );
    }

    /**
     * Get hospital_id from FluentCRM context.
     * This uses the same logic as HospitalSmartCode.
     *
     * @return int|null Hospital ID or null if not found
     */
    private function get_hospital_id_from_context(): ?int
    {
        // FIRST: Try to get from our custom global (set by set_subscriber_context)
        global $fluentcrm_current_subscriber;
        if ($fluentcrm_current_subscriber) {
            return $this->get_hospital_id_from_subscriber($fluentcrm_current_subscriber);
        }

        // SECOND: Try to get from BlockParserHelper (FluentCRM's official way)
        if (class_exists('\FluentCrm\App\Services\BlockParserHelper')) {
            $subscriber = \FluentCrm\App\Services\BlockParserHelper::getSubscriber();
            if ($subscriber) {
                return $this->get_hospital_id_from_subscriber($subscriber);
            }
        }

        // LAST: Try FluentCRM global context (fallback)
        if (function_exists('fluentcrm_get_current_contact')) {
            $subscriber = fluentcrm_get_current_contact();
            if ($subscriber) {
                return $this->get_hospital_id_from_subscriber($subscriber);
            }
        }

        return null;
    }

    /**
     * Get hospital_id from subscriber object.
     * Uses the same logic as HospitalSmartCode.
     *
     * @param object $subscriber FluentCRM subscriber
     * @return int|null Hospital ID or null if not found
     */
    private function get_hospital_id_from_subscriber($subscriber): ?int
    {
        if (!$subscriber) {
            return null;
        }

        // Use the same logic as HospitalSmartCode - get from funnel source_ref_id
        $hospital_id = null;
        
        if (class_exists('\FluentCrm\App\Models\FunnelSubscriber')) {
            $funnelSub = \FluentCrm\App\Models\FunnelSubscriber::where('subscriber_id', $subscriber->id)
                ->whereNotNull('source_ref_id')
                ->orderBy('created_at', 'DESC')
                ->first();
            if ($funnelSub) {
                $hospital_id = $funnelSub->source_ref_id ?? null;
            } else {
                return null;
            }
        }

        if (!is_numeric($hospital_id)) {
            return null;
        }
        
        $post = get_post($hospital_id);
        if (!$post) {
            return null;
        }

        // Check if source_ref_id is an order - if yes, get hospital_id from order products
        if ($post->post_type === 'shop_order' || strpos($post->post_type, 'shop_order') !== false) {
            $order = wc_get_order($hospital_id);
            if (!$order) {
                return null;
            }
            
            // Get hospital_id from first product in order
            foreach ($order->get_items() as $item) {
                $product_id = $item->get_product_id();
                $item_hospital_id = wc_get_order_item_meta($item->get_id(), 'hospital_id', true);
                
                if ($item_hospital_id && is_numeric($item_hospital_id)) {
                    // Verify it's a hospital post
                    $hospital_post = get_post($item_hospital_id);
                    if ($hospital_post && $hospital_post->post_type === 'hospital') {
                        return (int) $item_hospital_id;
                    }
                }
            }
            
            return null;
        }
        
        // If it's already a hospital post, return it
        if ($post->post_type === 'hospital') {
            return (int) $hospital_id;
        }
        
        return null;
    }

    /**
     * Add hospital image block to FluentCRM allowed blocks.
     *
     * @param array $allowed_blocks Current allowed blocks
     * @return array Modified allowed blocks
     */
    public function add_to_allowed_blocks(array $allowed_blocks): array
    {
        $allowed_blocks[] = self::BLOCK_NAME;
        return $allowed_blocks;
    }

    /**
     * Set subscriber context for email parsing.
     * This ensures our block has access to the current subscriber during email rendering.
     *
     * @param string $content Email content
     * @param object $subscriber FluentCRM subscriber
     * @return string Unchanged content
     */
    public function set_subscriber_context($content, $subscriber)
    {
        // Set global subscriber context for our block
        global $fluentcrm_current_subscriber;
        $fluentcrm_current_subscriber = $subscriber;
        
        return $content;
    }
}
