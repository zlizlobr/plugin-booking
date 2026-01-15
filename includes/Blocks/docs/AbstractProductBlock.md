# Abstract Product Block

Base class for product-related blocks (ProductList, ProductGrid)

## Description
This abstract class provides common functionality for product selection and display blocks. It includes product filtering, pricing configuration, and display conditions.

## Configuration Options

### Tab: Selected Products

#### product_definitions (Multi Group)
- **Type:** multi_group
- **Label:** Product Definitions
- **Min:** 1

##### label_group
- **Type:** text
- **Label:** Label
- **Placeholder:** Label for product

##### filter
- **Type:** select
- **Label:** Filter Products
- **Options:**
  - `by_terms` - By Category and Tag
  - `by_ids` - Pick Products
- **Default:** by_terms
- **Required:** true

##### product_cat
- **Type:** multi_term
- **Label:** Product Category
- **Taxonomy:** product_cat
- **Conditions:** Visible when filter is 'by_terms'

##### product_tag
- **Type:** multi_term
- **Label:** Product Tag
- **Taxonomy:** product_tag
- **Conditions:** Visible when filter is 'by_terms'

##### product_ids
- **Type:** post
- **Label:** Product ID
- **Post Type:** product
- **Conditions:** Visible when filter is 'by_ids'

##### price_type
- **Type:** select
- **Label:** Price Type
- **Options:**
  - `fixed` - Fixed Price
  - `per_field` - Price per Field
  - `percentage` - Percentage
  - `table` - Table
- **Default:** fixed

##### Fixed Price Configuration
**Conditions:** Visible when price_type is 'fixed'

###### price_in_currency (Multi Group)
- Allows setting different prices for different currencies

###### quantity (Group)
- **enable_quantity_modification:** Toggle to allow quantity changes
- **default_quantity:** Default quantity value
- **min_quantity:** Minimum allowed quantity
- **max_quantity:** Maximum allowed quantity
- **quantity_step:** Step for quantity increment

##### Per Field Configuration
**Conditions:** Visible when price_type is 'per_field'

###### calculation_fields (Multi Group)
- **field:** Select booking field
- **multiply_type:** Select operation type (multiply, divide, add, subtract)
- **default_price:** Default price value
- **price_in_currency:** Multi-currency price settings

##### Percentage Configuration
**Conditions:** Visible when price_type is 'percentage'

###### percentage_config (Group)
- **percentage:** Percentage value
- **base_field:** Field to calculate percentage from
- **apply_to_subtotal:** Apply to subtotal toggle

##### Table Price Configuration
**Conditions:** Visible when price_type is 'table'

###### table_price_rows (Multi Group)
- **trigger_field:** Field that triggers this price
- **trigger_value_from:** Value range start
- **trigger_value_to:** Value range end
- **price:** Price for this range
- **price_in_currency:** Multi-currency settings

##### apply_display_conditions
- **Type:** toggle
- **Label:** Apply display conditions

##### display_conditions (Multi Group)
**Conditions:** Visible when apply_display_conditions is enabled

###### field
- **Type:** select
- **Label:** Field
- **Options:** Dynamic list of booking fields

###### condition
- **Type:** select
- **Label:** Condition
- **Options:**
  - `==` - Equals
  - `!=` - Not equals
  - `>` - Greater than
  - `<` - Less than
  - `>=` - Greater or equal
  - `<=` - Less or equal
  - `contains` - Contains
  - `not_contains` - Not contains

###### value
- **Type:** text
- **Label:** Value

##### add_included_products
- **Type:** toggle
- **Label:** Include Products

##### included_products
- **Type:** multi_post
- **Label:** Included Products
- **Description:** Select products to include in the booking
- **Post Type:** product
- **Conditions:** Visible when add_included_products is enabled

##### apply_display_total
- **Type:** toggle
- **Label:** Display in Total summary

### Tab: Frontend Conditions

#### allow_skip
- **Type:** toggle
- **Label:** Allow Skip
- **Description:** Allow users to skip product selection

#### multiple_selection
- **Type:** toggle
- **Label:** Multiple Selection
- **Description:** Allow selection of multiple products

#### show_product_image
- **Type:** toggle
- **Label:** Show Product Image
- **Default:** true

#### show_product_price
- **Type:** toggle
- **Label:** Show Product Price
- **Default:** true

#### show_product_description
- **Type:** toggle
- **Label:** Show Product Description
- **Default:** true

#### show_product_short_description
- **Type:** toggle
- **Label:** Show Product Short Description
- **Default:** true

#### custom_add_to_cart_text
- **Type:** text
- **Label:** Custom "Add to Cart" Text
- **Placeholder:** Add to booking

## Features

### Price Calculation Types

1. **Fixed Price**
   - Simple fixed price per product
   - Supports quantity modifications
   - Multi-currency support

2. **Per Field**
   - Price calculated based on other booking fields
   - Supports mathematical operations (multiply, divide, add, subtract)
   - Useful for dynamic pricing based on user input

3. **Percentage**
   - Price as a percentage of another field or subtotal
   - Can apply to specific base fields

4. **Table Price**
   - Price determined by value ranges
   - Trigger based on other field values
   - Supports complex pricing tiers

### Display Conditions
- Show/hide products based on other field values
- Supports multiple condition types (equals, greater than, contains, etc.)
- Multiple conditions can be combined

### Product Filtering
- Filter by WooCommerce categories and tags
- Or select specific products by ID
- Supports multiple product definitions per block

## Child Classes
- **ProductList**: Displays products in a list format
- **ProductGrid**: Displays products in a grid format with additional loading options

