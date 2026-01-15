<?php

namespace NBH\Includes\Services;

/**
 * Service for handling WordPress cron jobs.
 */
class CronService
{
    private ListTagService $list_tag_service;
    
    public function __construct(ListTagService $list_tag_service)
    {
        $this->list_tag_service = $list_tag_service;
    }
    
    /**
     * Add custom cron interval of 24 hours.
     *
     * @param array $schedules Array of existing cron schedules
     * @return array Modified schedules array with daily interval
     */
    public function add_custom_cron_interval(array $schedules): array
    {
        $schedules['daily'] = [
            'interval' => 86400,
            'display'  => __('Every 24 Hours')
        ];

        return $schedules;
    }

    /**
     * Schedule daily cron job if not already scheduled.
     *
     * @return void
     */
    public function schedule_daily_cron(): void
    {
        if (!wp_next_scheduled('nbh_daily_cron_hook')) {
            wp_schedule_event(time(), 'daily', 'nbh_daily_cron_hook');
        }
    }
    
    /**
     * Handle daily FluentCRM contact sync
     * Called by cron job to update all contact tags and lists
     *
     * @return void
     */
    public function handle_daily_contact_sync(): void
    {
        // Process all contacts in batches
        // NOTE: This will run synchronously - could take time for large contact lists
        $batch_size = 100;
        $offset = 0;
        
        do {
            $result = $this->list_tag_service->process_all_contacts($batch_size, $offset);
            $offset += $batch_size;
        } while (!$result['completed']);
    }
} 