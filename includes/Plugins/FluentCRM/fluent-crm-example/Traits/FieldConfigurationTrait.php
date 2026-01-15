<?php

namespace NBH\Includes\Traits;

/**
 * Trait for field configuration in hospital triggers.
 *
 * @version 1.0.0
 * @package NBH\FluentCrm\Traits
 * @author radek.chaloupka@artevio.com
 */
trait FieldConfigurationTrait
{
    /**
     * Get email recipient field configuration.
     *
     * @return array Email recipient field configuration
     */
    private function get_email_recipient_field(): array
    {
        return [
            'type'        => 'select',
            'label'       => __('Send Email To', 'nbh'),
            'is_multiple' => false,
            'options'     => [
                ['id' => 'creator', 'title' => __('Tvůrci', 'nbh')],
                ['id' => 'all', 'title' => __('Všem v nemocnici', 'nbh')],
            ],
            'required'    => true,
            'inline_help' => __('Select the meta values to trigger the funnel.', 'fluent-crm'),
        ];
    }

    /**
     * Get run multiple field configuration.
     *
     * @return array Run multiple field configuration
     */
    private function get_run_multiple_field(): array
    {
        return [
            'type'        => 'yes_no_check',
            'label'       => '',
            'check_label' => __('Restart the Automation Multiple times for a contact for this event.', 'AFF'),
            'inline_help' => __('If enabled, the automation will restart even if the contact is already in it.', 'AFF'),
        ];
    }

    /**
     * Get condition fields.
     *
     * @param object $funnel Current funnel object
     * @return array Condition fields configuration
     */
    public function get_condition_fields($funnel): array
    {
        return [];
    }
} 