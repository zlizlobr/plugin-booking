
class PriceManager {
    constructor() {
        this.data = {
            date_items: {},
            map_items: {},
            products: {},
            base_total: 0,
            percentage_total: 0,
            grand_total: 0
        };
        this.listeners = [];
        this.is_calculating = false;
    }

    subscribe = (listener) => {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify_listeners = () => {
        if (this.is_calculating) return;
        
        const totals = this.get_totals();
        this.listeners.forEach(listener => {
            try {
                listener(totals);
            } catch (error) {
                console.error('[PriceManager] Listener error:', error);
            }
        });
    }

    set_date_item = (field_id, data) => {
        const { base_value = 0, percentage = 0, operation = 'add' } = data;
        
        const percentage_value = this._calculate_percentage_contribution(base_value, percentage, operation);
        
        this.data.date_items[field_id] = {
            field_id,
            base_value,
            percentage,
            operation,
            contribution: percentage_value,
            updated_at: Date.now()
        };
        
        this._recalculate();
        return this.data.date_items[field_id];
    }

    remove_date_item = (field_id) => {
        if (this.data.date_items[field_id]) {
            delete this.data.date_items[field_id];
            this._recalculate();
            return true;
        }
        return false;
    }

    get_date_item = (field_id) => {
        return this.data.date_items[field_id] || null;
    }

    get_date_items = () => {
        return Object.values(this.data.date_items);
    }

    set_map_item = (field_id, data) => {
        const { distance = 0, percentage = 0, operation = 'add' } = data;
        
        const percentage_value = this._calculate_percentage_contribution(distance, percentage, operation);
        
        this.data.map_items[field_id] = {
            field_id,
            distance,
            percentage,
            operation,
            contribution: percentage_value,
            updated_at: Date.now()
        };
        
        this._recalculate();
        return this.data.map_items[field_id];
    }

    remove_map_item = (field_id) => {
        if (this.data.map_items[field_id]) {
            delete this.data.map_items[field_id];
            this._recalculate();
            return true;
        }
        return false;
    }

    get_map_item = (field_id) => {
        return this.data.map_items[field_id] || null;
    }

    get_map_items = () => {
        return Object.values(this.data.map_items);
    }

    set_product = (field_id, product_index, product_data) => {
        const key = this._generate_product_key(field_id, product_index);
        const {
            product_id,
            price_type = 'value',
            quantity = 1,
            price = 0,
            percentage_operation = 'add',
            percentage_value = 0
        } = product_data;

        this.data.products[key] = {
            key,
            field_id,
            product_index,
            product_id,
            price_type,
            quantity,
            price,
            percentage_operation,
            percentage_value,
            updated_at: Date.now()
        };

        this._recalculate();
        return this.data.products[key];
    }

    remove_product = (field_id, product_index) => {
        const key = this._generate_product_key(field_id, product_index);
        if (this.data.products[key]) {
            delete this.data.products[key];
            this._recalculate();
            return true;
        }
        return false;
    }

    remove_products_by_field = (field_id) => {
        const keys_to_remove = Object.keys(this.data.products).filter(key => 
            this.data.products[key].field_id === field_id
        );
        
        keys_to_remove.forEach(key => {
            delete this.data.products[key];
        });
        
        if (keys_to_remove.length > 0) {
            this._recalculate();
        }
        
        return keys_to_remove.length;
    }

    get_product = (field_id, product_index) => {
        const key = this._generate_product_key(field_id, product_index);
        return this.data.products[key] || null;
    }

    get_products = () => {
        return Object.values(this.data.products);
    }

    get_products_by_field = (field_id) => {
        return Object.values(this.data.products).filter(p => p.field_id === field_id);
    }

    get_base_total = () => {
        return this.data.base_total;
    }

    get_percentage_total = () => {
        return this.data.percentage_total;
    }

    get_grand_total = () => {
        return this.data.grand_total;
    }

    get_totals = () => {
        return {
            base_total: this.data.base_total,
            percentage_total: this.data.percentage_total,
            grand_total: this.data.grand_total,
            date_contribution: this._get_date_contribution(),
            map_contribution: this._get_map_contribution(),
            products_base: this._get_products_base_total(),
            products_percentage: this._get_products_percentage_total()
        };
    }

    clear = () => {
        this.data = {
            date_items: {},
            map_items: {},
            products: {},
            base_total: 0,
            percentage_total: 0,
            grand_total: 0
        };
        this.notify_listeners();
    }

    _generate_product_key = (field_id, product_index) => {
        return `${field_id}_${product_index}`;
    }

    _calculate_percentage_contribution = (base_value, percentage, operation) => {
        if (percentage === 0 || base_value === 0) {
            return 0;
        }
        
        const percentage_amount = base_value * (Math.abs(percentage) / 100);
        return operation === 'subtract' ? -percentage_amount : percentage_amount;
    }

    _get_date_contribution = () => {
        let total = 0;
        Object.values(this.data.date_items).forEach(item => {
            total += item.contribution || 0;
        });
        return total;
    }

    _get_map_contribution = () => {
        let total = 0;
        Object.values(this.data.map_items).forEach(item => {
            total += item.contribution || 0;
        });
        return total;
    }

    _get_products_base_total = () => {
        let total = 0;
        Object.values(this.data.products).forEach(product => {
            if (product.price_type !== 'percentage') {
                const quantity = parseInt(product.quantity) || 1;
                const price = parseFloat(product.price) || 0;
                total += quantity * price;
            }
        });
        return total;
    }

    _get_products_percentage_total = () => {
        const base = this.data.base_total;
        let total = 0;
        
        Object.values(this.data.products).forEach(product => {
            if (product.price_type === 'percentage') {
                const percentage = parseFloat(product.percentage_value) || 0;
                const operation = product.percentage_operation || 'add';
                total += this._calculate_percentage_contribution(base, percentage, operation);
            }
        });
        
        return total;
    }

    _recalculate = () => {
        if (this.is_calculating) return;
        
        this.is_calculating = true;
        
        try {
            const date_contribution = this._get_date_contribution();
            const map_contribution = this._get_map_contribution();
            const products_base = this._get_products_base_total();
            
            this.data.base_total = date_contribution + map_contribution + products_base;
            
            this.data.percentage_total = this._get_products_percentage_total();
            
            this.data.grand_total = this.data.base_total + this.data.percentage_total;
        } finally {
            this.is_calculating = false;
        }
        
        this.notify_listeners();
    }

    update_percentage_displays = () => {
        const base_total = this.data.base_total;
        
        document.querySelectorAll('.js-total-base').forEach(el => {
            el.textContent = base_total.toFixed(2);
        });
        
        document.querySelectorAll('.js-block-percetage-calc.product').forEach(el => {
            const percentage_el = el.querySelector('.js-item-percentage');
            const total_el = el.querySelector('.js-price-item-percentage');
            
            if (percentage_el && total_el) {
                const percentage = parseFloat(percentage_el.textContent) || 0;
                const calculated = base_total * (Math.abs(percentage) / 100);
                total_el.textContent = calculated.toFixed(2);
            }
        });
    }

    to_json = () => {
        return JSON.stringify({
            date_items: this.data.date_items,
            map_items: this.data.map_items,
            products: this.data.products,
            totals: this.get_totals()
        });
    }

    from_json = (json_string) => {
        try {
            const parsed = JSON.parse(json_string);
            
            if (parsed.date_items) {
                this.data.date_items = parsed.date_items;
            }
            if (parsed.map_items) {
                this.data.map_items = parsed.map_items;
            }
            if (parsed.products) {
                this.data.products = parsed.products;
            }
            
            this._recalculate();
            return true;
        } catch (error) {
            console.error('[PriceManager] Failed to parse JSON:', error);
            return false;
        }
    }
}

let price_manager_instance = null;

export const get_price_manager = () => {
    if (!price_manager_instance) {
        price_manager_instance = new PriceManager();
    }
    return price_manager_instance;
};

export const reset_price_manager = () => {
    if (price_manager_instance) {
        price_manager_instance.clear();
    }
    price_manager_instance = null;
};

export default PriceManager;

