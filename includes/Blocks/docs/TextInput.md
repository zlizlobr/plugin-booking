# Text Input Block

Block Name: `booking/text-input`  
Block Icon: `text`

## Description
Display a text input field with validation

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

### Tab: Advanced

#### placeholder
- **Type:** text
- **Label:** Placeholder Text

#### required
- **Type:** toggle
- **Label:** Required

### Tab: User

#### user_field
- **Type:** select
- **Label:** User Field Mapping
- **Description:** Map this field to a WordPress user field
- **Default:** (empty)
- **Options:**
  - ` ` - Select Field
  - `first_name` - First Name
  - `last_name` - Last Name
  - `first_last_name` - First & Last Name (combined)
  - `user_login` - Username
  - `display_name` - Display Name
  - `nickname` - Nickname
  - `user_url` - Website
  - `description` - Biographical Info
  - `billing_company` - Billing Company
  - `billing_address_1` - Billing Address 1
  - `billing_address_2` - Billing Address 2
  - `billing_city` - Billing City
  - `billing_state` - Billing State
  - `billing_postcode` - Billing Postcode
  - `billing_country` - Billing Country
  - `shipping_company` - Shipping Company
  - `shipping_address_1` - Shipping Address 1
  - `shipping_address_2` - Shipping Address 2
  - `shipping_city` - Shipping City
  - `shipping_state` - Shipping State
  - `shipping_postcode` - Shipping Postcode
  - `shipping_country` - Shipping Country

## Data Saved
- Field value: Text input
- User field mapping (if configured)
- For `first_last_name`: splits into `_user_first_name` and `_user_last_name`

