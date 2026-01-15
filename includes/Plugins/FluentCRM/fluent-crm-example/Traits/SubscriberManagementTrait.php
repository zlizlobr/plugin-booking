<?php

namespace NBH\Includes\Traits;

use FluentCrm\App\Models\Subscriber;
use NBH\Includes\FluentCRMIntegration;

/**
 * Trait for managing subscribers in hospital triggers.
 *
 * @version 1.0.0
 * @package NBH\FluentCrm\Traits
 * @author radek.chaloupka@artevio.com
 */
trait SubscriberManagementTrait
{
    /**
     * Get subscribers based on hospital ID and send email preference.
     *
     * @param int $hospital_id Hospital ID
     * @param string $send_email_to Email recipient preference
     * @return array Subscribers array
     */
    private function get_subscribers(int $hospital_id, string $send_email_to): array
    {
        switch ($send_email_to) {
            case FluentCRMIntegration::RECIPIENT_CREATOR:
                return $this->get_creator_subscriber($hospital_id);
            case FluentCRMIntegration::RECIPIENT_ALL:
                return $this->get_all_subscribers($hospital_id);
            default:
                return [];
        }
    }

    /**
     * Get creator subscriber.
     *
     * @param int $hospital_id Hospital ID
     * @return array Subscribers array
     */
    private function get_creator_subscriber(int $hospital_id): array
    {
        $user_id = get_post_meta($hospital_id, FluentCRMIntegration::META_HOSPITAL_CREATOR, true);
        if (!$user_id) {
            return [];
        }
        $subscriber = Subscriber::where('id', $user_id)->first();
        return $subscriber ? [$subscriber] : [];
    }

    /**
     * Get all subscribers.
     *
     * @param int $hospital_id Hospital ID
     * @return array Subscribers array
     */
    private function get_all_subscribers(int $hospital_id): array
    {
        $list_id = get_post_meta($hospital_id, FluentCRMIntegration::META_LIST_ID, true);
        if (!isset($list_id) || !is_numeric($list_id)) return [];
        $subscribers = FluentCrmApi('contacts')->getInstance()->filterByLists([$list_id])->get();
        return is_object($subscribers) && method_exists($subscribers, 'all') ? $subscribers->all() : (array) $subscribers;
    }
}
