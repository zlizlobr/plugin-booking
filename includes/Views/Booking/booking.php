<form method="post" class="cs-ignore-gutenberg alignfull" id="aff_form">
    <input type="hidden" name="booking_id" value="<?= $booking_id ?? '' ?>">
    <input type="hidden" name="step" value="<?= $step ?? 1 ?>">
    <input type="hidden" name="quote_hash" value="<?= aff_get_quote_hash($form_id) ?>">
    <input type="hidden" name="booking_url"
        value="<?= aff_get_form_page($form_id) ? aff_get_form_page($form_id) : aff_get_current_url() ?>">
    <?php
    aff_get_template(
        'section.php',
        compact('step', 'form_id', 'edit_mode')
    );
    ?>
</form>