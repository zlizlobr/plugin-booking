<style type="text/css">
    .email-rounded {
        border-radius: 35px;
    }
    .email-bg-grey {
        background-color: #707070;
    }
    .email-bg-grey-light {
        background-color: #f9fafb;
    }
    .email-bg-orange {
        background-color: #ee7013;
    }
    .email-bg-orange-light {
        background-color: #ffa25e;
    }
    .email-bg-white {
        background-color: #ffffff;
    }
    .email-text-white {
        color: #ffffff;
    }
    .email-text-black {
        color: #000000;
    }
    .email-text-grey {
        color: #6b7280;
    }
    .email-bold {
        font-weight: bold;
    }
    .email-p16 {
        font-size: 16px;
    }
    .email-p20 {
        font-size: 20px;
    }
    .email-p25 {
        font-size: 25px;
    }
    .email-p30 {
        font-size: 30px;
    }
    .email-uppercase {
        text-transform: uppercase;
    }
    .email-table {
        text-align: left !important;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        font-family: Arial, sans-serif;
    }
    .email-shadow {
        box-shadow: 0 8px 20px -8px rgba(0, 0, 0, 0.15);
    }
    .ml-25px {
        margin-left: 25px;
    }
    .flex {
        display: flex;
    }
    .items-center {
        align-items: center;
    }
    .gap-2 {
        gap: 0.5rem;
    }
    .w-50p {
        width: 50px;
    }
    .h-50p {
        height: 50px;
    }
    .w-25p {
        width: 25px;
    }
    .h-25p {
        height: 25px;
    }
    .w-6 {
        width: 1.5rem;
    }
    .h-6 {
        height: 1.5rem;
    }
    .rounded-full {
        border-radius: 50%;
    }
    .mt-4 {
        margin-top: 1rem;
    }
    .mb-2 {
        margin-bottom: 0.5rem;
    }
</style>
<?php
defined('ABSPATH') || exit;

$quote_id = $args['quote_id'] ?? 0;

if (!$quote_id) {
	error_log('[Email Summary] ❌ No quote_id provided');
	return '';
}

$booking_id = get_post_meta($quote_id, '_booking_id', true);

if (!$booking_id) {
	error_log('[Email Summary] ❌ No booking_id found for quote: ' . $quote_id);
	return '';
}

$booking_controller = \Wpcbooking\Controllers\BookingController::get_instance($booking_id);
$blocks = $booking_controller->get_booking_blocks();

$currency = get_post_meta($quote_id, '_quote_currency', true) ?: 'DKK';

$total_base = (float) get_post_meta($quote_id, '_total_price', true);
$total_percentage = (float) get_post_meta($quote_id, '_total_percentage_price', true);
$total_quote = $total_base + $total_percentage;

$prepare_blocks = booking_prepare_summary_blocks_layout($blocks, $quote_id);
?>

