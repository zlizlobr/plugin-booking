<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;
use Wpcbooking\CPT\Booking;
use Wpcbooking\Controllers\BookingController;
// todo: oddělit Booking a block podle jiné dědičnosti
class BookingForm extends AbstractBlock
{
    protected static $BLOCK_NAME = 'booking-form';
    protected static $BLOCK_ICON = 'email-alt';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Booking Form', 'wpcbooking');
        $this->block_description = __('Display a booking form with date picker input field with calendar options', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'email-alt';
        $this->block_keywords = ['booking', 'form', 'booking-form'];
    }

    protected function init_hooks(): void
    {
        parent::init_hooks();
        add_shortcode('wpcbooking_form', [$this, 'render_shortcode']);
    }

    protected function get_block_tabs(): array
    {
        return [
            'documentation' => __('Documentation', 'wpcbooking'),
        ];
    }
    protected function get_block_attribute_items(): array
    {
        return [
            [
                'type'        => 'post',
                'id'          => 'booking_id',
                'label'       => __('Booking ', 'wpcbooking'),
                'description' => __('Select booking', 'wpcbooking'),
                'post_type'   => Booking::SLUG,
                'position' => 'inspector',
            ],
            [
                'type'        => 'toggle',
                'id'          => 'open_in_new_window',
                'label'       => __('Open form in new window', 'wpcbooking'),
                'description' => __('When enabled, form will save data and open the target URL in a new window instead of advancing to the next step. Only step 1 will be displayed.', 'wpcbooking'),
                'default'     => false,
                'position'    => 'inspector',
            ],
            [
                'type' => 'html',
                'id' => 'documentation_content',
                'content' => $this->get_block_documentation(),
                'tab' => 'documentation',
            ]
        ];
    }



    private static function is_editor_context(): bool
    {
        // Kontrola REST API requestu (Gutenberg používá REST API pro renderování bloků)
        if (defined('REST_REQUEST') && REST_REQUEST) {
            $request_uri = $_SERVER['REQUEST_URI'] ?? '';
            $referer = $_SERVER['HTTP_REFERER'] ?? '';

            // Kontrola zda referer obsahuje post.php nebo post-new.php (Gutenberg editor)
            if (!empty($referer)) {
                if (strpos($referer, 'post.php') !== false || strpos($referer, 'post-new.php') !== false) {
                    return true;
                }
            }

            // Custom wpify endpoint pro renderování bloků
            if (strpos($request_uri, '/render-block/') !== false) {
                return true;
            }

            // Standardní Gutenberg endpoint /wp/v2/block-renderer/
            if (strpos($request_uri, '/wp/v2/block-renderer/') !== false) {
                return true;
            }
        }

        return false;
    }

    public static function prepare_block(array $attributes): array
    {
        // Přidej is_editor flag
        $attributes['is_editor'] = self::is_editor_context();

        // Přidej block_icon pro template
        $attributes['block_icon'] = static::$BLOCK_ICON;

        if (!isset($attributes['booking_id'])) {
            return $attributes;
        }

        $attributes['hash'] = get_quote_hash($attributes['booking_id']);


        
        $booking_controller = BookingController::get_instance($attributes['booking_id']);
        $attributes['general'] = $booking_controller->get_booking_options_design();
        $booking_url = get_booking_url($attributes['booking_id']);
        $attributes['general']['page_url_booking'] = $booking_url;
        $attributes['general']['steps'] = $booking_controller->get_booking_steps();
        $attributes['general']['sections'] = $booking_controller->get_booking_sections();
        $attributes['general']['background_image'] = wp_get_attachment_url($attributes['general']['background_image']);

        $attributes['open_in_new_window'] = !empty($attributes['open_in_new_window']);
        $attributes['target_url'] = $booking_url;
        $attributes['booking'] = ['options_summary' => $booking_controller->get_booking_options_summary()];
        return $attributes;
    }
    public function update_block(int $quote_id, array $post_data = [], array $block = []): void
    {
        
    }

    public function render_shortcode($atts)
    {
        $attributes = shortcode_atts([
            'booking_id' => 0,
            'open_in_new_window' => false,
        ], $atts);
         $attributes['booking_id'] = absint($attributes['booking_id']);
        $attributes['open_in_new_window'] = filter_var($attributes['open_in_new_window'], FILTER_VALIDATE_BOOLEAN);

        if (empty($attributes['booking_id']) || get_post_type($attributes['booking_id']) !== Booking::SLUG) {
            return '';
        }

        $prepared_attributes = self::prepare_block($attributes);

        ob_start();
        extract($prepared_attributes);
        include plugin_dir_path(__FILE__) . '../Views/Blocks/Public/booking-form.php';
        return ob_get_clean();
    }
}
