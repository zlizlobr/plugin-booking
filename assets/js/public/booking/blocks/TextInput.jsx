import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { useBookingContext } from '../contexts/BookingContext.jsx';
import { useInputField } from '../hooks/useInputField.js';
import { InputBookingComponent } from './InputBookingComponent.jsx';

const TextInput = ({ attrs = {}, rules = {} }) => {
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

  const [localValue, setLocalValue] = useState(currentValue || '');
  const pendingValueRef = useRef(null);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    pendingValueRef.current = value;
  };
  
  const commitValue = () => {
    if (pendingValueRef.current !== null) {
      handleChange(pendingValueRef.current);
      pendingValueRef.current = null;
    }
  };
  
  useEffect(() => {
    setLocalValue(currentValue || '');
  }, [currentValue]);

  return (
    <div className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4">
      <div className="flex items-center gap-x-4">
        {attrs.general?.icon_url && (
          <div
            style={{ '--mask-img': `url('${attrs.general.icon_url}')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          />
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {attrs.general?.label || __('Text Input', 'wpcbooking')}
        </div>
      </div>
      
      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">
        <div className="w-full relative">
          <input 
            type="text"
            id={attrs.field_id}
            name={attrs.field_id}
            value={localValue}
            onChange={handleInputChange}
            onBlur={commitValue}
            className="w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={attrs.general?.placeholder || __('Enter text', 'wpcbooking')}
            required
            aria-invalid={!!error}
            aria-describedby={error ? `${attrs.field_id}-error` : undefined}
          />
          {InputBookingComponent.render_validation_indicator(error, isValid)}
          {InputBookingComponent.render_error_message(attrs.field_id, error)}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
