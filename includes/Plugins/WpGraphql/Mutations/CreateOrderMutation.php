<?php

namespace Wpcbooking\Plugins\WpGraphql\Mutations;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use WPGraphQL\AppContext;
use Automattic\WooCommerce\Enums\OrderStatus;
use Automattic\WooCommerce\Enums\ProductType;
use Automattic\WooCommerce\Internal\CostOfGoodsSold\CostOfGoodsSoldController;
use Automattic\WooCommerce\Proxies\LegacyProxy;

/**
 * Class CreateOrderMutation
 * 
 * Custom GraphQL mutation for creating WooCommerce orders
 */
class CreateOrderMutation implements MutationInterface
{

    /**
     * Registers the createOrder mutation.
     *
     * @return void
     */
    public static function register_mutation(): void
    {
        register_graphql_mutation(
            'createOrderBooking',
            [
                'inputFields'         => self::get_input_fields(),
                'outputFields'        => self::get_output_fields(),
                'mutateAndGetPayload' => self::mutate_and_get_payload(),
            ]
        );
    }

    /**
     * Defines the mutation input field configuration.
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_input_fields(): array
    {
        return [
            'quoteID' => [
                'type'        => 'Int',
                'description' => __('Quote ID', 'wpcbooking')
            ],
            'fields' => [
                'type'        => ['list_of' => 'String'],
                'description' => __('Form fields as key:value strings', 'wpcbooking')
            ]
        ];
    }

    /**
     * Defines the mutation output field configuration.
     *
     * @return array<string,array<string,mixed>>
     */
    public static function get_output_fields(): array
    {
        return [
            'success' => [
                'type'        => 'Boolean',
                'description' => __('Whether the order creation was successful', 'OV')
            ],
            'orderId' => [
                'type'        => 'Int',
                'description' => __('ID of the created order', 'OV')
            ],
            'checkoutPaymentUrl' => [
                'type'        => 'String',
                'description' => __('URL to redirect for payment', 'OV')
            ],
            'viewOrderUrl' => [
                'type'        => 'String',
                'description' => __('View order URL', 'OV')
            ],
            'errors' => [
                'type'        => ['list_of' => 'String'],
                'description' => __('List of error messages', 'OV')
            ],
            'orderSummary' => [
                'type'        => 'String',
                'description' => __('Order summary data for tracking', 'OV')
            ]
        ];
    }

    /**
     * Defines the mutation data modification closure.
     *
     * @return callable(array<string,mixed>$input,\WPGraphQL\AppContext $context,\GraphQL\Type\Definition\ResolveInfo $info):array<string,mixed>
     */
    public static function mutate_and_get_payload(): callable
    {
        return static function ($input, AppContext $context, ResolveInfo $info) {
            try {
                // Get quoteID
                $quote_id = $input['quoteID'] ?? null;
                
                // Convert fields array to associative array
                $fields = [];
                if (isset($input['fields']) && is_array($input['fields'])) {
                    foreach ($input['fields'] as $field) {
                        $parts = explode(':', $field, 2);
                        if (count($parts) === 2) {
                            $fields[$parts[0]] = $parts[1];
                        }
                    }
                }

                // Set fields as global $_POST
                $_POST = $fields;

                // Validate nonce
                if (
                    !isset($_POST['checkout_nonce']) ||
                    !wp_verify_nonce($_POST['checkout_nonce'], 'woocommerce-process_checkout')
                ) {
                    throw new UserError(__('Invalid session', 'wpcbooking'));
                }

                do_action('woocommerce_before_checkout_process');

                // Check if cart is empty
                if (WC()->cart->is_empty()) {
                    throw new UserError(__('Your cart is empty.', 'wpcbooking'));
                }

                do_action('woocommerce_checkout_process');
                
                // Validate form data
                $errors = new \WP_Error();
                self::validate_checkout($fields, $errors);

                if (isset($errors->errors) && !empty($errors->errors)) {
                    $error_messages = [];
                    foreach ($errors->errors as $code => $messages) {
                        foreach ($messages as $message) {
                            $error_messages[] = $message;
                        }
                    }
                    return [
                        'success' => false,
                        'orderId' => null,
                        'checkoutPaymentUrl' => null,
                        'errors' => $error_messages
                    ];
                }
                
                self::process_customer($_POST);
                
                // Create the order
                $order_id = self::create_order($_POST);
                if (!$order_id) {
                    throw new UserError(__('Error creating order', 'wpcbooking'));
                }
                
                $order = wc_get_order($order_id);
                if (!$order) {
                    throw new UserError(__('Error retrieving created order', 'wpcbooking'));
                }

                // Link order to quote
                if ($quote_id) {
                    update_post_meta($order_id, '_quote_id', $quote_id);
                    update_post_meta($quote_id, '_order_id', $order_id);
                    
                    // Update quote status to accepted
                    $quote_status = get_post_meta($quote_id, '_quote_status', true);
                    if ($quote_status === 'sent') {
                        update_post_meta($quote_id, '_quote_status', 'accepted');
                    }
                }

                wc_log_order_step(
                    '[CreateOrderMutation] Created order object',
                    array('order_object' => $order)
                );

                do_action('woocommerce_checkout_order_processed', $order_id, $_POST, $order);

                wc_log_order_step(
                    '[CreateOrderMutation] woocommerce_checkout_order_processed hook ran successfully',
                    array('order_object' => $order)
                );

                try {
                    if (apply_filters('woocommerce_cart_needs_payment', $order->needs_payment(), WC()->cart)) {
                        $payment_url = self::process_order_payment($order_id, $_POST['payment_method']);
                    } else {
                        $payment_url = self::process_order_without_payment($order_id);
                    }
                } catch (\Throwable $th) {
                    error_log('[CreateOrderMutation] Payment processing failed: ' . $th->getMessage());
                    $order->add_order_note('Payment [' . $_POST['payment_method'] . '] processing failed: ' . $th->getMessage());
                }
                
                self::clear_cart_and_session();
                
                // Validate payment URL
                $valid_payment_url = null;
                if (isset($payment_url) && filter_var($payment_url, FILTER_VALIDATE_URL)) {
                    $valid_payment_url = $payment_url;
                }

                return [
                    'success' => true,
                    'orderId' => $order->get_id(),
                    'checkoutPaymentUrl' => $valid_payment_url ?? $order->get_checkout_order_received_url(),
                    'viewOrderUrl' => $order->get_view_order_url(),
                    'errors' => [],
                    'orderSummary' => self::generate_order_summary($order, $_POST)
                ];
            } catch (\Throwable $th) {
                error_log('[CreateOrderMutation] Exception: ' . $th->getMessage());
                
                if (isset($order) && is_object($order) && $order->get_id() > 0) {
                    try {
                        $order->add_order_note('Create Order problem: ' . $th->getMessage());

                        $valid_payment_url = null;
                        if (isset($payment_url) && filter_var($payment_url, FILTER_VALIDATE_URL)) {
                            $valid_payment_url = $payment_url;
                        }

                        return [
                            'success' => true,
                            'orderId' => $order->get_id(),
                            'checkoutPaymentUrl' => $valid_payment_url ?? $order->get_checkout_order_received_url(),
                            'viewOrderUrl' => $order->get_view_order_url(),
                            'errors' => [],
                            'orderSummary' => self::generate_order_summary($order, $_POST)
                        ];
                    } catch (\Throwable $th2) {
                        throw new UserError(__('Create order problem: ' . $th->getMessage(), 'wpcbooking'));
                    }
                }
                throw new UserError(__('Create order problem: ' . $th->getMessage(), 'wpcbooking'));
            }
        };
    }

