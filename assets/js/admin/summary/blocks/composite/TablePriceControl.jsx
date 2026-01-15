
import { h } from 'preact';
import { useState, useEffect, useRef, useMemo } from 'preact/hooks';
import { __ } from '@wordpress/i18n';
import { field_values } from '../../signals/summarySignals.js';

const getRowByFieldId = (priceTable, fieldId) => {
	if (!priceTable || Object.keys(priceTable).length === 0) {
		return null;
	}

	const availableRowIds = Object.keys(priceTable)
		.map(id => parseInt(id))
		.filter(id => !isNaN(id))
		.sort((a, b) => a - b);

	let closestId = null;

	if (priceTable[fieldId] !== undefined) {
		closestId = fieldId;
	} else {
		for (const id of availableRowIds) {
			if (id >= parseInt(fieldId)) {
				closestId = id;
				break;
			}
		}

		if (closestId === null && availableRowIds.length > 0) {
			closestId = availableRowIds[availableRowIds.length - 1];
		}
	}

	const rowData = priceTable[closestId];
	if (rowData && typeof rowData === 'object' && Object.keys(rowData).length > 0) {
		const firstValue = Object.values(rowData)[0];
		return parseInt(firstValue);
	}

	return null;
};

const getColumnByFieldId = (priceTable, fieldId) => {
	if (!priceTable || Object.keys(priceTable).length === 0) {
		return null;
	}

	const allColumnIds = [];
	for (const rowData of Object.values(priceTable)) {
		if (rowData && typeof rowData === 'object') {
			allColumnIds.push(...Object.keys(rowData).map(id => parseInt(id)).filter(id => !isNaN(id)));
		}
	}
	const availableColumnIds = [...new Set(allColumnIds)].sort((a, b) => a - b);

	if (availableColumnIds.length === 0) {
		return null;
	}

	let closestId = null;

	for (const rowData of Object.values(priceTable)) {
		if (rowData && rowData[fieldId] !== undefined) {
			closestId = fieldId;
			break;
		}
	}

	if (closestId === null) {
		for (const id of availableColumnIds) {
			if (id >= parseInt(fieldId)) {
				closestId = id;
				break;
			}
		}

		if (closestId === null && availableColumnIds.length > 0) {
			closestId = availableColumnIds[availableColumnIds.length - 1];
		}
	}

	for (const rowData of Object.values(priceTable)) {
		if (rowData && rowData[closestId] !== undefined) {
			return parseInt(rowData[closestId]);
		}
	}

	return null;
};

const getPriceByRowAndColumn = (priceTable, rowId, columnId) => {
	if (!priceTable || Object.keys(priceTable).length === 0) {
		return null;
	}

	const availableRows = Object.keys(priceTable)
		.map(id => parseInt(id))
		.filter(id => !isNaN(id))
		.sort((a, b) => a - b);

	const allColumns = [];
	for (const rowData of Object.values(priceTable)) {
		if (rowData && typeof rowData === 'object') {
			allColumns.push(...Object.keys(rowData).map(id => parseInt(id)).filter(id => !isNaN(id)));
		}
	}
	const availableColumns = [...new Set(allColumns)].sort((a, b) => a - b);

	if (priceTable[rowId] && priceTable[rowId][columnId] !== undefined) {
		return { price: priceTable[rowId][columnId], row: rowId, column: columnId };
	}

	let closestRowId = null;
	for (const id of availableRows) {
		if (id >= parseInt(rowId)) {
			closestRowId = id;
			break;
		}
	}
	if (closestRowId === null && availableRows.length > 0) {
		closestRowId = availableRows[availableRows.length - 1];
	}

	let closestColumnId = null;
	for (const id of availableColumns) {
		if (id >= parseInt(columnId)) {
			closestColumnId = id;
			break;
		}
	}
	if (closestColumnId === null && availableColumns.length > 0) {
		closestColumnId = availableColumns[availableColumns.length - 1];
	}

	if (priceTable[closestRowId] && priceTable[closestRowId][closestColumnId] !== undefined) {
		return { 
			price: priceTable[closestRowId][closestColumnId], 
			row: closestRowId, 
			column: closestColumnId 
		};
	}

	return null;
};

