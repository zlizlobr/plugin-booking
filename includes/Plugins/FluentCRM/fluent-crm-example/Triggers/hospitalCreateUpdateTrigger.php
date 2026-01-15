<?php

namespace NBH\Includes\Triggers;

use FluentCrm\App\Services\Funnel\BaseTrigger;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\App\Models\Subscriber;
use FluentCrm\Framework\Support\Arr;
use NBH\Includes\Traits\SubscriberManagementTrait;
use NBH\Includes\Traits\FunnelProcessingTrait;
use NBH\Includes\Traits\FieldConfigurationTrait;
use NBH\Includes\FluentCRMIntegration;
// todo: kontrola publish draft funnel napříč všemy triggery
/**
 * Handles hospital create/update triggers for FluentCRM automation.
 *
 * @version 1.0.0
 * @package NBH\FluentCrm
 * @author radek.chaloupka@artevio.com
 */
class hospitalCreateUpdateTrigger extends BaseTrigger
{
    use SubscriberManagementTrait, FunnelProcessingTrait, FieldConfigurationTrait;

    /**
     * Constructor
     *
     * Sets up the trigger name and priority for hospital create/update events.
     */
    public function __construct()
    {
        $this->triggerName = 'nbh_hospital_create_update';
        $this->priority = 10;
        $this->actionArgNum = 1;
        parent::__construct();
    }

    /**
     * Get trigger definition
     *
     * @return array Trigger definition array
     */
    public function getTrigger(): array
    {
        return [
            'category'    => __('Hospital', 'nbh'),
            'label'       => __('Create/Update Hospital', 'nbh'),
            'description' => __('If the hospital is created or updated.', 'nbh'),
            'icon'        => 'fc-icon-hospital',
        ];
    }

    /**
     * Get default funnel settings
     *
     * @return array Default settings
     */
    public function getFunnelSettingsDefaults(): array
    {
        return [
            'hospital_event' => FluentCRMIntegration::EVENT_CREATE,
            'send_email_to'   => FluentCRMIntegration::RECIPIENT_CREATOR,
            'run_multiple'    => 'no',
        ];
    }

    /**
     * Get settings fields
     *
     * @param object $funnel Current funnel object
     * @return array Settings fields configuration
     */
    public function getSettingsFields($funnel): array
    {
        return [
            'title'     => __('Hospital Create/Update Funnel', 'nbh'),
            'sub_title' => __('This Funnel will start when a hospital is created or updated.', 'nbh'),
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
            'hospital_event' => $this->getHospitalEventField(),
            'run_multiple' => $this->get_run_multiple_field(),
        ];
    }

    /**
     * Get hospital event field configuration
     *
     * @return array Hospital event field configuration
     */
    private function getHospitalEventField(): array
    {
        return [
            'type'        => 'select',
            'label'       => __('Hospital event', 'nbh'),
            'is_multiple' => false,
            'options'     => self::getHospitalEventOptions(),
            'required'    => true,
            'inline_help' => __('Select the event(s) to trigger the funnel.', 'fluent-crm'),
        ];
    }

    /**
     * Get hospital event options
     *
     * @return array Hospital event options
     */
    public static function getHospitalEventOptions(): array
    {
        return [
            ['id' => FluentCRMIntegration::EVENT_CREATE, 'title' => __('Hospital Created', 'nbh')],
            ['id' => FluentCRMIntegration::EVENT_UPDATE, 'title' => __('Hospital Updated', 'nbh')],
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
        $filteredConditions = apply_filters('nbh_hospital_conditions', $hospitalConditions, $funnel);
        

        $conditionGroups = [
            'hospital' => [
                'label'    => __('Hospital', 'nbh'),
                'value'    => 'hospital',
                'children' => $filteredConditions,
            ]
        ];

        $result = [
            'hospital_conditions' => [
                'type'        => 'condition_block_groups',
                'label'       => __('Specify Hospital Conditions', 'nbh'),
                'inline_help' => __('Specify which hospital properties need to be matched. Based on the conditions it will run yes blocks or no blocks', 'nbh'),
                'labels'      => [
                    'match_type_all_label' => __('True if all conditions match', 'nbh'),
                    'match_type_any_label' => __('True if any of the conditions match', 'nbh'),
                    'data_key_label'       => __('Hospital Data', 'nbh'),
                    'condition_label'      => __('Condition', 'nbh'),
                    'data_value_label'     => __('Match Value', 'nbh')
                ],
                'groups'      => $conditionGroups,
                'add_label'   => __('Add Hospital Condition', 'nbh'),
            ]
        ];
        
        
        return $result;
    }

    /**
     * Handle hospital create/update trigger
     *
     * @param object $funnel Current funnel object
     * @param array $original_args Original trigger arguments
     * @return void
     */
    public function handle($funnel, $original_args): void
    {
        list($hospital_id, $post,  $update, $send_email_to) = $original_args;
        $events = $funnel->settings['hospital_event'] ?? [];
        $update_status = $update ?  FluentCRMIntegration::EVENT_UPDATE : FluentCRMIntegration::EVENT_CREATE;
        if ($update_status !== $events) {
            return;
        }
        $subscribers = $this->get_subscribers($hospital_id, $send_email_to);
        if (empty($subscribers)) {
            return;
        }
        foreach ($subscribers as $subscriber) {
            $this->start_funnel($funnel, $subscriber, $original_args);
        }
    }
}