    /**
     * Clear cart and session data after successful order
     */
    protected static function clear_cart_and_session()
    {
        // Clear cart after successful order creation
        WC()->cart->empty_cart();
        wc_clear_notices();
        // Clear session data after successful order
        if (WC()->session) {
            WC()->session->set('chosen_shipping_methods', null);
            WC()->session->set('chosen_payment_method', null);
            WC()->session->set('order_awaiting_payment', null);
            WC()->session->set('store_api_draft_order', null);
            WC()->session->set('applied_coupons', null);
            WC()->session->set('cart_totals', null);
            WC()->session->set('refresh_totals', null);
        }
    }
    /**
     * Validates that the checkout has enough info to proceed.
     *
     * @since  3.0.0
     * @param  array    $data   An array of posted data.
     * @param  WP_Error $errors Validation errors.
     */
    protected static function validate_checkout(&$data, &$errors)
    {
        self::validate_posted_data($data, $errors);
        do_action('woocommerce_check_cart_items');
        // phpcs:ignore WordPress.Security.NonceVerification.Missing
        if (empty($data['woocommerce_checkout_update_totals']) && empty($data['terms']) && ! empty($data['terms-field'])) {
            $errors->add('terms', __('Please read and accept the terms and conditions to proceed with your order.', 'woocommerce'), array('id' => 'terms'));
        }

        if (WC()->cart->needs_shipping()) {
            $shipping_country = isset($data['shipping_country']) ? $data['shipping_country'] : WC()->customer->get_shipping_country();

            if (empty($shipping_country) && ! $errors->get_error_data('billing_country_required')) {
                $errors->add('shipping', __('Please enter an address to continue.', 'woocommerce'));
            } elseif (! in_array($shipping_country, array_keys(WC()->countries->get_shipping_countries()), true)) {
                if (WC()->countries->country_exists($shipping_country)) {
                    /* translators: %s: shipping location (prefix e.g. 'to' + ISO 3166-1 alpha-2 country code) */
                    $errors->add('shipping', sprintf(__('Unfortunately <strong>we do not ship %s</strong>. Please enter an alternative shipping address.', 'woocommerce'), WC()->countries->shipping_to_prefix($shipping_country) . ' ' . $shipping_country));
                }
            } else {
                $chosen_shipping_methods = WC()->session->get('chosen_shipping_methods');

                foreach (WC()->shipping()->get_packages() as $i => $package) {
                    if (! isset($chosen_shipping_methods[$i], $package['rates'][$chosen_shipping_methods[$i]])) {
                        $errors->add('shipping', __('No shipping method has been selected. Please double check your address, or contact us if you need any help.', 'woocommerce'));
                    }
                }
            }
        }
        if (WC()->cart->needs_payment()) {
            $available_gateways = WC()->payment_gateways->get_available_payment_gateways();

            if (! isset($available_gateways[$data['payment_method']])) {
                $errors->add('payment', __('Invalid payment method.', 'woocommerce'));
            } else {
                $available_gateways[$data['payment_method']]->validate_fields();
            }
        }
        do_action('woocommerce_after_checkout_validation', $data, $errors);
    }

