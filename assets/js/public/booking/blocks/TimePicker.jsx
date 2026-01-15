import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { useBookingContext } from '../contexts/BookingContext.jsx';
import { useInputField } from '../hooks/useInputField.js';
import { InputBookingComponent } from './InputBookingComponent.jsx';

const TimePicker = ({ attrs = {}, rules = {} }) => {
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

  const inputRef = useRef(null);
  const flatpickrInstanceRef = useRef(null);

  const { general = {} } = attrs;
  const { icon_url = '' } = general;

  // Handle both old and new naming conventions
  const time_picker_options = general['time_picker_options'] || general['timepicker_options'] || {};

  const {
    label = __('Time Picker', 'wpcbooking')
  } = general;

  const {
    display_format = 'H:i',
    minute_increment = '1'
  } = time_picker_options;

  const format_time = (date, format) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const pad = (num) => num.toString().padStart(2, '0');
    
    return format
      .replace('H', pad(hours))
      .replace('i', pad(minutes));
  };

  useEffect(() => {
    if (!inputRef.current) return;

    // Check if flatpickr is available
    if (typeof flatpickr === 'undefined') {
      return;
    }

    // Validate display_format - if it's "other" or invalid, use default
    const validFormat = (display_format && display_format !== 'other' && display_format !== '')
      ? display_format
      : 'H:i';

    // Initialize Flatpickr with Basic time picker configuration
    flatpickrInstanceRef.current = flatpickr(inputRef.current, {
      enableTime: true,
      noCalendar: true,
      time_24hr: true,
      dateFormat: validFormat,
      minuteIncrement: parseInt(minute_increment, 10),
      clickOpens: true,
      onClose: (selectedDates, dateStr) => {
        handleChange(dateStr);
      },
      onReady: (selectedDates, dateStr, instance) => {
        const calendar = instance.calendarContainer;
        if (calendar) {
          instance._calendarContainer = calendar;
          instance._inputElement = inputRef.current;
          
          const buttons_container = document.createElement('div');
          buttons_container.className = 'flatpickr-time-buttons';
          
          const now_btn = document.createElement('button');
          now_btn.type = 'button';
          now_btn.className = 'flatpickr-time-btn flatpickr-time-btn-now';
          now_btn.textContent = __('Now', 'wpcbooking');
          now_btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const now = new Date();
            instance.setDate(now, false);
          });
          
          const select_btn = document.createElement('button');
          select_btn.type = 'button';
          select_btn.className = 'flatpickr-time-btn flatpickr-time-btn-select';
          select_btn.textContent = __('Select', 'wpcbooking');
          select_btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const selected_date = instance.selectedDates[0] || new Date();
            const time_str = format_time(selected_date, validFormat);
            handleChange(time_str);
            instance.close();
          });
          
          buttons_container.appendChild(now_btn);
          buttons_container.appendChild(select_btn);
          calendar.appendChild(buttons_container);
        }
      },
      clickOutside: (selectedDates, dateStr, instance, clickEvent) => {
        if (!clickEvent || !instance._calendarContainer) {
          return true;
        }

        const target = clickEvent.target;
        const calendar = instance._calendarContainer;
        const input = instance._inputElement;

        const isInsideCalendar = calendar && calendar.contains(target);
        const isOnInput = input && (input === target || input.contains(target));

        const isTimeElement = target && target.closest && (
          target.closest('.arrowUp') ||
          target.closest('.arrowDown') ||
          target.closest('.flatpickr-time') ||
          target.closest('.flatpickr-time-wrapper') ||
          target.closest('.numInputWrapper') ||
          target.closest('.flatpickr-hour') ||
          target.closest('.flatpickr-minute') ||
          target.closest('.flatpickr-time-buttons')
        );

        const isArrowButton = target && target.classList && (
          target.classList.contains('arrowUp') ||
          target.classList.contains('arrowDown') ||
          target.classList.contains('flatpickr-hour') ||
          target.classList.contains('flatpickr-minute') ||
          target.classList.contains('numInput') ||
          target.classList.contains('flatpickr-time-btn')
        );

        if (isInsideCalendar || isOnInput || isTimeElement || isArrowButton) {
          return false;
        }

        return true;
      }
    });

    // Set initial value if exists and is valid
    if (currentValue && flatpickrInstanceRef.current && currentValue !== 'ot3er' && currentValue.length > 0) {
      try {
        flatpickrInstanceRef.current.setDate(currentValue, false);
      } catch (e) {
      }
    }

    // Cleanup function
    return () => {
      if (flatpickrInstanceRef.current) {
        flatpickrInstanceRef.current.destroy();
        flatpickrInstanceRef.current = null;
      }
    };
  }, [display_format, minute_increment, handleChange]);

  // Update Flatpickr when currentValue changes externally
  useEffect(() => {
    if (flatpickrInstanceRef.current && currentValue && currentValue !== 'ot3er' && currentValue.length > 0) {
      try {
        flatpickrInstanceRef.current.setDate(currentValue, false);
      } catch (e) {
      }
    }
  }, [currentValue]);

  return (
    <div className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full">

      {/* Label and Icon Section */}
      <div className="flex items-center gap-x-4">
        {icon_url && (
          <div
            style={{ '--mask-img': `url('${icon_url}')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          />
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {label}
        </div>
      </div>

      {/* Field Section */}
      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">

        {/* Timepicker */}
        <div className="w-full relative">
          <input
            ref={inputRef}
            type="text"
            id={attrs.field_id}
            name={attrs.field_id}
            className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Format: ${display_format && display_format !== 'other' ? display_format : 'H:i'}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${attrs.field_id}-error` : undefined}
          />
          {InputBookingComponent.render_validation_indicator(error, isValid)}
          {InputBookingComponent.render_error_message(attrs.field_id, error)}
        </div>
        {/* End Timepicker */}
      </div>

    </div>
  );
};

export default TimePicker;
