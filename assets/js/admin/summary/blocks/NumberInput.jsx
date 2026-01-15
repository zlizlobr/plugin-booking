

import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { BaseAdminBlockComponent } from './BlockComponent.jsx';
import { update_field_value } from '../signals/summarySignals.js';

const NumberInput = (props) => {
	const component = new BaseAdminBlockComponent(props);
	const [localValue, setLocalValue] = useState(component.value || 0);
	const debounceTimerRef = useRef(null);

	useEffect(() => {
		setLocalValue(component.value || 0);
	}, [component.value]);

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	const handleInputChange = (newValue) => {
		setLocalValue(newValue);

		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		debounceTimerRef.current = setTimeout(() => {
			update_field_value(component.fieldId, newValue);
			component.handle_change(newValue);
		}, 1000);
	};

	component.render_input = () => {
		const min = component.attrs.min || 0;
		const max = component.attrs.max || null;
		const step = component.attrs.step || 1;
		const placeholder = component.attrs.placeholder || '';

		return (
			<input
				type="number"
				id={component.fieldId}
				name={component.fieldId}
				value={localValue}
				min={min}
				max={max}
				step={step}
				placeholder={placeholder}
				className="js-field-number w-32 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				onInput={(e) => {
					const newValue = parseFloat(e.target.value) || 0;
					handleInputChange(newValue);
				}}
			/>
		);
	};

	component.get_default_label = () => __('Number', 'wpcbooking');

	return component.render();
};

export default NumberInput;