    /**
     * Validates the posted checkout data based on field properties.
     *
     * @since  3.0.0
     * @param  array    $data   An array of posted data.
     * @param  WP_Error $errors Validation error.
     */
    protected static function validate_posted_data(&$data, &$errors)
    {
        $woo_fields = apply_filters('woocommerce_checkout_fields', []);
        foreach ($woo_fields as $fieldset_key => $fieldset) {
            $validate_fieldset = true;
            if (self::maybe_skip_fieldset($fieldset_key, $data)) {
                $validate_fieldset = false;
            }

            foreach ($fieldset as $key => $field) {
                if (! isset($data[$key])) {
                    continue;
                }
                $required    = ! empty($field['required']);
                $format      = array_filter(isset($field['validate']) ? (array) $field['validate'] : array());
                $field_label = isset($field['label']) ? $field['label'] : '';

                if (
                    $validate_fieldset &&
                    (isset($field['type']) && 'country' === $field['type'] && '' !== $data[$key]) &&
                    ! WC()->countries->country_exists($data[$key])
                ) {
                    /* translators: ISO 3166-1 alpha-2 country code */
                    $errors->add($key . '_validation', sprintf(__("'%s' is not a valid country code.", 'woocommerce'), $data[$key]));
                }

                switch ($fieldset_key) {
                    case 'shipping':
                        /* translators: %s: field name */
                        $field_label = sprintf(_x('Shipping %s', 'checkout-validation', 'woocommerce'), $field_label);
                        break;
                    case 'billing':
                        /* translators: %s: field name */
                        $field_label = sprintf(_x('Billing %s', 'checkout-validation', 'woocommerce'), $field_label);
                        break;
                }

                if (in_array('postcode', $format, true)) {
                    $country      = isset($data[$fieldset_key . '_country']) ? $data[$fieldset_key . '_country'] : WC()->customer->{"get_{$fieldset_key}_country"}();
                    $data[$key] = wc_format_postcode($data[$key], $country);

                    if ($validate_fieldset && '' !== $data[$key] && ! \WC_Validation::is_postcode($data[$key], $country)) {
                        switch ($country) {
                            case 'IE':
                                /* translators: %1$s: field name, %2$s finder.eircode.ie URL */
                                $postcode_validation_notice = sprintf(__('%1$s is not valid. You can look up the correct Eircode <a target="_blank" href="%2$s">here</a>.', 'woocommerce'), '<strong>' . esc_html($field_label) . '</strong>', 'https://finder.eircode.ie');
                                break;
                            default:
                                /* translators: %s: field name */
                                $postcode_validation_notice = sprintf(__('%s is not a valid postcode / ZIP.', 'woocommerce'), '<strong>' . esc_html($field_label) . '</strong>');
                        }
                        $errors->add($key . '_validation', apply_filters('woocommerce_checkout_postcode_validation_notice', $postcode_validation_notice, $country, $data[$key]), array('id' => $key));
                    }
                }

                if (in_array('phone', $format, true)) {
                    // This is a safe sanitize to prevent copy-paste issues with invisible chars. Won't ensure validation.
                    $data[$key] = wc_remove_non_displayable_chars($data[$key]);

                    if ($validate_fieldset && '' !== $data[$key] && ! \WC_Validation::is_phone($data[$key])) {
                        /* translators: %s: phone number */
                        $errors->add($key . '_validation', sprintf(__('%s is not a valid phone number.', 'woocommerce'), '<strong>' . esc_html($field_label) . '</strong>'), array('id' => $key));
                    }
                }

                if (in_array('email', $format, true) && '' !== $data[$key]) {
                    $email_is_valid = is_email($data[$key]);
                    $data[$key]   = sanitize_email($data[$key]);

                    if ($validate_fieldset && ! $email_is_valid) {
                        /* translators: %s: email address */
                        $errors->add($key . '_validation', sprintf(__('%s is not a valid email address.', 'woocommerce'), '<strong>' . esc_html($field_label) . '</strong>'), array('id' => $key));
                        continue;
                    }
                }

                if ('' !== $data[$key] && in_array('state', $format, true)) {
                    $country      = isset($data[$fieldset_key . '_country']) ? $data[$fieldset_key . '_country'] : WC()->customer->{"get_{$fieldset_key}_country"}();
                    $valid_states = WC()->countries->get_states($country);

                    if (! empty($valid_states) && is_array($valid_states) && count($valid_states) > 0) {
                        $valid_state_values = array_map('wc_strtoupper', array_flip(array_map('wc_strtoupper', $valid_states)));
                        $data[$key]       = wc_strtoupper($data[$key]);

                        if (isset($valid_state_values[$data[$key]])) {
                            // With this part we consider state value to be valid as well, convert it to the state key for the valid_states check below.
                            $data[$key] = $valid_state_values[$data[$key]];
                        }

                        if ($validate_fieldset && ! in_array($data[$key], $valid_state_values, true)) {
                            /* translators: 1: state field 2: valid states */
                            $errors->add($key . '_validation', sprintf(__('%1$s is not valid. Please enter one of the following: %2$s', 'woocommerce'), '<strong>' . esc_html($field_label) . '</strong>', implode(', ', $valid_states)), array('id' => $key));
                        }
                    }
                }

                if ($validate_fieldset && $required && '' === $data[$key]) {
                    /* translators: %s: field name */
                    $errors->add($key . '_required', apply_filters('woocommerce_checkout_required_field_notice', sprintf(__('%s is a required field.', 'woocommerce'), '<strong>' . esc_html($field_label) . '</strong>'), $field_label, $key), array('id' => $key));
                }
            }
        }
    }

