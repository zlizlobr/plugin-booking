import { h } from "preact";
import { useState, useEffect, useMemo } from "preact/hooks";
import { formatPrice } from "../utils/priceFormatting.js";
import {
  item_base_prices,
  step_totals_from_blocks,
  currency_symbol,
  edit_mode,
  init_base_price,
  init_percentage_from_amount,
  get_step_percentage_amount,
} from "../signals/summarySignals.js";
import SummaryItemEdit from "./SummaryItemEdit.jsx";

const SummaryItem = ({
  step,
  label,
  thumbnailSrc,
  basePrice = 0,
  percentagePrice = 0,
  stepSection = {},
  onDelete,
  onLabelChange,
  onBlockChange,
}) => {
  const [currentLabel, setCurrentLabel] = useState(label);
  useEffect(() => {
    init_base_price(step, basePrice);
    if (percentagePrice !== 0) {
      init_percentage_from_amount(step, percentagePrice);
    }
  }, [step, basePrice, percentagePrice]);

  const maskStyle = {
    "--mask-img": `url('${thumbnailSrc}')`,
  };

  const is_editable = !edit_mode.value;
  const currency = currency_symbol.value;

  const base_price = useMemo(() => {
    const block_total = step_totals_from_blocks.value[step];
    const legacy_total = item_base_prices.value[step];
    return block_total ?? legacy_total ?? basePrice ?? 0;
  }, [step, step_totals_from_blocks.value, item_base_prices.value, basePrice]);

  const percentage_amount = get_step_percentage_amount(step);

  const step_total = base_price + percentage_amount;

  const handle_block_change = (
    stepId,
    fieldId,
    blockValue,
    block_total = null
  ) => {
    // Předáme nahoru do AdminSummary
    if (typeof onBlockChange === "function") {
      onBlockChange(stepId, fieldId, blockValue, block_total);
    }
  };

  const isPriceVisible = step_total != 0 || base_price != 0;

  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setCurrentLabel(newLabel);
    if (typeof onLabelChange === "function") {
      onLabelChange(step, newLabel);
    }
  };

  const handleDelete = () => {
    if (typeof onDelete === "function") {
      onDelete(step);
    }
  };

  return (
    <li
      data-step={step}
      className="aff-summary-item min-h-[70px] flex flex-col medium:flex-col justify-stretch medium:justify-between max-medium:px-1 items-stretch bg-th-grey-lighter rounded-[35px] pb-marker-bottom-30"
    >
      {}
      <div className="flex flex-row w-full rounded-[35px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
        {/* Icon and Label item */}
        <div className="min-h-[66px] w-3/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
          {/* Ikona */}
          <div className="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
            <div style={maskStyle} className="w-25p h-25p bg-white cs-mask" />
          </div>

          {/* Label */}
          <div className="w-full af-p20 text-th-grey inline-flex flex-row items-center">
            {is_editable ? (
              <>
                <span
                  className="delete-item-x cursor-pointer text-red-500 mr-2 font-bold"
                  onClick={handleDelete}
                >
                  X
                </span>
                <span className="w-full">{currentLabel}</span>
              </>
            ) : (
              <input
                type="text"
                name={`label_step_${step}`}
                value={currentLabel}
                onInput={handleLabelChange}
                className="quote_label w-full h-[50px] bg-transparent"
              />
            )}
          </div>
        </div>

        {/* Price item */}
        <div className="price-item flex items-center gap-x-4">
          <div
            className={
              isPriceVisible
                ? "aff-step-price absolute right-[70px] af-p20-bold text-black uppercase flex items-center gap-x-1 whitespace-nowrap"
                : "hidden"
            }
          >
            <span className="block_price_products">
              {formatPrice(step_total)}
            </span>
          </div>

          {/* Hidden inputs pro PHP - base price */}
          <input
            type="hidden"
            data-step={step}
            data-currency={currency}
            name={`step_base_price_${step}`}
            value={base_price}
          />
          {/* Hidden inputs pro PHP - percentage amount */}
          <input
            type="hidden"
            data-step={step}
            data-currency={currency}
            name={`step_percentage_price_${step}`}
            value={percentage_amount}
          />
          {/* Hidden inputs pro PHP - total */}
          <input
            type="hidden"
            data-step={step}
            data-currency={currency}
            name={`step_total_price_${step}`}
            value={step_total}
          />
        </div>
      </div>

      {/* Edit sekce */}
      <div className="w-full block">
        <SummaryItemEdit
          stepSection={stepSection}
          step={step}
          onBlockChange={handle_block_change}
        />
      </div>
    </li>
  );
};

export default SummaryItem;
