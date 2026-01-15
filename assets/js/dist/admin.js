/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/admin/fieldManagerInstance.js":
/*!*************************************************!*\
  !*** ./assets/js/admin/fieldManagerInstance.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFieldManager: () => (/* binding */ getFieldManager),
/* harmony export */   initializeDynamicFieldsLoader: () => (/* binding */ initializeDynamicFieldsLoader)
/* harmony export */ });
/* harmony import */ var _useGutenbergWatchdog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useGutenbergWatchdog.js */ "./assets/js/admin/useGutenbergWatchdog.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }


/**
 * Global map to store processed block instances
 * Key: blockElement, Value: {bookingInputBlock, field_id}
 */
var processedBlocks = new Map();
/**
 * Global list to store field input data
 */
var fieldsInputList = [];

/**
 * Load initial fields and processedBlocks mapping from PHP localization
 * @returns {number} Number of fields loaded
 */
function loadInitialFieldsFromLocalization() {
  // TODO: Implement loading from PHP
  return 0;
}

/**
 * Find block element by field_id from data-attributes
 * @param {string} fieldId - Field ID to search for
 * @returns {Element|null} Block element or null
 */
function findBlockElementByFieldId(fieldId) {
  // TODO: Implement finding block by field_id
  return null;
}

/**
 * Add new field to fieldsInputList from booking-number-input-block element
 * @param {Element} bookingInputBlock - The .booking-number-input-block element
 * @returns {boolean} True if new field was added
 */
function addFieldFromElement(bookingInputBlock) {
  // TODO: Implement adding field from element
  return false;
}

/**
 * Process a single booking/number-input block element
 * @param {Element} blockElement - Block element with data-type="booking/number-input"
 * @returns {boolean} True if block was processed
 */
function processBookingNumberInputBlock(blockElement) {
  // TODO: Implement processing single block
  return false;
}

/**
 * Process all existing booking/number-input blocks in the DOM
 */
function processAllBlocks() {
  // TODO: Implement processing all blocks
}

/**
 * Check if mutations contain new number-input blocks being added
 * @param {Array<MutationRecord>} mutations - DOM mutations to check
 * @returns {boolean} True if new blocks were added
 */
function containsNewBlocks(mutations) {
  // TODO: Implement checking for new blocks
  return false;
}

/**
 * Initialize all blocks - called on initialization
 */
function initializeAllBlocks() {
  // TODO: Implement initialization logic
}

/**
 * Handle new blocks - called when new blocks are detected
 */
function handleNewBlocks() {
  // TODO: Implement new blocks handling
}

/**
 * Handle DOM changes - called when DOM mutations occur
 * @param {Array<MutationRecord>} mutations - DOM mutations
 */
function handleDomChange(mutations) {
  // TODO: Implement DOM change handling
}

/**
 * Initialize and manage booking/number-input blocks in Gutenberg editor
 * @returns {Object} Object with public methods for managing blocks
 */
var initializeDynamicFieldsLoader = function initializeDynamicFieldsLoader() {
  // Create Gutenberg watchdog instance
  (0,_useGutenbergWatchdog_js__WEBPACK_IMPORTED_MODULE_0__.useGutenbergWatchdog)({
    onInit: initializeAllBlocks,
    onNewBlocks: handleNewBlocks,
    onDomChange: handleDomChange
  });

  // Return public API
  return {
    processAllBlocks: processAllBlocks,
    initializeAllBlocks: initializeAllBlocks,
    getProcessedBlocks: function getProcessedBlocks() {
      // Return array of bookingInputBlock elements
      return Array.from(processedBlocks.values()).map(function (data) {
        return data.bookingInputBlock;
      });
    },
    getFieldsInputList: function getFieldsInputList() {
      return _toConsumableArray(fieldsInputList);
    }
  };
};

/**
 * Get field manager instance
 * @returns {Object|null} Field manager instance or null
 */
var getFieldManager = function getFieldManager() {
  return {
    getProcessedBlocks: function getProcessedBlocks() {
      // Return array of bookingInputBlock elements
      return Array.from(processedBlocks.values()).map(function (data) {
        return data.bookingInputBlock;
      });
    },
    getProcessedBlocksMap: function getProcessedBlocksMap() {
      // Return full map if needed
      return new Map(processedBlocks);
    },
    clearProcessedBlocks: function clearProcessedBlocks() {
      return processedBlocks.clear();
    },
    getFieldsInputList: function getFieldsInputList() {
      return _toConsumableArray(fieldsInputList);
    },
    clearFieldsInputList: function clearFieldsInputList() {
      fieldsInputList = [];
    }
  };
};

/***/ }),

/***/ "./assets/js/admin/multiGroupToggle.js":
/*!*********************************************!*\
  !*** ./assets/js/admin/multiGroupToggle.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeMultiGroupToggle: () => (/* binding */ initializeMultiGroupToggle)
/* harmony export */ });
var initializeMultiGroupToggle = function initializeMultiGroupToggle() {
  var initMultiGroupToggle = function initMultiGroupToggle() {
    // Find all multi-group items
    var multiGroupItems = document.querySelectorAll('.wpifycf-field-multi-group__item');
    multiGroupItems.forEach(function (item) {
      var header = item.querySelector('.wpifycf-field-multi-group__item-header');
      var content = item.querySelector('.wpifycf-field-multi-group__content');
      if (!header || !content) return;

      // Add click handler to header
      header.addEventListener('click', function (e) {
        // Don't trigger if clicking on buttons or interactive elements
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('select')) {
          return;
        }

        // Toggle the item
        toggleMultiGroupItem(item);
      });

      // Add visual indicator for clickable header
      header.style.cursor = 'pointer';
      header.style.userSelect = 'none';

      // Initialize state - check if item should be open by default
      var isOpen = !item.classList.contains('wpifycf-field-multi-group__item--closed');
      updateItemState(item, isOpen);
    });
  };
  var toggleMultiGroupItem = function toggleMultiGroupItem(item) {
    var isCurrentlyOpen = !item.classList.contains('wpifycf-field-multi-group__item--closed');
    updateItemState(item, !isCurrentlyOpen);
  };
  var updateItemState = function updateItemState(item, isOpen) {
    var content = item.querySelector('.wpifycf-field-multi-group__content');
    var header = item.querySelector('.wpifycf-field-multi-group__item-header');
    if (!content || !header) return;
    if (isOpen) {
      item.classList.remove('wpifycf-field-multi-group__item--closed');
      content.style.display = 'block';
      header.setAttribute('aria-expanded', 'true');

      // Add open indicator
      if (!header.querySelector('.wpifycf-field-multi-group__toggle-icon')) {
        var toggleIcon = document.createElement('span');
        toggleIcon.className = 'wpifycf-field-multi-group__toggle-icon';
        toggleIcon.innerHTML = '▼';
        toggleIcon.style.marginLeft = '8px';
        toggleIcon.style.transition = 'transform 0.2s ease';
        header.appendChild(toggleIcon);
      }
    } else {
      item.classList.add('wpifycf-field-multi-group__item--closed');
      content.style.display = 'none';
      header.setAttribute('aria-expanded', 'false');

      // Update toggle icon
      var _toggleIcon = header.querySelector('.wpifycf-field-multi-group__toggle-icon');
      if (_toggleIcon) {
        _toggleIcon.innerHTML = '▶';
      }
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMultiGroupToggle);
  } else {
    initMultiGroupToggle();
  }

  // Re-initialize when new content is added (for dynamic content)
  var observer = new MutationObserver(function (mutations) {
    var shouldReinit = false;
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList && node.classList.contains('wpifycf-field-multi-group__item')) {
              shouldReinit = true;
            } else if (node.querySelector && node.querySelector('.wpifycf-field-multi-group__item')) {
              shouldReinit = true;
            }
          }
        });
      }
    });
    if (shouldReinit) {
      initMultiGroupToggle();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

/***/ }),

/***/ "./assets/js/admin/summary/blocks/AdminCalculator.jsx":
/*!************************************************************!*\
  !*** ./assets/js/admin/summary/blocks/AdminCalculator.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var AdminCalculator = function AdminCalculator(props) {
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(component.attrs.operation || 'add'),
    _useState2 = _slicedToArray(_useState, 2),
    operation = _useState2[0],
    setOperation = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(component.attrs.percentage || 0),
    _useState4 = _slicedToArray(_useState3, 2),
    percentage = _useState4[0],
    setPercentage = _useState4[1];
  var baseTotal = component.attrs.base_total || 0;
  var calculatedValue = operation === 'add' ? baseTotal * percentage / 100 : -(baseTotal * percentage) / 100;
  component.render_input = function () {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "relative p-4 border border-gray-300 border-dotted mt-10"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
      className: "absolute -top-3 bg-white px-2"
    }, component.attrs.calculator_label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Calculator', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "flex items-center gap-2"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
      value: operation,
      onChange: function onChange(e) {
        return setOperation(e.target.value);
      },
      className: "px-2 py-1 border rounded"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
      value: "add"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
      value: "subtract"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Subtract', 'wpcbooking'))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "number",
      min: "0",
      value: percentage,
      onInput: function onInput(e) {
        return setPercentage(parseFloat(e.target.value) || 0);
      },
      className: "w-20 px-2 py-1 border rounded"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "text-gray-600"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "font-semibold"
    }, percentage, "%"), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('of', 'wpcbooking'), " ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "font-semibold"
    }, baseTotal), ' = ', (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "font-semibold text-blue-600"
    }, calculatedValue.toFixed(2)))));
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Calculator', 'wpcbooking');
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminCalculator);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/BlockComponent.jsx":
/*!***********************************************************!*\
  !*** ./assets/js/admin/summary/blocks/BlockComponent.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseAdminBlockComponent: () => (/* binding */ BlockComponent),
/* harmony export */   BlockComponent: () => (/* binding */ BlockComponent)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var BlockComponent = /*#__PURE__*/function () {
  function BlockComponent(props) {
    _classCallCheck(this, BlockComponent);
    this.props = props;
    this.attrs = props.attrs || {};
    this.fieldId = this.attrs.field_id || '';
    this.value = props.value || '';
    this.onChange = props.onChange;
    this.step = props.step;
    this.postId = props.postId;
  }
  return _createClass(BlockComponent, [{
    key: "get_icon_url",
    value: function get_icon_url(attrs) {
      var _attrs$general;
      return attrs === null || attrs === void 0 || (_attrs$general = attrs.general) === null || _attrs$general === void 0 ? void 0 : _attrs$general.icon_url;
    }
  }, {
    key: "render_label_section",
    value: function render_label_section(label, iconUrl) {
      var iconStyle = iconUrl ? {
        WebkitMask: "url('".concat(iconUrl, "') no-repeat center"),
        mask: "url('".concat(iconUrl, "') no-repeat center"),
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        width: '20px',
        height: '20px',
        backgroundColor: 'currentColor'
      } : null;
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex items-center gap-2 mb-2"
      }, iconUrl && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
        className: "text-gray-700",
        style: iconStyle
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
        className: "font-semibold text-gray-700",
        htmlFor: this.fieldId
      }, label));
    }
  }, {
    key: "render_container",
    value: function render_container(children) {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "mb-4"
      }, children);
    }
  }, {
    key: "handle_change",
    value: function handle_change(value) {
      var block_total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (typeof this.onChange === 'function') {
        this.onChange(this.fieldId, value, block_total);
      }
    }
  }, {
    key: "render_input",
    value: function render_input() {
      throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('render_input must be implemented by subclass', 'wpcbooking'));
    }
  }, {
    key: "render",
    value: function render() {
      var label = this.attrs.label || this.get_default_label();
      var iconUrl = this.get_icon_url(this.attrs);
      return this.render_container([this.render_label_section(label, iconUrl), this.render_input()]);
    }
  }, {
    key: "get_default_label",
    value: function get_default_label() {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Field', 'wpcbooking');
    }
  }]);
}();


/***/ }),

/***/ "./assets/js/admin/summary/blocks/BlockRenderer.jsx":
/*!**********************************************************!*\
  !*** ./assets/js/admin/summary/blocks/BlockRenderer.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var ComponentNotFound = function ComponentNotFound(_ref) {
  var blockType = _ref.blockType;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "p-4 border border-yellow-300 rounded bg-yellow-50"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
    className: "text-sm text-yellow-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Admin component not found:", "wpcbooking"), " ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("code", {
    className: "bg-yellow-100 px-1"
  }, blockType)));
};
var getComponentForType = function getComponentForType(blockType) {
  var componentMap = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "booking/date-picker", function booking_datePicker() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./DatePicker.jsx */ "./assets/js/admin/summary/blocks/DatePicker.jsx"));
  }), "booking/time-picker", function booking_timePicker() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./TimePicker.jsx */ "./assets/js/admin/summary/blocks/TimePicker.jsx"));
  }), "booking/google-map", function booking_googleMap() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./GoogleMap.jsx */ "./assets/js/admin/summary/blocks/GoogleMap.jsx"));
  }), "booking/number-input", function booking_numberInput() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./NumberInput.jsx */ "./assets/js/admin/summary/blocks/NumberInput.jsx"));
  }), "booking/text-input", function booking_textInput() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./TextInput.jsx */ "./assets/js/admin/summary/blocks/TextInput.jsx"));
  }), "booking/email-input", function booking_emailInput() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./EmailInput.jsx */ "./assets/js/admin/summary/blocks/EmailInput.jsx"));
  }), "booking/phone-input", function booking_phoneInput() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./PhoneInput.jsx */ "./assets/js/admin/summary/blocks/PhoneInput.jsx"));
  }), "booking/icons-list", function booking_iconsList() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./IconsList.jsx */ "./assets/js/admin/summary/blocks/IconsList.jsx"));
  }), "booking/product-list", function booking_productList() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./ProductList.jsx */ "./assets/js/admin/summary/blocks/ProductList.jsx"));
  }), "booking/product-grid", function booking_productGrid() {
    return Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./ProductList.jsx */ "./assets/js/admin/summary/blocks/ProductList.jsx"));
  });
  return componentMap[blockType] || null;
};
var BlockRenderer = function BlockRenderer(_ref2) {
  var blockType = _ref2.blockType,
    _ref2$attrs = _ref2.attrs,
    attrs = _ref2$attrs === void 0 ? {} : _ref2$attrs,
    step = _ref2.step,
    postId = _ref2.postId,
    value = _ref2.value,
    onChange = _ref2.onChange;
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    Component = _useState2[0],
    setComponent = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var fieldId = attrs === null || attrs === void 0 ? void 0 : attrs.field_id;
    if (!fieldId) {
      console.warn("[BlockRenderer] No field_id in attrs", attrs);
      return;
    }
    (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.mark_block_loading)(step, fieldId);
    var componentLoader = getComponentForType(blockType);
    if (!componentLoader) {
      console.error("[AdminBlockRenderer] No loader found for:", blockType);
      setError(new Error("Component loader not found for: ".concat(blockType)));
      setLoading(false);
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.mark_block_loaded)(step, fieldId);
      return;
    }
    componentLoader().then(function (module) {
      setComponent(function () {
        return module["default"] || module;
      });
      setLoading(false);
      requestAnimationFrame(function () {
        (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.mark_block_loaded)(step, fieldId);
      });
    })["catch"](function (err) {
      console.error("[AdminBlockRenderer] Error loading admin block ".concat(blockType, ":"), err);
      setError(err);
      setLoading(false);
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.mark_block_loaded)(step, fieldId);
    });
  }, [blockType, step, attrs === null || attrs === void 0 ? void 0 : attrs.field_id]);
  if (error) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "p-4 border border-red-300 rounded bg-red-50"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
      className: "text-sm text-red-700"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Error rendering component:", "wpcbooking"), " ", error.message));
  }
  if (!Component) {
    console.warn("[AdminBlockRenderer] Component not found:", blockType);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(ComponentNotFound, {
      blockType: blockType
    });
  }
  var handleChange = function handleChange() {
    var finalFieldId, finalValue, block_total;
    if (arguments.length >= 2) {
      var _ref3;
      // Voláno s (fieldId, value, block_total?) - z BlockComponent.handle_change
      finalFieldId = arguments.length <= 0 ? undefined : arguments[0];
      finalValue = arguments.length <= 1 ? undefined : arguments[1];
      block_total = (_ref3 = arguments.length <= 2 ? undefined : arguments[2]) !== null && _ref3 !== void 0 ? _ref3 : null;
    } else {
      // Voláno pouze s (value) - nový styl
      finalFieldId = attrs.field_id;
      finalValue = arguments.length <= 0 ? undefined : arguments[0];
      block_total = null;
    }
    if (onChange) {
      onChange(finalFieldId, finalValue, block_total);
    }
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(Component, {
    attrs: attrs,
    step: step,
    postId: postId,
    value: value,
    onChange: handleChange
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockRenderer);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/DatePicker.jsx":
/*!*******************************************************!*\
  !*** ./assets/js/admin/summary/blocks/DatePicker.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
/* harmony import */ var _utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/priceFormatting.js */ "./assets/js/admin/summary/utils/priceFormatting.js");
/* harmony import */ var _utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/configHelpers.js */ "./assets/js/admin/summary/utils/configHelpers.js");
/* harmony import */ var _utils_priceManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/priceManager.js */ "./assets/js/admin/summary/utils/priceManager.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
/* harmony import */ var _composite_PriceIncreaseControl_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./composite/PriceIncreaseControl.jsx */ "./assets/js/admin/summary/blocks/composite/PriceIncreaseControl.jsx");
/* harmony import */ var _composite_InfoTooltip_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./composite/InfoTooltip.jsx */ "./assets/js/admin/summary/blocks/composite/InfoTooltip.jsx");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }











// Validace zda je string platné datum ve formátu YYYY-MM-DD
var is_valid_date_string = function is_valid_date_string(str) {
  if (!str || typeof str !== "string") return false;
  var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(str);
};

// Konverze z display formátu (DD/MM/YYYY) na ISO formát (YYYY-MM-DD)
var display_to_iso = function display_to_iso(display_date) {
  if (!display_date || typeof display_date !== "string") return "";
  var parts = display_date.split("/");
  if (parts.length === 3) {
    // DD/MM/YYYY -> YYYY-MM-DD
    return "".concat(parts[2], "-").concat(parts[1], "-").concat(parts[0]);
  }
  return display_date;
};

// Konverze z ISO formátu (YYYY-MM-DD) na display formát
var format_date_for_display = function format_date_for_display(date_string, format) {
  if (!date_string || typeof date_string !== "string") return "";
  if (!is_valid_date_string(date_string)) {
    console.warn("[AdminDatePicker] Invalid date format:", date_string);
    return date_string;
  }
  try {
    var _date_string$split = date_string.split("-"),
      _date_string$split2 = _slicedToArray(_date_string$split, 3),
      year = _date_string$split2[0],
      month = _date_string$split2[1],
      day = _date_string$split2[2];
    switch (format) {
      case "DD/MM/YYYY":
        return "".concat(day, "/").concat(month, "/").concat(year);
      case "MM/DD/YYYY":
        return "".concat(month, "/").concat(day, "/").concat(year);
      case "YYYY-MM-DD":
        return date_string;
      default:
        return "".concat(day, "/").concat(month, "/").concat(year);
    }
  } catch (error) {
    console.error("[AdminDatePicker] Error formatting date:", error);
    return date_string;
  }
};
var DatePicker = function DatePicker(props) {
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var formatConfig = (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_4__.getFormatConfig)();
  var currencySymbol = formatConfig.currencySymbol;
  var inputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)
  var stepId = component.step;
  var totalBasePrice = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_7__.total_base_price.value;

  // Parse value - může být string nebo objekt (jako u GoogleMap)
  var parseValueData = function parseValueData() {
    var value = component.value;
    if (!value) return {
      date: "",
      price_increase: null,
      label: null
    };

    // String = pouze datum
    if (typeof value === "string") {
      return {
        date: value,
        price_increase: null,
        label: null
      };
    }

    // Objekt = { value/date, price_increase, label }
    if (_typeof(value) === "object") {
      var result = {
        date: value.value || value.date || "",
        price_increase: value.price_increase || null,
        label: value.label || null
      };
      return result;
    }
    return {
      date: "",
      price_increase: null,
      label: null
    };
  };

  // Memoize parsed data (jako GoogleMap)
  var parsedData = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = parseValueData();
    return result;
  }, [component.value]);

  // STATE pro datum - čteme ze state, ne z component.value!
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return parsedData.date || "";
    }),
    _useState2 = _slicedToArray(_useState, 2),
    dateValue = _useState2[0],
    setDateValue = _useState2[1];

  // STATE pro label - podobně jako v SummaryItem
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return parsedData.label || component.attrs.label || component.get_default_label();
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    currentLabel = _useState4[0],
    setCurrentLabel = _useState4[1];

  // STATE pro quotes count
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(props.attrs.quotes_count || 0),
    _useState6 = _slicedToArray(_useState5, 2),
    quotesCount = _useState6[0],
    setQuotesCount = _useState6[1];

  // Transform PHP price_increase format to component format
  var transformPriceIncreaseData = function transformPriceIncreaseData(phpData) {
    if (!phpData) return {};
    var data = Array.isArray(phpData) ? phpData[0] : phpData;
    if (!data) return {};
    return {
      operator: data.operation === "add" ? "+" : "-",
      percentage: parseFloat(data.price_increase) || 0,
      total: 0,
      base_price: 0
    };
  };

  // price_increase z parsedData nebo attrs
  var initialPriceIncrease = parsedData.price_increase || props.attrs.price_increase;
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(transformPriceIncreaseData(initialPriceIncrease)),
    _useState8 = _slicedToArray(_useState7, 2),
    priceIncrease = _useState8[0],
    setPriceIncrease = _useState8[1];

  // Fetch quotes count when date changes using GraphQL
  var fetchQuotesCount = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(date) {
      var dateString, _result$data, endpoint, graphql_query, variables, response, result, errorMessages, count, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!(!date || !component.fieldId)) {
              _context.n = 1;
              break;
            }
            setQuotesCount(0);
            return _context.a(2);
          case 1:
            dateString = date;
            if (date.includes("/")) {
              dateString = display_to_iso(date);
            }
            _context.p = 2;
            endpoint = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_5__.getGraphQLEndpoint)();
            graphql_query = "\n\t\t\t\tquery GetQuotesCountForDate($fieldId: String!, $dateValue: String!) {\n\t\t\t\t\tgetQuotesCountForDate(fieldId: $fieldId, dateValue: $dateValue)\n\t\t\t\t}\n\t\t\t";
            variables = {
              fieldId: component.fieldId,
              dateValue: dateString
            };
            _context.n = 3;
            return fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                query: graphql_query,
                variables: variables
              })
            });
          case 3:
            response = _context.v;
            if (response.ok) {
              _context.n = 4;
              break;
            }
            throw new Error("HTTP error! status: ".concat(response.status));
          case 4:
            _context.n = 5;
            return response.json();
          case 5:
            result = _context.v;
            if (!result.errors) {
              _context.n = 6;
              break;
            }
            errorMessages = result.errors.map(function (err) {
              return err.message;
            }).join(", ");
            console.error("[AdminDatePicker] GraphQL errors:", errorMessages);
            return _context.a(2);
          case 6:
            count = (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.getQuotesCountForDate;
            if (count !== null && count !== undefined) {
              setQuotesCount(parseInt(count, 10));
            }
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            console.error("[AdminDatePicker] Error fetching quotes count:", _t);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[2, 7]]);
    }));
    return function fetchQuotesCount(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // Aktualizovat hodnotu - volá component.handle_change s kompletními daty
  var updateValue = function updateValue(updates) {
    // Sestavit hodnotu ze STATE + updates
    var newValue = _objectSpread({
      value: dateValue,
      // Aktuální datum ze STATE
      label: currentLabel,
      // Aktuální label ze STATE
      price_increase: priceIncrease.percentage > 0 ? [{
        price_increase: priceIncrease.percentage,
        operation: priceIncrease.operator === "+" ? "add" : "subtract"
      }] : null
    }, updates);

    // Pokud není price_increase a label není změněn (je defaultní), pošli pouze datum jako string
    var defaultLabel = component.attrs.label || component.get_default_label();
    var hasPriceIncrease = newValue.price_increase !== null;
    var hasCustomLabel = newValue.label && newValue.label !== defaultLabel;
    var isLabelUpdate = updates && updates.hasOwnProperty("label");

    // Ukládat objekt pokud je price_increase, custom label, nebo pokud právě měníme label
    if (hasPriceIncrease || hasCustomLabel || isLabelUpdate) {
      component.handle_change(newValue);
    } else {
      component.handle_change(newValue.value);
    }
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (inputRef.current && window.acf && window.jQuery) {
      var $input = window.jQuery(inputRef.current);
      $input.datepicker({
        dateFormat: "dd/mm/yy",
        onSelect: function onSelect(dateText) {
          var isoDate = display_to_iso(dateText);
          setDateValue(isoDate); // Aktualizovat STATE
          fetchQuotesCount(isoDate);

          // Aktualizovat hodnotu s novým datem
          updateValue({
            value: isoDate
          });
        }
      });
    }
  }, []);

  // Update quotes count when dateValue changes
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (dateValue) {
      fetchQuotesCount(dateValue);
    }
  }, [dateValue]);

  // Sync label when parsedData changes (but only if not currently being edited)
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (parsedData.label !== undefined && parsedData.label !== null) {
      setCurrentLabel(parsedData.label);
    } else if (component.attrs.label) {
      setCurrentLabel(component.attrs.label);
    }
  }, [parsedData.label, component.attrs.label]);

  // Initial sync with PriceManager
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var _props$attrs$calculat;
    var forceShow = (_props$attrs$calculat = props.attrs.calculation_quote) === null || _props$attrs$calculat === void 0 ? void 0 : _props$attrs$calculat.apply_calculation;
    if (forceShow && priceIncrease.percentage) {
      var price_manager = (0,_utils_priceManager_js__WEBPACK_IMPORTED_MODULE_6__.get_price_manager)();
      price_manager.set_date_item(component.fieldId, {
        base_value: quotesCount,
        percentage: priceIncrease.percentage,
        operation: priceIncrease.operator === "+" ? "add" : "subtract"
      });
    }
    return function () {
      var price_manager = (0,_utils_priceManager_js__WEBPACK_IMPORTED_MODULE_6__.get_price_manager)();
      price_manager.remove_date_item(component.fieldId);
    };
  }, [quotesCount]);
  var handlePriceIncreaseChange = function handlePriceIncreaseChange(newPriceData) {
    setPriceIncrease(newPriceData);
    var percentageAmount = totalBasePrice * (newPriceData.percentage / 100);
    var calculatedTotal = newPriceData.operator === "+" ? totalBasePrice + percentageAmount : totalBasePrice - percentageAmount;
    var price_manager = (0,_utils_priceManager_js__WEBPACK_IMPORTED_MODULE_6__.get_price_manager)();
    price_manager.set_date_item(component.fieldId, {
      base_value: totalBasePrice,
      percentage: newPriceData.percentage,
      operation: newPriceData.operator === "+" ? "add" : "subtract"
    });

    // Aktualizovat percentage signál pro tento block (field_id + step)
    var operation = newPriceData.operator === "+" ? "add" : "subtract";
    (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_7__.update_block_percentage)(component.step, component.fieldId, newPriceData.percentage, operation);
    var phpFormat = [{
      price_increase: newPriceData.percentage,
      operation: operation
    }];

    // Sestavit hodnotu ze STATE - dateValue je vždy aktuální!
    var mergedValue = {
      value: dateValue,
      // Čteme ze STATE, ne z component.value
      label: currentLabel,
      // Aktuální label ze STATE
      price_increase: phpFormat
    };
    component.handle_change(mergedValue);
  };

  // Handler pro změnu labelu - podobně jako v SummaryItem
  var handleLabelChange = function handleLabelChange(e) {
    var newLabel = e.target.value;
    setCurrentLabel(newLabel);
    // Aktualizovat hodnotu s novým labelem
    updateValue({
      label: newLabel
    });
  };
  component.render_input = function () {
    var _date_picker_options$, _date_picker_options$2, _component$attrs$calc;
    var placeholder = component.attrs.placeholder || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Select date", "wpcbooking");
    var _component$attrs$gene = component.attrs.general,
      general = _component$attrs$gene === void 0 ? {} : _component$attrs$gene;
    var _general$date_picker_ = general.date_picker_options,
      date_picker_options = _general$date_picker_ === void 0 ? {} : _general$date_picker_;
    var dateFormat = (_date_picker_options$ = date_picker_options.dateFormat) !== null && _date_picker_options$ !== void 0 ? _date_picker_options$ : "DD/MM/YYYY";
    var custom_date_format = (_date_picker_options$2 = date_picker_options.custom_date_format) !== null && _date_picker_options$2 !== void 0 ? _date_picker_options$2 : "DD/MM/YYYY";
    var final_date_format = dateFormat === "other" ? custom_date_format : dateFormat;

    // Použít STATE pro zobrazení
    var displayValue = dateValue ? format_date_for_display(dateValue, final_date_format) : "";
    var forceShow = (_component$attrs$calc = component.attrs.calculation_quote) === null || _component$attrs$calc === void 0 ? void 0 : _component$attrs$calc.apply_calculation;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      ref: inputRef,
      type: "text",
      id: component.fieldId,
      name: component.fieldId,
      value: displayValue,
      className: "field-date-picker",
      placeholder: placeholder,
      onInput: function onInput(e) {
        var isoDate = display_to_iso(e.target.value);
        setDateValue(isoDate);
        fetchQuotesCount(isoDate);
        updateValue({
          value: isoDate
        });
      }
    }), forceShow && dateValue && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mt-2 text-sm text-gray-600"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Quotes on this date:", "wpcbooking"), " ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, quotesCount))), forceShow ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mt-4 p-4 bg-gray-50 border border-gray-200 rounded"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mb-3"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "flex items-center gap-2 mb-2"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "text-sm font-semibold text-gray-700"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Price Calculation", "wpcbooking"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
      className: "block text-sm font-medium text-gray-700 mb-1"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Label fee name", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "flex items-center gap-2"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "text",
      name: "".concat(component.fieldId, "_percentage[label]"),
      value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Day occupancy Fee", "wpcbooking"),
      onInput: handleLabelChange,
      className: "flex-none w-[50%] h-[50px] bg-transparent border border-gray-300 rounded px-3 py-2 text-sm",
      placeholder: component.get_default_label()
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_InfoTooltip_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter the name that will appear as the fee label in the shopping cart", "wpcbooking")
    })))), !dateValue && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
      className: "text-sm text-gray-500 mb-2"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Please select a date first", "wpcbooking")), dateValue && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_PriceIncreaseControl_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
      fieldId: component.fieldId,
      basePrice: totalBasePrice,
      value: priceIncrease,
      onChange: handlePriceIncreaseChange,
      currencySymbol: currencySymbol
    })) : null);
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Date", "wpcbooking");
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DatePicker);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/EmailInput.jsx":
/*!*******************************************************!*\
  !*** ./assets/js/admin/summary/blocks/EmailInput.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var EmailInput = function EmailInput(props) {
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    isValid = _useState2[0],
    setIsValid = _useState2[1];
  var validateEmail = function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  component.render_input = function () {
    var placeholder = component.attrs.placeholder || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Email address', 'wpcbooking');
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "email",
      id: component.fieldId,
      name: component.fieldId,
      value: component.value,
      placeholder: placeholder,
      className: "w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 ".concat(!isValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'),
      onInput: function onInput(e) {
        var value = e.target.value;
        setIsValid(validateEmail(value) || value === '');
        component.handle_change(value);
      }
    }), !isValid && component.value && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
      className: "text-sm text-red-500 mt-1"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please enter a valid email address', 'wpcbooking')));
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Email', 'wpcbooking');
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmailInput);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/GoogleMap.jsx":
/*!******************************************************!*\
  !*** ./assets/js/admin/summary/blocks/GoogleMap.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
/* harmony import */ var _utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/configHelpers.js */ "./assets/js/admin/summary/utils/configHelpers.js");
/* harmony import */ var _utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/priceFormatting.js */ "./assets/js/admin/summary/utils/priceFormatting.js");
/* harmony import */ var _utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/markerIcon.js */ "./assets/js/utils/markerIcon.js");
/* harmony import */ var _utils_priceManager_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/priceManager.js */ "./assets/js/admin/summary/utils/priceManager.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
/* harmony import */ var _composite_PriceIncreaseControl_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./composite/PriceIncreaseControl.jsx */ "./assets/js/admin/summary/blocks/composite/PriceIncreaseControl.jsx");
/* harmony import */ var _composite_InfoTooltip_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./composite/InfoTooltip.jsx */ "./assets/js/admin/summary/blocks/composite/InfoTooltip.jsx");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }











var GoogleMap = function GoogleMap(props) {
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var formatConfig = (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_5__.getFormatConfig)();
  var currencySymbol = formatConfig.currencySymbol;

  // Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)
  var totalBasePrice = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_8__.total_base_price.value;

  // Extract address components from Google Places API response
  var extractAddressComponents = function extractAddressComponents(addressComponents) {
    if (!addressComponents) return {};
    var components = {};
    addressComponents.forEach(function (component) {
      if (component.types.includes("country")) {
        components.country = component.long_name;
        components.country_code = component.short_name;
      }
      if (component.types.includes("locality")) {
        components.city = component.long_name;
      }
      if (component.types.includes("postal_code")) {
        components.postcode = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        components.state = component.long_name;
      }
      if (component.types.includes("route")) {
        components.route = component.long_name;
      }
      if (component.types.includes("street_number")) {
        components.street_number = component.long_name;
      }
    });
    return components;
  };

  // Parse shop address from JSON string
  var parseAddress = function parseAddress(adress) {
    if (!adress || typeof adress !== "string") {
      return {
        address: "",
        lat: null,
        lng: null
      };
    }
    try {
      var parsed = JSON.parse(adress);
      return {
        address: parsed.address || "",
        lat: parsed.lat || null,
        lng: parsed.lng || null
      };
    } catch (error) {
      return {
        address: adress,
        lat: null,
        lng: null
      };
    }
  };

  // Parse map data - component.value může být JSON string nebo object
  var parseMapData = function parseMapData() {
    var value = component.value;
    if (!value) return {};

    // Pokud je to JSON string, parsuj ho
    if (typeof value === "string") {
      try {
        var parsed = JSON.parse(value);
        return parsed;
      } catch (error) {
        console.warn("🗺️ [AdminGoogleMap] Failed to parse value as JSON:", error);
        return {};
      }
    }

    // Pokud je to už objekt, použij ho přímo
    if (_typeof(value) === "object") {
      return value;
    }
    return {};
  };
  var shopAddressParsed = parseAddress(props.attrs.shop_address || "");
  var clientAddressParsed = parseAddress(props.value || "");
  var mapContainerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var startInputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var endInputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var mapRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var directionsServiceRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var directionsRendererRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var startAutocompleteRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var endAutocompleteRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var startMarkerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var endMarkerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var isInternalUpdateRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false); // Flag to prevent update loops
  var distanceCalculationTimeoutRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null); // Debounce distance calculation

  // Memoize mapData to prevent re-parsing on every render
  var mapData = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var parsed = parseMapData();
    return parsed;
  }, [component.value]);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(mapData.start_address || shopAddressParsed.address || ""),
    _useState2 = _slicedToArray(_useState, 2),
    startAddress = _useState2[0],
    setStartAddress = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(mapData.endAddress || clientAddressParsed.address || ""),
    _useState4 = _slicedToArray(_useState3, 2),
    endAddress = _useState4[0],
    setEndAddress = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(mapData.distance || null),
    _useState6 = _slicedToArray(_useState5, 2),
    distance = _useState6[0],
    setDistance = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(mapData.duration || null),
    _useState8 = _slicedToArray(_useState7, 2),
    duration = _useState8[0],
    setDuration = _useState8[1];
  var _useState9 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    routeError = _useState0[0],
    setRouteError = _useState0[1];

  // STATE pro label - podobně jako v DatePicker
  var _useState1 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return mapData.label || component.attrs.label || component.get_default_label();
    }),
    _useState10 = _slicedToArray(_useState1, 2),
    currentLabel = _useState10[0],
    setCurrentLabel = _useState10[1];

  // Transform PHP price_increase format to component format
  var transformPriceIncreaseData = function transformPriceIncreaseData(phpData) {
    if (!phpData) return {};

    // If it's an array, take the first item
    var data = Array.isArray(phpData) ? phpData[0] : phpData;
    if (!data) return {};
    return {
      operator: data.operation === "add" ? "+" : "-",
      percentage: parseFloat(data.price_increase) || 0,
      total: 0,
      base_price: 0
    };
  };

  // Get price_increase from value (mapData) or fallback to attrs
  var initialPriceIncrease = mapData.price_increase || props.attrs.price_increase;
  var _useState11 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(transformPriceIncreaseData(initialPriceIncrease)),
    _useState12 = _slicedToArray(_useState11, 2),
    priceIncrease = _useState12[0],
    setPriceIncrease = _useState12[1];
  var _useState13 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)({
      lat: mapData.start_lat || shopAddressParsed.lat || null,
      lng: mapData.start_lng || shopAddressParsed.lng || null,
      country: mapData.country || null,
      country_code: mapData.country_code || null,
      city: mapData.city || null,
      postcode: mapData.postcode || null,
      state: mapData.state || null
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    startLocation = _useState14[0],
    setStartLocation = _useState14[1];
  var _useState15 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)({
      lat: mapData.end_lat || clientAddressParsed.lat || null,
      lng: mapData.end_lng || clientAddressParsed.lng || null,
      country: mapData.end_country || null,
      country_code: mapData.end_country_code || null,
      city: mapData.end_city || null,
      postcode: mapData.end_postcode || null,
      state: mapData.end_state || null
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    endLocation = _useState16[0],
    setEndLocation = _useState16[1];

  // Parse value to get start and end locations
  var parseValue = function parseValue() {
    var data = parseMapData();
    if (!data || Object.keys(data).length === 0) {
      return {
        start_address: "",
        start_lat: null,
        start_lng: null,
        end_address: "",
        end_lat: null,
        end_lng: null,
        distance: null,
        duration: null
      };
    }
    return {
      start_address: data.start_address || "",
      start_lat: data.start_lat || null,
      start_lng: data.start_lng || null,
      end_address: data.end_address || "",
      end_lat: data.end_lat || null,
      end_lng: data.end_lng || null,
      distance: data.distance || null,
      duration: data.duration || null
    };
  };

  // Update component value - always preserve current state values
  var updateValue = function updateValue(updates) {
    isInternalUpdateRef.current = true; // Mark as internal update

    var newValue = _objectSpread({
      start_address: startAddress,
      start_lat: startLocation.lat,
      start_lng: startLocation.lng,
      end_address: endAddress,
      end_lat: endLocation.lat,
      end_lng: endLocation.lng,
      distance: distance,
      duration: duration,
      label: currentLabel
    }, updates);
    component.handle_change(newValue);

    // Reset flag after a short delay to allow the change to propagate
    setTimeout(function () {
      isInternalUpdateRef.current = false;
    }, 50);
  };

  // Calculate distance using GraphQL query
  var calculateDistanceViaGraphQL = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(start, end) {
      var graphql_query, variables, _result$data, endpoint, response, result, errorMessages, distanceKm, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!(!start || !end || !start.lat || !start.lng || !end.lat || !end.lng)) {
              _context.n = 1;
              break;
            }
            console.warn("🗺️ [AdminGoogleMap] calculateDistanceViaGraphQL: Invalid coordinates", {
              start: start,
              end: end
            });
            return _context.a(2, null);
          case 1:
            graphql_query = "\n\t\t\tquery CalculateDistance($originLat: Float!, $originLng: Float!, $destLat: Float!, $destLng: Float!) {\n\t\t\t\tcalculateDistance(\n\t\t\t\t\toriginLat: $originLat\n\t\t\t\t\toriginLng: $originLng\n\t\t\t\t\tdestLat: $destLat\n\t\t\t\t\tdestLng: $destLng\n\t\t\t\t)\n\t\t\t}\n\t\t";
            variables = {
              originLat: start.lat,
              originLng: start.lng,
              destLat: end.lat,
              destLng: end.lng
            };
            _context.p = 2;
            endpoint = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_4__.getGraphQLEndpoint)();
            _context.n = 3;
            return fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                query: graphql_query,
                variables: variables
              })
            });
          case 3:
            response = _context.v;
            if (response.ok) {
              _context.n = 4;
              break;
            }
            throw new Error("HTTP error! status: ".concat(response.status));
          case 4:
            _context.n = 5;
            return response.json();
          case 5:
            result = _context.v;
            if (!result.errors) {
              _context.n = 6;
              break;
            }
            errorMessages = result.errors.map(function (err) {
              return err.message;
            }).join(", ");
            console.error("🗺️ [AdminGoogleMap] GraphQL errors:", errorMessages);
            throw new Error(errorMessages);
          case 6:
            distanceKm = (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.calculateDistance;
            if (!(distanceKm !== null && distanceKm !== undefined)) {
              _context.n = 7;
              break;
            }
            return _context.a(2, parseFloat(distanceKm));
          case 7:
            return _context.a(2, null);
          case 8:
            _context.p = 8;
            _t = _context.v;
            console.error("🗺️ [AdminGoogleMap] GraphQL distance calculation failed:", _t);
            return _context.a(2, null);
        }
      }, _callee, null, [[2, 8]]);
    }));
    return function calculateDistanceViaGraphQL(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  // Calculate route between two points
  var calculateRoute = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(start, end) {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(!start || !end || !start.lat || !start.lng || !end.lat || !end.lng)) {
              _context3.n = 1;
              break;
            }
            console.warn("🗺️ [AdminGoogleMap] calculateRoute: Invalid coordinates", {
              start: start,
              end: end
            });
            return _context3.a(2);
          case 1:
            // Clear previous timeout if exists
            if (distanceCalculationTimeoutRef.current) {
              clearTimeout(distanceCalculationTimeoutRef.current);
            }

            // Add delay before calculating distance (debounce)
            distanceCalculationTimeoutRef.current = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
              var graphqlDistance, distanceKm, estimatedHours, estimatedMinutes, durationText;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    _context2.n = 1;
                    return calculateDistanceViaGraphQL(start, end);
                  case 1:
                    graphqlDistance = _context2.v;
                    if (!(graphqlDistance !== null)) {
                      _context2.n = 2;
                      break;
                    }
                    // Successfully got distance from GraphQL
                    distanceKm = graphqlDistance.toFixed(2); // Estimate duration (assuming average speed of 50 km/h)
                    estimatedHours = graphqlDistance / 50;
                    estimatedMinutes = Math.round(estimatedHours * 60);
                    durationText = estimatedMinutes > 60 ? "".concat(Math.floor(estimatedMinutes / 60), " h ").concat(estimatedMinutes % 60, " min") : "".concat(estimatedMinutes, " min");
                    setDistance(distanceKm);
                    setDuration(durationText);
                    setRouteError(null);
                    updateValue({
                      distance: distanceKm,
                      duration: durationText
                    });
                    return _context2.a(2);
                  case 2:
                    if (!(!directionsServiceRef.current || !directionsRendererRef.current || !mapRef.current)) {
                      _context2.n = 3;
                      break;
                    }
                    console.warn("🗺️ [AdminGoogleMap] calculateRoute: Missing refs, trying fallback", {
                      hasDirectionsService: !!directionsServiceRef.current,
                      hasDirectionsRenderer: !!directionsRendererRef.current,
                      hasMap: !!mapRef.current
                    });

                    // Last resort: straight-line distance
                    calculateStraightLineDistance(start, end);
                    return _context2.a(2);
                  case 3:
                    directionsServiceRef.current.route({
                      origin: {
                        lat: start.lat,
                        lng: start.lng
                      },
                      destination: {
                        lat: end.lat,
                        lng: end.lng
                      },
                      travelMode: window.google.maps.TravelMode.DRIVING
                    }, function (result, status) {
                      if (status === "OK" && result && result.routes && result.routes[0]) {
                        directionsRendererRef.current.setDirections(result);
                        var route = result.routes[0];
                        var leg = route.legs[0];

                        // Calculate distance in km
                        var _distanceKm = (leg.distance.value / 1000).toFixed(2);
                        var _durationText = leg.duration.text;
                        setDistance(_distanceKm);
                        setDuration(_durationText);
                        setRouteError(null);
                        updateValue({
                          distance: _distanceKm,
                          duration: _durationText
                        });
                      } else {
                        console.warn("🗺️ [AdminGoogleMap] Directions request failed:", status);

                        // Set error message
                        if (status === "REQUEST_DENIED") {
                          setRouteError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Directions API is not enabled for your Google Maps API key. Please enable it in Google Cloud Console.", "wpcbooking"));
                        } else if (status === "OVER_QUERY_LIMIT") {
                          setRouteError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Directions API quota exceeded. Please check your Google Maps API usage.", "wpcbooking"));
                        } else {
                          setRouteError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Unable to calculate route. Please try again later.", "wpcbooking"));
                        }

                        // Last fallback: Calculate straight-line distance using Geometry API
                        calculateStraightLineDistance(start, end);
                      }
                    });
                  case 4:
                    return _context2.a(2);
                }
              }, _callee2);
            })), 800); // 800ms delay
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function calculateRoute(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Calculate straight-line distance as fallback when Directions API is not available
  var calculateStraightLineDistance = function calculateStraightLineDistance(start, end) {
    if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
      return;
    }
    if (!window.google || !window.google.maps || !window.google.maps.geometry) {
      console.warn("🗺️ [AdminGoogleMap] Geometry API not available for distance calculation");
      return;
    }
    var startPoint = new window.google.maps.LatLng(start.lat, start.lng);
    var endPoint = new window.google.maps.LatLng(end.lat, end.lng);

    // Calculate distance in meters
    var distanceMeters = window.google.maps.geometry.spherical.computeDistanceBetween(startPoint, endPoint);
    var distanceKm = (distanceMeters / 1000).toFixed(2);

    // Estimate duration (assuming average speed of 50 km/h)
    var estimatedHours = distanceMeters / 1000 / 50;
    var estimatedMinutes = Math.round(estimatedHours * 60);
    var durationText = estimatedMinutes > 60 ? "".concat(Math.floor(estimatedMinutes / 60), " h ").concat(estimatedMinutes % 60, " min") : "".concat(estimatedMinutes, " min");
    setDistance(distanceKm);
    setDuration(durationText + " (estimated)");
    setRouteError(null); // Clear error when fallback succeeds

    updateValue({
      distance: distanceKm,
      duration: durationText + " (estimated)"
    });

    // Don't draw line between points - only calculate distance
  };

  // Update markers on map
  var updateMarkers = function updateMarkers() {
    if (!mapRef.current) {
      console.warn("🗺️ [AdminGoogleMap] updateMarkers: Map not initialized");
      return;
    }
    var currentValue = parseValue();

    // Remove and recreate start marker if location exists
    if (currentValue.start_lat && currentValue.start_lng) {
      var startPos = {
        lat: currentValue.start_lat,
        lng: currentValue.start_lng
      };

      // Remove previous marker if exists
      if (startMarkerRef.current) {
        startMarkerRef.current.setMap(null);
        startMarkerRef.current = null;
      }

      // Create new start marker
      var startLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Start", "wpcbooking");
      startMarkerRef.current = new window.google.maps.Marker({
        position: startPos,
        map: mapRef.current,
        icon: (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__.createMarkerIcon)(startLabel),
        title: currentValue.start_address || "Start Location"
      });
    } else if (startMarkerRef.current) {
      startMarkerRef.current.setMap(null);
      startMarkerRef.current = null;
    }

    // Remove and recreate end marker if location exists
    if (currentValue.end_lat && currentValue.end_lng) {
      var endPos = {
        lat: currentValue.end_lat,
        lng: currentValue.end_lng
      };

      // Remove previous marker if exists
      if (endMarkerRef.current) {
        endMarkerRef.current.setMap(null);
        endMarkerRef.current = null;
      }

      // Create new end marker
      var endLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("End", "wpcbooking");
      endMarkerRef.current = new window.google.maps.Marker({
        position: endPos,
        map: mapRef.current,
        icon: (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__.createMarkerIcon)(endLabel),
        title: currentValue.end_address || "End Location"
      });
    } else if (endMarkerRef.current) {
      endMarkerRef.current.setMap(null);
      endMarkerRef.current = null;
    }

    // Calculate route if both locations exist
    if (currentValue.start_lat && currentValue.start_lng && currentValue.end_lat && currentValue.end_lng) {
      calculateRoute({
        lat: currentValue.start_lat,
        lng: currentValue.start_lng
      }, {
        lat: currentValue.end_lat,
        lng: currentValue.end_lng
      });
    }
  };

  // Initialize Google Maps
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var initializeMap = function initializeMap() {
      if (!mapContainerRef.current) {
        console.warn("🗺️ [AdminGoogleMap] initializeMap: mapContainerRef.current is null");
        return;
      }

      // Check if map is already initialized
      if (mapRef.current) {
        updateMarkers();
        return;
      }

      // Check if Google Maps API is loaded
      if (typeof window.google === "undefined" || !window.google.maps) {
        console.warn("🗺️ [AdminGoogleMap] Google Maps API is not loaded");
        return;
      }

      // Initialize map
      var mapOptions = {
        center: startLocation.lat && startLocation.lng ? {
          lat: startLocation.lat,
          lng: startLocation.lng
        } : {
          lat: 50.0755,
          lng: 14.4378
        },
        // Default: Prague
        zoom: startLocation.lat && startLocation.lng ? 12 : 10,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      };
      var map = new window.google.maps.Map(mapContainerRef.current, mapOptions);
      mapRef.current = map;

      // Initialize Directions Service and Renderer
      var directionsService = new window.google.maps.DirectionsService();
      var directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        // Use our custom markers instead of default A/B
        suppressPolylines: true // Don't show route line
      });
      directionsServiceRef.current = directionsService;
      directionsRendererRef.current = directionsRenderer;

      // Initialize Places Autocomplete for start address
      if (startInputRef.current) {
        var startAutocomplete = new window.google.maps.places.Autocomplete(startInputRef.current, {
          types: ["geocode"]
        });
        startAutocompleteRef.current = startAutocomplete;
        startAutocomplete.addListener("place_changed", function () {
          var place = startAutocomplete.getPlace();
          if (!place.geometry) {
            console.warn("🗺️ [AdminGoogleMap] No geometry found for selected start place");
            return;
          }
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          var address = place.formatted_address || place.name;
          var addressComponents = extractAddressComponents(place.address_components);
          console.log("🗺️ [AdminGoogleMap] Start location components:", addressComponents);
          setStartAddress(address);
          setStartLocation(_objectSpread({
            lat: lat,
            lng: lng
          }, addressComponents));
          var newStartLocation = _objectSpread({
            lat: lat,
            lng: lng,
            address: address
          }, addressComponents);
          updateValue({
            start_address: address,
            start_lat: lat,
            start_lng: lng
          });

          // Remove previous start marker if exists
          if (startMarkerRef.current) {
            startMarkerRef.current.setMap(null);
            startMarkerRef.current = null;
          }

          // Create new start marker
          var startLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Start", "wpcbooking");
          startMarkerRef.current = new window.google.maps.Marker({
            position: {
              lat: lat,
              lng: lng
            },
            map: map,
            icon: (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__.createMarkerIcon)(startLabel),
            title: address
          });

          // Update map center
          map.setCenter({
            lat: lat,
            lng: lng
          });
          map.setZoom(12);

          // Calculate route if end location is set
          // Use endLocation state or endMarkerRef to check if end location exists
          if (endLocation.lat && endLocation.lng) {
            calculateRoute(newStartLocation, {
              lat: endLocation.lat,
              lng: endLocation.lng
            });
          } else if (endMarkerRef.current) {
            // Fallback: check marker position
            var endPos = endMarkerRef.current.getPosition();
            if (endPos) {
              calculateRoute(newStartLocation, {
                lat: endPos.lat(),
                lng: endPos.lng()
              });
            }
          }
        });
      } else {
        console.warn("🗺️ [AdminGoogleMap] startInputRef.current is null");
      }

      // Initialize Places Autocomplete for end address
      if (endInputRef.current) {
        var endAutocomplete = new window.google.maps.places.Autocomplete(endInputRef.current, {
          types: ["geocode"]
        });
        endAutocompleteRef.current = endAutocomplete;
        endAutocomplete.addListener("place_changed", function () {
          var place = endAutocomplete.getPlace();
          if (!place.geometry) {
            console.warn("🗺️ [AdminGoogleMap] No geometry found for selected end place");
            return;
          }
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng();
          var address = place.formatted_address || place.name;
          var addressComponents = extractAddressComponents(place.address_components);
          console.log("🗺️ [AdminGoogleMap] End location components:", addressComponents);
          setEndAddress(address);
          setEndLocation(_objectSpread({
            lat: lat,
            lng: lng
          }, addressComponents));
          var newEndLocation = _objectSpread({
            lat: lat,
            lng: lng,
            address: address
          }, addressComponents);
          updateValue({
            end_address: address,
            end_lat: lat,
            end_lng: lng
          });

          // Remove previous end marker if exists
          if (endMarkerRef.current) {
            endMarkerRef.current.setMap(null);
            endMarkerRef.current = null;
          }

          // Create new end marker
          var endLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("End", "wpcbooking");
          endMarkerRef.current = new window.google.maps.Marker({
            position: {
              lat: lat,
              lng: lng
            },
            map: map,
            icon: (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__.createMarkerIcon)(endLabel),
            title: address
          });

          // Update map center to show both markers
          // Use startLocation state or startMarkerRef to check if start location exists
          if (startLocation.lat && startLocation.lng) {
            var bounds = new window.google.maps.LatLngBounds();
            bounds.extend({
              lat: startLocation.lat,
              lng: startLocation.lng
            });
            bounds.extend({
              lat: lat,
              lng: lng
            });
            map.fitBounds(bounds);
          } else if (startMarkerRef.current) {
            // Fallback: check marker position
            var startPos = startMarkerRef.current.getPosition();
            if (startPos) {
              var _bounds = new window.google.maps.LatLngBounds();
              _bounds.extend({
                lat: startPos.lat(),
                lng: startPos.lng()
              });
              _bounds.extend({
                lat: lat,
                lng: lng
              });
              map.fitBounds(_bounds);
            } else {
              map.setCenter({
                lat: lat,
                lng: lng
              });
              map.setZoom(12);
            }
          } else {
            map.setCenter({
              lat: lat,
              lng: lng
            });
            map.setZoom(12);
          }

          // Calculate route if start location is set
          if (startLocation.lat && startLocation.lng) {
            calculateRoute({
              lat: startLocation.lat,
              lng: startLocation.lng
            }, newEndLocation);
          } else if (startMarkerRef.current) {
            // Fallback: check marker position
            var _startPos = startMarkerRef.current.getPosition();
            if (_startPos) {
              calculateRoute({
                lat: _startPos.lat(),
                lng: _startPos.lng()
              }, newEndLocation);
            }
          }
        });
      } else {
        console.warn("🗺️ [AdminGoogleMap] endInputRef.current is null");
      }

      // Set initial markers if locations exist
      if (startLocation.lat && startLocation.lng) {
        var startLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Start", "wpcbooking");
        startMarkerRef.current = new window.google.maps.Marker({
          position: {
            lat: startLocation.lat,
            lng: startLocation.lng
          },
          map: map,
          icon: (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__.createMarkerIcon)(startLabel),
          title: startAddress || "Start Location"
        });
      }
      if (endLocation.lat && endLocation.lng) {
        var endLabel = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("End", "wpcbooking");
        endMarkerRef.current = new window.google.maps.Marker({
          position: {
            lat: endLocation.lat,
            lng: endLocation.lng
          },
          map: map,
          icon: (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__.createMarkerIcon)(endLabel),
          title: endAddress || "End Location"
        });

        // Fit bounds to show both markers
        if (startLocation.lat && startLocation.lng) {
          var bounds = new window.google.maps.LatLngBounds();
          bounds.extend({
            lat: startLocation.lat,
            lng: startLocation.lng
          });
          bounds.extend({
            lat: endLocation.lat,
            lng: endLocation.lng
          });
          map.fitBounds(bounds);
        }

        // Calculate route if both locations exist
        if (startLocation.lat && startLocation.lng) {
          calculateRoute({
            lat: startLocation.lat,
            lng: startLocation.lng
          }, {
            lat: endLocation.lat,
            lng: endLocation.lng
          });
        }
      }
    };

    // Wait for Google Maps API to load
    if (typeof window.google !== "undefined" && window.google.maps) {
      setTimeout(initializeMap, 100);
    } else {
      var checkGoogleMaps = setInterval(function () {
        if (typeof window.google !== "undefined" && window.google.maps) {
          clearInterval(checkGoogleMaps);
          setTimeout(initializeMap, 100);
        }
      }, 100);

      // Stop checking after 10 seconds
      setTimeout(function () {
        clearInterval(checkGoogleMaps);
        console.warn("🗺️ [AdminGoogleMap] Timeout waiting for Google Maps API");
      }, 10000);
    }
  }, []);

  // Watch for external value changes (from handleBlockChange)
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    // Skip if this is an internal update (we triggered the change)
    if (isInternalUpdateRef.current) {
      return;
    }
    if (!mapRef.current) {
      return; // Map not initialized yet
    }
    var currentValue = parseValue();

    // Only update if we have actual data (not empty object from re-render)
    var hasData = currentValue.start_address || currentValue.end_address || currentValue.start_lat || currentValue.end_lat || currentValue.distance;
    if (!hasData) {
      return;
    }

    // Update state if values changed externally AND we have new data
    if (currentValue.start_address && currentValue.start_address !== startAddress) {
      setStartAddress(currentValue.start_address);
    }
    if (currentValue.end_address && currentValue.end_address !== endAddress) {
      setEndAddress(currentValue.end_address);
    }
    if (currentValue.distance !== null && currentValue.distance !== distance) {
      setDistance(currentValue.distance);
    }
    if (currentValue.duration && currentValue.duration !== duration) {
      setDuration(currentValue.duration);
    }

    // Update location states if coordinates changed externally
    if (currentValue.start_lat && currentValue.start_lng) {
      if (currentValue.start_lat !== startLocation.lat || currentValue.start_lng !== startLocation.lng) {
        setStartLocation({
          lat: currentValue.start_lat,
          lng: currentValue.start_lng
        });
      }
    }
    if (currentValue.end_lat && currentValue.end_lng) {
      if (currentValue.end_lat !== endLocation.lat || currentValue.end_lng !== endLocation.lng) {
        setEndLocation({
          lat: currentValue.end_lat,
          lng: currentValue.end_lng
        });
      }
    }

    // Update markers when value changes
    updateMarkers();
  }, [component.value]);

  // Sync label when mapData changes
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (mapData.label !== undefined && mapData.label !== null) {
      setCurrentLabel(mapData.label);
    } else if (component.attrs.label) {
      setCurrentLabel(component.attrs.label);
    }
  }, [mapData.label, component.attrs.label]);

  // Handle manual address input changes (typing only, autocomplete handles the full update)
  var handleStartAddressChange = function handleStartAddressChange(e) {
    var newAddress = e.target.value;
    setStartAddress(newAddress);
    // Don't call updateValue here - it causes loops. Autocomplete will handle the full update.
  };
  var handleEndAddressChange = function handleEndAddressChange(e) {
    var newAddress = e.target.value;
    setEndAddress(newAddress);
    // Don't call updateValue here - it causes loops. Autocomplete will handle the full update.
  };
  var handlePriceIncreaseChange = function handlePriceIncreaseChange(newPriceData) {
    setPriceIncrease(newPriceData);

    // Calculate percentage from TOTAL base price
    var percentageAmount = totalBasePrice * (newPriceData.percentage / 100);
    var calculatedTotal = newPriceData.operator === "+" ? totalBasePrice + percentageAmount : totalBasePrice - percentageAmount;
    var price_manager = (0,_utils_priceManager_js__WEBPACK_IMPORTED_MODULE_7__.get_price_manager)();
    price_manager.set_map_item(component.fieldId, {
      base_value: totalBasePrice,
      percentage: newPriceData.percentage,
      operation: newPriceData.operator === "+" ? "add" : "subtract"
    });

    // Aktualizovat percentage signál pro tento block (field_id + step)
    var operation = newPriceData.operator === "+" ? "add" : "subtract";
    (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_8__.update_block_percentage)(component.step, component.fieldId, newPriceData.percentage, operation);
    var phpFormat = [{
      price_increase: newPriceData.percentage,
      operation: operation
    }];

    // Sloučit map data s price_increase do jedné hodnoty
    var mergedValue = {
      start_address: startAddress,
      start_lat: startLocation.lat,
      start_lng: startLocation.lng,
      end_address: endAddress,
      end_lat: endLocation.lat,
      end_lng: endLocation.lng,
      distance: distance,
      duration: duration,
      label: currentLabel,
      // Aktuální label ze STATE
      price_increase: phpFormat
    };

    // Použít component.handle_change pro správný fieldId
    component.handle_change(mergedValue);
  };

  // Handler pro změnu labelu - podobně jako v DatePicker
  var handleLabelChange = function handleLabelChange(e) {
    var newLabel = e.target.value;
    setCurrentLabel(newLabel);
    // Aktualizovat hodnotu s novým labelem
    updateValue({
      label: newLabel
    });
  };

  // Cleanup timeout on unmount
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return function () {
      if (distanceCalculationTimeoutRef.current) {
        clearTimeout(distanceCalculationTimeoutRef.current);
      }
    };
  }, []);

  // Initial sync with PriceManager and cleanup on unmount
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var _props$attrs$calculat;
    var forceShow = (_props$attrs$calculat = props.attrs.calculation_quote) === null || _props$attrs$calculat === void 0 ? void 0 : _props$attrs$calculat.apply_calculation;
    if (forceShow && priceIncrease.percentage) {
      var price_manager = (0,_utils_priceManager_js__WEBPACK_IMPORTED_MODULE_7__.get_price_manager)();
      price_manager.set_map_item(component.fieldId, {
        base_value: totalBasePrice,
        percentage: priceIncrease.percentage,
        operation: priceIncrease.operator === "+" ? "add" : "subtract"
      });
    }
    return function () {
      var price_manager = (0,_utils_priceManager_js__WEBPACK_IMPORTED_MODULE_7__.get_price_manager)();
      price_manager.remove_map_item(component.fieldId);
    };
  }, [totalBasePrice]);
  component.render_input = function () {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mb-3"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
      className: "block text-sm font-medium text-gray-700 mb-1"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Start Location", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      ref: startInputRef,
      type: "text",
      id: "".concat(component.fieldId, "-start"),
      name: "".concat(component.fieldId, "-start"),
      value: startAddress,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Search for start address...", "wpcbooking"),
      className: "w-full px-3 py-2 border border-gray-300 rounded bg-white",
      onInput: handleStartAddressChange
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: component.fieldId + "_store_location",
      value: JSON.stringify({
        address: startAddress,
        lat: startLocation.lat,
        lng: startLocation.lng,
        country: startLocation.country,
        country_code: startLocation.country_code,
        city: startLocation.city,
        postcode: startLocation.postcode,
        state: startLocation.state
      })
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: component.fieldId,
      value: JSON.stringify({
        address: endAddress,
        lat: endLocation.lat,
        lng: endLocation.lng,
        country: endLocation.country,
        country_code: endLocation.country_code,
        city: endLocation.city,
        postcode: endLocation.postcode,
        state: endLocation.state
      })
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mb-3"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
      className: "block text-sm font-medium text-gray-700 mb-1"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("End Location", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      ref: endInputRef,
      type: "text",
      id: "".concat(component.fieldId, "-end"),
      name: "".concat(component.fieldId, "-end"),
      value: endAddress,
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Search for end address...", "wpcbooking"),
      className: "w-full px-3 py-2 border border-gray-300 rounded bg-white",
      onInput: handleEndAddressChange
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      ref: mapContainerRef,
      id: "".concat(component.fieldId, "-map"),
      style: {
        width: "100%",
        height: "400px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginBottom: "8px"
      }
    }), (distance || duration) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-sm text-gray-600 mt-2"
    }, distance && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Distance:", "wpcbooking"), " ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, distance, " km"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: "".concat(component.fieldId, "_distance"),
      value: distance
    })), duration && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Duration:", "wpcbooking"), " ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, duration))), routeError && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Note:", "wpcbooking")), " ", routeError, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("br", null), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("small", {
      className: "text-yellow-700 mt-1 block"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Straight-line distance is shown as fallback.", "wpcbooking"))), function (_props$attrs$calculat2) {
      var forceShow = (_props$attrs$calculat2 = props.attrs.calculation_quote) === null || _props$attrs$calculat2 === void 0 ? void 0 : _props$attrs$calculat2.apply_calculation;
      console.log('priceIncrease', priceIncrease);
      return forceShow ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "mt-4 p-4 bg-gray-50 border border-gray-200 rounded"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "mb-3"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex items-center gap-2 mb-2"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
        className: "text-sm font-semibold text-gray-700"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Price Calculation", "wpcbooking"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
        className: "block text-sm font-medium text-gray-700 mb-1"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Label fee name", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex items-center gap-2"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        type: "text",
        name: "".concat(component.fieldId, "_percentage[label]"),
        value: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Distance fee', 'wpcbooking'),
        onInput: handleLabelChange,
        className: "flex-none w-[50%] h-[50px] bg-transparent border border-gray-300 rounded px-3 py-2 text-sm",
        placeholder: component.get_default_label()
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_InfoTooltip_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
        description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter the name that will appear as the fee label in the shopping cart", "wpcbooking")
      })))), !distance && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
        className: "text-sm text-gray-500 mb-2"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Waiting for distance calculation...", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_PriceIncreaseControl_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
        fieldId: component.fieldId,
        basePrice: totalBasePrice,
        value: priceIncrease,
        onChange: handlePriceIncreaseChange,
        currencySymbol: currencySymbol
      })) : null;
    }());
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Route", "wpcbooking");
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleMap);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/IconsList.jsx":
/*!******************************************************!*\
  !*** ./assets/js/admin/summary/blocks/IconsList.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var IconsList = function IconsList(props) {
  var _component$attrs$gene, _component$attrs$gene2;
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var icons = component.attrs.icons_repeater || ((_component$attrs$gene = component.attrs.general) === null || _component$attrs$gene === void 0 ? void 0 : _component$attrs$gene.icons) || [];
  var number_allowed = component.attrs.number_allowed || ((_component$attrs$gene2 = component.attrs.general) === null || _component$attrs$gene2 === void 0 ? void 0 : _component$attrs$gene2.number_allowed) || 1;
  console.log('IconsList', component);
  var parse_value = function parse_value(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
      return value.split(',').map(function (val) {
        return val.trim();
      }).filter(function (val) {
        return val !== '';
      });
    }
    return [];
  };
  var normalize_value_to_slug = function normalize_value_to_slug(value) {
    if (!value) return '';
    var matching_icon = icons.find(function (icon) {
      return icon.label === value;
    });
    if (matching_icon && matching_icon.slug) {
      return matching_icon.slug;
    }
    return value;
  };
  var raw_selected = parse_value(props.value || '');
  var initial_selected = raw_selected.map(function (val) {
    return normalize_value_to_slug(val);
  });
  var initial_normalized = normalize_value_to_slug(props.value);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(number_allowed === 1 ? initial_normalized : initial_selected.join(',')),
    _useState2 = _slicedToArray(_useState, 2),
    selectedValue = _useState2[0],
    setSelectedValue = _useState2[1];
  component.render_input = function () {
    if (icons.length === 0) {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "text-gray-500 py-4 text-sm"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No icons configured', 'wpcbooking'));
    }
    var selected_icons = parse_value(selectedValue);
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: component.fieldId,
      value: selectedValue
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
      className: "mt-2 space-y-2"
    }, icons.map(function (icon_item, index) {
      var icon_value = icon_item.slug || icon_item.label || "icon_".concat(index);
      var is_selected = number_allowed === 1 ? selectedValue === icon_value : selected_icons.includes(icon_value);
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        key: index,
        className: "flex items-center gap-2"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        type: number_allowed === 1 ? 'radio' : 'checkbox',
        id: "".concat(component.fieldId, "_").concat(index),
        value: icon_value,
        checked: is_selected,
        onChange: function onChange(e) {
          if (number_allowed === 1) {
            setSelectedValue(e.target.value);
            component.handle_change(e.target.value);
          } else {
            var new_selection;
            if (e.target.checked) {
              if (selected_icons.length < number_allowed) {
                new_selection = [].concat(_toConsumableArray(selected_icons), [icon_value]);
              } else {
                return;
              }
            } else {
              new_selection = selected_icons.filter(function (val) {
                return val !== icon_value;
              });
            }
            var value_for_form = new_selection.length > 0 ? new_selection.join(',') : '';
            setSelectedValue(value_for_form);
            component.handle_change(value_for_form);
          }
        },
        className: "w-4 h-4"
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
        htmlFor: "".concat(component.fieldId, "_").concat(index),
        className: "text-gray-700 cursor-pointer"
      }, icon_item.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Icon %d', 'wpcbooking'), index + 1)));
    })));
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Icons', 'wpcbooking');
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconsList);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/NumberInput.jsx":
/*!********************************************************!*\
  !*** ./assets/js/admin/summary/blocks/NumberInput.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var NumberInput = function NumberInput(props) {
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(component.value || 0),
    _useState2 = _slicedToArray(_useState, 2),
    localValue = _useState2[0],
    setLocalValue = _useState2[1];
  var debounceTimerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setLocalValue(component.value || 0);
  }, [component.value]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return function () {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  var handleInputChange = function handleInputChange(newValue) {
    setLocalValue(newValue);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(function () {
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__.update_field_value)(component.fieldId, newValue);
      component.handle_change(newValue);
    }, 1000);
  };
  component.render_input = function () {
    var min = component.attrs.min || 0;
    var max = component.attrs.max || null;
    var step = component.attrs.step || 1;
    var placeholder = component.attrs.placeholder || '';
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "number",
      id: component.fieldId,
      name: component.fieldId,
      value: localValue,
      min: min,
      max: max,
      step: step,
      placeholder: placeholder,
      className: "js-field-number w-32 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
      onInput: function onInput(e) {
        var newValue = parseFloat(e.target.value) || 0;
        handleInputChange(newValue);
      }
    });
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Number', 'wpcbooking');
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberInput);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/PhoneInput.jsx":
/*!*******************************************************!*\
  !*** ./assets/js/admin/summary/blocks/PhoneInput.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! country-list-with-dial-code-and-flag */ "./node_modules/country-list-with-dial-code-and-flag/dist/index.js");
/* harmony import */ var country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_3__);
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var PhoneInput = function PhoneInput(props) {
  var _attrs$general, _attrs$general2, _attrs$general3, _attrs$general4;
  var attrs = props.attrs || {};
  var fieldId = attrs.field_id || '';
  var value = props.value || '';
  var onChange = props.onChange;
  var phoneOptions = ((_attrs$general = attrs.general) === null || _attrs$general === void 0 ? void 0 : _attrs$general.phone_number_options) || {};
  var normalizeToggle = function normalizeToggle(value) {
    if (value === true || value === 1 || value === '1') return true;
    if (value === false || value === 0 || value === '0') return false;
    return value !== false;
  };
  var allowDropdown = normalizeToggle(phoneOptions.allow_dropdown) !== false;
  var separateDialCode = normalizeToggle(phoneOptions.separate_dial_code) !== false;
  var nativeNames = normalizeToggle(phoneOptions.native_names) === true;
  var get_initial_country = function get_initial_country() {
    var default_country = phoneOptions.default_country;
    if (default_country) {
      return default_country.toUpperCase();
    }
    return 'US';
  };
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(get_initial_country),
    _useState2 = _slicedToArray(_useState, 2),
    selectedCountry = _useState2[0],
    setSelectedCountry = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    dropdownOpen = _useState4[0],
    setDropdownOpen = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    localValue = _useState6[0],
    setLocalValue = _useState6[1];
  var pendingValueRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var dropdownRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var dropdownListRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var skipAutoDetectionRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var autoDetectionTimeoutRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var handleChange = function handleChange(newValue) {
    if (typeof onChange === 'function') {
      onChange(fieldId, newValue);
    }
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return function () {
      if (autoDetectionTimeoutRef.current) {
        clearTimeout(autoDetectionTimeoutRef.current);
      }
    };
  }, []);
  var countries = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var allCountries = country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_3___default().getAll();
    var allowedCountries = phoneOptions.countries;
    var filteredCountries = allCountries;
    if (allowedCountries && Array.isArray(allowedCountries) && allowedCountries.length > 0) {
      filteredCountries = allCountries.filter(function (country) {
        return allowedCountries.includes(country.code.toUpperCase());
      });
    }
    var mappedCountries = filteredCountries.map(function (country) {
      return {
        code: country.code.toUpperCase(),
        name: nativeNames ? country.localName || country.name : country.name,
        dialCode: country.dialCode,
        flag: country.flag
      };
    });
    var preferredCountries = phoneOptions.preferred_countries;
    if (preferredCountries && Array.isArray(preferredCountries) && preferredCountries.length > 0) {
      var preferredCodes = preferredCountries.map(function (code) {
        return code.toUpperCase();
      });
      var preferred = mappedCountries.filter(function (c) {
        return preferredCodes.includes(c.code);
      });
      var rest = mappedCountries.filter(function (c) {
        return !preferredCodes.includes(c.code);
      });
      return [].concat(_toConsumableArray(preferred), _toConsumableArray(rest));
    }
    return mappedCountries;
  }, [phoneOptions, nativeNames]);
  var selectedCountryData = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return countries.find(function (c) {
      return c.code === selectedCountry;
    }) || (countries.length > 0 ? countries[0] : null);
  }, [countries, selectedCountry]);
  var extractPhoneNumberWithoutDialCode = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return function (value, dialCode) {
      if (!value || typeof value !== 'string') return '';
      var cleanDialCode = dialCode.replace(/[^\d]/g, '');
      var cleanValue = value.replace(/^\+/, '').replace(/[^\d]/g, '');
      if (cleanValue.startsWith(cleanDialCode)) {
        return cleanValue.slice(cleanDialCode.length);
      }
      return cleanValue;
    };
  }, []);
  var combineDialCodeAndNumber = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return function (dialCode, phoneNumber) {
      var cleanDialCode = dialCode.replace(/[^\d]/g, '');
      var cleanNumber = phoneNumber.replace(/[^\d]/g, '');
      if (!cleanNumber) {
        return "+".concat(cleanDialCode);
      }
      return "+".concat(cleanDialCode).concat(cleanNumber);
    };
  }, []);
  var formatPhoneNumber = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return function (value) {
      var _phoneNumber$match;
      var dialCodeForFormatting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!value || typeof value !== 'string') return '';
      var cleaned = value.replace(/[^\d+]/g, '');
      if (!cleaned.startsWith('+')) {
        return value;
      }
      var dialCode = '';
      var phoneNumber = '';
      var dialCodeToUse = dialCodeForFormatting;
      if (!dialCodeToUse && selectedCountryData) {
        dialCodeToUse = selectedCountryData.dialCode;
      }
      if (dialCodeToUse) {
        var cleanDialCode = dialCodeToUse.replace(/[^\d]/g, '');
        dialCode = "+".concat(cleanDialCode);
        var cleanedWithoutPlus = cleaned.replace(/^\+/, '');
        if (cleanedWithoutPlus.startsWith(cleanDialCode)) {
          phoneNumber = cleanedWithoutPlus.slice(cleanDialCode.length);
        } else {
          phoneNumber = cleanedWithoutPlus;
        }
      } else {
        var matches = cleaned.match(/^(\+\d{1,4})(\d*)$/);
        if (!matches) {
          return value;
        }
        dialCode = matches[1];
        phoneNumber = matches[2];
      }
      if (!phoneNumber || phoneNumber.length === 0) {
        return dialCode;
      }
      var formattedNumber = ((_phoneNumber$match = phoneNumber.match(/.{1,3}/g)) === null || _phoneNumber$match === void 0 ? void 0 : _phoneNumber$match.join(' ')) || phoneNumber;
      return "".concat(dialCode, " ").concat(formattedNumber);
    };
  }, [selectedCountryData]);
  var unformatPhoneNumber = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return function (value) {
      if (!value || typeof value !== 'string') return '';
      return value.replace(/[^\d+]/g, '');
    };
  }, []);
  var parseDialCodeFromValue = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return function (value) {
      if (!value || typeof value !== 'string') return null;
      var valueWithoutPlus = value.replace(/^\+/, '').replace(/[^\d]/g, '');
      var sortedCountries = _toConsumableArray(countries).sort(function (a, b) {
        var dialCodeA = a.dialCode.replace(/[^\d]/g, '').length;
        var dialCodeB = b.dialCode.replace(/[^\d]/g, '').length;
        return dialCodeB - dialCodeA;
      });
      var _iterator = _createForOfIteratorHelper(sortedCountries),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var country = _step.value;
          var dialCode = country.dialCode.replace(/[^\d]/g, '');
          if (valueWithoutPlus.startsWith(dialCode)) {
            return country.code;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    };
  }, [countries]);
  var displayValue = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!value || typeof value !== 'string') {
      if (selectedCountryData) {
        return selectedCountryData.dialCode;
      }
      return '';
    }
    if (value.startsWith('+')) {
      return formatPhoneNumber(value, selectedCountryData === null || selectedCountryData === void 0 ? void 0 : selectedCountryData.dialCode);
    }
    if (selectedCountryData) {
      var phoneNumber = value.replace(/[^\d]/g, '');
      var combinedValue = combineDialCodeAndNumber(selectedCountryData.dialCode, phoneNumber);
      return formatPhoneNumber(combinedValue, selectedCountryData.dialCode);
    }
    return value;
  }, [value, selectedCountryData, combineDialCodeAndNumber, formatPhoneNumber]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setLocalValue(displayValue);
  }, [displayValue]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (skipAutoDetectionRef.current) {
      return;
    }
    if (value && typeof value === 'string' && value.trim() !== '') {
      var detectedCountry = parseDialCodeFromValue(value);
      if (detectedCountry && countries.some(function (c) {
        return c.code === detectedCountry;
      }) && selectedCountry !== detectedCountry) {
        setSelectedCountry(detectedCountry);
      }
    }
  }, [value, parseDialCodeFromValue, countries, selectedCountry]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (value) {
      return;
    }
    var target_country = null;
    if (!target_country) {
      var default_country = phoneOptions.default_country;
      target_country = default_country ? default_country.toUpperCase() : 'US';
    }
    var country_exists = countries.some(function (c) {
      return c.code === target_country;
    });
    if (country_exists && selectedCountry !== target_country) {
      setSelectedCountry(target_country);
    } else if (!country_exists && countries.length > 0) {
      var first_country_code = countries[0].code;
      if (selectedCountry !== first_country_code) {
        setSelectedCountry(first_country_code);
      }
    }
  }, [phoneOptions.default_country, countries.length, selectedCountry, value]);
  var handleInputChange = function handleInputChange(e) {
    var inputValue = e.target.value;
    var unformattedValue = unformatPhoneNumber(inputValue);
    var valueToSave = '';
    if (unformattedValue.startsWith('+')) {
      valueToSave = unformattedValue;
    } else if (selectedCountryData) {
      valueToSave = combineDialCodeAndNumber(selectedCountryData.dialCode, unformattedValue);
    } else {
      valueToSave = unformattedValue;
    }
    setLocalValue(inputValue);
    pendingValueRef.current = valueToSave;
  };
  var handleInput = function handleInput(e) {
    var inputValue = e.target.value;
    var unformattedValue = unformatPhoneNumber(inputValue);
    var valueToSave = '';
    if (unformattedValue.startsWith('+')) {
      valueToSave = unformattedValue;
    } else if (selectedCountryData) {
      valueToSave = combineDialCodeAndNumber(selectedCountryData.dialCode, unformattedValue);
    } else {
      valueToSave = unformattedValue;
    }
    setLocalValue(inputValue);
    pendingValueRef.current = valueToSave;
  };
  var commitValue = function commitValue() {
    if (pendingValueRef.current !== null) {
      handleChange(pendingValueRef.current);
      pendingValueRef.current = null;
    }
  };
  var handleCountrySelect = function handleCountrySelect(countryCode) {
    var newCountryData = countries.find(function (c) {
      return c.code === countryCode;
    });
    if (newCountryData) {
      skipAutoDetectionRef.current = true;
      setSelectedCountry(countryCode);
      setDropdownOpen(false);
      var phoneNumberWithoutDialCode = localValue ? extractPhoneNumberWithoutDialCode(localValue, (selectedCountryData === null || selectedCountryData === void 0 ? void 0 : selectedCountryData.dialCode) || '') : '';
      var combinedValue = combineDialCodeAndNumber(newCountryData.dialCode, phoneNumberWithoutDialCode);
      var formattedValue = formatPhoneNumber(combinedValue, newCountryData.dialCode);
      setLocalValue(formattedValue);
      handleChange(combinedValue);
      if (autoDetectionTimeoutRef.current) {
        clearTimeout(autoDetectionTimeoutRef.current);
      }
      autoDetectionTimeoutRef.current = setTimeout(function () {
        skipAutoDetectionRef.current = false;
        autoDetectionTimeoutRef.current = null;
      }, 100);
    }
  };
  var toggleDropdown = function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!dropdownOpen) return;
    var handleKeyPress = function handleKeyPress(event) {
      if (event.target.tagName === 'INPUT' && event.target.type === 'tel') return;
      var key = event.key.toLowerCase();
      if (key.length === 1 && /[a-z0-9]/.test(key)) {
        var normalizeText = function normalizeText(text) {
          return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        };
        var foundCountry = countries.find(function (country) {
          var normalizedName = normalizeText(country.name);
          return normalizedName.startsWith(key);
        });
        if (foundCountry && dropdownListRef.current) {
          var countryElement = dropdownListRef.current.querySelector("[data-country-code=\"".concat(foundCountry.code, "\"]"));
          if (countryElement) {
            countryElement.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
            countryElement.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return function () {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [dropdownOpen, countries]);
  var label = ((_attrs$general2 = attrs.general) === null || _attrs$general2 === void 0 ? void 0 : _attrs$general2.label) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Phone', 'wpcbooking');
  var iconUrl = (_attrs$general3 = attrs.general) === null || _attrs$general3 === void 0 ? void 0 : _attrs$general3.icon_url;
  var iconStyle = iconUrl ? {
    WebkitMask: "url('".concat(iconUrl, "') no-repeat center"),
    mask: "url('".concat(iconUrl, "') no-repeat center"),
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    width: '20px',
    height: '20px',
    backgroundColor: 'currentColor'
  } : null;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "mb-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-2 mb-2"
  }, iconUrl && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
    className: "text-gray-700",
    style: iconStyle
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "font-semibold text-gray-700",
    htmlFor: fieldId
  }, label)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center w-full"
  }, allowDropdown && selectedCountryData && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "relative",
    ref: dropdownRef
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    onClick: toggleDropdown,
    className: "shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 border-r-0 rounded-s-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
    key: selectedCountry
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "me-2",
    key: "flag-".concat(selectedCountry)
  }, selectedCountryData.flag), separateDialCode && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    key: "dial-".concat(selectedCountry)
  }, selectedCountryData.dialCode), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
    className: "w-2.5 h-2.5 ms-2.5",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 10 6"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "m1 1 4 4 4-4"
  }))), dropdownOpen && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-48 top-full mt-1 max-h-60 overflow-y-auto"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    ref: dropdownListRef,
    className: "py-2 text-sm"
  }, countries.map(function (country) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: country.code
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      type: "button",
      "data-country-code": country.code,
      onClick: function onClick() {
        return handleCountrySelect(country.code);
      },
      className: "inline-flex w-full px-4 py-2 text-sm hover:bg-gray-100 ".concat(selectedCountry === country.code ? 'bg-gray-100 text-gray-900' : 'text-gray-900')
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "inline-flex items-center"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "me-2"
    }, country.flag), country.name, " (", country.dialCode, ")")));
  })))), !allowDropdown && selectedCountryData && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 border-r-0 rounded-s-lg",
    key: selectedCountry
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "me-2",
    key: "flag-".concat(selectedCountry)
  }, selectedCountryData.flag), separateDialCode && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    key: "dial-".concat(selectedCountry)
  }, selectedCountryData.dialCode)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "tel",
    id: fieldId,
    name: fieldId,
    value: localValue,
    onChange: handleInputChange,
    onInput: handleInput,
    onBlur: commitValue,
    placeholder: ((_attrs$general4 = attrs.general) === null || _attrs$general4 === void 0 ? void 0 : _attrs$general4.placeholder) || '+123 456 7890',
    className: "flex-1 w-full px-3 py-2 border border-gray-300 ".concat(allowDropdown ? 'border-s-0 rounded-e-lg' : 'rounded-lg', " bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500")
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhoneInput);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/ProductList.jsx":
/*!********************************************************!*\
  !*** ./assets/js/admin/summary/blocks/ProductList.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
/* harmony import */ var _utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/priceFormatting.js */ "./assets/js/admin/summary/utils/priceFormatting.js");
/* harmony import */ var _utils_productsLoader_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/productsLoader.js */ "./assets/js/admin/summary/utils/productsLoader.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
/* harmony import */ var _composite_ValuePriceControl_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./composite/ValuePriceControl.jsx */ "./assets/js/admin/summary/blocks/composite/ValuePriceControl.jsx");
/* harmony import */ var _composite_PercentagePriceControl_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./composite/PercentagePriceControl.jsx */ "./assets/js/admin/summary/blocks/composite/PercentagePriceControl.jsx");
/* harmony import */ var _composite_TablePriceControl_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./composite/TablePriceControl.jsx */ "./assets/js/admin/summary/blocks/composite/TablePriceControl.jsx");
/* harmony import */ var _composite_ProductSelectControl_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./composite/ProductSelectControl.jsx */ "./assets/js/admin/summary/blocks/composite/ProductSelectControl.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }











var ProductList = function ProductList(props) {
  console.log('ProductList', props);
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var formatConfig = (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_4__.getFormatConfig)();
  var currencySymbol = formatConfig.currencySymbol;
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value || []),
    _useState2 = _slicedToArray(_useState, 2),
    products = _useState2[0],
    setProducts = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    availableProducts = _useState4[0],
    setAvailableProducts = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loadingProducts = _useState6[0],
    setLoadingProducts = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    numberFields = _useState8[0],
    setNumberFields = _useState8[1];
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var _window$wpcbookingAdm;
    var load_products = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var productsList, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return (0,_utils_productsLoader_js__WEBPACK_IMPORTED_MODULE_5__.fetch_products)();
            case 1:
              productsList = _context.v;
              setAvailableProducts(productsList);
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error("[ProductList] Failed to load products:", _t);
            case 3:
              _context.p = 3;
              setLoadingProducts(false);
              return _context.f(3);
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2, 3, 4]]);
      }));
      return function load_products() {
        return _ref.apply(this, arguments);
      };
    }();
    load_products();
    var fields = ((_window$wpcbookingAdm = window.wpcbookingAdminData) === null || _window$wpcbookingAdm === void 0 ? void 0 : _window$wpcbookingAdm.number_fields) || {};
    var fieldsArray = Object.entries(fields).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        value = _ref3[0],
        label = _ref3[1];
      return {
        value: value,
        label: label
      };
    });
    setNumberFields(fieldsArray);
  }, []);

  // Odstraněno: calculate_base_total_for_percentage
  // PercentagePriceControl používá total_base_price signal přímo

  var add_product = function add_product() {
    var newProducts = [].concat(_toConsumableArray(products), [{
      product_id: "",
      price_type: "fixed",
      qty_type: "not_connected",
      qty_field: "",
      qty: 1,
      price: 0,
      percentage_operation: "add",
      percentage_value: 0,
      calculated_total: 0
    }]);
    setProducts(newProducts);
    var block_total = newProducts.reduce(function (sum, p) {
      return sum + (p.calculated_total || 0);
    }, 0);
    component.handle_change(newProducts, block_total);
  };
  var remove_product = function remove_product(index) {
    var newProducts = products.filter(function (_, i) {
      return i !== index;
    });
    setProducts(newProducts);
    var block_total = newProducts.reduce(function (sum, p) {
      return sum + (p.calculated_total || 0);
    }, 0);
    component.handle_change(newProducts, block_total);
  };
  var update_product = function update_product(index, field, value) {
    var newProducts = _toConsumableArray(products);
    newProducts[index] = _objectSpread(_objectSpread({}, newProducts[index]), {}, _defineProperty({}, field, value));
    setProducts(newProducts);
    component.handle_change(newProducts);
  };
  var update_product_from_composite = function update_product_from_composite(index, compositeData) {
    var newProducts = _toConsumableArray(products);
    var currentProduct = newProducts[index];
    var priceType = currentProduct.price_type || "fixed";
    newProducts[index] = _objectSpread(_objectSpread(_objectSpread({}, currentProduct), compositeData), {}, {
      price_type: priceType,
      product_id: currentProduct.product_id
    });
    setProducts(newProducts);

    // OPRAVA: Rozdělit produkty na base (ValuePrice, TablePrice) a percentage
    var base_total = 0;
    var percentage_total = 0;
    var total_percentage_value = 0;
    newProducts.forEach(function (p, idx) {
      var type = p.price_type || "fixed";
      if (type === "percentage") {
        // Pro percentage produkty aplikovat znaménko
        var calculated = p.calculated_total || 0;
        var operation = p.percentage_operation || "add";
        var signed_amount = operation === "subtract" ? -calculated : calculated;
        percentage_total += signed_amount;

        // Sečíst percentage_value pro signal
        var percentage_value = p.percentage_value || 0;
        var signed_percentage = operation === "subtract" ? -percentage_value : percentage_value;
        total_percentage_value += signed_percentage;
      } else {
        var _calculated = p.calculated_total || 0;
        base_total += _calculated;
      }
    });

    // Aktualizovat block_percentage_configs pro percentage produkty
    if (total_percentage_value !== 0) {
      var operation = total_percentage_value >= 0 ? "add" : "subtract";
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.update_block_percentage)(component.step, component.fieldId, Math.abs(total_percentage_value), operation);
    }
    component.handle_change(newProducts, base_total);
  };
  component.render_input = function () {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "product-list-container space-y-4"
    }, products.length === 0 ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-gray-500 text-sm py-4"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No products added yet.", "wpcbooking")) : products.map(function (product, index) {
      var priceType = product.price_type || "fixed";
      var productFieldId = "".concat(component.fieldId, "[").concat(index, "]");
      console.log('product', index, product);
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        key: index,
        className: "aff-calculation-item flex flex-wrap gap-4 items-start bg-white p-4 rounded-xl shadow-soft border border-gray-200 relative"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
        type: "button",
        onClick: function onClick() {
          return remove_product(index);
        },
        className: "absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded",
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Remove product", "wpcbooking")
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        className: "w-4 h-4"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2",
        d: "M6 18L18 6M6 6l12 12"
      }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_ProductSelectControl_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
        fieldId: productFieldId,
        value: product,
        onChange: function onChange(data) {
          var newProducts = _toConsumableArray(products);
          newProducts[index] = _objectSpread(_objectSpread({}, newProducts[index]), data);
          setProducts(newProducts);
          component.handle_change(newProducts);
        },
        availableProducts: availableProducts,
        loadingProducts: loadingProducts
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex flex-col flex-1 min-w-[160px]"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
        className: "text-sm font-medium text-gray-700"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Price Type", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
        name: "".concat(productFieldId, "[price_type]"),
        value: priceType,
        className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
        onChange: function onChange(e) {
          return update_product(index, "price_type", e.target.value);
        }
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
        value: "fixed"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Fixed Price", "wpcbooking")), priceType === 'per_field' && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
        value: "per_field"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Price per Field", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
        value: "percentage"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Percentage from Order", "wpcbooking")), (product.table || product.table_row_field || product.table_column_field) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
        value: "table"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Table", "wpcbooking")))), priceType === "table" && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_TablePriceControl_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
        fieldId: productFieldId,
        value: product,
        onChange: function onChange(data) {
          return update_product_from_composite(index, data);
        },
        currencySymbol: currencySymbol,
        numberFields: numberFields
      }), (priceType === "fixed" || priceType === "per_field") && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_ValuePriceControl_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
        fieldId: productFieldId,
        value: product,
        onChange: function onChange(data) {
          return update_product_from_composite(index, data);
        },
        currencySymbol: currencySymbol,
        numberFields: numberFields
      }), priceType === "percentage" && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_PercentagePriceControl_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
        fieldId: productFieldId,
        value: product,
        onChange: function onChange(data) {
          return update_product_from_composite(index, data);
        },
        currencySymbol: currencySymbol
      }));
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mt-4 flex justify-end"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      type: "button",
      onClick: add_product,
      className: "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      className: "w-5 h-5"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M12 4v16m8-8H4"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add product", "wpcbooking")))));
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Products", "wpcbooking");
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductList);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/TextInput.jsx":
/*!******************************************************!*\
  !*** ./assets/js/admin/summary/blocks/TextInput.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var TextInput = function TextInput(props) {
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(props.value || ""),
    _useState2 = _slicedToArray(_useState, 2),
    localValue = _useState2[0],
    setLocalValue = _useState2[1];
  component.render_input = function () {
    var placeholder = component.attrs.placeholder || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("", "wpcbooking");
    var maxLength = component.attrs.max_length || null;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "text",
      id: component.fieldId,
      name: component.fieldId,
      value: localValue,
      placeholder: placeholder,
      maxLength: maxLength,
      className: "w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
      onInput: function onInput(e) {
        setLocalValue(e.target.value);
        component.handle_change(e.target.value);
      }
    });
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Text", "wpcbooking");
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/TimePicker.jsx":
/*!*******************************************************!*\
  !*** ./assets/js/admin/summary/blocks/TimePicker.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");



var TimePicker = function TimePicker(props) {
  var attrs = props.attrs || {};
  var fieldId = attrs.field_id || '';
  var value = props.value || '';
  var onChange = props.onChange;
  var inputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var flatpickrInstanceRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var onChangeRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(onChange);
  var fieldIdRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(fieldId);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    onChangeRef.current = onChange;
    fieldIdRef.current = fieldId;
  }, [onChange, fieldId]);
  var _attrs$general = attrs.general,
    general = _attrs$general === void 0 ? {} : _attrs$general;
  var time_picker_options = general['time_picker_options'] || general['timepicker_options'] || {};
  var _time_picker_options$ = time_picker_options.display_format,
    display_format = _time_picker_options$ === void 0 ? 'H:i' : _time_picker_options$,
    _time_picker_options$2 = time_picker_options.minute_increment,
    minute_increment = _time_picker_options$2 === void 0 ? '1' : _time_picker_options$2;
  var handleChange = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (newValue) {
    if (typeof onChangeRef.current === 'function') {
      onChangeRef.current(fieldIdRef.current, newValue);
    }
  }, []);
  var format_time = function format_time(date, format) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var pad = function pad(num) {
      return num.toString().padStart(2, '0');
    };
    return format.replace('H', pad(hours)).replace('i', pad(minutes));
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var initializeFlatpickr = function initializeFlatpickr() {
      if (!inputRef.current) {
        console.warn('[TimePicker INIT] ✗ inputRef is not available');
        return false;
      }
      if (typeof flatpickr === 'undefined') {
        console.warn('[TimePicker INIT] ✗ Flatpickr library is not loaded');
        return false;
      }
      if (flatpickrInstanceRef.current) {
        return false;
      }
      var validFormat = display_format && display_format !== 'other' && display_format !== '' ? display_format : 'H:i';
      flatpickrInstanceRef.current = flatpickr(inputRef.current, {
        enableTime: true,
        noCalendar: true,
        time_24hr: true,
        dateFormat: validFormat,
        minuteIncrement: parseInt(minute_increment, 10),
        clickOpens: true,
        onClose: function onClose(selectedDates, dateStr) {
          handleChange(dateStr);
        },
        onReady: function onReady(selectedDates, dateStr, instance) {
          var calendar = instance.calendarContainer;
          if (calendar) {
            instance._calendarContainer = calendar;
            instance._inputElement = inputRef.current;
            var buttons_container = document.createElement('div');
            buttons_container.className = 'flatpickr-time-buttons';
            var now_btn = document.createElement('button');
            now_btn.type = 'button';
            now_btn.className = 'flatpickr-time-btn flatpickr-time-btn-now';
            now_btn.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Now', 'wpcbooking');
            now_btn.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
              var now = new Date();
              instance.setDate(now, false);
            });
            var select_btn = document.createElement('button');
            select_btn.type = 'button';
            select_btn.className = 'flatpickr-time-btn flatpickr-time-btn-select';
            select_btn.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select', 'wpcbooking');
            select_btn.addEventListener('click', function (e) {
              e.preventDefault();
              e.stopPropagation();
              var selected_date = instance.selectedDates[0] || new Date();
              var time_str = format_time(selected_date, validFormat);
              handleChange(time_str);
              instance.close();
            });
            buttons_container.appendChild(now_btn);
            buttons_container.appendChild(select_btn);
            calendar.appendChild(buttons_container);
          }
        },
        clickOutside: function clickOutside(selectedDates, dateStr, instance, clickEvent) {
          if (!clickEvent || !instance._calendarContainer) {
            return true;
          }
          var target = clickEvent.target;
          var calendar = instance._calendarContainer;
          var input = instance._inputElement;
          var isInsideCalendar = calendar && calendar.contains(target);
          var isOnInput = input && (input === target || input.contains(target));
          var isTimeElement = target && target.closest && (target.closest('.arrowUp') || target.closest('.arrowDown') || target.closest('.flatpickr-time') || target.closest('.flatpickr-time-wrapper') || target.closest('.numInputWrapper') || target.closest('.flatpickr-hour') || target.closest('.flatpickr-minute') || target.closest('.flatpickr-time-buttons'));
          var isArrowButton = target && target.classList && (target.classList.contains('arrowUp') || target.classList.contains('arrowDown') || target.classList.contains('flatpickr-hour') || target.classList.contains('flatpickr-minute') || target.classList.contains('numInput') || target.classList.contains('flatpickr-time-btn'));
          if (isInsideCalendar || isOnInput || isTimeElement || isArrowButton) {
            return false;
          }
          return true;
        }
      });
      if (value && flatpickrInstanceRef.current && value !== 'ot3er' && value.length > 0) {
        try {
          flatpickrInstanceRef.current.setDate(value, false);
        } catch (e) {
          console.error('[TimePicker INIT] ✗ Failed to set initial value:', e);
        }
      }
      return true;
    };
    if (!initializeFlatpickr()) {
      var retryTimer = setTimeout(function () {
        initializeFlatpickr();
      }, 100);
      return function () {
        clearTimeout(retryTimer);
        if (flatpickrInstanceRef.current) {
          flatpickrInstanceRef.current.destroy();
          flatpickrInstanceRef.current = null;
        }
      };
    }
    return function () {
      if (flatpickrInstanceRef.current) {
        flatpickrInstanceRef.current.destroy();
        flatpickrInstanceRef.current = null;
      }
    };
  }, []);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!flatpickrInstanceRef.current) {
      return;
    }
    if (value && value !== 'ot3er' && value.length > 0) {
      try {
        flatpickrInstanceRef.current.setDate(value, false);
      } catch (e) {
        console.error('AdminTimePicker - Failed to update value:', e);
      }
    }
  }, [value]);
  var label = (general === null || general === void 0 ? void 0 : general.label) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Time', 'wpcbooking');
  var iconUrl = general === null || general === void 0 ? void 0 : general.icon_url;
  var iconStyle = iconUrl ? {
    WebkitMask: "url('".concat(iconUrl, "') no-repeat center"),
    mask: "url('".concat(iconUrl, "') no-repeat center"),
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    width: '20px',
    height: '20px',
    backgroundColor: 'currentColor'
  } : null;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "mb-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-2 mb-2"
  }, iconUrl && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("i", {
    className: "text-gray-700",
    style: iconStyle
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "font-semibold text-gray-700",
    htmlFor: fieldId
  }, label)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    ref: inputRef,
    type: "text",
    id: fieldId,
    name: fieldId,
    className: "px-3 py-2 border border-gray-300 rounded bg-white w-full",
    placeholder: "Format: ".concat(display_format && display_format !== 'other' ? display_format : 'H:i')
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimePicker);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/composite/InfoTooltip.jsx":
/*!******************************************************************!*\
  !*** ./assets/js/admin/summary/blocks/composite/InfoTooltip.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var InfoTooltip = function InfoTooltip(_ref) {
  var _ref$description = _ref.description,
    description = _ref$description === void 0 ? "" : _ref$description;
  if (!description) return null;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "relative flex items-center group"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "h-10 w-10 flex items-center justify-center bg-blue-50 border-2 border-blue-200 rounded-full cursor-help"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-base font-bold text-blue-700"
  }, "i")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-64 rounded-md bg-gray-800 px-3 py-2 text-xs text-white group-hover:block z-10 shadow-lg"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-center"
  }, description), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfoTooltip);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/composite/PercentagePriceControl.jsx":
/*!*****************************************************************************!*\
  !*** ./assets/js/admin/summary/blocks/composite/PercentagePriceControl.jsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var PercentagePriceControl = function PercentagePriceControl(_ref) {
  var _ref$fieldId = _ref.fieldId,
    fieldId = _ref$fieldId === void 0 ? "" : _ref$fieldId,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? {} : _ref$value,
    onChange = _ref.onChange,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "" : _ref$className,
    _ref$currencySymbol = _ref.currencySymbol,
    currencySymbol = _ref$currencySymbol === void 0 ? "" : _ref$currencySymbol,
    _ref$baseTotal = _ref.baseTotal,
    baseTotal = _ref$baseTotal === void 0 ? 0 : _ref$baseTotal;
  var get_operation = function get_operation() {
    var _value$percentage, _value$percentage2;
    if (value.percentage_operation) return value.percentage_operation;
    if ((_value$percentage = value.percentage) !== null && _value$percentage !== void 0 && _value$percentage.operation) {
      return value.percentage.operation === "substract" ? "subtract" : value.percentage.operation;
    }
    if ((_value$percentage2 = value.percentage) !== null && _value$percentage2 !== void 0 && _value$percentage2.add_substract) {
      return value.percentage.add_substract === "substract" ? "subtract" : "add";
    }
    return "add";
  };
  var get_value = function get_value() {
    var _value$percentage3, _value$percentage4;
    if (typeof value.percentage_value === "number") return Math.round(value.percentage_value);
    if (((_value$percentage3 = value.percentage) === null || _value$percentage3 === void 0 ? void 0 : _value$percentage3.price_increase) !== undefined) return Math.round(parseFloat(value.percentage.price_increase) || 0);
    if (((_value$percentage4 = value.percentage) === null || _value$percentage4 === void 0 ? void 0 : _value$percentage4.value) !== undefined) return Math.round(value.percentage.value);
    return 0;
  };
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(get_operation()),
    _useState2 = _slicedToArray(_useState, 2),
    percentage_operation = _useState2[0],
    set_percentage_operation = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(get_value()),
    _useState4 = _slicedToArray(_useState3, 2),
    percentage_value = _useState4[0],
    set_percentage_value = _useState4[1];
  var prevValuesRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    percentage_operation: percentage_operation,
    percentage_value: percentage_value
  });
  var debounceTimerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)
  var totalBasePrice = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.total_base_price.value;
  var base_total = totalBasePrice || 0;
  var calculate_percentage = function calculate_percentage() {
    var percentageValue = parseFloat(percentage_value) || 0;
    var operation = percentage_operation || "add";
    return operation === "subtract" ? -percentageValue : percentageValue;
  };
  var calculate_total = function calculate_total() {
    var percentage = calculate_percentage();
    return Math.round(base_total * (Math.abs(percentage) / 100));
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var prev = prevValuesRef.current;
    var hasChanged = prev.percentage_operation !== percentage_operation || prev.percentage_value !== percentage_value || prev.base_total !== base_total;
    if (hasChanged && onChange) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(function () {
        var calculated_total = calculate_total();
        prevValuesRef.current = {
          percentage_operation: percentage_operation,
          percentage_value: percentage_value,
          base_total: base_total
        };
        onChange({
          percentage_operation: percentage_operation,
          percentage_value: percentage_value,
          calculated_total: calculated_total
        });
      }, 1000);
    }
    return function () {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [percentage_operation, percentage_value, base_total, onChange]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-4 ".concat(className)
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[140px] js-operation"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Operation", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
    name: "".concat(fieldId, "_percentage[operation]"),
    value: percentage_operation,
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    onChange: function onChange(e) {
      return set_percentage_operation(e.target.value);
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "add"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Add", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "subtract"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Subtract", "wpcbooking")))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[120px] js-percentage"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Percentage", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    name: "".concat(fieldId, "_percentage[price_increase]"),
    type: "number",
    value: percentage_value,
    min: "0",
    max: "100",
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
    onInput: function onInput(e) {
      return set_percentage_value(Math.round(parseFloat(e.target.value) || 0));
    }
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col justify-end"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Total", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-sm mt-1 h-full flex items-center js-block-percetage-calc product"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "js-item-percentage product"
  }, calculate_percentage()), "%", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(" of", "wpcbooking"), " ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "ml-1 js-total-base"
  }, base_total.toFixed(2)), " ", currencySymbol, " =", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "ml-1 js-price-item-percentage block-total-price"
  }, calculate_total().toFixed(2), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "".concat(fieldId, "_percentage[price]"),
    value: calculate_total().toFixed(2)
  })), " ", currencySymbol)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PercentagePriceControl);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/composite/PriceIncreaseControl.jsx":
/*!***************************************************************************!*\
  !*** ./assets/js/admin/summary/blocks/composite/PriceIncreaseControl.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var PriceIncreaseControl = function PriceIncreaseControl(_ref) {
  var _ref$fieldId = _ref.fieldId,
    fieldId = _ref$fieldId === void 0 ? '' : _ref$fieldId,
    _ref$basePrice = _ref.basePrice,
    basePrice = _ref$basePrice === void 0 ? 0 : _ref$basePrice,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? {} : _ref$value,
    onChange = _ref.onChange,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$currencySymbol = _ref.currencySymbol,
    currencySymbol = _ref$currencySymbol === void 0 ? '' : _ref$currencySymbol;
  var get_operator = function get_operator() {
    var _value$percentage, _value$percentage2;
    // JS format
    if (value.operator) return value.operator;
    // PHP format: percentage.operation
    if ((_value$percentage = value.percentage) !== null && _value$percentage !== void 0 && _value$percentage.operation) {
      return value.percentage.operation === 'substract' || value.percentage.operation === 'subtract' ? '-' : '+';
    }
    // Legacy PHP format
    if ((_value$percentage2 = value.percentage) !== null && _value$percentage2 !== void 0 && _value$percentage2.add_substract) {
      return value.percentage.add_substract === 'substract' ? '-' : '+';
    }
    return '+';
  };
  var get_percentage = function get_percentage() {
    var _value$percentage3, _value$percentage4;
    // JS format
    if (typeof value.percentage === 'number') return Math.round(value.percentage);
    // PHP format: percentage.price_increase
    if (((_value$percentage3 = value.percentage) === null || _value$percentage3 === void 0 ? void 0 : _value$percentage3.price_increase) !== undefined) return Math.round(parseFloat(value.percentage.price_increase) || 0);
    // Legacy PHP format
    if (((_value$percentage4 = value.percentage) === null || _value$percentage4 === void 0 ? void 0 : _value$percentage4.value) !== undefined) return Math.round(value.percentage.value);
    return 0;
  };
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(get_operator()),
    _useState2 = _slicedToArray(_useState, 2),
    operator = _useState2[0],
    setOperator = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(get_percentage()),
    _useState4 = _slicedToArray(_useState3, 2),
    percentage = _useState4[0],
    setPercentage = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    percentageAmount = _useState6[0],
    setPercentageAmount = _useState6[1];
  var prevValuesRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    operator: operator,
    percentage: percentage,
    basePrice: basePrice
  });
  var debounceTimerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // Helper pro vytvoření description textu o basePrice
  var get_base_price_description = function get_base_price_description() {
    if (!basePrice || basePrice === 0) return null;
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Percentage is calculated from base price:', 'wpcbooking') + " ".concat(basePrice.toFixed(2), " ").concat(currencySymbol);
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var amount = basePrice * (percentage / 100);
    setPercentageAmount(amount);
    var prev = prevValuesRef.current;
    var hasChanged = prev.operator !== operator || prev.percentage !== percentage || prev.basePrice !== basePrice;
    if (hasChanged && onChange) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(function () {
        prevValuesRef.current = {
          operator: operator,
          percentage: percentage,
          basePrice: basePrice
        };
        onChange({
          operator: operator,
          percentage: percentage,
          total: amount,
          base_price: basePrice,
          calculated_total: amount
        });
      }, 1000);
    }
    return function () {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [operator, percentage, basePrice, onChange]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex gap-3 items-center ".concat(className)
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
    name: fieldId + '_percentage[operation]',
    value: operator,
    onChange: function onChange(e) {
      return setOperator(e.target.value);
    },
    className: "px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "+"
  }, "+"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "-"
  }, "-")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "number",
    name: fieldId + '_percentage[price_increase]',
    value: percentage,
    min: 0,
    max: 100,
    step: 1,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Percentage', 'wpcbooking'),
    className: "w-24 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
    onInput: function onInput(e) {
      return setPercentage(Math.round(parseFloat(e.target.value) || 0));
    }
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-gray-600"
  }, "%"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-2"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-sm text-gray-600"
  }, operator === '+' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add:', 'wpcbooking') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Subtract:', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "text",
    name: "".concat(fieldId, "_percentage[price]"),
    value: Math.round(percentageAmount).toFixed(2),
    readOnly: true,
    className: "w-32 px-3 py-2 border border-gray-200 rounded bg-gray-50 text-gray-700 cursor-not-allowed"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol text-sm text-gray-500"
  }, currencySymbol)), get_base_price_description() && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
    className: "text-xs text-blue-700"
  }, get_base_price_description())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceIncreaseControl);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/composite/ProductSelectControl.jsx":
/*!***************************************************************************!*\
  !*** ./assets/js/admin/summary/blocks/composite/ProductSelectControl.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var ProductSelectControl = function ProductSelectControl(_ref) {
  var _ref$fieldId = _ref.fieldId,
    fieldId = _ref$fieldId === void 0 ? "" : _ref$fieldId,
    value = _ref.value,
    onChange = _ref.onChange,
    availableProducts = _ref.availableProducts,
    loadingProducts = _ref.loadingProducts;
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    dropdownOpen = _useState2[0],
    setDropdownOpen = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    searchQuery = _useState4[0],
    setSearchQuery = _useState4[1];
  var dropdownRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var searchInputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var selectedProduct = availableProducts.find(function (p) {
    return String(p.id) === String(value.product_id);
  });
  var filteredProducts = function () {
    if (!searchQuery || searchQuery.trim() === '') return availableProducts;
    var normalizeText = function normalizeText(text) {
      if (!text) return '';
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };
    var searchTerm = normalizeText(searchQuery.trim());
    return availableProducts.filter(function (product) {
      var normalizedName = normalizeText(product.name);
      var normalizedId = normalizeText(product.id);
      return normalizedName.includes(searchTerm) || normalizedId.includes(searchTerm);
    });
  }();
  var handleProductSelect = function handleProductSelect(productId) {
    var selectedProduct = availableProducts.find(function (p) {
      return String(p.id) === String(productId);
    });
    onChange({
      product_id: productId,
      price: selectedProduct ? parseFloat(selectedProduct.price) || 0 : value.price
    });
    setDropdownOpen(false);
    setSearchQuery('');
  };
  var toggleDropdown = function toggleDropdown() {
    var newState = !dropdownOpen;
    setDropdownOpen(newState);
    if (!newState) {
      setSearchQuery('');
    }
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (dropdownOpen) {
      setTimeout(function () {
        var _searchInputRef$curre;
        (_searchInputRef$curre = searchInputRef.current) === null || _searchInputRef$curre === void 0 || _searchInputRef$curre.focus();
      }, 100);
    }
  }, [dropdownOpen]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-[2] min-w-[200px]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Product", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "".concat(fieldId, "[product_id]"),
    value: value.product_id || ""
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "relative",
    ref: dropdownRef
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    onClick: toggleDropdown,
    disabled: loadingProducts,
    className: "mt-1 w-full text-left border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 flex items-center justify-between"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "flex items-center gap-2 ".concat(selectedProduct ? "text-gray-900" : "text-gray-500")
  }, selectedProduct && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
    src: selectedProduct.thumbnail,
    alt: selectedProduct.name,
    className: "w-6 h-6 object-cover rounded"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, loadingProducts ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Loading...", "wpcbooking") : selectedProduct ? selectedProduct.name : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Select product", "wpcbooking"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
    className: "w-2.5 h-2.5 ms-2.5",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 10 6"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "m1 1 4 4 4-4"
  }))), dropdownOpen && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg left-0 right-0 top-full mt-1"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "p-2 border-b border-gray-200"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    ref: searchInputRef,
    type: "text",
    value: searchQuery,
    onInput: function onInput(e) {
      return setSearchQuery(e.target.value);
    },
    onChange: function onChange(e) {
      return setSearchQuery(e.target.value);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search product...', 'wpcbooking'),
    className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
    autoComplete: "off"
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    className: "py-2 text-sm text-left max-h-60 overflow-y-auto"
  }, filteredProducts.length > 0 ? filteredProducts.map(function (product) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: product.id
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      type: "button",
      onClick: function onClick() {
        return handleProductSelect(product.id);
      },
      className: "inline-flex w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ".concat(String(value.product_id) === String(product.id) ? 'bg-gray-100 text-gray-900' : 'text-gray-900')
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "inline-flex items-center gap-2"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
      src: product.thumbnail,
      alt: product.name,
      className: "w-6 h-6 object-cover rounded"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, product.name))));
  }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
    className: "px-4 py-2 text-sm text-gray-500 text-center"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No products found', 'wpcbooking'))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductSelectControl);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/composite/TablePriceControl.jsx":
/*!************************************************************************!*\
  !*** ./assets/js/admin/summary/blocks/composite/TablePriceControl.jsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateTablePrice: () => (/* binding */ calculateTablePrice),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getColumnByFieldId: () => (/* binding */ getColumnByFieldId),
/* harmony export */   getPriceByRowAndColumn: () => (/* binding */ getPriceByRowAndColumn),
/* harmony export */   getRowByFieldId: () => (/* binding */ getRowByFieldId)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




var getRowByFieldId = function getRowByFieldId(priceTable, fieldId) {
  if (!priceTable || Object.keys(priceTable).length === 0) {
    return null;
  }
  var availableRowIds = Object.keys(priceTable).map(function (id) {
    return parseInt(id);
  }).filter(function (id) {
    return !isNaN(id);
  }).sort(function (a, b) {
    return a - b;
  });
  var closestId = null;
  if (priceTable[fieldId] !== undefined) {
    closestId = fieldId;
  } else {
    var _iterator = _createForOfIteratorHelper(availableRowIds),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var id = _step.value;
        if (id >= parseInt(fieldId)) {
          closestId = id;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (closestId === null && availableRowIds.length > 0) {
      closestId = availableRowIds[availableRowIds.length - 1];
    }
  }
  var rowData = priceTable[closestId];
  if (rowData && _typeof(rowData) === 'object' && Object.keys(rowData).length > 0) {
    var firstValue = Object.values(rowData)[0];
    return parseInt(firstValue);
  }
  return null;
};
var getColumnByFieldId = function getColumnByFieldId(priceTable, fieldId) {
  if (!priceTable || Object.keys(priceTable).length === 0) {
    return null;
  }
  var allColumnIds = [];
  for (var _i = 0, _Object$values = Object.values(priceTable); _i < _Object$values.length; _i++) {
    var rowData = _Object$values[_i];
    if (rowData && _typeof(rowData) === 'object') {
      allColumnIds.push.apply(allColumnIds, _toConsumableArray(Object.keys(rowData).map(function (id) {
        return parseInt(id);
      }).filter(function (id) {
        return !isNaN(id);
      })));
    }
  }
  var availableColumnIds = _toConsumableArray(new Set(allColumnIds)).sort(function (a, b) {
    return a - b;
  });
  if (availableColumnIds.length === 0) {
    return null;
  }
  var closestId = null;
  for (var _i2 = 0, _Object$values2 = Object.values(priceTable); _i2 < _Object$values2.length; _i2++) {
    var _rowData = _Object$values2[_i2];
    if (_rowData && _rowData[fieldId] !== undefined) {
      closestId = fieldId;
      break;
    }
  }
  if (closestId === null) {
    var _iterator2 = _createForOfIteratorHelper(availableColumnIds),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var id = _step2.value;
        if (id >= parseInt(fieldId)) {
          closestId = id;
          break;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    if (closestId === null && availableColumnIds.length > 0) {
      closestId = availableColumnIds[availableColumnIds.length - 1];
    }
  }
  for (var _i3 = 0, _Object$values3 = Object.values(priceTable); _i3 < _Object$values3.length; _i3++) {
    var _rowData2 = _Object$values3[_i3];
    if (_rowData2 && _rowData2[closestId] !== undefined) {
      return parseInt(_rowData2[closestId]);
    }
  }
  return null;
};
var getPriceByRowAndColumn = function getPriceByRowAndColumn(priceTable, rowId, columnId) {
  if (!priceTable || Object.keys(priceTable).length === 0) {
    return null;
  }
  var availableRows = Object.keys(priceTable).map(function (id) {
    return parseInt(id);
  }).filter(function (id) {
    return !isNaN(id);
  }).sort(function (a, b) {
    return a - b;
  });
  var allColumns = [];
  for (var _i4 = 0, _Object$values4 = Object.values(priceTable); _i4 < _Object$values4.length; _i4++) {
    var rowData = _Object$values4[_i4];
    if (rowData && _typeof(rowData) === 'object') {
      allColumns.push.apply(allColumns, _toConsumableArray(Object.keys(rowData).map(function (id) {
        return parseInt(id);
      }).filter(function (id) {
        return !isNaN(id);
      })));
    }
  }
  var availableColumns = _toConsumableArray(new Set(allColumns)).sort(function (a, b) {
    return a - b;
  });
  if (priceTable[rowId] && priceTable[rowId][columnId] !== undefined) {
    return {
      price: priceTable[rowId][columnId],
      row: rowId,
      column: columnId
    };
  }
  var closestRowId = null;
  var _iterator3 = _createForOfIteratorHelper(availableRows),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var id = _step3.value;
      if (id >= parseInt(rowId)) {
        closestRowId = id;
        break;
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  if (closestRowId === null && availableRows.length > 0) {
    closestRowId = availableRows[availableRows.length - 1];
  }
  var closestColumnId = null;
  var _iterator4 = _createForOfIteratorHelper(availableColumns),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _id = _step4.value;
      if (_id >= parseInt(columnId)) {
        closestColumnId = _id;
        break;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  if (closestColumnId === null && availableColumns.length > 0) {
    closestColumnId = availableColumns[availableColumns.length - 1];
  }
  if (priceTable[closestRowId] && priceTable[closestRowId][closestColumnId] !== undefined) {
    return {
      price: priceTable[closestRowId][closestColumnId],
      row: closestRowId,
      column: closestColumnId
    };
  }
  return null;
};
var calculateTablePrice = function calculateTablePrice(value) {
  var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!value || value.price_type !== 'table') {
    return null;
  }
  var table = value.table;
  if (!table) {
    return null;
  }
  var currencyKey = currency || Object.keys(table)[0];
  var priceTable = table[currencyKey];
  if (!priceTable) {
    return null;
  }
  var rowId = value.row || value.table_row_field || '1';
  var columnId = value.column || value.table_column_field || '1';
  if (value.table_column_type === 'not_connected' || value.table_column_field === 'none') {
    var rowPrice = getRowByFieldId(priceTable, rowId);
    return rowPrice !== null ? {
      price: rowPrice,
      row: rowId,
      column: null
    } : null;
  }
  if (value.table_row_type === 'not_connected' || value.table_row_field === 'none') {
    var columnPrice = getColumnByFieldId(priceTable, columnId);
    return columnPrice !== null ? {
      price: columnPrice,
      row: null,
      column: columnId
    } : null;
  }
  return getPriceByRowAndColumn(priceTable, rowId, columnId);
};

// Pomocná funkce pro lookup ceny z tabulky
// ✅ POUŽÍVÁ field_values signal pro row/column hodnoty!
var lookupTablePrice = function lookupTablePrice(value, quantity, currencySymbol, field_values) {
  if (!value.table) {
    return 0;
  }
  var currency = Object.keys(value.table)[0]; // např. 'DKK'
  var priceTable = value.table[currency];
  if (!priceTable) {
    return 0;
  }
  var rowField = value.table_row_field;
  var columnField = value.table_column_field;

  // ✅ 1D Row-based (column = "none")
  // Použije hodnotu z field_values[rowField] nebo fallback na quantity
  if (columnField === 'none' && rowField !== 'none') {
    var rowValue = field_values.value[rowField];
    var lookupValue = rowValue !== undefined ? parseInt(rowValue) || 0 : quantity;
    var result = getRowByFieldId(priceTable, lookupValue);
    return result !== null ? result : 0;
  }

  // ✅ 1D Column-based (row = "none")
  // Použije hodnotu z field_values[columnField] nebo fallback na quantity
  if (rowField === 'none' && columnField !== 'none') {
    var columnValue = field_values.value[columnField];
    var _lookupValue = columnValue !== undefined ? parseInt(columnValue) || 0 : quantity;
    var _result = getColumnByFieldId(priceTable, _lookupValue);
    return _result !== null ? _result : 0;
  }

  // ✅ 2D (oba fieldy)
  // Použije hodnoty z field_values[rowField] a field_values[columnField]
  if (rowField !== 'none' && columnField !== 'none') {
    var _rowValue = field_values.value[rowField];
    var _columnValue = field_values.value[columnField];
    var row = _rowValue !== undefined ? parseInt(_rowValue) || 0 : value.row || quantity;
    var column = _columnValue !== undefined ? parseInt(_columnValue) || 0 : value.column || 1;
    var _result2 = getPriceByRowAndColumn(priceTable, row, column);
    return _result2 ? _result2.price : 0;
  }
  return 0;
};

// Extrahovat cenu z nested struktury
var extractPriceFromTable = function extractPriceFromTable(tableValue) {
  if (typeof tableValue === 'number') return tableValue;
  if (_typeof(tableValue) === 'object' && tableValue !== null) {
    var firstValue = Object.values(tableValue)[0];
    return typeof firstValue === 'number' ? firstValue : parseFloat(firstValue) || 0;
  }
  return 0;
};
var TablePriceControl = function TablePriceControl(_ref) {
  var _ref$fieldId = _ref.fieldId,
    fieldId = _ref$fieldId === void 0 ? "" : _ref$fieldId,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? {} : _ref$value,
    onChange = _ref.onChange,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$currencySymbol = _ref.currencySymbol,
    currencySymbol = _ref$currencySymbol === void 0 ? '' : _ref$currencySymbol,
    _ref$numberFields = _ref.numberFields,
    numberFields = _ref$numberFields === void 0 ? [] : _ref$numberFields;
  console.log('TablePriceControl', value);
  var parsedTable = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!value.table) return null;
    if (typeof value.table === 'string') {
      try {
        return JSON.parse(value.table);
      } catch (e) {
        console.error('Failed to parse table JSON:', e);
        return null;
      }
    }
    return value.table;
  }, [value.table]);
  var map_qty_type = function map_qty_type(type) {
    if (type === 'per_field') return 'field_connected';
    if (type === 'fixed') return 'not_connected';
    return type || 'not_connected';
  };
  var extract_quantity = function extract_quantity(val) {
    if (val.quantity !== undefined) return parseInt(val.quantity) || 1;
    if (val.qty !== undefined) return parseInt(val.qty) || 1;
    return 1;
  };
  var mapped_qty_type = map_qty_type(value.qty_type);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(mapped_qty_type),
    _useState2 = _slicedToArray(_useState, 2),
    qty_type = _useState2[0],
    set_qty_type = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(value.qty_field || ''),
    _useState4 = _slicedToArray(_useState3, 2),
    qty_field = _useState4[0],
    set_qty_field = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(extract_quantity(value)),
    _useState6 = _slicedToArray(_useState5, 2),
    quantity = _useState6[0],
    set_quantity = _useState6[1];

  // ✅ Price se POČÍTÁ z tabulky, ne ze state!
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    lookupPrice = _useState8[0],
    setLookupPrice = _useState8[1];
  var prevValuesRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    qty_type: mapped_qty_type,
    qty_field: value.qty_field || '',
    quantity: extract_quantity(value),
    lookupPrice: 0
  });
  var isInitRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var debounceTimerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var get_actual_quantity = function get_actual_quantity() {
    if (qty_type === 'field_connected' && qty_field) {
      var field_value = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[qty_field];
      var result = field_value !== undefined ? parseInt(field_value) || 1 : quantity;
      return result;
    }
    return quantity;
  };

  // Helper pro získání labelu fieldu z field_id
  var get_field_label = function get_field_label(field_id) {
    var _window$wpcbookingAdm;
    if (!field_id || field_id === 'none') return null;

    // Zkusit najít v numberFields prop
    var field = numberFields.find(function (f) {
      return f.value === field_id;
    });
    if (field) return field.label;

    // Fallback na window.wpcbookingAdminData
    var allFields = ((_window$wpcbookingAdm = window.wpcbookingAdminData) === null || _window$wpcbookingAdm === void 0 ? void 0 : _window$wpcbookingAdm.number_fields) || {};
    return allFields[field_id] || field_id;
  };

  // Helper pro vytvoření description textu o párování tabulky
  var get_table_mapping_description = function get_table_mapping_description() {
    var rowField = value.table_row_field;
    var columnField = value.table_column_field;
    if (!rowField && !columnField) return null;
    var rowLabel = rowField && rowField !== 'none' ? get_field_label(rowField) : null;
    var columnLabel = columnField && columnField !== 'none' ? get_field_label(columnField) : null;

    // Získat aktuální hodnoty z field_values
    var rowValue = rowField && rowField !== 'none' ? _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[rowField] : null;
    var columnValue = columnField && columnField !== 'none' ? _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[columnField] : null;
    var description = '';
    if (rowLabel && columnLabel) {
      // 2D tabulka
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Table is mapped to:', 'wpcbooking') + " ".concat(rowLabel, " (row) \xD7 ").concat(columnLabel, " (column)");
      if (rowValue !== undefined || columnValue !== undefined) {
        var rowVal = rowValue !== undefined ? rowValue : value.row || '-';
        var colVal = columnValue !== undefined ? columnValue : value.column || '-';
        description += " - ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Current values:', 'wpcbooking'), " ").concat(rowVal, " \xD7 ").concat(colVal);
      }
    } else if (rowLabel) {
      // 1D row-based
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Table is mapped to:', 'wpcbooking') + " ".concat(rowLabel, " (row)");
      if (rowValue !== undefined) {
        description += " - ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Current value:', 'wpcbooking'), " ").concat(rowValue);
      }
    } else if (columnLabel) {
      // 1D column-based
      description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Table is mapped to:', 'wpcbooking') + " ".concat(columnLabel, " (column)");
      if (columnValue !== undefined) {
        description += " - ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Current value:', 'wpcbooking'), " ").concat(columnValue);
      }
    }
    return description || null;
  };

  // ✅ Effect pro automatický lookup ceny z tabulky
  // REAGUJE na změny field_values pro table_row_field a table_column_field!
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!parsedTable) {
      setLookupPrice(0);
      return;
    }
    var valueWithParsedTable = _objectSpread(_objectSpread({}, value), {}, {
      table: parsedTable
    });
    var rawPrice = lookupTablePrice(valueWithParsedTable, quantity, currencySymbol, _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values);
    var extractedPrice = extractPriceFromTable(rawPrice);
    setLookupPrice(extractedPrice);
  }, [parsedTable, quantity, currencySymbol,
  // ✅ DŮLEŽITÉ: Reagovat na změny field_values pro row/column fieldy!
  _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[value.table_row_field], _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[value.table_column_field], value.table_row_field, value.table_column_field]);

  // Init effect
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!isInitRef.current && value.qty_type) {
      var newType = map_qty_type(value.qty_type);
      set_qty_type(newType);
      set_qty_field(value.qty_field || '');
      set_quantity(extract_quantity(value));
      isInitRef.current = true;
    }
  }, [value]);
  var calculateTotal = function calculateTotal() {
    // ✅ Použít get_actual_quantity() pro podporu field_connected qty
    var qty = get_actual_quantity();
    var priceVal = parseFloat(lookupPrice) || 0;
    var total = (qty * priceVal).toFixed(2);
    return total;
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (qty_type === 'field_connected' && qty_field) {
      var field_value = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[qty_field];
      if (field_value !== undefined) {
        var new_qty = parseInt(field_value) || 1;
        if (new_qty !== quantity) {
          set_quantity(new_qty);
        }
      }
    }
  }, [_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value, qty_field, qty_type]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var prev = prevValuesRef.current;
    var hasChanged = prev.qty_type !== qty_type || prev.qty_field !== qty_field || prev.quantity !== quantity || prev.lookupPrice !== lookupPrice;
    if (hasChanged && onChange) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(function () {
        var calculated_total = parseFloat(calculateTotal());
        var changeData = {
          qty_type: qty_type,
          qty_field: qty_field,
          qty: quantity,
          quantity: quantity,
          price: lookupPrice,
          calculated_total: calculated_total,
          table: parsedTable,
          table_row_field: value.table_row_field,
          table_column_field: value.table_column_field,
          row: value.row
        };
        prevValuesRef.current = {
          qty_type: qty_type,
          qty_field: qty_field,
          quantity: quantity,
          lookupPrice: lookupPrice
        };
        onChange(changeData);
      }, 1000);
    }
    return function () {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [qty_type, qty_field, quantity, lookupPrice, onChange, parsedTable, value.table_row_field, value.table_column_field, value.row]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-wrap gap-4 items-start ".concat(className)
  }, parsedTable && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "".concat(fieldId, "[table]"),
    value: JSON.stringify(parsedTable)
  }), value.table_row_field && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "".concat(fieldId, "[table_row_field]"),
    value: value.table_row_field
  }), value.table_column_field && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "".concat(fieldId, "[table_column_field]"),
    value: value.table_column_field
  }), value.row !== undefined && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "".concat(fieldId, "[row]"),
    value: value.row
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[160px] js-qty-connection"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Qty Connection', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
    name: "".concat(fieldId, "[qty_type]"),
    value: qty_type,
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-connection-type focus:outline-none focus:ring-2 focus:ring-blue-500",
    onChange: function onChange(e) {
      return set_qty_type(e.target.value);
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "not_connected"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not Connected', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "field_connected"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Connected to Field', 'wpcbooking')))), qty_type === 'field_connected' && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[160px] js-qty-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Qty Field', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
    name: "".concat(fieldId, "[qty_field]"),
    value: qty_field,
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-number-field focus:outline-none focus:ring-2 focus:ring-blue-500",
    onChange: function onChange(e) {
      return set_qty_field(e.target.value);
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select field', 'wpcbooking')), numberFields.map(function (field) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
      key: field.value,
      value: field.value
    }, field.label);
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[120px] js-qty"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Quantity', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    name: "".concat(fieldId, "[qty]"),
    type: "number",
    value: quantity,
    min: "1",
    readOnly: qty_type === 'field_connected',
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-qty-manual focus:outline-none focus:ring-2 focus:ring-blue-500",
    onInput: function onInput(e) {
      return set_quantity(parseInt(e.target.value) || 1);
    }
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[140px] js-price-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Price (from table)', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "".concat(fieldId, "[price]"),
    value: lookupPrice
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "mt-1 border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 w-full text-sm text-gray-600"
  }, lookupPrice.toFixed(2), " ", currencySymbol)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col justify-end"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Total', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-sm mt-1 h-full flex items-center js-span-price-total"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "block-total-price"
  }, calculateTotal()), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "ml-1 text-gray-600 currnency_symbol"
  }, currencySymbol)))), get_table_mapping_description() && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
    className: "text-xs text-blue-700"
  }, get_table_mapping_description())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TablePriceControl);


/***/ }),

/***/ "./assets/js/admin/summary/blocks/composite/ValuePriceControl.jsx":
/*!************************************************************************!*\
  !*** ./assets/js/admin/summary/blocks/composite/ValuePriceControl.jsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }




var ValuePriceControl = function ValuePriceControl(_ref) {
  var _ref$fieldId = _ref.fieldId,
    fieldId = _ref$fieldId === void 0 ? "" : _ref$fieldId,
    _ref$value = _ref.value,
    value = _ref$value === void 0 ? {} : _ref$value,
    onChange = _ref.onChange,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$currencySymbol = _ref.currencySymbol,
    currencySymbol = _ref$currencySymbol === void 0 ? '' : _ref$currencySymbol,
    _ref$numberFields = _ref.numberFields,
    numberFields = _ref$numberFields === void 0 ? [] : _ref$numberFields;
  var map_qty_type = function map_qty_type(type) {
    if (type === 'per_field') return 'field_connected';
    if (type === 'fixed') return 'not_connected';
    return type || 'not_connected';
  };
  var extract_price = function extract_price(price_value) {
    if (typeof price_value === 'number') return price_value;
    if (_typeof(price_value) === 'object' && price_value !== null) {
      return parseFloat(Object.values(price_value)[0]) || 0;
    }
    return parseFloat(price_value) || 0;
  };
  var extract_quantity = function extract_quantity(val) {
    if (val.quantity !== undefined) return parseInt(val.quantity) || 1;
    if (val.qty !== undefined) return parseInt(val.qty) || 1;
    return 1;
  };
  var mapped_qty_type = map_qty_type(value.qty_type);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(mapped_qty_type),
    _useState2 = _slicedToArray(_useState, 2),
    qty_type = _useState2[0],
    set_qty_type = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(value.qty_field || ''),
    _useState4 = _slicedToArray(_useState3, 2),
    qty_field = _useState4[0],
    set_qty_field = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(extract_quantity(value)),
    _useState6 = _slicedToArray(_useState5, 2),
    quantity = _useState6[0],
    set_quantity = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(extract_price(value.price)),
    _useState8 = _slicedToArray(_useState7, 2),
    price = _useState8[0],
    set_price = _useState8[1];
  var prevValuesRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    qty_type: mapped_qty_type,
    qty_field: value.qty_field || '',
    quantity: extract_quantity(value),
    price: extract_price(value.price)
  });
  var isInitRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var debounceTimerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var get_actual_quantity = function get_actual_quantity() {
    if (qty_type === 'field_connected' && qty_field) {
      var field_value = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[qty_field];
      return field_value !== undefined ? parseInt(field_value) || 1 : quantity;
    }
    return quantity;
  };

  // Helper pro získání labelu fieldu z field_id
  var get_field_label = function get_field_label(field_id) {
    var _window$wpcbookingAdm;
    if (!field_id || field_id === 'none') return null;

    // Zkusit najít v numberFields prop
    var field = numberFields.find(function (f) {
      return f.value === field_id;
    });
    if (field) return field.label;

    // Fallback na window.wpcbookingAdminData
    var allFields = ((_window$wpcbookingAdm = window.wpcbookingAdminData) === null || _window$wpcbookingAdm === void 0 ? void 0 : _window$wpcbookingAdm.number_fields) || {};
    return allFields[field_id] || field_id;
  };

  // Helper pro vytvoření description textu o propojení quantity
  var get_quantity_mapping_description = function get_quantity_mapping_description() {
    if (qty_type !== 'field_connected' || !qty_field) return null;
    var fieldLabel = get_field_label(qty_field);
    if (!fieldLabel) return null;
    var fieldValue = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[qty_field];
    var description = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Quantity is connected to:', 'wpcbooking') + " ".concat(fieldLabel);
    if (fieldValue !== undefined) {
      description += " - ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Current value:', 'wpcbooking'), " ").concat(fieldValue);
    }
    return description;
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!isInitRef.current && value.qty_type) {
      var newType = map_qty_type(value.qty_type);
      set_qty_type(newType);
      set_qty_field(value.qty_field || '');
      set_quantity(extract_quantity(value));
      set_price(extract_price(value.price));
      isInitRef.current = true;
    }
  }, [value]);
  var calculate_total = function calculate_total() {
    var qty = get_actual_quantity();
    var priceVal = parseFloat(price) || 0;
    return (qty * priceVal).toFixed(2);
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (qty_type === 'field_connected' && qty_field) {
      var field_value = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value[qty_field];
      if (field_value !== undefined) {
        var new_qty = parseInt(field_value) || 1;
        if (new_qty !== quantity) {
          set_quantity(new_qty);
        }
      }
    }
  }, [_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.field_values.value, qty_field, qty_type]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var prev = prevValuesRef.current;
    var hasChanged = prev.qty_type !== qty_type || prev.qty_field !== qty_field || prev.quantity !== quantity || prev.price !== price;
    if (hasChanged && onChange) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(function () {
        var calculated_total = parseFloat(calculate_total());
        prevValuesRef.current = {
          qty_type: qty_type,
          qty_field: qty_field,
          quantity: quantity,
          price: price
        };
        onChange({
          qty_type: qty_type,
          qty_field: qty_field,
          qty: quantity,
          quantity: quantity,
          price: price,
          calculated_total: calculated_total
        });
      }, 1000);
    }
    return function () {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [qty_type, qty_field, quantity, price, onChange]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-wrap gap-4 items-start ".concat(className)
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[160px] js-qty-connection"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Qty Connection', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
    name: "".concat(fieldId, "[qty_type]"),
    value: qty_type,
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-connection-type focus:outline-none focus:ring-2 focus:ring-blue-500",
    onChange: function onChange(e) {
      return set_qty_type(e.target.value);
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "not_connected"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not Connected', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: "field_connected"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Connected to Field', 'wpcbooking')))), qty_type === 'field_connected' && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[160px] js-qty-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Qty Field', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("select", {
    name: "".concat(fieldId, "[qty_field]"),
    value: qty_field,
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-number-field focus:outline-none focus:ring-2 focus:ring-blue-500",
    onChange: function onChange(e) {
      return set_qty_field(e.target.value);
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
    value: ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select field', 'wpcbooking')), numberFields.map(function (field) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("option", {
      key: field.value,
      value: field.value
    }, field.label);
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[120px] js-qty"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Quantity', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    name: "".concat(fieldId, "[qty]"),
    type: "number",
    value: quantity,
    min: "1",
    readOnly: qty_type === 'field_connected',
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-qty-manual focus:outline-none focus:ring-2 focus:ring-blue-500",
    onInput: function onInput(e) {
      return set_quantity(parseInt(e.target.value) || 1);
    }
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col flex-1 min-w-[140px] js-price-field"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Price', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    name: "".concat(fieldId, "[price]"),
    type: "number",
    value: price,
    min: "0",
    step: "1",
    className: "mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-price-number focus:outline-none focus:ring-2 focus:ring-blue-500",
    onInput: function onInput(e) {
      return set_price(parseFloat(e.target.value) || 0);
    }
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col justify-end"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-sm font-medium text-gray-700"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Total', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-sm mt-1 h-full flex items-center js-span-price-total"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "block-total-price"
  }, calculate_total()), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "ml-1 text-gray-600 currnency_symbol"
  }, currencySymbol)))), get_quantity_mapping_description() && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
    className: "text-xs text-blue-700"
  }, get_quantity_mapping_description())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValuePriceControl);

/***/ }),

/***/ "./assets/js/admin/summary/blocks/index.js":
/*!*************************************************!*\
  !*** ./assets/js/admin/summary/blocks/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminBlockRenderer: () => (/* reexport safe */ _BlockRenderer_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   AdminCalculator: () => (/* reexport safe */ _AdminCalculator_jsx__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   BaseAdminBlockComponent: () => (/* reexport safe */ _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_0__.BaseAdminBlockComponent),
/* harmony export */   BlockComponent: () => (/* reexport safe */ _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_0__.BlockComponent),
/* harmony export */   BlockRenderer: () => (/* reexport safe */ _BlockRenderer_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   DatePicker: () => (/* reexport safe */ _DatePicker_jsx__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   EmailInput: () => (/* reexport safe */ _EmailInput_jsx__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   GoogleMap: () => (/* reexport safe */ _GoogleMap_jsx__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   IconsList: () => (/* reexport safe */ _IconsList_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   NumberInput: () => (/* reexport safe */ _NumberInput_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   PhoneInput: () => (/* reexport safe */ _PhoneInput_jsx__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   PriceIncreaseControl: () => (/* reexport safe */ _composite_PriceIncreaseControl_jsx__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   ProductList: () => (/* reexport safe */ _ProductList_jsx__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   TextInput: () => (/* reexport safe */ _TextInput_jsx__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   TimePicker: () => (/* reexport safe */ _TimePicker_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
/* harmony import */ var _BlockRenderer_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BlockRenderer.jsx */ "./assets/js/admin/summary/blocks/BlockRenderer.jsx");
/* harmony import */ var _IconsList_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IconsList.jsx */ "./assets/js/admin/summary/blocks/IconsList.jsx");
/* harmony import */ var _DatePicker_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DatePicker.jsx */ "./assets/js/admin/summary/blocks/DatePicker.jsx");
/* harmony import */ var _TimePicker_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimePicker.jsx */ "./assets/js/admin/summary/blocks/TimePicker.jsx");
/* harmony import */ var _GoogleMap_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GoogleMap.jsx */ "./assets/js/admin/summary/blocks/GoogleMap.jsx");
/* harmony import */ var _NumberInput_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NumberInput.jsx */ "./assets/js/admin/summary/blocks/NumberInput.jsx");
/* harmony import */ var _TextInput_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TextInput.jsx */ "./assets/js/admin/summary/blocks/TextInput.jsx");
/* harmony import */ var _EmailInput_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EmailInput.jsx */ "./assets/js/admin/summary/blocks/EmailInput.jsx");
/* harmony import */ var _PhoneInput_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PhoneInput.jsx */ "./assets/js/admin/summary/blocks/PhoneInput.jsx");
/* harmony import */ var _ProductList_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ProductList.jsx */ "./assets/js/admin/summary/blocks/ProductList.jsx");
/* harmony import */ var _AdminCalculator_jsx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./AdminCalculator.jsx */ "./assets/js/admin/summary/blocks/AdminCalculator.jsx");
/* harmony import */ var _composite_PriceIncreaseControl_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./composite/PriceIncreaseControl.jsx */ "./assets/js/admin/summary/blocks/composite/PriceIncreaseControl.jsx");















/***/ }),

/***/ "./assets/js/admin/summary/components/AdminSummary.jsx":
/*!*************************************************************!*\
  !*** ./assets/js/admin/summary/components/AdminSummary.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/configHelpers.js */ "./assets/js/admin/summary/utils/configHelpers.js");
/* harmony import */ var _utils_stepConditions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/stepConditions.js */ "./assets/js/utils/stepConditions.js");
/* harmony import */ var _utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/priceFormatting.js */ "./assets/js/admin/summary/utils/priceFormatting.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
/* harmony import */ var _SummaryItem_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SummaryItem.jsx */ "./assets/js/admin/summary/components/SummaryItem.jsx");
/* harmony import */ var _SummaryCart_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SummaryCart.jsx */ "./assets/js/admin/summary/components/SummaryCart.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }








//import AddNewRow from "./AddNewRow.jsx";

var AdminSummary = function AdminSummary() {
  var _window$wpcbookingAdm;
  if (!(0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.isAdminDataAvailable)()) {
    console.warn("⚠️ Admin data not available");
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "p-4 border border-yellow-300 rounded bg-yellow-50"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
      className: "text-sm text-yellow-700"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("⚠️ Window data not available. Admin Summary needs window.wpcbookingAdminData.", "wpcbooking")));
  }
  var postId = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getPostId)();
  var summarySettings = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getSummarySettings)();
  var formatConfig = (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_5__.getFormatConfig)();
  var pluginUrl = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getPluginUrl)();
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getSteps)()),
    _useState2 = _slicedToArray(_useState, 2),
    steps = _useState2[0],
    setSteps = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getStepSections)()),
    _useState4 = _slicedToArray(_useState3, 2),
    stepSections = _useState4[0],
    setStepSections = _useState4[1];
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.reset_blocks_loading)();
  }, []);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.all_blocks_loaded.value) {
      var timer = setTimeout(function () {
        (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.set_initializing)(false);
      }, 50);
      return function () {
        return clearTimeout(timer);
      };
    }
  }, [_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.all_blocks_loaded.value]);
  var handleLabelChange = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (stepId, newLabel) {
    setSteps(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, stepId, _objectSpread(_objectSpread({}, prev[stepId]), {}, {
        label_summary: newLabel
      })));
    });
  }, []);
  var handleBlockChange = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (stepId, fieldId, value) {
    var block_total = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    // Aktualizace base price pokud přišla z bloku
    if (block_total !== null && block_total !== undefined) {
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.update_base_price)(stepId, block_total);
    }

    // Zpracování procentuálních změn
    if (Array.isArray(value) && value[0] && value[0].price_increase !== undefined) {
      var percentage = parseFloat(value[0].price_increase) || 0;
      var operation = value[0].operation || "add";

      // Aktualizace percentage signálu pro konkrétní block (step + fieldId)
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.update_block_percentage)(stepId, fieldId, percentage, operation);

      // Aktualizace local state pro PHP uložení
      setSteps(function (prev) {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, stepId, _objectSpread(_objectSpread({}, prev[stepId]), {}, {
          price_percentage: percentage,
          percentage_operation: operation
        })));
      });
      return;
    }

    // Standardní aktualizace stepSections
    setStepSections(function (prev) {
      var stepData = prev[stepId];
      if (Array.isArray(stepData)) {
        var updatedArray = stepData.map(function (block) {
          if (block.field_id === fieldId) {
            return _objectSpread(_objectSpread({}, block), {}, {
              value: value
            });
          }
          return block;
        });
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, stepId, updatedArray));
      }
      if (stepData && _typeof(stepData) === "object") {
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, stepId, _objectSpread(_objectSpread({}, stepData), {}, _defineProperty({}, fieldId, _objectSpread(_objectSpread({}, stepData[fieldId]), {}, {
          value: value
        })))));
      }
      console.warn("⚠️ Unexpected stepData structure:", stepData);
      return prev;
    });
  }, []);
  var handleDelete = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (stepId) {
    setSteps(function (prev) {
      var newSteps = _objectSpread({}, prev);
      delete newSteps[stepId];
      return newSteps;
    });
    setStepSections(function (prev) {
      var newSections = _objectSpread({}, prev);
      delete newSections[stepId];
      return newSections;
    });

    // Odstraní jak base price tak percentage pro tento step
    (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.remove_step_prices)(stepId);
  }, []);
  var handleAddFee = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (label, price) {
    var newStepId = Object.keys(steps).length + 1;
    setSteps(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, newStepId, {
        id: newStepId,
        label_summary: label,
        value: price,
        price_percentage: 0,
        percentage_operation: "add",
        thumbnail_id: "info",
        thumbnail_src: "".concat(pluginUrl, "assets/img/info.svg")
      }));
    });
  }, [steps, pluginUrl]);
  var summaryIconUrl = "".concat(pluginUrl, "assets/img/summary.svg");
  var iconMaskStyle = {
    "--mask-img": "url('".concat(summaryIconUrl, "')")
  };
  var isLoading = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.is_initializing.value;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("section", {
    id: "admin-edit-quote",
    className: "py-50p overflow-hidden ".concat(!_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.edit_mode.value ? "quote-no-edit" : "")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "cs-container cs-grid items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full medium:col-[1/span_9] medium:self-start relative"
  }, isLoading && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 rounded-[35px] min-h-[200px]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-col items-center gap-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-th-orange"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
    className: "text-th-grey af-p20"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Loading summary...", "wpcbooking")), _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.blocks_loading_count.value > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
    className: "text-xs text-gray-500"
  }, _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.blocks_loading_count.value, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("blocks loading", "wpcbooking")))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "min-h-[70px] flex justify-between items-center bg-th-grey rounded-[35px] ".concat(isLoading ? "opacity-50" : "")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-5 pl-40p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: iconMaskStyle,
    className: "w-11 h-10 bg-white cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p20-bold text-white uppercase"
  }, summarySettings.labelSummary))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    id: "edit_summary_quote_nonce",
    name: "edit_summary_quote_nonce",
    value: ((_window$wpcbookingAdm = window.wpcbookingAdminData) === null || _window$wpcbookingAdm === void 0 ? void 0 : _window$wpcbookingAdm.nonce) || ""
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    className: "aff-summary-list space-y-5 mt-5 ".concat(isLoading ? "opacity-50 pointer-events-none" : "")
  }, Object.entries(steps).map(function (_ref) {
    var _step$base_price, _step$percentage_pric;
    var _ref2 = _slicedToArray(_ref, 2),
      stepId = _ref2[0],
      step = _ref2[1];
    var products = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getProducts)();
    var maxStep = Object.keys(steps).length;
    var shouldShow = (0,_utils_stepConditions_js__WEBPACK_IMPORTED_MODULE_4__.check_step_condition)(step.conditions, parseInt(stepId), maxStep, products);
    var basePrice = (_step$base_price = step.base_price) !== null && _step$base_price !== void 0 ? _step$base_price : 0;
    var percentagePrice = (_step$percentage_pric = step.percentage_price) !== null && _step$percentage_pric !== void 0 ? _step$percentage_pric : 0;
    if (!shouldShow) {
      return null;
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_SummaryItem_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
      step: parseInt(stepId),
      label: step.label_summary,
      thumbnailSrc: step.thumbnail_url,
      basePrice: basePrice,
      percentagePrice: percentagePrice,
      stepSection: stepSections[stepId] || {},
      onDelete: handleDelete,
      onLabelChange: handleLabelChange,
      onBlockChange: handleBlockChange
    });
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "total_base_price",
    value: _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.total_base_price.value
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "total_percentage_price",
    value: _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.total_percentage_price.value
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "total_price",
    value: _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.final_price.value
  }), Object.entries(steps).map(function (_ref3) {
    var _ref5, _ref6, _step_totals_from_blo, _step$value, _step$label_summary;
    var _ref4 = _slicedToArray(_ref3, 2),
      stepId = _ref4[0],
      step = _ref4[1];
    // Použít computed hodnoty ze signals místo state
    var stepBasePrice = (_ref5 = (_ref6 = (_step_totals_from_blo = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.step_totals_from_blocks.value[stepId]) !== null && _step_totals_from_blo !== void 0 ? _step_totals_from_blo : step.base_price) !== null && _ref6 !== void 0 ? _ref6 : step.value) !== null && _ref5 !== void 0 ? _ref5 : 0;
    var stepPercentageAmount = (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_6__.get_step_percentage_amount)(stepId);
    var stepTotal = stepBasePrice + stepPercentageAmount;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: "step-hidden-".concat(stepId),
      style: {
        display: "none"
      }
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: "total_price_step_".concat(stepId),
      value: stepBasePrice
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: "price_percentage_step_".concat(stepId),
      value: stepPercentageAmount
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: "price_products_step_".concat(stepId),
      value: (_step$value = step.value) !== null && _step$value !== void 0 ? _step$value : 0
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "hidden",
      name: "label_step_".concat(stepId),
      value: (_step$label_summary = step.label_summary) !== null && _step$label_summary !== void 0 ? _step$label_summary : ""
    }));
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: isLoading ? "opacity-50 pointer-events-none" : ""
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_SummaryCart_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    labelPrice: summarySettings.labelPrice,
    labelTotal: summarySettings.labelTotal
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminSummary);

/***/ }),

/***/ "./assets/js/admin/summary/components/SummaryCart.jsx":
/*!************************************************************!*\
  !*** ./assets/js/admin/summary/components/SummaryCart.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/priceFormatting.js */ "./assets/js/admin/summary/utils/priceFormatting.js");
/* harmony import */ var _utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/configHelpers.js */ "./assets/js/admin/summary/utils/configHelpers.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");





var SummaryCart = function SummaryCart(_ref) {
  var labelPrice = _ref.labelPrice,
    labelTotal = _ref.labelTotal,
    _ref$labelPercentage = _ref.labelPercentage,
    labelPercentage = _ref$labelPercentage === void 0 ? null : _ref$labelPercentage,
    _ref$shippingTotal = _ref.shippingTotal,
    shippingTotal = _ref$shippingTotal === void 0 ? 0 : _ref$shippingTotal;
  var pluginUrl = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getPluginUrl)();

  // Čtení ze signálů
  var base_total = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__.total_base_price.value;
  var percentage_total = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__.total_percentage_price.value;
  var cart_total = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__.final_price.value;
  var currency = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__.currency_symbol.value;
  var coinsIconUrl = "".concat(pluginUrl, "assets/img/coins.svg");
  var maskStyle = {
    '--mask-img': "url('".concat(coinsIconUrl, "')")
  };
  var has_percentage = percentage_total !== 0;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "bg-th-orange rounded-[35px] mt-5"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-5 pl-20p large:pl-40p pt-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-50p h-50p rounded-full bg-white flex justify-center items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
    href: "",
    style: maskStyle,
    className: "w-25p h-25p bg-th-orange cs-mask"
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-20p large:ml-100p pb-20p text-white"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "total_base_price",
    value: base_total
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "total_percentage_price",
    value: percentage_total
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "total_price",
    value: cart_total
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3 border-b border-dashed border-white"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-reg"
  }, labelPrice), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-bold mr-50p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "aff-total-base"
  }, (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_2__.formatPriceWithoutCurrency)(base_total)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, currency))), has_percentage && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3 border-b border-dashed border-white"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-reg"
  }, labelPercentage || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Percentage adjustment', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-bold mr-50p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "aff-total-percentage ".concat(percentage_total < 0 ? 'text-red-200' : '')
  }, percentage_total >= 0 ? '+' : '', (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_2__.formatPriceWithoutCurrency)(percentage_total)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, currency))), shippingTotal > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3 border-b border-dashed border-white"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-reg"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Shipping', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-bold mr-50p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_2__.formatPriceWithoutCurrency)(shippingTotal)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, currency))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p30"
  }, labelTotal), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p30 mr-50p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "aff-total-price"
  }, (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_2__.formatPriceWithoutCurrency)(cart_total)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, currency)))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryCart);

/***/ }),

/***/ "./assets/js/admin/summary/components/SummaryItem.jsx":
/*!************************************************************!*\
  !*** ./assets/js/admin/summary/components/SummaryItem.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/priceFormatting.js */ "./assets/js/admin/summary/utils/priceFormatting.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
/* harmony import */ var _SummaryItemEdit_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SummaryItemEdit.jsx */ "./assets/js/admin/summary/components/SummaryItemEdit.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var SummaryItem = function SummaryItem(_ref) {
  var step = _ref.step,
    label = _ref.label,
    thumbnailSrc = _ref.thumbnailSrc,
    _ref$basePrice = _ref.basePrice,
    basePrice = _ref$basePrice === void 0 ? 0 : _ref$basePrice,
    _ref$percentagePrice = _ref.percentagePrice,
    percentagePrice = _ref$percentagePrice === void 0 ? 0 : _ref$percentagePrice,
    _ref$stepSection = _ref.stepSection,
    stepSection = _ref$stepSection === void 0 ? {} : _ref$stepSection,
    onDelete = _ref.onDelete,
    onLabelChange = _ref.onLabelChange,
    onBlockChange = _ref.onBlockChange;
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(label),
    _useState2 = _slicedToArray(_useState, 2),
    currentLabel = _useState2[0],
    setCurrentLabel = _useState2[1];
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.init_base_price)(step, basePrice);
    if (percentagePrice !== 0) {
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.init_percentage_from_amount)(step, percentagePrice);
    }
  }, [step, basePrice, percentagePrice]);
  var maskStyle = {
    "--mask-img": "url('".concat(thumbnailSrc, "')")
  };
  var is_editable = !_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.edit_mode.value;
  var currency = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.currency_symbol.value;
  var base_price = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _ref2, _ref3;
    var block_total = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.step_totals_from_blocks.value[step];
    var legacy_total = _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.item_base_prices.value[step];
    return (_ref2 = (_ref3 = block_total !== null && block_total !== void 0 ? block_total : legacy_total) !== null && _ref3 !== void 0 ? _ref3 : basePrice) !== null && _ref2 !== void 0 ? _ref2 : 0;
  }, [step, _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.step_totals_from_blocks.value, _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.item_base_prices.value, basePrice]);
  var percentage_amount = (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_3__.get_step_percentage_amount)(step);
  var step_total = base_price + percentage_amount;
  var handle_block_change = function handle_block_change(stepId, fieldId, blockValue) {
    var block_total = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    // Předáme nahoru do AdminSummary
    if (typeof onBlockChange === "function") {
      onBlockChange(stepId, fieldId, blockValue, block_total);
    }
  };
  var isPriceVisible = step_total != 0 || base_price != 0;
  var handleLabelChange = function handleLabelChange(e) {
    var newLabel = e.target.value;
    setCurrentLabel(newLabel);
    if (typeof onLabelChange === "function") {
      onLabelChange(step, newLabel);
    }
  };
  var handleDelete = function handleDelete() {
    if (typeof onDelete === "function") {
      onDelete(step);
    }
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
    "data-step": step,
    className: "aff-summary-item min-h-[70px] flex flex-col medium:flex-col justify-stretch medium:justify-between max-medium:px-1 items-stretch bg-th-grey-lighter rounded-[35px] pb-marker-bottom-30"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-row w-full rounded-[35px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "min-h-[66px] w-3/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: maskStyle,
    className: "w-25p h-25p bg-white cs-mask"
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full af-p20 text-th-grey inline-flex flex-row items-center"
  }, is_editable ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "delete-item-x cursor-pointer text-red-500 mr-2 font-bold",
    onClick: handleDelete
  }, "X"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "w-full"
  }, currentLabel)) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "text",
    name: "label_step_".concat(step),
    value: currentLabel,
    onInput: handleLabelChange,
    className: "quote_label w-full h-[50px] bg-transparent"
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "price-item flex items-center gap-x-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: isPriceVisible ? "aff-step-price absolute right-[70px] af-p20-bold text-black uppercase flex items-center gap-x-1 whitespace-nowrap" : "hidden"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "block_price_products"
  }, (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_2__.formatPrice)(step_total))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    "data-step": step,
    "data-currency": currency,
    name: "step_base_price_".concat(step),
    value: base_price
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    "data-step": step,
    "data-currency": currency,
    name: "step_percentage_price_".concat(step),
    value: percentage_amount
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    "data-step": step,
    "data-currency": currency,
    name: "step_total_price_".concat(step),
    value: step_total
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full block"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_SummaryItemEdit_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    stepSection: stepSection,
    step: step,
    onBlockChange: handle_block_change
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryItem);

/***/ }),

/***/ "./assets/js/admin/summary/components/SummaryItemEdit.jsx":
/*!****************************************************************!*\
  !*** ./assets/js/admin/summary/components/SummaryItemEdit.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _blocks_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blocks/index.js */ "./assets/js/admin/summary/blocks/index.js");
/* harmony import */ var _utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/configHelpers.js */ "./assets/js/admin/summary/utils/configHelpers.js");
/* harmony import */ var _signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../signals/summarySignals.js */ "./assets/js/admin/summary/signals/summarySignals.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var SummaryItemEdit = function SummaryItemEdit(_ref) {
  var stepSection = _ref.stepSection,
    step = _ref.step,
    postId = _ref.postId,
    onBlockChange = _ref.onBlockChange;
  var initialValues = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_3__.getValues)();
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValues),
    _useState2 = _slicedToArray(_useState, 2),
    blockValues = _useState2[0],
    setBlockValues = _useState2[1];
  if (!stepSection || Object.keys(stepSection).length === 0) {
    return null;
  }
  var handleBlockChange = function handleBlockChange(fieldId, value) {
    var block_total = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    setBlockValues(function (prev) {
      var newValues = _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, fieldId, value));
      return newValues;
    });

    // Signal-first: aktualizovat block price v signálu
    // Agregace na step level probíhá automaticky v computed signálech
    if (block_total !== null && block_total !== undefined) {
      (0,_signals_summarySignals_js__WEBPACK_IMPORTED_MODULE_4__.update_block_price)(step, fieldId, block_total);
    }
    if (typeof onBlockChange === "function") {
      onBlockChange(step, fieldId, value, block_total);
    }
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full block"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "data-step": step,
    className: "aff-summary-item-edit p-4"
  }, Object.entries(stepSection).map(function (_ref2) {
    var _attrs$attrs, _ref4;
    var _ref3 = _slicedToArray(_ref2, 2),
      index = _ref3[0],
      attrs = _ref3[1];
    var blockType = attrs.blockName || attrs.type || "booking/text-input";
    var fieldId = attrs === null || attrs === void 0 || (_attrs$attrs = attrs.attrs) === null || _attrs$attrs === void 0 ? void 0 : _attrs$attrs.field_id;
    var blockValue = blockValues[fieldId];
    var attrsValue = attrs.value;
    var value = (_ref4 = blockValue !== null && blockValue !== void 0 ? blockValue : attrsValue) !== null && _ref4 !== void 0 ? _ref4 : "";
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_blocks_index_js__WEBPACK_IMPORTED_MODULE_2__.AdminBlockRenderer, {
      key: fieldId,
      blockType: blockType,
      attrs: attrs === null || attrs === void 0 ? void 0 : attrs.attrs,
      step: step,
      postId: postId,
      value: value,
      onChange: handleBlockChange
    });
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryItemEdit);

/***/ }),

/***/ "./assets/js/admin/summary/initAdminSummary.js":
/*!*****************************************************!*\
  !*** ./assets/js/admin/summary/initAdminSummary.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeAdminSummary: () => (/* binding */ initializeAdminSummary)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _components_AdminSummary_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AdminSummary.jsx */ "./assets/js/admin/summary/components/AdminSummary.jsx");


var initializeAdminSummary = function initializeAdminSummary() {
  var rootElement = document.getElementById('admin-summary-root');
  if (!rootElement) {
    return;
  }
  try {
    rootElement.innerHTML = '';
    (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_components_AdminSummary_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], null), rootElement);
  } catch (error) {
    console.error('Admin Summary: Failed to load component', error);
    rootElement.innerHTML = '<p>Error loading Admin Summary component.</p>';
  }
};

/***/ }),

/***/ "./assets/js/admin/summary/signals/summarySignals.js":
/*!***********************************************************!*\
  !*** ./assets/js/admin/summary/signals/summarySignals.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   all_blocks_loaded: () => (/* binding */ all_blocks_loaded),
/* harmony export */   block_percentage_configs: () => (/* binding */ block_percentage_configs),
/* harmony export */   block_prices: () => (/* binding */ block_prices),
/* harmony export */   blocks_loading: () => (/* binding */ blocks_loading),
/* harmony export */   blocks_loading_count: () => (/* binding */ blocks_loading_count),
/* harmony export */   currency_symbol: () => (/* binding */ currency_symbol),
/* harmony export */   edit_mode: () => (/* binding */ edit_mode),
/* harmony export */   field_values: () => (/* binding */ field_values),
/* harmony export */   final_price: () => (/* binding */ final_price),
/* harmony export */   final_total_price: () => (/* binding */ final_total_price),
/* harmony export */   get_field_value: () => (/* binding */ get_field_value),
/* harmony export */   get_step_base_price: () => (/* binding */ get_step_base_price),
/* harmony export */   get_step_percentage_amount: () => (/* binding */ get_step_percentage_amount),
/* harmony export */   get_step_total: () => (/* binding */ get_step_total),
/* harmony export */   init_base_price: () => (/* binding */ init_base_price),
/* harmony export */   init_base_prices_batch: () => (/* binding */ init_base_prices_batch),
/* harmony export */   init_block_percentage: () => (/* binding */ init_block_percentage),
/* harmony export */   init_block_price: () => (/* binding */ init_block_price),
/* harmony export */   init_item_price: () => (/* binding */ init_item_price),
/* harmony export */   init_item_prices_batch: () => (/* binding */ init_item_prices_batch),
/* harmony export */   init_percentage: () => (/* binding */ init_percentage),
/* harmony export */   init_percentage_from_amount: () => (/* binding */ init_percentage_from_amount),
/* harmony export */   init_total_base: () => (/* binding */ init_total_base),
/* harmony export */   init_total_percentage: () => (/* binding */ init_total_percentage),
/* harmony export */   is_initializing: () => (/* binding */ is_initializing),
/* harmony export */   is_recalculating: () => (/* binding */ is_recalculating),
/* harmony export */   item_base_prices: () => (/* binding */ item_base_prices),
/* harmony export */   item_percentage_configs: () => (/* binding */ item_percentage_configs),
/* harmony export */   item_prices: () => (/* binding */ item_prices),
/* harmony export */   mark_block_loaded: () => (/* binding */ mark_block_loaded),
/* harmony export */   mark_block_loading: () => (/* binding */ mark_block_loading),
/* harmony export */   remove_block_percentage: () => (/* binding */ remove_block_percentage),
/* harmony export */   remove_block_price: () => (/* binding */ remove_block_price),
/* harmony export */   remove_field_value: () => (/* binding */ remove_field_value),
/* harmony export */   remove_item_price: () => (/* binding */ remove_item_price),
/* harmony export */   remove_step_prices: () => (/* binding */ remove_step_prices),
/* harmony export */   reset_all_prices: () => (/* binding */ reset_all_prices),
/* harmony export */   reset_blocks_loading: () => (/* binding */ reset_blocks_loading),
/* harmony export */   reset_prices: () => (/* binding */ reset_prices),
/* harmony export */   set_edit_mode: () => (/* binding */ set_edit_mode),
/* harmony export */   set_initializing: () => (/* binding */ set_initializing),
/* harmony export */   set_recalculating: () => (/* binding */ set_recalculating),
/* harmony export */   step_percentage_totals_from_blocks: () => (/* binding */ step_percentage_totals_from_blocks),
/* harmony export */   step_totals_from_blocks: () => (/* binding */ step_totals_from_blocks),
/* harmony export */   toggle_edit_mode: () => (/* binding */ toggle_edit_mode),
/* harmony export */   total_base_price: () => (/* binding */ total_base_price),
/* harmony export */   total_percentage_price: () => (/* binding */ total_percentage_price),
/* harmony export */   total_price: () => (/* binding */ total_price),
/* harmony export */   update_base_price: () => (/* binding */ update_base_price),
/* harmony export */   update_block_percentage: () => (/* binding */ update_block_percentage),
/* harmony export */   update_block_price: () => (/* binding */ update_block_price),
/* harmony export */   update_field_value: () => (/* binding */ update_field_value),
/* harmony export */   update_item_price: () => (/* binding */ update_item_price),
/* harmony export */   update_percentage: () => (/* binding */ update_percentage)
/* harmony export */ });
/* harmony import */ var _preact_signals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @preact/signals */ "./node_modules/@preact/signals/dist/signals.module.js");
/* harmony import */ var _utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/priceFormatting.js */ "./assets/js/admin/summary/utils/priceFormatting.js");
/* harmony import */ var _utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/configHelpers.js */ "./assets/js/admin/summary/utils/configHelpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _summary_settings$edi, _window$wpcbookingAdm, _window$wpcbookingAdm2, _window$wpcbookingAdm3;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var format_config = (0,_utils_priceFormatting_js__WEBPACK_IMPORTED_MODULE_1__.getFormatConfig)();
var summary_settings = (0,_utils_configHelpers_js__WEBPACK_IMPORTED_MODULE_2__.getSummarySettings)();

// ============================================================================
// SIGNALS - Block Prices (ceny jednotlivých bloků)
// ============================================================================

var block_prices = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)({});
// Struktura: { stepId: { fieldId: blockTotal } }
// Příklad: { 1: { "field_123": 100, "field_456": 50 }, 2: { "field_789": 300 } }

// ============================================================================
// SIGNALS - Base Prices (čisté ceny z bloků) - LEGACY, použít block_prices
// ============================================================================

var item_base_prices = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)({});
// Struktura: { stepId: basePrice }
// Příklad: { 1: 500, 2: 300 }

// ============================================================================
// SIGNALS - Percentage Configs (procentuální nastavení)
// ============================================================================

var item_percentage_configs = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)({});
// Struktura: { stepId: { value: number, operation: 'add' | 'subtract' } }
// Příklad: { 3: { value: 10, operation: 'add' }, 4: { value: 5, operation: 'subtract' } }

// ============================================================================
// SIGNALS - Block Percentage Configs (procentuální nastavení per block)
// ============================================================================

var block_percentage_configs = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)({});
// Struktura: { stepId: { fieldId: { value: number, operation: 'add' | 'subtract' } } }
// Příklad: { 1: { "field_123": { value: 10, operation: 'add' }, "field_456": { value: 5, operation: 'subtract' } } }

// ============================================================================
// SIGNALS - Config & UI
// ============================================================================

var edit_mode = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)((_summary_settings$edi = summary_settings === null || summary_settings === void 0 ? void 0 : summary_settings.editSummary) !== null && _summary_settings$edi !== void 0 ? _summary_settings$edi : true);
var currency_symbol = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)((format_config === null || format_config === void 0 ? void 0 : format_config.currencySymbol) || "kr.");

// Init values z PHP (pro fallback)
var init_total_base = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)(((_window$wpcbookingAdm = window.wpcbookingAdminData) === null || _window$wpcbookingAdm === void 0 ? void 0 : _window$wpcbookingAdm.totalPrice) || 0);
var init_total_percentage = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)(((_window$wpcbookingAdm2 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm2 === void 0 ? void 0 : _window$wpcbookingAdm2.percentagePrice) || 0);

// Loading states
var is_initializing = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)(true);
var is_recalculating = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)(false);

// Block loading tracking
var blocks_loading = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)({});
// Struktura: { "stepId_fieldId": true }
// Příklad: { "1_field_123": true, "2_field_456": true }

// ============================================================================
// SIGNALS - Field Values (raw values from inputs)
// ============================================================================

var field_values = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.signal)(((_window$wpcbookingAdm3 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm3 === void 0 ? void 0 : _window$wpcbookingAdm3.values) || {});

// ============================================================================
// COMPUTED - Step Totals from Blocks (base prices)
// ============================================================================

// Agregace block prices na step level (automaticky reaktivní)
var step_totals_from_blocks = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
  var result = {};
  Object.entries(block_prices.value).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      stepId = _ref2[0],
      blocks = _ref2[1];
    result[stepId] = Object.values(blocks).reduce(function (sum, price) {
      return sum + (price || 0);
    }, 0);
  });
  return result;
});

// ============================================================================
// COMPUTED - Totals (base price musí být před percentage)
// ============================================================================

// Suma všech step totals - kombinace block_prices + legacy item_base_prices
// MUSÍ být před step_percentage_totals_from_blocks
var total_base_price = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
  // Nový systém - block prices agregované per step
  var block_totals = step_totals_from_blocks.value;
  var block_sum = Object.values(block_totals).reduce(function (acc, price) {
    return acc + (price || 0);
  }, 0);

  // Legacy systém - item_base_prices (z PHP init nebo starých bloků)
  var legacy_prices = item_base_prices.value;
  var legacy_sum = Object.values(legacy_prices).reduce(function (acc, price) {
    return acc + (price || 0);
  }, 0);

  // OPRAVA: Pro každý step použít block_price pokud existuje, jinak legacy_price
  // Sečíst všechny steps správně
  var all_step_ids = new Set([].concat(_toConsumableArray(Object.keys(block_totals)), _toConsumableArray(Object.keys(legacy_prices))));
  var total = 0;
  var step_breakdown = {};
  all_step_ids.forEach(function (stepId) {
    var block_price = block_totals[stepId];
    var legacy_price = legacy_prices[stepId];

    // Priorita: block_price pokud existuje (i když je 0), jinak legacy_price
    var step_price = block_price !== undefined ? block_price || 0 : legacy_price || 0;
    total += step_price;
    step_breakdown[stepId] = {
      block_price: block_price,
      legacy_price: legacy_price,
      used_price: step_price
    };
  });
  return total;
});

// ============================================================================
// COMPUTED - Step Percentage Totals from Blocks
// ============================================================================

// Agregace block percentage amounts na step level (automaticky reaktivní)
// Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)!
var step_percentage_totals_from_blocks = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
  var configs = block_percentage_configs.value;
  var total_base = total_base_price.value;
  var result = {};
  Object.entries(configs).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      stepId = _ref4[0],
      blocks = _ref4[1];
    var step_total = 0;
    Object.values(blocks).forEach(function (config) {
      if (!config) return;
      var signed_amount = 0;

      // Pokud máme přímo amount
      if (config.amount !== undefined) {
        signed_amount = config.operation === "subtract" ? -config.amount : config.amount;
      }
      // Pokud máme procenta - počítá z CELKOVÉ base price
      else if (config.value && config.value !== 0) {
        var percentage_amount = total_base * (Math.abs(config.value) / 100);
        signed_amount = config.operation === "subtract" ? -percentage_amount : percentage_amount;
      }
      step_total += signed_amount;
    });
    result[stepId] = step_total;
  });
  return result;
});

// Suma všech percentage prices (počítá z CELKOVÉ base price)
var total_percentage_price = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
  // Suma z block-level percentages (už jsou správně vypočtené z total_base)
  var block_percentages = step_percentage_totals_from_blocks.value;
  var block_sum = Object.values(block_percentages).reduce(function (acc, amount) {
    return acc + (amount || 0);
  }, 0);

  // Suma z legacy item-level percentages (pro zpětnou kompatibilitu)
  var total_base = total_base_price.value;
  var legacy_configs = item_percentage_configs.value;
  var legacy_sum = Object.entries(legacy_configs).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      stepId = _ref6[0],
      config = _ref6[1];
    if (!config) return acc;
    var signed_amount = 0;

    // Pokud máme přímo amount (z PHP init)
    if (config.amount !== undefined) {
      signed_amount = config.operation === "subtract" ? -config.amount : config.amount;
    }
    // Pokud máme procenta (z editace) - počítá z CELKOVÉ base price
    else if (config.value && config.value !== 0) {
      var percentage_amount = total_base * (Math.abs(config.value) / 100);
      signed_amount = config.operation === "subtract" ? -percentage_amount : percentage_amount;
    }
    return acc + signed_amount;
  }, 0);
  var total = block_sum + legacy_sum;
  return total;
});

// Finální cena = base + percentage
var final_price = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
  var base = total_base_price.value;
  var percentage = total_percentage_price.value;
  var _final = base + percentage;

  // Fallback na init hodnoty pokud nic není vypočteno
  var result = _final === 0 && init_total_base.value > 0 ? init_total_base.value : _final;
  return result;
});

// ============================================================================
// COMPUTED - Step Helpers
// ============================================================================

// Získat base price pro konkrétní step
var get_step_base_price = function get_step_base_price(step_id) {
  var _ref7;
  var block_total = step_totals_from_blocks.value[step_id];
  var legacy_total = item_base_prices.value[step_id];
  return (_ref7 = block_total !== null && block_total !== void 0 ? block_total : legacy_total) !== null && _ref7 !== void 0 ? _ref7 : 0;
};

// Získat percentage amount pro konkrétní step
var get_step_percentage_amount = function get_step_percentage_amount(step_id) {
  // Block-level percentage (nový systém)
  var block_amount = step_percentage_totals_from_blocks.value[step_id] || 0;

  // Legacy item-level percentage (pro zpětnou kompatibilitu)
  var legacy_amount = 0;
  var config = item_percentage_configs.value[step_id];
  if (config) {
    // VAROVÁNÍ: Pokud máme block percentage configs, legacy by se neměl používat
    var has_block_configs = block_percentage_configs.value[step_id] && Object.keys(block_percentage_configs.value[step_id]).length > 0;
    if (has_block_configs) {
      console.warn("[PERCENTAGE] Step ".concat(step_id, " - \u26A0\uFE0F MIXOV\xC1N\xCD! Block configs existuj\xED, ale pou\u017E\xEDv\xE1 se i legacy config!"), {
        block_configs: block_percentage_configs.value[step_id],
        legacy_config: config
      });
    }

    // Pokud máme přímo amount (z PHP init)
    if (config.amount !== undefined) {
      legacy_amount = config.operation === "subtract" ? -config.amount : config.amount;
    }
    // Pokud máme procenta (z editace) - počítá z CELKOVÉ base price
    else if (config.value && config.value !== 0) {
      var total_base = total_base_price.value;
      var percentage_amount = total_base * (Math.abs(config.value) / 100);
      legacy_amount = config.operation === "subtract" ? -percentage_amount : percentage_amount;
    }
  }
  var result = block_amount + legacy_amount;
  return result;
};

// Získat celkovou cenu pro step (base + percentage)
var get_step_total = function get_step_total(step_id) {
  var base = item_base_prices.value[step_id] || 0;
  var percentage_amount = get_step_percentage_amount(step_id);
  return base + percentage_amount;
};

// ============================================================================
// ACTIONS - Base Prices
// ============================================================================

var update_base_price = function update_base_price(step_id, price) {
  item_base_prices.value = _objectSpread(_objectSpread({}, item_base_prices.value), {}, _defineProperty({}, step_id, price));
};
var init_base_price = function init_base_price(step_id, price) {
  var current_value = item_base_prices.value[step_id];
  if (current_value === undefined && price > 0) {
    item_base_prices.value = _objectSpread(_objectSpread({}, item_base_prices.value), {}, _defineProperty({}, step_id, price));
  }
};
var init_base_prices_batch = function init_base_prices_batch(prices_obj) {
  var current = item_base_prices.value;
  var new_prices = _objectSpread({}, current);
  var has_changes = false;
  Object.entries(prices_obj).forEach(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      step_id = _ref9[0],
      price = _ref9[1];
    if (current[step_id] === undefined && price > 0) {
      new_prices[step_id] = price;
      has_changes = true;
    }
  });
  if (has_changes) {
    item_base_prices.value = new_prices;
  }
};

// ============================================================================
// ACTIONS - Block Prices
// ============================================================================

var update_block_price = function update_block_price(step_id, field_id, price) {
  var current = block_prices.value;
  var step_blocks = current[step_id] || {};
  block_prices.value = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, step_id, _objectSpread(_objectSpread({}, step_blocks), {}, _defineProperty({}, field_id, price))));
};
var init_block_price = function init_block_price(step_id, field_id, price) {
  var current = block_prices.value;
  var step_blocks = current[step_id] || {};
  if (step_blocks[field_id] === undefined && price > 0) {
    block_prices.value = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, step_id, _objectSpread(_objectSpread({}, step_blocks), {}, _defineProperty({}, field_id, price))));
  }
};
var remove_block_price = function remove_block_price(step_id, field_id) {
  var current = block_prices.value;
  var step_blocks = _objectSpread({}, current[step_id] || {});
  delete step_blocks[field_id];
  block_prices.value = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, step_id, step_blocks));
};

// ============================================================================
// ACTIONS - Percentage Configs (legacy - step level)
// ============================================================================

var update_percentage = function update_percentage(step_id, value) {
  var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "add";
  item_percentage_configs.value = _objectSpread(_objectSpread({}, item_percentage_configs.value), {}, _defineProperty({}, step_id, {
    value: parseFloat(value) || 0,
    operation: operation
  }));
};
var init_percentage = function init_percentage(step_id, value) {
  var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "add";
  var current = item_percentage_configs.value[step_id];
  if (current === undefined && value > 0) {
    item_percentage_configs.value = _objectSpread(_objectSpread({}, item_percentage_configs.value), {}, _defineProperty({}, step_id, {
      value: parseFloat(value) || 0,
      operation: operation
    }));
  }
};
var init_percentage_from_amount = function init_percentage_from_amount(step_id, amount) {
  var current = item_percentage_configs.value[step_id];
  if (current === undefined && amount !== 0) {
    var operation = amount >= 0 ? "add" : "subtract";
    var new_config = {
      amount: Math.abs(parseFloat(amount)) || 0,
      operation: operation
    };
    item_percentage_configs.value = _objectSpread(_objectSpread({}, item_percentage_configs.value), {}, _defineProperty({}, step_id, new_config));
  }
};

// ============================================================================
// ACTIONS - Block Percentage Configs (per block)
// ============================================================================

var update_block_percentage = function update_block_percentage(step_id, field_id, value) {
  var operation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "add";
  var current = block_percentage_configs.value;
  var step_blocks = current[step_id] || {};
  block_percentage_configs.value = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, step_id, _objectSpread(_objectSpread({}, step_blocks), {}, _defineProperty({}, field_id, {
    value: parseFloat(value) || 0,
    operation: operation
  }))));

  // OPRAVA: Když začneme používat block systém, vyčistit legacy systém pro tento step
  var legacy_config = item_percentage_configs.value[step_id];
  if (legacy_config) {
    var new_legacy = _objectSpread({}, item_percentage_configs.value);
    delete new_legacy[step_id];
    item_percentage_configs.value = new_legacy;
  }
};
var init_block_percentage = function init_block_percentage(step_id, field_id, value) {
  var operation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "add";
  var current = block_percentage_configs.value;
  var step_blocks = current[step_id] || {};
  if (step_blocks[field_id] === undefined && value > 0) {
    block_percentage_configs.value = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, step_id, _objectSpread(_objectSpread({}, step_blocks), {}, _defineProperty({}, field_id, {
      value: parseFloat(value) || 0,
      operation: operation
    }))));
  }
};
var remove_block_percentage = function remove_block_percentage(step_id, field_id) {
  var current = block_percentage_configs.value;
  var step_blocks = _objectSpread({}, current[step_id] || {});
  delete step_blocks[field_id];
  block_percentage_configs.value = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, step_id, step_blocks));
};

// ============================================================================
// ACTIONS - Field Values
// ============================================================================

var update_field_value = function update_field_value(field_id, value) {
  field_values.value = _objectSpread(_objectSpread({}, field_values.value), {}, _defineProperty({}, field_id, value));
};
var get_field_value = function get_field_value(field_id) {
  return field_values.value[field_id];
};
var remove_field_value = function remove_field_value(field_id) {
  var current = _objectSpread({}, field_values.value);
  delete current[field_id];
  field_values.value = current;
};

// ============================================================================
// ACTIONS - Remove & Reset
// ============================================================================

var remove_step_prices = function remove_step_prices(step_id) {
  var new_base = _objectSpread({}, item_base_prices.value);
  var new_percentage = _objectSpread({}, item_percentage_configs.value);
  delete new_base[step_id];
  delete new_percentage[step_id];
  item_base_prices.value = new_base;
  item_percentage_configs.value = new_percentage;
};
var reset_all_prices = function reset_all_prices() {
  item_base_prices.value = {};
  item_percentage_configs.value = {};
};

// ============================================================================
// ACTIONS - UI
// ============================================================================

var set_edit_mode = function set_edit_mode(mode) {
  edit_mode.value = mode;
};
var toggle_edit_mode = function toggle_edit_mode() {
  edit_mode.value = !edit_mode.value;
};
var set_initializing = function set_initializing(value) {
  is_initializing.value = value;
};
var set_recalculating = function set_recalculating(value) {
  is_recalculating.value = value;
};

// ============================================================================
// ACTIONS - Block Loading Tracking
// ============================================================================

var mark_block_loading = function mark_block_loading(step_id, field_id) {
  var key = "".concat(step_id, "_").concat(field_id);
  blocks_loading.value = _objectSpread(_objectSpread({}, blocks_loading.value), {}, _defineProperty({}, key, true));
};
var mark_block_loaded = function mark_block_loaded(step_id, field_id) {
  var key = "".concat(step_id, "_").concat(field_id);
  var updated = _objectSpread({}, blocks_loading.value);
  delete updated[key];
  blocks_loading.value = updated;
};
var reset_blocks_loading = function reset_blocks_loading() {
  blocks_loading.value = {};
};

// ============================================================================
// COMPUTED - Block Loading State
// ============================================================================

var all_blocks_loaded = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
  return Object.keys(blocks_loading.value).length === 0;
});
var blocks_loading_count = (0,_preact_signals__WEBPACK_IMPORTED_MODULE_0__.computed)(function () {
  return Object.keys(blocks_loading.value).length;
});

// ============================================================================
// LEGACY ALIASES (pro zpětnou kompatibilitu během migrace)
// ============================================================================

// Tyto aliasy umožní postupnou migraci bez breaking changes
var item_prices = item_base_prices;
var total_price = total_base_price;
var final_total_price = final_price;
var update_item_price = update_base_price;
var init_item_price = init_base_price;
var init_item_prices_batch = init_base_prices_batch;
var remove_item_price = remove_step_prices;
var reset_prices = reset_all_prices;

// ============================================================================
// NAMED EXPORTS SUMMARY
// ============================================================================
// Signals: block_prices, block_percentage_configs, item_base_prices, item_percentage_configs
// Computed: step_totals_from_blocks, step_percentage_totals_from_blocks, total_base_price, total_percentage_price, final_price
// Actions: update_block_price, update_block_percentage, update_percentage, etc.

/***/ }),

/***/ "./assets/js/admin/summary/utils/configHelpers.js":
/*!********************************************************!*\
  !*** ./assets/js/admin/summary/utils/configHelpers.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBasicsSettings: () => (/* binding */ getBasicsSettings),
/* harmony export */   getDesignSettings: () => (/* binding */ getDesignSettings),
/* harmony export */   getFormatConfig: () => (/* binding */ getFormatConfig),
/* harmony export */   getGraphQLEndpoint: () => (/* binding */ getGraphQLEndpoint),
/* harmony export */   getLabels: () => (/* binding */ getLabels),
/* harmony export */   getPluginUrl: () => (/* binding */ getPluginUrl),
/* harmony export */   getPostId: () => (/* binding */ getPostId),
/* harmony export */   getProducts: () => (/* binding */ getProducts),
/* harmony export */   getStepSections: () => (/* binding */ getStepSections),
/* harmony export */   getSteps: () => (/* binding */ getSteps),
/* harmony export */   getSummaryData: () => (/* binding */ getSummaryData),
/* harmony export */   getSummarySettings: () => (/* binding */ getSummarySettings),
/* harmony export */   getValues: () => (/* binding */ getValues),
/* harmony export */   isAdminDataAvailable: () => (/* binding */ isAdminDataAvailable)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var getGraphQLEndpoint = function getGraphQLEndpoint() {
  var _window$wpcbookingAdm;
  return ((_window$wpcbookingAdm = window.wpcbookingAdminData) === null || _window$wpcbookingAdm === void 0 ? void 0 : _window$wpcbookingAdm.graphqlEndpoint) || "/graphql";
};
var getPostId = function getPostId() {
  var _window$wpcbookingAdm2;
  return ((_window$wpcbookingAdm2 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm2 === void 0 ? void 0 : _window$wpcbookingAdm2.bookingId) || 0;
};
var getPluginUrl = function getPluginUrl() {
  var _window$wpcbookingAdm3;
  return ((_window$wpcbookingAdm3 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm3 === void 0 ? void 0 : _window$wpcbookingAdm3.pluginUrl) || "";
};
var getFormatConfig = function getFormatConfig() {
  var _window$wpcbookingAdm4;
  return ((_window$wpcbookingAdm4 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm4 === void 0 ? void 0 : _window$wpcbookingAdm4.formatConfig) || {
    decimalSeparator: ",",
    thousandSeparator: ".",
    numberOfDecimals: 2,
    currencySymbol: "kr.",
    currencyPosition: "right_space"
  };
};
var getValues = function getValues() {
  var _window$wpcbookingAdm5;
  return ((_window$wpcbookingAdm5 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm5 === void 0 ? void 0 : _window$wpcbookingAdm5.values) || {};
};
var getSummarySettings = function getSummarySettings() {
  var _window$wpcbookingAdm6;
  return ((_window$wpcbookingAdm6 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm6 === void 0 ? void 0 : _window$wpcbookingAdm6.summarySettings) || {
    labelSummary: "Summary",
    labelPrice: "Price",
    labelTotal: "Total",
    editSummary: true
  };
};
var getDesignSettings = function getDesignSettings() {
  var _window$wpcbookingAdm7;
  return ((_window$wpcbookingAdm7 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm7 === void 0 ? void 0 : _window$wpcbookingAdm7.designSettings) || {
    coloredText: "",
    blackText: "",
    backgroundImage: null
  };
};
var getBasicsSettings = function getBasicsSettings() {
  var _window$wpcbookingAdm8;
  return ((_window$wpcbookingAdm8 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm8 === void 0 ? void 0 : _window$wpcbookingAdm8.basicsSettings) || {
    title: "",
    nextButtonText: "Next",
    prevButtonText: "Previous",
    saveButtonText: "Save"
  };
};
var getLabels = function getLabels() {
  var _window$wpcbookingAdm9;
  return ((_window$wpcbookingAdm9 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm9 === void 0 ? void 0 : _window$wpcbookingAdm9.labels) || {
    addFee: "Add fee",
    label: "Label",
    loading: "Loading...",
    error: "Error",
    save: "Save",
    "delete": "Delete"
  };
};
var getSummaryData = function getSummaryData() {
  var _window$wpcbookingAdm0;
  return ((_window$wpcbookingAdm0 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm0 === void 0 ? void 0 : _window$wpcbookingAdm0.summaryData) || {};
};
var getSteps = function getSteps() {
  var _window$wpcbookingAdm1;
  var rawSteps = ((_window$wpcbookingAdm1 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm1 === void 0 ? void 0 : _window$wpcbookingAdm1.steps) || {};
  var summaryData = getSummaryData();
  var steps = JSON.parse(JSON.stringify(rawSteps));
  Object.keys(steps).forEach(function (stepId) {
    if (summaryData[stepId]) {
      steps[stepId].value = summaryData[stepId].price_step || 0;
      steps[stepId].price_products = summaryData[stepId].price_step || 0;
    }
  });
  return steps;
};
var getStepSections = function getStepSections() {
  var _window$wpcbookingAdm10;
  return ((_window$wpcbookingAdm10 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm10 === void 0 ? void 0 : _window$wpcbookingAdm10.stepSections) || {};
};
var getProducts = function getProducts() {
  var _window$wpcbookingAdm11;
  var values = ((_window$wpcbookingAdm11 = window.wpcbookingAdminData) === null || _window$wpcbookingAdm11 === void 0 ? void 0 : _window$wpcbookingAdm11.values) || {};
  var products = [];
  Object.entries(values).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        if (item && item.product_id) {
          products.push(item);
        }
      });
    }
  });
  return products;
};
var isAdminDataAvailable = function isAdminDataAvailable() {
  return typeof window !== "undefined" && typeof window.wpcbookingAdminData !== "undefined";
};

/***/ }),

/***/ "./assets/js/admin/summary/utils/priceFormatting.js":
/*!**********************************************************!*\
  !*** ./assets/js/admin/summary/utils/priceFormatting.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatPrice: () => (/* binding */ formatPrice),
/* harmony export */   formatPriceWithoutCurrency: () => (/* binding */ formatPriceWithoutCurrency),
/* harmony export */   getFormatConfig: () => (/* binding */ getFormatConfig),
/* harmony export */   parsePrice: () => (/* binding */ parsePrice)
/* harmony export */ });
/* harmony import */ var _config_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/constants.js */ "./assets/js/config/constants.js");

var getFormatConfig = function getFormatConfig() {
  var _window$wpcbookingAdm;
  return ((_window$wpcbookingAdm = window.wpcbookingAdminData) === null || _window$wpcbookingAdm === void 0 ? void 0 : _window$wpcbookingAdm.formatConfig) || _config_constants_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_FORMAT_CONFIG;
};
var formatPrice = function formatPrice(price) {
  var config = getFormatConfig();
  var numericPrice = Number(price);
  var rounded = numericPrice.toFixed(config.numberOfDecimals);
  var parts = rounded.split('.');
  var integerPart = parts[0];
  var decimalPart = parts[1];
  var formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandSeparator);
  var formattedNumber = decimalPart ? "".concat(formattedInteger).concat(config.decimalSeparator).concat(decimalPart) : formattedInteger;
  switch (config.currencyPosition) {
    case 'left':
      return "".concat(config.currencySymbol).concat(formattedNumber);
    case 'left_space':
      return "".concat(config.currencySymbol, " ").concat(formattedNumber);
    case 'right':
      return "".concat(formattedNumber).concat(config.currencySymbol);
    case 'right_space':
    default:
      return "".concat(formattedNumber, " ").concat(config.currencySymbol);
  }
};
var parsePrice = function parsePrice(formattedPrice) {
  var config = getFormatConfig();
  if (!formattedPrice || formattedPrice === '') {
    return 0;
  }
  var cleaned = String(formattedPrice).replace(config.currencySymbol, '').trim();
  var escapedThousandSep = config.thousandSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  cleaned = cleaned.replace(new RegExp(escapedThousandSep, 'g'), '');
  var escapedDecimalSep = config.decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  cleaned = cleaned.replace(new RegExp(escapedDecimalSep), '.');
  return parseFloat(cleaned) || 0;
};
var formatPriceWithoutCurrency = function formatPriceWithoutCurrency(price) {
  var config = getFormatConfig();
  var numericPrice = Number(price);
  var rounded = numericPrice.toFixed(config.numberOfDecimals);
  var parts = rounded.split('.');
  var integerPart = parts[0];
  var decimalPart = parts[1];
  var formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandSeparator);
  return decimalPart ? "".concat(formattedInteger).concat(config.decimalSeparator).concat(decimalPart) : formattedInteger;
};

/***/ }),

/***/ "./assets/js/admin/summary/utils/priceManager.js":
/*!*******************************************************!*\
  !*** ./assets/js/admin/summary/utils/priceManager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   get_price_manager: () => (/* binding */ get_price_manager),
/* harmony export */   reset_price_manager: () => (/* binding */ reset_price_manager)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PriceManager = /*#__PURE__*/_createClass(function PriceManager() {
  var _this = this;
  _classCallCheck(this, PriceManager);
  _defineProperty(this, "subscribe", function (listener) {
    _this.listeners.push(listener);
    return function () {
      _this.listeners = _this.listeners.filter(function (l) {
        return l !== listener;
      });
    };
  });
  _defineProperty(this, "notify_listeners", function () {
    if (_this.is_calculating) return;
    var totals = _this.get_totals();
    _this.listeners.forEach(function (listener) {
      try {
        listener(totals);
      } catch (error) {
        console.error('[PriceManager] Listener error:', error);
      }
    });
  });
  _defineProperty(this, "set_date_item", function (field_id, data) {
    var _data$base_value = data.base_value,
      base_value = _data$base_value === void 0 ? 0 : _data$base_value,
      _data$percentage = data.percentage,
      percentage = _data$percentage === void 0 ? 0 : _data$percentage,
      _data$operation = data.operation,
      operation = _data$operation === void 0 ? 'add' : _data$operation;
    var percentage_value = _this._calculate_percentage_contribution(base_value, percentage, operation);
    _this.data.date_items[field_id] = {
      field_id: field_id,
      base_value: base_value,
      percentage: percentage,
      operation: operation,
      contribution: percentage_value,
      updated_at: Date.now()
    };
    _this._recalculate();
    return _this.data.date_items[field_id];
  });
  _defineProperty(this, "remove_date_item", function (field_id) {
    if (_this.data.date_items[field_id]) {
      delete _this.data.date_items[field_id];
      _this._recalculate();
      return true;
    }
    return false;
  });
  _defineProperty(this, "get_date_item", function (field_id) {
    return _this.data.date_items[field_id] || null;
  });
  _defineProperty(this, "get_date_items", function () {
    return Object.values(_this.data.date_items);
  });
  _defineProperty(this, "set_map_item", function (field_id, data) {
    var _data$distance = data.distance,
      distance = _data$distance === void 0 ? 0 : _data$distance,
      _data$percentage2 = data.percentage,
      percentage = _data$percentage2 === void 0 ? 0 : _data$percentage2,
      _data$operation2 = data.operation,
      operation = _data$operation2 === void 0 ? 'add' : _data$operation2;
    var percentage_value = _this._calculate_percentage_contribution(distance, percentage, operation);
    _this.data.map_items[field_id] = {
      field_id: field_id,
      distance: distance,
      percentage: percentage,
      operation: operation,
      contribution: percentage_value,
      updated_at: Date.now()
    };
    _this._recalculate();
    return _this.data.map_items[field_id];
  });
  _defineProperty(this, "remove_map_item", function (field_id) {
    if (_this.data.map_items[field_id]) {
      delete _this.data.map_items[field_id];
      _this._recalculate();
      return true;
    }
    return false;
  });
  _defineProperty(this, "get_map_item", function (field_id) {
    return _this.data.map_items[field_id] || null;
  });
  _defineProperty(this, "get_map_items", function () {
    return Object.values(_this.data.map_items);
  });
  _defineProperty(this, "set_product", function (field_id, product_index, product_data) {
    var key = _this._generate_product_key(field_id, product_index);
    var product_id = product_data.product_id,
      _product_data$price_t = product_data.price_type,
      price_type = _product_data$price_t === void 0 ? 'value' : _product_data$price_t,
      _product_data$quantit = product_data.quantity,
      quantity = _product_data$quantit === void 0 ? 1 : _product_data$quantit,
      _product_data$price = product_data.price,
      price = _product_data$price === void 0 ? 0 : _product_data$price,
      _product_data$percent = product_data.percentage_operation,
      percentage_operation = _product_data$percent === void 0 ? 'add' : _product_data$percent,
      _product_data$percent2 = product_data.percentage_value,
      percentage_value = _product_data$percent2 === void 0 ? 0 : _product_data$percent2;
    _this.data.products[key] = {
      key: key,
      field_id: field_id,
      product_index: product_index,
      product_id: product_id,
      price_type: price_type,
      quantity: quantity,
      price: price,
      percentage_operation: percentage_operation,
      percentage_value: percentage_value,
      updated_at: Date.now()
    };
    _this._recalculate();
    return _this.data.products[key];
  });
  _defineProperty(this, "remove_product", function (field_id, product_index) {
    var key = _this._generate_product_key(field_id, product_index);
    if (_this.data.products[key]) {
      delete _this.data.products[key];
      _this._recalculate();
      return true;
    }
    return false;
  });
  _defineProperty(this, "remove_products_by_field", function (field_id) {
    var keys_to_remove = Object.keys(_this.data.products).filter(function (key) {
      return _this.data.products[key].field_id === field_id;
    });
    keys_to_remove.forEach(function (key) {
      delete _this.data.products[key];
    });
    if (keys_to_remove.length > 0) {
      _this._recalculate();
    }
    return keys_to_remove.length;
  });
  _defineProperty(this, "get_product", function (field_id, product_index) {
    var key = _this._generate_product_key(field_id, product_index);
    return _this.data.products[key] || null;
  });
  _defineProperty(this, "get_products", function () {
    return Object.values(_this.data.products);
  });
  _defineProperty(this, "get_products_by_field", function (field_id) {
    return Object.values(_this.data.products).filter(function (p) {
      return p.field_id === field_id;
    });
  });
  _defineProperty(this, "get_base_total", function () {
    return _this.data.base_total;
  });
  _defineProperty(this, "get_percentage_total", function () {
    return _this.data.percentage_total;
  });
  _defineProperty(this, "get_grand_total", function () {
    return _this.data.grand_total;
  });
  _defineProperty(this, "get_totals", function () {
    return {
      base_total: _this.data.base_total,
      percentage_total: _this.data.percentage_total,
      grand_total: _this.data.grand_total,
      date_contribution: _this._get_date_contribution(),
      map_contribution: _this._get_map_contribution(),
      products_base: _this._get_products_base_total(),
      products_percentage: _this._get_products_percentage_total()
    };
  });
  _defineProperty(this, "clear", function () {
    _this.data = {
      date_items: {},
      map_items: {},
      products: {},
      base_total: 0,
      percentage_total: 0,
      grand_total: 0
    };
    _this.notify_listeners();
  });
  _defineProperty(this, "_generate_product_key", function (field_id, product_index) {
    return "".concat(field_id, "_").concat(product_index);
  });
  _defineProperty(this, "_calculate_percentage_contribution", function (base_value, percentage, operation) {
    if (percentage === 0 || base_value === 0) {
      return 0;
    }
    var percentage_amount = base_value * (Math.abs(percentage) / 100);
    return operation === 'subtract' ? -percentage_amount : percentage_amount;
  });
  _defineProperty(this, "_get_date_contribution", function () {
    var total = 0;
    Object.values(_this.data.date_items).forEach(function (item) {
      total += item.contribution || 0;
    });
    return total;
  });
  _defineProperty(this, "_get_map_contribution", function () {
    var total = 0;
    Object.values(_this.data.map_items).forEach(function (item) {
      total += item.contribution || 0;
    });
    return total;
  });
  _defineProperty(this, "_get_products_base_total", function () {
    var total = 0;
    Object.values(_this.data.products).forEach(function (product) {
      if (product.price_type !== 'percentage') {
        var quantity = parseInt(product.quantity) || 1;
        var price = parseFloat(product.price) || 0;
        total += quantity * price;
      }
    });
    return total;
  });
  _defineProperty(this, "_get_products_percentage_total", function () {
    var base = _this.data.base_total;
    var total = 0;
    Object.values(_this.data.products).forEach(function (product) {
      if (product.price_type === 'percentage') {
        var percentage = parseFloat(product.percentage_value) || 0;
        var operation = product.percentage_operation || 'add';
        total += _this._calculate_percentage_contribution(base, percentage, operation);
      }
    });
    return total;
  });
  _defineProperty(this, "_recalculate", function () {
    if (_this.is_calculating) return;
    _this.is_calculating = true;
    try {
      var date_contribution = _this._get_date_contribution();
      var map_contribution = _this._get_map_contribution();
      var products_base = _this._get_products_base_total();
      _this.data.base_total = date_contribution + map_contribution + products_base;
      _this.data.percentage_total = _this._get_products_percentage_total();
      _this.data.grand_total = _this.data.base_total + _this.data.percentage_total;
    } finally {
      _this.is_calculating = false;
    }
    _this.notify_listeners();
  });
  _defineProperty(this, "update_percentage_displays", function () {
    var base_total = _this.data.base_total;
    document.querySelectorAll('.js-total-base').forEach(function (el) {
      el.textContent = base_total.toFixed(2);
    });
    document.querySelectorAll('.js-block-percetage-calc.product').forEach(function (el) {
      var percentage_el = el.querySelector('.js-item-percentage');
      var total_el = el.querySelector('.js-price-item-percentage');
      if (percentage_el && total_el) {
        var percentage = parseFloat(percentage_el.textContent) || 0;
        var calculated = base_total * (Math.abs(percentage) / 100);
        total_el.textContent = calculated.toFixed(2);
      }
    });
  });
  _defineProperty(this, "to_json", function () {
    return JSON.stringify({
      date_items: _this.data.date_items,
      map_items: _this.data.map_items,
      products: _this.data.products,
      totals: _this.get_totals()
    });
  });
  _defineProperty(this, "from_json", function (json_string) {
    try {
      var parsed = JSON.parse(json_string);
      if (parsed.date_items) {
        _this.data.date_items = parsed.date_items;
      }
      if (parsed.map_items) {
        _this.data.map_items = parsed.map_items;
      }
      if (parsed.products) {
        _this.data.products = parsed.products;
      }
      _this._recalculate();
      return true;
    } catch (error) {
      console.error('[PriceManager] Failed to parse JSON:', error);
      return false;
    }
  });
  this.data = {
    date_items: {},
    map_items: {},
    products: {},
    base_total: 0,
    percentage_total: 0,
    grand_total: 0
  };
  this.listeners = [];
  this.is_calculating = false;
});
var price_manager_instance = null;
var get_price_manager = function get_price_manager() {
  if (!price_manager_instance) {
    price_manager_instance = new PriceManager();
  }
  return price_manager_instance;
};
var reset_price_manager = function reset_price_manager() {
  if (price_manager_instance) {
    price_manager_instance.clear();
  }
  price_manager_instance = null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceManager);

/***/ }),

/***/ "./assets/js/admin/summary/utils/productsLoader.js":
/*!*********************************************************!*\
  !*** ./assets/js/admin/summary/utils/productsLoader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clear_products_cache: () => (/* binding */ clear_products_cache),
/* harmony export */   fetch_products: () => (/* binding */ fetch_products)
/* harmony export */ });
/* harmony import */ var _configHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configHelpers.js */ "./assets/js/admin/summary/utils/configHelpers.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var productsCache = null;
var loadingPromise = null;
var fetch_products = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (!productsCache) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, productsCache);
        case 1:
          if (!loadingPromise) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, loadingPromise);
        case 2:
          loadingPromise = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var graphql_query, _result$data, endpoint, response, result, errorMessages, products, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  graphql_query = "\n\t\t\tquery GetProducts {\n\t\t\t\tproducts {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tprice\n\t\t\t\t\tthumbnail\n\t\t\t\t}\n\t\t\t}\n\t\t";
                  _context.p = 1;
                  endpoint = (0,_configHelpers_js__WEBPACK_IMPORTED_MODULE_0__.getGraphQLEndpoint)();
                  _context.n = 2;
                  return fetch(endpoint, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      query: graphql_query
                    })
                  });
                case 2:
                  response = _context.v;
                  if (response.ok) {
                    _context.n = 3;
                    break;
                  }
                  throw new Error("HTTP error! status: ".concat(response.status));
                case 3:
                  _context.n = 4;
                  return response.json();
                case 4:
                  result = _context.v;
                  if (!result.errors) {
                    _context.n = 5;
                    break;
                  }
                  errorMessages = result.errors.map(function (err) {
                    return err.message;
                  }).join(', ');
                  console.error('[ProductsLoader] GraphQL errors:', errorMessages);
                  throw new Error(errorMessages);
                case 5:
                  products = ((_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.products) || [];
                  productsCache = products;
                  loadingPromise = null;
                  return _context.a(2, products);
                case 6:
                  _context.p = 6;
                  _t = _context.v;
                  console.error('[ProductsLoader] Error fetching products:', _t);
                  loadingPromise = null;
                  throw _t;
                case 7:
                  return _context.a(2);
              }
            }, _callee, null, [[1, 6]]);
          }))();
          return _context2.a(2, loadingPromise);
      }
    }, _callee2);
  }));
  return function fetch_products() {
    return _ref.apply(this, arguments);
  };
}();
var clear_products_cache = function clear_products_cache() {
  productsCache = null;
  loadingPromise = null;
};

/***/ }),

/***/ "./assets/js/admin/useGutenbergWatchdog.js":
/*!*************************************************!*\
  !*** ./assets/js/admin/useGutenbergWatchdog.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useGutenbergWatchdog: () => (/* binding */ useGutenbergWatchdog)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Univerzální Gutenberg nástroj - flexibilní řešení pro sledování a reakci na změny v editoru
 *
 * @param {Object} config - Konfigurační objekt
 * @param {Function} config.onInit - Funkce spuštěna při inicializaci
 * @param {Function} config.onNewBlocks - Funkce spuštěna při detekci nových bloků
 * @param {Function} config.onDomChange - Funkce spuštěna při změnách v DOM
 * @returns {Object} - Objekt s metodami pro ovládání nástroje
 */
var useGutenbergWatchdog = function useGutenbergWatchdog() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Výchozí konfigurace
  var settings = _objectSpread({
    onInit: function onInit() {},
    onNewBlocks: function onNewBlocks() {},
    onDomChange: function onDomChange() {}
  }, config);
  // Proměnné pro sledování stavu
  var observer = null;
  var unsubscribe = null;
  var previousBlockCount = 0;
  var _isInitialized = false;

  /**
   * Ověří, zda jsme v Gutenberg editoru a upravujeme konkrétní post type
   */
  var isGutenbergEditor = function isGutenbergEditor() {
    var isEditorLoaded = typeof wp !== "undefined" && wp.blocks && wp.blockEditor && document.querySelector(".block-editor");
    return isEditorLoaded ? true : false;
  };

  /**
   * Inicializuje nástroj
   */
  var init = function init() {
    if (!isGutenbergEditor() || _isInitialized) {
      return false;
    }
    _isInitialized = true;
    settings.onInit();
    watchForChanges();
    return true;
  };

  /**
   * Spustí sledování změn v editoru
   */
  var watchForChanges = function watchForChanges() {
    // 1. MutationObserver pro DOM změny
    setupMutationObserver();

    // 2. WordPress API pro sledování změn bloků
    setupWordPressSubscriber();
  };

  /**
   * Nastaví MutationObserver pro sledování DOM změn
   */
  var setupMutationObserver = function setupMutationObserver() {
    observer = new MutationObserver(function (mutations) {
      var hasRelevantChanges = false;
      var _iterator = _createForOfIteratorHelper(mutations),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mutation = _step.value;
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            hasRelevantChanges = true;
            break;
          }
          // Also track attribute changes, especially data-attributes
          if (mutation.type === "attributes" && mutation.attributeName === "data-attributes") {
            hasRelevantChanges = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (hasRelevantChanges) {
        settings.onDomChange(mutations);
      }
    });
    var editorContent = document.querySelector(".editor-styles-wrapper, .block-editor, .edit-post-layout") || document.body;
    observer.observe(editorContent, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-attributes"]
    });
  };

  /**
   * Nastaví WordPress subscriber pro sledování změn bloků
   */
  var setupWordPressSubscriber = function setupWordPressSubscriber() {
    if (typeof wp === "undefined" || !wp.data || !wp.data.subscribe) return;
    unsubscribe = wp.data.subscribe(function () {
      try {
        var select = wp.data.select("core/block-editor") || wp.data.select("core/editor");
        if (!select) return;
        var blocks = select.getBlocks();
        if (blocks.length !== previousBlockCount) {
          previousBlockCount = blocks.length;
          setTimeout(function () {
            return settings.onNewBlocks(blocks);
          }, 50);
        }
      } catch (error) {
        console.error("Chyba při sledování bloků:", error);
      }
    });

    // Inicializace při načtení WP
    if (wp.domReady) {
      wp.domReady(function () {
        return settings.onInit();
      });
    }
  };

  /**
   * Ukončí činnost nástroje
   */
  var destroy = function destroy() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    _isInitialized = false;
  };

  // Automatická inicializace
  init();

  // Veřejné API
  return {
    init: init,
    destroy: destroy,
    isInitialized: function isInitialized() {
      return _isInitialized;
    }
  };
};

/***/ }),

/***/ "./assets/js/admin/wpify/FieldIdManager.js":
/*!*************************************************!*\
  !*** ./assets/js/admin/wpify/FieldIdManager.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FieldIdManager: () => (/* binding */ FieldIdManager)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * FieldIdManager - Manages unique field IDs for watched blocks
 * 
 * This script monitors blocks in the WordPress block editor and ensures
 * that watched blocks have unique field_id attributes.
 */

var FieldIdManager = function FieldIdManager() {
  'use strict';

  // Wait for WordPress data API to be available
  if (typeof wp === 'undefined' || !wp.data || !wp.data.subscribe) {
    console.warn('FieldIdManager: WordPress data API not available');
    return;
  }

  // Configuration from PHP
  var config = window.wpcbooking_admin_vars || {};
  var watchedBlocks = config.booking_blocks || [];
  if (!watchedBlocks.length) {
    return;
  }

  // State management
  var previousBlocksState = new Map();
  var usedFieldIds = new Set();
  var isUpdating = false;

  /**
   * Generate unique field ID (similar to PHP uniqid())
   * @returns {string} Unique field ID
   */
  var generateFieldId = function generateFieldId() {
    return 'booking_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 8);
  };

  /**
   * Get block attributes safely
   * @param {Object} block - Block object
   * @returns {Object} Block attributes
   */
  var getBlockAttributes = function getBlockAttributes(block) {
    return (block === null || block === void 0 ? void 0 : block.attributes) || {};
  };

  /**
   * Check if block is watched
   * @param {Object} block - Block object
   * @returns {boolean} True if block is watched
   */
  var isWatchedBlock = function isWatchedBlock(block) {
    return watchedBlocks.includes(block === null || block === void 0 ? void 0 : block.name);
  };

  /**
   * Get field ID from block attributes
   * @param {Object} attributes - Block attributes
   * @returns {string|null} Field ID or null
   */
  var getFieldId = function getFieldId(attributes) {
    return (attributes === null || attributes === void 0 ? void 0 : attributes.field_id) || null;
  };

  /**
   * Check if field ID is valid (not empty)
   * @param {string} fieldId - Field ID to check
   * @returns {boolean} True if valid
   */
  var isValidFieldId = function isValidFieldId(fieldId) {
    return fieldId && fieldId.trim() !== '';
  };

  /**
   * Check if field ID is unique
   * @param {string} fieldId - Field ID to check
   * @returns {boolean} True if unique
   */
  var isUniqueFieldId = function isUniqueFieldId(fieldId) {
    return !usedFieldIds.has(fieldId);
  };

  /**
   * Update block attributes using native WordPress block editor API
   * @param {string} clientId - Block client ID
   * @param {string} newFieldId - New field ID
   */
  var updateBlockFieldId = function updateBlockFieldId(clientId, newFieldId) {
    if (isUpdating) {
      return;
    }
    isUpdating = true;
    try {
      // Get current block
      var block = wp.data.select('core/block-editor').getBlock(clientId);
      if (!block) {
        console.warn('FieldIdManager: Block not found:', clientId);
        return;
      }

      // Use the native WordPress method to update block attributes
      var updatedAttributes = _objectSpread(_objectSpread({}, block.attributes), {}, {
        field_id: newFieldId
      });

      // Update using the block editor's native method
      wp.data.dispatch('core/block-editor').updateBlockAttributes(clientId, updatedAttributes);

      // Verify the update was successful
      setTimeout(function () {
        var _updatedBlock$attribu;
        var updatedBlock = wp.data.select('core/block-editor').getBlock(clientId);
        var persistedFieldId = updatedBlock === null || updatedBlock === void 0 || (_updatedBlock$attribu = updatedBlock.attributes) === null || _updatedBlock$attribu === void 0 ? void 0 : _updatedBlock$attribu.field_id;
        if (persistedFieldId !== newFieldId) {
          console.warn('FieldIdManager: Field ID not properly persisted, retrying...');
          // Try alternative method using replaceBlock
          var blockContent = wp.blocks.serialize(updatedBlock);
          wp.data.dispatch('core/block-editor').replaceBlock(clientId, blockContent);
        }
      }, 100);
    } catch (error) {
      console.warn('FieldIdManager: Failed to update block attributes:', error);
    } finally {
      isUpdating = false;
    }
  };

  /**
   * Process a single block
   * @param {Object} block - Block to process
   * @param {string} clientId - Block client ID
   * @returns {boolean} True if block was updated
   */
  var processBlock = function processBlock(block, clientId) {
    if (!isWatchedBlock(block)) {
      return false;
    }
    var attributes = getBlockAttributes(block);
    var currentFieldId = getFieldId(attributes);

    // Check if block needs a field ID (no field_id attribute at all)
    if (!isValidFieldId(currentFieldId)) {
      var newFieldId = generateFieldId();
      usedFieldIds.add(newFieldId);
      updateBlockFieldId(clientId, newFieldId);
      return true;
    }

    // Check if field ID is unique
    if (!isUniqueFieldId(currentFieldId)) {
      var _newFieldId = generateFieldId();
      usedFieldIds.add(_newFieldId);
      updateBlockFieldId(clientId, _newFieldId);
      return true;
    }

    // Register field ID as used
    usedFieldIds.add(currentFieldId);
    return false;
  };

  /**
   * Build current blocks state
   * @param {Array} blocks - Array of blocks
   * @returns {Map} Map of clientId -> block state
   */
  var buildBlocksState = function buildBlocksState(blocks) {
    var state = new Map();
    var _processBlocksRecursively = function processBlocksRecursively(blockList) {
      blockList.forEach(function (block) {
        if (block.clientId) {
          var attributes = getBlockAttributes(block);
          var fieldId = getFieldId(attributes);
          state.set(block.clientId, {
            name: block.name,
            attributes: attributes,
            fieldId: fieldId,
            hasFieldId: isValidFieldId(fieldId),
            isWatched: isWatchedBlock(block)
          });
        }

        // Process inner blocks
        if (block.innerBlocks && block.innerBlocks.length > 0) {
          _processBlocksRecursively(block.innerBlocks);
        }
      });
    };
    _processBlocksRecursively(blocks);
    return state;
  };

  /**
   * Check if blocks state has changed
   * @param {Map} currentState - Current blocks state
   * @param {Map} previousState - Previous blocks state
   * @returns {boolean} True if state changed
   */
  var hasStateChanged = function hasStateChanged(currentState, previousState) {
    if (currentState.size !== previousState.size) {
      return true;
    }
    var _iterator = _createForOfIteratorHelper(currentState),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          clientId = _step$value[0],
          currentBlock = _step$value[1];
        var previousBlock = previousState.get(clientId);
        if (!previousBlock) {
          return true;
        }

        // Check if watched block state changed
        if (currentBlock.isWatched && (currentBlock.name !== previousBlock.name || currentBlock.fieldId !== previousBlock.fieldId || currentBlock.hasFieldId !== previousBlock.hasFieldId)) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return false;
  };

  /**
   * Get blocks from editor
   * @returns {Array} Array of blocks
   */
  var getEditorBlocks = function getEditorBlocks() {
    try {
      return wp.data.select('core/block-editor').getBlocks();
    } catch (error) {
      console.warn('FieldIdManager: Failed to get blocks:', error);
      return [];
    }
  };

  /**
   * Main processing function
   */
  var processBlocks = function processBlocks() {
    if (isUpdating) {
      return;
    }
    var blocks = getEditorBlocks();
    var currentState = buildBlocksState(blocks);

    // Only process if state has changed
    if (!hasStateChanged(currentState, previousBlocksState)) {
      return;
    }

    // Reset used field IDs for this processing cycle
    usedFieldIds.clear();

    // Process all blocks
    var _processBlocksRecursively2 = function processBlocksRecursively(blockList) {
      blockList.forEach(function (block) {
        if (block.clientId) {
          processBlock(block, block.clientId);
        }

        // Process inner blocks
        if (block.innerBlocks && block.innerBlocks.length > 0) {
          _processBlocksRecursively2(block.innerBlocks);
        }
      });
    };
    _processBlocksRecursively2(blocks);

    // Update previous state
    previousBlocksState = new Map(currentState);
  };

  /**
   * Initialize the field ID manager
   */
  var init = function init() {
    // Wait for block editor to be ready
    var unsubscribe = wp.data.subscribe(function () {
      try {
        var isEditorReady = wp.data.select('core/block-editor').getBlocks().length >= 0;
        if (isEditorReady) {
          processBlocks();
        }
      } catch (error) {
        // Editor not ready yet, continue waiting
      }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', function () {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
  };

  // Initialize immediately
  init();
};

/***/ }),

/***/ "./assets/js/admin/wpify/componentLoader.js":
/*!**************************************************!*\
  !*** ./assets/js/admin/wpify/componentLoader.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeComponentLoader: () => (/* binding */ initializeComponentLoader),
/* harmony export */   loadComponents: () => (/* binding */ loadComponents)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var COMPONENTS = [{
  name: "PriceTable.js",
  "import": function _import() {
    return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-dom_index_js"), __webpack_require__.e("vendors-node_modules_react_jsx-runtime_js"), __webpack_require__.e("vendors-node_modules_react_index_js"), __webpack_require__.e("vendors-node_modules_scheduler_index_js"), __webpack_require__.e("assets_js_admin_wpify_components_PriceTable_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/PriceTable.js */ "./assets/js/admin/wpify/components/PriceTable.js"));
  }
}, {
  name: "GoogleMaps.js",
  "import": function _import() {
    return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react_jsx-runtime_js"), __webpack_require__.e("vendors-node_modules_react_index_js"), __webpack_require__.e("assets_js_admin_wpify_components_GoogleMaps_js")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/GoogleMaps.js */ "./assets/js/admin/wpify/components/GoogleMaps.js"));
  }
}];
var loadComponents = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var loadPromises;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          loadPromises = COMPONENTS.map(function (component) {
            return component["import"]().then(function (module) {})["catch"](function (error) {
              console.error("[componentLoader] Failed to load component ".concat(component.name, ":"), error);
            });
          });
          _context.n = 1;
          return Promise.all(loadPromises);
        case 1:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function loadComponents() {
    return _ref.apply(this, arguments);
  };
}();
var initializeComponentLoader = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return loadComponents();
        case 1:
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t = _context2.v;
          console.error("[componentLoader] Component loader initialization error:", _t);
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function initializeComponentLoader() {
    return _ref2.apply(this, arguments);
  };
}();


/***/ }),

/***/ "./assets/js/admin/wpify/subTabs.js":
/*!******************************************!*\
  !*** ./assets/js/admin/wpify/subTabs.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeSubTabs: () => (/* binding */ initializeSubTabs),
/* harmony export */   switchSubTab: () => (/* binding */ switchSubTab)
/* harmony export */ });
function initializeSubTabs() {
  // Initialize existing tabs
  setupSubTabs();

  // Setup mutation observer for dynamically added content
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the added node is a sub-tabs-container
            if (node.classList && node.classList.contains('sub-tabs-container')) {
              setupSubTabsForContainer(node);
            }
            // Check if the added node contains sub-tabs-container
            var tabContainers = node.querySelectorAll ? node.querySelectorAll('.sub-tabs-container') : [];
            if (tabContainers.length > 0) {
              tabContainers.forEach(function (container) {
                setupSubTabsForContainer(container);
              });
            }
          }
        });
      }
    });
  });

  // Start observing the entire document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
function setupSubTabs() {
  var tabContainers = document.querySelectorAll('.sub-tabs-container');
  tabContainers.forEach(function (container, index) {
    setupSubTabsForContainer(container);
  });
}
function setupSubTabsForContainer(container) {
  // Check if already initialized
  if (container.dataset.subTabsInitialized === 'true') {
    return;
  }
  var tabButtons = container.querySelectorAll('.sub-tab-button');

  // Process sub-tab-content labels and add data-tab attributes
  processSubTabContentLabels();

  // Set first tab as active by default
  if (tabButtons.length > 0) {
    var firstButton = tabButtons[0];
    var firstTabId = firstButton.getAttribute('data-tab');

    // Activate first button
    firstButton.classList.add('active');

    // Find and activate corresponding content
    var firstContent = document.querySelector(".wpifycf-field__wrapper[data-tab=\"".concat(firstTabId, "\"]"));
    if (firstContent) {
      firstContent.classList.add('active');
    }
  }

  // Add click event listeners to tab buttons
  tabButtons.forEach(function (button, index) {
    // Remove existing listeners to prevent duplicates
    button.removeEventListener('click', handleTabClick);
    button.addEventListener('click', handleTabClick);
  });

  // Mark as initialized
  container.dataset.subTabsInitialized = 'true';
}
function processSubTabContentLabels() {
  // Find all labels with sub-tab-content-* classes
  var labels = document.querySelectorAll('label[class*="sub-tab-content-"]');
  labels.forEach(function (label, index) {
    // Extract the tab name from the class
    var classList = label.className.split(' ');
    var subTabClass = classList.find(function (cls) {
      return cls.startsWith('sub-tab-content-');
    });
    if (subTabClass) {
      var tabName = subTabClass.replace('sub-tab-content-', '');
      var tabId = "sub-tab-".concat(tabName);

      // Find the parent .wpifycf-field__wrapper
      var parentWrapper = label.closest('.wpifycf-field__wrapper');
      if (parentWrapper) {
        // Add data-tab attribute to the wrapper
        parentWrapper.setAttribute('data-tab', tabId);
      }
    }
  });
}
function handleTabClick() {
  var targetTabId = this.getAttribute('data-tab');
  var container = this.closest('.sub-tabs-container');
  if (!container) {
    return;
  }
  var tabButtons = container.querySelectorAll('.sub-tab-button');

  // Remove active class from all buttons
  tabButtons.forEach(function (btn) {
    return btn.classList.remove('active');
  });

  // Remove active class from all wpifycf-field__wrapper elements with data-tab
  var allContent = document.querySelectorAll('.wpifycf-field__wrapper[data-tab]');
  allContent.forEach(function (content) {
    return content.classList.remove('active');
  });

  // Add active class to clicked button
  this.classList.add('active');

  // Find and activate corresponding content
  var targetContent = document.querySelector(".wpifycf-field__wrapper[data-tab=\"".concat(targetTabId, "\"]"));
  if (targetContent) {
    targetContent.classList.add('active');
  }
}

// Function to programmatically switch tabs (can be called from other scripts)
function switchSubTab(containerSelector, tabId) {
  var container = document.querySelector(containerSelector);
  if (!container) return;
  var targetButton = container.querySelector("[data-tab=\"".concat(tabId, "\"]"));
  var targetPanel = document.getElementById(tabId);
  if (targetButton && targetPanel) {
    var tabButtons = container.querySelectorAll('.sub-tab-button');
    var tabPanels = container.querySelectorAll('.sub-tab-panel');

    // Remove active class from all buttons and panels
    tabButtons.forEach(function (btn) {
      return btn.classList.remove('active');
    });
    tabPanels.forEach(function (panel) {
      return panel.classList.remove('active');
    });

    // Add active class to target button and panel
    targetButton.classList.add('active');
    targetPanel.classList.add('active');
  }
}

// Export functions for use in other modules


/***/ }),

/***/ "./assets/js/config/constants.js":
/*!***************************************!*\
  !*** ./assets/js/config/constants.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLOCK_TYPES: () => (/* binding */ BLOCK_TYPES),
/* harmony export */   CALCULATOR_OPERATIONS: () => (/* binding */ CALCULATOR_OPERATIONS),
/* harmony export */   CSS_CLASSES: () => (/* binding */ CSS_CLASSES),
/* harmony export */   DEBOUNCE_DELAYS: () => (/* binding */ DEBOUNCE_DELAYS),
/* harmony export */   DEFAULT_FORMAT_CONFIG: () => (/* binding */ DEFAULT_FORMAT_CONFIG),
/* harmony export */   PRICE_TYPES: () => (/* binding */ PRICE_TYPES),
/* harmony export */   QTY_CONNECTION_TYPES: () => (/* binding */ QTY_CONNECTION_TYPES)
/* harmony export */ });
var PRICE_TYPES = {
  VALUE: 'value',
  PERCENTAGE: 'percentage'
};
var QTY_CONNECTION_TYPES = {
  MANUAL: 'manual',
  FIELD_CONNECTED: 'field_connected'
};
var CALCULATOR_OPERATIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract'
};
var BLOCK_TYPES = {
  BASE: 'base',
  PERCENTAGE: 'percentage',
  PRODUCT: 'product'
};
var CSS_CLASSES = {
  SUMMARY_ITEM: 'aff-summary-item',
  SUMMARY_ITEM_EDIT: 'aff-summary-item-edit',
  SUMMARY_LIST: 'aff-summary-list',
  ADD_NEW_ROW: 'aff-add-new-row',
  STEP_PRICE: 'js-step-price',
  BLOCK_TOTAL_PRICE: 'block-total-price',
  BLOCK_PRICE_PRODUCTS: 'block_price_products',
  CALCULATION_ITEM: 'js-calculation-item',
  PERCENTAGE_CALC: 'js-block-percetage-calc',
  ITEM_PERCENTAGE: 'js-item-percentage',
  TOTAL_BASE: 'js-total-base',
  PRICE_ITEM_PERCENTAGE: 'js-price-item-percentage',
  PRICE_HIDDEN: 'js-price-hidden',
  PERCENTAGE_HIDDEN: 'js-percentage-hidden',
  PRODUCTS_HIDDEN: 'js-products-hidden',
  FIELD_NUMBER: 'js-field-number',
  TOTAL_CONTENTS: 'js-total-contents',
  TOTAL_PRICE: 'js-total-price',
  CURRENCY_SYMBOL: 'currnency_symbol'
};
var DEFAULT_FORMAT_CONFIG = {
  decimalSeparator: ',',
  thousandSeparator: '.',
  numberOfDecimals: 2,
  currencySymbol: 'kr.',
  currencyPosition: 'right_space'
};
var DEBOUNCE_DELAYS = {
  INPUT: 300,
  CALCULATION: 300
};

/***/ }),

/***/ "./assets/js/utils/markerIcon.js":
/*!***************************************!*\
  !*** ./assets/js/utils/markerIcon.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMarkerIcon: () => (/* binding */ createMarkerIcon)
/* harmony export */ });
/**
 * Google Maps Marker Icon Utility
 * 
 * Creates custom SVG marker icons for Google Maps with specified color and label
 */

/**
 * Create custom marker icon with specified color and label
 * 
 * @param {string} label - Text label to display in the marker (e.g., "Shop", "Client")
 * @param {string} color - Color in RGB format (default: 'rgb(255, 162, 94)')
 * @returns {Object|null} Google Maps icon configuration object or null if Google Maps API is not loaded
 */
var createMarkerIcon = function createMarkerIcon(label) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 162, 94)';
  if (!window.google || !window.google.maps) {
    return null; // Return null if Google Maps API is not loaded
  }
  var svg = "\n\t\t<svg width=\"40\" height=\"50\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t<path d=\"M20 0C9 0 0 9 0 20c0 11 20 30 20 30s20-19 20-30C40 9 31 0 20 0z\" fill=\"".concat(color, "\" stroke=\"#fff\" stroke-width=\"2\"/>\n\t\t\t<text x=\"20\" y=\"23\" font-family=\"Arial, sans-serif\" font-size=\"11\" font-weight=\"bold\" fill=\"#fff\" text-anchor=\"middle\" dominant-baseline=\"central\">").concat(label, "</text>\n\t\t</svg>\n\t");
  return {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
    scaledSize: new window.google.maps.Size(40, 50),
    anchor: new window.google.maps.Point(20, 50)
  };
};

/***/ }),

/***/ "./assets/js/utils/stepConditions.js":
/*!*******************************************!*\
  !*** ./assets/js/utils/stepConditions.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   check_step_condition: () => (/* binding */ check_step_condition),
/* harmony export */   check_step_condition_with_manager: () => (/* binding */ check_step_condition_with_manager),
/* harmony export */   use_step_condition: () => (/* binding */ use_step_condition)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var check_products_condition = function check_products_condition(condition, products) {
  if (!products || products.length === 0) {
    return false;
  }
  var cart_product_ids = products.map(function (item) {
    return parseInt(item.product_id || item.id);
  });
  var required_ids = (condition.ids || []).map(function (id) {
    return parseInt(id);
  });
  if (required_ids.length === 0) {
    return true;
  }
  var operator = condition.operator || 'OR';
  var product_condition = condition.product_condition || 'included_products';
  var result;
  if (product_condition === 'included_products') {
    if (operator === 'OR') {
      result = required_ids.some(function (id) {
        return cart_product_ids.includes(id);
      });
    } else {
      result = required_ids.every(function (id) {
        return cart_product_ids.includes(id);
      });
    }
    return result;
  }
  if (product_condition === 'excluded_products') {
    if (operator === 'OR') {
      result = !required_ids.some(function (id) {
        return cart_product_ids.includes(id);
      });
    } else {
      result = !required_ids.every(function (id) {
        return cart_product_ids.includes(id);
      });
    }
    return result;
  }
  return true;
};
var check_single_condition = function check_single_condition(condition, products) {
  var condition_type = condition.condition_type;
  switch (condition_type) {
    case 'products':
      return check_products_condition(condition, products);
    default:
      return true;
  }
};
var check_step_condition = function check_step_condition(conditions, step_num, max_reached_step, products) {
  if (max_reached_step < step_num || !conditions) {
    return true;
  }
  if (Array.isArray(conditions)) {
    return conditions.every(function (condition) {
      return check_single_condition(condition, products);
    });
  }
  if (_typeof(conditions) === 'object' && conditions.condition_type) {
    return check_single_condition(conditions, products);
  }
  return true;
};
var check_step_condition_with_manager = function check_step_condition_with_manager(conditions, step_num, max_reached_step, card_manager) {
  if (!card_manager || typeof card_manager.getProducts !== 'function') {
    return check_step_condition(conditions, step_num, max_reached_step, []);
  }
  var products = card_manager.getProducts() || [];
  return check_step_condition(conditions, step_num, max_reached_step, products);
};
var use_step_condition = function use_step_condition(card_manager) {
  var check_condition = function check_condition(conditions, step_num, max_reached_step) {
    return check_step_condition_with_manager(conditions, step_num, max_reached_step, card_manager);
  };
  return {
    checkStepCondition: check_condition
  };
};

/***/ }),

/***/ "./node_modules/@preact/signals-core/dist/signals-core.module.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@preact/signals-core/dist/signals-core.module.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computed: () => (/* binding */ y),
/* harmony export */   Effect: () => (/* binding */ p),
/* harmony export */   Signal: () => (/* binding */ u),
/* harmony export */   batch: () => (/* binding */ r),
/* harmony export */   computed: () => (/* binding */ w),
/* harmony export */   effect: () => (/* binding */ E),
/* harmony export */   signal: () => (/* binding */ d),
/* harmony export */   untracked: () => (/* binding */ n)
/* harmony export */ });
var i=Symbol.for("preact-signals");function t(){if(!(s>1)){var i,t=!1;while(void 0!==h){var r=h;h=void 0;f++;while(void 0!==r){var o=r.o;r.o=void 0;r.f&=-3;if(!(8&r.f)&&c(r))try{r.c()}catch(r){if(!t){i=r;t=!0}}r=o}}f=0;s--;if(t)throw i}else s--}function r(i){if(s>0)return i();s++;try{return i()}finally{t()}}var o=void 0;function n(i){var t=o;o=void 0;try{return i()}finally{o=t}}var h=void 0,s=0,f=0,v=0;function e(i){if(void 0!==o){var t=i.n;if(void 0===t||t.t!==o){t={i:0,S:i,p:o.s,n:void 0,t:o,e:void 0,x:void 0,r:t};if(void 0!==o.s)o.s.n=t;o.s=t;i.n=t;if(32&o.f)i.S(t);return t}else if(-1===t.i){t.i=0;if(void 0!==t.n){t.n.p=t.p;if(void 0!==t.p)t.p.n=t.n;t.p=o.s;t.n=void 0;o.s.n=t;o.s=t}return t}}}function u(i,t){this.v=i;this.i=0;this.n=void 0;this.t=void 0;this.W=null==t?void 0:t.watched;this.Z=null==t?void 0:t.unwatched;this.name=null==t?void 0:t.name}u.prototype.brand=i;u.prototype.h=function(){return!0};u.prototype.S=function(i){var t=this,r=this.t;if(r!==i&&void 0===i.e){i.x=r;this.t=i;if(void 0!==r)r.e=i;else n(function(){var i;null==(i=t.W)||i.call(t)})}};u.prototype.U=function(i){var t=this;if(void 0!==this.t){var r=i.e,o=i.x;if(void 0!==r){r.x=o;i.e=void 0}if(void 0!==o){o.e=r;i.x=void 0}if(i===this.t){this.t=o;if(void 0===o)n(function(){var i;null==(i=t.Z)||i.call(t)})}}};u.prototype.subscribe=function(i){var t=this;return E(function(){var r=t.value,n=o;o=void 0;try{i(r)}finally{o=n}},{name:"sub"})};u.prototype.valueOf=function(){return this.value};u.prototype.toString=function(){return this.value+""};u.prototype.toJSON=function(){return this.value};u.prototype.peek=function(){var i=o;o=void 0;try{return this.value}finally{o=i}};Object.defineProperty(u.prototype,"value",{get:function(){var i=e(this);if(void 0!==i)i.i=this.i;return this.v},set:function(i){if(i!==this.v){if(f>100)throw new Error("Cycle detected");this.v=i;this.i++;v++;s++;try{for(var r=this.t;void 0!==r;r=r.x)r.t.N()}finally{t()}}}});function d(i,t){return new u(i,t)}function c(i){for(var t=i.s;void 0!==t;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function a(i){for(var t=i.s;void 0!==t;t=t.n){var r=t.S.n;if(void 0!==r)t.r=r;t.S.n=t;t.i=-1;if(void 0===t.n){i.s=t;break}}}function l(i){var t=i.s,r=void 0;while(void 0!==t){var o=t.p;if(-1===t.i){t.S.U(t);if(void 0!==o)o.n=t.n;if(void 0!==t.n)t.n.p=o}else r=t;t.S.n=t.r;if(void 0!==t.r)t.r=void 0;t=o}i.s=r}function y(i,t){u.call(this,void 0);this.x=i;this.s=void 0;this.g=v-1;this.f=4;this.W=null==t?void 0:t.watched;this.Z=null==t?void 0:t.unwatched;this.name=null==t?void 0:t.name}y.prototype=new u;y.prototype.h=function(){this.f&=-3;if(1&this.f)return!1;if(32==(36&this.f))return!0;this.f&=-5;if(this.g===v)return!0;this.g=v;this.f|=1;if(this.i>0&&!c(this)){this.f&=-2;return!0}var i=o;try{a(this);o=this;var t=this.x();if(16&this.f||this.v!==t||0===this.i){this.v=t;this.f&=-17;this.i++}}catch(i){this.v=i;this.f|=16;this.i++}o=i;l(this);this.f&=-2;return!0};y.prototype.S=function(i){if(void 0===this.t){this.f|=36;for(var t=this.s;void 0!==t;t=t.n)t.S.S(t)}u.prototype.S.call(this,i)};y.prototype.U=function(i){if(void 0!==this.t){u.prototype.U.call(this,i);if(void 0===this.t){this.f&=-33;for(var t=this.s;void 0!==t;t=t.n)t.S.U(t)}}};y.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var i=this.t;void 0!==i;i=i.x)i.t.N()}};Object.defineProperty(y.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var i=e(this);this.h();if(void 0!==i)i.i=this.i;if(16&this.f)throw this.v;return this.v}});function w(i,t){return new y(i,t)}function _(i){var r=i.u;i.u=void 0;if("function"==typeof r){s++;var n=o;o=void 0;try{r()}catch(t){i.f&=-2;i.f|=8;b(i);throw t}finally{o=n;t()}}}function b(i){for(var t=i.s;void 0!==t;t=t.n)t.S.U(t);i.x=void 0;i.s=void 0;_(i)}function g(i){if(o!==this)throw new Error("Out-of-order effect");l(this);o=i;this.f&=-2;if(8&this.f)b(this);t()}function p(i,t){this.x=i;this.u=void 0;this.s=void 0;this.o=void 0;this.f=32;this.name=null==t?void 0:t.name}p.prototype.c=function(){var i=this.S();try{if(8&this.f)return;if(void 0===this.x)return;var t=this.x();if("function"==typeof t)this.u=t}finally{i()}};p.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1;this.f&=-9;_(this);a(this);s++;var i=o;o=this;return g.bind(this,i)};p.prototype.N=function(){if(!(2&this.f)){this.f|=2;this.o=h;h=this}};p.prototype.d=function(){this.f|=8;if(!(1&this.f))b(this)};p.prototype.dispose=function(){this.d()};function E(i,t){var r=new p(i,t);try{r.c()}catch(i){r.d();throw i}var o=r.d.bind(r);o[Symbol.dispose]=o;return o}//# sourceMappingURL=signals-core.module.js.map


/***/ }),

/***/ "./node_modules/@preact/signals/dist/signals.module.js":
/*!*************************************************************!*\
  !*** ./node_modules/@preact/signals/dist/signals.module.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Signal: () => (/* reexport safe */ _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.Signal),
/* harmony export */   batch: () => (/* reexport safe */ _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.batch),
/* harmony export */   computed: () => (/* reexport safe */ _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.computed),
/* harmony export */   effect: () => (/* reexport safe */ _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.effect),
/* harmony export */   signal: () => (/* reexport safe */ _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.signal),
/* harmony export */   untracked: () => (/* reexport safe */ _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.untracked),
/* harmony export */   useComputed: () => (/* binding */ useComputed),
/* harmony export */   useSignal: () => (/* binding */ useSignal),
/* harmony export */   useSignalEffect: () => (/* binding */ useSignalEffect)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @preact/signals-core */ "./node_modules/@preact/signals-core/dist/signals-core.module.js");
var v,s;function l(i,n){preact__WEBPACK_IMPORTED_MODULE_0__.options[i]=n.bind(null,preact__WEBPACK_IMPORTED_MODULE_0__.options[i]||function(){})}function d(i){if(s)s();s=i&&i.S()}function h(i){var r=this,f=i.data,o=useSignal(f);o.value=f;var e=(0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function(){var i=r.__v;while(i=i.__)if(i.__c){i.__c.__$f|=4;break}r.__$u.c=function(){var i,t=r.__$u.S(),f=e.value;t();if((0,preact__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(f)||3!==(null==(i=r.base)?void 0:i.nodeType)){r.__$f|=1;r.setState({})}else r.base.data=f};return (0,_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.computed)(function(){var i=o.value.value;return 0===i?0:!0===i?"":i||""})},[]);return e.value}h.displayName="_st";Object.defineProperties(_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.Signal.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:h},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});l("__b",function(i,r){if("string"==typeof r.type){var n,t=r.props;for(var f in t)if("children"!==f){var o=t[f];if(o instanceof _preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.Signal){if(!n)r.__np=n={};n[f]=o;t[f]=o.peek()}}}i(r)});l("__r",function(i,r){d();var n,t=r.__c;if(t){t.__$f&=-2;if(void 0===(n=t.__$u))t.__$u=n=function(i){var r;(0,_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.effect)(function(){r=this});r.c=function(){t.__$f|=1;t.setState({})};return r}()}v=t;d(n);i(r)});l("__e",function(i,r,n,t){d();v=void 0;i(r,n,t)});l("diffed",function(i,r){d();v=void 0;var n;if("string"==typeof r.type&&(n=r.__e)){var t=r.__np,f=r.props;if(t){var o=n.U;if(o)for(var e in o){var u=o[e];if(void 0!==u&&!(e in t)){u.d();o[e]=void 0}}else n.U=o={};for(var a in t){var c=o[a],s=t[a];if(void 0===c){c=p(n,a,s,f);o[a]=c}else c.o(s,f)}}}i(r)});function p(i,r,n,t){var f=r in i&&void 0===i.ownerSVGElement,o=(0,_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.signal)(n);return{o:function(i,r){o.value=i;t=r},d:(0,_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.effect)(function(){var n=o.value.value;if(t[r]!==n){t[r]=n;if(f)i[r]=n;else if(n)i.setAttribute(r,n);else i.removeAttribute(r)}})}}l("unmount",function(i,r){if("string"==typeof r.type){var n=r.__e;if(n){var t=n.U;if(t){n.U=void 0;for(var f in t){var o=t[f];if(o)o.d()}}}}else{var e=r.__c;if(e){var u=e.__$u;if(u){e.__$u=void 0;u.d()}}}i(r)});l("__h",function(i,r,n,t){if(t<3||9===t)r.__$f|=2;i(r,n,t)});preact__WEBPACK_IMPORTED_MODULE_0__.Component.prototype.shouldComponentUpdate=function(i,r){var n=this.__$u,t=n&&void 0!==n.s;for(var f in r)return!0;if(this.__f||"boolean"==typeof this.u&&!0===this.u){if(!(t||2&this.__$f||4&this.__$f))return!0;if(1&this.__$f)return!0}else{if(!(t||4&this.__$f))return!0;if(3&this.__$f)return!0}for(var o in i)if("__source"!==o&&i[o]!==this.props[o])return!0;for(var e in this.props)if(!(e in i))return!0;return!1};function useSignal(i){return (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function(){return (0,_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.signal)(i)},[])}function useComputed(i){var r=(0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(i);r.current=i;v.__$f|=4;return (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function(){return (0,_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.computed)(function(){return r.current()})},[])}function useSignalEffect(i){var r=(0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(i);r.current=i;(0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function(){return (0,_preact_signals_core__WEBPACK_IMPORTED_MODULE_2__.effect)(function(){return r.current()})},[])}//# sourceMappingURL=signals.module.js.map


/***/ }),

/***/ "./node_modules/@tannin/compile/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@tannin/compile/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compile)
/* harmony export */ });
/* harmony import */ var _tannin_postfix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tannin/postfix */ "./node_modules/@tannin/postfix/index.js");
/* harmony import */ var _tannin_evaluate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tannin/evaluate */ "./node_modules/@tannin/evaluate/index.js");



/**
 * Given a C expression, returns a function which can be called to evaluate its
 * result.
 *
 * @example
 *
 * ```js
 * import compile from '@tannin/compile';
 *
 * const evaluate = compile( 'n > 1' );
 *
 * evaluate( { n: 2 } );
 * // ⇒ true
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {(variables?:{[variable:string]:*})=>*} Compiled evaluator.
 */
function compile( expression ) {
	var terms = (0,_tannin_postfix__WEBPACK_IMPORTED_MODULE_0__["default"])( expression );

	return function( variables ) {
		return (0,_tannin_evaluate__WEBPACK_IMPORTED_MODULE_1__["default"])( terms, variables );
	};
}


/***/ }),

/***/ "./node_modules/@tannin/evaluate/index.js":
/*!************************************************!*\
  !*** ./node_modules/@tannin/evaluate/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ evaluate)
/* harmony export */ });
/**
 * Operator callback functions.
 *
 * @type {Object}
 */
var OPERATORS = {
	'!': function( a ) {
		return ! a;
	},
	'*': function( a, b ) {
		return a * b;
	},
	'/': function( a, b ) {
		return a / b;
	},
	'%': function( a, b ) {
		return a % b;
	},
	'+': function( a, b ) {
		return a + b;
	},
	'-': function( a, b ) {
		return a - b;
	},
	'<': function( a, b ) {
		return a < b;
	},
	'<=': function( a, b ) {
		return a <= b;
	},
	'>': function( a, b ) {
		return a > b;
	},
	'>=': function( a, b ) {
		return a >= b;
	},
	'==': function( a, b ) {
		return a === b;
	},
	'!=': function( a, b ) {
		return a !== b;
	},
	'&&': function( a, b ) {
		return a && b;
	},
	'||': function( a, b ) {
		return a || b;
	},
	'?:': function( a, b, c ) {
		if ( a ) {
			throw b;
		}

		return c;
	},
};

/**
 * Given an array of postfix terms and operand variables, returns the result of
 * the postfix evaluation.
 *
 * @example
 *
 * ```js
 * import evaluate from '@tannin/evaluate';
 *
 * // 3 + 4 * 5 / 6 ⇒ '3 4 5 * 6 / +'
 * const terms = [ '3', '4', '5', '*', '6', '/', '+' ];
 *
 * evaluate( terms, {} );
 * // ⇒ 6.333333333333334
 * ```
 *
 * @param {string[]} postfix   Postfix terms.
 * @param {Object}   variables Operand variables.
 *
 * @return {*} Result of evaluation.
 */
function evaluate( postfix, variables ) {
	var stack = [],
		i, j, args, getOperatorResult, term, value;

	for ( i = 0; i < postfix.length; i++ ) {
		term = postfix[ i ];

		getOperatorResult = OPERATORS[ term ];
		if ( getOperatorResult ) {
			// Pop from stack by number of function arguments.
			j = getOperatorResult.length;
			args = Array( j );
			while ( j-- ) {
				args[ j ] = stack.pop();
			}

			try {
				value = getOperatorResult.apply( null, args );
			} catch ( earlyReturn ) {
				return earlyReturn;
			}
		} else if ( variables.hasOwnProperty( term ) ) {
			value = variables[ term ];
		} else {
			value = +term;
		}

		stack.push( value );
	}

	return stack[ 0 ];
}


/***/ }),

/***/ "./node_modules/@tannin/plural-forms/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@tannin/plural-forms/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pluralForms)
/* harmony export */ });
/* harmony import */ var _tannin_compile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tannin/compile */ "./node_modules/@tannin/compile/index.js");


/**
 * Given a C expression, returns a function which, when called with a value,
 * evaluates the result with the value assumed to be the "n" variable of the
 * expression. The result will be coerced to its numeric equivalent.
 *
 * @param {string} expression C expression.
 *
 * @return {Function} Evaluator function.
 */
function pluralForms( expression ) {
	var evaluate = (0,_tannin_compile__WEBPACK_IMPORTED_MODULE_0__["default"])( expression );

	return function( n ) {
		return +evaluate( { n: n } );
	};
}


/***/ }),

/***/ "./node_modules/@tannin/postfix/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@tannin/postfix/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ postfix)
/* harmony export */ });
var PRECEDENCE, OPENERS, TERMINATORS, PATTERN;

/**
 * Operator precedence mapping.
 *
 * @type {Object}
 */
PRECEDENCE = {
	'(': 9,
	'!': 8,
	'*': 7,
	'/': 7,
	'%': 7,
	'+': 6,
	'-': 6,
	'<': 5,
	'<=': 5,
	'>': 5,
	'>=': 5,
	'==': 4,
	'!=': 4,
	'&&': 3,
	'||': 2,
	'?': 1,
	'?:': 1,
};

/**
 * Characters which signal pair opening, to be terminated by terminators.
 *
 * @type {string[]}
 */
OPENERS = [ '(', '?' ];

/**
 * Characters which signal pair termination, the value an array with the
 * opener as its first member. The second member is an optional operator
 * replacement to push to the stack.
 *
 * @type {string[]}
 */
TERMINATORS = {
	')': [ '(' ],
	':': [ '?', '?:' ],
};

/**
 * Pattern matching operators and openers.
 *
 * @type {RegExp}
 */
PATTERN = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;

/**
 * Given a C expression, returns the equivalent postfix (Reverse Polish)
 * notation terms as an array.
 *
 * If a postfix string is desired, simply `.join( ' ' )` the result.
 *
 * @example
 *
 * ```js
 * import postfix from '@tannin/postfix';
 *
 * postfix( 'n > 1' );
 * // ⇒ [ 'n', '1', '>' ]
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {string[]} Postfix terms.
 */
function postfix( expression ) {
	var terms = [],
		stack = [],
		match, operator, term, element;

	while ( ( match = expression.match( PATTERN ) ) ) {
		operator = match[ 0 ];

		// Term is the string preceding the operator match. It may contain
		// whitespace, and may be empty (if operator is at beginning).
		term = expression.substr( 0, match.index ).trim();
		if ( term ) {
			terms.push( term );
		}

		while ( ( element = stack.pop() ) ) {
			if ( TERMINATORS[ operator ] ) {
				if ( TERMINATORS[ operator ][ 0 ] === element ) {
					// Substitution works here under assumption that because
					// the assigned operator will no longer be a terminator, it
					// will be pushed to the stack during the condition below.
					operator = TERMINATORS[ operator ][ 1 ] || operator;
					break;
				}
			} else if ( OPENERS.indexOf( element ) >= 0 || PRECEDENCE[ element ] < PRECEDENCE[ operator ] ) {
				// Push to stack if either an opener or when pop reveals an
				// element of lower precedence.
				stack.push( element );
				break;
			}

			// For each popped from stack, push to terms.
			terms.push( element );
		}

		if ( ! TERMINATORS[ operator ] ) {
			stack.push( operator );
		}

		// Slice matched fragment from expression to continue match.
		expression = expression.substr( match.index + operator.length );
	}

	// Push remainder of operand, if exists, to terms.
	expression = expression.trim();
	if ( expression ) {
		terms.push( expression );
	}

	// Pop remaining items from stack into terms.
	return terms.concat( stack.reverse() );
}


/***/ }),

/***/ "./node_modules/@wordpress/i18n/build-module/create-i18n.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/build-module/create-i18n.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createI18n: () => (/* binding */ createI18n)
/* harmony export */ });
/* harmony import */ var tannin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tannin */ "./node_modules/tannin/index.js");
/**
 * External dependencies
 */


/**
 * @typedef {Record<string,any>} LocaleData
 */

/**
 * Default locale data to use for Tannin domain when not otherwise provided.
 * Assumes an English plural forms expression.
 *
 * @type {LocaleData}
 */
const DEFAULT_LOCALE_DATA = {
  '': {
    /** @param {number} n */
    plural_forms(n) {
      return n === 1 ? 0 : 1;
    }
  }
};

/*
 * Regular expression that matches i18n hooks like `i18n.gettext`, `i18n.ngettext`,
 * `i18n.gettext_domain` or `i18n.ngettext_with_context` or `i18n.has_translation`.
 */
const I18N_HOOK_REGEXP = /^i18n\.(n?gettext|has_translation)(_|$)/;

/**
 * @typedef {(domain?: string) => LocaleData} GetLocaleData
 *
 * Returns locale data by domain in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/**
 * @typedef {(data?: LocaleData, domain?: string) => void} SetLocaleData
 *
 * Merges locale data into the Tannin instance by domain. Note that this
 * function will overwrite the domain configuration. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/**
 * @typedef {(data?: LocaleData, domain?: string) => void} AddLocaleData
 *
 * Merges locale data into the Tannin instance by domain. Note that this
 * function will also merge the domain configuration. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/**
 * @typedef {(data?: LocaleData, domain?: string) => void} ResetLocaleData
 *
 * Resets all current Tannin instance locale data and sets the specified
 * locale data for the domain. Accepts data in a Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/** @typedef {() => void} SubscribeCallback */
/** @typedef {() => void} UnsubscribeCallback */
/**
 * @typedef {(callback: SubscribeCallback) => UnsubscribeCallback} Subscribe
 *
 * Subscribes to changes of locale data
 */
/**
 * @typedef {(domain?: string) => string} GetFilterDomain
 * Retrieve the domain to use when calling domain-specific filters.
 */
/**
 * @typedef {(text: string, domain?: string) => string} __
 *
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 */
/**
 * @typedef {(text: string, context: string, domain?: string) => string} _x
 *
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 */
/**
 * @typedef {(single: string, plural: string, number: number, domain?: string) => string} _n
 *
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 */
/**
 * @typedef {(single: string, plural: string, number: number, context: string, domain?: string) => string} _nx
 *
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 */
/**
 * @typedef {() => boolean} IsRtl
 *
 * Check if current locale is RTL.
 *
 * **RTL (Right To Left)** is a locale property indicating that text is written from right to left.
 * For example, the `he` locale (for Hebrew) specifies right-to-left. Arabic (ar) is another common
 * language written RTL. The opposite of RTL, LTR (Left To Right) is used in other languages,
 * including English (`en`, `en-US`, `en-GB`, etc.), Spanish (`es`), and French (`fr`).
 */
/**
 * @typedef {(single: string, context?: string, domain?: string) => boolean} HasTranslation
 *
 * Check if there is a translation for a given string in singular form.
 */
/** @typedef {import('@wordpress/hooks').Hooks} Hooks */

/**
 * An i18n instance
 *
 * @typedef I18n
 * @property {GetLocaleData}   getLocaleData   Returns locale data by domain in a Jed-formatted JSON object shape.
 * @property {SetLocaleData}   setLocaleData   Merges locale data into the Tannin instance by domain. Note that this
 *                                             function will overwrite the domain configuration. Accepts data in a
 *                                             Jed-formatted JSON object shape.
 * @property {AddLocaleData}   addLocaleData   Merges locale data into the Tannin instance by domain. Note that this
 *                                             function will also merge the domain configuration. Accepts data in a
 *                                             Jed-formatted JSON object shape.
 * @property {ResetLocaleData} resetLocaleData Resets all current Tannin instance locale data and sets the specified
 *                                             locale data for the domain. Accepts data in a Jed-formatted JSON object shape.
 * @property {Subscribe}       subscribe       Subscribes to changes of Tannin locale data.
 * @property {__}              __              Retrieve the translation of text.
 * @property {_x}              _x              Retrieve translated string with gettext context.
 * @property {_n}              _n              Translates and retrieves the singular or plural form based on the supplied
 *                                             number.
 * @property {_nx}             _nx             Translates and retrieves the singular or plural form based on the supplied
 *                                             number, with gettext context.
 * @property {IsRtl}           isRTL           Check if current locale is RTL.
 * @property {HasTranslation}  hasTranslation  Check if there is a translation for a given string.
 */

/**
 * Create an i18n instance
 *
 * @param {LocaleData} [initialData]   Locale data configuration.
 * @param {string}     [initialDomain] Domain for which configuration applies.
 * @param {Hooks}      [hooks]         Hooks implementation.
 *
 * @return {I18n} I18n instance.
 */
const createI18n = (initialData, initialDomain, hooks) => {
  /**
   * The underlying instance of Tannin to which exported functions interface.
   *
   * @type {Tannin}
   */
  const tannin = new tannin__WEBPACK_IMPORTED_MODULE_0__["default"]({});
  const listeners = new Set();
  const notifyListeners = () => {
    listeners.forEach(listener => listener());
  };

  /**
   * Subscribe to changes of locale data.
   *
   * @param {SubscribeCallback} callback Subscription callback.
   * @return {UnsubscribeCallback} Unsubscribe callback.
   */
  const subscribe = callback => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  /** @type {GetLocaleData} */
  const getLocaleData = (domain = 'default') => tannin.data[domain];

  /**
   * @param {LocaleData} [data]
   * @param {string}     [domain]
   */
  const doSetLocaleData = (data, domain = 'default') => {
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data
    };

    // Populate default domain configuration (supported locale date which omits
    // a plural forms expression).
    tannin.data[domain][''] = {
      ...DEFAULT_LOCALE_DATA[''],
      ...tannin.data[domain]?.['']
    };

    // Clean up cached plural forms functions cache as it might be updated.
    delete tannin.pluralForms[domain];
  };

  /** @type {SetLocaleData} */
  const setLocaleData = (data, domain) => {
    doSetLocaleData(data, domain);
    notifyListeners();
  };

  /** @type {AddLocaleData} */
  const addLocaleData = (data, domain = 'default') => {
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data,
      // Populate default domain configuration (supported locale date which omits
      // a plural forms expression).
      '': {
        ...DEFAULT_LOCALE_DATA[''],
        ...tannin.data[domain]?.[''],
        ...data?.['']
      }
    };

    // Clean up cached plural forms functions cache as it might be updated.
    delete tannin.pluralForms[domain];
    notifyListeners();
  };

  /** @type {ResetLocaleData} */
  const resetLocaleData = (data, domain) => {
    // Reset all current Tannin locale data.
    tannin.data = {};

    // Reset cached plural forms functions cache.
    tannin.pluralForms = {};
    setLocaleData(data, domain);
  };

  /**
   * Wrapper for Tannin's `dcnpgettext`. Populates default locale data if not
   * otherwise previously assigned.
   *
   * @param {string|undefined} domain   Domain to retrieve the translated text.
   * @param {string|undefined} context  Context information for the translators.
   * @param {string}           single   Text to translate if non-plural. Used as
   *                                    fallback return value on a caught error.
   * @param {string}           [plural] The text to be used if the number is
   *                                    plural.
   * @param {number}           [number] The number to compare against to use
   *                                    either the singular or plural form.
   *
   * @return {string} The translated string.
   */
  const dcnpgettext = (domain = 'default', context, single, plural, number) => {
    if (!tannin.data[domain]) {
      // Use `doSetLocaleData` to set silently, without notifying listeners.
      doSetLocaleData(undefined, domain);
    }
    return tannin.dcnpgettext(domain, context, single, plural, number);
  };

  /** @type {GetFilterDomain} */
  const getFilterDomain = (domain = 'default') => domain;

  /** @type {__} */
  const __ = (text, domain) => {
    let translation = dcnpgettext(domain, undefined, text);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters text with its translation.
     *
     * @param {string} translation Translated text.
     * @param {string} text        Text to translate.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.gettext', translation, text, domain);
    return /** @type {string} */(
      /** @type {*} */hooks.applyFilters('i18n.gettext_' + getFilterDomain(domain), translation, text, domain)
    );
  };

  /** @type {_x} */
  const _x = (text, context, domain) => {
    let translation = dcnpgettext(domain, context, text);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters text with its translation based on context information.
     *
     * @param {string} translation Translated text.
     * @param {string} text        Text to translate.
     * @param {string} context     Context information for the translators.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.gettext_with_context', translation, text, context, domain);
    return /** @type {string} */(
      /** @type {*} */hooks.applyFilters('i18n.gettext_with_context_' + getFilterDomain(domain), translation, text, context, domain)
    );
  };

  /** @type {_n} */
  const _n = (single, plural, number, domain) => {
    let translation = dcnpgettext(domain, undefined, single, plural, number);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters the singular or plural form of a string.
     *
     * @param {string} translation Translated text.
     * @param {string} single      The text to be used if the number is singular.
     * @param {string} plural      The text to be used if the number is plural.
     * @param {string} number      The number to compare against to use either the singular or plural form.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.ngettext', translation, single, plural, number, domain);
    return /** @type {string} */(
      /** @type {*} */hooks.applyFilters('i18n.ngettext_' + getFilterDomain(domain), translation, single, plural, number, domain)
    );
  };

  /** @type {_nx} */
  const _nx = (single, plural, number, context, domain) => {
    let translation = dcnpgettext(domain, context, single, plural, number);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters the singular or plural form of a string with gettext context.
     *
     * @param {string} translation Translated text.
     * @param {string} single      The text to be used if the number is singular.
     * @param {string} plural      The text to be used if the number is plural.
     * @param {string} number      The number to compare against to use either the singular or plural form.
     * @param {string} context     Context information for the translators.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.ngettext_with_context', translation, single, plural, number, context, domain);
    return /** @type {string} */(
      /** @type {*} */hooks.applyFilters('i18n.ngettext_with_context_' + getFilterDomain(domain), translation, single, plural, number, context, domain)
    );
  };

  /** @type {IsRtl} */
  const isRTL = () => {
    return 'rtl' === _x('ltr', 'text direction');
  };

  /** @type {HasTranslation} */
  const hasTranslation = (single, context, domain) => {
    const key = context ? context + '\u0004' + single : single;
    let result = !!tannin.data?.[domain !== null && domain !== void 0 ? domain : 'default']?.[key];
    if (hooks) {
      /**
       * Filters the presence of a translation in the locale data.
       *
       * @param {boolean} hasTranslation Whether the translation is present or not..
       * @param {string}  single         The singular form of the translated text (used as key in locale data)
       * @param {string}  context        Context information for the translators.
       * @param {string}  domain         Text domain. Unique identifier for retrieving translated strings.
       */
      result = /** @type { boolean } */
      /** @type {*} */hooks.applyFilters('i18n.has_translation', result, single, context, domain);
      result = /** @type { boolean } */
      /** @type {*} */hooks.applyFilters('i18n.has_translation_' + getFilterDomain(domain), result, single, context, domain);
    }
    return result;
  };
  if (initialData) {
    setLocaleData(initialData, initialDomain);
  }
  if (hooks) {
    /**
     * @param {string} hookName
     */
    const onHookAddedOrRemoved = hookName => {
      if (I18N_HOOK_REGEXP.test(hookName)) {
        notifyListeners();
      }
    };
    hooks.addAction('hookAdded', 'core/i18n', onHookAddedOrRemoved);
    hooks.addAction('hookRemoved', 'core/i18n', onHookAddedOrRemoved);
  }
  return {
    getLocaleData,
    setLocaleData,
    addLocaleData,
    resetLocaleData,
    subscribe,
    __,
    _x,
    _n,
    _nx,
    isRTL,
    hasTranslation
  };
};
//# sourceMappingURL=create-i18n.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/build-module/default-i18n.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/build-module/default-i18n.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __: () => (/* binding */ __),
/* harmony export */   _n: () => (/* binding */ _n),
/* harmony export */   _nx: () => (/* binding */ _nx),
/* harmony export */   _x: () => (/* binding */ _x),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getLocaleData: () => (/* binding */ getLocaleData),
/* harmony export */   hasTranslation: () => (/* binding */ hasTranslation),
/* harmony export */   isRTL: () => (/* binding */ isRTL),
/* harmony export */   resetLocaleData: () => (/* binding */ resetLocaleData),
/* harmony export */   setLocaleData: () => (/* binding */ setLocaleData),
/* harmony export */   subscribe: () => (/* binding */ subscribe)
/* harmony export */ });
/* harmony import */ var _create_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-i18n */ "./node_modules/@wordpress/i18n/build-module/create-i18n.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/index.js");
/**
 * Internal dependencies
 */


/**
 * WordPress dependencies
 */

const i18n = (0,_create_i18n__WEBPACK_IMPORTED_MODULE_0__.createI18n)(undefined, undefined, _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.defaultHooks);

/**
 * Default, singleton instance of `I18n`.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (i18n);

/*
 * Comments in this file are duplicated from ./i18n due to
 * https://github.com/WordPress/gutenberg/pull/20318#issuecomment-590837722
 */

/**
 * @typedef {import('./create-i18n').LocaleData} LocaleData
 * @typedef {import('./create-i18n').SubscribeCallback} SubscribeCallback
 * @typedef {import('./create-i18n').UnsubscribeCallback} UnsubscribeCallback
 */

/**
 * Returns locale data by domain in a Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {string} [domain] Domain for which to get the data.
 * @return {LocaleData} Locale data.
 */
const getLocaleData = i18n.getLocaleData.bind(i18n);

/**
 * Merges locale data into the Tannin instance by domain. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {LocaleData} [data]   Locale data configuration.
 * @param {string}     [domain] Domain for which configuration applies.
 */
const setLocaleData = i18n.setLocaleData.bind(i18n);

/**
 * Resets all current Tannin instance locale data and sets the specified
 * locale data for the domain. Accepts data in a Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {LocaleData} [data]   Locale data configuration.
 * @param {string}     [domain] Domain for which configuration applies.
 */
const resetLocaleData = i18n.resetLocaleData.bind(i18n);

/**
 * Subscribes to changes of locale data
 *
 * @param {SubscribeCallback} callback Subscription callback
 * @return {UnsubscribeCallback} Unsubscribe callback
 */
const subscribe = i18n.subscribe.bind(i18n);

/**
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 *
 * @param {string} text     Text to translate.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} Translated text.
 */
const __ = i18n.__.bind(i18n);

/**
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 *
 * @param {string} text     Text to translate.
 * @param {string} context  Context information for the translators.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} Translated context string without pipe.
 */
const _x = i18n._x.bind(i18n);

/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */
const _n = i18n._n.bind(i18n);

/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} context  Context information for the translators.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */
const _nx = i18n._nx.bind(i18n);

/**
 * Check if current locale is RTL.
 *
 * **RTL (Right To Left)** is a locale property indicating that text is written from right to left.
 * For example, the `he` locale (for Hebrew) specifies right-to-left. Arabic (ar) is another common
 * language written RTL. The opposite of RTL, LTR (Left To Right) is used in other languages,
 * including English (`en`, `en-US`, `en-GB`, etc.), Spanish (`es`), and French (`fr`).
 *
 * @return {boolean} Whether locale is RTL.
 */
const isRTL = i18n.isRTL.bind(i18n);

/**
 * Check if there is a translation for a given string (in singular form).
 *
 * @param {string} single    Singular form of the string to look up.
 * @param {string} [context] Context information for the translators.
 * @param {string} [domain]  Domain to retrieve the translated text.
 * @return {boolean} Whether the translation exists or not.
 */
const hasTranslation = i18n.hasTranslation.bind(i18n);
//# sourceMappingURL=default-i18n.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/build-module/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/build-module/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__.__),
/* harmony export */   _n: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__._n),
/* harmony export */   _nx: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__._nx),
/* harmony export */   _x: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__._x),
/* harmony export */   createI18n: () => (/* reexport safe */ _create_i18n__WEBPACK_IMPORTED_MODULE_1__.createI18n),
/* harmony export */   defaultI18n: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   getLocaleData: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__.getLocaleData),
/* harmony export */   hasTranslation: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__.hasTranslation),
/* harmony export */   isRTL: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__.isRTL),
/* harmony export */   resetLocaleData: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__.resetLocaleData),
/* harmony export */   setLocaleData: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__.setLocaleData),
/* harmony export */   sprintf: () => (/* reexport safe */ _sprintf__WEBPACK_IMPORTED_MODULE_0__.sprintf),
/* harmony export */   subscribe: () => (/* reexport safe */ _default_i18n__WEBPACK_IMPORTED_MODULE_2__.subscribe)
/* harmony export */ });
/* harmony import */ var _sprintf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprintf */ "./node_modules/@wordpress/i18n/build-module/sprintf.js");
/* harmony import */ var _create_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-i18n */ "./node_modules/@wordpress/i18n/build-module/create-i18n.js");
/* harmony import */ var _default_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-i18n */ "./node_modules/@wordpress/i18n/build-module/default-i18n.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/build-module/sprintf.js":
/*!**************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/build-module/sprintf.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sprintf: () => (/* binding */ sprintf)
/* harmony export */ });
/* harmony import */ var memize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! memize */ "./node_modules/memize/dist/index.js");
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sprintf-js */ "./node_modules/sprintf-js/src/sprintf.js");
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sprintf_js__WEBPACK_IMPORTED_MODULE_1__);
/**
 * External dependencies
 */



/**
 * Log to console, once per message; or more precisely, per referentially equal
 * argument set. Because Jed throws errors, we log these to the console instead
 * to avoid crashing the application.
 *
 * @param {...*} args Arguments to pass to `console.error`
 */
const logErrorOnce = (0,memize__WEBPACK_IMPORTED_MODULE_0__["default"])(console.error); // eslint-disable-line no-console

/**
 * Returns a formatted string. If an error occurs in applying the format, the
 * original format string is returned.
 *
 * @param {string} format The format of the string to generate.
 * @param {...*}   args   Arguments to apply to the format.
 *
 * @see https://www.npmjs.com/package/sprintf-js
 *
 * @return {string} The formatted string.
 */
function sprintf(format, ...args) {
  try {
    return sprintf_js__WEBPACK_IMPORTED_MODULE_1___default().sprintf(format, ...args);
  } catch (error) {
    if (error instanceof Error) {
      logErrorOnce('sprintf error: \n\n' + error.toString());
    }
    return format;
  }
}
//# sourceMappingURL=sprintf.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createAddHook.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createAddHook.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validateNamespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validateNamespace.js */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateNamespace.js");
/* harmony import */ var _validateHookName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validateHookName.js */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateHookName.js");
/**
 * Internal dependencies
 */



/**
 * @callback AddHook
 *
 * Adds the hook to the appropriate hooks container.
 *
 * @param {string}               hookName      Name of hook to add
 * @param {string}               namespace     The unique namespace identifying the callback in the form `vendor/plugin/function`.
 * @param {import('.').Callback} callback      Function to call when the hook is run
 * @param {number}               [priority=10] Priority of this hook
 */

/**
 * Returns a function which, when invoked, will add a hook.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {AddHook} Function that adds a new hook.
 */
function createAddHook(hooks, storeKey) {
  return function addHook(hookName, namespace, callback, priority = 10) {
    const hooksStore = hooks[storeKey];
    if (!(0,_validateHookName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(hookName)) {
      return;
    }
    if (!(0,_validateNamespace_js__WEBPACK_IMPORTED_MODULE_0__["default"])(namespace)) {
      return;
    }
    if ('function' !== typeof callback) {
      // eslint-disable-next-line no-console
      console.error('The hook callback must be a function.');
      return;
    }

    // Validate numeric priority
    if ('number' !== typeof priority) {
      // eslint-disable-next-line no-console
      console.error('If specified, the hook priority must be a number.');
      return;
    }
    const handler = {
      callback,
      priority,
      namespace
    };
    if (hooksStore[hookName]) {
      // Find the correct insert index of the new hook.
      const handlers = hooksStore[hookName].handlers;

      /** @type {number} */
      let i;
      for (i = handlers.length; i > 0; i--) {
        if (priority >= handlers[i - 1].priority) {
          break;
        }
      }
      if (i === handlers.length) {
        // If append, operate via direct assignment.
        handlers[i] = handler;
      } else {
        // Otherwise, insert before index via splice.
        handlers.splice(i, 0, handler);
      }

      // We may also be currently executing this hook.  If the callback
      // we're adding would come after the current callback, there's no
      // problem; otherwise we need to increase the execution index of
      // any other runs by 1 to account for the added element.
      hooksStore.__current.forEach(hookInfo => {
        if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
          hookInfo.currentIndex++;
        }
      });
    } else {
      // This is the first hook of its type.
      hooksStore[hookName] = {
        handlers: [handler],
        runs: 0
      };
    }
    if (hookName !== 'hookAdded') {
      hooks.doAction('hookAdded', hookName, namespace, callback, priority);
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createAddHook);
//# sourceMappingURL=createAddHook.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createCurrentHook.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createCurrentHook.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns a function which, when invoked, will return the name of the
 * currently running hook, or `null` if no hook of the given type is currently
 * running.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {() => string | null} Function that returns the current hook name or null.
 */
function createCurrentHook(hooks, storeKey) {
  return function currentHook() {
    var _hooksStore$__current;
    const hooksStore = hooks[storeKey];
    return (_hooksStore$__current = hooksStore.__current[hooksStore.__current.length - 1]?.name) !== null && _hooksStore$__current !== void 0 ? _hooksStore$__current : null;
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createCurrentHook);
//# sourceMappingURL=createCurrentHook.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createDidHook.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createDidHook.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validateHookName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validateHookName.js */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateHookName.js");
/**
 * Internal dependencies
 */


/**
 * @callback DidHook
 *
 * Returns the number of times an action has been fired.
 *
 * @param {string} hookName The hook name to check.
 *
 * @return {number | undefined} The number of times the hook has run.
 */

/**
 * Returns a function which, when invoked, will return the number of times a
 * hook has been called.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {DidHook} Function that returns a hook's call count.
 */
function createDidHook(hooks, storeKey) {
  return function didHook(hookName) {
    const hooksStore = hooks[storeKey];
    if (!(0,_validateHookName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(hookName)) {
      return;
    }
    return hooksStore[hookName] && hooksStore[hookName].runs ? hooksStore[hookName].runs : 0;
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDidHook);
//# sourceMappingURL=createDidHook.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createDoingHook.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createDoingHook.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @callback DoingHook
 * Returns whether a hook is currently being executed.
 *
 * @param {string} [hookName] The name of the hook to check for.  If
 *                            omitted, will check for any hook being executed.
 *
 * @return {boolean} Whether the hook is being executed.
 */

/**
 * Returns a function which, when invoked, will return whether a hook is
 * currently being executed.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {DoingHook} Function that returns whether a hook is currently
 *                     being executed.
 */
function createDoingHook(hooks, storeKey) {
  return function doingHook(hookName) {
    const hooksStore = hooks[storeKey];

    // If the hookName was not passed, check for any current hook.
    if ('undefined' === typeof hookName) {
      return 'undefined' !== typeof hooksStore.__current[0];
    }

    // Return the __current hook.
    return hooksStore.__current[0] ? hookName === hooksStore.__current[0].name : false;
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDoingHook);
//# sourceMappingURL=createDoingHook.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createHasHook.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createHasHook.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @callback HasHook
 *
 * Returns whether any handlers are attached for the given hookName and optional namespace.
 *
 * @param {string} hookName    The name of the hook to check for.
 * @param {string} [namespace] Optional. The unique namespace identifying the callback
 *                             in the form `vendor/plugin/function`.
 *
 * @return {boolean} Whether there are handlers that are attached to the given hook.
 */
/**
 * Returns a function which, when invoked, will return whether any handlers are
 * attached to a particular hook.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {HasHook} Function that returns whether any handlers are
 *                   attached to a particular hook and optional namespace.
 */
function createHasHook(hooks, storeKey) {
  return function hasHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];

    // Use the namespace if provided.
    if ('undefined' !== typeof namespace) {
      return hookName in hooksStore && hooksStore[hookName].handlers.some(hook => hook.namespace === namespace);
    }
    return hookName in hooksStore;
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHasHook);
//# sourceMappingURL=createHasHook.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createHooks.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createHooks.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _Hooks: () => (/* binding */ _Hooks),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createAddHook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createAddHook */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createAddHook.js");
/* harmony import */ var _createRemoveHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createRemoveHook */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createRemoveHook.js");
/* harmony import */ var _createHasHook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createHasHook */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createHasHook.js");
/* harmony import */ var _createRunHook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createRunHook */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createRunHook.js");
/* harmony import */ var _createCurrentHook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createCurrentHook */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createCurrentHook.js");
/* harmony import */ var _createDoingHook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createDoingHook */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createDoingHook.js");
/* harmony import */ var _createDidHook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createDidHook */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createDidHook.js");
/**
 * Internal dependencies
 */








/**
 * Internal class for constructing hooks. Use `createHooks()` function
 *
 * Note, it is necessary to expose this class to make its type public.
 *
 * @private
 */
class _Hooks {
  constructor() {
    /** @type {import('.').Store} actions */
    this.actions = Object.create(null);
    this.actions.__current = [];

    /** @type {import('.').Store} filters */
    this.filters = Object.create(null);
    this.filters.__current = [];
    this.addAction = (0,_createAddHook__WEBPACK_IMPORTED_MODULE_0__["default"])(this, 'actions');
    this.addFilter = (0,_createAddHook__WEBPACK_IMPORTED_MODULE_0__["default"])(this, 'filters');
    this.removeAction = (0,_createRemoveHook__WEBPACK_IMPORTED_MODULE_1__["default"])(this, 'actions');
    this.removeFilter = (0,_createRemoveHook__WEBPACK_IMPORTED_MODULE_1__["default"])(this, 'filters');
    this.hasAction = (0,_createHasHook__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'actions');
    this.hasFilter = (0,_createHasHook__WEBPACK_IMPORTED_MODULE_2__["default"])(this, 'filters');
    this.removeAllActions = (0,_createRemoveHook__WEBPACK_IMPORTED_MODULE_1__["default"])(this, 'actions', true);
    this.removeAllFilters = (0,_createRemoveHook__WEBPACK_IMPORTED_MODULE_1__["default"])(this, 'filters', true);
    this.doAction = (0,_createRunHook__WEBPACK_IMPORTED_MODULE_3__["default"])(this, 'actions');
    this.applyFilters = (0,_createRunHook__WEBPACK_IMPORTED_MODULE_3__["default"])(this, 'filters', true);
    this.currentAction = (0,_createCurrentHook__WEBPACK_IMPORTED_MODULE_4__["default"])(this, 'actions');
    this.currentFilter = (0,_createCurrentHook__WEBPACK_IMPORTED_MODULE_4__["default"])(this, 'filters');
    this.doingAction = (0,_createDoingHook__WEBPACK_IMPORTED_MODULE_5__["default"])(this, 'actions');
    this.doingFilter = (0,_createDoingHook__WEBPACK_IMPORTED_MODULE_5__["default"])(this, 'filters');
    this.didAction = (0,_createDidHook__WEBPACK_IMPORTED_MODULE_6__["default"])(this, 'actions');
    this.didFilter = (0,_createDidHook__WEBPACK_IMPORTED_MODULE_6__["default"])(this, 'filters');
  }
}

/** @typedef {_Hooks} Hooks */

/**
 * Returns an instance of the hooks object.
 *
 * @return {Hooks} A Hooks instance.
 */
function createHooks() {
  return new _Hooks();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHooks);
//# sourceMappingURL=createHooks.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createRemoveHook.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createRemoveHook.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validateNamespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validateNamespace.js */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateNamespace.js");
/* harmony import */ var _validateHookName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validateHookName.js */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateHookName.js");
/**
 * Internal dependencies
 */



/**
 * @callback RemoveHook
 * Removes the specified callback (or all callbacks) from the hook with a given hookName
 * and namespace.
 *
 * @param {string} hookName  The name of the hook to modify.
 * @param {string} namespace The unique namespace identifying the callback in the
 *                           form `vendor/plugin/function`.
 *
 * @return {number | undefined} The number of callbacks removed.
 */

/**
 * Returns a function which, when invoked, will remove a specified hook or all
 * hooks by the given name.
 *
 * @param {import('.').Hooks}    hooks             Hooks instance.
 * @param {import('.').StoreKey} storeKey
 * @param {boolean}              [removeAll=false] Whether to remove all callbacks for a hookName,
 *                                                 without regard to namespace. Used to create
 *                                                 `removeAll*` functions.
 *
 * @return {RemoveHook} Function that removes hooks.
 */
function createRemoveHook(hooks, storeKey, removeAll = false) {
  return function removeHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if (!(0,_validateHookName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(hookName)) {
      return;
    }
    if (!removeAll && !(0,_validateNamespace_js__WEBPACK_IMPORTED_MODULE_0__["default"])(namespace)) {
      return;
    }

    // Bail if no hooks exist by this name.
    if (!hooksStore[hookName]) {
      return 0;
    }
    let handlersRemoved = 0;
    if (removeAll) {
      handlersRemoved = hooksStore[hookName].handlers.length;
      hooksStore[hookName] = {
        runs: hooksStore[hookName].runs,
        handlers: []
      };
    } else {
      // Try to find the specified callback to remove.
      const handlers = hooksStore[hookName].handlers;
      for (let i = handlers.length - 1; i >= 0; i--) {
        if (handlers[i].namespace === namespace) {
          handlers.splice(i, 1);
          handlersRemoved++;
          // This callback may also be part of a hook that is
          // currently executing.  If the callback we're removing
          // comes after the current callback, there's no problem;
          // otherwise we need to decrease the execution index of any
          // other runs by 1 to account for the removed element.
          hooksStore.__current.forEach(hookInfo => {
            if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
              hookInfo.currentIndex--;
            }
          });
        }
      }
    }
    if (hookName !== 'hookRemoved') {
      hooks.doAction('hookRemoved', hookName, namespace);
    }
    return handlersRemoved;
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRemoveHook);
//# sourceMappingURL=createRemoveHook.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createRunHook.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createRunHook.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Returns a function which, when invoked, will execute all callbacks
 * registered to a hook of the specified type, optionally returning the final
 * value of the call chain.
 *
 * @param {import('.').Hooks}    hooks                  Hooks instance.
 * @param {import('.').StoreKey} storeKey
 * @param {boolean}              [returnFirstArg=false] Whether each hook callback is expected to
 *                                                      return its first argument.
 *
 * @return {(hookName:string, ...args: unknown[]) => undefined|unknown} Function that runs hook callbacks.
 */
function createRunHook(hooks, storeKey, returnFirstArg = false) {
  return function runHooks(hookName, ...args) {
    const hooksStore = hooks[storeKey];
    if (!hooksStore[hookName]) {
      hooksStore[hookName] = {
        handlers: [],
        runs: 0
      };
    }
    hooksStore[hookName].runs++;
    const handlers = hooksStore[hookName].handlers;

    // The following code is stripped from production builds.
    if (true) {
      // Handle any 'all' hooks registered.
      if ('hookAdded' !== hookName && hooksStore.all) {
        handlers.push(...hooksStore.all.handlers);
      }
    }
    if (!handlers || !handlers.length) {
      return returnFirstArg ? args[0] : undefined;
    }
    const hookInfo = {
      name: hookName,
      currentIndex: 0
    };
    hooksStore.__current.push(hookInfo);
    while (hookInfo.currentIndex < handlers.length) {
      const handler = handlers[hookInfo.currentIndex];
      const result = handler.callback.apply(null, args);
      if (returnFirstArg) {
        args[0] = result;
      }
      hookInfo.currentIndex++;
    }
    hooksStore.__current.pop();
    if (returnFirstArg) {
      return args[0];
    }
    return undefined;
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRunHook);
//# sourceMappingURL=createRunHook.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/index.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   actions: () => (/* binding */ actions),
/* harmony export */   addAction: () => (/* binding */ addAction),
/* harmony export */   addFilter: () => (/* binding */ addFilter),
/* harmony export */   applyFilters: () => (/* binding */ applyFilters),
/* harmony export */   createHooks: () => (/* reexport safe */ _createHooks__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   currentAction: () => (/* binding */ currentAction),
/* harmony export */   currentFilter: () => (/* binding */ currentFilter),
/* harmony export */   defaultHooks: () => (/* binding */ defaultHooks),
/* harmony export */   didAction: () => (/* binding */ didAction),
/* harmony export */   didFilter: () => (/* binding */ didFilter),
/* harmony export */   doAction: () => (/* binding */ doAction),
/* harmony export */   doingAction: () => (/* binding */ doingAction),
/* harmony export */   doingFilter: () => (/* binding */ doingFilter),
/* harmony export */   filters: () => (/* binding */ filters),
/* harmony export */   hasAction: () => (/* binding */ hasAction),
/* harmony export */   hasFilter: () => (/* binding */ hasFilter),
/* harmony export */   removeAction: () => (/* binding */ removeAction),
/* harmony export */   removeAllActions: () => (/* binding */ removeAllActions),
/* harmony export */   removeAllFilters: () => (/* binding */ removeAllFilters),
/* harmony export */   removeFilter: () => (/* binding */ removeFilter)
/* harmony export */ });
/* harmony import */ var _createHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createHooks */ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/createHooks.js");
/**
 * Internal dependencies
 */


/** @typedef {(...args: any[])=>any} Callback */

/**
 * @typedef Handler
 * @property {Callback} callback  The callback
 * @property {string}   namespace The namespace
 * @property {number}   priority  The namespace
 */

/**
 * @typedef Hook
 * @property {Handler[]} handlers Array of handlers
 * @property {number}    runs     Run counter
 */

/**
 * @typedef Current
 * @property {string} name         Hook name
 * @property {number} currentIndex The index
 */

/**
 * @typedef {Record<string, Hook> & {__current: Current[]}} Store
 */

/**
 * @typedef {'actions' | 'filters'} StoreKey
 */

/**
 * @typedef {import('./createHooks').Hooks} Hooks
 */

const defaultHooks = (0,_createHooks__WEBPACK_IMPORTED_MODULE_0__["default"])();
const {
  addAction,
  addFilter,
  removeAction,
  removeFilter,
  hasAction,
  hasFilter,
  removeAllActions,
  removeAllFilters,
  doAction,
  applyFilters,
  currentAction,
  currentFilter,
  doingAction,
  doingFilter,
  didAction,
  didFilter,
  actions,
  filters
} = defaultHooks;

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateHookName.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateHookName.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Validate a hookName string.
 *
 * @param {string} hookName The hook name to validate. Should be a non empty string containing
 *                          only numbers, letters, dashes, periods and underscores. Also,
 *                          the hook name cannot begin with `__`.
 *
 * @return {boolean} Whether the hook name is valid.
 */
function validateHookName(hookName) {
  if ('string' !== typeof hookName || '' === hookName) {
    // eslint-disable-next-line no-console
    console.error('The hook name must be a non-empty string.');
    return false;
  }
  if (/^__/.test(hookName)) {
    // eslint-disable-next-line no-console
    console.error('The hook name cannot begin with `__`.');
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(hookName)) {
    // eslint-disable-next-line no-console
    console.error('The hook name can only contain numbers, letters, dashes, periods and underscores.');
    return false;
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateHookName);
//# sourceMappingURL=validateHookName.js.map

/***/ }),

/***/ "./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateNamespace.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/i18n/node_modules/@wordpress/hooks/build-module/validateNamespace.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Validate a namespace string.
 *
 * @param {string} namespace The namespace to validate - should take the form
 *                           `vendor/plugin/function`.
 *
 * @return {boolean} Whether the namespace is valid.
 */
function validateNamespace(namespace) {
  if ('string' !== typeof namespace || '' === namespace) {
    // eslint-disable-next-line no-console
    console.error('The namespace must be a non-empty string.');
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(namespace)) {
    // eslint-disable-next-line no-console
    console.error('The namespace can only contain numbers, letters, dashes, periods, underscores and slashes.');
    return false;
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validateNamespace);
//# sourceMappingURL=validateNamespace.js.map

/***/ }),

/***/ "./node_modules/country-list-with-dial-code-and-flag/dist/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/country-list-with-dial-code-and-flag/dist/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

var e={2934:(e,c,a)=>{Object.defineProperty(c,"__esModule",{value:!0}),c.Country=void 0;var r=a(8156),n=function(){function e(e){this.data=e}return Object.defineProperty(e.prototype,"name",{get:function(){return this.data.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"localName",{get:function(){var e;return null!==(e=this.data.local_name)&&void 0!==e?e:this.data.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dialCode",{get:function(){return this.data.dial_code},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"dial_code",{get:function(){return this.data.dial_code},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"code",{get:function(){return this.data.code},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"flag",{get:function(){return this.data.flag},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"preferred",{get:function(){var e;return null!==(e=this.data.preferred)&&void 0!==e&&e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"secondary",{get:function(){var e;return null!==(e=this.data.secondary)&&void 0!==e&&e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"areaCodes",{get:function(){var e;return null!==(e=this.data.area_codes)&&void 0!==e?e:[]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"countryCode",{get:function(){var e;return null!==(e=this.data.country_code)&&void 0!==e?e:this.data.dial_code},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"partOf",{get:function(){var e;return null!==(e=this.data.part_of)&&void 0!==e?e:[]},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"currency",{get:function(){var e;return null!==(e=this.data.currency)&&void 0!==e?e:""},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"currencyCode",{get:function(){var e;return null!==(e=this.data.currency_code)&&void 0!==e?e:""},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"currencySymbol",{get:function(){var e;return null!==(e=this.data.currency_symbol)&&void 0!==e?e:""},enumerable:!1,configurable:!0}),e.prototype.formatPhoneNumber=function(e,c){if(r.default.phoneNumberUtil){var a=r.default.phoneNumberUtil.parseAndKeepRawInput(this.parsePhoneNumber(e),this.code.toUpperCase());return r.default.phoneNumberUtil.format(a,null!=c?c:0)}console.warn("PhoneNumberUtil is not being use please check our documentation for more detail")},e.prototype.parsePhoneNumber=function(e){return"0"===(e=(e=e.toString()).replace(/[^\d+]/g,"")).charAt(0)&&(e=e.slice(1)),"+"===e.charAt(0)?e:this.dialCode+e},e}();c.Country=n},9646:(e,c)=>{Object.defineProperty(c,"__esModule",{value:!0}),c.default=[{name:"Afghanistan",dial_code:"+93",code:"AF",flag:"🇦🇫",local_name:"افغانستان",currency:"Afghan Afghani",currency_code:"AFN",currency_symbol:"؋"},{name:"Albania",dial_code:"+355",code:"AL",flag:"🇦🇱",local_name:"Shqipëria",currency:"Albanian Lek",currency_code:"ALL",currency_symbol:"L"},{name:"Algeria",dial_code:"+213",code:"DZ",flag:"🇩🇿",local_name:"Dzayer",currency:"Algerian Dinar",currency_code:"DZD",currency_symbol:"د.ج"},{name:"American Samoa",dial_code:"+1684",code:"AS",flag:"🇦🇸",part_of:["US"],currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Andorra",dial_code:"+376",code:"AD",flag:"🇦🇩",local_name:"Andorra",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Angola",dial_code:"+244",code:"AO",flag:"🇦🇴",local_name:"Angola",currency:"Angolan Kwanza",currency_code:"AOA",currency_symbol:"Kz"},{name:"Anguilla",dial_code:"+1264",code:"AI",flag:"🇦🇮",local_name:"Anguilla",part_of:["GB"],currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Antarctica",dial_code:"+672",code:"AQ",flag:"🇦🇶",currency:"",currency_code:"",currency_symbol:""},{name:"Antigua and Barbuda",dial_code:"+1268",code:"AG",flag:"🇦🇬",local_name:"Antigua and Barbuda",currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Argentina",dial_code:"+54",code:"AR",flag:"🇦🇷",local_name:"Argentina",currency:"Argentine Peso",currency_code:"ARS",currency_symbol:"$"},{name:"Armenia",dial_code:"+374",code:"AM",flag:"🇦🇲",local_name:"Հայաստան",currency:"Armenian Dram",currency_code:"AMD",currency_symbol:"֏"},{name:"Aruba",dial_code:"+297",code:"AW",flag:"🇦🇼",part_of:["NL"],local_name:"Aruba",currency:"Aruban Florin",currency_code:"AWG",currency_symbol:"ƒ"},{name:"Australia",dial_code:"+61",code:"AU",preferred:!0,flag:"🇦🇺",local_name:"Australia",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"Austria",dial_code:"+43",code:"AT",flag:"🇦🇹",local_name:"Österreich",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Azerbaijan",dial_code:"+994",code:"AZ",flag:"🇦🇿",local_name:"Azərbaycan",currency:"Azerbaijani Manat",currency_code:"AZN",currency_symbol:"₼"},{name:"Bahamas",dial_code:"+1242",code:"BS",flag:"🇧🇸",local_name:"The Bahamas",currency:"Bahamian Dollar",currency_code:"BSD",currency_symbol:"$"},{name:"Bahrain",dial_code:"+973",code:"BH",flag:"🇧🇭",local_name:"البحرين",currency:"Bahraini Dinar",currency_code:"BHD",currency_symbol:".د.ب"},{name:"Bangladesh",dial_code:"+880",code:"BD",flag:"🇧🇩",local_name:"বাংলাদেশ",currency:"Bangladeshi Taka",currency_code:"BDT",currency_symbol:"৳"},{name:"Barbados",dial_code:"+1246",code:"BB",flag:"🇧🇧",local_name:"Barbados",currency:"Barbadian Dollar",currency_code:"BBD",currency_symbol:"$"},{name:"Belarus",dial_code:"+375",code:"BY",flag:"🇧🇾",local_name:"Беларусь",currency:"Belarusian Ruble",currency_code:"BYN",currency_symbol:"Br"},{name:"Belgium",dial_code:"+32",code:"BE",flag:"🇧🇪",local_name:"België",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Belize",dial_code:"+501",code:"BZ",flag:"🇧🇿",local_name:"Belize",currency:"Belize Dollar",currency_code:"BZD",currency_symbol:"$"},{name:"Benin",dial_code:"+229",code:"BJ",flag:"🇧🇯",local_name:"Bénin",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Bermuda",dial_code:"+1441",code:"BM",flag:"🇧🇲",part_of:["GB"],local_name:"Bermuda",currency:"Bermudian Dollar",currency_code:"BMD",currency_symbol:"$"},{name:"Bhutan",dial_code:"+975",code:"BT",flag:"🇧🇹",local_name:"འབྲུག་ཡུལ",currency:"Bhutanese Ngultrum",currency_code:"BTN",currency_symbol:"Nu."},{name:"Bolivia, Plurinational State of",dial_code:"+591",code:"BO",flag:"🇧🇴",local_name:"Bolivia",currency:"Bolivian Boliviano",currency_code:"BOB",currency_symbol:"Bs."},{name:"Bosnia and Herzegovina",dial_code:"+387",code:"BA",flag:"🇧🇦",local_name:"Bosna i Hercegovina",currency:"Bosnia and Herzegovina Convertible Mark",currency_code:"BAM",currency_symbol:"KM"},{name:"Botswana",dial_code:"+267",code:"BW",flag:"🇧🇼",local_name:"Botswana",currency:"Botswana Pula",currency_code:"BWP",currency_symbol:"P"},{name:"Brazil",dial_code:"+55",code:"BR",flag:"🇧🇷",local_name:"Brasil",currency:"Brazilian Real",currency_code:"BRL",currency_symbol:"R$"},{name:"British Indian Ocean Territory",dial_code:"+246",code:"IO",flag:"🇮🇴",part_of:["GB"],currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Brunei Darussalam",dial_code:"+673",code:"BN",flag:"🇧🇳",local_name:"بروني",currency:"Brunei Dollar",currency_code:"BND",currency_symbol:"$"},{name:"Bulgaria",dial_code:"+359",code:"BG",flag:"🇧🇬",local_name:"България",currency:"Bulgarian Lev",currency_code:"BGN",currency_symbol:"лв"},{name:"Burkina Faso",dial_code:"+226",code:"BF",flag:"🇧🇫",local_name:"Burkina Faso",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Burundi",dial_code:"+257",code:"BI",flag:"🇧🇮",local_name:"Burundi",currency:"Burundian Franc",currency_code:"BIF",currency_symbol:"FBu"},{name:"Cambodia",dial_code:"+855",code:"KH",flag:"🇰🇭",local_name:"កម្ពុជា",currency:"Cambodian Riel",currency_code:"KHR",currency_symbol:"៛"},{name:"Cameroon",dial_code:"+237",code:"CM",flag:"🇨🇲",local_name:"Cameroun",currency:"Central African CFA Franc",currency_code:"XAF",currency_symbol:"FCFA"},{name:"Canada",dial_code:"+1",code:"CA",flag:"🇨🇦",local_name:"Canada",currency:"Canadian Dollar",currency_code:"CAD",currency_symbol:"$"},{name:"Cape Verde",dial_code:"+238",code:"CV",flag:"🇨🇻",local_name:"Cabo Verde",currency:"Cape Verdean Escudo",currency_code:"CVE",currency_symbol:"$"},{name:"Cayman Islands",dial_code:"+1345",code:"KY",flag:"🇰🇾",part_of:["GB"],local_name:"Cayman Islands",currency:"Cayman Islands Dollar",currency_code:"KYD",currency_symbol:"$"},{name:"Central African Republic",dial_code:"+236",code:"CF",flag:"🇨🇫",local_name:"République centrafricaine",currency:"Central African CFA Franc",currency_code:"XAF",currency_symbol:"FCFA"},{name:"Chad",dial_code:"+235",code:"TD",flag:"🇹🇩",local_name:"Tchad",currency:"Central African CFA Franc",currency_code:"XAF",currency_symbol:"FCFA"},{name:"Chile",dial_code:"+56",code:"CL",flag:"🇨🇱",local_name:"Chile",currency:"Chilean Peso",currency_code:"CLP",currency_symbol:"$"},{name:"China",dial_code:"+86",code:"CN",flag:"🇨🇳",local_name:"中国",currency:"Chinese Yuan",currency_code:"CNY",currency_symbol:"¥"},{name:"Christmas Island",dial_code:"+61",code:"CX",flag:"🇨🇽",part_of:["AU"],local_name:"Christmas Island",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"Cocos (Keeling) Islands",dial_code:"+61",code:"CC",flag:"🇨🇨",part_of:["AU"],local_name:"Cocos (Keeling) Islands",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"Colombia",dial_code:"+57",code:"CO",flag:"🇨🇴",local_name:"Colombia",currency:"Colombian Peso",currency_code:"COP",currency_symbol:"$"},{name:"Comoros",dial_code:"+269",code:"KM",flag:"🇰🇲",local_name:"جزر القمر",currency:"Comorian Franc",currency_code:"KMF",currency_symbol:"CF"},{name:"Congo",dial_code:"+242",code:"CG",flag:"🇨🇬",local_name:"République du Congo",currency:"Central African CFA Franc",currency_code:"XAF",currency_symbol:"FCFA"},{name:"Congo, The Democratic Republic of the",dial_code:"+243",code:"CD",flag:"🇨🇩",local_name:"République démocratique du Congo",currency:"Congolese Franc",currency_code:"CDF",currency_symbol:"FC"},{name:"Cook Islands",dial_code:"+682",code:"CK",flag:"🇨🇰",local_name:"Cook Islands",currency:"New Zealand Dollar",currency_code:"NZD",currency_symbol:"$"},{name:"Costa Rica",dial_code:"+506",code:"CR",flag:"🇨🇷",local_name:"Costa Rica",currency:"Costa Rican Colón",currency_code:"CRC",currency_symbol:"₡"},{name:"Cote d'Ivoire",dial_code:"+225",code:"CI",flag:"🇨🇮",local_name:"Côte d'Ivoire",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Croatia",dial_code:"+385",code:"HR",flag:"🇭🇷",local_name:"Hrvatska",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Cuba",dial_code:"+53",code:"CU",flag:"🇨🇺",local_name:"Cuba",currency:"Cuban Peso",currency_code:"CUP",currency_symbol:"$"},{name:"Curaçao",dial_code:"+599",code:"CW",flag:"🇨🇼",part_of:["NL"],local_name:"Curaçao",currency:"Netherlands Antillean Guilder",currency_code:"ANG",currency_symbol:"ƒ"},{name:"Cyprus",dial_code:"+357",code:"CY",flag:"🇨🇾",local_name:"Κύπρος",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Czechia",dial_code:"+420",code:"CZ",flag:"🇨🇿",local_name:"Česko",currency:"Czech Koruna",currency_code:"CZK",currency_symbol:"Kč"},{name:"Canary Islands",dial_code:"+34",code:"IC",flag:"🇮🇨",part_of:["ES"],local_name:"Islas Canarias",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Denmark",dial_code:"+45",code:"DK",flag:"🇩🇰",local_name:"Danmark",currency:"Danish Krone",currency_code:"DKK",currency_symbol:"kr"},{name:"Djibouti",dial_code:"+253",code:"DJ",flag:"🇩🇯",local_name:"جيبوتي",currency:"Djiboutian Franc",currency_code:"DJF",currency_symbol:"Fdj"},{name:"Dominica",dial_code:"+1767",code:"DM",flag:"🇩🇲",local_name:"Dominica",currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Dominican Republic",dial_code:"+1849",code:"DO",flag:"🇩🇴",local_name:"República Dominicana",currency:"Dominican Peso",currency_code:"DOP",currency_symbol:"$",country_code:"+1",area_codes:["849","829","809"]},{name:"Dominican Republic",dial_code:"+1829",code:"DO",flag:"🇩🇴",secondary:!0,local_name:"República Dominicana",currency:"Dominican Peso",currency_code:"DOP",currency_symbol:"$"},{name:"Dominican Republic",dial_code:"+1809",code:"DO",flag:"🇩🇴",secondary:!0,local_name:"República Dominicana",currency:"Dominican Peso",currency_code:"DOP",currency_symbol:"$"},{name:"Ecuador",dial_code:"+593",code:"EC",flag:"🇪🇨",local_name:"Ecuador",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Egypt",dial_code:"+20",code:"EG",flag:"🇪🇬",local_name:"مصر",currency:"Egyptian Pound",currency_code:"EGP",currency_symbol:"E£"},{name:"El Salvador",dial_code:"+503",code:"SV",flag:"🇸🇻",local_name:"El Salvador",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Equatorial Guinea",dial_code:"+240",code:"GQ",flag:"🇬🇶",local_name:"Guinea Ecuatorial",currency:"Central African CFA Franc",currency_code:"XAF",currency_symbol:"FCFA"},{name:"Eritrea",dial_code:"+291",code:"ER",flag:"🇪🇷",local_name:"ኤርትራ",currency:"Eritrean Nakfa",currency_code:"ERN",currency_symbol:"Nfk"},{name:"Estonia",dial_code:"+372",code:"EE",flag:"🇪🇪",local_name:"Eesti",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Eswatini",dial_code:"+268",code:"SZ",flag:"🇸🇿",local_name:"eSwatini",currency:"Swazi Lilangeni",currency_code:"SZL",currency_symbol:"L"},{name:"Ethiopia",dial_code:"+251",code:"ET",flag:"🇪🇹",local_name:"ኢትዮጵያ",currency:"Ethiopian Birr",currency_code:"ETB",currency_symbol:"Br"},{name:"Falkland Islands (Malvinas)",dial_code:"+500",code:"FK",flag:"🇫🇰",part_of:["GB"],local_name:"Falkland Islands",currency:"Falkland Islands Pound",currency_code:"FKP",currency_symbol:"£"},{name:"Faroe Islands",dial_code:"+298",code:"FO",flag:"🇫🇴",part_of:["DK"],local_name:"Føroyar",currency:"Faroese Króna",currency_code:"DKK",currency_symbol:"kr"},{name:"Fiji",dial_code:"+679",code:"FJ",flag:"🇫🇯",local_name:"Fiji",currency:"Fijian Dollar",currency_code:"FJD",currency_symbol:"$"},{name:"Finland",dial_code:"+358",code:"FI",flag:"🇫🇮",local_name:"Suomi",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"France",dial_code:"+33",code:"FR",flag:"🇫🇷",local_name:"France",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"French Guiana",dial_code:"+594",code:"GF",flag:"🇬🇫",part_of:["FR"],local_name:"Guyane française",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"French Polynesia",dial_code:"+689",code:"PF",flag:"🇵🇫",part_of:["FR"],local_name:"Polynésie française",currency:"CFP Franc",currency_code:"XPF",currency_symbol:"₣"},{name:"French Southern Territories",dial_code:"+262",code:"TF",flag:"🇹🇫",part_of:["FR"],local_name:"Terres australes françaises",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Gabon",dial_code:"+241",code:"GA",flag:"🇬🇦",local_name:"Gabon",currency:"Central African CFA Franc",currency_code:"XAF",currency_symbol:"FCFA"},{name:"Gambia",dial_code:"+220",code:"GM",flag:"🇬🇲",local_name:"The Gambia",currency:"Gambian Dalasi",currency_code:"GMD",currency_symbol:"D"},{name:"Georgia",dial_code:"+995",code:"GE",flag:"🇬🇪",local_name:"საქართველო",currency:"Georgian Lari",currency_code:"GEL",currency_symbol:"₾"},{name:"Germany",dial_code:"+49",code:"DE",flag:"🇩🇪",local_name:"Deutschland",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Ghana",dial_code:"+233",code:"GH",flag:"🇬🇭",local_name:"Ghana",currency:"Ghanaian Cedi",currency_code:"GHS",currency_symbol:"₵"},{name:"Gibraltar",dial_code:"+350",code:"GI",flag:"🇬🇮",part_of:["GB"],local_name:"Gibraltar",currency:"Gibraltar Pound",currency_code:"GIP",currency_symbol:"£"},{name:"Greece",dial_code:"+30",code:"GR",flag:"🇬🇷",local_name:"Ελλάς",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Greenland",dial_code:"+299",code:"GL",flag:"🇬🇱",part_of:["DK"],local_name:"Kalaallit Nunaat",currency:"Danish Krone",currency_code:"DKK",currency_symbol:"kr"},{name:"Grenada",dial_code:"+1473",code:"GD",flag:"🇬🇩",local_name:"Grenada",currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Guadeloupe",dial_code:"+590",code:"GP",flag:"🇬🇵",part_of:["FR"],local_name:"Guadeloupe",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Guam",dial_code:"+1671",code:"GU",flag:"🇬🇺",part_of:["US"],local_name:"Guam",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Guatemala",dial_code:"+502",code:"GT",flag:"🇬🇹",local_name:"Guatemala",currency:"Guatemalan Quetzal",currency_code:"GTQ",currency_symbol:"Q"},{name:"Guernsey",dial_code:"+44",code:"GG",flag:"🇬🇬",part_of:["GB"],local_name:"Guernsey",currency:"Guernsey Pound",currency_code:"GGP",currency_symbol:"£"},{name:"Guinea",dial_code:"+224",code:"GN",flag:"🇬🇳",local_name:"Guinée",currency:"Guinean Franc",currency_code:"GNF",currency_symbol:"FG"},{name:"Guinea-Bissau",dial_code:"+245",code:"GW",flag:"🇬🇼",local_name:"Guiné-Bissau",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Guyana",dial_code:"+592",code:"GY",flag:"🇬🇾",local_name:"Guyana",currency:"Guyanese Dollar",currency_code:"GYD",currency_symbol:"$"},{name:"Haiti",dial_code:"+509",code:"HT",flag:"🇭🇹",local_name:"Haïti",currency:"Haitian Gourde",currency_code:"HTG",currency_symbol:"G"},{name:"Heard & McDonald Islands",dial_code:"+672",code:"HM",flag:"🇭🇲",part_of:["AU"],local_name:"Heard & McDonald Islands",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"Holy See (Vatican City State)",dial_code:"+379",code:"VA",flag:"🇻🇦",local_name:"Città del Vaticano",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Honduras",dial_code:"+504",code:"HN",flag:"🇭🇳",local_name:"Honduras",currency:"Honduran Lempira",currency_code:"HNL",currency_symbol:"L"},{name:"Hong Kong",dial_code:"+852",code:"HK",flag:"🇭🇰",local_name:"香港",part_of:["CN"],currency:"Hong Kong Dollar",currency_code:"HKD",currency_symbol:"$"},{name:"Hungary",dial_code:"+36",code:"HU",flag:"🇭🇺",local_name:"Magyarország",currency:"Hungarian Forint",currency_code:"HUF",currency_symbol:"Ft"},{name:"Iceland",dial_code:"+354",code:"IS",flag:"🇮🇸",local_name:"Ísland",currency:"Icelandic Króna",currency_code:"ISK",currency_symbol:"kr"},{name:"India",dial_code:"+91",code:"IN",preferred:!0,flag:"🇮🇳",local_name:"भारत",currency:"Indian Rupee",currency_code:"INR",currency_symbol:"₹"},{name:"Indonesia",dial_code:"+62",code:"ID",flag:"🇮🇩",local_name:"Indonesia",currency:"Indonesian Rupiah",currency_code:"IDR",currency_symbol:"Rp"},{name:"Iran, Islamic Republic of",dial_code:"+98",code:"IR",flag:"🇮🇷",local_name:"ایران",currency:"Iranian Rial",currency_code:"IRR",currency_symbol:"﷼"},{name:"Iraq",dial_code:"+964",code:"IQ",flag:"🇮🇶",local_name:"العراق",currency:"Iraqi Dinar",currency_code:"IQD",currency_symbol:"ع.د"},{name:"Ireland",dial_code:"+353",code:"IE",flag:"🇮🇪",local_name:"Éire",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Isle of Man",dial_code:"+44",code:"IM",flag:"🇮🇲",part_of:["GB"],local_name:"Isle of Man",currency:"Manx Pound",currency_code:"IMP",currency_symbol:"£"},{name:"Israel",dial_code:"+972",code:"IL",flag:"🇮",local_name:"ישראל",currency:"Israeli New Shekel",currency_code:"ILS",currency_symbol:"₪"},{name:"Italy",dial_code:"+39",code:"IT",flag:"🇮🇹",local_name:"Italia",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Jamaica",dial_code:"+1876",code:"JM",flag:"🇯🇲",local_name:"Jamaica",currency:"Jamaican Dollar",currency_code:"JMD",currency_symbol:"$",country_code:"+1",area_codes:["876","658"]},{name:"Jamaica",dial_code:"+1658",code:"JM",flag:"🇯🇲",secondary:!0,local_name:"Jamaica",currency:"Jamaican Dollar",currency_code:"JMD",currency_symbol:"$"},{name:"Japan",dial_code:"+81",code:"JP",flag:"🇯🇵",local_name:"日本",currency:"Japanese Yen",currency_code:"JPY",currency_symbol:"¥"},{name:"Jersey",dial_code:"+44",code:"JE",flag:"🇯🇪",part_of:["GB"],local_name:"Jersey",currency:"Jersey Pound",currency_code:"JEP",currency_symbol:"£"},{name:"Jordan",dial_code:"+962",code:"JO",flag:"🇯🇴",local_name:"الأردن",currency:"Jordanian Dinar",currency_code:"JOD",currency_symbol:"د.ا"},{name:"Kazakhstan",dial_code:"+77",code:"KZ",flag:"🇰🇿",local_name:"Қазақстан",currency:"Kazakhstani Tenge",currency_code:"KZT",currency_symbol:"₸"},{name:"Kenya",dial_code:"+254",code:"KE",flag:"🇰🇪",local_name:"Kenya",currency:"Kenyan Shilling",currency_code:"KES",currency_symbol:"KSh"},{name:"Kiribati",dial_code:"+686",code:"KI",flag:"🇰🇮",local_name:"Kiribati",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"Korea, Democratic People's Republic of",dial_code:"+850",code:"KP",flag:"🇰🇵",local_name:"조선민주주의인민공화국",currency:"North Korean Won",currency_code:"KPW",currency_symbol:"₩"},{name:"Korea, Republic of",dial_code:"+82",code:"KR",flag:"🇰🇷",local_name:"대한민국",currency:"South Korean Won",currency_code:"KRW",currency_symbol:"₩"},{name:"Kuwait",dial_code:"+965",code:"KW",flag:"🇰🇼",local_name:"الكويت",currency:"Kuwaiti Dinar",currency_code:"KWD",currency_symbol:"د.ك"},{name:"Kyrgyzstan",dial_code:"+996",code:"KG",flag:"🇰🇬",local_name:"Кыргызстан",currency:"Kyrgyzstani Som",currency_code:"KGS",currency_symbol:"с"},{name:"Kosovo",dial_code:"+383",code:"XK",flag:"🇽🇰",local_name:"Kosova",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Lao People's Democratic Republic",dial_code:"+856",code:"LA",flag:"🇱🇦",local_name:"ປະເທດລາວ",currency:"Lao Kip",currency_code:"LAK",currency_symbol:"₭"},{name:"Latvia",dial_code:"+371",code:"LV",flag:"🇱🇻",local_name:"Latvija",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Lebanon",dial_code:"+961",code:"LB",flag:"🇱🇧",local_name:"لبنان",currency:"Lebanese Pound",currency_code:"LBP",currency_symbol:"ل.ل"},{name:"Lesotho",dial_code:"+266",code:"LS",flag:"🇱🇸",local_name:"Lesotho",currency:"Lesotho Loti",currency_code:"LSL",currency_symbol:"L"},{name:"Liberia",dial_code:"+231",code:"LR",flag:"🇱🇷",local_name:"Liberia",currency:"Liberian Dollar",currency_code:"LRD",currency_symbol:"$"},{name:"Libya",dial_code:"+218",code:"LY",flag:"🇱🇾",local_name:"ليبيا",currency:"Libyan Dinar",currency_code:"LYD",currency_symbol:"ل.د"},{name:"Liechtenstein",dial_code:"+423",code:"LI",flag:"🇱🇮",local_name:"Liechtenstein",currency:"Swiss Franc",currency_code:"CHF",currency_symbol:"Fr."},{name:"Lithuania",dial_code:"+370",code:"LT",flag:"🇱🇹",local_name:"Lietuva",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Luxembourg",dial_code:"+352",code:"LU",flag:"🇱🇺",local_name:"Luxembourg",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Macao",dial_code:"+853",code:"MO",flag:"🇲🇴",part_of:["CN"],local_name:"澳門",currency:"Macanese Pataca",currency_code:"MOP",currency_symbol:"MOP$"},{name:"Madagascar",dial_code:"+261",code:"MG",flag:"🇲🇬",local_name:"Madagasikara",currency:"Malagasy Ariary",currency_code:"MGA",currency_symbol:"Ar"},{name:"Malawi",dial_code:"+265",code:"MW",flag:"🇲🇼",local_name:"Malawi",currency:"Malawian Kwacha",currency_code:"MWK",currency_symbol:"MK"},{name:"Malaysia",dial_code:"+60",code:"MY",flag:"🇲🇾",local_name:"Malaysia",currency:"Malaysian Ringgit",currency_code:"MYR",currency_symbol:"RM"},{name:"Maldives",dial_code:"+960",code:"MV",flag:"🇲🇻",local_name:"ދިވެހިރާއްޖެ",currency:"Maldivian Rufiyaa",currency_code:"MVR",currency_symbol:"Rf"},{name:"Mali",dial_code:"+223",code:"ML",flag:"🇲🇱",local_name:"Mali",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Malta",dial_code:"+356",code:"MT",flag:"🇲🇹",local_name:"Malta",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Marshall Islands",dial_code:"+692",code:"MH",flag:"🇲🇭",local_name:"Marshall Islands",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Martinique",dial_code:"+596",code:"MQ",flag:"🇲🇶",part_of:["FR"],local_name:"Martinique",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Mauritania",dial_code:"+222",code:"MR",flag:"🇲🇷",local_name:"موريتانيا",currency:"Mauritanian Ouguiya",currency_code:"MRU",currency_symbol:"UM"},{name:"Mauritius",dial_code:"+230",code:"MU",flag:"🇲🇺",local_name:"Moris",currency:"Mauritian Rupee",currency_code:"MUR",currency_symbol:"₨"},{name:"Mayotte",dial_code:"+262",code:"YT",flag:"🇾🇹",part_of:["FR"],local_name:"Mayotte",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Mexico",dial_code:"+52",code:"MX",flag:"🇲🇽",local_name:"México",currency:"Mexican Peso",currency_code:"MXN",currency_symbol:"$"},{name:"Micronesia, Federated States of",dial_code:"+691",code:"FM",flag:"🇫🇲",local_name:"Micronesia",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Moldova, Republic of",dial_code:"+373",code:"MD",flag:"🇲🇩",local_name:"Moldova",currency:"Moldovan Leu",currency_code:"MDL",currency_symbol:"L"},{name:"Monaco",dial_code:"+377",code:"MC",flag:"🇲🇨",local_name:"Monaco",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Mongolia",dial_code:"+976",code:"MN",flag:"🇲🇳",local_name:"Монгол улс",currency:"Mongolian Tögrög",currency_code:"MNT",currency_symbol:"₮"},{name:"Montenegro",dial_code:"+382",code:"ME",flag:"🇲🇪",local_name:"Crna Gora",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Montserrat",dial_code:"+1664",code:"MS",flag:"🇲🇸",local_name:"Montserrat",currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Morocco",dial_code:"+212",code:"MA",flag:"🇲🇦",local_name:"المغرب",currency:"Moroccan Dirham",currency_code:"MAD",currency_symbol:"د.م."},{name:"Mozambique",dial_code:"+258",code:"MZ",flag:"🇲🇿",local_name:"Moçambique",currency:"Mozambican Metical",currency_code:"MZN",currency_symbol:"MT"},{name:"Myanmar",dial_code:"+95",code:"MM",flag:"🇲🇲",local_name:"မြန်မာ",currency:"Myanmar Kyat",currency_code:"MMK",currency_symbol:"K"},{name:"Namibia",dial_code:"+264",code:"NA",flag:"🇳🇦",local_name:"Namibia",currency:"Namibian Dollar",currency_code:"NAD",currency_symbol:"$"},{name:"Nauru",dial_code:"+674",code:"NR",flag:"🇳🇷",local_name:"Nauru",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"Nepal",dial_code:"+977",code:"NP",flag:"🇳🇵",local_name:"नेपाल",currency:"Nepalese Rupee",currency_code:"NPR",currency_symbol:"₨"},{name:"Netherlands",dial_code:"+31",code:"NL",flag:"🇳🇱",local_name:"Nederland",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Caribbean Netherlands",dial_code:"+599",code:"BQ",flag:"🇧🇶",part_of:["NL"],local_name:"Caribisch Nederland",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"New Caledonia",dial_code:"+687",code:"NC",flag:"🇳🇨",part_of:["FR"],local_name:"Nouvelle-Calédonie",currency:"CFP Franc",currency_code:"XPF",currency_symbol:"₣"},{name:"New Zealand",dial_code:"+64",code:"NZ",flag:"🇳🇿",local_name:"New Zealand",currency:"New Zealand Dollar",currency_code:"NZD",currency_symbol:"$"},{name:"Nicaragua",dial_code:"+505",code:"NI",flag:"🇳🇮",local_name:"Nicaragua",currency:"Nicaraguan Córdoba",currency_code:"NIO",currency_symbol:"C$"},{name:"Niger",dial_code:"+227",code:"NE",flag:"🇳🇪",local_name:"Niger",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Nigeria",dial_code:"+234",code:"NG",flag:"🇳🇬",local_name:"Nigeria",currency:"Nigerian Naira",currency_code:"NGN",currency_symbol:"₦"},{name:"Niue",dial_code:"+683",code:"NU",flag:"🇳🇺",local_name:"Niuē",currency:"New Zealand Dollar",currency_code:"NZD",currency_symbol:"$"},{name:"Norfolk Island",dial_code:"+672",code:"NF",flag:"🇳🇫",part_of:["AU"],local_name:"Norfolk Island",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"North Macedonia",dial_code:"+389",code:"MK",flag:"🇲🇰",local_name:"Северна Македонија",currency:"Macedonian Denar",currency_code:"MKD",currency_symbol:"ден"},{name:"Northern Mariana Islands",dial_code:"+1670",code:"MP",flag:"🇲🇵",part_of:["US"],local_name:"Northern Mariana Islands",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Norway",dial_code:"+47",code:"NO",flag:"🇳🇴",local_name:"Norge",currency:"Norwegian Krone",currency_code:"NOK",currency_symbol:"kr"},{name:"Oman",dial_code:"+968",code:"OM",flag:"🇴🇲",local_name:"عُمان",currency:"Omani Rial",currency_code:"OMR",currency_symbol:"ر.ع."},{name:"Pakistan",dial_code:"+92",code:"PK",flag:"🇵🇰",local_name:"پاکستان",currency:"Pakistani Rupee",currency_code:"PKR",currency_symbol:"₨"},{name:"Palau",dial_code:"+680",code:"PW",flag:"🇵🇼",local_name:"Palau",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Palestine, State of",dial_code:"+970",code:"PS",flag:"🇵🇸",local_name:"فلسطين",currency:"Israeli New Shekel",currency_code:"ILS",currency_symbol:"₪"},{name:"Panama",dial_code:"+507",code:"PA",flag:"🇵🇦",local_name:"Panamá",currency:"Panamanian Balboa",currency_code:"PAB",currency_symbol:"B/."},{name:"Papua New Guinea",dial_code:"+675",code:"PG",flag:"🇵🇬",local_name:"Papua New Guinea",currency:"Papua New Guinean Kina",currency_code:"PGK",currency_symbol:"K"},{name:"Paraguay",dial_code:"+595",code:"PY",flag:"🇵🇾",local_name:"Paraguay",currency:"Paraguayan Guaraní",currency_code:"PYG",currency_symbol:"₲"},{name:"Peru",dial_code:"+51",code:"PE",flag:"🇵🇪",local_name:"Perú",currency:"Peruvian Sol",currency_code:"PEN",currency_symbol:"S/."},{name:"Philippines",dial_code:"+63",code:"PH",flag:"🇵🇭",local_name:"Pilipinas",currency:"Philippine Peso",currency_code:"PHP",currency_symbol:"₱"},{name:"Pitcairn",dial_code:"+872",code:"PN",flag:"🇵🇳",part_of:["GB"],local_name:"Pitcairn Islands",currency:"New Zealand Dollar",currency_code:"NZD",currency_symbol:"$"},{name:"Poland",dial_code:"+48",code:"PL",flag:"🇵🇱",local_name:"Polska",currency:"Polish Złoty",currency_code:"PLN",currency_symbol:"zł"},{name:"Portugal",dial_code:"+351",code:"PT",flag:"🇵🇹",local_name:"Portugal",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Puerto Rico",dial_code:"+1939",code:"PR",flag:"🇵🇷",country_code:"+1",area_codes:["939","787"],part_of:["US"],currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Puerto Rico",dial_code:"+1787",code:"PR",flag:"🇵🇷",secondary:!0,part_of:["US"],currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Qatar",dial_code:"+974",code:"QA",flag:"🇶🇦",local_name:"قطر",currency:"Qatari Riyal",currency_code:"QAR",currency_symbol:"ر.ق"},{name:"Romania",dial_code:"+40",code:"RO",flag:"🇷🇴",local_name:"România",currency:"Romanian Leu",currency_code:"RON",currency_symbol:"lei"},{name:"Russia",dial_code:"+7",code:"RU",flag:"🇷🇺",local_name:"Россия",currency:"Russian Ruble",currency_code:"RUB",currency_symbol:"₽"},{name:"Rwanda",dial_code:"+250",code:"RW",flag:"🇷🇼",local_name:"Rwanda",currency:"Rwandan Franc",currency_code:"RWF",currency_symbol:"FRw"},{name:"Réunion",dial_code:"+262",code:"RE",flag:"🇷🇪",part_of:["FR"],local_name:"La Réunion",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Saint Barthélemy",dial_code:"+590",code:"BL",flag:"🇧🇱",part_of:["FR"],local_name:"Saint-Barthélemy",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Saint Helena, Ascension and Tristan Da Cunha",dial_code:"+290",code:"SH",flag:"🇸🇭",part_of:["GB"],local_name:"Saint Helena",currency:"Saint Helena Pound",currency_code:"SHP",currency_symbol:"£"},{name:"Saint Kitts and Nevis",dial_code:"+1869",code:"KN",flag:"🇰🇳",local_name:"Saint Kitts and Nevis",currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Saint Lucia",dial_code:"+1758",code:"LC",flag:"🇱🇨",local_name:"Saint Lucia",currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Saint Martin",dial_code:"+590",code:"MF",flag:"🇲🇫",part_of:["FR"],local_name:"Saint-Martin",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Saint Pierre and Miquelon",dial_code:"+508",code:"PM",flag:"🇵🇲",part_of:["FR"],local_name:"Saint-Pierre-et-Miquelon",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Saint Vincent and the Grenadines",dial_code:"+1784",code:"VC",flag:"🇻🇨",local_name:"Saint Vincent and the Grenadines",currency:"East Caribbean Dollar",currency_code:"XCD",currency_symbol:"$"},{name:"Samoa",dial_code:"+685",code:"WS",flag:"🇼🇸",local_name:"Samoa",currency:"Samoan Tālā",currency_code:"WST",currency_symbol:"T"},{name:"San Marino",dial_code:"+378",code:"SM",flag:"🇸🇲",local_name:"San Marino",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Sao Tome and Principe",dial_code:"+239",code:"ST",flag:"🇸🇹",local_name:"São Tomé e Príncipe",currency:"São Tomé and Príncipe Dobra",currency_code:"STN",currency_symbol:"Db"},{name:"Saudi Arabia",dial_code:"+966",code:"SA",flag:"🇸🇦",local_name:"المملكة العربية السعودية",currency:"Saudi Riyal",currency_code:"SAR",currency_symbol:"ر.س"},{name:"Senegal",dial_code:"+221",code:"SN",flag:"🇸🇳",local_name:"Sénégal",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Serbia",dial_code:"+381",code:"RS",flag:"🇷🇸",local_name:"Србија",currency:"Serbian Dinar",currency_code:"RSD",currency_symbol:"дин."},{name:"Seychelles",dial_code:"+248",code:"SC",flag:"🇸🇨",local_name:"Seychelles",currency:"Seychellois Rupee",currency_code:"SCR",currency_symbol:"₨"},{name:"Sierra Leone",dial_code:"+232",code:"SL",flag:"🇸🇱",local_name:"Sierra Leone",currency:"Sierra Leonean Leone",currency_code:"SLL",currency_symbol:"Le"},{name:"Singapore",dial_code:"+65",code:"SG",flag:"🇸🇬",local_name:"Singapore",currency:"Singapore Dollar",currency_code:"SGD",currency_symbol:"$"},{name:"Sint Maarten",dial_code:"+1721",code:"SX",flag:"🇸🇽",part_of:["NL"],local_name:"Sint Maarten",currency:"Netherlands Antillean Guilder",currency_code:"ANG",currency_symbol:"ƒ"},{name:"Slovakia",dial_code:"+421",code:"SK",flag:"🇸🇰",local_name:"Slovensko",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Slovenia",dial_code:"+386",code:"SI",flag:"🇸🇮",local_name:"Slovenija",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Solomon Islands",dial_code:"+677",code:"SB",flag:"🇸🇧",local_name:"Solomon Islands",currency:"Solomon Islands Dollar",currency_code:"SBD",currency_symbol:"$"},{name:"Somalia",dial_code:"+252",code:"SO",flag:"🇸🇴",local_name:"الصومال",currency:"Somali Shilling",currency_code:"SOS",currency_symbol:"Sh.So."},{name:"South Africa",dial_code:"+27",code:"ZA",flag:"🇿🇦",local_name:"South Africa",currency:"South African Rand",currency_code:"ZAR",currency_symbol:"R"},{name:"South Georgia and the South Sandwich Islands",dial_code:"+500",code:"GS",flag:"🇬🇸",part_of:["GB"],local_name:"South Georgia",currency:"British Pound",currency_code:"GBP",currency_symbol:"£"},{name:"South Sudan",dial_code:"+211",code:"SS",flag:"🇸🇸",local_name:"South Sudan",currency:"South Sudanese Pound",currency_code:"SSP",currency_symbol:"£"},{name:"Spain",dial_code:"+34",code:"ES",flag:"🇪🇸",local_name:"España",currency:"Euro",currency_code:"EUR",currency_symbol:"€"},{name:"Sri Lanka",dial_code:"+94",code:"LK",flag:"🇱🇰",local_name:"ශ්‍රී ලංකාව",currency:"Sri Lankan Rupee",currency_code:"LKR",currency_symbol:"₨"},{name:"Sudan",dial_code:"+249",code:"SD",flag:"🇸🇩",local_name:"السودان",currency:"Sudanese Pound",currency_code:"SDG",currency_symbol:"ج.س."},{name:"Suriname",dial_code:"+597",code:"SR",flag:"🇸🇷",local_name:"Suriname",currency:"Surinamese Dollar",currency_code:"SRD",currency_symbol:"$"},{name:"Svalbard and Jan Mayen",dial_code:"+47",code:"SJ",flag:"🇸🇯",part_of:["NO"],local_name:"Svalbard og Jan Mayen",currency:"Norwegian Krone",currency_code:"NOK",currency_symbol:"kr"},{name:"Sweden",dial_code:"+46",code:"SE",flag:"🇸🇪",local_name:"Sverige",currency:"Swedish Krona",currency_code:"SEK",currency_symbol:"kr"},{name:"Switzerland",dial_code:"+41",code:"CH",flag:"🇨🇭",local_name:"Schweiz",currency:"Swiss Franc",currency_code:"CHF",currency_symbol:"Fr."},{name:"Syrian Arab Republic",dial_code:"+963",code:"SY",flag:"🇸🇾",local_name:"سورية",currency:"Syrian Pound",currency_code:"SYP",currency_symbol:"£S"},{name:"Taiwan, Province of China",dial_code:"+886",code:"TW",flag:"🇹🇼",local_name:"台灣",currency:"New Taiwan Dollar",currency_code:"TWD",currency_symbol:"NT$"},{name:"Tajikistan",dial_code:"+992",code:"TJ",flag:"🇹🇯",local_name:"Тоҷикистон",currency:"Tajikistani Somoni",currency_code:"TJS",currency_symbol:"ЅМ"},{name:"Tanzania, United Republic of",dial_code:"+255",code:"TZ",flag:"🇹🇿",local_name:"Tanzania",currency:"Tanzanian Shilling",currency_code:"TZS",currency_symbol:"TSh"},{name:"Thailand",dial_code:"+66",code:"TH",flag:"🇹🇭",local_name:"ประเทศไทย",currency:"Thai Baht",currency_code:"THB",currency_symbol:"฿"},{name:"Timor-Leste",dial_code:"+670",code:"TL",flag:"🇹🇱",local_name:"Timor-Leste",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Togo",dial_code:"+228",code:"TG",flag:"🇹🇬",local_name:"Togo",currency:"West African CFA Franc",currency_code:"XOF",currency_symbol:"CFA"},{name:"Tokelau",dial_code:"+690",code:"TK",flag:"🇹🇰",local_name:"Tokelau",currency:"New Zealand Dollar",currency_code:"NZD",currency_symbol:"$"},{name:"Tonga",dial_code:"+676",code:"TO",flag:"🇹🇴",local_name:"Tonga",currency:"Tongan Paʻanga",currency_code:"TOP",currency_symbol:"T$"},{name:"Trinidad and Tobago",dial_code:"+1868",code:"TT",flag:"🇹🇹",local_name:"Trinidad and Tobago",currency:"Trinidad and Tobago Dollar",currency_code:"TTD",currency_symbol:"$"},{name:"Tunisia",dial_code:"+216",code:"TN",flag:"🇹🇳",local_name:"تونس",currency:"Tunisian Dinar",currency_code:"TND",currency_symbol:"د.ت"},{name:"Turkey",dial_code:"+90",code:"TR",flag:"🇹🇷",local_name:"Türkiye",currency:"Turkish Lira",currency_code:"TRY",currency_symbol:"₺"},{name:"Türkiye",dial_code:"+90",code:"TR",flag:"🇹🇷",local_name:"Türkiye",currency:"Turkish Lira",currency_code:"TRY",currency_symbol:"₺",secondary:!0},{name:"Turkmenistan",dial_code:"+993",code:"TM",flag:"🇹🇲",local_name:"Türkmenistan",currency:"Turkmenistan Manat",currency_code:"TMT",currency_symbol:"m"},{name:"Turks and Caicos Islands",dial_code:"+1649",code:"TC",flag:"🇹🇨",part_of:["GB"],local_name:"Turks and Caicos Islands",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Tuvalu",dial_code:"+688",code:"TV",flag:"🇹🇻",local_name:"Tuvalu",currency:"Australian Dollar",currency_code:"AUD",currency_symbol:"$"},{name:"Uganda",dial_code:"+256",code:"UG",flag:"🇺🇬",local_name:"Uganda",currency:"Ugandan Shilling",currency_code:"UGX",currency_symbol:"USh"},{name:"Ukraine",dial_code:"+380",code:"UA",flag:"🇺🇦",local_name:"Україна",currency:"Ukrainian Hryvnia",currency_code:"UAH",currency_symbol:"₴"},{name:"United Arab Emirates",dial_code:"+971",code:"AE",preferred:!0,flag:"🇦🇪",local_name:"الإمارات العربية المتحدة",currency:"UAE Dirham",currency_code:"AED",currency_symbol:"د.إ"},{name:"United Kingdom",dial_code:"+44",code:"GB",preferred:!0,flag:"🇬🇧",local_name:"United Kingdom",currency:"British Pound",currency_code:"GBP",currency_symbol:"£"},{name:"United States",dial_code:"+1",code:"US",preferred:!0,flag:"🇺🇸",local_name:"United States",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Uruguay",dial_code:"+598",code:"UY",flag:"🇺🇾",local_name:"Uruguay",currency:"Uruguayan Peso",currency_code:"UYU",currency_symbol:"$"},{name:"Uzbekistan",dial_code:"+998",code:"UZ",flag:"🇺🇿",local_name:"O'zbekiston",currency:"Uzbekistani Som",currency_code:"UZS",currency_symbol:"лв"},{name:"Vanuatu",dial_code:"+678",code:"VU",flag:"🇻🇺",local_name:"Vanuatu",currency:"Vanuatu Vatu",currency_code:"VUV",currency_symbol:"VT"},{name:"Venezuela, Bolivarian Republic of",dial_code:"+58",code:"VE",flag:"🇻🇪",local_name:"Venezuela",currency:"Venezuelan Bolívar",currency_code:"VES",currency_symbol:"Bs."},{name:"Vietnam",dial_code:"+84",code:"VN",flag:"🇻🇳",local_name:"Việt Nam",currency:"Vietnamese Đồng",currency_code:"VND",currency_symbol:"₫"},{name:"Virgin Islands, British",dial_code:"+1284",code:"VG",flag:"🇻🇬",part_of:["GB"],local_name:"British Virgin Islands",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Virgin Islands, U.S.",dial_code:"+1340",code:"VI",flag:"🇻🇮",part_of:["US"],local_name:"U.S. Virgin Islands",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Wallis and Futuna",dial_code:"+681",code:"WF",flag:"🇼🇫",local_name:"Wallis-et-Futuna",currency:"CFP Franc",currency_code:"XPF",currency_symbol:"₣"},{name:"Western Sahara",dial_code:"+212",code:"EH",flag:"🇪🇭",local_name:"الصحراء الغربية",currency:"Moroccan Dirham",currency_code:"MAD",currency_symbol:"د.م."},{name:"Yemen",dial_code:"+967",code:"YE",flag:"🇾🇪",local_name:"اليمن",currency:"Yemeni Rial",currency_code:"YER",currency_symbol:"﷼"},{name:"Zambia",dial_code:"+260",code:"ZM",flag:"🇿🇲",local_name:"Zambia",currency:"Zambian Kwacha",currency_code:"ZMW",currency_symbol:"ZK"},{name:"Zimbabwe",dial_code:"+263",code:"ZW",flag:"🇿🇼",local_name:"Zimbabwe",currency:"US Dollar",currency_code:"USD",currency_symbol:"$"},{name:"Åland Islands",dial_code:"+358",code:"AX",flag:"🇦🇽",part_of:["FI"],local_name:"Åland",currency:"Euro",currency_code:"EUR",currency_symbol:"€"}]},8156:(e,c,a)=>{Object.defineProperty(c,"__esModule",{value:!0}),c.Country=void 0;var r=a(2934);Object.defineProperty(c,"Country",{enumerable:!0,get:function(){return r.Country}});var n=a(9646),o=new(function(){function e(){}return e.prototype.findOneByCountryCode=function(e){return this.findByCountryCode(e).find((function(e){return!e.secondary}))},e.prototype.findOneByDialCode=function(e){var c,a=this.findByDialCode(e);return a.find((function(e){return e.preferred}))||(null!==(c=a[0])&&void 0!==c?c:void 0)},e.prototype.findByCountryCode=function(e,c){return this.getAll(c).filter((function(c){return c.code.toLowerCase()===e.toLowerCase()}))},e.prototype.findByDialCode=function(e){return this.getAll().filter((function(c){return c.dialCode===e}))},e.prototype.findByKeyword=function(e,c){return this.getAll(c).filter((function(c){return c.code.toLowerCase().includes(e.toLowerCase())||c.name.toLowerCase().includes(e.toLowerCase())||c.dialCode.toLowerCase().includes(e.toLowerCase())}))},e.prototype.findByCurrencyCode=function(e,c){return this.getAll(c).filter((function(c){return c.currencyCode.toLowerCase()===e.toLowerCase()}))},e.prototype.findOneByCurrencyCode=function(e){var c,a=this.findByCurrencyCode(e);return a.find((function(e){return e.preferred}))||(null!==(c=a[0])&&void 0!==c?c:void 0)},e.prototype.getAll=function(e){var c=n.default;return e&&!e.withSecondary&&(c=n.default.filter((function(e){return!e.secondary}))),c.map((function(e){return new r.Country(e)}))},e.prototype.groupCountriesByFirstLetter=function(e){var c={};return this.getAll().forEach((function(e){var a=e.name.charAt(0).toLowerCase();c[a]||(c[a]=[]),c[a].push(e)})),c},e.prototype.setPhoneNumberUtil=function(e){this.phoneNumberUtil=e},e}());"undefined"!=typeof window&&(window.CountryList=o),c.default=o}},c={},a=function a(r){var n=c[r];if(void 0!==n)return n.exports;var o=c[r]={exports:{}};return e[r](o,o.exports,a),o.exports}(8156),r=exports;for(var n in a)r[n]=a[n];a.__esModule&&Object.defineProperty(r,"__esModule",{value:!0});

/***/ }),

/***/ "./node_modules/memize/dist/index.js":
/*!*******************************************!*\
  !*** ./node_modules/memize/dist/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ memize)
/* harmony export */ });
/**
 * Memize options object.
 *
 * @typedef MemizeOptions
 *
 * @property {number} [maxSize] Maximum size of the cache.
 */

/**
 * Internal cache entry.
 *
 * @typedef MemizeCacheNode
 *
 * @property {?MemizeCacheNode|undefined} [prev] Previous node.
 * @property {?MemizeCacheNode|undefined} [next] Next node.
 * @property {Array<*>}                   args   Function arguments for cache
 *                                               entry.
 * @property {*}                          val    Function result.
 */

/**
 * Properties of the enhanced function for controlling cache.
 *
 * @typedef MemizeMemoizedFunction
 *
 * @property {()=>void} clear Clear the cache.
 */

/**
 * Accepts a function to be memoized, and returns a new memoized function, with
 * optional options.
 *
 * @template {(...args: any[]) => any} F
 *
 * @param {F}             fn        Function to memoize.
 * @param {MemizeOptions} [options] Options object.
 *
 * @return {((...args: Parameters<F>) => ReturnType<F>) & MemizeMemoizedFunction} Memoized function.
 */
function memize(fn, options) {
	var size = 0;

	/** @type {?MemizeCacheNode|undefined} */
	var head;

	/** @type {?MemizeCacheNode|undefined} */
	var tail;

	options = options || {};

	function memoized(/* ...args */) {
		var node = head,
			len = arguments.length,
			args,
			i;

		searchCache: while (node) {
			// Perform a shallow equality test to confirm that whether the node
			// under test is a candidate for the arguments passed. Two arrays
			// are shallowly equal if their length matches and each entry is
			// strictly equal between the two sets. Avoid abstracting to a
			// function which could incur an arguments leaking deoptimization.

			// Check whether node arguments match arguments length
			if (node.args.length !== arguments.length) {
				node = node.next;
				continue;
			}

			// Check whether node arguments match arguments values
			for (i = 0; i < len; i++) {
				if (node.args[i] !== arguments[i]) {
					node = node.next;
					continue searchCache;
				}
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if (node !== head) {
				// As tail, shift to previous. Must only shift if not also
				// head, since if both head and tail, there is no previous.
				if (node === tail) {
					tail = node.prev;
				}

				// Adjust siblings to point to each other. If node was tail,
				// this also handles new tail's empty `next` assignment.
				/** @type {MemizeCacheNode} */ (node.prev).next = node.next;
				if (node.next) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				/** @type {MemizeCacheNode} */ (head).prev = node;
				head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		// Create a copy of arguments (avoid leaking deoptimization)
		args = new Array(len);
		for (i = 0; i < len; i++) {
			args[i] = arguments[i];
		}

		node = {
			args: args,

			// Generate the result from original function
			val: fn.apply(null, args),
		};

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if (head) {
			head.prev = node;
			node.next = head;
		} else {
			// If no head, follows that there's no tail (at initial or reset)
			tail = node;
		}

		// Trim tail if we're reached max size and are pending cache insertion
		if (size === /** @type {MemizeOptions} */ (options).maxSize) {
			tail = /** @type {MemizeCacheNode} */ (tail).prev;
			/** @type {MemizeCacheNode} */ (tail).next = null;
		} else {
			size++;
		}

		head = node;

		return node.val;
	}

	memoized.clear = function () {
		head = null;
		tail = null;
		size = 0;
	};

	// Ignore reason: There's not a clear solution to create an intersection of
	// the function with additional properties, where the goal is to retain the
	// function signature of the incoming argument and add control properties
	// on the return value.

	// @ts-ignore
	return memoized;
}




/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ x),
/* harmony export */   Fragment: () => (/* binding */ k),
/* harmony export */   cloneElement: () => (/* binding */ K),
/* harmony export */   createContext: () => (/* binding */ Q),
/* harmony export */   createElement: () => (/* binding */ _),
/* harmony export */   createRef: () => (/* binding */ b),
/* harmony export */   h: () => (/* binding */ _),
/* harmony export */   hydrate: () => (/* binding */ J),
/* harmony export */   isValidElement: () => (/* binding */ t),
/* harmony export */   options: () => (/* binding */ l),
/* harmony export */   render: () => (/* binding */ G),
/* harmony export */   toChildArray: () => (/* binding */ H)
/* harmony export */ });
var n,l,u,t,i,r,o,e,f,c,s,a,h,p={},v=[],y=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,w=Array.isArray;function d(n,l){for(var u in l)n[u]=l[u];return n}function g(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function _(l,u,t){var i,r,o,e={};for(o in u)"key"==o?i=u[o]:"ref"==o?r=u[o]:e[o]=u[o];if(arguments.length>2&&(e.children=arguments.length>3?n.call(arguments,2):t),"function"==typeof l&&null!=l.defaultProps)for(o in l.defaultProps)void 0===e[o]&&(e[o]=l.defaultProps[o]);return m(l,e,i,r,null)}function m(n,t,i,r,o){var e={type:n,props:t,key:i,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:null==o?++u:o,__i:-1,__u:0};return null==o&&null!=l.vnode&&l.vnode(e),e}function b(){return{current:null}}function k(n){return n.children}function x(n,l){this.props=n,this.context=l}function S(n,l){if(null==l)return n.__?S(n.__,n.__i+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?S(n):null}function C(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return C(n)}}function M(n){(!n.__d&&(n.__d=!0)&&i.push(n)&&!$.__r++||r!=l.debounceRendering)&&((r=l.debounceRendering)||o)($)}function $(){for(var n,u,t,r,o,f,c,s=1;i.length;)i.length>s&&i.sort(e),n=i.shift(),s=i.length,n.__d&&(t=void 0,o=(r=(u=n).__v).__e,f=[],c=[],u.__P&&((t=d({},r)).__v=r.__v+1,l.vnode&&l.vnode(t),O(u.__P,t,r,u.__n,u.__P.namespaceURI,32&r.__u?[o]:null,f,null==o?S(r):o,!!(32&r.__u),c),t.__v=r.__v,t.__.__k[t.__i]=t,N(f,t,c),t.__e!=o&&C(t)));$.__r=0}function I(n,l,u,t,i,r,o,e,f,c,s){var a,h,y,w,d,g,_,m=t&&t.__k||v,b=l.length;for(f=P(u,l,m,f,b),a=0;a<b;a++)null!=(y=u.__k[a])&&(h=-1==y.__i?p:m[y.__i]||p,y.__i=a,g=O(n,y,h,i,r,o,e,f,c,s),w=y.__e,y.ref&&h.ref!=y.ref&&(h.ref&&B(h.ref,null,y),s.push(y.ref,y.__c||w,y)),null==d&&null!=w&&(d=w),(_=!!(4&y.__u))||h.__k===y.__k?f=A(y,f,n,_):"function"==typeof y.type&&void 0!==g?f=g:w&&(f=w.nextSibling),y.__u&=-7);return u.__e=d,f}function P(n,l,u,t,i){var r,o,e,f,c,s=u.length,a=s,h=0;for(n.__k=new Array(i),r=0;r<i;r++)null!=(o=l[r])&&"boolean"!=typeof o&&"function"!=typeof o?(f=r+h,(o=n.__k[r]="string"==typeof o||"number"==typeof o||"bigint"==typeof o||o.constructor==String?m(null,o,null,null,null):w(o)?m(k,{children:o},null,null,null):null==o.constructor&&o.__b>0?m(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):o).__=n,o.__b=n.__b+1,e=null,-1!=(c=o.__i=L(o,u,f,a))&&(a--,(e=u[c])&&(e.__u|=2)),null==e||null==e.__v?(-1==c&&(i>s?h--:i<s&&h++),"function"!=typeof o.type&&(o.__u|=4)):c!=f&&(c==f-1?h--:c==f+1?h++:(c>f?h--:h++,o.__u|=4))):n.__k[r]=null;if(a)for(r=0;r<s;r++)null!=(e=u[r])&&0==(2&e.__u)&&(e.__e==t&&(t=S(e)),D(e,e));return t}function A(n,l,u,t){var i,r;if("function"==typeof n.type){for(i=n.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=n,l=A(i[r],l,u,t));return l}n.__e!=l&&(t&&(l&&n.type&&!l.parentNode&&(l=S(n)),u.insertBefore(n.__e,l||null)),l=n.__e);do{l=l&&l.nextSibling}while(null!=l&&8==l.nodeType);return l}function H(n,l){return l=l||[],null==n||"boolean"==typeof n||(w(n)?n.some(function(n){H(n,l)}):l.push(n)),l}function L(n,l,u,t){var i,r,o,e=n.key,f=n.type,c=l[u],s=null!=c&&0==(2&c.__u);if(null===c&&null==n.key||s&&e==c.key&&f==c.type)return u;if(t>(s?1:0))for(i=u-1,r=u+1;i>=0||r<l.length;)if(null!=(c=l[o=i>=0?i--:r++])&&0==(2&c.__u)&&e==c.key&&f==c.type)return o;return-1}function T(n,l,u){"-"==l[0]?n.setProperty(l,null==u?"":u):n[l]=null==u?"":"number"!=typeof u||y.test(l)?u:u+"px"}function j(n,l,u,t,i){var r,o;n:if("style"==l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof t&&(n.style.cssText=t=""),t)for(l in t)u&&l in u||T(n.style,l,"");if(u)for(l in u)t&&u[l]==t[l]||T(n.style,l,u[l])}else if("o"==l[0]&&"n"==l[1])r=l!=(l=l.replace(f,"$1")),o=l.toLowerCase(),l=o in n||"onFocusOut"==l||"onFocusIn"==l?o.slice(2):l.slice(2),n.l||(n.l={}),n.l[l+r]=u,u?t?u.u=t.u:(u.u=c,n.addEventListener(l,r?a:s,r)):n.removeEventListener(l,r?a:s,r);else{if("http://www.w3.org/2000/svg"==i)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("width"!=l&&"height"!=l&&"href"!=l&&"list"!=l&&"form"!=l&&"tabIndex"!=l&&"download"!=l&&"rowSpan"!=l&&"colSpan"!=l&&"role"!=l&&"popover"!=l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null==u||!1===u&&"-"!=l[4]?n.removeAttribute(l):n.setAttribute(l,"popover"==l&&1==u?"":u))}}function F(n){return function(u){if(this.l){var t=this.l[u.type+n];if(null==u.t)u.t=c++;else if(u.t<t.u)return;return t(l.event?l.event(u):u)}}}function O(n,u,t,i,r,o,e,f,c,s){var a,h,p,v,y,_,m,b,S,C,M,$,P,A,H,L,T,j=u.type;if(null!=u.constructor)return null;128&t.__u&&(c=!!(32&t.__u),o=[f=u.__e=t.__e]),(a=l.__b)&&a(u);n:if("function"==typeof j)try{if(b=u.props,S="prototype"in j&&j.prototype.render,C=(a=j.contextType)&&i[a.__c],M=a?C?C.props.value:a.__:i,t.__c?m=(h=u.__c=t.__c).__=h.__E:(S?u.__c=h=new j(b,M):(u.__c=h=new x(b,M),h.constructor=j,h.render=E),C&&C.sub(h),h.props=b,h.state||(h.state={}),h.context=M,h.__n=i,p=h.__d=!0,h.__h=[],h._sb=[]),S&&null==h.__s&&(h.__s=h.state),S&&null!=j.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=d({},h.__s)),d(h.__s,j.getDerivedStateFromProps(b,h.__s))),v=h.props,y=h.state,h.__v=u,p)S&&null==j.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),S&&null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(S&&null==j.getDerivedStateFromProps&&b!==v&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(b,M),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(b,h.__s,M)||u.__v==t.__v){for(u.__v!=t.__v&&(h.props=b,h.state=h.__s,h.__d=!1),u.__e=t.__e,u.__k=t.__k,u.__k.some(function(n){n&&(n.__=u)}),$=0;$<h._sb.length;$++)h.__h.push(h._sb[$]);h._sb=[],h.__h.length&&e.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(b,h.__s,M),S&&null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(v,y,_)})}if(h.context=M,h.props=b,h.__P=n,h.__e=!1,P=l.__r,A=0,S){for(h.state=h.__s,h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),H=0;H<h._sb.length;H++)h.__h.push(h._sb[H]);h._sb=[]}else do{h.__d=!1,P&&P(u),a=h.render(h.props,h.state,h.context),h.state=h.__s}while(h.__d&&++A<25);h.state=h.__s,null!=h.getChildContext&&(i=d(d({},i),h.getChildContext())),S&&!p&&null!=h.getSnapshotBeforeUpdate&&(_=h.getSnapshotBeforeUpdate(v,y)),L=a,null!=a&&a.type===k&&null==a.key&&(L=V(a.props.children)),f=I(n,w(L)?L:[L],u,t,i,r,o,e,f,c,s),h.base=u.__e,u.__u&=-161,h.__h.length&&e.push(h),m&&(h.__E=h.__=null)}catch(n){if(u.__v=null,c||null!=o)if(n.then){for(u.__u|=c?160:128;f&&8==f.nodeType&&f.nextSibling;)f=f.nextSibling;o[o.indexOf(f)]=null,u.__e=f}else{for(T=o.length;T--;)g(o[T]);z(u)}else u.__e=t.__e,u.__k=t.__k,n.then||z(u);l.__e(n,u,t)}else null==o&&u.__v==t.__v?(u.__k=t.__k,u.__e=t.__e):f=u.__e=q(t.__e,u,t,i,r,o,e,c,s);return(a=l.diffed)&&a(u),128&u.__u?void 0:f}function z(n){n&&n.__c&&(n.__c.__e=!0),n&&n.__k&&n.__k.forEach(z)}function N(n,u,t){for(var i=0;i<t.length;i++)B(t[i],t[++i],t[++i]);l.__c&&l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){l.__e(n,u.__v)}})}function V(n){return"object"!=typeof n||null==n||n.__b&&n.__b>0?n:w(n)?n.map(V):d({},n)}function q(u,t,i,r,o,e,f,c,s){var a,h,v,y,d,_,m,b=i.props,k=t.props,x=t.type;if("svg"==x?o="http://www.w3.org/2000/svg":"math"==x?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),null!=e)for(a=0;a<e.length;a++)if((d=e[a])&&"setAttribute"in d==!!x&&(x?d.localName==x:3==d.nodeType)){u=d,e[a]=null;break}if(null==u){if(null==x)return document.createTextNode(k);u=document.createElementNS(o,x,k.is&&k),c&&(l.__m&&l.__m(t,e),c=!1),e=null}if(null==x)b===k||c&&u.data==k||(u.data=k);else{if(e=e&&n.call(u.childNodes),b=i.props||p,!c&&null!=e)for(b={},a=0;a<u.attributes.length;a++)b[(d=u.attributes[a]).name]=d.value;for(a in b)if(d=b[a],"children"==a);else if("dangerouslySetInnerHTML"==a)v=d;else if(!(a in k)){if("value"==a&&"defaultValue"in k||"checked"==a&&"defaultChecked"in k)continue;j(u,a,null,d,o)}for(a in k)d=k[a],"children"==a?y=d:"dangerouslySetInnerHTML"==a?h=d:"value"==a?_=d:"checked"==a?m=d:c&&"function"!=typeof d||b[a]===d||j(u,a,d,b[a],o);if(h)c||v&&(h.__html==v.__html||h.__html==u.innerHTML)||(u.innerHTML=h.__html),t.__k=[];else if(v&&(u.innerHTML=""),I("template"==t.type?u.content:u,w(y)?y:[y],t,i,r,"foreignObject"==x?"http://www.w3.org/1999/xhtml":o,e,f,e?e[0]:i.__k&&S(i,0),c,s),null!=e)for(a=e.length;a--;)g(e[a]);c||(a="value","progress"==x&&null==_?u.removeAttribute("value"):null!=_&&(_!==u[a]||"progress"==x&&!_||"option"==x&&_!=b[a])&&j(u,a,_,b[a],o),a="checked",null!=m&&m!=u[a]&&j(u,a,m,b[a],o))}return u}function B(n,u,t){try{if("function"==typeof n){var i="function"==typeof n.__u;i&&n.__u(),i&&null==u||(n.__u=n(u))}else n.current=u}catch(n){l.__e(n,t)}}function D(n,u,t){var i,r;if(l.unmount&&l.unmount(n),(i=n.ref)&&(i.current&&i.current!=n.__e||B(i,null,u)),null!=(i=n.__c)){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(n){l.__e(n,u)}i.base=i.__P=null}if(i=n.__k)for(r=0;r<i.length;r++)i[r]&&D(i[r],u,t||"function"!=typeof n.type);t||g(n.__e),n.__c=n.__=n.__e=void 0}function E(n,l,u){return this.constructor(n,u)}function G(u,t,i){var r,o,e,f;t==document&&(t=document.documentElement),l.__&&l.__(u,t),o=(r="function"==typeof i)?null:i&&i.__k||t.__k,e=[],f=[],O(t,u=(!r&&i||t).__k=_(k,null,[u]),o||p,p,t.namespaceURI,!r&&i?[i]:o?null:t.firstChild?n.call(t.childNodes):null,e,!r&&i?i:o?o.__e:t.firstChild,r,f),N(e,u,f)}function J(n,l){G(n,l,J)}function K(l,u,t){var i,r,o,e,f=d({},l.props);for(o in l.type&&l.type.defaultProps&&(e=l.type.defaultProps),u)"key"==o?i=u[o]:"ref"==o?r=u[o]:f[o]=void 0===u[o]&&null!=e?e[o]:u[o];return arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):t),m(l.type,f,i||l.key,r||l.ref,null)}function Q(n){function l(n){var u,t;return this.getChildContext||(u=new Set,(t={})[l.__c]=this,this.getChildContext=function(){return t},this.componentWillUnmount=function(){u=null},this.shouldComponentUpdate=function(n){this.props.value!=n.value&&u.forEach(function(n){n.__e=!0,M(n)})},this.sub=function(n){u.add(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u&&u.delete(n),l&&l.call(n)}}),n.children}return l.__c="__cC"+h++,l.__=n,l.Provider=l.__l=(l.Consumer=function(n,l){return n.children(l)}).contextType=l,l}n=v.slice,l={__e:function(n,l,u,t){for(var i,r,o;l=l.__;)if((i=l.__c)&&!i.__)try{if((r=i.constructor)&&null!=r.getDerivedStateFromError&&(i.setState(r.getDerivedStateFromError(n)),o=i.__d),null!=i.componentDidCatch&&(i.componentDidCatch(n,t||{}),o=i.__d),o)return i.__E=i}catch(l){n=l}throw n}},u=0,t=function(n){return null!=n&&null==n.constructor},x.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!=this.state?this.__s:this.__s=d({},this.state),"function"==typeof n&&(n=n(d({},u),this.props)),n&&d(u,n),null!=n&&this.__v&&(l&&this._sb.push(l),M(this))},x.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),M(this))},x.prototype.render=k,i=[],o="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,e=function(n,l){return n.__v.__b-l.__v.__b},$.__r=0,f=/(PointerCapture)$|Capture$/i,c=0,s=F(!1),a=F(!0),h=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallback: () => (/* binding */ q),
/* harmony export */   useContext: () => (/* binding */ x),
/* harmony export */   useDebugValue: () => (/* binding */ P),
/* harmony export */   useEffect: () => (/* binding */ y),
/* harmony export */   useErrorBoundary: () => (/* binding */ b),
/* harmony export */   useId: () => (/* binding */ g),
/* harmony export */   useImperativeHandle: () => (/* binding */ F),
/* harmony export */   useLayoutEffect: () => (/* binding */ _),
/* harmony export */   useMemo: () => (/* binding */ T),
/* harmony export */   useReducer: () => (/* binding */ h),
/* harmony export */   useRef: () => (/* binding */ A),
/* harmony export */   useState: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var t,r,u,i,o=0,f=[],c=preact__WEBPACK_IMPORTED_MODULE_0__.options,e=c.__b,a=c.__r,v=c.diffed,l=c.__c,m=c.unmount,s=c.__;function p(n,t){c.__h&&c.__h(r,n,o||t),o=0;var u=r.__H||(r.__H={__:[],__h:[]});return n>=u.__.length&&u.__.push({}),u.__[n]}function d(n){return o=1,h(D,n)}function h(n,u,i){var o=p(t++,2);if(o.t=n,!o.__c&&(o.__=[i?i(u):D(void 0,u),function(n){var t=o.__N?o.__N[0]:o.__[0],r=o.t(t,n);t!==r&&(o.__N=[r,o.__[1]],o.__c.setState({}))}],o.__c=r,!r.__f)){var f=function(n,t,r){if(!o.__c.__H)return!0;var u=o.__c.__H.__.filter(function(n){return!!n.__c});if(u.every(function(n){return!n.__N}))return!c||c.call(this,n,t,r);var i=o.__c.props!==n;return u.forEach(function(n){if(n.__N){var t=n.__[0];n.__=n.__N,n.__N=void 0,t!==n.__[0]&&(i=!0)}}),c&&c.call(this,n,t,r)||i};r.__f=!0;var c=r.shouldComponentUpdate,e=r.componentWillUpdate;r.componentWillUpdate=function(n,t,r){if(this.__e){var u=c;c=void 0,f(n,t,r),c=u}e&&e.call(this,n,t,r)},r.shouldComponentUpdate=f}return o.__N||o.__}function y(n,u){var i=p(t++,3);!c.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r.__H.__h.push(i))}function _(n,u){var i=p(t++,4);!c.__s&&C(i.__H,u)&&(i.__=n,i.u=u,r.__h.push(i))}function A(n){return o=5,T(function(){return{current:n}},[])}function F(n,t,r){o=6,_(function(){if("function"==typeof n){var r=n(t());return function(){n(null),r&&"function"==typeof r&&r()}}if(n)return n.current=t(),function(){return n.current=null}},null==r?r:r.concat(n))}function T(n,r){var u=p(t++,7);return C(u.__H,r)&&(u.__=n(),u.__H=r,u.__h=n),u.__}function q(n,t){return o=8,T(function(){return n},t)}function x(n){var u=r.context[n.__c],i=p(t++,9);return i.c=n,u?(null==i.__&&(i.__=!0,u.sub(r)),u.props.value):n.__}function P(n,t){c.useDebugValue&&c.useDebugValue(t?t(n):n)}function b(n){var u=p(t++,10),i=d();return u.__=n,r.componentDidCatch||(r.componentDidCatch=function(n,t){u.__&&u.__(n,t),i[1](n)}),[i[0],function(){i[1](void 0)}]}function g(){var n=p(t++,11);if(!n.__){for(var u=r.__v;null!==u&&!u.__m&&null!==u.__;)u=u.__;var i=u.__m||(u.__m=[0,0]);n.__="P"+i[0]+"-"+i[1]++}return n.__}function j(){for(var n;n=f.shift();)if(n.__P&&n.__H)try{n.__H.__h.forEach(z),n.__H.__h.forEach(B),n.__H.__h=[]}catch(t){n.__H.__h=[],c.__e(t,n.__v)}}c.__b=function(n){r=null,e&&e(n)},c.__=function(n,t){n&&t.__k&&t.__k.__m&&(n.__m=t.__k.__m),s&&s(n,t)},c.__r=function(n){a&&a(n),t=0;var i=(r=n.__c).__H;i&&(u===r?(i.__h=[],r.__h=[],i.__.forEach(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(i.__h.forEach(z),i.__h.forEach(B),i.__h=[],t=0)),u=r},c.diffed=function(n){v&&v(n);var t=n.__c;t&&t.__H&&(t.__H.__h.length&&(1!==f.push(t)&&i===c.requestAnimationFrame||((i=c.requestAnimationFrame)||w)(j)),t.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.u=void 0})),u=r=null},c.__c=function(n,t){t.some(function(n){try{n.__h.forEach(z),n.__h=n.__h.filter(function(n){return!n.__||B(n)})}catch(r){t.some(function(n){n.__h&&(n.__h=[])}),t=[],c.__e(r,n.__v)}}),l&&l(n,t)},c.unmount=function(n){m&&m(n);var t,r=n.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{z(n)}catch(n){t=n}}),r.__H=void 0,t&&c.__e(t,r.__v))};var k="function"==typeof requestAnimationFrame;function w(n){var t,r=function(){clearTimeout(u),k&&cancelAnimationFrame(t),setTimeout(n)},u=setTimeout(r,35);k&&(t=requestAnimationFrame(r))}function z(n){var t=r,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),r=t}function B(n){var t=r;n.__c=n.__(),r=t}function C(n,t){return!n||n.length!==t.length||t.some(function(t,r){return t!==n[r]})}function D(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ "./node_modules/sprintf-js/src/sprintf.js":
/*!************************************************!*\
  !*** ./node_modules/sprintf-js/src/sprintf.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (true) {
        exports.sprintf = sprintf
        exports.vsprintf = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line


/***/ }),

/***/ "./node_modules/tannin/index.js":
/*!**************************************!*\
  !*** ./node_modules/tannin/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tannin)
/* harmony export */ });
/* harmony import */ var _tannin_plural_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tannin/plural-forms */ "./node_modules/@tannin/plural-forms/index.js");


/**
 * Tannin constructor options.
 *
 * @typedef {Object} TanninOptions
 *
 * @property {string}   [contextDelimiter] Joiner in string lookup with context.
 * @property {Function} [onMissingKey]     Callback to invoke when key missing.
 */

/**
 * Domain metadata.
 *
 * @typedef {Object} TanninDomainMetadata
 *
 * @property {string}            [domain]       Domain name.
 * @property {string}            [lang]         Language code.
 * @property {(string|Function)} [plural_forms] Plural forms expression or
 *                                              function evaluator.
 */

/**
 * Domain translation pair respectively representing the singular and plural
 * translation.
 *
 * @typedef {[string,string]} TanninTranslation
 */

/**
 * Locale data domain. The key is used as reference for lookup, the value an
 * array of two string entries respectively representing the singular and plural
 * translation.
 *
 * @typedef {{[key:string]:TanninDomainMetadata|TanninTranslation,'':TanninDomainMetadata|TanninTranslation}} TanninLocaleDomain
 */

/**
 * Jed-formatted locale data.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @typedef {{[domain:string]:TanninLocaleDomain}} TanninLocaleData
 */

/**
 * Default Tannin constructor options.
 *
 * @type {TanninOptions}
 */
var DEFAULT_OPTIONS = {
	contextDelimiter: '\u0004',
	onMissingKey: null,
};

/**
 * Given a specific locale data's config `plural_forms` value, returns the
 * expression.
 *
 * @example
 *
 * ```
 * getPluralExpression( 'nplurals=2; plural=(n != 1);' ) === '(n != 1)'
 * ```
 *
 * @param {string} pf Locale data plural forms.
 *
 * @return {string} Plural forms expression.
 */
function getPluralExpression( pf ) {
	var parts, i, part;

	parts = pf.split( ';' );

	for ( i = 0; i < parts.length; i++ ) {
		part = parts[ i ].trim();
		if ( part.indexOf( 'plural=' ) === 0 ) {
			return part.substr( 7 );
		}
	}
}

/**
 * Tannin constructor.
 *
 * @class
 *
 * @param {TanninLocaleData} data      Jed-formatted locale data.
 * @param {TanninOptions}    [options] Tannin options.
 */
function Tannin( data, options ) {
	var key;

	/**
	 * Jed-formatted locale data.
	 *
	 * @name Tannin#data
	 * @type {TanninLocaleData}
	 */
	this.data = data;

	/**
	 * Plural forms function cache, keyed by plural forms string.
	 *
	 * @name Tannin#pluralForms
	 * @type {Object<string,Function>}
	 */
	this.pluralForms = {};

	/**
	 * Effective options for instance, including defaults.
	 *
	 * @name Tannin#options
	 * @type {TanninOptions}
	 */
	this.options = {};

	for ( key in DEFAULT_OPTIONS ) {
		this.options[ key ] = options !== undefined && key in options
			? options[ key ]
			: DEFAULT_OPTIONS[ key ];
	}
}

/**
 * Returns the plural form index for the given domain and value.
 *
 * @param {string} domain Domain on which to calculate plural form.
 * @param {number} n      Value for which plural form is to be calculated.
 *
 * @return {number} Plural form index.
 */
Tannin.prototype.getPluralForm = function( domain, n ) {
	var getPluralForm = this.pluralForms[ domain ],
		config, plural, pf;

	if ( ! getPluralForm ) {
		config = this.data[ domain ][ '' ];

		pf = (
			config[ 'Plural-Forms' ] ||
			config[ 'plural-forms' ] ||
			// Ignore reason: As known, there's no way to document the empty
			// string property on a key to guarantee this as metadata.
			// @ts-ignore
			config.plural_forms
		);

		if ( typeof pf !== 'function' ) {
			plural = getPluralExpression(
				config[ 'Plural-Forms' ] ||
				config[ 'plural-forms' ] ||
				// Ignore reason: As known, there's no way to document the empty
				// string property on a key to guarantee this as metadata.
				// @ts-ignore
				config.plural_forms
			);

			pf = (0,_tannin_plural_forms__WEBPACK_IMPORTED_MODULE_0__["default"])( plural );
		}

		getPluralForm = this.pluralForms[ domain ] = pf;
	}

	return getPluralForm( n );
};

/**
 * Translate a string.
 *
 * @param {string}      domain   Translation domain.
 * @param {string|void} context  Context distinguishing terms of the same name.
 * @param {string}      singular Primary key for translation lookup.
 * @param {string=}     plural   Fallback value used for non-zero plural
 *                               form index.
 * @param {number=}     n        Value to use in calculating plural form.
 *
 * @return {string} Translated string.
 */
Tannin.prototype.dcnpgettext = function( domain, context, singular, plural, n ) {
	var index, key, entry;

	if ( n === undefined ) {
		// Default to singular.
		index = 0;
	} else {
		// Find index by evaluating plural form for value.
		index = this.getPluralForm( domain, n );
	}

	key = singular;

	// If provided, context is prepended to key with delimiter.
	if ( context ) {
		key = context + this.options.contextDelimiter + singular;
	}

	entry = this.data[ domain ][ key ];

	// Verify not only that entry exists, but that the intended index is within
	// range and non-empty.
	if ( entry && entry[ index ] ) {
		return entry[ index ];
	}

	if ( this.options.onMissingKey ) {
		this.options.onMissingKey( singular, domain );
	}

	// If entry not found, fall back to singular vs. plural with zero index
	// representing the singular value.
	return index === 0 ? singular : plural;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "Booking:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"admin": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkBooking"] = self["webpackChunkBooking"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************************!*\
  !*** ./assets/js/admin/index.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wpify_subTabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wpify/subTabs.js */ "./assets/js/admin/wpify/subTabs.js");
/* harmony import */ var _wpify_FieldIdManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wpify/FieldIdManager.js */ "./assets/js/admin/wpify/FieldIdManager.js");
/* harmony import */ var _multiGroupToggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./multiGroupToggle.js */ "./assets/js/admin/multiGroupToggle.js");
/* harmony import */ var _wpify_componentLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wpify/componentLoader.js */ "./assets/js/admin/wpify/componentLoader.js");
/* harmony import */ var _fieldManagerInstance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fieldManagerInstance.js */ "./assets/js/admin/fieldManagerInstance.js");
/* harmony import */ var _summary_initAdminSummary_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./summary/initAdminSummary.js */ "./assets/js/admin/summary/initAdminSummary.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }






var initAllScripts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var initFunctions, _i, _initFunctions, item, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          initFunctions = [{
            name: "componentLoader",
            fn: _wpify_componentLoader_js__WEBPACK_IMPORTED_MODULE_3__.initializeComponentLoader,
            async: true
          }, {
            name: "subTabs",
            fn: _wpify_subTabs_js__WEBPACK_IMPORTED_MODULE_0__.initializeSubTabs
          }, {
            name: "fieldIdManager",
            fn: _wpify_FieldIdManager_js__WEBPACK_IMPORTED_MODULE_1__.FieldIdManager
          }, {
            name: "multiGroupToggle",
            fn: _multiGroupToggle_js__WEBPACK_IMPORTED_MODULE_2__.initializeMultiGroupToggle
          }, {
            name: "fieldManagerInstance",
            fn: _fieldManagerInstance_js__WEBPACK_IMPORTED_MODULE_4__.initializeDynamicFieldsLoader
          }, {
            name: "adminSummary",
            fn: _summary_initAdminSummary_js__WEBPACK_IMPORTED_MODULE_5__.initializeAdminSummary
          }];
          _i = 0, _initFunctions = initFunctions;
        case 1:
          if (!(_i < _initFunctions.length)) {
            _context.n = 8;
            break;
          }
          item = _initFunctions[_i];
          _context.p = 2;
          if (!item.async) {
            _context.n = 4;
            break;
          }
          _context.n = 3;
          return item.fn();
        case 3:
          _context.n = 5;
          break;
        case 4:
          item.fn();
        case 5:
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t = _context.v;
        case 7:
          _i++;
          _context.n = 1;
          break;
        case 8:
          return _context.a(2);
      }
    }, _callee, null, [[2, 6]]);
  }));
  return function initAllScripts() {
    return _ref.apply(this, arguments);
  };
}();
if (document.readyState === "complete") {
  initAllScripts();
} else {
  document.addEventListener("DOMContentLoaded", initAllScripts);
}
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map