    /**
     * Validate posted data
     *
     * @param array $data
     * @param \WP_Error $errors
     */
    protected static function validate_posted_data_old(&$data, &$errors)
    {
        $checkout = WC()->checkout();
        $fields = apply_filters('woocommerce_checkout_fields', $checkout->get_checkout_fields());
        foreach ($fields as $fieldset_key => $fieldset) {
            $validate_fieldset = true;
            if ('shipping' === $fieldset_key || 'account' === $fieldset_key) {
                $validate_fieldset = false;
            }

            foreach ($fieldset as $key => $field) {
                $required = !empty($field['required']);
                $field_label = isset($field['label']) ? $field['label'] : '';

                if (!$required && !isset($data[$key])) {
                    continue;
                } elseif ($validate_fieldset && $required && !isset($data[$key])) {
                    $errors->add($key, sprintf(__("%s je povinné", 'OV'), $field_label));
                    continue;
                }

                if ($validate_fieldset && $required && '' === $data[$key]) {
                    $errors->add($key, sprintf(__('%s je povinné', 'OV'), $field_label));
                }
            }
        }

        // Validate terms and conditions
        self::validate_terms_conditions($data, $errors);

        // Validate shipping method
        self::validate_shipping_method($data, $errors);

        // Validate payment method
        self::validate_payment_method($data, $errors);
    }
    protected static function process_customer($data)
    {
        /**
         * This action is documented in woocommerce/includes/class-wc-checkout.php
         *
         * @since 3.0.0 or earlier
         */
        $customer_id = apply_filters('woocommerce_checkout_customer_id', get_current_user_id());

        if (! is_user_logged_in() && (self::is_registration_required() || ! empty($data['createaccount']))) {
            $username    = ! empty($data['account_username']) ? $data['account_username'] : '';
            $password    = ! empty($data['account_password']) ? $data['account_password'] : '';
            $customer_id = wc_create_new_customer(
                $data['billing_email'],
                $username,
                $password,
                array(
                    'first_name' => ! empty($data['billing_first_name']) ? $data['billing_first_name'] : '',
                    'last_name'  => ! empty($data['billing_last_name']) ? $data['billing_last_name'] : '',
                )
            );

            if (is_wp_error($customer_id)) {
                if ('registration-error-email-exists' === $customer_id->get_error_code()) {
                    /**
                     * Filter the notice shown when a customer tries to register with an existing email address.
                     *
                     * @since 3.3.0
                     * @param string $message The notice.
                     * @param string $email   The email address.
                     */
                    throw new \Exception(apply_filters('woocommerce_registration_error_email_exists', __('An account is already registered with your email address. <a href="#" class="showlogin">Please log in.</a>', 'woocommerce'), $data['billing_email'])); // phpcs:ignore WordPress.Security.EscapeOutput.ExceptionNotEscaped
                }
                throw new \Exception($customer_id->get_error_message()); // phpcs:ignore WordPress.Security.EscapeOutput.ExceptionNotEscaped
            }

            wc_set_customer_auth_cookie($customer_id);

            // As we are now logged in, checkout will need to refresh to show logged in data.
            WC()->session->set('reload_checkout', true);

            // Also, recalculate cart totals to reveal any role-based discounts that were unavailable before registering.
            WC()->cart->calculate_totals();
        }

        // On multisite, ensure user exists on current site, if not add them before allowing login.
        if ($customer_id && is_multisite() && is_user_logged_in() && ! is_user_member_of_blog()) {
            add_user_to_blog(get_current_blog_id(), $customer_id, 'customer');
        }

        // Add customer info from other fields.
        if ($customer_id && apply_filters('woocommerce_checkout_update_customer_data', true, self::class)) {
            $customer = new \WC_Customer($customer_id);

            if (! empty($data['billing_first_name']) && '' === $customer->get_first_name()) {
                $customer->set_first_name($data['billing_first_name']);
            }

            if (! empty($data['billing_last_name']) && '' === $customer->get_last_name()) {
                $customer->set_last_name($data['billing_last_name']);
            }

            // If the display name is an email, update to the user's full name.
            if (is_email($customer->get_display_name())) {
                $customer->set_display_name($customer->get_first_name() . ' ' . $customer->get_last_name());
            }

            foreach ($data as $key => $value) {
                // Use setters where available.
                if (is_callable(array($customer, "set_{$key}"))) {
                    $customer->{"set_{$key}"}($value);

                    // Store custom fields prefixed with either shipping_ or billing_.
                } elseif (0 === stripos($key, 'billing_') || 0 === stripos($key, 'shipping_')) {
                    $customer->update_meta_data($key, $value);
                }
            }

            /**
             * Action hook to adjust customer before save.
             *
             * @since 3.0.0
             */
            do_action('woocommerce_checkout_update_customer', $customer, $data);

            $customer->save();
        }

        do_action('woocommerce_checkout_update_user_meta', $customer_id, $data);
    }
    /**
     * Validate terms and conditions acceptance
     *
     * @param array $data
     * @param \WP_Error $errors
     */
    protected static function validate_terms_conditions(&$data, &$errors)
    {
        if (!isset($data['terms']) || $data['terms'] != 1) {
            $errors->add('terms', __('Musíte souhlasit s obchodními podmínkami.', 'OV'));
        }
    }

