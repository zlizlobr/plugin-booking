

import { h } from 'preact';
import { __ } from '@wordpress/i18n';

export class BlockComponent {

	constructor(props) {
		this.props = props;
		this.attrs = props.attrs || {};
		this.fieldId = this.attrs.field_id || '';
		this.value = props.value || '';
		this.onChange = props.onChange;
		this.step = props.step;
		this.postId = props.postId;
	}

	get_icon_url(attrs) {
		return attrs?.general?.icon_url;
	}

	render_label_section(label, iconUrl) {
		const iconStyle = iconUrl ? {
			WebkitMask: `url('${iconUrl}') no-repeat center`,
			mask: `url('${iconUrl}') no-repeat center`,
			WebkitMaskSize: 'contain',
			maskSize: 'contain',
			width: '20px',
			height: '20px',
			backgroundColor: 'currentColor'
		} : null;

		return (
			<div className="flex items-center gap-2 mb-2">
				{iconUrl && (
					<i
						className="text-gray-700"
						style={iconStyle}
					/>
				)}
				<label className="font-semibold text-gray-700" htmlFor={this.fieldId}>
					{label}
				</label>
			</div>
		);
	}

	render_container(children) {
		return (
			<div className="mb-4">
				{children}
			</div>
		);
	}

	handle_change(value, block_total = null) {
		if (typeof this.onChange === 'function') {
			this.onChange(this.fieldId, value, block_total);
		}
	}

	render_input() {
		throw new Error(__('render_input must be implemented by subclass', 'wpcbooking'));
	}

	render() {
		const label = this.attrs.label || this.get_default_label();
		const iconUrl = this.get_icon_url(this.attrs);
		return this.render_container([
			this.render_label_section(label, iconUrl),
			this.render_input()
		]);
	}

	get_default_label() {
		return __('Field', 'wpcbooking');
	}
}

export { BlockComponent as BaseAdminBlockComponent };
