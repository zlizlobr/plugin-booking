<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;
use Wpcbooking\Api\googleDistanceAPI;

class GoogleMap extends AbstractBlock
{
    protected static $BLOCK_NAME = 'google-map';
    protected static $BLOCK_ICON = 'location';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Google Map Input', 'wpcbooking');
        $this->block_description = __('Display a Google Maps input field with location selection', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'location';
        $this->block_keywords = ['booking', 'map', 'google', 'location', 'address'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'general' => __('General', 'wpcbooking'),
            'advanced' => __('Advanced', 'wpcbooking'),
            'calculation_quote' => __('Calculation Quote', 'wpcbooking'),
            'user' => __('User', 'wpcbooking'),
            'documentation' => __('Documentation', 'wpcbooking'),
        ];
    }

    protected function get_block_attribute_items(): array
    {
        return [
            [
                'type' => 'group',
                'id' => 'general',
                'items' => $this->get_tab_general(),
                'tab' => 'general',
            ],
            [
                'type' => 'group',
                'id' => 'advanced',
                'label' => __('Advanced', 'wpcbooking'),
                'items' => $this->get_tab_advanced(),
                'tab' => 'advanced',
            ],
            [
                'type' => 'group',
                'id' => 'calculation_quote',
                'label' => __('Calculation Quote', 'wpcbooking'),
                'items' => $this->get_tab_calculation_quote(),
                'tab' => 'calculation_quote',
            ],
            [
                'type' => 'group',
                'id' => 'user',
                'label' => __('User', 'wpcbooking'),
                'items' => $this->get_tab_user(),
                'tab' => 'user',
            ],
            'field_id' => [
                'id' => 'field_id',
                'type' => 'hidden',
                'value' => $this->get_unique_id(),
            ],
            [
                'type' => 'html',
                'id' => 'documentation_content',
                'content' => $this->get_block_documentation(),
                'tab' => 'documentation',
            ]
        ];
    }


    protected function get_tab_general(): array
    {
        return array_merge([
            'label' => [
                'id' => 'label',
                'type' => 'text',
                'label' => __('Label', 'wpcbooking'),
                'default' => 'title',
            ],
            'thumbnail_id' => [
                'id' => 'thumbnail_id',
                'type' => 'attachment',
                'label' => __('SVG Icon', 'wpcbooking'),
                'attachment_type' => 'image',
                'mime_types' => 'svg',
            ],
            'required' => [
                'id' => 'required',
                'type' => 'toggle',
                'label' => __('Required', 'wpcbooking'),
                'default' => false,
            ],


        ], $this->get_map_options());
    }

    protected function get_map_options(): array
    {
        return [
            'sub_tabs' => [
                'id' => 'sub_tabs',
                'type' => 'html',
                'content' => $this->render_sub_tab_content(
                    [
                        'basic_settings' => __('Basic Settings', 'wpcbooking'),
                        'controls' => __('Controls', 'wpcbooking'),
                        'behavior' => __('Behavior', 'wpcbooking'),
                        'ui_optimization' => __('UI & Optimization', 'wpcbooking')
                    ]
                ),
            ],
            [
                'type' => 'group',
                'id' => 'basic_settings',
                'items' => $this->get_basic_settings(),
                'className' => 'sub-tab-content-basic_settings',
            ],
            [
                'type' => 'group',
                'id' => 'controls',
                'items' => $this->get_controls_settings(),
                'className' => 'sub-tab-content-controls',
            ],
            [
                'type' => 'group',
                'id' => 'behavior',
                'items' => $this->get_behavior_settings(),
                'className' => 'sub-tab-content-behavior',
            ],
            [
                'type' => 'group',
                'id' => 'ui_optimization',
                'items' => $this->get_ui_optimization_settings(),
                'className' => 'sub-tab-content-ui_optimization',
            ],
        ];
    }



