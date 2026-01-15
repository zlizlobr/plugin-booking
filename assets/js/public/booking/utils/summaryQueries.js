import { __ } from "@wordpress/i18n";
import { patchDraft } from "./storage.js";

/**
 * GraphQL queries for summary data.
 * Contains all query strings used for fetching booking form and quote data.
 *
 * @package Wpcbooking
 * @since 1.0.0
 * @type {Object}
 */
export const SUMMARY_QUERIES = {
  // Get summary data for a specific form
  GET_SUMMARY_DATA: `
    query GetSummaryData($formId: ID!) {
      form(id: $formId) {
        id
        title
        formOptions {
          prev
          next
          submit
        }
        summaryOptions {
          text
          label_price
          label_total
          send_button_text
          send_button_icon
          show_calculations
          terms
        }
        blocks {
          step
          data {
            title
            label_summary
            thumbnail_id
          }
          innerBlocks {
            key
            value
            price
            price_increase {
              operation
              price_increase
            }
            inputs {
              name
              value
            }
            render_data
          }
          price_step
          value_step
          item_output
        }
        quote {
          id
          currency
          total_base
          total_quote
          shipping_total
          cart_total
        }
      }
    }
  `,

  // Get quote data by hash
  GET_QUOTE_BY_HASH: `
    query GetQuoteByHash($quoteHash: String!) {
      quoteByHash(hash: $quoteHash) {
        id
        currency
        total_base
        total_quote
        shipping_total
        cart_total
        form_id
        blocks {
          step
          data {
            title
            label_summary
            thumbnail_id
          }
          innerBlocks {
            key
            value
            price
            price_increase {
              operation
              price_increase
            }
            inputs {
              name
              value
            }
            render_data
          }
          price_step
          value_step
          item_output
        }
      }
    }
  `,

  // Get form options
  GET_FORM_OPTIONS: `
    query GetFormOptions($formId: ID!) {
      form(id: $formId) {
        id
        formOptions {
          prev
          next
          submit
        }
      }
    }
  `,

  // Get summary options
  GET_SUMMARY_OPTIONS: `
    query GetSummaryOptions($formId: ID!) {
      form(id: $formId) {
        id
        summaryOptions {
          text
          label_price
          label_total
          send_button_text
          send_button_icon
          show_calculations
          terms
        }
      }
    }
  `,

  // Get blocks data
  GET_BLOCKS_DATA: `
    query GetBlocksData($formId: ID!) {
      form(id: $formId) {
        id
        blocks {
          step
          data {
            title
            label_summary
            thumbnail_id
          }
          innerBlocks {
            key
            value
            price
            price_increase {
              operation
              price_increase
            }
            inputs {
              name
              value
            }
            render_data
          }
          price_step
          value_step
          item_output
        }
      }
    }
  `,

  // Get currency information
  GET_CURRENCY_INFO: `
    query GetCurrencyInfo($quoteId: ID!) {
      quote(id: $quoteId) {
        id
        currency
        currency_symbol
        currency_code
      }
    }
  `,
};

/**
 * GraphQL mutations for summary data.
 * Contains all mutation strings used for updating and submitting quotes.
 *
 * @package Wpcbooking
 * @since 1.0.0
 * @type {Object}
 */
export const SUMMARY_MUTATIONS = {
  // Update quote data
  UPDATE_QUOTE_DATA: `
    mutation UpdateQuoteData($quoteId: ID!, $data: QuoteDataInput!) {
      updateQuote(id: $quoteId, data: $data) {
        success
        quote {
          id
          total_quote
          total_base
          shipping_total
          cart_total
        }
        errors
      }
    }
  `,

  // Submit order
  SUBMIT_ORDER: `
    mutation SubmitQuote($input: SubmitQuoteInput!) {
      submitQuote(input: $input) {
        success
        quote_id
        errors
      }
    }
  `,
};

