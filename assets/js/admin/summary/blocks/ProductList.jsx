import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { BaseAdminBlockComponent } from "./BlockComponent.jsx";
import { getFormatConfig } from "../utils/priceFormatting.js";
import { fetch_products } from "../utils/productsLoader.js";
import { update_block_percentage } from "../signals/summarySignals.js";
import ValuePriceControl from "./composite/ValuePriceControl.jsx";
import PercentagePriceControl from "./composite/PercentagePriceControl.jsx";
import TablePriceControl from "./composite/TablePriceControl.jsx";
import ProductSelectControl from "./composite/ProductSelectControl.jsx";

const ProductList = (props) => {
  console.log('ProductList', props)
  const component = new BaseAdminBlockComponent(props);
  const formatConfig = getFormatConfig();
  const currencySymbol = formatConfig.currencySymbol;
  const [products, setProducts] = useState(props.value || []);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [numberFields, setNumberFields] = useState([]);
  useEffect(() => {
    const load_products = async () => {
      try {
        const productsList = await fetch_products();
        setAvailableProducts(productsList);
      } catch (error) {
        console.error("[ProductList] Failed to load products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    load_products();

    const fields = window.wpcbookingAdminData?.number_fields || {};
    const fieldsArray = Object.entries(fields).map(([value, label]) => ({
      value,
      label,
    }));
    setNumberFields(fieldsArray);
  }, []);

  // Odstraněno: calculate_base_total_for_percentage
  // PercentagePriceControl používá total_base_price signal přímo

  const add_product = () => {
    const newProducts = [
      ...products,
      {
        product_id: "",
        price_type: "fixed",
        qty_type: "not_connected",
        qty_field: "",
        qty: 1,
        price: 0,
        percentage_operation: "add",
        percentage_value: 0,
        calculated_total: 0,
      },
    ];
    setProducts(newProducts);

    const block_total = newProducts.reduce((sum, p) => {
      return sum + (p.calculated_total || 0);
    }, 0);

    component.handle_change(newProducts, block_total);
  };

  const remove_product = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);

    const block_total = newProducts.reduce((sum, p) => {
      return sum + (p.calculated_total || 0);
    }, 0);

    component.handle_change(newProducts, block_total);
  };

  const update_product = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index] = {
      ...newProducts[index],
      [field]: value,
    };
    setProducts(newProducts);
    component.handle_change(newProducts);
  };

  const update_product_from_composite = (index, compositeData) => {
    const newProducts = [...products];
    const currentProduct = newProducts[index];
    const priceType = currentProduct.price_type || "fixed";
    
    newProducts[index] = {
      ...currentProduct,
      ...compositeData,
      price_type: priceType,
      product_id: currentProduct.product_id,
    };
    setProducts(newProducts);

    // OPRAVA: Rozdělit produkty na base (ValuePrice, TablePrice) a percentage
    let base_total = 0;
    let percentage_total = 0;
    let total_percentage_value = 0;
    
    newProducts.forEach((p, idx) => {
      const type = p.price_type || "fixed";
      
      if (type === "percentage") {
        // Pro percentage produkty aplikovat znaménko
        const calculated = p.calculated_total || 0;
        const operation = p.percentage_operation || "add";
        const signed_amount = operation === "subtract" ? -calculated : calculated;
        percentage_total += signed_amount;
        
        // Sečíst percentage_value pro signal
        const percentage_value = p.percentage_value || 0;
        const signed_percentage = operation === "subtract" ? -percentage_value : percentage_value;
        total_percentage_value += signed_percentage;
      } else {
        const calculated = p.calculated_total || 0;
        base_total += calculated;
      }
    });

    // Aktualizovat block_percentage_configs pro percentage produkty
    if (total_percentage_value !== 0) {
      const operation = total_percentage_value >= 0 ? "add" : "subtract";
      update_block_percentage(
        component.step,
        component.fieldId,
        Math.abs(total_percentage_value),
        operation
      );
    }

    component.handle_change(newProducts, base_total);
  };

  component.render_input = () => {
    return (
      <div className="product-list-container space-y-4">
        {products.length === 0 ? (
          <div className="text-gray-500 text-sm py-4">
            {__("No products added yet.", "wpcbooking")}
          </div>
        ) : (
          products.map((product, index) => {
            const priceType = product.price_type || "fixed";
            const productFieldId = `${component.fieldId}[${index}]`;
            console.log('product', index,product)
            return (
              <div
                key={index}
                className="aff-calculation-item flex flex-wrap gap-4 items-start bg-white p-4 rounded-xl shadow-soft border border-gray-200 relative"
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => remove_product(index)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  title={__("Remove product", "wpcbooking")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Product Select */}
                <ProductSelectControl
                  fieldId={productFieldId}
                  value={product}
                  onChange={(data) => {
                    const newProducts = [...products];
                    newProducts[index] = {
                      ...newProducts[index],
                      ...data,
                    };
                    setProducts(newProducts);
                    component.handle_change(newProducts);
                  }}
                  availableProducts={availableProducts}
                  loadingProducts={loadingProducts}
                />

                {/* Price Type */}
                <div className="flex flex-col flex-1 min-w-[160px]">
                  <label className="text-sm font-medium text-gray-700">
                    {__("Price Type", "wpcbooking")}
                  </label>
                  <select
                    name={`${productFieldId}[price_type]`}
                    value={priceType}
                    className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      update_product(index, "price_type", e.target.value)
                    }
                  >
                    <option value="fixed">
                      {__("Fixed Price", "wpcbooking")}
                    </option>
                    {(priceType === 'per_field') && (
                    <option value="per_field">
                      {__("Price per Field", "wpcbooking")}
                    </option>
                     )}
                    <option value="percentage">
                      {__("Percentage from Order", "wpcbooking")}
                    </option>
                    {(product.table ||
                      product.table_row_field ||
                      product.table_column_field) && (
                      <option value="table">{__("Table", "wpcbooking")}</option>
                    )}
                  </select>
                </div>

                {/* Table Type Controls */}
                {priceType === "table" && (
                   <TablePriceControl
                    fieldId={productFieldId}
                    value={product}
                    onChange={(data) =>
                      update_product_from_composite(index, data)
                    }
                    currencySymbol={currencySymbol}
                    numberFields={numberFields}
                  />
                )}

                {/* Fixed & Per Field Type Controls - same structure */}
                {(priceType === "fixed" || priceType === "per_field") && (
                  <ValuePriceControl
                    fieldId={productFieldId}
                    value={product}
                    onChange={(data) =>
                      update_product_from_composite(index, data)
                    }
                    currencySymbol={currencySymbol}
                    numberFields={numberFields}
                  />
                )}

                {/* Percentage Type Controls */}
                {priceType === "percentage" && (
                  <PercentagePriceControl
                    fieldId={productFieldId}
                    value={product}
                    onChange={(data) =>
                      update_product_from_composite(index, data)
                    }
                    currencySymbol={currencySymbol}
                  />
                )}
              </div>
            );
          })
        )}

        {/* Add Product Button */}
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={add_product}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>{__("Add product", "wpcbooking")}</span>
          </button>
        </div>
      </div>
    );
  };

  component.get_default_label = () => __("Products", "wpcbooking");

  return component.render();
};

export default ProductList;
