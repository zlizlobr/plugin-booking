

import { BLOCK_TYPES } from '../../../config/constants.js';

export const calculatePercentage = (basePrice, percentage, operation = 'add') => {
	if (percentage === 0 || basePrice === 0) {
		return 0;
	}

	const percentageValue = operation === 'subtract'
		? -Math.abs(percentage)
		: Math.abs(percentage);

	return basePrice * (percentageValue / 100);
};

export const calculateProductTotal = (qty, price, minPrice = 0) => {
	const total = qty * price;
	const isMinPrice = minPrice > 0 && total < minPrice;

	return {
		total: isMinPrice ? minPrice : total,
		isMinPrice
	};
};

export const sumStepPrices = (items) => {
	let base = 0;
	let percentage = 0;
	let products = 0;

	if (!Array.isArray(items)) {
		return { total: 0, base: 0, percentage: 0, products: 0 };
	}

	items.forEach((item) => {
		const value = parseFloat(item.value) || 0;

		if (item.type === BLOCK_TYPES.PERCENTAGE) {
			percentage += value;
		} else if (item.type === BLOCK_TYPES.PRODUCT) {
			products += value;
		} else {
			base += value;
		}
	});

	const total = base + products;

	return { total, base, percentage, products };
};

export const calculateCartTotals = (steps) => {
	let totalBase = 0;
	let totalPercentage = 0;

	if (!Array.isArray(steps)) {
		return { totalBase: 0, totalWithPercentage: 0 };
	}

	// 1. Calculate base total (base + products)
	steps.forEach((step) => {
		totalBase += (step.base || 0) + (step.products || 0);
	});

	// 2. Calculate percentage from base (only if percentage !== 0)
	steps.forEach((step) => {
		const percentage = step.percentage || 0;
		if (percentage !== 0) {
			totalPercentage += totalBase * (percentage / 100);
		}
	});

	// 3. Total with percentage = base + calculated percentage
	const totalWithPercentage = totalBase + totalPercentage;

	return { totalBase, totalWithPercentage };
};

export const calculatePercentageFromValues = (value1, value2) => {
	if (value1 === 0) {
		return 0;
	}

	return (value2 / value1) * 100;
};

export const isValidPrice = (price) => {
	const numPrice = Number(price);
	return !isNaN(numPrice) && isFinite(numPrice);
};

