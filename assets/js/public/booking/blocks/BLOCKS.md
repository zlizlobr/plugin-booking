# Booking Blocks - Development Guide

## Input Field Patterns

There are currently **two patterns** in use for input components. The **useInputField pattern** is the recommended modern approach, while the **class-based pattern** is legacy and should be migrated.

### Pattern Status
- ✅ **useInputField Pattern** (RECOMMENDED) - EmailInput, IconsList, GoogleMap, DatePicker, NumberInput
- ⚠️ **Class-based Pattern** (LEGACY) - TextInput (needs migration)

## 1. useInputField Pattern (RECOMMENDED)

### Required Imports

```javascript
import { useBookingContext } from '../../contexts/BookingContext.jsx';
import { useInputField } from '../../hooks/useInputField.js';
```

### Basic Component Structure

```javascript
const YourInputComponent = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();
  const {
    currentValue,
    handleChange,
    error,
    isValid,
    inputClasses
  } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });

  const handleInputChange = (e) => {
    handleChange(e.target.value);
  };

  return (
    <div className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full">
      {/* Label and Icon Section */}
      <div className="flex items-center gap-x-4">
        {attrs.general?.thumbnail_id && (
          <div
            style={{ '--mask-img': `url('/wp-content/uploads/icon-${attrs.general.thumbnail_id}.svg')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          />
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {attrs.general?.label || 'Default Label'}
        </div>
      </div>
      
      {/* Field Section */}
      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">
        <div className="w-full relative">
          <input 
            type="text" // or email, number, etc.
            id={attrs.field_id}
            name={attrs.field_id}
            value={currentValue}
            onChange={handleInputChange}
            className={inputClasses}
            placeholder={attrs.general?.placeholder || 'Default placeholder'}
            required
            aria-invalid={!!error}
            aria-describedby={error ? `${attrs.field_id}-error` : undefined}
          />
          {/* Add validation indicator and error message if needed */}
        </div>
      </div>
    </div>
  );
};
```

### Key Points for Agents

1. **Always use `useInputField` hook** - provides automatic validation, error handling, and state management
2. **Props structure**: Only `attrs` and `rules` props needed
3. **Field ID**: Use `attrs.field_id` for the field identifier
4. **Value handling**: Use `currentValue` from hook, update via `handleChange`
5. **Styling**: Use `inputClasses` from hook for consistent styling
6. **Validation**: `error` and `isValid` automatically provided
7. **Accessibility**: Include `aria-invalid` and `aria-describedby` attributes
8. **Icons**: Use `attrs.general?.thumbnail_id` for SVG icons with consistent path pattern
9. **UNIFIED INPUT STYLING**: All input values MUST use this exact className for consistent design:
   ```javascript
   className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
   ```
   This ensures all input values have orange text color, left-aligned text, and larger font size for visual consistency.

### Specialized Component Examples

#### IconsList Component
```javascript
const IconsList = ({ attrs, rules }) => {
  const context = useBookingContext();
  const { currentValue, handleChange, error, isValid, inputClasses } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });

  const { number_allowed = 1, icons = [] } = attrs.general || {};
  
  // Parse currentValue - handle both string and array formats
  const selected_icons = (() => {
    if (Array.isArray(currentValue)) return currentValue;
    if (typeof currentValue === 'string' && currentValue.trim() !== '') {
      return currentValue.split(',').map(val => val.trim()).filter(val => val !== '');
    }
    return [];
  })();

  const handle_icon_click = (icon_value) => {
    let new_selection;
    if (number_allowed === 1) {
      new_selection = selected_icons.includes(icon_value) ? [] : [icon_value];
    } else {
      if (selected_icons.includes(icon_value)) {
        new_selection = selected_icons.filter(val => val !== icon_value);
      } else if (selected_icons.length < number_allowed) {
        new_selection = [...selected_icons, icon_value];
      } else {
        return;
      }
    }
    const value_for_form = new_selection.length > 0 ? new_selection.join(',') : '';
    handleChange(value_for_form);
  };

  return (
    <div className="col-span-full mt-40p large:mt-130p" data-name={attrs.id}>
      <ul className="flex js-choices-wrap justify-center gap-20p large:gap-40p flex-wrap">
        {icons.map((icon_item, index) => (
          <li key={index} onClick={() => handle_icon_click(icon_item.label)}>
            {/* Icon rendering logic */}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

#### GoogleMap Component
```javascript
const GoogleMap = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();
  const { currentValue, handleChange, error, isValid, inputClasses } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });

  // Parse current value as JSON if it's a string
  const parseCurrentValue = () => {
    if (!currentValue) return {};
    if (typeof currentValue === 'string') {
      try {
        return JSON.parse(currentValue);
      } catch (e) {
        return {};
      }
    }
    return currentValue;
  };

  const current_value = parseCurrentValue();
  const [address, setAddress] = useState(current_value?.address || '');
  const [positionData, setPositionData] = useState(current_value);

  const updatePositionData = (address, lat, lng, country_code = null) => {
    const data = { address, lat, lng, country_code };
    setPositionData(data);
    handleChange(JSON.stringify(data));
  };

  return (
    <div className="flex items-stretch px-30p py-[18px] flex-col gap-y-2 border border-th-blue-light rounded-[50px]">
      {/* Map input and Google Maps integration */}
    </div>
  );
};
```

#### DatePicker Component
```javascript
const DatePicker = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();
  const { currentValue, handleChange, error, isValid, inputClasses } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });

  const { general = {} } = attrs;
  const { icon_url = '', label = 'Select day', date_picker_options = {} } = general;

  const handle_input_change = useCallback((e) => {
    handleChange(e.target.value);
  }, [handleChange]);

  return (
    <div className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full">
      {/* Date picker with calendar integration */}
    </div>
  );
};
```

#### NumberInput Component
```javascript
const NumberInput = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();
  const { currentValue, handleChange, error, isValid, inputClasses } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });

  const { add_after = 1, aff_number_options = [] } = attrs.general || {};

  const handle_increment = () => {
    const current_num = parseInt(currentValue) || 0;
    const new_value = (current_num + add_after).toString();
    handleChange(new_value);
  };

  const handle_decrement = () => {
    const current_num = parseInt(currentValue) || 0;
    const new_value = Math.max(0, current_num - add_after).toString();
    handleChange(new_value);
  };

  const handleInputChange = (e) => {
    handleChange(e.target.value);
  };

  return (
    <div className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4">
      {/* Label and Icon Section */}
      <div className="flex items-center gap-x-4">
        {attrs.general?.icon_url && (
          <div
            style={{ '--mask-img': `url('${attrs.general.icon_url}')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          />
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {attrs.general?.label || 'Number fields'}
        </div>
      </div>
      
      {/* Field Section */}
      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">
        <div className="relative">
          <div className="af-p27 max-medium:text-[1rem] text-th-orange-light medium:w-3/5 flex gap-x-2 items-center">
            
            {/* Minus Button */}
            <div 
              id="aff-number-minus" 
              className="shrink-0 cursor-pointer w-55p h-55p rounded-full bg-th-blue flex justify-center items-center hover:bg-blue-600 transition-colors"
              onClick={handle_decrement}
            >
              <div className="w-7 h-7 cs-mask bg-white" style={{ '--mask-img': `url('/wp-content/plugins/acf-flowform/assets/img/minus.svg')` }}></div>
            </div>
            
            {/* Number Input */}
            <input 
              type="number" 
              id={attrs.field_id}
              name={attrs.field_id}
              value={currentValue}
              onChange={handleInputChange}
              className="grow w-full border-2 border-th-blue rounded-[10px] h-55p px-10p text-center text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step={add_after}
              required
              aria-invalid={!!error}
              aria-describedby={error ? `${attrs.field_id}-error` : undefined}
            />
            
            {/* Plus Button */}
            <div 
              id="aff-number-plus" 
              className="shrink-0 cursor-pointer w-55p h-55p rounded-full bg-th-blue flex justify-center items-center hover:bg-blue-600 transition-colors"
              onClick={handle_increment}
            >
              <div className="w-7 h-7 cs-mask bg-white" style={{ '--mask-img': `url('/wp-content/plugins/acf-flowform/assets/img/plus.svg')` }}></div>
            </div>
            
            {/* Unit Label */}
            <span 
              id={`${attrs.field_id}_display`}
              name={`${attrs.field_id}_display`}
              data-value={currentValue}
              className="ml-2 text-gray-600"
              data-singular={attrs.general?.singular || 'item'}
              data-plural={attrs.general?.plural || 'items'}
              data-max={attrs.general?.max || '1000'}
              data-min={attrs.general?.min || '0'}
              data-add_after={add_after}
            >
              {attrs.general?.plural || 'items'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
```

### Component Examples by Pattern

**useInputField Pattern (RECOMMENDED):**
- **EmailInput.jsx** - Basic email input with validation
- **IconsList.jsx** - Icon selection with multiple choice support
- **GoogleMap.jsx** - Map integration with location selection
- **DatePicker.jsx** - Calendar picker with custom options
- **NumberInput.jsx** - Number input with increment/decrement buttons

**Class-based Pattern (LEGACY - needs migration):**
- **TextInput.jsx** - Simple text input (class-based)

## 2. Class-based Pattern (LEGACY)

### Current Legacy Components
- **TextInput.jsx** - Uses `InputBookingComponent` class
- **NumberInput.jsx** - Uses `BaseBookingComponent` class

### Legacy Pattern Structure
```javascript
class YourComponentClass extends BaseBookingComponent {
  get_field_prefix() {
    return 'your_field';
  }

  get_default_label() {
    return 'Your Label';
  }

  render_input(field_id, current_value) {
    // Custom input rendering
  }
}

const YourComponent = ({ attrs = {}, form_data = {}, on_change }) => {
  const component = new YourComponentClass({ attrs, form_data, on_change });
  return component.render();
};
```

## Migration Guide

### From Class-based to useInputField Pattern

**Legacy pattern (MIGRATE FROM):**
```javascript
class OldComponentClass extends BaseBookingComponent {
  get_field_prefix() {
    return 'text';
  }

  get_input_type() {
    return 'text';
  }

  get_default_label() {
    return 'Text Input';
  }
}

const OldComponent = ({ attrs = {}, form_data = {}, on_change }) => {
  const component = new OldComponentClass({ attrs, form_data, on_change });
  return component.render();
};
```

**Modern pattern (MIGRATE TO):**
```javascript
const NewComponent = ({ attrs, rules }) => {
  const context = useBookingContext();
  const { currentValue, handleChange, error, isValid, inputClasses } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });
  
  const handleInputChange = (e) => {
    handleChange(e.target.value);
  };
  
  return (
    <div className="flex items-stretch medium:justify-between medium:items-center max-medium:flex-col gap-y-2 mb-4">
      {/* Label and Icon Section */}
      <div className="flex items-center gap-x-4">
        {attrs.general?.thumbnail_id && (
          <div
            style={{ '--mask-img': `url('/wp-content/uploads/icon-${attrs.general.thumbnail_id}.svg')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          />
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {attrs.general?.label || 'Default Label'}
        </div>
      </div>
      
      {/* Field Section */}
      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">
        <div className="w-full relative">
          <input 
            type="text" // or email, number, etc.
            id={attrs.field_id}
            name={attrs.field_id}
            value={currentValue}
            onChange={handleInputChange}
            className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={attrs.general?.placeholder || 'Default placeholder'}
            required
            aria-invalid={!!error}
            aria-describedby={error ? `${attrs.field_id}-error` : undefined}
          />
        </div>
      </div>
    </div>
  );
};
```

## Icon Pattern

### JavaScript Implementation
```javascript
{attrs.general?.thumbnail_id && (
  <div
    style={{ '--mask-img': `url('/wp-content/uploads/icon-${attrs.general.thumbnail_id}.svg')` }}
    className="w-25p h-30p bg-th-orange-light cs-mask"
  />
)}
```

### PHP Backend Implementation
```php
// Get icon URL
$icon = !empty($general['thumbnail_id']) ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') : false;

// In prepare_attributes_for_render
'icon' => $icon,
```

## Value Handling Patterns

### String Values (Simple inputs)
```javascript
const handleInputChange = (e) => {
  handleChange(e.target.value);
};
```

### Array Values (Multiple selection)
```javascript
// IconsList example
const selected_icons = (() => {
  if (Array.isArray(currentValue)) return currentValue;
  if (typeof currentValue === 'string' && currentValue.trim() !== '') {
    return currentValue.split(',').map(val => val.trim()).filter(val => val !== '');
  }
  return [];
})();

const handle_icon_click = (icon_value) => {
  // Selection logic...
  const value_for_form = new_selection.length > 0 ? new_selection.join(',') : '';
  handleChange(value_for_form);
};
```

### JSON Values (Complex data)
```javascript
// GoogleMap example
const parseCurrentValue = () => {
  if (!currentValue) return {};
  if (typeof currentValue === 'string') {
    try {
      return JSON.parse(currentValue);
    } catch (e) {
      return {};
    }
  }
  return currentValue;
};

const updatePositionData = (address, lat, lng, country_code = null) => {
  const data = { address, lat, lng, country_code };
  setPositionData(data);
  handleChange(JSON.stringify(data));
};
```

## PHP Backend Implementation

### Block Structure Pattern

All PHP blocks extend `AbstractBlock` and follow this structure:

```php
<?php
namespace Wpcbooking\Blocks;

use Wpcbooking\Blocks\AbstractBlock;

class YourBlock extends AbstractBlock
{
    protected static $BLOCK_NAME = 'your-block-name';

    protected function init_block_properties(): void
    {
        $this->block_name = static::$BLOCK_NAME;
        $this->block_title = __('Your Block Title', 'wpcbooking');
        $this->block_description = __('Your block description', 'wpcbooking');
        $this->block_category = 'booking-cat-fields';
        $this->block_icon = 'your-icon';
        $this->block_keywords = ['booking', 'your', 'keywords'];
    }

    protected function get_block_tabs(): array
    {
        return [
            'general' => __('General', 'wpcbooking'),
            'advanced' => __('Advanced', 'wpcbooking'),
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
                'items' => $this->get_tab_advanced(),
                'tab' => 'advanced',
            ],
            'field_id' => [
                'type' => 'hidden',
                'id' => 'field_id',
            ],
        ];
    }

    public static function prepare_attributes_for_render(array $attributes, string $content, \WP_Block $block): array
    {
        return self::prepare_block($attributes);
    }

    public static function prepare_block(array $attributes): array
    {
        // Process attributes and return prepared data
        return $attributes;
    }
}
```

### IconsList PHP Implementation

```php
// IconsList.php - Key methods
protected function get_tab_icons(): array
{
    return [
        'icons' => [
            'id' => 'icons',
            'type' => 'multi_group',
            'label' => __('Icons', 'wpcbooking'),
            'items' => $this->get_icon_fields(),
            'min' => 0,
        ],
        'number_allowed' => [
            'id' => 'number_allowed',
            'type' => 'number',
            'label' => __('Number of Choices Allowed', 'wpcbooking'),
            'default' => 1,
        ],
    ];
}

protected function get_icon_fields(): array
{
    return [
        'label' => [
            'id' => 'label',
            'type' => 'textarea',
            'label' => __('Label', 'wpcbooking'),
            'rows' => 4,
        ],
        'icon' => [
            'id' => 'icon',
            'type' => 'attachment',
            'label' => __('SVG Icon', 'wpcbooking'),
            'attachment_type' => 'image',
            'mime_types' => 'svg',
        ],
    ];
}

public static function prepare_block(array $attributes): array
{
    $general = $attributes['general'] ?? false;
    $icons_repeater = $general['icons'] ?? false;
    $number_allowed = $general['number_allowed'] ?? 1;
    
    // Process icons data
    $processed_icons = [];
    foreach ($icons_repeater as $index => $row) {
        $label = strip_tags($row["label"]);
        $slug = sanitize_title($label);
        $icon_url = wp_get_attachment_image_url($row["icon"] ?? null, "full");

        $processed_icons[] = [
            'label' => $label,
            'slug' => $slug,
            'icon' => $row["icon"] ?? null,
            'icon_url' => $icon_url,
        ];
    }
    
    return array_merge($attributes, [
        'icons_repeater' => $processed_icons,
        'number_allowed' => $number_allowed,
        'general' => array_merge($general, ['icons' => $processed_icons]),
    ]);
}
```

### GoogleMap PHP Implementation

```php
// GoogleMap.php - Key methods
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
    ], $this->get_map_options());
}

protected function get_map_options(): array
{
    return [
        'sub_tabs' => [
            'id' => 'sub_tabs',
            'type' => 'html',
            'content' => $this->render_sub_tab_content([
                'basic_settings' => __('Basic Settings', 'wpcbooking'),
                'controls' => __('Controls', 'wpcbooking'),
                'behavior' => __('Behavior', 'wpcbooking'),
                'ui_optimization' => __('UI & Optimization', 'wpcbooking')
            ]),
        ],
        // ... map configuration groups
    ];
}

public static function prepare_block(array $attributes): array
{
    $general = $attributes['general'] ?? [];
    
    // Get icon URL
    $general['icon_url'] = !empty($general['thumbnail_id']) 
        ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') 
        : false;
    
    $label = $general['label'] ?? __('Label', 'wpcbooking');
    $key = $attributes['field_id'] ?? '';
    
    // Prepare field configuration for ACF
    $field = [
        'type' => 'google_map',
        'key' => $key,
        'label' => 'Google map',
        'name' => 'google_map',
        'center_lat' => $options_field_type['center_lat'] ?? 46.4519675,
        'center_lng' => $options_field_type['center_lng'] ?? 3.3221324,
        'height' => $options_field_type['height'] ?? 400,
        // ... more ACF field configuration
    ];
    
    return array_merge($attributes, [
        'label' => $label,
        'field' => $field,
        'general' => $general,
    ]);
}

public static function enqueue_scripts()
{
    $api_key = booking_get_maps_api_key();
    if (!empty($api_key)) {
        wp_enqueue_script(
            'google-maps-api',
            "https://maps.googleapis.com/maps/api/js?key={$api_key}&libraries=places,geometry",
            [],
            null,
            true
        );
    }
}
```

### DatePicker PHP Implementation

```php
// DataPicker.php - Key methods
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
            'type' => 'text',
            'label' => __('Label', 'wpcbooking'),
            'default' => 'title',
        ],
        'date_picker_options' => [
            'id' => 'date_picker_options',
            'type' => 'group',
            'label' => __('Calendar Options', 'wpcbooking'),
            'items' => $this->get_date_picker_options_items(),
        ],
    ];
}

protected function get_date_picker_options_items(): array
{
    return [
        'mode' => [
            'id' => 'mode',
            'type' => 'select',
            'label' => __('Mode', 'wpcbooking'),
            'options' => [
                'default' => __('Default', 'wpcbooking'),
                'custom-select' => __('Custom Select', 'wpcbooking'),
            ],
            'default' => 'default',
        ],
        'dateFormat' => [
            'id' => 'dateFormat',
            'type' => 'select',
            'label' => __('Date Format', 'wpcbooking'),
            'options' => [
                'DD/MM/YYYY' => '25/11/2024',
                'MM/DD/YYYY' => '11/25/2024',
                'YYYY-MM-DD' => '2024-11-25',
                'other' => __('Custom', 'wpcbooking'),
            ],
            'default' => 'DD/MM/YYYY',
        ],
        // ... more date picker options
    ];
}

public static function prepare_block(array $attributes): array
{
    $general = $attributes['general'] ?? [];
    
    // Get icon URL
    $general['icon_url'] = !empty($general['thumbnail_id']) 
        ? wp_get_attachment_image_url($general['thumbnail_id'], 'full') 
        : false;
    
    $label = $general['label'] ?? __('Label', 'wpcbooking');
    $id = !empty($attributes['field_id']) ? $attributes['field_id'] : sanitize_title($label);
    
    // Prepare field configuration
    $field = [
        'type' => 'date_picker',
        'class' => 'aff-input-date w-full border-2 border-th-blue rounded-[10px] h-55p px-15p',
        'id' => esc_attr($id),
        'name' => esc_attr($id),
        'default_value' => '',
    ];
    
    // Merge date picker options
    $date_picker_options = $general['date_picker_options'] ?? [];
    $field = array_merge($field, $date_picker_options);
    
    return array_merge($attributes, [
        'label' => $label,
        'id' => $id,
        'field' => $field,
        'general' => $general,
    ]);
}

public static function enqueue_scripts()
{
    wp_enqueue_script(
        'vanilla-calendar-pro',
        WPCBOOKING_PLUGIN_URL . 'node_modules/vanilla-calendar-pro/index.js',
        [],
        '1.0.0',
        true
    );
    wp_enqueue_script(
        'preline-datepicker',
        WPCBOOKING_PLUGIN_URL . 'node_modules/preline/dist/datepicker.js',
        ['preline-js', 'lodash-js', 'vanilla-calendar-pro'],
        '3.2.3',
        true
    );
}
```

### Template Files

Each block has a corresponding PHP template in `includes/Views/Blocks/Public/`:

- `booking-pick-icons.php` - IconsList template
- `booking-google-map.php` - GoogleMap template  
- `booking-date-picker.php` - DatePicker template

### Template Pattern

```php
<?php
/**
 * Booking Your Block: Template
 * 
 * This template renders the your block
 * All variables are prepared in the prepare_block method
 */
?>

<!-- Your Block Container -->
<div class="flex items-stretch px-30p py-[18px] flex-col gap-y-2 border border-th-blue-light rounded-[50px]">
    
    <!-- Label and Icon Section -->
    <div class="flex items-center gap-x-4">
        <?php if ($icon): ?>
            <div style="--mask-img: url('<?= $icon; ?>')" class="w-25p h-30p bg-th-orange-light cs-mask"></div>
        <?php endif; ?>
        <div class="af-p24 max-medium:text-[1.25rem] text-black w-full"><?= esc_html($label) ?></div>
    </div>
    
    <!-- Field Section -->
    <div class="af-p27 text-th-orange-light max-medium:text-[1rem]">
        <?php if (function_exists('acf_render_field_wrap')): ?>
            <?php acf_render_field_wrap($field); ?>
        <?php else: ?>
            <!-- Fallback HTML if ACF is not available -->
            <input type="text" 
                   id="<?= esc_attr($id) ?>" 
                   name="<?= esc_attr($id) ?>" 
                   value="<?= esc_attr($value) ?>" 
                   class="<?= esc_attr($field['class']) ?>">
        <?php endif; ?>
    </div>
    
</div>
```

## Unified Input Styling Requirements

### Mandatory Input Styling
All input components MUST use this exact className for consistent visual design:

```javascript
className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
```

### Styling Breakdown:
- `w-full` - Full width
- `border-2 border-th-blue` - Blue border (2px)
- `rounded-[10px]` - Rounded corners (10px)
- `h-55p` - Height (55px)
- `px-15p` - Horizontal padding (15px)
- `text-left` - Left-aligned text
- `text-th-orange-light` - Orange text color
- `af-p27` - Font size (27px)
- `focus:outline-none focus:ring-2 focus:ring-blue-500` - Focus states

### Layout Requirements:
- Main wrapper: `mb-4` (margin-bottom)
- No border/background on main wrapper
- Consistent spacing with `gap-y-2`
- Responsive layout with `max-medium:flex-col`

### Implementation Examples:
```javascript
// ✅ CORRECT - Use unified styling
<input 
  type="text"
  className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
  value={currentValue}
  onChange={handleInputChange}
/>

// ❌ WRONG - Don't use inputClasses or custom styling
<input 
  type="text"
  className={inputClasses} // Don't use this
  value={currentValue}
  onChange={handleInputChange}
/>
```

## Benefits of useInputField Pattern

- ✅ Consistent validation across all inputs
- ✅ Automatic error state management
- ✅ Unified styling system
- ✅ Better accessibility support
- ✅ Simplified component API
- ✅ Better integration with booking context
- ✅ Consistent icon handling between PHP and JS
- ✅ Flexible value handling (string, array, JSON)
- ✅ Modern React hooks pattern
- ✅ **UNIFIED VISUAL DESIGN** - All inputs have consistent orange text and larger font

## Block Component Checklist

### ✅ MANDATORY REQUIREMENTS FOR ALL BLOCK COMPONENTS

#### 1. **useInputField Pattern Implementation**
- [ ] Import `useBookingContext` and `useInputField`
- [ ] Use `const { currentValue, handleChange, error, isValid, inputClasses } = useInputField()`
- [ ] Props structure: `({ attrs = {}, rules = {} })`
- [ ] Field ID: `attrs.field_id`
- [ ] Value handling: `currentValue` from hook, update via `handleChange`

#### 2. **Layout Structure (MANDATORY)**
- [ ] Main wrapper: `flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4`
- [ ] Label section: `flex items-center gap-x-4`
- [ ] Field section: `af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]`

#### 3. **Icon Implementation (MANDATORY)**
- [ ] Icon container: `w-25p h-30p bg-th-orange-light cs-mask`
- [ ] Icon style: `style={{ '--mask-img': \`url('${attrs.general.icon_url}')\` }}`
- [ ] Icon check: `{attrs.general?.icon_url && (...)}`

#### 4. **Label Implementation (MANDATORY)**
- [ ] Label class: `af-p24 max-medium:text-[1.25rem] text-black w-full`
- [ ] Label text: `{attrs.general?.label || 'Default Label'}`

#### 5. **Input Styling (MANDATORY)**
- [ ] **UNIFIED INPUT CLASS**: `w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500`
- [ ] **NEVER use `inputClasses`** - always use the unified class above
- [ ] Input attributes: `id={attrs.field_id}`, `name={attrs.field_id}`, `value={currentValue}`, `onChange={handleInputChange}`

#### 6. **Accessibility (MANDATORY)**
- [ ] `aria-invalid={!!error}`
- [ ] `aria-describedby={error ? \`${attrs.field_id}-error\` : undefined}`
- [ ] `required` attribute if needed

#### 7. **Error Handling (MANDATORY)**
- [ ] Use `error` from `useInputField` hook
- [ ] Display error messages if needed
- [ ] Handle validation states

### ✅ SPECIALIZED COMPONENT REQUIREMENTS

#### **NumberInput Specific**
- [ ] Increment/decrement buttons: `w-55p h-55p rounded-full bg-th-blue`
- [ ] Button icons: `w-7 h-7 cs-mask bg-white` with SVG masks
- [ ] Number input: `grow w-full border-2 border-th-blue rounded-[10px] h-55p px-10p text-center text-th-orange-light af-p27`
- [ ] Unit label: `ml-2 text-gray-600`
- [ ] Data attributes for singular/plural handling

#### **DatePicker Specific**
- [ ] Input class: `hs-datepicker w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500`
- [ ] Calendar integration with `data-hs-datepicker`
- [ ] Readonly attribute: `readonly=""`

#### **IconsList Specific**
- [ ] Array value handling for multiple selection
- [ ] Icon click handlers with selection logic
- [ ] Visual feedback for selected icons

#### **GoogleMap Specific**
- [ ] JSON value parsing and stringifying
- [ ] Map integration with Google Maps API
- [ ] Address and coordinates handling

### ❌ COMMON MISTAKES TO AVOID

- [ ] **DON'T** use `inputClasses` from hook - use unified styling
- [ ] **DON'T** use custom padding/margins on main wrapper
- [ ] **DON'T** use different border colors than `border-th-blue-light`
- [ ] **DON'T** use different icon sizes than `w-25p h-30p`
- [ ] **DON'T** use different label classes than `af-p24`
- [ ] **DON'T** forget `mb-4` on main wrapper
- [ ] **DON'T** use class-based pattern - migrate to useInputField

### 🔧 MIGRATION CHECKLIST (Class-based → useInputField)

- [ ] Remove class-based imports and component instantiation
- [ ] Add `useBookingContext` and `useInputField` imports
- [ ] Convert to functional component with `({ attrs, rules })` props
- [ ] Replace manual value handling with `currentValue` and `handleChange`
- [ ] Update styling to use unified input classes
- [ ] Add proper accessibility attributes
- [ ] Test validation and error handling
- [ ] Update component documentation

### 📋 COMPONENT VERIFICATION CHECKLIST

Before considering a component complete, verify:

- [ ] ✅ Uses useInputField pattern
- [ ] ✅ Follows unified layout structure
- [ ] ✅ Uses correct icon implementation
- [ ] ✅ Uses unified input styling
- [ ] ✅ Has proper accessibility attributes
- [ ] ✅ Handles errors correctly
- [ ] ✅ Matches visual design with other components
- [ ] ✅ Works on mobile and desktop
- [ ] ✅ Integrates with booking context
- [ ] ✅ Has proper TypeScript/PropTypes if applicable
