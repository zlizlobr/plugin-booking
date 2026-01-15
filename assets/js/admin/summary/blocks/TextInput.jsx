import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { BaseAdminBlockComponent } from "./BlockComponent.jsx";

const TextInput = (props) => {
  const component = new BaseAdminBlockComponent(props);
  const [localValue, setLocalValue] = useState(props.value || "");

  component.render_input = () => {
    const placeholder =
      component.attrs.placeholder || __("", "wpcbooking");
    const maxLength = component.attrs.max_length || null;
    return (
      <input
        type="text"
        id={component.fieldId}
        name={component.fieldId}
        value={localValue}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={(e) => {
          setLocalValue(e.target.value);
          component.handle_change(e.target.value);
        }}
      />
    );
  };

  component.get_default_label = () => __("Text", "wpcbooking");

  return component.render();
};

export default TextInput;
