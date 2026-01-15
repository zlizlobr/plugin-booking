
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { field_values } from '../../signals/summarySignals.js';

const ValuePriceControl = ({ 
	fieldId = "",
	value = {}, 
	onChange, 
	className = '', 
	currencySymbol = '',
	numberFields = []
}) => {
	const map_qty_type = (type) => {
		if (type === 'per_field') return 'field_connected';
		if (type === 'fixed') return 'not_connected';
		return type || 'not_connected';
	};

	const extract_price = (price_value) => {
		if (typeof price_value === 'number') return price_value;
		if (typeof price_value === 'object' && price_value !== null) {
			return parseFloat(Object.values(price_value)[0]) || 0;
		}
		return parseFloat(price_value) || 0;
	};

	const extract_quantity = (val) => {
		if (val.quantity !== undefined) return parseInt(val.quantity) || 1;
		if (val.qty !== undefined) return parseInt(val.qty) || 1;
		return 1;
	};

	const mapped_qty_type = map_qty_type(value.qty_type);

	const [qty_type, set_qty_type] = useState(mapped_qty_type);
	const [qty_field, set_qty_field] = useState(value.qty_field || '');
	const [quantity, set_quantity] = useState(extract_quantity(value));
	const [price, set_price] = useState(extract_price(value.price));
	const prevValuesRef = useRef({ qty_type: mapped_qty_type, qty_field: value.qty_field || '', quantity: extract_quantity(value), price: extract_price(value.price) });
	const isInitRef = useRef(false);
	const debounceTimerRef = useRef(null);

	const get_actual_quantity = () => {
		if (qty_type === 'field_connected' && qty_field) {
			const field_value = field_values.value[qty_field];
			return field_value !== undefined ? parseInt(field_value) || 1 : quantity;
		}
		return quantity;
	};

	// Helper pro získání labelu fieldu z field_id
	const get_field_label = (field_id) => {
		if (!field_id || field_id === 'none') return null;
		
		// Zkusit najít v numberFields prop
		const field = numberFields.find(f => f.value === field_id);
		if (field) return field.label;
		
		// Fallback na window.wpcbookingAdminData
		const allFields = window.wpcbookingAdminData?.number_fields || {};
		return allFields[field_id] || field_id;
	};

	// Helper pro vytvoření description textu o propojení quantity
	const get_quantity_mapping_description = () => {
		if (qty_type !== 'field_connected' || !qty_field) return null;
		
		const fieldLabel = get_field_label(qty_field);
		if (!fieldLabel) return null;
		
		const fieldValue = field_values.value[qty_field];
		let description = __('Quantity is connected to:', 'wpcbooking') + ` ${fieldLabel}`;
		
		if (fieldValue !== undefined) {
			description += ` - ${__('Current value:', 'wpcbooking')} ${fieldValue}`;
		}
		
		return description;
	};

	useEffect(() => {
		if (!isInitRef.current && value.qty_type) {
			const newType = map_qty_type(value.qty_type);
			set_qty_type(newType);
			set_qty_field(value.qty_field || '');
			set_quantity(extract_quantity(value));
			set_price(extract_price(value.price));
			isInitRef.current = true;
		}
	}, [value]);

	const calculate_total = () => {
		const qty = get_actual_quantity();
		const priceVal = parseFloat(price) || 0;
		return (qty * priceVal).toFixed(2);
	};

	useEffect(() => {
		if (qty_type === 'field_connected' && qty_field) {
			const field_value = field_values.value[qty_field];
			if (field_value !== undefined) {
				const new_qty = parseInt(field_value) || 1;
				if (new_qty !== quantity) {
					set_quantity(new_qty);
				}
			}
		}
	}, [field_values.value, qty_field, qty_type]);

	useEffect(() => {
		const prev = prevValuesRef.current;
		const hasChanged = 
			prev.qty_type !== qty_type || 
			prev.qty_field !== qty_field || 
			prev.quantity !== quantity || 
			prev.price !== price;
		
		if (hasChanged && onChange) {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			debounceTimerRef.current = setTimeout(() => {
				const calculated_total = parseFloat(calculate_total());
				prevValuesRef.current = { qty_type, qty_field, quantity, price };
				onChange({
					qty_type,
					qty_field,
					qty: quantity,
					quantity,
					price,
					calculated_total
				});
			}, 1000);
		}

		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [qty_type, qty_field, quantity, price, onChange]);

	return (
		<div className={`flex flex-wrap gap-4 items-start ${className}`}>
			<div className="flex flex-col flex-1 min-w-[160px] js-qty-connection">
				<label className="text-sm font-medium text-gray-700">{__('Qty Connection', 'wpcbooking')}</label>
				<select
					name={`${fieldId}[qty_type]`}
					value={qty_type}
					className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-connection-type focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => set_qty_type(e.target.value)}
				>
					<option value="not_connected">{__('Not Connected', 'wpcbooking')}</option>
					<option value="field_connected">{__('Connected to Field', 'wpcbooking')}</option>
				</select>
			</div>

			{qty_type === 'field_connected' && (
				<div className="flex flex-col flex-1 min-w-[160px] js-qty-field">
					<label className="text-sm font-medium text-gray-700">{__('Qty Field', 'wpcbooking')}</label>
					<select
						name={`${fieldId}[qty_field]`}
						value={qty_field}
						className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-number-field focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={(e) => set_qty_field(e.target.value)}
					>
						<option value="">{__('Select field', 'wpcbooking')}</option>
						{numberFields.map((field) => (
							<option key={field.value} value={field.value}>
								{field.label}
							</option>
						))}
					</select>
				</div>
			)}

			<div className="flex flex-col flex-1 min-w-[120px] js-qty">
				<label className="text-sm font-medium text-gray-700">{__('Quantity', 'wpcbooking')}</label>
				<input
					name={`${fieldId}[qty]`}
					type="number"
					value={quantity}
					min="1"
					readOnly={qty_type === 'field_connected'}
					className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-qty-manual focus:outline-none focus:ring-2 focus:ring-blue-500"
					onInput={(e) => set_quantity(parseInt(e.target.value) || 1)}
				/>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex flex-col flex-1 min-w-[140px] js-price-field">
					<label className="text-sm font-medium text-gray-700">{__('Price', 'wpcbooking')}</label>
					<input
						name={`${fieldId}[price]`}
						type="number"
						value={price}
						min="0"
						step="1"
						className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-price-number focus:outline-none focus:ring-2 focus:ring-blue-500"
						onInput={(e) => set_price(parseFloat(e.target.value) || 0)}
					/>
				</div>

				<div className="flex flex-col justify-end">
					<label className="text-sm font-medium text-gray-700">{__('Total', 'wpcbooking')}</label>
					<span className="text-sm mt-1 h-full flex items-center js-span-price-total">
						<span className="block-total-price">{calculate_total()}</span>
						<span className="ml-1 text-gray-600 currnency_symbol">{currencySymbol}</span>
					</span>
				</div>
			</div>

			{/* ✅ Description text o propojení quantity */}
			{get_quantity_mapping_description() && (
				<div className="w-full mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
					<p className="text-xs text-blue-700">
						{get_quantity_mapping_description()}
					</p>
				</div>
			)}
		</div>
	);
};

export default ValuePriceControl;

