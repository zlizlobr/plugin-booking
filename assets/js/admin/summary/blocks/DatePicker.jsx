import { h } from "preact";
import { useState, useEffect, useRef, useMemo } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { BaseAdminBlockComponent } from "./BlockComponent.jsx";
import { getFormatConfig } from "../utils/priceFormatting.js";
import { getGraphQLEndpoint } from "../utils/configHelpers.js";
import { get_price_manager } from "../utils/priceManager.js";
import {
  update_block_percentage,
  total_base_price,
} from "../signals/summarySignals.js";
import PriceIncreaseControl from "./composite/PriceIncreaseControl.jsx";
import InfoTooltip from "./composite/InfoTooltip.jsx";

// Validace zda je string platné datum ve formátu YYYY-MM-DD
const is_valid_date_string = (str) => {
  if (!str || typeof str !== "string") return false;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(str);
};

// Konverze z display formátu (DD/MM/YYYY) na ISO formát (YYYY-MM-DD)
const display_to_iso = (display_date) => {
  if (!display_date || typeof display_date !== "string") return "";

  const parts = display_date.split("/");
  if (parts.length === 3) {
    // DD/MM/YYYY -> YYYY-MM-DD
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  return display_date;
};

// Konverze z ISO formátu (YYYY-MM-DD) na display formát
const format_date_for_display = (date_string, format) => {
  if (!date_string || typeof date_string !== "string") return "";

  if (!is_valid_date_string(date_string)) {
    console.warn("[AdminDatePicker] Invalid date format:", date_string);
    return date_string;
  }

  try {
    const [year, month, day] = date_string.split("-");

    switch (format) {
      case "DD/MM/YYYY":
        return `${day}/${month}/${year}`;
      case "MM/DD/YYYY":
        return `${month}/${day}/${year}`;
      case "YYYY-MM-DD":
        return date_string;
      default:
        return `${day}/${month}/${year}`;
    }
  } catch (error) {
    console.error("[AdminDatePicker] Error formatting date:", error);
    return date_string;
  }
};

const DatePicker = (props) => {
  const component = new BaseAdminBlockComponent(props);
  const formatConfig = getFormatConfig();
  const currencySymbol = formatConfig.currencySymbol;
  const inputRef = useRef(null);

  // Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)
  const stepId = component.step;
  const totalBasePrice = total_base_price.value;

  // Parse value - může být string nebo objekt (jako u GoogleMap)
  const parseValueData = () => {
    const value = component.value;

    if (!value) return { date: "", price_increase: null, label: null };

    // String = pouze datum
    if (typeof value === "string") {
      return { date: value, price_increase: null, label: null };
    }

    // Objekt = { value/date, price_increase, label }
    if (typeof value === "object") {
      const result = {
        date: value.value || value.date || "",
        price_increase: value.price_increase || null,
        label: value.label || null,
      };
      return result;
    }

    return { date: "", price_increase: null, label: null };
  };

  // Memoize parsed data (jako GoogleMap)
  const parsedData = useMemo(() => {
    const result = parseValueData();
    return result;
  }, [component.value]);

  // STATE pro datum - čteme ze state, ne z component.value!
  const [dateValue, setDateValue] = useState(() => {
    return parsedData.date || "";
  });

  // STATE pro label - podobně jako v SummaryItem
  const [currentLabel, setCurrentLabel] = useState(() => {
    return (
      parsedData.label || component.attrs.label || component.get_default_label()
    );
  });

  // STATE pro quotes count
  const [quotesCount, setQuotesCount] = useState(props.attrs.quotes_count || 0);

  // Transform PHP price_increase format to component format
  const transformPriceIncreaseData = (phpData) => {
    if (!phpData) return {};

    const data = Array.isArray(phpData) ? phpData[0] : phpData;
    if (!data) return {};

    return {
      operator: data.operation === "add" ? "+" : "-",
      percentage: parseFloat(data.price_increase) || 0,
      total: 0,
      base_price: 0,
    };
  };

  // price_increase z parsedData nebo attrs
  const initialPriceIncrease =
    parsedData.price_increase || props.attrs.price_increase;

  const [priceIncrease, setPriceIncrease] = useState(
    transformPriceIncreaseData(initialPriceIncrease)
  );

  // Fetch quotes count when date changes using GraphQL
  const fetchQuotesCount = async (date) => {
    if (!date || !component.fieldId) {
      setQuotesCount(0);
      return;
    }

    let dateString = date;
    if (date.includes("/")) {
      dateString = display_to_iso(date);
    }

    try {
      const endpoint = getGraphQLEndpoint();

      const graphql_query = `
				query GetQuotesCountForDate($fieldId: String!, $dateValue: String!) {
					getQuotesCountForDate(fieldId: $fieldId, dateValue: $dateValue)
				}
			`;

      const variables = {
        fieldId: component.fieldId,
        dateValue: dateString,
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: graphql_query,
          variables: variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        const errorMessages = result.errors
          .map((err) => err.message)
          .join(", ");
        console.error("[AdminDatePicker] GraphQL errors:", errorMessages);
        return;
      }

      const count = result.data?.getQuotesCountForDate;
      if (count !== null && count !== undefined) {
        setQuotesCount(parseInt(count, 10));
      }
    } catch (error) {
      console.error("[AdminDatePicker] Error fetching quotes count:", error);
    }
  };

  // Aktualizovat hodnotu - volá component.handle_change s kompletními daty
  const updateValue = (updates) => {
    // Sestavit hodnotu ze STATE + updates
    const newValue = {
      value: dateValue, // Aktuální datum ze STATE
      label: currentLabel, // Aktuální label ze STATE
      price_increase:
        priceIncrease.percentage > 0
          ? [
              {
                price_increase: priceIncrease.percentage,
                operation: priceIncrease.operator === "+" ? "add" : "subtract",
              },
            ]
          : null,
      ...updates, // Aplikovat změny
    };

    // Pokud není price_increase a label není změněn (je defaultní), pošli pouze datum jako string
    const defaultLabel = component.attrs.label || component.get_default_label();
    const hasPriceIncrease = newValue.price_increase !== null;
    const hasCustomLabel = newValue.label && newValue.label !== defaultLabel;
    const isLabelUpdate = updates && updates.hasOwnProperty("label");

    // Ukládat objekt pokud je price_increase, custom label, nebo pokud právě měníme label
    if (hasPriceIncrease || hasCustomLabel || isLabelUpdate) {
      component.handle_change(newValue);
    } else {
      component.handle_change(newValue.value);
    }
  };

  useEffect(() => {
    if (inputRef.current && window.acf && window.jQuery) {
      const $input = window.jQuery(inputRef.current);
      $input.datepicker({
        dateFormat: "dd/mm/yy",
        onSelect: (dateText) => {
          const isoDate = display_to_iso(dateText);
          setDateValue(isoDate); // Aktualizovat STATE
          fetchQuotesCount(isoDate);

          // Aktualizovat hodnotu s novým datem
          updateValue({ value: isoDate });
        },
      });
    }
  }, []);

  // Update quotes count when dateValue changes
  useEffect(() => {
    if (dateValue) {
      fetchQuotesCount(dateValue);
    }
  }, [dateValue]);

  // Sync label when parsedData changes (but only if not currently being edited)
  useEffect(() => {
    if (parsedData.label !== undefined && parsedData.label !== null) {
      setCurrentLabel(parsedData.label);
    } else if (component.attrs.label) {
      setCurrentLabel(component.attrs.label);
    }
  }, [parsedData.label, component.attrs.label]);

  // Initial sync with PriceManager
  useEffect(() => {
    const forceShow = props.attrs.calculation_quote?.apply_calculation;
    if (forceShow && priceIncrease.percentage) {
      const price_manager = get_price_manager();
      price_manager.set_date_item(component.fieldId, {
        base_value: quotesCount,
        percentage: priceIncrease.percentage,
        operation: priceIncrease.operator === "+" ? "add" : "subtract",
      });
    }

    return () => {
      const price_manager = get_price_manager();
      price_manager.remove_date_item(component.fieldId);
    };
  }, [quotesCount]);

  const handlePriceIncreaseChange = (newPriceData) => {
    setPriceIncrease(newPriceData);

    const percentageAmount = totalBasePrice * (newPriceData.percentage / 100);
    const calculatedTotal =
      newPriceData.operator === "+"
        ? totalBasePrice + percentageAmount
        : totalBasePrice - percentageAmount;

    const price_manager = get_price_manager();
    price_manager.set_date_item(component.fieldId, {
      base_value: totalBasePrice,
      percentage: newPriceData.percentage,
      operation: newPriceData.operator === "+" ? "add" : "subtract",
    });

    // Aktualizovat percentage signál pro tento block (field_id + step)
    const operation = newPriceData.operator === "+" ? "add" : "subtract";
    update_block_percentage(
      component.step,
      component.fieldId,
      newPriceData.percentage,
      operation
    );

    const phpFormat = [
      {
        price_increase: newPriceData.percentage,
        operation: operation,
      },
    ];

    // Sestavit hodnotu ze STATE - dateValue je vždy aktuální!
    const mergedValue = {
      value: dateValue, // Čteme ze STATE, ne z component.value
      label: currentLabel, // Aktuální label ze STATE
      price_increase: phpFormat,
    };

    component.handle_change(mergedValue);
  };

  // Handler pro změnu labelu - podobně jako v SummaryItem
  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setCurrentLabel(newLabel);
    // Aktualizovat hodnotu s novým labelem
    updateValue({ label: newLabel });
  };

  component.render_input = () => {
    const placeholder =
      component.attrs.placeholder || __("Select date", "wpcbooking");
    const { general = {} } = component.attrs;
    const { date_picker_options = {} } = general;
    const dateFormat = date_picker_options.dateFormat ?? "DD/MM/YYYY";
    const custom_date_format =
      date_picker_options.custom_date_format ?? "DD/MM/YYYY";
    const final_date_format =
      dateFormat === "other" ? custom_date_format : dateFormat;

    // Použít STATE pro zobrazení
    const displayValue = dateValue
      ? format_date_for_display(dateValue, final_date_format)
      : "";
    const forceShow = component.attrs.calculation_quote?.apply_calculation;
    return (
      <div>
        <input
          ref={inputRef}
          type="text"
          id={component.fieldId}
          name={component.fieldId}
          value={displayValue}
          className="field-date-picker"
          placeholder={placeholder}
          onInput={(e) => {
            const isoDate = display_to_iso(e.target.value);
            setDateValue(isoDate);
            fetchQuotesCount(isoDate);
            updateValue({ value: isoDate });
          }}
        />

        {/* Quotes Count Display */}
        {forceShow && dateValue && (
          <div className="mt-2 text-sm text-gray-600">
            <p>
              {__("Quotes on this date:", "wpcbooking")}{" "}
              <strong>{quotesCount}</strong>
            </p>
          </div>
        )}

        {/* Price Increase Control */}
        {forceShow ? (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  {__("Price Calculation", "wpcbooking")}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {__("Label fee name", "wpcbooking")}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name={`${component.fieldId}_percentage[label]`}
                    value={__("Day occupancy Fee", "wpcbooking")}
                    onInput={handleLabelChange}
                    className="flex-none w-[50%] h-[50px] bg-transparent border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder={component.get_default_label()}
                  />
                  <InfoTooltip
                    description={__(
                      "Enter the name that will appear as the fee label in the shopping cart",
                      "wpcbooking"
                    )}
                  />
                </div>
              </div>
            </div>
            {!dateValue && (
              <p className="text-sm text-gray-500 mb-2">
                {__("Please select a date first", "wpcbooking")}
              </p>
            )}
            {dateValue && (
              <PriceIncreaseControl
                fieldId={component.fieldId}
                basePrice={totalBasePrice}
                value={priceIncrease}
                onChange={handlePriceIncreaseChange}
                currencySymbol={currencySymbol}
              />
            )}
          </div>
        ) : null}
      </div>
    );
  };

  component.get_default_label = () => __("Date", "wpcbooking");

  return component.render();
};

export default DatePicker;
