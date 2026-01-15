<?php
/**
 * Custom Post Type Registrar.
 *
 * Handles registration and management of custom post types in WordPress.
 * Provides a simplified interface for creating and registering CPTs with default settings.
 *
 * @class       CustomPostTypeRegistrar
 * @version     1.0.0
 * @package     Wpcbooking\Models
 */

namespace Wpcbooking\Models;

/**
 * Custom Post Type Registrar Class
 *
 * Handles registration of custom post types in WordPress with configurable options.
 * Provides default settings and allows customization through constructor arguments.
 *
 * @version  1.0.0
 * @package  Wpcbooking\Models
 */
class CustomPostTypeRegistrar
{
    /**
     * Post type slug.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slug;

    /**
     * Singular name for the post type.
     *
     * @since 1.0.0
     * @var string
     */
    private string $singular;

    /**
     * Additional arguments for post type registration.
     *
     * @since 1.0.0
     * @var array
     */
    private array $args;

    /**
     * Default constructor.
     *
     * Initializes the CPT registrar with slug, singular name and optional arguments.
     * Sets up the WordPress init hook for registration.
     *
     * @since 1.0.0
     * @param string $slug     Post type slug.
     * @param string $singular Singular name for the post type.
     * @param array  $args     Optional. Additional arguments for registration.
     */
    public function __construct(string $slug, string $singular, array $args = [])
    {
        $this->slug = $slug;
        $this->singular = $singular;
        $this->args = $args;
        add_action('init', [$this, 'register']);
    }

    /**
     * Registers the custom post type with WordPress.
     *
     * Creates labels and merges default arguments with custom arguments.
     * Only registers if the post type doesn't already exist.
     *
     * @since 1.0.0
     */
    public function register(): void
    {
        if (post_type_exists($this->slug)) {
            return;
        }
        $labels = [
            'name' => $this->singular,
            'singular_name' => $this->singular,
        ];
        $args = array_merge([
            'label' => $this->singular,
            'labels' => $labels,
            'public' => true,
            'show_ui' => true,
            'supports' => ['title'],
        ], $this->args);
        register_post_type($this->slug, $args);
    }
} 