/**
 * Summary data fetcher class.
 * Handles GraphQL queries and mutations for booking summary data.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
export class SummaryDataFetcher {
  /**
   * Creates an instance of SummaryDataFetcher.
   *
   * @param {Object} config - Configuration object
   * @param {string} [config.endpoint] - GraphQL endpoint URL
   * @param {number} [config.timeout] - Request timeout in milliseconds
   * @param {number|string} [config.bookingId] - Booking post ID
   * @param {string} [config.quoteHash] - Quote hash
   * @param {Object} [config.errorManager] - Error manager instance
   */
  constructor(config = {}) {
    this.config = {
      endpoint: "/graphql",
      timeout: 10000,
      ...config,
    };
    this.bookingId = config.bookingId || null;
    this.quoteHash = config.quoteHash || null;
    this.errorManager = config.errorManager || null;
  }
  /**
   * Execute GraphQL query.
   *
   * @param {string} query - GraphQL query string
   * @param {Object} variables - Query variables
   * @returns {Promise<Object>} GraphQL response data
   * @throws {Error} If query execution fails
   */
  async executeQuery(query, variables = {}) {
    const queryName = query.trim().split(/\s+/)[1] || "Unknown";

    try {
      const requestBody = {
        query,
        variables,
      };

      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(
          `❌ [SummaryDataFetcher] HTTP error! status: ${response.status}`
        );
        throw new Error(
          __("HTTP error! status: ${response.status}", "wpcbooking")
        );
      }

      const result = await response.json();

      if (result.errors) {
        console.log("🔍 [SummaryDataFetcher] result: ", result);
        const errorMessages = result.errors.map((err) => err.message);
        console.error(`❌ [SummaryDataFetcher] GraphQL errors:`, result.errors);

        const graphqlError = new Error(errorMessages.join(", "));
        graphqlError.graphqlErrors = result.errors;
        throw graphqlError;
      }

      return result.data;
    } catch (error) {
      console.error(`❌ [SummaryDataFetcher] Query execution failed:`, error);
      console.error(`❌ [SummaryDataFetcher] Error stack:`, error.stack);
      throw error;
    }
  }

  /**
   * Get complete summary data for a form.
   *
   * @param {number|string} formId - Form post ID
   * @returns {Promise<Object>} Summary data object
   */
  async getSummaryData(formId) {
    return await this.executeQuery(SUMMARY_QUERIES.GET_SUMMARY_DATA, {
      formId,
    });
  }

  /**
   * Get quote data by hash.
   *
   * @param {string} quoteHash - Quote hash identifier
   * @returns {Promise<Object>} Quote data object
   */
  async getQuoteByHash(quoteHash) {
    return await this.executeQuery(SUMMARY_QUERIES.GET_QUOTE_BY_HASH, {
      quoteHash,
    });
  }

  /**
   * Get form options.
   *
   * @param {number|string} formId - Form post ID
   * @returns {Promise<Object>} Form options object
   */
  async getFormOptions(formId) {
    return await this.executeQuery(SUMMARY_QUERIES.GET_FORM_OPTIONS, {
      formId,
    });
  }

  /**
   * Get summary options.
   *
   * @param {number|string} formId - Form post ID
   * @returns {Promise<Object>} Summary options object
   */
  async getSummaryOptions(formId) {
    return await this.executeQuery(SUMMARY_QUERIES.GET_SUMMARY_OPTIONS, {
      formId,
    });
  }

  /**
   * Get blocks data.
   *
   * @param {number|string} formId - Form post ID
   * @returns {Promise<Object>} Blocks data object
   */
  async getBlocksData(formId) {
    return await this.executeQuery(SUMMARY_QUERIES.GET_BLOCKS_DATA, { formId });
  }

  /**
   * Get currency information.
   *
   * @param {number|string} quoteId - Quote post ID
   * @returns {Promise<Object>} Currency information object
   */
  async getCurrencyInfo(quoteId) {
    return await this.executeQuery(SUMMARY_QUERIES.GET_CURRENCY_INFO, {
      quoteId,
    });
  }

  /**
   * Update quote data.
   *
   * @param {number|string} quoteId - Quote post ID
   * @param {Object} data - Quote data to update
   * @returns {Promise<Object>} Update result
   */
  async updateQuoteData(quoteId, data) {
    return await this.executeQuery(SUMMARY_MUTATIONS.UPDATE_QUOTE_DATA, {
      quoteId,
      data,
    });
  }

  /**
   * Parse summary data JSON string.
   *
   * @param {string} summaryDataString - JSON string to parse
   * @returns {Object|null} Parsed data or null if parsing fails
   */
  parseSummaryData(summaryDataString) {
    if (!summaryDataString) {
      console.log("📦 [saveStep] No summaryData to parse");
      return null;
    }

    try {
      const parsed = JSON.parse(summaryDataString);
      console.log("✅ [saveStep] Parsed summaryData successfully");
      return parsed;
    } catch (e) {
      console.error("❌ [saveStep] Failed to parse summaryData:", e);
      return null;
    }
  }

  /**
   * Extract total price from parsed summary data.
   *
   * @param {Object} parsedSummaryData - Parsed summary data object
   * @returns {number} Total price or 0 if not available
   */
  extractTotalPrice(parsedSummaryData) {
    if (!parsedSummaryData || parsedSummaryData.total_price === undefined) {
      console.log("📦 [saveStep] No total_price in summaryData");
      return 0;
    }
    const totalPrice = parseFloat(parsedSummaryData.total_price) || 0;
    console.log(`💰 [saveStep] Extracted total_price: ${totalPrice}`);
    return totalPrice;
  }

  /**
   * Build draft data object for storage.
   *
   * @param {number} step - Step number
   * @param {Object} formData - Form data
   * @param {Object|null} parsedSummaryData - Parsed summary data
   * @param {Object} saveStepResult - Save step result from backend
   * @returns {Object} Draft data object
   */
  buildDraftData(step, formData, parsedSummaryData, saveStepResult) {
    const draftData = {
      step: step,
      formData: formData,
    };

    if (parsedSummaryData) {
      draftData.summaryData = parsedSummaryData.summary_data;
    } else if (saveStepResult.summaryData) {
      // Fallback to raw summaryData if parsing failed
      draftData.summaryData = saveStepResult.summaryData;
    }

    return draftData;
  }

  /**
   * Process successful save step result.
   *
   * @param {Object} saveStepResult - Save step result from backend
   * @param {number} step - Step number
   * @param {Object} formData - Form data
   * @returns {Promise<Object>} Processed result with products and total_price
   */
  async processSaveStepSuccess(saveStepResult, step, formData) {
    const parsedSummaryData = this.parseSummaryData(saveStepResult.summaryData);

    let products = {};
    let total_price = 0;

    if (parsedSummaryData) {
      if (
        parsedSummaryData.products &&
        Array.isArray(parsedSummaryData.products)
      ) {
        products = parsedSummaryData.products;
      }
      total_price = this.extractTotalPrice(parsedSummaryData);
    }

    // Build draft data
    const draftData = this.buildDraftData(
      step,
      formData,
      parsedSummaryData,
      saveStepResult
    );

    // Save draft
    await patchDraft(this.bookingId, draftData);

    const result = {
      success: true,
      data: saveStepResult,
      products: products,
      total_price: total_price,
    };

    return result;
  }

  /**
   * Save step with full error handling and draft storage
   * Universal method that handles all error types and returns complete result
   *
   * @param {number} step - Step number to save
   * @param {Object} formData - Form data to save
   * @param {Object} options - Additional options
   * @param {boolean} options.autoHandleErrors - Automatically add errors to errorManager (default: true)
   * @returns {Promise<{success: boolean, errors?: Object|Array, data?: Object}>}
   */
  async saveStep(step, formData, options = {}) {
    const { autoHandleErrors = true } = options;
    console.log(`📤 [saveStep] Starting save for step ${step}`);
    try {
      const formDataString = JSON.stringify(formData);

      const variables = {
        bookingId: this.bookingId,
        step: step,
        formData: formDataString,
        quoteHash: this.quoteHash || null,
      };

      const requestBody = {
        query: `
          mutation SaveStep($bookingId: String!, $step: Int!, $formData: String!, $quoteHash: String) {
            saveStep(input: {
              bookingId: $bookingId
              step: $step
              formData: $formData
              quoteHash: $quoteHash
              }) {
              success
              summaryData
              errors
            }
          }
        `,
        variables: variables,
      };

      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (result.errors) {
        console.error(
          "🔴 [SummaryDataFetcher.saveStep] GraphQL errors:",
          result.errors
        );
        const errorMessages = result.errors.map((err) => err.message);

        if (autoHandleErrors && this.errorManager) {
          this.errorManager.addGlobalError({
            message: errorMessages.join(", "),
            type: "error",
          });
        }

        return { success: false, errors: errorMessages };
      }

      if (!response.ok) {
        console.error(
          "🔴 [SummaryDataFetcher.saveStep] HTTP error! status:",
          response.status
        );
        const httpError = __(
          "HTTP error! status: ${response.status}",
          "wpcbooking"
        );

        if (autoHandleErrors && this.errorManager) {
          this.errorManager.addGlobalError({
            message: httpError,
            type: "error",
          });
        }

        return { success: false, errors: [httpError] };
      }

      if (result.data?.saveStep?.success) {
        const saveStepResult = result.data.saveStep;
        return await this.processSaveStepSuccess(
          saveStepResult,
          step,
          formData
        );
      } else {
        console.error(
          "🔴 [SummaryDataFetcher.saveStep] Mutation returned success: false"
        );
        let errors = [__("Unknown error occurred", "wpcbooking")];

        if (result.data?.saveStep?.errors) {
          try {
            errors = JSON.parse(result.data.saveStep.errors);
          } catch (e) {
            errors = [result.data.saveStep.errors];
          }
        }

        console.error("🔴 [SummaryDataFetcher.saveStep] Errors:", errors);

        if (autoHandleErrors && this.errorManager) {
          if (typeof errors === "object" && !Array.isArray(errors)) {
            Object.keys(errors).forEach((fieldId) => {
              const errorMessage = errors[fieldId];
              const message = Array.isArray(errorMessage)
                ? errorMessage.join(", ")
                : errorMessage;
              this.errorManager.setFieldError(fieldId, message);
            });
          } else if (Array.isArray(errors)) {
            this.errorManager.addGlobalError({
              message: errors.join(", "),
              type: "error",
            });
          }
        }

        return { success: false, errors: errors };
      }
    } catch (error) {
      console.error("🔴 [SummaryDataFetcher.saveStep] Exception:", error);
      console.error(
        "🔴 [SummaryDataFetcher.saveStep] Error stack:",
        error.stack
      );

      if (autoHandleErrors && this.errorManager) {
        this.errorManager.addGlobalError({
          message: __("Error saving step. Please try again.", "wpcbooking"),
          type: "error",
        });
      }

      return { success: false, errors: [error.message] };
    }
  }

  /**
   * Submit quote order.
   *
   * @param {string} quoteHash - Quote hash identifier
   * @param {number|string} bookingId - Booking post ID
   * @param {Array} termsConditions - Terms and conditions array
   * @param {Object|null} formData - Optional form data
   * @returns {Promise<Object>} Submit result
   */
  async submitQuote(quoteHash, bookingId, termsConditions, formData = null) {
    const input = {
      quoteHash,
      bookingId,
      termsConditions,
    };

    if (formData) {
      input.formData = JSON.stringify(formData);
    }

    const result = await this.executeQuery(SUMMARY_MUTATIONS.SUBMIT_ORDER, {
      input,
    });

    return result;
  }

  /**
   * Submit quote and process result with thank you page data.
   *
   * @param {string} quote_hash - Quote hash identifier
   * @param {number|string} booking_id - Booking post ID
   * @param {Array} terms_conditions - Terms and conditions array
   * @param {Object} form_data - Form data
   * @param {Object} summary_options - Summary options
   * @param {Object} general - General options
   * @returns {Promise<Object>} Processed submit result with order data
   */
  async submit_quote_and_process(
    quote_hash,
    booking_id,
    terms_conditions,
    form_data,
    summary_options,
    general
  ) {
    try {
      const submit_result = await this.submitQuote(
        quote_hash,
        booking_id,
        terms_conditions,
        form_data
      );

      if (submit_result?.submitQuote?.success === true) {
        return {
          success: true,
          order_data: {
            quote_id: submit_result.submitQuote.quote_id,
            heading:
              summary_options.thankyou_heading ||
              general?.group_thankyou?.heading,
            text:
              summary_options.thankyou_text || general?.group_thankyou?.text,
            background_image:
              summary_options.thankyou_image ||
              general?.group_thankyou?.image_id,
            button_link:
              summary_options.thankyou_button_link ||
              general?.group_thankyou?.button_link,
            button_label:
              summary_options.thankyou_button_label ||
              general?.group_thankyou?.button_label,
          },
          errors: null,
        };
      } else {
        console.error(
          "❌ [SummaryDataFetcher] submit_quote_and_process: ",
          submit_result
        );
        const errors = submit_result?.submitQuote?.errors || [
          __("Order submission failed", "wpcbooking"),
        ];
        return {
          success: false,
          order_data: null,
          errors: Array.isArray(errors) ? errors : [errors],
        };
      }
    } catch (error) {
      console.error(
        "❌ [SummaryDataFetcher] submit_quote_and_process error: ",
        error
      );
      const errors = error.graphqlErrors
        ? error.graphqlErrors.map((err) => err.message)
        : [error.message || __("Order submission failed", "wpcbooking")];

      return {
        success: false,
        order_data: null,
        errors: errors,
      };
    }
  }
}

/**
 * Default summary data fetcher instance.
 *
 * @package Wpcbooking
 * @since 1.0.0
 * @type {SummaryDataFetcher}
 */
export const defaultSummaryDataFetcher = new SummaryDataFetcher();

/**
 * Hook for using summary data fetcher.
 *
 * @param {Object} config - Configuration object
 * @returns {SummaryDataFetcher} SummaryDataFetcher instance
 */
export const useSummaryDataFetcher = (config = {}) => {
  return new SummaryDataFetcher(config);
};

export default SummaryDataFetcher;
