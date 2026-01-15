# Admin Summary Documentation

Kompletní dokumentace pro Admin Summary systém v WPCBooking pluginu.

## 📚 Dostupné dokumenty

### 1. [README.md](./README.md) - Tento soubor
Přehled celého Admin Summary systému, komponenty, architektura, použití.

### 2. [FIXES_IMPLEMENTED.md](./FIXES_IMPLEMENTED.md) ✨ **NOVÉ OPRAVY (2025-12-15)**
**Implementované opravy** v Quote::save_quote_summary().
- ✅ Řazení blocks před ukládáním (number inputs → others → products)
- ✅ Validace block dat pomocí wpcbooking_validate_block_ filtrů
- ✅ Backend výpočet cen (místo spoléhat na frontend)
- ✅ Sjednocení se SaveStepMutation logikou
- 📊 Porovnání před vs po opravách

### 3. [SAVE_MUTATION_ANALYSIS.md](./SAVE_MUTATION_ANALYSIS.md) 🔍 **ANALÝZA**
**Kompletní analýza** SaveStepMutation vs Quote save systému.
- 🚨 Identifikované problémy v původní implementaci
- ✅ Co SaveStepMutation dělá správně
- 🔧 Detailní návod na opravu všech issues
- 📋 Akční plán implementace

### 4. [SAVING_INSTRUCTIONS.md](./SAVING_INSTRUCTIONS.md) ⭐ **START HERE**
**Hlavní implementační dokument** s detailními instrukcemi pro ukládání dat z Admin Summary do Quote CPT.
- 🏗️ Kompletní architektura save systému
- 📝 Fáze implementace krok za krokem
- 🔧 Integrace s AbstractBlock filter systémem
- 🎯 Řešení problému s mapováním produktů
- 💡 Příklady pro různé typy bloků

### 6. [IMPLEMENTATION_EXAMPLE.jsx](./IMPLEMENTATION_EXAMPLE.jsx)
**Ready-to-use JSX kód** s hidden inputs pro AdminSummary.jsx.
- ✅ Nonce input
- ✅ Global totals inputs
- ✅ Step-level inputs
- ✅ Block-level inputs
- ✅ AJAX save alternativa

### 7. [IMPLEMENTATION_EXAMPLE.php](./IMPLEMENTATION_EXAMPLE.php)
**Ready-to-use PHP kód** pro přidání do `Quote.php`.
- ✅ Kompletní save_post hook implementace
- ✅ Všechny helper metody
- ✅ Security checks
- ✅ Debug logging

### 8. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
**Rychlá reference** pro běžné úkoly a troubleshooting.
- ☑️ Implementation checklist
- 🔍 Rychlé odkazy na klíčové soubory
- 💾 Post meta struktura
- 🎯 Data flow diagram
- 🐛 Debugging tipy
- ⚠️ Časté problémy a řešení

### 9. [ARCHITECTURE.md](./ARCHITECTURE.md)
**Vizuální architektura** celého systému.
- 📊 ASCII diagramy celého flow
- 🔄 Block save filter flow
- 🎯 Product mapping logika
- 📊 State management struktura
- 🔐 Security flow

### 10. [IMPLEMENTATION_COMPLETED.md](./IMPLEMENTATION_COMPLETED.md) ✅
**Completion report** - Co bylo implementováno a jak testovat.
- ✅ Přehled všech změn v Quote.php
- ✅ Přehled všech změn v AdminSummary.jsx
- 🧪 Detailní testing instructions
- 📁 Seznam změněných souborů s čísly řádků
- ☑️ Deployment checklist

### 8. [LOG_READING_GUIDE.md](./LOG_READING_GUIDE.md) 📋
**Guide pro čtení debug logů** - Jak interpretovat kontrolní logy.
- 📖 Příklad úspěšného save s vysvětlením
- 🔍 Význam všech symbolů (🚀 ✅ ❌ ⚠️ atd.)
- 🚫 Časté problémy a jak je diagnostikovat
- 🔧 Užitečné bash příkazy pro práci s logy
- 🎯 Debug checklist

### 9. [QUICK_TEST.md](./QUICK_TEST.md) ⚡ **START HERE**
**5 minut quick test** - Rychlý test že vše funguje.
- ⚡ Setup (1 minuta)
- 🧪 Test procedure (3 minuty)
- ✅ Success criteria
- ❌ Quick troubleshooting
- 📋 Debug checklist

---

