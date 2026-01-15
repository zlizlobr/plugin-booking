/**
 * Price Calculation Hook
 * 
 * Centralized logic for calculating product quantity and price
 * based on backend product data structure.
 * 
 * Inspired by composite price controls (ValuePriceControl, PercentagePriceControl, TablePriceControl)
 * and backend structure from AbstractProductBlock.php
 */

/**
 * Calculate quantity based on qty_type
 * 
 * @param {Object} productData - Product data from backend
 * @param {Object} bookingFormManager - Form manager instance
 * @param {number} currentQuantity - Current quantity in cart
 * @returns {number} Calculated quantity
 */
export const calculateQuantity = (productData, bookingFormManager, currentQuantity = 1) => {
  const qty_type = productData.qty_type || 'not_connected';

  switch (qty_type) {
    case 'field_connected':
    case 'per_field':
      // Read quantity from form field
      if (productData.qty_field && bookingFormManager) {
        const fieldValue = bookingFormManager.get_field_value(productData.qty_field);
        const quantity = parseInt(fieldValue) || 1;
        return quantity;
      }
      return currentQuantity;

    case 'fixed':
      // Fixed quantity from backend
      const fixedQty = parseInt(productData.qty) || 1;
      return fixedQty;

    case 'not_connected':
    default:
      // Use current cart quantity
      return currentQuantity;
  }
};

/**
 * Lookup price in table by quantity
 * Inspired by TablePriceControl.jsx calculateTablePrice
 * 
 * @param {Array} table - Table data (array of {quantity, price})
 * @param {number} quantity - Quantity to lookup
 * @param {string} currency - Currency code (optional, for future multi-currency tables)
 * @returns {Object|number} Price (can be multi-currency object or number)
 */
export const lookupTablePrice = (table, quantity, currency = null) => {
  if (!Array.isArray(table)) {
    console.warn('📊 [PriceCalc] Invalid table data');
    return 0;
  }

  // Simple array lookup by quantity
  const entry = table.find(row => row.quantity === quantity);
  
  if (entry) {
    return entry.price || 0;
  }

  // Fallback: find closest quantity
  const sortedTable = [...table].sort((a, b) => a.quantity - b.quantity);
  const closestEntry = sortedTable.reverse().find(row => row.quantity <= quantity);
  
  if (closestEntry) {
    return closestEntry.price || 0;
  }

  console.warn('📊 [PriceCalc] No table entry found for qty:', quantity);
  return 0;
};

/**
 * Lookup price in 2D table by row and column
 * Inspired by TablePriceControl.jsx getPriceByRowAndColumn
 * 
 * @param {Object} table - 2D table data {currency: {rowId: {columnId: price}}}
 * @param {string|number} rowId - Row identifier
 * @param {string|number} columnId - Column identifier
 * @param {string} currency - Currency code
 * @returns {number} Price
 */
export const lookupTable2DPrice = (table, rowId, columnId, currency) => {
  if (!table || typeof table !== 'object') {
    console.warn('📊 [PriceCalc] Invalid 2D table');
    return 0;
  }

  const currencyTable = table[currency];
  if (!currencyTable) {
    console.warn('📊 [PriceCalc] No table for currency:', currency);
    return 0;
  }

  // Direct lookup
  if (currencyTable[rowId] && currencyTable[rowId][columnId] !== undefined) {
    const price = currencyTable[rowId][columnId];
    return parseFloat(price) || 0;
  }

  // Find closest row and column (fallback)
  const availableRows = Object.keys(currencyTable).map(id => parseInt(id)).filter(id => !isNaN(id)).sort((a, b) => a - b);
  const closestRow = availableRows.reverse().find(id => id <= parseInt(rowId)) || availableRows[0];

  if (closestRow && currencyTable[closestRow]) {
    const rowData = currencyTable[closestRow];
    const availableColumns = Object.keys(rowData).map(id => parseInt(id)).filter(id => !isNaN(id)).sort((a, b) => a - b);
    const closestColumn = availableColumns.reverse().find(id => id <= parseInt(columnId)) || availableColumns[0];

    if (closestColumn !== undefined && rowData[closestColumn] !== undefined) {
      const price = rowData[closestColumn];
      return parseFloat(price) || 0;
    }
  }

  console.warn('📊 [PriceCalc] No 2D table entry found');
  return 0;
};

