# Summary Composite Components

Tento systém renderuje data z jednotlivých bloků v summary sekci booking formuláře.

## Architektura

### Backend (PHP)

Každý block automaticky registruje filtr `wpcbooking_block_render_data_{block_name}` v AbstractBlock.

**Stačí jen implementovat metodu v bloku:**

```php
/**
 * Get render data for summary section
 * Override this method to provide structured data for frontend rendering
 *
 * @param mixed $default Default value
 * @param int $quote_id Quote ID
 * @param string $field_id Field ID
 * @param array $block Block attributes
 * @return array|null Structured data for frontend rendering
 */
public function get_block_render_data($default, int $quote_id, string $field_id, array $block): ?array
{
    $value = get_post_meta($quote_id, $field_id, true);
    
    if (empty($value)) {
        return null;
    }
    
    $label = $block['attrs']['general']['label'] ?? __('Label', 'wpcbooking');
    
    return [
        'block_type' => 'booking/your-block-name', // DŮLEŽITÉ: musí odpovídat názvu bloku
        'label' => $label,
        'value' => $value,
        // ... další potřebná data
    ];
}
```

**Poznámka:** Filtr je automaticky zaregistrován v `AbstractBlock::init_hooks()`. Nemusíš nic přidávat do `init_hooks()` v child klasách!

### Frontend (React/Preact)

#### 1. Vytvořit komponentu pro daný typ bloku

```jsx
// components/composite/YourBlockData.jsx
import { h } from "preact";

const YourBlockData = ({ data }) => {
  const { label, value } = data;

  if (!value) {
    return null;
  }

  return (
    <div className="ml-[25px] flex items-center">
      <label className="text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap">
        {label}:
      </label>
      <span className="text-base text-th-grey font-medium align-middle">
        {value}
      </span>
    </div>
  );
};

export default YourBlockData;
```

#### 2. Zaregistrovat v SummaryDataRenderer

```jsx
// V SummaryDataRenderer.jsx
import YourBlockData from "./YourBlockData.jsx";

const BLOCK_TYPE_MAP = {
  "booking/your-block-name": YourBlockData,
  // ... ostatní bloky
};
```

## Existující komponenty

### TextInputData
Jednoduchý text field.

**Backend data:**
```php
[
    'block_type' => 'booking/text-input',
    'label' => 'Name',
    'value' => 'John Doe',
]
```

### DatePickerData
Datum s formátováním.

**Backend data:**
```php
[
    'block_type' => 'booking/date-picker',
    'label' => 'Hvornår',
    'value' => '2025-12-05',
    'formatted_value' => '05/12/2025',
]
```

### GoogleMapData
Adresa s rozdělenými částmi.

**Backend data:**
```php
[
    'block_type' => 'booking/google-map',
    'label' => 'Location',
    'value' => '{"address":"...", "city":"...", "country":"..."}',
    'parsed_address' => [
        'address' => 'Jasenak, Chorvatsko',
        'city' => 'Jasenak',
        'country' => 'Chorvatsko',
    ],
]
```

### NumberInputData
Číslo s jednotkou.

**Backend data:**
```php
[
    'block_type' => 'booking/number-input',
    'label' => 'Hvor mange gæster',
    'value' => 20,
    'suffix' => 'gæster',
]
```

### IconsListData
Seznam položek s ikonami.

**Backend data:**
```php
[
    'block_type' => 'booking/icons-list',
    'label' => '',
    'value' => 'fodselsdagsfest',
    'items' => [
        [
            'label' => 'Fødselsdagsfest',
            'icon' => 'https://example.com/icon.svg',
        ],
    ],
]
```

### ProductListData / ProductGridData
Seznam produktů s obrázky.

**Backend data:**
```php
[
    'block_type' => 'booking/product-list',
    'label' => 'Selected products',
    'products' => [
        [
            'name' => 'Cocktailbar',
            'image' => 'https://example.com/product.jpg',
        ],
    ],
]
```

### PhoneInputData, EmailInputData, TimePickerData
Stejně jako TextInputData, jen s jiným `block_type`.

## Workflow

1. **SaveStepMutation** (PHP) zavolá filter `wpcbooking_block_render_data_{block_name}` pro každý innerBlock
2. Každý block vrátí strukturovaná data (pole)
3. Data se uloží do `blocks_data[step]['render_data']`
4. Frontend v **SummarySection** použije **SummaryDataRenderer**
5. SummaryDataRenderer mapuje `block_type` na příslušnou komponentu
6. Komponenta renderuje data podle své šablony

## Poznámky

- **Filtr je automaticky zaregistrován v `AbstractBlock::init_hooks()`** - není třeba přidávat do child bloků!
- Pokud block nevrátí data (null), nezobrazí se
- Pokud komponenta pro `block_type` neexistuje, zobrazí se warning v konzoli
- Systém je backwards compatible - pokud `render_data` není dostupné, použije se fallback `item_output` (HTML)
- Všechny composite komponenty musí mít prop `data` a vracet null pokud nemají co zobrazit
- Pro implementaci stačí **jen override metodu `get_block_render_data()` v konkrétním bloku**

