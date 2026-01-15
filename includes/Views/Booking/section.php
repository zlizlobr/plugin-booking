<?php

use Wpcbooking\Controllers\BookingController;

$booking_controller = BookingController::get_instance($booking_id);
$is_in_footer_class =  ($step == '1' && !is_page_template('page-no-distractions.php')) ? "aff-is-in-footer" : "";
?>
<section <?= render_ID_attr($step ?? null) ?> class="pb-55p lg:pb-100p overflow-hidden <?= $is_in_footer_class  ?>">
    <div class="cs-container cs-grid items-center gap-y-7 large:gap-y-10">
        <!-- Header -->
        <?= $booking_controller->get_header_template($step); ?>
        <!-- Content -->
        <?= $booking_controller->get_content_template($step); ?>
        <!-- Background -->
        <?= $booking_controller->get_background_template($step); ?>
    </div>
</section>