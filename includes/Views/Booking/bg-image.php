<div class="col-span-full medium:col-[10/span_3] self-start relative">
    <div class="absolute -z-10 left-0 top-0 w-[44vw] h-[62vw]">
        <!-- BG ELEMENT -->
        <img src="<?= get_template_directory_uri() . "/assets/img/form/form-step-bg.svg" ?>">
    </div>
    <div data-id="<?= $step ?>" class="js-glass-wrap  w-[170px] h-[649px] mx-auto  [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain">
     <?= file_get_contents($bg_image); ?>
    </div>
</div>