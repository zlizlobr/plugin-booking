<?php

namespace NBH\Includes\Conditions;

use FluentCrm\App\Services\Libs\ConditionAssessor;
use FluentCrm\App\Models\FunnelSubscriber;
/**
 * @version 1.0.0
 * @author Radek Chaloupka
 * Handles the automation conditions for hospital karma status.
 * Integrates with FluentCRM to assess hospital karma status in automation funnels.
 */
class hospitalKarmaCondition
{
    private const GROUP_KEY = 'hospital';

    /**
     * Constructor
     * 
     * Sets up the condition filters for hospital karma status assessment.
     */
    public function __construct()
    {   
        // tohle přepíše vše ve skupině hospital pro conditions
        add_filter('nbh_hospital_conditions', array($this, 'add_automation_conditions'), 10, 2);
        // add_filter('nbh_hospital_conditions', array($this, 'add_hospital_conditions'), 10, 2);
        add_filter('fluentcrm_automation_conditions_assess_' . self::GROUP_KEY, array($this, 'assess_automation_conditions'), 10, 3);
    }

    /**
     * Add automation conditions to the plugin.
     *
     * @param array $groups
     * @param object $funnel
     * @return array
     */
    public function add_automation_conditions($groups, $funnel)
    {
        // Only available for hospital karma trigger
        if ($funnel->trigger_name !== 'nbh_hospital_karma') {
            return $groups;
        }
        $groups[self::GROUP_KEY] = [
            'label'    => __('Hospital', 'nbh'),
            'value'    => self::GROUP_KEY,
        ];
        $groups[self::GROUP_KEY]['children'][] =
            [
                'value'   => 'HospitalKarmaStatus',
                'label'   => __('Hospital Karma Status', 'nbh'),
                'type'    => 'single_assert_option',
                'options' => [
                    'karma_not_started' => __('Karma nezapočala', 'nbh'),
                    'karma_started'     => __('Karma započala', 'nbh'),
                ]
            ];

        return $groups;
    }
    public function add_hospital_conditions($children, $funnel)
    {
        // Only available for hospital karma trigger
        if ($funnel->trigger_name !== 'nbh_hospital_karma') {
            return $children;
        }
       
        $children[] =
            [
                'value'   => 'HospitalKarmaStatus',
                'label'   => __('Hospital Karma Status', 'nbh'),
                'type'    => 'single_assert_option',
                'options' => [
                    'karma_not_started' => __('Karma nezapočala', 'nbh'),
                    'karma_started'     => __('Karma započala', 'nbh'),
                ]
            ];

        return $children;
    }

    /**
     * Assess automation conditions.
     *
     * @param bool $result
     * @param array $conditions
     * @param object $subscriber
     * @return bool
     */
    public function assess_automation_conditions($result, $conditions, $subscriber)
    {
        $hospital_id = null;
        if ($subscriber->funnel_subscriber_id) {
            $funnelSub = FunnelSubscriber::find($subscriber->funnel_subscriber_id);
            if ($funnelSub) {
                $hospital_id = $funnelSub->source_ref_id ?? null;
            }
        }
        if (!is_numeric($hospital_id) || !get_post($hospital_id)) {
            return $result;
        }

        // Get current hospital karma status from ACF field
        $current_status = get_field(\NBH\Includes\FluentCRMIntegration::ACF_KARMA_NAME, $hospital_id);

        // Prepare input values for condition assessment
        $input_values = [
            'HospitalKarmaStatus' => $current_status
        ];

        // Evaluate conditions using ConditionAssessor
        return ConditionAssessor::matchAllConditions($conditions, $input_values);
    }
}
