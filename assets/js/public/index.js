import { h, render } from "preact";
import BookingApp from "./booking/components/BookingApp.jsx";

/**
 * Initialize booking application by rendering BookingApp component.
 * Reads configuration from booking container data attributes.
 */
const initBookingApp = () => {
  const bookingContainer = document.getElementById("booking-app");
  if (bookingContainer) {
    const bookingID = bookingContainer.dataset.bookingId || "";
    const quoteHash = bookingContainer.dataset.hash || "";
    const openInNewWindow = bookingContainer.dataset.openInNewWindow === "1";
    const targetUrl = bookingContainer.dataset.targetUrl || "";
    // Parse general data from JSON
    let general = {};
    try {
      general = JSON.parse(bookingContainer.dataset.general || "{}");
    } catch (error) {
      console.error("Error parsing general data:", error);
      general = {};
    }
    try {
      render(
        <BookingApp
          bookingID={bookingID}
          quoteHash={quoteHash}
          general={general}
          openInNewWindow={openInNewWindow}
          targetUrl={targetUrl}
        />,
        bookingContainer
      );
    } catch (error) {
      console.error("Error rendering BookingApp:", error);
    }
  }
};

/**
 * Global function to reinitialize a specific datepicker element.
 * Used when datepicker needs to be reinitialized after DOM changes.
 *
 * @param {HTMLElement} element - DOM element with data-hs-datepicker attribute
 * @returns {boolean} True if datepicker was reinitialized successfully
 */
window.reinitDatepicker = (element) => {
  if (!element) {
    console.error('[Public.js] No element provided to reinitDatepicker');
    return false;
  }

  try {
    // Check if element has data-hs-datepicker attribute
    const config = element.getAttribute('data-hs-datepicker');
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

/**
 * Initialize all datepicker elements on the page.
 * Waits for Preline and Vanilla Calendar libraries to load before initializing.
 */
const initDatepicker = () => {
  // Wait for Preline and Vanilla Calendar to be fully loaded
  setTimeout(() => {
    try {
      // Check for datepicker elements
      const datepickerElements = document.querySelectorAll("[data-hs-datepicker]");

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
      if (
        typeof window.HSDatepicker !== "undefined" &&
        window.HSDatepicker !== null
      ) {
        if (typeof window.HSDatepicker.autoInit === "function") {
          window.HSDatepicker.autoInit();
          return;
        }
      }

      // Method 3: Manual initialization using constructor
      datepickerElements.forEach((element) => {
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

/**
 * Initialize all scripts required for public booking functionality.
 * Runs booking app initialization and datepicker initialization.
 */
const initAllScripts = () => {
  const initFunctions = [
    { name: "Run Booking App", fn: initBookingApp },
    { name: "Init Datepicker", fn: initDatepicker },
  ];
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
let isInitialized = false;

/**
 * Safely initialize all scripts, ensuring initialization runs only once.
 * Prevents multiple initializations on page load.
 */
const safeInitAllScripts = () => {
  if (isInitialized) return;
  isInitialized = true;
  initAllScripts();
};

if (document.readyState === "complete") {
  safeInitAllScripts();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    safeInitAllScripts();
  });
}
