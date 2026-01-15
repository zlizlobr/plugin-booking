    <div class="flex mb-1 items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200 ">
        <div class="flex items-center gap-4">
            <span class="dashicons dashicons-<?php echo esc_attr($block_icon); ?> text-xl text-gray-800"></span>
            <span class="font-semibold text-gray-800"><?php _e('Icon Selection', 'wpcbooking'); ?></span>
        </div>
        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            <?php echo sprintf(__('%d icons', 'wpcbooking'), count($icons_repeater)); ?>
        </span>
    </div>