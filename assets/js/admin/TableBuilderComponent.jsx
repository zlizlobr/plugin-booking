import { useState, useEffect } from 'react';

const TableBuilderComponent = ({ initialData = null, onDataChange = null, uniqueId = null, hiddenInputId = null }) => {
  // Default data structure
  const defaultData = {
    "1 hour": { "Fixed price for all guests (DKK)": 2850 },
    "2 hour": { "Fixed price for all guests (DKK)": 3150 },
    "3 hour": { "Fixed price for all guests (DKK)": 3450 },
    "4 hour": { "Fixed price for all guests (DKK)": 3750 },
    "5 hour": { "Fixed price for all guests (DKK)": 4050 }
  };
  /*{
    "10": { "Price per person (DKK)": 545 },
    "15": { "Price per person (DKK)": 395 },
    "20": { "Price per person (DKK)": 325 },
    "25": { "Price per person (DKK)": 295 },
    "30": { "Price per person (DKK)": 295 },
    "35": { "Price per person (DKK)": 295 },
    "40": { "Price per person (DKK)": 295 },
    "50": { "Price per person (DKK)": 295 },
    "60": { "Price per person (DKK)": 295 },
    "70": { "Price per person (DKK)": 295 },
    "80": { "Price per person (DKK)": 295 },
    "90": { "Price per person (DKK)": 295 },
    "100": { "Price per person (DKK)": 295 },
    "110": { "Price per person (DKK)": 295 },
    "120": { "Price per person (DKK)": 295 },
    "130": { "Price per person (DKK)": 295 },
    "140": { "Price per person (DKK)": 295 },
    "150+": { "Price per person (DKK)": 295 }
  };*/

  const [tableData, setTableData] = useState(() => {
    // First try to load from external input
    try {
      const externalInput = document.getElementById(uniqueId + '_data') || document.querySelector('input[name="' + uniqueId + '_data"]');
      const raw = externalInput ? externalInput.value : '';
      if (raw && typeof raw === 'string') {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (_) {
      // ignore JSON parse errors or missing document

    }
    
    // Fallback to initialData prop
    if (initialData && typeof initialData === 'object' && !Array.isArray(initialData)) {
      return initialData;
    }
    
    // Final fallback to default data
    return defaultData;
  });
  const [editingCell, setEditingCell] = useState(null);
  const [editDialog, setEditDialog] = useState({ open: false, type: '', value: '', index: null });
  const [newValue, setNewValue] = useState('');

  // Get row and column names
  const rowNames = Object.keys(tableData);
  const columnNames = rowNames.length > 0 ? Object.keys(tableData[rowNames[0]]) : [];

  // Add new row
  const addRow = (rowName) => {
    if (!rowName.trim()) return;
    
    const newData = { ...tableData };
    const newRowData = {};
    columnNames.forEach(col => {
      newRowData[col] = 0;
    });
    newData[rowName] = newRowData;
    setTableData(newData);
  };

  // Add new column
  const addColumn = (columnName) => {
    if (!columnName.trim()) return;
    
    const newData = { ...tableData };
    Object.keys(newData).forEach(rowName => {
      newData[rowName] = { ...newData[rowName], [columnName]: 0 };
    });
    setTableData(newData);
  };

  // Edit row name
  const editRowName = (oldName, newName) => {
    if (!newName.trim() || oldName === newName) return;
    
    const newData = { ...tableData };
    newData[newName] = newData[oldName];
    delete newData[oldName];
    setTableData(newData);
  };

  // Edit column name
  const editColumnName = (oldName, newName) => {
    if (!newName.trim() || oldName === newName) return;
    
    const newData = { ...tableData };
    Object.keys(newData).forEach(rowName => {
      newData[rowName] = { ...newData[rowName], [newName]: newData[rowName][oldName] };
      delete newData[rowName][oldName];
    });
    setTableData(newData);
  };

  // Delete row
  const deleteRow = (rowName) => {
    // Prevent deleting the first row
    if (rowName === rowNames[0]) return;
    
    const newData = { ...tableData };
    delete newData[rowName];
    setTableData(newData);
  };

  // Delete column
  const deleteColumn = (columnName) => {
    // Prevent deleting the first column
    if (columnName === columnNames[0]) return;
    
    const newData = { ...tableData };
    Object.keys(newData).forEach(rowName => {
      delete newData[rowName][columnName];
    });
    setTableData(newData);
  };

  // Handle cell value change
  const handleCellChange = (rowName, columnName, value) => {
    const newData = { ...tableData };
    newData[rowName] = { ...newData[rowName], [columnName]: value };
    setTableData(newData);
  };

  // Open edit dialog
  const openEditDialog = (type, value = '', index = null) => {
    setEditDialog({ open: true, type, value, index });
    setNewValue(value);
  };

  // Close edit dialog
  const closeEditDialog = () => {
    setEditDialog({ open: false, type: '', value: '', index: null });
    setNewValue('');
  };

  // Handle dialog submit
  const handleDialogSubmit = () => {
    const { type, value } = editDialog;
    
    switch (type) {
      case 'row':
        addRow(newValue);
        break;
      case 'column':
        addColumn(newValue);
        break;
      case 'row-edit':
        editRowName(value, newValue);
        break;
      case 'column-edit':
        editColumnName(value, newValue);
        break;
      default:
        break;
    }
    
    closeEditDialog();
  };

  // Update hidden input when data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(tableData);
    }
    // Update external hidden input in builder form if present
    try {
      const externalInput = document.getElementById('wpcbooking-table-data-input') || document.querySelector('input[name="wpcbooking_table_data"]');
      if (externalInput) {
        externalInput.value = JSON.stringify(tableData);
      }
    } catch (_) {
      // no-op if document is unavailable
    }
  }, [tableData, onDataChange]);


  return (
    <div className="table-builder-component">
      <div className="table-container">
        <table className="table-builder-table">
          <thead>
            <tr>
              <th className="row-header">
                <div className="header-controls">
                  <span>Row</span>
                  <button 
                    className="btn-add" 
                    onClick={() => openEditDialog('row')}
                    title="Add Row"
                  >
                    +
                  </button>
                </div>
              </th>
              {columnNames.map((colName, index) => (
                <th key={colName} className="column-header">
                  <div className="header-controls">
                    <span>{colName}</span>
                    <div className="header-buttons">
                      <button 
                        className="btn-edit" 
                        onClick={() => openEditDialog('column-edit', colName)}
                        title="Edit Column"
                      >
                        ✏️
                      </button>
                      {index > 0 && (
                        <button 
                          className="btn-delete" 
                          onClick={() => deleteColumn(colName)}
                          title="Delete Column"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </th>
              ))}
              <th className="add-column-header">
                <button 
                  className="btn-add" 
                  onClick={() => openEditDialog('column')}
                  title="Add Column"
                >
                  + Column
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rowNames.map((rowName, rowIndex) => (
              <tr key={rowName}>
                <td className="row-name-cell">
                  <div className="row-controls">
                    <span>{rowName}</span>
                    <div className="row-buttons">
                      <button 
                        className="btn-edit" 
                        onClick={() => openEditDialog('row-edit', rowName)}
                        title="Edit Row"
                      >
                        ✏️
                      </button>
                      {rowIndex > 0 && (
                        <button 
                          className="btn-delete" 
                          onClick={() => deleteRow(rowName)}
                          title="Delete Row"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </td>
                {columnNames.map((colName) => (
                  <td key={colName} className="data-cell">
                    <input
                      type="number"
                      value={tableData[rowName][colName]}
                      onChange={(e) => handleCellChange(rowName, colName, parseInt(e.target.value) || 0)}
                      className="cell-input"
                    />
                  </td>
                ))}
                <td className="empty-cell"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Hidden input removed: data is written to external builder input */}

      {editDialog.open && (
        <div 
          className="fixed inset-0 flex items-start justify-center pt-20 z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editDialog.type === 'row' && 'Add New Row'}
                {editDialog.type === 'column' && 'Add New Column'}
                {editDialog.type === 'row-edit' && 'Edit Row Name'}
                {editDialog.type === 'column-edit' && 'Edit Column Name'}
              </h3>
              <button 
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                onClick={closeEditDialog}
              >
                ×
              </button>
            </div>
            <div className="px-6 py-4">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                onClick={closeEditDialog}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleDialogSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TableBuilderComponent;
