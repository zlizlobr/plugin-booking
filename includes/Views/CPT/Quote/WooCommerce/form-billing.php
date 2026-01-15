<?php
/**
 * Checkout billing information form
 *
 * @package Wpcbooking
 * @since 1.0.0
 * @var WC_Checkout $checkout
 */

defined('ABSPATH') || exit;
?>
<div class="woocommerce-billing-fields">
	<?php do_action('woocommerce_before_checkout_billing_form', $checkout); ?>
	
	<div class="woocommerce-billing-fields__field-wrapper w-full mt-75p space-y-5">
		<?php
		$fields = $checkout->get_checkout_fields('billing');

		foreach ($fields as $key => $field) {
			woocommerce_form_field($key, $field, $checkout->get_value($key));
		}
		?>
	</div>

	<?php do_action('woocommerce_after_checkout_billing_form', $checkout); ?>
</div>

