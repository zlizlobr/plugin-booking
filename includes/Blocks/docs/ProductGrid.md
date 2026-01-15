# Product Grid Block

Block Name: `booking/product-grid`  
Block Icon: `grid-view`

## Description
Display a booking product grid

## Configuration Options

This block extends `AbstractProductBlock` and inherits all its configuration options.

### Tab: Selected Products

See `AbstractProductBlock` documentation for full product definition options.

### Tab: Frontend Conditions

Includes all options from `AbstractProductBlock` plus additional loading configuration:

#### label_pick_later
- **Type:** text
- **Label:** Label Pick Later
- **Default:** Pick later

#### loading_mode
- **Type:** select
- **Label:** Loading Mode
- **Options:**
  - `all` - All at once
  - `button` - Load more button
  - `scroll` - Infinite scroll
- **Default:** all

#### items_per_load
- **Type:** number
- **Label:** Items per load
- **Default:** 6
- **Min:** 1
- **Conditions:** Visible when loading_mode is not 'all'

#### enable_attribute_filter
- **Type:** toggle
- **Label:** Enable Attribute Filter

#### filter_attribute
- **Type:** select
- **Label:** Filter by Attribute
- **Options:** Dynamic list of WooCommerce product attributes
- **Default:** (empty)
- **Conditions:** Visible when enable_attribute_filter is enabled

## Notes
- Extends AbstractProductBlock
- Displays products in a grid format
- Supports different loading modes (pagination, infinite scroll, or load all)
- Can filter products by WooCommerce attributes
- Requires WooCommerce to be active