## 🎉 Implementation Status

**✅ DOKONČENO** - Systém je připraven k testování!

- ✅ Backend (Quote.php) - 7 nových metod, ~275 řádků kódu
- ✅ Frontend (AdminSummary.jsx) - Hidden inputs pro všechny úrovně
- ✅ Security - Nonce, permissions, sanitization
- ✅ Žádné lint errors
- ⏳ **Next:** Testování v dev prostředí

---

# Admin Components Documentation

Dokumentace pro Preact komponenty používané v admin rozhraní WPCBooking pluginu.

## 📁 Struktura

```
assets/js/admin/components/
├── AdminSummary/              # Komponenty pro Admin Summary
│   ├── AdminSummary.jsx       # Hlavní kontejner komponenta
│   ├── SummaryItem.jsx        # Položka v summary seznamu
│   ├── SummaryItemEdit.jsx    # Editační sekce s bloky
│   ├── SummaryCart.jsx        # Cenový souhrn (košík)
│   └── AddNewRow.jsx          # Formulář pro přidání nového fee
└── AdminBlocks/               # Admin Block System
    ├── BaseAdminBlockComponent.jsx  # Základní třída pro bloky
    ├── AdminBlockRenderer.jsx       # Registry a renderer bloků
    ├── index.js                     # Export všech bloků
    ├── AdminTextInput.jsx           # Text input
    ├── AdminNumberInput.jsx         # Number input
    ├── AdminDatePicker.jsx          # Date picker s ACF integrací
    ├── AdminTimePicker.jsx          # Time picker
    ├── AdminEmailInput.jsx          # Email s validací
    ├── AdminPhoneInput.jsx          # Phone number input
    ├── AdminSelect.jsx              # Select dropdown
    ├── AdminRadioGroup.jsx          # Radio buttons
    ├── AdminCheckbox.jsx            # Checkboxes
    ├── AdminTextarea.jsx            # Multi-line text
    ├── AdminGoogleMap.jsx           # Google Maps integrace
    └── AdminCalculator.jsx          # Percentage calculator
```

---

## 🎯 Admin Summary System

### Přehled

Admin Summary je systém pro zobrazení a editaci souhrnu objednávky (quote) v WordPress admin rozhraní. Využívá **Preact** pro rychlý a efektivní rendering s minimální velikostí bundle.

### Klíčové Vlastnosti

- ✅ **Preact** (ne React!) - 3KB library místo 40KB
- ✅ **Controlled Components** - state-driven, žádné DOM queries
- ✅ **Server-side Data** - data z `window.wpcbookingAdminData`
- ✅ **Lokální Editace** - změny pouze v browseru (preview mode)
- ✅ **Reactive Kalkulace** - automatické přepočty cen
- ✅ **JSDoc Types** - type safety bez TypeScript
- ✅ **Tailwind CSS** - zachované všechny třídy z PHP verze

---

## 📦 Komponenty

### AdminSummary (Hlavní Komponenta)

**Cesta:** `AdminSummary/AdminSummary.jsx`

Hlavní kontejner pro celý Admin Summary systém. Orchestruje všechny pod-komponenty a spravuje globální state.

#### Props

Komponenta nemá props - načítá data z `window.wpcbookingAdminData`.

#### State

```javascript
const [steps, setSteps] = useState(getSteps());
const [stepSections, setStepSections] = useState(getStepSections());
```

#### Data Flow

```
window.wpcbookingAdminData (WordPress)
        ↓
configHelpers.js (getSteps, getStepSections)
        ↓
AdminSummary State (useState)
        ↓
SummaryItem Components
        ↓
Local Changes (onChange callbacks)
        ↓
State Updates (reactive)
        ↓
usePriceCalculations Hook
        ↓
Automatic Re-render
```

#### Callbacks

```javascript
// Handle změny labelu
handleLabelChange(stepId, newLabel)

// Handle změny bloku
handleBlockChange(stepId, fieldId, value)

// Handle odstranění položky
handleDelete(stepId)

// Handle přidání nového fee
handleAddFee(label, price)
```

#### Použití

```javascript
import AdminSummary from './components/AdminSummary/AdminSummary.jsx';

// Mount komponenty
render(<AdminSummary />, document.getElementById('admin-summary-root'));
```

---

### SummaryItem

**Cesta:** `AdminSummary/SummaryItem.jsx`

