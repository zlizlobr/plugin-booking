<?php

namespace Wpcbooking\CPT;

use Wpcbooking\CPT\Booking;
use Wpcbooking\Traits\BookingHelperTrait;

/**
 * Booking options metabox configuration.
 * Defines all booking form options and settings.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class BookingOptions
{
    use BookingHelperTrait;
    /**
     * Initialize booking options.
     * Registers options metabox.
     *
     * @package Wpcbooking
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->register_options_page();
    }

    /**
     * Register booking options metabox using WPify Custom Fields.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function register_options_page()
    {

        wpify_custom_fields()->create_metabox([
            'id' => 'booking_options',
            'title' => __('Booking - Options', 'wpcbooking'),
            'post_types' => [Booking::SLUG],
            'priority' => \Wpify\CustomFields\Integrations\Metabox::PRIORITY_HIGH,
            'tabs' => apply_filters('booking_options_tabs', [
                'setup_basics' => __('Basic Setup', 'wpcbooking'),
                'form_design' => __('Form Design', 'wpcbooking'),
                'booking_flow' => __('Booking Flow', 'wpcbooking'),
                'integrations' => __('Integrations', 'wpcbooking'),
            ]),
            'items' => apply_filters('booking_options_items', array_merge(
                $this->get_setup_basics_options(),
                $this->get_form_design_options(),
                $this->get_booking_flow_options()
            )),
        ]);
    }

    /**
     * Get basic setup options configuration.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Basic setup options array
     */
    private function get_setup_basics_options(): array
    {
        return [
            '_booking_options_setup_basics' => [
                'id' => '_booking_options_setup_basics',
                'type' => 'group',
                'tab' => 'setup_basics',
                'items' => [
                    'create_condition' => [
                        'id' => 'create_condition',
                        'type' => 'toggle',
                        'label' => __('Create quote after field is filled', 'wpcbooking'),
                        'description' => __('When disabled, quote is created immediately for the form. When enabled, you can select a field below - the quote will be created only after that field is filled in.', 'wpcbooking'),
                        'default' => false,
                    ],
                    'condition_field' => [
                        'id' => 'condition_field',
                        'type' => 'select',
                        'label' => __('Field that triggers quote creation', 'wpcbooking'),
                        'description' => __('Select the field that must be filled in before the quote is created. The quote will be created automatically once this field is completed.', 'wpcbooking'),
                        'options' => $this->get_dynamic_booking_fields_options($this->get_booking_id(), null),
                        'conditions' => [
                            [
                                'field'     => '#.create_condition',
                                'condition' => '==',
                                'value'     => true,
                            ]
                        ]
                    ],
                    'default_page_id' => [
                        'id' => 'default_page_id',
                        'type' => 'post',
                        'label' => __('Default booking page', 'wpcbooking'),
                        'description' => __('Select the page where the booking form will be displayed', 'wpcbooking'),
                        'post_type' => ['page'],
                    ],
                    'store_location' => [
                        'id' => 'store_location',
                        'type' => 'google_maps',
                        'label' => __('Store Location', 'wpcbooking'),
                    ],
                ],
            ],
        ];
    }

    /**
     * Get form design options configuration.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Form design options array
     */
    private function get_form_design_options(): array
    {
        return [
            '_booking_options_form_design' => [
                'id' => '_booking_options_form_design',
                'type' => 'group',
                'tab' => 'form_design',
                'items' => [
                    'title' => [
                        'id' => 'title',
                        'type' => 'textarea',
                        'label' => __('Form title', 'wpcbooking'),
                        'description' => __('Main title displayed on the booking form', 'wpcbooking'),
                        'attributes' => [
                            'rows' => 2,
                        ],
                    ],
                    'colored_text' => [
                        'id' => 'colored_text',
                        'type' => 'textarea',
                        'label' => __('Colored text', 'wpcbooking'),
                        'description' => __('Text highlighted with color for better visibility', 'wpcbooking'),
                        'attributes' => [
                            'rows' => 3,
                        ],
                    ],
                    'black_text' => [
                        'id' => 'black_text',
                        'type' => 'textarea',
                        'label' => __('Black text', 'wpcbooking'),
                        'description' => __('Standard text in black color', 'wpcbooking'),
                        'attributes' => [
                            'rows' => 3,
                        ],
                    ],
                    'background_image' => [
                        'id' => 'background_image',
                        'type' => 'attachment',
                        'label' => __('Background image', 'wpcbooking'),
                        'description' => __('Image displayed as form background', 'wpcbooking'),
                        'attachment_type' => 'image',
                    ],
                    'next_button_text' => [
                        'id' => 'next_button_text',
                        'type' => 'text',
                        'label' => __('Next button text', 'wpcbooking'),
                        'description' => __('Text displayed on the continue button', 'wpcbooking'),
                    ],
                    'prev_button_text' => [
                        'id' => 'prev_button_text',
                        'type' => 'text',
                        'label' => __('Previous button text', 'wpcbooking'),
                        'description' => __('Text displayed on the back button', 'wpcbooking'),
                    ],
                    'save_button_text' => [
                        'id' => 'save_button_text',
                        'type' => 'text',
                        'label' => __('Save button text', 'wpcbooking'),
                        'description' => __('Text displayed on the save button', 'wpcbooking'),
                    ],
                ],
            ],
        ];
    }

    /**
     * Get booking flow options configuration.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return array Booking flow options array
     */
    private function get_booking_flow_options(): array
    {
        return [
            '_booking_options_summary_step' => [
                'id' => '_booking_options_summary_step',
                'type' => 'group',
                'tab' => 'booking_flow',
                'label' => __('Booking summary', 'wpcbooking'),
                'items' => [
                    'label_summary' => [
                        'id' => 'label_summary',
                        'type' => 'text',
                        'label' => __('Summary label', 'wpcbooking'),
                        'description' => __('Label displayed on the booking summary page', 'wpcbooking'),
                        'default' => __('Summary of your event', 'wpcbooking'),
                    ],
                    'summary_text' => [
                        'id' => 'summary_text',
                        'type' => 'wysiwyg',
                        'label' => __('Summary text', 'wpcbooking'),
                        'description' => __('Text displayed on the booking summary page', 'wpcbooking'),
                    ],
                    'show_calculations' => [
                        'id' => 'show_calculations',
                        'type' => 'toggle',
                        'label' => __('Show calculations', 'wpcbooking'),
                        'description' => __('Display detailed price calculations on summary', 'wpcbooking'),
                    ],
                    'label_price' => [
                        'id' => 'label_price',
                        'type' => 'text',
                        'label' => __('Price label', 'wpcbooking'),
                        'description' => __('Text for labeling the goods price', 'wpcbooking'),
                        'default' => 'Goods',
                    ],
                    'label_total' => [
                        'id' => 'label_total',
                        'type' => 'text',
                        'label' => __('Total price label', 'wpcbooking'),
                        'description' => __('Text for labeling the total price', 'wpcbooking'),
                        'default' => 'Your Price',
                    ],
                    'terms' => [
                        'id' => 'terms',
                        'type' => 'multi_group',
                        'label' => __('Terms and conditions', 'wpcbooking'),
                        'description' => __('Settings for terms and conditions agreements', 'wpcbooking'),
                        'items' => [
                            'info_label' => [
                                'id' => 'info_label',
                                'type' => 'text',
                                'label' => __('Information text', 'wpcbooking'),
                                'description' => __('Add %s for the page link', 'wpcbooking'),
                            ],
                            'page_id' => [
                                'id' => 'page_id',
                                'type' => 'post',
                                'label' => __('Page link', 'wpcbooking'),
                                'description' => __('Select the page with terms and conditions', 'wpcbooking'),
                                'post_type' => ['page'],
                            ],
                            'required' => [
                                'id' => 'required',
                                'type' => 'toggle',
                                'label' => __('Required', 'wpcbooking'),
                                'description' => __('User must agree before submission', 'wpcbooking'),
                                'default' => true,
                            ],
                        ],
                    ],
                    'send_button_icon' => [
                        'id' => 'send_button_icon',
                        'type' => 'attachment',
                        'label' => __('Send button icon', 'wpcbooking'),
                        'description' => __('Icon displayed on the send button', 'wpcbooking'),
                        'attachment_type' => 'image',
                    ],
                    'send_button_text' => [
                        'id' => 'send_button_text',
                        'type' => 'text',
                        'label' => __('Send button text', 'wpcbooking'),
                        'description' => __('Text displayed on the send booking button', 'wpcbooking'),
                        'default' => 'Send Order',
                    ],
                ],
            ],
            '_booking_options_thank_you_step' => [
                'id' => '_booking_options_thank_you_step',
                'type' => 'group',
                'tab' => 'booking_flow',
                'label' => __('Thank you page', 'wpcbooking'),
                'items' => [
                    'thank_you_heading' => [
                        'id' => 'thank_you_heading',
                        'type' => 'text',
                        'label' => __('Thank you page heading', 'wpcbooking'),
                        'description' => __('Main heading displayed after successful booking', 'wpcbooking'),
                    ],
                    'thank_you_text' => [
                        'id' => 'thank_you_text',
                        'type' => 'wysiwyg',
                        'label' => __('Thank you page text', 'wpcbooking'),
                        'description' => __('Text displayed on the thank you page', 'wpcbooking'),
                    ],
                    'thank_you_background' => [
                        'id' => 'thank_you_background',
                        'type' => 'attachment',
                        'label' => __('Background image', 'wpcbooking'),
                        'description' => __('Background image of the thank you page', 'wpcbooking'),
                        'attachment_type' => 'image',
                    ],
                    'thank_you_button_icon' => [
                        'id' => 'thank_you_button_icon',
                        'type' => 'attachment',
                        'label' => __('Button icon', 'wpcbooking'),
                        'description' => __('Icon displayed on the thank you page button', 'wpcbooking'),
                        'attachment_type' => 'image',
                    ],
                    'thank_you_button_label' => [
                        'id' => 'thank_you_button_label',
                        'type' => 'text',
                        'label' => __('Button text', 'wpcbooking'),
                        'description' => __('Text displayed on the thank you page button', 'wpcbooking'),
                    ],
                    'thank_you_button_link' => [
                        'id' => 'thank_you_button_link',
                        'type' => 'post',
                        'label' => __('Button link', 'wpcbooking'),
                        'description' => __('Link where the thank you page button leads', 'wpcbooking'),
                        'post_type' => ['post', 'page'],
                    ],
                ],
            ],
            '_booking_options_confirmed_step' => [
                'type' => 'group',
                'id' => '_booking_options_confirmed_step',
                'tab' => 'booking_flow',
                'label' => __('Confirmed booking', 'wpcbooking'),
                'items' => [
                    'confirmed_heading' => [
                        'id' => 'confirmed_heading',
                        'type' => 'text',
                        'label' => __('Confirmation heading', 'wpcbooking'),
                        'description' => __('Main heading displayed on the confirmation page', 'wpcbooking'),
                    ],
                    'confirmed_text' => [
                        'id' => 'confirmed_text',
                        'type' => 'wysiwyg',
                        'label' => __('Confirmation text', 'wpcbooking'),
                        'description' => __('Text displayed on the booking confirmation page', 'wpcbooking'),
                    ],
                    'confirmed_button_icon' => [
                        'id' => 'confirmed_button_icon',
                        'type' => 'attachment',
                        'label' => __('Button icon', 'wpcbooking'),
                        'description' => __('Icon displayed on the confirmation page button', 'wpcbooking'),
                        'attachment_type' => 'image',
                    ],
                    'confirmed_button_label' => [
                        'id' => 'confirmed_button_label',
                        'type' => 'text',
                        'label' => __('Button text', 'wpcbooking'),
                        'description' => __('Text displayed on the confirmation page button', 'wpcbooking'),
                    ],
                ],
            ],
        ];
    }
}
