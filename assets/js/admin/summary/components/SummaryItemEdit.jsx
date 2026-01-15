import { h } from "preact";
import { useState } from "preact/hooks";
import { AdminBlockRenderer } from "../blocks/index.js";
import { getValues } from "../utils/configHelpers.js";
import { update_block_price } from "../signals/summarySignals.js";

const SummaryItemEdit = ({ stepSection, step, postId, onBlockChange }) => {
  const initialValues = getValues();
  const [blockValues, setBlockValues] = useState(initialValues);

  if (!stepSection || Object.keys(stepSection).length === 0) {
    return null;
  }

  const handleBlockChange = (fieldId, value, block_total = null) => {
    setBlockValues((prev) => {
      const newValues = {
        ...prev,
        [fieldId]: value,
      };
      return newValues;
    });
    
    // Signal-first: aktualizovat block price v signálu
    // Agregace na step level probíhá automaticky v computed signálech
    if (block_total !== null && block_total !== undefined) {
      update_block_price(step, fieldId, block_total);
    }
    
    if (typeof onBlockChange === "function") {
      onBlockChange(step, fieldId, value, block_total);
    }
  };

  return (
    <div className="w-full block">
      <div data-step={step} className="aff-summary-item-edit p-4">
        {Object.entries(stepSection).map(([index, attrs]) => {
          const blockType =
            attrs.blockName || attrs.type || "booking/text-input";
          const fieldId = attrs?.attrs?.field_id;
          const blockValue = blockValues[fieldId];
          const attrsValue = attrs.value;
          const value = blockValue ?? attrsValue ?? "";
          
          return (
            <AdminBlockRenderer
              key={fieldId}
              blockType={blockType}
              attrs={attrs?.attrs}
              step={step}
              postId={postId}
              value={value}
              onChange={handleBlockChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SummaryItemEdit;
