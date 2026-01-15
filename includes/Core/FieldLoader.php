<?php

namespace Wpcbooking\Core;

use Wpcbooking\Models\Fields\GoogleMapsField;
use Wpcbooking\Models\Fields\PriceTableField;

/**
 * Custom field types loader.
 * Initializes custom field types for WPify Custom Fields.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class FieldLoader
{
    /**
     * Initialize field loader.
     * Loads all custom field types.
     *
     * @package Wpcbooking
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->load_field_types();
    }

    /**
     * Load and initialize custom field types.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    private function load_field_types()
    {
        // List of field types to initialize
        $field_types = [
            'GoogleMapsField' => GoogleMapsField::class,
            'PriceTableField' => PriceTableField::class,
        ];

        // Initialize each field type with error handling
        foreach ($field_types as $name => $class) {
            try {
                new $class();
            } catch (\Exception $e) {
                error_log('[FieldLoader] Error initializing field type ' . $name . ': ' . $e->getMessage());
            } catch (\Error $e) {
                error_log('[FieldLoader] Fatal error initializing field type ' . $name . ': ' . $e->getMessage());
            }
        }
    }
}
