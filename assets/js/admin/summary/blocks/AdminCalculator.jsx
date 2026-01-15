

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { BaseAdminBlockComponent } from './BlockComponent.jsx';

const AdminCalculator = (props) => {
	const component = new BaseAdminBlockComponent(props);
	const [operation, setOperation] = useState(component.attrs.operation || 'add');
	const [percentage, setPercentage] = useState(component.attrs.percentage || 0);
	const baseTotal = component.attrs.base_total || 0;

	const calculatedValue = operation === 'add'
		? (baseTotal * percentage) / 100
		: -(baseTotal * percentage) / 100;

	component.render_input = () => (
		<div className="relative p-4 border border-gray-300 border-dotted mt-10">
			<label className="absolute -top-3 bg-white px-2">
				{component.attrs.calculator_label || __('Calculator', 'wpcbooking')}
			</label>
			<div className="flex items-center gap-2">
				<select
					value={operation}
					onChange={(e) => setOperation(e.target.value)}
					className="px-2 py-1 border rounded"
				>
					<option value="add">{__('Add', 'wpcbooking')}</option>
					<option value="subtract">{__('Subtract', 'wpcbooking')}</option>
				</select>
				<input
					type="number"
					min="0"
					value={percentage}
					onInput={(e) => setPercentage(parseFloat(e.target.value) || 0)}
					className="w-20 px-2 py-1 border rounded"
				/>
				<span className="text-gray-600">
					<span className="font-semibold">{percentage}%</span> {__('of', 'wpcbooking')} <span className="font-semibold">{baseTotal}</span>
					{' = '}<span className="font-semibold text-blue-600">{calculatedValue.toFixed(2)}</span>
				</span>
			</div>
		</div>
	);

	component.get_default_label = () => __('Calculator', 'wpcbooking');
	return component.render();
};

export default AdminCalculator;

