"use strict";
(self["webpackChunkBooking"] = self["webpackChunkBooking"] || []).push([["assets_js_admin_wpify_components_PriceTable_js"],{

/***/ "./assets/js/admin/wpify/components/PriceTable.js":
/*!********************************************************!*\
  !*** ./assets/js/admin/wpify/components/PriceTable.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


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

var PriceTable = function PriceTable(props) {
  var htmlId = props.htmlId,
    value = props.value,
    onChange = props.onChange,
    label = props.label,
    _props$className = props.className,
    className = _props$className === void 0 ? "" : _props$className;
  // Safety check for onChange function
  if (typeof onChange !== "function") {
    return null;
  }

  // Generovat unikátní ID
  var uniqueId = htmlId || "price-table-".concat(Date.now());
  var popupId = "price-table-popup-".concat(uniqueId);
  var containerId = "table-builder-container-".concat(uniqueId);

  // Parse initial value
  var parseValue = function parseValue() {
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
  var temporaryTableData = null;

  // Handle table data changes from TableBuilderComponent
  // Store changes temporarily, don't save until Save button is clicked
  var handleTableDataChange = function handleTableDataChange(tableData) {
    // Store in temporary variable, don't save to hidden input yet
    temporaryTableData = tableData;
  };

  // Render TableBuilderComponent into popup container
  var renderTableBuilder = function renderTableBuilder() {
    var container = document.getElementById(containerId);
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
          var ReactDOM = window.ReactDOM || __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
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
    Promise.all([__webpack_require__.e(/*! import() | assets_js_admin_TableBuilderComponent_jsx */ "tableBuilder").then(__webpack_require__.bind(__webpack_require__, /*! ../../TableBuilderComponent.jsx */ "./assets/js/admin/TableBuilderComponent.jsx")), __webpack_require__.e(/*! import() | node_modules_react-dom_client_js */ "node_modules_react-dom_client_js").then(__webpack_require__.t.bind(__webpack_require__, /*! react-dom/client */ "./node_modules/react-dom/client.js", 19))["catch"](function () {
      return {
        createRoot: null
      };
    })]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        componentModule = _ref2[0],
        reactDOMClient = _ref2[1];
      var TableBuilderComponent = componentModule["default"];
      var createRoot = reactDOMClient.createRoot;

      // Parse initial data
      var initialData = parseValue();

      // Try React 18 createRoot first
      if (createRoot) {
        try {
          var root = createRoot(container);
          container._reactRoot = root;
          root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TableBuilderComponent, {
            initialData: initialData,
            onDataChange: handleTableDataChange,
            uniqueId: uniqueId,
            hiddenInputId: htmlId
          }));
          return;
        } catch (error) {
          console.warn("React 18 createRoot failed, falling back to React 17:", error);
        }
      }

      // Fallback to React 17 render
      var ReactDOM = window.ReactDOM || __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
      if (ReactDOM && ReactDOM.render) {
        ReactDOM.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(TableBuilderComponent, {
          initialData: initialData,
          onDataChange: handleTableDataChange,
          uniqueId: uniqueId,
          hiddenInputId: htmlId
        }), container);
        container._reactRoot = {
          legacy: true
        };
      } else {
        console.error("ReactDOM not available");
      }
    })["catch"](function (error) {
      console.error("Failed to load TableBuilderComponent:", error);
    });
  };
  var openPopup = function openPopup() {
    var popup = document.getElementById(popupId);
    if (popup) {
      // Store original value before making changes
      var hiddenInput = document.getElementById(htmlId);
      var originalValue = hiddenInput ? hiddenInput.value : typeof value === "string" ? value : JSON.stringify(value || {});
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
      setTimeout(function () {
        renderTableBuilder();
      }, 100);
    } else {
      console.error("[PriceTable] Popup element not found with ID:", popupId);
    }
  };
  var closePopup = function closePopup() {
    var restoreOriginal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var popup = document.getElementById(popupId);
    var modalFrame = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-modal__frame");
    var fullscreenBtn = popup === null || popup === void 0 ? void 0 : popup.querySelector('[aria-label="Fullscreen"]');
    if (popup) {
      // If canceling, restore original value
      if (restoreOriginal && popup.dataset.originalValue !== undefined) {
        var hiddenInput = document.getElementById(htmlId);
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
          var svg = fullscreenBtn.querySelector("svg path");
          if (svg) {
            svg.setAttribute("d", "M4 4h6v1.5H5.5v4.5H4V4zm9.5 0H20v6h-1.5V5.5H13.5V4zM4 20v-6h1.5v4.5H10V20H4zm10 0v-1.5h4.5V14H20v6h-6z");
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
      var modalHeader = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-modal__header");
      var modalFooter = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-flex.block-editor-freeform-modal__actions");
      var modalContent = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-modal__content");
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
    var container = document.getElementById(containerId);
    if (container && container._reactRoot) {
      try {
        if (container._reactRoot.legacy) {
          var ReactDOM = window.ReactDOM || __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
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
  var savePopup = function savePopup() {
    // Save temporary data to hidden input and trigger onChange
    if (temporaryTableData !== null) {
      var jsonString = JSON.stringify(temporaryTableData);
      var hiddenInput = document.getElementById(htmlId);
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
  var toggleFullscreen = function toggleFullscreen() {
    var popup = document.getElementById(popupId);
    var modalFrame = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-modal__frame");
    var modalContent = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-modal__content");
    var modalHeader = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-modal__header");
    var modalFooter = popup === null || popup === void 0 ? void 0 : popup.querySelector(".components-flex.block-editor-freeform-modal__actions");
    var fullscreenBtn = popup === null || popup === void 0 ? void 0 : popup.querySelector('[aria-label="Fullscreen"]');
    if (!popup || !modalFrame) return;

    // Ensure CSS styles are injected for fullscreen
    var styleElement = document.getElementById("wpcbooking-fullscreen-styles-".concat(uniqueId));
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "wpcbooking-fullscreen-styles-".concat(uniqueId);
      styleElement.textContent = "\n                .wpcbooking-fullscreen .components-modal__header {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                    display: flex !important;\n                    position: relative !important;\n                    z-index: 1000 !important;\n                    background-color: #fff !important;\n                    overflow: visible !important;\n                }\n                .wpcbooking-fullscreen .components-modal__header * {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                }\n                .wpcbooking-fullscreen .components-modal__header > div:last-child {\n                    display: flex !important;\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                    z-index: 1001 !important;\n                    position: relative !important;\n                }\n                .wpcbooking-fullscreen .components-modal__header button {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                    display: flex !important;\n                    pointer-events: auto !important;\n                    z-index: 1002 !important;\n                    position: relative !important;\n                    min-width: 32px !important;\n                    min-height: 32px !important;\n                    cursor: pointer !important;\n                }\n                .wpcbooking-fullscreen .components-modal__header button svg,\n                .wpcbooking-fullscreen .components-modal__header button svg path {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                    display: block !important;\n                    fill: currentColor !important;\n                }\n                .wpcbooking-fullscreen .components-flex.block-editor-freeform-modal__actions {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                    display: flex !important;\n                    position: relative !important;\n                    z-index: 1000 !important;\n                    background-color: #fff !important;\n                    overflow: visible !important;\n                }\n                .wpcbooking-fullscreen .components-flex.block-editor-freeform-modal__actions * {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                }\n                .wpcbooking-fullscreen .components-flex.block-editor-freeform-modal__actions button {\n                    visibility: visible !important;\n                    opacity: 1 !important;\n                    display: inline-block !important;\n                    pointer-events: auto !important;\n                    z-index: 1001 !important;\n                    position: relative !important;\n                    cursor: pointer !important;\n                }\n                .wpcbooking-fullscreen .components-modal__content {\n                    overflow: visible !important;\n                }\n                .wpcbooking-fullscreen .wpcooking-price-table-popup-body {\n                    overflow: auto !important;\n                }\n            ";
      document.head.appendChild(styleElement);
    }
    var isFullscreen = popup.classList.contains("wpcbooking-fullscreen");
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
        var headerButtons = modalHeader.querySelectorAll("button");
        headerButtons.forEach(function (btn) {
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
        var footerButtons = modalFooter.querySelectorAll("button");
        footerButtons.forEach(function (btn) {
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
        var svg = fullscreenBtn.querySelector("svg path");
        if (svg) {
          svg.setAttribute("d", "M4 4h6v1.5H5.5v4.5H4V4zm9.5 0H20v6h-1.5V5.5H13.5V4zM4 20v-6h1.5v4.5H10V20H4zm10 0v-1.5h4.5V14H20v6h-6z");
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
        var _headerButtons = modalHeader.querySelectorAll("button");
        _headerButtons.forEach(function (btn) {
          btn.style.setProperty("visibility", "visible", "important");
          btn.style.setProperty("opacity", "1", "important");
          btn.style.setProperty("display", "flex", "important");
          btn.style.setProperty("pointer-events", "auto", "important");
          btn.style.setProperty("z-index", "1001", "important");
          btn.style.setProperty("position", "relative", "important");
          btn.style.setProperty("min-width", "32px", "important");
          btn.style.setProperty("min-height", "32px", "important");

          // Ensure SVG icons are visible
          var svg = btn.querySelector("svg");
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
        var _footerButtons = modalFooter.querySelectorAll("button");
        _footerButtons.forEach(function (btn) {
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
        var _svg = fullscreenBtn.querySelector("svg path");
        if (_svg) {
          _svg.setAttribute("d", "M14.5 4H20v5.5h-1.5V5.5H14.5V4zm-9 0v1.5H5.5V9.5H4V4h5.5zm5 10.5H20V20h-5.5v-1.5h4v-4h1.5zm-9 0v4h4v1.5H4V14.5h1.5z");
        }
      }
    }
  };

  // Create popup in body on first render to avoid parent container overflow
  var ensurePopupInBody = function ensurePopupInBody() {
    var popupContainer = document.getElementById(popupId);
    if (!popupContainer) {
      popupContainer = document.createElement("div");
      popupContainer.id = popupId;
      popupContainer.className = "components-modal__screen-overlay wpcbooking-price-table-popup hidden";
      popupContainer.style.cssText = "position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 100000; display: none; align-items: center; justify-content: center;";
      popupContainer.innerHTML = "\n                <div class=\"components-modal__frame block-editor-freeform-modal__content\" style=\"width: 90%; max-width: 800px; max-height: 90vh; background-color: #fff; border-radius: 4px; display: flex; flex-direction: column;\" role=\"dialog\" aria-labelledby=\"wpcbooking-modal-header-".concat(uniqueId, "\" tabindex=\"-1\">\n                    <div class=\"components-modal__content wpcbooking-modal-content\" role=\"document\" style=\"display: flex; flex-direction: column; flex: 1; overflow: hidden;\">\n                        <div class=\"components-modal__header\" style=\"padding: 16px 24px; border-bottom: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 100; background-color: #fff; flex-shrink: 0; visibility: visible; opacity: 1;\">\n                            <div class=\"components-modal__header-heading-container\">\n                                <h1 id=\"wpcbooking-modal-header-").concat(uniqueId, "\" class=\"components-modal__header-heading\" style=\"margin: 0; font-size: 18px; font-weight: 600;\">Price Table Builder</h1>\n                            </div>\n                            <div style=\"display: flex; align-items: center; gap: 8px; position: relative; z-index: 101; visibility: visible; opacity: 1;\">\n                                <button type=\"button\" class=\"components-button is-compact has-icon wpcbooking-close-btn\" aria-label=\"Close\" style=\"background: none; border: none; cursor: pointer; padding: 8px; color: #1e1e1e; display: flex; align-items: center; justify-content: center; position: relative; z-index: 102; visibility: visible; opacity: 1; min-width: 32px; min-height: 32px; pointer-events: auto;\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" aria-hidden=\"true\" focusable=\"false\" style=\"fill: currentColor; display: block; visibility: visible; opacity: 1;\">\n                                        <path d=\"m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z\"></path>\n                                    </svg>\n                                </button>\n                            </div>\n                        </div>\n                        <div class=\"wpcbooking-price-table-popup-body\" style=\"flex: 1; overflow: auto; padding: 24px; position: relative; z-index: 1;\">\n                            <div id=\"").concat(containerId, "\" data-unique-id=\"").concat(uniqueId, "\" style=\"position: relative; z-index: 1;\">\n                            </div>\n                        </div>\n                        <div class=\"components-flex block-editor-freeform-modal__actions\" style=\"padding: 16px 24px; border-top: 1px solid #ddd; display: flex; justify-content: flex-end; gap: 12px; position: relative; z-index: 100; background-color: #fff; flex-shrink: 0; visibility: visible; opacity: 1;\">\n                            <div class=\"components-flex-item\" style=\"position: relative; z-index: 101; visibility: visible; opacity: 1;\">\n                                <button type=\"button\" class=\"components-button wpcbooking-cancel-btn\" style=\"position: relative; z-index: 102; visibility: visible; opacity: 1; display: inline-block; pointer-events: auto; cursor: pointer; min-width: auto; min-height: auto;\">Cancel</button>\n                            </div>\n                            <div class=\"components-flex-item\" style=\"position: relative; z-index: 101; visibility: visible; opacity: 1;\">\n                                <button type=\"button\" class=\"components-button is-primary wpcbooking-save-btn\" style=\"position: relative; z-index: 102; visibility: visible; opacity: 1; display: inline-block; pointer-events: auto; cursor: pointer; min-width: auto; min-height: auto;\">Save</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ");
      document.body.appendChild(popupContainer);

      // Attach event listeners
      var closeBtn = popupContainer.querySelector(".wpcbooking-close-btn");
      var cancelBtn = popupContainer.querySelector(".wpcbooking-cancel-btn");
      var saveBtn = popupContainer.querySelector(".wpcbooking-save-btn");
      if (closeBtn) closeBtn.addEventListener("click", function () {
        return closePopup(true);
      });
      if (cancelBtn) cancelBtn.addEventListener("click", function () {
        return closePopup(true);
      });
      if (saveBtn) saveBtn.addEventListener("click", savePopup);
    }
    return popupContainer;
  };

  // Ensure popup exists before opening
  var openPopupEnhanced = function openPopupEnhanced() {
    ensurePopupInBody();
    openPopup();
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "wpifycf-field-price_table ".concat(className),
    "data-unique-id": uniqueId,
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
      htmlFor: htmlId,
      style: {
        display: "block",
        marginBottom: "8px"
      },
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "wpcbooking-price-table-builder",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
        type: "button",
        className: "wpifycf-button wpcbooking-price-table-btn",
        onClick: openPopupEnhanced,
        children: "Options prices"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
      type: "hidden",
      id: htmlId,
      value: typeof value === "string" ? value : JSON.stringify(value || {})
    })]
  });
};

/**
 * Validation method for PriceTable field
 * Validuje, že hodnota je validní JSON objekt
 *
 * @param {HTMLElement} element - The field element
 * @returns {boolean} True if valid, false otherwise
 */
PriceTable.checkValidity = function (element) {
  // Safety check - element může být undefined
  if (!element || typeof element.querySelector !== "function") {
    return true;
  }
  var hiddenInput = element.querySelector('input[type="hidden"]');
  if (!hiddenInput || !hiddenInput.value) {
    return true; // Prázdné pole je validní
  }
  try {
    var parsed = JSON.parse(hiddenInput.value);
    return _typeof(parsed) === "object" && parsed !== null && !Array.isArray(parsed);
  } catch (e) {
    return false;
  }
};

// Register the price_table field type using WordPress global hooks
var _registerPriceTable = function registerPriceTable() {
  if (typeof window.wp === "undefined" || !window.wp.hooks || !window.wp.hooks.addFilter) {
    setTimeout(_registerPriceTable, 100);
    return;
  }
  try {
    window.wp.hooks.addFilter("wpifycf_field_price_table", "wpify_custom_fields", function () {
      return PriceTable;
    });
  } catch (error) {
    // Silent error handling
  }
};

// Try to register immediately, or wait for DOM/wpHooks to be ready
if (typeof window.wp !== "undefined" && window.wp.hooks && window.wp.hooks.addFilter) {
  _registerPriceTable();
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _registerPriceTable);
} else {
  // If DOM is already loaded but wp.hooks isn't ready, try with a short delay
  setTimeout(_registerPriceTable, 0);
}

// Export default for backward compatibility
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceTable);

/***/ })

}]);
//# sourceMappingURL=assets_js_admin_wpify_components_PriceTable_js.js.map