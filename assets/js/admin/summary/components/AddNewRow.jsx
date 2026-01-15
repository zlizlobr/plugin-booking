

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { getPluginUrl, getLabels } from '../utils/configHelpers.js';

const AddNewRow = ({ currencySymbol, stepCount, onAdd }) => {
	const [label, setLabel] = useState('');
	const [price, setPrice] = useState(0);
	const pluginUrl = getPluginUrl();
	const labels = getLabels();

	const infoIconUrl = `${pluginUrl}assets/img/info.svg`;
	const plusIconUrl = `${pluginUrl}assets/img/plus.svg`;

	const infoMaskStyle = {
		'--mask-img': `url('${infoIconUrl}')`
	};

	const plusMaskStyle = {
		'--mask-img': `url('${plusIconUrl}')`
	};

	const handleAdd = () => {
		if (!label.trim()) {
			return;
		}

		if (typeof onAdd === 'function') {
			onAdd(label, parseFloat(price) || 0);
		}

		setLabel('');
		setPrice(0);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAdd();
		}
	};

	return (
		<li className="aff-add-new-row min-h-[70px] flex flex-col medium:flex-row justify-stretch medium:justify-between max-medium:px-1 items-center bg-th-grey-lighter rounded-[35px]">

			{/* Hlavní sekce s ikonou a inputy */}
			<div className="min-h-[66px] w-full medium:w-4/5 flex items-center gap-x-5 pl-20p large:pl-40p m-0.5 bg-white rounded-[35px] max-medium:rounded-b-[4px] max-medium:self-stretch">
				
				{/* Info ikona */}
				<div className="w-50p h-50p rounded-full bg-th-orange-light flex justify-center items-center shrink-0">
					<div
						style={infoMaskStyle}
						className="w-25p h-25p bg-white cs-mask"
					/>
				</div>

				{/* Label a inputy */}
				<div className="af-p20 text-th-grey">
					{labels.addFee || __('Add fee', 'wpcbooking')}
					<input
						type="text"
						name="new-row-name"
						placeholder={labels.label || __('Label', 'wpcbooking')}
						value={label}
						onInput={(e) => setLabel(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<input
						type="number"
						name="new-row-price"
						placeholder={currencySymbol}
						value={price}
						onInput={(e) => setPrice(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
				</div>
			</div>

			{/* Plus button */}
			<div className="flex justify-end items-center gap-x-4 pr-30p max-medium:p-30p">
				<a
					onClick={handleAdd}
					data-count-step={stepCount}
					style={plusMaskStyle}
					className="w-25p h-25p bg-th-orange-light cs-mask cursor-pointer"
				/>
			</div>

		</li>
	);
};

export default AddNewRow;

