<?php

namespace Wpcbooking\Plugins\FluentCRM;

use Wpcbooking\Plugins\AbstractPluginController;
use Wpcbooking\CPT\Quote;

class FluentCRMController extends AbstractPluginController
{
	const PLUGIN_NAME = 'FluentCRM';
	const PLUGIN_SLUG = 'fluent_crm';

	protected function check_plugin_active()
	{
		return defined('FLUENTCRM');
	}

	protected function get_notification_message()
	{
		return __('FluentCRM plugin is required for Quote automation to function properly. Please install and activate FluentCRM.', 'wpcbooking');
	}

	protected function init_hooks()
	{
		add_action('fluent_crm/after_init', [$this, 'register_fluentcrm_integrations']);
		add_action('wpcbooking_quote_status_changed', [$this, 'handle_quote_status_changed'], 10, 3);
		add_action('admin_head', [$this, 'add_fluentcrm_icon_styles']);
	}

	public function init_admin_hooks() {}

	public function add_fluentcrm_icon_styles()
	{
		if (!defined('FLUENTCRM')) {
			return;
		}
?>
		<style>
			.fc-icon-wpcbooking-quote:before {
				background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M19%203h-1V1h-2v2H8V1H6v2H5c-1.11%200-1.99.9-1.99%202L3%2019c0%201.1.89%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2zm0%2016H5V8h14v11zM7%2010h5v5H7z%22/%3E%3C/svg%3E");
				background-position: 50%;
				background-repeat: no-repeat;
				background-size: contain;
				content: "";
				display: inline-block;
				height: 1em;
				width: 1em;
			}
		</style>
<?php
	}

	public function register_fluentcrm_integrations()
	{
		if (!defined('FLUENTCRM')) {
			return;
		}

		try {
			new QuoteStatusChangedTrigger();
			new ApplyQuoteStatusAction();
			new QuoteSmartCode();
		} catch (\Throwable $e) {
			error_log('[WPCBooking FluentCRM] Error registering integrations: ' . $e->getMessage());
			error_log('[WPCBooking FluentCRM] File: ' . $e->getFile() . ' Line: ' . $e->getLine());
		}
	}

	public function handle_quote_status_changed($quote_id, $old_status, $new_status)
	{
		if (!defined('FLUENTCRM')) {
			return;
		}

		if ($old_status === $new_status) {
			return;
		}

		try {
			$trigger = new QuoteStatusChangedTrigger();

			$funnels = \FluentCrm\App\Models\Funnel::where(
				'trigger_name',
				'wpcbooking_quote_status_changed'
			)->where('status', 'published')->get();

			foreach ($funnels as $funnel) {
				$statuses = $funnel->settings['statuses'] ?? [];
				if (in_array($new_status, $statuses)) {
					$trigger->handle($funnel, [$quote_id, $old_status, $new_status]);
				}
			}
		} catch (\Throwable $e) {
			error_log('[WPCBooking FluentCRM] Error handling quote status changed: ' . $e->getMessage());
			error_log('[WPCBooking FluentCRM] File: ' . $e->getFile() . ' Line: ' . $e->getLine());
		}
	}
}
