<?php
namespace Wpcbooking\Models\Fields;

/**
 * Google Maps field type implementation.
 * Provides Google Maps location selection with autocomplete.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class GoogleMapsField extends AbstractField
{
    protected $field_type = 'google_maps';
    protected $field_name = 'Google Maps';
    protected $field_label = 'Google Maps';
    protected $field_description = 'Google Maps field with location selection and autocomplete';

    /**
     * Initialize Google Maps field type.
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
     * Validates and sanitizes JSON string with map data.
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
        if (empty($original_value)) {
            return '{}';
        }

        if (is_string($original_value)) {
            $fixed_value = $this->fix_unicode_escapes($original_value);
            
            $decoded = json_decode($fixed_value, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                 $sanitized = [];
                
                if (isset($decoded['address'])) {
                    $sanitized['address'] = sanitize_textarea_field($decoded['address']);
                }
                
                if (isset($decoded['lat'])) {
                    $sanitized['lat'] = floatval($decoded['lat']);
                }
                
                if (isset($decoded['lng'])) {
                    $sanitized['lng'] = floatval($decoded['lng']);
                }
                
                if (isset($decoded['country_code'])) {
                    $sanitized['country_code'] = sanitize_text_field($decoded['country_code']);
                }
                
                  return json_encode($sanitized, JSON_UNESCAPED_UNICODE);
            }
        }

         if (is_array($original_value)) {
            $sanitized = [];
            
            if (isset($original_value['address'])) {
                $sanitized['address'] = sanitize_textarea_field($original_value['address']);
            }
            
            if (isset($original_value['lat'])) {
                $sanitized['lat'] = floatval($original_value['lat']);
            }
            
            if (isset($original_value['lng'])) {
                $sanitized['lng'] = floatval($original_value['lng']);
            }
            
            if (isset($original_value['country_code'])) {
                $sanitized['country_code'] = sanitize_text_field($original_value['country_code']);
            }
            
            return json_encode($sanitized, JSON_UNESCAPED_UNICODE);
        }

        // Fallback: vrať prázdný objekt
        return '{}';
    }

    /**
     * Fix Unicode escape sequences in JSON string.
     * Converts incorrect format u00ed to correct \u00ed.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $json_string JSON string with potentially incorrect Unicode escapes
     * @return string Fixed JSON string
     */
    private function fix_unicode_escapes($json_string)
    {
         return preg_replace_callback(
            '/(?<!\\\\)u([0-9a-f]{4})/i',
            function($matches) {
                return '\\u' . $matches[1];
            },
            $json_string
        );
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
     * Enqueue admin scripts for Google Maps field.
     * Google Maps API scripts are typically loaded via main admin script.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_admin_scripts()
    {
        
    }
}
