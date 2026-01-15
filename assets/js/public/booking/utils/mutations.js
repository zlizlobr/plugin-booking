import { useRef, useCallback } from 'preact/hooks';
import { loadDraft, patchDraft, clearDraft } from './storage.js';
import { __ } from '@wordpress/i18n';

/**
 * Default mutation configuration.
 *
 * @type {Object}
 */
const MUTATION_CONFIG = {
  endpoint: '/graphql',
  defaultDelay: 1000,
  timeout: 10000
};

/**
 * Mutation manager for handling GraphQL mutations.
 * Manages validation and saving of block data via GraphQL.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
export class MutationManager {
  /**
   * Creates an instance of MutationManager.
   *
   * @param {Object} config - Configuration object
   * @param {string} [config.endpoint] - GraphQL endpoint URL
   * @param {number} [config.defaultDelay] - Default delay in milliseconds
   * @param {number} [config.timeout] - Request timeout in milliseconds
   */
  constructor(config = {}) {
    this.config = { ...MUTATION_CONFIG, ...config };
  }

  /**
   * Trigger mutation with delay.
   *
   * @param {string} field_id - Field identifier
   * @param {mixed} value - Field value
   * @param {Object} options - Mutation options
   * @param {string} [options.blockName] - Block name
   * @param {string} [options.quoteHash] - Quote hash
   * @param {number} [options.delay] - Delay in milliseconds
   * @param {Function} [options.onSuccess] - Success callback
   * @param {Function} [options.onError] - Error callback
   * @returns {void}
   */
  trigger_mutation(field_id, value, options = {}) {
    const {
      blockName = field_id,
      quoteHash = '',
      delay = this.config.defaultDelay,
      onSuccess = null,
      onError = null
    } = options;

    setTimeout(async () => {
      try {
        await this.execute_mutation(field_id, value, {
          blockName,
          quoteHash,
          onSuccess,
          onError
        });
      } catch (error) {
        console.error(`[MutationManager] ❌ Mutation error for field ${field_id}:`, error);
        if (onError) onError(error);
      }
    }, delay);
  }

  /**
   * Execute GraphQL mutation immediately.
   *
   * @param {string} field_id - Field identifier
   * @param {mixed} value - Field value
   * @param {Object} options - Mutation options
   * @param {number|string} options.bookingId - Booking post ID (required)
   * @param {string} [options.blockName] - Block name
   * @param {string} [options.quoteHash] - Quote hash
   * @param {Function} [options.onSuccess] - Success callback
   * @param {Function} [options.onError] - Error callback
   * @returns {Promise<void>}
   * @throws {Error} If bookingId is not provided
   */
  async execute_mutation(field_id, value, options = {}) {
    if (!options.bookingId) {
      throw new Error(__('Booking ID is required', 'wpcbooking'));
    }
    const {
      blockName = field_id,
      quoteHash = '',
      onSuccess = null,
      onError = null
    } = options;

    try {
      const mutation_data = {
        blockName,
        blockData: JSON.stringify({
          booking_id: options.bookingId,
          field_id: field_id,
          value: value,
          quoteData: loadDraft(options.bookingId) ?? {},
          timestamp: new Date().toISOString()

        }),
        quoteHash
      };

      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation ValidateAndSaveBlock($blockName: String!, $blockData: String!, $quoteHash: String) {
              validateAndSaveBlock(input: {
                blockName: $blockName
                blockData: $blockData
                quoteHash: $quoteHash
              }) {
                success
                value
                errors
              }
            }
          `,
          variables: mutation_data
        })
      });

      if (!response.ok) {
        throw new Error(__('HTTP error! status: ${response.status}', 'wpcbooking'));
      }

      const result = await response.json();

      if (result.errors) {
        const errorMessages = result.errors.map(err => err.message);
        if (onError) onError(errorMessages);
        return;
      }

      if (result.data?.validateAndSaveBlock?.success) {
        if (onSuccess) onSuccess(result.data.validateAndSaveBlock);
      } else {
        const error = result.data?.validateAndSaveBlock?.errors || ['Unknown error'];
        console.error(`[MutationManager] ❌ Business errors for field ${field_id}`, { errors: error });
        if (onError) onError(error);
      }
    } catch (error) {
      console.error(`[MutationManager] 💥 Exception during mutation for field ${field_id}`, error);
      if (onError) onError(error);
    }
  }

  /**
   * Create new MutationManager instance.
   *
   * @param {Object} config - Configuration object
   * @returns {MutationManager} MutationManager instance
   */
  static create(config = {}) {
    return new MutationManager(config);
  }
}

/**
 * Default MutationManager instance.
 *
 * @type {MutationManager}
 */
export const defaultMutationManager = new MutationManager();

/**
 * Trigger mutation using default manager.
 *
 * @param {string} field_id - Field identifier
 * @param {mixed} value - Field value
 * @param {Object} options - Mutation options
 * @returns {void}
 */
export const triggerMutation = (field_id, value, options = {}) => {
  return defaultMutationManager.trigger_mutation(field_id, value, options);
};

/**
 * Execute mutation using default manager.
 *
 * @param {string} field_id - Field identifier
 * @param {mixed} value - Field value
 * @param {Object} options - Mutation options
 * @returns {Promise<void>}
 */
export const executeMutation = (field_id, value, options = {}) => {
  return defaultMutationManager.execute_mutation(field_id, value, options);
};

/**
 * React hook for MutationManager.
 *
 * @param {Object} config - Configuration object
 * @returns {Object} Mutation manager and methods
 */
export const useMutationManager = (config = {}) => {
  const manager = useRef(new MutationManager(config));

  const triggerMutation = useCallback((field_id, value, options = {}) =>
    manager.current.trigger_mutation(field_id, value, options), []);

  const executeMutation = useCallback((field_id, value, options = {}) =>
    manager.current.execute_mutation(field_id, value, options), []);

  return {
    manager: manager.current,
    triggerMutation,
    executeMutation
  };
};

export default MutationManager;
