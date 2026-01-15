# Product List Block

Block Name: `booking/product-list`  
Block Icon: `list-view`

## Description
Display a booking product list

## Configuration Options

This block extends `AbstractProductBlock` and inherits all its configuration options.

### Tab: Selected Products

See `AbstractProductBlock` documentation for full product definition options including:
- Product filtering (by category/tag or by IDs)
- Price type configurations (fixed, per field, percentage, table)
- Display conditions
- Included products

### Tab: Frontend Conditions

#### required
- **Type:** toggle
- **Label:** Must select a product
- **Default:** false

Plus all other frontend condition options from `AbstractProductBlock`.

## Validation Rules
- `required`: From items.required (if enabled)

## Notes
- Extends AbstractProductBlock
- Displays products in a list format
- Requires WooCommerce to be active

