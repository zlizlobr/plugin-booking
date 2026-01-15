import { h } from "preact";
import { useState, useEffect, useRef, useMemo } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { BaseAdminBlockComponent } from "./BlockComponent.jsx";
import { getGraphQLEndpoint } from "../utils/configHelpers.js";
import { getFormatConfig } from "../utils/priceFormatting.js";
import { createMarkerIcon } from "../../../utils/markerIcon.js";
import { get_price_manager } from "../utils/priceManager.js";
import {
  update_block_percentage,
  total_base_price,
} from "../signals/summarySignals.js";
import PriceIncreaseControl from "./composite/PriceIncreaseControl.jsx";
import InfoTooltip from "./composite/InfoTooltip.jsx";

const GoogleMap = (props) => {
  const component = new BaseAdminBlockComponent(props);
  const formatConfig = getFormatConfig();
  const currencySymbol = formatConfig.currencySymbol;

  // Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)
  const totalBasePrice = total_base_price.value;

  // Extract address components from Google Places API response
  const extractAddressComponents = (addressComponents) => {
    if (!addressComponents) return {};

    const components = {};

    addressComponents.forEach((component) => {
      if (component.types.includes("country")) {
        components.country = component.long_name;
        components.country_code = component.short_name;
      }
      if (component.types.includes("locality")) {
        components.city = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        components.postcode = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        components.state = component.long_name;
      }
      if (component.types.includes("route")) {
        components.route = component.long_name;
      }
      if (component.types.includes("street_number")) {
        components.street_number = component.long_name;
      }
    });

    return components;
  };

  // Parse shop address from JSON string
  const parseAddress = (adress) => {
    if (!adress || typeof adress !== "string") {
      return { address: "", lat: null, lng: null };
    }

    try {
      const parsed = JSON.parse(adress);
      return {
        address: parsed.address || "",
        lat: parsed.lat || null,
        lng: parsed.lng || null,
      };
    } catch (error) {
      return { address: adress, lat: null, lng: null };
    }
  };

  // Parse map data - component.value může být JSON string nebo object
  const parseMapData = () => {
    const value = component.value;

    if (!value) return {};

    // Pokud je to JSON string, parsuj ho
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return parsed;
      } catch (error) {
        console.warn(
          "🗺️ [AdminGoogleMap] Failed to parse value as JSON:",
          error
        );
        return {};
      }
    }

    // Pokud je to už objekt, použij ho přímo
    if (typeof value === "object") {
      return value;
    }

    return {};
  };

  const shopAddressParsed = parseAddress(props.attrs.shop_address || "");
  const clientAddressParsed = parseAddress(props.value || "");
  const mapContainerRef = useRef(null);
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const startAutocompleteRef = useRef(null);
  const endAutocompleteRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const isInternalUpdateRef = useRef(false); // Flag to prevent update loops
  const distanceCalculationTimeoutRef = useRef(null); // Debounce distance calculation

  // Memoize mapData to prevent re-parsing on every render
  const mapData = useMemo(() => {
    const parsed = parseMapData();
    return parsed;
  }, [component.value]);
  const [startAddress, setStartAddress] = useState(
    mapData.start_address || shopAddressParsed.address || ""
  );
  const [endAddress, setEndAddress] = useState(
    mapData.endAddress || clientAddressParsed.address || ""
  );
  const [distance, setDistance] = useState(mapData.distance || null);
  const [duration, setDuration] = useState(mapData.duration || null);
  const [routeError, setRouteError] = useState(null);

  // STATE pro label - podobně jako v DatePicker
  const [currentLabel, setCurrentLabel] = useState(() => {
    return (
      mapData.label || component.attrs.label || component.get_default_label()
    );
  });

  // Transform PHP price_increase format to component format
  const transformPriceIncreaseData = (phpData) => {
    if (!phpData) return {};

    // If it's an array, take the first item
    const data = Array.isArray(phpData) ? phpData[0] : phpData;

    if (!data) return {};

    return {
      operator: data.operation === "add" ? "+" : "-",
      percentage: parseFloat(data.price_increase) || 0,
      total: 0,
      base_price: 0,
    };
  };

  // Get price_increase from value (mapData) or fallback to attrs
  const initialPriceIncrease =
    mapData.price_increase || props.attrs.price_increase;

  const [priceIncrease, setPriceIncrease] = useState(
    transformPriceIncreaseData(initialPriceIncrease)
  );

  const [startLocation, setStartLocation] = useState({
    lat: mapData.start_lat || shopAddressParsed.lat || null,
    lng: mapData.start_lng || shopAddressParsed.lng || null,
    country: mapData.country || null,
    country_code: mapData.country_code || null,
    city: mapData.city || null,
    postcode: mapData.postcode || null,
    state: mapData.state || null,
  });
  const [endLocation, setEndLocation] = useState({
    lat: mapData.end_lat || clientAddressParsed.lat || null,
    lng: mapData.end_lng || clientAddressParsed.lng || null,
    country: mapData.end_country || null,
    country_code: mapData.end_country_code || null,
    city: mapData.end_city || null,
    postcode: mapData.end_postcode || null,
    state: mapData.end_state || null,
  });

  // Parse value to get start and end locations
  const parseValue = () => {
    const data = parseMapData();

    if (!data || Object.keys(data).length === 0) {
      return {
        start_address: "",
        start_lat: null,
        start_lng: null,
        end_address: "",
        end_lat: null,
        end_lng: null,
        distance: null,
        duration: null,
      };
    }
    return {
      start_address: data.start_address || "",
      start_lat: data.start_lat || null,
      start_lng: data.start_lng || null,
      end_address: data.end_address || "",
      end_lat: data.end_lat || null,
      end_lng: data.end_lng || null,
      distance: data.distance || null,
      duration: data.duration || null,
    };
  };

  // Update component value - always preserve current state values
  const updateValue = (updates) => {
    isInternalUpdateRef.current = true; // Mark as internal update

    const newValue = {
      start_address: startAddress,
      start_lat: startLocation.lat,
      start_lng: startLocation.lng,
      end_address: endAddress,
      end_lat: endLocation.lat,
      end_lng: endLocation.lng,
      distance: distance,
      duration: duration,
      label: currentLabel, // Aktuální label ze STATE
      ...updates, // Apply updates on top
    };

    component.handle_change(newValue);

    // Reset flag after a short delay to allow the change to propagate
    setTimeout(() => {
      isInternalUpdateRef.current = false;
    }, 50);
  };

  // Calculate distance using GraphQL query
  const calculateDistanceViaGraphQL = async (start, end) => {
    if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
      console.warn(
        "🗺️ [AdminGoogleMap] calculateDistanceViaGraphQL: Invalid coordinates",
        { start, end }
      );
      return null;
    }
    const graphql_query = `
			query CalculateDistance($originLat: Float!, $originLng: Float!, $destLat: Float!, $destLng: Float!) {
				calculateDistance(
					originLat: $originLat
					originLng: $originLng
					destLat: $destLat
					destLng: $destLng
				)
			}
		`;

    const variables = {
      originLat: start.lat,
      originLng: start.lng,
      destLat: end.lat,
      destLng: end.lng,
    };

    try {
      const endpoint = getGraphQLEndpoint();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: graphql_query,
          variables: variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        const errorMessages = result.errors
          .map((err) => err.message)
          .join(", ");
        console.error("🗺️ [AdminGoogleMap] GraphQL errors:", errorMessages);
        throw new Error(errorMessages);
      }

      const distanceKm = result.data?.calculateDistance;

      if (distanceKm !== null && distanceKm !== undefined) {
        return parseFloat(distanceKm);
      }

      return null;
    } catch (error) {
      console.error(
        "🗺️ [AdminGoogleMap] GraphQL distance calculation failed:",
        error
      );
      return null;
    }
  };

  // Calculate route between two points
  const calculateRoute = async (start, end) => {
    if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
      console.warn("🗺️ [AdminGoogleMap] calculateRoute: Invalid coordinates", {
        start,
        end,
      });
      return;
    }

    // Clear previous timeout if exists
    if (distanceCalculationTimeoutRef.current) {
      clearTimeout(distanceCalculationTimeoutRef.current);
    }

    // Add delay before calculating distance (debounce)
    distanceCalculationTimeoutRef.current = setTimeout(async () => {
      // Try GraphQL first
      const graphqlDistance = await calculateDistanceViaGraphQL(start, end);

      if (graphqlDistance !== null) {
        // Successfully got distance from GraphQL
        const distanceKm = graphqlDistance.toFixed(2);

        // Estimate duration (assuming average speed of 50 km/h)
        const estimatedHours = graphqlDistance / 50;
        const estimatedMinutes = Math.round(estimatedHours * 60);
        const durationText =
          estimatedMinutes > 60
            ? `${Math.floor(estimatedMinutes / 60)} h ${
                estimatedMinutes % 60
              } min`
            : `${estimatedMinutes} min`;

        setDistance(distanceKm);
        setDuration(durationText);
        setRouteError(null);

        updateValue({
          distance: distanceKm,
          duration: durationText,
        });
        return;
      }

      // Fallback to Directions API if GraphQL fails
      if (
        !directionsServiceRef.current ||
        !directionsRendererRef.current ||
        !mapRef.current
      ) {
        console.warn(
          "🗺️ [AdminGoogleMap] calculateRoute: Missing refs, trying fallback",
          {
            hasDirectionsService: !!directionsServiceRef.current,
            hasDirectionsRenderer: !!directionsRendererRef.current,
            hasMap: !!mapRef.current,
          }
        );

        // Last resort: straight-line distance
        calculateStraightLineDistance(start, end);
        return;
      }

      directionsServiceRef.current.route(
        {
          origin: { lat: start.lat, lng: start.lng },
          destination: { lat: end.lat, lng: end.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result && result.routes && result.routes[0]) {
            directionsRendererRef.current.setDirections(result);

            const route = result.routes[0];
            const leg = route.legs[0];

            // Calculate distance in km
            const distanceKm = (leg.distance.value / 1000).toFixed(2);
            const durationText = leg.duration.text;

            setDistance(distanceKm);
            setDuration(durationText);
            setRouteError(null);

            updateValue({
              distance: distanceKm,
              duration: durationText,
            });
          } else {
            console.warn(
              "🗺️ [AdminGoogleMap] Directions request failed:",
              status
            );

            // Set error message
            if (status === "REQUEST_DENIED") {
              setRouteError(
                __(
                  "Directions API is not enabled for your Google Maps API key. Please enable it in Google Cloud Console.",
                  "wpcbooking"
                )
              );
            } else if (status === "OVER_QUERY_LIMIT") {
              setRouteError(
                __(
                  "Directions API quota exceeded. Please check your Google Maps API usage.",
                  "wpcbooking"
                )
              );
            } else {
              setRouteError(
                __(
                  "Unable to calculate route. Please try again later.",
                  "wpcbooking"
                )
              );
            }

            // Last fallback: Calculate straight-line distance using Geometry API
            calculateStraightLineDistance(start, end);
          }
        }
      );
    }, 800); // 800ms delay
  };

  // Calculate straight-line distance as fallback when Directions API is not available
  const calculateStraightLineDistance = (start, end) => {
    if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
      return;
    }

    if (!window.google || !window.google.maps || !window.google.maps.geometry) {
      console.warn(
        "🗺️ [AdminGoogleMap] Geometry API not available for distance calculation"
      );
      return;
    }

    const startPoint = new window.google.maps.LatLng(start.lat, start.lng);
    const endPoint = new window.google.maps.LatLng(end.lat, end.lng);

    // Calculate distance in meters
    const distanceMeters =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        startPoint,
        endPoint
      );
    const distanceKm = (distanceMeters / 1000).toFixed(2);

    // Estimate duration (assuming average speed of 50 km/h)
    const estimatedHours = distanceMeters / 1000 / 50;
    const estimatedMinutes = Math.round(estimatedHours * 60);
    const durationText =
      estimatedMinutes > 60
        ? `${Math.floor(estimatedMinutes / 60)} h ${estimatedMinutes % 60} min`
        : `${estimatedMinutes} min`;

    setDistance(distanceKm);
    setDuration(durationText + " (estimated)");
    setRouteError(null); // Clear error when fallback succeeds

    updateValue({
      distance: distanceKm,
      duration: durationText + " (estimated)",
    });

    // Don't draw line between points - only calculate distance
  };

  // Update markers on map
  const updateMarkers = () => {
    if (!mapRef.current) {
      console.warn("🗺️ [AdminGoogleMap] updateMarkers: Map not initialized");
      return;
    }

    const currentValue = parseValue();

    // Remove and recreate start marker if location exists
    if (currentValue.start_lat && currentValue.start_lng) {
      const startPos = {
        lat: currentValue.start_lat,
        lng: currentValue.start_lng,
      };

      // Remove previous marker if exists
      if (startMarkerRef.current) {
        startMarkerRef.current.setMap(null);
        startMarkerRef.current = null;
      }

      // Create new start marker
      const startLabel = __("Start", "wpcbooking");
      startMarkerRef.current = new window.google.maps.Marker({
        position: startPos,
        map: mapRef.current,
        icon: createMarkerIcon(startLabel),
        title: currentValue.start_address || "Start Location",
      });
    } else if (startMarkerRef.current) {
      startMarkerRef.current.setMap(null);
      startMarkerRef.current = null;
    }

    // Remove and recreate end marker if location exists
    if (currentValue.end_lat && currentValue.end_lng) {
      const endPos = { lat: currentValue.end_lat, lng: currentValue.end_lng };

      // Remove previous marker if exists
      if (endMarkerRef.current) {
        endMarkerRef.current.setMap(null);
        endMarkerRef.current = null;
      }

      // Create new end marker
      const endLabel = __("End", "wpcbooking");
      endMarkerRef.current = new window.google.maps.Marker({
        position: endPos,
        map: mapRef.current,
        icon: createMarkerIcon(endLabel),
        title: currentValue.end_address || "End Location",
      });
    } else if (endMarkerRef.current) {
      endMarkerRef.current.setMap(null);
      endMarkerRef.current = null;
    }

    // Calculate route if both locations exist
    if (
      currentValue.start_lat &&
      currentValue.start_lng &&
      currentValue.end_lat &&
      currentValue.end_lng
    ) {
      calculateRoute(
        { lat: currentValue.start_lat, lng: currentValue.start_lng },
        { lat: currentValue.end_lat, lng: currentValue.end_lng }
      );
    }
  };

  // Initialize Google Maps
  useEffect(() => {
    const initializeMap = () => {
      if (!mapContainerRef.current) {
        console.warn(
          "🗺️ [AdminGoogleMap] initializeMap: mapContainerRef.current is null"
        );
        return;
      }

      // Check if map is already initialized
      if (mapRef.current) {
        updateMarkers();
        return;
      }

      // Check if Google Maps API is loaded
      if (typeof window.google === "undefined" || !window.google.maps) {
        console.warn("🗺️ [AdminGoogleMap] Google Maps API is not loaded");
        return;
      }

      // Initialize map
      const mapOptions = {
        center:
          startLocation.lat && startLocation.lng
            ? { lat: startLocation.lat, lng: startLocation.lng }
            : { lat: 50.0755, lng: 14.4378 }, // Default: Prague
        zoom: startLocation.lat && startLocation.lng ? 12 : 10,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };

      const map = new window.google.maps.Map(
        mapContainerRef.current,
        mapOptions
      );
      mapRef.current = map;

      // Initialize Directions Service and Renderer
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true, // Use our custom markers instead of default A/B
        suppressPolylines: true, // Don't show route line
      });
      directionsServiceRef.current = directionsService;
      directionsRendererRef.current = directionsRenderer;

      // Initialize Places Autocomplete for start address
      if (startInputRef.current) {
        const startAutocomplete = new window.google.maps.places.Autocomplete(
          startInputRef.current,
          {
            types: ["geocode"],
          }
        );
        startAutocompleteRef.current = startAutocomplete;

        startAutocomplete.addListener("place_changed", () => {
          const place = startAutocomplete.getPlace();

          if (!place.geometry) {
            console.warn(
              "🗺️ [AdminGoogleMap] No geometry found for selected start place"
            );
            return;
          }

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || place.name;

          const addressComponents = extractAddressComponents(
            place.address_components
          );

          console.log(
            "🗺️ [AdminGoogleMap] Start location components:",
            addressComponents
          );

          setStartAddress(address);
          setStartLocation({
            lat,
            lng,
            ...addressComponents,
          });

          const newStartLocation = { lat, lng, address, ...addressComponents };
          updateValue({
            start_address: address,
            start_lat: lat,
            start_lng: lng,
          });

          // Remove previous start marker if exists
          if (startMarkerRef.current) {
            startMarkerRef.current.setMap(null);
            startMarkerRef.current = null;
          }

          // Create new start marker
          const startLabel = __("Start", "wpcbooking");
          startMarkerRef.current = new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            icon: createMarkerIcon(startLabel),
            title: address,
          });

          // Update map center
          map.setCenter({ lat, lng });
          map.setZoom(12);

          // Calculate route if end location is set
          // Use endLocation state or endMarkerRef to check if end location exists
          if (endLocation.lat && endLocation.lng) {
            calculateRoute(newStartLocation, {
              lat: endLocation.lat,
              lng: endLocation.lng,
            });
          } else if (endMarkerRef.current) {
            // Fallback: check marker position
            const endPos = endMarkerRef.current.getPosition();
            if (endPos) {
              calculateRoute(newStartLocation, {
                lat: endPos.lat(),
                lng: endPos.lng(),
              });
            }
          }
        });
      } else {
        console.warn("🗺️ [AdminGoogleMap] startInputRef.current is null");
      }

      // Initialize Places Autocomplete for end address
      if (endInputRef.current) {
        const endAutocomplete = new window.google.maps.places.Autocomplete(
          endInputRef.current,
          {
            types: ["geocode"],
          }
        );
        endAutocompleteRef.current = endAutocomplete;

        endAutocomplete.addListener("place_changed", () => {
          const place = endAutocomplete.getPlace();

          if (!place.geometry) {
            console.warn(
              "🗺️ [AdminGoogleMap] No geometry found for selected end place"
            );
            return;
          }

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || place.name;

          const addressComponents = extractAddressComponents(
            place.address_components
          );

          console.log(
            "🗺️ [AdminGoogleMap] End location components:",
            addressComponents
          );

          setEndAddress(address);
          setEndLocation({
            lat,
            lng,
            ...addressComponents,
          });

          const newEndLocation = { lat, lng, address, ...addressComponents };
          updateValue({
            end_address: address,
            end_lat: lat,
            end_lng: lng,
          });

          // Remove previous end marker if exists
          if (endMarkerRef.current) {
            endMarkerRef.current.setMap(null);
            endMarkerRef.current = null;
          }

          // Create new end marker
          const endLabel = __("End", "wpcbooking");
          endMarkerRef.current = new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            icon: createMarkerIcon(endLabel),
            title: address,
          });

          // Update map center to show both markers
          // Use startLocation state or startMarkerRef to check if start location exists
          if (startLocation.lat && startLocation.lng) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend({ lat: startLocation.lat, lng: startLocation.lng });
            bounds.extend({ lat, lng });
            map.fitBounds(bounds);
          } else if (startMarkerRef.current) {
            // Fallback: check marker position
            const startPos = startMarkerRef.current.getPosition();
            if (startPos) {
              const bounds = new window.google.maps.LatLngBounds();
              bounds.extend({ lat: startPos.lat(), lng: startPos.lng() });
              bounds.extend({ lat, lng });
              map.fitBounds(bounds);
            } else {
              map.setCenter({ lat, lng });
              map.setZoom(12);
            }
          } else {
            map.setCenter({ lat, lng });
            map.setZoom(12);
          }

          // Calculate route if start location is set
          if (startLocation.lat && startLocation.lng) {
            calculateRoute(
              {
                lat: startLocation.lat,
                lng: startLocation.lng,
              },
              newEndLocation
            );
          } else if (startMarkerRef.current) {
            // Fallback: check marker position
            const startPos = startMarkerRef.current.getPosition();
            if (startPos) {
              calculateRoute(
                {
                  lat: startPos.lat(),
                  lng: startPos.lng(),
                },
                newEndLocation
              );
            }
          }
        });
      } else {
        console.warn("🗺️ [AdminGoogleMap] endInputRef.current is null");
      }

      // Set initial markers if locations exist
      if (startLocation.lat && startLocation.lng) {
        const startLabel = __("Start", "wpcbooking");
        startMarkerRef.current = new window.google.maps.Marker({
          position: { lat: startLocation.lat, lng: startLocation.lng },
          map: map,
          icon: createMarkerIcon(startLabel),
          title: startAddress || "Start Location",
        });
      }

      if (endLocation.lat && endLocation.lng) {
        const endLabel = __("End", "wpcbooking");
        endMarkerRef.current = new window.google.maps.Marker({
          position: { lat: endLocation.lat, lng: endLocation.lng },
          map: map,
          icon: createMarkerIcon(endLabel),
          title: endAddress || "End Location",
        });

        // Fit bounds to show both markers
        if (startLocation.lat && startLocation.lng) {
          const bounds = new window.google.maps.LatLngBounds();
          bounds.extend({ lat: startLocation.lat, lng: startLocation.lng });
          bounds.extend({ lat: endLocation.lat, lng: endLocation.lng });
          map.fitBounds(bounds);
        }

        // Calculate route if both locations exist
        if (startLocation.lat && startLocation.lng) {
          calculateRoute(
            { lat: startLocation.lat, lng: startLocation.lng },
            { lat: endLocation.lat, lng: endLocation.lng }
          );
        }
      }
    };

    // Wait for Google Maps API to load
    if (typeof window.google !== "undefined" && window.google.maps) {
      setTimeout(initializeMap, 100);
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (typeof window.google !== "undefined" && window.google.maps) {
          clearInterval(checkGoogleMaps);
          setTimeout(initializeMap, 100);
        }
      }, 100);

      // Stop checking after 10 seconds
      setTimeout(() => {
        clearInterval(checkGoogleMaps);
        console.warn("🗺️ [AdminGoogleMap] Timeout waiting for Google Maps API");
      }, 10000);
    }
  }, []);

  // Watch for external value changes (from handleBlockChange)
  useEffect(() => {
    // Skip if this is an internal update (we triggered the change)
    if (isInternalUpdateRef.current) {
      return;
    }

    if (!mapRef.current) {
      return; // Map not initialized yet
    }

    const currentValue = parseValue();

    // Only update if we have actual data (not empty object from re-render)
    const hasData =
      currentValue.start_address ||
      currentValue.end_address ||
      currentValue.start_lat ||
      currentValue.end_lat ||
      currentValue.distance;

    if (!hasData) {
      return;
    }

    // Update state if values changed externally AND we have new data
    if (
      currentValue.start_address &&
      currentValue.start_address !== startAddress
    ) {
      setStartAddress(currentValue.start_address);
    }
    if (currentValue.end_address && currentValue.end_address !== endAddress) {
      setEndAddress(currentValue.end_address);
    }
    if (currentValue.distance !== null && currentValue.distance !== distance) {
      setDistance(currentValue.distance);
    }
    if (currentValue.duration && currentValue.duration !== duration) {
      setDuration(currentValue.duration);
    }

    // Update location states if coordinates changed externally
    if (currentValue.start_lat && currentValue.start_lng) {
      if (
        currentValue.start_lat !== startLocation.lat ||
        currentValue.start_lng !== startLocation.lng
      ) {
        setStartLocation({
          lat: currentValue.start_lat,
          lng: currentValue.start_lng,
        });
      }
    }
    if (currentValue.end_lat && currentValue.end_lng) {
      if (
        currentValue.end_lat !== endLocation.lat ||
        currentValue.end_lng !== endLocation.lng
      ) {
        setEndLocation({
          lat: currentValue.end_lat,
          lng: currentValue.end_lng,
        });
      }
    }

    // Update markers when value changes
    updateMarkers();
  }, [component.value]);

  // Sync label when mapData changes
  useEffect(() => {
    if (mapData.label !== undefined && mapData.label !== null) {
      setCurrentLabel(mapData.label);
    } else if (component.attrs.label) {
      setCurrentLabel(component.attrs.label);
    }
  }, [mapData.label, component.attrs.label]);

  // Handle manual address input changes (typing only, autocomplete handles the full update)
  const handleStartAddressChange = (e) => {
    const newAddress = e.target.value;
    setStartAddress(newAddress);
    // Don't call updateValue here - it causes loops. Autocomplete will handle the full update.
  };

  const handleEndAddressChange = (e) => {
    const newAddress = e.target.value;
    setEndAddress(newAddress);
    // Don't call updateValue here - it causes loops. Autocomplete will handle the full update.
  };

  const handlePriceIncreaseChange = (newPriceData) => {
    setPriceIncrease(newPriceData);

    // Calculate percentage from TOTAL base price
    const percentageAmount = totalBasePrice * (newPriceData.percentage / 100);
    const calculatedTotal =
      newPriceData.operator === "+"
        ? totalBasePrice + percentageAmount
        : totalBasePrice - percentageAmount;

    const price_manager = get_price_manager();
    price_manager.set_map_item(component.fieldId, {
      base_value: totalBasePrice,
      percentage: newPriceData.percentage,
      operation: newPriceData.operator === "+" ? "add" : "subtract",
    });

    // Aktualizovat percentage signál pro tento block (field_id + step)
    const operation = newPriceData.operator === "+" ? "add" : "subtract";
    update_block_percentage(
      component.step,
      component.fieldId,
      newPriceData.percentage,
      operation
    );

    const phpFormat = [
      {
        price_increase: newPriceData.percentage,
        operation: operation,
      },
    ];

    // Sloučit map data s price_increase do jedné hodnoty
    const mergedValue = {
      start_address: startAddress,
      start_lat: startLocation.lat,
      start_lng: startLocation.lng,
      end_address: endAddress,
      end_lat: endLocation.lat,
      end_lng: endLocation.lng,
      distance: distance,
      duration: duration,
      label: currentLabel, // Aktuální label ze STATE
      price_increase: phpFormat,
    };

    // Použít component.handle_change pro správný fieldId
    component.handle_change(mergedValue);
  };

  // Handler pro změnu labelu - podobně jako v DatePicker
  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setCurrentLabel(newLabel);
    // Aktualizovat hodnotu s novým labelem
    updateValue({ label: newLabel });
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (distanceCalculationTimeoutRef.current) {
        clearTimeout(distanceCalculationTimeoutRef.current);
      }
    };
  }, []);

  // Initial sync with PriceManager and cleanup on unmount
  useEffect(() => {
    const forceShow = props.attrs.calculation_quote?.apply_calculation;
    if (forceShow && priceIncrease.percentage) {
      const price_manager = get_price_manager();
      price_manager.set_map_item(component.fieldId, {
        base_value: totalBasePrice,
        percentage: priceIncrease.percentage,
        operation: priceIncrease.operator === "+" ? "add" : "subtract",
      });
    }

    return () => {
      const price_manager = get_price_manager();
      price_manager.remove_map_item(component.fieldId);
    };
  }, [totalBasePrice]);

  component.render_input = () => {
    return (
      <div>
        {/* Start Address Input */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {__("Start Location", "wpcbooking")}
          </label>
          <input
            ref={startInputRef}
            type="text"
            id={`${component.fieldId}-start`}
            name={`${component.fieldId}-start`}
            value={startAddress}
            placeholder={__("Search for start address...", "wpcbooking")}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
            onInput={handleStartAddressChange}
          />
          <input
            type="hidden"
            name={component.fieldId+ "_store_location"}
            value={JSON.stringify({
              address: startAddress,
              lat: startLocation.lat,
              lng: startLocation.lng,
              country: startLocation.country,
              country_code: startLocation.country_code,
              city: startLocation.city,
              postcode: startLocation.postcode,
              state: startLocation.state,
            })}
          />
          <input
            type="hidden"
            name={component.fieldId }
            value={JSON.stringify({
              address: endAddress,
              lat: endLocation.lat,
              lng: endLocation.lng,
              country: endLocation.country,
              country_code: endLocation.country_code,
              city: endLocation.city,
              postcode: endLocation.postcode,
              state: endLocation.state,
            })}
          />
        </div>

        {/* End Address Input */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {__("End Location", "wpcbooking")}
          </label>
          <input
            ref={endInputRef}
            type="text"
            id={`${component.fieldId}-end`}
            name={`${component.fieldId}-end`}
            value={endAddress}
            placeholder={__("Search for end address...", "wpcbooking")}
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white"
            onInput={handleEndAddressChange}
          />
        </div>

        {/* Map Container */}
        <div
          ref={mapContainerRef}
          id={`${component.fieldId}-map`}
          style={{
            width: "100%",
            height: "400px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "8px",
          }}
        />

        {/* Route Information */}
        {(distance || duration) && (
          <div className="text-sm text-gray-600 mt-2">
            {distance && (
              <p>
                {__("Distance:", "wpcbooking")} <strong>{distance} km</strong>
                <input
                  type="hidden"
                  name={`${component.fieldId}_distance`}
                  value={distance}
                />
              </p>
            )}
            {duration && (
              <p>
                {__("Duration:", "wpcbooking")} <strong>{duration}</strong>
              </p>
            )}
          </div>
        )}

        {/* Route Error Message */}
        {routeError && (
          <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            <strong>{__("Note:", "wpcbooking")}</strong> {routeError}
            <br />
            <small className="text-yellow-700 mt-1 block">
              {__("Straight-line distance is shown as fallback.", "wpcbooking")}
            </small>
          </div>
        )}

        {/* Price Increase Control - shown when calculation_quote.apply_calculation is true */}
        {(() => {
          const forceShow = props.attrs.calculation_quote?.apply_calculation;
          console.log('priceIncrease', priceIncrease);
          return forceShow ? (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {__("Price Calculation", "wpcbooking")}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {__("Label fee name", "wpcbooking")}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      name={`${component.fieldId}_percentage[label]`}
                      value={__('Distance fee', 'wpcbooking')}
                      onInput={handleLabelChange}
                      className="flex-none w-[50%] h-[50px] bg-transparent border border-gray-300 rounded px-3 py-2 text-sm"
                      placeholder={component.get_default_label()}
                    />
                    <InfoTooltip
                      description={__(
                        "Enter the name that will appear as the fee label in the shopping cart",
                        "wpcbooking"
                      )}
                    />
                  </div>
                </div>
              </div>
              {!distance && (
                <p className="text-sm text-gray-500 mb-2">
                  {__("Waiting for distance calculation...", "wpcbooking")}
                </p>
              )}
              <PriceIncreaseControl
                fieldId={component.fieldId}
                basePrice={totalBasePrice}
                value={priceIncrease}
                onChange={handlePriceIncreaseChange}
                currencySymbol={currencySymbol}
              />
            </div>
          ) : null;
        })()}
      </div>
    );
  };

  component.get_default_label = () => __("Route", "wpcbooking");
  return component.render();
};

export default GoogleMap;