const calculateTablePrice = (value, currency = null) => {
	if (!value || value.price_type !== 'table') {
		return null;
	}

	const table = value.table;
	if (!table) {
		return null;
	}

	const currencyKey = currency || Object.keys(table)[0];
	const priceTable = table[currencyKey];
	
	if (!priceTable) {
		return null;
	}

	const rowId = value.row || value.table_row_field || '1';
	const columnId = value.column || value.table_column_field || '1';

	if (value.table_column_type === 'not_connected' || value.table_column_field === 'none') {
		const rowPrice = getRowByFieldId(priceTable, rowId);
		return rowPrice !== null ? { price: rowPrice, row: rowId, column: null } : null;
	}

	if (value.table_row_type === 'not_connected' || value.table_row_field === 'none') {
		const columnPrice = getColumnByFieldId(priceTable, columnId);
		return columnPrice !== null ? { price: columnPrice, row: null, column: columnId } : null;
	}

	return getPriceByRowAndColumn(priceTable, rowId, columnId);
};

// Pomocná funkce pro lookup ceny z tabulky
// ✅ POUŽÍVÁ field_values signal pro row/column hodnoty!
const lookupTablePrice = (value, quantity, currencySymbol, field_values) => {
	if (!value.table) {
		return 0;
	}
	
	const currency = Object.keys(value.table)[0]; // např. 'DKK'
	const priceTable = value.table[currency];
	
	if (!priceTable) {
		return 0;
	}
	
	const rowField = value.table_row_field;
	const columnField = value.table_column_field;
	
	// ✅ 1D Row-based (column = "none")
	// Použije hodnotu z field_values[rowField] nebo fallback na quantity
	if (columnField === 'none' && rowField !== 'none') {
		const rowValue = field_values.value[rowField];
		const lookupValue = rowValue !== undefined ? parseInt(rowValue) || 0 : quantity;
		const result = getRowByFieldId(priceTable, lookupValue);
		return result !== null ? result : 0;
	}
	
	// ✅ 1D Column-based (row = "none")
	// Použije hodnotu z field_values[columnField] nebo fallback na quantity
	if (rowField === 'none' && columnField !== 'none') {
		const columnValue = field_values.value[columnField];
		const lookupValue = columnValue !== undefined ? parseInt(columnValue) || 0 : quantity;
		const result = getColumnByFieldId(priceTable, lookupValue);
		return result !== null ? result : 0;
	}
	
	// ✅ 2D (oba fieldy)
	// Použije hodnoty z field_values[rowField] a field_values[columnField]
	if (rowField !== 'none' && columnField !== 'none') {
		const rowValue = field_values.value[rowField];
		const columnValue = field_values.value[columnField];
		const row = rowValue !== undefined ? parseInt(rowValue) || 0 : (value.row || quantity);
		const column = columnValue !== undefined ? parseInt(columnValue) || 0 : (value.column || 1);
		const result = getPriceByRowAndColumn(priceTable, row, column);
		return result ? result.price : 0;
	}
	
	return 0;
};

// Extrahovat cenu z nested struktury
const extractPriceFromTable = (tableValue) => {
	if (typeof tableValue === 'number') return tableValue;
	if (typeof tableValue === 'object' && tableValue !== null) {
		const firstValue = Object.values(tableValue)[0];
		return typeof firstValue === 'number' ? firstValue : parseFloat(firstValue) || 0;
	}
	return 0;
};

