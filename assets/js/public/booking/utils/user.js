/**
 * User data manager for booking forms.
 * Handles user data storage and retrieval from draft.
 *
 * @package Wpcbooking
 * @since 1.0.0
 */
class UserManager {
    /**
     * Creates an instance of UserManager.
     *
     * @param {Object} BookingFormManager - Booking form manager instance
     */
    constructor(BookingFormManager) {
        this.BookingFormManager = BookingFormManager;
        this.bookingID = this.BookingFormManager.getBookingId();
        this.userData = {};
    }
    
    /**
     * Set user data and save to draft.
     *
     * @param {Object} userData - User data object
     * @returns {void}
     */
    setData = (userData) => {  
        this.userData = userData;
        this.BookingFormManager.save_draft({ user: userData });
    }

    /**
     * Get user data from draft or cache.
     *
     * @returns {Object} User data object
     */
    getData = () => {
        const draft = this.BookingFormManager.get_draft();
        if (draft && draft.user) {
            this.userData = draft.user;
            return draft.user;
        }
        return this.userData;
    }

    /**
     * Get specific user data field.
     *
     * @param {string} key - Data field key
     * @returns {mixed} Field value
     */
    get = (key) => {
        return this.getData()[key];
    }

    /**
     * Set specific user data field.
     *
     * @param {string} key - Data field key
     * @param {mixed} value - Field value
     * @returns {void}
     */
    set = (key, value) => {
        const userData = this.getData();
        userData[key] = value;
        this.setData(userData);
    }
}

export default UserManager;

