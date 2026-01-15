import { h, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { useBookingContext } from "../contexts/BookingContext.jsx";
import { loadDraft } from "../utils/storage.js";
import { check_step_condition_with_manager } from "../../../utils/stepConditions.js";
import CartTotal from "./CartTotal.jsx";
import SummaryDataRenderer from "./composite/SummaryDataRenderer.jsx";
import EditStepPopup from "./EditStepPopup.jsx";

const SummarySection = ({
  form_data,
  errorManager,
  sections = {},
  on_validation_change,
  on_edit_step,
  on_form_data_update,
}) => {
  const context = useBookingContext();
  const {
    bookingFormManager,
    booking_id,
    maxReachedStep,
    getSummaryData,
    summaryData,
  } = context || {};
  const cardManager = bookingFormManager ? bookingFormManager.getCard() : null;

  // State for edit popup
  const [edit_step, set_edit_step] = useState(null);
  const [edit_step_label, set_edit_step_label] = useState("");

  // State for summary data - initialize once and manage internally
  const [summary_data, set_summary_data] = useState(() => {
    return summaryData;
  });
  const [is_refreshing, set_is_refreshing] = useState(false);
  const [refresh_key, set_refresh_key] = useState(0);

  // Function to reload summary data from storage after mutation
  const reload_summary_data = () => {
    if (!booking_id) {
      console.error(
        "❌ [SummarySection] Cannot reload: booking_id is missing!"
      );
      return;
    }

    set_is_refreshing(true);

    // Delay to ensure mutation is complete and storage is updated
    setTimeout(() => {
      const summaryData = getSummaryData();

      if (summaryData) {
        // Update state and force re-render with new key
        set_summary_data(summaryData);
        set_refresh_key((prev) => prev + 1);
      } else {
        console.warn("⚠️ [SummarySection] No summary data found in storage");
      }

      set_is_refreshing(false);
    }, 200);
  };

  // ⚠️ Data validation - check if summary_data exists
  if (!summary_data) {
    console.error("❌ [SummarySection] summary_data is missing or null");
    return (
      <div className="p-4 border border-yellow-300 rounded bg-yellow-50">
        <p className="text-sm text-yellow-700">
          {__("Summary data not available", "wpcbooking")}
        </p>
      </div>
    );
  }

  // ⚠️ Destructure summary data with safe defaults
  const {
    summary_options = {},
    form_options = {},
    blocks = [],
    quote_data = {},
    currency = "DKK",
    total_quote = 0,
    total_base = 0,
    shipping_total = 0,
  } = summary_data || {};

  // Track terms state locally for proper validation
  const [terms_state, set_terms_state] = useState(() => {
    const initial_terms = form_data?.terms_conditions || {};
    return initial_terms;
  });

  // Track if terms were touched (user interaction)
  const terms_touched_ref = useRef(false);

  // Calculate initial validity
  const calculate_terms_validity = (terms_state, summary_options) => {
    if (!summary_options.terms || !Array.isArray(summary_options.terms))
      return true;

    const required_terms = summary_options.terms.filter(
      (term) => term.required === true
    );

    if (required_terms.length === 0) return true; // No required terms, always valid

    const validation_result = required_terms.every((term) => {
      const is_accepted = terms_state[term.page_id] === "yes";
      return is_accepted;
    });
    return validation_result;
  };

  // Initialize isValid state
  const [isValid, setIsValid] = useState(() => {
    const initial_validity = calculate_terms_validity(
      terms_state,
      summary_options
    );
    return initial_validity;
  });

  // Initialize error state
  const [error, setError] = useState(null);

  // Field ID for terms validation (used for error display)
  const terms_field_id = "terms_conditions";

  // ⚠️ Listen to cart updates from BookingFormManager
  useEffect(() => {
    if (!bookingFormManager) return;

    const handleCartUpdate = (event) => {
      if (event.type === "cart_updated_from_server") {
        console.log("🛒 [SummarySection] Cart updated from server, refreshing summary");
        // Force re-render of entire summary section
        set_refresh_key((prev) => prev + 1);
        // Also reload summary data to get latest from storage
        reload_summary_data();
      }
    };

    bookingFormManager.add_listener(handleCartUpdate);

    return () => {
      bookingFormManager.remove_listener(handleCartUpdate);
    };
  }, [bookingFormManager]);

  // ⚠️ Validate terms on mount and when terms change (similar to useInputField pattern)
  useEffect(() => {
    const is_valid = calculate_terms_validity(terms_state, summary_options);
    // Only show errors if terms were touched
    if (terms_touched_ref.current) {
      if (!is_valid) {
        const error_message = __(
          "You must agree to all required terms and conditions.",
          "wpcbooking"
        );
        setError(error_message);
        if (errorManager) {
          errorManager.setFieldError(terms_field_id, error_message);
        }
      } else {
        setError(null);
        if (errorManager) {
          errorManager.clearFieldError(terms_field_id);
        }
      }
    }

    setIsValid(is_valid);

    // Update bookingFormManager if available
    if (bookingFormManager) {
      bookingFormManager.setFieldValid(terms_field_id, is_valid);
    }

    // Notify parent component about validation change
    if (on_validation_change) {
      on_validation_change(is_valid);
    }
  }, [
    terms_state,
    summary_options.terms,
    on_validation_change,
    errorManager,
    bookingFormManager,
  ]);

  // ⚠️ Handle terms checkbox change (similar to useInputField handleChange pattern)
  const handle_terms_change = (term_name, checked) => {
    // Mark as touched on first user interaction
    if (!terms_touched_ref.current) {
      terms_touched_ref.current = true;
    }

    const updated_terms = {
      ...terms_state,
      [term_name]: checked ? "yes" : "",
    };

    set_terms_state(updated_terms);

    // Update parent form_data using callback if available, otherwise direct mutation
    if (on_form_data_update && form_data) {
      const updated_form_data = {
        ...form_data,
        terms_conditions: updated_terms,
      };
      on_form_data_update(updated_form_data);
    } else if (form_data) {
      // Fallback to direct mutation if callback not available
      form_data.terms_conditions = updated_terms;
    }
  };

  // ⚠️ Handle edit button click - open popup instead of navigating
  const handle_edit_click = (step_num, step_label) => {
    if (errorManager) {
      errorManager.clearAllGlobalErrors();
    }

    set_edit_step(step_num);
    set_edit_step_label(step_label);
  };

  // Handle popup close
  const handle_popup_close = () => {
    set_edit_step(null);
    set_edit_step_label("");
  };

  // Handle save success - refresh summary data after mutation is complete
  const handle_save_success = (result) => {
    // Mutation is complete, now reload summary data from storage
    // This will re-render the entire summary section including step items and CartTotal
    reload_summary_data();
  };

  // ⚠️ Render step items from blocks array
  const render_step_items = () => {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return null;
    }
    // Filter blocks based on step conditions and map with original indices
    const filtered_blocks = blocks
      .map((block, original_index) => ({ block, original_index }))
      .filter(({ block, original_index }) => {
        const step_num = original_index + 1;
        const conditions = block?.data?.conditions;

        return check_step_condition_with_manager(
          conditions,
          step_num,
          maxReachedStep || 999,
          cardManager
        );
      });

    return (
      <Fragment>
        <ul className="space-y-5 mt-5" key={`step-items-${refresh_key}`}>
          {filtered_blocks.map(({ block, original_index }) => {
            // ⚠️ Validate block structure
            if (!block) {
              return null;
            }
            // Extract data from block (from steps object via BookingHeader)
            const data = block.data || {};
            const price_step = block.price_step || 0;
            const value_step = block.value_step || 0;
            const item_output = block.item_output || "";
            const render_data = block.render_data || [];

            // Transform thumbnail_src to proper URL (same as BookingHeader)
            let thumbnail_url = null;
            if (data.thumbnail_src) {
              const wpContentIndex = data.thumbnail_src.indexOf("wp-content");
              if (wpContentIndex !== -1) {
                const relativePath =
                  data.thumbnail_src.substring(wpContentIndex);
                // Use full URL with origin (like in target HTML)
                thumbnail_url = `${window.location.origin}/${relativePath}`;
              } else {
                thumbnail_url = data.thumbnail_src;
              }
            }

            // Step number is from original index (steps start at 1)
            const step_num = original_index + 1;

            // Generate unique key
            const item_key = `summary-step-${step_num}-${
              data.title || original_index
            }`;

            // Combine label_summary and title for display (like in target HTML)
            const combined_label = `${
              data.label_summary ||
              __("List of choices from step", "wpcbooking")
            } ${data.title || ""}`;

            return (
              <Fragment key={item_key}>
                {/* <!--- item summary step ---> */}
                <li className="aff-summary-item min-h-[70px] flex flex-col bg-th-grey-lighter rounded-[35px]">
                  {/* 📦 Wrapper for main content (icon + text + buttons) */}
                  <div className="flex flex-col medium:flex-row justify-between items-center w-full rounded-[35px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]">
                    {/* 🎂 Icon + step name */}
                    <div className="min-h-[66px] w-full medium:w-4/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
                      <div className="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
                        {thumbnail_url ? (
                          <div
                            style={{ "--mask-img": `url('${thumbnail_url}')` }}
                            className="w-25p h-25p bg-white cs-mask"
                          />
                        ) : (
                          <div
                            style={{
                              "--mask-img": `url('data:image/svg+xml,<svg>📋</svg>')`,
                            }}
                            className="w-25p h-25p bg-white cs-mask"
                          />
                        )}
                      </div>
                      <div className="af-p20 text-th-grey">
                        {combined_label}
                      </div>
                    </div>

                    {/* 🛠 Edit button and price */}
                    <div className="flex justify-end items-center gap-x-4 pr-30p max-medium:p-30p">
                      {summary_options.show_calculations == 1 &&
                        value_step > 0 && (
                          <div className="aff-step-price af-p20-bold text-black uppercase">
                            {value_step}
                            <span className="currnency_symbol">
                              {" "}
                              {currency}
                            </span>
                          </div>
                        )}

                      {on_edit_step && (
                        <button
                          type="button"
                          className="aff-edit-button px-4 py-2 bg-th-orange-light text-white rounded-full hover:bg-th-orange transition-colors cursor-pointer af-p18"
                          data-step={step_num}
                          data-edit="yes"
                          data-title={combined_label}
                          onClick={() =>
                            handle_edit_click(step_num, combined_label)
                          }
                          aria-label={
                            __("Edit step", "wpcbooking") + ` ${step_num}`
                          }
                        >
                          {__("Edit", "wpcbooking")}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 🧾 USER DATA - always BELOW the main block */}
                  {render_data && render_data.length > 0 && (
                    <SummaryDataRenderer render_data={render_data} />
                  )}

                  {(!render_data || render_data.length === 0) &&
                    item_output &&
                    item_output.trim().length > 0 && (
                      <div
                        className="user-data w-full p-4 shadow-lg mt-4 rounded-[35px]"
                        dangerouslySetInnerHTML={{ __html: item_output }}
                      />
                    )}
                </li>
              </Fragment>
            );
          })}
        </ul>
      </Fragment>
    );
  };

  // ⚠️ Render terms and conditions with validation
  const render_terms = () => {
    if (!summary_options.terms || !Array.isArray(summary_options.terms)) {
      return null;
    }

    // Filter out invalid terms
    const valid_terms = summary_options.terms.filter(
      (row) => row && row.info_label && row.page_id
    );

    if (valid_terms.length === 0) {
      return null;
    }

    return (
      <div className="cs-privacy mt-12 py-6 border-y border-th-grey-ultralight">
        {valid_terms.map((row, index) => {
          const term_page_title = row.page_title || "";
          const term_page_url = row.page_url || "#";
          const link = `<a href="${term_page_url}" target="_BLANK" rel="noopener noreferrer">${term_page_title}</a>`;
          const checkbox_name = row.page_id;
          const is_checked = terms_state[checkbox_name] === "yes";
          const is_required = row.required === 1;

          return (
            <div
              key={`term-${checkbox_name}-${index}`}
              data-name={checkbox_name}
              className="flex items-start gap-x-3 mb-3"
            >
              <input
                type="checkbox"
                data-label-required={__(
                  "You must agree to the terms and conditions.",
                  "wpcbooking"
                )}
                data-label={term_page_title}
                value="yes"
                id={checkbox_name}
                name={`terms_conditions[${checkbox_name}]`}
                required={is_required}
                checked={is_checked}
                onChange={(e) =>
                  handle_terms_change(checkbox_name, e.target.checked)
                }
                className="mt-1"
                aria-label={term_page_title}
                aria-invalid={!!error}
                aria-describedby={error ? `${terms_field_id}-error` : undefined}
              />
              <label htmlFor={checkbox_name} className="flex-1 cursor-pointer">
                <span
                  className="af-p18"
                  dangerouslySetInnerHTML={{
                    __html: row.info_label.includes("%s")
                      ? row.info_label.replace("%s", link)
                      : row.info_label,
                  }}
                />
                {is_required && (
                  <span
                    className="text-red-500 ml-1"
                    aria-label={__("Required", "wpcbooking")}
                  >
                    *
                  </span>
                )}
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* 🔧 Edit Step Popup */}
      {edit_step !== null && (
        <EditStepPopup
          step_num={edit_step}
          step_label={edit_step_label}
          sections={sections}
          form_data={form_data}
          on_close={handle_popup_close}
          on_save_success={handle_save_success}
        />
      )}

      {/* 🔄 Loading indicator during refresh */}
      {is_refreshing && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🔄</div>
            <div className="af-p20 text-th-grey">
              {__("Updating summary...", "wpcbooking")}
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ Summary introduction text (optional) */}
      {summary_options.text && (
        <div className="w-11/12 af-p30-light text-black">
          {summary_options.text}
        </div>
      )}

      <div className="mt-75p">
        {/* 📋 Summary Header with icon and title */}
        <div className="min-h-[70px] flex justify-between items-center bg-th-grey rounded-[35px]">
          <div className="flex items-center gap-x-5 pl-40p">
            <div
              style={{
                "--mask-img": `url('${window.wpcbooking_public?.plugin_url}/assets/img/summary.svg')`,
              }}
              className="w-11 h-10 bg-white cs-mask"
            />
            <div className="af-p20-bold text-white uppercase">
              {(
                summary_options.label_summary ||
                __("summary of your event", "wpcbooking")
              ).toLowerCase()}
            </div>
          </div>
        </div>

        {/* 📋 Step Items - List of all previous steps with their data */}
        {render_step_items()}

        {/* 💰 Cart Total - Price breakdown and total */}
        <CartTotal
          key={`cart-total-${refresh_key}`}
          summary_options={summary_options}
          blocks={blocks}
          currency={currency}
          total_quote={total_quote}
          total_base={total_base}
          shipping_total={shipping_total}
        />

        {/* 📜 Terms and Conditions - Required checkboxes for legal agreements */}
        {render_terms()}

        {/* ⚠️ Mutation errors container (for GraphQL/API errors) */}
        <div data-name="mutions-errors"></div>
      </div>
    </>
  );
};

export default SummarySection;
