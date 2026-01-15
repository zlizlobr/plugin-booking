"use strict";
(self["webpackChunkBooking"] = self["webpackChunkBooking"] || []).push([["assets_js_admin_summary_blocks_ProductList_jsx"],{

/***/ "./assets/js/admin/summary/blocks/ProductList.jsx":
/*!********************************************************!*\
  !*** ./assets/js/admin/summary/blocks/ProductList.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "./node_modules/@wordpress/i18n/build-module/index.js");
/* harmony import */ var _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BlockComponent.jsx */ "./assets/js/admin/summary/blocks/BlockComponent.jsx");
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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var ProductList = function ProductList(props) {
  var component = new _BlockComponent_jsx__WEBPACK_IMPORTED_MODULE_3__.BaseAdminBlockComponent(props);
  var _useState = (0,preact_hooks__WEBPACK_IMPORTED_MODULE_1__.useState)(component.value || []),
    _useState2 = _slicedToArray(_useState, 2),
    products = _useState2[0],
    setProducts = _useState2[1];
  var add_product = function add_product() {
    var newProducts = [].concat(_toConsumableArray(products), [{
      product_id: '',
      quantity: 1,
      price: 0
    }]);
    setProducts(newProducts);
    component.handle_change(newProducts);
  };
  var remove_product = function remove_product(index) {
    var newProducts = products.filter(function (_, i) {
      return i !== index;
    });
    setProducts(newProducts);
    component.handle_change(newProducts);
  };
  var update_product = function update_product(index, field, value) {
    var newProducts = _toConsumableArray(products);
    newProducts[index] = _objectSpread(_objectSpread({}, newProducts[index]), {}, _defineProperty({}, field, value));
    setProducts(newProducts);
    component.handle_change(newProducts);
  };
  component.render_input = function () {
    var isGrid = component.attrs.display_mode === 'grid';
    return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "product-list-container ".concat(isGrid ? 'grid-mode' : 'list-mode')
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: isGrid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'
    }, products.length === 0 ? (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "text-gray-500 text-sm py-4"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No products added yet.', 'wpcbooking')) : products.map(function (product, index) {
      return (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        key: index,
        className: "product-item ".concat(isGrid ? 'border border-gray-300 rounded p-4' : 'flex items-center gap-3 border-b border-gray-200 pb-2')
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: "".concat(isGrid ? 'space-y-3' : 'flex-1 flex gap-3 items-center')
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: isGrid ? '' : 'flex-1'
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        type: "text",
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Product ID', 'wpcbooking'),
        value: product.product_id,
        className: "w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
        onInput: function onInput(e) {
          return update_product(index, 'product_id', e.target.value);
        }
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: isGrid ? '' : 'w-24'
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        type: "number",
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Qty', 'wpcbooking'),
        value: product.quantity,
        min: "1",
        className: "w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
        onInput: function onInput(e) {
          return update_product(index, 'quantity', parseInt(e.target.value) || 1);
        }
      })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
        className: isGrid ? '' : 'w-32'
      }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
        type: "number",
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Price', 'wpcbooking'),
        value: product.price,
        min: "0",
        step: "0.01",
        className: "w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500",
        onInput: function onInput(e) {
          return update_product(index, 'price', parseFloat(e.target.value) || 0);
        }
      }))), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
        type: "button",
        onClick: function onClick() {
          return remove_product(index);
        },
        className: "p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded",
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove product', 'wpcbooking')
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
        d: "M6 18L18 6M6 6l12 12"
      }))));
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      className: "mt-4 flex justify-end"
    }, (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("button", {
      type: "button",
      onClick: add_product,
      className: "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
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
    })), (0,preact__WEBPACK_IMPORTED_MODULE_0__.h)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add product', 'wpcbooking')))));
  };
  component.get_default_label = function () {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Products', 'wpcbooking');
  };
  return component.render();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductList);

/***/ })

}]);
//# sourceMappingURL=assets_js_admin_summary_blocks_ProductList_jsx.js.map