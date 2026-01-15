"use strict";
(self["webpackChunkBooking"] = self["webpackChunkBooking"] || []).push([["assets_js_admin_wpify_blocks_ProductList_js"],{

/***/ "./assets/js/admin/wpify/blocks/ProductList.js":
/*!*****************************************************!*\
  !*** ./assets/js/admin/wpify/blocks/ProductList.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeProductList: () => (/* binding */ initializeProductList)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _TableBuilderComponent_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TableBuilderComponent.jsx */ "./assets/js/admin/TableBuilderComponent.jsx");




// Kontrolní konstanta pro zabránění opakovaného renderování
var productListInitialized = false;
var renderTableBuilderComponent = function renderTableBuilderComponent(container) {
  try {
    // Get data from data attribute
    var initialDataAttr = container.getAttribute('data-initial-data');
    var initialData = null;
    if (initialDataAttr && initialDataAttr.trim()) {
      try {
        // Clean the data attribute value - remove any HTML tags or extra content
        var cleanData = initialDataAttr.replace(/<[^>]*>/g, '').trim();
        initialData = JSON.parse(cleanData);
      } catch (e) {
        console.warn('Failed to parse initial table data:', e);
        console.warn('Raw data attribute value:', initialDataAttr);
        // Use default data if parsing fails
        initialData = null;
      }
    }

    // Handle data changes
    var handleDataChange = function handleDataChange(newData) {
      var hiddenInput = document.getElementById('wpcbooking-table-data-input');
      if (hiddenInput) {
        hiddenInput.value = JSON.stringify(newData);
      }
    };

    // Render the component
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.render)(h(_TableBuilderComponent_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      initialData: initialData,
      onDataChange: handleDataChange
    }), container);

    // Označit kontejner jako renderovaný
    container.setAttribute("data-rendered", "true");
  } catch (error) {
    console.error("Error rendering Table Builder component:", error);
  }
};
var initializeProductList = function initializeProductList() {
  if (productListInitialized) {
    return;
  }
  var tableBuilderContainers = document.querySelectorAll('#table-builder-container');
  if (tableBuilderContainers.length > 0) {
    tableBuilderContainers.forEach(function (container) {
      // Zkontrolovat, zda už není renderovaný
      if (!container.getAttribute("data-rendered")) {
        renderTableBuilderComponent(container);
      }
    });
    productListInitialized = true;
  }

  // Setup event listeners for popup controls
  var initProductListControls = function initProductListControls() {
    var triggers = document.querySelectorAll('[data-wpcbooking-table-builder-trigger]');
    triggers.forEach(function (trigger) {
      var _trigger$closest;
      var popup = (_trigger$closest = trigger.closest('.wpcbooking-price-table-builder')) === null || _trigger$closest === void 0 ? void 0 : _trigger$closest.querySelector('[data-wpcbooking-table-builder-popup]');
      if (!popup) return;
      var overlay = popup.querySelector('[data-wpcbooking-table-builder-overlay]');
      var closeButtons = popup.querySelectorAll('[data-wpcbooking-table-builder-close], [data-wpcbooking-table-builder-cancel]');
      var saveButton = popup.querySelector('[data-wpcbooking-table-builder-save]');
      var container = popup.querySelector('#table-builder-container');
      var hiddenInput = document.getElementById('wpcbooking-table-data-input');
      var openPopup = function openPopup() {
        popup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Initialize table component when popup opens
        if (container && !container.getAttribute("data-rendered")) {
          renderTableBuilderComponent(container);
        }
      };
      var closePopup = function closePopup() {
        popup.classList.add('hidden');
        document.body.style.overflow = '';
      };
      var savePopup = function savePopup() {
        // Data is already saved in hidden input via TableBuilderComponent
        // Just close the popup
        closePopup();
      };
      trigger.addEventListener('click', function () {
        return openPopup();
      });
      closeButtons.forEach(function (button) {
        return button.addEventListener('click', function () {
          return closePopup();
        });
      });
      if (overlay) overlay.addEventListener('click', function () {
        return closePopup();
      });
      if (saveButton) saveButton.addEventListener('click', function () {
        return savePopup();
      });
    });
  };

  // Initialize controls
  initProductListControls();

  // Setup observer for dynamic content
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Zkontrolovat, zda přidaný element obsahuje table-builder-container
            var tableBuilderContainer = node.id === "table-builder-container" ? node : node.querySelector("#table-builder-container");
            if (tableBuilderContainer && !tableBuilderContainer.getAttribute("data-rendered")) {
              renderTableBuilderComponent(tableBuilderContainer);
            }

            // Re-initialize controls for new popup elements
            if (node.querySelector('[data-wpcbooking-table-builder-trigger]')) {
              initProductListControls();
            }
          }
        });
      }
    });
  });

  // Sledovat změny v celém dokumentu
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Cleanup po 30 sekundách
  setTimeout(function () {
    observer.disconnect();
  }, 30000);
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProductList);
} else {
  initializeProductList();
}

/***/ })

}]);
//# sourceMappingURL=assets_js_admin_wpify_blocks_ProductList_js.js.map