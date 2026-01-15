<?php
/**
 * Template for displaying cart totals in the quote summary
 * 
 * @package Wpcbooking
 * @since 1.0.0
 * 
 * @var string $label_price Price label
 * @var float $contents_total Contents total price (base total)
 * @var float $percentage_total Percentage adjustments total
 * @var float $shipping_total Shipping total price
 * @var string $label_total Total label
 * @var float $cart_total Cart total price
 * @var string $currency Currency symbol
 * @var array $blocks Prepared blocks with step data
 * @var int $quote_id Quote ID for fetching items
 */

defined('ABSPATH') || exit;

$total_base = $contents_total ?? 0;
$total_percentage = $percentage_total ?? 0;
$total_quote = $total_base + $total_percentage;
?>
<div id="cart" class="bg-th-orange rounded-[35px] mt-5">
    <div class="flex items-center gap-x-5 pl-20p large:pl-40p pt-4">
        <div class="w-50p h-50p rounded-full bg-white flex justify-center items-center">
            <a href="" style="--mask-img: url('<?= esc_url(get_template_directory_uri() . '/assets/img/form/coins.svg') ?>')" class="w-25p h-25p bg-th-orange cs-mask"></a>
        </div>
    </div>
    <div class="ml-20p large:ml-100p pb-20p text-white">
        
        <?php
        // Render step items (similar to CartTotal.jsx)
        if (isset($blocks) && is_array($blocks) && !empty($blocks)):
            foreach ($blocks as $step => $block):
                $label = $block['label'] ?? sprintf(__('Step %d', 'wpcbooking'), $step);
                $price_step = $block['value'] ?? 0;
                
                // Skip steps with no price
                if ($price_step <= 0) continue;
                
                // Get items for this step
                $items = [];
                if (isset($quote_id) && isset($block['innerBlocks']) && is_array($block['innerBlocks'])) {
                    foreach ($block['innerBlocks'] as $inner_block) {
                        $field_id = $inner_block['attrs']['field_id'] ?? null;
                        if (!$field_id) continue;
                        
                        $item_data = get_post_meta($quote_id, $field_id, true);
                        if (is_array($item_data)) {
                            $items[] = $item_data;
                        }
                    }
                }
                ?>
                <div class="mb-3">
                    <div class="af-p18-bold text-white mb-1.5"><?= esc_html($label) ?></div>
                    
                    <?php if (!empty($items)): ?>
                        <div class="ml-4">
                            <?php foreach ($items as $item):
                                $item_name = '';
                                $item_total = 0;
                                
                                // Extract item data based on structure
                                if (isset($item['label'])) {
                                    $item_name = $item['label'];
                                } elseif (isset($item['name'])) {
                                    $item_name = $item['name'];
                                } elseif (isset($item['title'])) {
                                    $item_name = $item['title'];
                                }
                                
                                if (isset($item['price'])) {
                                    $item_total = (float) $item['price'];
                                } elseif (isset($item['value'])) {
                                    $item_total = (float) $item['value'];
                                }
                                
                                if (isset($item['quantity'])) {
                                    $item_total *= (int) $item['quantity'];
                                }
                                
                                // Skip items with no price
                                if ($item_total <= 0) continue;
                                ?>
                                <div class="py-2 border-b border-dashed border-white/30 last:border-b-0">
                                    <span class="af-p16 text-white/90 leading-tight flex items-baseline gap-1">
                                        <?= esc_html($item_name) ?>
                                    </span>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                    
                    <span class="af-p16-bold text-white leading-tight block text-right mr-50p">
                        <?= esc_html(number_format($price_step, 0, ',', '.')) ?>
                        <span class="currnency_symbol text-white/80 ml-1 text-sm leading-none">
                            <?= esc_html($currency ?? '') ?>
                        </span>
                    </span>
                </div>
            <?php endforeach;
        endif;
        ?>
        
        <input type="hidden" name="total_price" value="<?= esc_attr($total_base) ?>">
        <div class="flex justify-between items-center py-3 border-b border-dashed border-white">
            <span class="af-p25-reg"><?= esc_html($label_price ?? __('Tjenester', 'wpcbooking')) ?></span>
            <span class="aff-total-contents af-p25-bold mr-50p">
                <?= esc_html($total_base) ?><span class="currnency_symbol"> <?= esc_html($currency ?? '') ?></span>
            </span>
        </div>
        
        <?php if (isset($total_percentage) && $total_percentage != 0): ?>
            <div class="flex justify-between items-center py-3 border-b border-dashed border-white">
                <span class="af-p25-reg">
                    <?= $total_percentage > 0 ? esc_html__('Tilføjelse', 'wpcbooking') : esc_html__('Rabat', 'wpcbooking') ?>
                </span>
                <span class="af-p25-bold mr-50p">
                    <?= $total_percentage > 0 ? '+' : '' ?><?= esc_html(number_format($total_percentage, 0, ',', '.')) ?>
                    <span class="currnency_symbol"> <?= esc_html($currency ?? '') ?></span>
                </span>
            </div>
        <?php endif; ?>
        
        <?php if (isset($shipping_total) && $shipping_total > 0): ?>
            <input type="hidden" name="total_shipping_price" value="<?= esc_attr($shipping_total) ?>">
            <div class="flex justify-between items-center py-3 border-b border-dashed border-white">
                <span class="af-p25-reg"><?= esc_html__('Levering', 'wpcbooking') ?></span>
                <span class="af-p25-bold mr-50p">
                    <?= esc_html($shipping_total) ?><span class="currnency_symbol"> <?= esc_html($currency ?? '') ?></span>
                </span>
            </div>
        <?php endif; ?>
        
        <div class="flex justify-between items-center py-3">
            <span class="af-p30"><?= esc_html($label_total ?? __('Total', 'wpcbooking')) ?></span>
            <span class="aff-total-price af-p30 mr-50p">
                <?= esc_html($cart_total ?? 0) ?><span class="currnency_symbol"> <?= esc_html($currency ?? '') ?></span>
            </span>
        </div>
    </div>
</div>

