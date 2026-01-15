import { useState, useEffect, useRef } from 'preact/hooks';

/**
 * Check if value exists and is not empty.
 *
 * @param {mixed} val - Value to check
 * @returns {boolean} True if value exists
 */
const hasValue = (val) => {
  if (!val) return false;
  if (Array.isArray(val)) return val.length > 0 && val.some(v => v && (typeof v !== 'string' || v.trim() !== ''));
  if (typeof val === 'string') return val.trim() !== '';
  return true;
};

/**
 * Hook for managing input field state, validation, and error handling.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param {Object} params - Hook parameters
 * @param {string} params.fieldId - Field identifier
 * @param {Array} params.rules - Validation rules
 * @param {Function} params.onChange - Change handler callback
 * @param {Object} params.errorManager - Error manager instance
 * @param {Object} params.bookingFormManager - Booking form manager instance
 * @returns {Object} Field state and methods
 */
export const useInputField = ({ fieldId, rules, onChange, errorManager, bookingFormManager }) => {
  const isUpdatingRef = useRef(false);
  const touchedRef = useRef(false); // Track if user has interacted with the field
  
  const [currentValue, setCurrentValue] = useState(() => {
    const value = bookingFormManager.get_field_value(fieldId);
    return value || '';
  });

  const [error, setError] = useState(() => null);
  const [isValid, setIsValid] = useState(() => {
    const value = bookingFormManager.get_field_value(fieldId);
    return hasValue(value);
  });

  useEffect(() => {
    const handleStoreUpdate = (event) => {
      if (event.type === 'field_change' && event.fieldName === fieldId) {
        if (isUpdatingRef.current) {
          isUpdatingRef.current = false;
          return;
        }
        
        const newValue = event.newValue || '';
        
        setCurrentValue((prevValue) => {
          if (prevValue === newValue) {
            return prevValue;
          }
          return newValue;
        });
        
        // Only show errors if field was touched
        if (touchedRef.current) {
          const fieldError = errorManager?.getFieldError(fieldId);
          setError(fieldError);
          
          const valueExists = hasValue(newValue);
          const hasError = !!fieldError;
          setIsValid(valueExists && !hasError);
        }
      }
    };

    const handleErrorUpdate = (event) => {
      if ((event.type === 'field_error' || event.type === 'field_error_cleared') && event.fieldId === fieldId) {
        // Only show errors if field was touched
        if (touchedRef.current) {
          const fieldError = errorManager?.getFieldError(fieldId);
          setError(fieldError);
          
          setCurrentValue((prevValue) => {
            const valueExists = hasValue(prevValue);
            const hasError = !!fieldError;
            setIsValid(valueExists && !hasError);
            return prevValue;
          });
        }
      }
    };

    bookingFormManager.add_listener(handleStoreUpdate);
    errorManager?.addListener(handleErrorUpdate);

    return () => {
      bookingFormManager.remove_listener(handleStoreUpdate);
      errorManager?.removeListener(handleErrorUpdate);
    };
  }, [fieldId, bookingFormManager, errorManager]);

  const handleChange = (value, isUserInteraction = true) => {
    // Mark as touched on first user interaction
    if (isUserInteraction && !touchedRef.current) {
      touchedRef.current = true;
    }
    
    isUpdatingRef.current = true;
    setCurrentValue(value);
    bookingFormManager.set_field_value(fieldId, value);
    
    // Trigger validation - use 'user' for user interaction, 'system' for default values
    const source = touchedRef.current ? 'user' : 'system';
    bookingFormManager.handle_input_change(fieldId, value, rules, source);
    
    // Update validity state
    const fieldError = errorManager?.getFieldError(fieldId);
    const valueExists = hasValue(value);
    const hasError = !!fieldError;
    const isValidValue = !hasError && valueExists;
    
    setIsValid(isValidValue);
    bookingFormManager.setFieldValid(fieldId, isValidValue);
    
    if (isValidValue) {
      onChange?.(fieldId, value);
    }
  };

  const baseClasses = "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p transition-colors duration-200";
  const statusClasses = error ? 'input-error animate-shake' : (isValid ? 'input-valid' : '');
  const inputClasses = `${baseClasses} ${statusClasses}`.trim();

  return {
    currentValue,
    handleChange,
    error: touchedRef.current ? error : null, // Only show error if touched
    isValid,
    inputClasses,
    setIsValid
  };
};
