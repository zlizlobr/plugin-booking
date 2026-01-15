# Date Picker Block

Block Name: `booking/date-picker`  
Block Icon: `calendar-alt`

## Description
Display a date picker input field with calendar options

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

#### date_picker_options (Group)

##### mode
- **Type:** select
- **Label:** Mode
- **Description:** Choose the operational mode
- **Options:**
  - `default` - Default
  - `custom-select` - Custom Select (months, years, time)
- **Default:** default

##### dateMax
- **Type:** text
- **Label:** Maximum Date
- **Description:** Set maximum selectable date (format: YYYY-MM-DD)
- **Default:** 2050-12-31

##### dateFormat
- **Type:** select
- **Label:** Date Format
- **Description:** Choose the date display format
- **Options:**
  - `DD/MM/YYYY` - 25/11/2024
  - `MM/DD/YYYY` - 11/25/2024
  - `YYYY-MM-DD` - 2024-11-25
  - `MMMM DD, YYYY` - November 25, 2024
  - `other` - Custom
- **Default:** DD/MM/YYYY

##### custom_date_format
- **Type:** text
- **Label:** Custom Date Format
- **Description:** Enter custom date format (e.g., d/m/Y)
- **Default:** d/m/Y
- **Conditions:** Visible when dateFormat is 'other'

##### dateLocale
- **Type:** select
- **Label:** Locale
- **Description:** Choose the language/locale
- **Options:**
  - `en` - English
  - `cs` - Czech
  - `de` - German
  - `fr` - French
  - `es` - Spanish
  - `da` - Danish
  - `other` - Custom
- **Default:** en

##### custom_locale
- **Type:** text
- **Label:** Custom Locale
- **Description:** Enter custom locale code (e.g., cs)
- **Default:** cs
- **Conditions:** Visible when dateLocale is 'other'

##### replaceTodayWithText
- **Type:** text
- **Label:** Replace "Today" Text
- **Description:** Custom text to replace "Today" (e.g., Dnes)
- **Default:** Dnes

##### custom_arrows
- **Type:** toggle
- **Label:** Custom Navigation Arrows
- **Description:** Enable custom navigation arrows
- **Default:** false

##### arrow_prev_text
- **Type:** text
- **Label:** Previous Arrow Text
- **Description:** Enter custom text for previous month arrow (e.g., ←)
- **Default:** ←
- **Conditions:** Visible when custom_arrows is true

##### arrow_next_text
- **Type:** text
- **Label:** Next Arrow Text
- **Description:** Enter custom text for next month arrow (e.g., →)
- **Default:** →
- **Conditions:** Visible when custom_arrows is true

##### allow_past_dates
- **Type:** toggle
- **Label:** Allow Past Dates
- **Description:** Enable to allow selection of dates in the past

### Tab: Advanced

#### placeholder
- **Type:** text
- **Label:** Placeholder Text
- **Default:** (empty)

#### required
- **Type:** toggle
- **Label:** Required
- **Default:** false

#### edit_in_qoute
- **Type:** toggle
- **Label:** Edit in Quote
- **Default:** false

### Tab: Calculation Quote

#### apply_calculation
- **Type:** toggle
- **Label:** Apply price calculation
- **Default:** false

#### busy_day_calculation (Multi Group)
- **Type:** multi_group
- **Label:** Busy day calculation
- **Conditions:** Visible when apply_calculation is true

##### quotes_in_day
- **Type:** number
- **Label:** Events in day
- **Default:** 0
- **Min:** 0

##### price_increase
- **Type:** number
- **Label:** Price Increase (%)
- **Default:** 0
- **Min:** 0

## Validation Rules
- `required`: From advanced.required
- `date`: true

## Price Calculation
The block can calculate price increases based on the number of existing bookings on a selected date. The system counts quotes with the same date and applies the appropriate price increase percentage based on the busy_day_calculation table.