    protected function get_basic_settings(): array
    {
        return [
            'mapTypeId' => [
                'id' => 'mapTypeId',
                'type' => 'select',
                'label' => __('Map Type', 'wpcbooking'),
                'default' => 'roadmap',
                'options' => [
                    'roadmap' => __('Roadmap', 'wpcbooking'),
                    'satellite' => __('Satellite', 'wpcbooking'),
                    'hybrid' => __('Hybrid', 'wpcbooking'),
                    'terrain' => __('Terrain', 'wpcbooking'),
                ],
            ],
            'showStoreAddress' => [
                'id' => 'showStoreAddress',
                'type' => 'toggle',
                'label' => __('Show Store Address', 'wpcbooking'),
                'default' => false,
            ],
            'center_lat' => [
                'id' => 'center_lat',
                'type' => 'text',
                'label' => __('Center Latitude', 'wpcbooking'),
                'default' => '50.0755',
            ],
            'center_lng' => [
                'id' => 'center_lng',
                'type' => 'text',
                'label' => __('Center Longitude', 'wpcbooking'),
                'default' => '14.4378',
            ],
            'zoom' => [
                'id' => 'zoom',
                'type' => 'number',
                'label' => __('Zoom Level', 'wpcbooking'),
                'default' => 16,
                'min' => 1,
                'max' => 21,
            ],
            'min_zoom' => [
                'id' => 'min_zoom',
                'type' => 'number',
                'label' => __('Min Zoom', 'wpcbooking'),
                'default' => 1,
                'min' => 1,
                'max' => 21,
            ],
            'max_zoom' => [
                'id' => 'max_zoom',
                'type' => 'number',
                'label' => __('Max Zoom', 'wpcbooking'),
                'default' => 21,
                'min' => 1,
                'max' => 21,
            ],
            'height' => [
                'id' => 'height',
                'type' => 'number',
                'label' => __('Map Height (px)', 'wpcbooking'),
                'default' => 400,
                'min' => 200,
                'max' => 800,
            ],
        ];
    }

    protected function get_controls_settings(): array
    {
        return [
            'mapTypeControl' => [
                'id' => 'mapTypeControl',
                'type' => 'toggle',
                'label' => __('Map Type Control', 'wpcbooking'),
                'default' => true,
            ],
            'streetViewControl' => [
                'id' => 'streetViewControl',
                'type' => 'toggle',
                'label' => __('Street View Control', 'wpcbooking'),
                'default' => true,
            ],
            'fullscreenControl' => [
                'id' => 'fullscreenControl',
                'type' => 'toggle',
                'label' => __('Fullscreen Control', 'wpcbooking'),
                'default' => true,
            ],
            'zoomControl' => [
                'id' => 'zoomControl',
                'type' => 'toggle',
                'label' => __('Zoom Control', 'wpcbooking'),
                'default' => true,
            ],
            'scaleControl' => [
                'id' => 'scaleControl',
                'type' => 'toggle',
                'label' => __('Scale Control', 'wpcbooking'),
                'default' => false,
            ],
            'rotateControl' => [
                'id' => 'rotateControl',
                'type' => 'toggle',
                'label' => __('Rotate Control', 'wpcbooking'),
                'default' => false,
            ],
            'panControl' => [
                'id' => 'panControl',
                'type' => 'toggle',
                'label' => __('Pan Control', 'wpcbooking'),
                'default' => false,
            ],
        ];
    }

    protected function get_behavior_settings(): array
    {
        return [
            'draggable' => [
                'id' => 'draggable',
                'type' => 'toggle',
                'label' => __('Draggable', 'wpcbooking'),
                'default' => true,
            ],
            'scrollwheel' => [
                'id' => 'scrollwheel',
                'type' => 'toggle',
                'label' => __('Scroll Wheel Zoom', 'wpcbooking'),
                'default' => true,
            ],
            'disableDoubleClickZoom' => [
                'id' => 'disableDoubleClickZoom',
                'type' => 'toggle',
                'label' => __('Disable Double Click Zoom', 'wpcbooking'),
                'default' => false,
            ],
            'gestureHandling' => [
                'id' => 'gestureHandling',
                'type' => 'select',
                'label' => __('Gesture Handling', 'wpcbooking'),
                'default' => 'auto',
                'options' => [
                    'auto' => __('Auto', 'wpcbooking'),
                    'cooperative' => __('Cooperative', 'wpcbooking'),
                    'greedy' => __('Greedy', 'wpcbooking'),
                    'none' => __('None', 'wpcbooking'),
                ],
            ],
            'keyboardShortcuts' => [
                'id' => 'keyboardShortcuts',
                'type' => 'toggle',
                'label' => __('Keyboard Shortcuts', 'wpcbooking'),
                'default' => true,
            ],
        ];
    }

