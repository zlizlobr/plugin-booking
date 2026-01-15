import { h } from 'preact';
import { __ } from '@wordpress/i18n';
import { patchDraft } from '../utils/storage.js';
import { useBookingContext } from '../contexts/BookingContext.jsx';

/**
 * Base class for all booking form components.
 * Provides common functionality for field rendering, validation, and error handling.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
export class BaseBookingComponent {
  /**
   * Creates an instance of BaseBookingComponent.
   *
   * @param {Object} props - Component properties
   * @param {Object} props.attrs - Block attributes
   * @param {Object} props.form_data - Current form data
   * @param {Function} props.on_change - Change handler callback
   * @param {Array} props.rules - Validation rules
   * @param {Object} props.errorManager - Error manager instance
   * @param {Object} props.bookingFormManager - Form manager instance
   * @param {Function} props.set_form_data - Function to update form data
   */
  constructor(props) {
    const context = useBookingContext();
    this.bookingId = context.bookingId;
    this.props = props;
    this.attrs = props.attrs || {};
    this.general = this.attrs.general || {};
    this.form_data = props.form_data || {};
    this.on_change = props.on_change;
    this.rules = props.rules || [];
    this.errorManager = props.errorManager;
    this.bookingFormManager = props.bookingFormManager;
    this.set_form_data = props.set_form_data;
    const field_id = this.attrs.field_id ?? '';
    this._error_listener = (event) => {
      if (event && event.type === 'field_error' && event.fieldId === this.attrs.field_id) {
        if (typeof this.on_change === 'function') {
          const current_value = this.get_current_value(this.attrs.field_id);
          this.on_change(this.attrs.field_id, current_value);
        }
      }
    };

    if (this.errorManager) {
      this.errorManager.addListener(this._error_listener);
    }
  }

  /**
   * Get icon URL from thumbnail ID.
   *
   * @param {number|null} thumbnail_id - Thumbnail attachment ID
   * @returns {string|null} Icon URL or null
   */
  get_icon_url(thumbnail_id) {
    return thumbnail_id ? `/wp-content/uploads/icon-${thumbnail_id}.svg` : null;
  }

  /**
   * Get current field value from form_data or attrs.
   * Prioritizes form_data over attrs.
   *
   * @param {string} field_id - Field identifier
   * @returns {mixed} Current field value
   */
  get_current_value(field_id) {
    // PRIORITA: Aktuální hodnota z form_data (co uživatel zadal)
    const storage_value = this.form_data[field_id];
    if (storage_value !== undefined && storage_value !== null && storage_value !== '') {
      return storage_value;
    }

    // FALLBACK: Původní hodnota z attrs (pouze pokud není nic v form_data)
    const attrs_value = this.general.value;
    if (attrs_value !== undefined && attrs_value !== null && attrs_value !== '') {
      return attrs_value;
    }

    return '';
  }

  /**
   * Handle field value change with validation and storage.
   *
   * @param {string} fieldId - Field identifier
   * @param {mixed} value - New field value
   * @param {string} source - Change source ('user' or 'program')
   * @returns {Promise<void>}
   */
  async handle_change(fieldId, value, source = 'user') {
    // Použij aktuální hodnotu z form_data, ne z attrs
    const current_value = this.form_data[fieldId] || '';

    if (current_value === value) {
      return;
    }

    // 1. Nejdřív validace s NOVOU hodnotou
    await this.bookingFormManager.handle_input_change(fieldId, value, this.rules, source);

    // 2. Zkontroluj chyby PO validaci
    const hasError = this.errorManager.hasFieldError(fieldId);

    // 3. Aktualizuj formData
    if (this.set_form_data) {
      this.set_form_data({ [fieldId]: value });
    }

    // Note: setFieldValid is now called automatically via callback mechanism in BookingFormManager
    // after GraphQL validation completes, so no need to call it manually here

    // 4. Uložení do storage POUZE pokud je validní
    if (!hasError) {
      patchDraft(this.bookingId, { [fieldId]: value });
    }
  }

  /**
   * Render container element for field.
   *
   * @param {Array} children - Child elements
   * @param {string} additional_classes - Additional CSS classes
   * @returns {Object} Preact element
   */
  render_container(children, additional_classes = '') {
    return (
      <div className={`flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full ${additional_classes}`}>
        {children}
      </div>
    );
  }

  /**
   * Render label section with icon.
   *
   * @param {string} label - Field label
   * @param {string|null} icon_url - Icon URL
   * @returns {Object} Preact element
   */
  render_label_section(label, icon_url) {
    return (
      <div className="flex items-center gap-x-4">
        {icon_url && (
          <div
            style={{ '--mask-img': `url('${icon_url}')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          ></div>
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {label}
        </div>
      </div>
    );
  }

  /**
   * Render field input section.
   *
   * @param {Array} children - Child elements
   * @param {string} additional_classes - Additional CSS classes
   * @returns {Object} Preact element
   */
  render_field_section(children, additional_classes = '') {
    return (
      <div className={`af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem] ${additional_classes}`}>
        {children}
      </div>
    );
  }

  /**
   * Get field prefix. Must be implemented by subclass.
   *
   * @throws {Error} If not implemented
   * @returns {string} Field prefix
   */
  get_field_prefix() {
    throw new Error('get_field_prefix must be implemented by subclass');
  }

  /**
   * Render input element. Must be implemented by subclass.
   *
   * @param {string} field_id - Field identifier
   * @param {mixed} current_value - Current field value
   * @throws {Error} If not implemented
   * @returns {Object} Preact element
   */
  render_input(field_id, current_value) {
    throw new Error('render_input must be implemented by subclass');
  }

  /**
   * Render component.
   *
   * @returns {Object} Preact element
   */
  render() {
    const { label = this.get_default_label(), thumbnail_id = null } = this.general;
    const field_id = this.attrs.field_id ?? '';
    const current_value = this.get_current_value(field_id);
    const icon_url = this.get_icon_url(thumbnail_id);

    return this.render_container([
      this.render_label_section(label, icon_url),
      this.render_field_section(
        this.render_input(field_id, current_value)
      )
    ]);
  }

  /**
   * Get default field label.
   *
   * @returns {string} Default label text
   */
  get_default_label() {
    return __('Field', 'wpcbooking');
  }

  /**
   * Get field error message.
   *
   * @param {string} field_id - Field identifier
   * @returns {string|null} Error message or null
   */
  get_field_error(field_id) {
    return this.errorManager ? this.errorManager.getFieldError(field_id) : null;
  }

  /**
   * Check if field has error.
   *
   * @param {string} field_id - Field identifier
   * @returns {boolean} True if field has error
   */
  has_field_error(field_id) {
    return this.errorManager ? this.errorManager.hasFieldError(field_id) : false;
  }

  /**
   * Get CSS classes for field based on validation state.
   *
   * @param {string} field_id - Field identifier
   * @param {string} base_classes - Base CSS classes
   * @returns {string} Combined CSS classes
   */
  get_field_classes(field_id, base_classes = '') {
    const has_error = this.has_field_error(field_id);
    const is_valid = this.is_field_valid(field_id);

    let status_classes = '';
    if (has_error) {
      status_classes = 'input-error animate-shake';
    } else if (is_valid) {
      status_classes = 'input-valid';
    }

    return `${base_classes} ${status_classes}`.trim();
  }

  /**
   * Check if field is valid (has value and no errors).
   *
   * @param {string} field_id - Field identifier
   * @returns {boolean} True if field is valid
   */
  is_field_valid(field_id) {
    const value = this.get_current_value(field_id);
    return value && value.trim() !== '' && !this.has_field_error(field_id);
  }

  /**
   * Get error manager instance.
   *
   * @returns {Object|null} Error manager or null
   */
  get_validation_manager() {
    return this.errorManager;
  }
}
