<?php

namespace Wpcbooking\Traits;

use Wpcbooking\CPT\Quote;
use Wpcbooking\CPT\Booking;
use Wpcbooking\Traits\ManagesBookingControllerTrait;

/**
 * Trait providing common booking helper methods for retrieving booking ID and dynamic field options.
 *
 * @version 1.0.0
 * @package Wpcbooking\Traits
 */
trait BookingHelperTrait
{
    use ManagesBookingControllerTrait;
    /**
     * Get dynamic booking fields options from post content (fallback for initial load)
     * JS will update options dynamically from Gutenberg editor
     *
     * @since 1.0.0
     * @param int|null $post_id Post ID
     * @param string $block_name Block name to extract fields from
     * @return array Array of options in format ['value' => 'label']
     */
    protected function get_dynamic_booking_fields_options(?int $post_id, string|array|null $block_name = 'booking/number-input'): array
    {
        // Default option
        $options = [
            'none' => __('None', 'wpcbooking'),
        ];
        if (!$post_id || get_post_type($post_id) !== Booking::SLUG) {
            return $options;
        }

        // Extract fields from post content as fallback
        // JS will update options dynamically when blocks are added/changed
        $stored_fields = extract_block_fields_from_booking($post_id, $block_name);
        error_log('🔍 [get_dynamic_booking_fields_options] stored_fields: ' . print_r($stored_fields, true));
        if (!is_array($stored_fields) || empty($stored_fields)) {
            return $options;
        }

        // Convert stored fields to options format
        foreach ($stored_fields as $field) {
            if (!isset($field['field_id']) || !isset($field['label'])) {
                continue;
            }

            $field_id = sanitize_text_field($field['field_id']);
            $label = sanitize_text_field($field['label']);

            if (empty($field_id) || empty($label)) {
                continue;
            }

            $options[$field_id] = $label;
        }

        return $options;
    }

    private static function resolve_booking_id_from_post_id(?int $post_id): ?int
    {
        if (!$post_id) {
            return null;
        }

        if (get_post_type($post_id) === Quote::SLUG) {
            $booking_id = get_post_meta($post_id, '_booking_id', true);
            if ($booking_id && get_post_type($booking_id) === Booking::SLUG) {
                return $booking_id;
            }
        } elseif (get_post_type($post_id) === Booking::SLUG) {
            return $post_id;
        }

        return null;
    }

    /**
     * Get booking ID from various WordPress contexts.
     *
     * @since 1.0.0
     * @return int|null Booking post ID or null if not found
     */
    protected static function get_booking_id(int|null $quote_id = null): int|null
    {
        if ($quote_id) {
            $resolved_id = self::resolve_booking_id_from_post_id($quote_id);
            if ($resolved_id) {
                return $resolved_id;
            }
        }
        // 1. Z WordPress smyčky
        $post_id = get_the_ID();
        if ($post_id && is_int($post_id) && $post_id > 0) {
            $resolved_id = self::resolve_booking_id_from_post_id($post_id);
            if ($resolved_id) {
                return $resolved_id;
            }
        }

        // 2. Z GET parametru (při načtení editoru)
        if (isset($_GET['post'])) {
            $raw_value = $_GET['post'];
            $post_id = absint(wp_unslash($raw_value));
            if ($post_id > 0) {
                return $post_id;
            }
        }

        // 3. Z POST parametru (při ukládání)
        if (isset($_POST['post_ID'])) {
            $raw_value = $_POST['post_ID'];
            $post_id = absint(wp_unslash($raw_value));
            if ($post_id > 0) {
                return $post_id;
            }
        }

        // 4. Z REQUEST (kombinace GET a POST)
        if (isset($_REQUEST['post'])) {
            $raw_value = $_REQUEST['post'];
            $post_id = absint(wp_unslash($raw_value));
            if ($post_id > 0) {
                return $post_id;
            }
        }

        // 5. Z globálního $post objektu
        global $post;
        if (isset($post)) {
            if (isset($post->ID) && is_int($post->ID) && $post->ID > 0) {
                return $post->ID;
            }
        }

        // 6. Z get_queried_object_id()
        /**$post_id = get_queried_object_id();
        if ($post_id && is_int($post_id) && $post_id > 0) {
            return $post_id;
        }**/

        // 7. Z WordPress admin screen API (pokud je dostupné)
        if (function_exists('get_current_screen')) {
            $screen = get_current_screen();
            if ($screen) {
                if (isset($screen->post) && isset($screen->post->ID)) {
                    $post_id = absint($screen->post->ID);
                    if ($post_id > 0) {
                        return $post_id;
                    }
                }
            }
        }

        return null;
    }


    protected static function get_current_quote_id(): ?int
    {
        $quote_id = null;
        $post_id = get_the_ID();
        if ($post_id && is_int($post_id) && $post_id > 0) {
            if (get_post_type($post_id) === Quote::SLUG) {
                $quote_id = $post_id;
            }
        }
        return $quote_id;
    }

    protected static function get_quote_currency(int $quote_id): ?string
    {
        $booking_id = self::get_booking_id($quote_id);
        return get_quote_currency($quote_id, $booking_id);
    }
}
