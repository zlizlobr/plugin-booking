<?php

namespace NBH\Includes\Services;

use NBH\Includes\Traits\NotificationTrait;
use NBH\Includes\FluentCRMIntegration;
use FluentCrm\App\Models\Lists;

/**
 * Service for handling hospital-related operations.
 */
class HospitalService
{
    use NotificationTrait;

    private ContactService $contact_service;

    public function __construct(ContactService $contact_service)
    {
        $this->contact_service = $contact_service;
    }

    /**
     * Add hospital to FluentCRM contact list.
     *
     * @param int $post_id The post ID
     * @param WP_Post $post The post object
     * @param bool $update Whether this is an existing post being updated
     * @return void
     */
    public function add_hospital_to_fluent_contact(int $post_id, \WP_Post $post, bool $update): void
    {
        if ($update !== false) {
            return;
        }
        $list = $this->create_hospital_list();
        $contact_data = $this->prepare_contact_data($post, $list->id);
        $subscriber = $this->contact_service->add_fluent_contact($contact_data);
          $this->handle_subscriber_result($subscriber, $post_id, $list->id);
    }
    public function nbh_send_order(int $order_id): void
    {
        $order = wc_get_order($order_id);
        if (!$order || !method_exists($order, 'get_items')) {
            $this->handle_error(__('Order not found', 'nbh'), ['order_id' => $order_id]);
            return;
        }
        $hospital_ids = $this->get_hospital_ids_from_order($order);
        try {
            do_action('nbh_send_order', $hospital_ids, $order);
        } catch (\Throwable $th) {
            $this->handle_error($th->getMessage(), ['file' => $th->getFile(), 'line' => $th->getLine()]);
        }
    }
    /**
     * Add customer to FluentCRM contact list based on order data.
     */
    public function add_customer_to_fluent_contact($hospital_ids, $order,): void
    {
        // Todo: souhlas s listem
        $list_ids = $this->get_fluent_list_ids_from_hospitals($hospital_ids);
        $contact_data = $this->prepare_contact_data($order, $list_ids);
        $subscriber = $this->contact_service->add_fluent_contact($contact_data);
        if (is_wp_error($subscriber)) {
            throw new \Exception(sprintf('Fail create contact: %s', $subscriber->get_error_message()), 1);
        }
    }

    /**
     * Create or update hospital list in FluentCRM.
     *
     * @return Lists
     */
    private function create_hospital_list(): Lists
    {
        return Lists::updateOrCreate(
            ['slug' => sanitize_title($_POST['acf'][FluentCRMIntegration::ACF_HOSPITAL_NAME], 'display')],
            ['title' => sanitize_text_field($_POST['acf'][FluentCRMIntegration::ACF_HOSPITAL_NAME])]
        );
    }

    /**
     * Prepare contact data for FluentCRM.
     *
     * @param WP_Post|WC_Order $source The source object (post or order)
     * @param int|array $list_ids The list ID(s) to assign
     * @return array
     */
    private function prepare_contact_data($source, $list_ids): array
    {
        $contact_data = [
            'list' => is_array($list_ids) ? $list_ids : [$list_ids],
        ];

        // Handle WP_Post (hospital)
        if ($source instanceof \WP_Post) {
            $email =  $_POST['acf'][FluentCRMIntegration::ACF_EMAIL];
            $email_prefix = explode('@', $email)[0];
            $contact_data['first_name'] = $email_prefix;
            $contact_data['email'] = $email;
            $contact_data['tags'] = [4];
        }

        // Handle WC_Order (customer)
        if ($source instanceof \WC_Order) {
            $contact_data['first_name'] = $source->get_billing_first_name();
            $contact_data['last_name'] = $source->get_billing_last_name();
            $contact_data['email'] = $source->get_billing_email();
        }

        return $contact_data;
    }

    /**
     * Handle subscriber creation result.
     *
     * @param mixed $subscriber
     * @param int $post_id
     * @param int $list_id
     * @return void
     */
    private function handle_subscriber_result($subscriber, int $post_id, int $list_id): void
    {
        if (!is_wp_error($subscriber)) {
            update_post_meta($post_id, '_hospital_creator', $subscriber->id);
            update_post_meta($post_id, '_fluent_list_id', $list_id);
            return;
        }

        $this->handle_wp_error(
            $subscriber,
            'Failed to create hospital contact',
            ['post_id' => $post_id],
            true
        );
    }

    /**
     * Get hospital IDs from order meta data.
     *
     * @param WC_order $order 
     * @return array Array of hospital IDs
     */
    public static function get_hospital_ids_from_order(\WC_Order $order): array
    {
        $items = $order->get_items();
        $hospital_ids = [];
        foreach ($items as $item) {
            foreach ($item->get_meta_data() as $meta) {
                if ($meta->key === 'hospital_id' && !empty($meta->value)) {
                    $hospital_ids[] = $meta->value;
                }
            }
        }
        return array_values(array_unique($hospital_ids));
    }

    /**
     * Get FluentCRM list IDs from post meta for given post IDs.
     *
     * @param array $post_ids Array of post IDs
     * @return array Array of FluentCRM list IDs
     */
    public static function get_fluent_list_ids_from_hospitals(array $post_ids): array
    {
        $list_ids = [];

        foreach ($post_ids as $post_id) {
            $list_id = get_post_meta($post_id, FluentCRMIntegration::META_LIST_ID, true);
            if (!empty($list_id)) {
                $list_ids[] = (int) $list_id;
            }
        }

        return array_unique($list_ids);
    }
}
