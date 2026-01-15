import { h } from 'preact';
import { __ } from '@wordpress/i18n';
import { BaseBookingComponent } from './BaseBookingComponent.jsx';

export class InputBookingComponent extends BaseBookingComponent {
  get_field_prefix() {
    return 'input';
  }

  get_input_type() {
    return 'text';
  }

  get_input_attributes() {
    return {};
  }

  static render_validation_indicator(error, is_valid) {
    if (!error && is_valid) {
      return (
        <div className="absolute right-3 top-[27.5px] transform -translate-y-1/2 text-green-500 pointer-events-none">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="absolute right-3 top-[27.5px] transform -translate-y-1/2 text-red-500 pointer-events-none">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
    
    return null;
  }

  static render_error_message(field_id, error) {
    if (!error) return null;
    
    return (
      <div id={`${field_id}-error`} className="error-message mt-2 flex items-start gap-x-2 text-red-600 text-sm">
        <svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  render_input(field_id, current_value) {
    const handle_change = (e) => this.handle_change(field_id, e.target.value);
    const error = this.get_field_error(field_id);
    const is_valid = this.is_field_valid(field_id);
    const input_classes = this.get_field_classes(
      field_id, 
      "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p pr-12 transition-colors duration-200"
    );
    const handle_focus = () => {
      if (error) {
        this.errorManager.scrollToError(field_id);
      }
    };

    return (
      <div className="w-full relative">
        <input 
          type={this.get_input_type()}
          id={field_id}
          name={field_id}
          value={current_value}
          onChange={handle_change}
          onFocus={handle_focus}
          className={input_classes}
          placeholder={this.general.placeholder || this.get_default_placeholder()}
          aria-invalid={!!error}
          aria-describedby={error ? `${field_id}-error` : undefined}
          {...this.get_input_attributes()}
        />
        {InputBookingComponent.render_validation_indicator(error, is_valid)}
        {InputBookingComponent.render_error_message(field_id, error)}
      </div>
    );
  }

  get_default_placeholder() {
    return __('Enter value', 'wpcbooking');
  }
}
