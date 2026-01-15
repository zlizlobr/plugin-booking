# Guide: Převod šablon z acfe-blocks na novou strukturu

## 📋 **Přehled změn**

### **Před (stará struktura):**
```
acfe-blocks/{blockname}/views/
├── admin.php
├── front.php  
└── default.php
```

### **Po (nová struktura):**
```
wp-content/plugins/wpcbooking/includes/Views/Blocks/public/{blockname}.php
```

## 🔄 **Kroky pro převod**

### **1. Analýza existujícího bloku**

#### **Najít blok v acfe-blocks:**
```bash
wp-content/plugins/acf-flowform/acfe-blocks/{blockname}/
```

#### **Zkontrolovat soubory:**
- `views/default.php` - hlavní template (obsahuje logiku k převodu)

### **2. Převod logiky do prepare_block_attributes**

#### **Najít logiku v default.php:**
```php
// Příklad z default.php
$general = $fields["general"] ?? [];
$advanced = $fields["advanced"] ?? [];
$icon = $general["thumbnail_id"] ? wp_get_attachment_image_url($general["thumbnail_id"] ?? null, "full") : false;
$label = $general["label"] ?? __('Label', 'wpcbooking');
$placeholder = $general["placeholder"] ?? false;
$id = $fields["field_id"] ?? sanitize_title($label);
$value = aff_quote_get_value($id);
```

#### **Přesunout do prepare_block_attributes:**
```php
protected function prepare_block_attributes(array $attributes, string $content, \WP_Block $block): array
{
    // Extract general and advanced settings
    $general = $attributes['general'] ?? [];
    $advanced = $attributes['advanced'] ?? [];
    
    // Get icon URL
    $icon = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;
    
    // Get label and placeholder
    $label = $general['label'] ?? __('Label', 'wpcbooking');
    $placeholder = $general['placeholder'] ?? false;
    
    // Get field ID
    $id = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);
    
    // Get current value
    $value = $this->get_quote_value($id);
    
    // Prepare the attributes array with all necessary data
    $prepared_attributes = array_merge($attributes, [
        'icon' => $icon,
        'label' => $label,
        'placeholder' => $placeholder,
        'id' => $id,
        'value' => $value,
        'general' => $general,
        'advanced' => $advanced,
    ]);
    
    return $prepared_attributes;
}
```

### **3. Vytvoření nového template souboru**

#### **Cesta:**
```
wp-content/plugins/wpcbooking/includes/Views/Blocks/public/{blockname}.php
```

#### **Struktura template:**
```php
<?php
/**
 * {Block Name}: Template
 * 
 * This template renders the {block name}
 * All variables are prepared in the prepare_block_attributes method
 */
?>

<!-- {Block Name} Container -->
<div class="container-class">
    
    <!-- Label and Icon Section -->
    <div class="label-section">
        <?php if ($icon): ?>
            <div style="--mask-img: url('<?= $icon; ?>')" class="icon-class"></div>
        <?php endif; ?>
        <div class="label-class"><?= esc_html($label) ?></div>
    </div>
    
    <!-- Field Section -->
    <div class="field-section">
        <?php if (function_exists('acf_render_field_wrap')): ?>
            <?php acf_render_field_wrap($field); ?>
        <?php else: ?>
            <!-- Fallback HTML input if ACF is not available -->
            <input type="text" 
                   id="<?= esc_attr($id) ?>" 
                   name="<?= esc_attr($id) ?>" 
                   value="<?= esc_attr($value) ?>" 
                   class="<?= esc_attr($field['class'] ?? 'default-class') ?>"
                   <?= !empty($field['required']) ? 'required' : '' ?>
                   <?= !empty($field['placeholder']) ? 'placeholder="' . esc_attr($field['placeholder']) . '"' : '' ?>>
        <?php endif; ?>
    </div>
    
</div>
```

### **4. Pravidla pro template**

#### **✅ POVOLENO:**
- Pouze HTML struktura
- PHP proměnné z `prepare_block_attributes`
- Podmíněné zobrazení (`if`, `foreach`)
- Escapování (`esc_html`, `esc_attr`, `esc_url`)
- ACF funkce (`acf_render_field_wrap`)

#### **❌ ZAKÁZÁNO:**
- CSS (`<style>` tagy)
- JavaScript (`<script>` tagy)
- Logika (výpočty, databázové dotazy)
- Rozdělení admin/front-end
- Manuální extract proměnných

### **5. Přejmenování bloků**

