<?php

namespace Wpcbooking\Plugins\FluentCRM;

use FluentCrm\App\Services\Funnel\BaseTrigger;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\App\Services\Funnel\FunnelProcessor;
use FluentCrm\App\Models\Subscriber;
use FluentCrm\Framework\Support\Arr;
use Wpcbooking\CPT\Quote;

class QuoteStatusChangedTrigger extends BaseTrigger
{
	public function __construct()
	{
		$this->triggerName = 'wpcbooking_quote_status_changed';
		$this->priority = 10;
		$this->actionArgNum = 3;
		parent::__construct();
	}

	public function getTrigger()
	{
		return [
			'category'    => __('Booking', 'wpcbooking'),
			'label'       => __('Quote Status Changed', 'wpcbooking'),
			'description' => __('This Funnel will start when the quote status changes.', 'wpcbooking'),
			'icon'        => 'fc-icon-wpcbooking-quote',
		];
	}

	public function getFunnelSettingsDefaults()
	{
		return [
			'statuses' => '',
			'run_multiple' => 'no',
		];
	}

	public function getSettingsFields($funnel)
	{
		return [
			'title'     => __('Quote Status Changed Funnel', 'wpcbooking'),
			'sub_title' => __('This Funnel will start when a specific quote status change occurs.', 'wpcbooking'),
			'fields'    => [
				'statuses' => [
					'type'        => 'multi-select',
					'label'       => __('Trigger Statuses', 'wpcbooking'),
					'is_multiple' => true,
					'options'     => $this->getStatusOptions(),
					'inline_help' => __('Select the statuses that will trigger this funnel.', 'wpcbooking'),
				],
				'run_multiple' => [
					'type'        => 'yes_no_check',
					'label'       => '',
					'check_label' => __('Restart the Automation Multiple times for a contact for this event.', 'wpcbooking'),
					'inline_help' => __('If enabled, the automation will restart even if the contact is already in it.', 'wpcbooking'),
				],
			],
		];
	}

	public function getConditionFields($funnel)
	{
		$quoteConditions = [];

		return [
			'quote' => [
				'label'    => __('Quote', 'wpcbooking'),
				'value'    => 'quote',
				'children' => apply_filters('wpcbooking_quote_conditions', $quoteConditions, $funnel),
			]
		];
	}

	public function handle($funnel, $original_args)
	{
		if (!is_array($original_args) || count($original_args) < 3) {
			return;
		}

		list($quote_id, $old_status, $new_status) = $original_args;


		$subscriber = $this->getValidSubscriber($quote_id);
		if (!$subscriber) {
			return;
		}
		$will_process = $this->isProcessable($funnel, $old_status, $new_status);
		$will_process = apply_filters(
			'fluentcrm_funnel_will_process_' . $this->triggerName,
			$will_process,
			$funnel,
			$subscriber,
			$original_args
		);

		if (!$will_process) {
			return;
		}

		$this->startFunnel($funnel, $quote_id, $old_status, $new_status, $subscriber);
	}

	private function getValidSubscriber($quote_id)
	{
		$post = get_post($quote_id);
		if (!$post || $post->post_type !== Quote::SLUG) {
			return null;
		}
		$customer_email = get_post_meta($quote_id, '_user_email', true);
		if (!$customer_email || !is_email($customer_email)) {
			return null;
		}
		return Subscriber::where('email', $customer_email)->first();
	}

	private function startFunnel($funnel, $quote_id, $old_status, $new_status, $subscriber)
	{
		$subscriberData = [
			'email' => $subscriber->email,
		];

		$funnelArgs = [
			'source_trigger_name' => $this->triggerName,
			'source_ref_id' => $quote_id,
		];

		(new FunnelProcessor())->startFunnelSequence($funnel, $subscriberData, $funnelArgs, $subscriber);
	}

	private function isProcessable($funnel, $old_status, $new_status)
	{
		if (!$this->handleExistingFunnelSubscription($funnel, $old_status)) {
			return false;
		}

		return $this->isStatusChangeInTriggerList($funnel, $old_status, $new_status);
	}

	private function handleExistingFunnelSubscription($funnel, $status)
	{
		if (!FunnelHelper::ifAlreadyInFunnel($funnel->id, $status)) {
			return true;
		}

		$shouldRunMultiple = 'yes' === Arr::get($funnel->settings, 'run_multiple');
		if ($shouldRunMultiple) {
			FunnelHelper::removeSubscribersFromFunnel($funnel->id, [$status]);
			return true;
		}

		return false;
	}

	private function isStatusChangeInTriggerList($funnel, $old_status, $new_status)
	{
		$triggerStatuses = Arr::get($funnel->settings, 'statuses', []);
		return in_array($new_status, $triggerStatuses);
	}

	private function getStatusOptions()
	{
		$statuses = apply_filters('wpcbooking_quote_statuses', []);
		$formattedOptions = [];

		foreach ($statuses as $key => $label) {
			$formattedOptions[] = [
				'id'    => $key,
				'title' => $label
			];
		}

		return $formattedOptions;
	}
}
