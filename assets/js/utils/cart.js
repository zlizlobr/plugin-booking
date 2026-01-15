
/**
 * Cart manager class for handling shopping cart operations.
 * Manages products, quantities, prices, totals, and provides subscription mechanism for cart updates.
 */
class CartManager {
    /**
     * Initialize cart manager instance.
     *
     * @param {Object|null} dataManager - Data manager instance for draft saving/loading (default: null)
     */
    constructor(dataManager = null) {
        this.dataManager = dataManager;
        this.cartData = {};
        this.subscribers = [];
        this.is_calculating = false;
        this.currency = window.wpcbooking_public?.currency || 'DKK';
    }

    // === SUBSCRIBERS ===
    /**
     * Subscribe to cart updates.
     *
     * @param {Function} callback - Function to call when cart totals change
     * @returns {Function} Unsubscribe function
     */
    subscribe = (callback) => {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(cb => cb !== callback);
        };
    }

    /**
     * Notify all subscribers about cart total changes.
     * Skips notification if calculation is in progress.
     */
    notify_subscribers = () => {
        if (this.is_calculating) return;
        const totals = this.getTotals();
        this.subscribers.forEach(cb => {
            try {
                cb(totals);
            } catch (e) {
                console.error('[CartManager] Subscriber error:', e);
            }
        });
    }

    // === DATA ===
    /**
     * Set cart data and notify subscribers.
     *
     * @param {Object} cartData - Cart data object
     */
    setData = (cartData) => {
        this.cartData = cartData;
        if (this.dataManager?.save_draft) {
            this.dataManager.save_draft({ cart: cartData });
        }
        this.notify_subscribers();
    }

    /**
     * Get cart data, loading from draft if available.
     *
     * @returns {Object} Cart data object
     */
    getData = () => {
        if (this.dataManager?.get_draft) {
            const draft = this.dataManager.get_draft();
            if (draft && draft.cart) {
                this.cartData = draft.cart;
                return draft.cart;
            }
        }
        return this.cartData;
    }

    /**
     * Get value from cart data by key.
     *
     * @param {string} key - Key to retrieve from cart data
     * @returns {*} Value from cart data
     */
    get = (key) => {
        return this.getData()[key];
    }

    /**
     * Set value in cart data by key.
     *
     * @param {string} key - Key to set in cart data
     * @param {*} value - Value to set
     */
    set = (key, value) => {
        const cartData = this.getData();
        cartData[key] = value;
        this.setData(cartData);
    }

    // === PRODUCTS ===
    /**
     * Add product to cart or update quantity if product already exists.
     *
     * @param {number|string} product_id - Product ID
     * @param {number} quantity - Quantity to add (default: 1)
     * @param {number|string|null} variation_id - Variation ID (default: null)
     * @param {Object} variation - Variation object (default: {})
     * @param {Object} cart_item_data - Additional cart item data (default: {})
     * @param {number|Object} price - Product price, can be number or multi-currency object (default: 0)
     * @returns {string} Cart item key
     */
    addProduct = (product_id, quantity = 1, variation_id = null, variation = {}, cart_item_data = {}, price = 0) => {
        const cartData = this.getData();

        if (!cartData.items) {
            cartData.items = [];
        }

        const cart_item_key = this._generateCartItemKey(product_id, variation_id, variation, cart_item_data);
        const existingIndex = cartData.items.findIndex(item => item.cart_item_key === cart_item_key);

        if (existingIndex !== -1) {
            cartData.items[existingIndex].quantity += quantity;
        } else {
            const new_item = {
                cart_item_key,
                product_id,
                quantity,
                variation_id,
                variation,
                cart_item_data,
                price,
                price_type: cart_item_data.price_type || 'value',
                percentage_value: cart_item_data.percentage_value || 0,
                percentage_operation: cart_item_data.percentage_operation || 'add',
                linked_field_id: cart_item_data.linked_field_id || null,
                table_data: cart_item_data.table_data || null,
                field_id: cart_item_data.field_id || null,
                row: cart_item_data.row ?? null,
                name: cart_item_data.name || '',
                step: cart_item_data.step || null,
                added_at: Date.now()
            };
            cartData.items.push(new_item);
        }

        this.setData(cartData);
        this.recalculateTotals();
        return cart_item_key;
    }

    /**
     * Get product from cart by cart item key.
     *
     * @param {string} cart_item_key - Cart item key
     * @returns {Object|null} Product object or null if not found
     */
    getProduct = (cart_item_key) => {
        const cartData = this.getData();
        if (!cartData.items) return null;
        return cartData.items.find(item => item.cart_item_key === cart_item_key) || null;
    }

    /**
     * Get all products from cart.
     *
     * @returns {Array} Array of product objects
     */
    getProducts = () => {
        const cartData = this.getData();
        return cartData.items || [];
    }

    /**
     * Remove product from cart by cart item key.
     *
     * @param {string} cart_item_key - Cart item key
     * @returns {boolean} True if product was removed, false if not found
     */
    removeProduct = (cart_item_key) => {
        const cartData = this.getData();
        if (!cartData.items) return false;

        const index = cartData.items.findIndex(item => item.cart_item_key === cart_item_key);
        if (index !== -1) {
            cartData.items.splice(index, 1);
            this.setData(cartData);
            this.recalculateTotals();
            return true;
        }
        return false;
    }

    /**
     * Delete product from cart (alias for removeProduct).
     *
     * @param {string} cart_item_key - Cart item key
     * @returns {boolean} True if product was removed, false if not found
     */
    deleteProduct = (cart_item_key) => {
        return this.removeProduct(cart_item_key);
    }

    /**
     * Update product quantity in cart.
     *
     * @param {string} cart_item_key - Cart item key
     * @param {number} quantity - New quantity
     * @returns {boolean} True if quantity was updated, false if product not found
     */
    updateQuantity = (cart_item_key, quantity) => {
        const cartData = this.getData();
        if (!cartData.items) return false;
        const item = cartData.items.find(item => item.cart_item_key === cart_item_key);
        if (item) {
            item.quantity = quantity;
            this.setData(cartData);
            this.recalculateTotals();
            return true;
        }
        return false;
    }

    /**
     * Update product quantity and optionally price in cart.
     *
     * @param {string} cart_item_key - Cart item key
     * @param {number} quantity - New quantity (default: 1)
     * @param {number|Object|null} price - New price, can be number or multi-currency object (default: null)
     * @returns {boolean} True if product was updated, false if product not found
     */
    updateProduct = (cart_item_key, quantity = 1, price = null) => {
        const cartData = this.getData();
        if (!cartData.items) return false;
        const item = cartData.items.find(item => item.cart_item_key === cart_item_key);
        if (item) {
            item.quantity = quantity;
            if (price !== null) {
                item.price = price; // Store original format (can be object or number)
            }
            this.setData(cartData);
            this.recalculateTotals();
            return true;
        }
        return false;
    }

    // === PERCENTAGE ===
    /**
     * Set percentage-based pricing for cart item.
     *
     * @param {string} cart_item_key - Cart item key
     * @param {number} percentage_value - Percentage value
     * @param {string} percentage_operation - Operation type: 'add' or 'subtract' (default: 'add')
     * @returns {boolean} True if percentage was set, false if product not found
     */
    setItemPercentage = (cart_item_key, percentage_value, percentage_operation = 'add') => {
        const cartData = this.getData();
        if (!cartData.items) return false;
        const item = cartData.items.find(item => item.cart_item_key === cart_item_key);
        if (item) {
            item.price_type = 'percentage';
            item.percentage_value = percentage_value;
            item.percentage_operation = percentage_operation;
            this.setData(cartData);
            this.recalculateTotals();
            return true;
        }
        return false;
    }

    /**
     * Set price type for cart item (value, percentage, or table).
     *
     * @param {string} cart_item_key - Cart item key
     * @param {string} price_type - Price type: 'value', 'percentage', or 'table'
     * @param {Object} options - Additional options (default: {})
     * @param {number} [options.percentage_value] - Percentage value
     * @param {string} [options.percentage_operation] - Percentage operation: 'add' or 'subtract'
     * @param {Array} [options.table_data] - Table data for table pricing
     * @returns {boolean} True if price type was set, false if product not found
     */
    setItemPriceType = (cart_item_key, price_type, options = {}) => {
        const cartData = this.getData();
        if (!cartData.items) return false;
        const item = cartData.items.find(item => item.cart_item_key === cart_item_key);
        if (item) {
            item.price_type = price_type;
            if (options.percentage_value !== undefined) {
                item.percentage_value = options.percentage_value;
            }
            if (options.percentage_operation) {
                item.percentage_operation = options.percentage_operation;
            }
            if (options.table_data) {
                item.table_data = options.table_data;
            }
            this.setData(cartData);
            this.recalculateTotals();
            return true;
        }
        return false;
    }

    /**
     * Get final calculated price for cart item.
     *
     * @param {string} cart_item_key - Cart item key
     * @returns {number} Final price (0 if item not found or percentage-based)
     */
    getItemFinalPrice = (cart_item_key) => {
        const item = this.getProduct(cart_item_key);
        if (!item) return 0;
        return this._calculateItemPrice(item);
    }

    // === FIELD LINKING ===
    /**
     * Link cart item to form field ID.
     *
     * @param {string} cart_item_key - Cart item key
     * @param {string} field_id - Field ID to link
     * @returns {boolean} True if item was linked, false if product not found
     */
    linkItemToField = (cart_item_key, field_id) => {
        const cartData = this.getData();
        if (!cartData.items) return false;
        const item = cartData.items.find(item => item.cart_item_key === cart_item_key);
        if (item) {
            item.linked_field_id = field_id;
            this.setData(cartData);
            return true;
        }
        return false;
    }

    /**
     * Unlink cart item from form field.
     *
     * @param {string} cart_item_key - Cart item key
     * @returns {boolean} True if item was unlinked, false if product not found
     */
    unlinkItemFromField = (cart_item_key) => {
        return this.linkItemToField(cart_item_key, null);
    }

    /**
     * Handle field value change and update linked cart items.
     *
     * @param {string} field_id - Field ID that changed
     * @param {*} value - New field value
     */
    onFieldChange = (field_id, value) => {
        const cartData = this.getData();
        if (!cartData.items) return;

        let changed = false;
        cartData.items.forEach(item => {
            if (item.linked_field_id === field_id) {
                if (item.price_type === 'table' && item.table_data) {
                    const new_price = this._lookupTablePrice(item.table_data, value);
                    if (new_price !== null) {
                        item.price = new_price;
                        changed = true;
                    }
                } else {
                    item.quantity = parseInt(value) || 1;
                    changed = true;
                }
            }
        });

        if (changed) {
            this.setData(cartData);
            this.recalculateTotals();
        }
    }

    // === TOTALS ===
    /**
     * Recalculate cart totals including base total and percentage total.
     * Updates cart data and notifies subscribers.
     */
    recalculateTotals = () => {
        if (this.is_calculating) return;
        this.is_calculating = true;

        const cartData = this.getData();
        const items = cartData.items || [];

        let base_total = 0;
        let percentage_total = 0;

        // First pass: calculate base_total (non-percentage items)
        items.forEach(item => {
            if (item.price_type !== 'percentage') {
                base_total += this._calculateItemPrice(item);
            }
        });

        // Second pass: calculate percentage items based on base_total
        items.forEach(item => {
            console.log('🔍 [CartManager] item: ', item);
            if (item.price_type === 'percentage') {
                const pct = parseFloat(item.percentage_value) || 0;
                const contribution = base_total * (pct / 100);
                percentage_total += item.percentage_operation === 'subtract' ? -contribution : contribution;
            }
        });

        cartData.base_total = base_total;
        cartData.percentage_total = percentage_total;
        cartData.grand_total = base_total + percentage_total;
        this.cartData = cartData;
        if (this.dataManager?.save_draft) {
            this.dataManager.save_draft({ cart: cartData });
        }

        this.is_calculating = false;
        this.notify_subscribers();
    }

    /**
     * Calculate price for single cart item.
     *
     * @param {Object} item - Cart item object
     * @returns {number} Calculated price (0 for percentage items)
     * @private
     */
    _calculateItemPrice = (item) => {
        if (item.price_type === 'percentage') {
            return 0;
        }
        const qty = parseInt(item.quantity) || 1;
        const price = this._normalizePrice(item.price);
        return qty * price;
    }

    /**
     * Lookup price from table data based on value.
     *
     * @param {Array} table_data - Table data array with min, max, price
     * @param {*} value - Value to lookup
     * @returns {number|null} Price from table or null if not found
     * @private
     */
    _lookupTablePrice = (table_data, value) => {
        if (!Array.isArray(table_data)) return null;
        const numValue = parseInt(value) || 0;
        
        for (const row of table_data) {
            const min = parseInt(row.min) || 0;
            const max = parseInt(row.max) || Infinity;
            if (numValue >= min && numValue <= max) {
                const price = this._normalizePrice(row.price);
                return price;
            }
        }
        return null;
    }

    /**
     * Get base total (sum of non-percentage items).
     *
     * @returns {number} Base total
     */
    getBaseTotal = () => {
        const cartData = this.getData();
        return cartData.base_total || 0;
    }

    /**
     * Get percentage total (sum of percentage-based adjustments).
     *
     * @returns {number} Percentage total
     */
    getPercentageTotal = () => {
        const cartData = this.getData();
        return cartData.percentage_total || 0;
    }

    /**
     * Get grand total (base total + percentage total).
     *
     * @returns {number} Grand total
     */
    getGrandTotal = () => {
        const cartData = this.getData();
        return cartData.grand_total || 0;
    }

    /**
     * Get all cart totals as object.
     *
     * @returns {Object} Object with base_total, percentage_total, and grand_total
     */
    getTotals = () => {
        const cartData = this.getData();
        return {
            base_total: cartData.base_total || 0,
            percentage_total: cartData.percentage_total || 0,
            grand_total: cartData.grand_total || 0
        };
    }

    /**
     * Get cart total (alias for getGrandTotal).
     *
     * @returns {number} Grand total
     */
    getCartTotal = () => {
        return this.getGrandTotal();
    }

    // === COUNTS ===
    /**
     * Get total item count (sum of all quantities).
     *
     * @returns {number} Total item count
     */
    getItemCount = () => {
        const cartData = this.getData();
        if (!cartData.items) return 0;
        return cartData.items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Get number of unique products in cart.
     *
     * @returns {number} Number of unique products
     */
    getProductCount = () => {
        const cartData = this.getData();
        return cartData.items ? cartData.items.length : 0;
    }

    /**
     * Clear all items and reset totals in cart.
     */
    clearCart = () => {
        const cartData = this.getData();
        cartData.items = [];
        cartData.base_total = 0;
        cartData.percentage_total = 0;
        cartData.grand_total = 0;
        this.setData(cartData);
    }

    /**
     * Check if cart is empty.
     *
     * @returns {boolean} True if cart is empty
     */
    isEmpty = () => {
        const cartData = this.getData();
        return !cartData.items || cartData.items.length === 0;
    }

    /**
     * Check if cart contains product with given cart item key.
     *
     * @param {string} cart_item_key - Cart item key
     * @returns {boolean} True if product exists in cart
     */
    hasProduct = (cart_item_key) => {
        return this.getProduct(cart_item_key) !== null;
    }

    /**
     * Find all cart items with given product ID.
     *
     * @param {number|string} product_id - Product ID
     * @returns {Array} Array of matching cart items
     */
    findProductById = (product_id) => {
        const cartData = this.getData();
        if (!cartData.items) return [];
        return cartData.items.filter(item => item.product_id === product_id);
    }

    /**
     * Find all cart items linked to given field ID.
     *
     * @param {string} field_id - Field ID
     * @returns {Array} Array of matching cart items
     */
    findProductsByField = (field_id) => {
        const cartData = this.getData();
        if (!cartData.items) return [];
        return cartData.items.filter(item => item.field_id === field_id);
    }

    /**
     * Find all cart items linked to given field ID via linked_field_id.
     *
     * @param {string} linked_field_id - Linked field ID
     * @returns {Array} Array of matching cart items
     */
    findProductsByLinkedField = (linked_field_id) => {
        const cartData = this.getData();
        if (!cartData.items) return [];
        return cartData.items.filter(item => item.linked_field_id === linked_field_id);
    }

    // === PRICE NORMALIZATION ===
    /**
     * Normalize price value to number, handling multi-currency objects.
     *
     * @param {number|Object|string|null} price - Price value (can be number, object, or string)
     * @param {string|null} currency - Currency code for multi-currency objects (default: null, uses instance currency)
     * @returns {number} Normalized price as number
     * @private
     */
    _normalizePrice = (price, currency = null) => {
        if (price === null || price === undefined) return 0;
        
        const curr = currency || this.currency;
        
        // If price is object (multi-currency)
        if (typeof price === 'object' && !Array.isArray(price)) {
            const value = price[curr];
            return parseFloat(value) || 0;
        }
        
        // If price is already a number or string
        return parseFloat(price) || 0;
    }

    // === UTILS ===
    /**
     * Normalize object by sorting keys recursively.
     *
     * @param {*} obj - Object to normalize
     * @returns {*} Normalized object with sorted keys
     * @private
     */
    _normalizeObject = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(this._normalizeObject);
        
        const sorted = {};
        Object.keys(obj).sort().forEach(key => {
            sorted[key] = this._normalizeObject(obj[key]);
        });
        return sorted;
    }

    /**
     * Generate simple hash from string.
     *
     * @param {string} str - String to hash
     * @returns {string} Hash string
     * @private
     */
    _simpleHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }

    /**
     * Generate unique cart item key from product data.
     *
     * @param {number|string} product_id - Product ID
     * @param {number|string|null} variation_id - Variation ID
     * @param {Object} variation - Variation object
     * @param {Object} cart_item_data - Cart item data
     * @returns {string} Unique cart item key
     */
    generateCartItemKey = (product_id, variation_id, variation, cart_item_data) => {
        const parts = [product_id];
        
        if (variation_id) {
            parts.push(variation_id);
        }
        
        if (variation && Object.keys(variation).length > 0) {
            const normalizedVariation = this._normalizeObject(variation);
            parts.push(JSON.stringify(normalizedVariation));
        }
        
        if (cart_item_data && Object.keys(cart_item_data).length > 0) {
            const normalizedData = this._normalizeObject(cart_item_data);
            parts.push(JSON.stringify(normalizedData));
        }
        
        const keyString = parts.join('_');
        const hash = this._simpleHash(keyString);
        return hash;
    }

    /**
     * Generate cart item key (internal method, alias for generateCartItemKey).
     *
     * @param {number|string} product_id - Product ID
     * @param {number|string|null} variation_id - Variation ID
     * @param {Object} variation - Variation object
     * @param {Object} cart_item_data - Cart item data
     * @returns {string} Unique cart item key
     * @private
     */
    _generateCartItemKey = (product_id, variation_id, variation, cart_item_data) => {
        return this.generateCartItemKey(product_id, variation_id, variation, cart_item_data);
    }

    /**
     * Get cart products (alias for getProducts).
     *
     * @returns {Array} Array of product objects
     */
    getCart = () => {
        return this.getProducts();
    }

    // === CART ITEM DATA ===
    /**
     * Update cart item data.
     *
     * @param {string} cart_item_key - Cart item key
     * @param {Object} new_data - New data to merge with existing cart item data
     * @returns {boolean} True if data was updated, false if product not found
     */
    updateCartItemData = (cart_item_key, new_data) => {
        const cartData = this.getData();
        if (!cartData.items) return false;
        const item = cartData.items.find(item => item.cart_item_key === cart_item_key);
        if (item) {
            item.cart_item_data = { ...item.cart_item_data, ...new_data };
            
            // Also update top-level properties for easier access
            if (new_data.name !== undefined) {
                item.name = new_data.name;
            }
            if (new_data.step !== undefined) {
                item.step = new_data.step;
            }
            
            this.setData(cartData);
            return true;
        }
        console.warn('🛒 [CartManager] updateCartItemData - item not found:', cart_item_key);
        return false;
    }

    /**
     * Get all cart items for specific step number.
     *
     * @param {number|string} step_num - Step number
     * @returns {Array} Array of cart items filtered by step
     */
    get_items_by_step = (step_num) => {
        const cartData = this.getData();
        if (!cartData.items) {
            return [];
        }
        
        const filtered_items = cartData.items
            .filter(item => {
                // Check both item.step and item.cart_item_data.step
                const item_step = item.step || item.cart_item_data?.step;
                return item_step === step_num;
            })
            .map(item => ({
                cart_item_key: item.cart_item_key,
                product_id: item.product_id,
                name: item.name || item.cart_item_data?.name || '',
                label: item.label || item.cart_item_data?.label,
                title: item.title || item.cart_item_data?.title,
                price: this._normalizePrice(item.price),
                value: this._normalizePrice(item.price),
                quantity: item.quantity || 1,
                step: item.step || item.cart_item_data?.step
            }));

        return filtered_items;
    }

    // === INCLUDED PRODUCTS ===
    /**
     * Add included products for table row.
     *
     * @param {string|number} row_id - Row ID
     * @param {string} field_id - Field ID
     * @param {Array|number|string} product_ids - Product ID(s) to include
     * @returns {boolean} True if products were added
     */
    addIncludedProducts = (row_id, field_id, product_ids) => {
        const cartData = this.getData();
        
        if (!cartData.included_products) {
            cartData.included_products = [];
        }

        cartData.included_products = cartData.included_products.filter(
            item => !(item.row_id === row_id && item.field_id === field_id)
        );

        cartData.included_products.push({
            row_id,
            field_id,
            product_ids: Array.isArray(product_ids) ? product_ids : [product_ids],
            added_at: Date.now()
        });

        this.setData(cartData);
        return true;
    }

    /**
     * Remove included products for table row.
     *
     * @param {string|number} row_id - Row ID
     * @param {string} field_id - Field ID
     * @returns {boolean} True if products were removed
     */
    removeIncludedProducts = (row_id, field_id) => {
        const cartData = this.getData();
        
        if (!cartData.included_products) return false;

        const initial_length = cartData.included_products.length;
        cartData.included_products = cartData.included_products.filter(
            item => !(item.row_id === row_id && item.field_id === field_id)
        );

        if (cartData.included_products.length !== initial_length) {
            this.setData(cartData);
            return true;
        }
        return false;
    }

    /**
     * Get all included products.
     *
     * @returns {Array} Array of included product objects
     */
    getIncludedProducts = () => {
        const cartData = this.getData();
        return cartData.included_products || [];
    }

    /**
     * Get all included product IDs as flat array.
     *
     * @returns {Array} Array of product IDs
     */
    getIncludedProductIds = () => {
        const included = this.getIncludedProducts();
        const all_ids = [];
        included.forEach(item => {
            if (Array.isArray(item.product_ids)) {
                all_ids.push(...item.product_ids);
            }
        });
        return all_ids;
    }

    /**
     * Check if product ID is in included products.
     *
     * @param {number|string} product_id - Product ID to check
     * @returns {boolean} True if product is included
     */
    hasIncludedProduct = (product_id) => {
        return this.getIncludedProductIds().includes(product_id);
    }
}

// Singleton
let cart_manager_instance = null;

/**
 * Get or create cart manager singleton instance.
 *
 * @param {Object|null} dataManager - Data manager instance for draft saving/loading (default: null)
 * @returns {CartManager|null} Cart manager instance or null if dataManager not provided
 */
export const getCartManager = (dataManager = null) => {
    if (!cart_manager_instance && dataManager) {
        cart_manager_instance = new CartManager(dataManager);
    }
    return cart_manager_instance;
};

/**
 * Reset cart manager singleton instance.
 */
export const resetCartManager = () => {
    cart_manager_instance = null;
};

export default CartManager;

