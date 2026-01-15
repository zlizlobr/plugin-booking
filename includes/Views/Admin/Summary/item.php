<li data-step="<?= $step; ?>" class="aff-summary-item min-h-[70px] flex flex-col medium:flex-col justify-stretch medium:justify-between max-medium:px-1 items-stretch bg-th-grey-lighter rounded-[35px] pb-marker-bottom-30">
    <div class="flex flex-row w-full rounded-[35px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
        <!-- Icon and Label item -->
        <div class="min-h-[66px] w-3/5 flex items-center gap-x-5  pl-20p large:pl-40p  m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
            <div class="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
                <div style="-webkit-mask: url('<?= $thumbnail_src ?>') no-repeat center; mask: url('<?= $thumbnail_src ?>') no-repeat center; -webkit-mask-size: contain; mask-size: contain;" class="w-25p h-25p bg-white "></div>
            </div>
            <div class="w-full af-p20 text-th-grey inline-flex flex-row items-center">
                <?php if (isset($edit_price) && $edit_price === true): ?>
                    <span class="delete-item-x w-4 h-4 bg-th-orange-light flex justify-center items-center rounded-full cursor-pointer text-white mr-2 text-xs">X</span>
                    <span class="inline-block"><?= $label_summary; ?></span>
                <?php else: ?>
                    <input type="text" name="label_step_<?= $step ?>" value="<?= strip_tags($label_summary) ?>"
                        class="quote_label w-full h-[50px] bg-transparent" />
                <?php endif; ?>
            </div>
        </div>
        <!-- Price item -->
        <div class="price-item flex items-center gap-x-4 ">
            <div class="<?= (isset($value) && 0 != $value) ||  (isset($price_percentage) && 0 !=  $price_percentage) ? '' : 'hidden'; ?> aff-step-price absolute right-[70px] af-p20-bold text-black uppercase flex items-center gap-x-1 whitespace-nowrap ">
                <span class="block_price_products"><?= ($value ?? 0) + ($price_percentage ?? 0) ?></span>
                <span class="currnency_symbol text-sm text-gray-500"> <?= $currency_symbol ?></span>
            </div>
            <input type="hidden" class="js-price-hidden" data-currency="<?= $currency_symbol ?>" data-step="<?= $step ?>" name="total_price_step_<?= $step ?>" value="<?= $value ?? 0 ?>">
            <input type="hidden" class="js-percentage-hidden" name="total_price_percentage_<?= $step ?>" value="<?= $price_percentage ?? 0 ?>">
            <input type="hidden" class="js-products-hidden" name="total_price_products_<?= $step ?>" value="<?= $price_products ?? 0 ?>">
        </div>
    </div>
    <?php //if ($edit_summary && !isset($edit_price)): ?>
        <div class="w-full block">
            <?php error_log('items'); ?>
            <?php foreach ($step_section as $block_name => $attrs) : ?>
                <?php
                 do_action('wpcbooking_validate_block_booking/' , $attrs);
                ?>
            <?php endforeach; ?>
        </div>
    <?php //endif; ?>
</li>