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
export const canGoBack = (currentStep) => {
  return currentStep > 1;
};

/**
 * Navigate to previous step if possible
 * @param {number} currentStep - The current step number
 * @param {SetCurrentStepFunction} setCurrentStep - Function to update current step
 * @returns {boolean} - True if navigation occurred, false otherwise
 */
export const goBack = (currentStep, setCurrentStep) => {
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
export const getPreviousStep = (currentStep) => {
  return canGoBack(currentStep) ? currentStep - 1 : null;
};

/**
 * Check if user is on the first step
 * @param {number} currentStep - The current step number
 * @returns {boolean} - True if on first step, false otherwise
 */
export const isFirstStep = (currentStep) => {
  return currentStep === 1;
};

/**
 * Validate step number is within valid range
 * @param {number} step - The step number to validate
 * @param {number} totalSteps - Total number of steps available
 * @returns {boolean} - True if step is valid, false otherwise
 */
export const isValidStep = (step, totalSteps) => {
  return step >= 1 && step <= totalSteps;
};

/**
 * Navigate to a specific step with validation
 * @param {number} targetStep - The target step number
 * @param {number} totalSteps - Total number of steps available
 * @param {SetCurrentStepFunction} setCurrentStep - Function to update current step
 * @returns {boolean} - True if navigation occurred, false otherwise
 */
export const goToStep = (targetStep, totalSteps, setCurrentStep) => {
  if (isValidStep(targetStep, totalSteps)) {
    setCurrentStep(targetStep);
    return true;
  }
  return false;
};

export default {
  canGoBack,
  goBack,
  getPreviousStep,
  isFirstStep,
  isValidStep,
  goToStep
};
