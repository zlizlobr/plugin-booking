/**
 * Get GraphQL endpoint URL from admin data.
 *
 * @returns {string} GraphQL endpoint URL
 */
export const getGraphQLEndpoint = () => {
  return window.wpcbookingAdminData?.graphqlEndpoint || "/graphql";
};

/**
 * Get booking post ID from admin data.
 *
 * @returns {number} Booking post ID
 */
export const getPostId = () => {
  return window.wpcbookingAdminData?.bookingId || 0;
};

/**
 * Get plugin URL from admin data.
 *
 * @returns {string} Plugin URL
 */
export const getPluginUrl = () => {
  return window.wpcbookingAdminData?.pluginUrl || "";
};

/**
 * Get price format configuration from admin data.
 *
 * @returns {Object} Format configuration object with decimalSeparator, thousandSeparator, numberOfDecimals, currencySymbol, currencyPosition
 */
export const getFormatConfig = () => {
  return (
    window.wpcbookingAdminData?.formatConfig || {
      decimalSeparator: ",",
      thousandSeparator: ".",
      numberOfDecimals: 2,
      currencySymbol: "kr.",
      currencyPosition: "right_space",
    }
  );
};

/**
 * Get form values from admin data.
 *
 * @returns {Object} Object containing form field values
 */
export const getValues = () => {
  return window.wpcbookingAdminData?.values || {};
};

/**
 * Get summary settings from admin data.
 *
 * @returns {Object} Summary settings object with labelSummary, labelPrice, labelTotal, editSummary
 */
export const getSummarySettings = () => {
  return (
    window.wpcbookingAdminData?.summarySettings || {
      labelSummary: "Summary",
      labelPrice: "Price",
      labelTotal: "Total",
      editSummary: true,
    }
  );
};

/**
 * Get design settings from admin data.
 *
 * @returns {Object} Design settings object with coloredText, blackText, backgroundImage
 */
export const getDesignSettings = () => {
  return (
    window.wpcbookingAdminData?.designSettings || {
      coloredText: "",
      blackText: "",
      backgroundImage: null,
    }
  );
};

/**
 * Get basic settings from admin data.
 *
 * @returns {Object} Basic settings object with title, nextButtonText, prevButtonText, saveButtonText
 */
export const getBasicsSettings = () => {
  return (
    window.wpcbookingAdminData?.basicsSettings || {
      title: "",
      nextButtonText: "Next",
      prevButtonText: "Previous",
      saveButtonText: "Save",
    }
  );
};

/**
 * Get labels from admin data.
 *
 * @returns {Object} Labels object with addFee, label, loading, error, save, delete
 */
export const getLabels = () => {
  return (
    window.wpcbookingAdminData?.labels || {
      addFee: "Add fee",
      label: "Label",
      loading: "Loading...",
      error: "Error",
      save: "Save",
      delete: "Delete",
    }
  );
};

/**
 * Get summary data from admin data.
 *
 * @returns {Object} Summary data object
 */
export const getSummaryData = () => {
  return window.wpcbookingAdminData?.summaryData || {};
};

/**
 * Get steps configuration from admin data with price values from summary data.
 *
 * @returns {Object} Steps object with price values merged from summary data
 */
export const getSteps = () => {
  const rawSteps = window.wpcbookingAdminData?.steps || {};
  const summaryData = getSummaryData();
  
  const steps = JSON.parse(JSON.stringify(rawSteps));

  Object.keys(steps).forEach((stepId) => {
    if (summaryData[stepId]) {
      steps[stepId].value = summaryData[stepId].price_step || 0;
      steps[stepId].price_products = summaryData[stepId].price_step || 0;
    }
  });

  return steps;
};

/**
 * Get step sections from admin data.
 *
 * @returns {Object} Step sections object
 */
export const getStepSections = () => {
  return window.wpcbookingAdminData?.stepSections || {};
};

/**
 * Extract products from form values in admin data.
 *
 * @returns {Array} Array of product objects
 */
export const getProducts = () => {
  const values = window.wpcbookingAdminData?.values || {};
  const products = [];

  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item && item.product_id) {
          products.push(item);
        }
      });
    }
  });

  return products;
};

/**
 * Check if admin data is available in window object.
 *
 * @returns {boolean} True if window.wpcbookingAdminData exists
 */
export const isAdminDataAvailable = () => {
  return (
    typeof window !== "undefined" &&
    typeof window.wpcbookingAdminData !== "undefined"
  );
};
