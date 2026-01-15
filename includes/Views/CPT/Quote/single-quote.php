<?php

/**
 * Template for single Quote CPT
 * 
 * @package Wpcbooking
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

$quote_id = get_the_ID();
$booking_id = get_post_meta($quote_id, '_booking_id', true);

if (!$booking_id) {
    echo esc_html__('Quote not available', 'wpcbooking');
    return;
}

// Initialize booking controller
use Wpcbooking\Controllers\BookingController;

$booking_controller = BookingController::get_instance($booking_id);

// Get booking options
$options = booking_get_confirmed_options($booking_id);
$summary_options = get_booking_options_summary($booking_id);
$blocks = $booking_controller->get_booking_blocks();
$currency_code = get_quote_currency($quote_id, $booking_id);
$currency = get_woocommerce_currency_symbol($currency_code);

// Initialize WooCommerce cart
if (!WC()->cart) {
    wc_load_cart();
}
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <main class="XXalignfull XXis-layout-constrained XXhas-global-padding cs-gutenberg XXoverflow-hidden">
        <div class="XXmt-[400px] XXmb-[100px]">
            <section class="XXpy-200p py-40p overflow-hidden cs-ignore-gutenberg">
                <form method="POST" action="<?= esc_url(get_permalink()); ?>" id="aff_form_send_order">
                    <?php wp_nonce_field('woocommerce-process_checkout', 'checkout_nonce'); ?>
                    <?php wc_print_notices(); ?>
                    <input type="hidden" name="quote_id" value="<?= esc_attr($quote_id) ?>">

                    <div class="cs-container cs-grid items-center">
                        <div class="col-span-full">
                            <div class="grid relative">
                                <div class="col-span-full row-span-full max-small:-mx-cont-px small:absolute right-0 h-full w-[110vw] bg-gradient-to-r from-th-orange to-th-pink rounded-r-full">
                                    <!-- h1 gradient background -->
                                </div>
                                <h1 class="col-span-full row-span-full pt-40p pb-50p af-h1 text-white max-medium:text-center relative z-20">
                                    <?= esc_html($options["confirmed_heading"] ?? __('Confirm Your Order', 'wpcbooking')) ?>
                                </h1>
                            </div>
                        </div>

                        <div class="col-span-full medium:col-[1/span_9] medium:self-start mt-80p">
                            

                            <div class="w-11/12 af-p30-light text-black">
                                <?= wp_kses_post($options["confirmed_text"] ?? '') ?>
                            </div>
                            <?php if (get_post_meta($quote_id, '_quote_status', true) !== 'sent'): ?>
                                <div class="col-span-full woocommerce-error">
                                    <?= esc_html__('Quote is not available – status is not "sent".', 'wpcbooking') ?>
                                </div>
                            <?php else: ?>
                            <div class="mt-75p">
                                <!-- Summary Header -->
                                <div class="min-h-[70px] flex justify-between items-center bg-th-grey rounded-[35px]">
                                    <div class="flex items-center gap-x-5 pl-40p">
                                        <div style="--mask-img: url('<?= esc_url(get_template_directory_uri() . '/assets/img/form/summary.svg') ?>')"
                                            class="w-11 h-10 bg-white cs-mask"></div>
                                        <div class="af-p20-bold text-white uppercase">
                                            <?= esc_html($summary_options['label_summary'] ?? __('Summary of your event', 'wpcbooking')) ?>
                                        </div>
                                    </div>
                                </div>

                                <?php if (is_array($blocks) && !empty($blocks)): ?>
                                    <ul class="space-y-5 mt-5">
                                        <?php do_action('woocommerce_before_calculate_totals', WC()->cart);
                                        $prepare_blocks = booking_prepare_summary_blocks_layout($blocks, $quote_id);
                                        foreach ($prepare_blocks as $step => $attrs):
                                            $attrs['value_step'] = wc_format_decimal($attrs['value'] ?? 0);
                                            $attrs['step'] = $step;

                                            // Render inner blocks
                                            $item_output = '';
                                            if (isset($attrs['innerBlocks']) && is_array($attrs['innerBlocks']) && !empty($attrs['innerBlocks'])) {
                                                foreach ($attrs['innerBlocks'] as $inner_block) {
                                                    $field_id = $inner_block['attrs']['field_id'] ?? null;
                                                    if (!$field_id) continue;
                                                    $item_output .= booking_apply_render_data($inner_block, $quote_id, $field_id) ?? '';
                                                }
                                            }
                                            $attrs['item_output'] = $item_output;
                                            $attrs['currency'] = $currency;
                                            echo booking_get_template('CPT/Quote/Summary/step-item', $attrs);
                                        endforeach; ?>

                                        <?php do_action('woocommerce_after_calculate_totals', WC()->cart); ?>
                                    </ul>
                                <?php endif; ?>

                                <?php
                                $shipping_total = WC()->cart->get_shipping_total() ?? 0;
                                $contents_total = get_post_meta($quote_id, '_total_price', true);
                                $total_base = (float) get_post_meta($quote_id, '_total_base_price', true);
                                $total_percentage = (float) get_post_meta($quote_id, '_total_percentage_price', true);

                                echo  booking_get_template('CPT/Quote/Summary/cart', [
                                    'label_price' => $summary_options['label_price'] ?? __('Tjenester', 'wpcbooking'),
                                    'contents_total' => wc_format_decimal($total_base ?? 0, wc_get_price_decimals()),
                                    'percentage_total' => wc_format_decimal($total_percentage ?? 0, wc_get_price_decimals()),
                                    'shipping_total' => wc_format_decimal($shipping_total ?? 0, wc_get_price_decimals()),
                                    'label_total' => $summary_options['label_total'] ?? __('Total', 'wpcbooking'),
                                    'cart_total' => wc_format_decimal($total_base + $total_percentage + $shipping_total, wc_get_price_decimals()),
                                    'currency' => $currency,
                                    'blocks' => $prepare_blocks ?? [],
                                    'quote_id' => $quote_id
                                ]);
                                ?>

                                <!-- Billing Address -->
                                <?php
                                $checkout = WC()->checkout();
                                echo booking_get_template('CPT/Quote/WooCommerce/form-billing', ['checkout' => $checkout]);
                                ?>

                                <!-- Payment Method -->
                                <?php
                                $available_gateways = WC()->payment_gateways->get_available_payment_gateways();
                                ?>
                                <div id="payment">
                                    <div class="mt-12 grid grid-cols-1 gap-y-4 large:grid-cols-2 gap-x-th-gap">
                                        <?php if (!empty($available_gateways)): ?>
                                            <?php foreach ($available_gateways as $gateway): ?>
                                                <?= booking_get_template('CPT/Quote/WooCommerce/payment-method', ['gateway' => $gateway]); ?>
                                            <?php endforeach; ?>
                                        <?php else: ?>
                                            <div>
                                                <?php wc_print_notice(
                                                    apply_filters(
                                                        'woocommerce_no_available_payment_methods_message',
                                                        esc_html__('Sorry, it seems that there are no available payment methods for your location. Please contact us if you require assistance or wish to make alternate arrangements.', 'woocommerce')
                                                    ),
                                                    'notice'
                                                ); ?>
                                            </div>
                                        <?php endif; ?>
                                    </div>
                                </div>

                                <!-- Terms and Conditions -->
                                <div class="cs-privacy mt-12 py-6 border-y border-th-grey-ultralight">
                                    <?php if (isset($summary_options['terms']) && is_array($summary_options['terms']) && !empty($summary_options['terms'])): ?>
                                        <?php foreach ($summary_options['terms'] as $row): ?>
                                            <?php if (!isset($row['info_label'], $row['page_id']) || !get_post($row['page_id'])) continue; ?>

                                            <?php
                                            $term_page_title = get_the_title($row['page_id']);
                                            $link = sprintf('<a href="%s" target="_blank">%s</a>', esc_url(get_permalink($row['page_id'])), esc_html($term_page_title));
                                            $checkbox_name = sanitize_title($term_page_title);
                                            ?>
                                            <div class="flex" data-name="<?= esc_attr($checkbox_name) ?>">
                                                <input
                                                    type="checkbox"
                                                    data-label-required="<?= esc_attr__('You must agree to the terms and conditions.', 'wpcbooking') ?>"
                                                    data-label="<?= esc_attr($term_page_title) ?>"
                                                    value="yes"
                                                    id="<?= esc_attr($checkbox_name) ?>"
                                                    name="terms_conditions[<?= esc_attr($checkbox_name) ?>]"
                                                    <?= !empty($row['required']) && 1 == $row['required'] ? 'required' : ''; ?> />
                                                <span class="af-p18">
                                                    <?= wp_kses_post(strpos($row['info_label'], '%s') !== false ? sprintf($row['info_label'], $link) : $row['info_label']); ?>
                                                </span>
                                            </div>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </div>

                                <div class="order-errors"></div>
                            </div>

                            <div class="w-full flex justify-between">
                                <button type="submit" class="aff-form-button-submit mt-75p w-fit mx-auto" id="aff_create_order">
                                    <?=
                                    $confirmed_button_label = $options["confirmed_button_label"] ?? '';
                                    $confirmed_button_label = isset($confirmed_button_label) && $confirmed_button_label !== '' && strlen($confirmed_button_label) > 3 ? $confirmed_button_label : __('Accept order', 'wpcbooking');
                                    echo esc_html($confirmed_button_label); ?>
                                    <?php if (!empty($options['confirmed_button_icon'])): ?>
                                        <?php $confirmed_button_icon = wp_get_attachment_image_url($options['confirmed_button_icon'], 'full'); ?>
                                        <span class="aff-button-icon" style="-webkit-mask-image: url(<?= esc_url($confirmed_button_icon) ?>); mask-image: url(<?= esc_url($confirmed_button_icon) ?>);"></span>
                                    <?php endif; ?>
                                </button>
                            </div>
                            <?php endif; ?>
                        </div>

                        <div class="col-span-full medium:col-[10/span_3] self-start relative mt-80p">
                            <div class="absolute -z-10 left-0 top-0 w-[44vw] h-[62vw]">
                                <img src="<?= esc_url(get_template_directory_uri() . '/assets/img/form/form-step-bg.svg') ?>" alt="">
                            </div>
                            <div data-id="<?= count($blocks) ?>" class="js-glass-wrap w-[170px] h-[649px] mx-auto [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain">
                                <?php
                                $glass_svg = get_template_directory() . '/assets/img/form/glass.svg';
                                if (file_exists($glass_svg)) {
                                    echo file_get_contents($glass_svg); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped,WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
                                }
                                ?>
                            </div>
                        </div>

                    </div>
                </form>
            </section>
        </div>
    </main>

    <?php
    wp_footer();
    ?>
</body>

</html>