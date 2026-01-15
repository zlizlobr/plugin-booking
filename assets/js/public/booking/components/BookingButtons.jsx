import { h } from "preact";
import { useState, useEffect, useRef, useMemo } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { useBookingContextOptional } from "../contexts/BookingContext.jsx";

const BookingButtons = ({
  current_step,
  total_steps = 3,
  on_prev,
  on_next,
  on_submit,
  loading = false,
  next_button_text = __("Next", "wpcbooking"),
  prev_button_text = __("Previous", "wpcbooking"),
  is_valid = false,
  can_go_back = false,
}) => {
  const context = useBookingContextOptional();
  const [is_prev_loading, set_is_prev_loading] = useState(false);
  const [is_next_loading, set_is_next_loading] = useState(false);
  const nextButtonRef = useRef(null);

  const is_first_step = current_step === 1;
  const is_last_regular_step = current_step === total_steps;
  const is_summary_step = current_step > total_steps;
  const show_back_button = (can_go_back && !is_first_step) || is_summary_step;
  const next_button_disabled = loading || !is_valid;

  const effective_next_button_text =
    context?.nextButtonLabel || next_button_text;

  // Get summary data from context for summary step
  const summaryData = useMemo(() => {
    if (is_summary_step && context?.summaryData) {
      return context.summaryData;
    }
    return null;
  }, [is_summary_step, context?.summaryData]);

  // Get button text and icon from summary options
  const effective_save_button_text = useMemo(() => {
    if (is_summary_step && summaryData?.summary_options?.send_button_text) {
      return summaryData.summary_options.send_button_text;
    }
  }, [is_summary_step, summaryData]);

  const send_button_icon = useMemo(() => {
    if (is_summary_step && summaryData?.summary_options?.send_button_icon) {
      return summaryData.summary_options.send_button_icon;
    }
    return null;
  }, [is_summary_step, summaryData]);

  useEffect(() => {
    set_is_prev_loading(false);
    set_is_next_loading(false);
  }, [current_step, loading]);

  // Reset next button loading when errors are displayed
  useEffect(() => {
    const errorManager = context?.errorManager;
    if (!errorManager) return;

    const handleError = (event) => {
      // Reset loading when field errors or global errors are added
      if (event.type === "field_error" || event.type === "global_error") {
        set_is_next_loading(false);
      }
    };

    errorManager.addListener(handleError);

    return () => {
      errorManager.removeListener(handleError);
    };
  }, [context?.errorManager]);

  // Force DOM update for disabled attribute

  const handle_prev_click = (e) => {
    e.preventDefault();
    if (show_back_button && on_prev) {
      set_is_prev_loading(true);
      on_prev();
    }
  };

  const handle_next_click = (e) => {
    e.preventDefault();

    if (next_button_disabled) {
      return;
    }

    set_is_next_loading(true);

    if (is_summary_step && on_submit) {
      // Na Summary kroku je Next = Submit
      on_submit();
    } else if (is_last_regular_step && on_next) {
      // Na posledním regulérním kroku je Next = přepnout na Summary
      on_next();
    } else if (!is_last_regular_step && on_next) {
      // Standardní Next
      on_next();
    }
  };

  return (
    <div className="cs-container">
      <div
        className={`w-full mt-40p large:mt-75p flex ${
          is_first_step
            ? "justify-center"
            : "justify-center medium:justify-between"
        } gap-4 flex-wrap medium:flex-nowrap`}
      >
        {!is_first_step && (
          <button
            className={`cs-form-button-prev ${
              is_prev_loading ? "loading" : ""
            }`}
            id="aff_prev_button"
            name="aff_prev_button"
            onClick={handle_prev_click}
            disabled={loading || is_prev_loading}
          >
            {prev_button_text}
          </button>
        )}
        <button
          ref={nextButtonRef}
          type={is_summary_step ? "submit" : "button"}
          className={[
            is_summary_step ? "aff-form-button-submit" : "cs-form-button-next",
            is_next_loading ? "loading" : "",
            next_button_disabled ? "is-disabled" : "",
            is_summary_step ? "is-summary" : "",
            is_summary_step && send_button_icon
              ? "flex items-center justify-center gap-2 whitespace-nowrap"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          name={is_summary_step ? "send_order" : "next_button"}
          id={is_summary_step ? "send_order" : "next_button"}
          data-quote-initialized={is_summary_step ? "true" : undefined}
          data-label-button={is_first_step ? "Pick later" : undefined}
          onClick={handle_next_click}
          disabled={next_button_disabled || is_next_loading}
        >
          {is_summary_step
            ? effective_save_button_text
            : effective_next_button_text}
          {is_summary_step && send_button_icon && (
            <span
              className="button-icon cs-mask"
              style={{
                "--mask-img": `url('${send_button_icon}')`,
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingButtons;