Komponenta pro zobrazení jedné položky (kroku) v summary. Obsahuje horní část (ikona, label, cena) a dolní část (edit sekce) v jednom `<li>` elementu.

#### Props

```javascript
/**
 * @param {Object} props
 * @param {number} props.step - Číslo kroku
 * @param {string} props.label - Label položky
 * @param {string} props.thumbnailSrc - URL thumbnauilu
 * @param {number} [props.value=0] - Základní cena
 * @param {number} [props.pricePercentage=0] - Cenový příplatek
 * @param {number} [props.priceProducts=0] - Cena produktů
 * @param {string} props.currencySymbol - Symbol měny
 * @param {boolean} [props.editPrice=false] - Zda zobrazit delete button
 * @param {Object} [props.stepSection={}] - Bloky pro editaci
 * @param {Function} [props.onDelete] - Callback pro odstranění
 * @param {Function} [props.onLabelChange] - Callback pro změnu labelu
 * @param {Function} [props.onBlockChange] - Callback při změně bloku
 * @param {number} props.postId - ID postu
 */
```

#### Struktura

```jsx
<li className="aff-summary-item min-h-[70px] flex flex-col medium:flex-col justify-stretch medium:justify-between max-medium:px-1 items-stretch bg-th-grey-lighter rounded-[35px] pb-marker-bottom-30">
  
  {/* Header: Ikona + Label + Cena */}
  <div className="flex flex-row w-full rounded-[35px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
    
    {/* Icon and Label sekce */}
    <div className="min-h-[66px] w-3/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
      
      {/* Ikona - oranžový kruh s bílou SVG mask */}
      <div className="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
        <div 
          style={{ '--mask-img': `url('${iconUrl}')` }} 
          className="w-25p h-25p bg-white cs-mask"
        />
      </div>
      
      {/* Label - editovatelný input nebo read-only span */}
      <div className="w-full af-p20 text-th-grey inline-flex flex-row items-center">
        {editPrice ? (
          <span className="w-full">{label}</span>
        ) : (
          <input 
            type="text" 
            value={label} 
            onInput={handleLabelChange}
            className="quote_label w-full h-[50px] bg-transparent"
          />
        )}
      </div>
    </div>
    
    {/* Price sekce */}
    <div className="price-item flex items-center gap-x-4">
      <div className="hidden aff-step-price absolute right-[70px] af-p20-bold text-black uppercase flex items-center gap-x-1 whitespace-nowrap">
        <span className="block_price_products">{formatPrice(totalPrice)}</span>
        <span className="currnency_symbol text-sm text-gray-500">{currencySymbol}</span>
      </div>
      {/* Hidden inputs pro PHP formulář */}
      <input type="hidden" name={`total_price_step_${step}`} value={totalPrice} />
      <input type="hidden" name={`price_percentage_step_${step}`} value={pricePercentage} />
      <input type="hidden" name={`price_products_step_${step}`} value={priceProducts} />
    </div>
  </div>
  
  {/* Edit sekce s bloky */}
  <div className="w-full block">
    <SummaryItemEdit 
      stepSection={stepSection} 
      step={step}
      onBlockChange={onBlockChange}
      postId={postId}
    />
  </div>
</li>
```

---

### SummaryItemEdit

**Cesta:** `AdminSummary/SummaryItemEdit.jsx`

Komponenta pro editaci bloků uvnitř summary položky. Renderuje admin bloky pomocí `AdminBlockRenderer`.

#### Props

```javascript
/**
 * @param {Object} props
 * @param {Object} props.stepSection - Bloky pro editaci (field data)
 * @param {number} props.step - Číslo kroku
 * @param {number} props.postId - ID postu
 * @param {Function} props.onBlockChange - Callback při změně bloku
 */
```

#### Použití

```javascript
<SummaryItemEdit 
  stepSection={{
    'field_123': {
      type: 'text',
      label: 'Name',
      value: 'John Doe'
    }
  }}
  step={2}
  postId={123}
  onBlockChange={(step, fieldId, value) => console.log(value)}
/>
```

---

### SummaryCart

**Cesta:** `AdminSummary/SummaryCart.jsx`

Komponenta pro zobrazení celkového cenového souhrnu. Čistě presentational - žádný state.

#### Props

```javascript
/**
 * @param {Object} props
 * @param {string} props.labelPrice - Label pro "Price"
 * @param {number} props.contentsTotal - Mezisoučet
 * @param {number} props.shippingTotal - Cena dopravy
 * @param {string} props.labelTotal - Label pro "Total"
 * @param {number} props.cartTotal - Celkový součet
 * @param {string} props.currencySymbol - Symbol měny
 */
```

