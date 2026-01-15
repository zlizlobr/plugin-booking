<?php

namespace Wpcbooking\Controllers;

/**
 * Public controller for handling frontend functionality.
 * Manages public assets, scripts, and frontend hooks.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class PublicController
{


    /**
     * Initialize public controller.
     * Sets up frontend hooks for scripts and styles.
     *
     * @package Wpcbooking
     * @since 1.0.0
     */
    public function __construct()
    {
        $this->init_hooks();
    }

    /**
     * Initialize WordPress hooks for frontend.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    private function init_hooks()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_public_assets']);
        add_action('wpcbooking_enqueue_scripts', [$this, 'preline_enqueue_scripts'], 1);
        add_action('wpcbooking_enqueue_scripts', [$this, 'public_load_blocks_scripts'], 2);
        add_action('wpcbooking_enqueue_scripts', [$this, 'public_enqueue_scripts'], 99);
        add_filter('wpcbooking_public_scripts_deps', [$this, 'preline_public_scripts_deps'], 1);
    }

    /**
     * Enqueue public CSS assets.
     * Triggers wpcbooking_enqueue_scripts action for scripts.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function enqueue_public_assets()
    {
        wp_enqueue_style(
            'wpcbooking-public',
            WPCBOOKING_PLUGIN_URL . 'assets/css/dist/public.min.css',
            apply_filters('wpcbooking_public_styles_deps', []),
            WPCBOOKING_VERSION
        );
        do_action('wpcbooking_enqueue_scripts');
    }
    /**
     * Enqueue Preline UI library scripts and styles.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function preline_enqueue_scripts()
    {
        wp_enqueue_style(
            'preline-variants',
            WPCBOOKING_PLUGIN_URL . 'node_modules/preline/variants.css',
            [],
            '3.2.3'
        );
        wp_enqueue_script(
            'lodash-js',
            includes_url('js/dist/vendor/lodash.min.js'),
            [],
            '4.17.21',
            true
        );
        wp_enqueue_script(
            'preline-js',
            WPCBOOKING_PLUGIN_URL . 'node_modules/preline/dist/preline.js',
            [],
            '3.2.3',
            true
        );
    }
    /**
     * Add Preline dependencies to public scripts.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param array $attrs Current script dependencies
     * @return array Extended dependencies array
     */
    public function preline_public_scripts_deps($attrs)
    {
        return array_merge([
            'preline-js',
            // 'preline-datepicker', // Již nepotřeba - Calendar je čistý Preact komponent
            'lodash-js',
        ], $attrs);
    }
    /**
     * Enqueue main public JavaScript file.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @return void
     */
    public function public_enqueue_scripts()
    {

        $deps = apply_filters('wpcbooking_public_scripts_deps', ['jquery']);
        wp_enqueue_script(
            'wpcbooking-public',
            WPCBOOKING_PLUGIN_URL . 'assets/js/dist/public.js',
            $deps,
            WPCBOOKING_VERSION,
            true
        );
        wp_localize_script(
            'wpcbooking-public',
            'wpcbooking_public',
            [
                'plugin_url' => WPCBOOKING_PLUGIN_URL,
            ]
        );
    }
    /**
     * Load block-specific scripts dynamically.
     * Registers enqueue hooks for all block classes.
     *
     * @package Wpcbooking
     * @since 1.0.0
     *
     * @param mixed $attrs Unused parameter (for action hook compatibility)
     * @return void
     */
    public function public_load_blocks_scripts($attrs): void
    {
        $blocks_dir = WPCBOOKING_INCLUDES_DIR . '/Blocks/';
        $block_files = glob($blocks_dir . '*.php');
        foreach ($block_files as $file) {
            $filename = basename($file, '.php');
            if ($filename === 'AbstractBlock' || $filename === 'AbstractProductBlock') continue;
            $full_class_name = 'Wpcbooking\Blocks\\' . $filename;
            if (class_exists($full_class_name)) {
                $block_name = $full_class_name::get_block_name();
                if (!empty($block_name)) {
                    try {
                        add_action('wpcbooking_enqueue_scripts', [$full_class_name, 'enqueue_scripts']);
                        add_filter('wpcbooking_public_scripts_deps', [$full_class_name, 'public_scripts_deps']);
                    } catch (\Exception $e) {
                        error_log('[PublicController] Error loading block: ' . $full_class_name . ': ' . $e->getMessage());
                    }
                }
            }
        }
    }
}
