<?php

namespace NBH\Includes\Triggers;

use FluentCrm\App\Services\Funnel\BaseTrigger;
use NBH\Includes\Traits\SubscriberManagementTrait;
use NBH\Includes\Traits\FunnelProcessingTrait;
use NBH\Includes\Traits\FieldConfigurationTrait;
use NBH\Includes\FluentCRMIntegration;

/**
 * Handles karma status change triggers for FluentCRM automation.
 * https://developers.fluentcrm.com/modules/trigger/
 *
 * @version 1.0.0
 * @package NBH\FluentCrm
 * @author radek.chaloupka@artevio.com
 */
class hospitalKarmaTrigger extends BaseTrigger
{
    use SubscriberManagementTrait, FunnelProcessingTrait, FieldConfigurationTrait;

    /**
     * Constructor
     * 
     * Sets up the trigger name and priority for karma tracking events.
     */
    public function __construct()
    {
        $this->triggerName = 'nbh_hospital_karma';
        $this->priority = 10;
        $this->actionArgNum = 1;
        parent::__construct();
    }

    /**
     * Get trigger definition
     * 
     * Defines the trigger information including category, label, description, and icon.
     * 
     * @return array Trigger definition array
     */
    public function getTrigger(): array
    {
        return [
            'category'    => __('Hospital', 'nbh'),
            'label'       => __('Status Karma', 'nbh'),
            'description' => __('If the karma updates its status.', 'nbh'),
            'icon'        => 'fc-icon-hospital',
        ];
    }

    /**
     * Get default funnel settings
     * 
     * Defines the default settings for funnels using this trigger.
     * 
     * @return array Default settings
     */
    public function getFunnelSettingsDefaults(): array
    {
        return [
            'hospital_karma' => FluentCRMIntegration::KARMA_NOT_STARTED,
            'send_email_to' => FluentCRMIntegration::RECIPIENT_CREATOR,
            'run_multiple' => 'no',
        ];
    }

    /**
     * Get settings fields
     * 
     * Defines the settings fields for configuring this trigger in the funnel builder.
     * 
     * @param object $funnel Current funnel object
     * @return array Settings fields configuration
     */
    public function getSettingsFields($funnel): array
    {
        return [
            'title'     => __('Karma Status Changed Funnel', 'nbh'),
            'sub_title' => __('This Funnel will start when a specific karma status change occurs.', 'nbh'),
            'fields'    => $this->getSettingsFieldsConfig(),
        ];
    }

    /**
     * Get settings fields configuration
     * 
     * @return array Settings fields configuration
     */
    private function getSettingsFieldsConfig(): array
    {
        return [
            'send_email_to' => $this->get_email_recipient_field(),
            'hosptital_karma' => $this->getKarmaStatusField(),
            'run_multiple' => $this->get_run_multiple_field(),
        ];
    }

    /**
     * Get email recipient field configuration
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
                ['id' => FluentCRMIntegration::RECIPIENT_CREATOR, 'title' => __('Tvůrci', 'nbh')],
                ['id' => FluentCRMIntegration::RECIPIENT_ALL, 'title' => __('Všem v nemocnici', 'nbh')],
            ],
            'required'    => true,
            'inline_help' => __('Select the meta values to trigger the funnel.', 'fluent-crm'),
        ];
    }

    /**
     * Get karma status field configuration
     * 
     * @return array Karma status field configuration
     */
    private function getKarmaStatusField(): array
    {
        return [
            'type'        => 'multi-select',
            'label'       => __('Hospital Karma ', 'nbh'),
            'is_multiple' => true,
            'options'     => $this->getKarmaStatusOptions(),
            'required'    => true,
            'inline_help' => __('Select the meta values to trigger the funnel.', 'fluent-crm'),
        ];
    }

    /**
     * Get karma status options
     * 
     * @return array Karma status options
     */
    public static function getKarmaStatusOptions(): array
    {
        return [
            ['id' => FluentCRMIntegration::KARMA_NOT_STARTED, 'title' => __('Karma nezapočala', 'nbh')],
            ['id' => FluentCRMIntegration::KARMA_STARTED, 'title' => __('Karma započala', 'nbh')],
         ];
    }

    /**
     * Get run multiple field configuration
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
     * Get condition fields
     * 
     * Defines additional condition fields for the funnel.
     * 
     * @param object $funnel Current funnel object
     * @return array Condition fields configuration
     */
    public function getConditionFields($funnel): array
    {
        $hospitalConditions = [];

        return [
            'hospital' => [
                'label'    => __('Hospital', 'nbh'),
                'value'    => 'hospital',
                'children' => apply_filters('nbh_hospital_conditions', $hospitalConditions, $funnel),
            ]
        ];
    }

    /**
     * Handle karma status change trigger
     * 
     * Processes the karma status change and initiates appropriate funnel actions.
     * 
     * @param object $funnel Current funnel object
     * @param array $original_args Original trigger arguments
     * @return void
     */
    public function handle($funnel, $original_args): void
    {
        $t_start = microtime(true);
        list($hospital_id, $new_status, $old_status, $send_email_to) = $original_args;
        // error_log("[TRIGGER] hospitalKarmaTrigger START for hospital #{$hospital_id}, karma: {$old_status} → {$new_status}");
        
        if ($new_status ===  $old_status) {
            // error_log("[TRIGGER] hospitalKarmaTrigger: karma unchanged, skipping");
            return;
        }
        
        $events = $funnel->settings['hospital_karma'] ?? [];
        if (is_array($events)) {
            if (!in_array($new_status, $events)) {
                // error_log("[TRIGGER] hospitalKarmaTrigger: karma not in events, skipping");
                return;
            }
        } 
        
        $t1 = microtime(true);
        $subscribers = $this->get_subscribers($hospital_id, $send_email_to);
        $t2 = microtime(true);
        // error_log(sprintf("[TRIGGER] get_subscribers took %.2f seconds, found %d subscribers", $t2 - $t1, count($subscribers)));
        
        if (empty($subscribers)) return;

        $t3 = microtime(true);
        foreach ($subscribers as $subscriber) {
            $this->start_funnel($funnel, $subscriber, $original_args);
        }
        $t4 = microtime(true);
        // error_log(sprintf("[TRIGGER] start_funnel loop took %.2f seconds for %d subscribers", $t4 - $t3, count($subscribers)));
        
        $t_end = microtime(true);
        // error_log(sprintf("[TRIGGER] hospitalKarmaTrigger TOTAL: %.2f seconds", $t_end - $t_start));
    }
}
