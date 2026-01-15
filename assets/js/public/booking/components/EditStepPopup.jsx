import { h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { useBookingContext } from "../contexts/BookingContext.jsx";
import { BlockRenderer } from "../blocks/index.js";
import { SummaryDataFetcher } from "../utils/summaryQueries.js";
import { loadDraft, patchDraft } from "../utils/storage.js";

const EditStepPopup = ({
  step_num,
  step_label,
  sections,
  form_data,
  on_close,
  on_save_success,
  }) => {
    const context = useBookingContext();
    const { bookingFormManager, booking_id, errorManager, currentStep } = context || {};
    
    // Get graphql endpoint from window global
    const graphql_endpoint = window.wpcbooking_public?.graphql_endpoint || "/graphql";
    
    // Get quote hash from draft storage
    const quote_hash = (() => {
      const draft = loadDraft(booking_id);
      return draft?.quoteHash || "";
    })();
    
    // Initialize fetcher for saveStep
    const [fetcher] = useState(() => 
      new SummaryDataFetcher({
        endpoint: graphql_endpoint,
        bookingId: booking_id,
        quoteHash: quote_hash,
        errorManager: errorManager,
      })
    );
    
    const [is_saving, set_is_saving] = useState(false);
    const [is_valid, set_is_valid] = useState(false);

  // Get current step sections
  const current_step_sections = sections[step_num] || [];

  // Initialize validation for this step
  useEffect(() => {
    if (!bookingFormManager || !current_step_sections.length) return;

    bookingFormManager.initializeStepValidation(step_num, sections, form_data);

    // Check if step is valid
    const checkValidation = () => {
      const isStepValid = bookingFormManager.isStepValid(step_num);
      set_is_valid(isStepValid);
    };

    checkValidation();

    // Listen for validation changes
    const handleValidationChange = (event) => {
      if (event.type === 'field_validation_changed' && event.step === step_num) {
        const isStepValid = bookingFormManager.isStepValid(step_num);
        set_is_valid(isStepValid);
      } else if (event.type === 'step_validation_initialized' && event.step === step_num) {
        set_is_valid(event.isStepValid);
      }
    };

    bookingFormManager.add_listener(handleValidationChange);

    return () => {
      bookingFormManager.remove_listener(handleValidationChange);
    };
  }, [step_num, bookingFormManager, current_step_sections, sections, form_data]);

  // Handle save button click
  const handle_save = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!is_valid || is_saving) return;

    set_is_saving(true);

    try {
      const result = await fetcher.saveStep(step_num, form_data, { autoHandleErrors: false });
      
      if (result.success) {
        await patchDraft(booking_id, { step: currentStep});
        
        if (on_close) {
          on_close();
        }
        
        if (on_save_success) {
          on_save_success(result);
        }
      } else {
        console.error("🔴 [EditStepPopup] Save failed:", result.errors);
        
        if (
          result.errors &&
          typeof result.errors === "object" &&
          !Array.isArray(result.errors)
        ) {
          Object.keys(result.errors).forEach((fieldId) => {
            const errorMessage = result.errors[fieldId];
            const message = Array.isArray(errorMessage)
              ? errorMessage.join(", ")
              : errorMessage;
            errorManager.setFieldError(fieldId, message);
          });
        } else if (Array.isArray(result.errors)) {
          result.errors.forEach((errorMsg) => {
            errorManager.addGlobalError({
              message: errorMsg,
              type: "error",
            });
          });
        }
      }
    } catch (error) {
      console.error("🔴 [EditStepPopup] Save error:", error);
      errorManager.addGlobalError({
        message: __("An error occurred while saving", "wpcbooking"),
        type: "error",
      });
    } finally {
      set_is_saving(false);
    }
  };

  // Handle backdrop click
  const handle_backdrop_click = (e) => {
    if (e.target === e.currentTarget && !is_saving) {
      if (on_close) {
        on_close();
      }
    }
  };

  // Handle escape key
  useEffect(() => {
    const handle_key_down = (e) => {
      if (e.key === "Escape" && !is_saving && on_close) {
        on_close();
      }
    };

    window.addEventListener("keydown", handle_key_down);
    return () => window.removeEventListener("keydown", handle_key_down);
  }, [is_saving, on_close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={handle_backdrop_click}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[1200px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {__("Edit", "wpcbooking")} - {step_label}
          </h2>
          <button
            type="button"
            onClick={on_close}
            disabled={is_saving}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label={__("Close", "wpcbooking")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="acf-innerblocks-container">
            {current_step_sections.length > 0 ? (
              current_step_sections.map((block, index) => (
                <BlockRenderer
                  key={`${block.blockName}-${index}`}
                  block_data={block}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 af-p20">
                  {__("No content configured for this step", "wpcbooking")}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={on_close}
            disabled={is_saving}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 af-p18"
          >
            {__("Cancel", "wpcbooking")}
          </button>
          <button
            type="button"
            onClick={(e) => handle_save(e)}
            disabled={!is_valid || is_saving}
            className="px-6 py-2 text-white bg-th-orange rounded-full hover:bg-th-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed af-p18"
          >
            {is_saving ? __("Saving...", "wpcbooking") : __("Save", "wpcbooking")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStepPopup;