    protected function get_ui_optimization_settings(): array
    {
        return [
            'disableDefaultUI' => [
                'id' => 'disableDefaultUI',
                'type' => 'toggle',
                'label' => __('Disable Default UI', 'wpcbooking'),
                'default' => false,
            ],
            'clickableIcons' => [
                'id' => 'clickableIcons',
                'type' => 'toggle',
                'label' => __('Clickable Icons', 'wpcbooking'),
                'default' => true,
            ],
            'optimized' => [
                'id' => 'optimized',
                'type' => 'toggle',
                'label' => __('Optimized', 'wpcbooking'),
                'default' => true,
            ],
            /*'backgroundColor' => [
                'type' => 'color',
                'label' => __('Background Color', 'wpcbooking'),
                'default' => '#ffffff',
            ],*/
        ];
    }

    protected function get_tab_advanced(): array
    {
        return [
            'placeholder' => [
                'id' => 'placeholder',
                'type' => 'text',
                'label' => __('Placeholder Text', 'wpcbooking'),
            ],
            'required' => [
                'id' => 'required',
                'type' => 'toggle',
                'label' => __('Required', 'wpcbooking'),
            ]
        ];
    }

    protected function get_tab_calculation_quote(): array
    {
        return [
            'apply_calculation' => [
                'id' => 'apply_calculation',
                'type' => 'toggle',
                'label' => __('Apply price calculation', 'wpcbooking'),
            ],
            'distance_calculation' => [
                'id' => 'distance_calculation',
                'type' => 'multi_group',
                'label' => __('Distance calculation', 'wpcbooking'),
                'items' => [
                    'range' => [
                        'id' => 'range',
                        'type' => 'number',
                        'label' => __('Range (km)', 'wpcbooking'),
                    ],
                    'price_increase' => [
                        'id' => 'price_increase',
                        'type' => 'number',
                        'label' => __('Price Increase (%)', 'wpcbooking'),
                    ],
                ],
                'conditions' => [
                    [
                        'field' => '#.apply_calculation',
                        'condition' => '==',
                        'value' => true,
                    ],
                ],
            ],
        ];
    }

    protected function get_tab_user(): array
    {
        return [
            'save_to_user' => [
                'id' => 'save_to_user',
                'type' => 'toggle',
                'label' => __('Save to User Profile', 'wpcbooking'),
                'default' => false,
                'description' => __('Save address to user profile', 'wpcbooking'),
            ],
            'address_type' => [
                'id' => 'address_type',
                'type' => 'select',
                'label' => __('Address Type', 'wpcbooking'),
                'default' => 'billing',
                'options' => [
                    'billing' => __('Billing Address', 'wpcbooking'),
                    'shipping' => __('Shipping Address', 'wpcbooking'),
                    'both' => __('Both (Billing & Shipping)', 'wpcbooking'),
                    'event_location' => __('Event Location', 'wpcbooking'),
                    'custom' => __('Custom Meta Field', 'wpcbooking'),
                ],
                'conditions' => [
                    [
                        'field' => '#.save_to_user',
                        'condition' => '==',
                        'value' => true,
                    ],
                ],
            ],
            'custom_meta_key' => [
                'id' => 'custom_meta_key',
                'type' => 'text',
                'label' => __('Custom Meta Key Prefix', 'wpcbooking'),
                'placeholder' => 'event',
                'description' => __('Will save as: prefix_address, prefix_city, prefix_lat, etc.', 'wpcbooking'),
                'conditions' => [
                    [
                        'field' => '#.address_type',
                        'condition' => '==',
                        'value' => 'custom',
                    ],
                ],
            ],
        ];
    }

