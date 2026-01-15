/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/css/public/**/*.{css,js,jsx,ts,tsx,php}",
    "./assets/css/blocks/**/*.{css,js,jsx,ts,tsx,php}",
    "./assets/css/shared/**/*.css",
    "./assets/css/preline/**/*.css",
    "./assets/css/wpify/**/*.css",
    "./assets/js/public/**/*.{js,jsx,ts,tsx}",
    "./assets/js/public.js",
    "./templates/public/**/*.{js,jsx,ts,tsx,php}",
    "./includes/Controllers/PublicController.php",
    "./includes/Views/Blocks/Public/**/*.php",
    "./includes/Blocks/**/*.php",
  ],
  theme: {
    extend: {
      // Public-specific theme extensions
      colors: {
        'booking-primary': '#2563eb',
        'booking-secondary': '#1d4ed8',
        'booking-success': '#10b981',
        'booking-warning': '#f59e0b',
        'booking-error': '#ef4444',
        'booking-info': '#3b82f6',
      },
      spacing: {
        'booking-form': '2rem',
        'booking-section': '1.5rem',
      },
      fontFamily: {
        'booking': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // Safelist pro public-specific třídy
  safelist: [
    'vc',
    'hs-datepicker',
    'google-map',
    'booking-form',
    'booking-app',
    'booking-header',
    'booking-section',
    'booking-buttons',
    'booking-error',
    'vc-date',
    'vc-date__btn',
    'vc-week',
    'vc-dates',
    'hs-select',
    'hs-select-dropdown',
    'leaflet',
    'leaflet-container',
    'gm-style',
    'gm-style-mtc',
    'gm-fullscreen-control',
    'gm-svpc',
    // CS form classes
    'cs-ignore-gutenberg',
    'cs-form-button-next',
    'cs-form-button-prev',
    // Summary icon classes
    'summary-icon',
    'summary-icon-container',
    'summary-icon-mask',
    // Public-specific utility classes
    'booking-primary',
    'booking-secondary',
    'booking-success',
    'booking-warning',
    'booking-error',
    'booking-info',
    'animate-fade-in',
    'animate-slide-up',
    'animate-bounce-in',
    // State classes
    'current',
    'available',
    'disabled',
    'loading',
    'is-disabled',
    // Pick Icons block classes
    'wpcbooking-pick-icons',
    'wpcbooking-icon-item',
    'wpcbooking-icon-image',
    'wpcbooking-icon-label',
  ]
}
