import { h } from 'preact';
import { __ } from '@wordpress/i18n';
import { useBookingContext } from '../contexts/BookingContext.jsx';
import * as Components from './index.js';

const ComponentNotFound = ({ blockName }) => (
  <div className="flex items-center justify-center p-8 border border-red-300 rounded-lg bg-red-50">
    <div className="text-center text-red-500">
      <div className="text-2xl mb-2">❌</div>
      <p>{__('Component not found:', 'wpcbooking')} <code>{blockName}</code></p>
    </div>
  </div>
);

const ComponentError = ({ blockName, error, errorManager }) => {
  const errorId = `block-error-${blockName}-${Date.now()}`;

  // Add error to errorManager
  if (errorManager) {
    errorManager.setSystemError(errorId, {
      message: __('Error rendering component:', 'wpcbooking') + ` ${blockName}`,
      type: 'error',
      details: error.message || error.toString()
    });
  }

  return (
    <div className="flex items-center justify-center p-8 border border-red-300 rounded-lg bg-red-50">
      <div className="text-center text-red-500">
        <div className="text-2xl mb-2">⚠️</div>
        <p>{__('Error rendering component:', 'wpcbooking')}</p>
        <p className="text-sm mt-2"><code>{blockName}</code></p>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm font-semibold">
              {__('Error details (developers only)', 'wpcbooking')}
            </summary>
            <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
              {error.stack || error.toString()}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

const BlockRenderer = ({ block_data }) => {
  const context = useBookingContext();
  const { errorManager } = context || {};

  if (!block_data?.blockName) return null;
  const { blockName, attrs = {}} = block_data;
  const rules = block_data.rules || [];
  const componentRegistry = {
    'booking/icons-list': Components.IconsList,
    'booking/date-picker': Components.DatePicker,
    'booking/google-map': Components.GoogleMap,
    'booking/number-input': Components.NumberInput,
    'booking/text-input': Components.TextInput,
    'booking/phone-input': Components.PhoneInput,
    'booking/email-input': Components.EmailInput,
    'booking/time-picker': Components.TimePicker,
    'booking/product-list': Components.ProductList,
    'booking/product-grid': Components.ProductGrid,
  };

  const Component = componentRegistry[blockName];
  if (!Component) {
    return <ComponentNotFound blockName={blockName} />;
  }

  // Try-catch wrapper to handle exceptions
  try {
    return (
      <Component
        attrs={attrs}
        rules={rules}
        {...context}
      />
    );
  } catch (error) {
    console.error(`Error rendering block ${blockName}:`, error);

    // Add global error to errorManager
    if (errorManager) {
      errorManager.addGlobalError({
        message: __('Error rendering component:', 'wpcbooking') + ` ${blockName}`,
        type: 'error'
      });
    }

    return (
      <ComponentError
        blockName={blockName}
        error={error}
        errorManager={errorManager}
      />
    );
  }
};

export default BlockRenderer;
