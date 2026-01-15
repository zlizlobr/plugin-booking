import { __ } from '@wordpress/i18n';

/**
 * Error manager for booking forms.
 * Handles field, system, and global error management with listener system.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
export class ErrorManager {
  /**
   * Creates an instance of ErrorManager.
   *
   * @param {number|string} bookingId - Booking post ID
   */
  constructor(bookingId) {
    this.bookingId = bookingId;
    this.errors = {
      field: new Map(),     
      system: new Map(),    
      global: []            
    };
    this.listeners = new Set();
    this.scrollOptions = {
      behavior: 'smooth',
      block: 'center'
    };
  }

  /**
   * Set field-level error.
   *
   * @param {string} fieldId - Field identifier
   * @param {string|Array} error - Error message(s)
   * @returns {void}
   */
  setFieldError(fieldId, error) {
    this.errors.field.set(fieldId, error);
    this.notifyListeners({ type: 'field_error', fieldId, error });
  }

  /**
   * Get field-level error.
   *
   * @param {string} fieldId - Field identifier
   * @returns {string|null} Error message or null
   */
  getFieldError(fieldId) {
    return this.errors.field.get(fieldId) || null;
  }

  /**
   * Clear field-level error.
   *
   * @param {string} fieldId - Field identifier
   * @returns {void}
   */
  clearFieldError(fieldId) {
    this.errors.field.delete(fieldId);
    this.notifyListeners({ type: 'field_error_cleared', fieldId });
  }

  /**
   * Check if field has error.
   *
   * @param {string} fieldId - Field identifier
   * @returns {boolean} True if field has error
   */
  hasFieldError(fieldId) {
    return this.errors.field.has(fieldId);
  }

  /**
   * Set system-level error.
   *
   * @param {string} errorId - Error identifier
   * @param {string} error - Error message
   * @returns {void}
   */
  setSystemError(errorId, error) {
    this.errors.system.set(errorId, error);
    this.notifyListeners({ type: 'system_error', errorId, error });
    this.scrollToError(errorId);
  }

  /**
   * Get system-level error.
   *
   * @param {string} errorId - Error identifier
   * @returns {string|null} Error message or null
   */
  getSystemError(errorId) {
    return this.errors.system.get(errorId) || null;
  }

  /**
   * Clear system-level error.
   *
   * @param {string} errorId - Error identifier
   * @returns {void}
   */
  clearSystemError(errorId) {
    this.errors.system.delete(errorId);
    this.notifyListeners({ type: 'system_error_cleared', errorId });
  }

  /**
   * Add global error (displayed in header).
   *
   * @param {string|Object} error - Error message or error object
   * @param {string} [error.message] - Error message
   * @param {string} [error.type] - Error type
   * @returns {number|null} Error ID or null if duplicate
   */
  addGlobalError(error) {
    const message = error.message || error;
    
    const isDuplicate = this.errors.global.some(e => e.message === message);
    if (isDuplicate) {
      return null;
    }
    
    const errorObj = {
      id: Date.now() + Math.random(),
      message: message,
      type: error.type || 'error',
      timestamp: new Date()
    };
    
    this.errors.global.push(errorObj);
    this.notifyListeners({ type: 'global_error', error: errorObj });
    this.scrollToHeader();
    return errorObj.id;
  }

  /**
   * Remove global error by ID.
   *
   * @param {number} errorId - Error ID
   * @returns {void}
   */
  removeGlobalError(errorId) {
    this.errors.global = this.errors.global.filter(e => e.id !== errorId);
    this.notifyListeners({ type: 'global_error_removed', errorId });
  }

  /**
   * Clear all global errors.
   *
   * @returns {void}
   */
  clearAllGlobalErrors() {
    this.errors.global = [];
    this.notifyListeners({ type: 'global_errors_cleared' });
  }

  /**
   * Scroll to field error element.
   *
   * @param {string} fieldId - Field identifier
   * @returns {void}
   */
  scrollToError(fieldId) {
    const element = document.getElementById(fieldId);
    if (element) {
      element.scrollIntoView(this.scrollOptions);
      // Add visual highlight
      element.classList.add('error-highlight');
      setTimeout(() => element.classList.remove('error-highlight'), 2000);
    }
  }

  /**
   * Scroll to booking header.
   *
   * @returns {void}
   */
  scrollToHeader() {
    const header = document.querySelector('.booking-header, .aff-form-icons-wrapper');
    if (header) {
      header.scrollIntoView(this.scrollOptions);
    }
  }

  /**
   * Validate field value against rules.
   *
   * @param {string} fieldId - Field identifier
   * @param {mixed} value - Field value
   * @param {Object} rules - Validation rules
   * @param {boolean} [rules.required] - Field is required
   * @param {boolean} [rules.email] - Must be valid email
   * @param {boolean} [rules.phone] - Must be valid phone
   * @param {number} [rules.minLength] - Minimum length
   * @param {number} [rules.maxLength] - Maximum length
   * @param {string} [rules.pattern] - Regex pattern
   * @param {string} [rules.patternMessage] - Pattern error message
   * @returns {boolean} True if valid
   */
  validateField(fieldId, value, rules = {}) {
    const errors = [];
    
    const isArray = Array.isArray(value);
    const values = isArray ? value : [value];
    
    const isEmpty = (val) => {
      if (!val) return true;
      if (typeof val === 'string') return val.trim() === '';
      return false;
    };
    
    if (rules.required) {
      if (isArray ? (value.length === 0 || value.every(isEmpty)) : isEmpty(value)) {
        errors.push(__('This field is required', 'wpcbooking'));
      }
    }
    
    if (rules.email && values.some(v => v && !this.isValidEmail(v))) {
      errors.push(__('Invalid email', 'wpcbooking'));
    }
    
    if (rules.phone && values.some(v => v && !this.isValidPhone(v))) {
      errors.push(__('Invalid phone number', 'wpcbooking'));
    }
    
    if (rules.minLength) {
      if (values.some(v => v && v.length < rules.minLength)) {
        errors.push(sprintf(__('Minimum length is %d characters', 'wpcbooking'), rules.minLength));
      }
    }

    if (rules.maxLength) {
      if (values.some(v => v && v.length > rules.maxLength)) {
        errors.push(sprintf(__('Maximum length is %d characters', 'wpcbooking'), rules.maxLength));
      }
    }

    if (rules.pattern) {
      const regex = new RegExp(rules.pattern);
      if (values.some(v => v && !regex.test(v))) {
        errors.push(rules.patternMessage || __('Invalid format', 'wpcbooking'));
      }
    }

    if (errors.length > 0) {
      this.setFieldError(fieldId, errors[0]);
      return false;
    } else {
      this.clearFieldError(fieldId);
      return true;
    }
  }

  /**
   * Validate email format.
   *
   * @param {string} email - Email address
   * @returns {boolean} True if valid email
   */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  /**
   * Validate phone format.
   *
   * @param {string} phone - Phone number
   * @returns {boolean} True if valid phone
   */
  isValidPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    const cleaned = phone.replace(/\s+/g, '');
    return /^\+\d{1,4}\d{7,15}$/.test(cleaned);
  }

  /**
   * Get all errors (field, system, global).
   *
   * @returns {Object} All errors object
   */
  getAllErrors() {
    return {
      field: Object.fromEntries(this.errors.field),
      system: Object.fromEntries(this.errors.system),
      global: [...this.errors.global]
    };
  }

  /**
   * Check if there are any errors.
   *
   * @returns {boolean} True if any errors exist
   */
  hasAnyErrors() {
    return this.errors.field.size > 0 || 
           this.errors.system.size > 0 || 
           this.errors.global.length > 0;
  }

  /**
   * Clear all errors.
   *
   * @returns {void}
   */
  clearAllErrors() {
    this.errors.field.clear();
    this.errors.system.clear();
    this.errors.global = [];
    this.notifyListeners({ type: 'all_errors_cleared' });
  }

  /**
   * Add error listener.
   *
   * @param {Function} listener - Listener callback function
   * @returns {void}
   */
  addListener(listener) {
    this.listeners.add(listener);
  }

  /**
   * Remove error listener.
   *
   * @param {Function} listener - Listener callback function
   * @returns {void}
   */
  removeListener(listener) {
    this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of an event.
   *
   * @param {Object} event - Event object
   * @returns {void}
   */
  notifyListeners(event) {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in listener:', error);
      }
    });
  }

  /**
   * Create new ErrorManager instance.
   *
   * @param {number|string} bookingId - Booking post ID
   * @returns {ErrorManager} ErrorManager instance
   */
  static create(bookingId) {
    return new ErrorManager(bookingId);
  }
}

/**
 * Create new ErrorManager instance.
 *
 * @param {number|string} bookingId - Booking post ID
 * @returns {ErrorManager} ErrorManager instance
 */
export const createErrorManager = (bookingId) => {
  return ErrorManager.create(bookingId);
};
