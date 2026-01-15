<?php

/**
 * Booking Form: Template
 * 
 * This template renders the booking form
 * All variables are prepared in the prepare_block method
 */
// Pokud renderujeme v editoru, zobrazíme placeholder
if (isset($is_editor) && $is_editor) {
?>
    <div class="flex mb-1 items-center justify-between py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
        <div class="flex items-center gap-4">
            <span class="dashicons dashicons-<?php echo esc_attr($block_icon ?? 'email-alt'); ?> text-xl text-gray-800"></span>
            <span class="font-semibold text-gray-800"><?= __('Booking Form', 'wpcbooking'); ?></span>
        </div>
        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            <?= __('Editor Preview', 'wpcbooking'); ?>
        </span>
    </div>
<?php
    return; 
}

// Normální renderování pro frontend
if (!isset($booking_id)) {
    _e('Booking form is not set', 'wpcbooking');
    return;
}

?>
<script type="text/javascript">
			window.wpcbookingOptions = <?= wp_json_encode($booking); ?>;
		</script>
<div class="booking-form"
    id="booking-app"
    data-booking-id="<?= esc_attr($booking_id) ?>"
    data-hash="<?= esc_attr($hash ?? '') ?>"
    data-general="<?= esc_attr(wp_json_encode($general ?? [], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT)) ?>"
    data-open-in-new-window="<?= esc_attr(!empty($open_in_new_window) ? '1' : '0') ?>"
    data-target-url="<?= esc_attr($target_url ?? '') ?>">
</main>