<?php

/**
 * Handles hospital data and operations for FluentCRM integration.
 *
 * @package NBH\Includes\Services
 * @author Radek Chaloupka
 * @version 1.0.0
 */

namespace NBH\Includes\Services;

use NBH\Includes\Traits\NotificationTrait;
use NBH\Includes\FluentCRMIntegration;

class HospitalAPI
{
    use NotificationTrait;

    private const VALID_STATUSES = [
        FluentCRMIntegration::STATUS_EMPTY,
        FluentCRMIntegration::STATUS_UNEQUIPPED,
        FluentCRMIntegration::STATUS_COMPLETED
    ];

    private const VALID_KARMA_LEVELS = [
        FluentCRMIntegration::KARMA_NOT_STARTED,
        FluentCRMIntegration::KARMA_STARTED,
    ];

    private int $hospital_id;
    private \WP_Post|null $hospital_post;
    private string $current_status;
    private string $current_karma;
    private array $purchased_items;
    private array $thema_options;

    /**
     * Hospital constructor.
     *
     * @param int $hospital_id The hospital post ID.
     */
    public function __construct(int $hospital_id)
    {
        $this->thema_options = get_fields("options");
        $this->hospital_id = $hospital_id;
        try {
            $this->load_hospital_data();
        } catch (\Throwable $th) {
            $this->handle_error($th->getMessage(), ['file' => $th->getFile(), 'line' => $th->getLine()]);
        }
    }

    /**
     * Get the hospital ID.
     *
     * @return int Hospital post ID.
     */
    public function get_hospital_id(): int
    {
        return $this->hospital_id;
    }

    /**
     * Get the hospital WP_Post object.
     *
     * @return \WP_Post|null Hospital post object or null.
     */
    public function get_hospital_post(): ?\WP_Post
    {
        return $this->hospital_post;
    }

    /**
     * Get the hospital name.
     *
     * @return string Hospital name.
     */
    public function get_hospital_name(): string
    {
        return $this->hospital_post ? $this->hospital_post->post_title : '';
    }

    /**
     * Get the hospital email address.
     *
     * @return string|null Hospital email or null.
     */
    public function get_hospital_email(): ?string
    {
        return get_field('hospital_email', $this->hospital_id);
    }

    /**
     * Set the hospital status.
     *
     * @param string $status New status value.
     * @return bool True on success.
     */
    public function set_status(string $status): bool
    {
        $this->validate_status($status);
        if ($this->current_status === $status) {
            return true;
        }
        $old_status = $this->current_status;
        $this->current_status = $status;
        update_field(FluentCRMIntegration::ACF_STATUS_NAME, $status, $this->hospital_id);
        do_action('nbh_hospital_status_changed', $this->hospital_id, $status, $old_status);
        return true;
    }

    /**
     * Get the current hospital status.
     *
     * @return string Current status.
     */
    public function get_status(): string
    {
        return $this->current_status;
    }

    /**
     * Set the hospital karma level.
     *
     * @param string $karma New karma value.
     * @return bool True on success.
     */
    public function set_karma(string $karma): bool
    {
        $this->validate_karma($karma);
        if ($this->current_karma === $karma) {
            return true;
        }
        $old_karma = $this->current_karma;
        $this->current_karma = $karma;
        update_field(FluentCRMIntegration::ACF_KARMA_NAME, $karma, $this->hospital_id);
        do_action('nbh_hospital_karma_changed', $this->hospital_id, $karma, $old_karma);
        return true;
    }

    /**
     * Get the current karma level.
     *
     * @return string Current karma.
     */
    public function get_karma(): string
    {
        return $this->current_karma;
    }

    /**
     * Evaluate hospital progression.
     *
     * @return array Progression data.
     */
    public function evaluate_progression(): array
    {
        $next_steps = $this->get_next_steps();
        return [
            'next_steps' => $next_steps,
            'is_completed' => $this->is_completed(),
        ];
    }

    /**
     * Check if the hospital is completed.
     *
     * @return bool True if completed.
     */
    public function is_completed(): bool
    {
        return $this->current_status === FluentCRMIntegration::STATUS_COMPLETED;
    }

