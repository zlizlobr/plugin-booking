<?php
$form = get_post($form_id);
$quote_id = aff_exist_quote_by_hash(aff_get_quote_hash($form_id));
$shipping_total = 0;
// Get form currency
$currency_code = quote_currency($quote_id);
$currency = get_woocommerce_currency_symbol($code ?? 'DKK');

if (empty($quote_id) || !get_post($quote_id)) {
    return;
}
$blocks = get_booking_blocks($form_id) ?? false;
$form_options = aff_get_form_options($form_id);
$summary_options = aff_get_summary_options($form_id);
?>
<div class="col-span-full medium:col-[1/span_9] medium:self-start mt-30p">
    <div class="w-11/12  af-p30-light text-black">
        <?= $summary_options["text"] ?? null ?>
    </div>
    <div class="mt-75p">
        <div class="min-h-[70px] flex justify-between items-center  bg-th-grey rounded-[35px]">
            <div class="flex items-center gap-x-5  pl-40p">
                <div style="--mask-img: url('<?= get_template_directory_uri(); ?>/assets/img/form/summary.svg')" class="w-11 h-10 bg-white cs-mask"></div>
                <div class="af-p20-bold text-white uppercase"><?= __('summary of your event', 'wpcbooking'); ?></div>
            </div>
        </div>
        <?php if (is_array($blocks)) : ?>
            <?php $contents_total =  0;
            ?>
            <ul class="space-y-5 mt-5">
                <?php
                $total_quote = 0;
                $total_base = calculation_quote_base_total($blocks, $quote_id);
                foreach ($blocks as $step => $block) :
                    if (!aff_is_available_step($step, $quote_id)) continue; ?>
                    <!--- item summary step --->
                    <?php
                    $data = aff_parse_block_setting($block);
                    if (isset($block['innerBlocks']) && is_array($block['innerBlocks'])):

                        $price_step = $value_step = 0;
                        $item_output = '';
                        foreach ($block['innerBlocks'] as $inner_block):
                            $key = aff_get_block_id($inner_block);
                            if (!$key) continue;
                            $value =  aff_quote_get_value($key, $quote_id) ?? '';
                            if (is_array($value) || is_object($value)) {
                                $value = json_encode($value);
                            }
                            if (isset($key) && isset($value)):
                    ?>
                                <input type="hidden" name="<?= $key ?>" value="<?= $value ?>">
                                <?php
                            endif;
                            $price_block = aff_apply_price_data($inner_block, $quote_id, $key);
                            $price_step += $price_block['price'] ?? 0;
                            $value_step += $price_block['price'] ?? 0;
                            if (isset($price_block['price_increase'])  && !empty($price_block['price_increase'])) {
                                $price_increase = $price_block['price_increase'];
                                // Match price increase
                                if (is_array($price_increase) && !empty($price_increase)) {
                                    foreach ($price_increase as $operation) {
                                        if (
                                            isset($operation['operation'], $operation['price_increase']) &&
                                            is_numeric($operation['price_increase'])
                                        ) {
                                            $percentage = 0;
                                            switch ($operation['operation']) {
                                                case 'add':
                                                    $percentage += $operation['price_increase'];
                                                    break;
                                                case 'subtract':
                                                    $percentage -= $operation['price_increase'];
                                                    break;
                                            }
                                        }
                                    }
                                    $value_step  += 0 != $percentage || 0 != $total_base ?  $total_base * ($percentage / 100) : 0;
                                }
                            }

                            /**
                             * Render extra data from Blocks
                             */
                            if (isset($price_block['inputs']) && is_array($price_block['inputs'])) {
                                foreach ($price_block['inputs'] as $input_name => $child_inputs) {
                                    if (!is_array($child_inputs) && !is_object($child_inputs)) continue;
                                    $child_value = json_encode($child_inputs);
                                ?>
                                    <input type="hidden" name="<?= $key . '_' . $input_name ?>" value="<?= htmlspecialchars($child_value) ?>">
                            <?php
                                }
                            }
                            ?>
                    <?php
                            /**
                             * Render user data 
                             */
                            $item_output .= aff_apply_render_data($inner_block, $quote_id, $key) ?? '';
                        endforeach;
                        $total_quote += $value_step;
                    endif;
                    aff_get_template(
                        'summary/step-item.php',
                        [
                            'title' =>  sprintf('%s %s', isset($data['label_summary']) && '' !== $data['label_summary'] ? $data['label_summary'] : __('List of choices from step', 'AFF'), $data['title'] ?? ''),
                            'step' => $step,
                            'value_step' =>  $value_step,
                            'price_step' =>  $price_step,
                            'thumbnail_id'     => $data['thumbnail_id'] ?? null,
                            'edit_button' => true,
                            'currency' => $currency,
                            'show_calculations' => $summary_options['show_calculations'] ?? 0,
                            'item_output' =>  $item_output

                        ]
                    ); ?>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        <!--- Cart Total price --->
        <input type="hidden" name="total_base" value="<?= $total_base ?>">
        <?php
        aff_get_template(
            'summary/cart.php',
            [
                'label_price' =>  $summary_options['label_price'] ?? __('Price', 'wpcbooking'),
                'contents_total' => $total_quote,
                'shipping_total' => $shipping_total,
                'label_total' => $summary_options['label_total'] ?? __('Price Total', 'wpcbooking'),
                'currency' => $currency,
                'cart_total' => $total_quote + $shipping_total
            ]
        ); ?>
        <!--- Term and Conditions --->
        <div class="cs-privacy  mt-12 py-6 border-y border-th-grey-ultralight">
            <?php if (isset($summary_options['terms']) && is_array($summary_options['terms']) && !empty($summary_options['terms'])): ?>
                <?php foreach ($summary_options['terms'] as $row): ?>
                    <?php if (!isset($row['info_label']) && !isset($row['page_id']) && !get_post($row['page_id'])) continue; ?>

                    <?php
                    $term_page_title = get_the_title($row['page_id']);
                    $link =  sprintf('<a href="%s" target="_BLANK">%s</a>',  get_permalink($row['page_id']), $term_page_title);
                    $checkbox_name = sanitize_title($term_page_title);
                    ?>
                    <div data-name="<?= $checkbox_name ?>">
                        <input type="checkbox" data-label-required="<?= esc_html(__('You must agree to the terms and conditions.', 'AFF')) ?>" data-label="<?= esc_html($term_page_title) ?>" value="yes" id="<?= $checkbox_name ?>" name="terms_conditions[<?= $checkbox_name ?>]" <?= $row['required'] == 1 ? 'required' : ''; ?> <?= isset($_POST['terms_conditions'][$checkbox_name]) && $_POST['terms_conditions'][$checkbox_name] === 'yes' ? 'checked' : ''; ?> />
                        <span class="af-p18">
                            <?= (strpos($row['info_label'], '%s') !== false) ? sprintf($row['info_label'], $link) : $row['info_label']; ?>
                        </span>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <div data-name="mutions-errors"></div>
    </div>
    <div class="w-full mt-40p large:mt-75p  flex justify-center medium:justify-between gap-4 flex-wrap medium:flex-nowrap">
        <button class="cs-form-button-prev max-medium:order-last" id="aff_prev_button" name="aff_prev_button"><?= isset($form_options['prev']) && $form_options['prev'] !== '' ? $form_options['prev']  : __('Previous step', 'wpcbooking') ?></button>

        <button type="submit" class="aff-form-button-submit" name="aff_send_order" id="aff_send_order">
            <?= $summary_options["send_button_text"] ?? null ?>
            <?php $icon = wp_get_attachment_url($summary_options['send_button_icon']); ?>
            <span class="button-icon" style="-webkit-mask-image: url(<?= $icon ?>);
  mask-image: url(<?= $icon ?>);"></span>
        </button>
    </div>
</div>