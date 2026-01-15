/**
 * Base Form Handler for wpcbooking forms.
 * Handles common form submission logic and error display.
 * 
 * @package Wpcbooking
 * @since 1.0.0
 */
class BaseFormHandler {
  /**
   * Initialize base form handler.
   *
   * @param {HTMLElement} eventButton - Button element that triggers form submission
   */
  constructor(eventButton) {
    this.eventButton = eventButton;
    this.form = eventButton.closest("form");
    this.init();
  }

  /**
   * Initialize event listeners
   */
  init() {
    this.eventButton.addEventListener("click", (e) => {
      this.handleSubmit(e);
    });
  }

  /**
   * Handle form submission - must be implemented by child class
   * @param {Event} e - Submit event
   */
  async handleSubmit(e) {
    throw new Error("handleSubmit() must be implemented by child class");
  }

  /**
   * Display or update error message for a field
   * @param {string} field - Field identifier or class name
   * @param {string} errorMessage - Error message to display
   */
  displayErrors(field, errorMessage) {
    let fieldContainer = document.querySelector(`[name="${field}"]`);
    let parentContainer;
    
    if (!fieldContainer) {
      parentContainer = document.querySelector(`.${field}`);
    } else {
      parentContainer = fieldContainer.parentElement;
    }

    if (parentContainer) {
      let errorDiv = parentContainer.querySelector(
        ".acf-error.acf-notice.-error.acf-error-message.error"
      );
      
      if (errorDiv) {
        errorDiv.textContent = errorMessage;
      } else {
        errorDiv = document.createElement("div");
        errorDiv.className = "acf-error acf-notice -error acf-error-message error";
        errorDiv.textContent = errorMessage;
        parentContainer.appendChild(errorDiv);
      }
    } else {
      console.error(`Field container not found for: ${field}`, errorMessage);
    }
  }

  /**
   * Clear all error messages from form
   */
  clearErrors() {
    document
      .querySelectorAll(".acf-error.acf-notice.-error.acf-error-message.error")
      .forEach((errorDiv) => {
        errorDiv.remove();
      });
  }

  /**
   * Get all form field values
   * @returns {Object} Field names and values
   */
  getFieldValues() {
    const fields = {};
    const formInputs = this.form.querySelectorAll("input, select");
    
    formInputs.forEach((input) => {
      if (input.name && input.value) {
        if (input.type === "checkbox") {
          fields[input.name] = input.checked;
        } else {
          fields[input.name] = input.value;
        }
      }
    });

    return fields;
  }

  /**
   * Format fields for GraphQL mutation
   * @param {Object} fields - Collected form fields
   * @returns {Array<string>} Formatted fields for mutation
   */
  formatFieldsForMutation(fields) {
    const formattedFields = [];

    for (const [key, value] of Object.entries(fields)) {
      if (!value && value !== false && value !== 0) continue;

      if (typeof value === "boolean") {
        formattedFields.push(`${key}:${value}`);
      } else if (Array.isArray(value)) {
        formattedFields.push(`${key}:${value.join(",")}`);
      } else {
        formattedFields.push(`${key}:${value}`);
      }
    }

    return formattedFields;
  }
}

export { BaseFormHandler };