#### Struktura

```jsx
<div className="bg-th-orange rounded-[35px] ...">
  {/* Ikona coins.svg */}
  {/* Mezisoučet */}
  {/* Doprava (pokud > 0) */}
  {/* Celkový součet */}
  {/* Hidden inputy */}
</div>
```

---

### AddNewRow

**Cesta:** `AdminSummary/AddNewRow.jsx`

Formulář pro přidání nového poplatku/fee do summary.

#### Props

```javascript
/**
 * @param {Object} props
 * @param {string} props.currencySymbol - Symbol měny
 * @param {number} props.stepCount - Počet kroků
 * @param {string} props.labelAddFee - Text pro "Add fee"
 * @param {Function} props.onAdd - Callback při přidání (label, price)
 */
```

#### Struktura

```jsx
<li className="aff-add-new-row min-h-[70px] flex flex-col medium:flex-row justify-stretch medium:justify-between max-medium:px-1 items-center bg-th-grey-lighter rounded-[35px]">
  
  {/* Hlavní sekce s ikonou a inputy */}
  <div className="min-h-[66px] w-full medium:w-4/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
    
    {/* Info ikona */}
    <div className="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
      <div 
        style={{ '--mask-img': "url('/path/to/info.svg')" }}
        className="w-25p h-25p bg-white cs-mask"
      />
    </div>
    
    {/* Label a inputy */}
    <div className="af-p20 text-th-grey">
      {labelAddFee}
      <input type="text" name="new-row-name" value="" placeholder="Label" />
      <input type="number" name="new-row-price" value="0" placeholder={currencySymbol} />
    </div>
  </div>
  
  {/* Plus button */}
  <div className="flex justify-end items-center gap-x-4 pr-30p max-medium:p-30p">
    <a 
      onClick={handleAdd}
      style={{ '--mask-img': "url('/path/to/plus.svg')" }}
      className="w-25p h-25p bg-th-orange-light cs-mask cursor-pointer"
    />
  </div>
</li>
```

#### Použití

```javascript
<AddNewRow
  currencySymbol="kr."
  stepCount={5}
  labelAddFee="Add fee"
  onAdd={(label, price) => {
    console.log(`Adding: ${label} - ${price}`);
  }}
/>
```

---

## 🧱 Admin Block System

### Architektura

Admin Block System je modulární systém pro renderování různých typů input fieldů v admin rozhraní.

### BaseAdminBlockComponent

**Cesta:** `AdminBlocks/BaseAdminBlockComponent.jsx`

Základní třída poskytující společnou funkcionalitu pro všechny admin bloky.

#### Vlastnosti

```javascript
class BaseAdminBlockComponent {
  // Props management
  this.props
  this.attrs
  this.fieldId
  this.value
  this.onChange
  this.step
  this.postId
  
  // Methods
  get_icon_url(thumbnailId)        // Získat URL ikony
  render_label_section(label, iconUrl)  // Render label s ikonou
  render_container(children)       // Render container
  handle_change(value)            // Handle změny
  render_input()                  // Render input (override)
  render()                        // Hlavní render
  get_default_label()            // Default label (override)
}
```

#### Použití

```javascript
import { BaseAdminBlockComponent } from './BaseAdminBlockComponent.jsx';

const MyBlock = (props) => {
  const component = new BaseAdminBlockComponent(props);
  
  // Override render_input
  component.render_input = () => {
    return (
      <input
        value={component.value}
        onInput={(e) => component.handle_change(e.target.value)}
      />
    );
  };
  
  component.get_default_label = () => 'My Field';
  
  return component.render();
};
```

---

### AdminBlockRenderer

**Cesta:** `AdminBlocks/AdminBlockRenderer.jsx`

Registry a renderer pro admin bloky. Mapuje typ bloku na správnou komponentu.

#### Podporované Typy

```javascript
const ADMIN_BLOCK_TYPES = {
  DATE_PICKER: 'date_picker',
  TIME_PICKER: 'time_picker',
  GOOGLE_MAP: 'google_map',
  NUMBER: 'number',
  TEXT: 'text',
  EMAIL: 'email',
  PHONE: 'tel',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  TEXTAREA: 'textarea',
  CALCULATOR: 'calculator'
};
```

#### Použití

