import React from 'react';
import { createMarkerIcon } from '../../../utils/markerIcon.js';

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
const GoogleMaps = (props) => {
    const { htmlId, value, onChange, label, className = '' } = props;
    
    // Safety check for onChange function
    if (typeof onChange !== 'function') {
        return null;
    }

    // Generate unique IDs
    const uniqueId = htmlId || `google-maps-${Date.now()}`;
    const mapContainerId = `google-maps-container-${uniqueId}`;
    const addressInputId = `google-maps-address-${uniqueId}`;

    // Parse current value
    const parseValue = () => {
        if (!value) return { address: '', lat: null, lng: null, country_code: null };
        if (typeof value === 'string') {
            try {
                const parsed = JSON.parse(value);
                return {
                    address: parsed.address || '',
                    lat: parsed.lat || null,
                    lng: parsed.lng || null,
                    country_code: parsed.country_code || null
                };
            } catch (e) {
                return { address: '', lat: null, lng: null, country_code: null };
            }
        }
        return {
            address: value.address || '',
            lat: value.lat || null,
            lng: value.lng || null,
            country_code: value.country_code || null
        };
    };

    const currentValue = parseValue();

    // Handle address input change
    const handleAddressChange = (event) => {
        const newAddress = event.target.value;
        const updatedValue = {
            ...currentValue,
            address: newAddress
        };
        onChange(JSON.stringify(updatedValue));
    };

    // Handle map click or place selection
    const handleLocationChange = (address, lat, lng, countryCode = null) => {
        const updatedValue = {
            address: address || currentValue.address,
            lat: lat,
            lng: lng,
            country_code: countryCode || currentValue.country_code
        };
        onChange(JSON.stringify(updatedValue));
    };

    // Initialize Google Maps when component is rendered
    const initializeMap = () => {
        const mapContainer = document.getElementById(mapContainerId);
        const addressInput = document.getElementById(addressInputId);
        
        if (!mapContainer || !addressInput) {
            return;
        }

        // Check if map is already initialized
        if (mapContainer._googleMap) {
            // Update existing map if value changed
            if (currentValue.lat && currentValue.lng) {
                const newPosition = { lat: currentValue.lat, lng: currentValue.lng };
                mapContainer._googleMap.setCenter(newPosition);
                if (mapContainer._googleMarker) {
                    mapContainer._googleMarker.setPosition(newPosition);
                } else {
                    const markerIcon = createMarkerIcon(label || '');
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
        const mapOptions = {
            center: currentValue.lat && currentValue.lng 
                ? { lat: currentValue.lat, lng: currentValue.lng }
                : { lat: 50.0755, lng: 14.4378 }, // Default: Prague
            zoom: currentValue.lat && currentValue.lng ? 15 : 10,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        };

        const map = new window.google.maps.Map(mapContainer, mapOptions);

        // Add marker if location is set
        let marker = null;
        if (currentValue.lat && currentValue.lng) {
            const markerIcon = createMarkerIcon(label || 'Location');
            marker = new window.google.maps.Marker({
                position: { lat: currentValue.lat, lng: currentValue.lng },
                map: map,
                draggable: true,
                icon: markerIcon
            });

            // Update position when marker is dragged
            marker.addListener('dragend', (event) => {
                const newLat = event.latLng.lat();
                const newLng = event.latLng.lng();
                
                // Reverse geocode to get address
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        const address = results[0].formatted_address;
                        const countryCode = results[0].address_components.find(
                            component => component.types.includes('country')
                        )?.short_name || null;
                        handleLocationChange(address, newLat, newLng, countryCode);
                        addressInput.value = address;
                    } else {
                        handleLocationChange(currentValue.address, newLat, newLng, currentValue.country_code);
                    }
                });
            });
        }

        // Initialize Places Autocomplete
        const autocomplete = new window.google.maps.places.Autocomplete(addressInput, {
            types: ['geocode']
        });

        // Handle place selection
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            
            if (!place.geometry) {
                console.warn('No geometry found for selected place');
                return;
            }

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const address = place.formatted_address || place.name;
            
            // Get country code
            const countryComponent = place.address_components.find(
                component => component.types.includes('country')
            );
            const countryCode = countryComponent ? countryComponent.short_name : null;

            // Update map center and marker
            map.setCenter({ lat, lng });
            map.setZoom(15);

            if (marker) {
                marker.setPosition({ lat, lng });
            } else {
                const markerIcon = createMarkerIcon(label || 'Location');
                marker = new window.google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    draggable: true,
                    icon: markerIcon
                });

                // Add drag listener for new marker
                marker.addListener('dragend', (event) => {
                    const newLat = event.latLng.lat();
                    const newLng = event.latLng.lng();
                    
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            const address = results[0].formatted_address;
                            const countryCode = results[0].address_components.find(
                                component => component.types.includes('country')
                            )?.short_name || null;
                            handleLocationChange(address, newLat, newLng, countryCode);
                            addressInput.value = address;
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
        map.addListener('click', (event) => {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            // Reverse geocode to get address
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const address = results[0].formatted_address;
                    const countryCode = results[0].address_components.find(
                        component => component.types.includes('country')
                    )?.short_name || null;
                    handleLocationChange(address, lat, lng, countryCode);
                    addressInput.value = address;
                } else {
                    handleLocationChange('', lat, lng, null);
                }
            });

            // Update or create marker
            if (marker) {
                marker.setPosition({ lat, lng });
            } else {
                const markerIcon = createMarkerIcon(label || 'Location');
                marker = new window.google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    draggable: true,
                    icon: markerIcon
                });

                // Add drag listener for new marker
                marker.addListener('dragend', (event) => {
                    const newLat = event.latLng.lat();
                    const newLng = event.latLng.lng();
                    
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            const address = results[0].formatted_address;
                            const countryCode = results[0].address_components.find(
                                component => component.types.includes('country')
                            )?.short_name || null;
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
        setTimeout(() => {
            initializeMap();
        }, 100);
    } else {
        // Wait for Google Maps API to load
        const checkGoogleMaps = setInterval(() => {
            if (typeof window.google !== 'undefined' && window.google.maps) {
                clearInterval(checkGoogleMaps);
                setTimeout(() => {
                    initializeMap();
                }, 100);
            }
        }, 100);
        
        // Stop checking after 10 seconds
        setTimeout(() => {
            clearInterval(checkGoogleMaps);
        }, 10000);
    }

    return (
        <div className={`wpifycf-field-google_maps ${className}`}>
            {label && <label htmlFor={addressInputId} style={{ display: 'block', marginBottom: '8px' }}>{label}</label>}
            
            <div style={{ marginBottom: '12px' }}>
                <input
                    type="text"
                    id={addressInputId}
                    value={currentValue.address || ''}
                    onChange={handleAddressChange}
                    placeholder="Search for an address..."
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}
                />
            </div>

            <div
                id={mapContainerId}
                style={{
                    width: '100%',
                    height: '400px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '8px'
                }}
            />

            {/* Hidden input for value */}
            <input
                type="hidden"
                id={htmlId}
                value={typeof value === 'string' ? value : JSON.stringify(value || {})}
            />
        </div>
    );
};