    public static function prepare_block(array $attributes): array
    {
        // Extract general and   advanced settings
        $general = $attributes['general'] ?? [];
        $advanced = $attributes['advanced'] ?? [];
        // Get icon URL
        $general['icon_url'] = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;

        // Get label and placeholder
        $label = $general['label'] ?? __('Label', 'wpcbooking');
        $placeholder = $general['placeholder'] ?? false;

        // Get field ID
        $key = $attributes['field_id'] ?? '';

        // Get current value
        $value = '';

        // Get global options
        $global_options = ''; //$this->get_form_options($this->get_current_booking());
        $store_address = isset($global_options['store_address']) ? $global_options['store_address'] : '';

        // Get map options
        $options_field_type = $general['google_map_options'] ?? [];
        $booking_id = static::get_booking_id();
        $shop_address = '';
        if ($booking_id) {
            $global_options = get_booking_options_basics($booking_id);
            $shop_address = $global_options['store_location'] ?? '';
            if (self::is_valid_quote_id(get_the_ID())) {
                $_store_location = get_post_meta(get_the_ID(), $key . '_store_location', true) ?? $shop_address;
                $shop_address = strlen($_store_location) > 10 ? $_store_location : $shop_address;
            }
        }


        // Prepare the attributes array with all necessary data
        $prepared_attributes = array_merge($attributes, [
            'label' => $label,
            'placeholder' => $placeholder,
            'id' => $key,
            'value' => $value,
            'field' => $options_field_type,
            'general' => $general,
            'advanced' => $advanced,
            'block_icon' => static::get_block_icon(),
            'shop_address' => $shop_address,
        ]);
        $quote_id = static::get_current_quote_id();
        if (is_int($quote_id)) {
            $prepared_attributes['value'] = static::get_quote_value('', $quote_id, $attributes);
        }
        if (is_int($quote_id) && isset($attributes['calculation_quote']['apply_calculation']) && $attributes['calculation_quote']['apply_calculation'] == 1) {
            $prepared_attributes['quote_id'] = $quote_id;
            $prepared_attributes['price_increase'] = get_post_meta($quote_id, $key . '_price_increase', true) ?? [];
            $prepared_attributes['distance'] = get_post_meta($quote_id, $key . '_distance', true) ?? 0;
        }
        return $prepared_attributes;
    }

    /**
     * Get form options
     */
    private function get_form_options($booking_id)
    {
        // This would need to be implemented based on your booking system
        // For now, returning default options
        return [
            'store_address' => [
                'lat' => 46.4519675,
                'lng' => 3.3221324,
            ],
        ];
    }
    public static function enqueue_scripts()
    {
        // Get API key from block attributes or global settings
        $api_key = booking_get_maps_api_key();

        if (empty($api_key)) {
            return;
        }

        // Enqueue Google Maps JavaScript API
        wp_enqueue_script(
            'google-maps-api',
            "https://maps.googleapis.com/maps/api/js?key={$api_key}&libraries=places,geometry",
            [],
            null,
            true
        );
    }

    public static function public_scripts_deps($attrs)
    {

        return array_merge($attrs, []);
    }

    public function get_block_rules($rules, $attrs): array
    {
        $block_attrs = $attrs['attrs'] ?? $attrs;

        // Check required from both general and advanced tabs
        $required_general = isset($block_attrs['general']['required']) && $block_attrs['general']['required'] == 1;
        $required_advanced = isset($block_attrs['advanced']['required']) && $block_attrs['advanced']['required'] == 1;

        $rules['required'] = $required_general || $required_advanced;
        $rules['location'] = true; // Custom validation type for location/map

        return $rules;
    }

