<?php
if (!is_array($icons)) return;
$quote_hash = aff_get_quote_hash();
?>
<ul class="aff-form-icons flex gap-x-10p -translate-y-15p max-medium:px-cont-px py-3 max-medium:-mx-cont-px max-medium:overflow-x-auto">
    <?php foreach ($icons as $i => $icon): ?>
        <?php if (aff_is_available_step($i, $quote_hash)): ?>
            <?php echo aff_render_step_icon($icon, $i, $step); ?>
        <?php endif; ?>
    <?php endforeach; ?>
</ul>