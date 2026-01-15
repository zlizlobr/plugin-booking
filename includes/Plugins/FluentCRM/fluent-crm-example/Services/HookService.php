<?php

namespace NBH\Includes\Services;

use NBH\Includes\Traits\NotificationTrait;
use NBH\Includes\Triggers\hospitalStatusTrigger;
use NBH\Includes\Triggers\hospitalKarmaTrigger;
use NBH\Includes\Triggers\hospitalCreateUpdateTrigger;
use NBH\Includes\Actions\applyHospitalTagAction;
use NBH\Includes\Actions\applyHospitalKarmaAction;
use NBH\Includes\Actions\WaitTimeAction;
use NBH\Includes\Conditions\hospitalCreateCondition;
use NBH\Includes\Conditions\hospitalKarmaCondition;
use NBH\Includes\Conditions\hospitalStatusCondition;
use NBH\Includes\Conditions\giftCertificateCondition;
use NBH\Includes\Blocks\HospitalImageBlock;
use NBH\Includes\Blocks\GiftMessageConditionalBlock;

/**
 * Service for handling WordPress hooks and actions.
 */
class HookService
{
    use NotificationTrait;

    private HospitalService $hospital_service;
    private ContactService $contact_service;
    private SmartCodeService $smart_code_service;
    private CronService $cron_service;
    private ListTagService $list_tag_service;

    /**
     * Initialize HookService with required dependencies.
     *
     * @param HospitalService $hospital_service
     * @param ContactService $contact_service
     * @param SmartCodeService $smart_code_service
     * @param CronService $cron_service
     * @param ListTagService $list_tag_service
     */
    public function __construct(
        HospitalService $hospital_service,
        ContactService $contact_service,
        SmartCodeService $smart_code_service,
        CronService $cron_service,
        ListTagService $list_tag_service
    ) {
        $this->hospital_service = $hospital_service;
        $this->contact_service = $contact_service;
        $this->smart_code_service = $smart_code_service;
        $this->cron_service = $cron_service;
        $this->list_tag_service = $list_tag_service;
        
        // Initialize blocks
        $this->init_blocks();
    }

    /**
     * Register all WordPress hooks and actions.
     *
     * @return void
     */
    public function register_hooks(): void
    {
        // Register hospital hooks
        \add_action('save_post_hospital', [$this->hospital_service, 'add_hospital_to_fluent_contact'], 25, 3);
        
        // Register FluentCRM List/Tag management hooks (NEW)
        \add_action('save_post_hospital', [$this->list_tag_service, 'process_hospital_creator'], 30, 3);
        \add_action('woocommerce_order_status_completed', [$this->list_tag_service, 'process_order'], 10, 1);
        
        // Register FluentCRM hooks
        \add_action('fluent_crm/after_init', [$this, 'register_fluent_crm_hooks']);
        
        // Add custom icon
        \add_filter('fluent_crm/funnel_icons', [$this, 'funnel_icons']);

        // Register cron hooks
        \add_filter('cron_schedules', [$this->cron_service, 'add_custom_cron_interval']);
        $this->cron_service->schedule_daily_cron();
        \add_action('nbh_daily_cron_hook', [$this->cron_service, 'handle_daily_contact_sync']);
    }

    /**
     * Register FluentCRM specific hooks.
     *
     * @return void
     */
    public function register_fluent_crm_hooks(): void
    {
        try {
            // Initialize hospital status trigger
            new hospitalStatusTrigger();
            \add_filter(
                'acf/update_value/name=' . \NBH\Includes\FluentCRMIntegration::ACF_STATUS_NAME,
                [$this, 'handle_hospital_status_update'],
                10,
                3
            );
            new hospitalKarmaTrigger();
            \add_filter(
                'acf/update_value/name=' . \NBH\Includes\FluentCRMIntegration::ACF_KARMA_NAME,
                [$this, 'handle_hospital_karma_update'],
                10,
                3
            );
            new hospitalCreateUpdateTrigger();
            /* \add_action(
                'save_post_hospital',
                [$this, 'handle_hospital_save'],
                30,
                3
            );*/
            \add_action('acf/save_post', [$this, 'handle_hospital_save'], 30);
            // Initialize hospital tag action
            new applyHospitalTagAction();
            new applyHospitalKarmaAction();
            new WaitTimeAction();
            // Initialize Hospital conditions
            new hospitalCreateCondition();
            new hospitalKarmaCondition();
            new hospitalStatusCondition();
            
            // Initialize Gift Certificate condition
            new giftCertificateCondition();
            
            // Register hospital condition groups
            add_filter('fluentcrm_automation_condition_groups', array($this, 'add_hospital_conditions_section'), 11, 2);
            add_filter('fluentcrm_automation_conditions_assess_hospital', array($this, 'assess_hospital_section_conditions'), 10, 5);
        } catch (\Throwable $th) {
            $this->handle_error($th->getMessage(), ['file' => $th->getFile(), 'line' => $th->getLine()]);
        }
    }

