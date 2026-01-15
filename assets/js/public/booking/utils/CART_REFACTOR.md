# Cart Refactor - Instrukce

## Cíl

Globální CartManager pro summary + booking s:
- Procentuální cenou
- Trigger změn při mapování product → field
- Auto-update ceny a qty

---

## 1. Nová struktura cartData

```javascript
{
  items: [
    {
      cart_item_key: "abc123",
      product_id: 123,
      quantity: 2,
      price: 100,           // base cena
      price_type: "value",  // 'value' | 'percentage' | 'table'
      
      // Pro percentage typ:
      percentage_value: 10,
      percentage_operation: "add",  // 'add' | 'subtract'
      
      // Pro table typ:
      table_field_id: "field_guests",
      table_data: [...],
      
      // Mapování na field:
      linked_field_id: "field_qty",  // null = není mapovaný
      
      // Metadata:
      field_id: "products_grid_1",
      row: 0
    }
  ],
  
  // Celkové hodnoty (calculated):
  base_total: 0,
  percentage_total: 0,
  grand_total: 0
}
```

---

## 2. Nové metody CartManager

```javascript
// Procentuální cena
setItemPercentage(cart_item_key, percentage, operation)
getItemFinalPrice(cart_item_key)  // vrací cenu po aplikaci %

// Mapování na field
linkItemToField(cart_item_key, field_id)
unlinkItemFromField(cart_item_key)

// Auto-update při změně fieldu
onFieldChange(field_id, value)  // triggeruje přepočet

// Přepočet cen
recalculateTotals()
getBaseTotal()
getPercentageTotal()
getGrandTotal()

// Subscribers
subscribe(callback)  // callback(totals)
unsubscribe(callback)
```

---

## 3. Trigger flow

```
Field změna (qty input)
       ↓
CardManager.onFieldChange(field_id, value)
       ↓
Najdi items s linked_field_id === field_id
       ↓
Update quantity/price podle table_data
       ↓
recalculateTotals()
       ↓
notify subscribers
```

---

## 4. Výpočet ceny

```javascript
// Pro každý item:
if (price_type === 'value') {
  item_total = quantity * price
}

if (price_type === 'percentage') {
  item_total = base_total * (percentage_value / 100)
  if (percentage_operation === 'subtract') item_total *= -1
}

if (price_type === 'table') {
  item_total = lookupTablePrice(table_data, linked_field_value)
}

// Celkem:
base_total = sum(items kde price_type !== 'percentage')
percentage_total = sum(items kde price_type === 'percentage')
grand_total = base_total + percentage_total
```

---

## 5. Použití v blocích

**ProductGrid (booking):**
```javascript
cardManager.addProduct(product_id, qty, null, {}, {
  field_id: attrs.field_id,
  row: row,
  price_type: 'value',
  linked_field_id: attrs.qty_field || null
})
```

**ProductList (admin summary):**
```javascript
// Stejné API - sdílený CartManager
```

---

## 6. Singleton pattern

```javascript
// cart.js
let instance = null;

export const getCartManager = (bookingFormManager) => {
  if (!instance) {
    instance = new CartManager(bookingFormManager);
  }
  return instance;
};

export const resetCartManager = () => {
  instance = null;
};
```

---

## 7. TODO

1. [x] Přidat `price_type`, `percentage_*`, `linked_field_id` do item struktury
2. [x] Implementovat `onFieldChange()` 
3. [x] Implementovat `recalculateTotals()` s percentage logikou
4. [x] Přidat subscriber pattern
5. [ ] Upravit ProductGrid aby používal nové API
6. [ ] Upravit admin ProductList aby používal stejný CartManager

