import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { useStepCondition } from "../hooks/useStepCondition.js";
import { useBookingContext } from "../contexts/BookingContext.jsx";

const BookingHeader = ({
  errorManager,
  title = "",
  colored_text = "",
  black_text = "",
  current_step = 1,
  steps = {},
  site_url = "",
  onSummaryClick = null,
  booking_id = null,
  onStepChange = null,
  max_reached_step = 1,
}) => {
  const { cardManager } = useBookingContext();
  const { checkStepCondition } = useStepCondition(cardManager);

  const [icons, set_icons] = useState([]);
  const [global_errors, set_global_errors] = useState([]);
  const [tooltip, set_tooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (errorManager) {
      const global_error_listener = (event) => {
        if (event.type === "global_error") {
          set_global_errors((prev) => [...prev, event.error]);
        } else if (event.type === "global_error_removed") {
          set_global_errors((prev) =>
            prev.filter((error) => error.id !== event.errorId)
          );
        } else if (event.type === "global_errors_cleared") {
          set_global_errors([]);
        }
      };

      errorManager.addListener(global_error_listener);

      return () => {
        errorManager.removeListener(global_error_listener);
      };
    }
  }, [errorManager]);

  useEffect(() => {
    if (steps && Object.keys(steps).length > 0) {
      const processedIcons = Object.entries(steps).map(([stepId, stepData]) => {
        let iconUrl = null;
        if (stepData.thumbnail_src) {
          const wpContentIndex = stepData.thumbnail_src.indexOf("wp-content");
          if (wpContentIndex !== -1) {
            const relativePath =
              stepData.thumbnail_src.substring(wpContentIndex);
            iconUrl = site_url
              ? `${site_url}/${relativePath}`
              : `/${relativePath}`;
          } else {
            iconUrl = stepData.thumbnail_src;
          }
        }

        return {
          id: parseInt(stepId),
          title: stepData.title || `Step ${stepId}`,
          icon: iconUrl,
          thumbnail_id: stepData.thumbnail_id || null,
          excerpt: stepData.excerpt || "",
          label_summary: stepData.label_summary || "",
          conditions: stepData.conditions || null,
        };
      });

      // Add summary icon always (regardless of completed steps)
      const summaryIcon = {
        id: "summary",
        title: "Summary",
        icon: "/wp-content/plugins/wpcbooking/assets/img/summary.svg",
        isSummary: true,
        isAvailable: false,
      };
      processedIcons.push(summaryIcon);

      set_icons(processedIcons);
    }
  }, [steps, current_step]);

  const remove_global_error = (error_id) => {
    if (errorManager) {
      errorManager.removeGlobalError(error_id);
    }
  };

  const handle_mouse_enter = (e, icon_title, is_clickable) => {
    if (is_clickable) {
      const rect = e.currentTarget.getBoundingClientRect();
      set_tooltip({
        visible: true,
        text: icon_title,
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }
  };

  const handle_mouse_leave = () => {
    set_tooltip({ visible: false, text: "", x: 0, y: 0 });
  };

  return (
    <div className="cs-container cs-grid items-center gap-y-7 large:gap-y-10">
      <div className="col-span-full medium:col-[1/span_8] medium:-mr-th-gap self-start">
        <div className="grid relative">
          <div className="col-span-full row-span-full max-small:-mx-cont-px small:absolute right-0 h-full small:w-[110vw] medium:w-[70vw] bg-gradient-to-r from-th-orange to-th-pink rounded-r-full"></div>
          <h1 className="col-span-full row-span-full pt-40p pb-50p af-h1 text-white max-medium:text-center relative z-20">
            {title}
          </h1>
        </div>
      </div>

      <div className="col-span-full medium:col-[9/span_4] medium:ml-th-gap">
        <div className="af-p28 text-th-pink text-right">{colored_text}</div>
        <div className="af-p20-bold text-black text-right mt-2">
          {black_text}
        </div>
      </div>

      <div className="col-span-full medium:col-[1/span_10] medium:-mr-th-gap aff-form-icons-wrapper">
        <ul className="aff-form-icons flex gap-x-10p -translate-y-15p max-medium:px-cont-px py-3 max-medium:-mx-cont-px max-medium:overflow-x-auto">
          {icons.map((icon, index) => {
            const stepNum = index + 1;
            const isActive = stepNum <= current_step;
            const isCurrent = stepNum === current_step;
            const isSummary = icon.isSummary;
            // Summary is always clickable, regular steps only if <= max_reached_step
            const isClickable = isSummary || stepNum <= max_reached_step;

            // Handle icon click - summary or step change
            const handleIconClick = () => {
              handle_mouse_leave();
              if (errorManager) {
                errorManager.clearAllGlobalErrors();
              }
              if (isSummary && onSummaryClick) {
                onSummaryClick();
              } else if (
                isClickable &&
                onStepChange &&
                stepNum !== current_step &&
                !isSummary
              ) {
                onStepChange(stepNum);
              }
            };

            const shouldShowIcon = checkStepCondition(
              icon.conditions,
              stepNum,
              max_reached_step
            );

            if (!shouldShowIcon) {
              return null;
            }

            return (
              <li
                key={icon.id}
                data-step={stepNum}
                className={`${
                  isCurrent
                    ? "flex gap-x-20p items-center shrink-0 bg-th-orange-light rounded-full"
                    : isActive
                    ? "flex relative shrink-0"
                    : "shrink-0"
                }`}
              >
                {isCurrent ? (
                  <Fragment>
                    <div
                      data-step={stepNum}
                      data-title={icon.title}
                      className="shrink-0 w-85p h-85p rounded-full border-8 border-white bg-white flex items-center justify-center"
                      style={{
                        boxShadow: "0 0 20px #ee70136b",
                        cursor: isClickable ? "pointer" : "default",
                      }}
                      onClick={isClickable ? handleIconClick : undefined}
                    >
                      {icon.icon ? (
                        <div
                          style={{ "--mask-img": `url('${icon.icon}')` }}
                          className="w-40p h-40p bg-th-orange cs-mask"
                        ></div>
                      ) : (
                        <div
                          style={{
                            "--mask-img": `url('data:image/svg+xml,<svg>📋</svg>')`,
                          }}
                          className="w-40p h-40p bg-th-orange cs-mask"
                        ></div>
                      )}
                    </div>
                    <div className="pr-30p af-p18-form">{icon.title}</div>
                  </Fragment>
                ) : isActive ? (
                  <Fragment>
                    <div
                      data-step={stepNum}
                      data-title={icon.title}
                      className="icon-item w-85p h-85p rounded-full border-8 border-black bg-black flex items-center justify-center clickable-icon"
                      style={{
                        position: "relative",
                        cursor:
                          isSummary || isClickable ? "pointer" : "default",
                      }}
                      onClick={
                        isSummary || isClickable ? handleIconClick : undefined
                      }
                      onMouseEnter={(e) =>
                        handle_mouse_enter(
                          e,
                          icon.title,
                          isSummary || isClickable
                        )
                      }
                      onMouseLeave={handle_mouse_leave}
                    >
                      {icon.icon ? (
                        <div
                          style={{ "--mask-img": `url('${icon.icon}')` }}
                          className="w-40p h-40p bg-white cs-mask"
                        ></div>
                      ) : (
                        <div
                          style={{
                            "--mask-img": `url('data:image/svg+xml,<svg>📋</svg>')`,
                          }}
                          className="w-40p h-40p bg-white cs-mask"
                        ></div>
                      )}
                    </div>
                    <div className="absolute -z-10 ml-1 w-[200%] h-full bg-black rounded-full"></div>
                  </Fragment>
                ) : (
                  <div
                    data-step={stepNum}
                    data-title={icon.title}
                    className="icon-item w-85p h-85p rounded-full border-8 border-th-grey-form bg-white flex items-center justify-center clickable-icon"
                    style={{
                      position: "relative",
                      cursor: isSummary || isClickable ? "pointer" : "default",
                    }}
                    onClick={
                      isSummary || isClickable ? handleIconClick : undefined
                    }
                    onMouseEnter={(e) =>
                      handle_mouse_enter(
                        e,
                        icon.title,
                        isSummary || isClickable
                      )
                    }
                    onMouseLeave={handle_mouse_leave}
                  >
                    {icon.icon ? (
                      <div
                        style={{ "--mask-img": `url('${icon.icon}')` }}
                        className="w-40p h-40p bg-th-grey cs-mask"
                      ></div>
                    ) : (
                      <div
                        style={{
                          "--mask-img": `url('data:image/svg+xml,<svg>📋</svg>')`,
                        }}
                        className="w-40p h-40p bg-th-grey cs-mask"
                      ></div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-th-orange text-white px-3 py-2 rounded-lg shadow-lg af-p14 whitespace-nowrap">
            {tooltip.text}
            <div
              className="absolute left-1/2 bottom-0 w-0 h-0"
              style={{
                transform: "translate(-50%, 100%)",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid #EE7013",
              }}
            />
          </div>
        </div>
      )}
      {global_errors.length > 0 && (
        <div className="col-span-full">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 relative">
            <button
              onClick={() => errorManager.clearAllGlobalErrors()}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
              aria-label={__("Close all errors", "wpcbooking")}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex items-start gap-x-3">
              <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M14.611 18.856c-0.346 0.352-0.52 0.782-0.52 1.292 0 0.551 0.197 1.014 0.59 1.389 0.363 0.346 0.799 0.519 1.309 0.519 0.521 0 0.971-0.188 1.346-0.566s0.562-0.828 0.562-1.35c0-0.504-0.182-0.943-0.545-1.318-0.363-0.381-0.801-0.571-1.311-0.571-0.567-0.001-1.044 0.201-1.431 0.605v0zM14.391 10.788c-0.299 0.451-0.447 1.011-0.447 1.679 0 0.545 0.092 1.146 0.276 1.802s0.435 1.271 0.751 1.846c0.428 0.779 0.76 1.169 0.994 1.169 0.24 0 0.557-0.305 0.949-0.914 0.346-0.539 0.622-1.152 0.83-1.841s0.312-1.332 0.312-1.93c0-0.902-0.244-1.6-0.73-2.092-0.363-0.375-0.805-0.563-1.326-0.563-0.703 0-1.24 0.282-1.609 0.844v0z"></path>
                </svg>
              </div>
              <div className="flex-1 pr-6">
                <h3 className="text-sm font-medium text-red-800 mb-2">
                  {__("Form Errors", "wpcbooking")}
                </h3>
                <div className="space-y-2">
                  {global_errors.map((error) => (
                    <div
                      key={error.id}
                      className="flex items-start gap-x-2 text-sm text-red-700"
                    >
                      <span>{error.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHeader;
