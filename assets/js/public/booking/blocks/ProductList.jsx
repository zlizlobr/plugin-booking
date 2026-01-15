import { h, Fragment } from "preact";
import { useMemo, useEffect } from "preact/hooks";
import { __, sprintf } from "@wordpress/i18n";
import { useBookingContext } from "../contexts/BookingContext.jsx";
import { useInputField } from "../hooks/useInputField.js";
import { InputBookingComponent } from './InputBookingComponent.jsx';
const ProductList = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();
  const fieldId = attrs.field_id;
  const { currentValue, handleChange, error, isValid, inputClasses } =
    useInputField({
      fieldId: attrs.field_id,
      rules,
      ...context,
    });
  // Parse attrs data from PHP
  const {
    products = [],
    number_allowed = null,
    name = "select_list_products",
  } = attrs.general || attrs || {};
  const { product_definitions = [] } = attrs || {};

  // Extract included products from product_definitions
  const extract_included_products = useMemo(() => {
    const result = [];

    if (!Array.isArray(product_definitions)) return result;

    product_definitions.forEach((definition, row_index) => {
      if (
        definition.add_included_products === true &&
        Array.isArray(definition.included_products)
      ) {
        result.push({
          row_id: row_index,
          field_id: attrs.field_id,
          products: definition.included_products,
        });
      }
    });

    return result;
  }, [product_definitions, attrs.field_id]);

  // Load included product IDs from cart
  const { cardManager } = context || {};
  const include_products = useMemo(() => {
    if (!cardManager) return [];
    return cardManager.getIncludedProductIds();
  }, [cardManager, currentValue]);


  // Parse currentValue - handle array of JSON strings or array of objects
  const parseCurrentValue = useMemo(() => {
    if (!currentValue) return [];

    if (Array.isArray(currentValue)) {
      return currentValue
        .map((item) => {
          if (typeof item === "string") {
            try {
              return JSON.parse(item);
            } catch (e) {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);
    }

    if (typeof currentValue === "string" && currentValue.trim() !== "") {
      try {
        const parsed = JSON.parse(currentValue);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }

    return [];
  }, [currentValue]);

  // Convert selected products to object by row
  const selectedByRow = useMemo(() => {
    const result = {};
    parseCurrentValue.forEach((item) => {
      if (item && item.row !== undefined && item.product_id !== undefined) {
        if (!result[item.row]) {
          result[item.row] = [];
        }
        result[item.row].push(item.product_id);
      }
    });
    return result;
  }, [parseCurrentValue]);

  // Calculate maximum choices (null means unlimited)
  const maximumChoices = useMemo(() => {
    if (number_allowed === null || number_allowed === undefined) {
      return 0;
    }
    return number_allowed;
  }, [number_allowed, products]);

  // Get included products for a specific row
  const get_row_included_products = (row) => {
    const row_data = extract_included_products.find(
      (item) => item.row_id === row
    );
    if (!row_data || !Array.isArray(row_data.products)) return [];

    return row_data.products
      .map((product) => {
        return typeof product === "object" ? product.id : product;
      })
      .filter(Boolean);
  };

  // Handle product toggle
  const handle_product_toggle = (product_id, row) => {
    console.log("🔵 [ProductList] handle_product_toggle START", {
      product_id,
      row,
      timestamp: new Date().toISOString()
    });

    const is_included =
      Array.isArray(include_products) && include_products.includes(product_id);

    console.log("🔍 [ProductList] Checking if product is included", {
      product_id,
      is_included,
      include_products
    });

    // Included products cannot be toggled
    if (is_included) {
      console.log("⚠️ [ProductList] Product is included, cannot toggle", { product_id });
      return;
    }

    // Fix row values in existing selection using productToDefinitionMap
    const current_selection = parseCurrentValue.map((item) => {
      const correct_row = productToDefinitionMap.get(item.product_id);
      return correct_row !== undefined ? { ...item, row: correct_row } : item;
    });

    console.log("📋 [ProductList] Current selection after row fix", {
      current_selection,
      parseCurrentValue_original: parseCurrentValue
    });

    const existing_index = current_selection.findIndex(
      (item) => item.product_id === product_id && item.row === row
    );

    console.log("🔎 [ProductList] Finding existing product", {
      product_id,
      row,
      existing_index,
      found: existing_index >= 0
    });

    const row_included_products = get_row_included_products(row);
    console.log("📦 [ProductList] Row included products", {
      row,
      row_included_products
    });

    if (existing_index >= 0) {
      // Remove product
      const removed_item = current_selection[existing_index];
      console.log("➖ [ProductList] REMOVING product", {
        removed_item,
        existing_index,
        before_count: current_selection.length
      });

      current_selection.splice(existing_index, 1);

      console.log("✅ [ProductList] Product removed from selection", {
        after_count: current_selection.length,
        remaining_selection: current_selection
      });

    } else {
      // Check if we can add more products
      const non_included_selection = current_selection.filter(
        (item) => !include_products.includes(item.product_id)
      );
      const non_included_count = non_included_selection.length;

      console.log("➕ [ProductList] ADDING product - checking limits", {
        non_included_count,
        maximumChoices,
        can_add: maximumChoices === null || non_included_count < maximumChoices
      });

      if (maximumChoices !== null && non_included_count >= maximumChoices) {
        // Automatically remove the oldest selected product (first in array) to make room
        console.log("⚠️ [ProductList] Maximum choices reached, removing oldest", {
          maximumChoices,
          non_included_count,
          non_included_selection
        });

        if (non_included_selection.length > 0) {
          const oldest_product = non_included_selection[0];
          const oldest_index = current_selection.findIndex(
            (item) =>
              item.product_id === oldest_product.product_id &&
              item.row === oldest_product.row
          );

          console.log("🗑️ [ProductList] Removing oldest product", {
            oldest_product,
            oldest_index
          });

          if (oldest_index >= 0) {
            const removed_item = current_selection[oldest_index];
            current_selection.splice(oldest_index, 1);

            console.log("✅ [ProductList] Oldest product removed", {
              removed_item,
              remaining_count: current_selection.length
            });
          }
        }
      }

      // Add product
      console.log("➕ [ProductList] Adding new product to selection", {
        product_id,
        row,
        before_count: current_selection.length
      });

      current_selection.push({ product_id, row, field_id: fieldId });

      console.log("✅ [ProductList] Product added to selection", {
        after_count: current_selection.length,
        current_selection
      });
    }

    console.log("📝 [ProductList] Building final value for form", {
      current_selection
    });

    // Convert to array of JSON strings for form submission
    const value_for_form = current_selection.map((item) =>
      JSON.stringify(item)
    );

    console.log("✅ [ProductList] Final value for form", {
      value_for_form,
      count: value_for_form.length
    });

    handleChange(value_for_form);

    console.log("🔵 [ProductList] handle_product_toggle END", {
      product_id,
      row,
      timestamp: new Date().toISOString()
    });
  };

  // Check if product is selected
  const is_product_selected = (product_id, row) => {
    const is_included =
      Array.isArray(include_products) && include_products.includes(product_id);
    if (is_included) return true;

    return selectedByRow[row] && selectedByRow[row].includes(product_id);
  };

  // Render product item
  const render_product_item = (product, row) => {
    const is_active = is_product_selected(product.id, row);
    const is_included =
      Array.isArray(include_products) && include_products.includes(product.id);

    const handle_image_error = (e) => {
      if (window.wpcbooking_public?.placeholder_image) {
        e.target.src = window.wpcbooking_public.placeholder_image;
      }
    };

    return (
      <li
        key={`${product.id}_${row}`}
        className={`js-item grid grid-cols-9 gap-x-th-gap mb-20p rounded-r-[20px] cursor-pointer [box-shadow:0_0_10px_#e5e5e5] [&.is-active]:shadow-none [&.is-active]:bg-th-orange-light/10 ${
          is_included
            ? "is-included bg-th-orange-light/10 shadow-none"
            : is_active
            ? "is-active"
            : ""
        }`}
        onClick={() => handle_product_toggle(product.id, row)}
      >
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          id={product.id}
          name={`${attrs.field_id}[]`}
          value={JSON.stringify({ product_id: product.id, row })}
          className={`product hidden-checkbox ${
            is_included ? "" : "js-countable"
          }`}
          checked={is_active || is_included}
        />

        {/* Image Section */}
        <div className="col-[1/-1] medium:col-[1/span_2] relative">
          <div className="h-110p medium:h-full medium:aspect-w-7 medium:aspect-h-9 cs-coverbox max-medium:rounded-tr-[20px] overflow-hidden">
            {product.image ? (
              <div 
                dangerouslySetInnerHTML={{ __html: product.image }}
                ref={(el) => {
                  if (el) {
                    const img = el.querySelector('img');
                    if (img && !img.dataset.errorHandled) {
                      img.dataset.errorHandled = 'true';
                      img.onerror = handle_image_error;
                    }
                  }
                }}
              />
            ) : window.wpcbooking_public?.placeholder_image ? (
              <img 
                src={window.wpcbooking_public.placeholder_image} 
                alt={product.title || __("Product", "wpcbooking")}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {is_included ? (
            <>
              {/* Included Badge */}
              <div className="absolute top-3 right-4 medium:right-0 w-fit h-55p pl-20p pr-35p hidden [.is-included_&]:flex items-center bg-th-orange">
                <div className="text-white font-poppins uppercase font-medium text-[19px] mt-px">
                  {__("INCLUDED", "wpcbooking")}
                </div>
              </div>
              {/* Included Checkbox */}
              <div className="absolute top-3 right-4 medium:right-0 translate-x-1/2 w-55p h-55p bg-white [.is-active_&]:bg-th-orange border-[5px] border-th-grey-form [.is-active_&]:border-th-orange [.is-included_&]:border-th-orange rounded-full flex items-center justify-center">
                <div
                  className="w-7 h-[22px] cs-mask bg-th-grey-form [.is-active_&]:bg-white [.is-included_&]:bg-th-orange"
                  style={{
                    "--mask-img": `url('${
                      window.wpcbooking_public?.plugin_url || ""
                    }assets/img/form/check.svg')`,
                  }}
                ></div>
              </div>
            </>
          ) : (
            /* Regular Checkbox */
            <div className="absolute top-3 right-4 medium:right-0 translate-x-1/2 w-55p h-55p bg-white [.is-active_&]:bg-th-orange border-[5px] border-th-grey-form [.is-active_&]:border-th-orange rounded-full flex items-center justify-center">
              <div
                className="w-7 h-[22px] cs-mask bg-th-grey-form [.is-active_&]:bg-white"
                style={{
                  "--mask-img": `url('${
                    window.wpcbooking_public?.plugin_url || ""
                  }assets/img/form/check.svg')`,
                }}
              ></div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="col-[1/-1] medium:col-[3/span_7]">
          <div className="px-20p large:px-50p py-20p aff-list-product-description">
            <div className="af-p33 text-black [.is-active_&]:text-th-orange">
              {product.title || __("Product", "wpcbooking")}
            </div>
            {product.short_description && (
              <div
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}
          </div>
        </div>
      </li>
    );
  };

  // Create product_id to definition_index map
  const productToDefinitionMap = useMemo(() => {
    const map = new Map();

    if (!Array.isArray(product_definitions)) return map;

    product_definitions.forEach((definition, definition_index) => {
      // Check if definition has product_ids
      if (definition.product_ids) {
        const product_ids = Array.isArray(definition.product_ids)
          ? definition.product_ids
          : [definition.product_ids];

        product_ids.forEach((product_id) => {
          map.set(parseInt(product_id), definition_index);
        });
      }
    });

    return map;
  }, [product_definitions]);

  // Group products by row - each product gets its own row index
  const products_by_row = useMemo(() => {
    const result = {};

    if (Array.isArray(products) && products.length > 0) {
      products.forEach((product, index) => {
        // Get row from product_definitions mapping
        const row_index = productToDefinitionMap.get(product.id) ?? index;
        if (!result[row_index]) {
          result[row_index] = [];
        }
        result[row_index].push({ ...product, row: row_index });
      });
    }

    return result;
  }, [products, productToDefinitionMap]);

  return (
    <div className="products-archive" data-name={attrs.field_id}>
      {/* Products List */}
      <ul
        data-maximum-choices={maximumChoices}
        className="aff-choices-wrap aff-products-list js-choices-wrap mt-70p [&_*]:transition-all [&_*]:duration-300"
      >
        {Object.keys(products_by_row).length > 0 ? (
          Object.keys(products_by_row).map((row_index) => {
            const products = products_by_row[row_index];
            return products.map((product) =>
              render_product_item(product, parseInt(row_index))
            );
          })
        ) : (
          <li className="text-center text-gray-500 py-8 col-span-full">
            <div className="text-2xl mb-2">📦</div>
            <p>{__("No products available", "wpcbooking")}</p>
          </li>
        )}
      </ul>
       {InputBookingComponent.render_error_message(attrs.field_id, error)}
    </div>
  );
};

export default ProductList;
