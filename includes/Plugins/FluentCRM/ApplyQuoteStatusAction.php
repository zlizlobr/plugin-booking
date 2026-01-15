<?php

namespace Wpcbooking\Plugins\FluentCRM;

use FluentCrm\App\Services\Funnel\BaseAction;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use Wpcbooking\CPT\Quote;

class ApplyQuoteStatusAction extends BaseAction
{
	private array $statuses;

	public function __construct()
	{
		$this->actionName = 'wpcbooking_apply_quote_status';
		$this->priority = 99;
		$this->statuses = apply_filters('wpcbooking_quote_statuses', []);
		parent::__construct();
	}

	public function pushBlock($blocks, $funnel)
	{
		$this->funnel = $funnel;

		if (!in_array($funnel->trigger_name ?? '', ['wpcbooking_quote_status_changed'])) {
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
			'category'    => __('Booking', 'wpcbooking'),
			'title'       => __('Apply Status to the Quote', 'wpcbooking'),
			'description' => __('Select which status will be applied to the Quote', 'wpcbooking'),
			'icon'        => 'fc-icon-wpcbooking-quote',
			'settings'    => [
				'quote_status' => ''
			]
		];
	}

	public function getBlockFields()
	{
		return [
			'title'     => __('Apply Status to the Quote', 'wpcbooking'),
			'sub_title' => __('Select which status will be applied to the Quote', 'wpcbooking'),
			'fields'    => [
				'quote_status' => [
					'type'        => 'select',
					'label'       => __('Quote Status', 'wpcbooking'),
					'is_multiple' => false,
					'options'     => $this->get_status_options(),
					'required'    => true,
					'inline_help' => __('The selected status will be applied to the quote.', 'wpcbooking'),
				]
			]
		];
	}

	private function get_status_options(): array
	{
		if (!isset($this->statuses) || !is_array($this->statuses) || empty($this->statuses)) {
			return [];
		}

		$options = [];
		foreach ($this->statuses as $id => $title) {
			$options[] = [
				'id'    => $id,
				'title' => $title
			];
		}

		return $options;
	}

	public function handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)
	{
		$quote_id = $this->getQuoteIdFromFunnel($funnelSubscriberId);

		if (!$quote_id) {
			FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
			return;
		}

		$post = get_post($quote_id);
		if (!$post || $post->post_type !== Quote::SLUG) {
			FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
			return;
		}

		if (
			!isset($sequence->settings['quote_status']) ||
			!array_key_exists($sequence->settings['quote_status'], $this->statuses)
		) {
			FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'skipped');
			return;
		}

		Quote::update_quote_status($quote_id, $sequence->settings['quote_status'], false);

		FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'completed');
	}

	private function getQuoteIdFromFunnel($funnelSubscriberId)
	{
		$funnelSubscriber = \FluentCrm\App\Models\FunnelSubscriber::find($funnelSubscriberId);
		if (!$funnelSubscriber) {
			return null;
		}

		$funnel_data = $funnelSubscriber->data ?? [];

		if (isset($funnel_data['quote_id'])) {
			return intval($funnel_data['quote_id']);
		}

		return null;
	}
}

