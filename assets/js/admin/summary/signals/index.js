// ============================================================================
// NEW DUAL PRICE SYSTEM
// ============================================================================

// Signals - Base Prices
export {
	item_base_prices,
	total_base_price,
	update_base_price,
	init_base_price,
	init_base_prices_batch
} from './summarySignals.js';

// Signals - Percentage Prices (legacy step-level)
export {
	item_percentage_configs,
	total_percentage_price,
	update_percentage,
	init_percentage,
	init_percentage_from_amount,
	get_step_base_price,
	get_step_percentage_amount,
	get_step_total
} from './summarySignals.js';

// Signals - Block Prices & Percentages (new block-level)
export {
	block_prices,
	block_percentage_configs,
	step_totals_from_blocks,
	step_percentage_totals_from_blocks,
	update_block_price,
	update_block_percentage,
	init_block_price,
	init_block_percentage,
	remove_block_price,
	remove_block_percentage
} from './summarySignals.js';

// Signals - Final Price
export {
	final_price,
	init_total_base,
	init_total_percentage
} from './summarySignals.js';

// Signals - UI & Config
export {
	edit_mode,
	currency_symbol,
	set_edit_mode,
	toggle_edit_mode
} from './summarySignals.js';

// Actions - Remove & Reset
export {
	remove_step_prices,
	reset_all_prices
} from './summarySignals.js';

// ============================================================================
// LEGACY ALIASES (pro zpětnou kompatibilitu)
// ============================================================================

export {
	item_prices,
	total_price,
	final_total_price,
	update_item_price,
	init_item_price,
	init_item_prices_batch,
	remove_item_price,
	reset_prices
} from './summarySignals.js';
