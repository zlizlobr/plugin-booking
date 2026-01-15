/**
 * Check if products condition is met based on cart products.
 *
 * @param {Object} condition - Condition object with ids, operator, and product_condition
 * @param {Array} products - Array of product objects from cart
 * @returns {boolean} True if condition is met
 */
const check_products_condition = (condition, products) => {
  if (!products || products.length === 0) {
    return false;
  }

  const cart_product_ids = products.map(item => parseInt(item.product_id || item.id));
  const required_ids = (condition.ids || []).map(id => parseInt(id));

  if (required_ids.length === 0) {
    return true;
  }

  const operator = condition.operator || 'OR';
  const product_condition = condition.product_condition || 'included_products';

  let result;

  if (product_condition === 'included_products') {
    if (operator === 'OR') {
      result = required_ids.some(id => cart_product_ids.includes(id));
    } else {
      result = required_ids.every(id => cart_product_ids.includes(id));
    }
    return result;
  }

  if (product_condition === 'excluded_products') {
    if (operator === 'OR') {
      result = !required_ids.some(id => cart_product_ids.includes(id));
    } else {
      result = !required_ids.every(id => cart_product_ids.includes(id));
    }
    return result;
  }

  return true;
};

/**
 * Check single condition based on condition type.
 *
 * @param {Object} condition - Condition object with condition_type
 * @param {Array} products - Array of product objects from cart
 * @returns {boolean} True if condition is met
 */
const check_single_condition = (condition, products) => {
  const condition_type = condition.condition_type;

  switch (condition_type) {
    case 'products':
      return check_products_condition(condition, products);
    default:
      return true;
  }
};

/**
 * Check if step conditions are met.
 *
 * @param {Array|Object|null} conditions - Conditions array or object
 * @param {number} step_num - Step number to check
 * @param {number} max_reached_step - Maximum step reached by user
 * @param {Array} products - Array of product objects from cart
 * @returns {boolean} True if conditions are met or step not yet reached
 */
export const check_step_condition = (conditions, step_num, max_reached_step, products) => {
  if ((max_reached_step < step_num) || (!conditions)) {
    return true;
  }

  if (Array.isArray(conditions)) {
    return conditions.every(condition => check_single_condition(condition, products));
  }

  if (typeof conditions === 'object' && conditions.condition_type) {
    return check_single_condition(conditions, products);
  }

  return true;
};

/**
 * Check step conditions using cart manager to get products.
 *
 * @param {Array|Object|null} conditions - Conditions array or object
 * @param {number} step_num - Step number to check
 * @param {number} max_reached_step - Maximum step reached by user
 * @param {Object|null} card_manager - Cart manager instance with getProducts method
 * @returns {boolean} True if conditions are met or step not yet reached
 */
export const check_step_condition_with_manager = (conditions, step_num, max_reached_step, card_manager) => {
  if (!card_manager || typeof card_manager.getProducts !== 'function') {
     return check_step_condition(conditions, step_num, max_reached_step, []);
  }

  const products = card_manager.getProducts() || [];
  return check_step_condition(conditions, step_num, max_reached_step, products);
};

/**
 * Hook for checking step conditions with cart manager.
 *
 * @param {Object|null} card_manager - Cart manager instance with getProducts method
 * @returns {Object} Object with checkStepCondition function
 */
export const use_step_condition = (card_manager) => {
  const check_condition = (conditions, step_num, max_reached_step) => {
    return check_step_condition_with_manager(conditions, step_num, max_reached_step, card_manager);
  };

  return { checkStepCondition: check_condition };
};

