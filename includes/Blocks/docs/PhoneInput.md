# Phone Input Block

Block Name: `booking/phone-input`  
Block Icon: `phone`

## Description
Display a phone input field with international formatting

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

#### acfe_phone_number_options (Group)

##### countries
- **Type:** multi_select
- **Label:** Allow Countries
- **Description:** Allow only the defined countries
- **Options:** Full list of country codes (AF, AL, DZ, etc.)

##### preferred_countries
- **Type:** multi_select
- **Label:** Preferred Countries
- **Description:** Define the countries to appear at the top of the list
- **Options:** Full list of country codes

##### default_country
- **Type:** select
- **Label:** Default Country
- **Description:** Set the initial country selection
- **Options:** Full list of country codes

##### native_names
- **Type:** toggle
- **Label:** Native Names
- **Description:** Show native country names

##### national_mode
- **Type:** toggle
- **Label:** National Mode
- **Description:** Show native country names

##### allow_dropdown
- **Type:** toggle
- **Label:** Allow Dropdown
- **Description:** Whether or not to allow the dropdown

##### separate_dial_code
- **Type:** toggle
- **Label:** Separate Dial Code
- **Description:** Display the country dial code next to the selected flag

### Tab: Advanced

#### placeholder
- **Type:** text
- **Label:** Placeholder Text

#### required
- **Type:** toggle
- **Label:** Required

### Tab: User

#### save_to_user
- **Type:** toggle
- **Label:** Save to User Profile
- **Description:** Save phone number to user profile
- **Default:** false

#### phone_type
- **Type:** select
- **Label:** Phone Type
- **Default:** billing
- **Options:**
  - `billing` - Billing Phone
  - `shipping` - Shipping Phone
  - `both` - Both (Billing & Shipping)
  - `custom` - Custom Meta Field
- **Conditions:** Visible when save_to_user is true

#### custom_meta_key
- **Type:** text
- **Label:** Custom Meta Key
- **Placeholder:** phone_mobile
- **Description:** Enter custom meta key for phone storage
- **Conditions:** Visible when phone_type is 'custom'

## Validation
- Phone number format validation (international format: +[1-4 digits][7-15 digits])
- Required field validation (if enabled)

## Validation Rules
- `required`: From advanced.required
- `phone`: true

## Data Saved
- Field value: Phone number
- Based on phone_type:
  - `billing`: Saved to `_billing_phone`
  - `shipping`: Saved to `_shipping_phone`
  - `both`: Saved to both `_billing_phone` and `_shipping_phone`
  - `custom`: Saved to `_[custom_meta_key]`

