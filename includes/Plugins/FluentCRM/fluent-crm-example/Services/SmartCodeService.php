<?php

namespace NBH\Includes\Services;

use NBH\Includes\Traits\NotificationTrait;
use FluentCrm\App\Models\FunnelSubscriber;
use NBH\Includes\SmartCodes\HospitalSmartCode;
use NBH\Includes\SmartCodes\DonorSmartCode;
use NBH\Includes\SmartCodes\PurchaseSmartCode;
use NBH\Includes\SmartCodes\GiftCertificateSmartCode;

/**
 * Service for handling FluentCRM smart codes.
 * 
 * This class initializes and manages all smart code groups.
 */
class SmartCodeService
{
    use NotificationTrait;

    private array $smart_code_instances = [];

    /**
     * Initialize all smart code groups.
     *
     * @return void
     */
    public function __construct()
    {
        $this->initialize_smart_codes();
        $this->init_all_smart_codes();
    }

    /**
     * Initialize all smart code instances.
     *
     * @return void
     */
    private function initialize_smart_codes(): void
    {
        try {
            $this->smart_code_instances = [
                'hospital' => new HospitalSmartCode(),
                'donor' => new DonorSmartCode(),
                'purchase' => new PurchaseSmartCode(),
                'gift' => new GiftCertificateSmartCode(),
            ];
        } catch (\Throwable $th) {
            $this->handle_error($th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine()
            ]);
        }
    }

    /**
     * Initialize all smart code groups with FluentCRM.
     *
     * @return void
     */
    private function init_all_smart_codes(): void
    {
        foreach ($this->smart_code_instances as $key => $instance) {
            try {
                $instance->init();
            } catch (\Throwable $th) {
                $this->handle_error($th->getMessage(), [
                    'file' => $th->getFile(),
                    'line' => $th->getLine(),
                    'smart_code_key' => $key
                ]);
            }
        }
    }

    // /**
    //  * Safe execution wrapper for smart code parsing.
    //  *
    //  * @param callable $callback
    //  * @param mixed $defaultValue
    //  * @return mixed
    //  */
    // protected function safe_execute(callable $callback, $defaultValue)
    // {
    //     try {
    //         return $callback();
    //     } catch (\Throwable $th) {
    //         $this->handle_error($th->getMessage(), [
    //             'file' => $th->getFile(),
    //             'line' => $th->getLine(),
    //             'smart_code_class' => get_class($this)
    //         ]);
    //         return $defaultValue;
    //     }
    // }

    // /**
    //  * Get hospital ID from FluentCRM subscriber context.
    //  * This is a common helper method for hospital-related smart codes.
    //  *
    //  * @param object $subscriber FluentCRM subscriber object
    //  * @return int|null Hospital ID or null if not found
    //  */
    // protected function get_hospital_id_from_subscriber(object $subscriber): ?int
    // {
    //     $hospital_id = null;
        
    //     if ($subscriber->funnel_subscriber_id) {
    //         $funnelSub = FunnelSubscriber::find($subscriber->funnel_subscriber_id);
    //         if ($funnelSub) {
    //             $hospital_id = $funnelSub->source_ref_id ?? null;
    //         }
    //     }

    //     if (!is_numeric($hospital_id) || !get_post($hospital_id)) {
    //         return null;
    //     }

    //     return (int) $hospital_id;
    // }

    // /**
    //  * Get user ID from FluentCRM subscriber.
    //  *
    //  * @param object $subscriber FluentCRM subscriber object
    //  * @return int|null User ID or null if not found
    //  */
    // protected function get_user_id_from_subscriber(object $subscriber): ?int
    // {
    //     return $subscriber->user_id ? (int) $subscriber->user_id : null;
    // }

    /**
     * Get a specific smart code instance.
     *
     * @param string $key Smart code group key
     * @return object|null
     */
    public function get_smart_code_instance(string $key): ?object
    {
        return $this->smart_code_instances[$key] ?? null;
    }

    /**
     * Get all smart code instances.
     *
     * @return array
     */
    public function get_all_smart_code_instances(): array
    {
        return $this->smart_code_instances;
    }


}
