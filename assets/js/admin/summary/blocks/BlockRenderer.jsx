import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { mark_block_loading, mark_block_loaded } from "../signals/summarySignals.js";

const ComponentNotFound = ({ blockType }) => (
  <div className="p-4 border border-yellow-300 rounded bg-yellow-50">
    <p className="text-sm text-yellow-700">
      {__("Admin component not found:", "wpcbooking")}{" "}
      <code className="bg-yellow-100 px-1">{blockType}</code>
    </p>
  </div>
);

const getComponentForType = (blockType) => {
  const componentMap = {
    ["booking/date-picker"]: () => import("./DatePicker.jsx"),
    ["booking/time-picker"]: () => import("./TimePicker.jsx"),
    ["booking/google-map"]: () => import("./GoogleMap.jsx"),
    ["booking/number-input"]: () => import("./NumberInput.jsx"),
    ["booking/text-input"]: () => import("./TextInput.jsx"),
    ["booking/email-input"]: () => import("./EmailInput.jsx"),
    ["booking/phone-input"]: () => import("./PhoneInput.jsx"),
    ["booking/icons-list"]: () => import("./IconsList.jsx"),
    ["booking/product-list"]: () => import("./ProductList.jsx"),
    ["booking/product-grid"]: () => import("./ProductList.jsx"),

    //delete blocks:
    //['booking/radio-group']: () => import('./AdminRadioGroup.jsx'),
    //['booking/checkbox']: () => import('./AdminCheckbox.jsx'),
    //['booking/select']: () => import('./AdminSelect.jsx'),
    //['booking/textarea']: () => import('./AdminTextarea.jsx'),
    //['booking/calculator']: () => import('./AdminCalculator.jsx')
  };

  return componentMap[blockType] || null;
};

const BlockRenderer = ({
  blockType,
  attrs = {},
  step,
  postId,
  value,
  onChange,
}) => {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fieldId = attrs?.field_id;
    if (!fieldId) {
      console.warn("[BlockRenderer] No field_id in attrs", attrs);
      return;
    }

    mark_block_loading(step, fieldId);

    const componentLoader = getComponentForType(blockType);
    if (!componentLoader) {
      console.error("[AdminBlockRenderer] No loader found for:", blockType);
      setError(new Error(`Component loader not found for: ${blockType}`));
      setLoading(false);
      mark_block_loaded(step, fieldId);
      return;
    }

    componentLoader()
      .then((module) => {
        setComponent(() => module.default || module);
        setLoading(false);
        
        requestAnimationFrame(() => {
          mark_block_loaded(step, fieldId);
        });
      })
      .catch((err) => {
        console.error(
          `[AdminBlockRenderer] Error loading admin block ${blockType}:`,
          err
        );
        setError(err);
        setLoading(false);
        mark_block_loaded(step, fieldId);
      });
  }, [blockType, step, attrs?.field_id]);

  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded bg-red-50">
        <p className="text-sm text-red-700">
          {__("Error rendering component:", "wpcbooking")} {error.message}
        </p>
      </div>
    );
  }

  if (!Component) {
    console.warn("[AdminBlockRenderer] Component not found:", blockType);
    return <ComponentNotFound blockType={blockType} />;
  }

  const handleChange = (...args) => {
    let finalFieldId, finalValue, block_total;
    
    if (args.length >= 2) {
      // Voláno s (fieldId, value, block_total?) - z BlockComponent.handle_change
      finalFieldId = args[0];
      finalValue = args[1];
      block_total = args[2] ?? null;
    } else {
      // Voláno pouze s (value) - nový styl
      finalFieldId = attrs.field_id;
      finalValue = args[0];
      block_total = null;
    }

    if (onChange) {
      onChange(finalFieldId, finalValue, block_total);
    }
  };
  return (
    <Component
      attrs={attrs}
      step={step}
      postId={postId}
      value={value}
      onChange={handleChange}
    />
  );
};

export default BlockRenderer;
