import { h } from "preact";
import { useState, useCallback, useEffect } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import {
  getPostId,
  getSummarySettings,
  getSteps,
  getStepSections,
  getPluginUrl,
  getProducts,
  isAdminDataAvailable,
} from "../utils/configHelpers.js";
import { check_step_condition } from "../../../utils/stepConditions.js";
import { getFormatConfig } from "../utils/priceFormatting.js";
import {
  final_price,
  total_base_price,
  total_percentage_price,
  update_base_price,
  update_block_percentage,
  remove_step_prices,
  edit_mode,
  step_totals_from_blocks,
  get_step_percentage_amount,
  is_initializing,
  set_initializing,
  all_blocks_loaded,
  blocks_loading_count,
  reset_blocks_loading,
} from "../signals/summarySignals.js";
import SummaryItem from "./SummaryItem.jsx";
//import AddNewRow from "./AddNewRow.jsx";
import SummaryCart from "./SummaryCart.jsx";

const AdminSummary = () => {
  if (!isAdminDataAvailable()) {
    console.warn("⚠️ Admin data not available");
    return (
      <div className="p-4 border border-yellow-300 rounded bg-yellow-50">
        <p className="text-sm text-yellow-700">
          {__(
            "⚠️ Window data not available. Admin Summary needs window.wpcbookingAdminData.",
            "wpcbooking"
          )}
        </p>
      </div>
    );
  }

  const postId = getPostId();
  const summarySettings = getSummarySettings();
  const formatConfig = getFormatConfig();
  const pluginUrl = getPluginUrl();

  const [steps, setSteps] = useState(getSteps());
  const [stepSections, setStepSections] = useState(getStepSections());

  useEffect(() => {
    reset_blocks_loading();
  }, []);

  useEffect(() => {
    if (all_blocks_loaded.value) {
      const timer = setTimeout(() => {
        set_initializing(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [all_blocks_loaded.value]);

  const handleLabelChange = useCallback((stepId, newLabel) => {
    setSteps((prev) => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        label_summary: newLabel,
      },
    }));
  }, []);

  const handleBlockChange = useCallback(
    (stepId, fieldId, value, block_total = null) => {
      // Aktualizace base price pokud přišla z bloku
      if (block_total !== null && block_total !== undefined) {
        update_base_price(stepId, block_total);
      }

      // Zpracování procentuálních změn
      if (
        Array.isArray(value) &&
        value[0] &&
        value[0].price_increase !== undefined
      ) {
        const percentage = parseFloat(value[0].price_increase) || 0;
        const operation = value[0].operation || "add";

        // Aktualizace percentage signálu pro konkrétní block (step + fieldId)
        update_block_percentage(stepId, fieldId, percentage, operation);

        // Aktualizace local state pro PHP uložení
        setSteps((prev) => ({
          ...prev,
          [stepId]: {
            ...prev[stepId],
            price_percentage: percentage,
            percentage_operation: operation,
          },
        }));

        return;
      }

      // Standardní aktualizace stepSections
      setStepSections((prev) => {
        const stepData = prev[stepId];

        if (Array.isArray(stepData)) {
          const updatedArray = stepData.map((block) => {
            if (block.field_id === fieldId) {
              return { ...block, value: value };
            }
            return block;
          });

          return {
            ...prev,
            [stepId]: updatedArray,
          };
        }

        if (stepData && typeof stepData === "object") {
          return {
            ...prev,
            [stepId]: {
              ...stepData,
              [fieldId]: {
                ...stepData[fieldId],
                value: value,
              },
            },
          };
        }

        console.warn("⚠️ Unexpected stepData structure:", stepData);
        return prev;
      });
    },
    []
  );

  const handleDelete = useCallback((stepId) => {
    setSteps((prev) => {
      const newSteps = { ...prev };
      delete newSteps[stepId];
      return newSteps;
    });

    setStepSections((prev) => {
      const newSections = { ...prev };
      delete newSections[stepId];
      return newSections;
    });

    // Odstraní jak base price tak percentage pro tento step
    remove_step_prices(stepId);
  }, []);

  const handleAddFee = useCallback(
    (label, price) => {
      const newStepId = Object.keys(steps).length + 1;

      setSteps((prev) => ({
        ...prev,
        [newStepId]: {
          id: newStepId,
          label_summary: label,
          value: price,
          price_percentage: 0,
          percentage_operation: "add",
          thumbnail_id: "info",
          thumbnail_src: `${pluginUrl}assets/img/info.svg`,
        },
      }));
    },
    [steps, pluginUrl]
  );

  const summaryIconUrl = `${pluginUrl}assets/img/summary.svg`;
  const iconMaskStyle = {
    "--mask-img": `url('${summaryIconUrl}')`,
  };

  const isLoading = is_initializing.value;

  return (
    <section
      id="admin-edit-quote"
      className={`py-50p overflow-hidden ${
        !edit_mode.value ? "quote-no-edit" : ""
      }`}
    >
      <div className="cs-container cs-grid items-center">
        <div className="col-span-full medium:col-[1/span_9] medium:self-start relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 rounded-[35px] min-h-[200px]">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-th-orange"></div>
                <p className="text-th-grey af-p20">
                  {__("Loading summary...", "wpcbooking")}
                </p>
                {blocks_loading_count.value > 0 && (
                  <p className="text-xs text-gray-500">
                    {blocks_loading_count.value} {__("blocks loading", "wpcbooking")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Header */}
          <div
            className={`min-h-[70px] flex justify-between items-center bg-th-grey rounded-[35px] ${
              isLoading ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center gap-x-5 pl-40p">
              <div
                style={iconMaskStyle}
                className="w-11 h-10 bg-white cs-mask"
              />
              <div className="af-p20-bold text-white uppercase">
                {summarySettings.labelSummary}
              </div>
            </div>
          </div>

          {/* Nonce pro security */}
          <input
            type="hidden"
            id="edit_summary_quote_nonce"
            name="edit_summary_quote_nonce"
            value={window.wpcbookingAdminData?.nonce || ""}
          />

          {}
          <ul
            className={`aff-summary-list space-y-5 mt-5 ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {Object.entries(steps).map(([stepId, step]) => {
              const products = getProducts();
              const maxStep = Object.keys(steps).length;
              const shouldShow = check_step_condition(
                step.conditions,
                parseInt(stepId),
                maxStep,
                products
              );
              const basePrice = step.base_price ?? 0;
              const percentagePrice = step.percentage_price ?? 0;

              if (!shouldShow) {
                return null;
              }

              return (
                <SummaryItem
                  step={parseInt(stepId)}
                  label={step.label_summary}
                  thumbnailSrc={step.thumbnail_url}
                  basePrice={basePrice}
                  percentagePrice={percentagePrice}
                  stepSection={stepSections[stepId] || {}}
                  onDelete={handleDelete}
                  onLabelChange={handleLabelChange}
                  onBlockChange={handleBlockChange}
                />
              );
            })}

            {/* Add New Fee Row */}
            {/*<AddNewRow
              currencySymbol={formatConfig.currencySymbol}
              stepCount={Object.keys(steps).length}
              onAdd={handleAddFee}
            />*/}
          </ul>

          {/* Hidden inputs pro PHP backend - Global Totals */}
          <input
            type="hidden"
            name="total_base_price"
            value={total_base_price.value}
          />
          <input
            type="hidden"
            name="total_percentage_price"
            value={total_percentage_price.value}
          />
          <input type="hidden" name="total_price" value={final_price.value} />

          {/* Hidden inputs - Step-level data */}
          {Object.entries(steps).map(([stepId, step]) => {
            // Použít computed hodnoty ze signals místo state
            const stepBasePrice =
              step_totals_from_blocks.value[stepId] ??
              step.base_price ??
              step.value ??
              0;
            const stepPercentageAmount = get_step_percentage_amount(stepId);
            const stepTotal = stepBasePrice + stepPercentageAmount;

            return (
              <div key={`step-hidden-${stepId}`} style={{ display: "none" }}>
                <input
                  type="hidden"
                  name={`total_price_step_${stepId}`}
                  value={stepBasePrice}
                />
                <input
                  type="hidden"
                  name={`price_percentage_step_${stepId}`}
                  value={stepPercentageAmount}
                />
                <input
                  type="hidden"
                  name={`price_products_step_${stepId}`}
                  value={step.value ?? 0}
                />
                <input
                  type="hidden"
                  name={`label_step_${stepId}`}
                  value={step.label_summary ?? ""}
                />
              </div>
            );
          })}

          <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
            <SummaryCart
              labelPrice={summarySettings.labelPrice}
              labelTotal={summarySettings.labelTotal}
            />
          </div>

          {}
        </div>
      </div>
    </section>
  );
};

export default AdminSummary;
