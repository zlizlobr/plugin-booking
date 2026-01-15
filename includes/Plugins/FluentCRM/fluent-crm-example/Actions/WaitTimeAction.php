<?php

namespace NBH\Includes\Actions;

use NBH\Includes\Traits\NotificationTrait;
use FluentCrm\App\Services\Funnel\BaseAction;
use FluentCrm\App\Services\Funnel\FunnelHelper;
use FluentCrm\App\Models\FunnelSubscriber;
use FluentCrm\Framework\Support\Arr;
use Exception;

/**
 * Wait time action for hospital funnels.
 * 
 * Handles waiting logic for hospital-related automation sequences.
 */
class WaitTimeAction extends BaseAction
{
    use NotificationTrait;
    /**
     * Initialize the wait time action.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->actionName = 'fluentcrm_wait_times';
        $this->priority = 10;
        parent::__construct();
        add_filter('fluentcrm_funnel_sequence_filtered_' . $this->actionName, array($this, 'gettingAction'), 10, 2);
    }

    /**
     * Push block to funnel builder.
     * 
     * @param array $blocks Available blocks
     * @param object $funnel Funnel object
     * @return array Modified blocks
     */
    public function pushBlock($blocks, $funnel)
    {
        $this->funnel = $funnel;
        // Todo: upravit na helper funkci přidat apply filter pro trigger name
        if (!in_array(
            $funnel->trigger_name ?? '',
            ['nbh_hospital_create_update', 'nbh_hospital_statuses', 'nbh_hospital_karma'],
        )) {
            return $blocks;
        }
        $block = $this->getBlock();
        if ($block) {
            $block['type'] = 'action';
            $blocks[$this->actionName] = $block;
        }

        return $blocks;
    }

    /**
     * Get block configuration.
     * 
     * @return array Block configuration
     */
    public function getBlock()
    {
        try {

            $block_config = [
                'category' => __('hospital', 'nbh'),
                'title'       => __('Hospital: Wait X Days/Hours', 'nbh'),
                'description' => $this->getCurrentDescription(),
                'icon'        => 'fc-icon-wait_time',
                'settings'    => [
                    'wait_type'         => 'unit_wait',
                    'wait_time_amount'  => '',
                    'wait_time_unit'    => 'days',
                    'order_wait_time_unit' => 'days',
                    'order_wait_time_amount' => '1',
                    'is_timestamp_wait' => '',
                    'wait_date_time'    => '',
                    'to_day'            => [],
                    'to_day_time'       => ''
                ]
            ];
        } catch (\Throwable $th) {
            $this->handle_error($th->getMessage(), ['file' => $th->getFile(), 'line' => $th->getLine()]);
            return [
                'title' => 'Wait Time',
                'description' => 'Error loading description',
                'icon' => 'el-icon-time',
                'settings' => []
            ];
        }
    }

    /**
     * Get current description from the description service.
     * 
     * @return string Current description or empty string
     */
    private function getCurrentDescription()
    {

        return __('Wait for specified time', 'nbh');
    }