    /**
     * Validate shipping method selection
     *
     * @param array $data
     * @param \WP_Error $errors
     */
    protected static function validate_shipping_method(&$data, &$errors)
    {
        if (WC()->cart->needs_shipping()) {
            if (!isset($data['shipping_method']) || empty($data['shipping_method'])) {
                $errors->add('shipping_method', __('Doprava je povinná.', 'OV'));
                return;
            }

            // Check if at least one shipping method is selected
            $has_selected_method = false;

            if (is_array($data['shipping_method'])) {
                foreach ($data['shipping_method'] as $method) {
                    if (!empty($method)) {
                        $has_selected_method = true;
                        break;
                    }
                }
            } elseif (is_string($data['shipping_method']) && !empty($data['shipping_method'])) {
                $has_selected_method = true;
            }

            if (!$has_selected_method) {
                $errors->add('shipping_method', __('Doprava je povinná.', 'OV'));
            }
        }
    }

    /**
     * Validate payment method selection
     *
     * @param array $data
     * @param \WP_Error $errors
     */
    protected static function validate_payment_method(&$data, &$errors)
    {
        if (!isset($data['payment_method']) || empty($data['payment_method'])) {
            $errors->add('payment_method', __('Platební metoda je povinná.', 'OV'));
        }
    }
    /**
     * Create an order. Error codes:
     *      520 - Cannot insert order into the database.
     *      521 - Cannot get order after creation.
     *      522 - Cannot update order.
     *      525 - Cannot create line item.
     *      526 - Cannot create fee item.
     *      527 - Cannot create shipping item.
     *      528 - Cannot create tax item.
     *      529 - Cannot create coupon item.
     *
     * @throws Exception When checkout validation fails.
     * @param  array $data Posted data.
     * @return int|WP_ERROR
     */
    public static function create_order($data)
    {
        /**
         * Gives plugins an opportunity to create a new order themselves.
         *
         * @since 3.0.0 or earlier
         *
         * @param int|null    $order_id Can be set to an order ID to short-circuit the default order creation process.
         * @param WC_Checkout $checkout Reference to the current WC_Checkout instance.
         */
        $order_id = apply_filters('woocommerce_create_order', null, self::class);
        if ($order_id) {
            return $order_id;
        }

        try {
            $order_id           = absint(WC()->session->get('order_awaiting_payment'));
            $cart_hash          = WC()->cart->get_cart_hash();
            $available_gateways = WC()->payment_gateways->get_available_payment_gateways();
            $order              = $order_id ? wc_get_order($order_id) : null;

            /**
             * If there is an order pending payment, we can resume it here so
             * long as it has not changed. If the order has changed, i.e.
             * different items or cost, create a new order. We use a hash to
             * detect changes which is based on cart items + order total.
             */
            if ($order && $order->has_cart_hash($cart_hash) && $order->has_status(array(OrderStatus::PENDING, OrderStatus::FAILED))) {
                /**
                 * Indicates that we are resuming checkout for an existing order (which is pending payment, and which
                 * has not changed since it was added to the current shopping session).
                 *
                 * @since 3.0.0 or earlier
                 *
                 * @param int $order_id The ID of the order being resumed.
                 */
                do_action('woocommerce_resume_order', $order_id);

                // Remove all items - we will re-add them later.
                $order->remove_order_items();
            } else {
                $order = new \WC_Order();
            }

            $fields_prefix = array(
                'shipping' => true,
                'billing'  => true,
            );

            $shipping_fields = array(
                'shipping_method' => true,
                'shipping_total'  => true,
                'shipping_tax'    => true,
            );
            foreach ($data as $key => $value) {
                if (is_callable(array($order, "set_{$key}"))) {
                    $order->{"set_{$key}"}($value);
                    // Store custom fields prefixed with either shipping_ or billing_. This is for backwards compatibility with 2.6.x.
                } elseif (isset($fields_prefix[current(explode('_', $key))])) {
                    if (! isset($shipping_fields[$key])) {
                        $order->update_meta_data('_' . $key, $value);
                    }
                }
            }

            if (isset($data['billing_email'])) {
                $order->hold_applied_coupons($data['billing_email']);
            }

            $order->set_created_via('checkout');
            $order->set_cart_hash($cart_hash);
            /**
             * This action is documented in woocommerce/includes/class-wc-checkout.php
             *
             * @since 3.0.0 or earlier
             */
            $order->set_customer_id(apply_filters('woocommerce_checkout_customer_id', get_current_user_id()));
            $order->set_currency(get_woocommerce_currency());
            $order->set_prices_include_tax('yes' === get_option('woocommerce_prices_include_tax'));
            $order->set_customer_ip_address(\WC_Geolocation::get_ip_address());
            $order->set_customer_user_agent(wc_get_user_agent());
            $order->set_customer_note(isset($data['order_comments']) ? $data['order_comments'] : '');
            $order->set_payment_method(isset($available_gateways[$data['payment_method']]) ? $available_gateways[$data['payment_method']] : $data['payment_method']);
            self::set_data_from_cart($order);

            if ($order->has_cogs() && self::cogs_is_enabled()) {
                $order->calculate_cogs_total_value();
            }

            /**
             * Action hook to adjust order before save.
             *
             * @since 3.0.0
             */
            do_action('woocommerce_checkout_create_order', $order, $data);

            // Save the order.
            $order_id = $order->save();

            /**
             * Action hook fired after an order is created used to add custom meta to the order.
             *
             * @since 3.0.0
             */
            do_action('woocommerce_checkout_update_order_meta', $order_id, $data);

            /**
             * Action hook fired after an order is created.
             *
             * @since 4.3.0
             */
            do_action('woocommerce_checkout_order_created', $order);

            return $order_id;
        } catch (\Exception $e) {
            if ($order && $order instanceof \WC_Order) {
                wc_release_coupons_for_order($order);
                /**
                 * Action hook fired when an order is discarded due to Exception.
                 *
                 * @since 4.3.0
                 */
                do_action('woocommerce_checkout_order_exception', $order);
            }
            return new \WP_Error('checkout-error', $e->getMessage());
        }
    }