```javascript
<AdminBlockRenderer
  blockType="text"
  attrs={{
    label: 'Full Name',
    placeholder: 'Enter name...',
    field_id: 'customer_name'
  }}
  step={2}
  postId={123}
  value="John Doe"
  onChange={(fieldId, value) => console.log(value)}
/>
```

---

### Jednotlivé Admin Bloky

#### AdminTextInput

Text input field.

```javascript
<AdminTextInput
  attrs={{ placeholder: 'Enter text...', max_length: 100 }}
  value="Hello"
  onChange={(fieldId, value) => {}}
/>
```

#### AdminNumberInput

Number input s validací.

```javascript
<AdminNumberInput
  attrs={{ min: 0, max: 100, step: 1 }}
  value={50}
  onChange={(fieldId, value) => {}}
/>
```

#### AdminDatePicker

Date picker s ACF integrací.

```javascript
<AdminDatePicker
  attrs={{ placeholder: 'Select date' }}
  value="20/11/2025"
  onChange={(fieldId, value) => {}}
/>
```

#### AdminEmailInput

Email s validací.

```javascript
<AdminEmailInput
  attrs={{ placeholder: 'Email address' }}
  value="user@example.com"
  onChange={(fieldId, value) => {}}
/>
```

#### AdminSelect

Select dropdown.

```javascript
<AdminSelect
  attrs={{
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' }
    ]
  }}
  value="1"
  onChange={(fieldId, value) => {}}
/>
```

#### AdminRadioGroup

Radio buttons (single choice).

```javascript
<AdminRadioGroup
  attrs={{
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  }}
  value="yes"
  onChange={(fieldId, value) => {}}
/>
```

#### AdminCheckbox

Checkboxes (single nebo multiple).

```javascript
<AdminCheckbox
  attrs={{
    multiple: true,
    options: [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' }
    ]
  }}
  value={['opt1']}
  onChange={(fieldId, value) => {}}
/>
```

#### AdminTextarea

Multi-line text input.

```javascript
<AdminTextarea
  attrs={{ rows: 4, max_length: 500 }}
  value="Long text..."
  onChange={(fieldId, value) => {}}
/>
```

#### AdminGoogleMap

Google Maps integrace.

```javascript
<AdminGoogleMap
  value={{
    address: 'Copenhagen, Denmark',
    lat: 55.6761,
    lng: 12.5683,
    distance: 10
  }}
  onChange={(fieldId, value) => {}}
/>
```

#### AdminCalculator

Percentage calculator.

```javascript
<AdminCalculator
  attrs={{
    operation: 'add',
    percentage: 20,
    base_total: 1000
  }}
  onChange={(fieldId, value) => {}}
/>
```

---

## 🔧 Technické Detaily

### Controlled Components Pattern

Všechny komponenty používají **Controlled Components** pattern:

```javascript
// ❌ ŠPATNĚ - Uncontrolled
<input defaultValue={value} />

// ✅ SPRÁVNĚ - Controlled
<input 
  value={value}
  onInput={(e) => onChange(e.target.value)}
/>
```

### State Management

```javascript
// Local state v komponentě
const [value, setValue] = useState('');

// Propagace nahoru přes callback
<Component 
  value={value}
  onChange={(fieldId, newValue) => setValue(newValue)}
/>
```

### CSS Mask Pro Ikony

```javascript
const maskStyle = {
  WebkitMask: `url('${iconUrl}') no-repeat center`,
  mask: `url('${iconUrl}') no-repeat center`,
  WebkitMaskSize: 'contain',
  maskSize: 'contain'
};

<div style={maskStyle} className="w-25p h-25p bg-white" />
```

---

## 📊 Data Flow

### Celkový Data Flow

```
┌─────────────────────────────────────┐
│  WordPress (PHP)                    │
│  - get_booking_options_*()          │
│  - wp_add_inline_script()           │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  window.wpcbookingAdminData         │
│  {                                  │
│    steps: {...},                    │
│    stepSections: {...},             │
│    formatConfig: {...}              │
│  }                                  │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  configHelpers.js                   │
│  - getSteps()                       │
│  - getStepSections()                │
│  - getFormatConfig()                │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  AdminSummary Component             │
│  const [steps, setSteps] = ...      │
│  const [sections, setSections] = ... │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  usePriceCalculations Hook          │
│  - Reactive kalkulace               │
│  - Automatické přepočty             │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  SummaryItem Components             │
│  - Zobrazení dat                    │
│  - Lokální editace                  │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  onChange Callbacks                 │
│  - handleLabelChange()              │
│  - handleBlockChange()              │
│  - handleDelete()                   │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│  State Updates (setState)           │
│  - Komponenta re-renders            │
│  - Ceny se přepočítají              │
└─────────────────────────────────────┘
```

