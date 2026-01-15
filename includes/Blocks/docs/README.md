# WPCBooking Blocks Documentation

Complete documentation for all WPCBooking blocks and their configuration options.

## Table of Contents

### Form Container Blocks

- **[BookingForm](BookingForm.md)** - Main booking form container block
- **[StepSection](StepSection.md)** - Step section container for organizing form fields

### Input Field Blocks

- **[TextInput](TextInput.md)** - Basic text input field with user field mapping
- **[EmailInput](EmailInput.md)** - Email input with validation and user account creation
- **[NumberInput](NumberInput.md)** - Number input with min/max validation and quantity options
- **[PhoneInput](PhoneInput.md)** - International phone input with country selection
- **[DataPicker](DataPicker.md)** - Date picker with calendar options and busy day calculation
- **[TimePicker](TimePicker.md)** - Time picker with format options and time restrictions
- **[GoogleMap](GoogleMap.md)** - Location picker with Google Maps integration and distance calculation
- **[IconsList](IconsList.md)** - Icon selection field

### Product Blocks

- **[AbstractProductBlock](AbstractProductBlock.md)** - Base class for product blocks with pricing and filtering
- **[ProductList](ProductList.md)** - Display products in list format
- **[ProductGrid](ProductGrid.md)** - Display products in grid format with advanced loading options

## Block Categories

### booking-cat-fields (Form Fields)
- TextInput
- EmailInput
- NumberInput
- PhoneInput
- DataPicker
- TimePicker
- GoogleMap
- IconsList

### booking-cat-form (Form Container)
- StepSection
- BookingForm

### woocommerce (Product Blocks)
- ProductList
- ProductGrid

## Common Configuration Patterns

### Tabs Structure
Most input blocks follow this tab structure:
- **General**: Basic configuration (label, icon, main options)
- **Advanced**: Advanced settings (placeholder, required, validation)
- **User**: User profile integration (save to user meta)
- **Calculation Quote**: Price calculation settings

### Common Options

#### In Most Blocks:
- `thumbnail_id` - SVG icon for the field
- `label` - Field label
- `placeholder` - Placeholder text
- `required` - Make field required
- `field_id` - Unique field identifier (auto-generated)

#### User Integration:
Many blocks support saving data to WordPress user meta fields:
- User profile fields (first name, last name, etc.)
- WooCommerce billing/shipping addresses
- Custom meta fields

#### Price Calculation:
Blocks that support pricing:
- Fixed price configuration
- Dynamic pricing based on field values
- Percentage-based pricing
- Table/tier-based pricing
- Multi-currency support

## Field Validation

### Built-in Validation Types:
- `required` - Field must have a value
- `email` - Valid email format
- `phone` - Valid international phone format
- `number` - Numeric value
- `date` - Valid date
- `location` - Valid location data (lat/lng or address)
- `min/max` - Value range validation

## External Dependencies

### Required for Specific Blocks:
- **TimePicker**: Flatpickr (loaded from CDN)
- **GoogleMap**: Google Maps JavaScript API (requires API key)

## Quick Reference

### Most Used Blocks
1. **TextInput** - General text fields (name, address, etc.)
2. **EmailInput** - Email collection with account creation
3. **NumberInput** - Quantities, counts, numeric values
4. **DataPicker** - Date selection with busy day pricing
5. **GoogleMap** - Location selection with distance pricing
6. **ProductGrid** - Product selection with flexible display

### Blocks with Price Calculation
- DataPicker (busy day calculation)
- TimePicker (busy time calculation)
- GoogleMap (distance-based pricing)
- ProductList/ProductGrid (multiple pricing types)

### Blocks with User Integration
- EmailInput (create user account)
- TextInput (user profile fields)
- PhoneInput (billing/shipping phone)
- GoogleMap (billing/shipping address)

## Notes
- All blocks extend `AbstractBlock` base class
- Product blocks extend `AbstractProductBlock`
- Field blocks use `field_id` for unique identification
- Most blocks support conditional display logic
- Multi-currency support available in product blocks

