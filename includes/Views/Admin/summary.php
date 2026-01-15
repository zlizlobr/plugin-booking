<?php

/**
 * Template for edit Quote metabox
 */
?>
<section id="admin-edit-quote" class="py-50p overflow-hidden <?= $edit_summary === false ? 'quote-no-edit' : ''; ?>">
    <div class="cs-container cs-grid items-center">
        <div class="col-span-full medium:col-[1/span_9] medium:self-start">
            <div class="min-h-[70px] flex justify-between items-center  bg-th-grey rounded-[35px]">
                <div class="flex items-center gap-x-5 pl-40p">
                    <div style="-webkit-mask: url('<?= WPCBOOKING_PLUGIN_URL ?>assets/img/summary.svg') no-repeat center; mask: url('<?= WPCBOOKING_PLUGIN_URL ?>assets/img/summary.svg') no-repeat center; -webkit-mask-size: contain; mask-size: contain;" class="w-11 h-10 bg-white"></div>
                    <div class="af-p20-bold text-white uppercase"><?= $label_summary; ?></div>
                </div>
            </div>
            <?php if (is_array($steps)) : ?>
                <?php wp_nonce_field('edit_summary_quote', 'edit_summary_quote_nonce'); ?>
                <ul class="aff-summary-list space-y-5 mt-5">
                    <?php foreach ($steps as $step => $attrs) : ?>
                        <?= booking_get_template(
                            'Admin/Summary/item',
                            [
                                'step_section' =>  $step_sections[$step],
                                'step' => $step,
                                'edit_price' => true,
                                'label_summary' => $attrs['label_summary'] ?? sprintf(__('List of choices from step %s', 'wpcbooking'), $step),
                                'thumbnail_src' => is_numeric($attrs['thumbnail_id']) ? wp_get_attachment_image_url($attrs['thumbnail_id'], "full") : WPCBOOKING_PLUGIN_URL . 'assets/img/info.svg',
                                'value' => null,
                                'currency_symbol' => $currency_symbol
                            ]
                        ); ?>
                    <?php endforeach; ?>
                    <li class="aff-add-new-row min-h-[70px] flex flex-col medium:flex-row justify-stretch medium:justify-between max-medium:px-1 items-center  bg-th-grey-lighter rounded-[35px]">
                        <div class="min-h-[66px] w-full medium:w-4/5 flex items-center gap-x-5  pl-20p large:pl-40p  m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
                            <div class="w-50p h-50p rounded-full bg-th-orange-light  flex justify-center items-center shrink-0">
                                <div style="--mask-img: url('<?= WPCBOOKING_PLUGIN_URL . 'assets/img/info.svg' ?>')"
                                    class="w-25p h-25p bg-white cs-mask"></div>
                            </div>
                            <div class="af-p20 text-th-grey">
                                <?= __('Add fee', 'aff'); ?>
                                <input type="text" name="new-row-name" value="" placeholder="<?= __('Label', 'aff'); ?>">
                                <input type="number" name="new-row-price" value="0" placeholder="<?= $currency_symbol; ?>">

                            </div>
                        </div>
                        <div class="flex justify-end items-center gap-x-4  pr-30p max-medium:p-30p">
                            <a id="aff-add-new-row" data-count-step="<?= count($steps) + 1 ?>" style="--mask-img: url('<?= AFF_URL . 'assets/img/plus.svg'; ?>')" class="w-25p h-25p bg-th-orange-light cs-mask cursor-pointer"></a>
                        </div>
                    </li>
                </ul>
            <?php endif; ?>
            <?php
            //dev: pořešit dopravu
            $shipping_total = 0;
            ?>
            <input type="hidden" name="total_base" value="<?= $contents_total ?>">
            <?= booking_get_template(
                'Admin/Summary/cart',
                [
                    'label_price' =>  $label_price,
                    'contents_total' => $contents_total,
                    'shipping_total' => $shipping_total,
                    'label_total' => $label_total,
                    'cart_total' => $contents_total + $shipping_total,
                    'currency_symbol' => $currency_symbol
                ]
            ); ?>
        </div>
    </div>
</section>