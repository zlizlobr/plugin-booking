import { ValidationOrchestrator } from "./validationOrchestrator.js";
import { loadDraft, patchDraft, clearDraft } from "./storage.js";
import { triggerMutation, executeMutation } from "./mutations.js";
import UserManager from "./user.js";
import CardManager from "./card.js";
import CartManager from "../../../utils/cart.js";

/**
 * Map storing validation managers by booking ID.
 *
 * @type {Map<number|string, BookingFormManager>}
 */
const __validation_managers_by_booking = new Map();

/**
 * Booking form manager class.
 * Central manager for handling form state, validation, and cart updates.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
export class BookingFormManager {
  /**
   * Creates an instance of BookingFormManager.
   *
   * @param {number|string} bookingId - Booking post ID
   * @param {string} quoteHash - Quote hash identifier
   * @param {Object} errorManager - Error manager instance
   * @param {Object} config - Configuration object
   * @param {number} [config.debounceDelay] - Debounce delay in milliseconds
   * @param {number} [config.batchDelay] - Batch delay in milliseconds
   * @param {number} [config.maxBatchSize] - Maximum batch size
   * @param {boolean} [config.autoSave] - Enable auto-save
   */
  constructor(bookingId, quoteHash, errorManager, config = {}) {
    this.bookingId = bookingId;
    this.quoteHash = quoteHash;
    this.config = {
      debounceDelay: 1000,
      batchDelay: 100,
      maxBatchSize: 10,
      autoSave: true,
      ...config,
    };
    this.orchestrator = new ValidationOrchestrator(
      this.getBookingId(),
      this.getQuoteHash(),
      errorManager,
      this.config
    );
    this.formStore = this.orchestrator.get_form_store();
    this.errorManager = errorManager;
    this.mutationManager = null;

    this.listeners = new Set();
    this.stepValidation = new Map(); // Step-based validation state
    this.cartUpdateHandlers = new Map(); // Custom handlers pro různé bloky
    this._sections = {}; // Store sections for field lookup
    this._userManager = null;
    this._cardManager = null;
    this._cartManager = null;
    this._saveStepResult = null; // Store saveStep result for handlers
    this.setupErrorManagerIntegration();
    this.setupValidationCallbacks();
  }
  /**
   * Get booking ID.
   *
   * @returns {number|string} Booking post ID
   */
  getBookingId() {
    return this.bookingId;
  }

  /**
   * Get quote hash.
   *
   * @returns {string} Quote hash identifier
   */
  getQuoteHash() {
    return this.quoteHash;
  }

  /**
   * Get user manager instance.
   *
   * @returns {Object} UserManager instance
   */
  getUser() {
    if (!this._userManager) {
      this._userManager = new UserManager(this);
    }
    return this._userManager;
  }

  /**
   * Get card manager instance.
   *
   * @returns {Object} CardManager instance
   */
  getCard() {
    if (!this._cardManager) {
      this._cardManager = new CardManager(this);
    }
    return this._cardManager;
  }

  /**
   * Get cart manager instance.
   *
   * @returns {Object} CartManager instance
   */
  getCart() {
    if (!this._cartManager) {
      this._cartManager = new CartManager(this);
    }
    return this._cartManager;
  }

  /**
   * Handle input field change with validation.
   *
   * @param {string} fieldId - Field identifier
   * @param {mixed} newValue - New field value
   * @param {Array} rules - Validation rules
   * @param {string} source - Change source ('user' or 'program')
   * @returns {void}
   */
  handle_input_change(fieldId, newValue, rules = [], source = "user") {
    this.errorManager.validateField(fieldId, newValue, rules);
    if (this.errorManager.hasFieldError(fieldId)) {
      return;
    }

    this.orchestrator.handle_input_change(fieldId, newValue, source);
    this.notify_listeners({
      type: "input_change",
      fieldId,
      newValue,
      source,
      bookingId: this.getBookingId(),
    });
  }

  /**
   * Get current form state.
   *
   * @returns {Object} Form state object
   */
  get_form_state() {
    return this.formStore.get_state();
  }

  /**
   * Get field value.
   *
   * @param {string} fieldName - Field identifier
   * @returns {mixed} Field value or empty string
   */
  get_field_value(fieldName) {
    return this.formStore?.formData[fieldName] || "";
  }

  /**
   * Set field value.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Field value
   * @returns {void}
   */
  set_field_value(fieldName, value) {
    this.formStore.save_to_storage({ [fieldName]: value });
  }

  /**
   * Get stored field value.
   *
   * @param {string} fieldName - Field identifier
   * @returns {mixed} Stored field value or empty string
   */
  get_stored_value(fieldName) {
    return this.formStore?.formData[fieldName] || "";
  }

  /**
   * Get field error message.
   *
   * @param {string} fieldName - Field identifier
   * @returns {string|null} Error message or null
   */
  get_field_error(fieldName) {
    return this.errorManager.getFieldError(fieldName);
  }



  /**
   * Get field label by field ID.
   *
   * @param {string} field_id - Field identifier
   * @returns {string} Field label or empty string
   */
  get_field_label(field_id) {
    if (!field_id || !this._sections) {
      return "";
    }

    for (const step in this._sections) {
      const blocks = this._sections[step] || [];
      for (const block of blocks) {
        if (block.attrs?.field_id === field_id) {
          return block.attrs?.general?.label || "";
        }
      }
    }

    return "";
  }

  /**
   * Get all errors.
   *
   * @returns {Object} All errors object
   */
  get_all_errors() {
    return this.errorManager.getAllErrors();
  }

  /**
   * Check if form has any errors.
   *
   * @returns {boolean} True if any errors exist
   */
  has_errors() {
    return this.errorManager.hasAnyErrors();
  }

  /**
   * Add change listener.
   *
   * @param {Function} listener - Listener callback function
   * @returns {void}
   */
  add_listener(listener) {
    this.listeners.add(listener);
    this.formStore.add_listener(listener);
    this.errorManager.addListener(listener);
  }

  /**
   * Remove change listener.
   *
   * @param {Function} listener - Listener callback function
   * @returns {void}
   */
  remove_listener(listener) {
    this.listeners.delete(listener);
    this.formStore.remove_listener(listener);
    this.errorManager.removeListener(listener);
  }

  /**
   * Notify all listeners of an event.
   *
   * @param {Object} event - Event object
   * @returns {void}
   */
  notify_listeners(event) {
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.warn("[BookingFormManager] Listener error:", error);
      }
    });
  }

  /**
   * Get validation statistics.
   *
   * @returns {Object} Statistics object
   */
  get_stats() {
    return this.orchestrator.get_stats();
  }

  /**
   * Cleanup resources and clear errors.
   *
   * @returns {void}
   */
  cleanup() {
    this.orchestrator.cleanup();
    this.errorManager.clearAllErrors();
  }

  /**
   * Reset form manager to initial state.
   *
   * @returns {void}
   */
  reset() {
    this.orchestrator.reset();
    this.errorManager.clearAllErrors();
    this.listeners.clear();
  }

  /**
   * Get booking draft from storage.
   *
   * @returns {Object|null} Draft object or null
   */
  get_draft() {
    return loadDraft(this.getBookingId());
  }

  /**
   * Save booking draft to storage.
   *
   * @param {Object} draft - Draft data object
   * @returns {void}
   */
  save_draft(draft) {
    patchDraft(this.getBookingId(), draft);
  }

  /**
   * Clear booking draft from storage.
   *
   * @returns {void}
   */
  clear_draft() {
    clearDraft(this.getBookingId());
  }

  /**
   * Trigger mutation with delay.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Field value
   * @param {Object} options - Mutation options
   * @returns {void}
   */
  trigger_mutation(fieldName, value, options = {}) {
    return triggerMutation(fieldName, value, options);
  }

  /**
   * Execute mutation immediately.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Field value
   * @param {Object} options - Mutation options
   * @returns {Promise<void>}
   */
  execute_mutation(fieldName, value, options = {}) {
    return executeMutation(fieldName, value, options);
  }

  /**
   * Setup error manager integration with listeners.
   *
   * @returns {void}
   */
  setupErrorManagerIntegration() {
    // Propojení ErrorManager s BookingFormManager
    this.errorManager.addListener((event) => {
      this.notify_listeners({
        type: "error_manager_event",
        ...event,
        bookingId: this.getBookingId(),
      });
    });
  }

  /**
   * Setup validation callbacks for orchestrator.
   *
   * @returns {void}
   */
  setupValidationCallbacks() {
    this.orchestrator.setValidationResultCallback((fieldName, isValid) => {
      const hasValue =
        this.get_field_value(fieldName) !== undefined &&
        this.get_field_value(fieldName) !== null &&
        this.get_field_value(fieldName) !== "";
      const finalIsValid = isValid && hasValue;
      this.setFieldValid(fieldName, finalIsValid);
    });

    this.orchestrator.setCartUpdateCallback((fieldName, result) => {
      this.handle_block_result(fieldName, result);
    });
  }

  /**
   * Register block result handler.
   *
   * @param {string} fieldName - Field identifier
   * @param {Function} handler - Handler callback function
   * @returns {void}
   */
  register_block_handler(fieldName, handler) {
    this.cartUpdateHandlers.set(fieldName, handler);
  }

  /**
   * Unregister block result handler.
   *
   * @param {string} fieldName - Field identifier
   * @returns {void}
   */
  unregister_block_handler(fieldName) {
    this.cartUpdateHandlers.delete(fieldName);
  }

  /**
   * Store saveStep result for use in handlers.
   *
   * @param {Object} saveStepResult - Save step result object
   * @returns {void}
   */
  set_save_step_result(saveStepResult) {
    this._saveStepResult = saveStepResult;
    
    // Auto-update cart if products are present
    if (saveStepResult?.products) {
      this.update_cart_from_save_step_result(saveStepResult);
    }
  }

  /**
   * Get stored saveStep result.
   *
   * @returns {Object|null} Save step result or null
   */
  get_save_step_result() {
    return this._saveStepResult;
  }

  /**
   * Update cart from saveStep result.
   *
   * @param {Object} saveStepResult - Save step result with products
   * @returns {boolean} True if update successful
   */
  update_cart_from_save_step_result(saveStepResult) {
    console.log(
      "🛒 [BookingFormManager] update_cart_from_save_step_result called"
    );
    console.log(
      "🛒 [BookingFormManager] Full saveStepResult:",
      saveStepResult
    );

    if (!saveStepResult?.products || !Array.isArray(saveStepResult.products)) {
      console.warn(
        "🛒 [BookingFormManager] No products in saveStepResult",
        {
          hasProducts: !!saveStepResult?.products,
          isArray: Array.isArray(saveStepResult?.products),
          saveStepResult: saveStepResult,
        }
      );
      return false;
    }

    const cartManager = this.getCart();
    const products = saveStepResult.products;

    console.log(
      `🛒 [BookingFormManager] Updating cart with ${products.length} products from server`
    );

    // Log current cart state before clearing
    const oldCartData = cartManager.getData();
    console.log("🛒 [BookingFormManager] Cart state BEFORE clear:", {
      itemCount: oldCartData.items?.length || 0,
      items: oldCartData.items || [],
      totals: {
        base_total: oldCartData.base_total,
        percentage_total: oldCartData.percentage_total,
        grand_total: oldCartData.grand_total,
      },
    });

    // Clear existing cart
    cartManager.clearCart();
    console.log("🛒 [BookingFormManager] Cart cleared");

    // Add each product from server response
    products.forEach((product, index) => {
      console.log(
        `🛒 [BookingFormManager] Processing product ${index + 1}/${products.length}:`,
        product
      );

      const {
        product_id,
        quantity = 1,
        variation_id = null,
        variation = {},
        cart_item_data = {},
        price = 0,
        step = null,
        name = "",
        field_id = null,
        row = null,
        show_in_total = false,
        included = [],
      } = product;

      // Ensure cart_item_data includes all necessary fields
      const enriched_cart_item_data = {
        ...cart_item_data,
        step: step || cart_item_data.step,
        name: name || cart_item_data.name,
        field_id: field_id || cart_item_data.field_id,
        row: row ?? cart_item_data.row,
        show_in_total: show_in_total ?? cart_item_data.show_in_total ?? true,
      };

      console.log(
        `🛒 [BookingFormManager] Product ${index + 1} enriched data:`,
        {
          product_id,
          quantity,
          variation_id,
          variation,
          enriched_cart_item_data,
          price,
        }
      );

      try {
        const cart_item_key = cartManager.addProduct(
          product_id,
          quantity,
          variation_id,
          variation,
          enriched_cart_item_data,
          price
        );

        console.log(
          `✅ [BookingFormManager] Added product ${index + 1}/${products.length}:`,
          {
            product_id,
            quantity,
            price,
            cart_item_key,
            name: enriched_cart_item_data.name,
            step: enriched_cart_item_data.step,
            included: included,
          }
        );

        // Add included products to cart
        if (Array.isArray(included) && included.length > 0) {
          console.log(
            `🔍 [BookingFormManager] Processing ${included.length} included products for product ${product_id}`
          );

          included.forEach((included_product_id, included_index) => {
            const included_cart_item_data = {
              ...enriched_cart_item_data,
              is_included: true,
              parent_product_id: product_id,
              parent_cart_item_key: cart_item_key,
            };

            try {
              const included_cart_item_key = cartManager.addProduct(
                included_product_id,
                quantity,
                null,
                {},
                included_cart_item_data,
                0
              );

              console.log(
                `✅ [BookingFormManager] Added included product ${included_index + 1}/${included.length}:`,
                {
                  included_product_id,
                  parent_product_id: product_id,
                  included_cart_item_key,
                  row: enriched_cart_item_data.row,
                  field_id: enriched_cart_item_data.field_id,
                }
              );
            } catch (error) {
              console.error(
                `🔴 [BookingFormManager] Error adding included product ${included_product_id}:`,
                error
              );
            }
          });
        }

        // Log cart state after adding this product
        const currentCartData = cartManager.getData();
        console.log(
          `🛒 [BookingFormManager] Cart state after adding product ${index + 1}:`,
          {
            itemCount: currentCartData.items?.length || 0,
            lastItem: currentCartData.items?.[currentCartData.items.length - 1],
          }
        );
      } catch (error) {
        console.error(
          `🔴 [BookingFormManager] Error adding product ${product_id}:`,
          error
        );
        console.error(
          `🔴 [BookingFormManager] Product data that caused error:`,
          product
        );
      }
    });

    // Recalculate totals
    console.log("🛒 [BookingFormManager] Recalculating totals...");
    cartManager.recalculateTotals();

    // Get final cart state
    const finalCartData = cartManager.getData();
    const finalTotals = cartManager.getTotals();

    console.log("🛒 [BookingFormManager] Cart state AFTER update:", {
      itemCount: finalCartData.items?.length || 0,
      items: finalCartData.items || [],
      totals: finalTotals,
    });

    // Notify listeners
    this.notify_listeners({
      type: "cart_updated_from_server",
      products: products,
      totals: finalTotals,
      bookingId: this.getBookingId(),
    });

    console.log(
      "✅ [BookingFormManager] Cart updated successfully. Summary:",
      {
        productsProcessed: products.length,
        itemsInCart: finalCartData.items?.length || 0,
        totals: finalTotals,
        bookingId: this.getBookingId(),
      }
    );

    return true;
  }

  /**
   * Handle block validation result and trigger handlers.
   *
   * @param {string} fieldName - Field identifier
   * @param {Object} result - Validation result
   * @returns {void}
   */
  handle_block_result(fieldName, result) {
    if (!result) return;

    // Parse value pokud je string
    let parsed_value = result.value;
    if (typeof result.value === "string" && result.value) {
      try {
        parsed_value = JSON.parse(result.value);
      } catch (e) {
        parsed_value = result.value;
      }
    }

    const context = {
      fieldName,
      result,
      value: parsed_value,
      cardManager: this.getCard(),
      userManager: this.getUser(),
      formStore: this.formStore,
      bookingId: this.getBookingId(),
      bookingFormManager: this,
      // Include saveStep result if available
      saveStepResult: this._saveStepResult,
    };

    // Pokud existuje custom handler pro tento field
    if (this.cartUpdateHandlers.has(fieldName)) {
      const hasSaveStepResult = !!this._saveStepResult;
      console.log(
        `🔔 [BookingFormManager] Calling handler for field: ${fieldName} (saveStepResult: ${
          hasSaveStepResult ? "available" : "not available"
        })`
      );
      const handler = this.cartUpdateHandlers.get(fieldName);
      handler(context);
    }

    // Notify listeners
    this.notify_listeners({
      type: "block_result",
      ...context,
    });
  }

  /**
   * Set field error.
   *
   * @param {string} fieldName - Field identifier
   * @param {string|Array} error - Error message(s)
   * @returns {void}
   */
  setFieldError(fieldName, error) {
    this.errorManager.setFieldError(fieldName, error);
  }

  /**
   * Clear field error.
   *
   * @param {string} fieldName - Field identifier
   * @returns {void}
   */
  clearFieldError(fieldName) {
    this.errorManager.clearFieldError(fieldName);
  }

  /**
   * Check if field has error.
   *
   * @param {string} fieldName - Field identifier
   * @returns {boolean} True if field has error
   */
  hasFieldError(fieldName) {
    return this.errorManager.hasFieldError(fieldName);
  }

  /**
   * Set system error.
   *
   * @param {string} errorId - Error identifier
   * @param {string} error - Error message
   * @returns {void}
   */
  setSystemError(errorId, error) {
    this.errorManager.setSystemError(errorId, error);
  }

  /**
   * Clear system error.
   *
   * @param {string} errorId - Error identifier
   * @returns {void}
   */
  clearSystemError(errorId) {
    this.errorManager.clearSystemError(errorId);
  }

  /**
   * Add global error.
   *
   * @param {string|Object} error - Error message or error object
   * @returns {number|null} Error ID or null
   */
  addGlobalError(error) {
    return this.errorManager.addGlobalError(error);
  }

  /**
   * Remove global error.
   *
   * @param {number} errorId - Error ID
   * @returns {void}
   */
  removeGlobalError(errorId) {
    this.errorManager.removeGlobalError(errorId);
  }

  /**
   * Clear all global errors.
   *
   * @returns {void}
   */
  clearAllGlobalErrors() {
    this.errorManager.clearAllGlobalErrors();
  }

  /**
   * Validate field value.
   *
   * @param {string} fieldName - Field identifier
   * @param {mixed} value - Field value
   * @param {Object} rules - Validation rules
   * @returns {boolean} True if valid
   */
  validateField(fieldName, value, rules = {}) {
    return this.errorManager.validateField(fieldName, value, rules);
  }

  /**
   * Clear all errors and reset form store.
   *
   * @returns {void}
   */
  clearAllErrors() {
    this.errorManager.clearAllErrors();
    this.formStore.reset();
  }

  /**
   * Scroll to field error element.
   *
   * @param {string} fieldName - Field identifier
   * @returns {void}
   */
  scrollToError(fieldName) {
    this.errorManager.scrollToError(fieldName);
  }

  /**
   * Scroll to booking header.
   *
   * @returns {void}
   */
  scrollToHeader() {
    this.errorManager.scrollToHeader();
  }

  /**
   * Initialize step validation with sections and form data.
   *
   * @param {number} step - Step number
   * @param {Object} sections - Sections object indexed by step
   * @param {Object} formData - Form data object
   * @returns {void}
   */
  initializeStepValidation(step, sections, formData = {}) {
    this._sections = sections;
    if (!sections[step] || sections[step].length === 0) {
      this.stepValidation.set(step, {
        fields: new Map(),
        isStepValid: false,
      });
      return;
    }

    const stepFields = new Map();

    // Process each block in the step
    sections[step].forEach((block, index) => {
      const fieldId = block.attrs?.field_id;
      if (!fieldId) {
        return;
      }
      const rules = block.attrs?.rules || {};
      const hasRules = Object.keys(rules).length > 0;
      // Check both formData prop AND internal formStore (for values set by components before step init)
      const currentValue = formData[fieldId] ?? this.get_field_value(fieldId);
      const hasValue =
        currentValue !== undefined &&
        currentValue !== null &&
        currentValue !== "";

      // Determine initial validity
      let isValid;
      if (!hasRules) {
        // No rules = valid ONLY if has value (field must be filled)
        isValid = hasValue;
      } else if (!hasValue) {
        // Has rules but no value = invalid
        isValid = false;
      } else {
        // Has rules and value - check if already validated
        // Initially set to false, will be updated after validation
        isValid = false;
        // Trigger validation for existing value
        this.validate_existing_field(fieldId, currentValue, rules);
      }

      stepFields.set(fieldId, {
        isValid: isValid,
        hasRules: hasRules,
        hasValue: hasValue,
        rules: rules,
        blockName: block.blockName,
        blockIndex: index,
      });
    });

    // Calculate step validity
    const isStepValid = Array.from(stepFields.values()).every(
      (field) => field.isValid
    );

    this.stepValidation.set(step, {
      fields: stepFields,
      isStepValid: isStepValid,
    });

    this.notify_listeners({
      type: "step_validation_initialized",
      step: step,
      isStepValid: isStepValid,
      bookingId: this.getBookingId(),
    });
  }

  /**
   * Validate existing field value.
   *
   * @param {string} fieldId - Field identifier
   * @param {mixed} value - Field value
   * @param {Object} rules - Validation rules
   * @returns {Promise<void>}
   */
  async validate_existing_field(fieldId, value, rules) {
    // Trigger validation for existing value
    await this.handle_input_change(fieldId, value, rules, "system");
  }

  /**
   * Set field validation state.
   *
   * @param {string} fieldId - Field identifier
   * @param {boolean} isValid - Whether field is valid
   * @returns {void}
   */
  setFieldValid(fieldId, isValid) {
    // Find which step contains this field
    for (const [step, stepData] of this.stepValidation.entries()) {
      if (stepData.fields.has(fieldId)) {
        const field = stepData.fields.get(fieldId);
        field.isValid = isValid;
        stepData.fields.set(fieldId, field);

        // Recalculate step validity
        const isStepValid = Array.from(stepData.fields.values()).every(
          (field) => field.isValid
        );
        stepData.isStepValid = isStepValid;

        this.notify_listeners({
          type: "field_validation_changed",
          fieldId: fieldId,
          isValid: isValid,
          step: step,
          isStepValid: isStepValid,
          bookingId: this.getBookingId(),
        });

        break;
      }
    }
  }

  /**
   * Check if step is valid.
   *
   * @param {number} step - Step number
   * @returns {boolean} True if step is valid
   */
  isStepValid(step) {
    const stepData = this.stepValidation.get(step);
    const isValid = stepData ? stepData.isStepValid : false;
    return isValid;
  }

  /**
   * Get step validation state.
   *
   * @param {number} step - Step number
   * @returns {Object} Step validation state object
   */
  getStepValidationState(step) {
    return (
      this.stepValidation.get(step) || {
        fields: new Map(),
        isStepValid: false,
      }
    );
  }

  /**
   * Get field validation state.
   *
   * @param {string} fieldId - Field identifier
   * @returns {Object|null} Field validation state or null
   */
  getFieldValidationState(fieldId) {
    for (const [step, stepData] of this.stepValidation.entries()) {
      if (stepData.fields.has(fieldId)) {
        return {
          ...stepData.fields.get(fieldId),
          step: step,
        };
      }
    }
    return null;
  }

  /**
   * Clear step validation state.
   *
   * @param {number} step - Step number
   * @returns {void}
   */
  clearStepValidation(step) {
    this.stepValidation.delete(step);
    this.notify_listeners({
      type: "step_validation_cleared",
      step: step,
      bookingId: this.getBookingId(),
    });
  }

  /**
   * Clear all step validation states.
   *
   * @returns {void}
   */
  clearAllStepValidation() {
    this.stepValidation.clear();
    this.notify_listeners({
      type: "all_step_validation_cleared",
      bookingId: this.getBookingId(),
    });
  }
}

