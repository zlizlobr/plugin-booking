import { loadDraft, patchDraft } from './storage.js';

/**
 * Form store for managing booking form state.
 * Handles form data, validated storage, and change notifications.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
export class FormStore {
  /**
   * Creates an instance of FormStore.
   *
   * @param {number|string} bookingId - Booking post ID
   */
  constructor(bookingId) {
    this.bookingId = bookingId;
    this.formData = {};
    this.validatedStorage = {};
    this.listeners = new Set();

    this.load_from_storage();
  }

  /**
   * Load form data from localStorage.
   *
   * @returns {void}
   */
  load_from_storage() {
    const draft = loadDraft(this.bookingId);
    if (draft) {
      this.formData = draft.formData || {};
      this.validatedStorage = { ...this.formData };
    }
  }
  /**
   * Save form data to localStorage.
   *
   * @param {Object} saveData - Data to save
   * @returns {void}
   */
  save_to_storage(saveData) {
    patchDraft(this.bookingId, saveData);
  }

  /**
   * Publish field change and notify listeners.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} newValue - New field value
   * @param {string} source - Change source ('user' or 'program')
   * @returns {Object} Change event data
   */
  publish_change(fieldName, newValue, source = 'user') {
    this.formData = {
      ...this.formData,
      [fieldName]: newValue
    };
    patchDraft(this.bookingId, { formData: this.formData });
    this.notify_listeners({
      type: 'field_change',
      fieldName,
      newValue,
      source,
      formData: this.formData
    });

    return {
      fieldName,
      newValue,
      source,
      formData: this.formData
    };
  }

  /**
   * Compare new value with validated storage value.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} newValue - Value to compare
   * @returns {boolean} True if values are the same
   */
  compare_with_storage(fieldName, newValue) {
    const storedValue = this.validatedStorage[fieldName];
    const isSame = JSON.stringify(storedValue) === JSON.stringify(newValue);
    return isSame;
  }

  /**
   * Update validated storage with new value.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Validated value
   * @returns {void}
   */
  update_validated_storage(fieldName, value) {
    this.validatedStorage = {
      ...this.validatedStorage,
      [fieldName]: value
    };
  }


  /**
   * Add change listener.
   *
   * @param {Function} listener - Listener callback function
   * @returns {void}
   */
  add_listener(listener) {
    this.listeners.add(listener);
  }

  /**
   * Remove change listener.
   *
   * @param {Function} listener - Listener callback function
   * @returns {void}
   */
  remove_listener(listener) {
    this.listeners.delete(listener);
  }

  /**
   * Notify all listeners of an event.
   *
   * @param {Object} event - Event object
   * @returns {void}
   */
  notify_listeners(event) {
    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('[FormStore] Listener error:', error);
      }
    });
  }

  /**
   * Get current form state.
   *
   * @returns {Object} Form state object
   */
  get_state() {
    return {
      formData: { ...this.formData },
      validatedStorage: { ...this.validatedStorage }
    };
  }

  /**
   * Reset form store to initial state.
   *
   * @returns {void}
   */
  reset() {
    this.formData = {};
    this.validatedStorage = {};
    patchDraft(this.bookingId, { formData: {} });
    this.notify_listeners({
      type: 'form_reset',
      formData: this.formData
    });
  }
}
/**
 * Create new FormStore instance.
 *
 * @param {number|string} bookingId - Booking post ID
 * @returns {FormStore} FormStore instance
 */
export const createFormStore = (bookingId) => {
  return new FormStore(bookingId);
};

export default FormStore;
