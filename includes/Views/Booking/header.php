<div class="col-span-full medium:col-[1/span_8] medium:-mr-th-gap self-start">
    <div class="grid relative">
        <div class="col-span-full row-span-full max-small:-mx-cont-px small:absolute right-0 h-full small:w-[110vw] medium:w-[70vw] bg-gradient-to-r from-th-orange to-th-pink rounded-r-full">
            <!-- h1 gradient background -->
        </div>
        <h1 class="col-span-full row-span-full pt-40p pb-50p af-h1 text-white max-medium:text-center relative z-20">
            <?= esc_html($title) ?>
        </h1>
    </div>
</div>
<div class="col-span-full medium:col-[9/span_4] medium:ml-th-gap">
    <div class="af-p28 text-th-pink text-right">
        <?= $colored_text ?? null ?>
    </div>
    <div class="af-p20-bold text-black text-right mt-2">
        <?= $black_text ?? null ?>
    </div>
</div>
<div class="col-span-full medium:col-[1/span_10] medium:-mr-th-gap aff-form-icons-wrapper">
    <!-- Header icons -->
    <?php /*booking_get_template(
        'section/icons.php',
        [
            'icons' => aff_get_booking_icons($form_id),
            'step' => $step
        ]
    ); */ ?>
</div>