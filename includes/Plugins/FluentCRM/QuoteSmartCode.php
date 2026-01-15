<?php

namespace Wpcbooking\Plugins\FluentCRM;

use Wpcbooking\CPT\Quote;
use FluentCrm\App\Models\FunnelSubscriber;

class QuoteSmartCode
{
	public function __construct()
	{
		add_filter('fluent_crm/smartcode_groups', [$this, 'pushSmartCodes']);
		add_filter('fluent_crm/smartcode_group_callback_' . $this->get_group_key(), [$this, 'parse_smart_code'], 10, 4);
	}

	public function pushSmartCodes(array $codes): array
	{
		$codes[] = [
			'key'        => $this->get_group_key(),
			'title'      => $this->get_group_title(),
			'shortcodes' => $this->get_smart_codes()
		];
		return $codes;
	}

	public function get_group_key(): string
	{
		return 'wpcbooking_quote';
	}

	public function get_group_title(): string
	{
		return __('Booking Quote', 'wpcbooking');
	}

	public function get_smart_codes(): array
	{
		return [
			'{{wpcbooking_quote.quote_id}}'       => __('Quote ID', 'wpcbooking'),
			'{{wpcbooking_quote.status}}'         => __('Quote Status', 'wpcbooking'),
			'{{wpcbooking_quote.summary}}'        => __('Quote Summary', 'wpcbooking'),
			'{{wpcbooking_quote.total_amount}}'   => __('Total Amount', 'wpcbooking'),
			'{{wpcbooking_quote.date}}'           => __('Quote Date', 'wpcbooking'),
			'##wpcbooking_quote.admin_edit_url##' => __('Admin Edit URL', 'wpcbooking'),
			'##wpcbooking_quote.user_view_url##'  => __('User View URL', 'wpcbooking'),
		];
	}

	public function parse_smart_code(string $code, string $valueKey, $defaultValue, object $subscriber)
	{
		$quote_id = $this->get_quote_id_from_subscriber($subscriber);
		if (!$quote_id) {
			return $defaultValue;
		}
		try {
			return $this->get_quote_value($quote_id, $valueKey, $defaultValue);
		} catch (\Throwable $e) {
			error_log('[WPCBooking SmartCode] Error: ' . $e->getMessage());
			return $defaultValue;
		}
	}

	private function get_quote_id_from_subscriber(object $subscriber): ?int
	{
		$funnelSub = FunnelSubscriber::where('subscriber_id', $subscriber->id)
			->whereNotNull('source_ref_id')
			->orderBy('created_at', 'DESC')
			->first();
		if (!$funnelSub) {
			return null;
		}

		$quote_id = $funnelSub->source_ref_id;

		if (!is_numeric($quote_id)) {
			return null;
		}

		$post = get_post($quote_id);
		if (!$post || $post->post_type !== Quote::SLUG) {
			return null;
		}

		return (int) $quote_id;
	}

	private function get_quote_value(int $quote_id, string $valueKey, $defaultValue)
	{	
		switch ($valueKey) {
			case 'quote_id':
				return $quote_id;

			case 'status':
				
				return Quote::get_quote_status_label($quote_id);

			case 'summary':
				return $this->render_email_summary($quote_id);

			case 'total_amount':
				$total = (float) get_post_meta($quote_id, '_quote_price', true);
				if (function_exists('wc_price')) {
					return strip_tags(wc_price($total));
				}
				return number_format($total, 2) . ' ' . get_option('woocommerce_currency', 'DKK');

			case 'date':
				$post = get_post($quote_id);
				return $post ? get_the_date('', $post) : '';

			case 'admin_edit_url':
				return admin_url('post.php?post=' . $quote_id . '&action=edit');

			case 'user_view_url':
				return $this->get_user_view_url($quote_id);

			default:
				return $defaultValue;
		}
	}

	private function render_email_summary(int $quote_id): string
	{
		error_log('[QuoteSmartCode] render_email_summary called for quote_id: ' . $quote_id);
		
		$result = booking_get_template('CPT/Quote/email-summary', ['quote_id' => $quote_id]);
		
		error_log('[QuoteSmartCode] Template result length: ' . strlen($result) . ' chars');
		error_log('[QuoteSmartCode] Template result preview: ' . substr($result, 0, 200));
		
		return $result;
	}

	private function get_user_view_url(int $quote_id): string
	{
		$post = get_post($quote_id);
		if (!$post) {
			return '';
		}

		$user_hash = get_post_meta($quote_id, '_user_hash', true);
		if (!$user_hash) {
			return '';
		}

		return home_url('/my_quote/' . $post->post_name . '/' . $user_hash);
	}
}

