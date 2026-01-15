import { h } from 'preact';
import { useRef, useCallback, useState } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { useBookingContext } from '../contexts/BookingContext.jsx';
import { useInputField } from '../hooks/useInputField.js';
import { InputBookingComponent } from './InputBookingComponent.jsx';
import Calendar from './Calendar.jsx';

const format_date_for_display = (date_string, format) => {
  if (!date_string) return '';

  try {
    const [year, month, day] = date_string.split('-');

    switch (format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return date_string;
      default:
        return `${day}/${month}/${year}`;
    }
  } catch (error) {
    console.error('[DatePicker] Error formatting date:', error);
    return date_string;
  }
};


const DatePicker = ({
  attrs = {},
  rules = {}
}) => {
  const context = useBookingContext();
  const {
    currentValue,
    handleChange,
    error,
    isValid,
    inputClasses
  } = useInputField({
    fieldId: attrs.field_id,
    rules,
    ...context
  });

  const { general = {} } = attrs;
  const { icon_url = '' } = general;
  const {
    label = __('Select day', 'wpcbooking'),
    date_picker_options = {}
  } = general;

  const field_id = attrs.field_id ?? '';
  const input_ref = useRef(null);
  const [show_calendar, set_show_calendar] = useState(false);

  const allow_past_dates = date_picker_options.allow_past_dates ?? false;
  const dateFormat = date_picker_options.dateFormat ?? 'DD/MM/YYYY';
  const custom_date_format = date_picker_options.custom_date_format ?? 'DD/MM/YYYY';
  const final_date_format = dateFormat === 'other' ? custom_date_format : dateFormat;
  const dateMax = date_picker_options.dateMax ?? '2050-12-31';
  const dateMin = date_picker_options.dateMin ?? null;
  const dateLocale = date_picker_options.dateLocale ?? 'en';
  const custom_locale = date_picker_options.custom_locale ?? 'cs';
  const final_locale = dateLocale === 'other' ? custom_locale : dateLocale;

  const displayValue = currentValue ? format_date_for_display(currentValue, final_date_format) : '';

  const handle_input_click = useCallback(() => {
    set_show_calendar(!show_calendar);
  }, [show_calendar]);

  const handle_date_selection = useCallback((selected_date) => {
    handleChange(selected_date);
    set_show_calendar(false);
  }, [handleChange]);

  const handle_close_calendar = useCallback(() => {
    set_show_calendar(false);
  }, []);

  return (
    <div className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full">

      {/* Label and Icon Section */}
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

      {/* Field Section */}
      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">

        {/* Datepicker */}
        <div className="w-full relative">
          <input
            ref={input_ref}
            className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id={field_id}
            name={field_id}
            value={displayValue}
            onClick={handle_input_click}
            placeholder={__('Select day', 'wpcbooking')}
            readOnly
            data-datepicker-input
            aria-invalid={!!error}
            aria-describedby={error ? `${field_id}-error` : undefined}
          />

          <Calendar
            selected_date={currentValue}
            on_date_select={handle_date_selection}
            allow_past_dates={allow_past_dates}
            date_min={dateMin}
            date_max={dateMax}
            locale={final_locale}
            show={show_calendar}
            on_close={handle_close_calendar}
          />
          {InputBookingComponent.render_validation_indicator(error, isValid)}
          {InputBookingComponent.render_error_message(attrs.field_id, error)}
        </div>
        {/* End Datepicker */}
      </div>

    </div>
  );
};

export default DatePicker;

