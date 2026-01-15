/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/css/admin/**/*.{js,jsx,ts,tsx,php}",
    "./assets/js/admin/**/*.{js,jsx,ts,tsx}",
    "./includes/Controllers/AdminController.php",
    "./includes/CPT/**/*.php",
    "./templates/admin/**/*.{js,jsx,ts,tsx,php}",
  ],
  theme: {
    extend: {
      // Admin-specific theme extensions
      colors: {
        'admin-primary': '#0073aa',
        'admin-secondary': '#00a0d2',
        'admin-success': '#46b450',
        'admin-warning': '#ffb900',
        'admin-error': '#dc3232',
      },
      spacing: {
        'admin-sidebar': '160px',
        'admin-header': '32px',
      },
      fontFamily: {
        'admin': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // Safelist pro admin-specific třídy
  safelist: [
    'wpify',
    'sub-tabs',
    'nav-tab',
    'wpifycf-gutenberg-block',
    'wpify__container',
    'wpify__header',
    'wpify__title',
    'sub-tabs-container',
    'sub-tabs-nav',
    'sub-tab-button',
    'wpifycf-field__wrapper',
    'nav-tab-wrapper',
    'nav-tab-active',
    'wpifycf-gutenberg-block__fields',
    // Admin-specific utility classes
    'admin-primary',
    'admin-secondary',
    'admin-success',
    'admin-warning',
    'admin-error',
  ]
}