/**
 * Validation method for GoogleMaps field
 * Validates that the value is a valid JSON object with location data
 * 
 * @param {HTMLElement} element - The field element
 * @returns {boolean} True if valid, false otherwise
 */
GoogleMaps.checkValidity = (element) => {
    // Safety check - element may be undefined
    if (!element || typeof element.querySelector !== 'function') {
        return true;
    }

    const hiddenInput = element.querySelector('input[type="hidden"]');
    if (!hiddenInput || !hiddenInput.value) {
        return true; // Empty field is valid
    }

    try {
        const parsed = JSON.parse(hiddenInput.value);
        // Valid if it's an object (can be empty or have location data)
        return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed);
    } catch (e) {
        return false;
    }
};

// Register the google_maps field type using WordPress global hooks
const registerGoogleMaps = () => {
    if (typeof window.wp === 'undefined' || !window.wp.hooks || !window.wp.hooks.addFilter) {
        setTimeout(registerGoogleMaps, 100);
        return;
    }

    try {
        window.wp.hooks.addFilter(
            'wpifycf_field_google_maps',
            'wpify_custom_fields',
            () => {
                return GoogleMaps;
            }
        );
    } catch (error) {
        // Silent error handling
    }
};

// Try to register immediately, or wait for DOM/wpHooks to be ready
if (typeof window.wp !== 'undefined' && window.wp.hooks && window.wp.hooks.addFilter) {
    registerGoogleMaps();
} else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerGoogleMaps);
} else {
    // If DOM is already loaded but wp.hooks isn't ready, try with a short delay
    setTimeout(registerGoogleMaps, 0);
}

// Export default for backward compatibility
export default GoogleMaps;

