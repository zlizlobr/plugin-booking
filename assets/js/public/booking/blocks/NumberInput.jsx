import { h } from "preact";
import { useEffect } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { useBookingContext } from "../contexts/BookingContext.jsx";
import { useInputField } from "../hooks/useInputField.js";
import { InputBookingComponent } from "./InputBookingComponent.jsx";

const NumberInput = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();
  const { currentValue, handleChange, error, isValid, setIsValid } =
    useInputField({
      fieldId: attrs.field_id,
      rules,

      ...context,
    });
  const {
    add_after = 1,
    default_value = 1,
    min: minStr = "1",
    max: maxStr = "1000",
    singular = __("item", "wpcbooking"),
    plural = __("items", "wpcbooking"),
  } = attrs.field || {};
  // Convert min/max to numbers
  const min = parseInt(minStr) || 1;
  const max = parseInt(maxStr) || 1000;
  const displayValue = currentValue ? parseInt(currentValue) : default_value;

  useEffect(() => {
    setIsValid(true);
    handleChange(displayValue, true); // User interaction
  }, [displayValue]);

  const handle_increment = () => {
    const current_num = parseInt(displayValue) || min;
    const new_value = Math.min(max, current_num + add_after);
    handleChange(new_value.toString(), true); // User interaction
  };

  const handle_decrement = () => {
    const current_num = parseInt(displayValue) || min;
    const new_value = Math.max(min, current_num - add_after);
    handleChange(new_value.toString(), true); // User interaction
  };

  const handleInputChange = (e) => {
    handleChange(e.target.value, true); // User interaction
  };

  return (
    <div
      className="flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4"
      data-affid={attrs.field_id}
      data-label={attrs.general?.label || __("Number fields", "wpcbooking")}
    >
      {/* Label and Icon Section */}
      <div className="flex items-center gap-x-4">
        {attrs.general?.icon_url && (
          <div
            style={{ "--mask-img": `url('${attrs.general.icon_url}')` }}
            className="w-25p h-30p bg-th-orange-light cs-mask"
          />
        )}
        <div className="af-p24 max-medium:text-[1.25rem] text-black w-full">
          {attrs.general?.label || __("Number fields", "wpcbooking")}
        </div>
      </div>

      {/* Field Section */}
      <div className="af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]">
        <div className="relative">
          <div className="af-p27 max-medium:text-[1rem] text-th-orange-light medium:w-3/5 flex gap-x-2 items-center">
            {/* Minus Button */}
            <div
              id="number-minus"
              className="shrink-0 cursor-pointer w-55p h-55p rounded-full bg-th-blue flex justify-center items-center hover:bg-blue-600 transition-colors"
              onClick={handle_decrement}
            >
              <div
                className="w-7 h-7 cs-mask bg-white"
                style={{
                  "--mask-img": `url('/wp-content/plugins/acf-flowform/assets/img/minus.svg')`,
                }}
              ></div>
            </div>

            {/* Number Input */}
            <input
              type="number"
              id={attrs.field_id}
              name={attrs.field_id}
              value={displayValue}
              onChange={handleInputChange}
              className="grow w-full border-2 border-th-blue rounded-[10px] h-55p px-10p text-center text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={min}
              max={max}
              step={add_after}
              required
              aria-invalid={!!error}
              aria-describedby={error ? `${attrs.field_id}-error` : undefined}
            />

            {/* Plus Button */}
            <div
              id="number-plus"
              className="shrink-0 cursor-pointer w-55p h-55p rounded-full bg-th-blue flex justify-center items-center hover:bg-blue-600 transition-colors"
              onClick={handle_increment}
            >
              <div
                className="w-7 h-7 cs-mask bg-white"
                style={{
                  "--mask-img": `url('/wp-content/plugins/acf-flowform/assets/img/plus.svg')`,
                }}
              ></div>
            </div>

            {/* Unit Label */}
            <span
              id={`${attrs.field_id}_display`}
              name={`${attrs.field_id}_display`}
              data-value={displayValue}
              className="ml-2 text-gray-600"
              data-singular={singular}
              data-plural={plural}
              data-max={max}
              data-min={min}
              data-add_after={add_after}
            >
              {displayValue > 1 ? plural : singular}
            </span>
          </div>
          {InputBookingComponent.render_validation_indicator(error, isValid)}
          {InputBookingComponent.render_error_message(attrs.field_id, error)}
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
