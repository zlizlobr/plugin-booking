<?php

namespace NBH\Includes;

use NBH\Includes\Traits\NotificationTrait;
use NBH\Includes\Services\HospitalService;
use NBH\Includes\Services\ContactService;
use NBH\Includes\Services\SmartCodeService;
use NBH\Includes\Services\CronService;
use NBH\Includes\Services\HookService;
use NBH\Includes\Services\ListTagService;

// todo: contions uživatel zakoupl karmu nebo ne

/**
 * Main FluentCRM integration class.
 *
 * @version 1.0.0
 * @package NBH\FluentCrm
 * @author radek.chaloupka@artevio.com
 */
class FluentCRMIntegration
{
    use NotificationTrait;

    private HospitalService $hospital_service;
    private ContactService $contact_service;
    private SmartCodeService $smart_code_service;
    private CronService $cron_service;
    private HookService $hook_service;
    private ListTagService $list_tag_service;
   
    /**
     * Shared constants for FluentCRM integration.
     */
    public const ACF_EMAIL = 'field_67d960b98941b';
    public const ACF_HOSPITAL_NAME = 'field_67d95e0ea9de0';
    public const ACF_STATUS_NAME = 'tag_hospital_status';
    public const ACF_KARMA_NAME = 'tag_hospital_karma';

    // Hospital statuses
    public const STATUS_EMPTY = 'empty_hospital';
    public const STATUS_UNEQUIPPED = 'unequipped_hospital';
    public const STATUS_COMPLETED = 'completed_hospital';

    // Karma statuses
    public const KARMA_NOT_STARTED = 'karma_not_started';
    public const KARMA_STARTED = 'karma_started';


    // Recipients
    public const RECIPIENT_CREATOR = 'creator';
    public const RECIPIENT_ALL = 'all';

    // Meta keys
    public const META_HOSPITAL_CREATOR = '_hospital_creator';
    public const META_LIST_ID = '_fluent_list_id';

    // Hospital events
    public const EVENT_CREATE = 'create_hospital';
    public const EVENT_UPDATE = 'update_hospital';

    // FluentCRM List IDs
    public const LIST_NO_HOSPITAL = 458;        // "Bez nemocnice"
    public const LIST_GIFT_RECIPIENTS = 459;    // "Obdrželi dar"
    public const LIST_NO_ORDERS = 468;          // "Bez nákupu"
    
    // FluentCRM Tag IDs - Gender tags (FIXED)
    public const TAG_GENDER_MALE = 12;          // Muž
    public const TAG_GENDER_FEMALE = 10;        // Žena
    
    // FluentCRM Tag IDs - Repeat donor tags (FIXED)
    public const TAG_DONOR_1X = 13;             // 1x-donor
    public const TAG_DONOR_2X = 17;             // 2x-donor
    public const TAG_DONOR_3X = 16;             // 3x-donor
    public const TAG_DONOR_4_5X = 22;           // 4-5x-donor
    public const TAG_DONOR_VIP = 8;             // vip-donor (6+)
    
    // FluentCRM Tag IDs - Price range tags (FIXED)
    public const TAG_PRICE_SMALL = 11;          // small-donor (0-300 Kč)
    public const TAG_PRICE_MEDIUM = 14;         // medium-donor (301-1000 Kč)
    public const TAG_PRICE_LARGE = 9;           // large-donor (1001-3000 Kč)
    public const TAG_PRICE_MEGA = 24;           // mega-donor (3000+ Kč)
    
    // NOTE: Year tags (2016-2025+) are DYNAMIC - auto-created via ListTagService
    
    // FluentCRM Custom Contact Fields (donation statistics)
    public const FIELD_TOTAL_DONATIONS = 'total_donations_value';      // Celková hodnota objednávek
    public const FIELD_NUMBER_OF_DONATIONS = 'number_of_donations';    // Počet completed orders
    public const FIELD_AVERAGE_DONATION = 'average_donation';          // Průměrná hodnota objednávky
    public const FIELD_HIGHEST_DONATION = 'highest_donation';          // Maximální hodnota objednávky

    /**
     * Initialize FluentCRM integration and set up necessary hooks.
     *
     * @return void
     */
    public function __construct()
    {
        if (!$this->is_fluent_crm_active()) {
            $this->add_notice(
                __('The required FluentCRM plugin is missing. It must be installed for proper functionality.', 'nbh')
            );
            return;
        }

        $this->initialize_services();
        $this->register_hooks();
    }

    /**
     * Check if FluentCRM plugin is active.
     *
     * @return bool
     */
    private function is_fluent_crm_active(): bool
    {
        return is_plugin_active('fluent-crm/fluent-crm.php');
    }

    /**
     * Initialize all required services.
     *
     * @return void
     */
    private function initialize_services(): void
    {
        $this->contact_service = new ContactService();
        
        $this->smart_code_service = new SmartCodeService();
        
        $this->list_tag_service = new ListTagService(
            $this->contact_service
        );
        
        $this->cron_service = new CronService(
            $this->list_tag_service
        );
    
        $this->hospital_service = new HospitalService(
            $this->contact_service,
        );

        $this->hook_service = new HookService(
            $this->hospital_service,
            $this->contact_service,
            $this->smart_code_service,
            $this->cron_service,
            $this->list_tag_service
        );
    }

    /**
     * Register all WordPress hooks.
     *
     * @return void
     */
    private function register_hooks(): void
    {
        $this->hook_service->register_hooks();
    }

}
