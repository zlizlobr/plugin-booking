
import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { get_price_manager } from './priceManager.js';

export const usePriceManager = () => {
    const price_manager = get_price_manager();
    const [totals, setTotals] = useState(price_manager.get_totals());
    
    useEffect(() => {
        const unsubscribe = price_manager.subscribe((new_totals) => {
            setTotals(new_totals);
        });
        
        setTotals(price_manager.get_totals());
        
        return () => {
            unsubscribe();
        };
    }, []);
    
    return {
        totals,
        base_total: totals.base_total,
        percentage_total: totals.percentage_total,
        grand_total: totals.grand_total,
        manager: price_manager
    };
};

export const useDatePrice = (field_id) => {
    const price_manager = get_price_manager();
    const [contribution, setContribution] = useState(0);
    
    useEffect(() => {
        const item = price_manager.get_date_item(field_id);
        if (item) {
            setContribution(item.contribution || 0);
        }
        
        const unsubscribe = price_manager.subscribe(() => {
            const updated_item = price_manager.get_date_item(field_id);
            if (updated_item) {
                setContribution(updated_item.contribution || 0);
            }
        });
        
        return () => {
            unsubscribe();
        };
    }, [field_id]);
    
    const set_date_price = useCallback((data) => {
        price_manager.set_date_item(field_id, data);
    }, [field_id]);
    
    const remove_date_price = useCallback(() => {
        price_manager.remove_date_item(field_id);
    }, [field_id]);
    
    return {
        contribution,
        set_date_price,
        remove_date_price
    };
};

export const useMapPrice = (field_id) => {
    const price_manager = get_price_manager();
    const [contribution, setContribution] = useState(0);
    
    useEffect(() => {
        const item = price_manager.get_map_item(field_id);
        if (item) {
            setContribution(item.contribution || 0);
        }
        
        const unsubscribe = price_manager.subscribe(() => {
            const updated_item = price_manager.get_map_item(field_id);
            if (updated_item) {
                setContribution(updated_item.contribution || 0);
            }
        });
        
        return () => {
            unsubscribe();
        };
    }, [field_id]);
    
    const set_map_price = useCallback((data) => {
        price_manager.set_map_item(field_id, data);
    }, [field_id]);
    
    const remove_map_price = useCallback(() => {
        price_manager.remove_map_item(field_id);
    }, [field_id]);
    
    return {
        contribution,
        set_map_price,
        remove_map_price
    };
};

export const useProductPrices = (field_id) => {
    const price_manager = get_price_manager();
    const [products, setProducts] = useState([]);
    const is_syncing = useRef(false);
    
    useEffect(() => {
        setProducts(price_manager.get_products_by_field(field_id));
        
        const unsubscribe = price_manager.subscribe(() => {
            if (!is_syncing.current) {
                setProducts(price_manager.get_products_by_field(field_id));
            }
        });
        
        return () => {
            unsubscribe();
        };
    }, [field_id]);
    
    const sync_products = useCallback((product_list) => {
        is_syncing.current = true;
        
        price_manager.remove_products_by_field(field_id);
        
        product_list.forEach((product, index) => {
            price_manager.set_product(field_id, index, {
                product_id: product.product_id,
                price_type: product.price_type || 'value',
                quantity: product.quantity || 1,
                price: product.price || 0,
                percentage_operation: product.percentage_operation || 'add',
                percentage_value: product.percentage_value || 0
            });
        });
        
        is_syncing.current = false;
    }, [field_id]);
    
    const clear_products = useCallback(() => {
        price_manager.remove_products_by_field(field_id);
    }, [field_id]);
    
    return {
        products,
        sync_products,
        clear_products
    };
};

export const useBaseTotal = () => {
    const price_manager = get_price_manager();
    const [base_total, setBaseTotal] = useState(price_manager.get_base_total());
    
    useEffect(() => {
        const unsubscribe = price_manager.subscribe((totals) => {
            setBaseTotal(totals.base_total);
        });
        
        setBaseTotal(price_manager.get_base_total());
        
        return () => {
            unsubscribe();
        };
    }, []);
    
    return base_total;
};

export default usePriceManager;

