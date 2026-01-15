<?php
$group_thankyou = $fields['group_thankyou'];
$button_link = $group_thankyou['button_link'] ?? [];
$bg_image_url = isset($group_thankyou['image_id']) && !empty(wp_get_attachment_url($group_thankyou['image_id'])) ? wp_get_attachment_url($group_thankyou['image_id']) : false;
?>
<section class="py-200p overflow-hidden">
    <div class="booking-thankyou cs-container cs-grid relative">
        <div class="col-span-full row-span-full max-small:-mx-cont-px small:absolute right-0 h-full w-[110vw] bg-gradient-to-r from-th-orange to-th-pink rounded-r-[80px]">
            <!-- h1 gradient background -->
        </div>
        <div class="col-[7/span_5] mx-th-gap row-span-full self-center">
            <div class="aspect-w-[580] aspect-h-[740] cs-containbox">
                <?php if ($bg_image_url): ?>
                    <img src="<?= $bg_image_url ?>" alt="">
                <?php endif; ?>
            </div>
        </div>
        <div class="col-[2/span_8] row-span-full py-170p text-white relative z-20">
            <h1 id="thankyou" class="af-h1 font-black relative  before:absolute before:top-0 before:-left-120p before:w-85p before:h-85p before:rounded-full before:bg-"thankyouclass="af-h1 font-black relative  before:absolute before:top-0 before:-left-120p before:w-85p before:h-85p before:rounded-full before:bg-th-yellow">
                <?= $group_thankyou["heading"] ?? null ?>
            </h1>
            <div class="w-3/5 mt-80p font-poppins text-2xl leading-[3rem] font-light">
                <?= $group_thankyou["text"] ?? null ?>
            </div>
        </div>
        <div class="col-[2/span_8] row-span-full relative z-20">
            <div class="absolute left-0 bottom-0 translate-y-[42%]">
                <?php
                $button_link['title'] = $group_thankyou['button_label'] ?? $button_link['title'];
                aff_get_template(
                    'parts/link.php',
                    [
                        'class' => "cs-form-button-prev w-fit",
                        'acf' => $button_link ?? null
                    ]
                );
                ?>
            </div>
        </div>
    </div>
</section>