    /**
     * Get block fields configuration.
     * 
     * @return array Fields configuration
     */
    public function getBlockFields()
    {
        // Dynamicky získat WooCommerce order statusy přes filter
        $wc_statuses = wc_get_order_statuses();
        $status_options = [];
        foreach ($wc_statuses as $status_key => $status_label) {
            $status_options[] = [
                'id' => $status_key,
                'title' => $status_label
            ];
        }

        $customFields = [];
        if (function_exists('FluentCrmApi')) {
            $customFields = FluentCrmApi('contacts')->getCustomFields(['date_time', 'date'], true);
            // add date of birth field at the beginning
            array_unshift($customFields, [
                'id'    => '__date_of_birth__',
                'title' => __('Contact\'s Next Date of Birth', 'nbh')
            ]);
        }

        return [
            'title'     => __('Hospital: Wait X Days/Hours', 'nbh'),
            'sub_title' => __('Wait defined timespan before execute the next action', 'nbh'),
            'fields'    => [
                'wait_type'        => [
                    'type'    => 'radio_buttons',
                    'label'   => 'Waiting Type',
                    'options' => [
                        [
                            'id'    => 'unit_wait',
                            'title' => __('Wait by period', 'nbh')
                        ],
                        [
                            'id'    => 'timestamp_wait',
                            'title' => __('Wait Until Date', 'nbh')
                        ],
                        [
                            'id'    => 'to_day',
                            'title' => __('Wait by Weekday', 'nbh')
                        ],
                        [
                            'id'    => 'by_custom_field',
                            'title' => __('Wait by Custom Field', 'nbh')
                        ],
                        [
                            'id'    => 'order_wait',
                            'title' => __('Wait by Order', 'nbh')
                        ],
                    ]
                ],
                'wait_time_amount' => [
                    'label'         => __('Wait Time', 'nbh'),
                    'type'          => 'input-number',
                    'wrapper_class' => 'fc_2col_inline pad-r-20',
                    'dependency'    => [
                        'depends_on' => 'wait_type',
                        'value'      => 'unit_wait',
                        'operator'   => '=',
                    ],
                ],
                'wait_time_unit'   => [
                    'label'         => __('Wait Time Unit', 'nbh'),
                    'type'          => 'select',
                    'wrapper_class' => 'fc_2col_inline',
                    'options'       => [
                        [
                            'id'    => 'days',
                            'title' => __('Days', 'nbh')
                        ],
                        [
                            'id'    => 'hours',
                            'title' => __('Hours', 'nbh')
                        ],
                        [
                            'id'    => 'minutes',
                            'title' => __('Minutes', 'nbh')
                        ]
                    ],
                    'dependency'    => [
                        'depends_on' => 'wait_type',
                        'value'      => 'unit_wait',
                        'operator'   => '=',
                    ],
                ],
                'wait_date_time'   => [
                    'label'       => __('Specify Date and Time', 'nbh'),
                    'type'        => 'date_time',
                    'placeholder' => __('Select Date & Time', 'nbh'),
                    'inline_help' => __('Please input date and time and this step will be executed after that time (TimeZone will be as per your WordPress Date Time Zone)', 'nbh'),
                    'dependency'  => [
                        'depends_on' => 'wait_type',
                        'value'      => 'timestamp_wait',
                        'operator'   => '=',
                    ]
                ],
                'to_day'           => [
                    'type'          => 'checkboxes',
                    'label'         => 'Wait until next day(s) of the week',
                    'wrapper_class' => 'fc_2col_inline pad-r-20',
                    'options'       => [
                        [
                            'id'    => 'Mon',
                            'title' => 'Mon'
                        ],
                        [
                            'id'    => 'Tue',
                            'title' => 'Tue'
                        ],
                        [
                            'id'    => 'Wed',
                            'title' => 'Wed'
                        ],
                        [
                            'id'    => 'Thu',
                            'title' => 'Thu'
                        ],
                        [
                            'id'    => 'Fri',
                            'title' => 'Fri'
                        ],
                        [
                            'id'    => 'Sat',
                            'title' => 'Sat'
                        ],
                        [
                            'id'    => 'Sun',
                            'title' => 'Sun'
                        ]
                    ],
                    'dependency'    => [
                        'depends_on' => 'wait_type',
                        'value'      => 'to_day',
                        'operator'   => '=',
                    ]
                ],
                'to_day_time'      => [
                    'label'          => 'Time of the day',
                    'type'           => 'time_selector',
                    'placeholder'    => 'Select Time',
                    'wrapper_class'  => 'fc_2col_inline',
                    'picker_options' => [
                        'start' => '00:00',
                        'step'  => '00:10',
                        'end'   => '23:59'
                    ],
                    'dependency'     => [
                        'depends_on' => 'wait_type',
                        'value'      => 'to_day',
                        'operator'   => '=',
                    ]
                ],
                'by_custom_field'   => [
                    'label'         => __('Select Contact\'s Custom Field', 'nbh'),
                    'type'          => 'select',
                    'inline_help' => __('If no value is found in the contact\'s custom field or past date then it will wait only 1 minute by default', 'nbh'),
                    'options'       => $customFields,
                    'dependency'    => [
                        'depends_on' => 'wait_type',
                        'value'      => 'by_custom_field',
                        'operator'   => '=',
                    ]
                ],
                'order_statuses' => [
                    'label'         => __('Order Statuses', 'nbh'),
                    'type'          => 'multi-select',
                    'is_multiple'   => true,
                    'options'       => $status_options,
                    'default'       => ['wc-completed'],
                    'dependency'    => [
                        'depends_on' => 'wait_type',
                        'value'      => 'order_wait',
                        'operator'   => '=',
                    ],
                    'inline_help'   => __('Select which WooCommerce order statuses to consider for the wait logic.', 'nbh'),
                ],
                'order_wait_time_amount' => [
                    'label'         => __('Wait Time After Last Order', 'nbh'),
                    'type'          => 'input-number',
                    'wrapper_class' => 'fc_2col_inline pad-r-20',
                    'dependency'    => [
                        'depends_on' => 'wait_type',
                        'value'      => 'order_wait',
                        'operator'   => '=',
                    ],
                ],
                'order_wait_time_unit'   => [
                    'label'         => __('Wait Time Unit', 'nbh'),
                    'type'          => 'select',
                    'wrapper_class' => 'fc_2col_inline',
                    'options'       => [
                        [
                            'id'    => 'days',
                            'title' => __('Days', 'nbh')
                        ],
                        [
                            'id'    => 'hours',
                            'title' => __('Hours', 'nbh')
                        ],
                        [
                            'id'    => 'minutes',
                            'title' => __('Minutes', 'nbh')
                        ]
                    ],
                    'dependency'    => [
                        'depends_on' => 'wait_type',
                        'value'      => 'order_wait',
                        'operator'   => '=',
                    ],
                ],
            ]
        ];
    }

