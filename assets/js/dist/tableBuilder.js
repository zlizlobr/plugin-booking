"use strict";
(self["webpackChunkBooking"] = self["webpackChunkBooking"] || []).push([["tableBuilder"],{

/***/ "./assets/js/admin/TableBuilderComponent.jsx":
/*!***************************************************!*\
  !*** ./assets/js/admin/TableBuilderComponent.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var TableBuilderComponent = function TableBuilderComponent(_ref) {
  var _ref$initialData = _ref.initialData,
    initialData = _ref$initialData === void 0 ? null : _ref$initialData,
    _ref$onDataChange = _ref.onDataChange,
    onDataChange = _ref$onDataChange === void 0 ? null : _ref$onDataChange,
    _ref$uniqueId = _ref.uniqueId,
    uniqueId = _ref$uniqueId === void 0 ? null : _ref$uniqueId,
    _ref$hiddenInputId = _ref.hiddenInputId,
    hiddenInputId = _ref$hiddenInputId === void 0 ? null : _ref$hiddenInputId;
  // Default data structure
  var defaultData = {
    "1 hour": {
      "Fixed price for all guests (DKK)": 2850
    },
    "2 hour": {
      "Fixed price for all guests (DKK)": 3150
    },
    "3 hour": {
      "Fixed price for all guests (DKK)": 3450
    },
    "4 hour": {
      "Fixed price for all guests (DKK)": 3750
    },
    "5 hour": {
      "Fixed price for all guests (DKK)": 4050
    }
  };
  /*{
    "10": { "Price per person (DKK)": 545 },
    "15": { "Price per person (DKK)": 395 },
    "20": { "Price per person (DKK)": 325 },
    "25": { "Price per person (DKK)": 295 },
    "30": { "Price per person (DKK)": 295 },
    "35": { "Price per person (DKK)": 295 },
    "40": { "Price per person (DKK)": 295 },
    "50": { "Price per person (DKK)": 295 },
    "60": { "Price per person (DKK)": 295 },
    "70": { "Price per person (DKK)": 295 },
    "80": { "Price per person (DKK)": 295 },
    "90": { "Price per person (DKK)": 295 },
    "100": { "Price per person (DKK)": 295 },
    "110": { "Price per person (DKK)": 295 },
    "120": { "Price per person (DKK)": 295 },
    "130": { "Price per person (DKK)": 295 },
    "140": { "Price per person (DKK)": 295 },
    "150+": { "Price per person (DKK)": 295 }
  };*/

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
      // First try to load from external input
      try {
        var externalInput = document.getElementById(uniqueId + '_data') || document.querySelector('input[name="' + uniqueId + '_data"]');
        var raw = externalInput ? externalInput.value : '';
        if (raw && typeof raw === 'string') {
          var parsed = JSON.parse(raw);
          if (parsed && _typeof(parsed) === 'object' && !Array.isArray(parsed)) {
            return parsed;
          }
        }
      } catch (_) {
        // ignore JSON parse errors or missing document
      }

      // Fallback to initialData prop
      if (initialData && _typeof(initialData) === 'object' && !Array.isArray(initialData)) {
        return initialData;
      }

      // Final fallback to default data
      return defaultData;
    }),
    _useState2 = _slicedToArray(_useState, 2),
    tableData = _useState2[0],
    setTableData = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    editingCell = _useState4[0],
    setEditingCell = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      open: false,
      type: '',
      value: '',
      index: null
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    editDialog = _useState6[0],
    setEditDialog = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    newValue = _useState8[0],
    setNewValue = _useState8[1];

  // Get row and column names
  var rowNames = Object.keys(tableData);
  var columnNames = rowNames.length > 0 ? Object.keys(tableData[rowNames[0]]) : [];

  // Add new row
  var addRow = function addRow(rowName) {
    if (!rowName.trim()) return;
    var newData = _objectSpread({}, tableData);
    var newRowData = {};
    columnNames.forEach(function (col) {
      newRowData[col] = 0;
    });
    newData[rowName] = newRowData;
    setTableData(newData);
  };

  // Add new column
  var addColumn = function addColumn(columnName) {
    if (!columnName.trim()) return;
    var newData = _objectSpread({}, tableData);
    Object.keys(newData).forEach(function (rowName) {
      newData[rowName] = _objectSpread(_objectSpread({}, newData[rowName]), {}, _defineProperty({}, columnName, 0));
    });
    setTableData(newData);
  };

  // Edit row name
  var editRowName = function editRowName(oldName, newName) {
    if (!newName.trim() || oldName === newName) return;
    var newData = _objectSpread({}, tableData);
    newData[newName] = newData[oldName];
    delete newData[oldName];
    setTableData(newData);
  };

  // Edit column name
  var editColumnName = function editColumnName(oldName, newName) {
    if (!newName.trim() || oldName === newName) return;
    var newData = _objectSpread({}, tableData);
    Object.keys(newData).forEach(function (rowName) {
      newData[rowName] = _objectSpread(_objectSpread({}, newData[rowName]), {}, _defineProperty({}, newName, newData[rowName][oldName]));
      delete newData[rowName][oldName];
    });
    setTableData(newData);
  };

  // Delete row
  var deleteRow = function deleteRow(rowName) {
    // Prevent deleting the first row
    if (rowName === rowNames[0]) return;
    var newData = _objectSpread({}, tableData);
    delete newData[rowName];
    setTableData(newData);
  };

  // Delete column
  var deleteColumn = function deleteColumn(columnName) {
    // Prevent deleting the first column
    if (columnName === columnNames[0]) return;
    var newData = _objectSpread({}, tableData);
    Object.keys(newData).forEach(function (rowName) {
      delete newData[rowName][columnName];
    });
    setTableData(newData);
  };

  // Handle cell value change
  var handleCellChange = function handleCellChange(rowName, columnName, value) {
    var newData = _objectSpread({}, tableData);
    newData[rowName] = _objectSpread(_objectSpread({}, newData[rowName]), {}, _defineProperty({}, columnName, value));
    setTableData(newData);
  };

  // Open edit dialog
  var openEditDialog = function openEditDialog(type) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    setEditDialog({
      open: true,
      type: type,
      value: value,
      index: index
    });
    setNewValue(value);
  };

  // Close edit dialog
  var closeEditDialog = function closeEditDialog() {
    setEditDialog({
      open: false,
      type: '',
      value: '',
      index: null
    });
    setNewValue('');
  };

  // Handle dialog submit
  var handleDialogSubmit = function handleDialogSubmit() {
    var type = editDialog.type,
      value = editDialog.value;
    switch (type) {
      case 'row':
        addRow(newValue);
        break;
      case 'column':
        addColumn(newValue);
        break;
      case 'row-edit':
        editRowName(value, newValue);
        break;
      case 'column-edit':
        editColumnName(value, newValue);
        break;
      default:
        break;
    }
    closeEditDialog();
  };

  // Update hidden input when data changes
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (onDataChange) {
      onDataChange(tableData);
    }
    // Update external hidden input in builder form if present
    try {
      var externalInput = document.getElementById('wpcbooking-table-data-input') || document.querySelector('input[name="wpcbooking_table_data"]');
      if (externalInput) {
        externalInput.value = JSON.stringify(tableData);
      }
    } catch (_) {
      // no-op if document is unavailable
    }
  }, [tableData, onDataChange]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "table-builder-component",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "table-container",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("table", {
        className: "table-builder-table",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thead", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
              className: "row-header",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                className: "header-controls",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                  children: "Row"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                  className: "btn-add",
                  onClick: function onClick() {
                    return openEditDialog('row');
                  },
                  title: "Add Row",
                  children: "+"
                })]
              })
            }), columnNames.map(function (colName, index) {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
                className: "column-header",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "header-controls",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                    children: colName
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "header-buttons",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                      className: "btn-edit",
                      onClick: function onClick() {
                        return openEditDialog('column-edit', colName);
                      },
                      title: "Edit Column",
                      children: "\u270F\uFE0F"
                    }), index > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                      className: "btn-delete",
                      onClick: function onClick() {
                        return deleteColumn(colName);
                      },
                      title: "Delete Column",
                      children: "\xD7"
                    })]
                  })]
                })
              }, colName);
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("th", {
              className: "add-column-header",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                className: "btn-add",
                onClick: function onClick() {
                  return openEditDialog('column');
                },
                title: "Add Column",
                children: "+ Column"
              })
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("tbody", {
          children: rowNames.map(function (rowName, rowIndex) {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("tr", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td", {
                className: "row-name-cell",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                  className: "row-controls",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                    children: rowName
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
                    className: "row-buttons",
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                      className: "btn-edit",
                      onClick: function onClick() {
                        return openEditDialog('row-edit', rowName);
                      },
                      title: "Edit Row",
                      children: "\u270F\uFE0F"
                    }), rowIndex > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                      className: "btn-delete",
                      onClick: function onClick() {
                        return deleteRow(rowName);
                      },
                      title: "Delete Row",
                      children: "\xD7"
                    })]
                  })]
                })
              }), columnNames.map(function (colName) {
                return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td", {
                  className: "data-cell",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
                    type: "number",
                    value: tableData[rowName][colName],
                    onChange: function onChange(e) {
                      return handleCellChange(rowName, colName, parseInt(e.target.value) || 0);
                    },
                    className: "cell-input"
                  })
                }, colName);
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("td", {
                className: "empty-cell"
              })]
            }, rowName);
          })
        })]
      })
    }), editDialog.open && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "fixed inset-0 flex items-start justify-center pt-20 z-50",
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-in fade-in slide-in-from-top-4 duration-200",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "flex items-center justify-between px-6 py-4 border-b border-gray-200",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("h3", {
            className: "text-lg font-semibold text-gray-900",
            children: [editDialog.type === 'row' && 'Add New Row', editDialog.type === 'column' && 'Add New Column', editDialog.type === 'row-edit' && 'Edit Row Name', editDialog.type === 'column-edit' && 'Edit Column Name']
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            className: "text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none",
            onClick: closeEditDialog,
            children: "\xD7"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "px-6 py-4",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("input", {
            type: "text",
            value: newValue,
            onChange: function onChange(e) {
              return setNewValue(e.target.value);
            },
            placeholder: "Enter name",
            className: "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            autoFocus: true
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            className: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
            onClick: closeEditDialog,
            children: "Cancel"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
            className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors",
            onClick: handleDialogSubmit,
            children: "Save"
          })]
        })]
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableBuilderComponent);

/***/ })

}]);
//# sourceMappingURL=tableBuilder.js.map