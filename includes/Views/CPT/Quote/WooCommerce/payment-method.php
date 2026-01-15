<?php
/**
 * Output a single payment method
 *
 * @package Wpcbooking
 * @since 1.0.0
 * @var WC_Payment_Gateway $gateway
 */

defined('ABSPATH') || exit;
?>
<div class="cs-radio col-span-1 payment_method_<?php echo esc_attr($gateway->id); ?>">
	<input 
		id="payment_method_<?php echo esc_attr($gateway->id); ?>" 
		type="radio" 
		class="input-radio" 
		name="payment_method" 
		value="<?php echo esc_attr($gateway->id); ?>" 
		<?php checked($gateway->chosen, true); ?> 
		data-order_button_text="<?php echo esc_attr($gateway->order_button_text); ?>" 
	/>

	<span class="af-p28 text-black payment_method_<?php echo esc_attr($gateway->id); ?>">
		<?php echo $gateway->get_title(); /* phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped */ ?> 
		<?php echo $gateway->get_icon(); /* phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped */ ?>
	</span>
	
	<?php if ($gateway->has_fields() || $gateway->get_description()): ?>
		<div class="mt-3 af-p16 max-w-[450px] payment_method_<?php echo esc_attr($gateway->id); ?>">
			<?php $gateway->payment_fields(); ?>
		</div>
	<?php endif; ?>
</div>