const TablePriceControl = ({ 
	fieldId = "",
	value = {}, 
	onChange, 
	className = '', 
	currencySymbol = '',
	numberFields = []
}) => {
	console.log('TablePriceControl', value);
	
	const parsedTable = useMemo(() => {
		if (!value.table) return null;
		if (typeof value.table === 'string') {
			try {
				return JSON.parse(value.table);
			} catch (e) {
				console.error('Failed to parse table JSON:', e);
				return null;
			}
		}
		return value.table;
	}, [value.table]);
	
	const map_qty_type = (type) => {
		if (type === 'per_field') return 'field_connected';
		if (type === 'fixed') return 'not_connected';
		return type || 'not_connected';
	};

	const extract_quantity = (val) => {
		if (val.quantity !== undefined) return parseInt(val.quantity) || 1;
		if (val.qty !== undefined) return parseInt(val.qty) || 1;
		return 1;
	};

	const mapped_qty_type = map_qty_type(value.qty_type);

	const [qty_type, set_qty_type] = useState(mapped_qty_type);
	const [qty_field, set_qty_field] = useState(value.qty_field || '');
	const [quantity, set_quantity] = useState(extract_quantity(value));
	
	// ✅ Price se POČÍTÁ z tabulky, ne ze state!
	const [lookupPrice, setLookupPrice] = useState(0);
	
	const prevValuesRef = useRef({ 
		qty_type: mapped_qty_type, 
		qty_field: value.qty_field || '', 
		quantity: extract_quantity(value),
		lookupPrice: 0
	});
	const isInitRef = useRef(false);
	const debounceTimerRef = useRef(null);

	const get_actual_quantity = () => {
		if (qty_type === 'field_connected' && qty_field) {
			const field_value = field_values.value[qty_field];
			const result = field_value !== undefined ? parseInt(field_value) || 1 : quantity;
			return result;
		}
		return quantity;
	};

	// Helper pro získání labelu fieldu z field_id
	const get_field_label = (field_id) => {
		if (!field_id || field_id === 'none') return null;
		
		// Zkusit najít v numberFields prop
		const field = numberFields.find(f => f.value === field_id);
		if (field) return field.label;
		
		// Fallback na window.wpcbookingAdminData
		const allFields = window.wpcbookingAdminData?.number_fields || {};
		return allFields[field_id] || field_id;
	};

	// Helper pro vytvoření description textu o párování tabulky
	const get_table_mapping_description = () => {
		const rowField = value.table_row_field;
		const columnField = value.table_column_field;
		
		if (!rowField && !columnField) return null;
		
		const rowLabel = rowField && rowField !== 'none' ? get_field_label(rowField) : null;
		const columnLabel = columnField && columnField !== 'none' ? get_field_label(columnField) : null;
		
		// Získat aktuální hodnoty z field_values
		const rowValue = rowField && rowField !== 'none' ? field_values.value[rowField] : null;
		const columnValue = columnField && columnField !== 'none' ? field_values.value[columnField] : null;
		
		let description = '';
		
		if (rowLabel && columnLabel) {
			// 2D tabulka
			description = __('Table is mapped to:', 'wpcbooking') + ` ${rowLabel} (row) × ${columnLabel} (column)`;
			if (rowValue !== undefined || columnValue !== undefined) {
				const rowVal = rowValue !== undefined ? rowValue : (value.row || '-');
				const colVal = columnValue !== undefined ? columnValue : (value.column || '-');
				description += ` - ${__('Current values:', 'wpcbooking')} ${rowVal} × ${colVal}`;
			}
		} else if (rowLabel) {
			// 1D row-based
			description = __('Table is mapped to:', 'wpcbooking') + ` ${rowLabel} (row)`;
			if (rowValue !== undefined) {
				description += ` - ${__('Current value:', 'wpcbooking')} ${rowValue}`;
			}
		} else if (columnLabel) {
			// 1D column-based
			description = __('Table is mapped to:', 'wpcbooking') + ` ${columnLabel} (column)`;
			if (columnValue !== undefined) {
				description += ` - ${__('Current value:', 'wpcbooking')} ${columnValue}`;
			}
		}
		
		return description || null;
	};

	// ✅ Effect pro automatický lookup ceny z tabulky
	// REAGUJE na změny field_values pro table_row_field a table_column_field!
	useEffect(() => {
		if (!parsedTable) {
			setLookupPrice(0);
			return;
		}
		
		const valueWithParsedTable = { ...value, table: parsedTable };
		const rawPrice = lookupTablePrice(valueWithParsedTable, quantity, currencySymbol, field_values);
		const extractedPrice = extractPriceFromTable(rawPrice);
		setLookupPrice(extractedPrice);
	}, [
		parsedTable, 
		quantity, 
		currencySymbol,
		// ✅ DŮLEŽITÉ: Reagovat na změny field_values pro row/column fieldy!
		field_values.value[value.table_row_field],
		field_values.value[value.table_column_field],
		value.table_row_field,
		value.table_column_field
	]);

	// Init effect
	useEffect(() => {
		if (!isInitRef.current && value.qty_type) {
			const newType = map_qty_type(value.qty_type);
			set_qty_type(newType);
			set_qty_field(value.qty_field || '');
			set_quantity(extract_quantity(value));
			isInitRef.current = true;
		}
	}, [value]);

	const calculateTotal = () => {
		// ✅ Použít get_actual_quantity() pro podporu field_connected qty
		const qty = get_actual_quantity();
		const priceVal = parseFloat(lookupPrice) || 0;
		const total = (qty * priceVal).toFixed(2);
		return total;
	};

	useEffect(() => {
		if (qty_type === 'field_connected' && qty_field) {
			const field_value = field_values.value[qty_field];
			if (field_value !== undefined) {
				const new_qty = parseInt(field_value) || 1;
				if (new_qty !== quantity) {
					set_quantity(new_qty);
				}
			}
		}
	}, [field_values.value, qty_field, qty_type]);

	useEffect(() => {
		const prev = prevValuesRef.current;
		const hasChanged = 
			prev.qty_type !== qty_type || 
			prev.qty_field !== qty_field || 
			prev.quantity !== quantity ||
			prev.lookupPrice !== lookupPrice;
		
		if (hasChanged && onChange) {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}

			debounceTimerRef.current = setTimeout(() => {
				const calculated_total = parseFloat(calculateTotal());
				const changeData = {
					qty_type,
					qty_field,
					qty: quantity,
					quantity,
					price: lookupPrice,
					calculated_total,
					table: parsedTable,
					table_row_field: value.table_row_field,
					table_column_field: value.table_column_field,
					row: value.row
				};
				prevValuesRef.current = { qty_type, qty_field, quantity, lookupPrice };
				onChange(changeData);
			}, 1000);
		}

		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [qty_type, qty_field, quantity, lookupPrice, onChange, parsedTable, value.table_row_field, value.table_column_field, value.row]);

	return (
		<div className={`flex flex-wrap gap-4 items-start ${className}`}>
			{/* Hidden inputs pro table data */}
			{parsedTable && (
				<input 
					type="hidden" 
					name={`${fieldId}[table]`}
					value={JSON.stringify(parsedTable)}
				/>
			)}
			{value.table_row_field && (
				<input 
					type="hidden" 
					name={`${fieldId}[table_row_field]`}
					value={value.table_row_field}
				/>
			)}
			{value.table_column_field && (
				<input 
					type="hidden" 
					name={`${fieldId}[table_column_field]`}
					value={value.table_column_field}
				/>
			)}
			{value.row !== undefined && (
				<input 
					type="hidden" 
					name={`${fieldId}[row]`}
					value={value.row}
				/>
			)}
			
			<div className="flex flex-col flex-1 min-w-[160px] js-qty-connection">
				<label className="text-sm font-medium text-gray-700">{__('Qty Connection', 'wpcbooking')}</label>
				<select
					name={`${fieldId}[qty_type]`}
					value={qty_type}
					className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-connection-type focus:outline-none focus:ring-2 focus:ring-blue-500"
					onChange={(e) => set_qty_type(e.target.value)}
				>
					<option value="not_connected">{__('Not Connected', 'wpcbooking')}</option>
					<option value="field_connected">{__('Connected to Field', 'wpcbooking')}</option>
				</select>
			</div>

			{qty_type === 'field_connected' && (
				<div className="flex flex-col flex-1 min-w-[160px] js-qty-field">
					<label className="text-sm font-medium text-gray-700">{__('Qty Field', 'wpcbooking')}</label>
					<select
						name={`${fieldId}[qty_field]`}
						value={qty_field}
						className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-number-field focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={(e) => set_qty_field(e.target.value)}
					>
						<option value="">{__('Select field', 'wpcbooking')}</option>
						{numberFields.map((field) => (
							<option key={field.value} value={field.value}>
								{field.label}
							</option>
						))}
					</select>
				</div>
			)}

			<div className="flex flex-col flex-1 min-w-[120px] js-qty">
				<label className="text-sm font-medium text-gray-700">{__('Quantity', 'wpcbooking')}</label>
				<input
					name={`${fieldId}[qty]`}
					type="number"
					value={quantity}
					min="1"
					readOnly={qty_type === 'field_connected'}
					className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm js-qty-manual focus:outline-none focus:ring-2 focus:ring-blue-500"
					onInput={(e) => set_quantity(parseInt(e.target.value) || 1)}
				/>
			</div>

			<div className="flex items-center gap-4">
				{/* ✅ Price - READ-ONLY (z tabulky) */}
				<div className="flex flex-col flex-1 min-w-[140px] js-price-field">
					<label className="text-sm font-medium text-gray-700">{__('Price (from table)', 'wpcbooking')}</label>
					<input type="hidden" name={`${fieldId}[price]`} value={lookupPrice} />
					
					<div className="mt-1 border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 w-full text-sm text-gray-600">
						{lookupPrice.toFixed(2)} {currencySymbol}
					</div>
				</div>

				<div className="flex flex-col justify-end">
					<label className="text-sm font-medium text-gray-700">{__('Total', 'wpcbooking')}</label>
					<span className="text-sm mt-1 h-full flex items-center js-span-price-total">
						<span className="block-total-price">{calculateTotal()}</span>
						<span className="ml-1 text-gray-600 currnency_symbol">{currencySymbol}</span>
					</span>
				</div>
			</div>

			{/* ✅ Description text o párování tabulky */}
			{get_table_mapping_description() && (
				<div className="w-full mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
					<p className="text-xs text-blue-700">
						{get_table_mapping_description()}
					</p>
				</div>
			)}
		</div>
	);
};

export default TablePriceControl;

export { 
	getRowByFieldId, 
	getColumnByFieldId, 
	getPriceByRowAndColumn,
	calculateTablePrice 
};

