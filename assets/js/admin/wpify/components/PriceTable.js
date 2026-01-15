import React from "react";

/**
 * PriceTable Component
 *
 * Price table field component for wpify-custom-fields with popup modal.
 * Uses DOM manipulation for popup and renders TableBuilderComponent via ReactDOM.
 * Wpify does NOT support React hooks - this component must be a pure function.
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Field identifier
 * @param {string} props.htmlId - HTML element ID
 * @param {string|Object} props.value - Current field value (JSON string or object)
 * @param {Function} props.onChange - Change handler function
 * @param {string} props.label - Field label
 * @param {string} props.className - CSS class names
 * @returns {JSX.Element} Price table builder component
 */
const PriceTable = (props) => {
  const { htmlId, value, onChange, label, className = "" } = props;
  // Safety check for onChange function
  if (typeof onChange !== "function") {
    return null;
  }

  // Generovat unikátní ID
  const uniqueId = htmlId || `price-table-${Date.now()}`;
  const popupId = `price-table-popup-${uniqueId}`;
  const containerId = `table-builder-container-${uniqueId}`;

  // Parse initial value
  const parseValue = () => {
    if (!value) return null;
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
    return value;
  };

  // Temporary storage for unsaved changes
  let temporaryTableData = null;

  // Handle table data changes from TableBuilderComponent
  // Store changes temporarily, don't save until Save button is clicked
  const handleTableDataChange = (tableData) => {
    // Store in temporary variable, don't save to hidden input yet
    temporaryTableData = tableData;
  };

  // Render TableBuilderComponent into popup container
  const renderTableBuilder = () => {
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    // Clean up previous render if exists
    if (container._reactRoot) {
      try {
        // Try React 18 unmount
        if (container._reactRoot.unmount) {
          container._reactRoot.unmount();
        } else {
          // Fallback for React 17
          const ReactDOM = window.ReactDOM || require("react-dom");
          if (ReactDOM && ReactDOM.unmountComponentAtNode) {
            ReactDOM.unmountComponentAtNode(container);
          }
        }
      } catch (e) {
        // Ignore unmount errors
      }
      container._reactRoot = null;
    }

    // Dynamically import TableBuilderComponent and ReactDOM
    Promise.all([
      import(
        /* webpackChunkName: "assets_js_admin_TableBuilderComponent_jsx" */ "../../TableBuilderComponent.jsx"
      ),
      import(
        /* webpackChunkName: "node_modules_react-dom_client_js" */ "react-dom/client"
      ).catch(() => ({ createRoot: null })),
    ])
      .then(([componentModule, reactDOMClient]) => {
        const TableBuilderComponent = componentModule.default;
        const { createRoot } = reactDOMClient;

        // Parse initial data
        const initialData = parseValue();

        // Try React 18 createRoot first
        if (createRoot) {
          try {
            const root = createRoot(container);
            container._reactRoot = root;

            root.render(
              React.createElement(TableBuilderComponent, {
                initialData: initialData,
                onDataChange: handleTableDataChange,
                uniqueId: uniqueId,
                hiddenInputId: htmlId,
              })
            );
            return;
          } catch (error) {
            console.warn(
              "React 18 createRoot failed, falling back to React 17:",
              error
            );
          }
        }

        // Fallback to React 17 render
        const ReactDOM = window.ReactDOM || require("react-dom");
        if (ReactDOM && ReactDOM.render) {
          ReactDOM.render(
            React.createElement(TableBuilderComponent, {
              initialData: initialData,
              onDataChange: handleTableDataChange,
              uniqueId: uniqueId,
              hiddenInputId: htmlId,
            }),
            container
          );
          container._reactRoot = { legacy: true };
        } else {
          console.error("ReactDOM not available");
        }
      })
      .catch((error) => {
        console.error("Failed to load TableBuilderComponent:", error);
      });
  };

  const openPopup = () => {
    const popup = document.getElementById(popupId);

    if (popup) {
      // Store original value before making changes
      const hiddenInput = document.getElementById(htmlId);
      const originalValue = hiddenInput ? hiddenInput.value : (typeof value === "string" ? value : JSON.stringify(value || {}));
      popup.dataset.originalValue = originalValue;
      
      // Reset temporary data to current value
      temporaryTableData = parseValue();

      // Remove hidden class FIRST, then set display
      popup.classList.remove("hidden");

      // Force display with !important via setProperty
      popup.style.setProperty("display", "flex", "important");
      popup.style.setProperty("visibility", "visible", "important");
      popup.style.setProperty("opacity", "1", "important");

      // Ensure all critical styles are set
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.right = "0";
      popup.style.bottom = "0";
      popup.style.zIndex = "100000";
      popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      popup.style.alignItems = "center";
      popup.style.justifyContent = "center";

      if (document.body) {
        document.body.style.overflow = "hidden";
      }

      // Render TableBuilderComponent when popup opens
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        renderTableBuilder();
      }, 100);
    } else {
      console.error("[PriceTable] Popup element not found with ID:", popupId);
    }
  };

  const closePopup = (restoreOriginal = false) => {
    const popup = document.getElementById(popupId);
    const modalFrame = popup?.querySelector(".components-modal__frame");
    const fullscreenBtn = popup?.querySelector('[aria-label="Fullscreen"]');

    if (popup) {
      // If canceling, restore original value
      if (restoreOriginal && popup.dataset.originalValue !== undefined) {
        const hiddenInput = document.getElementById(htmlId);
        if (hiddenInput) {
          hiddenInput.value = popup.dataset.originalValue;
        }
        // Reset temporary data
        temporaryTableData = null;
      }
      // Reset fullscreen state if active
      if (popup.classList.contains("wpcbooking-fullscreen")) {
        popup.classList.remove("wpcbooking-fullscreen");

        // Reset fullscreen icon
        if (fullscreenBtn) {
          const svg = fullscreenBtn.querySelector("svg path");
          if (svg) {
            svg.setAttribute(
              "d",
              "M4 4h6v1.5H5.5v4.5H4V4zm9.5 0H20v6h-1.5V5.5H13.5V4zM4 20v-6h1.5v4.5H10V20H4zm10 0v-1.5h4.5V14H20v6h-6z"
            );
          }
        }
      }

      // Reset all popup styles
      popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      popup.style.width = "";
      popup.style.height = "";
      popup.style.alignItems = "center";
      popup.style.justifyContent = "center";
      popup.style.padding = "";
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.right = "0";
      popup.style.bottom = "0";
      popup.style.zIndex = "100000";

      // Reset modal frame styles
      if (modalFrame) {
        modalFrame.style.width = "90%";
        modalFrame.style.maxWidth = "800px";
        modalFrame.style.maxHeight = "400vh";
        modalFrame.style.height = "auto";
        modalFrame.style.borderRadius = "4px";
        modalFrame.style.margin = "";
        modalFrame.style.position = "";
        modalFrame.style.zIndex = "";
      }

      // Reset header and footer styles
      const modalHeader = popup?.querySelector(".components-modal__header");
      const modalFooter = popup?.querySelector(
        ".components-flex.block-editor-freeform-modal__actions"
      );
      const modalContent = popup?.querySelector(".components-modal__content");

      if (modalHeader) {
        modalHeader.style.position = "";
        modalHeader.style.zIndex = "";
        modalHeader.style.backgroundColor = "";
      }
      if (modalFooter) {
        modalFooter.style.position = "";
        modalFooter.style.zIndex = "";
        modalFooter.style.backgroundColor = "";
      }
      if (modalContent) {
        modalContent.style.position = "";
        modalContent.style.zIndex = "";
      }

      popup.style.display = "none";
      popup.classList.add("hidden");
      if (document.body) {
        document.body.style.overflow = "";
      }
    }
    // Clean up React root when popup closes
    const container = document.getElementById(containerId);
    if (container && container._reactRoot) {
      try {
        if (container._reactRoot.legacy) {
          const ReactDOM = window.ReactDOM || require("react-dom");
          if (ReactDOM && ReactDOM.unmountComponentAtNode) {
            ReactDOM.unmountComponentAtNode(container);
          }
        } else if (container._reactRoot.unmount) {
          container._reactRoot.unmount();
        }
      } catch (e) {
        // Ignore unmount errors
      }
      container._reactRoot = null;
    }
  };

  const savePopup = () => {
    // Save temporary data to hidden input and trigger onChange
    if (temporaryTableData !== null) {
      const jsonString = JSON.stringify(temporaryTableData);
      const hiddenInput = document.getElementById(htmlId);
      if (hiddenInput) {
        hiddenInput.value = jsonString;
      }
      // Call wpify onChange callback
      if (onChange && typeof onChange === "function") {
        onChange(jsonString);
      }
    }
    // Clear temporary data
    temporaryTableData = null;
    closePopup(false);
  };

  const toggleFullscreen = () => {
    const popup = document.getElementById(popupId);
    const modalFrame = popup?.querySelector(".components-modal__frame");
    const modalContent = popup?.querySelector(".components-modal__content");
    const modalHeader = popup?.querySelector(".components-modal__header");
    const modalFooter = popup?.querySelector(
      ".components-flex.block-editor-freeform-modal__actions"
    );
    const fullscreenBtn = popup?.querySelector('[aria-label="Fullscreen"]');
    if (!popup || !modalFrame) return;

    // Ensure CSS styles are injected for fullscreen
    let styleElement = document.getElementById(
      `wpcbooking-fullscreen-styles-${uniqueId}`
    );
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = `wpcbooking-fullscreen-styles-${uniqueId}`;
      styleElement.textContent = `
                .wpcbooking-fullscreen .components-modal__header {
                    visibility: visible !important;
                    opacity: 1 !important;
                    display: flex !important;
                    position: relative !important;
                    z-index: 1000 !important;
                    background-color: #fff !important;
                    overflow: visible !important;
                }
                .wpcbooking-fullscreen .components-modal__header * {
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                .wpcbooking-fullscreen .components-modal__header > div:last-child {
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    z-index: 1001 !important;
                    position: relative !important;
                }
                .wpcbooking-fullscreen .components-modal__header button {
                    visibility: visible !important;
                    opacity: 1 !important;
                    display: flex !important;
                    pointer-events: auto !important;
                    z-index: 1002 !important;
                    position: relative !important;
                    min-width: 32px !important;
                    min-height: 32px !important;
                    cursor: pointer !important;
                }
                .wpcbooking-fullscreen .components-modal__header button svg,
                .wpcbooking-fullscreen .components-modal__header button svg path {
                    visibility: visible !important;
                    opacity: 1 !important;
                    display: block !important;
                    fill: currentColor !important;
                }
                .wpcbooking-fullscreen .components-flex.block-editor-freeform-modal__actions {
                    visibility: visible !important;
                    opacity: 1 !important;
                    display: flex !important;
                    position: relative !important;
                    z-index: 1000 !important;
                    background-color: #fff !important;
                    overflow: visible !important;
                }
                .wpcbooking-fullscreen .components-flex.block-editor-freeform-modal__actions * {
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                .wpcbooking-fullscreen .components-flex.block-editor-freeform-modal__actions button {
                    visibility: visible !important;
                    opacity: 1 !important;
                    display: inline-block !important;
                    pointer-events: auto !important;
                    z-index: 1001 !important;
                    position: relative !important;
                    cursor: pointer !important;
                }
                .wpcbooking-fullscreen .components-modal__content {
                    overflow: visible !important;
                }
                .wpcbooking-fullscreen .wpcooking-price-table-popup-body {
                    overflow: auto !important;
                }
            `;
      document.head.appendChild(styleElement);
    }

    const isFullscreen = popup.classList.contains("wpcbooking-fullscreen");
    if (isFullscreen) {
      // Exit fullscreen - return to normal modal
      popup.classList.remove("wpcbooking-fullscreen");
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.right = "0";
      popup.style.bottom = "0";
      popup.style.width = "";
      popup.style.height = "";
      popup.style.zIndex = "100000";
      popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      popup.style.alignItems = "center";
      popup.style.justifyContent = "center";
      popup.style.padding = "";

      modalFrame.style.width = "90%";
      modalFrame.style.maxWidth = "800px";
      modalFrame.style.maxHeight = "400vh";
      modalFrame.style.height = "auto";
      modalFrame.style.borderRadius = "4px";
      modalFrame.style.margin = "auto";

      // Reset header and footer styles
      if (modalHeader) {
        modalHeader.style.position = "";
        modalHeader.style.zIndex = "";
        modalHeader.style.backgroundColor = "";
        modalHeader.style.visibility = "";
        modalHeader.style.opacity = "";
        modalHeader.style.display = "";

        // Reset all buttons in header
        const headerButtons = modalHeader.querySelectorAll("button");
        headerButtons.forEach((btn) => {
          btn.style.visibility = "";
          btn.style.opacity = "";
          btn.style.display = "";
          btn.style.pointerEvents = "";
          btn.style.zIndex = "";
          btn.style.position = "";
        });
      }
      if (modalFooter) {
        modalFooter.style.position = "";
        modalFooter.style.zIndex = "";
        modalFooter.style.backgroundColor = "";
        modalFooter.style.visibility = "";
        modalFooter.style.opacity = "";
        modalFooter.style.display = "";

        // Reset all buttons in footer
        const footerButtons = modalFooter.querySelectorAll("button");
        footerButtons.forEach((btn) => {
          btn.style.visibility = "";
          btn.style.opacity = "";
          btn.style.display = "";
          btn.style.pointerEvents = "";
          btn.style.zIndex = "";
          btn.style.position = "";
        });
      }
      if (modalContent) {
        modalContent.style.position = "";
        modalContent.style.zIndex = "";
      }

      // Update icon to fullscreen
      if (fullscreenBtn) {
        const svg = fullscreenBtn.querySelector("svg path");
        if (svg) {
          svg.setAttribute(
            "d",
            "M4 4h6v1.5H5.5v4.5H4V4zm9.5 0H20v6h-1.5V5.5H13.5V4zM4 20v-6h1.5v4.5H10V20H4zm10 0v-1.5h4.5V14H20v6h-6z"
          );
        }
      }
    } else {
      // Enter fullscreen - true fullscreen on viewport
      popup.classList.add("wpcbooking-fullscreen");
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.left = "0";
      popup.style.right = "0";
      popup.style.bottom = "0";
      popup.style.width = "100vw";
      popup.style.height = "100vh";
      popup.style.zIndex = "999999";
      popup.style.backgroundColor = "#fff";
      popup.style.alignItems = "stretch";
      popup.style.justifyContent = "stretch";
      popup.style.padding = "0";

      modalFrame.style.width = "100vw";
      modalFrame.style.maxWidth = "none";
      modalFrame.style.maxHeight = "none";
      modalFrame.style.height = "100vh";
      modalFrame.style.borderRadius = "0";
      modalFrame.style.margin = "0";
      modalFrame.style.position = "relative";
      modalFrame.style.zIndex = "1";

      // Ensure modalContent doesn't clip header/footer
      if (modalContent) {
        modalContent.style.position = "relative";
        modalContent.style.zIndex = "1";
        modalContent.style.overflow = "visible"; // Allow header/footer to be visible
      }

      // Ensure header and footer are visible with proper z-index
      if (modalHeader) {
        modalHeader.style.position = "relative";
        modalHeader.style.zIndex = "1000";
        modalHeader.style.backgroundColor = "#fff";
        modalHeader.style.visibility = "visible";
        modalHeader.style.opacity = "1";
        modalHeader.style.display = "flex";
        modalHeader.style.overflow = "visible";

        // Ensure all buttons in header are visible
        const headerButtons = modalHeader.querySelectorAll("button");
        headerButtons.forEach((btn) => {
          btn.style.setProperty("visibility", "visible", "important");
          btn.style.setProperty("opacity", "1", "important");
          btn.style.setProperty("display", "flex", "important");
          btn.style.setProperty("pointer-events", "auto", "important");
          btn.style.setProperty("z-index", "1001", "important");
          btn.style.setProperty("position", "relative", "important");
          btn.style.setProperty("min-width", "32px", "important");
          btn.style.setProperty("min-height", "32px", "important");

          // Ensure SVG icons are visible
          const svg = btn.querySelector("svg");
          if (svg) {
            svg.style.setProperty("visibility", "visible", "important");
            svg.style.setProperty("opacity", "1", "important");
            svg.style.setProperty("display", "block", "important");
          }
        });
      }
      if (modalFooter) {
        modalFooter.style.position = "relative";
        modalFooter.style.zIndex = "1000";
        modalFooter.style.backgroundColor = "#fff";
        modalFooter.style.visibility = "visible";
        modalFooter.style.opacity = "1";
        modalFooter.style.display = "flex";
        modalFooter.style.overflow = "visible";

        // Ensure all buttons in footer are visible
        const footerButtons = modalFooter.querySelectorAll("button");
        footerButtons.forEach((btn) => {
          btn.style.setProperty("visibility", "visible", "important");
          btn.style.setProperty("opacity", "1", "important");
          btn.style.setProperty("display", "inline-block", "important");
          btn.style.setProperty("pointer-events", "auto", "important");
          btn.style.setProperty("z-index", "1001", "important");
          btn.style.setProperty("position", "relative", "important");
        });
      }

      // Update icon to exit fullscreen
      if (fullscreenBtn) {
        const svg = fullscreenBtn.querySelector("svg path");
        if (svg) {
          svg.setAttribute(
            "d",
            "M14.5 4H20v5.5h-1.5V5.5H14.5V4zm-9 0v1.5H5.5V9.5H4V4h5.5zm5 10.5H20V20h-5.5v-1.5h4v-4h1.5zm-9 0v4h4v1.5H4V14.5h1.5z"
          );
        }
      }
    }
  };

  // Create popup in body on first render to avoid parent container overflow
  const ensurePopupInBody = () => {
    let popupContainer = document.getElementById(popupId);

    if (!popupContainer) {
      popupContainer = document.createElement("div");
      popupContainer.id = popupId;
      popupContainer.className =
        "components-modal__screen-overlay wpcbooking-price-table-popup hidden";
      popupContainer.style.cssText =
        "position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 100000; display: none; align-items: center; justify-content: center;";

      popupContainer.innerHTML = `
                <div class="components-modal__frame block-editor-freeform-modal__content" style="width: 90%; max-width: 800px; max-height: 90vh; background-color: #fff; border-radius: 4px; display: flex; flex-direction: column;" role="dialog" aria-labelledby="wpcbooking-modal-header-${uniqueId}" tabindex="-1">
                    <div class="components-modal__content wpcbooking-modal-content" role="document" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
                        <div class="components-modal__header" style="padding: 16px 24px; border-bottom: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 100; background-color: #fff; flex-shrink: 0; visibility: visible; opacity: 1;">
                            <div class="components-modal__header-heading-container">
                                <h1 id="wpcbooking-modal-header-${uniqueId}" class="components-modal__header-heading" style="margin: 0; font-size: 18px; font-weight: 600;">Price Table Builder</h1>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; position: relative; z-index: 101; visibility: visible; opacity: 1;">
                                <button type="button" class="components-button is-compact has-icon wpcbooking-close-btn" aria-label="Close" style="background: none; border: none; cursor: pointer; padding: 8px; color: #1e1e1e; display: flex; align-items: center; justify-content: center; position: relative; z-index: 102; visibility: visible; opacity: 1; min-width: 32px; min-height: 32px; pointer-events: auto;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" style="fill: currentColor; display: block; visibility: visible; opacity: 1;">
                                        <path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="wpcbooking-price-table-popup-body" style="flex: 1; overflow: auto; padding: 24px; position: relative; z-index: 1;">
                            <div id="${containerId}" data-unique-id="${uniqueId}" style="position: relative; z-index: 1;">
                            </div>
                        </div>
                        <div class="components-flex block-editor-freeform-modal__actions" style="padding: 16px 24px; border-top: 1px solid #ddd; display: flex; justify-content: flex-end; gap: 12px; position: relative; z-index: 100; background-color: #fff; flex-shrink: 0; visibility: visible; opacity: 1;">
                            <div class="components-flex-item" style="position: relative; z-index: 101; visibility: visible; opacity: 1;">
                                <button type="button" class="components-button wpcbooking-cancel-btn" style="position: relative; z-index: 102; visibility: visible; opacity: 1; display: inline-block; pointer-events: auto; cursor: pointer; min-width: auto; min-height: auto;">Cancel</button>
                            </div>
                            <div class="components-flex-item" style="position: relative; z-index: 101; visibility: visible; opacity: 1;">
                                <button type="button" class="components-button is-primary wpcbooking-save-btn" style="position: relative; z-index: 102; visibility: visible; opacity: 1; display: inline-block; pointer-events: auto; cursor: pointer; min-width: auto; min-height: auto;">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

      document.body.appendChild(popupContainer);

      // Attach event listeners
      const closeBtn = popupContainer.querySelector(".wpcbooking-close-btn");
      const cancelBtn = popupContainer.querySelector(".wpcbooking-cancel-btn");
      const saveBtn = popupContainer.querySelector(".wpcbooking-save-btn");

      if (closeBtn) closeBtn.addEventListener("click", () => closePopup(true));
      if (cancelBtn) cancelBtn.addEventListener("click", () => closePopup(true));
      if (saveBtn) saveBtn.addEventListener("click", savePopup);
    }

    return popupContainer;
  };

  // Ensure popup exists before opening
  const openPopupEnhanced = () => {
    ensurePopupInBody();
    openPopup();
  };

  return (
    <div
      className={`wpifycf-field-price_table ${className}`}
      data-unique-id={uniqueId}
    >
      {label && (
        <label
          htmlFor={htmlId}
          style={{ display: "block", marginBottom: "8px" }}
        >
          {label}
        </label>
      )}
      <div className="wpcbooking-price-table-builder">
        <button
          type="button"
          className="wpifycf-button wpcbooking-price-table-btn"
          onClick={openPopupEnhanced}
        >
          Options prices
        </button>
        {/* Popup is now rendered directly in document.body via ensurePopupInBody() */}
      </div>
      {/* Hidden input pro hodnotu */}
      <input
        type="hidden"
        id={htmlId}
        value={typeof value === "string" ? value : JSON.stringify(value || {})}
      />
    </div>
  );
};

/**
 * Validation method for PriceTable field
 * Validuje, že hodnota je validní JSON objekt
 *
 * @param {HTMLElement} element - The field element
 * @returns {boolean} True if valid, false otherwise
 */
PriceTable.checkValidity = (element) => {
  // Safety check - element může být undefined
  if (!element || typeof element.querySelector !== "function") {
    return true;
  }

  const hiddenInput = element.querySelector('input[type="hidden"]');
  if (!hiddenInput || !hiddenInput.value) {
    return true; // Prázdné pole je validní
  }

  try {
    const parsed = JSON.parse(hiddenInput.value);
    return (
      typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)
    );
  } catch (e) {
    return false;
  }
};

// Register the price_table field type using WordPress global hooks
const registerPriceTable = () => {
  if (
    typeof window.wp === "undefined" ||
    !window.wp.hooks ||
    !window.wp.hooks.addFilter
  ) {
    setTimeout(registerPriceTable, 100);
    return;
  }

  try {
    window.wp.hooks.addFilter(
      "wpifycf_field_price_table",
      "wpify_custom_fields",
      () => {
        return PriceTable;
      }
    );
  } catch (error) {
    // Silent error handling
  }
};

// Try to register immediately, or wait for DOM/wpHooks to be ready
if (
  typeof window.wp !== "undefined" &&
  window.wp.hooks &&
  window.wp.hooks.addFilter
) {
  registerPriceTable();
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", registerPriceTable);
} else {
  // If DOM is already loaded but wp.hooks isn't ready, try with a short delay
  setTimeout(registerPriceTable, 0);
}

// Export default for backward compatibility
export default PriceTable;
