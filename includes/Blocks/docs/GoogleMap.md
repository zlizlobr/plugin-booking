# Google Map Block

Block Name: `booking/google-map`  
Block Icon: `location`

## Description
Display a Google Maps input field with location selection

## Configuration Options

### Tab: General

#### label
- **Type:** text
- **Label:** Label
- **Default:** title

#### thumbnail_id
- **Type:** attachment
- **Label:** SVG Icon
- **Attachment Type:** image
- **MIME Types:** svg

#### required
- **Type:** toggle
- **Label:** Required
- **Default:** false

#### Basic Settings (Sub-tab)

##### mapTypeId
- **Type:** select
- **Label:** Map Type
- **Default:** roadmap
- **Options:**
  - `roadmap` - Roadmap
  - `satellite` - Satellite
  - `hybrid` - Hybrid
  - `terrain` - Terrain

##### showStoreAddress
- **Type:** toggle
- **Label:** Show Store Address
- **Default:** false

##### center_lat
- **Type:** text
- **Label:** Center Latitude
- **Default:** 50.0755

##### center_lng
- **Type:** text
- **Label:** Center Longitude
- **Default:** 14.4378

##### zoom
- **Type:** number
- **Label:** Zoom Level
- **Default:** 16
- **Min:** 1
- **Max:** 21

##### min_zoom
- **Type:** number
- **Label:** Min Zoom
- **Default:** 1
- **Min:** 1
- **Max:** 21

##### max_zoom
- **Type:** number
- **Label:** Max Zoom
- **Default:** 21
- **Min:** 1
- **Max:** 21

##### height
- **Type:** number
- **Label:** Map Height (px)
- **Default:** 400
- **Min:** 200
- **Max:** 800

#### Controls (Sub-tab)

##### mapTypeControl
- **Type:** toggle
- **Label:** Map Type Control
- **Default:** true

##### streetViewControl
- **Type:** toggle
- **Label:** Street View Control
- **Default:** true

##### fullscreenControl
- **Type:** toggle
- **Label:** Fullscreen Control
- **Default:** true

##### zoomControl
- **Type:** toggle
- **Label:** Zoom Control
- **Default:** true

##### scaleControl
- **Type:** toggle
- **Label:** Scale Control
- **Default:** false

##### rotateControl
- **Type:** toggle
- **Label:** Rotate Control
- **Default:** false

##### panControl
- **Type:** toggle
- **Label:** Pan Control
- **Default:** false

#### Behavior (Sub-tab)

##### draggable
- **Type:** toggle
- **Label:** Draggable
- **Default:** true

##### scrollwheel
- **Type:** toggle
- **Label:** Scroll Wheel Zoom
- **Default:** true

##### disableDoubleClickZoom
- **Type:** toggle
- **Label:** Disable Double Click Zoom
- **Default:** false

##### gestureHandling
- **Type:** select
- **Label:** Gesture Handling
- **Default:** auto
- **Options:**
  - `auto` - Auto
  - `cooperative` - Cooperative
  - `greedy` - Greedy
  - `none` - None

##### keyboardShortcuts
- **Type:** toggle
- **Label:** Keyboard Shortcuts
- **Default:** true

#### UI & Optimization (Sub-tab)

##### disableDefaultUI
- **Type:** toggle
- **Label:** Disable Default UI
- **Default:** false

##### clickableIcons
- **Type:** toggle
- **Label:** Clickable Icons
- **Default:** true

##### optimized
- **Type:** toggle
- **Label:** Optimized
- **Default:** true

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

#### distance_calculation (Multi Group)
- **Type:** multi_group
- **Label:** Distance calculation
- **Conditions:** Visible when apply_calculation is true

##### range
- **Type:** number
- **Label:** Range (km)

##### price_increase
- **Type:** number
- **Label:** Price Increase (%)

### Tab: User

#### save_to_user
- **Type:** toggle
- **Label:** Save to User Profile
- **Description:** Save address to user profile
- **Default:** false

#### address_type
- **Type:** select
- **Label:** Address Type
- **Default:** billing
- **Options:**
  - `billing` - Billing Address
  - `shipping` - Shipping Address
  - `both` - Both (Billing & Shipping)
  - `event_location` - Event Location
  - `custom` - Custom Meta Field
- **Conditions:** Visible when save_to_user is true

#### custom_meta_key
- **Type:** text
- **Label:** Custom Meta Key Prefix
- **Placeholder:** event
- **Description:** Will save as: prefix_address, prefix_city, prefix_lat, etc.
- **Conditions:** Visible when address_type is 'custom'

## External Dependencies
- Google Maps JavaScript API (with Places and Geometry libraries)
- Requires Google Maps API key

## Validation
- Location format validation (JSON with lat/lng or address)
- Latitude range: -90 to 90
- Longitude range: -180 to 180
- Required field validation (if enabled)

## Validation Rules
- `required`: From general.required or advanced.required
- `location`: true

## Distance Calculation
When `apply_calculation` is enabled:
1. Calculates distance between selected location and store location
2. Uses Google Distance Matrix API if available, fallback to Haversine formula
3. Applies price increase based on distance ranges configured in distance_calculation

## Data Saved
- Field value: Location data (JSON with lat, lng, address, etc.)
- `_country_short`: Country code (lowercase)
- Address mapping based on address_type:
  - `billing`: `_billing_address_1`, `_billing_city`, `_billing_state`, `_billing_postcode`, `_billing_country`
  - `shipping`: `_shipping_address_1`, `_shipping_city`, `_shipping_state`, `_shipping_postcode`, `_shipping_country`
  - `both`: Both billing and shipping fields
  - `event_location`: `_event_address`, `_event_city`, `_event_state`, `_event_postcode`, `_event_country`, `_event_lat`, `_event_lng`
  - `custom`: `_[prefix]_address`, `_[prefix]_city`, etc.

