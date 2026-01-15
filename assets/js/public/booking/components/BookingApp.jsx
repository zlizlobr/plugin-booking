import { h } from "preact";
import { useState, useEffect, useCallback, useMemo } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import BookingHeader from "./BookingHeader.jsx";
import BookingSection from "./BookingSection.jsx";
import BookingButtons from "./BookingButtons.jsx";
import ThankYouPage from "./ThankYouPage.jsx";
import { BookingProvider } from "../contexts/BookingContext.jsx";
import { loadDraft, patchDraft, clearDraft } from "../utils/storage.js";
import { createBookingFormManager } from "../utils/bookingFormManager.js";
import { createErrorManager } from "../utils/errorManager.js";
import { canGoBack, goBack } from "../utils/backNavigation.js";
import {
  DEV_RESET_FORM_DATA,
  DEV_LOG_STORAGE_DATA,
  logStorageData,
} from "../utils/devTools.js";
import { checkStepConditionWithManager } from "../hooks/useStepCondition.js";
import { SummaryDataFetcher } from "../utils/summaryQueries.js";

const BookingApp = ({
  bookingID,
  quoteHash = "",
  general = {},
  openInNewWindow = false,
  targetUrl = "",
}) => {
  const shouldRedirect = openInNewWindow && targetUrl;
  const [storedQuoteHash] = useState(() => {
    const draft = loadDraft(bookingID);
    if (
      draft?.quoteHash !== undefined &&
      draft?.quoteHash !== null &&
      draft?.quoteHash !== ""
    ) {
      return draft.quoteHash;
    }
    return quoteHash;
  });

  // Initialize state from draft synchronously (before first render)
  // Using lazy initialization - functions are called only once on mount
  const [formData, setFormData] = useState(() => {
    if (!bookingID) {
      return {};
    }

    // DEV: Reset form data if flag is enabled
    if (DEV_RESET_FORM_DATA) {
      console.warn("🔧 [DEV] Resetting form data...");
      clearDraft(bookingID);
      const initialDraft = {
        bookingId: bookingID,
        step: 1,
        maxReachedStep: 1,
        formData: {},
        quoteHash: storedQuoteHash,
      };
      patchDraft(bookingID, initialDraft);
      return {};
    }

    const draft = loadDraft(bookingID);

    if (draft) {
      // ⚠️ CRITICAL: Update draft with current quoteHash from props if different
      if (storedQuoteHash && draft.quoteHash !== storedQuoteHash) {
        patchDraft(bookingID, { quoteHash: storedQuoteHash });
      }

      return draft.formData || {};
    } else {
      const initialDraft = {
        bookingId: bookingID,
        step: 1,
        maxReachedStep: 1,
        formData: {},
        quoteHash: storedQuoteHash,
      };
      patchDraft(bookingID, initialDraft);
      return {};
    }
  });

  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(() => {
    if (!bookingID) {
      return 1;
    }

    if (DEV_RESET_FORM_DATA) {
      return 1;
    }

    if (shouldRedirect) {
      return 1;
    }

    const draft = loadDraft(bookingID);
    return draft?.step || 1;
  });

  const [maxReachedStep, setMaxReachedStep] = useState(() => {
    if (!bookingID) {
      return 1;
    }

    if (DEV_RESET_FORM_DATA) {
      return 1;
    }

    if (shouldRedirect) {
      return 1;
    }

    const draft = loadDraft(bookingID);
    return draft?.maxReachedStep || 1;
  });
  const [isValid, setIsValid] = useState(false);
  const [globalErrors, setGlobalErrors] = useState([]);
  const [errorManager] = useState(() => createErrorManager(bookingID));
  const [bookingFormManager] = useState(() =>
    createBookingFormManager(bookingID, storedQuoteHash, errorManager)
  );

  // GraphQL endpoint configuration
  const GRAPHQL_ENDPOINT =
    window.wpcbooking_public?.graphql_endpoint || "/graphql";

  const [fetcher] = useState(
    () =>
      new SummaryDataFetcher({
        endpoint: GRAPHQL_ENDPOINT,
        bookingId: bookingID,
        quoteHash: storedQuoteHash,
        errorManager: errorManager,
      })
  );

  const [nextButtonLabel, setNextButtonLabel] = useState(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Memoize setter to prevent unnecessary re-renders
  const updateNextButtonLabel = useCallback((label) => {
    setNextButtonLabel(label);
  }, []);

  // Memoize validation change handler to prevent unnecessary re-renders
  const handleValidationChange = useCallback((isValid) => {
    setIsValid(isValid);
  }, []);

  // Reset next button label when step changes
  useEffect(() => {
    setNextButtonLabel(null);
  }, [currentStep]);

  // Close calendar on step change
  useEffect(() => {
    const calendarElement = document.querySelector('.vc[data-vc="calendar"]');
    if (calendarElement) {
      calendarElement.style.display = "none";
      calendarElement.style.visibility = "hidden";
      calendarElement.setAttribute("data-vc-calendar-hidden", "true");
    }
  }, [currentStep]);

  const {
    title = "",
    colored_text = "",
    black_text = "",
    background_image = null,
    next_button_text = "Next",
    prev_button_text = "Previous",
    page_url_booking = "",
    steps = {},
    sections = {},
  } = general;

  // DEV: Log storage data if flag is enabled (only in useEffect, not during render)
  useEffect(() => {
    if (!bookingID) return;

    if (DEV_LOG_STORAGE_DATA) {
      logStorageData(bookingID);
    }
  }, [bookingID]);

  useEffect(() => {
    // Setup error listeners
    const handleGlobalError = (event) => {
      if (event.type === "global_error") {
        setGlobalErrors((prev) => [...prev, event.error]);
      } else if (event.type === "global_error_removed") {
        setGlobalErrors((prev) =>
          prev.filter((error) => error.id !== event.errorId)
        );
      } else if (event.type === "global_errors_cleared") {
        setGlobalErrors([]);
      }
    };

    errorManager.addListener(handleGlobalError);

    return () => {
      errorManager.removeListener(handleGlobalError);
    };
  }, [errorManager]);

  useEffect(() => {
    if (!bookingID) return;

    if (currentStep > maxReachedStep) {
      setMaxReachedStep(currentStep);
      patchDraft(bookingID, { maxReachedStep: currentStep });
    }
  }, [currentStep, maxReachedStep, bookingID]);

  const handleNextStep = async () => {
    errorManager.clearAllGlobalErrors();
    const saveStepResult = await fetcher.saveStep(currentStep, formData);

    // Store saveStep result in bookingFormManager for handlers
    // This will also update cartManager with products from saveStep
    if (saveStepResult && bookingFormManager) {
      bookingFormManager.set_save_step_result(saveStepResult);
    }
    
    // Find next valid step after saveStep is complete and cart is updated
    // This ensures conditions can check updated products
    const nextValidStep = findNextValidStep(currentStep);

    if (shouldRedirect) {
      const newWindow = window.open(targetUrl, "_blank");
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        window.location.href = targetUrl;
      }
      patchDraft(bookingID, {
        step: nextValidStep,
        maxReachedStep: nextValidStep,
      });
      return;
    } else {
      patchDraft(bookingID, {
        step: nextValidStep,
      });

      setCurrentStep(nextValidStep);
    }
    // DEV: Log storage data on step change if flag is enabled
    if (DEV_LOG_STORAGE_DATA) {
      setTimeout(() => logStorageData(bookingID), 100);
    }

    return true;
  };

  /**
   * Handle summary step submission with terms validation and custom mutation
   */
  const handleSummarySubmit = async () => {
    if (!isSummaryStep) {
      console.warn(
        "⚠️ [BookingApp] handleSummarySubmit called but not on summary step"
      );
      return;
    }

    setLoading(true);

    try {
      // Get summary data to access terms
      const summaryData = getSummaryData();

      if (!summaryData) {
        console.error("❌ [BookingApp] Summary data not available");
        throw new Error(__("Summary data not available", "wpcbooking"));
      }

      const { summary_options = {} } = summaryData;
      const { terms = [] } = summary_options;

      // Validate terms - check if all required terms are accepted
      if (Array.isArray(terms) && terms.length > 0) {
        const required_terms = terms.filter((term) => term.required === true);
        if (required_terms.length > 0) {
          const terms_conditions = formData?.terms_conditions || {};
          const all_required_accepted = required_terms.every((term) => {
            const is_accepted = terms_conditions[term.page_id] === "yes";
            return is_accepted;
          });

          if (!all_required_accepted) {
            console.error(
              "❌ 1[BookingApp] Not all required terms are accepted"
            );

            errorManager.addGlobalError({
              message: __(
                "You must agree to all required terms and conditions.",
                "wpcbooking"
              ),
              type: "error",
            });
            setLoading(false);
            return;
          }

          // Prepare terms conditions array for mutation - use index instead of page_title
          // Map to indices in the original terms array for accepted terms
          console.log("🔍 [BookingApp] terms: ", terms_conditions);
          console.log("🔍 [BookingApp] terms_conditions: ", terms);
          const termsConditionsArray = terms
            .map((term, index) => {
              const is_accepted = terms_conditions[term.page_id] === "yes";
              return is_accepted ? term.page_id : null;
            })
            .filter((index) => index !== null);

          // Double check - if we have required terms but array is empty, something is wrong
          if (required_terms.length > 0 && termsConditionsArray.length === 0) {
            console.error(
              "❌ 2[BookingApp] Required terms exist but none are accepted!"
            );
            errorManager.addGlobalError({
              message: __(
                "You must agree to all required terms and conditions.",
                "wpcbooking"
              ),
              type: "error",
            });
            setLoading(false);
            return;
          }

          console.log("📦 [BookingApp] Submitting with formData:", formData);

          // Submit order with quote_hash, bookingID, terms and formData
          const result = await fetcher.submit_quote_and_process(
            storedQuoteHash,
            bookingID,
            termsConditionsArray,
            formData,
            summary_options,
            general
          );
          if (result.success) {
            setOrderSubmitted(true);
            setOrderData(result.order_data);
            clearDraft(bookingID);
            removeStorage(bookingID);
            errorManager.clearAllGlobalErrors();
          } else {
            console.error(
              "❌ [BookingApp] Order submission failed:",
              result.errors
            );
            errorManager.addGlobalError({
              message: result.errors.join(", "),
              type: "error",
            });
          }
        } else {
          // No required terms, just submit
          const result = await fetcher.submit_quote_and_process(
            storedQuoteHash,
            bookingID,
            [],
            formData,
            summary_options,
            general
          );

          if (result.success) {
            setOrderSubmitted(true);
            setOrderData(result.order_data);
            clearDraft(bookingID);
            removeStorage(bookingID);
            errorManager.clearAllGlobalErrors();
          } else {
            console.error(
              "❌ [BookingApp] Order submission failed:",
              result.errors
            );
            errorManager.addGlobalError({
              message: result.errors.join(", "),
              type: "error",
            });
          }
        }
      } else {
        // No terms configured, just submit
        const result = await fetcher.submit_quote_and_process(
          storedQuoteHash,
          bookingID,
          [],
          formData,
          summary_options,
          general
        );

        if (result.success) {
          setOrderSubmitted(true);
          setOrderData(result.order_data);
          clearDraft(bookingID);
          removeStorage(bookingID);
          errorManager.clearAllGlobalErrors();
        } else {
          console.error(
            "❌ [BookingApp] Order submission failed:",
            result.errors
          );
          errorManager.addGlobalError({
            message: result.errors.join(", "),
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error("🔴 [BookingApp] Error in handleSummarySubmit:", error);
      console.error("🔴 [BookingApp] Error stack:", error.stack);
      errorManager.addGlobalError({
        message: error.message || __("Error submitting order", "wpcbooking"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormDataChange = (newData) => {
    const updatedFormData = { ...formData, ...newData };
    setFormData(updatedFormData);

    // DEV: Log storage data on change if flag is enabled
    if (DEV_LOG_STORAGE_DATA) {
      setTimeout(() => logStorageData(bookingID), 100);
    }
  };

  // Get summary data from window.wpcbooking, but blocks from storage
  const getSummaryData = useCallback(() => {
    const { options_summary } = window.wpcbookingOptions || {};
    const draft = loadDraft(bookingID);
    const summaryData = draft?.summaryData || {};
    // Initialize result with summary_options from window.wpcbooking
    const result = {
      summary_options: options_summary || {},
      blocks: [],
      quote_data: {},
      currency: "DKK",
      total_quote: 0,
      total_base: 0,
      shipping_total: 0,
    };

    if (!summaryData) {
      return result;
    }
    if (
      summaryData &&
      typeof summaryData === "object" &&
      !Array.isArray(summaryData)
    ) {
      // Transform blocks object to array if needed

      // Convert object with numeric keys to array, preserving order by key
      const blocksArray = Object.keys(summaryData)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((key) => summaryData[key]);

      // Return transformed data
      const transformedData = {
        summary_options: options_summary,
        blocks: blocksArray,
      };
      return transformedData;
    }

    return result;
  }, [bookingID]);

  // Summary step detection
  const totalSteps = Object.keys(steps).length;
  const isSummaryStep = currentStep > totalSteps;

  // Get summary data once if on summary step
  const summaryData = useMemo(() => {
    return isSummaryStep ? getSummaryData() : null;
  }, [isSummaryStep, getSummaryData]);

  const cardManager = useMemo(() => {
    return bookingFormManager ? bookingFormManager.getCard() : null;
  }, [bookingFormManager]);

  const findNextValidStep = (fromStep) => {
    // Get fresh cardManager to ensure we have updated products after saveStep
    const currentCardManager = bookingFormManager ? bookingFormManager.getCard() : cardManager;
    
    for (let step = fromStep + 1; step <= totalSteps; step++) {
      const stepData = steps[step];
      if (!stepData) {
        continue;
      }

      const shouldShow = checkStepConditionWithManager(
        stepData.conditions,
        step,
        maxReachedStep + 1,
        currentCardManager
      );
      if (shouldShow) {
        return step;
      }
    }
    return totalSteps + 1;
  };

  const findPrevValidStep = (fromStep) => {
    for (let step = fromStep - 1; step >= 1; step--) {
      const stepData = steps[step];
      if (!stepData) {
        continue;
      }

      const shouldShow = checkStepConditionWithManager(
        stepData.conditions,
        step,
        maxReachedStep,
        cardManager
      );
      if (shouldShow) {
        return step;
      }
    }
    return 1;
  };

  const handlePrevStep = async () => {
    errorManager.clearAllGlobalErrors();
    if (isSummaryStep) {
      const lastValidStep = findPrevValidStep(totalSteps + 1);
      setCurrentStep(lastValidStep);
      patchDraft(bookingID, { step: lastValidStep });
    } else if (canGoBack(currentStep)) {
      const newStep = findPrevValidStep(currentStep);
      setCurrentStep(newStep);
      patchDraft(bookingID, { step: newStep });
    }
  };

  const handleStepClick = (stepNum) => {
    // Only allow clicking on steps that are <= max reached step
    // This is handled in BookingHeader, but we validate here too
    if (stepNum !== currentStep) {
      setCurrentStep(stepNum);
      patchDraft(bookingID, { step: stepNum });
    }
  };

  const handleSummaryClick = () => {
    // Instead of modal, switch to Summary step
    setCurrentStep(totalSteps + 1);
    patchDraft(bookingID, { step: totalSteps + 1 });
  };

  const handleEditStep = (stepId) => {
    setCurrentStep(parseInt(stepId));
    patchDraft(bookingID, { step: parseInt(stepId) });
  };
  if (!steps || Object.keys(steps).length === 0) {
    return (
      <div className="booking-error">
        <p>{__("Booking form is not configured", "wpcbooking")}</p>
      </div>
    );
  }

  // Create context value for the entire booking flow
  const contextValue = {
    booking_id: bookingID,
    errorManager,
    bookingFormManager,
    onChange: (fieldName, value) =>
      handleFormDataChange({ [fieldName]: value }),
    nextButtonLabel,
    setNextButtonLabel: updateNextButtonLabel,
    currentStep,
    maxReachedStep,
    cardManager,
    getSummaryData,
    summaryData,
  };

  const preventFormSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const sectionClass =
    currentStep === 1
      ? "pb-55p lg:pb-100p overflow-hidden aff-is-in-footer"
      : "pb-55p lg:pb-100p overflow-hidden";

  // Show thank you page if order was submitted successfully
  if (orderSubmitted && orderData) {
    return (
      <ThankYouPage
        heading={orderData.heading}
        text={orderData.text}
        background_image={orderData.background_image}
        button_link={orderData.button_link}
        button_label={orderData.button_label}
      />
    );
  }

  return (
    <BookingProvider value={contextValue}>
      <form
        method="post"
        className="cs-ignore-gutenberg alignfull"
        onSubmit={preventFormSubmit}
        onKeyDown={handleKeyDown}
      >
        <input type="hidden" name="booking_id" value={bookingID} />
        <input type="hidden" name="step" value={currentStep} />
        <input type="hidden" name="quote_hash" value={storedQuoteHash} />
        <input type="hidden" name="booking_url" value={page_url_booking} />
        <section id={currentStep} className={sectionClass}>
          <BookingHeader
            errorManager={errorManager}
            title={title}
            colored_text={colored_text}
            black_text={black_text}
            current_step={currentStep}
            booking_id={bookingID}
            steps={steps}
            max_reached_step={maxReachedStep}
            onSummaryClick={handleSummaryClick}
            onStepChange={handleStepClick}
          />

          <BookingSection
            step={currentStep}
            sections={sections}
            excerpt={steps[currentStep]?.excerpt ?? ""}
            is_summary_step={isSummaryStep}
            form_data={formData}
            errorManager={errorManager}
            on_validation_change={handleValidationChange}
            on_edit_step={handleEditStep}
            on_form_data_update={(updatedFormData) => {
              setFormData(updatedFormData);
            }}
          />

          <BookingButtons
            current_step={currentStep}
            total_steps={Object.keys(steps).length}
            on_prev={handlePrevStep}
            on_next={handleNextStep}
            on_submit={isSummaryStep ? handleSummarySubmit : null}
            loading={loading}
            next_button_text={next_button_text}
            prev_button_text={prev_button_text}
            is_valid={isValid}
            can_go_back={canGoBack(currentStep)}
          />
        </section>
      </form>
    </BookingProvider>
  );
};

export default BookingApp;
