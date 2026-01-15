<?php

namespace NBH\Includes\Services;


/**
 * Service for handling FluentCRM contact operations.
 */
class ContactService
{
    /**
     * Creates a new contact in FluentCRM.
     *
     * @param array $data Contact data including first_name and email
     * @return object|\WP_Error Contact object on success, WP_Error on failure
     */
    public function add_fluent_contact(array $data)
    {
        if (empty($data['email'])) {
            return new \WP_Error(
                'add_subscriber',
                __('Vytvoření kontaktu do fluent se nezdařilo, chybí mail', 'nbh')
            );
        }
        try {
            $contact_api = FluentCrmApi('contacts');
            $contact = $contact_api->getContact($data['email']);
            if (!is_object($contact)) {
                $contact = $contact_api->createOrUpdate($data);
            }
            $this->attach_tags_and_lists($contact, $data);
            return $contact;
        } catch (\Throwable $th) {
            return new \WP_Error(
                'add_subscriber',
                sprintf(
                    __('Vytvoření kontaktu do Fluent se nezdařilo: %s', 'nbh'),
                    $th->getMessage()
                )
            );
        }
    }

    /**
     * Attach tags and lists to a contact.
     * Also detaches tags/lists that should no longer be assigned.
     *
     * @param object $contact FluentCRM contact object
     * @param array $data Contact data (tags and lists are IDs)
     * @return void
     */
    private function attach_tags_and_lists(object $contact, array $data): void
    {
        // Handle TAGS (by ID)
        if (isset($data['tags']) && is_array($data['tags'])) {
            $desired_tag_ids = array_map('intval', $data['tags']);
            $existing_tag_ids = $contact->tags->pluck('id')->toArray();
            
            // Tags to ADD
            $tags_to_add = array_diff($desired_tag_ids, $existing_tag_ids);
            if (!empty($tags_to_add)) {
                $contact->attachTags($tags_to_add);
            }
            
            // Tags to REMOVE
            $tags_to_remove = array_diff($existing_tag_ids, $desired_tag_ids);
            if (!empty($tags_to_remove)) {
                $contact->detachTags($tags_to_remove);
            }
        }

        // Handle LISTS (by ID)
        if (isset($data['list']) && is_array($data['list'])) {
            $desired_list_ids = array_map('intval', $data['list']);
            $existing_list_ids = $contact->lists->pluck('id')->toArray();
            
            // Lists to ADD
            $lists_to_add = array_diff($desired_list_ids, $existing_list_ids);
            if (!empty($lists_to_add)) {
                $contact->attachLists($lists_to_add);
            }
            
            // Lists to REMOVE
            $lists_to_remove = array_diff($existing_list_ids, $desired_list_ids);
            if (!empty($lists_to_remove)) {
                $contact->detachLists($lists_to_remove);
            }
        }
    }
}
