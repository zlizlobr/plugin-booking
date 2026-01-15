<?php

namespace Wpcbooking\Traits;

/**
 * Trait providing WooCommerce currency integration.
 * Handles currency selection and formatting for bookings.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
trait WooCommerceTrait
{
    /**
     * Get available currencies for booking.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int $booking_id Booking post ID
     * @return array Array of currency codes
     */
    function booking_available_currencies(int $booking_id): array
    {
        return get_booking_options_woocommerce($booking_id)['woo_currency'] ?? $this->default_currencies();
    }

    /**
     * Get default currencies from WooCommerce or fallback to DKK.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Array of currency codes
     */
    protected function default_currencies(): array
    {
        return !function_exists('get_woocommerce_currencies') ? ['DKK'] : get_woocommerce_currencies();
    }

    /**
     * Get WooCommerce currencies with formatted display names.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Array of formatted currency options
     */
    protected function get_woo_currencies(): array
    {
        $currencies = [];
        $currency_code_options = $this->default_currencies();
        $currencies = $this->render_woo_currency($currency_code_options);
        return $currencies;
    }

    /**
     * Get booking currency options.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param int|null $booking_id Booking post ID (currently unused)
     * @return array Array of formatted currency options
     */
    protected function get_booking_currency( $booking_id = null): array
    {
        // Todo: špatně se  ber booking id complikovaní kde se spouští hooks
       //if(!isset($booking_id) || empty($booking_id)) {
         return $this->get_woo_currencies();
       //}
        $currencies = [];
        $currency_code_options = $this->booking_available_currencies($booking_id);
        $currencies = $this->render_woo_currency($currency_code_options);
        return $currencies;
    }

    /**
     * Render currency options with name, symbol, and code.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $currencies Array of currency codes as keys
     * @return array Array of formatted currency strings
     */
    protected function render_woo_currency(array $currencies): array{
        $currencies_render = [];
        foreach ($currencies as $code => $name) {
            $symbol = !function_exists('get_woocommerce_currency_symbol') ? $code : get_woocommerce_currency_symbol($code);
            $currencies_render[$code] = sprintf(
                '%s (%s) — %s',
                $name,
                $symbol,
                esc_html($code)
            );
        }
        return $currencies_render;
    }
}
