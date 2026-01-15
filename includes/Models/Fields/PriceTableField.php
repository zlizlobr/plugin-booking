<?php
namespace Wpcbooking\Models\Fields;

/**
 * Price Table field type implementation.
 * Provides interactive price table builder for options and variants.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class PriceTableField extends AbstractField
{
    protected $field_type = 'price_table';
    protected $field_name = 'Price Table';
    protected $field_label = 'Price Table';
    protected $field_description = 'Interactive price table builder for options and variants';

    /**
     * Initialize Price Table field type.
     *
     * @package Wpcbooking
     * @since 1.0.0
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Sanitize field value.
     * Validates and sanitizes JSON string with table data.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param mixed $sanitized_value Already sanitized value
     * @param mixed $original_value Original value before sanitization
     * @param array $item Field item configuration
     * @return string Sanitized JSON string
     */
    public function sanitize_value($sanitized_value, $original_value, $item)
    {
        // Pokud je hodnota prázdná, vrať prázdný JSON objekt
        if (empty($original_value)) {
            return '{}';
        }

        // Pokud už je to JSON string, zkontroluj validitu
        if (is_string($original_value)) {
            $decoded = json_decode($original_value, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                // Znovu zakóduj pro konzistenci
                return json_encode($decoded);
            }
        }

        // Pokud je to pole, převeď na JSON
        if (is_array($original_value)) {
            return json_encode($original_value);
        }

        // Fallback: vrať prázdný objekt
        return '{}';
    }

    /**
     * Get WordPress data type for field.
     * Stores as string (JSON).
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $type Current WordPress type
     * @param array $item Field item configuration
     * @return string WordPress data type
     */
    public function get_wp_type($type, $item)
    {
        return 'string';
    }

    /**
     * Get default value for field.
     * Returns empty JSON object.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param mixed $default_value Current default value
     * @param array $item Field item configuration
     * @return string Default JSON string
     */
    public function get_default_value($default_value, $item)
    {
        return '{}';
    }

    /**
     * Enqueue admin scripts for Price Table field.
     * TableBuilderComponent scripts are typically loaded via main admin script.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_admin_scripts()
    {
        // Skripty jsou pravděpodobně už načtené přes hlavní admin skript
        // Pokud potřebuješ specifické skripty, přidej je zde
    }
}

