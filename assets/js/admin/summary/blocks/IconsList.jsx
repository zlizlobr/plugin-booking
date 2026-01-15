
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { __, sprintf } from '@wordpress/i18n';
import { BaseAdminBlockComponent } from './BlockComponent.jsx';

const IconsList = (props) => {
	const component = new BaseAdminBlockComponent(props);
	const icons = component.attrs.icons_repeater || component.attrs.general?.icons || [];
	const number_allowed = component.attrs.number_allowed || component.attrs.general?.number_allowed || 1;
	console.log('IconsList', component);
	const parse_value = (value) => {
		if (Array.isArray(value)) {
			return value;
		}
		if (typeof value === 'string' && value.trim() !== '') {
			return value.split(',').map(val => val.trim()).filter(val => val !== '');
		}
		return [];
	};

	const normalize_value_to_slug = (value) => {
		if (!value) return '';
		const matching_icon = icons.find(icon => icon.label === value);
		if (matching_icon && matching_icon.slug) {
			return matching_icon.slug;
		}
		return value;
	};

	const raw_selected = parse_value(props.value || '');
	const initial_selected = raw_selected.map(val => normalize_value_to_slug(val));
	const initial_normalized = normalize_value_to_slug(props.value);

	const [selectedValue, setSelectedValue] = useState(
		number_allowed === 1 ? initial_normalized : initial_selected.join(',')
	);

	component.render_input = () => {
		if (icons.length === 0) {
			return (
				<div className="text-gray-500 py-4 text-sm">
					{__('No icons configured', 'wpcbooking')}
				</div>
			);
		}

		const selected_icons = parse_value(selectedValue);

		return (
			<div>
				<input type="hidden" name={component.fieldId} value={selectedValue} />
				<ul className="mt-2 space-y-2">
					{icons.map((icon_item, index) => {
					const icon_value = icon_item.slug || icon_item.label || `icon_${index}`;
					const is_selected = number_allowed === 1
						? selectedValue === icon_value
						: selected_icons.includes(icon_value);

					return (
						<li key={index} className="flex items-center gap-2">
							<input
								type={number_allowed === 1 ? 'radio' : 'checkbox'}
								id={`${component.fieldId}_${index}`}
								value={icon_value}
								checked={is_selected}
								onChange={(e) => {
									if (number_allowed === 1) {
										setSelectedValue(e.target.value);
										component.handle_change(e.target.value);
									} else {
										let new_selection;
										if (e.target.checked) {
											if (selected_icons.length < number_allowed) {
												new_selection = [...selected_icons, icon_value];
											} else {
												return;
											}
										} else {
											new_selection = selected_icons.filter(val => val !== icon_value);
										}
										const value_for_form = new_selection.length > 0 ? new_selection.join(',') : '';
										setSelectedValue(value_for_form);
										component.handle_change(value_for_form);
									}
								}}
								className="w-4 h-4"
							/>
							<label
								htmlFor={`${component.fieldId}_${index}`}
								className="text-gray-700 cursor-pointer"
							>
								{icon_item.label || sprintf(__('Icon %d', 'wpcbooking'), index + 1)}
							</label>
						</li>
					);
				})}
				</ul>
			</div>
		);
	};

	component.get_default_label = () => __('Icons', 'wpcbooking');

	return component.render();
};

export default IconsList;

