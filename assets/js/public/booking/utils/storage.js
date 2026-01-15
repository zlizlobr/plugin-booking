const VERSION = 1;
const TTL_MS = 24 * 60 * 60 * 1_000 * 30;

/**
 * Generate localStorage key for booking draft.
 *
 * @param {number|string} bookingId - Booking post ID
 * @returns {string} Storage key
 */
const key = (bookingId) => `bookingDraft:${bookingId}`;

/**
 * Load booking draft from localStorage.
 *
 * @param {number|string} bookingId - Booking post ID
 * @returns {Object|null} Draft object or null if not found/expired
 */
export function loadDraft(bookingId) {
  const raw = localStorage.getItem(key(bookingId));
  if (!raw) return null;

  try {
    const snap = JSON.parse(raw);
    if (snap.version !== VERSION || Date.now() - snap.savedAt > TTL_MS) return null;
    return snap;
  } catch {
    return null;
  }
}

/**
 * Save booking draft to localStorage.
 *
 * @param {Object} draft - Draft object to save
 * @param {number|string} draft.bookingId - Booking post ID
 * @param {number} draft.version - Draft version
 * @param {number} draft.savedAt - Timestamp when saved
 * @param {number} draft.step - Current step number
 * @param {Object} draft.formData - Form data object
 * @returns {void}
 */
export function saveDraft(draft) {
  localStorage.setItem(key(draft.bookingId), JSON.stringify(draft));
}

/**
 * Partially update booking draft in localStorage.
 *
 * @param {number|string} bookingId - Booking post ID
 * @param {Object} partial - Partial draft data to merge
 * @param {Object} [partial.formData] - Partial form data to merge
 * @param {number} [partial.step] - Step number
 * @returns {void}
 */
export function patchDraft(bookingId, partial) {
  const base = loadDraft(bookingId) || {
    version: VERSION,
    bookingId,
    savedAt: 0,
    step: 0,
    formData: {},
  };

  const next = {
    ...base,
    ...partial,
    formData: { ...base.formData, ...(partial.formData || {}) },
    savedAt: Date.now(),
  };
  saveDraft(next);
}

/**
 * Clear booking draft from localStorage.
 *
 * @param {number|string} bookingId - Booking post ID
 * @returns {void}
 */
export function clearDraft(bookingId) {
  localStorage.removeItem(key(bookingId));
}