---

## 🚀 Použití

### Základní Setup

```javascript
import { h, render } from 'preact';
import AdminSummary from './components/AdminSummary/AdminSummary.jsx';

// 1. Připravit data v WordPress
window.wpcbookingAdminData = {
  bookingId: 123,
  pluginUrl: '/wp-content/plugins/wpcbooking/',
  steps: {
    1: {
      id: 1,
      label_summary: 'Step 1',
      value: 100,
      thumbnail_src: '/path/to/icon.svg'
    }
  },
  stepSections: {
    1: {
      'field_name': {
        type: 'text',
        label: 'Name',
        value: 'John'
      }
    }
  },
  formatConfig: {
    currencySymbol: 'kr.',
    decimalSeparator: ',',
    thousandSeparator: '.'
  }
};

// 2. Mount komponenty
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('admin-summary-root');
  if (root) {
    render(<AdminSummary />, root);
  }
});
```

### Přidání Nového Admin Bloku

```javascript
// 1. Vytvořit novou komponentu
// AdminBlocks/AdminMyField.jsx

import { h } from 'preact';
import { BaseAdminBlockComponent } from './BaseAdminBlockComponent.jsx';

const AdminMyField = (props) => {
  const component = new BaseAdminBlockComponent(props);
  
  component.render_input = () => {
    return (
      <input
        type="text"
        value={component.value}
        onInput={(e) => component.handle_change(e.target.value)}
        className="..."
      />
    );
  };
  
  component.get_default_label = () => 'My Field';
  
  return component.render();
};

export default AdminMyField;

// 2. Přidat do index.js
export { default as AdminMyField } from './AdminMyField.jsx';

// 3. Registrovat v AdminBlockRenderer.jsx
const componentMap = {
  // ...
  'my_field': () => import('./AdminMyField.jsx')
};

// 4. Přidat do constants.js
export const ADMIN_BLOCK_TYPES = {
  // ...
  MY_FIELD: 'my_field'
};
```

---

## 🎨 Styling

### Tailwind CSS Třídy

Komponenty používají Tailwind CSS s custom třídami z bartender tématu:

```javascript
// Barvy tématu (z tailwind.config.js)
'bg-th-orange'         // #ee7013 - Hlavní oranžová
'bg-th-orange-light'   // #ffa25e - Světle oranžová  
'bg-th-grey'           // #707070 - Tmavě šedá
'bg-th-grey-lighter'   // #f5f5f5 - Světle šedá
'text-th-grey'         // #707070 - Šedý text
'text-white'           // Bílý text
'bg-white'             // Bílé pozadí

// Typografie (z _typography.scss)
'af-p20'               // Font: Poppins, 1.25rem/1.6667, 500
'af-p20-bold'          // Font: Poppins, 1.25rem, 700
'af-p25'               // Font: Poppins, 1.5625rem, 500

// Spacing (generované make5pxSpacing funkcí)
'pl-20p'               // padding-left: 1.25rem (20px)
'pl-40p'               // padding-left: 2.5rem (40px)
'py-50p'               // padding-y: 3.125rem (50px)
'gap-x-5'              // gap horizontal (standard Tailwind)
'space-y-5'            // vertical spacing mezi elementy

// Rozměry (generované make5pxSpacing)
'w-50p'                // width: 3.125rem (50px)
'h-50p'                // height: 3.125rem (50px)
'w-25p'                // width: 1.5625rem (25px)
'h-25p'                // height: 1.5625rem (25px)
'min-h-[66px]'         // minimální výška 66px
'min-h-[70px]'         // minimální výška 70px

// Zaoblení
'rounded-[35px]'       // border-radius: 35px
'rounded-full'         // kompletně zaoblené (kruh)

// CSS Mask ikony (z _components.scss)
'cs-mask'              // Třída pro SVG mask ikony
// Použití: <div style="--mask-img: url('path/to/icon.svg')" class="w-25p h-25p bg-white cs-mask" />
```

### Responsive Breakpoints

