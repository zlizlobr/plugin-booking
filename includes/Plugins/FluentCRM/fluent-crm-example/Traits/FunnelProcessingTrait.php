<?php

namespace NBH\Includes\Traits;

use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\Framework\Support\Arr;

/**
 * Trait for processing funnels in hospital triggers.
 *
 * @version 1.0.0
 * @package NBH\FluentCrm\Traits
 * @author radek.chaloupka@artevio.com
 */
trait FunnelProcessingTrait
{
    /**
     * Start funnel sequence for a subscriber.
     *
     * @param object $funnel Current funnel object
     * @param object $subscriber Subscriber object
     * @param array $original_args Original trigger arguments
     * @return void
     */
    private function start_funnel($funnel, $subscriber, $original_args): void
    {
        $will_process = $this->is_processable($funnel, $subscriber);
        $will_process = apply_filters('fluentcrm_funnel_will_process_' . $this->triggerName, $will_process, $funnel, $subscriber, $original_args);
        if (!$will_process) {
            return;
        }
        $this->process_funnel_sequence($funnel, $original_args, $subscriber);
    }

    /**
     * Process funnel sequence.
     *
     * @param object $funnel Current funnel object
     * @param array $original_args Original trigger arguments
     * @param object $subscriber Subscriber object
     * @return void
     */
    private function process_funnel_sequence($funnel, $original_args, $subscriber): void
    {
        (new FunnelProcessor())->startFunnelSequence(
            $funnel,
            $original_args,
            [
                'source_trigger_name' => $this->triggerName,
                'source_ref_id'       => $original_args[0] ?? null,
            ],
            $subscriber
        );
    }

    /**
     * Check if funnel is processable for given event and subscriber.
     *
     * @param object $funnel Current funnel object
     * @param object $subscriber Subscriber object
     * @return boolean Whether the funnel is processable
     */
    private function is_processable($funnel, $subscriber): bool
    {
        if (!FunnelHelper::ifAlreadyInFunnel($funnel->id, $subscriber->id)) {
            return true;
        }
        return $this->should_run_multiple($funnel, $subscriber);
    }

    /**
     * Check if funnel should run multiple times.
     *
     * @param object $funnel Current funnel object
     * @param object $subscriber Subscriber object
     * @return boolean Whether the funnel should run multiple times
     */
    private function should_run_multiple($funnel, $subscriber): bool
    {
        $should_run_multiple = 'yes' === Arr::get($funnel->settings, 'run_multiple');
        if (isset($should_run_multiple) && $should_run_multiple) {
            FunnelHelper::removeSubscribersFromFunnel($funnel->id, [$subscriber->id]);
            return true;
        } else {
            return !FunnelHelper::ifAlreadyInFunnel($funnel->id, $subscriber->id) ? true : false;
        }
    }
}