<table class="email-table" style="margin-top:30px;">
    <tr>
        <td style="padding-top:75px;">
            <table class="email-table email-rounded email-bg-grey" style="min-height:70px;">
                <tr>
                    <td style="padding-left:40px;">
                        <span style="display:inline-block; width:44px; height:40px; vertical-align:middle;">
                            <img src="<?= esc_url(WPCBOOKING_PLUGIN_URL . 'assets/img/summary.png') ?>" width="44" height="40" style="display:block; border:0;" alt="" />
                        </span>
                        <span class="email-bold email-p20 email-text-white email-uppercase" style="margin-left:20px;">
                            <?= esc_html__('summary of your event', 'wpcbooking') ?>
                        </span>
                    </td>
                </tr>
            </table>
            
            <?php if (is_array($prepare_blocks) && !empty($prepare_blocks)): ?>
                <table class="email-table" style="margin-top:20px;">
                    <?php 
                    foreach ($prepare_blocks as $step => $block): 
                        $label = $block['label'] ?? sprintf(__('Step %d', 'wpcbooking'), $step);
                        $price_step = $block['value'] ?? 0;
                        
                        // Get icon
                        $icon = null;
                        $thumbnail_src = $block['thumbnail_src_mail'] ?? '';
                        if ($thumbnail_src && strtolower(pathinfo($thumbnail_src, PATHINFO_EXTENSION)) !== 'svg') {
                            $icon = $thumbnail_src;
                        }
                        if (!$icon) {
                            $icon = WPCBOOKING_PLUGIN_URL . 'assets/img/icon-default.png';
                        }
                    ?>
                    
                    <tr>
                        <td>
                            <table class="email-table email-bg-grey-light email-rounded" style="min-height:70px; margin-bottom:10px;">
                                <tr>
                                    <td style="padding:0;">
                                        <table class="email-table email-shadow" style="border-radius:35px; border: 1px solid #F9FAFB;">
                                            <tr>
                                                <td style="padding:5px; text-align:left; background:#fff; border-radius:35px; min-height:66px; box-shadow:0 8px 20px -8px rgba(0,0,0,0.15);">
                                                    <div style="display:flex; align-items:center;">
                                                        <span style="display:flex; align-items:center; justify-content:center; width:50px; height:50px; background:#ffa25e; border-radius:50%;">
                                                            <img src="<?= esc_url($icon) ?>" width="25" height="25" style="display:block; margin:auto; border:0; z-index:99999;" alt="" />
                                                        </span>
                                                        <span class="email-p20 email-text-grey" style="margin-left:10px; vertical-align:middle; line-height:50px; display:inline-block; height:50px;">
                                                            <?= esc_html($label) ?>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style="text-align:right; padding-right:30px; border-radius:35px;">
                                                    <span class="email-bold email-p20 email-text-black email-uppercase">
                                                        <?= esc_html(number_format($price_step, 0, ',', '.')) ?><span> kr.</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <?php if (isset($block['innerBlocks']) && is_array($block['innerBlocks']) && !empty($block['innerBlocks'])): ?>
                                            <div style="width:100%; padding:16px;">
                                                <?php 
                                                foreach ($block['innerBlocks'] as $inner_index => $inner_block):
                                                    $field_id = $inner_block['attrs']['field_id'] ?? null;
                                                    
                                                    if (!$field_id) {
                                                        error_log('[Email Summary] ⚠️ No field_id in inner block #' . $inner_index);
                                                        continue;
                                                    }
                                                    
                                                    $item_output = booking_apply_render_data($inner_block, $quote_id, $field_id);
                                                    
                                                    if ($item_output):
                                                        echo $item_output; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                                    endif;
                                                endforeach; ?>
                                            </div>
                                        <?php else: ?>
                                            <?php error_log('[Email Summary] ⚠️ Step ' . $step . ' has no inner blocks or inner blocks is not array'); ?>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <?php endforeach; ?>
                </table>
            <?php endif; ?>
            
            <table class="email-table email-bg-orange email-rounded" style="margin-top:20px;">
                <tr>
                    <td style="padding-left:20px; padding-top:16px; display:flex; align-items:center;">
                        <span class="w-50p h-50p flex items-center justify-center rounded-full" style="background:#fff;">
                            <img src="<?= esc_url(WPCBOOKING_PLUGIN_URL . 'assets/img/coins.png') ?>" width="25" height="25" style="display:block; margin:auto; border:0;" alt="" />
                        </span>
                    </td>
                </tr>
                <tr>
                    <td style="padding-left:20px; padding-bottom:20px; color:#fff;">
                        <table class="email-table" style="width:100%; margin-left:0;">
                            <tr>
                                <td style="padding:12px 0; border-bottom:1px dashed #fff;">
                                    <span class="email-p25" style="color:#fff;"><?= esc_html__('Tjenester', 'wpcbooking') ?></span>
                                </td>
                                <td style="padding:12px 0; padding-right:10px; border-bottom:1px dashed #fff; text-align:right;">
                                    <span class="email-bold email-p25" style="color:#fff;">
                                        <?= esc_html(number_format($total_base, 0, ',', '.')) ?><span> kr.</span>
                                    </span>
                                </td>
                            </tr>
                            
                            <?php if ($total_percentage != 0): ?>
                            <tr>
                                <td style="padding:12px 0; border-bottom:1px dashed #fff;">
                                    <span class="email-p25" style="color:#fff;">
                                        <?= $total_percentage > 0 ? esc_html__('Addition', 'wpcbooking') : esc_html__('Discount', 'wpcbooking') ?>
                                    </span>
                                </td>
                                <td style="padding:12px 0; padding-right:10px; border-bottom:1px dashed #fff; text-align:right;">
                                    <span class="email-bold email-p25" style="color:#fff;">
                                        <?= $total_percentage > 0 ? '+' : '' ?><?= esc_html(number_format($total_percentage, 0, ',', '.')) ?><span> kr.</span>
                                    </span>
                                </td>
                            </tr>
                            <?php endif; ?>
                            
                            <tr>
                                <td style="padding:12px 0;">
                                    <span class="email-p30 email-bold" style="color:#fff;"><?= esc_html__('Total', 'wpcbooking') ?></span>
                                </td>
                                <td style="padding:12px 0; padding-right:10px; text-align:right;">
                                    <span class="email-p30 email-bold" style="color:#fff;">
                                        <?= esc_html(number_format($total_quote, 0, ',', '.')) ?><span> kr.</span>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