    /**
     * Handle the wait time action execution.
     * 
     * @param object $subscriber Subscriber object
     * @param object $sequence Sequence object
     * @param int $funnelSubscriberId Funnel subscriber ID
     * @param object $funnelMetric Funnel metric object
     * @return void
     */
    public function handle($subscriber, $sequence, $funnelSubscriberId, $funnelMetric)
    {
        $hospital_id = null;
        if ($subscriber->funnel_subscriber_id) {
            $funnelSub = FunnelSubscriber::find($subscriber->funnel_subscriber_id);
            if ($funnelSub) {
                $hospital_id = $funnelSub->source_ref_id ?? null;
            }
        }
        if (!$hospital_id) {
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'completed');
            return;
        }
        $settings = $sequence->settings;
        $wait_type = Arr::get($settings, 'wait_type', 'unit_wait');

        $nextRunTime = $this->calculate_next_run_time($settings, $subscriber, $hospital_id);

        if (!$nextRunTime) {
            // If no valid time calculated, complete immediately
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'completed');
            return;
        }

        $currentTime = current_time('timestamp');
        if ($currentTime >= $nextRunTime) {
            // Time has passed, complete the sequence
            FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'completed');
        } else {
            // Schedule for later
            $this->schedule_next_run($funnelSubscriberId, $sequence, $nextRunTime);
        }
    }

    /**
     * Process action settings before execution.
     * 
     * @param array $sequence Sequence data
     * @param object $funnel Funnel object
     * @return array Modified sequence data
     */
    public function gettingAction($sequence, $funnel)
    {
        if (empty($sequence['settings']['wait_type'])) {
            if (Arr::get($sequence, 'settings.is_timestamp_wait') == 'yes') {
                $sequence['settings']['wait_type'] = 'timestamp_wait';
            } else {
                $sequence['settings']['wait_type'] = 'unit_wait';
            }

            $sequence['settings']['to_day'] = [];
            $sequence['settings']['to_day_time'] = '';
        }

        if (!empty($sequence['settings']['to_day'])) {
            $sequence['settings']['to_day'] = array_map(function ($day) {
                return substr($day, 0, 3);
            }, $sequence['settings']['to_day']);
        }

        return $sequence;
    }

    /**
     * Calculate next run time based on settings.
     * 
     * @param array $settings Action settings
     * @param object $subscriber Subscriber object
     * @param array $trigger_data Trigger data
     * @return int|null Next run timestamp or null
     */
    private function calculate_next_run_time($settings, $subscriber, $hospital_id)
    {
        $wait_type = Arr::get($settings, 'wait_type', 'unit_wait');

        switch ($wait_type) {
            case 'unit_wait':
                return $this->calculate_unit_wait_time($settings);

            case 'timestamp_wait':
                return $this->calculate_timestamp_wait_time($settings);

            case 'to_day':
                return $this->calculate_weekday_wait_time($settings);

            case 'by_custom_field':
                return $this->calculate_custom_field_wait_time($settings, $subscriber);

            case 'order_wait':
                return $this->calculate_order_wait_time($settings, $hospital_id);

            default:
                return null;
        }
    }

    /**
     * Calculate wait time for unit-based waiting.
     * 
     * @param array $settings Action settings
     * @return int Next run timestamp
     */
    private function calculate_unit_wait_time($settings)
    {
        $amount = intval($settings['wait_time_amount'] ?? 1);
        $unit = $settings['wait_time_unit'] ?? 'days';

        $multipliers = [
            'minutes' => 60,
            'hours'   => 3600,
            'days'    => 86400,
            'weeks'   => 604800,
            'months'  => 2592000 // 30 days
        ];

        $wait_seconds = $amount * ($multipliers[$unit] ?? 86400);
        return current_time('timestamp') + $wait_seconds;
    }

    /**
     * Calculate wait time for timestamp-based waiting.
     * 
     * @param array $settings Action settings
     * @return int|null Next run timestamp or null
     */
    private function calculate_timestamp_wait_time($settings)
    {
        $wait_date_time = Arr::get($settings, 'wait_date_time');
        if (!$wait_date_time) {
            return null;
        }

        $timestamp = strtotime($wait_date_time);
        return $timestamp ? $timestamp : null;
    }

    /**
     * Calculate wait time for weekday-based waiting.
     * 
     * @param array $settings Action settings
     * @return int|null Next run timestamp or null
     */
    private function calculate_weekday_wait_time($settings)
    {
        $to_day = Arr::get($settings, 'to_day', []);
        $to_day_time = Arr::get($settings, 'to_day_time', '09:00');

        if (empty($to_day)) {
            return null;
        }

        $current_time = current_time('timestamp');
        $current_day = date('D', $current_time);

        // Find next occurrence
        foreach ($to_day as $day) {
            $next_time = $this->get_next_weekday_time($day, $to_day_time, $current_time);
            if ($next_time) {
                return $next_time;
            }
        }

        return null;
    }

    /**
     * Calculate wait time for custom field-based waiting.
     * 
     * @param array $settings Action settings
     * @param object $subscriber Subscriber object
     * @return int|null Next run timestamp or null
     */
    private function calculate_custom_field_wait_time($settings, $subscriber)
    {
        $custom_field = Arr::get($settings, 'by_custom_field');
        if (!$custom_field || !$subscriber) {
            return current_time('timestamp') + 60; // Default 1 minute
        }

        $field_value = $subscriber->custom_values[$custom_field] ?? null;
        if (!$field_value) {
            return current_time('timestamp') + 60; // Default 1 minute
        }

        $timestamp = strtotime($field_value);
        if (!$timestamp || $timestamp <= current_time('timestamp')) {
            return current_time('timestamp') + 60; // Default 1 minute
        }

        return $timestamp;
    }

    /**
     * Calculate wait time for order-based waiting.
     * 
     * @param array $settings Action settings
     * @param int $hospital_id Trigger data
     * @return int|null Next run timestamp or null
     */
    private function calculate_order_wait_time($settings, $hospital_id)
    {
        if (!isset($hospital_id)) {
            return null;
        }

        $order_statuses = !empty($settings['order_statuses']) && is_array($settings['order_statuses'])
            ? $settings['order_statuses']
            : ['wc-completed'];

        $lastOrderDate = $this->get_last_order($hospital_id, $order_statuses);

        if (!$lastOrderDate) {
            return current_time('timestamp');
        }

        $waitTime = $this->calculate_order_wait_time_period($settings);
        return $lastOrderDate + $waitTime;
    }

    /**
     * Get next weekday time.
     * 
     * @param string $day Day abbreviation (Mon, Tue, etc.)
     * @param string $time Time string (HH:MM)
     * @param int $current_time Current timestamp
     * @return int|null Next occurrence timestamp or null
     */
    private function get_next_weekday_time($day, $time, $current_time)
    {
        $day_map = [
            'Mon' => 1,
            'Tue' => 2,
            'Wed' => 3,
            'Thu' => 4,
            'Fri' => 5,
            'Sat' => 6,
            'Sun' => 0
        ];

        if (!isset($day_map[$day])) {
            return null;
        }

        $target_day = $day_map[$day];
        $current_day = date('w', $current_time);

        $days_ahead = $target_day - $current_day;
        if ($days_ahead <= 0) {
            $days_ahead += 7;
        }

        $next_date = date('Y-m-d', strtotime("+{$days_ahead} days", $current_time));
        $next_datetime = $next_date . ' ' . $time . ':00';

        return strtotime($next_datetime);
    }

    /**
     * Get last order date for specific hospital.
     *
     * @param int $hospital_id Hospital ID
     * @param array $order_statuses Array of order statuses to consider
     * @return int|null Timestamp of last order or null if no orders found
     */
    private function get_last_order($hospital_id, $order_statuses = ['wc-completed'])
    {
        global $wpdb;

        if (empty($hospital_id) || !is_numeric($hospital_id)) {
            return null;
        }

        // Prepare status placeholders for SQL
        $placeholders = implode(',', array_fill(0, count($order_statuses), '%s'));

        // Build argument array for $wpdb->prepare
        $args = array_merge($order_statuses, ['hospital_id', $hospital_id]);

        // Query to get the most recent order for this hospital with selected statuses
        $query = $wpdb->prepare(
            "SELECT wc_order.date_created_gmt
            FROM {$wpdb->prefix}woocommerce_order_itemmeta AS oim
            JOIN {$wpdb->prefix}woocommerce_order_items AS oi ON oi.order_item_id = oim.order_item_id
            JOIN {$wpdb->prefix}wc_orders AS wc_order ON wc_order.ID = oi.order_id
            WHERE wc_order.status IN ($placeholders)
            AND oim.meta_key = %s
            AND oim.meta_value = %s
            ORDER BY wc_order.date_created_gmt DESC
            LIMIT 1",
            ...$args
        );

        $last_order_date = $wpdb->get_var($query);

        if ($last_order_date) {
            // Convert to timestamp
            return strtotime($last_order_date);
        }

        return null;
    }

    /**
     * Calculate wait time based on settings.
     *
     * @param array $settings Action settings
     * @return int Wait time in seconds
     */
    private function calculate_wait_time($settings)
    {
        $amount = intval($settings['wait_time_amount'] ?? 1);
        $unit = $settings['wait_time_unit'] ?? 'days';

        $multipliers = [
            'minutes' => 60,
            'hours'   => 3600,
            'days'    => 86400,
            'weeks'   => 604800,
            'months'  => 2592000 // 30 dnů
        ];

        return $amount * ($multipliers[$unit] ?? 86400);
    }

    /**
     * Calculate order wait time based on order-specific settings.
     *
     * @param array $settings Action settings
     * @return int Wait time in seconds
     */
    private function calculate_order_wait_time_period($settings)
    {
        $amount = intval($settings['order_wait_time_amount'] ?? 1);
        $unit = $settings['order_wait_time_unit'] ?? 'days';

        $multipliers = [
            'minutes' => 60,
            'hours'   => 3600,
            'days'    => 86400,
            'weeks'   => 604800,
            'months'  => 2592000 // 30 days
        ];

        return $amount * ($multipliers[$unit] ?? 86400);
    }

    /**
     * Schedule next run for the funnel sequence.
     * 
     * @param int $funnelSubscriberId Funnel subscriber ID
     * @param object $sequence Sequence object
     * @param int $nextRunTime Next run timestamp
     * @return void
     */
    private function schedule_next_run($funnelSubscriberId, $sequence, $nextRunTime)
    {
        // Aktualizace stavu na 'waiting'
        FunnelHelper::changeFunnelSubSequenceStatus($funnelSubscriberId, $sequence->id, 'waiting');

        // Naplánování dalšího spuštění
        $funnelSub = FunnelSubscriber::find($funnelSubscriberId);
        if ($funnelSub) {
            $funnelSub->next_sequence_id = $sequence->id;
            $funnelSub->last_sequence_id = $sequence->id;
            $funnelSub->next_execution_time = date('Y-m-d H:i:s', $nextRunTime);
            $funnelSub->save();
        }
    }
}
