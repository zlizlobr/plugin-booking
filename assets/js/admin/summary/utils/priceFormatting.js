

import { DEFAULT_FORMAT_CONFIG } from '../../../config/constants.js';

export const getFormatConfig = () => {
	return window.wpcbookingAdminData?.formatConfig || DEFAULT_FORMAT_CONFIG;
};

export const formatPrice = (price) => {
	const config = getFormatConfig();

	const numericPrice = Number(price);
	const rounded = numericPrice.toFixed(config.numberOfDecimals);

	const parts = rounded.split('.');
	const integerPart = parts[0];
	const decimalPart = parts[1];

	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandSeparator);

	const formattedNumber = decimalPart
		? `${formattedInteger}${config.decimalSeparator}${decimalPart}`
		: formattedInteger;

	switch (config.currencyPosition) {
		case 'left':
			return `${config.currencySymbol}${formattedNumber}`;
		case 'left_space':
			return `${config.currencySymbol} ${formattedNumber}`;
		case 'right':
			return `${formattedNumber}${config.currencySymbol}`;
		case 'right_space':
		default:
			return `${formattedNumber} ${config.currencySymbol}`;
	}
};

export const parsePrice = (formattedPrice) => {
	const config = getFormatConfig();

	if (!formattedPrice || formattedPrice === '') {
		return 0;
	}

	let cleaned = String(formattedPrice).replace(config.currencySymbol, '').trim();

	const escapedThousandSep = config.thousandSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	cleaned = cleaned.replace(new RegExp(escapedThousandSep, 'g'), '');

	const escapedDecimalSep = config.decimalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	cleaned = cleaned.replace(new RegExp(escapedDecimalSep), '.');

	return parseFloat(cleaned) || 0;
};

export const formatPriceWithoutCurrency = (price) => {
	const config = getFormatConfig();

	const numericPrice = Number(price);
	const rounded = numericPrice.toFixed(config.numberOfDecimals);

	const parts = rounded.split('.');
	const integerPart = parts[0];
	const decimalPart = parts[1];

	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandSeparator);

	return decimalPart
		? `${formattedInteger}${config.decimalSeparator}${decimalPart}`
		: formattedInteger;
};

