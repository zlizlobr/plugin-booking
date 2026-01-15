<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;
//https://flowbite.com/docs/forms/phone-input/
class PhoneInput extends AbstractBlock
{
    protected static $BLOCK_NAME = 'phone-input';
    protected static $BLOCK_ICON = 'phone';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Phone Input', 'wpcbooking');
        $this->block_description = __('Display a phone input field with international formatting', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'phone';
        $this->block_keywords = ['booking', 'phone', 'input', 'form', 'telephone', 'international'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'general' => __('General', 'wpcbooking'),
            'advanced' => __('Advanced', 'wpcbooking'),
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
                'label' => __('General', 'wpcbooking'),
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
                'id' => 'user',
                'label' => __('User', 'wpcbooking'),
                'items' => $this->get_tab_user(),
                'tab' => 'user',
            ],
            'field_id' => [
                'type' => 'hidden',
                'id' => 'field_id',
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
        return [
            'thumbnail_id' => [
                'id' => 'thumbnail_id',
                'type' => 'attachment',
                'label' => __('SVG Icon', 'wpcbooking'),
                'attachment_type' => 'image',
                'mime_types' => 'svg',
            ],
            'label' => [
                'id' => 'label',
                'type' => 'text',
                'label' => __('Label', 'wpcbooking'),
                'default' => 'title',
            ],
            'acfe_phone_number_options' => [
                'id' => 'acfe_phone_number_options',
                'type' => 'group',
                'label' => __('Phone options', 'wpcbooking'),
                'items' => $this->get_phone_options(),
            ],
        ];
    }

    protected function get_phone_options(): array
    {
        return [
            'countries' => [
                'id' => 'countries',
                'type' => 'multi_select',
                'label' => __('Allow Countries', 'wpcbooking'),
                'description' => __('Allow only the defined countries', 'wpcbooking'),
                'options' => $this->get_countries_list(),
            ],
            'preferred_countries' => [
                'id' => 'preferred_countries',
                'type' => 'multi_select',
                'label' => __('Preferred Countries', 'wpcbooking'),
                'description' => __('Define the countries to appear at the top of the list', 'wpcbooking'),
                'options' => $this->get_countries_list(),
            ],
            'default_country' => [
                'id' => 'default_country',
                'type' => 'select',
                'label' => __('Default Country', 'wpcbooking'),
                'description' => __('Set the initial country selection', 'wpcbooking'),
                'options' => $this->get_countries_list(),
            ],
            'native_names' => [
                'id' => 'native_names',
                'type' => 'toggle',
                'label' => __('Native Names', 'wpcbooking'),
                'description' => __('Show native country names', 'wpcbooking'),
            ],
            'national_mode' => [
                'id' => 'national_mode',
                'type' => 'toggle',
                'label' => __('National Mode', 'wpcbooking'),
                'description' => __('Show native country names', 'wpcbooking'),
            ],
            'allow_dropdown' => [
                'id' => 'allow_dropdown',
                'type' => 'toggle',
                'label' => __('Allow Dropdown', 'wpcbooking'),
                'description' => __('Whether or not to allow the dropdown', 'wpcbooking'),
            ],
            'separate_dial_code' => [
                'id' => 'separate_dial_code',
                'type' => 'toggle',
                'label' => __('Separate Dial Code', 'wpcbooking'),
                'description' => __('Display the country dial code next to the selected flag', 'wpcbooking'),
            ],
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

    protected function get_tab_user(): array
    {
        return [
            'save_to_user' => [
                'id' => 'save_to_user',
                'type' => 'toggle',
                'label' => __('Save to User Profile', 'wpcbooking'),
                'default' => false,
                'description' => __('Save phone number to user profile', 'wpcbooking'),
            ],
            'phone_type' => [
                'id' => 'phone_type',
                'type' => 'select',
                'label' => __('Phone Type', 'wpcbooking'),
                'default' => 'billing',
                'options' => [
                    'billing' => __('Billing Phone', 'wpcbooking'),
                    'shipping' => __('Shipping Phone', 'wpcbooking'),
                    'both' => __('Both (Billing & Shipping)', 'wpcbooking'),
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
                'label' => __('Custom Meta Key', 'wpcbooking'),
                'placeholder' => 'phone_mobile',
                'description' => __('Enter custom meta key for phone storage', 'wpcbooking'),
                'conditions' => [
                    [
                        'field' => '#.phone_type',
                        'condition' => '==',
                        'value' => 'custom',
                    ],
                ],
            ],
        ];
    }

    protected function get_countries_list(): array
    {
        return [
            'AF' => __('Afghanistan', 'wpcbooking'),
            'AL' => __('Albania', 'wpcbooking'),
            'DZ' => __('Algeria', 'wpcbooking'),
            'AS' => __('American Samoa', 'wpcbooking'),
            'AD' => __('Andorra', 'wpcbooking'),
            'AO' => __('Angola', 'wpcbooking'),
            'AI' => __('Anguilla', 'wpcbooking'),
            'AQ' => __('Antarctica', 'wpcbooking'),
            'AG' => __('Antigua and Barbuda', 'wpcbooking'),
            'AR' => __('Argentina', 'wpcbooking'),
            'AM' => __('Armenia', 'wpcbooking'),
            'AW' => __('Aruba', 'wpcbooking'),
            'AU' => __('Australia', 'wpcbooking'),
            'AT' => __('Austria', 'wpcbooking'),
            'AZ' => __('Azerbaijan', 'wpcbooking'),
            'BS' => __('Bahamas', 'wpcbooking'),
            'BH' => __('Bahrain', 'wpcbooking'),
            'BD' => __('Bangladesh', 'wpcbooking'),
            'BB' => __('Barbados', 'wpcbooking'),
            'BY' => __('Belarus', 'wpcbooking'),
            'BE' => __('Belgium', 'wpcbooking'),
            'BZ' => __('Belize', 'wpcbooking'),
            'BJ' => __('Benin', 'wpcbooking'),
            'BM' => __('Bermuda', 'wpcbooking'),
            'BT' => __('Bhutan', 'wpcbooking'),
            'BO' => __('Bolivia', 'wpcbooking'),
            'BA' => __('Bosnia and Herzegovina', 'wpcbooking'),
            'BW' => __('Botswana', 'wpcbooking'),
            'BV' => __('Bouvet Island', 'wpcbooking'),
            'BR' => __('Brazil', 'wpcbooking'),
            'IO' => __('British Indian Ocean Territory', 'wpcbooking'),
            'BN' => __('Brunei Darussalam', 'wpcbooking'),
            'BG' => __('Bulgaria', 'wpcbooking'),
            'BF' => __('Burkina Faso', 'wpcbooking'),
            'BI' => __('Burundi', 'wpcbooking'),
            'KH' => __('Cambodia', 'wpcbooking'),
            'CM' => __('Cameroon', 'wpcbooking'),
            'CA' => __('Canada', 'wpcbooking'),
            'CV' => __('Cape Verde', 'wpcbooking'),
            'KY' => __('Cayman Islands', 'wpcbooking'),
            'CF' => __('Central African Republic', 'wpcbooking'),
            'TD' => __('Chad', 'wpcbooking'),
            'CL' => __('Chile', 'wpcbooking'),
            'CN' => __('China', 'wpcbooking'),
            'CX' => __('Christmas Island', 'wpcbooking'),
            'CC' => __('Cocos (Keeling) Islands', 'wpcbooking'),
            'CO' => __('Colombia', 'wpcbooking'),
            'KM' => __('Comoros', 'wpcbooking'),
            'CG' => __('Congo', 'wpcbooking'),
            'CD' => __('Congo, Democratic Republic of the', 'wpcbooking'),
            'CK' => __('Cook Islands', 'wpcbooking'),
            'CR' => __('Costa Rica', 'wpcbooking'),
            'CI' => __('Cote D\'Ivoire', 'wpcbooking'),
            'HR' => __('Croatia', 'wpcbooking'),
            'CU' => __('Cuba', 'wpcbooking'),
            'CY' => __('Cyprus', 'wpcbooking'),
            'CZ' => __('Czech Republic', 'wpcbooking'),
            'DK' => __('Denmark', 'wpcbooking'),
            'DJ' => __('Djibouti', 'wpcbooking'),
            'DM' => __('Dominica', 'wpcbooking'),
            'DO' => __('Dominican Republic', 'wpcbooking'),
            'EC' => __('Ecuador', 'wpcbooking'),
            'EG' => __('Egypt', 'wpcbooking'),
            'SV' => __('El Salvador', 'wpcbooking'),
            'GQ' => __('Equatorial Guinea', 'wpcbooking'),
            'ER' => __('Eritrea', 'wpcbooking'),
            'EE' => __('Estonia', 'wpcbooking'),
            'ET' => __('Ethiopia', 'wpcbooking'),
            'FK' => __('Falkland Islands (Malvinas)', 'wpcbooking'),
            'FO' => __('Faroe Islands', 'wpcbooking'),
            'FJ' => __('Fiji', 'wpcbooking'),
            'FI' => __('Finland', 'wpcbooking'),
            'FR' => __('France', 'wpcbooking'),
            'GF' => __('French Guiana', 'wpcbooking'),
            'PF' => __('French Polynesia', 'wpcbooking'),
            'TF' => __('French Southern Territories', 'wpcbooking'),
            'GA' => __('Gabon', 'wpcbooking'),
            'GM' => __('Gambia', 'wpcbooking'),
            'GE' => __('Georgia', 'wpcbooking'),
            'DE' => __('Germany', 'wpcbooking'),
            'GH' => __('Ghana', 'wpcbooking'),
            'GI' => __('Gibraltar', 'wpcbooking'),
            'GR' => __('Greece', 'wpcbooking'),
            'GL' => __('Greenland', 'wpcbooking'),
            'GD' => __('Grenada', 'wpcbooking'),
            'GP' => __('Guadeloupe', 'wpcbooking'),
            'GU' => __('Guam', 'wpcbooking'),
            'GT' => __('Guatemala', 'wpcbooking'),
            'GG' => __('Guernsey', 'wpcbooking'),
            'GN' => __('Guinea', 'wpcbooking'),
            'GW' => __('Guinea-Bissau', 'wpcbooking'),
            'GY' => __('Guyana', 'wpcbooking'),
            'HT' => __('Haiti', 'wpcbooking'),
            'HM' => __('Heard Island and Mcdonald Islands', 'wpcbooking'),
            'VA' => __('Holy See (Vatican City State)', 'wpcbooking'),
            'HN' => __('Honduras', 'wpcbooking'),
            'HK' => __('Hong Kong', 'wpcbooking'),
            'HU' => __('Hungary', 'wpcbooking'),
            'IS' => __('Iceland', 'wpcbooking'),
            'IN' => __('India', 'wpcbooking'),
            'ID' => __('Indonesia', 'wpcbooking'),
            'IR' => __('Iran, Islamic Republic Of', 'wpcbooking'),
            'IQ' => __('Iraq', 'wpcbooking'),
            'IE' => __('Ireland', 'wpcbooking'),
            'IM' => __('Isle of Man', 'wpcbooking'),
            'IL' => __('Israel', 'wpcbooking'),
            'IT' => __('Italy', 'wpcbooking'),
            'JM' => __('Jamaica', 'wpcbooking'),
            'JP' => __('Japan', 'wpcbooking'),
            'JE' => __('Jersey', 'wpcbooking'),
            'JO' => __('Jordan', 'wpcbooking'),
            'KZ' => __('Kazakhstan', 'wpcbooking'),
            'KE' => __('Kenya', 'wpcbooking'),
            'KI' => __('Kiribati', 'wpcbooking'),
            'KP' => __('Korea, Democratic People\'s Republic of', 'wpcbooking'),
            'KR' => __('Korea, Republic of', 'wpcbooking'),
            'KW' => __('Kuwait', 'wpcbooking'),
            'KG' => __('Kyrgyzstan', 'wpcbooking'),
            'LA' => __('Lao People\'s Democratic Republic', 'wpcbooking'),
            'LV' => __('Latvia', 'wpcbooking'),
            'LB' => __('Lebanon', 'wpcbooking'),
            'LS' => __('Lesotho', 'wpcbooking'),
            'LR' => __('Liberia', 'wpcbooking'),
            'LY' => __('Libyan Arab Jamahiriya', 'wpcbooking'),
            'LI' => __('Liechtenstein', 'wpcbooking'),
            'LT' => __('Lithuania', 'wpcbooking'),
            'LU' => __('Luxembourg', 'wpcbooking'),
            'MO' => __('Macao', 'wpcbooking'),
            'MK' => __('Macedonia, The Former Yugoslav Republic of', 'wpcbooking'),
            'MG' => __('Madagascar', 'wpcbooking'),
            'MW' => __('Malawi', 'wpcbooking'),
            'MY' => __('Malaysia', 'wpcbooking'),
            'MV' => __('Maldives', 'wpcbooking'),
            'ML' => __('Mali', 'wpcbooking'),
            'MT' => __('Malta', 'wpcbooking'),
            'MH' => __('Marshall Islands', 'wpcbooking'),
            'MQ' => __('Martinique', 'wpcbooking'),
            'MR' => __('Mauritania', 'wpcbooking'),
            'MU' => __('Mauritius', 'wpcbooking'),
            'YT' => __('Mayotte', 'wpcbooking'),
            'MX' => __('Mexico', 'wpcbooking'),
            'FM' => __('Micronesia, Federated States of', 'wpcbooking'),
            'MD' => __('Moldova, Republic of', 'wpcbooking'),
            'MC' => __('Monaco', 'wpcbooking'),
            'MN' => __('Mongolia', 'wpcbooking'),
            'ME' => __('Montenegro', 'wpcbooking'),
            'MS' => __('Montserrat', 'wpcbooking'),
            'MA' => __('Morocco', 'wpcbooking'),
            'MZ' => __('Mozambique', 'wpcbooking'),
            'MM' => __('Myanmar', 'wpcbooking'),
            'NA' => __('Namibia', 'wpcbooking'),
            'NR' => __('Nauru', 'wpcbooking'),
            'NP' => __('Nepal', 'wpcbooking'),
            'NL' => __('Netherlands', 'wpcbooking'),
            'AN' => __('Netherlands Antilles', 'wpcbooking'),
            'NC' => __('New Caledonia', 'wpcbooking'),
            'NZ' => __('New Zealand', 'wpcbooking'),
            'NI' => __('Nicaragua', 'wpcbooking'),
            'NE' => __('Niger', 'wpcbooking'),
            'NG' => __('Nigeria', 'wpcbooking'),
            'NU' => __('Niue', 'wpcbooking'),
            'NF' => __('Norfolk Island', 'wpcbooking'),
            'MP' => __('Northern Mariana Islands', 'wpcbooking'),
            'NO' => __('Norway', 'wpcbooking'),
            'OM' => __('Oman', 'wpcbooking'),
            'PK' => __('Pakistan', 'wpcbooking'),
            'PW' => __('Palau', 'wpcbooking'),
            'PS' => __('Palestinian Territory, Occupied', 'wpcbooking'),
            'PA' => __('Panama', 'wpcbooking'),
            'PG' => __('Papua New Guinea', 'wpcbooking'),
            'PY' => __('Paraguay', 'wpcbooking'),
            'PE' => __('Peru', 'wpcbooking'),
            'PH' => __('Philippines', 'wpcbooking'),
            'PN' => __('Pitcairn', 'wpcbooking'),
            'PL' => __('Poland', 'wpcbooking'),
            'PT' => __('Portugal', 'wpcbooking'),
            'PR' => __('Puerto Rico', 'wpcbooking'),
            'QA' => __('Qatar', 'wpcbooking'),
            'RE' => __('Reunion', 'wpcbooking'),
            'RO' => __('Romania', 'wpcbooking'),
            'RU' => __('Russian Federation', 'wpcbooking'),
            'RW' => __('Rwanda', 'wpcbooking'),
            'SH' => __('Saint Helena', 'wpcbooking'),
            'KN' => __('Saint Kitts and Nevis', 'wpcbooking'),
            'LC' => __('Saint Lucia', 'wpcbooking'),
            'PM' => __('Saint Pierre and Miquelon', 'wpcbooking'),
            'VC' => __('Saint Vincent and the Grenadines', 'wpcbooking'),
            'WS' => __('Samoa', 'wpcbooking'),
            'SM' => __('San Marino', 'wpcbooking'),
            'ST' => __('Sao Tome and Principe', 'wpcbooking'),
            'SA' => __('Saudi Arabia', 'wpcbooking'),
            'SN' => __('Senegal', 'wpcbooking'),
            'RS' => __('Serbia', 'wpcbooking'),
            'SC' => __('Seychelles', 'wpcbooking'),
            'SL' => __('Sierra Leone', 'wpcbooking'),
            'SG' => __('Singapore', 'wpcbooking'),
            'SK' => __('Slovakia', 'wpcbooking'),
            'SI' => __('Slovenia', 'wpcbooking'),
            'SB' => __('Solomon Islands', 'wpcbooking'),
            'SO' => __('Somalia', 'wpcbooking'),
            'ZA' => __('South Africa', 'wpcbooking'),
            'GS' => __('South Georgia and the South Sandwich Islands', 'wpcbooking'),
            'ES' => __('Spain', 'wpcbooking'),
            'LK' => __('Sri Lanka', 'wpcbooking'),
            'SD' => __('Sudan', 'wpcbooking'),
            'SR' => __('Suriname', 'wpcbooking'),
            'SJ' => __('Svalbard and Jan Mayen', 'wpcbooking'),
            'SZ' => __('Swaziland', 'wpcbooking'),
            'SE' => __('Sweden', 'wpcbooking'),
            'CH' => __('Switzerland', 'wpcbooking'),
            'SY' => __('Syrian Arab Republic', 'wpcbooking'),
            'TW' => __('Taiwan, Province of China', 'wpcbooking'),
            'TJ' => __('Tajikistan', 'wpcbooking'),
            'TZ' => __('Tanzania, United Republic of', 'wpcbooking'),
            'TH' => __('Thailand', 'wpcbooking'),
            'TL' => __('Timor-Leste', 'wpcbooking'),
            'TG' => __('Togo', 'wpcbooking'),
            'TK' => __('Tokelau', 'wpcbooking'),
            'TO' => __('Tonga', 'wpcbooking'),
            'TT' => __('Trinidad and Tobago', 'wpcbooking'),
            'TN' => __('Tunisia', 'wpcbooking'),
            'TR' => __('Turkey', 'wpcbooking'),
            'TM' => __('Turkmenistan', 'wpcbooking'),
            'TC' => __('Turks and Caicos Islands', 'wpcbooking'),
            'TV' => __('Tuvalu', 'wpcbooking'),
            'UG' => __('Uganda', 'wpcbooking'),
            'UA' => __('Ukraine', 'wpcbooking'),
            'AE' => __('United Arab Emirates', 'wpcbooking'),
            'GB' => __('United Kingdom', 'wpcbooking'),
            'US' => __('United States', 'wpcbooking'),
            'UM' => __('United States Minor Outlying Islands', 'wpcbooking'),
            'UY' => __('Uruguay', 'wpcbooking'),
            'UZ' => __('Uzbekistan', 'wpcbooking'),
            'VU' => __('Vanuatu', 'wpcbooking'),
            'VE' => __('Venezuela', 'wpcbooking'),
            'VN' => __('Viet Nam', 'wpcbooking'),
            'VG' => __('Virgin Islands, British', 'wpcbooking'),
            'VI' => __('Virgin Islands, U.S.', 'wpcbooking'),
            'WF' => __('Wallis and Futuna', 'wpcbooking'),
            'EH' => __('Western Sahara', 'wpcbooking'),
            'YE' => __('Yemen', 'wpcbooking'),
            'ZM' => __('Zambia', 'wpcbooking'),
            'ZW' => __('Zimbabwe', 'wpcbooking'),
        ];
    }

    public static function prepare_block(array $attributes): array
    {
        // Extract general and advanced settings
        $general = $attributes['general'] ?? [];
        $advanced = $attributes['advanced'] ?? [];

        // Get icon URL
        $general['icon_url'] = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;

        // Get label and placeholder
        $label = $general['label'] ?? __('Label', 'wpcbooking');
        $placeholder = $general['placeholder'] ?? ($advanced['placeholder'] ?? false);

        // Add placeholder to general for consistency with JSX
        if ($placeholder) {
            $general['placeholder'] = $placeholder;
        }

        // Get field ID
        $id = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);

       
        // Get phone options
        $options_field_type = $general['phone_number_options'] ?? [];

        // Prepare field configuration
        $field = [
            'type' => 'phone_number',
            'class' => 'w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
            'id' => $id,
            'name' => $id,
            'default_value' => '',
            'dropdown' => $options_field_type['allow_dropdown'] ?? 0,
            'dial_code' => $options_field_type['separate_dial_code'] ?? 0,
            'national' => $options_field_type['national_mode'] ?? 0,
            '_name' => $options_field_type['native_names'] ?? 0,
        ];

        // Merge phone options
        $field = array_merge($field, $options_field_type);

        // Handle country selection
        $country_short = strtolower(''); //$this->get_quote_value('_country_short'));
        if (
            $country_short &&
            (empty($field['countries']) ||
                (is_array($field['countries']) && in_array($country_short, $field['countries'])))
        ) {
            $field['default_country'] = $country_short;
        }

        // Handle required field
        if (!empty($advanced['required']) && is_array($advanced['required']) && $advanced['required'] === 'Required') {
            $field['required'] = true;
        }

        // Handle placeholder
        if (isset($placeholder)) {
            $field['placeholder'] = esc_html($placeholder);
        }

        // Prepare the attributes array with all necessary data
        $prepared_attributes = array_merge($attributes, [
            'label' => $label,
            'placeholder' => $placeholder,
            'id' => $id,
             'field' => $field,
            'general' => $general,
            'advanced' => $advanced,
            'block_icon' => static::get_block_icon(),
        ]);
        $quote_id = static::get_current_quote_id();
        if (is_int($quote_id)) {
            $prepared_attributes['value'] = static::get_quote_value('', $quote_id, $attributes);
        }

        return $prepared_attributes;
    }

    public function get_block_rules($rules, $attrs): array
    {
        $block_attrs = $attrs['attrs'] ?? $attrs;
        $rules['required'] = isset($block_attrs['advanced']['required']) && $block_attrs['advanced']['required'] == 1;
        $rules['phone'] = true;
        return $rules;
    }

    public function validate_block($errors, $value, $block): array
    {
        $required = isset($block['attrs']['advanced']['required']) && $block['attrs']['advanced']['required']  == 1;
        $value = trim($value);
        if ($required && $value == '') {
            $errors[] = sprintf(__('The %s is required.', 'wpcbooking'), 'Block name');
        }

        if ($value != '') {
            $cleaned = preg_replace('/\s+/', '', $value);
            if (!preg_match('/^\+\d{1,4}\d{7,15}$/', $cleaned)) {
                $errors[] = sprintf(__('The %s is not a valid phone number.', 'wpcbooking'), $value);
            }
        }
        return $errors;
    }

    public function save_block(array $data, int $quote_id, mixed $value, array $block = []): ?array
    {
        $field_id = $block['attrs']['field_id'] ?? null;
        if (!$field_id || !$this->is_valid_quote_id($quote_id))  return null;
        $data = [$field_id => $value];
        $user_settings = $block['attrs']['user'] ?? [];
        $save_to_user = $user_settings['save_to_user'] ?? false;
        if ($save_to_user) {
            $phone_type = $user_settings['phone_type'] ?? 'billing';
            
            switch ($phone_type) {
                case 'billing':
                    $data['_billing_phone'] = $value;
                    break;
                    
                case 'shipping':
                    $data['_shipping_phone'] = $value;
                    break;
                    
                case 'both':
                    $data['_billing_phone'] = $value;
                    $data['_shipping_phone'] = $value;
                    break;
                    
                case 'custom':
                    $custom_key = $user_settings['custom_meta_key'] ?? '';
                    if (!empty($custom_key)) {
                        $data['_' . sanitize_key($custom_key)] = $value;
                    }
                    break;
            }
        }
        
        $this->save_meta_data($quote_id, $data);
        return $data;
    }
    
    public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
    {
        $value = get_post_meta($quote_id, $field_id, true);
        
        if (empty($value)) {
            return null;
        }
        
        $label = $block['attrs']['general']['label'] ?? $block['attrs']['label'] ?? __('Phone', 'wpcbooking');
        
        return [
            'block_type' => 'booking/phone-input',
            'label' => $label,
            'value' => $value,
        ];
    }
}
