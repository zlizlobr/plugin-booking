<?php

namespace Wpcbooking\Traits;

use Wpcbooking\Controllers\BookingController;

/**
 * Trait for managing BookingController instance and quote ID.
 * Provides static methods for controller and quote management.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
trait ManagesBookingControllerTrait
{
    private static ?BookingController $booking_controller = null;
    private static ?int $current_booking_id = null;
    private static ?int $current_quote_id = null;

    /**
     * Set current quote ID.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $quote_id Quote post ID
     * @return void
     */
    public static function set_quote_id(int $quote_id): void
    {
        self::$current_quote_id = $quote_id;
    }

    /**
     * Get current quote ID.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return int|null Quote post ID or null
     */
    public static function get_quote_id(): ?int
    {
        return self::$current_quote_id;
    }

    /**
     * Set booking controller instance.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param BookingController $controller Booking controller instance
     * @param int $booking_id Booking post ID
     * @return void
     */
    protected static function set_booking_controller(BookingController $controller, int $booking_id): void
    {
        self::$booking_controller = $controller;
        self::$current_booking_id = $booking_id;
    }

    /**
     * Get current booking controller instance.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return BookingController|null Booking controller instance or null
     */
    protected static function get_booking_controller(): ?BookingController
    {
        return self::$booking_controller;
    }

    /**
     * Initialize or get booking controller for booking ID.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $booking_id Booking post ID
     * @return BookingController Booking controller instance
     */
    protected static function init_booking_controller(int $booking_id): BookingController
    {
        if (self::$booking_controller === null || self::$current_booking_id !== $booking_id) {
            self::$booking_controller = BookingController::get_instance($booking_id);
            self::$current_booking_id = $booking_id;
        }
        return self::$booking_controller;
    }

    /**
     * Get block by field ID from current booking controller.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $field_id Block field ID
     * @return array|null Block array or null if not found
     */
    protected static function get_block($field_id): array|null
    {
        return self::$booking_controller === null ? null : self::$booking_controller->get_block($field_id);
    }
    /**
     * Get block default value by field ID.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $field_id Block field ID
     * @return mixed Block default value or null
     */
    protected static function get_block_value($field_id): mixed
    {
        $block = self::$booking_controller === null ? null : self::$booking_controller->get_block($field_id);
        return $block['general']['default'] ?? null;
    }
}