/**
 * React hook for BookingFormManager.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param {number|string} bookingId - Booking post ID
 * @param {Object} errorManager - Error manager instance
 * @param {Object} config - Configuration object
 * @returns {Object} Manager instance and methods
 */
export const useBookingFormManager = (bookingId, errorManager, config = {}) => {
  const manager = new BookingFormManager(bookingId, errorManager, config);

  return {
    manager,
    handleInputChange: (fieldName, newValue, source) =>
      manager.handle_input_change(fieldName, newValue, source),
    getFormState: () => manager.get_form_state(),
    getFieldValue: (fieldName) => manager.get_field_value(fieldName),
    getFieldError: (fieldName) => manager.get_field_error(fieldName),
    getAllErrors: () => manager.get_all_errors(),
    hasErrors: () => manager.has_errors(),
    addListener: (listener) => manager.add_listener(listener),
    removeListener: (listener) => manager.remove_listener(listener),
    getStats: () => manager.get_stats(),
    cleanup: () => manager.cleanup(),
    reset: () => manager.reset(),
    // ErrorManager methods
    setFieldError: (fieldName, error) =>
      manager.setFieldError(fieldName, error),
    clearFieldError: (fieldName) => manager.clearFieldError(fieldName),
    hasFieldError: (fieldName) => manager.hasFieldError(fieldName),
    setSystemError: (errorId, error) => manager.setSystemError(errorId, error),
    clearSystemError: (errorId) => manager.clearSystemError(errorId),
    addGlobalError: (error) => manager.addGlobalError(error),
    removeGlobalError: (errorId) => manager.removeGlobalError(errorId),
    clearAllGlobalErrors: () => manager.clearAllGlobalErrors(),
    validateField: (fieldName, value, rules) =>
      manager.validateField(fieldName, value, rules),
    clearAllErrors: () => manager.clearAllErrors(),
    scrollToError: (fieldName) => manager.scrollToError(fieldName),
    scrollToHeader: () => manager.scrollToHeader(),
    // Step validation methods
    initializeStepValidation: (step, sections, formData) =>
      manager.initializeStepValidation(step, sections, formData),
    setFieldValid: (fieldId, isValid) =>
      manager.setFieldValid(fieldId, isValid),
    isStepValid: (step) => manager.isStepValid(step),
    getStepValidationState: (step) => manager.getStepValidationState(step),
    getFieldValidationState: (fieldId) =>
      manager.getFieldValidationState(fieldId),
    clearStepValidation: (step) => manager.clearStepValidation(step),
    clearAllStepValidation: () => manager.clearAllStepValidation(),
    // Cart update methods
    updateCartFromSaveStepResult: (saveStepResult) =>
      manager.update_cart_from_save_step_result(saveStepResult),
  };
};

export const createBookingFormManager = (
  bookingId,
  quoteHash,
  errorManager,
  config = {}
) => {
  if (!bookingId) {
    return new BookingFormManager(bookingId, quoteHash, errorManager, config);
  }
  if (__validation_managers_by_booking.has(bookingId)) {
    return __validation_managers_by_booking.get(bookingId);
  }
  const manager = new BookingFormManager(
    bookingId,
    quoteHash,
    errorManager,
    config
  );
  __validation_managers_by_booking.set(bookingId, manager);
  return manager;
};

export default BookingFormManager;