    /**
     * Reset hospital to initial state.
     *
     * @return bool True on success.
     */
    public function reset_to_initial_state(): bool
    {
        $this->current_status = FluentCRMIntegration::STATUS_EMPTY;
        update_field(FluentCRMIntegration::ACF_STATUS_NAME, $this->current_status, $this->hospital_id);
        $this->current_karma = FluentCRMIntegration::KARMA_NOT_STARTED;
        update_field(FluentCRMIntegration::ACF_KARMA_NAME, $this->current_karma, $this->hospital_id);
        do_action('nbh_hospital_reset', $this->hospital_id);
        return true;
    }

    /**
     * Convert hospital data to array.
     *
     * @return array Hospital data as array.
     */
    public function to_array(): array
    {
        return [
            'id' => $this->hospital_id,
            'name' => $this->get_hospital_name(),
            'email' => $this->get_hospital_email(),
            'status' => $this->current_status,
            'status_display_name' => $this->get_status_display_name($this->current_status),
            'karma' => $this->current_karma,
            'karma_display_name' => $this->get_karma_display_name($this->current_karma),
            'is_completed' => $this->is_completed(),
            'progression' => $this->evaluate_progression(),
            'statistics' => $this->get_statistics(),
            'purchased_items' => $this->purchased_items,
        ];
    }

    /**
     * Get hospital statistics.
     *
     * @return array Statistics data.
     */
    public function get_statistics(): array
    {
        if (function_exists('adev_nbh_get_hospital_stats')) {
            $stats = adev_nbh_get_hospital_stats($this->hospital_id);
            return [
                'percentage' => $stats['percentage'] ?? 0,
                'karma_count' => $stats['karma_count'] ?? 0,
            ];
        }
        return [
            'percentage' => 0,
            'karma_count' => 0,
        ];
    }

    /**
     * Validate hospital status value.
     *
     * @param string $status Status to validate.
     * @return bool True if valid.
     */
    private function validate_status(string $status): bool
    {
        if (!in_array($status, self::VALID_STATUSES, true)) {
            throw new \InvalidArgumentException(sprintf('Neplatný hospital status: %s', $status));
        }
        return true;
    }

    /**
     * Validate karma value.
     *
     * @param string $karma Karma to validate.
     * @return bool True if valid.
     */
    private function validate_karma(string $karma): bool
    {
        if (!in_array($karma, self::VALID_KARMA_LEVELS, true)) {
            throw new \InvalidArgumentException(sprintf('Neplatný karma level: %s', $karma));
        }
        return true;
    }

    /**
     * Get display name for status.
     *
     * @param string $status Status value.
     * @return string Display name.
     */
    private function get_status_display_name(string $status): string
    {
        $status_names = [
            FluentCRMIntegration::STATUS_EMPTY => __('Prázdná nemocnice', 'nbh'),
            FluentCRMIntegration::STATUS_UNEQUIPPED => __('Nevybavená nemocnice', 'nbh'),
            FluentCRMIntegration::STATUS_COMPLETED => __('Dokončená nemocnice', 'nbh')
        ];
        return $status_names[$status] ?? $status;
    }

    /**
     * Get display name for karma.
     *
     * @param string $karma Karma value.
     * @return string Display name.
     */
    private function get_karma_display_name(string $karma): string
    {
        $karma_names = [
            FluentCRMIntegration::KARMA_NOT_STARTED => __('Karma nezapočala', 'nbh'),
            FluentCRMIntegration::KARMA_STARTED => __('Karma započala', 'nbh'),
        ];
        return $karma_names[$karma] ?? $karma;
    }

    /**
     * Load hospital data from database.
     *
     * @return void
     */
    private function load_hospital_data(): void
    {
        $this->hospital_post = get_post($this->hospital_id);
        if (!$this->hospital_post || $this->hospital_post->post_type !== 'hospital') {
            throw new \InvalidArgumentException(sprintf('Hospital s ID %d neexistuje nebo není platný.', $this->hospital_id));
        }
        $status = get_field(FluentCRMIntegration::ACF_STATUS_NAME, $this->hospital_id);
        $this->current_status = $status ?: FluentCRMIntegration::STATUS_EMPTY;
        $karma = get_field(FluentCRMIntegration::ACF_KARMA_NAME, $this->hospital_id);
        $this->current_karma = $karma ?: FluentCRMIntegration::KARMA_NOT_STARTED;
        $this->purchased_items = self::get_purchased_items_by_hospital_id($this->hospital_id);
    }

