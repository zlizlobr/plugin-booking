# Email Input Block

Block Name: `booking/email-input`  
Block Icon: `email-alt`

## Description
Display an email input field with validation

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
- **Default:** (empty)

#### required
- **Type:** toggle
- **Label:** Required
- **Default:** false

### Tab: User

#### create_account
- **Type:** toggle
- **Label:** Create Account
- **Description:** Automatically create WordPress user account with this email
- **Default:** false

#### user_role
- **Type:** select
- **Label:** User Role
- **Default:** subscriber
- **Options:**
  - `subscriber` - Subscriber
  - `customer` - Customer
- **Conditions:** Visible when `create_account` is true

## Validation
- Email format validation
- Required field validation (if enabled)

## Data Saved
- Field value: Email address
- `_user_email`: Email address
- `_user_id`: User ID (if account created)
- `_creator_user_id`: Creator user ID (if account created)