    public function validate_block($errors, $value, $block): array
    {
        // Check required from both general and advanced tabs
        $required_general = isset($block['attrs']['general']['required']) && $block['attrs']['general']['required'] == 1;
        $required_advanced = isset($block['attrs']['advanced']['required']) && $block['attrs']['advanced']['required'] == 1;
        $required = $required_general || $required_advanced;

        $value = trim($value);

        // Check required
        if ($required && ($value === '' || $value === null)) {
            $label = $block['attrs']['general']['label'] ?? __('Location', 'wpcbooking');
            $errors[] = sprintf(__('The %s is required.', 'wpcbooking'), $label);
            return $errors;
        }

        // If value is empty and not required, it's valid
        if ($value === '' || $value === null) {
            return $errors;
        }

        // Validate location format - should be JSON with lat/lng or address string
        // Try to parse as JSON first (for coordinates)
        $decoded = json_decode($value, true);
        if ($decoded !== null && is_array($decoded)) {
            // Check if it has valid coordinates
            if (isset($decoded['lat']) && isset($decoded['lng'])) {
                $lat = (float) $decoded['lat'];
                $lng = (float) $decoded['lng'];

                // Validate latitude range (-90 to 90)
                if ($lat < -90 || $lat > 90) {
                    $errors[] = __('Invalid latitude. Must be between -90 and 90.', 'wpcbooking');
                }

                // Validate longitude range (-180 to 180)
                if ($lng < -180 || $lng > 180) {
                    $errors[] = __('Invalid longitude. Must be between -180 and 180.', 'wpcbooking');
                }
            } elseif (isset($decoded['address'])) {
                // Address format is valid
                if (empty(trim($decoded['address']))) {
                    $errors[] = __('Please provide a valid address.', 'wpcbooking');
                }
            } else {
                $errors[] = __('Invalid location format. Please select a location on the map.', 'wpcbooking');
            }
        } else {
            // If not JSON, check if it's a valid address string
            if (strlen($value) < 3) {
                $errors[] = __('Please provide a valid address or select a location on the map.', 'wpcbooking');
            }
        }

        return $errors;
    }

    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!$field_id || !$this->is_valid_quote_id($quote_id)) return null;
        $data = [$field_id => $value];
        $decoded_value = is_string($value) ? json_decode($value, true) : $value;

        if (is_array($decoded_value) && !empty($decoded_value)) {
            $data = $this->process_location_data($quote_id, $decoded_value, $block, $data, $field_id);
        }

        $this->save_meta_data($quote_id, $data);
        return $data;
    }


    protected function process_location_data(int $quote_id, array $decoded_value, array $block, array $data, string $field_id): array
    {
        $data = $this->process_country_code($decoded_value, $data);
        $data = $this->process_user_address_data($decoded_value, $block, $data);
        $data = $this->process_distance_calculation($quote_id, $decoded_value, $block, $data, $field_id);

        return $data;
    }

    protected function process_country_code(array $decoded_value, array $data): array
    {
        if (isset($decoded_value['country_code'])) {
            $data['_country_short'] = strtolower($decoded_value['country_code']);
        }

        return $data;
    }

    protected function process_user_address_data(array $decoded_value, array $block, array $data): array
    {
        $user_settings = $block['attrs']['user'] ?? [];
        $save_to_user = $user_settings['save_to_user'] ?? false;

        if (!$save_to_user) {
            return $data;
        }

        $address_type = $user_settings['address_type'] ?? 'billing';
        $address_data = $this->parse_address_data($decoded_value);

        return $this->map_user_address_by_type($address_data, $address_type, $user_settings, $data);
    }

    protected function map_user_address_by_type(array $address_data, string $address_type, array $user_settings, array $data): array
    {
        switch ($address_type) {
            case 'billing':
                $data = array_merge($data, $this->map_address_fields($address_data, 'billing'));
                break;

            case 'shipping':
                $data = array_merge($data, $this->map_address_fields($address_data, 'shipping'));
                break;

            case 'both':
                $data = array_merge($data, $this->map_address_fields($address_data, 'billing'));
                $data = array_merge($data, $this->map_address_fields($address_data, 'shipping'));
                break;

            case 'event_location':
                $data = array_merge($data, $this->map_address_fields($address_data, 'event', true));
                break;

            case 'custom':
                $custom_prefix = $user_settings['custom_meta_key'] ?? '';
                if (!empty($custom_prefix)) {
                    $data = array_merge($data, $this->map_address_fields($address_data, sanitize_key($custom_prefix), true));
                }
                break;
        }

        return $data;
    }

    protected function process_distance_calculation(int $quote_id, array $decoded_value, array $block, array $data, string $field_id): array
    {
        $calculation_quote = $block['attrs']['calculation_quote'] ?? [];
        if (!isset($calculation_quote['apply_calculation']) || $calculation_quote['apply_calculation'] != 1) {
            return $data;
        }
        $form_options = get_booking_options_basics(self::get_booking_id($quote_id));
        $store = $form_options['store_location'] ?? null;
        $store = is_string($store) ? json_decode($store, true) : $store;
        if (!$this->has_valid_coordinates($store, $decoded_value)) {
            return $data;
        }

        try {
            $distance = $this->calculate_distance($decoded_value, $store);
            $price_increase = $this->get_price_increase_from_block($calculation_quote, $distance);

            $data[$field_id . '_percentage'] = [[
                'price_increase' => $price_increase ?? 0,
                'operation' => 'add'
            ]];
            $data[$field_id . '_distance'] = $distance;
        } catch (\Throwable $th) {
            error_log(sprintf(
                '[ERROR] GoogleMap distance calculation: %s | File: %s | Line: %d',
                $th->getMessage(),
                $th->getFile(),
                $th->getLine()
            ));
        }

        return $data;
    }

    protected function has_valid_coordinates(?array $store, array $location): bool
    {
        return isset($store['lat'], $store['lng'], $location['lat'], $location['lng']);
    }



    protected function calculate_distance(array $from, array $store): float
    {
        $api_key = booking_get_maps_api_key();
        if (!empty($api_key)) {
            try {
                $distance_api = new googleDistanceAPI($api_key);
                $distance = $distance_api->get_distance(
                    (float) $from['lat'],
                    (float) $from['lng'],
                    (float) $store['lat'],
                    (float) $store['lng']
                );

                if ($distance !== null && is_numeric($distance)) {
                    return (float) $distance;
                }
            } catch (\Throwable $th) {
                error_log(sprintf(
                    '[WARNING] GoogleMap Google Distance API failed, using fallback: %s | File: %s | Line: %d',
                    $th->getMessage(),
                    $th->getFile(),
                    $th->getLine()
                ));
            }
        }

        return $this->calculate_distance_haversine($from, $store);
    }

    protected function calculate_distance_haversine(array $from, array $store): float
    {
        $lat1 = deg2rad($from['lat']);
        $lng1 = deg2rad($from['lng']);
        $lat2 = deg2rad($store['lat']);
        $lng2 = deg2rad($store['lng']);

        $dlat = $lat2 - $lat1;
        $dlng = $lng2 - $lng1;

        $a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlng / 2) * sin($dlng / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $r = 6371;

        return $r * $c;
    }

    protected function get_price_increase_from_block(array $calculation_quote, float $distance): ?float
    {
        $distance_calculation = $calculation_quote['distance_calculation'] ?? [];

        if (empty($distance_calculation) || !is_array($distance_calculation)) {
            return null;
        }

        $calculation_table = ['range' => [], 'price_increase' => []];

        foreach ($distance_calculation as $index => $item) {
            if (isset($item['range']) && isset($item['price_increase'])) {
                $calculation_table['range'][$index] = $item['range'];
                $calculation_table['price_increase'][$index] = $item['price_increase'];
            }
        }

        $check_increase = $this->find_nearest_key($calculation_table['range'], $distance, 'down');

        if ($check_increase === false || $check_increase === null || !isset($calculation_table['price_increase'][$check_increase])) {
            return null;
        }

        return $calculation_table['price_increase'][$check_increase] ?? 0;
    }

    protected function find_nearest_key(array $values, float $target, string $direction = 'nearest'): ?int
    {
        ksort($values);

        if (in_array($target, $values, true)) {
            return array_search($target, $values, true);
        }

        $closestKey = null;
        $closestValue = null;

        foreach ($values as $key => $value) {
            if ($direction === 'up' && $value >= $target) {
                $closestKey = $key;
                break;
            } elseif ($direction === 'down' && $value <= $target) {
                $closestKey = $key;
            } elseif ($direction === 'nearest') {
                if ($closestValue === null || abs($value - $target) < abs($closestValue - $target)) {
                    $closestKey = $key;
                    $closestValue = $value;
                }
            }
        }

        return $closestKey;
    }

    protected function parse_address_data(array $location_data): array
    {
        $address_parts = [];

        $full_address = $location_data['address'] ?? '';

        if (!empty($full_address)) {
            $parts = array_map('trim', explode(',', $full_address));

            if (count($parts) >= 1) {
                $address_parts['address_1'] = $parts[0];
            }
            if (count($parts) >= 2) {
                $address_parts['city'] = $parts[count($parts) - 2];
            }
            if (count($parts) >= 3) {
                $address_parts['country'] = $parts[count($parts) - 1];
            }
        }

        $address_parts['postcode'] = $location_data['postcode'] ?? $location_data['postal_code'] ?? '';
        $address_parts['state'] = $location_data['state'] ?? $location_data['region'] ?? '';
        $address_parts['country'] = $location_data['country'] ?? $address_parts['country'] ?? '';
        $address_parts['country_code'] = $location_data['country_code'] ?? '';
        $address_parts['lat'] = $location_data['lat'] ?? '';
        $address_parts['lng'] = $location_data['lng'] ?? '';

        return $address_parts;
    }

    protected function map_address_fields(array $address_data, string $prefix, bool $include_coordinates = false): array
    {
        $mapped = [];

        if (!empty($address_data['address_1'])) {
            $mapped['_' . $prefix . '_address_1'] = $address_data['address_1'];
        }

        if (!empty($address_data['city'])) {
            $mapped['_' . $prefix . '_city'] = $address_data['city'];
        }

        if (!empty($address_data['state'])) {
            $mapped['_' . $prefix . '_state'] = $address_data['state'];
        }

        if (!empty($address_data['postcode'])) {
            $mapped['_' . $prefix . '_postcode'] = $address_data['postcode'];
        }

        if (!empty($address_data['country'])) {
            $mapped['_' . $prefix . '_country'] = $address_data['country'];
        }

        if ($include_coordinates) {
            if (!empty($address_data['lat'])) {
                $mapped['_' . $prefix . '_lat'] = $address_data['lat'];
            }

            if (!empty($address_data['lng'])) {
                $mapped['_' . $prefix . '_lng'] = $address_data['lng'];
            }
        }

        return $mapped;
    }

    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);

        if (empty($value)) {
            return null;
        }

        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? __('Location', 'wpcbooking');

        // Parse address if it's JSON string
        $parsed_address = null;
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $parsed_address = [
                    'address' => $decoded['address'] ?? '',
                    'city' => $decoded['city'] ?? '',
                    'country' => $decoded['country'] ?? '',
                ];
            }
        }

        return [
            'block_type' => 'booking/google-map',
            'label' => $label,
            'value' => $value,
            'parsed_address' => $parsed_address,
        ];
    }
    public static function get_quote_value($value, $quote_id, $attrs = []): mixed
    {
        $field_id = $attrs['attrs']['field_id'] ?? null;

        // Parse JSON string to array if needed
        if (is_string($value) && !empty($value)) {
            $decoded = json_decode($value, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $value = $decoded;
            }
        }

        // Ensure $value is array
        if (!is_array($value)) {
            $value = [];
        }

        // Add percentage from postmeta
        if ($field_id) {
            $prepared_value = get_post_meta($quote_id, $field_id . '_percentage', true);
            $value['price_increase'] = $prepared_value ?: [];
        }

        return json_encode($value);
    }

    public function update_block(int $quote_id, array $post_data = [], array $block = []): void
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!is_admin() || !$field_id || !$this->is_valid_quote_id($quote_id)) return;
        $data[$field_id] = isset($post_data[$field_id]) ? wp_unslash($post_data[$field_id]) : null;
        $data[$field_id . '_store_location'] = isset($post_data[$field_id . '_store_location']) ? wp_unslash($post_data[$field_id . '_store_location']) : null;
        $data[$field_id . '_distance'] = $post_data[$field_id . '_distance'] ?? 0;
        $percentage_data = $post_data[$field_id . '_percentage'] ?? null;
        if ($percentage_data) {
            $data[$field_id . '_percentage'] = [
                'price_increase' => $percentage_data['price_increase'] ?? 0,
                'operation' => isset($percentage_data['operation']) && $percentage_data['operation'] === '-' ? 'subtract' : 'add'
            ];
            $data[$field_id . '_fee_amount'] = $percentage_data['price'] ?? 0;
            $data[$field_id . '_fee_label'] = $percentage_data['label'] ?? __('Day occupancy Fee', 'wpcbooking');
        }
        $this->save_meta_data($quote_id, $data);
    }
}