    /**
     * Generate order summary for tracking
     *
     * @param \WC_Order $order
     * @param array $fields
     * @return string
     */
    protected static function generate_order_summary($order, $fields)
    {
        $summary = [
            'transaction_id' => $order->get_id(),
            'shipping' => (float) $order->get_shipping_total(),
            'tax' => (float) $order->get_total_tax(),
            'value' => (float) $order->get_total(),
            'coupon' => implode(',', WC()->cart->get_applied_coupons()),
            'orderTotal' => (float) $order->get_total(),
            'customerFirstName' => isset($fields['billing_first_name']) ? wc_clean($fields['billing_first_name']) : '',
            'customerLastName' => isset($fields['billing_last_name']) ? wc_clean($fields['billing_last_name']) : '',
            'customerEmail' => isset($fields['billing_email']) ? wc_clean($fields['billing_email']) : '',
            'products' => [],
            'isSubscription' => get_post_meta($order->get_id(), '_add_subscription', true) ?? null,
            'upsellID' => WC()->session->get('upsell_popup_product_id') ?? null
        ];
        $index = 0;
        foreach ($order->get_items() as $item) {
            if (!$item instanceof \WC_Order_Item_Product) {
                continue;
            }
            $product = wc_get_product($item->get_product_id());
            if (!$product) {
                continue;
            }

            $product_data = apply_filters('wpc_product_data', [
                'productId' => $product->get_id(),
                'productName' => $product->get_name(),
                'affiliation' => get_bloginfo('name'),
                'coupon' => implode(',', WC()->cart->get_applied_coupons()),
                'discount' => 0, // Simplified for now
                'productBrand' => self::get_product_brand($product),
                'productCategory' => self::get_product_category($product),
                'variant' => self::get_product_variant($product),
                'index' => $index,
                'productPrice' => (float) $product->get_price(),
                'quantity' => $item->get_quantity(),
                'inStock' => $product->is_in_stock()
            ]);

            $summary['products'][] = $product_data;
            $index++;
        }

        return json_encode($summary);
    }

    /**
     * Get product brand
     *
     * @param \WC_Product $product
     * @return string
     */
    protected static function get_product_brand($product)
    {
        $brand = $product->get_meta('_product_brand');
        if (empty($brand)) {
            $terms = get_the_terms($product->get_id(), 'product_brand');
            if ($terms && !is_wp_error($terms)) {
                $brand = $terms[0]->name;
            }
        }
        return $brand ?: '';
    }

    /**
     * Get product category
     *
     * @param \WC_Product $product
     * @return string
     */
    protected static function get_product_category($product)
    {
        $terms = get_the_terms($product->get_id(), 'product_cat');
        if ($terms && !is_wp_error($terms)) {
            return $terms[0]->name;
        }
        return '';
    }

