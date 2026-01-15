# Number Input Block

Block Name: `booking/number-input`  
Block Icon: `calculator`

## Description
Display a number input field with validation and options

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

#### default
- **Type:** number
- **Label:** Default number
- **Min:** 0

#### number_options (Group)

##### min
- **Type:** number
- **Label:** Minimum Value
- **Min:** 0

##### max
- **Type:** number
- **Label:** Maximum Value
- **Min:** 0

##### singular
- **Type:** text
- **Label:** Singular
- **Description:** Singular form label

##### plural
- **Type:** text
- **Label:** Plural
- **Description:** Plural form label

#### add_after
- **Type:** number
- **Label:** Add after
- **Description:** Increment step for quantity
- **Default:** 1
- **Min:** 0

### Tab: Advanced

#### placeholder
- **Type:** text
- **Label:** Placeholder Text

#### required
- **Type:** toggle
- **Label:** Required

## Validation
- Number format validation
- Min/max value validation (if configured)
- Required field validation (if enabled)

## Validation Rules
- `number`: true
- `min`: From number_options.min (default: 1)
- `max`: From number_options.max (if set)
- `required`: From advanced.required

