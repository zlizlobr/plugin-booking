import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { __, sprintf } from "@wordpress/i18n";
import { useBookingContext } from "../contexts/BookingContext.jsx";
import { useInputField } from "../hooks/useInputField.js";
import { InputBookingComponent } from "./InputBookingComponent.jsx";

const IconsList = ({ attrs, rules }) => {
  const context = useBookingContext();
  const storedValue =
    context.bookingFormManager?.get_stored_value(attrs.field_id) || "";
  const { currentValue, handleChange, error, isValid, inputClasses } =
    useInputField({
      fieldId: attrs.field_id,
      rules,
      ...context,
    });
  const { number_allowed = 1, icons = [] } = attrs.general || {};
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      // Don't trigger validation on init - pass false to indicate it's not user interaction
      handleChange("", false);
    }
  }, []);

  // Parse currentValue - handle both string and array formats
  const selected_icons = (() => {
    if (Array.isArray(storedValue)) {
      return storedValue;
    }
    if (typeof storedValue === "string" && storedValue.trim() !== "") {
      return storedValue
        .split(",")
        .map((val) => val.trim())
        .filter((val) => val !== "");
    }
    return [];
  })();

  const handle_icon_click = (
    icon_value,
    selected_icons,
    field_id,
    number_allowed
  ) => {
    let new_selection;

    if (number_allowed === 1) {
      if (selected_icons.includes(icon_value)) {
        return;
      }
      new_selection = [icon_value];
    } else {
      if (selected_icons.includes(icon_value)) {
        new_selection = selected_icons.filter((val) => val !== icon_value);
      } else if (selected_icons.length < number_allowed) {
        new_selection = [...selected_icons, icon_value];
      } else {
        return;
      }
    }

    const value_for_form =
      new_selection.length > 0 ? new_selection.join(",") : "";
    const stored_value =
      context.bookingFormManager?.get_stored_value(field_id) || "";

    if (value_for_form && stored_value === value_for_form) {
      handleChange(`__reset_${Date.now()}`, true); // User interaction
      setTimeout(() => handleChange(value_for_form, true), 10); // User interaction
    } else {
      handleChange(value_for_form, true); // User interaction - this will mark as touched
    }
  };

  const render_icon_item = (
    icon_item,
    index,
    selected_icons,
    field_id,
    number_allowed
  ) => {
    const icon_value = icon_item.label || `icon_${index}`;
    const is_selected = selected_icons.includes(icon_value);
    const icon_url = icon_item.icon_url ?? ""; // todo: add base img to localizace php to js

    return (
      <li
        key={index}
        className={`js-item basis-0 min-w-[240px] rounded-[15px] cursor-pointer group transition-all duration-300 ${
          is_selected
            ? "is-active bg-th-orange text-white"
            : "bg-white hover:bg-gray-50"
        }`}
        style={{
          boxShadow: is_selected
            ? "0 0 15px rgba(255, 165, 0, 0.3)"
            : "0 0 10px #e5e5e5",
          transform: is_selected ? "scale(1.02)" : "scale(1)",
        }}
        onClick={() =>
          handle_icon_click(
            icon_value,
            selected_icons,
            field_id,
            number_allowed
          )
        }
      >
        <input
          type="checkbox"
          id={icon_value}
          name={`${field_id}[]`}
          value={icon_value}
          className="hidden-checkbox js-countable"
          checked={is_selected}
          readOnly // Controlled by parent click
        />
        <div className="h-full flex flex-col justify-between py-20p">
          <div
            className={`af-p20 leading-6 text-center transition-colors duration-300 ${
              is_selected ? "text-white font-medium" : "text-gray-700"
            }`}
            style={
              is_selected ? { textShadow: "0 0 2px rgba(255,255,255,0.5)" } : {}
            }
          >
            {icon_item.label || sprintf(__("Icon %d", "wpcbooking"), index + 1)}
          </div>
          {icon_url && (
            <div
              style={{ "--mask-img": `url('${icon_url}')` }}
              className={`w-115p h-115p mt-20p mx-auto cs-mask transition-all duration-300 ${
                is_selected
                  ? "bg-white scale-110"
                  : "bg-black group-hover:bg-th-orange group-hover:scale-105"
              }`}
            ></div>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className={`col-span-full mt-40p large:mt-130p`} data-name={attrs.id}>
      <ul
        data-maximum-choices={number_allowed}
        className="flex js-choices-wrap justify-center gap-20p large:gap-40p flex-wrap [&_*]:transition-all [&_*]:duration-300 aff-choices-wrap"
      >
        {icons.map((icon_item, index) =>
          render_icon_item(
            icon_item,
            index,
            selected_icons,
            attrs.field_id,
            number_allowed
          )
        )}

        {icons.length === 0 && (
          <li className="text-center text-gray-500 py-8 col-span-full">
            <div className="text-2xl mb-2">🎯</div>
            <p>{__("No icons configured", "wpcbooking")}</p>
          </li>
        )}
      </ul>
      {InputBookingComponent.render_validation_indicator(error, isValid)}
      {InputBookingComponent.render_error_message(attrs.field_id, error)}
    </div>
  );
};

export default IconsList;