    /**
     * Get product variant
     *
     * @param \WC_Product $product
     * @return string
     */
    protected static function get_product_variant($product)
    {
        if ($product->is_type('variation')) {
            $variation_attributes = $product->get_attributes();
            return !empty($variation_attributes) ? implode(', ', $variation_attributes) : '';
        }
        return '';
    }
    /**
     * Is registration required to checkout?
     *
     * @since  3.0.0
     * @return boolean
     */
    public static function is_registration_required()
    {
        /**
         * Controls if registration is required in order for checkout to be completed.
         *
         * @since 3.0.0
         *
         * @param bool $checkout_registration_required If customers must be registered to checkout.
         */
        return apply_filters('woocommerce_checkout_registration_required', 'yes' !== get_option('woocommerce_enable_guest_checkout'));
    }
    /**
     * Copy line items, tax, totals data from cart to order.
     *
     * @param WC_Order $order Order object.
     *
     * @throws Exception When unable to create order.
     */
    public static function set_data_from_cart(&$order)
    {
        $order_vat_exempt = WC()->cart->get_customer()->get_is_vat_exempt() ? 'yes' : 'no';
        $order->add_meta_data('is_vat_exempt', $order_vat_exempt, true);
        $order->set_shipping_total(WC()->cart->get_shipping_total());
        $order->set_discount_total(WC()->cart->get_discount_total());
        $order->set_discount_tax(WC()->cart->get_discount_tax());
        $order->set_cart_tax(WC()->cart->get_cart_contents_tax() + WC()->cart->get_fee_tax());
        $order->set_shipping_tax(WC()->cart->get_shipping_tax());
        $order->set_total(WC()->cart->get_total('edit'));
        self::create_order_line_items($order, WC()->cart);
        self::create_order_fee_lines($order, WC()->cart);
        self::create_order_shipping_lines($order, WC()->session->get('chosen_shipping_methods'), WC()->shipping()->get_packages());
        self::create_order_tax_lines($order, WC()->cart);
        self::create_order_coupon_lines($order, WC()->cart);
    }
    /**
     * Add line items to the order.
     *
     * @param WC_Order $order Order instance.
     * @param WC_Cart  $cart  Cart instance.
     */
    public static function create_order_line_items(&$order, $cart)
    {
        foreach ($cart->get_cart() as $cart_item_key => $values) {
            /**
             * Filter hook to get initial item object.
             *
             * @since 3.1.0
             */
            $item                       = apply_filters('woocommerce_checkout_create_order_line_item_object', new \WC_Order_Item_Product(), $cart_item_key, $values, $order);
            $product                    = $values['data'];
            $item->legacy_values        = $values; // @deprecated 4.4.0 For legacy actions.
            $item->legacy_cart_item_key = $cart_item_key; // @deprecated 4.4.0 For legacy actions.
            $item->set_props(
                array(
                    'quantity'     => $values['quantity'],
                    'variation'    => $values['variation'],
                    'subtotal'     => $values['line_subtotal'],
                    'total'        => $values['line_total'],
                    'subtotal_tax' => $values['line_subtotal_tax'],
                    'total_tax'    => $values['line_tax'],
                    'taxes'        => $values['line_tax_data'],
                )
            );

            if ($product) {
                $item->set_props(
                    array(
                        'name'         => $product->get_name(),
                        'tax_class'    => $product->get_tax_class(),
                        'product_id'   => $product->is_type(ProductType::VARIATION) ? $product->get_parent_id() : $product->get_id(),
                        'variation_id' => $product->is_type(ProductType::VARIATION) ? $product->get_id() : 0,
                    )
                );
            }

            $item->set_backorder_meta();

            /**
             * Action hook to adjust item before save.
             *
             * @since 3.0.0
             */
            do_action('woocommerce_checkout_create_order_line_item', $item, $cart_item_key, $values, $order);

            // Add item to order and save.
            $order->add_item($item);
        }
    }
    /**
     * Add fees to the order.
     *
     * @param WC_Order $order Order instance.
     * @param WC_Cart  $cart  Cart instance.
     */
    public static function create_order_fee_lines(&$order, $cart)
    {

        foreach ($cart->get_fees() as $fee_key => $fee) {
            $item                 = new \WC_Order_Item_Fee();
            $item->legacy_fee     = $fee; // @deprecated 4.4.0 For legacy actions.
            $item->legacy_fee_key = $fee_key; // @deprecated 4.4.0 For legacy actions.
            $item->set_props(
                array(
                    'name'      => $fee->name,
                    'tax_class' => $fee->taxable ? $fee->tax_class : 0,
                    'amount'    => $fee->amount,
                    'total'     => $fee->amount,
                    'total_tax' => $fee->tax ?? 0,
                    'taxes'     => array(
                        'total' => $fee->tax_data ?? [],
                    ),
                )
            );

            /**
             * Action hook to adjust item before save.
             *
             * @since 3.0.0
             */
            do_action('woocommerce_checkout_create_order_fee_item', $item, $fee_key, $fee, $order);

            // Add item to order and save.
            $order->add_item($item);
        }
    }

