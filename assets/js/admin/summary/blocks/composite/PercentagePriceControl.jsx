import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { total_base_price } from "../../signals/summarySignals.js";

const PercentagePriceControl = ({
  fieldId = "",
  value = {},
  onChange,
  className = "",
  currencySymbol = "",
  baseTotal = 0,
}) => {
  const get_operation = () => {
    if (value.percentage_operation) return value.percentage_operation;
    if (value.percentage?.operation) {
      return value.percentage.operation === "substract"
        ? "subtract"
        : value.percentage.operation;
    }
    if (value.percentage?.add_substract) {
      return value.percentage.add_substract === "substract"
        ? "subtract"
        : "add";
    }
    return "add";
  };

  const get_value = () => {
    if (typeof value.percentage_value === "number")
      return Math.round(value.percentage_value);
    if (value.percentage?.price_increase !== undefined)
      return Math.round(parseFloat(value.percentage.price_increase) || 0);
    if (value.percentage?.value !== undefined) return Math.round(value.percentage.value);
    return 0;
  };

  const [percentage_operation, set_percentage_operation] = useState(
    get_operation()
  );
  const [percentage_value, set_percentage_value] = useState(get_value());
  const prevValuesRef = useRef({ percentage_operation, percentage_value });
  const debounceTimerRef = useRef(null);

  // Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)
  const totalBasePrice = total_base_price.value;
  const base_total = totalBasePrice || 0;

  const calculate_percentage = () => {
    const percentageValue = parseFloat(percentage_value) || 0;
    const operation = percentage_operation || "add";
    return operation === "subtract" ? -percentageValue : percentageValue;
  };

  const calculate_total = () => {
    const percentage = calculate_percentage();
    return Math.round(base_total * (Math.abs(percentage) / 100));
  };

  useEffect(() => {
    const prev = prevValuesRef.current;
    const hasChanged =
      prev.percentage_operation !== percentage_operation ||
      prev.percentage_value !== percentage_value ||
      prev.base_total !== base_total;

    if (hasChanged && onChange) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        const calculated_total = calculate_total();
        
        prevValuesRef.current = {
          percentage_operation,
          percentage_value,
          base_total,
        };

        onChange({
          percentage_operation,
          percentage_value,
          calculated_total,
        });
      }, 1000);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [percentage_operation, percentage_value, base_total, onChange]);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex flex-col flex-1 min-w-[140px] js-operation">
        <label className="text-sm font-medium text-gray-700">
          {__("Operation", "wpcbooking")}
        </label>
        <select
          name={`${fieldId}_percentage[operation]`}
          value={percentage_operation}
          className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => set_percentage_operation(e.target.value)}
        >
          <option value="add">{__("Add", "wpcbooking")}</option>
          <option value="subtract">{__("Subtract", "wpcbooking")}</option>
        </select>
      </div>

      <div className="flex flex-col flex-1 min-w-[120px] js-percentage">
        <label className="text-sm font-medium text-gray-700">
          {__("Percentage", "wpcbooking")}
        </label>
        <input
          name={`${fieldId}_percentage[price_increase]`}
          type="number"
          value={percentage_value}
          min="0"
          max="100"
          className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onInput={(e) => set_percentage_value(Math.round(parseFloat(e.target.value) || 0))}
        />
      </div>

      <div className="flex flex-col justify-end">
        <label className="text-sm font-medium text-gray-700">
          {__("Total", "wpcbooking")}
        </label>
        <span className="text-sm mt-1 h-full flex items-center js-block-percetage-calc product">
          <span className="js-item-percentage product">
            {calculate_percentage()}
          </span>
          %{__(" of", "wpcbooking")}{" "}
          <span className="ml-1 js-total-base">{base_total.toFixed(2)}</span>{" "}
          {currencySymbol} =
          <span className="ml-1 js-price-item-percentage block-total-price">
            {calculate_total().toFixed(2)}
            <input type="hidden" name={`${fieldId}_percentage[price]`} value={calculate_total().toFixed(2)} />
          </span>{" "}
          {currencySymbol}
        </span>
      </div>
    </div>
  );
};

export default PercentagePriceControl;
