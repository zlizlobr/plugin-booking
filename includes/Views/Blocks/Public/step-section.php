<?php

/**
 * Booking Step Section: Template
 * 
 * This template renders the step section
 * All variables are prepared in the prepare_block_attributes method
 */

?>
<!-- Step Section Container -->
<div class="col-span-full">
    <div class=" js-step-section flex items-center gap-4 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200" data-number-blocks="<?php echo esc_attr(json_encode($number_blocks)); ?>">
        <?php if (strpos($icon_url, 'http') === 0 || strpos($block_icon, '/') === 0): ?>
            <img src="<?php echo esc_url($icon_url); ?>" alt="<?php echo esc_attr($step_label); ?>" class="w-6 h-6">
        <?php endif; ?>
        <span class="text-lg font-semibold text-gray-800"><?= $step_label ?></span>
    </div>