<?php
$attributes = $attributes ?? [];
$block_icon = $block_icon ?? 'calculator';
$label = $label ?? __('Number Input', 'wpcbooking');
$advanced = $advanced ?? [];
?>
<div class="booking-number-input-block flex mb-1 items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200 "
data-attributes="<?php echo esc_attr(json_encode($attributes)); ?>">
    <div class="flex items-center gap-4">
        <span class="dashicons dashicons-<?php echo esc_attr($block_icon); ?> text-xl text-gray-800"></span>
        <span class="font-semibold text-gray-800"><?php echo esc_html($label); ?></span>
    </div>
    <?php if (isset($advanced['required']) && $advanced['required']): ?>
        <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
            <?php _e('Required', 'wpcbooking'); ?>
        </span>
    <?php endif; ?>
</div>
