<?php

use Wpcbooking\Models\BlocksModel;

/**
 * Template for singel Booking CPT
 * 
 */
$blocks = BlocksModel::get_step_blocks(get_the_ID());
?>
<!DOCTYPE html>
<html lang="cs">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Before launch, update favicon files https://realfavicongenerator.net and update the file. Meta and favicon loads from  00_theme-setup.php  -->
  <?php wp_head(); ?>
</head>

<body>
  <?php

  if (!$blocks) return;
  ?>
  <main class="alignfull cs-gutenberg">
    <div class="">
    <div class="booking-app">
        <!-- Booking App will be rendered here -->
        <div 
            id="booking-app"
            data-form-id="<?php echo get_the_ID(); ?>"
            data-step="1"
            data-title="Event Booking"
            data-colored-text="Plan your perfect event"
            data-black-text="Step by step process"
            data-edit-mode="false"
        ></div>
    </div>
    </div>
  </main>
  <?php
  //get_template_part('includes/footer');
  get_template_part('includes/footer-minimal');