    /**
     * Load and handle hospital trigger logic.
     *
     * @param string $trigger_name Name of the trigger (e.g. 'nbh_hospital_statuses')
     * @param string $trigger_class Class name of the trigger
     * @param callable $handle_callback Callback for handle method
     * @param int $hospital_id Hospital/Post ID
     * @param array $handle_args Arguments for handle method
     * @param array $trigger_data Additional data for set_hospital_trigger_data
     * @return void
     */
    private function load_hospital_trigger($trigger_name, $trigger_class, $handle_callback, $hospital_id, $handle_args = [], $trigger_data = [])
    {
        $funnels = \FluentCrm\App\Models\Funnel::where(
            'trigger_name',
            $trigger_name
        )->get();
        foreach ($funnels as $funnel) {
             if ('published' !== $funnel->status) continue;
            $send_email_to = $funnel->settings['send_email_to'] ?? 'creator';
            try {
                $trigger = new $trigger_class();
                call_user_func($handle_callback, $trigger, $funnel, $handle_args, $send_email_to);
            } catch (\Throwable $th) {
                $this->handle_error($th->getMessage(), ['file' => $th->getFile(), 'line' => $th->getLine()]);
            }
        }
    }

    /**
     * Handles hospital status update trigger.
     *
     * @param mixed $value New field value
     * @param int $post_id Post ID
     * @param array $field Field data
     * @return mixed Original value
     */
    public function handle_hospital_status_update($value, $post_id, $field)
    {
        $old_value = get_field(\NBH\Includes\FluentCRMIntegration::ACF_STATUS_NAME, $post_id);
        if ($old_value === $value)  return $value;
        $this->load_hospital_trigger(
            'nbh_hospital_statuses',
            hospitalStatusTrigger::class,
            function ($trigger, $funnel, $args, $send_email_to) {
                [$post_id, $value, $old_value] = $args;
                $trigger->handle($funnel, [$post_id, $value, $old_value, $send_email_to]);
            },
            $post_id,
            [$post_id, $value, $old_value],
            [
                'value' => $value,
                'old_value' => $old_value
            ]
        );
        return $value;
    }

    /**
     * Handles hospital karma update trigger.
     *
     * @param mixed $value New field value
     * @param int $post_id Post ID
     * @param array $field Field data
     * @return mixed Original value
     */
    public function handle_hospital_karma_update($value, $post_id, $field)
    {
        $old_value = get_field(\NBH\Includes\FluentCRMIntegration::ACF_KARMA_NAME, $post_id);
        if ($old_value === $value) {
            return $value;
        }
        $this->load_hospital_trigger(
            'nbh_hospital_karma',
            hospitalKarmaTrigger::class,
            function ($trigger, $funnel, $args, $send_email_to) {
                [$post_id, $value, $old_value] = $args;
                $trigger->handle($funnel, [$post_id, $value, $old_value, $send_email_to]);
            },
            $post_id,
            [$post_id, $value, $old_value],
            [
                'value' => $value,
                'old_value' => $old_value
            ]
        );
        return $value;
    }

    /**
     * Handles hospital save trigger.
     *
     * @param int|string $post_id Post ID
     * @return void
     */
    public function handle_hospital_save($post_id)
    {
        $post_id = (int) $post_id; // Convert to int for safety
        $post = get_post($post_id);
        if ('yes' === get_post_meta($post_id, '_create_update_tag', true)) {
            $update = false; // This is a CREATE (first save) - $update=false means CREATE
            update_post_meta($post_id, '_create_update_tag', 'no');
        } else {
            $update = true; // This is an UPDATE (subsequent saves) - $update=true means UPDATE
        }
        $this->load_hospital_trigger(
            'nbh_hospital_create_update',
            hospitalCreateUpdateTrigger::class,
            function ($trigger, $funnel, $args, $send_email_to) {
                [$post_id, $post, $update] = $args;
                $trigger->handle($funnel, [$post_id, $post, $update, $send_email_to]);
            },
            $post_id,
            [$post_id, $post, $update],
            [
                'update' => $update
            ]
        );
    }

    /**
     * Returns custom funnel icons.
     *
     * @param array $icons Funnel icons
     * @return array Modified funnel icons
     */
    public function funnel_icons($icons)
    {
        $icons['hospital']    = 'fc-icon-hospital';
        return $icons;
    }

    /**
     * Add Hospital conditions section
     *
     * @param array $groups
     * @param object $funnel
     * @return array
     */
    public function add_hospital_conditions_section($groups, $funnel)
    {
        
        $hospitalConditions = [];
        $filteredConditions = apply_filters('nbh_hospital_conditions', $hospitalConditions, $funnel);
        
        
        if (!empty($filteredConditions)) {
            $groups['hospital'] = [
                'label'    => __('Hospital', 'nbh'),
                'value'    => 'hospital',
                'children' => $filteredConditions,
            ];
        }
        
        return $groups;
    }

    /**
     * Assess hospital section conditions
     *
     * @param bool $result
     * @param array $conditions
     * @param object $subscriber
     * @param object $sequence
     * @param int $funnelSubscriberId
     * @return bool
     */
    public function assess_hospital_section_conditions($result, $conditions, $subscriber, $sequence = null, $funnelSubscriberId = null)
    {
        
        // This will be handled by individual condition classes
        // Just pass through for now
        return $result;
    }

    /**
     * Initialize Gutenberg blocks.
     *
     * @return void
     */
    private function init_blocks(): void
    {
        $hospital_image_block = new HospitalImageBlock();
        $hospital_image_block->register();
        
        $gift_message_block = new GiftMessageConditionalBlock();
        $gift_message_block->register();
    }
}
