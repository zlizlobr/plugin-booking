
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { __ } from '@wordpress/i18n';

const PriceIncreaseControl = ({ fieldId = '', basePrice = 0, value = {}, onChange, className = '', currencySymbol = '' }) => {
	const get_operator = () => {
		// JS format
		if (value.operator) return value.operator;
		// PHP format: percentage.operation
		if (value.percentage?.operation) {
			return value.percentage.operation === 'substract' || value.percentage.operation === 'subtract' ? '-' : '+';
		}
		// Legacy PHP format
		if (value.percentage?.add_substract) {
			return value.percentage.add_substract === 'substract' ? '-' : '+';
		}
		return '+';
	};

	const get_percentage = () => {
		// JS format
		if (typeof value.percentage === 'number') return Math.round(value.percentage);
		// PHP format: percentage.price_increase
		if (value.percentage?.price_increase !== undefined) return Math.round(parseFloat(value.percentage.price_increase) || 0);
		// Legacy PHP format
		if (value.percentage?.value !== undefined) return Math.round(value.percentage.value);
		return 0;
	};

	const [operator, setOperator] = useState(get_operator());
	const [percentage, setPercentage] = useState(get_percentage());
	const [percentageAmount, setPercentageAmount] = useState(0);
	const prevValuesRef = useRef({ operator, percentage, basePrice });
	const debounceTimerRef = useRef(null);

	// Helper pro vytvoření description textu o basePrice
	const get_base_price_description = () => {
		if (!basePrice || basePrice === 0) return null;
		
		return __('Percentage is calculated from base price:', 'wpcbooking') + ` ${basePrice.toFixed(2)} ${currencySymbol}`;
	};

	useEffect(() => {
		const amount = basePrice * (percentage / 100);
		setPercentageAmount(amount);
		
		const prev = prevValuesRef.current;
		const hasChanged = 
			prev.operator !== operator || 
			prev.percentage !== percentage || 
			prev.basePrice !== basePrice;
		
		if (hasChanged && onChange) {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			debounceTimerRef.current = setTimeout(() => {
				prevValuesRef.current = { operator, percentage, basePrice };
				onChange({
					operator,
					percentage,
					total: amount,
					base_price: basePrice,
					calculated_total: amount
				});
			}, 1000);
		}

		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [operator, percentage, basePrice, onChange]);

	return (
		<div className={`flex gap-3 items-center ${className}`}>
			<select
				name={fieldId + '_percentage[operation]'}
				value={operator}
				onChange={(e) => setOperator(e.target.value)}
				className="px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<option value="+">+</option>
				<option value="-">-</option>
			</select>

			<input
				type="number"
				name={fieldId + '_percentage[price_increase]'}
				value={percentage}
				min={0}
				max={100}
				step={1}
				placeholder={__('Percentage', 'wpcbooking')}
				className="w-24 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				onInput={(e) => setPercentage(Math.round(parseFloat(e.target.value) || 0))}
			/>

			<span className="text-gray-600">%</span>

			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-600">{operator === '+' ? __('Add:', 'wpcbooking') : __('Subtract:', 'wpcbooking')}</span>
				<input
					type="text"
					name={`${fieldId}_percentage[price]`}
					value={Math.round(percentageAmount).toFixed(2)}
					readOnly
					className="w-32 px-3 py-2 border border-gray-200 rounded bg-gray-50 text-gray-700 cursor-not-allowed"
				/>
				<span className="currnency_symbol text-sm text-gray-500">{currencySymbol}</span>
			</div>

			{/* ✅ Description text o basePrice */}
			{get_base_price_description() && (
				<div className="w-full mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
					<p className="text-xs text-blue-700">
						{get_base_price_description()}
					</p>
				</div>
			)}
		</div>
	);
};

export default PriceIncreaseControl;

