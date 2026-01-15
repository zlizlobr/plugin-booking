
<div class="bg-th-orange rounded-[35px] mt-5">
    <div class="flex items-center gap-x-5  pl-20p large:pl-40p pt-4">
        <div class="w-50p h-50p rounded-full bg-white flex justify-center items-center">
             <div style="-webkit-mask: url('<?= WPCBOOKING_PLUGIN_URL ?>assets/img/coins.svg') no-repeat center; mask: url('<?= WPCBOOKING_PLUGIN_URL ?>assets/img/coins.svg') no-repeat center; -webkit-mask-size: contain; mask-size: contain;" class="w-25p h-25p bg-th-orange cs-mask"></div>
        </div>
    </div>
    <div class="ml-20p large:ml-100p pb-20p text-white">
        <input type="hidden" name="total_price" value="<?= esc_attr($contents_total) ?>">
        <div class="flex justify-between items-center py-3  border-b border-dashed border-white">
            <span class="af-p25-reg"><?= $label_price ?></span>
            <span class="af-p25-bold mr-50p">
                <span class="aff-total-contents"><?= $contents_total ?? 0; ?></span>
                <span class="currnency_symbol"> <?= $currency_symbol ?></span>
            </span>
        </div>
        <?php
        // dev: otázka jestli zobrazovat když je 0??
        if (isset($shipping_total) && $shipping_total > 0): ?>
            <input type="hidden" name="total_shipping_price" value="<?= esc_attr($shipping_total) ?>">
            <div class="flex justify-between items-center py-3  border-b-4 border-white">
                <span class="af-p25-reg"><?= __('Delivery', 'aff'); ?></span>
                <span class="af-p25-bold mr-50p"><?= $shipping_total ?>
                <span class="currnency_symbol"> <?= $currency_symbol ?>
            </span>
            </div>
        <?php endif; ?>
        <div class="flex justify-between items-center py-3">
            <span class="af-p30"><?= $label_total ?></span>
            <span class="af-p30 mr-50p">
                <span class="aff-total-price"><?= $cart_total ?? 0 ?></span> 
                <span class="currnency_symbol"><?= $currency_symbol ?></span>
            </span>
        </div>
    </div>
</div>