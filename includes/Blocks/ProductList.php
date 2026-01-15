<?php

namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractProductBlock;
//https://daisyui.com/components/filter/
// todo: nastavit filter pokud není aktivní woo nenačátat block
class ProductList extends AbstractProductBlock
{
    protected static $BLOCK_NAME = 'product-list';
    protected static $BLOCK_ICON = 'list-view';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Product List', 'wpcbooking');
        $this->block_description = __('Display a booking product list', 'wpcbooking');
        $this->block_category = 'woocommerce';
        $this->block_icon = 'list-view';
        $this->block_keywords = ['booking', 'product', 'list',];
    }

    protected function get_tab_frontend_conditions(): array
    {
        $parent_conditions = parent::get_tab_frontend_conditions();

        $parent_conditions['required'] = [
            'id' => 'required',
            'type' => 'toggle',
            'label' => __('Must select a product', 'wpcbooking'),
            'default' => false,
        ];

        return $parent_conditions;
    }

    public function get_block_rules($rules, $attrs): array
    {
        $block_attrs = $attrs['attrs'] ?? $attrs;


        if (isset($block_attrs['items']['required']) && $block_attrs['items']['required'] == 1) {
            $rules['required'] = true;
        }
        return $rules;
    }

    public function validate_block($errors, $value, $block): array
    {
        $required = isset($block_attrs['items']['required']) && $block_attrs['items']['required'] == 1;
        if ($required && $value == '') {
            //$errors[] = sprintf(__('The %s is required.', 'wpcbooking'), 'Block name');
        }

        return $errors;
    }

    public static function public_scripts_deps($attrs)
    {
        return parent::public_scripts_deps($attrs);
    }
}