    /**
     * Add shipping lines to the order.
     *
     * @param WC_Order $order                   Order Instance.
     * @param array    $chosen_shipping_methods Chosen shipping methods.
     * @param array    $packages                Packages.
     */
    public static function create_order_shipping_lines(&$order, $chosen_shipping_methods, $packages)
    {
        foreach ($packages as $package_key => $package) {
            if (isset($chosen_shipping_methods[$package_key], $package['rates'][$chosen_shipping_methods[$package_key]])) {
                $shipping_rate            = $package['rates'][$chosen_shipping_methods[$package_key]];
                $item                     = new \WC_Order_Item_Shipping();
                $item->legacy_package_key = $package_key; // @deprecated 4.4.0 For legacy actions.
                $item->set_props(
                    array(
                        'method_title' => $shipping_rate->label,
                        'method_id'    => $shipping_rate->method_id,
                        'instance_id'  => $shipping_rate->instance_id,
                        'total'        => wc_format_decimal($shipping_rate->cost),
                        'taxes'        => array(
                            'total' => $shipping_rate->taxes,
                        ),
                        'tax_status'   => $shipping_rate->tax_status,
                    )
                );

                foreach ($shipping_rate->get_meta_data() as $key => $value) {
                    $item->add_meta_data($key, $value, true);
                }

                /**
                 * Action hook to adjust item before save.
                 *
                 * @since 3.0.0
                 */
                do_action('woocommerce_checkout_create_order_shipping_item', $item, $package_key, $package, $order);

                // Add item to order and save.
                $order->add_item($item);
            }
        }
    }
    /**
     * Add tax lines to the order.
     *
     * @param WC_Order $order Order instance.
     * @param WC_Cart  $cart  Cart instance.
     */
    public static function create_order_tax_lines(&$order, $cart)
    {
        foreach (array_keys($cart->get_cart_contents_taxes() + $cart->get_shipping_taxes() + $cart->get_fee_taxes()) as $tax_rate_id) {
            /**
             * Controls the zero rate tax ID.
             *
             * An order item tax will not be created for this ID (which by default is 'zero-rated').
             *
             * @since 3.0.0 or earlier
             *
             * @param string $tax_rate_id The ID of the zero rate tax.
             */
            if ($tax_rate_id && apply_filters('woocommerce_cart_remove_taxes_zero_rate_id', 'zero-rated') !== $tax_rate_id) {
                $item = new \WC_Order_Item_Tax();
                $item->set_props(
                    array(
                        'rate_id'            => $tax_rate_id,
                        'tax_total'          => $cart->get_tax_amount($tax_rate_id),
                        'shipping_tax_total' => $cart->get_shipping_tax_amount($tax_rate_id),
                        'rate_code'          => \WC_Tax::get_rate_code($tax_rate_id),
                        'label'              => \WC_Tax::get_rate_label($tax_rate_id),
                        'compound'           => \WC_Tax::is_compound($tax_rate_id),
                        'rate_percent'       => \WC_Tax::get_rate_percent_value($tax_rate_id),
                    )
                );

                /**
                 * Action hook to adjust item before save.
                 *
                 * @since 3.0.0
                 */
                do_action('woocommerce_checkout_create_order_tax_item', $item, $tax_rate_id, $order);

                // Add item to order and save.
                $order->add_item($item);
            }
        }
    }
    /**
     * Add coupon lines to the order.
     *
     * @param WC_Order $order Order instance.
     * @param WC_Cart  $cart  Cart instance.
     */
    public static function create_order_coupon_lines(&$order, $cart)
    {
        foreach ($cart->get_coupons() as $code => $coupon) {
            $item = new \WC_Order_Item_Coupon();
            $item->set_props(
                array(
                    'code'         => $code,
                    'discount'     => $cart->get_coupon_discount_amount($code),
                    'discount_tax' => $cart->get_coupon_discount_tax_amount($code),
                )
            );

            $coupon_info = $coupon->get_short_info();
            $item->add_meta_data('coupon_info', $coupon_info);

            /**
             * Action hook to adjust item before save.
             *
             * @since 3.0.0
             */
            do_action('woocommerce_checkout_create_order_coupon_item', $item, $code, $coupon, $order);

            // Add item to order and save.
            $order->add_item($item);
        }
    }
    /**
     * Check if the Cost of Goods Sold feature is enabled.
     *
     * @param string|null $doing_it_wrong_function_name If not null, a "doing it wrong" error will be thrown with this function name if the deature is disabled.
     *
     * @return bool True if the feature is enabled.
     */
    protected static function cogs_is_enabled(?string $doing_it_wrong_function_name = null): bool
    {
        if (wc_get_container()->get(CostOfGoodsSoldController::class)->feature_is_enabled()) {
            return true;
        }

        if ($doing_it_wrong_function_name) {
            wc_get_container()->get(LegacyProxy::class)->call_function(
                'wc_doing_it_wrong',
                $doing_it_wrong_function_name,
                'The Cost of Goods sold feature is disabled, thus the method called will do nothing and will return dummy data.',
                '9.5.0'
            );
        }

        return false;
    }
    /**
     * Process an order that does require payment.
     *
     * @since 3.0.0
     * @param int    $order_id       Order ID.
     * @param string $payment_method Payment method.
     */
    protected static function process_order_payment($order_id, $payment_method)
    {
        $available_gateways = WC()->payment_gateways->get_available_payment_gateways();

        if (! isset($available_gateways[$payment_method])) {
            return;
        }

        // Store Order ID in session, so it can be re-used after payment failure.
        WC()->session->set('order_awaiting_payment', $order_id);

        // We save the session early because if the payment gateway hangs
        // the request will never finish, thus the session data will never be saved,
        // and this can lead to duplicate orders if the user submits the order again.
        WC()->session->save_data();

        // Process Payment.
        $result = $available_gateways[$payment_method]->process_payment($order_id);

        // Redirect to success/confirmation/payment page.
        if (isset($result['result']) && 'success' === $result['result']) {
            $result['order_id'] = $order_id;

            $result = apply_filters('woocommerce_payment_successful_result', $result, $order_id);

            wc_log_order_step(
                '[Shortcode #6A] Order payment processed successfully',
                array(
                    'order_id'       => $order_id,
                    'payment_method' => $payment_method,
                    'redirected'     => ! wp_doing_ajax() ? 'yes' : 'no',
                ),
                true
            );
            return $result['redirect'];
        }
    }
    /**
     * Process an order that doesn't require payment.
     *
     * @since 3.0.0
     * @param int $order_id Order ID.
     */
    protected static function process_order_without_payment($order_id)
    {
        $order = wc_get_order($order_id);
        $order->payment_complete();
        wc_empty_cart();

        wc_log_order_step(
            '[Shortcode #6B] Order processed without payment',
            array(
                'order_object' => $order,
                'redirected'   => ! wp_doing_ajax() ? 'yes' : 'no',
            ),
            true
        );
        return apply_filters('woocommerce_checkout_no_payment_needed_redirect', $order->get_checkout_order_received_url(), $order);
    }
    /**
     * See if a fieldset should be skipped.
     *
     * @since 3.0.0
     * @param string $fieldset_key Fieldset key.
     * @param array  $data         Posted data.
     * @return bool
     */
    protected static function maybe_skip_fieldset($fieldset_key, $data)
    {
        if ('shipping' === $fieldset_key && (! $data['ship_to_different_address'] || ! WC()->cart->needs_shipping_address())) {
            return true;
        }

        if ('account' === $fieldset_key && (is_user_logged_in() || (! self::is_registration_required() && empty($data['createaccount'])))) {
            return true;
        }

        return false;
    }
}
