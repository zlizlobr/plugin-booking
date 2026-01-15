# Time Picker Block

Block Name: `booking/time-picker`  
Block Icon: `clock`

## Description
Display a time picker input field with time restrictions

## Configuration Options

### Tab: General

#### thumbnail_id
- **Type:** attachment
- **Label:** SVG Icon
- **Attachment Type:** image
- **MIME Types:** svg

#### label
- **Type:** text
- **Label:** Label
- **Default:** title

#### time_picker_options (Group)

##### display_format
- **Type:** radio
- **Label:** Display Format
- **Description:** The format displayed when editing a post
- **Options:**
  - `g:i a` - 7:41 am
  - `H:i:s` - 07:41:22
  - `other` - Custom
- **Default:** g:i a

##### set_custom_format
- **Type:** text
- **Label:** Set custom Time format
- **Default:** g:i a
- **Conditions:** Visible when display_format is 'other'

##### min_time
- **Type:** text
- **Label:** Min Time
- **Placeholder:** 12:00

##### max_time
- **Type:** text
- **Label:** Max Time
- **Placeholder:** 23:59

##### minute_increment
- **Type:** select
- **Label:** Minute Increment
- **Description:** Select the step for minute selection
- **Options:**
  - `1` - 1 minute
  - `5` - 5 minutes
  - `15` - 15 minutes
- **Default:** 1

### Tab: Advanced

#### placeholder
- **Type:** text
- **Label:** Placeholder Text

#### required
- **Type:** toggle
- **Label:** Required

### Tab: Calculation Quote

#### apply_calculation
- **Type:** toggle
- **Label:** Apply price calculation

#### busy_day_calculation (Multi Group)
- **Type:** multi_group
- **Label:** Busy day calculation
- **Conditions:** Visible when apply_calculation is true

##### quotes_in_day
- **Type:** number
- **Label:** Events in day

##### price_increase
- **Type:** number
- **Label:** Price Increase (%)

## External Dependencies
- Flatpickr CSS (loaded from CDN): https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css
- Flatpickr JS (loaded from CDN): https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.js

## Format Conversion
The block automatically converts PHP time formats to Flatpickr formats:
- `g:i a` → `g:i K` (12-hour with AM/PM)
- `H:i:s` → `H:i:S` (24-hour with seconds)
- `H:i` → `H:i` (24-hour without seconds)

