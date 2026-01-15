# Summary Signals - Dokumentace

## 📚 Co je Preact Signals?

**Preact Signals** je reaktivní state management knihovna optimalizovaná pro Preact. Poskytuje **granulární reaktivitu** - komponenty se re-renderují pouze když se změní data, která skutečně používají.

### Oficiální zdroje

| Zdroj | Odkaz |
|-------|-------|
| 📖 Dokumentace | [preactjs.com/guide/v10/signals](https://preactjs.com/guide/v10/signals/) |
| 📦 NPM | [npmjs.com/package/@preact/signals](https://www.npmjs.com/package/@preact/signals) |
| 🐙 GitHub | [github.com/preactjs/signals](https://github.com/preactjs/signals) |
| 📝 Introducing Signals | [preactjs.com/blog/introducing-signals](https://preactjs.com/blog/introducing-signals/) |

### Základní koncepty

```javascript
import { signal, computed, effect } from '@preact/signals';

// 1. SIGNAL - reaktivní hodnota
const count = signal(0);
console.log(count.value); // 0
count.value = 5;          // nastaví hodnotu

// 2. COMPUTED - odvozená hodnota (automaticky se přepočítá)
const double = computed(() => count.value * 2);
console.log(double.value); // 10

// 3. EFFECT - side effect při změně (volitelné)
effect(() => {
  console.log('Count changed:', count.value);
});
```

### Proč Signals místo useState?

| useState | Signals |
|----------|---------|
| Re-render celé komponenty | Re-render jen změněných částí |
| Props drilling nutný | Přímý import kdekoli |
| Manuální memoizace | Automatická optimalizace |
| Lokální pro komponentu | Globální/sdílený state |

---

## 🎯 summarySignals.js - Přehled

Tento modul spravuje **cenový state** pro Admin Summary systém. Nahrazuje props drilling a duplicitní lokální state.

### Architektura

```
┌─────────────────────────────────────────────────────────────┐
│                    summarySignals.js                         │
├─────────────────────────────────────────────────────────────┤
│  SIGNALS (reaktivní hodnoty)                                 │
│  ├── item_prices      → { stepId: price, ... }              │
│  ├── edit_mode        → boolean                              │
│  ├── currency_symbol  → string                               │
│  └── init_total_price → number (z PHP)                       │
├─────────────────────────────────────────────────────────────┤
│  COMPUTED (odvozené hodnoty)                                 │
│  ├── total_price       → suma všech item_prices              │
│  └── final_total_price → total_price nebo init fallback      │
├─────────────────────────────────────────────────────────────┤
│  ACTIONS (funkce pro změnu state)                            │
│  ├── update_item_price(step_id, price)                       │
│  ├── remove_item_price(step_id)                              │
│  ├── set_edit_mode(mode)                                     │
│  ├── toggle_edit_mode()                                      │
│  └── reset_prices()                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Signals

### `item_prices`

Objekt obsahující ceny jednotlivých kroků (steps).

```javascript
import { signal } from '@preact/signals';

export const item_prices = signal({});

// Struktura hodnoty:
// {
//   1: 500,    // step 1 má cenu 500
//   2: 1200,   // step 2 má cenu 1200
//   3: 300     // step 3 má cenu 300
// }
```

**Použití v komponentě:**
```javascript
import { item_prices } from '../signals/summarySignals.js';

const SummaryItem = ({ step }) => {
  // Automaticky se re-renderuje když se změní cena tohoto stepu
  const price = item_prices.value[step] || 0;
  
  return <span>{price}</span>;
};
```

---

### `edit_mode`

Boolean určující, zda je summary v edit módu.

```javascript
export const edit_mode = signal(summary_settings?.editSummary ?? true);
```

**Použití:**
```javascript
import { edit_mode } from '../signals/summarySignals.js';

const SummaryItem = () => {
  const is_editable = edit_mode.value;
  
  return (
    <div>
      {is_editable ? (
        <input type="text" />
      ) : (
        <span>Read only</span>
      )}
    </div>
  );
};
```

---

### `currency_symbol`

Symbol měny načtený z konfigurace.

```javascript
export const currency_symbol = signal(format_config?.currencySymbol || 'kr.');
```

**Použití:**
```javascript
import { currency_symbol } from '../signals/summarySignals.js';

const PriceDisplay = ({ amount }) => (
  <span>{amount} {currency_symbol.value}</span>
);
```

---

### `init_total_price`

Počáteční celková cena načtená z PHP/WordPress.

```javascript
export const init_total_price = signal(
  window.wpcbookingAdminData?.totalPrice || 0
);
```

Slouží jako fallback, když ještě nejsou načteny ceny z bloků.

---

## 🔄 Computed Values

### `total_price`

Automaticky vypočítaná suma všech cen v `item_prices`.

```javascript
import { computed } from '@preact/signals';

export const total_price = computed(() => 
  Object.values(item_prices.value).reduce((sum, price) => sum + (price || 0), 0)
);
```

**Jak to funguje:**
1. Když se změní `item_prices.value`, computed se automaticky přepočítá
2. Komponenty používající `total_price.value` se automaticky re-renderují

---

### `final_total_price`

Finální cena - buď vypočítaná, nebo fallback z init hodnoty.

```javascript
export const final_total_price = computed(() => {
  const calculated = total_price.value;
  return calculated > 0 ? calculated : init_total_price.value;
});
```

**Logika:**
- Pokud `total_price > 0` → použije vypočítanou hodnotu
- Pokud `total_price === 0` → použije `init_total_price` z PHP

---

## ⚡ Actions

### `update_item_price(step_id, price)`

Aktualizuje cenu pro konkrétní step.

```javascript
export const update_item_price = (step_id, price) => {
  item_prices.value = { ...item_prices.value, [step_id]: price };
};
```

**Použití:**
```javascript
import { update_item_price } from '../signals/summarySignals.js';

// V ProductList nebo jiném bloku
const handlePriceChange = (newTotal) => {
  update_item_price(step, newTotal);
};
```

**⚠️ Důležité:** Signal mutace vyžadují nový objekt (immutable pattern):
```javascript
// ✅ SPRÁVNĚ - nový objekt
item_prices.value = { ...item_prices.value, [step_id]: price };

// ❌ ŠPATNĚ - mutace existujícího objektu (nespustí reaktivitu)
item_prices.value[step_id] = price;
```

---

### `remove_item_price(step_id)`

Odstraní cenu stepu (např. při smazání položky).

```javascript
export const remove_item_price = (step_id) => {
  const new_prices = { ...item_prices.value };
  delete new_prices[step_id];
  item_prices.value = new_prices;
};
```

---

### `set_edit_mode(mode)` / `toggle_edit_mode()`

Ovládání edit módu.

```javascript
export const set_edit_mode = (mode) => {
  edit_mode.value = mode;
};

export const toggle_edit_mode = () => {
  edit_mode.value = !edit_mode.value;
};
```

---

### `reset_prices()`

Vymaže všechny ceny (např. při resetu formuláře).

```javascript
export const reset_prices = () => {
  item_prices.value = {};
};
```

---

## 🔗 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     PHP / WordPress                          │
│  window.wpcbookingAdminData = {                              │
│    totalPrice: 2000,                                         │
│    currencySymbol: 'kr.',                                    │
│    summarySettings: { editSummary: true }                    │
│  }                                                           │
└─────────────────────┬───────────────────────────────────────┘
                      │ init
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  summarySignals.js                           │
│                                                              │
│  init_total_price ← 2000                                     │
│  currency_symbol ← 'kr.'                                     │
│  edit_mode ← true                                            │
│  item_prices ← {}                                            │
└─────────────────────┬───────────────────────────────────────┘
                      │ import
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Komponenty                                │
│                                                              │
│  ProductList ──────────────────────────────────────────┐     │
│    └── onChange → update_item_price(1, 500)            │     │
│                                                        │     │
│  GoogleMap ────────────────────────────────────────────┤     │
│    └── onChange → update_item_price(2, 1200)           │     │
│                                                        ▼     │
│                                              item_prices     │
│                                              {1: 500,        │
│                                               2: 1200}       │
│                                                   │          │
│                                                   ▼          │
│                                              total_price     │
│                                              = 1700          │
│                                                   │          │
│                                                   ▼          │
│  SummaryCart ◄──────────────────────── final_total_price     │
│    └── zobrazí: "1700 kr."                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Příklady použití

### Čtení hodnoty v komponentě

```javascript
import { final_total_price, currency_symbol } from '../signals/summarySignals.js';

const SummaryCart = () => {
  // Automatický re-render při změně
  return (
    <div>
      <span>{final_total_price.value}</span>
      <span>{currency_symbol.value}</span>
    </div>
  );
};
```

### Aktualizace z bloku

```javascript
import { update_item_price } from '../signals/summarySignals.js';

const ProductList = ({ step }) => {
  const handleProductChange = (products) => {
    const block_total = products.reduce((sum, p) => sum + p.calculated_total, 0);
    update_item_price(step, block_total);
  };
  
  return (/* ... */);
};
```

### Podmíněné renderování podle edit_mode

```javascript
import { edit_mode } from '../signals/summarySignals.js';

const SummaryItem = () => {
  if (!edit_mode.value) {
    return <span>Read only view</span>;
  }
  
  return <input type="text" />;
};
```

---

## ⚠️ Důležité poznámky

### 1. Immutabilita

Signals vyžadují nový objekt/pole pro detekci změn:

```javascript
// ✅ SPRÁVNĚ
item_prices.value = { ...item_prices.value, [id]: price };

// ❌ ŠPATNĚ (nespustí re-render)
item_prices.value[id] = price;
```

### 2. Přístup k hodnotě

Vždy přistupujte přes `.value`:

```javascript
// ✅ SPRÁVNĚ
const price = total_price.value;

// ❌ ŠPATNĚ
const price = total_price; // vrátí Signal objekt, ne hodnotu
```

### 3. Computed jsou read-only

```javascript
// ❌ NEFUNGUJE - computed nelze přímo nastavit
total_price.value = 100;

// ✅ Změňte zdrojový signal
update_item_price(1, 100);
```

### 4. Signals mimo komponenty

Signals fungují i mimo komponenty (v helper funkcích, utilitách):

```javascript
// utils/priceHelpers.js
import { final_total_price } from '../signals/summarySignals.js';

export const get_formatted_total = () => {
  return `${final_total_price.value} kr.`;
};
```

---

## 🔧 Debugging

### Logování změn

```javascript
import { effect } from '@preact/signals';
import { item_prices, total_price } from './summarySignals.js';

// Zaloguje každou změnu item_prices
effect(() => {
  console.log('📊 item_prices changed:', item_prices.value);
  console.log('💰 total_price:', total_price.value);
});
```

### Browser console

```javascript
// V browser console
import('./summarySignals.js').then(s => {
  console.log('Current prices:', s.item_prices.value);
  console.log('Total:', s.total_price.value);
});
```

---

**Vytvořeno:** 2025-12-15  
**Verze:** 1.0.0