    /**
     * Get next steps for hospital progression.
     *
     * @return array Next steps.
     */
    private function get_next_steps(): array
    {
        $next_steps = [];
        if ($this->current_status === FluentCRMIntegration::STATUS_EMPTY) {
            $next_steps[] = __('Zakoupit první materiály pro nemocnici', 'nbh');
        } elseif ($this->current_status === FluentCRMIntegration::STATUS_UNEQUIPPED) {
            $next_steps[] = __('Dokončit vybavení nemocnice', 'nbh');
        }
        if ($this->current_karma === FluentCRMIntegration::KARMA_NOT_STARTED) {
            $next_steps[] = __('Zakoupit první karmu', 'nbh');
        } elseif ($this->current_karma === FluentCRMIntegration::KARMA_STARTED) {
            $next_steps[] = __('Posilovat karmu', 'nbh');
        }
        return $next_steps;
    }

    /**
     * Calculate karma points for an order.
     *
     * @param int $order_id WooCommerce order ID.
     * @param array|null $min_equipment Minimum equipment array.
     * @param int|null $price_per_karma Price per karma point.
     * @return int Karma points.
     */
    public function calculate_karma(int $order_id, ?array $min_equipment = null, ?int $price_per_karma = null): int
    {
        $required_equipment = $min_equipment ?? static::get_minimum_equipment();
        $price_per_karma = $price_per_karma ?? static::get_price_per_karma();
        $order_items = self::get_purchased_items_by_order_id($order_id, $this->get_hospital_id());
        $extra_value = 0;
        $product_in_hospital = array_combine(
            array_map('intval', array_column($this->purchased_items, 'product_id')),
            array_column($this->purchased_items, 'quantity')
        );

        foreach ($order_items as $order_item) {
            $product_id = $order_item['product_id'];
            $item_total = $order_item['total'];
            if (isset($required_equipment[$product_id])) {
                if (isset($product_in_hospital[$product_id]) && $product_in_hospital[$product_id] >= $required_equipment[$product_id]) {
                    $extra_value += $item_total;
                }
            } else {
                $extra_value += $item_total;
            }
        }
        $karma_points = (int) floor($extra_value / $price_per_karma);
        return $karma_points;
    }

    /**
     * Get minimum equipment requirements.
     *
     * @return array Minimum equipment array.
     */
    public function get_minimum_equipment(): array
    {
        if (function_exists('\adev_nbh_get_required_equipment_for_hospital')) {
            // Use theme helper that reads `hospital_zadani` → `mapped_places[].hospital_minimum`
            $map = \adev_nbh_get_required_equipment_for_hospital($this->hospital_id);
            return is_array($map) ? $map : [];
        }
        return [];
    }

    /**
     * Get price per karma point.
     *
     * @return int Price per karma.
     */
    protected function get_price_per_karma(): int
    {
        $price = (int) get_field('hospital_karma_point_price', 'option');
        return $price ?: 1500;
    }

    /**
     * Get WooCommerce orders by hospital ID.
     *
     * @param int $hospital_id Hospital post ID.
     * @param string $order_status Order status.
     * @return array Orders array.
     */
    public static function get_orders_by_hospital_id(int $hospital_id, string $order_status = 'completed'): array
    {
        $orders = [];
        $args = [
            'status' => ['wc-' . $order_status],
            'limit' => -1,
        ];
        $query = new \WC_Order_Query($args);
        $results = $query->get_orders();
        foreach ($results as $order) {
            foreach ($order->get_items() as $item) {
                $item_hospital_id = $item->get_meta('hospital_id', true);
                if ((int)$item_hospital_id === $hospital_id) {
                    $orders[] = $order;
                    break;
                }
            }
        }
        return $orders;
    }

    /**
     * Get purchased items by hospital ID.
     *
     * @param int $hospital_id Hospital post ID.
     * @param string $order_status Order status.
     * @return array Purchased items array.
     */
    public static function get_purchased_items_by_hospital_id(int $hospital_id, string $order_status = 'completed'): array
    {
        $items = [];
        $orders = self::get_orders_by_hospital_id($hospital_id, $order_status);
        foreach ($orders as $order) {
            foreach ($order->get_items() as $item) {
                $item_hospital_id = $item->get_meta('hospital_id', true);
                if ((int)$item_hospital_id === $hospital_id) {
                    $items[] = [
                        'order_id'     => $order->get_id(),
                        'order_date'   => $order->get_date_created() ? $order->get_date_created()->date('Y-m-d H:i') : null,
                        'item_id'      => $item->get_id(),
                        'product_id'   => $item->get_product_id(),
                        'product_name' => $item->get_name(),
                        'quantity'     => $item->get_quantity(),
                        'total'        => $item->get_total(),
                        'price'        => $item->get_total() / max(1, $item->get_quantity()),
                    ];
                }
            }
        }
        return $items;
    }

