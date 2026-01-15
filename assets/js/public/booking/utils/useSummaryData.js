import { useState, useEffect, useCallback } from 'preact/hooks';
import { useSummaryDataFetcher } from './summaryQueries.js';
import { __ } from '@wordpress/i18n';

/**
 * Hook for managing summary data.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param {number|string} bookingId - Booking post ID
 * @returns {Object} Summary data state and methods
 */
export const useSummaryData = (bookingId) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetcher = useSummaryDataFetcher();

  /**
   * Load summary data for booking.
   *
   * @returns {Promise<void>}
   */
  const loadSummaryData = useCallback(async () => {
    if (!bookingId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetcher.getSummaryData(bookingId);
      setSummaryData(data.form);
    } catch (err) {
      console.error('[useSummaryData] Failed to load summary data:', err);
      setError(err.message || __('Failed to load summary data', 'wpcbooking'));
    } finally {
      setLoading(false);
    }
  }, [bookingId, fetcher]);

  /**
   * Load quote data by hash.
   *
   * @param {string} quoteHash - Quote hash identifier
   * @returns {Promise<void>}
   */
  const loadQuoteByHash = useCallback(async (quoteHash) => {
    if (!quoteHash) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetcher.getQuoteByHash(quoteHash);
      setSummaryData(prev => ({
        ...prev,
        quote: data.quoteByHash
      }));
    } catch (err) {
      console.error('[useSummaryData] Failed to load quote data:', err);
      setError(err.message || __('Failed to load quote data', 'wpcbooking'));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  /**
   * Update quote data.
   *
   * @param {number|string} quoteId - Quote post ID
   * @param {Object} data - Quote data to update
   * @returns {Promise<Object>} Update result
   */
  const updateQuoteData = useCallback(async (quoteId, data) => {
    try {
      const result = await fetcher.updateQuoteData(quoteId, data);
      if (result.updateQuote.success) {
        setSummaryData(prev => ({
          ...prev,
          quote: {
            ...prev.quote,
            ...result.updateQuote.quote
          }
        }));
      }
      return result;
    } catch (err) {
      console.error('[useSummaryData] Failed to update quote data:', err);
      setError(err.message || __('Failed to update quote data', 'wpcbooking'));
      throw err;
    }
  }, [fetcher]);

  /**
   * Submit quote order.
   *
   * @param {number|string} quoteId - Quote post ID
   * @param {Array} termsConditions - Terms and conditions array
   * @returns {Promise<Object>} Submit result
   */
  const submitQuote = useCallback(async (quoteId, termsConditions) => {
    try {
      const result = await fetcher.submitQuote(quoteId, termsConditions);
      return result;
    } catch (err) {
      console.error('[useSummaryData] Failed to submit order:', err);
      setError(err.message || __('Failed to submit order', 'wpcbooking'));
      throw err;
    }
  }, [fetcher]);


  /**
   * Refresh summary data.
   *
   * @returns {void}
   */
  const refreshSummaryData = useCallback(() => {
    loadSummaryData();
  }, [loadSummaryData]);

  // Load data on mount
  useEffect(() => {
    loadSummaryData();
  }, [loadSummaryData]);

  return {
    summaryData,
    loading,
    error,
    loadSummaryData,
    loadQuoteByHash,
    updateQuoteData,
    submitQuote,
    refreshSummaryData
  };
};

/**
 * Hook for managing summary form state.
 *
 * @package Wpcbooking
 * @since 1.0.0
 *
 * @param {Object} initialData - Initial form data
 * @returns {Object} Form state and methods
 */
export const useSummaryForm = (initialData = {}) => {
  const [formData, setFormData] = useState({
    terms_conditions: {},
    ...initialData
  });

  const [validation, setValidation] = useState({
    terms_valid: false,
    all_valid: false
  });

  /**
   * Update form data field.
   *
   * @param {string} field - Field name
   * @param {mixed} value - Field value
   * @returns {void}
   */
  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  /**
   * Update terms and conditions checkbox.
   *
   * @param {string} termName - Term name
   * @param {boolean} checked - Checkbox state
   * @returns {void}
   */
  const updateTermsConditions = useCallback((termName, checked) => {
    setFormData(prev => ({
      ...prev,
      terms_conditions: {
        ...prev.terms_conditions,
        [termName]: checked ? 'yes' : ''
      }
    }));

    // Update validation
    setValidation(prev => {
      const newTerms = {
        ...prev.terms_conditions,
        [termName]: checked ? 'yes' : ''
      };
      const terms_valid = Object.values(newTerms).every(value => value === 'yes');

      return {
        ...prev,
        terms_valid,
        all_valid: terms_valid
      };
    });
  }, []);

  /**
   * Validate form.
   *
   * @returns {boolean} True if form is valid
   */
  const validateForm = useCallback(() => {
    const terms_valid = Object.values(formData.terms_conditions).every(value => value === 'yes');
    const all_valid = terms_valid;

    setValidation({
      terms_valid,
      all_valid
    });

    return all_valid;
  }, [formData.terms_conditions]);

  /**
   * Reset form to initial state.
   *
   * @returns {void}
   */
  const resetForm = useCallback(() => {
    setFormData({
      terms_conditions: {},
      ...initialData
    });
    setValidation({
      terms_valid: false,
      all_valid: false
    });
  }, [initialData]);

  return {
    formData,
    validation,
    updateFormData,
    updateTermsConditions,
    validateForm,
    resetForm
  };
};

export default useSummaryData;
