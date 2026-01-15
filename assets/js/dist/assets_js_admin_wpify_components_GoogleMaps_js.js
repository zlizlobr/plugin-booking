"use strict";
(self["webpackChunkBooking"] = self["webpackChunkBooking"] || []).push([["assets_js_admin_wpify_components_GoogleMaps_js"],{

/***/ "./assets/js/admin/wpify/components/GoogleMaps.js":
/*!********************************************************!*\
  !*** ./assets/js/admin/wpify/components/GoogleMaps.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/markerIcon.js */ "./assets/js/utils/markerIcon.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * GoogleMaps Component
 * 
 * Google Maps field component for wpify-custom-fields with location selection.
 * Uses Google Maps API for map display and Places Autocomplete for address search.
 * Wpify does NOT support React hooks - this component must be a pure function.
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Field identifier
 * @param {string} props.htmlId - HTML element ID
 * @param {string|Object} props.value - Current field value (JSON string or object)
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.label - Field label
 * @param {string} props.className - CSS class names
 * @returns {JSX.Element} Google Maps field component
 */

var GoogleMaps = function GoogleMaps(props) {
  var htmlId = props.htmlId,
    value = props.value,
    onChange = props.onChange,
    label = props.label,
    _props$className = props.className,
    className = _props$className === void 0 ? '' : _props$className;

  // Safety check for onChange function
  if (typeof onChange !== 'function') {
    return null;
  }

  // Generate unique IDs
  var uniqueId = htmlId || "google-maps-".concat(Date.now());
  var mapContainerId = "google-maps-container-".concat(uniqueId);
  var addressInputId = "google-maps-address-".concat(uniqueId);

  // Parse current value
  var parseValue = function parseValue() {
    if (!value) return {
      address: '',
      lat: null,
      lng: null,
      country_code: null
    };
    if (typeof value === 'string') {
      try {
        var parsed = JSON.parse(value);
        return {
          address: parsed.address || '',
          lat: parsed.lat || null,
          lng: parsed.lng || null,
          country_code: parsed.country_code || null
        };
      } catch (e) {
        return {
          address: '',
          lat: null,
          lng: null,
          country_code: null
        };
      }
    }
    return {
      address: value.address || '',
      lat: value.lat || null,
      lng: value.lng || null,
      country_code: value.country_code || null
    };
  };
  var currentValue = parseValue();

  // Handle address input change
  var handleAddressChange = function handleAddressChange(event) {
    var newAddress = event.target.value;
    var updatedValue = _objectSpread(_objectSpread({}, currentValue), {}, {
      address: newAddress
    });
    onChange(JSON.stringify(updatedValue));
  };

  // Handle map click or place selection
  var handleLocationChange = function handleLocationChange(address, lat, lng) {
    var countryCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var updatedValue = {
      address: address || currentValue.address,
      lat: lat,
      lng: lng,
      country_code: countryCode || currentValue.country_code
    };
    onChange(JSON.stringify(updatedValue));
  };

  // Initialize Google Maps when component is rendered
  var initializeMap = function initializeMap() {
    var mapContainer = document.getElementById(mapContainerId);
    var addressInput = document.getElementById(addressInputId);
    if (!mapContainer || !addressInput) {
      return;
    }

    // Check if map is already initialized
    if (mapContainer._googleMap) {
      // Update existing map if value changed
      if (currentValue.lat && currentValue.lng) {
        var newPosition = {
          lat: currentValue.lat,
          lng: currentValue.lng
        };
        mapContainer._googleMap.setCenter(newPosition);
        if (mapContainer._googleMarker) {
          mapContainer._googleMarker.setPosition(newPosition);
        } else {
          var markerIcon = (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_1__.createMarkerIcon)(label || '');
          mapContainer._googleMarker = new window.google.maps.Marker({
            position: newPosition,
            map: mapContainer._googleMap,
            draggable: true,
            icon: markerIcon
          });
        }
      }
      return;
    }

    // Check if Google Maps API is loaded
    if (typeof window.google === 'undefined' || !window.google.maps) {
      console.warn('Google Maps API is not loaded');
      return;
    }

    // Initialize map
    var mapOptions = {
      center: currentValue.lat && currentValue.lng ? {
        lat: currentValue.lat,
        lng: currentValue.lng
      } : {
        lat: 50.0755,
        lng: 14.4378
      },
      // Default: Prague
      zoom: currentValue.lat && currentValue.lng ? 15 : 10,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    };
    var map = new window.google.maps.Map(mapContainer, mapOptions);

    // Add marker if location is set
    var marker = null;
    if (currentValue.lat && currentValue.lng) {
      var _markerIcon = (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_1__.createMarkerIcon)(label || 'Location');
      marker = new window.google.maps.Marker({
        position: {
          lat: currentValue.lat,
          lng: currentValue.lng
        },
        map: map,
        draggable: true,
        icon: _markerIcon
      });

      // Update position when marker is dragged
      marker.addListener('dragend', function (event) {
        var newLat = event.latLng.lat();
        var newLng = event.latLng.lng();

        // Reverse geocode to get address
        var geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({
          location: {
            lat: newLat,
            lng: newLng
          }
        }, function (results, status) {
          if (status === 'OK' && results[0]) {
            var _results$0$address_co;
            var address = results[0].formatted_address;
            var countryCode = ((_results$0$address_co = results[0].address_components.find(function (component) {
              return component.types.includes('country');
            })) === null || _results$0$address_co === void 0 ? void 0 : _results$0$address_co.short_name) || null;
            handleLocationChange(address, newLat, newLng, countryCode);
            addressInput.value = address;
          } else {
            handleLocationChange(currentValue.address, newLat, newLng, currentValue.country_code);
          }
        });
      });
    }

    // Initialize Places Autocomplete
    var autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
      types: ['geocode']
    });

    // Handle place selection
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        console.warn('No geometry found for selected place');
        return;
      }
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      var address = place.formatted_address || place.name;

      // Get country code
      var countryComponent = place.address_components.find(function (component) {
        return component.types.includes('country');
      });
      var countryCode = countryComponent ? countryComponent.short_name : null;

      // Update map center and marker
      map.setCenter({
        lat: lat,
        lng: lng
      });
      map.setZoom(15);
      if (marker) {
        marker.setPosition({
          lat: lat,
          lng: lng
        });
      } else {
        var _markerIcon2 = (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_1__.createMarkerIcon)(label || 'Location');
        marker = new window.google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          },
          map: map,
          draggable: true,
          icon: _markerIcon2
        });

        // Add drag listener for new marker
        marker.addListener('dragend', function (event) {
          var newLat = event.latLng.lat();
          var newLng = event.latLng.lng();
          var geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({
            location: {
              lat: newLat,
              lng: newLng
            }
          }, function (results, status) {
            if (status === 'OK' && results[0]) {
              var _results$0$address_co2;
              var _address = results[0].formatted_address;
              var _countryCode = ((_results$0$address_co2 = results[0].address_components.find(function (component) {
                return component.types.includes('country');
              })) === null || _results$0$address_co2 === void 0 ? void 0 : _results$0$address_co2.short_name) || null;
              handleLocationChange(_address, newLat, newLng, _countryCode);
              addressInput.value = _address;
            } else {
              handleLocationChange(currentValue.address, newLat, newLng, currentValue.country_code);
            }
          });
        });
      }

      // Update value
      handleLocationChange(address, lat, lng, countryCode);
    });

    // Handle map click
    map.addListener('click', function (event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      // Reverse geocode to get address
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({
        location: {
          lat: lat,
          lng: lng
        }
      }, function (results, status) {
        if (status === 'OK' && results[0]) {
          var _results$0$address_co3;
          var address = results[0].formatted_address;
          var countryCode = ((_results$0$address_co3 = results[0].address_components.find(function (component) {
            return component.types.includes('country');
          })) === null || _results$0$address_co3 === void 0 ? void 0 : _results$0$address_co3.short_name) || null;
          handleLocationChange(address, lat, lng, countryCode);
          addressInput.value = address;
        } else {
          handleLocationChange('', lat, lng, null);
        }
      });

      // Update or create marker
      if (marker) {
        marker.setPosition({
          lat: lat,
          lng: lng
        });
      } else {
        var _markerIcon3 = (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_1__.createMarkerIcon)(label || 'Location');
        marker = new window.google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          },
          map: map,
          draggable: true,
          icon: _markerIcon3
        });

        // Add drag listener for new marker
        marker.addListener('dragend', function (event) {
          var newLat = event.latLng.lat();
          var newLng = event.latLng.lng();
          var geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({
            location: {
              lat: newLat,
              lng: newLng
            }
          }, function (results, status) {
            if (status === 'OK' && results[0]) {
              var _results$0$address_co4;
              var address = results[0].formatted_address;
              var countryCode = ((_results$0$address_co4 = results[0].address_components.find(function (component) {
                return component.types.includes('country');
              })) === null || _results$0$address_co4 === void 0 ? void 0 : _results$0$address_co4.short_name) || null;
              handleLocationChange(address, newLat, newLng, countryCode);
              addressInput.value = address;
            } else {
              handleLocationChange(currentValue.address, newLat, newLng, currentValue.country_code);
            }
          });
        });
      }
    });

    // Store map and marker references for cleanup
    mapContainer._googleMap = map;
    mapContainer._googleMarker = marker;
    mapContainer._googleAutocomplete = autocomplete;
  };

  // Initialize map after render (wpify doesn't support hooks)
  // Use setTimeout to ensure DOM is ready
  if (typeof window.google !== 'undefined' && window.google.maps) {
    setTimeout(function () {
      initializeMap();
    }, 100);
  } else {
    // Wait for Google Maps API to load
    var checkGoogleMaps = setInterval(function () {
      if (typeof window.google !== 'undefined' && window.google.maps) {
        clearInterval(checkGoogleMaps);
        setTimeout(function () {
          initializeMap();
        }, 100);
      }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(function () {
      clearInterval(checkGoogleMaps);
    }, 10000);
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "wpifycf-field-google_maps ".concat(className),
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("label", {
      htmlFor: addressInputId,
      style: {
        display: 'block',
        marginBottom: '8px'
      },
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      style: {
        marginBottom: '12px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
        type: "text",
        id: addressInputId,
        value: currentValue.address || '',
        onChange: handleAddressChange,
        placeholder: "Search for an address...",
        style: {
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px'
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      id: mapContainerId,
      style: {
        width: '100%',
        height: '400px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '8px'
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
      type: "hidden",
      id: htmlId,
      value: typeof value === 'string' ? value : JSON.stringify(value || {})
    })]
  });
};

/**
 * Validation method for GoogleMaps field
 * Validates that the value is a valid JSON object with location data
 * 
 * @param {HTMLElement} element - The field element
 * @returns {boolean} True if valid, false otherwise
 */
GoogleMaps.checkValidity = function (element) {
  // Safety check - element may be undefined
  if (!element || typeof element.querySelector !== 'function') {
    return true;
  }
  var hiddenInput = element.querySelector('input[type="hidden"]');
  if (!hiddenInput || !hiddenInput.value) {
    return true; // Empty field is valid
  }
  try {
    var parsed = JSON.parse(hiddenInput.value);
    // Valid if it's an object (can be empty or have location data)
    return _typeof(parsed) === 'object' && parsed !== null && !Array.isArray(parsed);
  } catch (e) {
    return false;
  }
};

// Register the google_maps field type using WordPress global hooks
var _registerGoogleMaps = function registerGoogleMaps() {
  if (typeof window.wp === 'undefined' || !window.wp.hooks || !window.wp.hooks.addFilter) {
    setTimeout(_registerGoogleMaps, 100);
    return;
  }
  try {
    window.wp.hooks.addFilter('wpifycf_field_google_maps', 'wpify_custom_fields', function () {
      return GoogleMaps;
    });
  } catch (error) {
    // Silent error handling
  }
};

// Try to register immediately, or wait for DOM/wpHooks to be ready
if (typeof window.wp !== 'undefined' && window.wp.hooks && window.wp.hooks.addFilter) {
  _registerGoogleMaps();
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _registerGoogleMaps);
} else {
  // If DOM is already loaded but wp.hooks isn't ready, try with a short delay
  setTimeout(_registerGoogleMaps, 0);
}

// Export default for backward compatibility
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleMaps);

/***/ })

}]);
//# sourceMappingURL=assets_js_admin_wpify_components_GoogleMaps_js.js.map