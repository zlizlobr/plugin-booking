

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { BaseAdminBlockComponent } from './BlockComponent.jsx';

const EmailInput = (props) => {
	const component = new BaseAdminBlockComponent(props);
	const [isValid, setIsValid] = useState(true);

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	component.render_input = () => {
		const placeholder = component.attrs.placeholder || __('Email address', 'wpcbooking');

		return (
			<div>
				<input
					type="email"
					id={component.fieldId}
					name={component.fieldId}
					value={component.value}
					placeholder={placeholder}
					className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 ${
						!isValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
					}`}
					onInput={(e) => {
						const value = e.target.value;
						setIsValid(validateEmail(value) || value === '');
						component.handle_change(value);
					}}
				/>
				{!isValid && component.value && (
					<p className="text-sm text-red-500 mt-1">
						{__('Please enter a valid email address', 'wpcbooking')}
					</p>
				)}
			</div>
		);
	};

	component.get_default_label = () => __('Email', 'wpcbooking');

	return component.render();
};

export default EmailInput;

