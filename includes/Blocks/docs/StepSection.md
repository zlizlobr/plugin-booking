# Step Section Block

Block Name: `booking/step-section`  
Block Icon: `welcome-widgets-menus`

## Description
Display a step section with icon, title, and description

## Configuration Options

### Tab: Form Fields (options)

#### inner_blocks
- **Type:** inner_blocks
- **Description:** Add fields to the step
- **Allowed Blocks:** All booking blocks except `booking/step-section`
- **Template:** []
- **Template Lock:** false

#### thumbnail_id
- **Type:** attachment
- **Label:** Icon
- **Attachment Type:** image
- **Position:** inspector

#### thumbnail_id_mail
- **Type:** attachment
- **Label:** Icon Mail
- **Attachment Type:** image
- **MIME Types:** jpeg, jpg, png, gif
- **Position:** inspector

#### title
- **Type:** text
- **Label:** Title
- **Position:** inspector

#### excerpt
- **Type:** wysiwyg
- **Label:** Description
- **Position:** inspector

#### show_background
- **Type:** toggle
- **Label:** Show Background
- **Position:** inspector

#### label_summary
- **Type:** text
- **Label:** Label in summary
- **Placeholder:** List of choices from step
- **Position:** inspector

### Tab: Conditions

#### conditions (Multi Group)
- **Type:** multi_group
- **Label:** Conditions Step

##### condition_type
- **Type:** select
- **Label:** Filter Products
- **Options:**
  - `none` - Disable
  - `products` - Products in Cart
- **Default:** none
- **Required:** true

##### product_condition
- **Type:** select
- **Label:** Filter Products
- **Options:**
  - `included_products` - Included Products
  - `excluded_products` - Excluded Products
- **Default:** products
- **Required:** true
- **Conditions:** Visible when condition_type is 'products'

##### ids
- **Type:** multi_post
- **Label:** Select Products
- **Post Type:** product
- **Conditions:** Visible when condition_type is 'products'

##### operator
- **Type:** select
- **Label:** Logical Operator
- **Options:**
  - `AND` - AND
  - `OR` - OR
- **Default:** OR
- **Required:** true
- **Conditions:** Visible when condition_type is not 'none'

## Special Features
- Container block that can hold other booking blocks
- Can be conditionally displayed based on products in cart
- Supports custom icons for frontend and email
- Shows step information in booking summary

## Notes
- Cannot be nested (not allowed inside itself)
- Used to organize booking forms into logical steps
- Each step can have its own icon, title, and description

