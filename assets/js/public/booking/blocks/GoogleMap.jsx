import { h } from 'preact';
import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { useBookingContext } from '../contexts/BookingContext.jsx';
import { useInputField } from '../hooks/useInputField.js';
import { InputBookingComponent } from './InputBookingComponent.jsx';
import { createMarkerIcon } from '../../../utils/markerIcon.js';


const useGoogleMap = (mapRef, options) => {
    
    const [map, setMap] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initMap = () => {
            if (!window.google) { 
                console.warn('⚠️ RC[useGoogleMap] window.google not available');
                return;
            }

            if (!mapRef.current) {
                console.warn('⚠️ RC[useGoogleMap] mapRef.current not available');
                return;
            }

            const { basic_settings = {}, behavior = {}, controls = {}, ui_optimization = {} } = options;

            const mapOptions = {
                zoom: basic_settings.zoom || 16,
                minZoom: basic_settings.min_zoom || 1,
                maxZoom: basic_settings.max_zoom || 21,
                center: {
                    lat: parseFloat(basic_settings.center_lat || '46.4519675'),
                    lng: parseFloat(basic_settings.center_lng || '3.3221324')
                },
                mapTypeId: basic_settings.mapTypeId || 'roadmap',
                mapTypeControl: controls.mapTypeControl !== undefined ? controls.mapTypeControl : true,
                streetViewControl: controls.streetViewControl !== undefined ? controls.streetViewControl : true,
                fullscreenControl: controls.fullscreenControl !== undefined ? controls.fullscreenControl : true,
                zoomControl: controls.zoomControl !== undefined ? controls.zoomControl : true,
                scaleControl: controls.scaleControl || false,
                rotateControl: controls.rotateControl || false,
                panControl: controls.panControl || false,
                draggable: behavior.draggable !== undefined ? behavior.draggable : true,
                scrollwheel: behavior.scrollwheel !== undefined ? behavior.scrollwheel : true,
                disableDoubleClickZoom: behavior.disableDoubleClickZoom || false,
                gestureHandling: behavior.gestureHandling || 'auto',
                keyboardShortcuts: behavior.keyboardShortcuts !== undefined ? behavior.keyboardShortcuts : true,
                disableDefaultUI: ui_optimization.disableDefaultUI || false,
                clickableIcons: ui_optimization.clickableIcons !== undefined ? ui_optimization.clickableIcons : true
            };

            try {
                const googleMap = new window.google.maps.Map(mapRef.current, mapOptions);
                setMap(googleMap);
                setIsLoading(false);
            } catch (error) {
                console.error('❌ RC[useGoogleMap] Error creating map:', error);
            }
        };

        if (window.google) {
            initMap();
        } else {
            const checkGoogleMaps = setInterval(() => {
                if (window.google) {
                    clearInterval(checkGoogleMaps);
                    initMap();
                }
            }, 100);

            setTimeout(() => {
                clearInterval(checkGoogleMaps);
                console.error('❌ RC[useGoogleMap] Google Maps API failed to load after 10s');
            }, 10000);
        }
    }, [options]);

    return { map, isLoading };
};

const useMarkers = (map, label) => {
    const [staticMarkers, setStaticMarkers] = useState([]);
    const [dynamicMarker, setDynamicMarker] = useState(null);
    const dynamicMarkerRef = useRef(null);
    const markersInitialized = useRef(false);

    useEffect(() => {

    }, [staticMarkers]);

    const createMarker = (options) => {
        // Use custom marker icon if label is provided, otherwise use default icon
        const markerIcon = options.label 
            ? createMarkerIcon(options.label, options.color || 'rgb(255, 162, 94)')
            : {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: options.color || '#4285F4',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 8
            };
        
        const marker = new window.google.maps.Marker({
            position: options.position,
            map,
            title: options.title,
            icon: markerIcon
        });
        return marker;
    };

    const addStaticMarker = (options) => {

        const position = options.position || {};
        const lat = parseFloat(position.lat);
        const lng = parseFloat(position.lng);

        if (map && !isNaN(lat) && !isNaN(lng)) {
            const validPosition = { lat, lng };
            const marker = createMarker({
                position: validPosition,
                title: options.label || label,
                color: options.color || '#4285F4'
            });
            setStaticMarkers(prev => {
                const newMarkers = [...prev, marker];
                return newMarkers;
            });
        }
    };

    const updateDynamicMarker = (position) => {
        if (dynamicMarkerRef.current) {
            dynamicMarkerRef.current.setMap(null);
        }

        if (map) {
            const marker = createMarker({
                position: position,
                title: label,
                label: label,
            });
            dynamicMarkerRef.current = marker;
            setDynamicMarker(marker);
        }
    };

    const cleanup = () => {
        staticMarkers.forEach(marker => marker.setMap(null));
        if (dynamicMarkerRef.current) dynamicMarkerRef.current.setMap(null);
        markersInitialized.current = false;
    };

    const initializeMarkers = (markers) => {
        if (markersInitialized.current || !map || !markers || markers.length === 0) return;


        markers.forEach((marker, index) => {
            addStaticMarker(marker);
        });
        markersInitialized.current = true;
    };

    return { addStaticMarker, updateDynamicMarker, cleanup, initializeMarkers };
};

