<?php

namespace NBH\Includes\Actions;

use FluentCrm\App\Services\Funnel\BaseAction;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use NBH\Includes\Triggers\hospitalKarmaTrigger;
use NBH\Includes\FluentCRMIntegration;
use FluentCrm\App\Models\FunnelSubscriber;

class applyHospitalKarmaAction extends BaseAction
{
    public function __construct()
    {
        $this->actionName = 'nbh_apply_hospital_karma';
        $this->priority = 99;
        parent::__construct();
    }

    public function pushBlock($blocks, $funnel)
    {
        $this->funnel = $funnel;
        // Todo: upravit na helper funkci přidat apply filter pro trigger name
        if (!in_array(
            $funnel->trigger_name ?? '',
            ['nbh_hospital_create_update', 'nbh_hospital_statuses', 'nbh_hospital_karma'],
        )) {
            return $blocks;
        }
        $block = $this->getBlock();
        if ($block) {
            $block['type'] = 'action';
            $blocks[$this->actionName] = $block;
        }

        return $blocks;
    }

    public function getBlock()
    {
        return [
            'category' => __('hospital', 'nbh'),
            'title'       => __('Apply Karma Tag to the Hospital', 'nbh'),
            'description' => __('Select which karma tag will be added to the hospital', 'nbh'),
            'icon'        => 'fc-icon-hospital',
            'settings'    => [
                'tags' => []
            ]
        ];
    }

    public function getBlockFields()
    {
        return [
            'title'     => __('Apply Karma Tag to the contact', 'nbh'),
            'sub_title' => __('Select which karma tag will be added to the contact', 'nbh'),
            'fields'    => [
                'hospital_karma' => [
                    'type'        => 'multi-select',
                    'label'       => __('Hospital karma', 'nbh'),
                    'is_multiple' => true,
                    'options'     => hospitalKarmaTrigger::getKarmaStatusOptions(),
                    'required'    => true,
                    'inline_help' => __('', 'nbh'),
                ]
            ]
        ];
    }

    public function handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)
    {


        $hospital_id = null;
        $funnelSub = FunnelSubscriber::find($funnelSubscriberId);
        if ($funnelSub) {
            $hospital_id = $funnelSub->source_ref_id ?? null;
        }

        if (!is_numeric($hospital_id) || !get_post($hospital_id)) {
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
            return;
        }

        if (empty($sequence->settings['hospital_karma']) || !is_array($sequence->settings['hospital_karma'])) {
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
            return;
        }
        $hospital_id = get_transient('hospital_funel_' . $subscriber->id);
        if (!$hospital_id) return;

        update_field(FluentCRMIntegration::ACF_KARMA_NAME, $sequence->settings['hospital_karma'], $hospital_id);
    }
}
