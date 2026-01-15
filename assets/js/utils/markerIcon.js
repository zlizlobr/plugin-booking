/**
 * Google Maps Marker Icon Utility
 * 
 * Creates custom SVG marker icons for Google Maps with specified color and label
 */

/**
 * Create custom marker icon with specified color and label
 * 
 * @param {string} label - Text label to display in the marker (e.g., "Shop", "Client")
 * @param {string} color - Color in RGB format (default: 'rgb(255, 162, 94)')
 * @returns {Object|null} Google Maps icon configuration object or null if Google Maps API is not loaded
 */
export const createMarkerIcon = (label, color = 'rgb(255, 162, 94)') => {
	if (!window.google || !window.google.maps) {
		return null; // Return null if Google Maps API is not loaded
	}
	
	const svg = `
		<svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
			<path d="M20 0C9 0 0 9 0 20c0 11 20 30 20 30s20-19 20-30C40 9 31 0 20 0z" fill="${color}" stroke="#fff" stroke-width="2"/>
			<text x="20" y="23" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle" dominant-baseline="central">${label}</text>
		</svg>
	`;
	return {
		url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
		scaledSize: new window.google.maps.Size(40, 50),
		anchor: new window.google.maps.Point(20, 50)
	};
};