const useAutocomplete = (inputRef, onPlaceSelect) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!inputRef.current || !window.google || isInitialized.current) return;

        try {
            const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['geocode']
            });

            setAutocomplete(autocompleteInstance);
            isInitialized.current = true;

            autocompleteInstance.addListener('place_changed', () => {
                const place = autocompleteInstance.getPlace();

                if (place.geometry?.location) {
                    onPlaceSelect(place);
                }
            });
        } catch (error) {
            console.error('❌ RC[useAutocomplete] Error initializing autocomplete:', error);
            console.warn('⚠️ RC[useAutocomplete] Places API may not be enabled or API key has restrictions');
        }
    }, [onPlaceSelect]);

    return autocomplete;
};


const extractCountryCode = (addressComponents) => {
    if (!addressComponents) return null;

    const countryComponent = addressComponents.find(component =>
        component.types.includes('country')
    );

    return countryComponent?.short_name || null;
};

const geocodeCoordinates = (lat, lng) => {
    return new Promise((resolve) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                const country_code = extractCountryCode(results[0].address_components);
                resolve({ address, country_code });
            } else {
                resolve({ address: null, country_code: null });
            }
        });
    });
};

const GoogleMap = ({ attrs = {}, rules = {} }) => {
    const context = useBookingContext();
    const user = useMemo(() => {
        return context.bookingFormManager?.getUser() || null;
    }, [context.bookingFormManager]);
    const { general = {} } = attrs;

    const {
        label = __('Location', 'wpcbooking'),
        icon_url = '',
        basic_settings = {},
        behavior = {},
        controls = {},
        ui_optimization = {}
    } = general;

    const field_id = attrs.field_id || `map_${label.toLowerCase().replace(/\s+/g, '_')}`;

    const {
        currentValue,
        handleChange,
        error,
        isValid,
        inputClasses
    } = useInputField({
        fieldId: field_id,
        rules,
        ...context
    });

    // Parse current value as JSON if it's a string, otherwise use as object
    const parseCurrentValue = () => {
        if (!currentValue) return {};
        if (typeof currentValue === 'string') {
            try {
                return JSON.parse(currentValue);
            } catch (e) {
                console.warn('Failed to parse currentValue:', e);
                return {};
            }
        }
        return currentValue;
    };

    const current_value = parseCurrentValue();

    const height = basic_settings.height || 400;

    const current_address = current_value?.address || '';
    const [address, setAddress] = useState(current_address);
    const [positionData, setPositionData] = useState(current_value);
    const [isTyping, setIsTyping] = useState(false);

    const mapRef = useRef(null);
    const inputRef = useRef(null);

    const mapOptions = useMemo(() => ({
        basic_settings,
        behavior,
        controls,
        ui_optimization
    }), [JSON.stringify(basic_settings), JSON.stringify(behavior), JSON.stringify(controls), JSON.stringify(ui_optimization)]);

    const { map, isLoading } = useGoogleMap(mapRef, mapOptions);

    const { addStaticMarker, updateDynamicMarker, cleanup, initializeMarkers } = useMarkers(map, label);

    const updatePositionData = (address, lat, lng, country_code = null, isUserInteraction = true) => {
        const data = { address, lat, lng, country_code };
        saveUserCountry(country_code);
        setPositionData(data);
        // Use handleChange from useInputField to save position data
        handleChange(JSON.stringify(data), isUserInteraction);
    };

    const saveUserCountry = (country_code) => {
        if (!country_code) return;
        if (!user) return;
        user.set('user_country', country_code);
    };

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setIsTyping(true);
        setAddress(value);
        
        // Save address text immediately (even without coordinates)
        // Coordinates will be updated when place is selected or map is clicked
        if (value.trim()) {
            const currentData = positionData || {};
            const dataToSave = {
                ...currentData,
                address: value
            };
            handleChange(JSON.stringify(dataToSave), true);
        } else {
            // Clear value if input is empty
            handleChange('', true);
        }

        setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    };

    const handlePlaceSelect = (place) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || place.name;
        const country_code = extractCountryCode(place.address_components);

        setIsTyping(false);
        setAddress(address);
        // Address will be saved via updatePositionData -> handleChange

        updatePositionData(address, lat, lng, country_code);
        updateDynamicMarker({ lat, lng });

        if (map) {
            map.setCenter({ lat, lng });
            map.setZoom(16);
        }
    };

    const handleMapClick = async (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        updateDynamicMarker({ lat, lng });

        const { address: newAddress, country_code } = await geocodeCoordinates(lat, lng);
        if (newAddress) {
            setIsTyping(false);
            setAddress(newAddress);
            // Address will be saved via updatePositionData -> handleChange
            updatePositionData(newAddress, lat, lng, country_code);
        }
    };


    useEffect(() => {
        if (map) {

            initializeMarkers(attrs.markers);

            const clickListener = map.addListener('click', handleMapClick);

            return () => {
                window.google.maps.event.removeListener(clickListener);
            };
        }
    }, [map, attrs.markers]);

    useAutocomplete(inputRef, handlePlaceSelect);

    useEffect(() => {
        return cleanup;
    }, []);

    // Update address and position when currentValue changes (e.g., from storage)
    useEffect(() => {
        if (current_value?.address && current_value?.lat && current_value?.lng) {
            setAddress(current_value.address);
            setPositionData(current_value);
        }
    }, [currentValue]);

    useEffect(() => {
        if (positionData?.address && positionData?.lat && positionData?.lng && map && !isTyping) {
            setAddress(positionData.address);
            updateDynamicMarker({ lat: positionData.lat, lng: positionData.lng });
            map.setCenter({ lat: positionData.lat, lng: positionData.lng });
            map.setZoom(16);
        }
    }, [positionData, map, isTyping]);

    return (
        <div className="flex items-stretch px-30p py-[18px] flex-col gap-y-2 border border-th-blue-light rounded-[50px]">
            <div className="flex items-center gap-x-4">
                {icon_url && (
                    <div
                        style={{ '--mask-img': `url('${icon_url}')` }}
                        className="w-25p h-30p bg-th-orange-light cs-mask"
                    ></div>
                )}
                <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
                    {label}
                </div>
            </div>

            <div className="af-p27 text-th-orange-light max-medium:text-[1rem]">
                <div className="w-full relative">
                    <input
                        ref={inputRef}
                        type="text"
                        id={field_id}
                        name="map_address_search"
                        value={address}
                        onChange={handleAddressChange}
                        className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={__('Enter address or location', 'wpcbooking')}
                        required
                        aria-invalid={!!error}
                        aria-describedby={error ? `${field_id}-error` : undefined}
                    />
                    {InputBookingComponent.render_validation_indicator(error, isValid)}
                    {InputBookingComponent.render_error_message(field_id, error)}
                </div>

                <input
                    type="hidden"
                    id={`${field_id}_position`}
                    name={`${field_id}_position`}
                    value={JSON.stringify(positionData)}
                />

                <div
                    ref={mapRef}
                    className={`google-map border border-th-blue-light rounded-[10px] h-100 hs-leaflet z-10 ${isLoading ? 'loading' : ''}`}
                    style={{ height: `${height}px` }}
                >
                </div>
            </div>
        </div>
    );
};

export default GoogleMap;