```javascript
// Medium screens (768px+)
'medium:col-span-6'    // Grid columns od 768px
'medium:col-[1/span_9]' // Grid columns 1 to 9

// Large screens (1024px+)  
'large:pl-40p'         // padding-left: 40px od 1024px
'large:col-span-4'     // Grid columns od 1024px

// Max width (do breakpointu)
'max-medium:px-1'      // padding-x: 0.25rem do 768px
'max-medium:rounded-b-[4px]' // zaoblení spodních rohů do 768px
```

### CSS Mask Pattern pro Ikony

Ikony se renderují pomocí CSS mask techniky (definované v bartender `_components.scss`):

```jsx
// Základní struktura pro ikonu
<div 
  className="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0"
>
  <div 
    style={{ '--mask-img': `url('${iconUrl}')` }}
    className="w-25p h-25p bg-white cs-mask"
  />
</div>
```

**Jak to funguje:**
1. Vnější `div` - oranžové pozadí (50x50px, zaoblené)
2. Vnitřní `div` - bílá barva s CSS mask (25x25px)
3. Inline styl `--mask-img` - nastaví URL SVG ikony
4. Třída `cs-mask` - aplikuje mask-image, mask-size, mask-repeat

**CSS definice (z bartender):**
```scss
.cs-mask {
    mask-image: var(--mask-img);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
}
```

**Příklad v komponentě:**
```jsx
const iconUrl = step?.thumbnail_src || '';
const maskStyle = { '--mask-img': `url('${iconUrl}')` };

return (
  <div className="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
    <div style={maskStyle} className="w-25p h-25p bg-white cs-mask" />
  </div>
);
```

---

## ⚠️ Důležité Poznámky

### 1. Preact vs React

```javascript
// ❌ ŠPATNĚ - React import
import React from 'react';

// ✅ SPRÁVNĚ - Preact import
import { h } from 'preact';
import { useState } from 'preact/hooks';
```

### 2. Lokální Změny

**⚠️ Komponenta je v PREVIEW módu:**
- Data z `window.wpcbookingAdminData`
- Změny se **NEUKLÁDAJÍ** na server
- Pouze lokální editace v browseru
- Pro ukládání potřeba backend integrace

### 3. Event Handlers

```javascript
// ✅ Preact preferuje onInput
<input onInput={(e) => handleChange(e)} />

// ⚠️ onChange funguje, ale onInput je lepší
<input onChange={(e) => handleChange(e)} />
```

### 4. JSDoc Types

```javascript
/**
 * @typedef {Object} MyType
 * @property {string} name
 * @property {number} age
 */

/**
 * @param {MyType} props
 * @returns {import('preact').VNode}
 */
const MyComponent = (props) => { ... }
```

---

## 🐛 Debugging

### Console Logs

```javascript
// V AdminSummary.jsx
useEffect(() => {
  console.log('📦 AdminSummary mounted', { steps, stepSections });
}, []);

// V onChange callbacks
const handleBlockChange = (step, fieldId, value) => {
  console.log('📝 Block changed:', { step, fieldId, value });
  // ...
};
```

### Kontrola Window Data

```javascript
// V browser console
console.log(window.wpcbookingAdminData);

// Struktura dat
{
  bookingId: number,
  steps: Object,
  stepSections: Object,
  formatConfig: Object,
  summarySettings: Object
}
```

---

## 📚 Reference

### Related Files

- `../utils/priceFormatting.js` - Price formatting utilities
- `../utils/calculations.js` - Price calculations
- `../utils/configHelpers.js` - Config helpers
- `../hooks/useDebounce.js` - Debounce hook
- `../hooks/usePriceCalculations.js` - Price calculations hook
- `../config/constants.js` - Constants
- `../types.js` - JSDoc type definitions

### External Dependencies

- **Preact** - `import { h, render } from 'preact'`
- **Preact Hooks** - `import { useState, useEffect } from 'preact/hooks'`
- **Tailwind CSS** - Styling framework

---

## 📝 Changelog

### v1.0.0 (2025-11-26)

- ✅ Initial release
- ✅ AdminSummary komponenta
- ✅ 5 pod-komponent (Item, ItemEdit, Cart, AddNewRow)
- ✅ Admin Block System (12 bloků)
- ✅ Controlled Components pattern
- ✅ Reactive price calculations
- ✅ JSDoc documentation

---

**Created:** 2025-11-26  
**Last Updated:** 2025-11-26  
**Version:** 1.0.0  
**Author:** WPCBooking Team