/**
 * Calculate price based on price_type
 * 
 * @param {Object} productData - Product data from backend
 * @param {number} quantity - Calculated quantity
 * @param {string} currency - Currency code
 * @param {Object} bookingFormManager - Form manager (for table field lookups)
 * @returns {Object|number} Price (can be multi-currency object or number, 0 for percentage)
 */
export const calculatePrice = (productData, quantity, currency = 'DKK', bookingFormManager = null) => {
  const price_type = productData.price_type || 'value';

  switch (price_type) {
    case 'percentage':
      // Percentage items don't have direct price
      return 0;

    case 'table':
      
      // Check if it's 2D table (has table_row_field/table_column_field)
      if (productData.table_row_field || productData.table_column_field) {
        // 2D Table lookup
        const table = productData.table;
        if (!table || typeof table !== 'object') {
          console.warn('📊 [PriceCalc] Invalid 2D table structure');
          return 0;
        }

        const rowField = productData.table_row_field;
        const columnField = productData.table_column_field;

        let rowValue = null;
        let columnValue = null;
        if (rowField && rowField !== 'none' && bookingFormManager) {
           rowValue = bookingFormManager.get_field_value(rowField);
        }

        if (columnField && columnField !== 'none' && bookingFormManager) {
          columnValue = bookingFormManager.get_field_value(columnField);
        }

        if (rowValue !== null && columnValue !== null) {
          return lookupTable2DPrice(table, rowValue, columnValue, currency);
        } else if (rowValue !== null) {
          // Row-only lookup
          const currencyTable = table[currency];
          if (currencyTable && currencyTable[rowValue]) {
            const firstColumnPrice = Object.values(currencyTable[rowValue])[0];
            return parseFloat(firstColumnPrice) || 0;
          }
        } else if (columnValue !== null) {
          // Column-only lookup
          const currencyTable = table[currency];
          if (currencyTable) {
            for (const rowData of Object.values(currencyTable)) {
              if (rowData[columnValue] !== undefined) {
                const price = rowData[columnValue];
                return parseFloat(price) || 0;
              }
            }
          }
        }
        return 0;
      } else {
        // 1D Table lookup by quantity
        const table = Array.isArray(productData.table) 
          ? productData.table 
          : productData.table?.[currency];
        
        return lookupTablePrice(table, quantity, currency);
      }

    case 'value':
    default:
      // Direct price value
      const price = productData.price;
      return price || 0;
  }
};

/**
 * Process complete product data
 * Main entry point that combines quantity and price calculation
 * 
 * @param {Object} productData - Product data from backend (AbstractProductBlock.php structure)
 * @param {Object} bookingFormManager - Form manager instance
 * @param {number} currentQuantity - Current quantity in cart
 * @param {string} currency - Currency code
 * @returns {Object} {quantity, price, price_type, percentage}
 */
export const processProduct = (productData, bookingFormManager, currentQuantity = 1, currency = 'DKK') => {
  // Step 1: Calculate quantity
  console.log('🔍 [PriceCalc] Processing product:', productData);
  const quantity = calculateQuantity(productData, bookingFormManager, currentQuantity);

  // Step 2: Calculate price
  const price = calculatePrice(productData, quantity, currency, bookingFormManager);

  // Step 3: Extract percentage info if applicable
  const percentage = productData.price_type === 'percentage' 
    ? {
        value: productData.percentage?.value || 0,
        operation: productData.percentage?.add_substract || 'add'
      }
    : null;

  const result = {
    quantity,
    price,
    price_type: productData.price_type || 'value',
    percentage
  };

  return result;
};

/**
 * Hook interface for Preact components
 */
export const usePriceCalculation = () => {
  return {
    calculateQuantity,
    calculatePrice,
    lookupTablePrice,
    lookupTable2DPrice,
    processProduct
  };
};

export default usePriceCalculation;

