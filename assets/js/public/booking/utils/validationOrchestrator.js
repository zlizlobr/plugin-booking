import { FormStore } from './formStore.js';
import { triggerMutation, executeMutation } from './mutations.js';

/**
 * Validation orchestrator class.
 * Handles field validation with debouncing and batching for user and program changes.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
export class ValidationOrchestrator {
  /**
   * Creates an instance of ValidationOrchestrator.
   *
   * @param {number|string} bookingId - Booking post ID
   * @param {string} quoteHash - Quote hash identifier
   * @param {Object} errorManager - Error manager instance
   * @param {Object} config - Configuration object
   * @param {number} [config.debounceDelay] - Debounce delay in milliseconds
   * @param {number} [config.batchDelay] - Batch delay in milliseconds
   * @param {number} [config.maxBatchSize] - Maximum batch size
   */
  constructor(bookingId, quoteHash, errorManager, config = {}) {
    this.bookingId = bookingId;
    this.formStore = new FormStore(bookingId);
    this.errorManager = errorManager;
    this.config = {
      debounceDelay: 1000,
      batchDelay: 100,
      maxBatchSize: 10,
      bookingId: bookingId,
      quoteHash: quoteHash,
      ...config
    };
    this.validationQueue = [];
    this.batchQueue = [];
    this.debounceTimers = new Map();
    this.batchTimer = null;
    this.validationResultCallback = null; // Callback pro notifikaci výsledků validace
    this.cartUpdateCallback = null; // Callback pro aktualizaci dat košíku
    this.stats = {
      totalValidations: 0,
      successfulValidations: 0,
      failedValidations: 0,
      skippedValidations: 0
    };
  }

  /**
   * Handle input field change with validation.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} newValue - New field value
   * @param {string} source - Change source ('user' or 'program')
   * @returns {void}
   */
  handle_input_change(fieldName, newValue, source = 'user') {
    const changeEvent = this.formStore.publish_change(fieldName, newValue, source);
    const isSameAsStorage = this.formStore.compare_with_storage(fieldName, newValue);
    if (isSameAsStorage) {
      this.stats.skippedValidations++;
      return;
    }
    if (source === 'user') {
      this.handle_user_change(fieldName, newValue);
    } else {
      this.handle_program_change(fieldName, newValue);
    }
  }

  /**
   * Handle user-initiated change with debouncing.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} newValue - New field value
   * @returns {void}
   */
  handle_user_change(fieldName, newValue) {
    if (this.debounceTimers.has(fieldName)) {
      clearTimeout(this.debounceTimers.get(fieldName));
    }

    const timer = setTimeout(() => {
      this.validate_single_field(fieldName, newValue);
      this.debounceTimers.delete(fieldName);
    }, this.config.debounceDelay);

    this.debounceTimers.set(fieldName, timer);
  }

  /**
   * Handle program-initiated change with batching.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} newValue - New field value
   * @returns {void}
   */
  handle_program_change(fieldName, newValue) {
    this.batchQueue.push({ fieldName, newValue });

    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }

    this.batchTimer = setTimeout(() => {
      this.validate_batch_fields();
      this.batchTimer = null;
    }, this.config.batchDelay);
  }

  /**
   * Validate single field via GraphQL.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Field value
   * @returns {Promise<void>}
   */
  async validate_single_field(fieldName, value) {
    try {
      this.stats.totalValidations++;
      const result = await this.execute_graphql_validation(fieldName, value);
       if (result.success) {
        this.handle_validation_success(fieldName, value);
        this.handle_cart_update(fieldName, result);
      } else {
        this.handle_validation_error(fieldName, result.errors);
      }
    } catch (error) {
      console.error(`💥 [ValidationOrchestrator] Exception during validation ${fieldName}:`, error);
      this.handle_validation_error(fieldName, error);
    }
  }

  /**
   * Validate batch of fields via GraphQL.
   *
   * @returns {Promise<void>}
   */
  async validate_batch_fields() {
    if (this.batchQueue.length === 0) return;

    const batch = this.batchQueue.splice(0, this.config.maxBatchSize);

    try {
      this.stats.totalValidations += batch.length;
      const results = await this.execute_batch_graphql_validation(batch);

      results.forEach((result, index) => {
        const { fieldName, value } = batch[index];

        if (result.success) {
          this.handle_validation_success(fieldName, value);
          this.handle_cart_update(fieldName, result);
        } else {
          this.handle_validation_error(fieldName, result.errors);
        }
      });
    } catch (error) {
      console.error(`[ValidationOrchestrator] 📕 Batch threw`, error);

      for (const { fieldName, value } of batch) {
        try {
          await this.validate_single_field(fieldName, value);
        } catch (singleError) {
          this.handle_validation_error(fieldName, singleError);
        }
      }
    }
  }

  /**
   * Execute GraphQL validation for single field.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Field value
   * @returns {Promise<Object>} Validation result
   */
  async execute_graphql_validation(fieldName, value) {
    return new Promise((resolve, reject) => {
      executeMutation(fieldName, value, {
        bookingId: this.config.bookingId,
        quoteHash: this.config.quoteHash,
        onSuccess: (result) => {
          resolve(result);
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  }

  /**
   * Execute GraphQL validation for batch of fields.
   *
   * @param {Array<Object>} batch - Array of {fieldName, value} objects
   * @returns {Promise<Array<Object>>} Array of validation results
   */
  async execute_batch_graphql_validation(batch) {
    const promises = batch.map(({ fieldName, value }) =>
      this.execute_graphql_validation(fieldName, value)
    );

    return Promise.all(promises);
  }

  /**
   * Handle successful validation.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Validated field value
   * @returns {void}
   */
  handle_validation_success(fieldName, value) {
    this.errorManager.clearFieldError(fieldName);
    this.formStore.update_validated_storage(fieldName, value);
    this.stats.successfulValidations++;

    // Notify validation manager to update field validity
    this.notify_validation_result(fieldName, true);
  }

  /**
   * Handle validation error.
   *
   * @param {string} fieldName - Field identifier
   * @param {string|Array|Error} errors - Error message(s) or error object
   * @returns {void}
   */
  handle_validation_error(fieldName, errors) {
    let errorMessage;
    if (Array.isArray(errors)) {
      errorMessage = errors.join(', ');
    } else if (typeof errors === 'string') {
      errorMessage = errors;
    } else if (errors && errors.message) {
      errorMessage = errors.message;
    } else {
      errorMessage = 'Validation failed';
    }

    this.errorManager.setFieldError(fieldName, errorMessage);
    this.stats.failedValidations++;

    // Notify validation manager to update field validity
    this.notify_validation_result(fieldName, false);
  }

  /**
   * Notify validation result via callback.
   *
   * @param {string} fieldName - Field identifier
   * @param {boolean} isValid - Whether field is valid
   * @returns {void}
   */
  notify_validation_result(fieldName, isValid) {
    // This will be called by validation manager to update field validity
    if (this.validationResultCallback) {
      this.validationResultCallback(fieldName, isValid);
    } else {
      console.warn('⚠️ [ValidationOrchestrator] Callback není nastaven!');
    }
  }

  /**
   * Set validation result callback.
   *
   * @param {Function} callback - Callback function(fieldName, isValid)
   * @returns {void}
   */
  setValidationResultCallback(callback) {
    this.validationResultCallback = callback;
  }

  /**
   * Set cart update callback.
   *
   * @param {Function} callback - Callback function(fieldName, result)
   * @returns {void}
   */
  setCartUpdateCallback(callback) {
    this.cartUpdateCallback = callback;
  }

  /**
   * Handle cart update via callback.
   *
   * @param {string} fieldName - Field identifier
   * @param {Object} result - Validation result
   * @returns {void}
   */
  handle_cart_update(fieldName, result) {
    if (this.cartUpdateCallback) {
      this.cartUpdateCallback(fieldName, result);
    } else {
      console.warn('⚠️ [ValidationOrchestrator] Cart update callback není nastaven!');
    }
  }

  /**
   * Get form store instance.
   *
   * @returns {FormStore} FormStore instance
   */
  get_form_store() {
    return this.formStore;
  }

  /**
   * Get error manager instance.
   *
   * @returns {Object} ErrorManager instance
   */
  get_error_manager() {
    return this.errorManager;
  }

  /**
   * Get validation statistics.
   *
   * @returns {Object} Statistics object
   */
  get_stats() {
    return { ...this.stats };
  }

  /**
   * Cleanup timers and queues.
   *
   * @returns {void}
   */
  cleanup() {
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();

    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    this.validationQueue = [];
    this.batchQueue = [];
    this.errorManager.clearAllErrors();
  }

  /**
   * Reset orchestrator to initial state.
   *
   * @returns {void}
   */
  reset() {
    this.cleanup();
    this.formStore.reset();
    this.errorManager.clearAllErrors();
    this.stats = {
      totalValidations: 0,
      successfulValidations: 0,
      failedValidations: 0,
      skippedValidations: 0
    };
  }
}

/**
 * Create new ValidationOrchestrator instance.
 *
 * @param {number|string} bookingId - Booking post ID
 * @param {Object} config - Configuration object
 * @returns {ValidationOrchestrator} ValidationOrchestrator instance
 */
export const createValidationOrchestrator = (bookingId, config = {}) => {
  return new ValidationOrchestrator(bookingId, config);
};

export default ValidationOrchestrator;
