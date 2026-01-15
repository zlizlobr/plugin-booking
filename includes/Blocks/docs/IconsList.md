# Icons List Block

Block Name: `booking/icons-list`  
Block Icon: `ellipsis`

## Description
Display a list of icons for selection

## Configuration Options

### Tab: Icons

#### icons (Multi Group)
- **Type:** multi_group
- **Label:** Icons
- **Min:** 0

##### label
- **Type:** textarea
- **Label:** Label
- **Rows:** 4

##### icon
- **Type:** attachment
- **Label:** SVG Ikona
- **Attachment Type:** image
- **MIME Types:** svg

##### thumbnail_id_mail
- **Type:** attachment
- **Label:** Email Ikona
- **Attachment Type:** image
- **MIME Types:** png

#### number_allowed
- **Type:** number
- **Label:** Number of Choices Allowed
- **Default:** 1

#### label
- **Type:** text
- **Label:** Label

## Validation Rules
- `required`: true (always)

## Data Processing
Each icon is processed with:
- **label**: Icon label (stripped of HTML tags)
- **slug**: Sanitized title from label
- **icon**: Attachment ID
- **icon_url**: Full URL to the icon image
- **is_active**: Boolean indicating if the icon is currently selected

