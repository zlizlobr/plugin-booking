import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { __ } from "@wordpress/i18n";

const ProductSelectControl = ({ fieldId = "", value, onChange, availableProducts, loadingProducts }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const selectedProduct = availableProducts.find(p => String(p.id) === String(value.product_id));

  const filteredProducts = (() => {
    if (!searchQuery || searchQuery.trim() === '') return availableProducts;

    const normalizeText = (text) => {
      if (!text) return '';
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    const searchTerm = normalizeText(searchQuery.trim());

    return availableProducts.filter(product => {
      const normalizedName = normalizeText(product.name);
      const normalizedId = normalizeText(product.id);
      return normalizedName.includes(searchTerm) || normalizedId.includes(searchTerm);
    });
  })();

  const handleProductSelect = (productId) => {
    const selectedProduct = availableProducts.find(p => String(p.id) === String(productId));
    onChange({
      product_id: productId,
      price: selectedProduct ? parseFloat(selectedProduct.price) || 0 : value.price,
    });
    setDropdownOpen(false);
    setSearchQuery('');
  };

  const toggleDropdown = () => {
    const newState = !dropdownOpen;
    setDropdownOpen(newState);
    if (!newState) {
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [dropdownOpen]);

  return (
    <div className="flex flex-col flex-[2] min-w-[200px]">
      <label className="text-sm font-medium text-gray-700">
        {__("Product", "wpcbooking")}
      </label>
      <input 
        type="hidden" 
        name={`${fieldId}[product_id]`}
        value={value.product_id || ""}
      />
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={loadingProducts}
          className="mt-1 w-full text-left border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 flex items-center justify-between"
        >
          <span className={`flex items-center gap-2 ${selectedProduct ? "text-gray-900" : "text-gray-500"}`}>
            {selectedProduct && (
              <img 
                src={selectedProduct.thumbnail} 
                alt={selectedProduct.name}
                className="w-6 h-6 object-cover rounded"
              />
            )}
            <span>
              {loadingProducts
                ? __("Loading...", "wpcbooking")
                : selectedProduct
                ? selectedProduct.name
                : __("Select product", "wpcbooking")}
            </span>
          </span>
          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow-lg left-0 right-0 top-full mt-1">
            <div className="p-2 border-b border-gray-200">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={__('Search product...', 'wpcbooking')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </div>
            <ul className="py-2 text-sm text-left max-h-60 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleProductSelect(product.id)}
                      className={`inline-flex w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                        String(value.product_id) === String(product.id)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-900'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <img 
                          src={product.thumbnail} 
                          alt={product.name}
                          className="w-6 h-6 object-cover rounded"
                        />
                        <span>{product.name}</span>
                      </span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500 text-center">
                  {__('No products found', 'wpcbooking')}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelectControl;