#### **Mapování názvů:**
| ACF Block | Nový název | Cesta |
|-----------|------------|-------|
| `input-text` | `booking-text-input` | `booking-text-input.php` |
| `input-email` | `booking-email-input` | `booking-email-input.php` |
| `input-phone` | `booking-phone-input` | `booking-phone-input.php` |
| `input-number` | `booking-number-input` | `booking-number-input.php` |
| `input-datepicker` | `booking-date-picker` | `booking-date-picker.php` |
| `input-timepicker` | `booking-time-picker` | `booking-time-picker.php` |
| `input-googlemap` | `booking-google-map` | `booking-google-map.php` |
| `select-category` | `booking-select-category` | `booking-select-category.php` |
| `products-list` | `booking-products-list` | `booking-products-list.php` |
| `products-grid` | `booking-products-grid` | `booking-products-grid.php` |
| `variable-products-list` | `booking-variable-products-list` | `booking-variable-products-list.php` |
| `booking-products` | `booking-products` | `booking-products.php` |
| `booking-products-grid` | `booking-products-grid` | `booking-products-grid.php` |
| `pick-icons` | `booking-pick-icons` | `booking-pick-icons.php` |
| `step-section` | `booking-step-section` | `booking-step-section.php` |

### **6. Kontrolní seznam**

#### **Pro každý blok:**
- [ ] Najít blok v `acfe-blocks/{blockname}/`
- [ ] Analyzovat logiku v `views/default.php`
- [ ] Přesunout logiku do `prepare_block_attributes`
- [ ] Vytvořit nový template v `views/public/{blockname}.php`
- [ ] Otestovat funkčnost
- [ ] Smazat staré soubory

#### **Kontrola template:**
- [ ] Žádné CSS/JS
- [ ] Žádná logika
- [ ] Pouze HTML + proměnné
- [ ] Správné escapování
- [ ] Fallback pro ACF

## 🎯 **Příklad kompletního převodu**

### **Před (input-text):**
```php
// acfe-blocks/input-text/views/default.php
$general = $fields["general"] ?? [];
$advanced = $fields["advanced"] ?? [];
$icon = $general["thumbnail_id"] ? wp_get_attachment_image_url($general["thumbnail_id"] ?? null, "full") : false;
$label = $general["label"] ?? __('Label', 'wpcbooking');
$placeholder = $general["placeholder"] ?? false;
$id = $fields["field_id"] ?? sanitize_title($label);
$field = [
    'type' => 'text',
    'class' => 'w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
    'id' => $id,
    'name' => $id,
    'value' => aff_quote_get_value($id),
];
```

### **Po (booking-text-input):**

#### **prepare_block_attributes:**
```php
protected function prepare_block_attributes(array $attributes, string $content, \WP_Block $block): array
{
    $general = $attributes['general'] ?? [];
    $advanced = $attributes['advanced'] ?? [];
    
    $icon = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;
    $label = $general['label'] ?? __('Label', 'wpcbooking');
    $placeholder = $general['placeholder'] ?? false;
    $id = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);
    $value = $this->get_quote_value($id);
    
    $field = [
        'type' => 'text',
        'class' => 'w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
        'id' => $id,
        'name' => $id,
        'value' => $value,
    ];
    
    if (!empty($advanced['required'])) {
        $field['required'] = true;
    }
    
    if ($placeholder) {
        $field['placeholder'] = esc_html($placeholder);
    }
    
    return array_merge($attributes, [
        'icon' => $icon,
        'label' => $label,
        'placeholder' => $placeholder,
        'id' => $id,
        'value' => $value,
        'field' => $field,
        'general' => $general,
        'advanced' => $advanced,
    ]);
}
```

#### **Template:**
```php
<?php
/**
 * Booking Text Input: Template
 * 
 * This template renders the text input
 * All variables are prepared in the prepare_block_attributes method
 */
?>

<div class="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full">
    
    <div class="flex items-center gap-x-4">
        <?php if ($icon): ?>
            <div style="--mask-img: url('<?= $icon; ?>')" class="w-25p h-30p bg-th-orange-light cs-mask"></div>
        <?php endif; ?>
        <div class="af-p24 max-medium:text-[1.25rem] text-black w-full"><?= esc_html($label) ?></div>
    </div>
    
    <div class="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">
        <?php if (function_exists('acf_render_field_wrap')): ?>
            <?php acf_render_field_wrap($field); ?>
        <?php else: ?>
            <input type="text" 
                   id="<?= esc_attr($id) ?>" 
                   name="<?= esc_attr($id) ?>" 
                   value="<?= esc_attr($value) ?>" 
                   class="<?= esc_attr($field['class']) ?>"
                   <?= !empty($field['required']) ? 'required' : '' ?>
                   <?= !empty($field['placeholder']) ? 'placeholder="' . esc_attr($field['placeholder']) . '"' : '' ?>>
        <?php endif; ?>
    </div>
    
</div>
```

## 📝 **Poznámky**

- Všechny proměnné jsou automaticky dostupné díky `booking_get_template`
- Žádné manuální `extract()` nebo `$attributes['key']`
- Zachovat původní CSS třídy pro kompatibilitu
- Používat `wpcbooking` text domain místo `aff`
- Testovat každý blok po převodu
