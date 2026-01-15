<?php
namespace Wpcbooking\Models\Fields;

/**
 * Abstract base class for custom field types.
 * Provides integration with WPify Custom Fields plugin.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
abstract class AbstractField
{
    protected $field_type;
    protected $field_name;
    protected $field_label;
    protected $field_description;

    /**
     * Initialize field type.
     * Registers WordPress filters and hooks.
     *
     * @package Wpcbooking
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->init();
    }

    /**
     * Initialize field type filters and hooks.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function init()
    {
        // Registrace WordPress filtrů pro WPify Custom Fields
        add_filter("wpifycf_sanitize_{$this->field_type}", [$this, 'sanitize_value'], 10, 3);
        add_filter("wpifycf_wp_type_{$this->field_type}", [$this, 'get_wp_type'], 10, 2);
        add_filter("wpifycf_default_value_{$this->field_type}", [$this, 'get_default_value'], 10, 2);
        
        // Enqueue scripts pouze v admin části
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
    }

    /**
     * Sanitize field value.
     * Must be implemented by child classes.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param mixed $sanitized_value Already sanitized value
     * @param mixed $original_value Original value before sanitization
     * @param array $item Field item configuration
     * @return mixed Sanitized value
     */
    abstract public function sanitize_value($sanitized_value, $original_value, $item);

    /**
     * Get WordPress data type for field.
     * Must be implemented by child classes.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param string $type Current WordPress type
     * @param array $item Field item configuration
     * @return string WordPress data type
     */
    abstract public function get_wp_type($type, $item);

    /**
     * Get default value for field.
     * Must be implemented by child classes.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param mixed $default_value Current default value
     * @param array $item Field item configuration
     * @return mixed Default value
     */
    abstract public function get_default_value($default_value, $item);

    /**
     * Enqueue frontend scripts for field type.
     * Override in child classes if needed.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_scripts()
    {
        // Override v child třídách
    }

    /**
     * Enqueue admin scripts for field type.
     * Override in child classes if needed.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_admin_scripts()
    {
        // Override v child třídách
    }

    /**
     * Get field type name.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return string Field type name
     */
    public function get_field_type()
    {
        return $this->field_type;
    }

    /**
     * Get field name.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return string Field name
     */
    public function get_field_name()
    {
        return $this->field_name;
    }

    /**
     * Get field label.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return string Field label
     */
    public function get_field_label()
    {
        return $this->field_label;
    }

    /**
     * Get field description.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return string Field description
     */
    public function get_field_description()
    {
        return $this->field_description;
    }
} 