    /**
     * Get available WooCommerce products.
     *
     * @return array Products array.
     */
    public static function get_available_products(): array
    {
        $products = [];
        $args = [
            'status' => 'publish',
            'limit' => -1,
            'return' => 'objects',
        ];
        foreach (wc_get_products($args) as $product) {
            $products[] = [
                'product_id' => $product->get_id(),
                'product_name' => $product->get_name(),
            ];
        }
        return $products;
    }


    /**
     * Update hospital equipment status.
     *
     * @return string Updated status.
     */
    public function update_hospital_equipment_status(?int $percentage = null): string
    {
        if (empty($percentage)) {
            $status = FluentCRMIntegration::STATUS_EMPTY;
        } elseif ($percentage < 100) {
            $status = FluentCRMIntegration::STATUS_UNEQUIPPED;
        } else {
            $status = FluentCRMIntegration::STATUS_COMPLETED;
        }
        $this->set_status($status);
        return $status;
    }

    /**
     * Get purchased items by order ID.
     *
     * @param int $order_id WooCommerce order ID.
     * @param int $hospital_id Hospital post ID.
     * @return array Purchased items array.
     */
    public static function get_purchased_items_by_order_id(int $order_id, int $hospital_id): array
    {
        $items = [];
        $orders = self::get_orders_by_hospital_id($hospital_id);
        foreach ($orders as $order) {
            if ($order->get_id() !== $order_id) {
                continue;
            }
            foreach ($order->get_items() as $item) {
                $item_hospital_id = $item->get_meta('hospital_id', true);
                if ((int)$item_hospital_id === $hospital_id) {
                    $items[] = [
                        'order_id'     => $order->get_id(),
                        'order_date'   => $order->get_date_created() ? $order->get_date_created()->date('Y-m-d H:i') : null,
                        'item_id'      => $item->get_id(),
                        'product_id'   => $item->get_product_id(),
                        'product_name' => $item->get_name(),
                        'quantity'     => $item->get_quantity(),
                        'total'        => $item->get_total(),
                        'price'        => $item->get_total() / max(1, $item->get_quantity()),
                    ];
                }
            }
        }
        return $items;
    }

    /**
     * Get total karma points for the hospital.
     *
     * @return int Total karma points.
     */
    public function get_total_karma(): int
    {
        // Aggregate purchased quantities and values for this hospital
        $items = self::get_purchased_items_by_hospital_id($this->hospital_id);
        $totals_by_product = [];
        foreach ($items as $item) {
            $pid = (int) $item['product_id'];
            if (! $pid) continue;
            if (! isset($totals_by_product[$pid])) {
                $totals_by_product[$pid] = ['qty' => 0, 'value' => 0.0];
            }
            $qty = (int) $item['quantity'];
            $value = (float) $item['total'];
            $totals_by_product[$pid]['qty']   += max(0, $qty);
            $totals_by_product[$pid]['value'] += max(0.0, $value);
        }

        $required = $this->get_minimum_equipment();
        $extra_value = 0.0;
        foreach ($totals_by_product as $pid => $totals) {
            $required_qty = isset($required[$pid]) ? (int) $required[$pid] : 0;
            $extra_qty    = max(0, (int) $totals['qty'] - $required_qty);
            if ($extra_qty > 0 && $totals['qty'] > 0) {
                $unit_price = (float) $totals['value'] / (float) $totals['qty'];
                $extra_value += $extra_qty * $unit_price;
            }
        }

        $price_per_point = $this->get_price_per_karma();
        return (int) floor($extra_value / max(1, $price_per_point));
    }

    /**
     * Update hospital karma status.
     *
     * @return int Updated karma points.
     */
    public function update_hospital_karma(): int
    {
        $karma_points = $this->get_total_karma();
        $this->set_karma($karma_points > 0 ? FluentCRMIntegration::KARMA_STARTED : FluentCRMIntegration::KARMA_NOT_STARTED);
        return $karma_points;
    }
}
