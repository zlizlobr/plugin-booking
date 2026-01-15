<?php

/**
 * Template for displaying a single step item in the quote summary
 * 
 * @package Wpcbooking
 * @since 1.0.0
 * 
 * @var int $step Step number
 * @var string $title Step title
 * @var string $label Step label
 * @var float $value_step Total step value
 * @var string $currency Currency symbol
 * @var int|null $thumbnail_id Thumbnail attachment ID or URL
 * @var string $item_output Rendered inner blocks HTML
 * @var bool $show_calculations Whether to show price
 */

defined('ABSPATH') || exit;

?>
<li class="aff-summary-item min-h-[70px] flex flex-col bg-th-grey-lighter rounded-[35px]">
    <!-- 💾 Hidden inputs -->

    <input type="hidden" data-step="<?= esc_attr($step ?? '') ?>" name="total_price_percentage_<?= esc_attr($step ?? '') ?>" value="0" />
    <!-- 📦 Wrapper for main content (icon + text + buttons) -->
    <div class="flex flex-col medium:flex-row justify-between items-center w-full rounded-[35px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">

        <!-- 🎂 Icon + step name -->
        <div class="min-h-[66px] w-full medium:w-4/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
            <div class="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
                <div style="--mask-img: url('<?= esc_url($thumbnail_src ?? '') ?>')" class="w-25p h-25p bg-white cs-mask"></div>
            </div>
            <div class="af-p20 text-th-grey"><?= esc_html(strip_tags($label ?? '')); ?></div>
        </div>

        <!-- 🛠 Edit button and price -->
        <div class="flex justify-end items-center gap-x-4 pr-30p max-medium:p-30p">
            <?php if (!empty($show_calculations) && isset($value_step) && '0' != $value_step): ?>
                <div class="aff-step-price af-p20-bold text-black uppercase">
                    <?= esc_html($value_step) ?><span class="currnency_symbol"> <?= esc_html($currency ?? '') ?></span>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- 🧾 USER DATA - always BELOW the main block -->
    <?php if (!empty($item_output)) : ?>
        <div class="user-data w-full p-4 shadow-lg mt-4 rounded-[35px]">
            <?= $item_output; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
            ?>
        </div>
    <?php endif; ?>

</li>