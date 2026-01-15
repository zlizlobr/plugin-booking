# Hooks Directory

Centralized Preact hooks for shared logic across components.

## usePriceCalculation.js

Hook for calculating product quantity and price based on backend data structure from `AbstractProductBlock.php`.

### Main Functions

#### `processProduct(productData, bookingFormManager, currentQuantity, currency)`
Main entry point that processes complete product data.

**Parameters:**
- `productData` - Product data from backend (AbstractProductBlock.php structure)
- `bookingFormManager` - Form manager instance
- `currentQuantity` - Current quantity in cart (default: 1)
- `currency` - Currency code (default: 'DKK')

**Returns:** `{quantity, price, price_type, percentage}`

**Example:**
```javascript
import { processProduct } from '../../../hooks/usePriceCalculation.js';

const { quantity, price, price_type, percentage } = processProduct(
  productData,
  bookingFormManager,
  existingItem?.quantity || 1,
  'DKK'
);
```

---

#### `calculateQuantity(productData, bookingFormManager, currentQuantity)`
Calculates quantity based on qty_type.

**Supported qty_type values:**
- `field_connected` / `per_field` - Read from form field (uses `qty_field`)
- `fixed` - Fixed quantity (uses `qty` value)
- `not_connected` - Use current cart quantity

---

#### `calculatePrice(productData, quantity, currency, bookingFormManager)`
Calculates price based on price_type.

**Supported price_type values:**
- `value` - Direct price value (multi-currency object or number)
- `percentage` - Returns 0 (percentage calculated separately)
- `table` - 1D or 2D table lookup

---

#### `lookupTablePrice(table, quantity, currency)`
1D table lookup by quantity.

**Table structure:**
```javascript
[
  {quantity: 1, price: {DKK: 100, EUR: 13}},
  {quantity: 2, price: {DKK: 180, EUR: 24}}
]
```

---

#### `lookupTable2DPrice(table, rowId, columnId, currency)`
2D table lookup by row and column.

**Table structure:**
```javascript
{
  DKK: {
    1: {1: 100, 2: 180},
    2: {1: 150, 2: 270}
  }
}
```

---

### Backend Data Structure

Data structure from `AbstractProductBlock.php`:

```javascript
{
  product_id: 21195,
  price_type: "table",              // 'value' | 'percentage' | 'table'
  percentage: {
    value: 0,
    add_substract: "add"            // 'add' | 'subtract'
  },
  qty_type: "field_connected",      // 'fixed' | 'not_connected' | 'field_connected' | 'per_field'
  qty: 1,                           // Fixed quantity
  qty_field: "field_adults",        // Field ID for quantity lookup
  price: {DKK: 4050, EUR: 543},     // Multi-currency price (for price_type='value')
  table: [{                         // 1D table (for price_type='table')
    quantity: 1,
    price: {DKK: 4050, EUR: 543}
  }],
  table_row_field: "field_id",      // For 2D tables
  table_column_field: "field_id"    // For 2D tables
}
```

---

### Usage Examples

#### ProductList.jsx / ProductGrid.jsx

```javascript
import { processProduct } from '../../../hooks/usePriceCalculation.js';

// In cart update handler:
const { quantity, price, price_type, percentage } = processProduct(
  productData,
  ctx.bookingFormManager,
  existingItem?.quantity || 1,
  ctx.cardManager.currency
);

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

---

### Inspired By

This module is inspired by composite price controls:
- `ValuePriceControl.jsx` - Fixed price handling
- `PercentagePriceControl.jsx` - Percentage calculation
- `TablePriceControl.jsx` - Table lookup logic (1D & 2D)

And backend structure from:
- `AbstractProductBlock.php:1252-1354` - Product data generation

