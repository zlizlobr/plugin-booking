/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/public/booking/blocks/BaseBookingComponent.jsx":
/*!******************************************************************!*\
  !*** ./assets/js/public/booking/blocks/BaseBookingComponent.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseBookingComponent: () => (/* binding */ BaseBookingComponent)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/storage.js */ "./assets/js/public/booking/utils/storage.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var BaseBookingComponent = /*#__PURE__*/function () {
  function BaseBookingComponent(props) {
    var _this$attrs$field_id,
      _this = this;
    _classCallCheck(this, BaseBookingComponent);
    var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
    this.bookingId = context.bookingId;
    this.props = props;
    this.attrs = props.attrs || {};
    this.general = this.attrs.general || {};
    this.form_data = props.form_data || {};
    this.on_change = props.on_change;
    this.rules = props.rules || [];
    this.errorManager = props.errorManager;
    this.bookingFormManager = props.bookingFormManager;
    this.set_form_data = props.set_form_data;
    var field_id = (_this$attrs$field_id = this.attrs.field_id) !== null && _this$attrs$field_id !== void 0 ? _this$attrs$field_id : '';
    this._error_listener = function (event) {
      if (event && event.type === 'field_error' && event.fieldId === _this.attrs.field_id) {
        if (typeof _this.on_change === 'function') {
          var current_value = _this.get_current_value(_this.attrs.field_id);
          _this.on_change(_this.attrs.field_id, current_value);
        }
      }
    };
    if (this.errorManager) {
      this.errorManager.addListener(this._error_listener);
    }
  }
  return _createClass(BaseBookingComponent, [{
    key: "get_icon_url",
    value: function get_icon_url(thumbnail_id) {
      return thumbnail_id ? "/wp-content/uploads/icon-".concat(thumbnail_id, ".svg") : null;
    }
  }, {
    key: "get_current_value",
    value: function get_current_value(field_id) {
      // PRIORITA: Aktuální hodnota z form_data (co uživatel zadal)
      var storage_value = this.form_data[field_id];
      if (storage_value !== undefined && storage_value !== null && storage_value !== '') {
        return storage_value;
      }

      // FALLBACK: Původní hodnota z attrs (pouze pokud není nic v form_data)
      var attrs_value = this.general.value;
      if (attrs_value !== undefined && attrs_value !== null && attrs_value !== '') {
        return attrs_value;
      }
      return '';
    }
  }, {
    key: "handle_change",
    value: function () {
      var _handle_change = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(fieldId, value) {
        var source,
          current_value,
          hasError,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              source = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'user';
              // Použij aktuální hodnotu z form_data, ne z attrs
              current_value = this.form_data[fieldId] || '';
              if (!(current_value === value)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.n = 2;
              return this.bookingFormManager.handle_input_change(fieldId, value, this.rules, source);
            case 2:
              // 2. Zkontroluj chyby PO validaci
              hasError = this.errorManager.hasFieldError(fieldId); // 3. Aktualizuj formData
              if (this.set_form_data) {
                this.set_form_data(_defineProperty({}, fieldId, value));
              }

              // Note: setFieldValid is now called automatically via callback mechanism in BookingFormManager
              // after GraphQL validation completes, so no need to call it manually here

              // 4. Uložení do storage POUZE pokud je validní
              if (!hasError) {
                (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_2__.patchDraft)(this.bookingId, _defineProperty({}, fieldId, value));
              }
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function handle_change(_x, _x2) {
        return _handle_change.apply(this, arguments);
      }
      return handle_change;
    }()
  }, {
    key: "render_container",
    value: function render_container(children) {
      var additional_classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full ".concat(additional_classes)
      }, children);
    }
  }, {
    key: "render_label_section",
    value: function render_label_section(label, icon_url) {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex items-center gap-x-4"
      }, icon_url && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        style: {
          '--mask-img': "url('".concat(icon_url, "')")
        },
        className: "w-25p h-30p bg-th-orange-light cs-mask"
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
      }, label));
    }
  }, {
    key: "render_field_section",
    value: function render_field_section(children) {
      var additional_classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem] ".concat(additional_classes)
      }, children);
    }
  }, {
    key: "get_field_prefix",
    value: function get_field_prefix() {
      throw new Error('get_field_prefix must be implemented by subclass');
    }
  }, {
    key: "render_input",
    value: function render_input(field_id, current_value) {
      throw new Error('render_input must be implemented by subclass');
    }
  }, {
    key: "render",
    value: function render() {
      var _this$attrs$field_id2;
      var _this$general = this.general,
        _this$general$label = _this$general.label,
        label = _this$general$label === void 0 ? this.get_default_label() : _this$general$label,
        _this$general$thumbna = _this$general.thumbnail_id,
        thumbnail_id = _this$general$thumbna === void 0 ? null : _this$general$thumbna;
      var field_id = (_this$attrs$field_id2 = this.attrs.field_id) !== null && _this$attrs$field_id2 !== void 0 ? _this$attrs$field_id2 : '';
      var current_value = this.get_current_value(field_id);
      var icon_url = this.get_icon_url(thumbnail_id);
      return this.render_container([this.render_label_section(label, icon_url), this.render_field_section(this.render_input(field_id, current_value))]);
    }
  }, {
    key: "get_default_label",
    value: function get_default_label() {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Field', 'wpcbooking');
    }
  }, {
    key: "get_field_error",
    value: function get_field_error(field_id) {
      return this.errorManager ? this.errorManager.getFieldError(field_id) : null;
    }
  }, {
    key: "has_field_error",
    value: function has_field_error(field_id) {
      return this.errorManager ? this.errorManager.hasFieldError(field_id) : false;
    }
  }, {
    key: "get_field_classes",
    value: function get_field_classes(field_id) {
      var base_classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var has_error = this.has_field_error(field_id);
      var is_valid = this.is_field_valid(field_id);
      var status_classes = '';
      if (has_error) {
        status_classes = 'input-error animate-shake';
      } else if (is_valid) {
        status_classes = 'input-valid';
      }
      return "".concat(base_classes, " ").concat(status_classes).trim();
    }
  }, {
    key: "is_field_valid",
    value: function is_field_valid(field_id) {
      var value = this.get_current_value(field_id);
      return value && value.trim() !== '' && !this.has_field_error(field_id);
    }
  }, {
    key: "get_validation_manager",
    value: function get_validation_manager() {
      return this.errorManager;
    }
  }]);
}();

/***/ }),

/***/ "./assets/js/public/booking/blocks/BlockRenderer.jsx":
/*!***********************************************************!*\
  !*** ./assets/js/public/booking/blocks/BlockRenderer.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "./assets/js/public/booking/blocks/index.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }




var ComponentNotFound = function ComponentNotFound(_ref) {
  var blockName = _ref.blockName;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center justify-center p-8 border border-red-300 rounded-lg bg-red-50"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-center text-red-500"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-2xl mb-2"
  }, "\u274C"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Component not found:', 'wpcbooking'), " ", (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("code", null, blockName))));
};
var ComponentError = function ComponentError(_ref2) {
  var blockName = _ref2.blockName,
    error = _ref2.error,
    errorManager = _ref2.errorManager;
  var errorId = "block-error-".concat(blockName, "-").concat(Date.now());

  // Add error to errorManager
  if (errorManager) {
    errorManager.setSystemError(errorId, {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error rendering component:', 'wpcbooking') + " ".concat(blockName),
      type: 'error',
      details: error.message || error.toString()
    });
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center justify-center p-8 border border-red-300 rounded-lg bg-red-50"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-center text-red-500"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-2xl mb-2"
  }, "\u26A0\uFE0F"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error rendering component:', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
    className: "text-sm mt-2"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("code", null, blockName)),  true && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("details", {
    className: "mt-4 text-left"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("summary", {
    className: "cursor-pointer text-sm font-semibold"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error details (developers only)', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("pre", {
    className: "mt-2 text-xs bg-red-100 p-2 rounded overflow-auto"
  }, error.stack || error.toString()))));
};
var BlockRenderer = function BlockRenderer(_ref3) {
  var block_data = _ref3.block_data;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_2__.useBookingContext)();
  var _ref4 = context || {},
    errorManager = _ref4.errorManager;
  if (!(block_data !== null && block_data !== void 0 && block_data.blockName)) return null;
  var blockName = block_data.blockName,
    _block_data$attrs = block_data.attrs,
    attrs = _block_data$attrs === void 0 ? {} : _block_data$attrs;
  var rules = block_data.rules || [];
  var componentRegistry = {
    'booking/icons-list': _index_js__WEBPACK_IMPORTED_MODULE_3__.IconsList,
    'booking/date-picker': _index_js__WEBPACK_IMPORTED_MODULE_3__.DatePicker,
    'booking/google-map': _index_js__WEBPACK_IMPORTED_MODULE_3__.GoogleMap,
    'booking/number-input': _index_js__WEBPACK_IMPORTED_MODULE_3__.NumberInput,
    'booking/text-input': _index_js__WEBPACK_IMPORTED_MODULE_3__.TextInput,
    'booking/phone-input': _index_js__WEBPACK_IMPORTED_MODULE_3__.PhoneInput,
    'booking/email-input': _index_js__WEBPACK_IMPORTED_MODULE_3__.EmailInput,
    'booking/time-picker': _index_js__WEBPACK_IMPORTED_MODULE_3__.TimePicker,
    'booking/product-list': _index_js__WEBPACK_IMPORTED_MODULE_3__.ProductList,
    'booking/product-grid': _index_js__WEBPACK_IMPORTED_MODULE_3__.ProductGrid
  };
  var Component = componentRegistry[blockName];
  if (!Component) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(ComponentNotFound, {
      blockName: blockName
    });
  }

  // Try-catch wrapper to handle exceptions
  try {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(Component, _extends({
      attrs: attrs,
      rules: rules
    }, context));
  } catch (error) {
    console.error("Error rendering block ".concat(blockName, ":"), error);

    // Add global error to errorManager
    if (errorManager) {
      errorManager.addGlobalError({
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error rendering component:', 'wpcbooking') + " ".concat(blockName),
        type: 'error'
      });
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(ComponentError, {
      blockName: blockName,
      error: error,
      errorManager: errorManager
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockRenderer);

/***/ }),

/***/ "./assets/js/public/booking/blocks/Calendar.jsx":
/*!******************************************************!*\
  !*** ./assets/js/public/booking/blocks/Calendar.jsx ***!
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var DAYS_IN_WEEK = 7;
var get_months = function get_months() {
  return [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('January', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('February', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('March', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('April', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('May', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('June', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('July', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('August', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('September', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('October', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('November', 'wpcbooking'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('December', 'wpcbooking')];
};
var get_weekday_labels = function get_weekday_labels() {
  return [{
    "short": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mon', 'wpcbooking'),
    full: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Monday', 'wpcbooking'),
    day: 1
  }, {
    "short": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tue', 'wpcbooking'),
    full: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tuesday', 'wpcbooking'),
    day: 2
  }, {
    "short": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wed', 'wpcbooking'),
    full: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wednesday', 'wpcbooking'),
    day: 3
  }, {
    "short": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Thu', 'wpcbooking'),
    full: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Thursday', 'wpcbooking'),
    day: 4
  }, {
    "short": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fri', 'wpcbooking'),
    full: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Friday', 'wpcbooking'),
    day: 5
  }, {
    "short": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sat', 'wpcbooking'),
    full: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saturday', 'wpcbooking'),
    day: 6
  }, {
    "short": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sun', 'wpcbooking'),
    full: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sunday', 'wpcbooking'),
    day: 0
  }];
};
var Calendar = function Calendar(_ref) {
  var _ref$selected_date = _ref.selected_date,
    selected_date = _ref$selected_date === void 0 ? null : _ref$selected_date,
    on_date_select = _ref.on_date_select,
    _ref$allow_past_dates = _ref.allow_past_dates,
    allow_past_dates = _ref$allow_past_dates === void 0 ? false : _ref$allow_past_dates,
    _ref$date_min = _ref.date_min,
    date_min = _ref$date_min === void 0 ? null : _ref$date_min,
    _ref$date_max = _ref.date_max,
    date_max = _ref$date_max === void 0 ? '2050-12-31' : _ref$date_max,
    _ref$locale = _ref.locale,
    locale = _ref$locale === void 0 ? 'cs' : _ref$locale,
    _ref$show = _ref.show,
    show = _ref$show === void 0 ? false : _ref$show,
    on_close = _ref.on_close;
  var calendar_ref = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date().getMonth()),
    _useState2 = _slicedToArray(_useState, 2),
    current_month = _useState2[0],
    set_current_month = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(new Date().getFullYear()),
    _useState4 = _slicedToArray(_useState3, 2),
    current_year = _useState4[0],
    set_current_year = _useState4[1];
  var MONTHS = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return get_months();
  }, []);
  var WEEKDAY_LABELS = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return get_weekday_labels();
  }, []);

  // Parse selected date
  var selected_date_obj = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!selected_date) return null;
    try {
      var dateObj = new Date(selected_date);
      dateObj.setHours(0, 0, 0, 0);
      return dateObj;
    } catch (_unused) {
      console.error('[Calendar] Failed to parse selected_date:', selected_date);
      return null;
    }
  }, [selected_date]);

  // Parse date constraints
  var min_date = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (date_min) {
      return new Date(date_min);
    }
    if (!allow_past_dates) {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
    return null;
  }, [date_min, allow_past_dates]);
  var max_date = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return date_max ? new Date(date_max) : null;
  }, [date_max]);

  // Generate calendar days
  var calendar_days = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var first_day = new Date(current_year, current_month, 1);
    var last_day = new Date(current_year, current_month + 1, 0);

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday = 0
    var first_weekday = first_day.getDay() - 1;
    if (first_weekday === -1) first_weekday = 6;
    var days_in_month = last_day.getDate();

    // Get previous month info
    var prev_month_last_day = new Date(current_year, current_month, 0);
    var prev_month_days = prev_month_last_day.getDate();
    var days = [];

    // Add days from previous month
    for (var i = first_weekday - 1; i >= 0; i--) {
      var day_number = prev_month_days - i;
      var date_obj = new Date(current_year, current_month - 1, day_number);
      date_obj.setHours(0, 0, 0, 0);
      var date_string = "".concat(date_obj.getFullYear(), "-").concat(String(date_obj.getMonth() + 1).padStart(2, '0'), "-").concat(String(day_number).padStart(2, '0'));
      var is_disabled = min_date && date_obj < min_date || max_date && date_obj > max_date;
      days.push({
        type: 'day',
        day: day_number,
        date: date_string,
        date_obj: date_obj,
        date_month: 'prev',
        is_selected: false,
        is_today: false,
        is_disabled: true,
        // Previous month days are always disabled
        key: "prev-".concat(day_number)
      });
    }

    // Add days from current month
    var _loop = function _loop() {
      var date_obj = new Date(current_year, current_month, _day_number);
      date_obj.setHours(0, 0, 0, 0);
      var date_string = "".concat(current_year, "-").concat(String(current_month + 1).padStart(2, '0'), "-").concat(String(_day_number).padStart(2, '0'));
      var is_selected = selected_date_obj && date_obj.getTime() === selected_date_obj.getTime();
      var is_today = function () {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        return date_obj.getTime() === today.getTime();
      }();
      var is_disabled = min_date && date_obj < min_date || max_date && date_obj > max_date;
      days.push({
        type: 'day',
        day: _day_number,
        date: date_string,
        date_obj: date_obj,
        date_month: 'current',
        is_selected: is_selected,
        is_today: is_today,
        is_disabled: is_disabled,
        key: "day-".concat(_day_number)
      });
    };
    for (var _day_number = 1; _day_number <= days_in_month; _day_number++) {
      _loop();
    }

    // Add days from next month to complete the grid
    var total_cells = Math.ceil(days.length / DAYS_IN_WEEK) * DAYS_IN_WEEK;
    var remaining_cells = total_cells - days.length;
    for (var _day_number2 = 1; _day_number2 <= remaining_cells; _day_number2++) {
      var _date_obj = new Date(current_year, current_month + 1, _day_number2);
      _date_obj.setHours(0, 0, 0, 0);
      var _date_string = "".concat(_date_obj.getFullYear(), "-").concat(String(_date_obj.getMonth() + 1).padStart(2, '0'), "-").concat(String(_day_number2).padStart(2, '0'));
      var _is_disabled = min_date && _date_obj < min_date || max_date && _date_obj > max_date;
      days.push({
        type: 'day',
        day: _day_number2,
        date: _date_string,
        date_obj: _date_obj,
        date_month: 'next',
        is_selected: false,
        is_today: false,
        is_disabled: true,
        // Next month days are always disabled
        key: "next-".concat(_day_number2)
      });
    }
    return days;
  }, [current_year, current_month, selected_date_obj, min_date, max_date]);
  var handle_prev_month = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    if (current_month === 0) {
      set_current_month(11);
      set_current_year(current_year - 1);
    } else {
      set_current_month(current_month - 1);
    }
  }, [current_month, current_year]);
  var handle_next_month = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    if (current_month === 11) {
      set_current_month(0);
      set_current_year(current_year + 1);
    } else {
      set_current_month(current_month + 1);
    }
  }, [current_month, current_year]);
  var handle_day_click = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (day_data) {
    if (day_data.is_disabled) return;
    if (on_date_select) {
      on_date_select(day_data.date);
    }
  }, [on_date_select]);

  // Handle click outside
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!show) return;
    var handle_click_outside = function handle_click_outside(e) {
      if (calendar_ref.current && !calendar_ref.current.contains(e.target)) {
        var datepicker_input = e.target.closest('[data-datepicker-input]');
        if (!datepicker_input && on_close) {
          on_close();
        }
      }
    };
    setTimeout(function () {
      document.addEventListener('click', handle_click_outside);
    }, 0);
    return function () {
      document.removeEventListener('click', handle_click_outside);
    };
  }, [show, on_close]);
  if (!show) return null;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    ref: calendar_ref,
    className: "vc",
    "data-vc": "calendar",
    "data-vc-theme": "",
    "data-vc-type": "default",
    role: "application",
    tabindex: "0",
    "aria-label": "Calendar",
    "data-vc-position": "bottom",
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      zIndex: 50
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "--single-month flex flex-col overflow-hidden"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3",
    "data-vc": "header"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-1"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    className: "vc-arrow vc-arrow_prev",
    "data-vc-arrow": "prev",
    onClick: handle_prev_month,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous month', 'wpcbooking')
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-3 flex justify-center items-center gap-x-1"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    className: "vc-month",
    "data-vc": "month",
    "data-vc-month": current_month,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select month', 'wpcbooking') + ", ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('current selected month', 'wpcbooking'), ": ").concat(MONTHS[current_month])
  }, MONTHS[current_month]), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-gray-800 dark:text-neutral-200"
  }, "/"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    className: "vc-year",
    "data-vc": "year",
    "data-vc-year": current_year,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select year', 'wpcbooking') + ", ".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('current selected year', 'wpcbooking'), ": ").concat(current_year)
  }, current_year)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-1 flex justify-end"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    className: "vc-arrow vc-arrow_next",
    "data-vc-arrow": "next",
    onClick: handle_next_month,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next month', 'wpcbooking')
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "data-vc": "wrapper"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "data-vc": "content"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "vc-week",
    "data-vc": "week",
    role: "row",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Days of the week', 'wpcbooking')
  }, WEEKDAY_LABELS.map(function (weekday) {
    var is_weekend = weekday.day === 0 || weekday.day === 6;
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("b", _extends({
      key: weekday.day,
      className: "vc-week__day",
      role: "columnheader",
      "aria-label": weekday.full,
      "data-vc-week-day": weekday.day
    }, is_weekend ? {
      'data-vc-week-day-off': ''
    } : {}), weekday["short"]);
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "vc-dates",
    "data-vc": "dates",
    role: "grid",
    "aria-live": "assertive",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Dates in the current month', 'wpcbooking')
  }, calendar_days.map(function (day_data) {
    var data_attrs = {
      'data-vc-date': day_data.date,
      'data-vc-date-month': day_data.date_month || 'current',
      'data-vc-date-week-day': day_data.date_obj.getDay()
    };
    if (day_data.is_selected) {
      data_attrs['data-vc-date-selected'] = '';
    }
    if (day_data.is_today) {
      data_attrs['data-vc-date-today'] = '';
      data_attrs['aria-current'] = 'date';
    }
    if (day_data.is_disabled) {
      data_attrs['data-vc-date-disabled'] = '';
    }
    var is_weekend = day_data.date_obj.getDay() === 0 || day_data.date_obj.getDay() === 6;
    if (is_weekend) {
      data_attrs['data-vc-date-weekend'] = '';
    }
    var month_name = MONTHS[day_data.date_obj.getMonth()];
    var year = day_data.date_obj.getFullYear();

    // Build button class
    var button_class = 'vc-date__btn';
    if (day_data.is_selected) {
      button_class += ' vc-date__btn--selected';
    }
    if (day_data.is_today) {
      button_class += ' vc-date__btn--today';
    }

    // Inline styling for selected date
    var button_style = day_data.is_selected ? {
      backgroundColor: '#ff8c00',
      color: 'white',
      fontWeight: '600'
    } : {};
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", _extends({
      key: day_data.key,
      className: "vc-date"
    }, data_attrs), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      className: button_class,
      style: button_style,
      type: "button",
      role: "gridcell",
      "aria-label": "".concat(month_name, " ").concat(day_data.day, ", ").concat(year),
      "data-vc-date-btn": "",
      onClick: function onClick() {
        return handle_day_click(day_data);
      },
      disabled: day_data.is_disabled,
      "aria-disabled": day_data.is_disabled ? 'true' : undefined,
      tabindex: day_data.is_disabled ? '-1' : undefined
    }, day_data.day));
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Calendar);

/***/ }),

/***/ "./assets/js/public/booking/blocks/DatePicker.jsx":
/*!********************************************************!*\
  !*** ./assets/js/public/booking/blocks/DatePicker.jsx ***!
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
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
/* harmony import */ var _Calendar_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Calendar.jsx */ "./assets/js/public/booking/blocks/Calendar.jsx");
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







var format_date_for_display = function format_date_for_display(date_string, format) {
  if (!date_string) return '';
  try {
    var _date_string$split = date_string.split('-'),
      _date_string$split2 = _slicedToArray(_date_string$split, 3),
      year = _date_string$split2[0],
      month = _date_string$split2[1],
      day = _date_string$split2[2];
    switch (format) {
      case 'DD/MM/YYYY':
        return "".concat(day, "/").concat(month, "/").concat(year);
      case 'MM/DD/YYYY':
        return "".concat(month, "/").concat(day, "/").concat(year);
      case 'YYYY-MM-DD':
        return date_string;
      default:
        return "".concat(day, "/").concat(month, "/").concat(year);
    }
  } catch (error) {
    console.error('[DatePicker] Error formatting date:', error);
    return date_string;
  }
};
var DatePicker = function DatePicker(_ref) {
  var _attrs$field_id, _date_picker_options$, _date_picker_options$2, _date_picker_options$3, _date_picker_options$4, _date_picker_options$5, _date_picker_options$6, _date_picker_options$7;
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  var _attrs$general = attrs.general,
    general = _attrs$general === void 0 ? {} : _attrs$general;
  var _general$icon_url = general.icon_url,
    icon_url = _general$icon_url === void 0 ? '' : _general$icon_url;
  var _general$label = general.label,
    label = _general$label === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select day', 'wpcbooking') : _general$label,
    _general$date_picker_ = general.date_picker_options,
    date_picker_options = _general$date_picker_ === void 0 ? {} : _general$date_picker_;
  var field_id = (_attrs$field_id = attrs.field_id) !== null && _attrs$field_id !== void 0 ? _attrs$field_id : '';
  var input_ref = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    show_calendar = _useState2[0],
    set_show_calendar = _useState2[1];
  var allow_past_dates = (_date_picker_options$ = date_picker_options.allow_past_dates) !== null && _date_picker_options$ !== void 0 ? _date_picker_options$ : false;
  var dateFormat = (_date_picker_options$2 = date_picker_options.dateFormat) !== null && _date_picker_options$2 !== void 0 ? _date_picker_options$2 : 'DD/MM/YYYY';
  var custom_date_format = (_date_picker_options$3 = date_picker_options.custom_date_format) !== null && _date_picker_options$3 !== void 0 ? _date_picker_options$3 : 'DD/MM/YYYY';
  var final_date_format = dateFormat === 'other' ? custom_date_format : dateFormat;
  var dateMax = (_date_picker_options$4 = date_picker_options.dateMax) !== null && _date_picker_options$4 !== void 0 ? _date_picker_options$4 : '2050-12-31';
  var dateMin = (_date_picker_options$5 = date_picker_options.dateMin) !== null && _date_picker_options$5 !== void 0 ? _date_picker_options$5 : null;
  var dateLocale = (_date_picker_options$6 = date_picker_options.dateLocale) !== null && _date_picker_options$6 !== void 0 ? _date_picker_options$6 : 'en';
  var custom_locale = (_date_picker_options$7 = date_picker_options.custom_locale) !== null && _date_picker_options$7 !== void 0 ? _date_picker_options$7 : 'cs';
  var final_locale = dateLocale === 'other' ? custom_locale : dateLocale;
  var displayValue = currentValue ? format_date_for_display(currentValue, final_date_format) : '';
  var handle_input_click = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    set_show_calendar(!show_calendar);
  }, [show_calendar]);
  var handle_date_selection = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (selected_date) {
    handleChange(selected_date);
    set_show_calendar(false);
  }, [handleChange]);
  var handle_close_calendar = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    set_show_calendar(false);
  }, []);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-4"
  }, icon_url && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      '--mask-img': "url('".concat(icon_url, "')")
    },
    className: "w-25p h-30p bg-th-orange-light cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
  }, label)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    ref: input_ref,
    className: "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500",
    type: "text",
    id: field_id,
    name: field_id,
    value: displayValue,
    onClick: handle_input_click,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select day', 'wpcbooking'),
    readOnly: true,
    "data-datepicker-input": true,
    "aria-invalid": !!error,
    "aria-describedby": error ? "".concat(field_id, "-error") : undefined
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_Calendar_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    selected_date: currentValue,
    on_date_select: handle_date_selection,
    allow_past_dates: allow_past_dates,
    date_min: dateMin,
    date_max: dateMax,
    locale: final_locale,
    show: show_calendar,
    on_close: handle_close_calendar
  }), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(attrs.field_id, error))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DatePicker);

/***/ }),

/***/ "./assets/js/public/booking/blocks/EmailInput.jsx":
/*!********************************************************!*\
  !*** ./assets/js/public/booking/blocks/EmailInput.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var EmailInput = function EmailInput(_ref) {
  var _attrs$general, _attrs$general2, _attrs$general3;
  var attrs = _ref.attrs,
    rules = _ref.rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_2__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  var handleInputChange = function handleInputChange(e) {
    handleChange(e.target.value);
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-4"
  }, ((_attrs$general = attrs.general) === null || _attrs$general === void 0 ? void 0 : _attrs$general.icon_url) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      '--mask-img': "url('".concat(attrs.general.icon_url, "')")
    },
    className: "w-25p h-30p bg-th-orange-light cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
  }, ((_attrs$general2 = attrs.general) === null || _attrs$general2 === void 0 ? void 0 : _attrs$general2.label) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email', 'wpcbooking'))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "email",
    id: attrs.field_id,
    name: attrs.field_id,
    value: currentValue,
    onChange: handleInputChange,
    className: "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500",
    placeholder: ((_attrs$general3 = attrs.general) === null || _attrs$general3 === void 0 ? void 0 : _attrs$general3.placeholder) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter your email address', 'wpcbooking'),
    required: true,
    "aria-invalid": !!error,
    "aria-describedby": error ? "".concat(attrs.field_id, "-error") : undefined
  }), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_4__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_4__.InputBookingComponent.render_error_message(attrs.field_id, error))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmailInput);

/***/ }),

/***/ "./assets/js/public/booking/blocks/GoogleMap.jsx":
/*!*******************************************************!*\
  !*** ./assets/js/public/booking/blocks/GoogleMap.jsx ***!
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
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
/* harmony import */ var _utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../utils/markerIcon.js */ "./assets/js/utils/markerIcon.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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







var useGoogleMap = function useGoogleMap(mapRef, options) {
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    map = _useState2[0],
    setMap = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var initMap = function initMap() {
      if (!window.google) {
        console.warn('⚠️ RC[useGoogleMap] window.google not available');
        return;
      }
      if (!mapRef.current) {
        console.warn('⚠️ RC[useGoogleMap] mapRef.current not available');
        return;
      }
      var _options$basic_settin = options.basic_settings,
        basic_settings = _options$basic_settin === void 0 ? {} : _options$basic_settin,
        _options$behavior = options.behavior,
        behavior = _options$behavior === void 0 ? {} : _options$behavior,
        _options$controls = options.controls,
        controls = _options$controls === void 0 ? {} : _options$controls,
        _options$ui_optimizat = options.ui_optimization,
        ui_optimization = _options$ui_optimizat === void 0 ? {} : _options$ui_optimizat;
      var mapOptions = {
        zoom: basic_settings.zoom || 16,
        minZoom: basic_settings.min_zoom || 1,
        maxZoom: basic_settings.max_zoom || 21,
        center: {
          lat: parseFloat(basic_settings.center_lat || '46.4519675'),
          lng: parseFloat(basic_settings.center_lng || '3.3221324')
        },
        mapTypeId: basic_settings.mapTypeId || 'roadmap',
        mapTypeControl: controls.mapTypeControl !== undefined ? controls.mapTypeControl : true,
        streetViewControl: controls.streetViewControl !== undefined ? controls.streetViewControl : true,
        fullscreenControl: controls.fullscreenControl !== undefined ? controls.fullscreenControl : true,
        zoomControl: controls.zoomControl !== undefined ? controls.zoomControl : true,
        scaleControl: controls.scaleControl || false,
        rotateControl: controls.rotateControl || false,
        panControl: controls.panControl || false,
        draggable: behavior.draggable !== undefined ? behavior.draggable : true,
        scrollwheel: behavior.scrollwheel !== undefined ? behavior.scrollwheel : true,
        disableDoubleClickZoom: behavior.disableDoubleClickZoom || false,
        gestureHandling: behavior.gestureHandling || 'auto',
        keyboardShortcuts: behavior.keyboardShortcuts !== undefined ? behavior.keyboardShortcuts : true,
        disableDefaultUI: ui_optimization.disableDefaultUI || false,
        clickableIcons: ui_optimization.clickableIcons !== undefined ? ui_optimization.clickableIcons : true
      };
      try {
        var googleMap = new window.google.maps.Map(mapRef.current, mapOptions);
        setMap(googleMap);
        setIsLoading(false);
      } catch (error) {
        console.error('❌ RC[useGoogleMap] Error creating map:', error);
      }
    };
    if (window.google) {
      initMap();
    } else {
      var checkGoogleMaps = setInterval(function () {
        if (window.google) {
          clearInterval(checkGoogleMaps);
          initMap();
        }
      }, 100);
      setTimeout(function () {
        clearInterval(checkGoogleMaps);
        console.error('❌ RC[useGoogleMap] Google Maps API failed to load after 10s');
      }, 10000);
    }
  }, [options]);
  return {
    map: map,
    isLoading: isLoading
  };
};
var useMarkers = function useMarkers(map, label) {
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    staticMarkers = _useState6[0],
    setStaticMarkers = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    dynamicMarker = _useState8[0],
    setDynamicMarker = _useState8[1];
  var dynamicMarkerRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var markersInitialized = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {}, [staticMarkers]);
  var createMarker = function createMarker(options) {
    // Use custom marker icon if label is provided, otherwise use default icon
    var markerIcon = options.label ? (0,_utils_markerIcon_js__WEBPACK_IMPORTED_MODULE_6__.createMarkerIcon)(options.label, options.color || 'rgb(255, 162, 94)') : {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: options.color || '#4285F4',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 8
    };
    var marker = new window.google.maps.Marker({
      position: options.position,
      map: map,
      title: options.title,
      icon: markerIcon
    });
    return marker;
  };
  var addStaticMarker = function addStaticMarker(options) {
    var position = options.position || {};
    var lat = parseFloat(position.lat);
    var lng = parseFloat(position.lng);
    if (map && !isNaN(lat) && !isNaN(lng)) {
      var validPosition = {
        lat: lat,
        lng: lng
      };
      var marker = createMarker({
        position: validPosition,
        title: options.label || label,
        color: options.color || '#4285F4'
      });
      setStaticMarkers(function (prev) {
        var newMarkers = [].concat(_toConsumableArray(prev), [marker]);
        return newMarkers;
      });
    }
  };
  var updateDynamicMarker = function updateDynamicMarker(position) {
    if (dynamicMarkerRef.current) {
      dynamicMarkerRef.current.setMap(null);
    }
    if (map) {
      var marker = createMarker({
        position: position,
        title: label,
        label: label
      });
      dynamicMarkerRef.current = marker;
      setDynamicMarker(marker);
    }
  };
  var cleanup = function cleanup() {
    staticMarkers.forEach(function (marker) {
      return marker.setMap(null);
    });
    if (dynamicMarkerRef.current) dynamicMarkerRef.current.setMap(null);
    markersInitialized.current = false;
  };
  var initializeMarkers = function initializeMarkers(markers) {
    if (markersInitialized.current || !map || !markers || markers.length === 0) return;
    markers.forEach(function (marker, index) {
      addStaticMarker(marker);
    });
    markersInitialized.current = true;
  };
  return {
    addStaticMarker: addStaticMarker,
    updateDynamicMarker: updateDynamicMarker,
    cleanup: cleanup,
    initializeMarkers: initializeMarkers
  };
};
var useAutocomplete = function useAutocomplete(inputRef, onPlaceSelect) {
  var _useState9 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState0 = _slicedToArray(_useState9, 2),
    autocomplete = _useState0[0],
    setAutocomplete = _useState0[1];
  var isInitialized = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!inputRef.current || !window.google || isInitialized.current) return;
    try {
      var autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode']
      });
      setAutocomplete(autocompleteInstance);
      isInitialized.current = true;
      autocompleteInstance.addListener('place_changed', function () {
        var _place$geometry;
        var place = autocompleteInstance.getPlace();
        if ((_place$geometry = place.geometry) !== null && _place$geometry !== void 0 && _place$geometry.location) {
          onPlaceSelect(place);
        }
      });
    } catch (error) {
      console.error('❌ RC[useAutocomplete] Error initializing autocomplete:', error);
      console.warn('⚠️ RC[useAutocomplete] Places API may not be enabled or API key has restrictions');
    }
  }, [onPlaceSelect]);
  return autocomplete;
};
var extractCountryCode = function extractCountryCode(addressComponents) {
  if (!addressComponents) return null;
  var countryComponent = addressComponents.find(function (component) {
    return component.types.includes('country');
  });
  return (countryComponent === null || countryComponent === void 0 ? void 0 : countryComponent.short_name) || null;
};
var geocodeCoordinates = function geocodeCoordinates(lat, lng) {
  return new Promise(function (resolve) {
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({
      location: {
        lat: lat,
        lng: lng
      }
    }, function (results, status) {
      if (status === 'OK' && results[0]) {
        var address = results[0].formatted_address;
        var country_code = extractCountryCode(results[0].address_components);
        resolve({
          address: address,
          country_code: country_code
        });
      } else {
        resolve({
          address: null,
          country_code: null
        });
      }
    });
  });
};
var GoogleMap = function GoogleMap(_ref) {
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var user = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _context$bookingFormM;
    return ((_context$bookingFormM = context.bookingFormManager) === null || _context$bookingFormM === void 0 ? void 0 : _context$bookingFormM.getUser()) || null;
  }, [context.bookingFormManager]);
  var _attrs$general = attrs.general,
    general = _attrs$general === void 0 ? {} : _attrs$general;
  var _general$label = general.label,
    label = _general$label === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Location', 'wpcbooking') : _general$label,
    _general$icon_url = general.icon_url,
    icon_url = _general$icon_url === void 0 ? '' : _general$icon_url,
    _general$basic_settin = general.basic_settings,
    basic_settings = _general$basic_settin === void 0 ? {} : _general$basic_settin,
    _general$behavior = general.behavior,
    behavior = _general$behavior === void 0 ? {} : _general$behavior,
    _general$controls = general.controls,
    controls = _general$controls === void 0 ? {} : _general$controls,
    _general$ui_optimizat = general.ui_optimization,
    ui_optimization = _general$ui_optimizat === void 0 ? {} : _general$ui_optimizat;
  var field_id = attrs.field_id || "map_".concat(label.toLowerCase().replace(/\s+/g, '_'));
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;

  // Parse current value as JSON if it's a string, otherwise use as object
  var parseCurrentValue = function parseCurrentValue() {
    if (!currentValue) return {};
    if (typeof currentValue === 'string') {
      try {
        return JSON.parse(currentValue);
      } catch (e) {
        console.warn('Failed to parse currentValue:', e);
        return {};
      }
    }
    return currentValue;
  };
  var current_value = parseCurrentValue();
  var height = basic_settings.height || 400;
  var current_address = (current_value === null || current_value === void 0 ? void 0 : current_value.address) || '';
  var _useState1 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(current_address),
    _useState10 = _slicedToArray(_useState1, 2),
    address = _useState10[0],
    setAddress = _useState10[1];
  var _useState11 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(current_value),
    _useState12 = _slicedToArray(_useState11, 2),
    positionData = _useState12[0],
    setPositionData = _useState12[1];
  var _useState13 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isTyping = _useState14[0],
    setIsTyping = _useState14[1];
  var mapRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var inputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var mapOptions = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return {
      basic_settings: basic_settings,
      behavior: behavior,
      controls: controls,
      ui_optimization: ui_optimization
    };
  }, [JSON.stringify(basic_settings), JSON.stringify(behavior), JSON.stringify(controls), JSON.stringify(ui_optimization)]);
  var _useGoogleMap = useGoogleMap(mapRef, mapOptions),
    map = _useGoogleMap.map,
    isLoading = _useGoogleMap.isLoading;
  var _useMarkers = useMarkers(map, label),
    addStaticMarker = _useMarkers.addStaticMarker,
    updateDynamicMarker = _useMarkers.updateDynamicMarker,
    cleanup = _useMarkers.cleanup,
    initializeMarkers = _useMarkers.initializeMarkers;
  var updatePositionData = function updatePositionData(address, lat, lng) {
    var country_code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var isUserInteraction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var data = {
      address: address,
      lat: lat,
      lng: lng,
      country_code: country_code
    };
    saveUserCountry(country_code);
    setPositionData(data);
    // Use handleChange from useInputField to save position data
    handleChange(JSON.stringify(data), isUserInteraction);
  };
  var saveUserCountry = function saveUserCountry(country_code) {
    if (!country_code) return;
    if (!user) return;
    user.set('user_country', country_code);
  };
  var handleAddressChange = function handleAddressChange(e) {
    var value = e.target.value;
    setIsTyping(true);
    setAddress(value);

    // Save address text immediately (even without coordinates)
    // Coordinates will be updated when place is selected or map is clicked
    if (value.trim()) {
      var currentData = positionData || {};
      var dataToSave = _objectSpread(_objectSpread({}, currentData), {}, {
        address: value
      });
      handleChange(JSON.stringify(dataToSave), true);
    } else {
      // Clear value if input is empty
      handleChange('', true);
    }
    setTimeout(function () {
      setIsTyping(false);
    }, 2000);
  };
  var handlePlaceSelect = function handlePlaceSelect(place) {
    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();
    var address = place.formatted_address || place.name;
    var country_code = extractCountryCode(place.address_components);
    setIsTyping(false);
    setAddress(address);
    // Address will be saved via updatePositionData -> handleChange

    updatePositionData(address, lat, lng, country_code);
    updateDynamicMarker({
      lat: lat,
      lng: lng
    });
    if (map) {
      map.setCenter({
        lat: lat,
        lng: lng
      });
      map.setZoom(16);
    }
  };
  var handleMapClick = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
      var lat, lng, _yield$geocodeCoordin, newAddress, country_code;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            lat = event.latLng.lat();
            lng = event.latLng.lng();
            updateDynamicMarker({
              lat: lat,
              lng: lng
            });
            _context.n = 1;
            return geocodeCoordinates(lat, lng);
          case 1:
            _yield$geocodeCoordin = _context.v;
            newAddress = _yield$geocodeCoordin.address;
            country_code = _yield$geocodeCoordin.country_code;
            if (newAddress) {
              setIsTyping(false);
              setAddress(newAddress);
              // Address will be saved via updatePositionData -> handleChange
              updatePositionData(newAddress, lat, lng, country_code);
            }
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function handleMapClick(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (map) {
      initializeMarkers(attrs.markers);
      var clickListener = map.addListener('click', handleMapClick);
      return function () {
        window.google.maps.event.removeListener(clickListener);
      };
    }
  }, [map, attrs.markers]);
  useAutocomplete(inputRef, handlePlaceSelect);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return cleanup;
  }, []);

  // Update address and position when currentValue changes (e.g., from storage)
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (current_value !== null && current_value !== void 0 && current_value.address && current_value !== null && current_value !== void 0 && current_value.lat && current_value !== null && current_value !== void 0 && current_value.lng) {
      setAddress(current_value.address);
      setPositionData(current_value);
    }
  }, [currentValue]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (positionData !== null && positionData !== void 0 && positionData.address && positionData !== null && positionData !== void 0 && positionData.lat && positionData !== null && positionData !== void 0 && positionData.lng && map && !isTyping) {
      setAddress(positionData.address);
      updateDynamicMarker({
        lat: positionData.lat,
        lng: positionData.lng
      });
      map.setCenter({
        lat: positionData.lat,
        lng: positionData.lng
      });
      map.setZoom(16);
    }
  }, [positionData, map, isTyping]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-stretch px-30p py-[18px] flex-col gap-y-2 border border-th-blue-light rounded-[50px]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-4"
  }, icon_url && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      '--mask-img': "url('".concat(icon_url, "')")
    },
    className: "w-25p h-30p bg-th-orange-light cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
  }, label)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 text-th-orange-light max-medium:text-[1rem]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    ref: inputRef,
    type: "text",
    id: field_id,
    name: "map_address_search",
    value: address,
    onChange: handleAddressChange,
    className: "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter address or location', 'wpcbooking'),
    required: true,
    "aria-invalid": !!error,
    "aria-describedby": error ? "".concat(field_id, "-error") : undefined
  }), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(field_id, error)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    id: "".concat(field_id, "_position"),
    name: "".concat(field_id, "_position"),
    value: JSON.stringify(positionData)
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    ref: mapRef,
    className: "google-map border border-th-blue-light rounded-[10px] h-100 hs-leaflet z-10 ".concat(isLoading ? 'loading' : ''),
    style: {
      height: "".concat(height, "px")
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleMap);

/***/ }),

/***/ "./assets/js/public/booking/blocks/IconsList.jsx":
/*!*******************************************************!*\
  !*** ./assets/js/public/booking/blocks/IconsList.jsx ***!
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
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var IconsList = function IconsList(_ref) {
  var _context$bookingFormM;
  var attrs = _ref.attrs,
    rules = _ref.rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var storedValue = ((_context$bookingFormM = context.bookingFormManager) === null || _context$bookingFormM === void 0 ? void 0 : _context$bookingFormM.get_stored_value(attrs.field_id)) || "";
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  var _ref2 = attrs.general || {},
    _ref2$number_allowed = _ref2.number_allowed,
    number_allowed = _ref2$number_allowed === void 0 ? 1 : _ref2$number_allowed,
    _ref2$icons = _ref2.icons,
    icons = _ref2$icons === void 0 ? [] : _ref2$icons;
  var isInitialized = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!isInitialized.current) {
      isInitialized.current = true;
      // Don't trigger validation on init - pass false to indicate it's not user interaction
      handleChange("", false);
    }
  }, []);

  // Parse currentValue - handle both string and array formats
  var selected_icons = function () {
    if (Array.isArray(storedValue)) {
      return storedValue;
    }
    if (typeof storedValue === "string" && storedValue.trim() !== "") {
      return storedValue.split(",").map(function (val) {
        return val.trim();
      }).filter(function (val) {
        return val !== "";
      });
    }
    return [];
  }();
  var handle_icon_click = function handle_icon_click(icon_value, selected_icons, field_id, number_allowed) {
    var _context$bookingFormM2;
    var new_selection;
    if (number_allowed === 1) {
      if (selected_icons.includes(icon_value)) {
        return;
      }
      new_selection = [icon_value];
    } else {
      if (selected_icons.includes(icon_value)) {
        new_selection = selected_icons.filter(function (val) {
          return val !== icon_value;
        });
      } else if (selected_icons.length < number_allowed) {
        new_selection = [].concat(_toConsumableArray(selected_icons), [icon_value]);
      } else {
        return;
      }
    }
    var value_for_form = new_selection.length > 0 ? new_selection.join(",") : "";
    var stored_value = ((_context$bookingFormM2 = context.bookingFormManager) === null || _context$bookingFormM2 === void 0 ? void 0 : _context$bookingFormM2.get_stored_value(field_id)) || "";
    if (value_for_form && stored_value === value_for_form) {
      handleChange("__reset_".concat(Date.now()), true); // User interaction
      setTimeout(function () {
        return handleChange(value_for_form, true);
      }, 10); // User interaction
    } else {
      handleChange(value_for_form, true); // User interaction - this will mark as touched
    }
  };
  var render_icon_item = function render_icon_item(icon_item, index, selected_icons, field_id, number_allowed) {
    var _icon_item$icon_url;
    var icon_value = icon_item.label || "icon_".concat(index);
    var is_selected = selected_icons.includes(icon_value);
    var icon_url = (_icon_item$icon_url = icon_item.icon_url) !== null && _icon_item$icon_url !== void 0 ? _icon_item$icon_url : ""; // todo: add base img to localizace php to js

    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: index,
      className: "js-item basis-0 min-w-[240px] rounded-[15px] cursor-pointer group transition-all duration-300 ".concat(is_selected ? "is-active bg-th-orange text-white" : "bg-white hover:bg-gray-50"),
      style: {
        boxShadow: is_selected ? "0 0 15px rgba(255, 165, 0, 0.3)" : "0 0 10px #e5e5e5",
        transform: is_selected ? "scale(1.02)" : "scale(1)"
      },
      onClick: function onClick() {
        return handle_icon_click(icon_value, selected_icons, field_id, number_allowed);
      }
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "checkbox",
      id: icon_value,
      name: "".concat(field_id, "[]"),
      value: icon_value,
      className: "hidden-checkbox js-countable",
      checked: is_selected,
      readOnly: true // Controlled by parent click
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "h-full flex flex-col justify-between py-20p"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "af-p20 leading-6 text-center transition-colors duration-300 ".concat(is_selected ? "text-white font-medium" : "text-gray-700"),
      style: is_selected ? {
        textShadow: "0 0 2px rgba(255,255,255,0.5)"
      } : {}
    }, icon_item.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon %d", "wpcbooking"), index + 1)), icon_url && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('".concat(icon_url, "')")
      },
      className: "w-115p h-115p mt-20p mx-auto cs-mask transition-all duration-300 ".concat(is_selected ? "bg-white scale-110" : "bg-black group-hover:bg-th-orange group-hover:scale-105")
    })));
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full mt-40p large:mt-130p",
    "data-name": attrs.id
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    "data-maximum-choices": number_allowed,
    className: "flex js-choices-wrap justify-center gap-20p large:gap-40p flex-wrap [&_*]:transition-all [&_*]:duration-300 aff-choices-wrap"
  }, icons.map(function (icon_item, index) {
    return render_icon_item(icon_item, index, selected_icons, attrs.field_id, number_allowed);
  }), icons.length === 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
    className: "text-center text-gray-500 py-8 col-span-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-2xl mb-2"
  }, "\uD83C\uDFAF"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No icons configured", "wpcbooking")))), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(attrs.field_id, error));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconsList);

/***/ }),

/***/ "./assets/js/public/booking/blocks/InputBookingComponent.jsx":
/*!*******************************************************************!*\
  !*** ./assets/js/public/booking/blocks/InputBookingComponent.jsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputBookingComponent: () => (/* binding */ InputBookingComponent)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BaseBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseBookingComponent.jsx */ "./assets/js/public/booking/blocks/BaseBookingComponent.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var InputBookingComponent = /*#__PURE__*/function (_BaseBookingComponent) {
  function InputBookingComponent() {
    _classCallCheck(this, InputBookingComponent);
    return _callSuper(this, InputBookingComponent, arguments);
  }
  _inherits(InputBookingComponent, _BaseBookingComponent);
  return _createClass(InputBookingComponent, [{
    key: "get_field_prefix",
    value: function get_field_prefix() {
      return 'input';
    }
  }, {
    key: "get_input_type",
    value: function get_input_type() {
      return 'text';
    }
  }, {
    key: "get_input_attributes",
    value: function get_input_attributes() {
      return {};
    }
  }, {
    key: "render_input",
    value: function render_input(field_id, current_value) {
      var _this = this;
      var handle_change = function handle_change(e) {
        return _this.handle_change(field_id, e.target.value);
      };
      var error = this.get_field_error(field_id);
      var is_valid = this.is_field_valid(field_id);
      var input_classes = this.get_field_classes(field_id, "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p pr-12 transition-colors duration-200");
      var handle_focus = function handle_focus() {
        if (error) {
          _this.errorManager.scrollToError(field_id);
        }
      };
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "w-full relative"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", _extends({
        type: this.get_input_type(),
        id: field_id,
        name: field_id,
        value: current_value,
        onChange: handle_change,
        onFocus: handle_focus,
        className: input_classes,
        placeholder: this.general.placeholder || this.get_default_placeholder(),
        "aria-invalid": !!error,
        "aria-describedby": error ? "".concat(field_id, "-error") : undefined
      }, this.get_input_attributes())), InputBookingComponent.render_validation_indicator(error, is_valid), InputBookingComponent.render_error_message(field_id, error));
    }
  }, {
    key: "get_default_placeholder",
    value: function get_default_placeholder() {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter value', 'wpcbooking');
    }
  }], [{
    key: "render_validation_indicator",
    value: function render_validation_indicator(error, is_valid) {
      if (!error && is_valid) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "absolute right-3 top-[27.5px] transform -translate-y-1/2 text-green-500 pointer-events-none"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
          className: "w-5 h-5",
          fill: "currentColor",
          viewBox: "0 0 20 20"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
          fillRule: "evenodd",
          d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
          clipRule: "evenodd"
        })));
      }
      if (error) {
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          className: "absolute right-3 top-[27.5px] transform -translate-y-1/2 text-red-500 pointer-events-none"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
          className: "w-5 h-5",
          fill: "currentColor",
          viewBox: "0 0 20 20"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
          fillRule: "evenodd",
          d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
          clipRule: "evenodd"
        })));
      }
      return null;
    }
  }, {
    key: "render_error_message",
    value: function render_error_message(field_id, error) {
      if (!error) return null;
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        id: "".concat(field_id, "-error"),
        className: "error-message mt-2 flex items-start gap-x-2 text-red-600 text-sm"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
        className: "w-4 h-4 mt-0.5",
        fill: "currentColor",
        viewBox: "0 0 20 20"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
        clipRule: "evenodd"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
        className: "text-sm"
      }, error));
    }
  }]);
}(_BaseBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_2__.BaseBookingComponent);

/***/ }),

/***/ "./assets/js/public/booking/blocks/NumberInput.jsx":
/*!*********************************************************!*\
  !*** ./assets/js/public/booking/blocks/NumberInput.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var NumberInput = function NumberInput(_ref) {
  var _attrs$general, _attrs$general2, _attrs$general3;
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    setIsValid = _useInputField.setIsValid;
  var _ref2 = attrs.field || {},
    _ref2$add_after = _ref2.add_after,
    add_after = _ref2$add_after === void 0 ? 1 : _ref2$add_after,
    _ref2$default_value = _ref2.default_value,
    default_value = _ref2$default_value === void 0 ? 1 : _ref2$default_value,
    _ref2$min = _ref2.min,
    minStr = _ref2$min === void 0 ? "1" : _ref2$min,
    _ref2$max = _ref2.max,
    maxStr = _ref2$max === void 0 ? "1000" : _ref2$max,
    _ref2$singular = _ref2.singular,
    singular = _ref2$singular === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("item", "wpcbooking") : _ref2$singular,
    _ref2$plural = _ref2.plural,
    plural = _ref2$plural === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("items", "wpcbooking") : _ref2$plural;
  // Convert min/max to numbers
  var min = parseInt(minStr) || 1;
  var max = parseInt(maxStr) || 1000;
  var displayValue = currentValue ? parseInt(currentValue) : default_value;
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setIsValid(true);
    handleChange(displayValue, true); // User interaction
  }, [displayValue]);
  var handle_increment = function handle_increment() {
    var current_num = parseInt(displayValue) || min;
    var new_value = Math.min(max, current_num + add_after);
    handleChange(new_value.toString(), true); // User interaction
  };
  var handle_decrement = function handle_decrement() {
    var current_num = parseInt(displayValue) || min;
    var new_value = Math.max(min, current_num - add_after);
    handleChange(new_value.toString(), true); // User interaction
  };
  var handleInputChange = function handleInputChange(e) {
    handleChange(e.target.value, true); // User interaction
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4",
    "data-affid": attrs.field_id,
    "data-label": ((_attrs$general = attrs.general) === null || _attrs$general === void 0 ? void 0 : _attrs$general.label) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Number fields", "wpcbooking")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-4"
  }, ((_attrs$general2 = attrs.general) === null || _attrs$general2 === void 0 ? void 0 : _attrs$general2.icon_url) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      "--mask-img": "url('".concat(attrs.general.icon_url, "')")
    },
    className: "w-25p h-30p bg-th-orange-light cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
  }, ((_attrs$general3 = attrs.general) === null || _attrs$general3 === void 0 ? void 0 : _attrs$general3.label) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Number fields", "wpcbooking"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 max-medium:text-[1rem] text-th-orange-light medium:w-3/5 flex gap-x-2 items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "number-minus",
    className: "shrink-0 cursor-pointer w-55p h-55p rounded-full bg-th-blue flex justify-center items-center hover:bg-blue-600 transition-colors",
    onClick: handle_decrement
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-7 h-7 cs-mask bg-white",
    style: {
      "--mask-img": "url('/wp-content/plugins/acf-flowform/assets/img/minus.svg')"
    }
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "number",
    id: attrs.field_id,
    name: attrs.field_id,
    value: displayValue,
    onChange: handleInputChange,
    className: "grow w-full border-2 border-th-blue rounded-[10px] h-55p px-10p text-center text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500",
    min: min,
    max: max,
    step: add_after,
    required: true,
    "aria-invalid": !!error,
    "aria-describedby": error ? "".concat(attrs.field_id, "-error") : undefined
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "number-plus",
    className: "shrink-0 cursor-pointer w-55p h-55p rounded-full bg-th-blue flex justify-center items-center hover:bg-blue-600 transition-colors",
    onClick: handle_increment
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-7 h-7 cs-mask bg-white",
    style: {
      "--mask-img": "url('/wp-content/plugins/acf-flowform/assets/img/plus.svg')"
    }
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    id: "".concat(attrs.field_id, "_display"),
    name: "".concat(attrs.field_id, "_display"),
    "data-value": displayValue,
    className: "ml-2 text-gray-600",
    "data-singular": singular,
    "data-plural": plural,
    "data-max": max,
    "data-min": min,
    "data-add_after": add_after
  }, displayValue > 1 ? plural : singular)), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(attrs.field_id, error))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberInput);

/***/ }),

/***/ "./assets/js/public/booking/blocks/PhoneInput.jsx":
/*!********************************************************!*\
  !*** ./assets/js/public/booking/blocks/PhoneInput.jsx ***!
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
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
/* harmony import */ var country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! country-list-with-dial-code-and-flag */ "./node_modules/country-list-with-dial-code-and-flag/dist/index.js");
/* harmony import */ var country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var PhoneInput = function PhoneInput(_ref) {
  var _attrs$general, _attrs$advanced, _attrs$advanced2, _attrs$advanced3, _attrs$advanced4, _attrs$general2, _attrs$general3, _attrs$general4;
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var user = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _context$bookingFormM;
    return ((_context$bookingFormM = context.bookingFormManager) === null || _context$bookingFormM === void 0 ? void 0 : _context$bookingFormM.getUser()) || null;
  }, [context.bookingFormManager]);
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  var phoneOptions = ((_attrs$general = attrs.general) === null || _attrs$general === void 0 ? void 0 : _attrs$general.phone_number_options) || {};
  var getUserCountry = function getUserCountry() {
    if (user) {
      var storedCountryCode = user.get('user_country_code');
      if (storedCountryCode) {
        return storedCountryCode.toUpperCase();
      }
      var stored_country = user.get('user_country');
      if (stored_country) {
        return stored_country.toUpperCase();
      }
    }
    return null;
  };
  var userCountry = getUserCountry();
  if (userCountry) {
    phoneOptions.default_country = userCountry;
  }
  var normalizeToggle = function normalizeToggle(value) {
    if (value === true || value === 1 || value === '1') return true;
    if (value === false || value === 0 || value === '0') return false;
    return value !== false;
  };
  var allowDropdown = normalizeToggle(phoneOptions.allow_dropdown) !== false;
  var separateDialCode = normalizeToggle(phoneOptions.separate_dial_code) !== false;
  var nativeNames = normalizeToggle(phoneOptions.native_names) === true;
  var isRequired = ((_attrs$advanced = attrs.advanced) === null || _attrs$advanced === void 0 ? void 0 : _attrs$advanced.required) === true || ((_attrs$advanced2 = attrs.advanced) === null || _attrs$advanced2 === void 0 ? void 0 : _attrs$advanced2.required) === 'Required' || ((_attrs$advanced3 = attrs.advanced) === null || _attrs$advanced3 === void 0 ? void 0 : _attrs$advanced3.required) === 1 || ((_attrs$advanced4 = attrs.advanced) === null || _attrs$advanced4 === void 0 ? void 0 : _attrs$advanced4.required) === '1';
  var get_initial_country = function get_initial_country() {
    var default_country = phoneOptions.default_country;
    if (default_country) {
      return default_country.toUpperCase();
    }

    // 3. Konečný fallback na 'US'
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
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(currentValue || ''),
    _useState6 = _slicedToArray(_useState5, 2),
    localValue = _useState6[0],
    setLocalValue = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    searchQuery = _useState8[0],
    setSearchQuery = _useState8[1];
  var pendingValueRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var dropdownRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var dropdownListRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var searchInputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var skipAutoDetectionRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
  var autoDetectionTimeoutRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var countries = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var allCountries = country_list_with_dial_code_and_flag__WEBPACK_IMPORTED_MODULE_6___default().getAll();
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
  var filteredCountries = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!searchQuery || searchQuery.trim() === '') return countries;
    var normalizeText = function normalizeText(text) {
      if (!text) return '';
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };
    var searchTerm = normalizeText(searchQuery.trim());
    return countries.filter(function (country) {
      var normalizedCode = normalizeText(country.code);
      var normalizedName = normalizeText(country.name);
      var normalizedDialCode = normalizeText(country.dialCode);
      return normalizedCode.includes(searchTerm) || normalizedName.includes(searchTerm) || normalizedDialCode.includes(searchTerm);
    });
  }, [countries, searchQuery]);
  var selectedCountryData = countries.find(function (c) {
    return c.code === selectedCountry;
  }) || (countries.length > 0 ? countries[0] : null);
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
    if (!currentValue || typeof currentValue !== 'string') {
      if (selectedCountryData) {
        return selectedCountryData.dialCode;
      }
      return '';
    }
    if (currentValue.startsWith('+')) {
      return formatPhoneNumber(currentValue, selectedCountryData === null || selectedCountryData === void 0 ? void 0 : selectedCountryData.dialCode);
    }
    if (selectedCountryData) {
      var phoneNumber = currentValue.replace(/[^\d]/g, '');
      var combinedValue = combineDialCodeAndNumber(selectedCountryData.dialCode, phoneNumber);
      return formatPhoneNumber(combinedValue, selectedCountryData.dialCode);
    }
    return currentValue;
  }, [currentValue, selectedCountryData, combineDialCodeAndNumber, formatPhoneNumber]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setLocalValue(displayValue);
  }, [displayValue]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (skipAutoDetectionRef.current) {
      return;
    }
    if (currentValue && typeof currentValue === 'string' && currentValue.trim() !== '') {
      var detectedCountry = parseDialCodeFromValue(currentValue);
      if (detectedCountry && countries.some(function (c) {
        return c.code === detectedCountry;
      }) && selectedCountry !== detectedCountry) {
        setSelectedCountry(detectedCountry);
      }
    }
  }, [currentValue, parseDialCodeFromValue, countries, selectedCountry]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    // Pouze pokud není žádná hodnota zadána
    if (currentValue) {
      return;
    }

    // 1. Primárně zkus user_country ze storage
    var target_country = null;

    // 2. Fallback na default_country z attrs
    if (!target_country) {
      var default_country = phoneOptions.default_country;
      target_country = default_country ? default_country.toUpperCase() : 'US';
    }

    // 3. Kontrola, zda země existuje v seznamu
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
  }, [phoneOptions.default_country, countries.length, selectedCountry, currentValue, context.formStore]);

  // Listen for user_country changes from storage (e.g., from GoogleMap)
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!context.formStore) {
      return;
    }
    var handle_storage_update = function handle_storage_update(event) {
      // Check if user_country was updated
      if (event.type === 'field_change' && event.fieldName === 'user_country') {
        var new_country = event.newValue;
        if (new_country) {
          var new_country_code = new_country.toUpperCase();
          var country_exists = countries.some(function (c) {
            return c.code === new_country_code;
          });
          if (country_exists && selectedCountry !== new_country_code) {
            // Zakázat automatickou detekci země při systémové změně
            skipAutoDetectionRef.current = true;
            setSelectedCountry(new_country_code);

            // If there's already a phone number, update it with new country code
            if (currentValue) {
              var new_country_data = countries.find(function (c) {
                return c.code === new_country_code;
              });
              if (new_country_data && selectedCountryData) {
                var phone_number_without_dial_code = extractPhoneNumberWithoutDialCode(currentValue, selectedCountryData.dialCode);
                var combined_value = combineDialCodeAndNumber(new_country_data.dialCode, phone_number_without_dial_code);

                // Nastavení hodnoty bez validace při systémové změně země
                context.setFormData(_defineProperty({}, attrs.field_id, combined_value));

                // Po krátké době povolit automatickou detekci zpět
                if (autoDetectionTimeoutRef.current) {
                  clearTimeout(autoDetectionTimeoutRef.current);
                }
                autoDetectionTimeoutRef.current = setTimeout(function () {
                  skipAutoDetectionRef.current = false;
                  autoDetectionTimeoutRef.current = null;
                }, 100);
              }
            }
          }
        }
      }
    };

    // Add listener for form store events
    context.formStore.add_listener(handle_storage_update);
    return function () {
      context.formStore.remove_listener(handle_storage_update);
    };
  }, [context.formStore, countries, selectedCountry, selectedCountryData, currentValue, extractPhoneNumberWithoutDialCode, combineDialCodeAndNumber, handleChange]);
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
      if (user) {
        user.set('user_country_code', countryCode);
      }
      // Zakázat automatickou detekci země po manuálním výběru
      skipAutoDetectionRef.current = true;
      setSelectedCountry(countryCode);
      setDropdownOpen(false);
      setSearchQuery('');
      var phoneNumberWithoutDialCode = localValue ? extractPhoneNumberWithoutDialCode(localValue, (selectedCountryData === null || selectedCountryData === void 0 ? void 0 : selectedCountryData.dialCode) || '') : '';
      var combinedValue = combineDialCodeAndNumber(newCountryData.dialCode, phoneNumberWithoutDialCode);
      var formattedValue = formatPhoneNumber(combinedValue, newCountryData.dialCode);
      setLocalValue(formattedValue);

      // Nastavení hodnoty bez validace při změně dialCode
      context.setFormData(_defineProperty({}, attrs.field_id, combinedValue));

      // Po krátké době povolit automatickou detekci zpět (po update currentValue)
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

  // Cleanup timeout při unmount
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return function () {
      if (autoDetectionTimeoutRef.current) {
        clearTimeout(autoDetectionTimeoutRef.current);
      }
    };
  }, []);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (dropdownOpen) {
      setTimeout(function () {
        var _searchInputRef$curre;
        (_searchInputRef$curre = searchInputRef.current) === null || _searchInputRef$curre === void 0 || _searchInputRef$curre.focus();
      }, 100);
    }
  }, [dropdownOpen]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-4"
  }, ((_attrs$general2 = attrs.general) === null || _attrs$general2 === void 0 ? void 0 : _attrs$general2.icon_url) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      '--mask-img': "url('".concat(attrs.general.icon_url, "')")
    },
    className: "w-25p h-30p bg-th-orange-light cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
  }, ((_attrs$general3 = attrs.general) === null || _attrs$general3 === void 0 ? void 0 : _attrs$general3.label) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Phone Number', 'wpcbooking'))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full relative",
    ref: dropdownRef
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center w-full"
  }, allowDropdown && selectedCountryData && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    id: "".concat(attrs.field_id, "-dropdown-button"),
    type: "button",
    onClick: toggleDropdown,
    className: "shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border-2 border-th-blue border-r-0 rounded-s-[10px] hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-55p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "me-2"
  }, selectedCountryData.flag), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
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
  })))), !allowDropdown && selectedCountryData && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border-2 border-th-blue border-r-0 rounded-s-[10px] h-55p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "me-2"
  }, selectedCountryData.flag)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "tel",
    id: attrs.field_id,
    name: attrs.field_id,
    value: localValue,
    onChange: handleInputChange,
    onInput: handleInput,
    onBlur: commitValue,
    className: "flex-1 w-full border-2 border-th-blue ".concat(allowDropdown ? 'border-s-0 rounded-e-[10px]' : 'rounded-[10px]', " h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"),
    placeholder: ((_attrs$general4 = attrs.general) === null || _attrs$general4 === void 0 ? void 0 : _attrs$general4.placeholder) || '123-456-7890',
    required: isRequired,
    "aria-invalid": !!error,
    "aria-describedby": error ? "".concat(attrs.field_id, "-error") : undefined
  })), dropdownOpen && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "".concat(attrs.field_id, "-dropdown"),
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
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search country...', 'wpcbooking'),
    className: "w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
    autoComplete: "off"
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    ref: dropdownListRef,
    className: "py-2 text-sm text-left max-h-60 overflow-y-auto",
    "aria-labelledby": "".concat(attrs.field_id, "-dropdown-button")
  }, filteredCountries.length > 0 ? filteredCountries.map(function (country) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: country.code
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      type: "button",
      "data-country-code": country.code,
      onClick: function onClick() {
        return handleCountrySelect(country.code);
      },
      className: "inline-flex w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ".concat(selectedCountry === country.code ? 'bg-gray-100 text-gray-900' : 'text-gray-900'),
      role: "menuitem"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "inline-flex items-center gap-2"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, country.flag), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "font-mono text-xs text-gray-500"
    }, country.code), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, country.name), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "text-gray-400"
    }, "(", country.dialCode, ")"))));
  }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
    className: "px-4 py-2 text-sm text-gray-500 text-center"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No countries found', 'wpcbooking')))), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(attrs.field_id, error))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhoneInput);

/***/ }),

/***/ "./assets/js/public/booking/blocks/ProductGrid.jsx":
/*!*********************************************************!*\
  !*** ./assets/js/public/booking/blocks/ProductGrid.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
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






// Loading mode constants
var LOADING_MODE = {
  ALL_AT_ONCE: "all",
  LOAD_MORE_BUTTON: "button",
  INFINITE_SCROLL: "scroll"
};
var ProductGrid = function ProductGrid(_ref) {
  var _attrs$items3, _attrs$items4, _attrs$items5, _attrs$items7, _attrs$items9, _window$wpcbooking_pu, _window$wpcbooking_pu6;
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var loading_config = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _attrs$items, _attrs$items2;
    return {
      mode: ((_attrs$items = attrs.items) === null || _attrs$items === void 0 ? void 0 : _attrs$items.loading_mode) || LOADING_MODE.ALL_AT_ONCE,
      items_per_load: parseInt((_attrs$items2 = attrs.items) === null || _attrs$items2 === void 0 ? void 0 : _attrs$items2.items_per_load, 10) || 6
    };
  }, [(_attrs$items3 = attrs.items) === null || _attrs$items3 === void 0 ? void 0 : _attrs$items3.loading_mode, (_attrs$items4 = attrs.items) === null || _attrs$items4 === void 0 ? void 0 : _attrs$items4.items_per_load]);
  var labelPickLater = ((_attrs$items5 = attrs.items) === null || _attrs$items5 === void 0 ? void 0 : _attrs$items5.label_pick_later) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Pick later", "wpcbooking");
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(""),
    _useState2 = _slicedToArray(_useState, 2),
    searchTerm = _useState2[0],
    setSearchTerm = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    debouncedSearchTerm = _useState4[0],
    setDebouncedSearchTerm = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSearching = _useState6[0],
    setIsSearching = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(loading_config.items_per_load),
    _useState8 = _slicedToArray(_useState7, 2),
    visibleCount = _useState8[0],
    setVisibleCount = _useState8[1];
  var _useState9 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    isLoadingMore = _useState0[0],
    setIsLoadingMore = _useState0[1];
  var _useState1 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState10 = _slicedToArray(_useState1, 2),
    selectedAttributeFilter = _useState10[0],
    setSelectedAttributeFilter = _useState10[1];
  var listEndRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setNextButtonLabel(labelPickLater);
  }, [labelPickLater]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setVisibleCount(loading_config.items_per_load);
  }, [loading_config.items_per_load]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    }
    var timer = setTimeout(function () {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
      setVisibleCount(loading_config.items_per_load);
    }, 500);
    return function () {
      return clearTimeout(timer);
    };
  }, [searchTerm, loading_config.items_per_load]);
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  var fieldId = attrs.field_id;
  // Parse attrs data from PHP
  var _ref2 = attrs.general || attrs || {},
    _ref2$products = _ref2.products,
    products = _ref2$products === void 0 ? [] : _ref2$products,
    _ref2$number_allowed = _ref2.number_allowed,
    number_allowed = _ref2$number_allowed === void 0 ? null : _ref2$number_allowed,
    _ref2$name = _ref2.name,
    name = _ref2$name === void 0 ? "select_list_products" : _ref2$name,
    _ref2$filter_attribut = _ref2.filter_attribute,
    filter_attribute = _ref2$filter_attribut === void 0 ? "" : _ref2$filter_attribut;
  var _ref3 = attrs || {},
    _ref3$product_definit = _ref3.product_definitions,
    product_definitions = _ref3$product_definit === void 0 ? [] : _ref3$product_definit,
    _ref3$per_field_minim = _ref3.per_field_minimums,
    per_field_minimums = _ref3$per_field_minim === void 0 ? [] : _ref3$per_field_minim;

  // Extract free_products_conditions from attrs.items (for FREE products - price = 0)
  var free_products_conditions = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _attrs$items6;
    return ((_attrs$items6 = attrs.items) === null || _attrs$items6 === void 0 ? void 0 : _attrs$items6.free_products_conditions) || [];
  }, [(_attrs$items7 = attrs.items) === null || _attrs$items7 === void 0 ? void 0 : _attrs$items7.free_products_conditions]);

  // Extract allowed_products_to_select_conditions from attrs.items (for SELECTION LIMIT)
  var allowed_products_to_select_conditions = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _attrs$items8;
    return ((_attrs$items8 = attrs.items) === null || _attrs$items8 === void 0 ? void 0 : _attrs$items8.allowed_products_to_select) || [];
  }, [(_attrs$items9 = attrs.items) === null || _attrs$items9 === void 0 ? void 0 : _attrs$items9.allowed_products_to_select]);
  var available_attribute_terms = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!filter_attribute || !Array.isArray(products)) return [];
    var terms_map = new Map();
    products.forEach(function (product) {
      if (Array.isArray(product.attribute_terms)) {
        product.attribute_terms.forEach(function (term) {
          if (!terms_map.has(term.id)) {
            terms_map.set(term.id, term);
          }
        });
      }
    });
    return Array.from(terms_map.values());
  }, [products, filter_attribute]);

  // Extract included products from product_definitions (for add/remove logic)
  var extract_included_products = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = [];
    if (!Array.isArray(product_definitions)) return result;
    product_definitions.forEach(function (definition, row_index) {
      if (definition.add_included_products === true && Array.isArray(definition.included_products)) {
        result.push({
          row_id: row_index,
          field_id: attrs.field_id,
          products: definition.included_products
        });
      }
    });
    return result;
  }, [product_definitions, attrs.field_id]);

  // Load included product IDs from cart
  var _ref4 = context || {},
    cardManager = _ref4.cardManager,
    setNextButtonLabel = _ref4.setNextButtonLabel;
  var include_products = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!cardManager) return [];
    return cardManager.getIncludedProductIds();
  }, [cardManager, currentValue]);
  var included_products = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!cardManager) return [];
    return cardManager.getIncludedProducts();
  }, [cardManager, currentValue]);
  // Calculate selection_limit based on cart products (SELECTION LIMIT)
  var selection_limit = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!cardManager || !Array.isArray(allowed_products_to_select_conditions) || allowed_products_to_select_conditions.length === 0) {
      return null;
    }
    var cart_items = cardManager.getProducts();
    var cart_product_ids = cart_items.map(function (item) {
      return item.product_id;
    });
    var _iterator = _createForOfIteratorHelper(allowed_products_to_select_conditions),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var condition = _step.value;
        if (cart_product_ids.includes(condition.product)) {
          return condition.allowed;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return null;
  }, [cardManager, allowed_products_to_select_conditions, currentValue]);

  // Calculate free_products_count based on cart products (FREE PRODUCTS - price = 0)
  var free_products_count = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!cardManager || !Array.isArray(free_products_conditions) || free_products_conditions.length === 0) {
      return 0;
    }
    var cart_items = cardManager.getProducts();
    var _iterator2 = _createForOfIteratorHelper(free_products_conditions),
      _step2;
    try {
      var _loop = function _loop() {
          var condition = _step2.value;
          if (cart_items.some(function (item) {
            return item.product_id === condition.product;
          })) {
            return {
              v: condition.allowed
            };
          }
        },
        _ret;
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return 0;
  }, [cardManager, free_products_conditions, currentValue]);

  // Get current currency (default to DKK)
  var current_currency = ((_window$wpcbooking_pu = window.wpcbooking_public) === null || _window$wpcbooking_pu === void 0 ? void 0 : _window$wpcbooking_pu.currency) || "DKK";

  // Check if product row is disabled based on per_field_minimums conditions
  var isRestricted = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (row) {
    var _product_price$price$, _product_price$price, _product_price$qty;
    if (!Array.isArray(per_field_minimums) || per_field_minimums.length === 0) {
      return null;
    }
    var row_condition = per_field_minimums.find(function (item) {
      return item.row === row;
    });
    if (!row_condition) {
      return null;
    }
    var field_id = row_condition.field_id,
      from_value = row_condition.from_value,
      to_value = row_condition.to_value,
      min_price = row_condition.min_price,
      product_price = row_condition.product_price;
    var _ref5 = context || {},
      bookingFormManager = _ref5.bookingFormManager;
    var field_value = parseInt(bookingFormManager.get_field_value(field_id), 10) || 0;
    var fieldLabel = bookingFormManager.get_field_label(field_id);
    // Check min_value condition (field value must be between from_value and to_value)
    if (field_value !== null && field_value !== undefined && (field_value < from_value || field_value > to_value)) {
      return {
        type: "value_condition",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Value for %s (%d) must be between %d and %d", "wpcbooking"), fieldLabel, field_value, from_value, to_value),
        required: from_value,
        current: field_value
      };
    }
    var priceProduct = (_product_price$price$ = product_price === null || product_price === void 0 || (_product_price$price = product_price.price) === null || _product_price$price === void 0 ? void 0 : _product_price$price[current_currency]) !== null && _product_price$price$ !== void 0 ? _product_price$price$ : 0;
    var quantityProduct = 1;
    if ((product_price === null || product_price === void 0 || (_product_price$qty = product_price.qty) === null || _product_price$qty === void 0 ? void 0 : _product_price$qty.type) === "per_field") {
      var _bookingFormManager$g, _product_price$qty2;
      quantityProduct = (_bookingFormManager$g = bookingFormManager.get_field_value(product_price === null || product_price === void 0 || (_product_price$qty2 = product_price.qty) === null || _product_price$qty2 === void 0 ? void 0 : _product_price$qty2.booking_fields)) !== null && _bookingFormManager$g !== void 0 ? _bookingFormManager$g : 1;
    } else {
      var _product_price$qty$va, _product_price$qty3;
      quantityProduct = (_product_price$qty$va = product_price === null || product_price === void 0 || (_product_price$qty3 = product_price.qty) === null || _product_price$qty3 === void 0 ? void 0 : _product_price$qty3.value) !== null && _product_price$qty$va !== void 0 ? _product_price$qty$va : 1;
    }
    var required_price = priceProduct * quantityProduct;

    // Check min_price condition (cart total must be >= min_price for current currency)
    if (min_price[current_currency] && min_price[current_currency] > required_price) {
      return {
        type: "min_price",
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Minimum product price must be %d %s", "wpcbooking"), required_price !== null && required_price !== void 0 ? required_price : 0, current_currency),
        required: required_price !== null && required_price !== void 0 ? required_price : 0,
        current: priceProduct
      };
    }
    return null;
  }, [per_field_minimums, context, current_currency]);

  // Parse currentValue - handle array of JSON strings or array of objects
  var parseCurrentValue = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!currentValue) return [];
    if (Array.isArray(currentValue)) {
      return currentValue.map(function (item) {
        if (typeof item === "string") {
          try {
            return JSON.parse(item);
          } catch (e) {
            return null;
          }
        }
        return item;
      }).filter(function (item) {
        return item !== null;
      });
    }
    if (typeof currentValue === "string" && currentValue.trim() !== "") {
      try {
        var parsed = JSON.parse(currentValue);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }, [currentValue]);

  // Convert selected products to object by row
  var selectedByRow = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = {};
    parseCurrentValue.forEach(function (item) {
      if (item && item.row !== undefined && item.product_id !== undefined) {
        if (!result[item.row]) {
          result[item.row] = [];
        }
        result[item.row].push(item.product_id);
      }
    });
    return result;
  }, [parseCurrentValue]);

  // Calculate maximum choices (null means unlimited)
  // Priority: selection_limit (from cart conditions) > number_allowed > unlimited
  var maximumChoices = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var allowed = selection_limit !== null ? selection_limit : number_allowed;
    if (allowed === null || allowed === undefined) {
      return Array.isArray(products) ? products.length : 0;
    }
    return allowed;
  }, [selection_limit, number_allowed, products]);

  // Count selected products (excluding included ones)
  var selectedCount = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var non_included_selection = parseCurrentValue.filter(function (item) {
      return !include_products.includes(item.product_id);
    });
    return non_included_selection.length;
  }, [parseCurrentValue, include_products]);

  // Check if there's a selection limit (from cart conditions or general settings)
  var has_selection_limit = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return selection_limit !== null || number_allowed !== null && number_allowed !== undefined;
  }, [selection_limit, number_allowed]);

  // Calculate remaining selections
  var remaining_selections = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!has_selection_limit) {
      return null;
    }
    return Math.max(0, maximumChoices - selectedCount);
  }, [has_selection_limit, maximumChoices, selectedCount]);

  // Set initial label when products are rendered (after BookingApp reset)
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!setNextButtonLabel) return;
    if (Object.keys(products_by_row).length === 0) return;

    // Use setTimeout to ensure this runs AFTER BookingApp's reset effect
    var timer = setTimeout(function () {
      var label = selectedCount > 0 ? null : labelPickLater;
      setNextButtonLabel(label);
    }, 0);
    return function () {
      return clearTimeout(timer);
    };
  }, [products_by_row, selectedCount, context]);

  // Update label when selection changes
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var _ref6 = context || {},
      setNextButtonLabel = _ref6.setNextButtonLabel;
    if (!setNextButtonLabel) return;
    var label = selectedCount > 0 ? null : labelPickLater;
    setNextButtonLabel(label);
  }, [selectedCount]);

  // Get included products for a specific row
  var get_row_included_products = function get_row_included_products(row) {
    var row_data = extract_included_products.find(function (item) {
      return item.row_id === row;
    });
    if (!row_data || !Array.isArray(row_data.products)) return [];
    return row_data.products.map(function (product) {
      return _typeof(product) === "object" ? product.id : product;
    }).filter(Boolean);
  };

  // Handle product toggle
  var handle_product_toggle = function handle_product_toggle(fieldId, product_id, row) {
    var is_included = Array.isArray(include_products) && include_products.includes(product_id);
    // Included products cannot be toggled
    if (is_included) return;

    // Fix row values in existing selection using productToDefinitionMap
    var current_selection = parseCurrentValue.map(function (item) {
      var correct_row = productToDefinitionMap.get(item.product_id);
      return correct_row !== undefined ? _objectSpread(_objectSpread({}, item), {}, {
        row: correct_row
      }) : item;
    });
    var existing_index = current_selection.findIndex(function (item) {
      return item.product_id === product_id && item.row === row;
    });
    var row_included_products = get_row_included_products(row);
    if (existing_index >= 0) {
      // Remove product
      var removed_item = current_selection[existing_index];
      current_selection.splice(existing_index, 1);
    } else {
      // Check if we can add more products
      var non_included_selection = current_selection.filter(function (item) {
        return !include_products.includes(item.product_id);
      });
      var non_included_count = non_included_selection.length;
      if (maximumChoices !== null && non_included_count >= maximumChoices) {
        // Automatically remove the oldest selected product (first in array) to make room

        if (non_included_selection.length > 0) {
          var oldest_product = non_included_selection[0];
          var oldest_index = current_selection.findIndex(function (item) {
            return item.product_id === oldest_product.product_id && item.row === oldest_product.row;
          });
          if (oldest_index >= 0) {
            var _removed_item = current_selection[oldest_index];
            current_selection.splice(oldest_index, 1);
          }
        }
      }

      // Add product
      current_selection.push({
        product_id: product_id,
        row: row,
        field_id: fieldId
      });
    }
    // Work with objects first, convert to JSON strings at the end
    var value_objects = _toConsumableArray(current_selection);

    // Add included products filtered by field_id
    if (Array.isArray(included_products) && included_products.length > 0) {
      // Get all product IDs from products_by_row
      var available_product_ids = new Set();
      Object.values(products_by_row).forEach(function (products) {
        products.forEach(function (product) {
          available_product_ids.add(product.id);
        });
      });

      // Filter and add included products that exist in products_by_row
      included_products.forEach(function (item) {
        item.product_ids.forEach(function (product_id) {
          if (available_product_ids.has(product_id)) {
            value_objects.push({
              row: item.row_id,
              product_id: product_id,
              field_id: fieldId
            });
          }
        });
      });
    }
    // Filter unique products by product_id and row
    var uniqueProducts = new Map();
    value_objects.forEach(function (item) {
      var key = "".concat(item.product_id, "_").concat(item.row);
      if (!uniqueProducts.has(key) && item.field_id === fieldId) {
        uniqueProducts.set(key, item);
      }
    });

    // Convert to array of JSON strings for form submission
    var value_for_form = Array.from(uniqueProducts.values()).map(function (item) {
      return JSON.stringify(item);
    });
    handleChange(value_for_form);
  };

  // Check if product is selected
  var is_product_selected = function is_product_selected(product_id, row) {
    var is_included = Array.isArray(include_products) && include_products.includes(product_id);
    if (is_included) return true;
    return selectedByRow[row] && selectedByRow[row].includes(product_id);
  };

  // Render product item
  var render_product_item = function render_product_item(fieldId, product, row) {
    var _window$wpcbooking_pu3, _window$wpcbooking_pu4, _window$wpcbooking_pu5;
    var is_active = is_product_selected(product.id, row);
    var is_included = Array.isArray(include_products) && include_products.includes(product.id);
    var restriction = isRestricted(row);
    var is_restricted = restriction !== null;
    var handle_click = function handle_click() {
      if (is_restricted) {
        return;
      }
      handle_product_toggle(fieldId, product.id, row);
    };
    var handle_image_error = function handle_image_error(e) {
      var _window$wpcbooking_pu2;
      if ((_window$wpcbooking_pu2 = window.wpcbooking_public) !== null && _window$wpcbooking_pu2 !== void 0 && _window$wpcbooking_pu2.placeholder_image) {
        e.target.src = window.wpcbooking_public.placeholder_image;
      }
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: "".concat(product.id, "_").concat(row),
      className: "js-item col-span-1 grid grid-cols-5 gap-x-th-halfgap mb-20p rounded-r-[20px] ".concat(is_restricted ? "cursor-not-allowed opacity-60" : "cursor-pointer", " [box-shadow:0_0_10px_#e5e5e5] [&.is-active]:bg-th-orange-light/10 [&.is-active]:shadow-none ").concat(is_included ? "is-included bg-th-orange-light/10 shadow-none" : is_active ? "is-active" : ""),
      onClick: handle_click
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "checkbox",
      id: product.id,
      name: "".concat(attrs.field_id, "[]"),
      value: JSON.stringify({
        product_id: product.id,
        row: row
      }),
      className: "product hidden-checkbox ".concat(is_included ? "" : "js-countable"),
      checked: is_active || is_included,
      disabled: is_restricted
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "col-[1/-1] medium:col-[1/span_2] relative"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "h-110p medium:h-full medium:aspect-w-10 medium:aspect-h-9 cs-coverbox max-medium:rounded-tr-[20px] overflow-hidden ".concat(is_restricted ? "grayscale" : "")
    }, product.image ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      dangerouslySetInnerHTML: {
        __html: product.image
      },
      ref: function ref(el) {
        if (el) {
          var img = el.querySelector("img");
          if (img && !img.dataset.errorHandled) {
            img.dataset.errorHandled = "true";
            img.onerror = handle_image_error;
          }
        }
      }
    }) : (_window$wpcbooking_pu3 = window.wpcbooking_public) !== null && _window$wpcbooking_pu3 !== void 0 && _window$wpcbooking_pu3.placeholder_image ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
      src: window.wpcbooking_public.placeholder_image,
      alt: product.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Product", "wpcbooking"),
      className: "w-full h-full object-cover"
    }) : null), is_restricted ? /* Restricted Badge */
    (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute top-3 right-4 medium:right-0 w-fit h-55p pl-20p pr-35p flex items-center bg-gray-500"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-white font-poppins uppercase font-medium text-[14px] mt-px"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("UNAVAILABLE", "wpcbooking"))) : is_included ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute top-3 right-4 medium:right-0 w-fit h-55p pl-20p pr-35p hidden [.is-included_&]:flex items-center bg-th-orange"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-white font-poppins uppercase font-medium text-[19px] mt-px"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("INCLUDED", "wpcbooking"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute top-3 right-4 medium:right-0 translate-x-1/2 w-55p h-55p bg-white [.is-active_&]:bg-th-orange border-[5px] border-th-grey-form [.is-active_&]:border-th-orange [.is-included_&]:border-th-orange rounded-full flex items-center justify-center"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "w-7 h-[22px] cs-mask bg-th-grey-form [.is-active_&]:bg-white [.is-included_&]:bg-th-orange",
      style: {
        "--mask-img": "url('".concat(((_window$wpcbooking_pu4 = window.wpcbooking_public) === null || _window$wpcbooking_pu4 === void 0 ? void 0 : _window$wpcbooking_pu4.plugin_url) || "", "assets/img/form/check.svg')")
      }
    }))) : /* Regular Checkbox */
    (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute top-3 right-4 medium:right-0 translate-x-1/2 w-55p h-55p bg-white [.is-active_&]:bg-th-orange border-[5px] border-th-grey-form [.is-active_&]:border-th-orange rounded-full flex items-center justify-center"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "w-7 h-[22px] cs-mask bg-th-grey-form [.is-active_&]:bg-white",
      style: {
        "--mask-img": "url('".concat(((_window$wpcbooking_pu5 = window.wpcbooking_public) === null || _window$wpcbooking_pu5 === void 0 ? void 0 : _window$wpcbooking_pu5.plugin_url) || "", "assets/img/form/check.svg')")
      }
    }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "col-[1/-1] medium:col-[3/span_3]"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "px-20p large:px-30p py-20p"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "af-p28 ".concat(is_restricted ? "text-gray-400" : "text-black [.is-active_&]:text-th-orange")
    }, product.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Product", "wpcbooking")), product.short_description && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "af-p18 mt-15p",
      dangerouslySetInnerHTML: {
        __html: product.short_description
      }
    }), is_restricted && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mt-10p p-10p bg-yellow-50 border border-yellow-200 rounded-lg"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "flex items-center gap-2 text-yellow-700 text-sm"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      className: "text-lg"
    }, "\u26A0\uFE0F"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, restriction.message))))));
  };
  var filteredProducts = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = products;
    if (selectedAttributeFilter) {
      result = result.filter(function (product) {
        if (!Array.isArray(product.attribute_terms)) return false;
        return product.attribute_terms.some(function (term) {
          return term.id === selectedAttributeFilter;
        });
      });
    }
    if (debouncedSearchTerm.trim()) {
      var searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter(function (product) {
        var _product$title, _product$short_descri;
        var titleMatch = (_product$title = product.title) === null || _product$title === void 0 ? void 0 : _product$title.toLowerCase().includes(searchLower);
        var descMatch = (_product$short_descri = product.short_description) === null || _product$short_descri === void 0 ? void 0 : _product$short_descri.toLowerCase().includes(searchLower);
        return titleMatch || descMatch;
      });
    }
    return result;
  }, [products, debouncedSearchTerm, selectedAttributeFilter]);
  var visibleProducts = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (loading_config.mode === LOADING_MODE.ALL_AT_ONCE) {
      return filteredProducts;
    }
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount, loading_config.mode]);
  var hasMoreProducts = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return visibleCount < filteredProducts.length;
  }, [visibleCount, filteredProducts.length]);
  var handle_load_more = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    if (!hasMoreProducts || isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(function () {
      setVisibleCount(function (prev) {
        return Math.min(prev + loading_config.items_per_load, filteredProducts.length);
      });
      setIsLoadingMore(false);
    }, 300);
  }, [hasMoreProducts, isLoadingMore, filteredProducts.length, loading_config.items_per_load]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (loading_config.mode !== LOADING_MODE.INFINITE_SCROLL) return;
    if (!listEndRef.current) return;
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && hasMoreProducts && !isLoadingMore) {
        handle_load_more();
      }
    }, {
      threshold: 0.1,
      rootMargin: "100px"
    });
    observer.observe(listEndRef.current);
    return function () {
      return observer.disconnect();
    };
  }, [hasMoreProducts, isLoadingMore, handle_load_more, loading_config.mode]);

  // Create product_id to definition_index map
  var productToDefinitionMap = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var map = new Map();
    if (!Array.isArray(product_definitions)) return map;
    product_definitions.forEach(function (definition, definition_index) {
      // Check if definition has product_ids
      if (definition.product_ids) {
        var product_ids = Array.isArray(definition.product_ids) ? definition.product_ids : [definition.product_ids];
        product_ids.forEach(function (product_id) {
          map.set(parseInt(product_id), definition_index);
        });
      }
    });
    return map;
  }, [product_definitions]);
  var products_by_row = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = {};
    if (Array.isArray(visibleProducts) && visibleProducts.length > 0) {
      visibleProducts.forEach(function (product, index) {
        var _productToDefinitionM;
        // Get row from product_definitions mapping
        var row_index = (_productToDefinitionM = productToDefinitionMap.get(product.id)) !== null && _productToDefinitionM !== void 0 ? _productToDefinitionM : index;
        if (!result[row_index]) {
          result[row_index] = [];
        }
        result[row_index].push(_objectSpread(_objectSpread({}, product), {}, {
          row: row_index
        }));
      });
    }
    return result;
  }, [visibleProducts, productToDefinitionMap]);

  // Show number allowed message if applicable (check both cart conditions and general settings)
  var show_number_allowed_message = has_selection_limit;
  var handle_attribute_filter = function handle_attribute_filter(term_id) {
    setSelectedAttributeFilter(function (prev) {
      return prev === term_id ? null : term_id;
    });
    setVisibleCount(loading_config.items_per_load);
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "products-archive",
    "data-name": attrs.field_id
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-wrap items-center gap-3 mb-4"
  }, available_attribute_terms.length > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex flex-wrap gap-2"
  }, available_attribute_terms.map(function (term) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      key: term.id,
      type: "button",
      onClick: function onClick() {
        return handle_attribute_filter(term.id);
      },
      className: "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 ".concat(selectedAttributeFilter === term.id ? "bg-th-orange text-white border-th-orange" : "bg-white text-gray-700 border-th-grey-form hover:border-th-orange hover:text-th-orange")
    }, term.name);
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "relative flex-1 min-w-[200px] max-w-[50%] ml-auto"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "text",
    value: searchTerm,
    onInput: function onInput(e) {
      return setSearchTerm(e.target.value);
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Search products...", "wpcbooking"),
    className: "w-full border-2 border-th-blue rounded-[10px] h-[55px] pl-[15px] pr-[45px]"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
    decoding: "async",
    src: "".concat(((_window$wpcbooking_pu6 = window.wpcbooking_public) === null || _window$wpcbooking_pu6 === void 0 ? void 0 : _window$wpcbooking_pu6.plugin_url) || "", "assets/img/search-icon.svg"),
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Search Icon", "wpcbooking"),
    className: "w-[20px] h-[20px]"
  })))), show_number_allowed_message && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "mb-6 flex items-center gap-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ".concat(remaining_selections === 0 ? "bg-red-100 text-red-700 border-2 border-red-300" : remaining_selections <= 2 ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300" : "bg-th-orange/10 text-th-orange border-2 border-th-orange/30")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ".concat(remaining_selections === 0 ? "bg-red-500" : remaining_selections <= 2 ? "bg-yellow-500" : "bg-th-orange")
  }, remaining_selections), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, remaining_selections === 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Limit reached", "wpcbooking") : remaining_selections === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("product remaining", "wpcbooking") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("products remaining", "wpcbooking"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-sm text-gray-500"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("%d / %d selected", "wpcbooking"), selectedCount, maximumChoices))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "relative"
  }, isSearching && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-16 h-16 border-4 border-th-orange border-t-transparent rounded-full animate-spin"
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    "data-maximum-choices": maximumChoices,
    className: "aff-choices-wrap grid medium:grid-cols-2 gap-10p medium:gap-50p mt-70p [&_*]:transition-all [&_*]:duration-300"
  }, Object.keys(products_by_row).length > 0 ? Object.keys(products_by_row).map(function (row_index) {
    var products = products_by_row[row_index];
    return products.map(function (product) {
      return render_product_item(fieldId, product, parseInt(row_index));
    });
  }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
    className: "text-center text-gray-500 py-8 col-span-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-2xl mb-2"
  }, "\uD83D\uDCE6"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No products available", "wpcbooking")))), loading_config.mode === LOADING_MODE.INFINITE_SCROLL && hasMoreProducts && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    ref: listEndRef,
    className: "h-10"
  }), loading_config.mode === LOADING_MODE.LOAD_MORE_BUTTON && hasMoreProducts && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-center mt-8"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    onClick: handle_load_more,
    disabled: isLoadingMore,
    className: "px-8 py-3 bg-th-orange text-white font-semibold rounded-full hover:bg-th-orange/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
  }, isLoadingMore ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Loading...", "wpcbooking")) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Load more (%d remaining)", "wpcbooking"), filteredProducts.length - visibleCount))), loading_config.mode === LOADING_MODE.INFINITE_SCROLL && isLoadingMore && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-center mt-6"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-10 h-10 border-4 border-th-orange border-t-transparent rounded-full animate-spin"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductGrid);

/***/ }),

/***/ "./assets/js/public/booking/blocks/ProductList.jsx":
/*!*********************************************************!*\
  !*** ./assets/js/public/booking/blocks/ProductList.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var ProductList = function ProductList(_ref) {
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var fieldId = attrs.field_id;
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  // Parse attrs data from PHP
  var _ref2 = attrs.general || attrs || {},
    _ref2$products = _ref2.products,
    products = _ref2$products === void 0 ? [] : _ref2$products,
    _ref2$number_allowed = _ref2.number_allowed,
    number_allowed = _ref2$number_allowed === void 0 ? null : _ref2$number_allowed,
    _ref2$name = _ref2.name,
    name = _ref2$name === void 0 ? "select_list_products" : _ref2$name;
  var _ref3 = attrs || {},
    _ref3$product_definit = _ref3.product_definitions,
    product_definitions = _ref3$product_definit === void 0 ? [] : _ref3$product_definit;

  // Extract included products from product_definitions
  var extract_included_products = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = [];
    if (!Array.isArray(product_definitions)) return result;
    product_definitions.forEach(function (definition, row_index) {
      if (definition.add_included_products === true && Array.isArray(definition.included_products)) {
        result.push({
          row_id: row_index,
          field_id: attrs.field_id,
          products: definition.included_products
        });
      }
    });
    return result;
  }, [product_definitions, attrs.field_id]);

  // Load included product IDs from cart
  var _ref4 = context || {},
    cardManager = _ref4.cardManager;
  var include_products = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!cardManager) return [];
    return cardManager.getIncludedProductIds();
  }, [cardManager, currentValue]);

  // Parse currentValue - handle array of JSON strings or array of objects
  var parseCurrentValue = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!currentValue) return [];
    if (Array.isArray(currentValue)) {
      return currentValue.map(function (item) {
        if (typeof item === "string") {
          try {
            return JSON.parse(item);
          } catch (e) {
            return null;
          }
        }
        return item;
      }).filter(function (item) {
        return item !== null;
      });
    }
    if (typeof currentValue === "string" && currentValue.trim() !== "") {
      try {
        var parsed = JSON.parse(currentValue);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  }, [currentValue]);

  // Convert selected products to object by row
  var selectedByRow = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = {};
    parseCurrentValue.forEach(function (item) {
      if (item && item.row !== undefined && item.product_id !== undefined) {
        if (!result[item.row]) {
          result[item.row] = [];
        }
        result[item.row].push(item.product_id);
      }
    });
    return result;
  }, [parseCurrentValue]);

  // Calculate maximum choices (null means unlimited)
  var maximumChoices = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (number_allowed === null || number_allowed === undefined) {
      return 0;
    }
    return number_allowed;
  }, [number_allowed, products]);

  // Get included products for a specific row
  var get_row_included_products = function get_row_included_products(row) {
    var row_data = extract_included_products.find(function (item) {
      return item.row_id === row;
    });
    if (!row_data || !Array.isArray(row_data.products)) return [];
    return row_data.products.map(function (product) {
      return _typeof(product) === "object" ? product.id : product;
    }).filter(Boolean);
  };

  // Handle product toggle
  var handle_product_toggle = function handle_product_toggle(product_id, row) {
    console.log("🔵 [ProductList] handle_product_toggle START", {
      product_id: product_id,
      row: row,
      timestamp: new Date().toISOString()
    });
    var is_included = Array.isArray(include_products) && include_products.includes(product_id);
    console.log("🔍 [ProductList] Checking if product is included", {
      product_id: product_id,
      is_included: is_included,
      include_products: include_products
    });

    // Included products cannot be toggled
    if (is_included) {
      console.log("⚠️ [ProductList] Product is included, cannot toggle", {
        product_id: product_id
      });
      return;
    }

    // Fix row values in existing selection using productToDefinitionMap
    var current_selection = parseCurrentValue.map(function (item) {
      var correct_row = productToDefinitionMap.get(item.product_id);
      return correct_row !== undefined ? _objectSpread(_objectSpread({}, item), {}, {
        row: correct_row
      }) : item;
    });
    console.log("📋 [ProductList] Current selection after row fix", {
      current_selection: current_selection,
      parseCurrentValue_original: parseCurrentValue
    });
    var existing_index = current_selection.findIndex(function (item) {
      return item.product_id === product_id && item.row === row;
    });
    console.log("🔎 [ProductList] Finding existing product", {
      product_id: product_id,
      row: row,
      existing_index: existing_index,
      found: existing_index >= 0
    });
    var row_included_products = get_row_included_products(row);
    console.log("📦 [ProductList] Row included products", {
      row: row,
      row_included_products: row_included_products
    });
    if (existing_index >= 0) {
      // Remove product
      var removed_item = current_selection[existing_index];
      console.log("➖ [ProductList] REMOVING product", {
        removed_item: removed_item,
        existing_index: existing_index,
        before_count: current_selection.length
      });
      current_selection.splice(existing_index, 1);
      console.log("✅ [ProductList] Product removed from selection", {
        after_count: current_selection.length,
        remaining_selection: current_selection
      });
    } else {
      // Check if we can add more products
      var non_included_selection = current_selection.filter(function (item) {
        return !include_products.includes(item.product_id);
      });
      var non_included_count = non_included_selection.length;
      console.log("➕ [ProductList] ADDING product - checking limits", {
        non_included_count: non_included_count,
        maximumChoices: maximumChoices,
        can_add: maximumChoices === null || non_included_count < maximumChoices
      });
      if (maximumChoices !== null && non_included_count >= maximumChoices) {
        // Automatically remove the oldest selected product (first in array) to make room
        console.log("⚠️ [ProductList] Maximum choices reached, removing oldest", {
          maximumChoices: maximumChoices,
          non_included_count: non_included_count,
          non_included_selection: non_included_selection
        });
        if (non_included_selection.length > 0) {
          var oldest_product = non_included_selection[0];
          var oldest_index = current_selection.findIndex(function (item) {
            return item.product_id === oldest_product.product_id && item.row === oldest_product.row;
          });
          console.log("🗑️ [ProductList] Removing oldest product", {
            oldest_product: oldest_product,
            oldest_index: oldest_index
          });
          if (oldest_index >= 0) {
            var _removed_item = current_selection[oldest_index];
            current_selection.splice(oldest_index, 1);
            console.log("✅ [ProductList] Oldest product removed", {
              removed_item: _removed_item,
              remaining_count: current_selection.length
            });
          }
        }
      }

      // Add product
      console.log("➕ [ProductList] Adding new product to selection", {
        product_id: product_id,
        row: row,
        before_count: current_selection.length
      });
      current_selection.push({
        product_id: product_id,
        row: row,
        field_id: fieldId
      });
      console.log("✅ [ProductList] Product added to selection", {
        after_count: current_selection.length,
        current_selection: current_selection
      });
    }
    console.log("📝 [ProductList] Building final value for form", {
      current_selection: current_selection
    });

    // Convert to array of JSON strings for form submission
    var value_for_form = current_selection.map(function (item) {
      return JSON.stringify(item);
    });
    console.log("✅ [ProductList] Final value for form", {
      value_for_form: value_for_form,
      count: value_for_form.length
    });
    handleChange(value_for_form);
    console.log("🔵 [ProductList] handle_product_toggle END", {
      product_id: product_id,
      row: row,
      timestamp: new Date().toISOString()
    });
  };

  // Check if product is selected
  var is_product_selected = function is_product_selected(product_id, row) {
    var is_included = Array.isArray(include_products) && include_products.includes(product_id);
    if (is_included) return true;
    return selectedByRow[row] && selectedByRow[row].includes(product_id);
  };

  // Render product item
  var render_product_item = function render_product_item(product, row) {
    var _window$wpcbooking_pu2, _window$wpcbooking_pu3, _window$wpcbooking_pu4;
    var is_active = is_product_selected(product.id, row);
    var is_included = Array.isArray(include_products) && include_products.includes(product.id);
    var handle_image_error = function handle_image_error(e) {
      var _window$wpcbooking_pu;
      if ((_window$wpcbooking_pu = window.wpcbooking_public) !== null && _window$wpcbooking_pu !== void 0 && _window$wpcbooking_pu.placeholder_image) {
        e.target.src = window.wpcbooking_public.placeholder_image;
      }
    };
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: "".concat(product.id, "_").concat(row),
      className: "js-item grid grid-cols-9 gap-x-th-gap mb-20p rounded-r-[20px] cursor-pointer [box-shadow:0_0_10px_#e5e5e5] [&.is-active]:shadow-none [&.is-active]:bg-th-orange-light/10 ".concat(is_included ? "is-included bg-th-orange-light/10 shadow-none" : is_active ? "is-active" : ""),
      onClick: function onClick() {
        return handle_product_toggle(product.id, row);
      }
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      type: "checkbox",
      id: product.id,
      name: "".concat(attrs.field_id, "[]"),
      value: JSON.stringify({
        product_id: product.id,
        row: row
      }),
      className: "product hidden-checkbox ".concat(is_included ? "" : "js-countable"),
      checked: is_active || is_included
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "col-[1/-1] medium:col-[1/span_2] relative"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "h-110p medium:h-full medium:aspect-w-7 medium:aspect-h-9 cs-coverbox max-medium:rounded-tr-[20px] overflow-hidden"
    }, product.image ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      dangerouslySetInnerHTML: {
        __html: product.image
      },
      ref: function ref(el) {
        if (el) {
          var img = el.querySelector('img');
          if (img && !img.dataset.errorHandled) {
            img.dataset.errorHandled = 'true';
            img.onerror = handle_image_error;
          }
        }
      }
    }) : (_window$wpcbooking_pu2 = window.wpcbooking_public) !== null && _window$wpcbooking_pu2 !== void 0 && _window$wpcbooking_pu2.placeholder_image ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
      src: window.wpcbooking_public.placeholder_image,
      alt: product.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Product", "wpcbooking"),
      className: "w-full h-full object-cover"
    }) : null), is_included ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute top-3 right-4 medium:right-0 w-fit h-55p pl-20p pr-35p hidden [.is-included_&]:flex items-center bg-th-orange"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-white font-poppins uppercase font-medium text-[19px] mt-px"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("INCLUDED", "wpcbooking"))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute top-3 right-4 medium:right-0 translate-x-1/2 w-55p h-55p bg-white [.is-active_&]:bg-th-orange border-[5px] border-th-grey-form [.is-active_&]:border-th-orange [.is-included_&]:border-th-orange rounded-full flex items-center justify-center"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "w-7 h-[22px] cs-mask bg-th-grey-form [.is-active_&]:bg-white [.is-included_&]:bg-th-orange",
      style: {
        "--mask-img": "url('".concat(((_window$wpcbooking_pu3 = window.wpcbooking_public) === null || _window$wpcbooking_pu3 === void 0 ? void 0 : _window$wpcbooking_pu3.plugin_url) || "", "assets/img/form/check.svg')")
      }
    }))) : /* Regular Checkbox */
    (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute top-3 right-4 medium:right-0 translate-x-1/2 w-55p h-55p bg-white [.is-active_&]:bg-th-orange border-[5px] border-th-grey-form [.is-active_&]:border-th-orange rounded-full flex items-center justify-center"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "w-7 h-[22px] cs-mask bg-th-grey-form [.is-active_&]:bg-white",
      style: {
        "--mask-img": "url('".concat(((_window$wpcbooking_pu4 = window.wpcbooking_public) === null || _window$wpcbooking_pu4 === void 0 ? void 0 : _window$wpcbooking_pu4.plugin_url) || "", "assets/img/form/check.svg')")
      }
    }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "col-[1/-1] medium:col-[3/span_7]"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "px-20p large:px-50p py-20p aff-list-product-description"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "af-p33 text-black [.is-active_&]:text-th-orange"
    }, product.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Product", "wpcbooking")), product.short_description && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      dangerouslySetInnerHTML: {
        __html: product.short_description
      }
    }))));
  };

  // Create product_id to definition_index map
  var productToDefinitionMap = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var map = new Map();
    if (!Array.isArray(product_definitions)) return map;
    product_definitions.forEach(function (definition, definition_index) {
      // Check if definition has product_ids
      if (definition.product_ids) {
        var product_ids = Array.isArray(definition.product_ids) ? definition.product_ids : [definition.product_ids];
        product_ids.forEach(function (product_id) {
          map.set(parseInt(product_id), definition_index);
        });
      }
    });
    return map;
  }, [product_definitions]);

  // Group products by row - each product gets its own row index
  var products_by_row = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var result = {};
    if (Array.isArray(products) && products.length > 0) {
      products.forEach(function (product, index) {
        var _productToDefinitionM;
        // Get row from product_definitions mapping
        var row_index = (_productToDefinitionM = productToDefinitionMap.get(product.id)) !== null && _productToDefinitionM !== void 0 ? _productToDefinitionM : index;
        if (!result[row_index]) {
          result[row_index] = [];
        }
        result[row_index].push(_objectSpread(_objectSpread({}, product), {}, {
          row: row_index
        }));
      });
    }
    return result;
  }, [products, productToDefinitionMap]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "products-archive",
    "data-name": attrs.field_id
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    "data-maximum-choices": maximumChoices,
    className: "aff-choices-wrap aff-products-list js-choices-wrap mt-70p [&_*]:transition-all [&_*]:duration-300"
  }, Object.keys(products_by_row).length > 0 ? Object.keys(products_by_row).map(function (row_index) {
    var products = products_by_row[row_index];
    return products.map(function (product) {
      return render_product_item(product, parseInt(row_index));
    });
  }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
    className: "text-center text-gray-500 py-8 col-span-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-2xl mb-2"
  }, "\uD83D\uDCE6"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No products available", "wpcbooking")))), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(attrs.field_id, error));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductList);

/***/ }),

/***/ "./assets/js/public/booking/blocks/TextInput.jsx":
/*!*******************************************************!*\
  !*** ./assets/js/public/booking/blocks/TextInput.jsx ***!
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
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var TextInput = function TextInput(_ref) {
  var _attrs$general, _attrs$general2, _attrs$general3;
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(currentValue || ''),
    _useState2 = _slicedToArray(_useState, 2),
    localValue = _useState2[0],
    setLocalValue = _useState2[1];
  var pendingValueRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var handleInputChange = function handleInputChange(e) {
    var value = e.target.value;
    setLocalValue(value);
    pendingValueRef.current = value;
  };
  var commitValue = function commitValue() {
    if (pendingValueRef.current !== null) {
      handleChange(pendingValueRef.current);
      pendingValueRef.current = null;
    }
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setLocalValue(currentValue || '');
  }, [currentValue]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full mb-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-4"
  }, ((_attrs$general = attrs.general) === null || _attrs$general === void 0 ? void 0 : _attrs$general.icon_url) && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      '--mask-img': "url('".concat(attrs.general.icon_url, "')")
    },
    className: "w-25p h-30p bg-th-orange-light cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
  }, ((_attrs$general2 = attrs.general) === null || _attrs$general2 === void 0 ? void 0 : _attrs$general2.label) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text Input', 'wpcbooking'))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "text",
    id: attrs.field_id,
    name: attrs.field_id,
    value: localValue,
    onChange: handleInputChange,
    onBlur: commitValue,
    className: "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500",
    placeholder: ((_attrs$general3 = attrs.general) === null || _attrs$general3 === void 0 ? void 0 : _attrs$general3.placeholder) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter text', 'wpcbooking'),
    required: true,
    "aria-invalid": !!error,
    "aria-describedby": error ? "".concat(attrs.field_id, "-error") : undefined
  }), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(attrs.field_id, error))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./assets/js/public/booking/blocks/TimePicker.jsx":
/*!********************************************************!*\
  !*** ./assets/js/public/booking/blocks/TimePicker.jsx ***!
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
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/useInputField.js */ "./assets/js/public/booking/hooks/useInputField.js");
/* harmony import */ var _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputBookingComponent.jsx */ "./assets/js/public/booking/blocks/InputBookingComponent.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var TimePicker = function TimePicker(_ref) {
  var _ref$attrs = _ref.attrs,
    attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
    _ref$rules = _ref.rules,
    rules = _ref$rules === void 0 ? {} : _ref$rules;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _useInputField = (0,_hooks_useInputField_js__WEBPACK_IMPORTED_MODULE_4__.useInputField)(_objectSpread({
      fieldId: attrs.field_id,
      rules: rules
    }, context)),
    currentValue = _useInputField.currentValue,
    handleChange = _useInputField.handleChange,
    error = _useInputField.error,
    isValid = _useInputField.isValid,
    inputClasses = _useInputField.inputClasses;
  var inputRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var flatpickrInstanceRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var _attrs$general = attrs.general,
    general = _attrs$general === void 0 ? {} : _attrs$general;
  var _general$icon_url = general.icon_url,
    icon_url = _general$icon_url === void 0 ? '' : _general$icon_url;

  // Handle both old and new naming conventions
  var time_picker_options = general['time_picker_options'] || general['timepicker_options'] || {};
  var _general$label = general.label,
    label = _general$label === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Time Picker', 'wpcbooking') : _general$label;
  var _time_picker_options$ = time_picker_options.display_format,
    display_format = _time_picker_options$ === void 0 ? 'H:i' : _time_picker_options$,
    _time_picker_options$2 = time_picker_options.minute_increment,
    minute_increment = _time_picker_options$2 === void 0 ? '1' : _time_picker_options$2;
  var format_time = function format_time(date, format) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var pad = function pad(num) {
      return num.toString().padStart(2, '0');
    };
    return format.replace('H', pad(hours)).replace('i', pad(minutes));
  };
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!inputRef.current) return;

    // Check if flatpickr is available
    if (typeof flatpickr === 'undefined') {
      return;
    }

    // Validate display_format - if it's "other" or invalid, use default
    var validFormat = display_format && display_format !== 'other' && display_format !== '' ? display_format : 'H:i';

    // Initialize Flatpickr with Basic time picker configuration
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

    // Set initial value if exists and is valid
    if (currentValue && flatpickrInstanceRef.current && currentValue !== 'ot3er' && currentValue.length > 0) {
      try {
        flatpickrInstanceRef.current.setDate(currentValue, false);
      } catch (e) {}
    }

    // Cleanup function
    return function () {
      if (flatpickrInstanceRef.current) {
        flatpickrInstanceRef.current.destroy();
        flatpickrInstanceRef.current = null;
      }
    };
  }, [display_format, minute_increment, handleChange]);

  // Update Flatpickr when currentValue changes externally
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (flatpickrInstanceRef.current && currentValue && currentValue !== 'ot3er' && currentValue.length > 0) {
      try {
        flatpickrInstanceRef.current.setDate(currentValue, false);
      } catch (e) {}
    }
  }, [currentValue]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-stretch medium:justify-between medium:items-center px-30p py-[18px] max-medium:flex-col gap-y-2 border border-th-blue-light rounded-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-4"
  }, icon_url && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      '--mask-img': "url('".concat(icon_url, "')")
    },
    className: "w-25p h-30p bg-th-orange-light cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p24 max-medium:text-[1.25rem] text-black w-full"
  }, label)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p27 text-th-orange-light medium:w-3/4 max-medium:text-[1rem]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    ref: inputRef,
    type: "text",
    id: attrs.field_id,
    name: attrs.field_id,
    className: "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p text-left text-th-orange-light af-p27 focus:outline-none focus:ring-2 focus:ring-blue-500",
    placeholder: "Format: ".concat(display_format && display_format !== 'other' ? display_format : 'H:i'),
    "aria-invalid": !!error,
    "aria-describedby": error ? "".concat(attrs.field_id, "-error") : undefined
  }), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_validation_indicator(error, isValid), _InputBookingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__.InputBookingComponent.render_error_message(attrs.field_id, error))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimePicker);

/***/ }),

/***/ "./assets/js/public/booking/blocks/index.js":
/*!**************************************************!*\
  !*** ./assets/js/public/booking/blocks/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockRenderer: () => (/* reexport safe */ _BlockRenderer_jsx__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   DatePicker: () => (/* reexport safe */ _DatePicker_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   EmailInput: () => (/* reexport safe */ _EmailInput_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   GoogleMap: () => (/* reexport safe */ _GoogleMap_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   IconsList: () => (/* reexport safe */ _IconsList_jsx__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   NumberInput: () => (/* reexport safe */ _NumberInput_jsx__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   PhoneInput: () => (/* reexport safe */ _PhoneInput_jsx__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   ProductGrid: () => (/* reexport safe */ _ProductGrid_jsx__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   ProductList: () => (/* reexport safe */ _ProductList_jsx__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   TextInput: () => (/* reexport safe */ _TextInput_jsx__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   TimePicker: () => (/* reexport safe */ _TimePicker_jsx__WEBPACK_IMPORTED_MODULE_9__["default"])
/* harmony export */ });
/* harmony import */ var _DatePicker_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DatePicker.jsx */ "./assets/js/public/booking/blocks/DatePicker.jsx");
/* harmony import */ var _EmailInput_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmailInput.jsx */ "./assets/js/public/booking/blocks/EmailInput.jsx");
/* harmony import */ var _GoogleMap_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GoogleMap.jsx */ "./assets/js/public/booking/blocks/GoogleMap.jsx");
/* harmony import */ var _IconsList_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IconsList.jsx */ "./assets/js/public/booking/blocks/IconsList.jsx");
/* harmony import */ var _NumberInput_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NumberInput.jsx */ "./assets/js/public/booking/blocks/NumberInput.jsx");
/* harmony import */ var _PhoneInput_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PhoneInput.jsx */ "./assets/js/public/booking/blocks/PhoneInput.jsx");
/* harmony import */ var _ProductList_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductList.jsx */ "./assets/js/public/booking/blocks/ProductList.jsx");
/* harmony import */ var _ProductGrid_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductGrid.jsx */ "./assets/js/public/booking/blocks/ProductGrid.jsx");
/* harmony import */ var _TextInput_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TextInput.jsx */ "./assets/js/public/booking/blocks/TextInput.jsx");
/* harmony import */ var _TimePicker_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TimePicker.jsx */ "./assets/js/public/booking/blocks/TimePicker.jsx");
/* harmony import */ var _BlockRenderer_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./BlockRenderer.jsx */ "./assets/js/public/booking/blocks/BlockRenderer.jsx");
// Export all block components











// Export main render


/***/ }),

/***/ "./assets/js/public/booking/components/BookingApp.jsx":
/*!************************************************************!*\
  !*** ./assets/js/public/booking/components/BookingApp.jsx ***!
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
/* harmony import */ var _BookingHeader_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BookingHeader.jsx */ "./assets/js/public/booking/components/BookingHeader.jsx");
/* harmony import */ var _BookingSection_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BookingSection.jsx */ "./assets/js/public/booking/components/BookingSection.jsx");
/* harmony import */ var _BookingButtons_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BookingButtons.jsx */ "./assets/js/public/booking/components/BookingButtons.jsx");
/* harmony import */ var _ThankYouPage_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ThankYouPage.jsx */ "./assets/js/public/booking/components/ThankYouPage.jsx");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/storage.js */ "./assets/js/public/booking/utils/storage.js");
/* harmony import */ var _utils_bookingFormManager_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/bookingFormManager.js */ "./assets/js/public/booking/utils/bookingFormManager.js");
/* harmony import */ var _utils_errorManager_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/errorManager.js */ "./assets/js/public/booking/utils/errorManager.js");
/* harmony import */ var _utils_backNavigation_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/backNavigation.js */ "./assets/js/public/booking/utils/backNavigation.js");
/* harmony import */ var _utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/devTools.js */ "./assets/js/public/booking/utils/devTools.js");
/* harmony import */ var _hooks_useStepCondition_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../hooks/useStepCondition.js */ "./assets/js/public/booking/hooks/useStepCondition.js");
/* harmony import */ var _utils_summaryQueries_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utils/summaryQueries.js */ "./assets/js/public/booking/utils/summaryQueries.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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















var BookingApp = function BookingApp(_ref) {
  var _window$wpcbooking_pu, _steps$currentStep$ex, _steps$currentStep;
  var bookingID = _ref.bookingID,
    _ref$quoteHash = _ref.quoteHash,
    quoteHash = _ref$quoteHash === void 0 ? "" : _ref$quoteHash,
    _ref$general = _ref.general,
    general = _ref$general === void 0 ? {} : _ref$general,
    _ref$openInNewWindow = _ref.openInNewWindow,
    openInNewWindow = _ref$openInNewWindow === void 0 ? false : _ref$openInNewWindow,
    _ref$targetUrl = _ref.targetUrl,
    targetUrl = _ref$targetUrl === void 0 ? "" : _ref$targetUrl;
  var shouldRedirect = openInNewWindow && targetUrl;
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      var draft = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.loadDraft)(bookingID);
      if ((draft === null || draft === void 0 ? void 0 : draft.quoteHash) !== undefined && (draft === null || draft === void 0 ? void 0 : draft.quoteHash) !== null && (draft === null || draft === void 0 ? void 0 : draft.quoteHash) !== "") {
        return draft.quoteHash;
      }
      return quoteHash;
    }),
    _useState2 = _slicedToArray(_useState, 1),
    storedQuoteHash = _useState2[0];

  // Initialize state from draft synchronously (before first render)
  // Using lazy initialization - functions are called only once on mount
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      if (!bookingID) {
        return {};
      }

      // DEV: Reset form data if flag is enabled
      if (_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.DEV_RESET_FORM_DATA) {
        console.warn("🔧 [DEV] Resetting form data...");
        (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.clearDraft)(bookingID);
        var initialDraft = {
          bookingId: bookingID,
          step: 1,
          maxReachedStep: 1,
          formData: {},
          quoteHash: storedQuoteHash
        };
        (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, initialDraft);
        return {};
      }
      var draft = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.loadDraft)(bookingID);
      if (draft) {
        // ⚠️ CRITICAL: Update draft with current quoteHash from props if different
        if (storedQuoteHash && draft.quoteHash !== storedQuoteHash) {
          (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
            quoteHash: storedQuoteHash
          });
        }
        return draft.formData || {};
      } else {
        var _initialDraft = {
          bookingId: bookingID,
          step: 1,
          maxReachedStep: 1,
          formData: {},
          quoteHash: storedQuoteHash
        };
        (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, _initialDraft);
        return {};
      }
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    formData = _useState4[0],
    setFormData = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      if (!bookingID) {
        return 1;
      }
      if (_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.DEV_RESET_FORM_DATA) {
        return 1;
      }
      if (shouldRedirect) {
        return 1;
      }
      var draft = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.loadDraft)(bookingID);
      return (draft === null || draft === void 0 ? void 0 : draft.step) || 1;
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    currentStep = _useState8[0],
    setCurrentStep = _useState8[1];
  var _useState9 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      if (!bookingID) {
        return 1;
      }
      if (_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.DEV_RESET_FORM_DATA) {
        return 1;
      }
      if (shouldRedirect) {
        return 1;
      }
      var draft = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.loadDraft)(bookingID);
      return (draft === null || draft === void 0 ? void 0 : draft.maxReachedStep) || 1;
    }),
    _useState0 = _slicedToArray(_useState9, 2),
    maxReachedStep = _useState0[0],
    setMaxReachedStep = _useState0[1];
  var _useState1 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    isValid = _useState10[0],
    setIsValid = _useState10[1];
  var _useState11 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState12 = _slicedToArray(_useState11, 2),
    globalErrors = _useState12[0],
    setGlobalErrors = _useState12[1];
  var _useState13 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return (0,_utils_errorManager_js__WEBPACK_IMPORTED_MODULE_10__.createErrorManager)(bookingID);
    }),
    _useState14 = _slicedToArray(_useState13, 1),
    errorManager = _useState14[0];
  var _useState15 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return (0,_utils_bookingFormManager_js__WEBPACK_IMPORTED_MODULE_9__.createBookingFormManager)(bookingID, storedQuoteHash, errorManager);
    }),
    _useState16 = _slicedToArray(_useState15, 1),
    bookingFormManager = _useState16[0];

  // GraphQL endpoint configuration
  var GRAPHQL_ENDPOINT = ((_window$wpcbooking_pu = window.wpcbooking_public) === null || _window$wpcbooking_pu === void 0 ? void 0 : _window$wpcbooking_pu.graphql_endpoint) || "/graphql";
  var _useState17 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return new _utils_summaryQueries_js__WEBPACK_IMPORTED_MODULE_14__.SummaryDataFetcher({
        endpoint: GRAPHQL_ENDPOINT,
        bookingId: bookingID,
        quoteHash: storedQuoteHash,
        errorManager: errorManager
      });
    }),
    _useState18 = _slicedToArray(_useState17, 1),
    fetcher = _useState18[0];
  var _useState19 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState20 = _slicedToArray(_useState19, 2),
    nextButtonLabel = _useState20[0],
    setNextButtonLabel = _useState20[1];
  var _useState21 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    orderSubmitted = _useState22[0],
    setOrderSubmitted = _useState22[1];
  var _useState23 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState24 = _slicedToArray(_useState23, 2),
    orderData = _useState24[0],
    setOrderData = _useState24[1];

  // Memoize setter to prevent unnecessary re-renders
  var updateNextButtonLabel = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (label) {
    setNextButtonLabel(label);
  }, []);

  // Memoize validation change handler to prevent unnecessary re-renders
  var handleValidationChange = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (isValid) {
    setIsValid(isValid);
  }, []);

  // Reset next button label when step changes
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    setNextButtonLabel(null);
  }, [currentStep]);

  // Close calendar on step change
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var calendarElement = document.querySelector('.vc[data-vc="calendar"]');
    if (calendarElement) {
      calendarElement.style.display = "none";
      calendarElement.style.visibility = "hidden";
      calendarElement.setAttribute("data-vc-calendar-hidden", "true");
    }
  }, [currentStep]);
  var _general$title = general.title,
    title = _general$title === void 0 ? "" : _general$title,
    _general$colored_text = general.colored_text,
    colored_text = _general$colored_text === void 0 ? "" : _general$colored_text,
    _general$black_text = general.black_text,
    black_text = _general$black_text === void 0 ? "" : _general$black_text,
    _general$background_i = general.background_image,
    background_image = _general$background_i === void 0 ? null : _general$background_i,
    _general$next_button_ = general.next_button_text,
    next_button_text = _general$next_button_ === void 0 ? "Next" : _general$next_button_,
    _general$prev_button_ = general.prev_button_text,
    prev_button_text = _general$prev_button_ === void 0 ? "Previous" : _general$prev_button_,
    _general$page_url_boo = general.page_url_booking,
    page_url_booking = _general$page_url_boo === void 0 ? "" : _general$page_url_boo,
    _general$steps = general.steps,
    steps = _general$steps === void 0 ? {} : _general$steps,
    _general$sections = general.sections,
    sections = _general$sections === void 0 ? {} : _general$sections;

  // DEV: Log storage data if flag is enabled (only in useEffect, not during render)
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!bookingID) return;
    if (_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.DEV_LOG_STORAGE_DATA) {
      (0,_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.logStorageData)(bookingID);
    }
  }, [bookingID]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    // Setup error listeners
    var handleGlobalError = function handleGlobalError(event) {
      if (event.type === "global_error") {
        setGlobalErrors(function (prev) {
          return [].concat(_toConsumableArray(prev), [event.error]);
        });
      } else if (event.type === "global_error_removed") {
        setGlobalErrors(function (prev) {
          return prev.filter(function (error) {
            return error.id !== event.errorId;
          });
        });
      } else if (event.type === "global_errors_cleared") {
        setGlobalErrors([]);
      }
    };
    errorManager.addListener(handleGlobalError);
    return function () {
      errorManager.removeListener(handleGlobalError);
    };
  }, [errorManager]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!bookingID) return;
    if (currentStep > maxReachedStep) {
      setMaxReachedStep(currentStep);
      (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
        maxReachedStep: currentStep
      });
    }
  }, [currentStep, maxReachedStep, bookingID]);
  var handleNextStep = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var saveStepResult, nextValidStep, newWindow;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            errorManager.clearAllGlobalErrors();
            _context.n = 1;
            return fetcher.saveStep(currentStep, formData);
          case 1:
            saveStepResult = _context.v;
            // Store saveStep result in bookingFormManager for handlers
            // This will also update cartManager with products from saveStep
            if (saveStepResult && bookingFormManager) {
              bookingFormManager.set_save_step_result(saveStepResult);
            }

            // Find next valid step after saveStep is complete and cart is updated
            // This ensures conditions can check updated products
            nextValidStep = findNextValidStep(currentStep);
            if (!shouldRedirect) {
              _context.n = 2;
              break;
            }
            newWindow = window.open(targetUrl, "_blank");
            if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
              window.location.href = targetUrl;
            }
            (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
              step: nextValidStep,
              maxReachedStep: nextValidStep
            });
            return _context.a(2);
          case 2:
            (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
              step: nextValidStep
            });
            setCurrentStep(nextValidStep);
          case 3:
            // DEV: Log storage data on step change if flag is enabled
            if (_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.DEV_LOG_STORAGE_DATA) {
              setTimeout(function () {
                return (0,_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.logStorageData)(bookingID);
              }, 100);
            }
            return _context.a(2, true);
        }
      }, _callee);
    }));
    return function handleNextStep() {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * Handle summary step submission with terms validation and custom mutation
   */
  var handleSummarySubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _summaryData, _summaryData$summary_, summary_options, _summary_options$term, terms, required_terms, terms_conditions, all_required_accepted, termsConditionsArray, result, _result, _result2, _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            if (isSummaryStep) {
              _context2.n = 1;
              break;
            }
            console.warn("⚠️ [BookingApp] handleSummarySubmit called but not on summary step");
            return _context2.a(2);
          case 1:
            setLoading(true);
            _context2.p = 2;
            // Get summary data to access terms
            _summaryData = getSummaryData();
            if (_summaryData) {
              _context2.n = 3;
              break;
            }
            console.error("❌ [BookingApp] Summary data not available");
            throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Summary data not available", "wpcbooking"));
          case 3:
            _summaryData$summary_ = _summaryData.summary_options, summary_options = _summaryData$summary_ === void 0 ? {} : _summaryData$summary_;
            _summary_options$term = summary_options.terms, terms = _summary_options$term === void 0 ? [] : _summary_options$term; // Validate terms - check if all required terms are accepted
            if (!(Array.isArray(terms) && terms.length > 0)) {
              _context2.n = 10;
              break;
            }
            required_terms = terms.filter(function (term) {
              return term.required === true;
            });
            if (!(required_terms.length > 0)) {
              _context2.n = 7;
              break;
            }
            terms_conditions = (formData === null || formData === void 0 ? void 0 : formData.terms_conditions) || {};
            all_required_accepted = required_terms.every(function (term) {
              var is_accepted = terms_conditions[term.page_id] === "yes";
              return is_accepted;
            });
            if (all_required_accepted) {
              _context2.n = 4;
              break;
            }
            console.error("❌ 1[BookingApp] Not all required terms are accepted");
            errorManager.addGlobalError({
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You must agree to all required terms and conditions.", "wpcbooking"),
              type: "error"
            });
            setLoading(false);
            return _context2.a(2);
          case 4:
            // Prepare terms conditions array for mutation - use index instead of page_title
            // Map to indices in the original terms array for accepted terms
            console.log("🔍 [BookingApp] terms: ", terms_conditions);
            console.log("🔍 [BookingApp] terms_conditions: ", terms);
            termsConditionsArray = terms.map(function (term, index) {
              var is_accepted = terms_conditions[term.page_id] === "yes";
              return is_accepted ? term.page_id : null;
            }).filter(function (index) {
              return index !== null;
            }); // Double check - if we have required terms but array is empty, something is wrong
            if (!(required_terms.length > 0 && termsConditionsArray.length === 0)) {
              _context2.n = 5;
              break;
            }
            console.error("❌ 2[BookingApp] Required terms exist but none are accepted!");
            errorManager.addGlobalError({
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You must agree to all required terms and conditions.", "wpcbooking"),
              type: "error"
            });
            setLoading(false);
            return _context2.a(2);
          case 5:
            console.log("📦 [BookingApp] Submitting with formData:", formData);

            // Submit order with quote_hash, bookingID, terms and formData
            _context2.n = 6;
            return fetcher.submit_quote_and_process(storedQuoteHash, bookingID, termsConditionsArray, formData, summary_options, general);
          case 6:
            result = _context2.v;
            if (result.success) {
              setOrderSubmitted(true);
              setOrderData(result.order_data);
              (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.clearDraft)(bookingID);
              removeStorage(bookingID);
              errorManager.clearAllGlobalErrors();
            } else {
              console.error("❌ [BookingApp] Order submission failed:", result.errors);
              errorManager.addGlobalError({
                message: result.errors.join(", "),
                type: "error"
              });
            }
            _context2.n = 9;
            break;
          case 7:
            _context2.n = 8;
            return fetcher.submit_quote_and_process(storedQuoteHash, bookingID, [], formData, summary_options, general);
          case 8:
            _result = _context2.v;
            if (_result.success) {
              setOrderSubmitted(true);
              setOrderData(_result.order_data);
              (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.clearDraft)(bookingID);
              removeStorage(bookingID);
              errorManager.clearAllGlobalErrors();
            } else {
              console.error("❌ [BookingApp] Order submission failed:", _result.errors);
              errorManager.addGlobalError({
                message: _result.errors.join(", "),
                type: "error"
              });
            }
          case 9:
            _context2.n = 12;
            break;
          case 10:
            _context2.n = 11;
            return fetcher.submit_quote_and_process(storedQuoteHash, bookingID, [], formData, summary_options, general);
          case 11:
            _result2 = _context2.v;
            if (_result2.success) {
              setOrderSubmitted(true);
              setOrderData(_result2.order_data);
              (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.clearDraft)(bookingID);
              removeStorage(bookingID);
              errorManager.clearAllGlobalErrors();
            } else {
              console.error("❌ [BookingApp] Order submission failed:", _result2.errors);
              errorManager.addGlobalError({
                message: _result2.errors.join(", "),
                type: "error"
              });
            }
          case 12:
            _context2.n = 14;
            break;
          case 13:
            _context2.p = 13;
            _t = _context2.v;
            console.error("🔴 [BookingApp] Error in handleSummarySubmit:", _t);
            console.error("🔴 [BookingApp] Error stack:", _t.stack);
            errorManager.addGlobalError({
              message: _t.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Error submitting order", "wpcbooking"),
              type: "error"
            });
          case 14:
            _context2.p = 14;
            setLoading(false);
            return _context2.f(14);
          case 15:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 13, 14, 15]]);
    }));
    return function handleSummarySubmit() {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleFormDataChange = function handleFormDataChange(newData) {
    var updatedFormData = _objectSpread(_objectSpread({}, formData), newData);
    setFormData(updatedFormData);

    // DEV: Log storage data on change if flag is enabled
    if (_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.DEV_LOG_STORAGE_DATA) {
      setTimeout(function () {
        return (0,_utils_devTools_js__WEBPACK_IMPORTED_MODULE_12__.logStorageData)(bookingID);
      }, 100);
    }
  };

  // Get summary data from window.wpcbooking, but blocks from storage
  var getSummaryData = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    var _ref4 = window.wpcbookingOptions || {},
      options_summary = _ref4.options_summary;
    var draft = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.loadDraft)(bookingID);
    var summaryData = (draft === null || draft === void 0 ? void 0 : draft.summaryData) || {};
    // Initialize result with summary_options from window.wpcbooking
    var result = {
      summary_options: options_summary || {},
      blocks: [],
      quote_data: {},
      currency: "DKK",
      total_quote: 0,
      total_base: 0,
      shipping_total: 0
    };
    if (!summaryData) {
      return result;
    }
    if (summaryData && _typeof(summaryData) === "object" && !Array.isArray(summaryData)) {
      // Transform blocks object to array if needed

      // Convert object with numeric keys to array, preserving order by key
      var blocksArray = Object.keys(summaryData).sort(function (a, b) {
        return parseInt(a) - parseInt(b);
      }).map(function (key) {
        return summaryData[key];
      });

      // Return transformed data
      var transformedData = {
        summary_options: options_summary,
        blocks: blocksArray
      };
      return transformedData;
    }
    return result;
  }, [bookingID]);

  // Summary step detection
  var totalSteps = Object.keys(steps).length;
  var isSummaryStep = currentStep > totalSteps;

  // Get summary data once if on summary step
  var summaryData = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return isSummaryStep ? getSummaryData() : null;
  }, [isSummaryStep, getSummaryData]);
  var cardManager = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return bookingFormManager ? bookingFormManager.getCard() : null;
  }, [bookingFormManager]);
  var findNextValidStep = function findNextValidStep(fromStep) {
    // Get fresh cardManager to ensure we have updated products after saveStep
    var currentCardManager = bookingFormManager ? bookingFormManager.getCard() : cardManager;
    for (var step = fromStep + 1; step <= totalSteps; step++) {
      var stepData = steps[step];
      if (!stepData) {
        continue;
      }
      var shouldShow = (0,_hooks_useStepCondition_js__WEBPACK_IMPORTED_MODULE_13__.checkStepConditionWithManager)(stepData.conditions, step, maxReachedStep + 1, currentCardManager);
      if (shouldShow) {
        return step;
      }
    }
    return totalSteps + 1;
  };
  var findPrevValidStep = function findPrevValidStep(fromStep) {
    for (var step = fromStep - 1; step >= 1; step--) {
      var stepData = steps[step];
      if (!stepData) {
        continue;
      }
      var shouldShow = (0,_hooks_useStepCondition_js__WEBPACK_IMPORTED_MODULE_13__.checkStepConditionWithManager)(stepData.conditions, step, maxReachedStep, cardManager);
      if (shouldShow) {
        return step;
      }
    }
    return 1;
  };
  var handlePrevStep = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var lastValidStep, newStep;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            errorManager.clearAllGlobalErrors();
            if (isSummaryStep) {
              lastValidStep = findPrevValidStep(totalSteps + 1);
              setCurrentStep(lastValidStep);
              (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
                step: lastValidStep
              });
            } else if ((0,_utils_backNavigation_js__WEBPACK_IMPORTED_MODULE_11__.canGoBack)(currentStep)) {
              newStep = findPrevValidStep(currentStep);
              setCurrentStep(newStep);
              (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
                step: newStep
              });
            }
          case 1:
            return _context3.a(2);
        }
      }, _callee3);
    }));
    return function handlePrevStep() {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleStepClick = function handleStepClick(stepNum) {
    // Only allow clicking on steps that are <= max reached step
    // This is handled in BookingHeader, but we validate here too
    if (stepNum !== currentStep) {
      setCurrentStep(stepNum);
      (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
        step: stepNum
      });
    }
  };
  var handleSummaryClick = function handleSummaryClick() {
    // Instead of modal, switch to Summary step
    setCurrentStep(totalSteps + 1);
    (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
      step: totalSteps + 1
    });
  };
  var handleEditStep = function handleEditStep(stepId) {
    setCurrentStep(parseInt(stepId));
    (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_8__.patchDraft)(bookingID, {
      step: parseInt(stepId)
    });
  };
  if (!steps || Object.keys(steps).length === 0) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "booking-error"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Booking form is not configured", "wpcbooking")));
  }

  // Create context value for the entire booking flow
  var contextValue = {
    booking_id: bookingID,
    errorManager: errorManager,
    bookingFormManager: bookingFormManager,
    onChange: function onChange(fieldName, value) {
      return handleFormDataChange(_defineProperty({}, fieldName, value));
    },
    nextButtonLabel: nextButtonLabel,
    setNextButtonLabel: updateNextButtonLabel,
    currentStep: currentStep,
    maxReachedStep: maxReachedStep,
    cardManager: cardManager,
    getSummaryData: getSummaryData,
    summaryData: summaryData
  };
  var preventFormSubmit = function preventFormSubmit(e) {
    e.preventDefault();
    return false;
  };
  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };
  var sectionClass = currentStep === 1 ? "pb-55p lg:pb-100p overflow-hidden aff-is-in-footer" : "pb-55p lg:pb-100p overflow-hidden";

  // Show thank you page if order was submitted successfully
  if (orderSubmitted && orderData) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_ThankYouPage_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
      heading: orderData.heading,
      text: orderData.text,
      background_image: orderData.background_image,
      button_link: orderData.button_link,
      button_label: orderData.button_label
    });
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_7__.BookingProvider, {
    value: contextValue
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("form", {
    method: "post",
    className: "cs-ignore-gutenberg alignfull",
    onSubmit: preventFormSubmit,
    onKeyDown: handleKeyDown
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "booking_id",
    value: bookingID
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "step",
    value: currentStep
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "quote_hash",
    value: storedQuoteHash
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
    type: "hidden",
    name: "booking_url",
    value: page_url_booking
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("section", {
    id: currentStep,
    className: sectionClass
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_BookingHeader_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
    errorManager: errorManager,
    title: title,
    colored_text: colored_text,
    black_text: black_text,
    current_step: currentStep,
    booking_id: bookingID,
    steps: steps,
    max_reached_step: maxReachedStep,
    onSummaryClick: handleSummaryClick,
    onStepChange: handleStepClick
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_BookingSection_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    step: currentStep,
    sections: sections,
    excerpt: (_steps$currentStep$ex = (_steps$currentStep = steps[currentStep]) === null || _steps$currentStep === void 0 ? void 0 : _steps$currentStep.excerpt) !== null && _steps$currentStep$ex !== void 0 ? _steps$currentStep$ex : "",
    is_summary_step: isSummaryStep,
    form_data: formData,
    errorManager: errorManager,
    on_validation_change: handleValidationChange,
    on_edit_step: handleEditStep,
    on_form_data_update: function on_form_data_update(updatedFormData) {
      setFormData(updatedFormData);
    }
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_BookingButtons_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
    current_step: currentStep,
    total_steps: Object.keys(steps).length,
    on_prev: handlePrevStep,
    on_next: handleNextStep,
    on_submit: isSummaryStep ? handleSummarySubmit : null,
    loading: loading,
    next_button_text: next_button_text,
    prev_button_text: prev_button_text,
    is_valid: isValid,
    can_go_back: (0,_utils_backNavigation_js__WEBPACK_IMPORTED_MODULE_11__.canGoBack)(currentStep)
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingApp);

/***/ }),

/***/ "./assets/js/public/booking/components/BookingButtons.jsx":
/*!****************************************************************!*\
  !*** ./assets/js/public/booking/components/BookingButtons.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var BookingButtons = function BookingButtons(_ref) {
  var current_step = _ref.current_step,
    _ref$total_steps = _ref.total_steps,
    total_steps = _ref$total_steps === void 0 ? 3 : _ref$total_steps,
    on_prev = _ref.on_prev,
    on_next = _ref.on_next,
    on_submit = _ref.on_submit,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$next_button_text = _ref.next_button_text,
    next_button_text = _ref$next_button_text === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Next", "wpcbooking") : _ref$next_button_text,
    _ref$prev_button_text = _ref.prev_button_text,
    prev_button_text = _ref$prev_button_text === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Previous", "wpcbooking") : _ref$prev_button_text,
    _ref$is_valid = _ref.is_valid,
    is_valid = _ref$is_valid === void 0 ? false : _ref$is_valid,
    _ref$can_go_back = _ref.can_go_back,
    can_go_back = _ref$can_go_back === void 0 ? false : _ref$can_go_back;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContextOptional)();
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    is_prev_loading = _useState2[0],
    set_is_prev_loading = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    is_next_loading = _useState4[0],
    set_is_next_loading = _useState4[1];
  var nextButtonRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var is_first_step = current_step === 1;
  var is_last_regular_step = current_step === total_steps;
  var is_summary_step = current_step > total_steps;
  var show_back_button = can_go_back && !is_first_step || is_summary_step;
  var next_button_disabled = loading || !is_valid;
  var effective_next_button_text = (context === null || context === void 0 ? void 0 : context.nextButtonLabel) || next_button_text;

  // Get summary data from context for summary step
  var summaryData = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (is_summary_step && context !== null && context !== void 0 && context.summaryData) {
      return context.summaryData;
    }
    return null;
  }, [is_summary_step, context === null || context === void 0 ? void 0 : context.summaryData]);

  // Get button text and icon from summary options
  var effective_save_button_text = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _summaryData$summary_;
    if (is_summary_step && summaryData !== null && summaryData !== void 0 && (_summaryData$summary_ = summaryData.summary_options) !== null && _summaryData$summary_ !== void 0 && _summaryData$summary_.send_button_text) {
      return summaryData.summary_options.send_button_text;
    }
  }, [is_summary_step, summaryData]);
  var send_button_icon = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var _summaryData$summary_2;
    if (is_summary_step && summaryData !== null && summaryData !== void 0 && (_summaryData$summary_2 = summaryData.summary_options) !== null && _summaryData$summary_2 !== void 0 && _summaryData$summary_2.send_button_icon) {
      return summaryData.summary_options.send_button_icon;
    }
    return null;
  }, [is_summary_step, summaryData]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    set_is_prev_loading(false);
    set_is_next_loading(false);
  }, [current_step, loading]);

  // Reset next button loading when errors are displayed
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var errorManager = context === null || context === void 0 ? void 0 : context.errorManager;
    if (!errorManager) return;
    var handleError = function handleError(event) {
      // Reset loading when field errors or global errors are added
      if (event.type === "field_error" || event.type === "global_error") {
        set_is_next_loading(false);
      }
    };
    errorManager.addListener(handleError);
    return function () {
      errorManager.removeListener(handleError);
    };
  }, [context === null || context === void 0 ? void 0 : context.errorManager]);

  // Force DOM update for disabled attribute

  var handle_prev_click = function handle_prev_click(e) {
    e.preventDefault();
    if (show_back_button && on_prev) {
      set_is_prev_loading(true);
      on_prev();
    }
  };
  var handle_next_click = function handle_next_click(e) {
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
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "cs-container"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-full mt-40p large:mt-75p flex ".concat(is_first_step ? "justify-center" : "justify-center medium:justify-between", " gap-4 flex-wrap medium:flex-nowrap")
  }, !is_first_step && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    className: "cs-form-button-prev ".concat(is_prev_loading ? "loading" : ""),
    id: "aff_prev_button",
    name: "aff_prev_button",
    onClick: handle_prev_click,
    disabled: loading || is_prev_loading
  }, prev_button_text), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    ref: nextButtonRef,
    type: is_summary_step ? "submit" : "button",
    className: [is_summary_step ? "aff-form-button-submit" : "cs-form-button-next", is_next_loading ? "loading" : "", next_button_disabled ? "is-disabled" : "", is_summary_step ? "is-summary" : "", is_summary_step && send_button_icon ? "flex items-center justify-center gap-2 whitespace-nowrap" : ""].filter(Boolean).join(" "),
    name: is_summary_step ? "send_order" : "next_button",
    id: is_summary_step ? "send_order" : "next_button",
    "data-quote-initialized": is_summary_step ? "true" : undefined,
    "data-label-button": is_first_step ? "Pick later" : undefined,
    onClick: handle_next_click,
    disabled: next_button_disabled || is_next_loading
  }, is_summary_step ? effective_save_button_text : effective_next_button_text, is_summary_step && send_button_icon && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "button-icon cs-mask",
    style: {
      "--mask-img": "url('".concat(send_button_icon, "')")
    }
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingButtons);

/***/ }),

/***/ "./assets/js/public/booking/components/BookingHeader.jsx":
/*!***************************************************************!*\
  !*** ./assets/js/public/booking/components/BookingHeader.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _hooks_useStepCondition_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks/useStepCondition.js */ "./assets/js/public/booking/hooks/useStepCondition.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
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





var BookingHeader = function BookingHeader(_ref) {
  var errorManager = _ref.errorManager,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? "" : _ref$title,
    _ref$colored_text = _ref.colored_text,
    colored_text = _ref$colored_text === void 0 ? "" : _ref$colored_text,
    _ref$black_text = _ref.black_text,
    black_text = _ref$black_text === void 0 ? "" : _ref$black_text,
    _ref$current_step = _ref.current_step,
    current_step = _ref$current_step === void 0 ? 1 : _ref$current_step,
    _ref$steps = _ref.steps,
    steps = _ref$steps === void 0 ? {} : _ref$steps,
    _ref$site_url = _ref.site_url,
    site_url = _ref$site_url === void 0 ? "" : _ref$site_url,
    _ref$onSummaryClick = _ref.onSummaryClick,
    onSummaryClick = _ref$onSummaryClick === void 0 ? null : _ref$onSummaryClick,
    _ref$booking_id = _ref.booking_id,
    booking_id = _ref$booking_id === void 0 ? null : _ref$booking_id,
    _ref$onStepChange = _ref.onStepChange,
    onStepChange = _ref$onStepChange === void 0 ? null : _ref$onStepChange,
    _ref$max_reached_step = _ref.max_reached_step,
    max_reached_step = _ref$max_reached_step === void 0 ? 1 : _ref$max_reached_step;
  var _useBookingContext = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_4__.useBookingContext)(),
    cardManager = _useBookingContext.cardManager;
  var _useStepCondition = (0,_hooks_useStepCondition_js__WEBPACK_IMPORTED_MODULE_3__.useStepCondition)(cardManager),
    checkStepCondition = _useStepCondition.checkStepCondition;
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    icons = _useState2[0],
    set_icons = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    global_errors = _useState4[0],
    set_global_errors = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)({
      visible: false,
      text: "",
      x: 0,
      y: 0
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    tooltip = _useState6[0],
    set_tooltip = _useState6[1];
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (errorManager) {
      var global_error_listener = function global_error_listener(event) {
        if (event.type === "global_error") {
          set_global_errors(function (prev) {
            return [].concat(_toConsumableArray(prev), [event.error]);
          });
        } else if (event.type === "global_error_removed") {
          set_global_errors(function (prev) {
            return prev.filter(function (error) {
              return error.id !== event.errorId;
            });
          });
        } else if (event.type === "global_errors_cleared") {
          set_global_errors([]);
        }
      };
      errorManager.addListener(global_error_listener);
      return function () {
        errorManager.removeListener(global_error_listener);
      };
    }
  }, [errorManager]);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (steps && Object.keys(steps).length > 0) {
      var processedIcons = Object.entries(steps).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          stepId = _ref3[0],
          stepData = _ref3[1];
        var iconUrl = null;
        if (stepData.thumbnail_src) {
          var wpContentIndex = stepData.thumbnail_src.indexOf("wp-content");
          if (wpContentIndex !== -1) {
            var relativePath = stepData.thumbnail_src.substring(wpContentIndex);
            iconUrl = site_url ? "".concat(site_url, "/").concat(relativePath) : "/".concat(relativePath);
          } else {
            iconUrl = stepData.thumbnail_src;
          }
        }
        return {
          id: parseInt(stepId),
          title: stepData.title || "Step ".concat(stepId),
          icon: iconUrl,
          thumbnail_id: stepData.thumbnail_id || null,
          excerpt: stepData.excerpt || "",
          label_summary: stepData.label_summary || "",
          conditions: stepData.conditions || null
        };
      });

      // Add summary icon always (regardless of completed steps)
      var summaryIcon = {
        id: "summary",
        title: "Summary",
        icon: "/wp-content/plugins/wpcbooking/assets/img/summary.svg",
        isSummary: true,
        isAvailable: false
      };
      processedIcons.push(summaryIcon);
      set_icons(processedIcons);
    }
  }, [steps, current_step]);
  var remove_global_error = function remove_global_error(error_id) {
    if (errorManager) {
      errorManager.removeGlobalError(error_id);
    }
  };
  var handle_mouse_enter = function handle_mouse_enter(e, icon_title, is_clickable) {
    if (is_clickable) {
      var rect = e.currentTarget.getBoundingClientRect();
      set_tooltip({
        visible: true,
        text: icon_title,
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    }
  };
  var handle_mouse_leave = function handle_mouse_leave() {
    set_tooltip({
      visible: false,
      text: "",
      x: 0,
      y: 0
    });
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "cs-container cs-grid items-center gap-y-7 large:gap-y-10"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full medium:col-[1/span_8] medium:-mr-th-gap self-start"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "grid relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full row-span-full max-small:-mx-cont-px small:absolute right-0 h-full small:w-[110vw] medium:w-[70vw] bg-gradient-to-r from-th-orange to-th-pink rounded-r-full"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h1", {
    className: "col-span-full row-span-full pt-40p pb-50p af-h1 text-white max-medium:text-center relative z-20"
  }, title))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full medium:col-[9/span_4] medium:ml-th-gap"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p28 text-th-pink text-right"
  }, colored_text), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p20-bold text-black text-right mt-2"
  }, black_text)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full medium:col-[1/span_10] medium:-mr-th-gap aff-form-icons-wrapper"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    className: "aff-form-icons flex gap-x-10p -translate-y-15p max-medium:px-cont-px py-3 max-medium:-mx-cont-px max-medium:overflow-x-auto"
  }, icons.map(function (icon, index) {
    var stepNum = index + 1;
    var isActive = stepNum <= current_step;
    var isCurrent = stepNum === current_step;
    var isSummary = icon.isSummary;
    // Summary is always clickable, regular steps only if <= max_reached_step
    var isClickable = isSummary || stepNum <= max_reached_step;

    // Handle icon click - summary or step change
    var handleIconClick = function handleIconClick() {
      handle_mouse_leave();
      if (errorManager) {
        errorManager.clearAllGlobalErrors();
      }
      if (isSummary && onSummaryClick) {
        onSummaryClick();
      } else if (isClickable && onStepChange && stepNum !== current_step && !isSummary) {
        onStepChange(stepNum);
      }
    };
    var shouldShowIcon = checkStepCondition(icon.conditions, stepNum, max_reached_step);
    if (!shouldShowIcon) {
      return null;
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: icon.id,
      "data-step": stepNum,
      className: "".concat(isCurrent ? "flex gap-x-20p items-center shrink-0 bg-th-orange-light rounded-full" : isActive ? "flex relative shrink-0" : "shrink-0")
    }, isCurrent ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "data-step": stepNum,
      "data-title": icon.title,
      className: "shrink-0 w-85p h-85p rounded-full border-8 border-white bg-white flex items-center justify-center",
      style: {
        boxShadow: "0 0 20px #ee70136b",
        cursor: isClickable ? "pointer" : "default"
      },
      onClick: isClickable ? handleIconClick : undefined
    }, icon.icon ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('".concat(icon.icon, "')")
      },
      className: "w-40p h-40p bg-th-orange cs-mask"
    }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('data:image/svg+xml,<svg>\uD83D\uDCCB</svg>')"
      },
      className: "w-40p h-40p bg-th-orange cs-mask"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "pr-30p af-p18-form"
    }, icon.title)) : isActive ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "data-step": stepNum,
      "data-title": icon.title,
      className: "icon-item w-85p h-85p rounded-full border-8 border-black bg-black flex items-center justify-center clickable-icon",
      style: {
        position: "relative",
        cursor: isSummary || isClickable ? "pointer" : "default"
      },
      onClick: isSummary || isClickable ? handleIconClick : undefined,
      onMouseEnter: function onMouseEnter(e) {
        return handle_mouse_enter(e, icon.title, isSummary || isClickable);
      },
      onMouseLeave: handle_mouse_leave
    }, icon.icon ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('".concat(icon.icon, "')")
      },
      className: "w-40p h-40p bg-white cs-mask"
    }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('data:image/svg+xml,<svg>\uD83D\uDCCB</svg>')"
      },
      className: "w-40p h-40p bg-white cs-mask"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "absolute -z-10 ml-1 w-[200%] h-full bg-black rounded-full"
    })) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      "data-step": stepNum,
      "data-title": icon.title,
      className: "icon-item w-85p h-85p rounded-full border-8 border-th-grey-form bg-white flex items-center justify-center clickable-icon",
      style: {
        position: "relative",
        cursor: isSummary || isClickable ? "pointer" : "default"
      },
      onClick: isSummary || isClickable ? handleIconClick : undefined,
      onMouseEnter: function onMouseEnter(e) {
        return handle_mouse_enter(e, icon.title, isSummary || isClickable);
      },
      onMouseLeave: handle_mouse_leave
    }, icon.icon ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('".concat(icon.icon, "')")
      },
      className: "w-40p h-40p bg-th-grey cs-mask"
    }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('data:image/svg+xml,<svg>\uD83D\uDCCB</svg>')"
      },
      className: "w-40p h-40p bg-th-grey cs-mask"
    })));
  }))), tooltip.visible && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "fixed z-50 pointer-events-none",
    style: {
      left: "".concat(tooltip.x, "px"),
      top: "".concat(tooltip.y, "px"),
      transform: "translate(-50%, -100%)"
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "bg-th-orange text-white px-3 py-2 rounded-lg shadow-lg af-p14 whitespace-nowrap"
  }, tooltip.text, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute left-1/2 bottom-0 w-0 h-0",
    style: {
      transform: "translate(-50%, 100%)",
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderTop: "6px solid #EE7013"
    }
  }))), global_errors.length > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "bg-red-50 border border-red-200 rounded-lg p-4 mb-4 relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    onClick: function onClick() {
      return errorManager.clearAllGlobalErrors();
    },
    className: "absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Close all errors", "wpcbooking")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
    className: "w-5 h-5",
    fill: "currentColor",
    viewBox: "0 0 20 20"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
    fillRule: "evenodd",
    d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    clipRule: "evenodd"
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-start gap-x-3"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex-shrink-0 bg-red-100 p-2 rounded-full"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
    className: "w-5 h-5 text-red-600",
    fill: "currentColor",
    viewBox: "0 0 32 32"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
    d: "M14.611 18.856c-0.346 0.352-0.52 0.782-0.52 1.292 0 0.551 0.197 1.014 0.59 1.389 0.363 0.346 0.799 0.519 1.309 0.519 0.521 0 0.971-0.188 1.346-0.566s0.562-0.828 0.562-1.35c0-0.504-0.182-0.943-0.545-1.318-0.363-0.381-0.801-0.571-1.311-0.571-0.567-0.001-1.044 0.201-1.431 0.605v0zM14.391 10.788c-0.299 0.451-0.447 1.011-0.447 1.679 0 0.545 0.092 1.146 0.276 1.802s0.435 1.271 0.751 1.846c0.428 0.779 0.76 1.169 0.994 1.169 0.24 0 0.557-0.305 0.949-0.914 0.346-0.539 0.622-1.152 0.83-1.841s0.312-1.332 0.312-1.93c0-0.902-0.244-1.6-0.73-2.092-0.363-0.375-0.805-0.563-1.326-0.563-0.703 0-1.24 0.282-1.609 0.844v0z"
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex-1 pr-6"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h3", {
    className: "text-sm font-medium text-red-800 mb-2"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Form Errors", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "space-y-2"
  }, global_errors.map(function (error) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: error.id,
      className: "flex items-start gap-x-2 text-sm text-red-700"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, error.message));
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingHeader);

/***/ }),

/***/ "./assets/js/public/booking/components/BookingSection.jsx":
/*!****************************************************************!*\
  !*** ./assets/js/public/booking/components/BookingSection.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _blocks_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../blocks/index.js */ "./assets/js/public/booking/blocks/index.js");
/* harmony import */ var _GlassComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GlassComponent.jsx */ "./assets/js/public/booking/components/GlassComponent.jsx");
/* harmony import */ var _SummarySection_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SummarySection.jsx */ "./assets/js/public/booking/components/SummarySection.jsx");







var BookingSection = function BookingSection(_ref) {
  var step = _ref.step,
    excerpt = _ref.excerpt,
    _ref$sections = _ref.sections,
    sections = _ref$sections === void 0 ? {} : _ref$sections,
    _ref$is_summary_step = _ref.is_summary_step,
    is_summary_step = _ref$is_summary_step === void 0 ? false : _ref$is_summary_step,
    _ref$form_data = _ref.form_data,
    form_data = _ref$form_data === void 0 ? {} : _ref$form_data,
    _ref$errorManager = _ref.errorManager,
    errorManager = _ref$errorManager === void 0 ? null : _ref$errorManager,
    on_validation_change = _ref.on_validation_change,
    on_edit_step = _ref.on_edit_step;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var bookingFormManager = context.bookingFormManager,
    currentStep = context.currentStep,
    maxReachedStep = context.maxReachedStep;

  // Memoizace aktuálního step section pro stabilní referenci
  var currentStepSection = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return sections[step] || [];
  }, [sections, step]);

  // Memoizace form_data pro aktuální step (pouze relevantní pole)
  var stepFormData = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!currentStepSection.length) return {};
    var relevantData = {};
    currentStepSection.forEach(function (block) {
      var _block$attrs;
      var fieldId = (_block$attrs = block.attrs) === null || _block$attrs === void 0 ? void 0 : _block$attrs.field_id;
      if (fieldId && form_data[fieldId] !== undefined) {
        relevantData[fieldId] = form_data[fieldId];
      }
    });
    return relevantData;
  }, [currentStepSection, form_data]);

  // Ref pro sledování, zda už byla inicializace provedena
  var initializedStepRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // Ref pro sledování, zda už byl tento step validován
  var validatedStepRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);

  // Inicializuje validaci pro aktuální step s existujícími daty
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!bookingFormManager || !currentStepSection.length) return;

    // Zabraň reinicializaci, pokud už byla provedena pro tento step
    if (initializedStepRef.current === step) return;
    bookingFormManager.initializeStepValidation(step, sections, form_data);
    initializedStepRef.current = step;
  }, [step, bookingFormManager]);

  // Stabilní handler pro validation changes
  var handleValidationChange = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (event) {
    if (!on_validation_change) return;
    if (event.type === 'field_validation_changed' && event.step === step) {
      var isStepValid = bookingFormManager.isStepValid(step);
      on_validation_change(isStepValid);
    } else if (event.type === 'step_validation_initialized' && event.step === step) {
      on_validation_change(event.isStepValid);
    }
  }, [step, bookingFormManager, on_validation_change]);

  // Naslouchá událostem změn validace a notifikuje parent komponentu
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!bookingFormManager || !on_validation_change) return;
    bookingFormManager.add_listener(handleValidationChange);
    return function () {
      bookingFormManager.remove_listener(handleValidationChange);
    };
  }, [bookingFormManager, handleValidationChange]);

  // Kontroluje validaci po vykreslení bloků: pro už navštívené stepy = valid, pro nové stepy kontroluje uložená data nebo pravidla
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!on_validation_change || !currentStepSection.length) return;

    // Zabraň opakovanému validování, pokud už bylo provedeno pro tento step
    if (validatedStepRef.current === step && currentStep === maxReachedStep) return;

    // Použij requestAnimationFrame místo setTimeout(0) - lepší pro synchronizaci s renderem
    var rafId = requestAnimationFrame(function () {
      // If current step is less than max reached step, always set to valid
      if (currentStep < maxReachedStep) {
        on_validation_change(true);
        validatedStepRef.current = step;
        return;
      }

      // Current logic: only execute when currentStep === maxReachedStep
      // First check if we have data stored from previous fill
      var hasStoredData = currentStepSection.some(function (block) {
        var _block$attrs2;
        var fieldId = (_block$attrs2 = block.attrs) === null || _block$attrs2 === void 0 ? void 0 : _block$attrs2.field_id;
        if (!fieldId) return false;
        var value = stepFormData[fieldId];
        return value !== undefined && value !== null && value !== '';
      });

      // If we have stored data, use validation manager to validate
      if (hasStoredData && bookingFormManager) {
        var _isValid = bookingFormManager.isStepValid(step);
        on_validation_change(_isValid);
        validatedStepRef.current = step;
        return;
      }

      // Fallback: Check if any block has rules
      var hasBlockWithRules = currentStepSection.some(function (block) {
        var _block$attrs3;
        var rules = ((_block$attrs3 = block.attrs) === null || _block$attrs3 === void 0 ? void 0 : _block$attrs3.rules) || block.rules || {};
        return Object.keys(rules).length > 0;
      });

      // If any block has rules → false, if no blocks have rules → true
      var isValid = !hasBlockWithRules;
      on_validation_change(isValid);
      validatedStepRef.current = step;
    });
    return function () {
      return cancelAnimationFrame(rafId);
    };
  }, [step, currentStep, maxReachedStep, on_validation_change, bookingFormManager, currentStepSection, stepFormData]);

  // Regular step rendering
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "cs-container cs-grid items-center gap-y-7 large:gap-y-10"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full ".concat(step > 1 ? 'medium:self-start medium:col-[1/span_9]' : '', " mt-30p")
  }, !is_summary_step && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "".concat(step === 1 ? 'text-center' : '', " w-11/12 aff-step-desc af-p30-light text-black"),
    dangerouslySetInnerHTML: {
      __html: excerpt || ''
    }
  }), is_summary_step ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_SummarySection_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    form_data: form_data,
    errorManager: errorManager,
    sections: sections,
    on_validation_change: on_validation_change,
    on_edit_step: on_edit_step
  }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "acf-innerblocks-container"
  }, sections[step] && sections[step].length > 0 ? sections[step].map(function (block, index) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_blocks_index_js__WEBPACK_IMPORTED_MODULE_4__.BlockRenderer, {
      key: "".concat(block.blockName, "-").concat(index),
      block_data: block
    });
  }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-center py-8"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-gray-500 af-p20"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No content configured for step {step}', 'wpcbooking').replace('{step}', step))))), step > 1 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full medium:col-[10/span_3] self-start relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full medium:col-[10/span_3] self-start relative z-0"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute left-0 top-0 w-full h-[120vh] bg-no-repeat bg-left-top pointer-events-none",
    style: {
      backgroundImage: "url(".concat(window.location.origin, "/wp-content/themes/bartender/assets/img/form/form-step-bg.svg)"),
      backgroundSize: 'auto 100%',
      zIndex: -1
    }
  })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-start justify-center medium:justify-start relative z-10"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_GlassComponent_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
    step: step - 1
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingSection);

/***/ }),

/***/ "./assets/js/public/booking/components/CartTotal.jsx":
/*!***********************************************************!*\
  !*** ./assets/js/public/booking/components/CartTotal.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var CartTotal = function CartTotal(_ref) {
  var _window$wpcbooking_pu;
  var _ref$summary_options = _ref.summary_options,
    summary_options = _ref$summary_options === void 0 ? {} : _ref$summary_options,
    _ref$blocks = _ref.blocks,
    blocks = _ref$blocks === void 0 ? [] : _ref$blocks,
    _ref$shipping_total = _ref.shipping_total,
    shipping_total = _ref$shipping_total === void 0 ? 0 : _ref$shipping_total;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _ref2 = context || {},
    bookingFormManager = _ref2.bookingFormManager;
  var cart = bookingFormManager ? bookingFormManager.getCart() : null;

  // State for cart totals (will be updated when cart changes)
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      var _cart$getBaseTotal, _cart$getPercentageTo, _cart$getGrandTotal, _cart$getCartTotal;
      if (!cart) return {
        base_total: 0,
        percentage_total: 0,
        grand_total: 0
      };
      return {
        base_total: ((_cart$getBaseTotal = cart.getBaseTotal) === null || _cart$getBaseTotal === void 0 ? void 0 : _cart$getBaseTotal.call(cart)) || 0,
        percentage_total: ((_cart$getPercentageTo = cart.getPercentageTotal) === null || _cart$getPercentageTo === void 0 ? void 0 : _cart$getPercentageTo.call(cart)) || 0,
        grand_total: ((_cart$getGrandTotal = cart.getGrandTotal) === null || _cart$getGrandTotal === void 0 ? void 0 : _cart$getGrandTotal.call(cart)) || ((_cart$getCartTotal = cart.getCartTotal) === null || _cart$getCartTotal === void 0 ? void 0 : _cart$getCartTotal.call(cart)) || 0
      };
    }),
    _useState2 = _slicedToArray(_useState, 2),
    cartTotals = _useState2[0],
    setCartTotals = _useState2[1];

  // State for forcing re-render of step items
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    refreshKey = _useState4[0],
    setRefreshKey = _useState4[1];

  // Subscribe to cart updates
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!cart || typeof cart.subscribe !== "function") {
      console.warn("🛒 [CartTotal] Cart not available or subscribe not supported");
      return;
    }
    var unsubscribe = cart.subscribe(function (totals) {
      console.log("🛒 [CartTotal] Subscribing to cart updates", totals);
      setCartTotals({
        base_total: totals.base_total || 0,
        percentage_total: totals.percentage_total || 0,
        grand_total: totals.grand_total || 0
      });
      // Force re-render of step items
      setRefreshKey(function (prev) {
        return prev + 1;
      });
    });

    // Cleanup subscription on unmount
    return function () {
      if (unsubscribe) unsubscribe();
    };
  }, [cart]);

  // Listen to BookingFormManager events for cart updates
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!bookingFormManager) return;
    var handleCartUpdate = function handleCartUpdate(event) {
      if (event.type === "cart_updated_from_server") {
        setCartTotals(event.totals);
        // Force re-render of step items
        setRefreshKey(function (prev) {
          return prev + 1;
        });
      }
    };
    bookingFormManager.add_listener(handleCartUpdate);
    return function () {
      bookingFormManager.remove_listener(handleCartUpdate);
    };
  }, [bookingFormManager]);

  // Get values from state
  var currency = (cart === null || cart === void 0 ? void 0 : cart.currency) || ((_window$wpcbooking_pu = window.wpcbooking_public) === null || _window$wpcbooking_pu === void 0 ? void 0 : _window$wpcbooking_pu.currency) || "DKK";
  var total_base = cartTotals.base_total;
  var total_percentage = cartTotals.percentage_total;
  var total_quote = cartTotals.grand_total;
  var cart_total = total_quote + shipping_total;
  var cartTotal = 0;
  var cartProcessedTotal = 0;
  var render_step_items = function render_step_items() {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return null;
    }
    // Filter blocks to only show steps with price_step > 0
    var blocks_with_price = blocks.filter(function (block, index) {
      if (!block) return false;
      var price_step = block.price_step || 0;
      var has_price = price_step > 0;
      return has_price;
    });
    return blocks_with_price.map(function (block, filtered_index) {
      if (!block) {
        return null;
      }
      var data = block.data || {};
      var original_index = blocks.indexOf(block);
      var step_num = original_index + 1;
      var label_summary = data.label_summary || data.title || "".concat((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Step", "wpcbooking"), " ").concat(step_num);
      var price_step = block.price_step || 0;
      cartTotal += price_step;
      var step_items = [];
      console.log("🔍 [CartTotal] Step items: ", price_step);
      if (cart && typeof cart.get_items_by_step === "function") {
        step_items = cart.get_items_by_step(step_num) || [];
      }

      // Filter out items with total 0 and check if any items remain
      var valid_items = step_items.filter(function (item) {
        var item_price = item.price || item.value || 0;
        var item_quantity = item.quantity || 1;
        var item_total = item_price * item_quantity;
        return item_total > 0;
      });
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        key: "cart-step-".concat(step_num, "-").concat(refreshKey),
        className: "mb-3"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "af-p18-bold text-white mb-1.5"
      }, label_summary), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "ml-4"
      }, valid_items.map(function (item, item_index) {
        var item_name = item.name || item.label || item.title || "";
        var item_price = item.price || item.value || 0;
        var item_quantity = item.quantity || 1;
        var item_total = item_price * item_quantity;
        return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
          key: "cart-item-".concat(step_num, "-").concat(item_index, "-").concat(refreshKey),
          className: "py-2 border-b border-dashed border-white/30 last:border-b-0"
        }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
          className: "af-p16 text-white/90 leading-tight flex items-baseline gap-1"
        }, item_name));
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
        className: "af-p16-bold text-white leading-tight block text-right mr-50p"
      }, price_step.toLocaleString(), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
        className: "currnency_symbol text-white/80 ml-1 text-sm leading-none"
      }, " ", currency)));
    });
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    id: "cart",
    className: "bg-th-orange rounded-[35px] mt-5"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-5 pl-20p large:pl-40p pt-4"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-50p h-50p rounded-full bg-white flex justify-center items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
    href: "",
    style: {
      "--mask-img": "url('".concat(window.location.origin, "/wp-content/themes/bartender/assets/img/form/coins.svg')")
    },
    className: "w-25p h-25p bg-th-orange cs-mask"
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-20p large:ml-100p pb-20p text-white"
  }, render_step_items(), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3 border-b border-dashed border-white"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-reg"
  }, summary_options.label_price || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Tjenester", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "aff-total-contents af-p25-bold mr-50p"
  }, total_base !== null && total_base !== void 0 ? total_base : 0, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, " ", currency))), total_percentage !== 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3 border-b border-dashed border-white"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-reg"
  }, total_percentage > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Tilføjelse", "wpcbooking") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Rabat", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-bold mr-50p"
  }, total_percentage > 0 ? "+" : "", total_percentage.toLocaleString(), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, " ", currency))), shipping_total > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3 border-b border-dashed border-white"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-reg"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Levering", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p25-bold mr-50p"
  }, shipping_total, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, " ", currency)))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex justify-between items-center py-3"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "af-p30"
  }, summary_options.label_total || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Total", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "aff-total-price af-p30 mr-50p"
  }, cartTotal !== null && cartTotal !== void 0 ? cartTotal : 0, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "currnency_symbol"
  }, " ", currency))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartTotal);

/***/ }),

/***/ "./assets/js/public/booking/components/EditStepPopup.jsx":
/*!***************************************************************!*\
  !*** ./assets/js/public/booking/components/EditStepPopup.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _blocks_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../blocks/index.js */ "./assets/js/public/booking/blocks/index.js");
/* harmony import */ var _utils_summaryQueries_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/summaryQueries.js */ "./assets/js/public/booking/utils/summaryQueries.js");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/storage.js */ "./assets/js/public/booking/utils/storage.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }







var EditStepPopup = function EditStepPopup(_ref) {
  var _window$wpcbooking_pu;
  var step_num = _ref.step_num,
    step_label = _ref.step_label,
    sections = _ref.sections,
    form_data = _ref.form_data,
    on_close = _ref.on_close,
    on_save_success = _ref.on_save_success;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _ref2 = context || {},
    bookingFormManager = _ref2.bookingFormManager,
    booking_id = _ref2.booking_id,
    errorManager = _ref2.errorManager,
    currentStep = _ref2.currentStep;

  // Get graphql endpoint from window global
  var graphql_endpoint = ((_window$wpcbooking_pu = window.wpcbooking_public) === null || _window$wpcbooking_pu === void 0 ? void 0 : _window$wpcbooking_pu.graphql_endpoint) || "/graphql";

  // Get quote hash from draft storage
  var quote_hash = function () {
    var draft = (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_6__.loadDraft)(booking_id);
    return (draft === null || draft === void 0 ? void 0 : draft.quoteHash) || "";
  }();

  // Initialize fetcher for saveStep
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return new _utils_summaryQueries_js__WEBPACK_IMPORTED_MODULE_5__.SummaryDataFetcher({
        endpoint: graphql_endpoint,
        bookingId: booking_id,
        quoteHash: quote_hash,
        errorManager: errorManager
      });
    }),
    _useState2 = _slicedToArray(_useState, 1),
    fetcher = _useState2[0];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    is_saving = _useState4[0],
    set_is_saving = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    is_valid = _useState6[0],
    set_is_valid = _useState6[1];

  // Get current step sections
  var current_step_sections = sections[step_num] || [];

  // Initialize validation for this step
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!bookingFormManager || !current_step_sections.length) return;
    bookingFormManager.initializeStepValidation(step_num, sections, form_data);

    // Check if step is valid
    var checkValidation = function checkValidation() {
      var isStepValid = bookingFormManager.isStepValid(step_num);
      set_is_valid(isStepValid);
    };
    checkValidation();

    // Listen for validation changes
    var handleValidationChange = function handleValidationChange(event) {
      if (event.type === 'field_validation_changed' && event.step === step_num) {
        var isStepValid = bookingFormManager.isStepValid(step_num);
        set_is_valid(isStepValid);
      } else if (event.type === 'step_validation_initialized' && event.step === step_num) {
        set_is_valid(event.isStepValid);
      }
    };
    bookingFormManager.add_listener(handleValidationChange);
    return function () {
      bookingFormManager.remove_listener(handleValidationChange);
    };
  }, [step_num, bookingFormManager, current_step_sections, sections, form_data]);

  // Handle save button click
  var handle_save = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var result, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (!(!is_valid || is_saving)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            set_is_saving(true);
            _context.p = 2;
            _context.n = 3;
            return fetcher.saveStep(step_num, form_data, {
              autoHandleErrors: false
            });
          case 3:
            result = _context.v;
            if (!result.success) {
              _context.n = 5;
              break;
            }
            _context.n = 4;
            return (0,_utils_storage_js__WEBPACK_IMPORTED_MODULE_6__.patchDraft)(booking_id, {
              step: currentStep
            });
          case 4:
            if (on_close) {
              on_close();
            }
            if (on_save_success) {
              on_save_success(result);
            }
            _context.n = 6;
            break;
          case 5:
            console.error("🔴 [EditStepPopup] Save failed:", result.errors);
            if (result.errors && _typeof(result.errors) === "object" && !Array.isArray(result.errors)) {
              Object.keys(result.errors).forEach(function (fieldId) {
                var errorMessage = result.errors[fieldId];
                var message = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
                errorManager.setFieldError(fieldId, message);
              });
            } else if (Array.isArray(result.errors)) {
              result.errors.forEach(function (errorMsg) {
                errorManager.addGlobalError({
                  message: errorMsg,
                  type: "error"
                });
              });
            }
          case 6:
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            console.error("🔴 [EditStepPopup] Save error:", _t);
            errorManager.addGlobalError({
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("An error occurred while saving", "wpcbooking"),
              type: "error"
            });
          case 8:
            _context.p = 8;
            set_is_saving(false);
            return _context.f(8);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[2, 7, 8, 9]]);
    }));
    return function handle_save(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  // Handle backdrop click
  var handle_backdrop_click = function handle_backdrop_click(e) {
    if (e.target === e.currentTarget && !is_saving) {
      if (on_close) {
        on_close();
      }
    }
  };

  // Handle escape key
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var handle_key_down = function handle_key_down(e) {
      if (e.key === "Escape" && !is_saving && on_close) {
        on_close();
      }
    };
    window.addEventListener("keydown", handle_key_down);
    return function () {
      return window.removeEventListener("keydown", handle_key_down);
    };
  }, [is_saving, on_close]);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
    style: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    onClick: handle_backdrop_click
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "bg-white rounded-lg shadow-xl w-full max-w-[1200px] max-h-[90vh] overflow-hidden flex flex-col"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center justify-between p-6 border-b border-gray-200"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h2", {
    className: "text-2xl font-bold text-gray-900"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit", "wpcbooking"), " - ", step_label), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    onClick: on_close,
    disabled: is_saving,
    className: "text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Close", "wpcbooking")
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
    className: "w-6 h-6",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M6 18L18 6M6 6l12 12"
  })))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex-1 overflow-y-auto p-6"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "acf-innerblocks-container"
  }, current_step_sections.length > 0 ? current_step_sections.map(function (block, index) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_blocks_index_js__WEBPACK_IMPORTED_MODULE_4__.BlockRenderer, {
      key: "".concat(block.blockName, "-").concat(index),
      block_data: block
    });
  }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-center py-8"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-gray-500 af-p20"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No content configured for this step", "wpcbooking"))))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center justify-end gap-4 p-6 border-t border-gray-200"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    onClick: on_close,
    disabled: is_saving,
    className: "px-6 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 af-p18"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Cancel", "wpcbooking")), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
    type: "button",
    onClick: function onClick(e) {
      return handle_save(e);
    },
    disabled: !is_valid || is_saving,
    className: "px-6 py-2 text-white bg-th-orange rounded-full hover:bg-th-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed af-p18"
  }, is_saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Saving...", "wpcbooking") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Save", "wpcbooking")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditStepPopup);

/***/ }),

/***/ "./assets/js/public/booking/components/GlassComponent.jsx":
/*!****************************************************************!*\
  !*** ./assets/js/public/booking/components/GlassComponent.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");


var GlassComponent = function GlassComponent(_ref) {
  var step = _ref.step,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "w-[170px] h-[649px] mx-auto" : _ref$className;
  var glassRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (glassRef.current) {
      var allSteps = glassRef.current.querySelectorAll('.glass-step');
      allSteps.forEach(function (stepEl) {
        var stepID = parseInt(stepEl.dataset.id, 10);
        if (stepID <= step) {
          stepEl.classList.remove('hidden');
          if (stepID === step) {
            stepEl.classList.add('active');
          } else {
            stepEl.classList.remove('active');
          }
        } else {
          stepEl.classList.add('hidden');
          stepEl.classList.remove('active');
        }
      });
    }
  }, [step]);

  // Render SVG structure from standard.html template
  var renderStandardGlass = function renderStandardGlass() {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "226.3",
      height: "865.241",
      viewBox: "0 0 226.3 865.241",
      className: "glass-group"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("defs", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("clipPath", {
      id: "clip-path"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M18774.334-12257.333s28.334,7.667,50,10,48.666-5.334,48.666-5.334l-19-46.333s-80.334-46-81.334-46-52.332,7.667-53.666,9.667-16.666,34.333-16,36.333,23.666,25,24.666,25.667S18774.334-12257.333,18774.334-12257.333Z",
      transform: "translate(-17195 13524)",
      fill: "none",
      stroke: "#707070",
      strokeWidth: "1"
    }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      "data-id": "3",
      className: "glass-step hidden"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1122.345,571.748c11.994,56.561,33.7,94.343,58.488,94.343,24.806,0,46.527-37.841,58.515-94.472a554.455,554.455,0,0,1-60.629,3.462A497.266,497.266,0,0,1,1122.345,571.748Z",
      transform: "translate(-1049.694 -92.905)",
      fill: "#ee7013"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "6.03",
      cy: "6.03",
      r: "6.03",
      transform: "translate(141.656 550.192)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "1.767",
      cy: "1.767",
      r: "1.767",
      transform: "translate(102.947 525.951)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "5.003",
      cy: "5.003",
      r: "5.003",
      transform: "translate(141.656 495.085)",
      fill: "#fff"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      "data-id": "4",
      className: "glass-step hidden"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1248.328,438.515a501.711,501.711,0,0,1-69.618,5.1,450.732,450.732,0,0,1-65.384-5.005c-.575,10.317-.88,20.858-.88,31.547,0,37.2,3.618,71.97,9.9,101.593a497.266,497.266,0,0,0,56.374,3.333,554.455,554.455,0,0,0,60.629-3.462c6.265-29.6,9.873-64.323,9.873-101.464C1249.221,459.381,1248.912,448.816,1248.328,438.515Z",
      transform: "translate(-1049.694 -92.905)",
      fill: "#ffa25e"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "6.839",
      cy: "6.839",
      r: "6.839",
      transform: "translate(96.236 460.385)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "2.839",
      cy: "2.839",
      r: "2.839",
      transform: "translate(135.978 438.536)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "8.298",
      cy: "8.298",
      r: "8.298",
      transform: "translate(167.978 385.239)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "7.226",
      cy: "7.226",
      r: "7.226",
      transform: "translate(80.236 356.644)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "4.681",
      cy: "4.681",
      r: "4.681",
      transform: "translate(62.288 401.834)",
      fill: "#fff"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      "data-id": "5",
      className: "glass-step hidden"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1228.815,330.581a189.53,189.53,0,0,0-8.556-20.532c-14.341,2.055-70.264.764-79.844,0a192.356,192.356,0,0,0-8.222,20.532c-9.774,28.729-16.554,66.533-18.867,108.027a450.732,450.732,0,0,0,65.384,5.005,501.711,501.711,0,0,0,69.618-5.1C1245.95,396.573,1238.924,359.109,1228.815,330.581Z",
      transform: "translate(-1049.694 -92.905)",
      fill: "#f7bdb5"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "2.163",
      cy: "2.163",
      r: "2.163",
      transform: "translate(158.171 304.12)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "3.484",
      cy: "3.484",
      r: "3.484",
      transform: "translate(94.689 269.417)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("circle", {
      cx: "4.871",
      cy: "4.871",
      r: "4.871",
      transform: "translate(131.913 240.514)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ellipse", {
      cx: "40.129",
      cy: "3.871",
      rx: "40.129",
      ry: "3.871",
      transform: "translate(91.075 213.934)",
      fill: "#f2988e",
      opacity: "1"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      "data-id": "7",
      className: "glass-step hidden"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(-1730.178 -1079)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("rect", {
      width: "16.83",
      height: "566.756",
      transform: "translate(1790.02 1083.095) rotate(-7.531)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1196.554,663.457l-.221-1.668L1121.838,98.252l20.022-2.647,74.716,565.206Zm-70.939-562.309,73.835,558.531,13.349-1.765L1138.963,99.383Z",
      transform: "translate(666.293 983.395)",
      fill: "#707070"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("line", {
      y1: "0.937",
      x2: "9.18",
      transform: "translate(1803.047 1180.712)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1136.753,199.937a1.683,1.683,0,0,1-.169-3.357l9.18-.937a1.683,1.683,0,1,1,.342,3.348l-9.18.937A1.681,1.681,0,0,1,1136.753,199.937Z",
      transform: "translate(666.293 983.395)",
      fill: "#aeaeae"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("line", {
      y1: "0.937",
      x2: "9.18",
      transform: "translate(1804.102 1186.905)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1137.806,206.131a1.683,1.683,0,0,1-.169-3.357l9.18-.937a1.683,1.683,0,1,1,.341,3.348l-9.179.938A1.682,1.682,0,0,1,1137.806,206.131Z",
      transform: "translate(666.293 983.395)",
      fill: "#aeaeae"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("line", {
      y1: "0.937",
      x2: "9.18",
      transform: "translate(1805.354 1192.877)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1139.058,212.1a1.683,1.683,0,0,1-.169-3.357l9.18-.937a1.683,1.683,0,1,1,.341,3.348l-9.179.937A1.685,1.685,0,0,1,1139.058,212.1Z",
      transform: "translate(666.293 983.395)",
      fill: "#aeaeae"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("line", {
      y1: "0.937",
      x2: "9.18",
      transform: "translate(1805.979 1198.784)",
      fill: "#fff"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1139.683,218.01a1.683,1.683,0,0,1-.169-3.358l9.18-.937a1.683,1.683,0,1,1,.341,3.349l-9.179.937A1.685,1.685,0,0,1,1139.683,218.01Z",
      transform: "translate(666.293 983.395)",
      fill: "#aeaeae"
    }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      "data-id": "1",
      className: "glass-step hidden"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(-1505.987 -1076.299)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1181.608,688.75c-25.537,0-49.393-23.454-67.173-66.041-17.549-42.032-27.214-97.873-27.214-157.237,0-71.446,14.519-139.066,38.839-180.882l.4-.7.775-.221c16.441-4.685,34.224-6.962,54.368-6.962A251.8,251.8,0,0,1,1235,282.2l.849.184.445.747c24.858,41.735,39.7,109.9,39.7,182.342,0,59.364-9.665,115.205-27.213,157.237C1231,665.3,1207.144,688.75,1181.608,688.75ZM1129.114,287.3c-23.738,41.287-37.893,107.8-37.893,178.173,0,58.847,9.555,114.141,26.905,155.7,17.118,41,39.663,63.582,63.482,63.582s46.363-22.58,63.481-63.582c17.351-41.556,26.905-96.85,26.905-155.7,0-71.319-14.454-138.339-38.692-179.548a248.46,248.46,0,0,0-51.694-5.214C1162.157,280.71,1144.977,282.865,1129.114,287.3Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1181.608,295.032c-30.445,0-53.226-6.4-53.452-6.464a2,2,0,0,1,1.1-3.846c.222.063,22.5,6.31,52.356,6.31,29.785,0,51.322-7.362,51.536-7.437a2,2,0,0,1,1.314,3.778C1233.561,287.686,1212.111,295.032,1181.608,295.032Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1180.847,723.032c-21.885,0-31.805-46.674-32.216-48.662a2,2,0,0,1,3.916-.811c2.624,12.648,12.824,45.473,28.3,45.473,15.518,0,26.8-32.868,29.834-45.533a2,2,0,0,1,3.891.932C1214.1,676.415,1202.681,723.032,1180.847,723.032Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1180.847,942.258a2,2,0,0,1-2-2V721.032a2,2,0,0,1,4,0V940.258A2,2,0,0,1,1180.847,942.258Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1164.484,689.208a68.9,68.9,0,0,0,6.936,17.392,48.048,48.048,0,0,0,3.542,5.271,53.52,53.52,0,0,1-8.157-9.934,73.672,73.672,0,0,1-6.138-11.532,2.008,2.008,0,1,1,3.817-1.2Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1180.847,958.146c-15.342,0-29.781-.978-40.658-2.752-16.3-2.659-18.386-5.969-18.386-8.555v-1.188l1.044-.569a188.628,188.628,0,0,0,22.582-14.795c11.227-8.243,20.1-14.755,35.418-14.755,17.7,0,27.288,7.136,41.794,17.938,4.714,3.51,10.056,7.487,16.362,11.707l.888.594v1.068c0,2.586-2.09,5.9-18.386,8.555C1210.627,957.168,1196.188,958.146,1180.847,958.146Zm-54.192-10.6c4.271,2.719,23.123,6.6,54.192,6.6,31.483,0,50.421-3.985,54.355-6.707-5.707-3.878-10.594-7.518-14.95-10.76-14.359-10.693-23.026-17.147-39.4-17.147-14.013,0-22,5.864-33.051,13.98A198.957,198.957,0,0,1,1126.655,947.547Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1150.108,938.292c21.087,3.1,42.745,4.722,63.951,1.712a173.022,173.022,0,0,1-32.092,3.134,286.812,286.812,0,0,1-32.344-1.423,1.729,1.729,0,1,1,.485-3.423Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1143.164,943.6c25.309,3.285,51.144,5.018,76.573,1.917a236.746,236.746,0,0,1-38.4,3.334c-12.912.137-25.757-.284-38.645-1.417a1.932,1.932,0,1,1,.473-3.834Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1108.769,388.7A715.92,715.92,0,0,0,1115.3,571.5a2,2,0,1,1-3.948.637,717.845,717.845,0,0,1-2.583-183.443Z",
      transform: "translate(456.293 983.395)",
      fill: "#b2b2b2"
    })))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      "data-id": "2",
      className: "glass-step hidden"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(-1505.987 -1076.299)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1169.68,668.321A14.36,14.36,0,0,1,1155.7,657.16l-7.352-32.365a14.354,14.354,0,0,1,10.8-17.154l32.367-7.353a14.351,14.351,0,0,1,17.153,10.8l7.353,32.367a14.334,14.334,0,0,1-10.8,17.153l-32.365,7.353A14.383,14.383,0,0,1,1169.68,668.321ZM1194.7,604.4a9.824,9.824,0,0,0-2.187.246L1160.144,612a9.881,9.881,0,0,0-7.438,11.81l7.353,32.365a9.874,9.874,0,0,0,11.809,7.438l32.366-7.353h0a9.866,9.866,0,0,0,7.436-11.808l-7.352-32.367A9.887,9.887,0,0,0,1194.7,604.4Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1161.068,619.783l6.2,37.357-10.551-36.367a2.236,2.236,0,1,1,4.355-.99Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1172.978,643.078l.579,12.633-4.934-11.643a2.264,2.264,0,1,1,4.355-.99Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1205.14,649.068l-15.8,5.348a2.242,2.242,0,1,1-.989-4.355l16.563-2a.523.523,0,0,1,.23,1.011Z",
      fill: "#e9f1fd"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1167.731,557.548a14.726,14.726,0,0,1-5.535-1.082h0L1130.93,543.8a14.8,14.8,0,0,1-8.161-19.271l12.662-31.265a14.816,14.816,0,0,1,19.271-8.161l31.266,12.662a14.814,14.814,0,0,1,8.161,19.271L1181.467,548.3A14.825,14.825,0,0,1,1167.731,557.548Zm-3.658-5.717a9.809,9.809,0,0,0,12.759-5.4l12.662-31.265a9.808,9.808,0,0,0-5.4-12.76l-31.266-12.662a9.81,9.81,0,0,0-12.759,5.4L1127.4,526.409a9.795,9.795,0,0,0,5.4,12.759Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1149.375,496.645l-16.738,34.669,12.1-36.546a2.5,2.5,0,1,1,4.634,1.877Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1145.782,522.99l-7.066,10.786,2.432-12.663a2.544,2.544,0,1,1,4.634,1.877Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1168.9,546.625l-16.353-4.552a2.514,2.514,0,1,1,1.877-4.635l14.912,8.11a.587.587,0,0,1-.436,1.077Z",
      fill: "#e9f1fd"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1145.469,618.705a13.538,13.538,0,0,1-2.023-.153,13.242,13.242,0,0,1-8.74-5.273l-18.1-24.561a13.337,13.337,0,0,1,2.822-18.648l24.561-18.1a13.336,13.336,0,0,1,18.648,2.822l18.1,24.561A13.352,13.352,0,0,1,1177.915,598h0l-24.561,18.1A13.24,13.24,0,0,1,1145.469,618.705Zm6.41-64.919a8.845,8.845,0,0,0-5.269,1.74l-24.561,18.1a8.914,8.914,0,0,0-1.887,12.462l18.1,24.561a8.913,8.913,0,0,0,12.462,1.886l24.561-18.1a8.924,8.924,0,0,0,1.887-12.463l-18.1-24.561a8.857,8.857,0,0,0-5.841-3.524A8.977,8.977,0,0,0,1151.879,553.786Zm24.724,42.431h0Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1125.727,579.629l18.838,29.284-22.4-26.659a2.215,2.215,0,1,1,3.561-2.625Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1144.332,594.87l5.009,10.523-8.57-7.9a2.248,2.248,0,1,1,3.561-2.625Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1173.525,588.205l-11.273,10.419a2.223,2.223,0,1,1-2.625-3.561l13.288-7.685a.519.519,0,0,1,.61.827Z",
      fill: "#e9f1fd"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1235.891,481.042a13.418,13.418,0,0,1-3.391-.438l-29.523-7.705a13.353,13.353,0,0,1-9.537-16.271l7.706-29.524a13.351,13.351,0,0,1,16.272-9.536l29.524,7.705a13.338,13.338,0,0,1,9.536,16.272l-7.705,29.523a13.355,13.355,0,0,1-12.882,9.974Zm-21.839-59.484a8.928,8.928,0,0,0-8.625,6.663l-7.706,29.523a8.924,8.924,0,0,0,6.373,10.875l29.523,7.705h0a8.92,8.92,0,0,0,10.874-6.373l7.706-29.524a8.913,8.913,0,0,0-6.373-10.874l-29.523-7.705A8.906,8.906,0,0,0,1214.052,421.558Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1213.952,428.48l-10.916,33.065,6.635-34.183a2.215,2.215,0,1,1,4.281,1.118Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1213.807,452.531l-5.03,10.512.749-11.63a2.249,2.249,0,1,1,4.281,1.118Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1237.351,471.032l-15.191-2.21a2.223,2.223,0,1,1,1.117-4.28l14.333,5.5a.518.518,0,0,1-.259.994Z",
      fill: "#e9f1fd"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1151.862,487.282a13.272,13.272,0,0,1-4.99-.976l-28.281-11.454a13.335,13.335,0,0,1-7.354-17.367l11.454-28.281a13.333,13.333,0,0,1,17.366-7.355l28.281,11.453a13.336,13.336,0,0,1,7.355,17.368l-11.453,28.281A13.361,13.361,0,0,1,1151.862,487.282Zm-16.812-61.989a8.93,8.93,0,0,0-8.26,5.571l-11.454,28.282a8.913,8.913,0,0,0,4.915,11.606l28.281,11.454a8.925,8.925,0,0,0,11.608-4.916l11.453-28.281h0a8.913,8.913,0,0,0-4.915-11.606L1138.4,425.949A8.9,8.9,0,0,0,1135.05,425.293Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1121.61,462.331l31.378,15.1-33.039-10.994a2.215,2.215,0,1,1,1.661-4.1Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1145.44,465.581l9.775,6.346-11.435-2.245a2.249,2.249,0,1,1,1.66-4.1Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1166.827,444.624l-4.153,14.778a2.223,2.223,0,1,1-4.1-1.661l7.3-13.5a.518.518,0,0,1,.952.386Z",
      fill: "#e9f1fd"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1218.239,614.457a14.96,14.96,0,0,1-9.716-3.571L1182.206,588.6a15.071,15.071,0,0,1-1.759-21.244l22.287-26.316a15.074,15.074,0,0,1,21.243-1.762l26.316,22.289a15.074,15.074,0,0,1,1.76,21.245l-22.288,26.315a14.975,14.975,0,0,1-10.256,5.279Q1218.871,614.458,1218.239,614.457Zm-3.987-73.752q-.422,0-.848.035a10.009,10.009,0,0,0-6.854,3.529l-22.288,26.316a10.071,10.071,0,0,0,1.175,14.2l26.316,22.288a10.071,10.071,0,0,0,14.2-1.175l22.29-26.317h0a10.085,10.085,0,0,0-1.177-14.2l-26.316-22.287A10,10,0,0,0,1214.252,540.705Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1189.87,576.221l28.356,27.291-31.587-23.475a2.5,2.5,0,1,1,3.231-3.816Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1214.307,588.13l8.252,10.265-11.484-6.45a2.542,2.542,0,1,1,3.232-3.815Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1244.671,573.186l-9.679,14.4a2.512,2.512,0,1,1-3.815-3.231l12.608-11.918a.586.586,0,0,1,.886.751Z",
      fill: "#e9f1fd"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1240.051,547.024a15.087,15.087,0,0,1-5.018-.864L1202.505,534.7a15.091,15.091,0,0,1-9.21-19.225l11.456-32.527a15.092,15.092,0,0,1,19.225-9.21L1256.5,485.2a15.072,15.072,0,0,1,9.21,19.224l-11.456,32.527a15.1,15.1,0,0,1-14.206,10.075Zm-21.073-69.139a10.09,10.09,0,0,0-9.51,6.728l-11.456,32.527a10.084,10.084,0,0,0,6.154,12.848l32.528,11.455a10.071,10.071,0,0,0,12.846-6.154L1261,502.761h0a10.071,10.071,0,0,0-6.154-12.847l-32.526-11.456A10.051,10.051,0,0,0,1218.978,477.885Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1205.26,520.41l36.215,15.405L1203.6,525.126a2.5,2.5,0,1,1,1.661-4.716Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1232.335,522.836l11.367,6.654-13.028-1.938a2.542,2.542,0,1,1,1.661-4.716Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1255.388,498.059l-3.918,16.9a2.513,2.513,0,1,1-4.716-1.662l7.538-15.626a.586.586,0,0,1,1.1.386Z",
      fill: "#e9f1fd"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(456.293 983.395)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1189.881,442.939a15.01,15.01,0,0,1-4.993-.857l-32.527-11.456a15.092,15.092,0,0,1-9.21-19.225l11.456-32.527a15.074,15.074,0,0,1,19.223-9.21l32.529,11.456a15.092,15.092,0,0,1,9.21,19.225h0l-11.456,32.527A15.1,15.1,0,0,1,1189.881,442.939ZM1168.817,373.8a10.093,10.093,0,0,0-9.494,6.732l-11.456,32.528a10.084,10.084,0,0,0,6.155,12.847l32.526,11.456a10.082,10.082,0,0,0,12.848-6.155l11.456-32.527a10.084,10.084,0,0,0-6.154-12.848L1172.17,374.38A10.1,10.1,0,0,0,1168.817,373.8Zm44.393,25.711h0Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1155.115,416.332l36.215,15.4-37.876-10.689a2.5,2.5,0,1,1,1.661-4.716Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1182.19,418.758l11.367,6.654-13.028-1.938a2.542,2.542,0,1,1,1.661-4.716Z",
      fill: "#e9f1fd"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1205.243,393.981l-3.918,16.9a2.513,2.513,0,1,1-4.716-1.661l7.539-15.626a.585.585,0,0,1,1.1.386Z",
      fill: "#e9f1fd"
    })))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      "data-id": "6",
      className: "glass-step hidden"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "translate(-1567.616 -990.246) rotate(-3)",
      clipPath: "url(#clip-path)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("g", {
      transform: "matrix(-0.719, 0.695, -0.695, -0.719, 2627.453, 603.695)"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1198.448,319.372l1.078-5.977c-20.735-11.919-33.9-39.368-31.289-70.027,3.1-36.48,27.442-64.706,55.9-66.564l.373-2.069a44.62,44.62,0,0,0-6.833-1.124c-31.328-2.665-59.519,28.051-62.969,68.606C1151.513,279.8,1170.688,312.639,1198.448,319.372Z",
      fill: "#fca01f"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1172.276,244.367c-2.608,30.66,10.554,58.108,31.289,70.027L1228.18,177.8C1199.719,179.662,1175.38,207.887,1172.276,244.367Z",
      transform: "translate(-4.04 -1)",
      fill: "#ffe800"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1201.571,328.515l11.3-43.28-24.477,22.529S1187.1,312.634,1201.571,328.515Z",
      transform: "translate(-7.811 -25.681)",
      fill: "#fca01f"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1186.3,295.229l22.553-17.126-26.706-6.374S1181.964,280.8,1186.3,295.229Z",
      transform: "translate(-6.383 -22.578)",
      fill: "#fca01f"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1183.114,252.7l23.939,7.9-14.134-33.725S1185.762,235.343,1183.114,252.7Z",
      transform: "translate(-6.605 -12.272)",
      fill: "#fca01f"
    }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("path", {
      d: "M1202.669,213.839l12.089,33.55,4.133-48.578A66.329,66.329,0,0,0,1202.669,213.839Z",
      transform: "translate(-11.098 -5.826)",
      fill: "#fca01f"
    })))));
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    ref: glassRef,
    "data-id": step,
    className: "js-glass-wrap ".concat(className, " [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain")
  }, renderStandardGlass());
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlassComponent);

/***/ }),

/***/ "./assets/js/public/booking/components/SummarySection.jsx":
/*!****************************************************************!*\
  !*** ./assets/js/public/booking/components/SummarySection.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/BookingContext.jsx */ "./assets/js/public/booking/contexts/BookingContext.jsx");
/* harmony import */ var _utils_storage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/storage.js */ "./assets/js/public/booking/utils/storage.js");
/* harmony import */ var _utils_stepConditions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/stepConditions.js */ "./assets/js/utils/stepConditions.js");
/* harmony import */ var _CartTotal_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CartTotal.jsx */ "./assets/js/public/booking/components/CartTotal.jsx");
/* harmony import */ var _composite_SummaryDataRenderer_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./composite/SummaryDataRenderer.jsx */ "./assets/js/public/booking/components/composite/SummaryDataRenderer.jsx");
/* harmony import */ var _EditStepPopup_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EditStepPopup.jsx */ "./assets/js/public/booking/components/EditStepPopup.jsx");
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









var SummarySection = function SummarySection(_ref) {
  var _window$wpcbooking_pu;
  var form_data = _ref.form_data,
    errorManager = _ref.errorManager,
    _ref$sections = _ref.sections,
    sections = _ref$sections === void 0 ? {} : _ref$sections,
    on_validation_change = _ref.on_validation_change,
    on_edit_step = _ref.on_edit_step,
    on_form_data_update = _ref.on_form_data_update;
  var context = (0,_contexts_BookingContext_jsx__WEBPACK_IMPORTED_MODULE_3__.useBookingContext)();
  var _ref2 = context || {},
    bookingFormManager = _ref2.bookingFormManager,
    booking_id = _ref2.booking_id,
    maxReachedStep = _ref2.maxReachedStep,
    getSummaryData = _ref2.getSummaryData,
    summaryData = _ref2.summaryData;
  var cardManager = bookingFormManager ? bookingFormManager.getCard() : null;

  // State for edit popup
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    edit_step = _useState2[0],
    set_edit_step = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(""),
    _useState4 = _slicedToArray(_useState3, 2),
    edit_step_label = _useState4[0],
    set_edit_step_label = _useState4[1];

  // State for summary data - initialize once and manage internally
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      return summaryData;
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    summary_data = _useState6[0],
    set_summary_data = _useState6[1];
  var _useState7 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    is_refreshing = _useState8[0],
    set_is_refreshing = _useState8[1];
  var _useState9 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState0 = _slicedToArray(_useState9, 2),
    refresh_key = _useState0[0],
    set_refresh_key = _useState0[1];

  // Function to reload summary data from storage after mutation
  var reload_summary_data = function reload_summary_data() {
    if (!booking_id) {
      console.error("❌ [SummarySection] Cannot reload: booking_id is missing!");
      return;
    }
    set_is_refreshing(true);

    // Delay to ensure mutation is complete and storage is updated
    setTimeout(function () {
      var summaryData = getSummaryData();
      if (summaryData) {
        // Update state and force re-render with new key
        set_summary_data(summaryData);
        set_refresh_key(function (prev) {
          return prev + 1;
        });
      } else {
        console.warn("⚠️ [SummarySection] No summary data found in storage");
      }
      set_is_refreshing(false);
    }, 200);
  };

  // ⚠️ Data validation - check if summary_data exists
  if (!summary_data) {
    console.error("❌ [SummarySection] summary_data is missing or null");
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "p-4 border border-yellow-300 rounded bg-yellow-50"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", {
      className: "text-sm text-yellow-700"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Summary data not available", "wpcbooking")));
  }

  // ⚠️ Destructure summary data with safe defaults
  var _ref3 = summary_data || {},
    _ref3$summary_options = _ref3.summary_options,
    summary_options = _ref3$summary_options === void 0 ? {} : _ref3$summary_options,
    _ref3$form_options = _ref3.form_options,
    form_options = _ref3$form_options === void 0 ? {} : _ref3$form_options,
    _ref3$blocks = _ref3.blocks,
    blocks = _ref3$blocks === void 0 ? [] : _ref3$blocks,
    _ref3$quote_data = _ref3.quote_data,
    quote_data = _ref3$quote_data === void 0 ? {} : _ref3$quote_data,
    _ref3$currency = _ref3.currency,
    currency = _ref3$currency === void 0 ? "DKK" : _ref3$currency,
    _ref3$total_quote = _ref3.total_quote,
    total_quote = _ref3$total_quote === void 0 ? 0 : _ref3$total_quote,
    _ref3$total_base = _ref3.total_base,
    total_base = _ref3$total_base === void 0 ? 0 : _ref3$total_base,
    _ref3$shipping_total = _ref3.shipping_total,
    shipping_total = _ref3$shipping_total === void 0 ? 0 : _ref3$shipping_total;

  // Track terms state locally for proper validation
  var _useState1 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      var initial_terms = (form_data === null || form_data === void 0 ? void 0 : form_data.terms_conditions) || {};
      return initial_terms;
    }),
    _useState10 = _slicedToArray(_useState1, 2),
    terms_state = _useState10[0],
    set_terms_state = _useState10[1];

  // Track if terms were touched (user interaction)
  var terms_touched_ref = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);

  // Calculate initial validity
  var calculate_terms_validity = function calculate_terms_validity(terms_state, summary_options) {
    if (!summary_options.terms || !Array.isArray(summary_options.terms)) return true;
    var required_terms = summary_options.terms.filter(function (term) {
      return term.required === true;
    });
    if (required_terms.length === 0) return true; // No required terms, always valid

    var validation_result = required_terms.every(function (term) {
      var is_accepted = terms_state[term.page_id] === "yes";
      return is_accepted;
    });
    return validation_result;
  };

  // Initialize isValid state
  var _useState11 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
      var initial_validity = calculate_terms_validity(terms_state, summary_options);
      return initial_validity;
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    isValid = _useState12[0],
    setIsValid = _useState12[1];

  // Initialize error state
  var _useState13 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState14 = _slicedToArray(_useState13, 2),
    error = _useState14[0],
    setError = _useState14[1];

  // Field ID for terms validation (used for error display)
  var terms_field_id = "terms_conditions";

  // ⚠️ Listen to cart updates from BookingFormManager
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (!bookingFormManager) return;
    var handleCartUpdate = function handleCartUpdate(event) {
      if (event.type === "cart_updated_from_server") {
        console.log("🛒 [SummarySection] Cart updated from server, refreshing summary");
        // Force re-render of entire summary section
        set_refresh_key(function (prev) {
          return prev + 1;
        });
        // Also reload summary data to get latest from storage
        reload_summary_data();
      }
    };
    bookingFormManager.add_listener(handleCartUpdate);
    return function () {
      bookingFormManager.remove_listener(handleCartUpdate);
    };
  }, [bookingFormManager]);

  // ⚠️ Validate terms on mount and when terms change (similar to useInputField pattern)
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var is_valid = calculate_terms_validity(terms_state, summary_options);
    // Only show errors if terms were touched
    if (terms_touched_ref.current) {
      if (!is_valid) {
        var error_message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You must agree to all required terms and conditions.", "wpcbooking");
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
  }, [terms_state, summary_options.terms, on_validation_change, errorManager, bookingFormManager]);

  // ⚠️ Handle terms checkbox change (similar to useInputField handleChange pattern)
  var handle_terms_change = function handle_terms_change(term_name, checked) {
    // Mark as touched on first user interaction
    if (!terms_touched_ref.current) {
      terms_touched_ref.current = true;
    }
    var updated_terms = _objectSpread(_objectSpread({}, terms_state), {}, _defineProperty({}, term_name, checked ? "yes" : ""));
    set_terms_state(updated_terms);

    // Update parent form_data using callback if available, otherwise direct mutation
    if (on_form_data_update && form_data) {
      var updated_form_data = _objectSpread(_objectSpread({}, form_data), {}, {
        terms_conditions: updated_terms
      });
      on_form_data_update(updated_form_data);
    } else if (form_data) {
      // Fallback to direct mutation if callback not available
      form_data.terms_conditions = updated_terms;
    }
  };

  // ⚠️ Handle edit button click - open popup instead of navigating
  var handle_edit_click = function handle_edit_click(step_num, step_label) {
    if (errorManager) {
      errorManager.clearAllGlobalErrors();
    }
    set_edit_step(step_num);
    set_edit_step_label(step_label);
  };

  // Handle popup close
  var handle_popup_close = function handle_popup_close() {
    set_edit_step(null);
    set_edit_step_label("");
  };

  // Handle save success - refresh summary data after mutation is complete
  var handle_save_success = function handle_save_success(result) {
    // Mutation is complete, now reload summary data from storage
    // This will re-render the entire summary section including step items and CartTotal
    reload_summary_data();
  };

  // ⚠️ Render step items from blocks array
  var render_step_items = function render_step_items() {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return null;
    }
    // Filter blocks based on step conditions and map with original indices
    var filtered_blocks = blocks.map(function (block, original_index) {
      return {
        block: block,
        original_index: original_index
      };
    }).filter(function (_ref4) {
      var _block$data;
      var block = _ref4.block,
        original_index = _ref4.original_index;
      var step_num = original_index + 1;
      var conditions = block === null || block === void 0 || (_block$data = block.data) === null || _block$data === void 0 ? void 0 : _block$data.conditions;
      return (0,_utils_stepConditions_js__WEBPACK_IMPORTED_MODULE_5__.check_step_condition_with_manager)(conditions, step_num, maxReachedStep || 999, cardManager);
    });
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
      className: "space-y-5 mt-5",
      key: "step-items-".concat(refresh_key)
    }, filtered_blocks.map(function (_ref5) {
      var block = _ref5.block,
        original_index = _ref5.original_index;
      // ⚠️ Validate block structure
      if (!block) {
        return null;
      }
      // Extract data from block (from steps object via BookingHeader)
      var data = block.data || {};
      var price_step = block.price_step || 0;
      var value_step = block.value_step || 0;
      var item_output = block.item_output || "";
      var render_data = block.render_data || [];

      // Transform thumbnail_src to proper URL (same as BookingHeader)
      var thumbnail_url = null;
      if (data.thumbnail_src) {
        var wpContentIndex = data.thumbnail_src.indexOf("wp-content");
        if (wpContentIndex !== -1) {
          var relativePath = data.thumbnail_src.substring(wpContentIndex);
          // Use full URL with origin (like in target HTML)
          thumbnail_url = "".concat(window.location.origin, "/").concat(relativePath);
        } else {
          thumbnail_url = data.thumbnail_src;
        }
      }

      // Step number is from original index (steps start at 1)
      var step_num = original_index + 1;

      // Generate unique key
      var item_key = "summary-step-".concat(step_num, "-").concat(data.title || original_index);

      // Combine label_summary and title for display (like in target HTML)
      var combined_label = "".concat(data.label_summary || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("List of choices from step", "wpcbooking"), " ").concat(data.title || "");
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        key: item_key
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
        className: "aff-summary-item min-h-[70px] flex flex-col bg-th-grey-lighter rounded-[35px]"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex flex-col medium:flex-row justify-between items-center w-full rounded-[35px] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)]"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "min-h-[66px] w-full medium:w-4/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0"
      }, thumbnail_url ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        style: {
          "--mask-img": "url('".concat(thumbnail_url, "')")
        },
        className: "w-25p h-25p bg-white cs-mask"
      }) : (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        style: {
          "--mask-img": "url('data:image/svg+xml,<svg>\uD83D\uDCCB</svg>')"
        },
        className: "w-25p h-25p bg-white cs-mask"
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "af-p20 text-th-grey"
      }, combined_label)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "flex justify-end items-center gap-x-4 pr-30p max-medium:p-30p"
      }, summary_options.show_calculations == 1 && value_step > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "aff-step-price af-p20-bold text-black uppercase"
      }, value_step, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
        className: "currnency_symbol"
      }, " ", currency)), on_edit_step && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
        type: "button",
        className: "aff-edit-button px-4 py-2 bg-th-orange-light text-white rounded-full hover:bg-th-orange transition-colors cursor-pointer af-p18",
        "data-step": step_num,
        "data-edit": "yes",
        "data-title": combined_label,
        onClick: function onClick() {
          return handle_edit_click(step_num, combined_label);
        },
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit step", "wpcbooking") + " ".concat(step_num)
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Edit", "wpcbooking")))), render_data && render_data.length > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_composite_SummaryDataRenderer_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], {
        render_data: render_data
      }), (!render_data || render_data.length === 0) && item_output && item_output.trim().length > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "user-data w-full p-4 shadow-lg mt-4 rounded-[35px]",
        dangerouslySetInnerHTML: {
          __html: item_output
        }
      })));
    })));
  };

  // ⚠️ Render terms and conditions with validation
  var render_terms = function render_terms() {
    if (!summary_options.terms || !Array.isArray(summary_options.terms)) {
      return null;
    }

    // Filter out invalid terms
    var valid_terms = summary_options.terms.filter(function (row) {
      return row && row.info_label && row.page_id;
    });
    if (valid_terms.length === 0) {
      return null;
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "cs-privacy mt-12 py-6 border-y border-th-grey-ultralight"
    }, valid_terms.map(function (row, index) {
      var term_page_title = row.page_title || "";
      var term_page_url = row.page_url || "#";
      var link = "<a href=\"".concat(term_page_url, "\" target=\"_BLANK\" rel=\"noopener noreferrer\">").concat(term_page_title, "</a>");
      var checkbox_name = row.page_id;
      var is_checked = terms_state[checkbox_name] === "yes";
      var is_required = row.required === 1;
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        key: "term-".concat(checkbox_name, "-").concat(index),
        "data-name": checkbox_name,
        className: "flex items-start gap-x-3 mb-3"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        type: "checkbox",
        "data-label-required": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You must agree to the terms and conditions.", "wpcbooking"),
        "data-label": term_page_title,
        value: "yes",
        id: checkbox_name,
        name: "terms_conditions[".concat(checkbox_name, "]"),
        required: is_required,
        checked: is_checked,
        onChange: function onChange(e) {
          return handle_terms_change(checkbox_name, e.target.checked);
        },
        className: "mt-1",
        "aria-label": term_page_title,
        "aria-invalid": !!error,
        "aria-describedby": error ? "".concat(terms_field_id, "-error") : undefined
      }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
        htmlFor: checkbox_name,
        className: "flex-1 cursor-pointer"
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
        className: "af-p18",
        dangerouslySetInnerHTML: {
          __html: row.info_label.includes("%s") ? row.info_label.replace("%s", link) : row.info_label
        }
      }), is_required && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
        className: "text-red-500 ml-1",
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Required", "wpcbooking")
      }, "*")));
    }));
  };
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, edit_step !== null && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_EditStepPopup_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
    step_num: edit_step,
    step_label: edit_step_label,
    sections: sections,
    form_data: form_data,
    on_close: handle_popup_close,
    on_save_success: handle_save_success
  }), is_refreshing && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "fixed inset-0 z-40 flex items-center justify-center",
    style: {
      backgroundColor: "rgba(255, 255, 255, 0.9)"
    }
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "text-2xl mb-2"
  }, "\uD83D\uDD04"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p20 text-th-grey"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Updating summary...", "wpcbooking")))), summary_options.text && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-11/12 af-p30-light text-black"
  }, summary_options.text), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "mt-75p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "min-h-[70px] flex justify-between items-center bg-th-grey rounded-[35px]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "flex items-center gap-x-5 pl-40p"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    style: {
      "--mask-img": "url('".concat((_window$wpcbooking_pu = window.wpcbooking_public) === null || _window$wpcbooking_pu === void 0 ? void 0 : _window$wpcbooking_pu.plugin_url, "/assets/img/summary.svg')")
    },
    className: "w-11 h-10 bg-white cs-mask"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "af-p20-bold text-white uppercase"
  }, (summary_options.label_summary || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("summary of your event", "wpcbooking")).toLowerCase()))), render_step_items(), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_CartTotal_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    key: "cart-total-".concat(refresh_key),
    summary_options: summary_options,
    blocks: blocks,
    currency: currency,
    total_quote: total_quote,
    total_base: total_base,
    shipping_total: shipping_total
  }), render_terms(), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    "data-name": "mutions-errors"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummarySection);

/***/ }),

/***/ "./assets/js/public/booking/components/ThankYouPage.jsx":
/*!**************************************************************!*\
  !*** ./assets/js/public/booking/components/ThankYouPage.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");


var ThankYouPage = function ThankYouPage(_ref) {
  var _ref$heading = _ref.heading,
    heading = _ref$heading === void 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tak ... Lad os gå ud og nyde festen', 'wpcbooking') : _ref$heading,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? null : _ref$text,
    _ref$background_image = _ref.background_image,
    background_image = _ref$background_image === void 0 ? null : _ref$background_image,
    _ref$button_link = _ref.button_link,
    button_link = _ref$button_link === void 0 ? null : _ref$button_link,
    _ref$button_label = _ref.button_label,
    button_label = _ref$button_label === void 0 ? null : _ref$button_label;
  // Default text if not provided
  var defaultText = (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vi har modtaget dine ønsker til dit kommende event, og vores team går straks i gang med at gennemgå dem. Inden længe kontakter vi dig personligt, så vi sammen kan skræddersy det perfekte arrangement efter dine behov og idéer.', 'wpcbooking')), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vi glæder os til at skabe en uforglemmelig oplevelse for dig!', 'wpcbooking')));
  var displayText = text || defaultText;
  var buttonTitle = button_label || (button_link === null || button_link === void 0 ? void 0 : button_link.title) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tilbage til forsiden', 'wpcbooking');
  var buttonUrl = (button_link === null || button_link === void 0 ? void 0 : button_link.url) || '/';
  var buttonTarget = (button_link === null || button_link === void 0 ? void 0 : button_link.target) || '_self';

  // Convert image_id to URL if needed
  var getImageUrl = function getImageUrl() {
    if (!background_image) return null;

    // If it's already a URL, return it
    if (typeof background_image === 'string' && (background_image.startsWith('http') || background_image.startsWith('/'))) {
      return background_image;
    }

    // If it's a number (image_id), try to get URL from WordPress REST API
    if (typeof background_image === 'number' || typeof background_image === 'string' && /^\d+$/.test(background_image)) {
      var _window$wpcbooking_pu;
      // Try to get from window.wpcbooking_public if available
      if ((_window$wpcbooking_pu = window.wpcbooking_public) !== null && _window$wpcbooking_pu !== void 0 && _window$wpcbooking_pu.rest_url) {
        return "".concat(window.wpcbooking_public.rest_url, "wp/v2/media/").concat(background_image);
      }
      // Fallback: assume it's already a URL or return null
      return null;
    }
    return background_image;
  };
  var imageUrl = getImageUrl();
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("section", {
    className: "py-200p overflow-hidden"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "booking-thankyou cs-container cs-grid relative"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-span-full row-span-full max-small:-mx-cont-px small:absolute right-0 h-full w-[110vw] bg-gradient-to-r from-th-orange to-th-pink rounded-r-[80px]"
  }), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-[7/span_5] mx-th-gap row-span-full self-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "aspect-w-[580] aspect-h-[740] cs-containbox"
  }, imageUrl && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
    src: imageUrl,
    alt: ""
  }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-[2/span_8] row-span-full py-170p text-white relative z-20"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("h1", {
    id: "thankyou",
    className: "af-h1 font-black relative before:absolute before:top-0 before:-left-120p before:w-85p before:h-85p before:rounded-full before:bg-th-yellow"
  }, heading), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "w-3/5 mt-80p font-poppins text-2xl leading-[3rem] font-light"
  }, typeof displayText === 'string' ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    dangerouslySetInnerHTML: {
      __html: displayText
    }
  }) : displayText)), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "col-[2/span_8] row-span-full relative z-20"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "absolute left-0 bottom-0 translate-y-[42%]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("a", {
    href: buttonUrl,
    target: buttonTarget,
    className: "cs-form-button-prev w-fit"
  }, buttonTitle))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThankYouPage);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/DatePickerData.jsx":
/*!**************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/DatePickerData.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var DatePickerData = function DatePickerData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value,
    formatted_value = data.formatted_value;
  if (!value && !formatted_value) {
    console.warn('⚠️ [DatePickerData] No value or formatted_value');
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap"
  }, label, ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-base text-th-grey font-medium align-middle"
  }, formatted_value || value));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DatePickerData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/EmailInputData.jsx":
/*!**************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/EmailInputData.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var EmailInputData = function EmailInputData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value;
  if (!value) {
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap"
  }, label, ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-base text-th-grey font-medium align-middle"
  }, value));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmailInputData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/GoogleMapData.jsx":
/*!*************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/GoogleMapData.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var GoogleMapData = function GoogleMapData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value,
    parsed_address = data.parsed_address;
  if (!value && !parsed_address) {
    console.warn('⚠️ [GoogleMapData] No value or parsed_address');
    return null;
  }
  var address = parsed_address || (typeof value === 'string' ? JSON.parse(value) : value);
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(preact__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, address.address && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-start"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap mt-0 pt-0"
  }, "Street:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, address.address)), address.city && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-start"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap mt-0 pt-0"
  }, "City:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, address.city)), address.country && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-start"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap mt-0 pt-0"
  }, "Country:"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, address.country)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleMapData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/IconsListData.jsx":
/*!*************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/IconsListData.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var IconsListData = function IconsListData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value,
    _data$items = data.items,
    items = _data$items === void 0 ? [] : _data$items;
  if (!items || items.length === 0) {
    console.warn('⚠️ [IconsListData] No items to render');
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-center"
  }, label && label.trim().length > 0 && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap"
  }, label, ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    className: "flex flex-col gap-10p"
  }, items.map(function (item, index) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: index,
      className: "flex items-center gap-x-5 p-4"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "w-50p h-50p flex items-center justify-center rounded-full bg-white border border-th-grey"
    }, item.icon && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      style: {
        "--mask-img": "url('".concat(item.icon, "')")
      },
      className: "w-25p h-25p cs-mask bg-black"
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-th-grey font-medium text-base"
    }, item.label));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconsListData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/NumberInputData.jsx":
/*!***************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/NumberInputData.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var NumberInputData = function NumberInputData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value,
    suffix = data.suffix;
  if (!value && value !== 0) {
    console.warn('⚠️ [NumberInputData] No value');
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap"
  }, label, ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-base text-th-grey font-medium align-middle"
  }, value, suffix ? " ".concat(suffix) : ''));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberInputData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/PhoneInputData.jsx":
/*!**************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/PhoneInputData.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var PhoneInputData = function PhoneInputData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value;
  if (!value) {
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap"
  }, label, ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-base text-th-grey font-medium align-middle"
  }, value));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PhoneInputData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/ProductListData.jsx":
/*!***************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/ProductListData.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var ProductListData = function ProductListData(_ref) {
  var data = _ref.data;
  var label = data.label,
    _data$products = data.products,
    products = _data$products === void 0 ? [] : _data$products;
  if (!products || products.length === 0) {
    console.warn('⚠️ [ProductListData] No products to render');
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "mt-4 ml-[25px] mb-[25px]"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("ul", {
    className: "flex flex-row flex-wrap gap-2"
  }, products.map(function (product, index) {
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("li", {
      key: index,
      className: "flex items-center gap-x-2 p-2"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: ""
    }, product.image && (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("img", {
      src: product.image,
      className: "w-6 h-6 flex items-center justify-center rounded-full bg-white border border-th-grey",
      alt: product.name || ''
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-th-grey font-medium text-base"
    }, product.name));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductListData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/SummaryDataRenderer.jsx":
/*!*******************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/SummaryDataRenderer.jsx ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _IconsListData_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IconsListData.jsx */ "./assets/js/public/booking/components/composite/IconsListData.jsx");
/* harmony import */ var _TextInputData_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TextInputData.jsx */ "./assets/js/public/booking/components/composite/TextInputData.jsx");
/* harmony import */ var _DatePickerData_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DatePickerData.jsx */ "./assets/js/public/booking/components/composite/DatePickerData.jsx");
/* harmony import */ var _GoogleMapData_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GoogleMapData.jsx */ "./assets/js/public/booking/components/composite/GoogleMapData.jsx");
/* harmony import */ var _NumberInputData_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NumberInputData.jsx */ "./assets/js/public/booking/components/composite/NumberInputData.jsx");
/* harmony import */ var _PhoneInputData_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PhoneInputData.jsx */ "./assets/js/public/booking/components/composite/PhoneInputData.jsx");
/* harmony import */ var _EmailInputData_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EmailInputData.jsx */ "./assets/js/public/booking/components/composite/EmailInputData.jsx");
/* harmony import */ var _TimePickerData_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TimePickerData.jsx */ "./assets/js/public/booking/components/composite/TimePickerData.jsx");
/* harmony import */ var _ProductListData_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ProductListData.jsx */ "./assets/js/public/booking/components/composite/ProductListData.jsx");










var BLOCK_TYPE_MAP = {
  "booking/icons-list": _IconsListData_jsx__WEBPACK_IMPORTED_MODULE_1__["default"],
  "booking/text-input": _TextInputData_jsx__WEBPACK_IMPORTED_MODULE_2__["default"],
  "booking/date-picker": _DatePickerData_jsx__WEBPACK_IMPORTED_MODULE_3__["default"],
  "booking/google-map": _GoogleMapData_jsx__WEBPACK_IMPORTED_MODULE_4__["default"],
  "booking/number-input": _NumberInputData_jsx__WEBPACK_IMPORTED_MODULE_5__["default"],
  "booking/phone-input": _PhoneInputData_jsx__WEBPACK_IMPORTED_MODULE_6__["default"],
  "booking/email-input": _EmailInputData_jsx__WEBPACK_IMPORTED_MODULE_7__["default"],
  "booking/time-picker": _TimePickerData_jsx__WEBPACK_IMPORTED_MODULE_8__["default"],
  "booking/product-list": _ProductListData_jsx__WEBPACK_IMPORTED_MODULE_9__["default"],
  "booking/product-grid": _ProductListData_jsx__WEBPACK_IMPORTED_MODULE_9__["default"]
};
var SummaryDataRenderer = function SummaryDataRenderer(_ref) {
  var _ref$render_data = _ref.render_data,
    render_data = _ref$render_data === void 0 ? [] : _ref$render_data;
  if (!Array.isArray(render_data) || render_data.length === 0) {
    console.warn('⚠️ [SummaryDataRenderer] No render_data to display');
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "user-data w-full p-4 shadow-lg mt-4 rounded-[35px]"
  }, render_data.map(function (item, index) {
    var Component = BLOCK_TYPE_MAP[item.block_type];
    if (!Component) {
      console.warn("\u26A0\uFE0F [SummaryDataRenderer] No renderer for block type: ".concat(item.block_type));
      return null;
    }
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(Component, {
      key: index,
      data: item
    });
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryDataRenderer);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/TextInputData.jsx":
/*!*************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/TextInputData.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var TextInputData = function TextInputData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value;
  if (!value) {
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap"
  }, label, ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-base text-th-grey font-medium align-middle"
  }, value));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInputData);

/***/ }),

/***/ "./assets/js/public/booking/components/composite/TimePickerData.jsx":
/*!**************************************************************************!*\
  !*** ./assets/js/public/booking/components/composite/TimePickerData.jsx ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");

var TimePickerData = function TimePickerData(_ref) {
  var data = _ref.data;
  var label = data.label,
    value = data.value;
  if (!value) {
    return null;
  }
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
    className: "ml-[25px] flex items-center"
  }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("label", {
    className: "text-base font-semibold text-th-grey-dark mr-2 mb-0 whitespace-nowrap"
  }, label, ":"), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
    className: "text-base text-th-grey font-medium align-middle"
  }, value));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimePickerData);

/***/ }),

/***/ "./assets/js/public/booking/contexts/BookingContext.jsx":
/*!**************************************************************!*\
  !*** ./assets/js/public/booking/contexts/BookingContext.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingProvider: () => (/* binding */ BookingProvider),
/* harmony export */   useBookingContext: () => (/* binding */ useBookingContext),
/* harmony export */   useBookingContextOptional: () => (/* binding */ useBookingContextOptional)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");


var BookingContext = (0,preact__WEBPACK_IMPORTED_MODULE_0__.createContext)();
var useBookingContext = function useBookingContext() {
  var context = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext)(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within BookingProvider');
  }
  return context;
};
var useBookingContextOptional = function useBookingContextOptional() {
  return (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useContext)(BookingContext);
};
var BookingProvider = function BookingProvider(_ref) {
  var children = _ref.children,
    value = _ref.value;
  return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(BookingContext.Provider, {
    value: value
  }, children);
};

/***/ }),

/***/ "./assets/js/public/booking/hooks/useInputField.js":
/*!*********************************************************!*\
  !*** ./assets/js/public/booking/hooks/useInputField.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useInputField: () => (/* binding */ useInputField)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }

var hasValue = function hasValue(val) {
  if (!val) return false;
  if (Array.isArray(val)) return val.length > 0 && val.some(function (v) {
    return v && (typeof v !== 'string' || v.trim() !== '');
  });
  if (typeof val === 'string') return val.trim() !== '';
  return true;
};

// todo: zvažit tuhle logiku s basebookingcomponent.jsx
var useInputField = function useInputField(_ref) {
  var fieldId = _ref.fieldId,
    rules = _ref.rules,
    onChange = _ref.onChange,
    errorManager = _ref.errorManager,
    bookingFormManager = _ref.bookingFormManager;
  var isUpdatingRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var touchedRef = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef)(false); // Track if user has interacted with the field

  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      var value = bookingFormManager.get_field_value(fieldId);
      return value || '';
    }),
    _useState2 = _slicedToArray(_useState, 2),
    currentValue = _useState2[0],
    setCurrentValue = _useState2[1];
  var _useState3 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      return null;
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];
  var _useState5 = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      var value = bookingFormManager.get_field_value(fieldId);
      return hasValue(value);
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    isValid = _useState6[0],
    setIsValid = _useState6[1];
  (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var handleStoreUpdate = function handleStoreUpdate(event) {
      if (event.type === 'field_change' && event.fieldName === fieldId) {
        if (isUpdatingRef.current) {
          isUpdatingRef.current = false;
          return;
        }
        var newValue = event.newValue || '';
        setCurrentValue(function (prevValue) {
          if (prevValue === newValue) {
            return prevValue;
          }
          return newValue;
        });

        // Only show errors if field was touched
        if (touchedRef.current) {
          var fieldError = errorManager === null || errorManager === void 0 ? void 0 : errorManager.getFieldError(fieldId);
          setError(fieldError);
          var valueExists = hasValue(newValue);
          var hasError = !!fieldError;
          setIsValid(valueExists && !hasError);
        }
      }
    };
    var handleErrorUpdate = function handleErrorUpdate(event) {
      if ((event.type === 'field_error' || event.type === 'field_error_cleared') && event.fieldId === fieldId) {
        // Only show errors if field was touched
        if (touchedRef.current) {
          var fieldError = errorManager === null || errorManager === void 0 ? void 0 : errorManager.getFieldError(fieldId);
          setError(fieldError);
          setCurrentValue(function (prevValue) {
            var valueExists = hasValue(prevValue);
            var hasError = !!fieldError;
            setIsValid(valueExists && !hasError);
            return prevValue;
          });
        }
      }
    };
    bookingFormManager.add_listener(handleStoreUpdate);
    errorManager === null || errorManager === void 0 || errorManager.addListener(handleErrorUpdate);
    return function () {
      bookingFormManager.remove_listener(handleStoreUpdate);
      errorManager === null || errorManager === void 0 || errorManager.removeListener(handleErrorUpdate);
    };
  }, [fieldId, bookingFormManager, errorManager]);
  var handleChange = function handleChange(value) {
    var isUserInteraction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    // Mark as touched on first user interaction
    if (isUserInteraction && !touchedRef.current) {
      touchedRef.current = true;
    }
    isUpdatingRef.current = true;
    setCurrentValue(value);
    bookingFormManager.set_field_value(fieldId, value);

    // Trigger validation - use 'user' for user interaction, 'system' for default values
    var source = touchedRef.current ? 'user' : 'system';
    bookingFormManager.handle_input_change(fieldId, value, rules, source);

    // Update validity state
    var fieldError = errorManager === null || errorManager === void 0 ? void 0 : errorManager.getFieldError(fieldId);
    var valueExists = hasValue(value);
    var hasError = !!fieldError;
    var isValidValue = !hasError && valueExists;
    setIsValid(isValidValue);
    bookingFormManager.setFieldValid(fieldId, isValidValue);
    if (isValidValue) {
      onChange === null || onChange === void 0 || onChange(fieldId, value);
    }
  };
  var baseClasses = "w-full border-2 border-th-blue rounded-[10px] h-55p px-15p transition-colors duration-200";
  var statusClasses = error ? 'input-error animate-shake' : isValid ? 'input-valid' : '';
  var inputClasses = "".concat(baseClasses, " ").concat(statusClasses).trim();
  return {
    currentValue: currentValue,
    handleChange: handleChange,
    error: touchedRef.current ? error : null,
    // Only show error if touched
    isValid: isValid,
    inputClasses: inputClasses,
    setIsValid: setIsValid
  };
};

/***/ }),

/***/ "./assets/js/public/booking/hooks/useStepCondition.js":
/*!************************************************************!*\
  !*** ./assets/js/public/booking/hooks/useStepCondition.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkStepConditionWithManager: () => (/* binding */ checkStepConditionWithManager),
/* harmony export */   useStepCondition: () => (/* binding */ useStepCondition)
/* harmony export */ });
/* harmony import */ var _utils_stepConditions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/stepConditions.js */ "./assets/js/utils/stepConditions.js");

var checkStepConditionWithManager = _utils_stepConditions_js__WEBPACK_IMPORTED_MODULE_0__.check_step_condition_with_manager;
var useStepCondition = _utils_stepConditions_js__WEBPACK_IMPORTED_MODULE_0__.use_step_condition;

/***/ }),

/***/ "./assets/js/public/booking/utils/backNavigation.js":
/*!**********************************************************!*\
  !*** ./assets/js/public/booking/utils/backNavigation.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canGoBack: () => (/* binding */ canGoBack),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getPreviousStep: () => (/* binding */ getPreviousStep),
/* harmony export */   goBack: () => (/* binding */ goBack),
/* harmony export */   goToStep: () => (/* binding */ goToStep),
/* harmony export */   isFirstStep: () => (/* binding */ isFirstStep),
/* harmony export */   isValidStep: () => (/* binding */ isValidStep)
/* harmony export */ });
/**
 * @typedef {Function} SetCurrentStepFunction
 * @param {number} step - The step number to set
 * @returns {void}
 */

/**
 * Back Navigation Utility Functions
 * Handles navigation logic and validation for booking form steps
 */

/**
 * Check if user can navigate back from current step
 * @param {number} currentStep - The current step number
 * @returns {boolean} - True if user can go back, false otherwise
 */
var canGoBack = function canGoBack(currentStep) {
  return currentStep > 1;
};

/**
 * Navigate to previous step if possible
 * @param {number} currentStep - The current step number
 * @param {SetCurrentStepFunction} setCurrentStep - Function to update current step
 * @returns {boolean} - True if navigation occurred, false otherwise
 */
var goBack = function goBack(currentStep, setCurrentStep) {
  if (canGoBack(currentStep)) {
    setCurrentStep(currentStep - 1);
    return true;
  }
  return false;
};

/**
 * Get the previous step number
 * @param {number} currentStep - The current step number
 * @returns {number|null} - Previous step number or null if not available
 */
var getPreviousStep = function getPreviousStep(currentStep) {
  return canGoBack(currentStep) ? currentStep - 1 : null;
};

/**
 * Check if user is on the first step
 * @param {number} currentStep - The current step number
 * @returns {boolean} - True if on first step, false otherwise
 */
var isFirstStep = function isFirstStep(currentStep) {
  return currentStep === 1;
};

/**
 * Validate step number is within valid range
 * @param {number} step - The step number to validate
 * @param {number} totalSteps - Total number of steps available
 * @returns {boolean} - True if step is valid, false otherwise
 */
var isValidStep = function isValidStep(step, totalSteps) {
  return step >= 1 && step <= totalSteps;
};

/**
 * Navigate to a specific step with validation
 * @param {number} targetStep - The target step number
 * @param {number} totalSteps - Total number of steps available
 * @param {SetCurrentStepFunction} setCurrentStep - Function to update current step
 * @returns {boolean} - True if navigation occurred, false otherwise
 */
var goToStep = function goToStep(targetStep, totalSteps, setCurrentStep) {
  if (isValidStep(targetStep, totalSteps)) {
    setCurrentStep(targetStep);
    return true;
  }
  return false;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  canGoBack: canGoBack,
  goBack: goBack,
  getPreviousStep: getPreviousStep,
  isFirstStep: isFirstStep,
  isValidStep: isValidStep,
  goToStep: goToStep
});

/***/ }),

/***/ "./assets/js/public/booking/utils/bookingFormManager.js":
/*!**************************************************************!*\
  !*** ./assets/js/public/booking/utils/bookingFormManager.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BookingFormManager: () => (/* binding */ BookingFormManager),
/* harmony export */   createBookingFormManager: () => (/* binding */ createBookingFormManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useBookingFormManager: () => (/* binding */ useBookingFormManager)
/* harmony export */ });
/* harmony import */ var _validationOrchestrator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validationOrchestrator.js */ "./assets/js/public/booking/utils/validationOrchestrator.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./assets/js/public/booking/utils/storage.js");
/* harmony import */ var _mutations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mutations.js */ "./assets/js/public/booking/utils/mutations.js");
/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.js */ "./assets/js/public/booking/utils/user.js");
/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./card.js */ "./assets/js/public/booking/utils/card.js");
/* harmony import */ var _utils_cart_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/cart.js */ "./assets/js/utils/cart.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var __validation_managers_by_booking = new Map();
var BookingFormManager = /*#__PURE__*/function () {
  function BookingFormManager(bookingId, quoteHash, errorManager) {
    var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _classCallCheck(this, BookingFormManager);
    this.bookingId = bookingId;
    this.quoteHash = quoteHash;
    this.config = _objectSpread({
      debounceDelay: 1000,
      batchDelay: 100,
      maxBatchSize: 10,
      autoSave: true
    }, config);
    this.orchestrator = new _validationOrchestrator_js__WEBPACK_IMPORTED_MODULE_0__.ValidationOrchestrator(this.getBookingId(), this.getQuoteHash(), errorManager, this.config);
    this.formStore = this.orchestrator.get_form_store();
    this.errorManager = errorManager;
    this.mutationManager = null;
    this.listeners = new Set();
    this.stepValidation = new Map(); // Step-based validation state
    this.cartUpdateHandlers = new Map(); // Custom handlers pro různé bloky
    this._sections = {}; // Store sections for field lookup
    this._userManager = null;
    this._cardManager = null;
    this._cartManager = null;
    this._saveStepResult = null; // Store saveStep result for handlers
    this.setupErrorManagerIntegration();
    this.setupValidationCallbacks();
  }
  return _createClass(BookingFormManager, [{
    key: "getBookingId",
    value: function getBookingId() {
      return this.bookingId;
    }
  }, {
    key: "getQuoteHash",
    value: function getQuoteHash() {
      return this.quoteHash;
    }
  }, {
    key: "getUser",
    value: function getUser() {
      if (!this._userManager) {
        this._userManager = new _user_js__WEBPACK_IMPORTED_MODULE_3__["default"](this);
      }
      return this._userManager;
    }
  }, {
    key: "getCard",
    value: function getCard() {
      if (!this._cardManager) {
        this._cardManager = new _card_js__WEBPACK_IMPORTED_MODULE_4__["default"](this);
      }
      return this._cardManager;
    }
  }, {
    key: "getCart",
    value: function getCart() {
      if (!this._cartManager) {
        this._cartManager = new _utils_cart_js__WEBPACK_IMPORTED_MODULE_5__["default"](this);
      }
      return this._cartManager;
    }
  }, {
    key: "handle_input_change",
    value: function handle_input_change(fieldId, newValue) {
      var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "user";
      this.errorManager.validateField(fieldId, newValue, rules);
      if (this.errorManager.hasFieldError(fieldId)) {
        return;
      }
      this.orchestrator.handle_input_change(fieldId, newValue, source);
      this.notify_listeners({
        type: "input_change",
        fieldId: fieldId,
        newValue: newValue,
        source: source,
        bookingId: this.getBookingId()
      });
    }
  }, {
    key: "get_form_state",
    value: function get_form_state() {
      return this.formStore.get_state();
    }
  }, {
    key: "get_field_value",
    value: function get_field_value(fieldName) {
      var _this$formStore;
      return ((_this$formStore = this.formStore) === null || _this$formStore === void 0 ? void 0 : _this$formStore.formData[fieldName]) || "";
    }
  }, {
    key: "set_field_value",
    value: function set_field_value(fieldName, value) {
      this.formStore.save_to_storage(_defineProperty({}, fieldName, value));
    }
  }, {
    key: "get_stored_value",
    value: function get_stored_value(fieldName) {
      var _this$formStore2;
      return ((_this$formStore2 = this.formStore) === null || _this$formStore2 === void 0 ? void 0 : _this$formStore2.formData[fieldName]) || "";
    }
  }, {
    key: "get_field_error",
    value: function get_field_error(fieldName) {
      return this.errorManager.getFieldError(fieldName);
    }
  }, {
    key: "get_field_label",
    value: function get_field_label(field_id) {
      if (!field_id || !this._sections) {
        return "";
      }
      for (var step in this._sections) {
        var blocks = this._sections[step] || [];
        var _iterator = _createForOfIteratorHelper(blocks),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _block$attrs;
            var block = _step.value;
            if (((_block$attrs = block.attrs) === null || _block$attrs === void 0 ? void 0 : _block$attrs.field_id) === field_id) {
              var _block$attrs2;
              return ((_block$attrs2 = block.attrs) === null || _block$attrs2 === void 0 || (_block$attrs2 = _block$attrs2.general) === null || _block$attrs2 === void 0 ? void 0 : _block$attrs2.label) || "";
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return "";
    }
  }, {
    key: "get_all_errors",
    value: function get_all_errors() {
      return this.errorManager.getAllErrors();
    }
  }, {
    key: "has_errors",
    value: function has_errors() {
      return this.errorManager.hasAnyErrors();
    }
  }, {
    key: "add_listener",
    value: function add_listener(listener) {
      this.listeners.add(listener);
      this.formStore.add_listener(listener);
      this.errorManager.addListener(listener);
    }
  }, {
    key: "remove_listener",
    value: function remove_listener(listener) {
      this.listeners["delete"](listener);
      this.formStore.remove_listener(listener);
      this.errorManager.removeListener(listener);
    }
  }, {
    key: "notify_listeners",
    value: function notify_listeners(event) {
      this.listeners.forEach(function (listener) {
        try {
          listener(event);
        } catch (error) {
          console.warn("[BookingFormManager] Listener error:", error);
        }
      });
    }
  }, {
    key: "get_stats",
    value: function get_stats() {
      return this.orchestrator.get_stats();
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      this.orchestrator.cleanup();
      this.errorManager.clearAllErrors();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.orchestrator.reset();
      this.errorManager.clearAllErrors();
      this.listeners.clear();
    }
  }, {
    key: "get_draft",
    value: function get_draft() {
      return (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.loadDraft)(this.getBookingId());
    }
  }, {
    key: "save_draft",
    value: function save_draft(draft) {
      (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.patchDraft)(this.getBookingId(), draft);
    }
  }, {
    key: "clear_draft",
    value: function clear_draft() {
      (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.clearDraft)(this.getBookingId());
    }
  }, {
    key: "trigger_mutation",
    value: function trigger_mutation(fieldName, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return (0,_mutations_js__WEBPACK_IMPORTED_MODULE_2__.triggerMutation)(fieldName, value, options);
    }
  }, {
    key: "execute_mutation",
    value: function execute_mutation(fieldName, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return (0,_mutations_js__WEBPACK_IMPORTED_MODULE_2__.executeMutation)(fieldName, value, options);
    }

    // === ERROR MANAGER INTEGRATION ===
  }, {
    key: "setupErrorManagerIntegration",
    value: function setupErrorManagerIntegration() {
      var _this = this;
      // Propojení ErrorManager s BookingFormManager
      this.errorManager.addListener(function (event) {
        _this.notify_listeners(_objectSpread(_objectSpread({
          type: "error_manager_event"
        }, event), {}, {
          bookingId: _this.getBookingId()
        }));
      });
    }

    // === VALIDATION CALLBACK SETUP ===
  }, {
    key: "setupValidationCallbacks",
    value: function setupValidationCallbacks() {
      var _this2 = this;
      this.orchestrator.setValidationResultCallback(function (fieldName, isValid) {
        var hasValue = _this2.get_field_value(fieldName) !== undefined && _this2.get_field_value(fieldName) !== null && _this2.get_field_value(fieldName) !== "";
        var finalIsValid = isValid && hasValue;
        _this2.setFieldValid(fieldName, finalIsValid);
      });
      this.orchestrator.setCartUpdateCallback(function (fieldName, result) {
        _this2.handle_block_result(fieldName, result);
      });
    }

    // === BLOCK RESULT HANDLERS ===
  }, {
    key: "register_block_handler",
    value: function register_block_handler(fieldName, handler) {
      this.cartUpdateHandlers.set(fieldName, handler);
    }
  }, {
    key: "unregister_block_handler",
    value: function unregister_block_handler(fieldName) {
      this.cartUpdateHandlers["delete"](fieldName);
    }

    // Store saveStep result for use in handlers
  }, {
    key: "set_save_step_result",
    value: function set_save_step_result(saveStepResult) {
      this._saveStepResult = saveStepResult;

      // Auto-update cart if products are present
      if (saveStepResult !== null && saveStepResult !== void 0 && saveStepResult.products) {
        this.update_cart_from_save_step_result(saveStepResult);
      }
    }

    // Get saveStep result
  }, {
    key: "get_save_step_result",
    value: function get_save_step_result() {
      return this._saveStepResult;
    }

    // Update cart from saveStep result
  }, {
    key: "update_cart_from_save_step_result",
    value: function update_cart_from_save_step_result(saveStepResult) {
      var _oldCartData$items, _finalCartData$items, _finalCartData$items2;
      console.log("🛒 [BookingFormManager] update_cart_from_save_step_result called");
      console.log("🛒 [BookingFormManager] Full saveStepResult:", saveStepResult);
      if (!(saveStepResult !== null && saveStepResult !== void 0 && saveStepResult.products) || !Array.isArray(saveStepResult.products)) {
        console.warn("🛒 [BookingFormManager] No products in saveStepResult", {
          hasProducts: !!(saveStepResult !== null && saveStepResult !== void 0 && saveStepResult.products),
          isArray: Array.isArray(saveStepResult === null || saveStepResult === void 0 ? void 0 : saveStepResult.products),
          saveStepResult: saveStepResult
        });
        return false;
      }
      var cartManager = this.getCart();
      var products = saveStepResult.products;
      console.log("\uD83D\uDED2 [BookingFormManager] Updating cart with ".concat(products.length, " products from server"));

      // Log current cart state before clearing
      var oldCartData = cartManager.getData();
      console.log("🛒 [BookingFormManager] Cart state BEFORE clear:", {
        itemCount: ((_oldCartData$items = oldCartData.items) === null || _oldCartData$items === void 0 ? void 0 : _oldCartData$items.length) || 0,
        items: oldCartData.items || [],
        totals: {
          base_total: oldCartData.base_total,
          percentage_total: oldCartData.percentage_total,
          grand_total: oldCartData.grand_total
        }
      });

      // Clear existing cart
      cartManager.clearCart();
      console.log("🛒 [BookingFormManager] Cart cleared");

      // Add each product from server response
      products.forEach(function (product, index) {
        var _ref;
        console.log("\uD83D\uDED2 [BookingFormManager] Processing product ".concat(index + 1, "/").concat(products.length, ":"), product);
        var product_id = product.product_id,
          _product$quantity = product.quantity,
          quantity = _product$quantity === void 0 ? 1 : _product$quantity,
          _product$variation_id = product.variation_id,
          variation_id = _product$variation_id === void 0 ? null : _product$variation_id,
          _product$variation = product.variation,
          variation = _product$variation === void 0 ? {} : _product$variation,
          _product$cart_item_da = product.cart_item_data,
          cart_item_data = _product$cart_item_da === void 0 ? {} : _product$cart_item_da,
          _product$price = product.price,
          price = _product$price === void 0 ? 0 : _product$price,
          _product$step = product.step,
          step = _product$step === void 0 ? null : _product$step,
          _product$name = product.name,
          name = _product$name === void 0 ? "" : _product$name,
          _product$field_id = product.field_id,
          field_id = _product$field_id === void 0 ? null : _product$field_id,
          _product$row = product.row,
          row = _product$row === void 0 ? null : _product$row,
          _product$show_in_tota = product.show_in_total,
          show_in_total = _product$show_in_tota === void 0 ? false : _product$show_in_tota,
          _product$included = product.included,
          included = _product$included === void 0 ? [] : _product$included;

        // Ensure cart_item_data includes all necessary fields
        var enriched_cart_item_data = _objectSpread(_objectSpread({}, cart_item_data), {}, {
          step: step || cart_item_data.step,
          name: name || cart_item_data.name,
          field_id: field_id || cart_item_data.field_id,
          row: row !== null && row !== void 0 ? row : cart_item_data.row,
          show_in_total: (_ref = show_in_total !== null && show_in_total !== void 0 ? show_in_total : cart_item_data.show_in_total) !== null && _ref !== void 0 ? _ref : true
        });
        console.log("\uD83D\uDED2 [BookingFormManager] Product ".concat(index + 1, " enriched data:"), {
          product_id: product_id,
          quantity: quantity,
          variation_id: variation_id,
          variation: variation,
          enriched_cart_item_data: enriched_cart_item_data,
          price: price
        });
        try {
          var _currentCartData$item, _currentCartData$item2;
          var cart_item_key = cartManager.addProduct(product_id, quantity, variation_id, variation, enriched_cart_item_data, price);
          console.log("\u2705 [BookingFormManager] Added product ".concat(index + 1, "/").concat(products.length, ":"), {
            product_id: product_id,
            quantity: quantity,
            price: price,
            cart_item_key: cart_item_key,
            name: enriched_cart_item_data.name,
            step: enriched_cart_item_data.step,
            included: included
          });

          // Add included products to cart
          if (Array.isArray(included) && included.length > 0) {
            console.log("\uD83D\uDD0D [BookingFormManager] Processing ".concat(included.length, " included products for product ").concat(product_id));
            included.forEach(function (included_product_id, included_index) {
              var included_cart_item_data = _objectSpread(_objectSpread({}, enriched_cart_item_data), {}, {
                is_included: true,
                parent_product_id: product_id,
                parent_cart_item_key: cart_item_key
              });
              try {
                var included_cart_item_key = cartManager.addProduct(included_product_id, quantity, null, {}, included_cart_item_data, 0);
                console.log("\u2705 [BookingFormManager] Added included product ".concat(included_index + 1, "/").concat(included.length, ":"), {
                  included_product_id: included_product_id,
                  parent_product_id: product_id,
                  included_cart_item_key: included_cart_item_key,
                  row: enriched_cart_item_data.row,
                  field_id: enriched_cart_item_data.field_id
                });
              } catch (error) {
                console.error("\uD83D\uDD34 [BookingFormManager] Error adding included product ".concat(included_product_id, ":"), error);
              }
            });
          }

          // Log cart state after adding this product
          var currentCartData = cartManager.getData();
          console.log("\uD83D\uDED2 [BookingFormManager] Cart state after adding product ".concat(index + 1, ":"), {
            itemCount: ((_currentCartData$item = currentCartData.items) === null || _currentCartData$item === void 0 ? void 0 : _currentCartData$item.length) || 0,
            lastItem: (_currentCartData$item2 = currentCartData.items) === null || _currentCartData$item2 === void 0 ? void 0 : _currentCartData$item2[currentCartData.items.length - 1]
          });
        } catch (error) {
          console.error("\uD83D\uDD34 [BookingFormManager] Error adding product ".concat(product_id, ":"), error);
          console.error("\uD83D\uDD34 [BookingFormManager] Product data that caused error:", product);
        }
      });

      // Recalculate totals
      console.log("🛒 [BookingFormManager] Recalculating totals...");
      cartManager.recalculateTotals();

      // Get final cart state
      var finalCartData = cartManager.getData();
      var finalTotals = cartManager.getTotals();
      console.log("🛒 [BookingFormManager] Cart state AFTER update:", {
        itemCount: ((_finalCartData$items = finalCartData.items) === null || _finalCartData$items === void 0 ? void 0 : _finalCartData$items.length) || 0,
        items: finalCartData.items || [],
        totals: finalTotals
      });

      // Notify listeners
      this.notify_listeners({
        type: "cart_updated_from_server",
        products: products,
        totals: finalTotals,
        bookingId: this.getBookingId()
      });
      console.log("✅ [BookingFormManager] Cart updated successfully. Summary:", {
        productsProcessed: products.length,
        itemsInCart: ((_finalCartData$items2 = finalCartData.items) === null || _finalCartData$items2 === void 0 ? void 0 : _finalCartData$items2.length) || 0,
        totals: finalTotals,
        bookingId: this.getBookingId()
      });
      return true;
    }
  }, {
    key: "handle_block_result",
    value: function handle_block_result(fieldName, result) {
      if (!result) return;

      // Parse value pokud je string
      var parsed_value = result.value;
      if (typeof result.value === "string" && result.value) {
        try {
          parsed_value = JSON.parse(result.value);
        } catch (e) {
          parsed_value = result.value;
        }
      }
      var context = {
        fieldName: fieldName,
        result: result,
        value: parsed_value,
        cardManager: this.getCard(),
        userManager: this.getUser(),
        formStore: this.formStore,
        bookingId: this.getBookingId(),
        bookingFormManager: this,
        // Include saveStep result if available
        saveStepResult: this._saveStepResult
      };

      // Pokud existuje custom handler pro tento field
      if (this.cartUpdateHandlers.has(fieldName)) {
        var hasSaveStepResult = !!this._saveStepResult;
        console.log("\uD83D\uDD14 [BookingFormManager] Calling handler for field: ".concat(fieldName, " (saveStepResult: ").concat(hasSaveStepResult ? "available" : "not available", ")"));
        var handler = this.cartUpdateHandlers.get(fieldName);
        handler(context);
      }

      // Notify listeners
      this.notify_listeners(_objectSpread({
        type: "block_result"
      }, context));
    }

    // === ERROR MANAGER METHODS ===
  }, {
    key: "setFieldError",
    value: function setFieldError(fieldName, error) {
      this.errorManager.setFieldError(fieldName, error);
    }
  }, {
    key: "clearFieldError",
    value: function clearFieldError(fieldName) {
      this.errorManager.clearFieldError(fieldName);
    }
  }, {
    key: "hasFieldError",
    value: function hasFieldError(fieldName) {
      return this.errorManager.hasFieldError(fieldName);
    }
  }, {
    key: "setSystemError",
    value: function setSystemError(errorId, error) {
      this.errorManager.setSystemError(errorId, error);
    }
  }, {
    key: "clearSystemError",
    value: function clearSystemError(errorId) {
      this.errorManager.clearSystemError(errorId);
    }
  }, {
    key: "addGlobalError",
    value: function addGlobalError(error) {
      return this.errorManager.addGlobalError(error);
    }
  }, {
    key: "removeGlobalError",
    value: function removeGlobalError(errorId) {
      this.errorManager.removeGlobalError(errorId);
    }
  }, {
    key: "clearAllGlobalErrors",
    value: function clearAllGlobalErrors() {
      this.errorManager.clearAllGlobalErrors();
    }
  }, {
    key: "validateField",
    value: function validateField(fieldName, value) {
      var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.errorManager.validateField(fieldName, value, rules);
    }
  }, {
    key: "clearAllErrors",
    value: function clearAllErrors() {
      this.errorManager.clearAllErrors();
      this.formStore.reset();
    }

    // === SCROLL FUNCTIONALITY ===
  }, {
    key: "scrollToError",
    value: function scrollToError(fieldName) {
      this.errorManager.scrollToError(fieldName);
    }
  }, {
    key: "scrollToHeader",
    value: function scrollToHeader() {
      this.errorManager.scrollToHeader();
    }

    // === STEP VALIDATION METHODS ===
  }, {
    key: "initializeStepValidation",
    value: function initializeStepValidation(step, sections) {
      var _this3 = this;
      var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this._sections = sections;
      if (!sections[step] || sections[step].length === 0) {
        this.stepValidation.set(step, {
          fields: new Map(),
          isStepValid: false
        });
        return;
      }
      var stepFields = new Map();

      // Process each block in the step
      sections[step].forEach(function (block, index) {
        var _block$attrs3, _block$attrs4, _formData$fieldId;
        var fieldId = (_block$attrs3 = block.attrs) === null || _block$attrs3 === void 0 ? void 0 : _block$attrs3.field_id;
        if (!fieldId) {
          return;
        }
        var rules = ((_block$attrs4 = block.attrs) === null || _block$attrs4 === void 0 ? void 0 : _block$attrs4.rules) || {};
        var hasRules = Object.keys(rules).length > 0;
        // Check both formData prop AND internal formStore (for values set by components before step init)
        var currentValue = (_formData$fieldId = formData[fieldId]) !== null && _formData$fieldId !== void 0 ? _formData$fieldId : _this3.get_field_value(fieldId);
        var hasValue = currentValue !== undefined && currentValue !== null && currentValue !== "";

        // Determine initial validity
        var isValid;
        if (!hasRules) {
          // No rules = valid ONLY if has value (field must be filled)
          isValid = hasValue;
        } else if (!hasValue) {
          // Has rules but no value = invalid
          isValid = false;
        } else {
          // Has rules and value - check if already validated
          // Initially set to false, will be updated after validation
          isValid = false;
          // Trigger validation for existing value
          _this3.validate_existing_field(fieldId, currentValue, rules);
        }
        stepFields.set(fieldId, {
          isValid: isValid,
          hasRules: hasRules,
          hasValue: hasValue,
          rules: rules,
          blockName: block.blockName,
          blockIndex: index
        });
      });

      // Calculate step validity
      var isStepValid = Array.from(stepFields.values()).every(function (field) {
        return field.isValid;
      });
      this.stepValidation.set(step, {
        fields: stepFields,
        isStepValid: isStepValid
      });
      this.notify_listeners({
        type: "step_validation_initialized",
        step: step,
        isStepValid: isStepValid,
        bookingId: this.getBookingId()
      });
    }
  }, {
    key: "validate_existing_field",
    value: function () {
      var _validate_existing_field = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(fieldId, value, rules) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this.handle_input_change(fieldId, value, rules, "system");
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function validate_existing_field(_x, _x2, _x3) {
        return _validate_existing_field.apply(this, arguments);
      }
      return validate_existing_field;
    }()
  }, {
    key: "setFieldValid",
    value: function setFieldValid(fieldId, isValid) {
      // Find which step contains this field
      var _iterator2 = _createForOfIteratorHelper(this.stepValidation.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            step = _step2$value[0],
            stepData = _step2$value[1];
          if (stepData.fields.has(fieldId)) {
            var field = stepData.fields.get(fieldId);
            field.isValid = isValid;
            stepData.fields.set(fieldId, field);

            // Recalculate step validity
            var isStepValid = Array.from(stepData.fields.values()).every(function (field) {
              return field.isValid;
            });
            stepData.isStepValid = isStepValid;
            this.notify_listeners({
              type: "field_validation_changed",
              fieldId: fieldId,
              isValid: isValid,
              step: step,
              isStepValid: isStepValid,
              bookingId: this.getBookingId()
            });
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "isStepValid",
    value: function isStepValid(step) {
      var stepData = this.stepValidation.get(step);
      var isValid = stepData ? stepData.isStepValid : false;
      return isValid;
    }
  }, {
    key: "getStepValidationState",
    value: function getStepValidationState(step) {
      return this.stepValidation.get(step) || {
        fields: new Map(),
        isStepValid: false
      };
    }
  }, {
    key: "getFieldValidationState",
    value: function getFieldValidationState(fieldId) {
      var _iterator3 = _createForOfIteratorHelper(this.stepValidation.entries()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _step3$value = _slicedToArray(_step3.value, 2),
            step = _step3$value[0],
            stepData = _step3$value[1];
          if (stepData.fields.has(fieldId)) {
            return _objectSpread(_objectSpread({}, stepData.fields.get(fieldId)), {}, {
              step: step
            });
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return null;
    }
  }, {
    key: "clearStepValidation",
    value: function clearStepValidation(step) {
      this.stepValidation["delete"](step);
      this.notify_listeners({
        type: "step_validation_cleared",
        step: step,
        bookingId: this.getBookingId()
      });
    }
  }, {
    key: "clearAllStepValidation",
    value: function clearAllStepValidation() {
      this.stepValidation.clear();
      this.notify_listeners({
        type: "all_step_validation_cleared",
        bookingId: this.getBookingId()
      });
    }
  }]);
}();
var useBookingFormManager = function useBookingFormManager(bookingId, errorManager) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var manager = new BookingFormManager(bookingId, errorManager, config);
  return {
    manager: manager,
    handleInputChange: function handleInputChange(fieldName, newValue, source) {
      return manager.handle_input_change(fieldName, newValue, source);
    },
    getFormState: function getFormState() {
      return manager.get_form_state();
    },
    getFieldValue: function getFieldValue(fieldName) {
      return manager.get_field_value(fieldName);
    },
    getFieldError: function getFieldError(fieldName) {
      return manager.get_field_error(fieldName);
    },
    getAllErrors: function getAllErrors() {
      return manager.get_all_errors();
    },
    hasErrors: function hasErrors() {
      return manager.has_errors();
    },
    addListener: function addListener(listener) {
      return manager.add_listener(listener);
    },
    removeListener: function removeListener(listener) {
      return manager.remove_listener(listener);
    },
    getStats: function getStats() {
      return manager.get_stats();
    },
    cleanup: function cleanup() {
      return manager.cleanup();
    },
    reset: function reset() {
      return manager.reset();
    },
    // ErrorManager methods
    setFieldError: function setFieldError(fieldName, error) {
      return manager.setFieldError(fieldName, error);
    },
    clearFieldError: function clearFieldError(fieldName) {
      return manager.clearFieldError(fieldName);
    },
    hasFieldError: function hasFieldError(fieldName) {
      return manager.hasFieldError(fieldName);
    },
    setSystemError: function setSystemError(errorId, error) {
      return manager.setSystemError(errorId, error);
    },
    clearSystemError: function clearSystemError(errorId) {
      return manager.clearSystemError(errorId);
    },
    addGlobalError: function addGlobalError(error) {
      return manager.addGlobalError(error);
    },
    removeGlobalError: function removeGlobalError(errorId) {
      return manager.removeGlobalError(errorId);
    },
    clearAllGlobalErrors: function clearAllGlobalErrors() {
      return manager.clearAllGlobalErrors();
    },
    validateField: function validateField(fieldName, value, rules) {
      return manager.validateField(fieldName, value, rules);
    },
    clearAllErrors: function clearAllErrors() {
      return manager.clearAllErrors();
    },
    scrollToError: function scrollToError(fieldName) {
      return manager.scrollToError(fieldName);
    },
    scrollToHeader: function scrollToHeader() {
      return manager.scrollToHeader();
    },
    // Step validation methods
    initializeStepValidation: function initializeStepValidation(step, sections, formData) {
      return manager.initializeStepValidation(step, sections, formData);
    },
    setFieldValid: function setFieldValid(fieldId, isValid) {
      return manager.setFieldValid(fieldId, isValid);
    },
    isStepValid: function isStepValid(step) {
      return manager.isStepValid(step);
    },
    getStepValidationState: function getStepValidationState(step) {
      return manager.getStepValidationState(step);
    },
    getFieldValidationState: function getFieldValidationState(fieldId) {
      return manager.getFieldValidationState(fieldId);
    },
    clearStepValidation: function clearStepValidation(step) {
      return manager.clearStepValidation(step);
    },
    clearAllStepValidation: function clearAllStepValidation() {
      return manager.clearAllStepValidation();
    },
    // Cart update methods
    updateCartFromSaveStepResult: function updateCartFromSaveStepResult(saveStepResult) {
      return manager.update_cart_from_save_step_result(saveStepResult);
    }
  };
};
var createBookingFormManager = function createBookingFormManager(bookingId, quoteHash, errorManager) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  if (!bookingId) {
    return new BookingFormManager(bookingId, quoteHash, errorManager, config);
  }
  if (__validation_managers_by_booking.has(bookingId)) {
    return __validation_managers_by_booking.get(bookingId);
  }
  var manager = new BookingFormManager(bookingId, quoteHash, errorManager, config);
  __validation_managers_by_booking.set(bookingId, manager);
  return manager;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookingFormManager);

/***/ }),

/***/ "./assets/js/public/booking/utils/card.js":
/*!************************************************!*\
  !*** ./assets/js/public/booking/utils/card.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _utils_cart_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   getCartManager: () => (/* reexport safe */ _utils_cart_js__WEBPACK_IMPORTED_MODULE_0__.getCartManager),
/* harmony export */   resetCartManager: () => (/* reexport safe */ _utils_cart_js__WEBPACK_IMPORTED_MODULE_0__.resetCartManager)
/* harmony export */ });
/* harmony import */ var _utils_cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/cart.js */ "./assets/js/utils/cart.js");
// Re-export from shared location


/***/ }),

/***/ "./assets/js/public/booking/utils/devTools.js":
/*!****************************************************!*\
  !*** ./assets/js/public/booking/utils/devTools.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEV_LOG_STORAGE_DATA: () => (/* binding */ DEV_LOG_STORAGE_DATA),
/* harmony export */   DEV_RESET_FORM_DATA: () => (/* binding */ DEV_RESET_FORM_DATA),
/* harmony export */   logStorageData: () => (/* binding */ logStorageData)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./assets/js/public/booking/utils/storage.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }


// ═══════════════════════════════════════════════════════════
// 🔧 DEV TOOLS - Development and debugging tools
// ═══════════════════════════════════════════════════════════
//
// 🗑️ DEV_RESET_FORM_DATA: Clears all saved data on load
//    Usage: Set to `true` to reset localStorage data
//    Useful for: Testing clean form from scratch
//
// 📊 DEV_LOG_STORAGE_DATA: Logs saved data to console
//    Usage: Set to `true` to display storage data
//    Shows: Booking ID, step, form data, summary data, statistics
//    Logging occurs: on load, step change, and data change
//    Useful for: Monitoring form state in real-time
//
// ═══════════════════════════════════════════════════════════

var DEV_RESET_FORM_DATA = false;
var DEV_LOG_STORAGE_DATA = false;

/**
 * Playful function for logging storage data to console
 * @param {string} bookingID - Booking ID
 */
var logStorageData = function logStorageData(bookingID) {
  var draft = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.loadDraft)(bookingID);
  if (!draft) {
    console.log("%c📦 STORAGE DEBUG ", "background: #ff6b6b; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;");
    console.log("%c❌ No data found", "color: #ff6b6b; font-size: 12px;");
    return;
  }
  var now = Date.now();
  var savedAgo = now - draft.savedAt;
  var minutes = Math.floor(savedAgo / 60000);
  var seconds = Math.floor(savedAgo % 60000 / 1000);
  var timeAgo = minutes > 0 ? "".concat(minutes, "m ").concat(seconds, "s ago") : "".concat(seconds, "s ago");
  var formDataKeys = Object.keys(draft.formData || {});
  var formDataSize = JSON.stringify(draft.formData).length;
  var hasSummaryData = !!draft.summaryData;
  console.log("%c📦 STORAGE DEBUG ", "background: #4ecdc4; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;");
  console.log("%c┌─────────────────────────────────────────┐", "color: #95a5a6;");

  // Základní info
  console.log("%c│ 🆔 Booking ID: %c" + draft.bookingId, "color: #95a5a6;", "color: #3498db; font-weight: bold;");
  console.log("%c│ 📊 Version: %cv" + draft.version, "color: #95a5a6;", "color: #9b59b6;");
  console.log("%c│ 🔢 Current step: %c" + draft.step, "color: #95a5a6;", "color: #e74c3c; font-weight: bold; font-size: 14px;");
  console.log("%c│ ⏰ Saved: %c" + timeAgo, "color: #95a5a6;", "color: #f39c12;");
  console.log("%c│ 📅 Time: %c" + new Date(draft.savedAt).toLocaleString("en-US"), "color: #95a5a6;", "color: #7f8c8d;");
  console.log("%c├─────────────────────────────────────────┤", "color: #95a5a6;");

  // Form Data Stats
  console.log("%c│ 📝 Form Data: %c" + formDataKeys.length + " fields %c(" + (formDataSize / 1024).toFixed(2) + " KB)", "color: #95a5a6;", "color: #2ecc71; font-weight: bold;", "color: #7f8c8d; font-size: 11px;");
  if (formDataKeys.length > 0) {
    console.log("%c│   Fields:", "color: #95a5a6;");
    formDataKeys.forEach(function (key, index) {
      var value = draft.formData[key];
      var valueStr = _typeof(value) === "object" ? "{".concat(Object.keys(value).length, " items}") : String(value).substring(0, 30) + (String(value).length > 30 ? "..." : "");
      var icon = index === formDataKeys.length - 1 ? "└─" : "├─";
      console.log("%c│   " + icon + " %c" + key + ": %c" + valueStr, "color: #95a5a6;", "color: #3498db;", "color: #2c3e50;");
    });
  }
  console.log("%c├─────────────────────────────────────────┤", "color: #95a5a6;");

  // Summary Data
  if (hasSummaryData) {
    var summarySize = JSON.stringify(draft.summaryData).length;
    console.log("%c│ ✅ Summary Data: %cLoaded %c(" + (summarySize / 1024).toFixed(2) + " KB)", "color: #95a5a6;", "color: #2ecc71; font-weight: bold;", "color: #7f8c8d; font-size: 11px;");
  } else {
    console.log("%c│ ❌ Summary Data: %cNot available", "color: #95a5a6;", "color: #e67e22;");
  }
  console.log("%c└─────────────────────────────────────────┘", "color: #95a5a6;");

  // Detailed data
  console.log("%c🔍 Detailed data:", "color: #3498db; font-weight: bold; font-size: 13px; margin-top: 8px;");
  console.log("%c├─ Form Data:", "color: #2ecc71; font-weight: bold;");
  console.table(draft.formData);
  if (hasSummaryData) {
    console.log("%c├─ Summary Data:", "color: #9b59b6; font-weight: bold;");
    console.log(draft.summaryData);
  }
  console.log("%c└─ Complete Draft Object:", "color: #e74c3c; font-weight: bold;");
  console.log(draft);
  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #95a5a6;");
};

/***/ }),

/***/ "./assets/js/public/booking/utils/errorManager.js":
/*!********************************************************!*\
  !*** ./assets/js/public/booking/utils/errorManager.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorManager: () => (/* binding */ ErrorManager),
/* harmony export */   createErrorManager: () => (/* binding */ createErrorManager)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var ErrorManager = /*#__PURE__*/function () {
  function ErrorManager(bookingId) {
    _classCallCheck(this, ErrorManager);
    this.bookingId = bookingId;
    this.errors = {
      field: new Map(),
      system: new Map(),
      global: []
    };
    this.listeners = new Set();
    this.scrollOptions = {
      behavior: 'smooth',
      block: 'center'
    };
  }

  // === FIELD LEVEL ERRORS ===
  return _createClass(ErrorManager, [{
    key: "setFieldError",
    value: function setFieldError(fieldId, error) {
      this.errors.field.set(fieldId, error);
      this.notifyListeners({
        type: 'field_error',
        fieldId: fieldId,
        error: error
      });
    }
  }, {
    key: "getFieldError",
    value: function getFieldError(fieldId) {
      return this.errors.field.get(fieldId) || null;
    }
  }, {
    key: "clearFieldError",
    value: function clearFieldError(fieldId) {
      this.errors.field["delete"](fieldId);
      this.notifyListeners({
        type: 'field_error_cleared',
        fieldId: fieldId
      });
    }
  }, {
    key: "hasFieldError",
    value: function hasFieldError(fieldId) {
      return this.errors.field.has(fieldId);
    }

    // === SYSTEM LEVEL ERRORS ===
  }, {
    key: "setSystemError",
    value: function setSystemError(errorId, error) {
      this.errors.system.set(errorId, error);
      this.notifyListeners({
        type: 'system_error',
        errorId: errorId,
        error: error
      });
      this.scrollToError(errorId);
    }
  }, {
    key: "getSystemError",
    value: function getSystemError(errorId) {
      return this.errors.system.get(errorId) || null;
    }
  }, {
    key: "clearSystemError",
    value: function clearSystemError(errorId) {
      this.errors.system["delete"](errorId);
      this.notifyListeners({
        type: 'system_error_cleared',
        errorId: errorId
      });
    }

    // === GLOBAL ERRORS (zobrazované v headeru) ===
  }, {
    key: "addGlobalError",
    value: function addGlobalError(error) {
      var message = error.message || error;
      var isDuplicate = this.errors.global.some(function (e) {
        return e.message === message;
      });
      if (isDuplicate) {
        return null;
      }
      var errorObj = {
        id: Date.now() + Math.random(),
        message: message,
        type: error.type || 'error',
        timestamp: new Date()
      };
      this.errors.global.push(errorObj);
      this.notifyListeners({
        type: 'global_error',
        error: errorObj
      });
      this.scrollToHeader();
      return errorObj.id;
    }
  }, {
    key: "removeGlobalError",
    value: function removeGlobalError(errorId) {
      this.errors.global = this.errors.global.filter(function (e) {
        return e.id !== errorId;
      });
      this.notifyListeners({
        type: 'global_error_removed',
        errorId: errorId
      });
    }
  }, {
    key: "clearAllGlobalErrors",
    value: function clearAllGlobalErrors() {
      this.errors.global = [];
      this.notifyListeners({
        type: 'global_errors_cleared'
      });
    }

    // === SCROLL FUNCTIONALITY ===
  }, {
    key: "scrollToError",
    value: function scrollToError(fieldId) {
      var element = document.getElementById(fieldId);
      if (element) {
        element.scrollIntoView(this.scrollOptions);
        // Add visual highlight
        element.classList.add('error-highlight');
        setTimeout(function () {
          return element.classList.remove('error-highlight');
        }, 2000);
      }
    }
  }, {
    key: "scrollToHeader",
    value: function scrollToHeader() {
      var header = document.querySelector('.booking-header, .aff-form-icons-wrapper');
      if (header) {
        header.scrollIntoView(this.scrollOptions);
      }
    }

    // === VALIDATION HELPERS ===
  }, {
    key: "validateField",
    value: function validateField(fieldId, value) {
      var _this = this;
      var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var errors = [];
      var isArray = Array.isArray(value);
      var values = isArray ? value : [value];
      var isEmpty = function isEmpty(val) {
        if (!val) return true;
        if (typeof val === 'string') return val.trim() === '';
        return false;
      };
      if (rules.required) {
        if (isArray ? value.length === 0 || value.every(isEmpty) : isEmpty(value)) {
          errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This field is required', 'wpcbooking'));
        }
      }
      if (rules.email && values.some(function (v) {
        return v && !_this.isValidEmail(v);
      })) {
        errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Invalid email', 'wpcbooking'));
      }
      if (rules.phone && values.some(function (v) {
        return v && !_this.isValidPhone(v);
      })) {
        errors.push((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Invalid phone number', 'wpcbooking'));
      }
      if (rules.minLength) {
        if (values.some(function (v) {
          return v && v.length < rules.minLength;
        })) {
          errors.push(sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Minimum length is %d characters', 'wpcbooking'), rules.minLength));
        }
      }
      if (rules.maxLength) {
        if (values.some(function (v) {
          return v && v.length > rules.maxLength;
        })) {
          errors.push(sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Maximum length is %d characters', 'wpcbooking'), rules.maxLength));
        }
      }
      if (rules.pattern) {
        var regex = new RegExp(rules.pattern);
        if (values.some(function (v) {
          return v && !regex.test(v);
        })) {
          errors.push(rules.patternMessage || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Invalid format', 'wpcbooking'));
        }
      }
      if (errors.length > 0) {
        this.setFieldError(fieldId, errors[0]);
        return false;
      } else {
        this.clearFieldError(fieldId);
        return true;
      }
    }

    // === UTILITY METHODS ===
  }, {
    key: "isValidEmail",
    value: function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }, {
    key: "isValidPhone",
    value: function isValidPhone(phone) {
      if (!phone || typeof phone !== 'string') return false;
      var cleaned = phone.replace(/\s+/g, '');
      return /^\+\d{1,4}\d{7,15}$/.test(cleaned);
    }
  }, {
    key: "getAllErrors",
    value: function getAllErrors() {
      return {
        field: Object.fromEntries(this.errors.field),
        system: Object.fromEntries(this.errors.system),
        global: _toConsumableArray(this.errors.global)
      };
    }
  }, {
    key: "hasAnyErrors",
    value: function hasAnyErrors() {
      return this.errors.field.size > 0 || this.errors.system.size > 0 || this.errors.global.length > 0;
    }
  }, {
    key: "clearAllErrors",
    value: function clearAllErrors() {
      this.errors.field.clear();
      this.errors.system.clear();
      this.errors.global = [];
      this.notifyListeners({
        type: 'all_errors_cleared'
      });
    }

    // === LISTENER SYSTEM ===
  }, {
    key: "addListener",
    value: function addListener(listener) {
      this.listeners.add(listener);
    }
  }, {
    key: "removeListener",
    value: function removeListener(listener) {
      this.listeners["delete"](listener);
    }
  }, {
    key: "notifyListeners",
    value: function notifyListeners(event) {
      this.listeners.forEach(function (listener) {
        try {
          listener(event);
        } catch (error) {
          console.error('Error in listener:', error);
        }
      });
    }

    // === STATIC METHODS ===
  }], [{
    key: "create",
    value: function create(bookingId) {
      return new ErrorManager(bookingId);
    }
  }]);
}();

// Export singleton instance
var createErrorManager = function createErrorManager(bookingId) {
  return ErrorManager.create(bookingId);
};

/***/ }),

/***/ "./assets/js/public/booking/utils/formStore.js":
/*!*****************************************************!*\
  !*** ./assets/js/public/booking/utils/formStore.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormStore: () => (/* binding */ FormStore),
/* harmony export */   createFormStore: () => (/* binding */ createFormStore),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./assets/js/public/booking/utils/storage.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var FormStore = /*#__PURE__*/function () {
  function FormStore(bookingId) {
    _classCallCheck(this, FormStore);
    this.bookingId = bookingId;
    this.formData = {};
    this.validatedStorage = {};
    this.listeners = new Set();
    this.load_from_storage();
  }
  return _createClass(FormStore, [{
    key: "load_from_storage",
    value: function load_from_storage() {
      var draft = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.loadDraft)(this.bookingId);
      if (draft) {
        this.formData = draft.formData || {};
        this.validatedStorage = _objectSpread({}, this.formData);
      }
    }
  }, {
    key: "save_to_storage",
    value: function save_to_storage(saveData) {
      (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.patchDraft)(this.bookingId, saveData);
    }
  }, {
    key: "publish_change",
    value: function publish_change(fieldName, newValue) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'user';
      this.formData = _objectSpread(_objectSpread({}, this.formData), {}, _defineProperty({}, fieldName, newValue));
      (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.patchDraft)(this.bookingId, {
        formData: this.formData
      });
      this.notify_listeners({
        type: 'field_change',
        fieldName: fieldName,
        newValue: newValue,
        source: source,
        formData: this.formData
      });
      return {
        fieldName: fieldName,
        newValue: newValue,
        source: source,
        formData: this.formData
      };
    }
  }, {
    key: "compare_with_storage",
    value: function compare_with_storage(fieldName, newValue) {
      var storedValue = this.validatedStorage[fieldName];
      var isSame = JSON.stringify(storedValue) === JSON.stringify(newValue);
      return isSame;
    }
  }, {
    key: "update_validated_storage",
    value: function update_validated_storage(fieldName, value) {
      this.validatedStorage = _objectSpread(_objectSpread({}, this.validatedStorage), {}, _defineProperty({}, fieldName, value));
    }
  }, {
    key: "add_listener",
    value: function add_listener(listener) {
      this.listeners.add(listener);
    }
  }, {
    key: "remove_listener",
    value: function remove_listener(listener) {
      this.listeners["delete"](listener);
    }
  }, {
    key: "notify_listeners",
    value: function notify_listeners(event) {
      this.listeners.forEach(function (listener) {
        try {
          listener(event);
        } catch (error) {
          console.error('[FormStore] Listener error:', error);
        }
      });
    }
  }, {
    key: "get_state",
    value: function get_state() {
      return {
        formData: _objectSpread({}, this.formData),
        validatedStorage: _objectSpread({}, this.validatedStorage)
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      this.formData = {};
      this.validatedStorage = {};
      (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.patchDraft)(this.bookingId, {
        formData: {}
      });
      this.notify_listeners({
        type: 'form_reset',
        formData: this.formData
      });
    }
  }]);
}();
var createFormStore = function createFormStore(bookingId) {
  return new FormStore(bookingId);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormStore);

/***/ }),

/***/ "./assets/js/public/booking/utils/mutations.js":
/*!*****************************************************!*\
  !*** ./assets/js/public/booking/utils/mutations.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationManager: () => (/* binding */ MutationManager),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultMutationManager: () => (/* binding */ defaultMutationManager),
/* harmony export */   executeMutation: () => (/* binding */ executeMutation),
/* harmony export */   triggerMutation: () => (/* binding */ triggerMutation),
/* harmony export */   useMutationManager: () => (/* binding */ useMutationManager)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./assets/js/public/booking/utils/storage.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var MUTATION_CONFIG = {
  endpoint: '/graphql',
  defaultDelay: 1000,
  timeout: 10000
};
var MutationManager = /*#__PURE__*/function () {
  function MutationManager() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, MutationManager);
    this.config = _objectSpread(_objectSpread({}, MUTATION_CONFIG), config);
  }
  return _createClass(MutationManager, [{
    key: "trigger_mutation",
    value: function trigger_mutation(field_id, value) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$blockName = options.blockName,
        blockName = _options$blockName === void 0 ? field_id : _options$blockName,
        _options$quoteHash = options.quoteHash,
        quoteHash = _options$quoteHash === void 0 ? '' : _options$quoteHash,
        _options$delay = options.delay,
        delay = _options$delay === void 0 ? this.config.defaultDelay : _options$delay,
        _options$onSuccess = options.onSuccess,
        onSuccess = _options$onSuccess === void 0 ? null : _options$onSuccess,
        _options$onError = options.onError,
        onError = _options$onError === void 0 ? null : _options$onError;
      setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _this.execute_mutation(field_id, value, {
                blockName: blockName,
                quoteHash: quoteHash,
                onSuccess: onSuccess,
                onError: onError
              });
            case 1:
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error("[MutationManager] \u274C Mutation error for field ".concat(field_id, ":"), _t);
              if (onError) onError(_t);
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      })), delay);
    }
  }, {
    key: "execute_mutation",
    value: function () {
      var _execute_mutation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(field_id, value) {
        var options,
          _options$blockName2,
          blockName,
          _options$quoteHash2,
          quoteHash,
          _options$onSuccess2,
          onSuccess,
          _options$onError2,
          onError,
          _loadDraft,
          _result$data,
          mutation_data,
          response,
          result,
          errorMessages,
          _result$data2,
          error,
          _args2 = arguments,
          _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              options = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
              if (options.bookingId) {
                _context2.n = 1;
                break;
              }
              throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Booking ID is required', 'wpcbooking'));
            case 1:
              _options$blockName2 = options.blockName, blockName = _options$blockName2 === void 0 ? field_id : _options$blockName2, _options$quoteHash2 = options.quoteHash, quoteHash = _options$quoteHash2 === void 0 ? '' : _options$quoteHash2, _options$onSuccess2 = options.onSuccess, onSuccess = _options$onSuccess2 === void 0 ? null : _options$onSuccess2, _options$onError2 = options.onError, onError = _options$onError2 === void 0 ? null : _options$onError2;
              _context2.p = 2;
              mutation_data = {
                blockName: blockName,
                blockData: JSON.stringify({
                  booking_id: options.bookingId,
                  field_id: field_id,
                  value: value,
                  quoteData: (_loadDraft = (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.loadDraft)(options.bookingId)) !== null && _loadDraft !== void 0 ? _loadDraft : {},
                  timestamp: new Date().toISOString()
                }),
                quoteHash: quoteHash
              };
              _context2.n = 3;
              return fetch(this.config.endpoint, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: "\n            mutation ValidateAndSaveBlock($blockName: String!, $blockData: String!, $quoteHash: String) {\n              validateAndSaveBlock(input: {\n                blockName: $blockName\n                blockData: $blockData\n                quoteHash: $quoteHash\n              }) {\n                success\n                value\n                errors\n              }\n            }\n          ",
                  variables: mutation_data
                })
              });
            case 3:
              response = _context2.v;
              if (response.ok) {
                _context2.n = 4;
                break;
              }
              throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('HTTP error! status: ${response.status}', 'wpcbooking'));
            case 4:
              _context2.n = 5;
              return response.json();
            case 5:
              result = _context2.v;
              if (!result.errors) {
                _context2.n = 6;
                break;
              }
              errorMessages = result.errors.map(function (err) {
                return err.message;
              });
              if (onError) onError(errorMessages);
              return _context2.a(2);
            case 6:
              if ((_result$data = result.data) !== null && _result$data !== void 0 && (_result$data = _result$data.validateAndSaveBlock) !== null && _result$data !== void 0 && _result$data.success) {
                if (onSuccess) onSuccess(result.data.validateAndSaveBlock);
              } else {
                error = ((_result$data2 = result.data) === null || _result$data2 === void 0 || (_result$data2 = _result$data2.validateAndSaveBlock) === null || _result$data2 === void 0 ? void 0 : _result$data2.errors) || ['Unknown error'];
                console.error("[MutationManager] \u274C Business errors for field ".concat(field_id), {
                  errors: error
                });
                if (onError) onError(error);
              }
              _context2.n = 8;
              break;
            case 7:
              _context2.p = 7;
              _t2 = _context2.v;
              console.error("[MutationManager] \uD83D\uDCA5 Exception during mutation for field ".concat(field_id), _t2);
              if (onError) onError(_t2);
            case 8:
              return _context2.a(2);
          }
        }, _callee2, this, [[2, 7]]);
      }));
      function execute_mutation(_x, _x2) {
        return _execute_mutation.apply(this, arguments);
      }
      return execute_mutation;
    }()
  }], [{
    key: "create",
    value: function create() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new MutationManager(config);
    }
  }]);
}();
var defaultMutationManager = new MutationManager();
var triggerMutation = function triggerMutation(field_id, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return defaultMutationManager.trigger_mutation(field_id, value, options);
};
var executeMutation = function executeMutation(field_id, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return defaultMutationManager.execute_mutation(field_id, value, options);
};
var useMutationManager = function useMutationManager() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var manager = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef)(new MutationManager(config));
  var triggerMutation = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (field_id, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return manager.current.trigger_mutation(field_id, value, options);
  }, []);
  var executeMutation = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (field_id, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return manager.current.execute_mutation(field_id, value, options);
  }, []);
  return {
    manager: manager.current,
    triggerMutation: triggerMutation,
    executeMutation: executeMutation
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MutationManager);

/***/ }),

/***/ "./assets/js/public/booking/utils/storage.js":
/*!***************************************************!*\
  !*** ./assets/js/public/booking/utils/storage.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearDraft: () => (/* binding */ clearDraft),
/* harmony export */   loadDraft: () => (/* binding */ loadDraft),
/* harmony export */   patchDraft: () => (/* binding */ patchDraft),
/* harmony export */   saveDraft: () => (/* binding */ saveDraft)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var VERSION = 1;
var TTL_MS = 24 * 60 * 60 * 1000 * 30;
var key = function key(bookingId) {
  return "bookingDraft:".concat(bookingId);
};
function loadDraft(bookingId) {
  var raw = localStorage.getItem(key(bookingId));
  if (!raw) return null;
  try {
    var snap = JSON.parse(raw);
    if (snap.version !== VERSION || Date.now() - snap.savedAt > TTL_MS) return null;
    return snap;
  } catch (_unused) {
    return null;
  }
}
function saveDraft(draft) {
  localStorage.setItem(key(draft.bookingId), JSON.stringify(draft));
}
function patchDraft(bookingId, partial) {
  var base = loadDraft(bookingId) || {
    version: VERSION,
    bookingId: bookingId,
    savedAt: 0,
    step: 0,
    formData: {}
  };
  var next = _objectSpread(_objectSpread(_objectSpread({}, base), partial), {}, {
    formData: _objectSpread(_objectSpread({}, base.formData), partial.formData || {}),
    savedAt: Date.now()
  });
  saveDraft(next);
}
function clearDraft(bookingId) {
  localStorage.removeItem(key(bookingId));
}

/***/ }),

/***/ "./assets/js/public/booking/utils/summaryQueries.js":
/*!**********************************************************!*\
  !*** ./assets/js/public/booking/utils/summaryQueries.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SUMMARY_MUTATIONS: () => (/* binding */ SUMMARY_MUTATIONS),
/* harmony export */   SUMMARY_QUERIES: () => (/* binding */ SUMMARY_QUERIES),
/* harmony export */   SummaryDataFetcher: () => (/* binding */ SummaryDataFetcher),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   defaultSummaryDataFetcher: () => (/* binding */ defaultSummaryDataFetcher),
/* harmony export */   useSummaryDataFetcher: () => (/* binding */ useSummaryDataFetcher)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./assets/js/public/booking/utils/storage.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * GraphQL queries for summary data
 */
var SUMMARY_QUERIES = {
  // Get summary data for a specific form
  GET_SUMMARY_DATA: "\n    query GetSummaryData($formId: ID!) {\n      form(id: $formId) {\n        id\n        title\n        formOptions {\n          prev\n          next\n          submit\n        }\n        summaryOptions {\n          text\n          label_price\n          label_total\n          send_button_text\n          send_button_icon\n          show_calculations\n          terms\n        }\n        blocks {\n          step\n          data {\n            title\n            label_summary\n            thumbnail_id\n          }\n          innerBlocks {\n            key\n            value\n            price\n            price_increase {\n              operation\n              price_increase\n            }\n            inputs {\n              name\n              value\n            }\n            render_data\n          }\n          price_step\n          value_step\n          item_output\n        }\n        quote {\n          id\n          currency\n          total_base\n          total_quote\n          shipping_total\n          cart_total\n        }\n      }\n    }\n  ",
  // Get quote data by hash
  GET_QUOTE_BY_HASH: "\n    query GetQuoteByHash($quoteHash: String!) {\n      quoteByHash(hash: $quoteHash) {\n        id\n        currency\n        total_base\n        total_quote\n        shipping_total\n        cart_total\n        form_id\n        blocks {\n          step\n          data {\n            title\n            label_summary\n            thumbnail_id\n          }\n          innerBlocks {\n            key\n            value\n            price\n            price_increase {\n              operation\n              price_increase\n            }\n            inputs {\n              name\n              value\n            }\n            render_data\n          }\n          price_step\n          value_step\n          item_output\n        }\n      }\n    }\n  ",
  // Get form options
  GET_FORM_OPTIONS: "\n    query GetFormOptions($formId: ID!) {\n      form(id: $formId) {\n        id\n        formOptions {\n          prev\n          next\n          submit\n        }\n      }\n    }\n  ",
  // Get summary options
  GET_SUMMARY_OPTIONS: "\n    query GetSummaryOptions($formId: ID!) {\n      form(id: $formId) {\n        id\n        summaryOptions {\n          text\n          label_price\n          label_total\n          send_button_text\n          send_button_icon\n          show_calculations\n          terms\n        }\n      }\n    }\n  ",
  // Get blocks data
  GET_BLOCKS_DATA: "\n    query GetBlocksData($formId: ID!) {\n      form(id: $formId) {\n        id\n        blocks {\n          step\n          data {\n            title\n            label_summary\n            thumbnail_id\n          }\n          innerBlocks {\n            key\n            value\n            price\n            price_increase {\n              operation\n              price_increase\n            }\n            inputs {\n              name\n              value\n            }\n            render_data\n          }\n          price_step\n          value_step\n          item_output\n        }\n      }\n    }\n  ",
  // Get currency information
  GET_CURRENCY_INFO: "\n    query GetCurrencyInfo($quoteId: ID!) {\n      quote(id: $quoteId) {\n        id\n        currency\n        currency_symbol\n        currency_code\n      }\n    }\n  "
};

/**
 * GraphQL mutations for summary data
 */
var SUMMARY_MUTATIONS = {
  // Update quote data
  UPDATE_QUOTE_DATA: "\n    mutation UpdateQuoteData($quoteId: ID!, $data: QuoteDataInput!) {\n      updateQuote(id: $quoteId, data: $data) {\n        success\n        quote {\n          id\n          total_quote\n          total_base\n          shipping_total\n          cart_total\n        }\n        errors\n      }\n    }\n  ",
  // Submit order
  SUBMIT_ORDER: "\n    mutation SubmitQuote($input: SubmitQuoteInput!) {\n      submitQuote(input: $input) {\n        success\n        quote_id\n        errors\n      }\n    }\n  "
};

/**
 * Summary data fetcher class
 */
var SummaryDataFetcher = /*#__PURE__*/function () {
  function SummaryDataFetcher() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, SummaryDataFetcher);
    this.config = _objectSpread({
      endpoint: "/graphql",
      timeout: 10000
    }, config);
    this.bookingId = config.bookingId || null;
    this.quoteHash = config.quoteHash || null;
    this.errorManager = config.errorManager || null;
  }
  /**
   * Execute GraphQL query
   */
  return _createClass(SummaryDataFetcher, [{
    key: "executeQuery",
    value: (function () {
      var _executeQuery = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(query) {
        var variables,
          queryName,
          requestBody,
          response,
          result,
          errorMessages,
          graphqlError,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              variables = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              queryName = query.trim().split(/\s+/)[1] || "Unknown";
              _context.p = 1;
              requestBody = {
                query: query,
                variables: variables
              };
              _context.n = 2;
              return fetch(this.config.endpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
              });
            case 2:
              response = _context.v;
              if (response.ok) {
                _context.n = 3;
                break;
              }
              console.error("\u274C [SummaryDataFetcher] HTTP error! status: ".concat(response.status));
              throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("HTTP error! status: ${response.status}", "wpcbooking"));
            case 3:
              _context.n = 4;
              return response.json();
            case 4:
              result = _context.v;
              if (!result.errors) {
                _context.n = 5;
                break;
              }
              console.log("🔍 [SummaryDataFetcher] result: ", result);
              errorMessages = result.errors.map(function (err) {
                return err.message;
              });
              console.error("\u274C [SummaryDataFetcher] GraphQL errors:", result.errors);
              graphqlError = new Error(errorMessages.join(", "));
              graphqlError.graphqlErrors = result.errors;
              throw graphqlError;
            case 5:
              return _context.a(2, result.data);
            case 6:
              _context.p = 6;
              _t = _context.v;
              console.error("\u274C [SummaryDataFetcher] Query execution failed:", _t);
              console.error("\u274C [SummaryDataFetcher] Error stack:", _t.stack);
              throw _t;
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[1, 6]]);
      }));
      function executeQuery(_x) {
        return _executeQuery.apply(this, arguments);
      }
      return executeQuery;
    }()
    /**
     * Get complete summary data
     */
    )
  }, {
    key: "getSummaryData",
    value: (function () {
      var _getSummaryData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(formId) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.executeQuery(SUMMARY_QUERIES.GET_SUMMARY_DATA, {
                formId: formId
              });
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2, this);
      }));
      function getSummaryData(_x2) {
        return _getSummaryData.apply(this, arguments);
      }
      return getSummaryData;
    }()
    /**
     * Get quote data by hash
     */
    )
  }, {
    key: "getQuoteByHash",
    value: (function () {
      var _getQuoteByHash = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(quoteHash) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.executeQuery(SUMMARY_QUERIES.GET_QUOTE_BY_HASH, {
                quoteHash: quoteHash
              });
            case 1:
              return _context3.a(2, _context3.v);
          }
        }, _callee3, this);
      }));
      function getQuoteByHash(_x3) {
        return _getQuoteByHash.apply(this, arguments);
      }
      return getQuoteByHash;
    }()
    /**
     * Get form options
     */
    )
  }, {
    key: "getFormOptions",
    value: (function () {
      var _getFormOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(formId) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.executeQuery(SUMMARY_QUERIES.GET_FORM_OPTIONS, {
                formId: formId
              });
            case 1:
              return _context4.a(2, _context4.v);
          }
        }, _callee4, this);
      }));
      function getFormOptions(_x4) {
        return _getFormOptions.apply(this, arguments);
      }
      return getFormOptions;
    }()
    /**
     * Get summary options
     */
    )
  }, {
    key: "getSummaryOptions",
    value: (function () {
      var _getSummaryOptions = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(formId) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.executeQuery(SUMMARY_QUERIES.GET_SUMMARY_OPTIONS, {
                formId: formId
              });
            case 1:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, this);
      }));
      function getSummaryOptions(_x5) {
        return _getSummaryOptions.apply(this, arguments);
      }
      return getSummaryOptions;
    }()
    /**
     * Get blocks data
     */
    )
  }, {
    key: "getBlocksData",
    value: (function () {
      var _getBlocksData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(formId) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.executeQuery(SUMMARY_QUERIES.GET_BLOCKS_DATA, {
                formId: formId
              });
            case 1:
              return _context6.a(2, _context6.v);
          }
        }, _callee6, this);
      }));
      function getBlocksData(_x6) {
        return _getBlocksData.apply(this, arguments);
      }
      return getBlocksData;
    }()
    /**
     * Get currency information
     */
    )
  }, {
    key: "getCurrencyInfo",
    value: (function () {
      var _getCurrencyInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(quoteId) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.executeQuery(SUMMARY_QUERIES.GET_CURRENCY_INFO, {
                quoteId: quoteId
              });
            case 1:
              return _context7.a(2, _context7.v);
          }
        }, _callee7, this);
      }));
      function getCurrencyInfo(_x7) {
        return _getCurrencyInfo.apply(this, arguments);
      }
      return getCurrencyInfo;
    }()
    /**
     * Update quote data
     */
    )
  }, {
    key: "updateQuoteData",
    value: (function () {
      var _updateQuoteData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(quoteId, data) {
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              _context8.n = 1;
              return this.executeQuery(SUMMARY_MUTATIONS.UPDATE_QUOTE_DATA, {
                quoteId: quoteId,
                data: data
              });
            case 1:
              return _context8.a(2, _context8.v);
          }
        }, _callee8, this);
      }));
      function updateQuoteData(_x8, _x9) {
        return _updateQuoteData.apply(this, arguments);
      }
      return updateQuoteData;
    }()
    /**
     * Parse summary data JSON string
     * @param {string} summaryDataString - JSON string to parse
     * @returns {Object|null} Parsed data or null if parsing fails
     */
    )
  }, {
    key: "parseSummaryData",
    value: function parseSummaryData(summaryDataString) {
      if (!summaryDataString) {
        console.log("📦 [saveStep] No summaryData to parse");
        return null;
      }
      try {
        var parsed = JSON.parse(summaryDataString);
        console.log("✅ [saveStep] Parsed summaryData successfully");
        return parsed;
      } catch (e) {
        console.error("❌ [saveStep] Failed to parse summaryData:", e);
        return null;
      }
    }

    /**
     * Extract total price from parsed summary data
     * @param {Object} parsedSummaryData - Parsed summary data object
     * @returns {number} Total price or 0 if not available
     */
  }, {
    key: "extractTotalPrice",
    value: function extractTotalPrice(parsedSummaryData) {
      if (!parsedSummaryData || parsedSummaryData.total_price === undefined) {
        console.log("📦 [saveStep] No total_price in summaryData");
        return 0;
      }
      var totalPrice = parseFloat(parsedSummaryData.total_price) || 0;
      console.log("\uD83D\uDCB0 [saveStep] Extracted total_price: ".concat(totalPrice));
      return totalPrice;
    }

    /**
     * Build draft data object for storage
     * @param {number} step - Step number
     * @param {Object} formData - Form data
     * @param {Object|null} parsedSummaryData - Parsed summary data
     * @param {Object} saveStepResult - Save step result from backend
     * @returns {Object} Draft data object
     */
  }, {
    key: "buildDraftData",
    value: function buildDraftData(step, formData, parsedSummaryData, saveStepResult) {
      var draftData = {
        step: step,
        formData: formData
      };
      if (parsedSummaryData) {
        draftData.summaryData = parsedSummaryData.summary_data;
      } else if (saveStepResult.summaryData) {
        // Fallback to raw summaryData if parsing failed
        draftData.summaryData = saveStepResult.summaryData;
      }
      return draftData;
    }

    /**
     * Process successful save step result
     * @param {Object} saveStepResult - Save step result from backend
     * @param {number} step - Step number
     * @param {Object} formData - Form data
     * @returns {Promise<Object>} Processed result with products and total_price
     */
  }, {
    key: "processSaveStepSuccess",
    value: (function () {
      var _processSaveStepSuccess = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(saveStepResult, step, formData) {
        var parsedSummaryData, products, total_price, draftData, result;
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              parsedSummaryData = this.parseSummaryData(saveStepResult.summaryData);
              products = {};
              total_price = 0;
              if (parsedSummaryData) {
                if (parsedSummaryData.products && Array.isArray(parsedSummaryData.products)) {
                  products = parsedSummaryData.products;
                }
                total_price = this.extractTotalPrice(parsedSummaryData);
              }

              // Build draft data
              draftData = this.buildDraftData(step, formData, parsedSummaryData, saveStepResult); // Save draft
              _context9.n = 1;
              return (0,_storage_js__WEBPACK_IMPORTED_MODULE_1__.patchDraft)(this.bookingId, draftData);
            case 1:
              result = {
                success: true,
                data: saveStepResult,
                products: products,
                total_price: total_price
              };
              return _context9.a(2, result);
          }
        }, _callee9, this);
      }));
      function processSaveStepSuccess(_x0, _x1, _x10) {
        return _processSaveStepSuccess.apply(this, arguments);
      }
      return processSaveStepSuccess;
    }()
    /**
     * Save step with full error handling and draft storage
     * Universal method that handles all error types and returns complete result
     *
     * @param {number} step - Step number to save
     * @param {Object} formData - Form data to save
     * @param {Object} options - Additional options
     * @param {boolean} options.autoHandleErrors - Automatically add errors to errorManager (default: true)
     * @returns {Promise<{success: boolean, errors?: Object|Array, data?: Object}>}
     */
    )
  }, {
    key: "saveStep",
    value: (function () {
      var _saveStep = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(step, formData) {
        var _this = this;
        var options,
          _options$autoHandleEr,
          autoHandleErrors,
          _result$data,
          formDataString,
          variables,
          requestBody,
          response,
          result,
          errorMessages,
          httpError,
          saveStepResult,
          _result$data2,
          errors,
          _args0 = arguments,
          _t2;
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              options = _args0.length > 2 && _args0[2] !== undefined ? _args0[2] : {};
              _options$autoHandleEr = options.autoHandleErrors, autoHandleErrors = _options$autoHandleEr === void 0 ? true : _options$autoHandleEr;
              console.log("\uD83D\uDCE4 [saveStep] Starting save for step ".concat(step));
              _context0.p = 1;
              formDataString = JSON.stringify(formData);
              variables = {
                bookingId: this.bookingId,
                step: step,
                formData: formDataString,
                quoteHash: this.quoteHash || null
              };
              requestBody = {
                query: "\n          mutation SaveStep($bookingId: String!, $step: Int!, $formData: String!, $quoteHash: String) {\n            saveStep(input: {\n              bookingId: $bookingId\n              step: $step\n              formData: $formData\n              quoteHash: $quoteHash\n              }) {\n              success\n              summaryData\n              errors\n            }\n          }\n        ",
                variables: variables
              };
              _context0.n = 2;
              return fetch(this.config.endpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
              });
            case 2:
              response = _context0.v;
              _context0.n = 3;
              return response.json();
            case 3:
              result = _context0.v;
              if (!result.errors) {
                _context0.n = 4;
                break;
              }
              console.error("🔴 [SummaryDataFetcher.saveStep] GraphQL errors:", result.errors);
              errorMessages = result.errors.map(function (err) {
                return err.message;
              });
              if (autoHandleErrors && this.errorManager) {
                this.errorManager.addGlobalError({
                  message: errorMessages.join(", "),
                  type: "error"
                });
              }
              return _context0.a(2, {
                success: false,
                errors: errorMessages
              });
            case 4:
              if (response.ok) {
                _context0.n = 5;
                break;
              }
              console.error("🔴 [SummaryDataFetcher.saveStep] HTTP error! status:", response.status);
              httpError = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("HTTP error! status: ${response.status}", "wpcbooking");
              if (autoHandleErrors && this.errorManager) {
                this.errorManager.addGlobalError({
                  message: httpError,
                  type: "error"
                });
              }
              return _context0.a(2, {
                success: false,
                errors: [httpError]
              });
            case 5:
              if (!((_result$data = result.data) !== null && _result$data !== void 0 && (_result$data = _result$data.saveStep) !== null && _result$data !== void 0 && _result$data.success)) {
                _context0.n = 7;
                break;
              }
              saveStepResult = result.data.saveStep;
              _context0.n = 6;
              return this.processSaveStepSuccess(saveStepResult, step, formData);
            case 6:
              return _context0.a(2, _context0.v);
            case 7:
              console.error("🔴 [SummaryDataFetcher.saveStep] Mutation returned success: false");
              errors = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Unknown error occurred", "wpcbooking")];
              if ((_result$data2 = result.data) !== null && _result$data2 !== void 0 && (_result$data2 = _result$data2.saveStep) !== null && _result$data2 !== void 0 && _result$data2.errors) {
                try {
                  errors = JSON.parse(result.data.saveStep.errors);
                } catch (e) {
                  errors = [result.data.saveStep.errors];
                }
              }
              console.error("🔴 [SummaryDataFetcher.saveStep] Errors:", errors);
              if (autoHandleErrors && this.errorManager) {
                if (_typeof(errors) === "object" && !Array.isArray(errors)) {
                  Object.keys(errors).forEach(function (fieldId) {
                    var errorMessage = errors[fieldId];
                    var message = Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage;
                    _this.errorManager.setFieldError(fieldId, message);
                  });
                } else if (Array.isArray(errors)) {
                  this.errorManager.addGlobalError({
                    message: errors.join(", "),
                    type: "error"
                  });
                }
              }
              return _context0.a(2, {
                success: false,
                errors: errors
              });
            case 8:
              _context0.n = 10;
              break;
            case 9:
              _context0.p = 9;
              _t2 = _context0.v;
              console.error("🔴 [SummaryDataFetcher.saveStep] Exception:", _t2);
              console.error("🔴 [SummaryDataFetcher.saveStep] Error stack:", _t2.stack);
              if (autoHandleErrors && this.errorManager) {
                this.errorManager.addGlobalError({
                  message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Error saving step. Please try again.", "wpcbooking"),
                  type: "error"
                });
              }
              return _context0.a(2, {
                success: false,
                errors: [_t2.message]
              });
          }
        }, _callee0, this, [[1, 9]]);
      }));
      function saveStep(_x11, _x12) {
        return _saveStep.apply(this, arguments);
      }
      return saveStep;
    }()
    /**
     * Submit order
     */
    )
  }, {
    key: "submitQuote",
    value: (function () {
      var _submitQuote = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(quoteHash, bookingId, termsConditions) {
        var formData,
          input,
          result,
          _args1 = arguments;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              formData = _args1.length > 3 && _args1[3] !== undefined ? _args1[3] : null;
              input = {
                quoteHash: quoteHash,
                bookingId: bookingId,
                termsConditions: termsConditions
              };
              if (formData) {
                input.formData = JSON.stringify(formData);
              }
              _context1.n = 1;
              return this.executeQuery(SUMMARY_MUTATIONS.SUBMIT_ORDER, {
                input: input
              });
            case 1:
              result = _context1.v;
              return _context1.a(2, result);
          }
        }, _callee1, this);
      }));
      function submitQuote(_x13, _x14, _x15) {
        return _submitQuote.apply(this, arguments);
      }
      return submitQuote;
    }())
  }, {
    key: "submit_quote_and_process",
    value: function () {
      var _submit_quote_and_process = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(quote_hash, booking_id, terms_conditions, form_data, summary_options, general) {
        var _submit_result$submit, submit_result, _general$group_thanky, _general$group_thanky2, _general$group_thanky3, _general$group_thanky4, _general$group_thanky5, _submit_result$submit2, errors, _errors, _t3;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              _context10.p = 0;
              _context10.n = 1;
              return this.submitQuote(quote_hash, booking_id, terms_conditions, form_data);
            case 1:
              submit_result = _context10.v;
              if (!((submit_result === null || submit_result === void 0 || (_submit_result$submit = submit_result.submitQuote) === null || _submit_result$submit === void 0 ? void 0 : _submit_result$submit.success) === true)) {
                _context10.n = 2;
                break;
              }
              return _context10.a(2, {
                success: true,
                order_data: {
                  quote_id: submit_result.submitQuote.quote_id,
                  heading: summary_options.thankyou_heading || (general === null || general === void 0 || (_general$group_thanky = general.group_thankyou) === null || _general$group_thanky === void 0 ? void 0 : _general$group_thanky.heading),
                  text: summary_options.thankyou_text || (general === null || general === void 0 || (_general$group_thanky2 = general.group_thankyou) === null || _general$group_thanky2 === void 0 ? void 0 : _general$group_thanky2.text),
                  background_image: summary_options.thankyou_image || (general === null || general === void 0 || (_general$group_thanky3 = general.group_thankyou) === null || _general$group_thanky3 === void 0 ? void 0 : _general$group_thanky3.image_id),
                  button_link: summary_options.thankyou_button_link || (general === null || general === void 0 || (_general$group_thanky4 = general.group_thankyou) === null || _general$group_thanky4 === void 0 ? void 0 : _general$group_thanky4.button_link),
                  button_label: summary_options.thankyou_button_label || (general === null || general === void 0 || (_general$group_thanky5 = general.group_thankyou) === null || _general$group_thanky5 === void 0 ? void 0 : _general$group_thanky5.button_label)
                },
                errors: null
              });
            case 2:
              console.error("❌ [SummaryDataFetcher] submit_quote_and_process: ", submit_result);
              errors = (submit_result === null || submit_result === void 0 || (_submit_result$submit2 = submit_result.submitQuote) === null || _submit_result$submit2 === void 0 ? void 0 : _submit_result$submit2.errors) || [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Order submission failed", "wpcbooking")];
              return _context10.a(2, {
                success: false,
                order_data: null,
                errors: Array.isArray(errors) ? errors : [errors]
              });
            case 3:
              _context10.n = 5;
              break;
            case 4:
              _context10.p = 4;
              _t3 = _context10.v;
              console.error("❌ [SummaryDataFetcher] submit_quote_and_process error: ", _t3);
              _errors = _t3.graphqlErrors ? _t3.graphqlErrors.map(function (err) {
                return err.message;
              }) : [_t3.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Order submission failed", "wpcbooking")];
              return _context10.a(2, {
                success: false,
                order_data: null,
                errors: _errors
              });
          }
        }, _callee10, this, [[0, 4]]);
      }));
      function submit_quote_and_process(_x16, _x17, _x18, _x19, _x20, _x21) {
        return _submit_quote_and_process.apply(this, arguments);
      }
      return submit_quote_and_process;
    }()
  }]);
}();

/**
 * Default summary data fetcher instance
 */
var defaultSummaryDataFetcher = new SummaryDataFetcher();

/**
 * Hook for using summary data fetcher
 */
var useSummaryDataFetcher = function useSummaryDataFetcher() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new SummaryDataFetcher(config);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SummaryDataFetcher);

/***/ }),

/***/ "./assets/js/public/booking/utils/user.js":
/*!************************************************!*\
  !*** ./assets/js/public/booking/utils/user.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UserManager = /*#__PURE__*/_createClass(function UserManager(BookingFormManager) {
  var _this = this;
  _classCallCheck(this, UserManager);
  _defineProperty(this, "setData", function (userData) {
    _this.userData = userData;
    _this.BookingFormManager.save_draft({
      user: userData
    });
  });
  _defineProperty(this, "getData", function () {
    var draft = _this.BookingFormManager.get_draft();
    if (draft && draft.user) {
      _this.userData = draft.user;
      return draft.user;
    }
    return _this.userData;
  });
  _defineProperty(this, "get", function (key) {
    return _this.getData()[key];
  });
  _defineProperty(this, "set", function (key, value) {
    var userData = _this.getData();
    userData[key] = value;
    _this.setData(userData);
  });
  this.BookingFormManager = BookingFormManager;
  this.bookingID = this.BookingFormManager.getBookingId();
  this.userData = {};
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserManager);

/***/ }),

/***/ "./assets/js/public/booking/utils/validationOrchestrator.js":
/*!******************************************************************!*\
  !*** ./assets/js/public/booking/utils/validationOrchestrator.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ValidationOrchestrator: () => (/* binding */ ValidationOrchestrator),
/* harmony export */   createValidationOrchestrator: () => (/* binding */ createValidationOrchestrator),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _formStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formStore.js */ "./assets/js/public/booking/utils/formStore.js");
/* harmony import */ var _mutations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutations.js */ "./assets/js/public/booking/utils/mutations.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (c = i[4] || 3, u = i[5] === e ? i[3] : i[5], i[4] = 3, i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var ValidationOrchestrator = /*#__PURE__*/function () {
  function ValidationOrchestrator(bookingId, quoteHash, errorManager) {
    var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _classCallCheck(this, ValidationOrchestrator);
    this.bookingId = bookingId;
    this.formStore = new _formStore_js__WEBPACK_IMPORTED_MODULE_0__.FormStore(bookingId);
    this.errorManager = errorManager;
    this.config = _objectSpread({
      debounceDelay: 1000,
      batchDelay: 100,
      maxBatchSize: 10,
      bookingId: bookingId,
      quoteHash: quoteHash
    }, config);
    this.validationQueue = [];
    this.batchQueue = [];
    this.debounceTimers = new Map();
    this.batchTimer = null;
    this.validationResultCallback = null; // Callback pro notifikaci výsledků validace
    this.cartUpdateCallback = null; // Callback pro aktualizaci dat košíku
    this.stats = {
      totalValidations: 0,
      successfulValidations: 0,
      failedValidations: 0,
      skippedValidations: 0
    };
  }
  return _createClass(ValidationOrchestrator, [{
    key: "handle_input_change",
    value: function handle_input_change(fieldName, newValue) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'user';
      var changeEvent = this.formStore.publish_change(fieldName, newValue, source);
      var isSameAsStorage = this.formStore.compare_with_storage(fieldName, newValue);
      if (isSameAsStorage) {
        this.stats.skippedValidations++;
        return;
      }
      if (source === 'user') {
        this.handle_user_change(fieldName, newValue);
      } else {
        this.handle_program_change(fieldName, newValue);
      }
    }
  }, {
    key: "handle_user_change",
    value: function handle_user_change(fieldName, newValue) {
      var _this = this;
      if (this.debounceTimers.has(fieldName)) {
        clearTimeout(this.debounceTimers.get(fieldName));
      }
      var timer = setTimeout(function () {
        _this.validate_single_field(fieldName, newValue);
        _this.debounceTimers["delete"](fieldName);
      }, this.config.debounceDelay);
      this.debounceTimers.set(fieldName, timer);
    }
  }, {
    key: "handle_program_change",
    value: function handle_program_change(fieldName, newValue) {
      var _this2 = this;
      this.batchQueue.push({
        fieldName: fieldName,
        newValue: newValue
      });
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
      }
      this.batchTimer = setTimeout(function () {
        _this2.validate_batch_fields();
        _this2.batchTimer = null;
      }, this.config.batchDelay);
    }
  }, {
    key: "validate_single_field",
    value: function () {
      var _validate_single_field = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(fieldName, value) {
        var result, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.p = 0;
              this.stats.totalValidations++;
              _context.n = 1;
              return this.execute_graphql_validation(fieldName, value);
            case 1:
              result = _context.v;
              if (result.success) {
                this.handle_validation_success(fieldName, value);
                this.handle_cart_update(fieldName, result);
              } else {
                this.handle_validation_error(fieldName, result.errors);
              }
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error("\uD83D\uDCA5 [ValidationOrchestrator] Exception during validation ".concat(fieldName, ":"), _t);
              this.handle_validation_error(fieldName, _t);
            case 3:
              return _context.a(2);
          }
        }, _callee, this, [[0, 2]]);
      }));
      function validate_single_field(_x, _x2) {
        return _validate_single_field.apply(this, arguments);
      }
      return validate_single_field;
    }()
  }, {
    key: "validate_batch_fields",
    value: function () {
      var _validate_batch_fields = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this3 = this;
        var batch, results, _iterator, _step, _step$value, fieldName, value, _t2, _t3, _t4;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(this.batchQueue.length === 0)) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              batch = this.batchQueue.splice(0, this.config.maxBatchSize);
              _context2.p = 2;
              this.stats.totalValidations += batch.length;
              _context2.n = 3;
              return this.execute_batch_graphql_validation(batch);
            case 3:
              results = _context2.v;
              results.forEach(function (result, index) {
                var _batch$index = batch[index],
                  fieldName = _batch$index.fieldName,
                  value = _batch$index.value;
                if (result.success) {
                  _this3.handle_validation_success(fieldName, value);
                  _this3.handle_cart_update(fieldName, result);
                } else {
                  _this3.handle_validation_error(fieldName, result.errors);
                }
              });
              _context2.n = 14;
              break;
            case 4:
              _context2.p = 4;
              _t2 = _context2.v;
              console.error("[ValidationOrchestrator] \uD83D\uDCD5 Batch threw", _t2);
              _iterator = _createForOfIteratorHelper(batch);
              _context2.p = 5;
              _iterator.s();
            case 6:
              if ((_step = _iterator.n()).done) {
                _context2.n = 11;
                break;
              }
              _step$value = _step.value, fieldName = _step$value.fieldName, value = _step$value.value;
              _context2.p = 7;
              _context2.n = 8;
              return this.validate_single_field(fieldName, value);
            case 8:
              _context2.n = 10;
              break;
            case 9:
              _context2.p = 9;
              _t3 = _context2.v;
              this.handle_validation_error(fieldName, _t3);
            case 10:
              _context2.n = 6;
              break;
            case 11:
              _context2.n = 13;
              break;
            case 12:
              _context2.p = 12;
              _t4 = _context2.v;
              _iterator.e(_t4);
            case 13:
              _context2.p = 13;
              _iterator.f();
              return _context2.f(13);
            case 14:
              return _context2.a(2);
          }
        }, _callee2, this, [[7, 9], [5, 12, 13, 14], [2, 4]]);
      }));
      function validate_batch_fields() {
        return _validate_batch_fields.apply(this, arguments);
      }
      return validate_batch_fields;
    }()
  }, {
    key: "execute_graphql_validation",
    value: function () {
      var _execute_graphql_validation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(fieldName, value) {
        var _this4 = this;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              return _context3.a(2, new Promise(function (resolve, reject) {
                (0,_mutations_js__WEBPACK_IMPORTED_MODULE_1__.executeMutation)(fieldName, value, {
                  bookingId: _this4.config.bookingId,
                  quoteHash: _this4.config.quoteHash,
                  onSuccess: function onSuccess(result) {
                    resolve(result);
                  },
                  onError: function onError(error) {
                    reject(error);
                  }
                });
              }));
          }
        }, _callee3);
      }));
      function execute_graphql_validation(_x3, _x4) {
        return _execute_graphql_validation.apply(this, arguments);
      }
      return execute_graphql_validation;
    }()
  }, {
    key: "execute_batch_graphql_validation",
    value: function () {
      var _execute_batch_graphql_validation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(batch) {
        var _this5 = this;
        var promises;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              promises = batch.map(function (_ref) {
                var fieldName = _ref.fieldName,
                  value = _ref.value;
                return _this5.execute_graphql_validation(fieldName, value);
              });
              return _context4.a(2, Promise.all(promises));
          }
        }, _callee4);
      }));
      function execute_batch_graphql_validation(_x5) {
        return _execute_batch_graphql_validation.apply(this, arguments);
      }
      return execute_batch_graphql_validation;
    }()
  }, {
    key: "handle_validation_success",
    value: function handle_validation_success(fieldName, value) {
      this.errorManager.clearFieldError(fieldName);
      this.formStore.update_validated_storage(fieldName, value);
      this.stats.successfulValidations++;

      // Notify validation manager to update field validity
      this.notify_validation_result(fieldName, true);
    }
  }, {
    key: "handle_validation_error",
    value: function handle_validation_error(fieldName, errors) {
      var errorMessage;
      if (Array.isArray(errors)) {
        errorMessage = errors.join(', ');
      } else if (typeof errors === 'string') {
        errorMessage = errors;
      } else if (errors && errors.message) {
        errorMessage = errors.message;
      } else {
        errorMessage = 'Validation failed';
      }
      this.errorManager.setFieldError(fieldName, errorMessage);
      this.stats.failedValidations++;

      // Notify validation manager to update field validity
      this.notify_validation_result(fieldName, false);
    }
  }, {
    key: "notify_validation_result",
    value: function notify_validation_result(fieldName, isValid) {
      // This will be called by validation manager to update field validity
      if (this.validationResultCallback) {
        this.validationResultCallback(fieldName, isValid);
      } else {
        console.warn('⚠️ [ValidationOrchestrator] Callback není nastaven!');
      }
    }
  }, {
    key: "setValidationResultCallback",
    value: function setValidationResultCallback(callback) {
      this.validationResultCallback = callback;
    }
  }, {
    key: "setCartUpdateCallback",
    value: function setCartUpdateCallback(callback) {
      this.cartUpdateCallback = callback;
    }
  }, {
    key: "handle_cart_update",
    value: function handle_cart_update(fieldName, result) {
      if (this.cartUpdateCallback) {
        this.cartUpdateCallback(fieldName, result);
      } else {
        console.warn('⚠️ [ValidationOrchestrator] Cart update callback není nastaven!');
      }
    }
  }, {
    key: "get_form_store",
    value: function get_form_store() {
      return this.formStore;
    }
  }, {
    key: "get_error_manager",
    value: function get_error_manager() {
      return this.errorManager;
    }
  }, {
    key: "get_stats",
    value: function get_stats() {
      return _objectSpread({}, this.stats);
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      this.debounceTimers.forEach(function (timer) {
        return clearTimeout(timer);
      });
      this.debounceTimers.clear();
      if (this.batchTimer) {
        clearTimeout(this.batchTimer);
        this.batchTimer = null;
      }
      this.validationQueue = [];
      this.batchQueue = [];
      this.errorManager.clearAllErrors();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cleanup();
      this.formStore.reset();
      this.errorManager.clearAllErrors();
      this.stats = {
        totalValidations: 0,
        successfulValidations: 0,
        failedValidations: 0,
        skippedValidations: 0
      };
    }
  }]);
}();
var createValidationOrchestrator = function createValidationOrchestrator(bookingId) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new ValidationOrchestrator(bookingId, config);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValidationOrchestrator);

/***/ }),

/***/ "./assets/js/utils/cart.js":
/*!*********************************!*\
  !*** ./assets/js/utils/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getCartManager: () => (/* binding */ getCartManager),
/* harmony export */   resetCartManager: () => (/* binding */ resetCartManager)
/* harmony export */ });
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CartManager = /*#__PURE__*/_createClass(function CartManager() {
  var _this = this,
    _window$wpcbooking_pu;
  var dataManager = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  _classCallCheck(this, CartManager);
  // === SUBSCRIBERS ===
  _defineProperty(this, "subscribe", function (callback) {
    _this.subscribers.push(callback);
    return function () {
      _this.subscribers = _this.subscribers.filter(function (cb) {
        return cb !== callback;
      });
    };
  });
  _defineProperty(this, "notify_subscribers", function () {
    if (_this.is_calculating) return;
    var totals = _this.getTotals();
    _this.subscribers.forEach(function (cb) {
      try {
        cb(totals);
      } catch (e) {
        console.error('[CartManager] Subscriber error:', e);
      }
    });
  });
  // === DATA ===
  _defineProperty(this, "setData", function (cartData) {
    var _this$dataManager;
    _this.cartData = cartData;
    if ((_this$dataManager = _this.dataManager) !== null && _this$dataManager !== void 0 && _this$dataManager.save_draft) {
      _this.dataManager.save_draft({
        cart: cartData
      });
    }
    _this.notify_subscribers();
  });
  _defineProperty(this, "getData", function () {
    var _this$dataManager2;
    if ((_this$dataManager2 = _this.dataManager) !== null && _this$dataManager2 !== void 0 && _this$dataManager2.get_draft) {
      var draft = _this.dataManager.get_draft();
      if (draft && draft.cart) {
        _this.cartData = draft.cart;
        return draft.cart;
      }
    }
    return _this.cartData;
  });
  _defineProperty(this, "get", function (key) {
    return _this.getData()[key];
  });
  _defineProperty(this, "set", function (key, value) {
    var cartData = _this.getData();
    cartData[key] = value;
    _this.setData(cartData);
  });
  // === PRODUCTS ===
  _defineProperty(this, "addProduct", function (product_id) {
    var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var variation_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var variation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var cart_item_data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var price = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var cartData = _this.getData();
    if (!cartData.items) {
      cartData.items = [];
    }
    var cart_item_key = _this._generateCartItemKey(product_id, variation_id, variation, cart_item_data);
    var existingIndex = cartData.items.findIndex(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (existingIndex !== -1) {
      cartData.items[existingIndex].quantity += quantity;
    } else {
      var _cart_item_data$row;
      var new_item = {
        cart_item_key: cart_item_key,
        product_id: product_id,
        quantity: quantity,
        variation_id: variation_id,
        variation: variation,
        cart_item_data: cart_item_data,
        price: price,
        price_type: cart_item_data.price_type || 'value',
        percentage_value: cart_item_data.percentage_value || 0,
        percentage_operation: cart_item_data.percentage_operation || 'add',
        linked_field_id: cart_item_data.linked_field_id || null,
        table_data: cart_item_data.table_data || null,
        field_id: cart_item_data.field_id || null,
        row: (_cart_item_data$row = cart_item_data.row) !== null && _cart_item_data$row !== void 0 ? _cart_item_data$row : null,
        name: cart_item_data.name || '',
        step: cart_item_data.step || null,
        added_at: Date.now()
      };
      cartData.items.push(new_item);
    }
    _this.setData(cartData);
    _this.recalculateTotals();
    return cart_item_key;
  });
  _defineProperty(this, "getProduct", function (cart_item_key) {
    var cartData = _this.getData();
    if (!cartData.items) return null;
    return cartData.items.find(function (item) {
      return item.cart_item_key === cart_item_key;
    }) || null;
  });
  _defineProperty(this, "getProducts", function () {
    var cartData = _this.getData();
    return cartData.items || [];
  });
  _defineProperty(this, "removeProduct", function (cart_item_key) {
    var cartData = _this.getData();
    if (!cartData.items) return false;
    var index = cartData.items.findIndex(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (index !== -1) {
      cartData.items.splice(index, 1);
      _this.setData(cartData);
      _this.recalculateTotals();
      return true;
    }
    return false;
  });
  _defineProperty(this, "deleteProduct", function (cart_item_key) {
    return _this.removeProduct(cart_item_key);
  });
  _defineProperty(this, "updateQuantity", function (cart_item_key, quantity) {
    var cartData = _this.getData();
    if (!cartData.items) return false;
    var item = cartData.items.find(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (item) {
      item.quantity = quantity;
      _this.setData(cartData);
      _this.recalculateTotals();
      return true;
    }
    return false;
  });
  _defineProperty(this, "updateProduct", function (cart_item_key) {
    var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var price = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var cartData = _this.getData();
    if (!cartData.items) return false;
    var item = cartData.items.find(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (item) {
      item.quantity = quantity;
      if (price !== null) {
        item.price = price; // Store original format (can be object or number)
      }
      _this.setData(cartData);
      _this.recalculateTotals();
      return true;
    }
    return false;
  });
  // === PERCENTAGE ===
  _defineProperty(this, "setItemPercentage", function (cart_item_key, percentage_value) {
    var percentage_operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'add';
    var cartData = _this.getData();
    if (!cartData.items) return false;
    var item = cartData.items.find(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (item) {
      item.price_type = 'percentage';
      item.percentage_value = percentage_value;
      item.percentage_operation = percentage_operation;
      _this.setData(cartData);
      _this.recalculateTotals();
      return true;
    }
    return false;
  });
  _defineProperty(this, "setItemPriceType", function (cart_item_key, price_type) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var cartData = _this.getData();
    if (!cartData.items) return false;
    var item = cartData.items.find(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (item) {
      item.price_type = price_type;
      if (options.percentage_value !== undefined) {
        item.percentage_value = options.percentage_value;
      }
      if (options.percentage_operation) {
        item.percentage_operation = options.percentage_operation;
      }
      if (options.table_data) {
        item.table_data = options.table_data;
      }
      _this.setData(cartData);
      _this.recalculateTotals();
      return true;
    }
    return false;
  });
  _defineProperty(this, "getItemFinalPrice", function (cart_item_key) {
    var item = _this.getProduct(cart_item_key);
    if (!item) return 0;
    return _this._calculateItemPrice(item);
  });
  // === FIELD LINKING ===
  _defineProperty(this, "linkItemToField", function (cart_item_key, field_id) {
    var cartData = _this.getData();
    if (!cartData.items) return false;
    var item = cartData.items.find(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (item) {
      item.linked_field_id = field_id;
      _this.setData(cartData);
      return true;
    }
    return false;
  });
  _defineProperty(this, "unlinkItemFromField", function (cart_item_key) {
    return _this.linkItemToField(cart_item_key, null);
  });
  _defineProperty(this, "onFieldChange", function (field_id, value) {
    var cartData = _this.getData();
    if (!cartData.items) return;
    var changed = false;
    cartData.items.forEach(function (item) {
      if (item.linked_field_id === field_id) {
        if (item.price_type === 'table' && item.table_data) {
          var new_price = _this._lookupTablePrice(item.table_data, value);
          if (new_price !== null) {
            item.price = new_price;
            changed = true;
          }
        } else {
          item.quantity = parseInt(value) || 1;
          changed = true;
        }
      }
    });
    if (changed) {
      _this.setData(cartData);
      _this.recalculateTotals();
    }
  });
  // === TOTALS ===
  _defineProperty(this, "recalculateTotals", function () {
    var _this$dataManager3;
    if (_this.is_calculating) return;
    _this.is_calculating = true;
    var cartData = _this.getData();
    var items = cartData.items || [];
    var base_total = 0;
    var percentage_total = 0;

    // First pass: calculate base_total (non-percentage items)
    items.forEach(function (item) {
      if (item.price_type !== 'percentage') {
        base_total += _this._calculateItemPrice(item);
      }
    });

    // Second pass: calculate percentage items based on base_total
    items.forEach(function (item) {
      console.log('🔍 [CartManager] item: ', item);
      if (item.price_type === 'percentage') {
        var pct = parseFloat(item.percentage_value) || 0;
        var contribution = base_total * (pct / 100);
        percentage_total += item.percentage_operation === 'subtract' ? -contribution : contribution;
      }
    });
    cartData.base_total = base_total;
    cartData.percentage_total = percentage_total;
    cartData.grand_total = base_total + percentage_total;
    _this.cartData = cartData;
    if ((_this$dataManager3 = _this.dataManager) !== null && _this$dataManager3 !== void 0 && _this$dataManager3.save_draft) {
      _this.dataManager.save_draft({
        cart: cartData
      });
    }
    _this.is_calculating = false;
    _this.notify_subscribers();
  });
  _defineProperty(this, "_calculateItemPrice", function (item) {
    if (item.price_type === 'percentage') {
      return 0;
    }
    var qty = parseInt(item.quantity) || 1;
    var price = _this._normalizePrice(item.price);
    return qty * price;
  });
  _defineProperty(this, "_lookupTablePrice", function (table_data, value) {
    if (!Array.isArray(table_data)) return null;
    var numValue = parseInt(value) || 0;
    var _iterator = _createForOfIteratorHelper(table_data),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var row = _step.value;
        var min = parseInt(row.min) || 0;
        var max = parseInt(row.max) || Infinity;
        if (numValue >= min && numValue <= max) {
          var price = _this._normalizePrice(row.price);
          return price;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return null;
  });
  _defineProperty(this, "getBaseTotal", function () {
    var cartData = _this.getData();
    return cartData.base_total || 0;
  });
  _defineProperty(this, "getPercentageTotal", function () {
    var cartData = _this.getData();
    return cartData.percentage_total || 0;
  });
  _defineProperty(this, "getGrandTotal", function () {
    var cartData = _this.getData();
    return cartData.grand_total || 0;
  });
  _defineProperty(this, "getTotals", function () {
    var cartData = _this.getData();
    return {
      base_total: cartData.base_total || 0,
      percentage_total: cartData.percentage_total || 0,
      grand_total: cartData.grand_total || 0
    };
  });
  _defineProperty(this, "getCartTotal", function () {
    return _this.getGrandTotal();
  });
  // === COUNTS ===
  _defineProperty(this, "getItemCount", function () {
    var cartData = _this.getData();
    if (!cartData.items) return 0;
    return cartData.items.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);
  });
  _defineProperty(this, "getProductCount", function () {
    var cartData = _this.getData();
    return cartData.items ? cartData.items.length : 0;
  });
  _defineProperty(this, "clearCart", function () {
    var cartData = _this.getData();
    cartData.items = [];
    cartData.base_total = 0;
    cartData.percentage_total = 0;
    cartData.grand_total = 0;
    _this.setData(cartData);
  });
  _defineProperty(this, "isEmpty", function () {
    var cartData = _this.getData();
    return !cartData.items || cartData.items.length === 0;
  });
  _defineProperty(this, "hasProduct", function (cart_item_key) {
    return _this.getProduct(cart_item_key) !== null;
  });
  _defineProperty(this, "findProductById", function (product_id) {
    var cartData = _this.getData();
    if (!cartData.items) return [];
    return cartData.items.filter(function (item) {
      return item.product_id === product_id;
    });
  });
  _defineProperty(this, "findProductsByField", function (field_id) {
    var cartData = _this.getData();
    if (!cartData.items) return [];
    return cartData.items.filter(function (item) {
      return item.field_id === field_id;
    });
  });
  _defineProperty(this, "findProductsByLinkedField", function (linked_field_id) {
    var cartData = _this.getData();
    if (!cartData.items) return [];
    return cartData.items.filter(function (item) {
      return item.linked_field_id === linked_field_id;
    });
  });
  // === PRICE NORMALIZATION ===
  _defineProperty(this, "_normalizePrice", function (price) {
    var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (price === null || price === undefined) return 0;
    var curr = currency || _this.currency;

    // If price is object (multi-currency)
    if (_typeof(price) === 'object' && !Array.isArray(price)) {
      var value = price[curr];
      return parseFloat(value) || 0;
    }

    // If price is already a number or string
    return parseFloat(price) || 0;
  });
  // === UTILS ===
  _defineProperty(this, "_normalizeObject", function (obj) {
    if (!obj || _typeof(obj) !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(_this._normalizeObject);
    var sorted = {};
    Object.keys(obj).sort().forEach(function (key) {
      sorted[key] = _this._normalizeObject(obj[key]);
    });
    return sorted;
  });
  _defineProperty(this, "_simpleHash", function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var _char = str.charCodeAt(i);
      hash = (hash << 5) - hash + _char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  });
  _defineProperty(this, "generateCartItemKey", function (product_id, variation_id, variation, cart_item_data) {
    var parts = [product_id];
    if (variation_id) {
      parts.push(variation_id);
    }
    if (variation && Object.keys(variation).length > 0) {
      var normalizedVariation = _this._normalizeObject(variation);
      parts.push(JSON.stringify(normalizedVariation));
    }
    if (cart_item_data && Object.keys(cart_item_data).length > 0) {
      var normalizedData = _this._normalizeObject(cart_item_data);
      parts.push(JSON.stringify(normalizedData));
    }
    var keyString = parts.join('_');
    var hash = _this._simpleHash(keyString);
    return hash;
  });
  _defineProperty(this, "_generateCartItemKey", function (product_id, variation_id, variation, cart_item_data) {
    return _this.generateCartItemKey(product_id, variation_id, variation, cart_item_data);
  });
  _defineProperty(this, "getCart", function () {
    return _this.getProducts();
  });
  // === CART ITEM DATA ===
  _defineProperty(this, "updateCartItemData", function (cart_item_key, new_data) {
    var cartData = _this.getData();
    if (!cartData.items) return false;
    var item = cartData.items.find(function (item) {
      return item.cart_item_key === cart_item_key;
    });
    if (item) {
      item.cart_item_data = _objectSpread(_objectSpread({}, item.cart_item_data), new_data);

      // Also update top-level properties for easier access
      if (new_data.name !== undefined) {
        item.name = new_data.name;
      }
      if (new_data.step !== undefined) {
        item.step = new_data.step;
      }
      _this.setData(cartData);
      return true;
    }
    console.warn('🛒 [CartManager] updateCartItemData - item not found:', cart_item_key);
    return false;
  });
  _defineProperty(this, "get_items_by_step", function (step_num) {
    var cartData = _this.getData();
    if (!cartData.items) {
      return [];
    }
    var filtered_items = cartData.items.filter(function (item) {
      var _item$cart_item_data;
      // Check both item.step and item.cart_item_data.step
      var item_step = item.step || ((_item$cart_item_data = item.cart_item_data) === null || _item$cart_item_data === void 0 ? void 0 : _item$cart_item_data.step);
      return item_step === step_num;
    }).map(function (item) {
      var _item$cart_item_data2, _item$cart_item_data3, _item$cart_item_data4, _item$cart_item_data5;
      return {
        cart_item_key: item.cart_item_key,
        product_id: item.product_id,
        name: item.name || ((_item$cart_item_data2 = item.cart_item_data) === null || _item$cart_item_data2 === void 0 ? void 0 : _item$cart_item_data2.name) || '',
        label: item.label || ((_item$cart_item_data3 = item.cart_item_data) === null || _item$cart_item_data3 === void 0 ? void 0 : _item$cart_item_data3.label),
        title: item.title || ((_item$cart_item_data4 = item.cart_item_data) === null || _item$cart_item_data4 === void 0 ? void 0 : _item$cart_item_data4.title),
        price: _this._normalizePrice(item.price),
        value: _this._normalizePrice(item.price),
        quantity: item.quantity || 1,
        step: item.step || ((_item$cart_item_data5 = item.cart_item_data) === null || _item$cart_item_data5 === void 0 ? void 0 : _item$cart_item_data5.step)
      };
    });
    return filtered_items;
  });
  // === INCLUDED PRODUCTS ===
  _defineProperty(this, "addIncludedProducts", function (row_id, field_id, product_ids) {
    var cartData = _this.getData();
    if (!cartData.included_products) {
      cartData.included_products = [];
    }
    cartData.included_products = cartData.included_products.filter(function (item) {
      return !(item.row_id === row_id && item.field_id === field_id);
    });
    cartData.included_products.push({
      row_id: row_id,
      field_id: field_id,
      product_ids: Array.isArray(product_ids) ? product_ids : [product_ids],
      added_at: Date.now()
    });
    _this.setData(cartData);
    return true;
  });
  _defineProperty(this, "removeIncludedProducts", function (row_id, field_id) {
    var cartData = _this.getData();
    if (!cartData.included_products) return false;
    var initial_length = cartData.included_products.length;
    cartData.included_products = cartData.included_products.filter(function (item) {
      return !(item.row_id === row_id && item.field_id === field_id);
    });
    if (cartData.included_products.length !== initial_length) {
      _this.setData(cartData);
      return true;
    }
    return false;
  });
  _defineProperty(this, "getIncludedProducts", function () {
    var cartData = _this.getData();
    return cartData.included_products || [];
  });
  _defineProperty(this, "getIncludedProductIds", function () {
    var included = _this.getIncludedProducts();
    var all_ids = [];
    included.forEach(function (item) {
      if (Array.isArray(item.product_ids)) {
        all_ids.push.apply(all_ids, _toConsumableArray(item.product_ids));
      }
    });
    return all_ids;
  });
  _defineProperty(this, "hasIncludedProduct", function (product_id) {
    return _this.getIncludedProductIds().includes(product_id);
  });
  this.dataManager = dataManager;
  this.cartData = {};
  this.subscribers = [];
  this.is_calculating = false;
  this.currency = ((_window$wpcbooking_pu = window.wpcbooking_public) === null || _window$wpcbooking_pu === void 0 ? void 0 : _window$wpcbooking_pu.currency) || 'DKK';
}); // Singleton
var cart_manager_instance = null;
var getCartManager = function getCartManager() {
  var dataManager = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!cart_manager_instance && dataManager) {
    cart_manager_instance = new CartManager(dataManager);
  }
  return cart_manager_instance;
};
var resetCartManager = function resetCartManager() {
  cart_manager_instance = null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartManager);

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./assets/js/public/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var _booking_components_BookingApp_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./booking/components/BookingApp.jsx */ "./assets/js/public/booking/components/BookingApp.jsx");


var initBookingApp = function initBookingApp() {
  var bookingContainer = document.getElementById("booking-app");
  if (bookingContainer) {
    var bookingID = bookingContainer.dataset.bookingId || "";
    var quoteHash = bookingContainer.dataset.hash || "";
    var openInNewWindow = bookingContainer.dataset.openInNewWindow === "1";
    var targetUrl = bookingContainer.dataset.targetUrl || "";
    // Parse general data from JSON
    var general = {};
    try {
      general = JSON.parse(bookingContainer.dataset.general || "{}");
    } catch (error) {
      console.error("Error parsing general data:", error);
      general = {};
    }
    try {
      (0,preact__WEBPACK_IMPORTED_MODULE_0__.render)((0,preact__WEBPACK_IMPORTED_MODULE_0__.h)(_booking_components_BookingApp_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        bookingID: bookingID,
        quoteHash: quoteHash,
        general: general,
        openInNewWindow: openInNewWindow,
        targetUrl: targetUrl
      }), bookingContainer);
    } catch (error) {
      console.error("Error rendering BookingApp:", error);
    }
  }
};

// Global function to reinitialize a specific datepicker element
window.reinitDatepicker = function (element) {
  if (!element) {
    console.error('[Public.js] No element provided to reinitDatepicker');
    return false;
  }
  try {
    // Check if element has data-hs-datepicker attribute
    var config = element.getAttribute('data-hs-datepicker');
    if (!config) {
      console.error('[Public.js] Element does not have data-hs-datepicker attribute');
      return false;
    }

    // Try to initialize using HSDatepicker constructor
    if (typeof HSDatepicker === "function") {
      new HSDatepicker(element);
      return true;
    } else if (typeof window.HSDatepicker === "function") {
      new window.HSDatepicker(element);
      return true;
    } else {
      console.error('[Public.js] HSDatepicker constructor not available');
      return false;
    }
  } catch (error) {
    console.error('[Public.js] Error in reinitDatepicker:', error);
    return false;
  }
};
var initDatepicker = function initDatepicker() {
  // Wait for Preline and Vanilla Calendar to be fully loaded
  setTimeout(function () {
    try {
      // Check for datepicker elements
      var datepickerElements = document.querySelectorAll("[data-hs-datepicker]");
      if (datepickerElements.length === 0) {
        // Datepicker will be initialized when component mounts via window.reinitDatepicker()
        return;
      }

      // Method 1: Try HSDatepicker.autoInit()
      if (typeof HSDatepicker !== "undefined" && HSDatepicker !== null) {
        if (typeof HSDatepicker.autoInit === "function") {
          HSDatepicker.autoInit();
          return;
        }
      }

      // Method 2: Try window.HSDatepicker.autoInit()
      if (typeof window.HSDatepicker !== "undefined" && window.HSDatepicker !== null) {
        if (typeof window.HSDatepicker.autoInit === "function") {
          window.HSDatepicker.autoInit();
          return;
        }
      }

      // Method 3: Manual initialization using constructor
      datepickerElements.forEach(function (element) {
        try {
          if (typeof HSDatepicker === "function") {
            new HSDatepicker(element);
          } else if (typeof window.HSDatepicker === "function") {
            new window.HSDatepicker(element);
          } else {
            console.error('[Public.js] HSDatepicker constructor not found');
          }
        } catch (error) {
          console.error('[Public.js] Error initializing datepicker:', error);
        }
      });
    } catch (error) {
      console.error("[Public.js] Error in initDatepicker:", error);
    }
  }, 1000);
};
var initAllScripts = function initAllScripts() {
  var initFunctions = [{
    name: "Run Booking App",
    fn: initBookingApp
  }, {
    name: "Init Datepicker",
    fn: initDatepicker
  }];
  initFunctions.forEach(function (item) {
    try {
      item.fn();
    } catch (error) {
      console.error("Init call error " + item.name + ":", error);
    }
  });

  // Initialize Booking App
};
// Flag to ensure initialization runs only once
var isInitialized = false;
var safeInitAllScripts = function safeInitAllScripts() {
  if (isInitialized) return;
  isInitialized = true;
  initAllScripts();
};
if (document.readyState === "complete") {
  safeInitAllScripts();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    safeInitAllScripts();
  });
}
})();

/******/ })()
;
//# sourceMappingURL=public.js.map