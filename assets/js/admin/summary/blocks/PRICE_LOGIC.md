# Cenová logika bloků

## GoogleMap

**Base:** `distance` (km)

**Výpočet:**
```
contribution = baseTotal * (percentage / 100)
```

**PriceManager:**
```javascript
price_manager.set_map_item(fieldId, { distance, percentage, operation })
```

**Podmínka:** `calculation_quote.apply_calculation === true`

---

## DatePicker

**Base:** `quotesCount` (počet quotes na vybraný datum)

**Výpočet:**
```
contribution = baseTotal * (percentage / 100)
```

**PriceManager:**
```javascript
price_manager.set_date_item(fieldId, { base_value: quotesCount, percentage, operation })
```

**Podmínka:** `calculation_quote.apply_calculation === true`

---

## ProductList

**3 typy cen:**

| Typ | Výpočet |
|-----|---------|
| `value` | `quantity * price` |
| `percentage` | `baseTotal * (percentage / 100)` |
| `table` | lookup z tabulky podle `qty_type` (fixed/mapped) |

**Backend response struktura:**
```javascript
// ctx.value = array produktů s konfigurací
[{
  product_id: 21195,
  price_type: "table",              // 'value' | 'percentage' | 'table'
  percentage: {
    value: 0,
    add_substract: "add"            // 'add' | 'subtract'
  },
  qty_type: "field_connected",      // 'fixed' | 'not_connected' | 'field_connected'
  qty: 1,                           // fixní množství (pokud qty_type = 'fixed')
  qty_field: "field_adults",        // ID pole pro čtení qty (pokud qty_type = 'field_connected')
  price: {DKK: 4050, EUR: 543},     // multi-currency objekt (pokud price_type = 'value')
  table: [{                         // tabulka (pokud price_type = 'table')
    quantity: 1,
    price: {DKK: 4050, EUR: 543}    // multi-currency objekt
  }, {
    quantity: 2,
    price: {DKK: 7200, EUR: 965}
  }]
}]
```

**Quantity Modes pro Table:**
- `qty_type === 'field_connected'` → čte se z `bookingFormManager.get_field_value(qty_field)`
- `qty_type === 'fixed'` → použije se `qty` hodnota
- `qty_type === 'not_connected'` → použije se aktuální `item.quantity` z košíku

**Poznámka:** Ceny jsou vždy objekty s klíči měn `{DKK: 4050, EUR: 543}`. CartManager automaticky normalizuje podle aktuální měny (`window.wpcbooking_public.currency`).

**Price Calculation Module:**
```javascript
import { processProduct } from '../../../hooks/usePriceCalculation.js';

// Centralizovaný výpočet quantity a price
const { quantity, price, price_type, percentage } = processProduct(
  productData,
  bookingFormManager,
  currentQuantity,
  currency
);

// Update v košíku
if (price_type === 'percentage' && percentage) {
  ctx.cardManager.setItemPercentage(
    cart_item_key,
    percentage.value,
    percentage.operation
  );
} else {
  ctx.cardManager.updateProduct(cart_item_key, quantity, price);
}
```

**Dokumentace:** Viz `assets/js/hooks/README.md`

**Sync:** při každé změně produktu → `sync_products_to_manager()`

---

## PriceManager totaly

```javascript
base_total = date_contribution + map_contribution + products_base
percentage_total = products_percentage
grand_total = base_total + percentage_total
```

