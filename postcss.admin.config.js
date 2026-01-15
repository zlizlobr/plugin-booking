module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: { config: './tailwind.admin.config.js' },
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { 
      '@fullhuman/postcss-purgecss': {
        content: [
          './assets/css/admin/**/*.css',
          './assets/js/admin/**/*.js',
          './includes/Controllers/AdminController.php',
          './includes/CPT/**/*.php',
          './templates/admin/**/*.php',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          // WordPress admin specific classes
          /^wpify/,
          /^sub-/,
          /^nav-/,
          /^is-/,
          /^group/,
          /^hover:/,
          /^focus:/,
          /^disabled:/,
          /^dark:/,
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/,
          // Admin specific classes
          /^admin-/,
          /^wpifycf-/,
          /^sub-tabs/,
          /^nav-tab/,
          // Dynamic classes that might be added by JavaScript
          /^active/,
          /^selected/,
          /^open/,
          /^closed/,
          /^expanded/,
          /^collapsed/,
        ],
        // Keep important admin styles
        whitelistPatterns: [
          /^wpify/,
          /^sub-tabs/,
          /^nav-tab/,
          /^admin-/,
        ],
      },
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          minifySelectors: true,
        }],
      },
    } : {}),
  },
}
