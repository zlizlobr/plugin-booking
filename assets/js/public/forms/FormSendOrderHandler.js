/**
 * Form Send Order Handler
 * Handles order submission from quote page
 * 
 * @package Wpcbooking
 * @since 1.0.0
 */

import { BaseFormHandler } from "./BaseFormHandler";

/**
 * Form handler for sending orders from quote page.
 * Extends BaseFormHandler with order-specific logic.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class FormSendOrderHandler extends BaseFormHandler {
  /**
   * Initialize order form handler.
   *
   * @param {HTMLElement} eventButton - Button element that triggers order creation
   */
  constructor(eventButton) {
    super(eventButton);
    
    const checkout = document.getElementById("wpcbooking_form_send_order");
    if (!checkout) return;
    
    this.cart = checkout.querySelector("#cart");
    this.i18n = window.wpcbookingData?.i18n || {};
    
    this.paymentMethod();
    
    this.mutation = `
      mutation createOrderBooking($quoteID: Int!, $fields: [String!]) {
        createOrderBooking(input: {
          quoteID: $quoteID
          fields: $fields
        }) {
          success
          orderId
          checkoutPaymentUrl
          viewOrderUrl
          errors
        }
      }
    `;
  }

  /**
   * Handle form submission for order creation.
   *
   * @param {Event} e - Submit event
   * @returns {Promise<void>}
   */
  async handleSubmit(e) {
    e.preventDefault();
    this.clearErrors();
    
    if (!this.validateRequiredInputs() || !this.checkTermsConditions()) {
      this.smoothScrollToFirstError();
      return;
    }

    const submitButton = this.eventButton;
    submitButton.disabled = true;
    submitButton.classList.add("loading");
    
    const fields = this.getFieldValues();
    
    try {
      const mutationData = await this.sendGraphQLMutation({
        quoteID: parseInt(fields["quote_id"] ?? 0),
        fields: this.formatFieldsForMutation(fields) ?? [],
      });
      
      if (mutationData.success) {
        const PaymentUrl = mutationData.checkoutPaymentUrl;
        if (PaymentUrl) {
          window.location.href = PaymentUrl;
        }
      } else if (mutationData?.errors) {
        if (Array.isArray(mutationData.errors)) {
          mutationData.errors.forEach((errorMessage) => {
            console.error(`Error: ${errorMessage}`);
            this.displayErrors("order-errors", errorMessage);
          });
        } else {
          Object.entries(mutationData.errors).forEach(([key, message]) => {
            console.error(`Error in ${key}: ${message}`);
            this.displayErrors(key, message);
          });
        }
        this.smoothScrollToFirstError();
      } else {
        console.error("GraphQL Mutation failed:", mutationData.message);
      }
    } catch (error) {
      console.error("Error sending GraphQL mutation:", error);
      this.displayErrors("order-errors", error.message || error);
      this.smoothScrollToFirstError();
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
    }
  }

  /**
   * Smooth scroll to first error element in form.
   *
   * @returns {void}
   */
  smoothScrollToFirstError() {
    const errorElements = document.querySelectorAll(".acf-error");
    if (errorElements.length > 0) {
      const firstErrorElement = errorElements[0];
      setTimeout(() => {
        const offsetFromTop = 100;
        const elementPosition = firstErrorElement.getBoundingClientRect().top;
        const scrollToPosition = elementPosition + window.pageYOffset - offsetFromTop;

        window.scrollTo({
          top: scrollToPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  }

  /**
   * Validate all required input fields in form.
   *
   * @returns {boolean} True if all required fields are valid
   */
  validateRequiredInputs() {
    let isValid = true;
    const requiredFields = document.querySelectorAll(".form-row.validate-required");
    
    requiredFields.forEach((field) => {
      const input = field.querySelector("input, select");
      if (input) {
        let isEmpty = false;
        
        if (input.tagName === "SELECT") {
          isEmpty = !input.value;
        } else if (input.type === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isEmpty = !input.value || !emailPattern.test(input.value);
        } else {
          isEmpty = !input.value || input.value.trim() === "";
        }
        
        if (isEmpty) {
          isValid = false;
          const fieldLabel = field.querySelector("label");
          const fieldName = fieldLabel
            ? fieldLabel.textContent.replace(/\*|\(optional\)/g, "").trim()
            : "field";
          const errorMessage = (
            this.i18n?.is_required || "{field} is required."
          ).replace("{field}", fieldName);
          this.displayErrors(input.name, errorMessage);
        }
      }
    });
    
    return isValid;
  }

  /**
   * Check if all required checkboxes (terms and conditions) are checked.
   *
   * @returns {boolean} True if all required checkboxes are checked
   */
  checkTermsConditions() {
    let allChecked = true;
    
    document
      .querySelectorAll('input[type="checkbox"][required]')
      .forEach((checkbox) => {
        if (!checkbox.checked) {
          allChecked = false;
          this.displayErrors(
            checkbox.name,
            checkbox.getAttribute("data-label-required") || "This field is required."
          );
        }
      });
    
    return allChecked;
  }

  /**
   * Setup payment method selection handlers.
   * Auto-selects first payment method if none selected.
   *
   * @returns {void}
   */
  paymentMethod() {
    const radioButtons = document.querySelectorAll(
      'input[type="radio"][name="payment_method"]'
    );
    const cart = this.cart;
    
    // Auto-select first payment method if none selected
    const anyChecked = Array.from(radioButtons).some((radio) => radio.checked);
    if (!anyChecked && radioButtons.length > 0) {
      radioButtons[0].checked = true;
    }
    
    // Handle payment method change
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.checked && cart) {
          cart.classList.add("loading");
          setTimeout(() => {
            cart.classList.remove("loading");
          }, 300);
        }
      });
    });
  }

  /**
   * Send GraphQL mutation for order creation.
   *
   * @param {Object} variables - Variables for the mutation (quoteID, fields)
   * @returns {Promise<Object>} GraphQL response with order data
   */
  async sendGraphQLMutation(variables) {
    try {
      const response = await fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          query: this.mutation,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      
      return result.data.createOrderBooking;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Handle GraphQL errors during order creation.
   *
   * @param {Error} error - Error object
   * @returns {void}
   */
  handleError(error) {
    console.error("❌ GraphQL error:", error);
    this.displayErrors(
      "order-errors",
      "An error occurred while processing. Please try again."
    );
    this.smoothScrollToFirstError();
    
    this.eventButton.disabled = false;
    this.eventButton.classList.remove("loading");
  }
}

/**
 * Initialize order creation handler.
 * Sets up FormSendOrderHandler for order creation button.
 *
 * @returns {void}
 */
const createOrder = () => {
  const createButton = document.getElementById("wpcbooking_create_order");
  if (createButton) {
    new FormSendOrderHandler(createButton);
  }
};

export { FormSendOrderHandler, createOrder };

