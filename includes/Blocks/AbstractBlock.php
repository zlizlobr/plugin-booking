<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Traits\BookingHelperTrait;
use Wpcbooking\Traits\WooCommerceTrait;
use Wpcbooking\Cpt\Quote;
use Wpcbooking\Cpt\Booking;
use Wpcbooking\Controllers\BookingController;

abstract class AbstractBlock
{
    use WooCommerceTrait;
    use BookingHelperTrait;

    protected $block_name;
    protected $block_title;
    protected $block_description;
    protected $block_category;
    protected $block_icon;
    protected $block_keywords;
    protected static $instances = [];

    protected static $BLOCK_NAME = '';
    protected static $BLOCK_ICON = 'admin-generic';


    public function __construct()
    {
        $this->init_block_properties();
        $this->register_block();
        $this->init_hooks();
    }

    public static function get_instance()
    {
        $class_name = get_called_class();

        if (!isset(static::$instances[$class_name])) {
            static::$instances[$class_name] = new static();
        }
        return static::$instances[$class_name];
    }

    abstract protected function init_block_properties(): void;

    protected function init_hooks(): void
    {
        $block_name = static::get_block_name();
        $full_block_name = 'booking/' . $block_name;

        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
        add_filter(sprintf('wpcbooking_validate_block_%s', $full_block_name), [$this, 'validate_block'], 10, 3);
        add_filter(sprintf('wpcbooking_block_rules/%s', $full_block_name), [$this, 'get_block_rules'], 10, 2);
        add_filter(sprintf('wpcbooking_prepare_block_%s', $full_block_name), [$this, 'prepare_block'], 10, 1);
        add_filter(sprintf('wpcbooking_save_block_%s', $full_block_name), [$this, 'save_block'], 10, 4);
        add_action(sprintf('wpcbooking_update_block_%s', $full_block_name), [$this, 'update_block'], 10, 3);
        add_filter(sprintf('wpcbooking_quote_value_%s', $full_block_name), [$this, 'get_quote_value'], 10, 3);
        add_filter(sprintf('wpcbooking_block_price_%s', $full_block_name), [$this, 'get_block_price'], 10, 4);
        add_filter(sprintf('wpcbooking_block_render_data_%s', $full_block_name), [$this, 'get_block_render_data'], 10, 4);
    }
    public function update_block(int $quote_id, array $post_data = [], array $block = []): void
    {
        $field_id = $block['attrs']['field_id'] ?? null;

        if (
            !is_admin() ||
            !$field_id ||
            !$this->is_valid_quote_id($quote_id) ||
            isset($post_data[$field_id]) && $post_data[$field_id] === ''
        ) return;
        $data = [$field_id => $post_data[$field_id] ?? null];
        $this->save_meta_data($quote_id, $data);
    }
    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        return null;
    }
    public function get_block_amount($amount, $quote_id): float
    {
        return $amount;
    }

    public function validate_block($errors, $key, $value): array
    {
        return $errors;
    }
    public function register_block(): void
    {
        $options = [
            'name'            => 'booking/' . static::get_block_name(),
            'title'           => $this->get_block_title(),
            'category'        => $this->block_category,
            'description'     => $this->block_description,
            'keywords'        => $this->block_keywords,
            'icon'            => $this->block_icon,
            'render_callback' => [$this, 'render_block'],
            'tabs'            => $this->get_block_tabs(),
            'items'           => $this->get_block_attribute_items()
        ];
        wpify_custom_fields()->create_gutenberg_block($options);
    }
    public static function get_block_name(): string
    {
        return static::$BLOCK_NAME ?? '';
    }

    public static function get_block_icon(): string
    {
        return static::$BLOCK_ICON ?? '';
    }

    public function get_block_title(): string
    {
        return $this->block_title;
    }

    abstract protected function get_block_attribute_items(): array;
    protected function get_block_tabs(): array
    {
        return [];
    }


    protected function get_editor_script_handle(): string
    {
        return 'wpcbooking-blocks-editor';
    }

    protected function get_editor_style_handle(): string
    {
        return 'wpcbooking-blocks-editor-style';
    }

    protected function get_style_handle(): string
    {
        return 'wpcbooking-blocks-style';
    }

    public function enqueue_editor_assets(): void
    {
        // Enqueue block-specific CSS if it exists
        $this->enqueue_block_css();
    }

    protected function enqueue_block_css(): void
    {
        $block_name = static::get_block_name();
        $css_file = WPCBOOKING_PLUGIN_DIR . "assets/css/dist/blocks/{$block_name}.css";

        if (file_exists($css_file)) {
            $handle = "wpcbooking-{$block_name}-style";
            wp_enqueue_style(
                $handle,
                WPCBOOKING_PLUGIN_URL . "assets/css/dist/blocks/{$block_name}.css",
                [],
                filemtime($css_file)
            );
        }
    }

    public function enqueue_frontend_assets(): void
    {
        // Enqueue block-specific CSS if it exists
        $this->enqueue_block_css();
    }

    public function render_block($attributes, $content, $block): string
    {
        $block_name = static::get_block_name();

        $prepared_attributes = static::prepare_block($attributes);

        $template_output = $this->get_block_template($block_name, $prepared_attributes);

        return $template_output;
    }

    abstract public static function prepare_block(array $attributes): array;

    protected function get_block_template($template_name, $args = []): string
    {
        try {
            $template_path = WPCBOOKING_PLUGIN_DIR . 'includes/Views/Blocks/Public/';
            $result = booking_get_template($template_name, $args, $template_path);
            return $result;
        } catch (\Throwable $th) {
            return '';
        }
    }
    /**
     * Support base block
     **/
    protected function get_unique_id(): string
    {
        return 'booking_' . uniqid();
    }

    protected function get_block_step(string $field_id): ?int
    {
        static $booking_controller = null;

        if ($booking_controller === null) {
            $booking_id = $this->get_booking_id();
            if ($booking_id) {
                $booking_controller = BookingController::get_instance($booking_id);
            }
        }

        if ($booking_controller) {
            return $booking_controller->get_block_step($field_id);
        }

        return null;
    }

    public static function enqueue_scripts() {}
    public static function public_scripts_deps($attrs)
    {
        return $attrs;
    }
    protected function render_sub_tab_content(array $data): string
    {
        $tabs_html = '';
        $content_html = '';

        foreach ($data as $key => $value) {
            $tab_id = 'sub-tab-' . $key;
            $tabs_html .= '<button class="sub-tab-button" data-tab="' . $tab_id . '">' . $value . '</button>';
            $content_html .= '<div class="sub-tab-panel" id="' . $tab_id . '">' . $value . '</div>';
        }

        return '<div class="sub-tabs-container">
                    <div class="sub-tabs-nav">' . $tabs_html . '</div>
                </div>';
    }

    public function get_block_rules($rules, $attrs): array
    {
        $block_attrs = $attrs['attrs'] ?? $attrs;

        if (isset($block_attrs['advanced']['required']) && $block_attrs['advanced']['required'] == 1) {
            $rules['required'] = true;
        }

        return $rules;
    }

    public static function get_quote_value($value, $quote_id, $attrs = []): mixed
    {
        if (isset($value) && !empty($value)) {
            return $value;
        }
        $field_id = $attrs['field_id'] ?? $attrs['attrs']['field_id'] ?? null;
        if (!$field_id)  return $value;
        
        $meta_value = get_post_meta($quote_id, $field_id, true);
        if (isset($meta_value) && !empty($meta_value)) {
            return $meta_value ?? '';
        }
        return $attrs['general']['default'] ?? '';
    }

    public function get_block_price($price, $quote_id, $field_id, $inner_block): mixed
    {
        if ($field_id) {
            $meta_price   = get_post_meta($quote_id, $field_id . '_total', true);
            return is_numeric($meta_price) ? $meta_price : 0;
        }
        return $price;
    }

    /**
     * Get render data for summary section
     * Override this method in child classes to provide structured data for frontend rendering
     *
     * @param mixed $default Default value
     * @param int $quote_id Quote ID
     * @param string $field_id Field ID
     * @param array $block Block attributes
     * @return array|null Structured data for frontend rendering
     */
    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        // Default implementation - child classes should override this
        // Return null = no data to render

        //error_log('🔍 [AbstractBlock]-get_block_render_data default: ' . print_r($default, true));
        //error_log('🔍 [AbstractBlock]-get_block_render_data quote_id: ' . print_r($quote_id, true));
        // error_log('🔍 [AbstractBlock]-get_block_render_data field_id: ' . print_r($field_id, true));
        //error_log('🔍 [AbstractBlock]-get_block_render_data block: ' . print_r($block, true));
        return null;
    }

    protected function get_booking_fields(array $attributes = []): array
    {
        $post_id = $this->get_booking_id();
        if (!$post_id || get_post_type($post_id) !== Booking::SLUG) {

            return array_merge(
                [
                    'type'  => 'select',
                    'label' => __('Fields', 'wpcbooking'),
                    'options' => ['' => __('Select a field', 'wpcbooking')],
                ],
                $attributes
            );
        }
        $options = $this->get_dynamic_booking_fields_options($post_id);
        return array_merge(
            [
                'type'  => 'select',
                'label' => __('Fields', 'wpcbooking'),
                'options' => $options ?? [],
            ],
            $attributes
        );
    }

    protected function save_meta_data(int $quote_id, array $data): void
    {
        foreach ($data as $key => $val) {
            update_post_meta($quote_id, $key, $val);
        }
    }
    protected static function is_valid_quote_id(int $quote_id): bool
    {
        return get_post_type($quote_id) === Quote::SLUG;
    }

    protected function get_block_documentation(): string
    {
        $block_class = get_class($this);
        $block_name = basename(str_replace('\\', '/', $block_class));
        $doc_file = __DIR__ . '/docs/' . $block_name . '.md';

        if (file_exists($doc_file)) {
            $content = file_get_contents($doc_file);
            $html = $this->parse_markdown_to_html($content);
            return '<div class="wpcbooking-block-documentation">' . $html . '</div>';
        }
        return '<div class="wpcb-doc-error">' . __('Documentation not available.', 'wpcbooking') . '</div>';
    }

    protected function parse_markdown_to_html(string $markdown): string
    {
        $html = $markdown;

        $html = preg_replace('/^# (.+)$/m', '<h1 class="wpcb-doc-h1">$1</h1>', $html);
        $html = preg_replace('/^## (.+)$/m', '<h2 class="wpcb-doc-h2">$1</h2>', $html);
        $html = preg_replace('/^### (.+)$/m', '<h3 class="wpcb-doc-h3">$1</h3>', $html);
        $html = preg_replace('/^#### (.+)$/m', '<h4 class="wpcb-doc-h4">$1</h4>', $html);
        $html = preg_replace('/^##### (.+)$/m', '<h5 class="wpcb-doc-h5">$1</h5>', $html);

        $html = preg_replace('/\*\*(.+?)\*\*/s', '<strong>$1</strong>', $html);
        $html = preg_replace('/\*(.+?)\*/s', '<em>$1</em>', $html);
        $html = preg_replace('/`(.+?)`/', '<code class="wpcb-doc-code">$1</code>', $html);

        $html = preg_replace_callback('/^- (.+)$/m', function ($matches) {
            static $in_list = false;
            $item = '<li class="wpcb-doc-li">' . $matches[1] . '</li>';
            if (!$in_list) {
                $in_list = true;
                return '<ul class="wpcb-doc-ul">' . $item;
            }
            return $item;
        }, $html);

        $html = preg_replace('/<\/li>\n(?!<li|<ul)/', '</li></ul>' . "\n", $html);

        $html = wpautop($html);

        return $html;
    }

    protected function add_fluent_contact($data)
    {
        // Add contact to fleutn crm
        if (!function_exists('FluentCrmApi')) return;
        $contact = fluentcrm_get_current_contact();

        if (!isset($contact) || $contact->email !== $data['email']) {
            $contactApi = FluentCrmApi('contacts');
            $contact = $contactApi->createOrUpdate($data);
        } else {
            if (isset($data['tags']) && is_array($data['tags']))
                $contact->attachTags($data['tags']);

            if (isset($data['list']) && is_array($data['list']))
                $contact->attachLists($data['list']);
        }
    }
}
