<?php

namespace NBH\Includes\SmartCodes;

use NBH\Includes\Traits\NotificationTrait;
use FluentCrm\App\Models\FunnelSubscriber;
use Granam\CzechVocative\CzechName;

/**
 * Gift Certificate Smart Codes for FluentCRM
 * 
 * Provides smart codes for gift certificate information from WooCommerce orders.
 */
class GiftCertificateSmartCode
{
    use NotificationTrait;

    // Default fallback values
    private const DEFAULT_GREETING = 'Milý/á obdarovaný/obdarovaná,';
    private const DEFAULT_GREETING_HERO = 'Milý/á hrdino/hrdinko naší mise,';
    private const DEFAULT_GREETING_FORMAL = 'Vážený/á obdarovaný/obdarovaná,';

    /**
     * Initialize this smart code group with FluentCRM.
     *
     * @return void
     */
    public function init(): void
    {
        // Register smart code group
        add_filter('fluent_crm/smartcode_groups', [$this, 'pushSmartCodes']);
        
        // Register callback for parsing
        add_filter(
            'fluent_crm/smartcode_group_callback_' . $this->get_group_key(),
            [$this, 'parse_smart_code'],
            10,
            4
        );
    }

    /**
     * Push smart codes to FluentCRM.
     *
     * @param array $codes Existing smart codes
     * @return array Modified smart codes array
     */
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
        return 'gift';
    }

    public function get_group_title(): string
    {
        return __('Gift Certificate', 'nbh');
    }

    public function get_smart_codes(): array
    {
        return [
            '{{gift.recipient_addressing}}' => __('Obdarovaný Addressing (Milý Petře,)', 'nbh'),
            '{{gift.recipient_hero}}' => __('Obdarovaný Hero (Milý Petře, hrdino naší mise,)', 'nbh'),
            '{{gift.recipient_greeting}}' => __('Obdarovaný Time-based (Dobré ráno Petře,)', 'nbh'),
            '{{gift.recipient_formal_name}}' => __('Obdarovaný Formal (Vážený pane Novák,)', 'nbh'),
            '{{gift.recipient_name_vocative}}' => __('Oslovení obdarovaného (Petře,)', 'nbh'),
            '{{gift.recipient_first_name}}' => __('Jméno obdarovaného (Petr)', 'nbh'),
            '{{gift.recipient_last_name}}' => __('Příjmení obdarovaného (Novák)', 'nbh'),
            '{{gift.recipient_full_name}}' => __('Celé jméno (Petr Novák)', 'nbh'),
            '{{gift.recipient_email}}' => __('Email addresa obdarovaného', 'nbh'),
            '{{gift.message}}' => __('Zpráva pro obdarovaného', 'nbh'),
        ];
    }

    /**
     * Parse gift certificate smart codes
     *
     * @param string $code Smart code to parse
     * @param object $subscriber FluentCRM subscriber
     * @param string $defaultValue Default value if parsing fails
     * @param string $tag Original tag
     * @return string Parsed value
     */
    public function parse_smart_code(string $code, string $valueKey, $defaultValue, object $subscriber)
    {
        
        return $this->safe_execute(function() use ($valueKey, $subscriber, $defaultValue) {
            $order_id = null;
            $order = null;
            
            // Try to get order if we have subscriber
            if ($subscriber && $subscriber->email) {
                $order_id = $this->get_order_id_from_subscriber($subscriber);
                $order = wc_get_order($order_id);
            }

            $result = $this->get_gift_value($valueKey, $order, $subscriber, $defaultValue);
            return $result;
        }, self::DEFAULT_GREETING);
    }

    /**
     * Get gift value based on key.
     *
     * @param string $valueKey
     * @param object $order WooCommerce order
     * @param object $subscriber FluentCRM subscriber
     * @param mixed $defaultValue
     * @return mixed
     */
    private function get_gift_value(string $valueKey, object $order, object $subscriber, $defaultValue)
    {
        switch ($valueKey) {
            case 'recipient_email':
                if (!$order) {
                    return $defaultValue;
                }
                $giftEmail = $order->get_meta('_gift_email', true);
                return !empty($giftEmail) ? sanitize_email($giftEmail) : $defaultValue;

            case 'message':
                if (!$order) {
                    return $defaultValue;
                }
                $giftMessage = $order->get_meta('_gift_message', true);
                return !empty($giftMessage) ? wp_kses_post($giftMessage) : $defaultValue;

            case 'recipient_addressing':
                return $this->getRecipientAddressing($order, $defaultValue);

            case 'recipient_hero':
                return $this->getRecipientHero($order, $defaultValue);

            case 'recipient_greeting':
                return $this->getRecipientGreeting($order, $defaultValue);

            case 'recipient_formal_name':
                return $this->getRecipientFormalName($order, $defaultValue);

            case 'recipient_name_vocative':
                return $this->getRecipientNameVocative($order, $defaultValue);

            case 'recipient_first_name':
                if (!$order) {
                    return $defaultValue;
                }
                $giftName = $order->get_meta('_gift_name', true);
                return !empty($giftName) ? sanitize_text_field($giftName) : $defaultValue;

            case 'recipient_last_name':
                if (!$order) {
                    return $defaultValue;
                }
                $giftSurname = $order->get_meta('_gift_surname', true);
                return !empty($giftSurname) ? sanitize_text_field($giftSurname) : $defaultValue;

            case 'recipient_full_name':
                return $this->getRecipientFullName($order, $defaultValue);

            default:
                return $defaultValue;
        }
    }

    /**
     * Get hospital ID from FluentCRM subscriber context.
     *
     * @param object $subscriber FluentCRM subscriber object
     * @return int|null Hospital ID or null if not found
     */
    private function get_order_id_from_subscriber(object $subscriber): ?int
    {
        
        $order_id = null;
        
        $funnelSub = FunnelSubscriber::where('subscriber_id', $subscriber->id)
            ->whereNotNull('source_ref_id')
            ->orderBy('created_at', 'DESC')
            ->first();
        if ($funnelSub) {
            $order_id = $funnelSub->source_ref_id ?? null;
        } else {
            return null;
        }

        if (!is_numeric($order_id)) {
            return null;
        }
        
        if (!get_post($order_id)) {
            return null;
        }

        return (int) $order_id;
    }

    /**
     * Get recipient addressing (Milý Petře,)
     */
    private function getRecipientAddressing($order, string $defaultValue): string
    {
        if (!$order) {
            return self::DEFAULT_GREETING;
        }

        $giftName = $order->get_meta('_gift_name', true);
        $giftSex = $order->get_meta('_gift_sex', true);

        if (!$giftName && !$giftSex) {
            return self::DEFAULT_GREETING;
        }

        // Determine gender from sex or name
        $gender = null;
        if (in_array($giftSex, ['ms', 'Mrs.', 'female', 'Paní'])) {
            $gender = 'female';
        } elseif (in_array($giftSex, ['mr', 'male', 'Pan'])) {
            $gender = 'male';
        } elseif ($giftName) {
            $gender = $this->determine_gender($giftName);
        }

        // Set prefix based on gender
        if ($gender === 'female') {
            $prefix = 'Milá';
            $fallback_target = 'obdarovaná';
        } elseif ($gender === 'male') {
            $prefix = 'Milý';
            $fallback_target = 'obdarovaný';
        } else {
            // Fallback za fallback: pokud se nepodaří určit pohlaví
            return self::DEFAULT_GREETING;
        }

        // If we have gift name, try to get vocative
        if ($giftName) {
            try {
                $czechName = new CzechName();
                $vokativ = $czechName->vocative($giftName);
                return implode(' ', [$prefix, $vokativ]) . ',';
            } catch (\Exception $e) {
                // Fall through to use fallback target
            }
        }

        // Use fallback target (obdarovaný/obdarovaná) if no name or vocative failed
        return implode(' ', [$prefix, $fallback_target]) . ',';
    }

    /**
     * Get recipient hero addressing (Milý Petře, hrdino naší mise,)
     */
    private function getRecipientHero($order, string $defaultValue): string
    {
        if (!$order) {
            return self::DEFAULT_GREETING_HERO;
        }

        $giftName = $order->get_meta('_gift_name', true);
        $giftSex = $order->get_meta('_gift_sex', true);

        if (!$giftName && !$giftSex) {
            return self::DEFAULT_GREETING_HERO;
        }

        // Determine gender from sex or name
        $gender = null;
        if (in_array($giftSex, ['ms', 'Mrs.', 'female', 'Paní'])) {
            $gender = 'female';
        } elseif (in_array($giftSex, ['mr', 'male', 'Pan'])) {
            $gender = 'male';
        } elseif ($giftName) {
            $gender = $this->determine_gender($giftName);
        }

        // Set prefix and hero based on gender
        if ($gender === 'female') {
            $prefix = 'Milá';
            $hero = 'hrdinko';
            $fallback_target = 'obdarovaná';
        } elseif ($gender === 'male') {
            $prefix = 'Milý';
            $hero = 'hrdino';
            $fallback_target = 'obdarovaný';
        } else {
            // Fallback za fallback: pokud se nepodaří určit pohlaví
            return self::DEFAULT_GREETING_HERO;
        }

        // If we have gift name, try to get vocative
        if ($giftName) {
            try {
                $czechName = new CzechName();
                $vokativ = $czechName->vocative($giftName);
                return implode(' ', [$prefix, $vokativ]) . ', ' . $hero . ' naší mise,';
            } catch (\Exception $e) {
                // Fall through to use fallback target
            }
        }

        // Use fallback target (hero only) if no name or vocative failed
        return implode(' ', [$prefix, $hero]) . ' naší mise,';
    }

    /**
     * Get recipient time-based greeting (Dobré ráno Petře,)
     */
    private function getRecipientGreeting($order, string $defaultValue): string
    {
        // Determine greeting based on time of day
        $hour = (int) current_time('H');
        if ($hour < 12) {
            $greeting = 'Dobré ráno';
        } elseif ($hour < 18) {
            $greeting = 'Dobrý den';
        } else {
            $greeting = 'Dobrý večer';
        }

        // If no order, return time-based greeting without name
        if (!$order) {
            return $greeting . ',';
        }

        $giftName = $order->get_meta('_gift_name', true);
        
        // If no gift name, return time-based greeting without name
        if (empty($giftName)) {
            return $greeting . ',';
        }
        
        try {
            $czechName = new CzechName();
            $vokativ = $czechName->vocative($giftName);
            return $greeting . ' ' . $vokativ . ',';
        } catch (\Exception $e) {
            // If vocative fails, return time-based greeting without name
            return $greeting . ',';
        }
    }

    /**
     * Get recipient formal name (Vážený pane Novák,)
     */
    private function getRecipientFormalName($order, string $defaultValue): string
    {
        if (!$order) {
            return self::DEFAULT_GREETING_FORMAL;
        }

        $giftName = $order->get_meta('_gift_name', true);
        $giftSurname = $order->get_meta('_gift_surname', true);
        $giftSex = $order->get_meta('_gift_sex', true);

        if (!$giftName && !$giftSurname && !$giftSex) {
            return self::DEFAULT_GREETING_FORMAL;
        }

        // Determine gender from sex or name
        $gender = null;
        if (in_array($giftSex, ['ms', 'Mrs.', 'female', 'Paní'])) {
            $gender = 'female';
        } elseif (in_array($giftSex, ['mr', 'male', 'Pan'])) {
            $gender = 'male';
        } elseif ($giftName) {
            $gender = $this->determine_gender($giftName);
        }

        // Set title based on gender
        if ($gender === 'female') {
            $title = 'Vážená paní';
            $fallback_target = 'obdarovaná';
        } elseif ($gender === 'male') {
            $title = 'Vážený pane';
            $fallback_target = 'obdarovaný';
        } else {
            // Fallback za fallback: pokud se nepodaří určit pohlaví
            return self::DEFAULT_GREETING_FORMAL;
        }

        // If we have surname, use it with title
        if ($giftSurname) {
            try {
                $czechName = new CzechName();
                $surname_vocative = $czechName->vocative($giftSurname, ($gender === 'female'), true);
                return implode(' ', [$title, $surname_vocative]) . ',';
            } catch (\Exception $e) {
                // Fallback to generic addressing if vocative fails
                $formal_prefix = ($gender === 'female') ? 'Vážená' : 'Vážený';
                return implode(' ', [$formal_prefix, $fallback_target]) . ',';
            }
        }

        // Use fallback target (obdarovaný/obdarovaná) if no surname
        $formal_prefix = ($gender === 'female') ? 'Vážená' : 'Vážený';
        return implode(' ', [$formal_prefix, $fallback_target]) . ',';
    }

    /**
     * Determine recipient gender from gift_sex field
     */
    private function getRecipientGender(\WC_Order $order): string
    {
        $giftSex = $order->get_meta('_gift_sex', true);
        
        switch ($giftSex) {
            case 'Mr.':
                return 'male';
            case 'Ms.':
                return 'female';
            default:
                return 'unknown';
        }
    }

    /**
     * Get recipient name in vocative case (Petře,)
     */
    private function getRecipientNameVocative($order, string $defaultValue): string
    {
        if (!$order) {
            return self::DEFAULT_GREETING;
        }

        $giftName = $order->get_meta('_gift_name', true);
        
        if (empty($giftName)) {
            return self::DEFAULT_GREETING;
        }
        
        try {
            $czechName = new CzechName();
            return $czechName->vocative($giftName) . ',';
        } catch (\Exception $e) {
            return $giftName . ',';
        }
    }


    /**
     * Safe execution wrapper with error handling
     *
     * @param callable $callback Function to execute
     * @param mixed $defaultValue Default value on error
     * @return mixed
     */
    private function safe_execute(callable $callback, $defaultValue)
    {
        try {
            return $callback();
        } catch (\Throwable $th) {
            $this->handle_error($th->getMessage(), [
                'file' => $th->getFile(),
                'line' => $th->getLine(),
                'smart_code_class' => __CLASS__
            ]);
            return $defaultValue;
        }
    }

    /**
     * Get recipient full name (first name + surname) without declension
     */
    private function getRecipientFullName($order, string $defaultValue): string
    {
        if (!$order) {
            return $defaultValue;
        }

        $giftName = $order->get_meta('_gift_name', true);
        $giftSurname = $order->get_meta('_gift_surname', true);
        
        if (empty($giftName) && empty($giftSurname)) {
            return $defaultValue;
        }
        
        // Return full name without declension
        $parts = array_filter([$giftName, $giftSurname]);
        return implode(' ', $parts);
    }

    /**
     * Determine gender from Czech first name using CzechName library.
     *
     * @param string $first_name First name
     * @return string 'male', 'female', or 'unknown'
     */
    private function determine_gender(string $first_name): string
    {
        if (!$first_name) {
            return 'unknown';
        }

        try {
            $czechName = new CzechName();
            $is_male = $czechName->isMale($first_name);
            return $is_male ? 'male' : 'female';
        } catch (\Exception $e) {
            // Fallback to simple detection if CzechName fails
            $first_name = strtolower(trim($first_name));
            
            // Common Czech female name endings
            $female_endings = ['a', 'e', 'ie'];
            
            // Check if name ends with typical female endings
            foreach ($female_endings as $ending) {
                if (substr($first_name, -strlen($ending)) === $ending) {
                    return 'female';
                }
            }
            
            // Most other Czech names are male
            return 'male';
        }
    }
}

