import { h, Fragment } from "preact";
import {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "preact/hooks";
import { __, sprintf } from "@wordpress/i18n";
import { useBookingContext } from "../contexts/BookingContext.jsx";
import { useInputField } from "../hooks/useInputField.js";

// Loading mode constants
const LOADING_MODE = {
  ALL_AT_ONCE: "all",
  LOAD_MORE_BUTTON: "button",
  INFINITE_SCROLL: "scroll",
};

const ProductGrid = ({ attrs = {}, rules = {} }) => {
  const context = useBookingContext();

  const loading_config = useMemo(
    () => ({
      mode: attrs.items?.loading_mode || LOADING_MODE.ALL_AT_ONCE,
      items_per_load: parseInt(attrs.items?.items_per_load, 10) || 6,
    }),
    [attrs.items?.loading_mode, attrs.items?.items_per_load]
  );
  const labelPickLater =
    attrs.items?.label_pick_later || __("Pick later", "wpcbooking");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(
    loading_config.items_per_load
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedAttributeFilter, setSelectedAttributeFilter] = useState(null);
  const listEndRef = useRef(null);
  useEffect(() => {
    setNextButtonLabel(labelPickLater);
  }, [labelPickLater]);
  useEffect(() => {
    setVisibleCount(loading_config.items_per_load);
  }, [loading_config.items_per_load]);

  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
      setVisibleCount(loading_config.items_per_load);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, loading_config.items_per_load]);

  const { currentValue, handleChange, error, isValid, inputClasses } =
    useInputField({
      fieldId: attrs.field_id,
      rules,
      ...context,
    });
  const fieldId = attrs.field_id;
  // Parse attrs data from PHP
  const {
    products = [],
    number_allowed = null,
    name = "select_list_products",
    filter_attribute = "",
  } = attrs.general || attrs || {};
  const { product_definitions = [], per_field_minimums = [] } = attrs || {};

  // Extract free_products_conditions from attrs.items (for FREE products - price = 0)
  const free_products_conditions = useMemo(() => {
    return attrs.items?.free_products_conditions || [];
  }, [attrs.items?.free_products_conditions]);

  // Extract allowed_products_to_select_conditions from attrs.items (for SELECTION LIMIT)
  const allowed_products_to_select_conditions = useMemo(() => {
    return attrs.items?.allowed_products_to_select || [];
  }, [attrs.items?.allowed_products_to_select]);

  const available_attribute_terms = useMemo(() => {
    if (!filter_attribute || !Array.isArray(products)) return [];

    const terms_map = new Map();
    products.forEach((product) => {
      if (Array.isArray(product.attribute_terms)) {
        product.attribute_terms.forEach((term) => {
          if (!terms_map.has(term.id)) {
            terms_map.set(term.id, term);
          }
        });
      }
    });

    return Array.from(terms_map.values());
  }, [products, filter_attribute]);

  // Extract included products from product_definitions (for add/remove logic)
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
  const { cardManager, setNextButtonLabel } = context || {};
  const include_products = useMemo(() => {
    if (!cardManager) return [];
    return cardManager.getIncludedProductIds();
  }, [cardManager, currentValue]);
  const included_products = useMemo(() => {
    if (!cardManager) return [];
    return cardManager.getIncludedProducts();
  }, [cardManager, currentValue]);
  // Calculate selection_limit based on cart products (SELECTION LIMIT)
  const selection_limit = useMemo(() => {
    if (
      !cardManager ||
      !Array.isArray(allowed_products_to_select_conditions) ||
      allowed_products_to_select_conditions.length === 0
    ) {
      return null;
    }

    const cart_items = cardManager.getProducts();
    const cart_product_ids = cart_items.map((item) => item.product_id);

    for (const condition of allowed_products_to_select_conditions) {
      if (cart_product_ids.includes(condition.product)) {
        return condition.allowed;
      }
    }

    return null;
  }, [cardManager, allowed_products_to_select_conditions, currentValue]);

  // Calculate free_products_count based on cart products (FREE PRODUCTS - price = 0)
  const free_products_count = useMemo(() => {
    if (
      !cardManager ||
      !Array.isArray(free_products_conditions) ||
      free_products_conditions.length === 0
    ) {
      return 0;
    }

    const cart_items = cardManager.getProducts();

    for (const condition of free_products_conditions) {
      if (cart_items.some((item) => item.product_id === condition.product)) {
        return condition.allowed;
      }
    }

    return 0;
  }, [cardManager, free_products_conditions, currentValue]);

  // Get current currency (default to DKK)
  const current_currency = window.wpcbooking_public?.currency || "DKK";

  // Check if product row is disabled based on per_field_minimums conditions
  const isRestricted = useCallback(
    (row) => {
      if (
        !Array.isArray(per_field_minimums) ||
        per_field_minimums.length === 0
      ) {
        return null;
      }

      const row_condition = per_field_minimums.find((item) => item.row === row);
      if (!row_condition) {
        return null;
      }
      const { field_id, from_value, to_value, min_price, product_price } =
        row_condition;
      const { bookingFormManager } = context || {};
      const field_value =
        parseInt(bookingFormManager.get_field_value(field_id), 10) || 0;
      const fieldLabel = bookingFormManager.get_field_label(field_id);
      // Check min_value condition (field value must be between from_value and to_value)
      if (
        field_value !== null &&
        field_value !== undefined &&
        (field_value < from_value || field_value > to_value)
      ) {
        return {
          type: "value_condition",
          message: sprintf(
            __("Value for %s (%d) must be between %d and %d", "wpcbooking"),
            fieldLabel,
            field_value,
            from_value,
            to_value
          ),
          required: from_value,
          current: field_value,
        };
      }

      const priceProduct = product_price?.price?.[current_currency] ?? 0;
      let quantityProduct = 1;
      if (product_price?.qty?.type === "per_field") {
        quantityProduct =
          bookingFormManager.get_field_value(
            product_price?.qty?.booking_fields
          ) ?? 1;
      } else {
        quantityProduct = product_price?.qty?.value ?? 1;
      }
      const required_price = priceProduct * quantityProduct;
     
      // Check min_price condition (cart total must be >= min_price for current currency)
      if (
        min_price[current_currency] &&
        min_price[current_currency] > required_price
      ) {
        return {
          type: "min_price",
          message: sprintf(
            __("Minimum product price must be %d %s", "wpcbooking"),
            required_price ?? 0,
            current_currency
          ),
          required: required_price ?? 0,
          current: priceProduct,
        };
      }

      return null;
    },
    [per_field_minimums, context, current_currency]
  );

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
  // Priority: selection_limit (from cart conditions) > number_allowed > unlimited
  const maximumChoices = useMemo(() => {
    const allowed = selection_limit !== null ? selection_limit : number_allowed;

    if (allowed === null || allowed === undefined) {
      return Array.isArray(products) ? products.length : 0;
    }
    return allowed;
  }, [selection_limit, number_allowed, products]);

  // Count selected products (excluding included ones)
  const selectedCount = useMemo(() => {
    const non_included_selection = parseCurrentValue.filter(
      (item) => !include_products.includes(item.product_id)
    );
    return non_included_selection.length;
  }, [parseCurrentValue, include_products]);

  // Check if there's a selection limit (from cart conditions or general settings)
  const has_selection_limit = useMemo(() => {
    return (
      selection_limit !== null ||
      (number_allowed !== null && number_allowed !== undefined)
    );
  }, [selection_limit, number_allowed]);

  // Calculate remaining selections
  const remaining_selections = useMemo(() => {
    if (!has_selection_limit) {
      return null;
    }
    return Math.max(0, maximumChoices - selectedCount);
  }, [has_selection_limit, maximumChoices, selectedCount]);

  // Set initial label when products are rendered (after BookingApp reset)
  useEffect(() => {
    if (!setNextButtonLabel) return;
    if (Object.keys(products_by_row).length === 0) return;

    // Use setTimeout to ensure this runs AFTER BookingApp's reset effect
    const timer = setTimeout(() => {
      const label = selectedCount > 0 ? null : labelPickLater;
      setNextButtonLabel(label);
    }, 0);

    return () => clearTimeout(timer);
  }, [products_by_row, selectedCount, context]);

  // Update label when selection changes
  useEffect(() => {
    const { setNextButtonLabel } = context || {};
    if (!setNextButtonLabel) return;

    const label = selectedCount > 0 ? null : labelPickLater;
    setNextButtonLabel(label);
  }, [selectedCount]);

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
  const handle_product_toggle = (fieldId, product_id, row) => {
    const is_included =
      Array.isArray(include_products) && include_products.includes(product_id);
    // Included products cannot be toggled
    if (is_included) return;

    // Fix row values in existing selection using productToDefinitionMap
    const current_selection = parseCurrentValue.map((item) => {
      const correct_row = productToDefinitionMap.get(item.product_id);
      return correct_row !== undefined ? { ...item, row: correct_row } : item;
    });
    const existing_index = current_selection.findIndex(
      (item) => item.product_id === product_id && item.row === row
    );

    const row_included_products = get_row_included_products(row);

    if (existing_index >= 0) {
      // Remove product
      const removed_item = current_selection[existing_index];

      current_selection.splice(existing_index, 1);
    } else {
      // Check if we can add more products
      const non_included_selection = current_selection.filter(
        (item) => !include_products.includes(item.product_id)
      );
      const non_included_count = non_included_selection.length;

      if (maximumChoices !== null && non_included_count >= maximumChoices) {
        // Automatically remove the oldest selected product (first in array) to make room

        if (non_included_selection.length > 0) {
          const oldest_product = non_included_selection[0];
          const oldest_index = current_selection.findIndex(
            (item) =>
              item.product_id === oldest_product.product_id &&
              item.row === oldest_product.row
          );

          if (oldest_index >= 0) {
            const removed_item = current_selection[oldest_index];
            current_selection.splice(oldest_index, 1);
          }
        }
      }

      // Add product
      current_selection.push({ product_id, row, field_id: fieldId });
    }
    // Work with objects first, convert to JSON strings at the end
    const value_objects = [...current_selection];

    // Add included products filtered by field_id
    if (Array.isArray(included_products) && included_products.length > 0) {
      // Get all product IDs from products_by_row
      const available_product_ids = new Set();
      Object.values(products_by_row).forEach((products) => {
        products.forEach((product) => {
          available_product_ids.add(product.id);
        });
      });

      // Filter and add included products that exist in products_by_row
      included_products.forEach((item) => {
        item.product_ids.forEach((product_id) => {
          if (available_product_ids.has(product_id)) {
            value_objects.push({
              row: item.row_id,
              product_id,
              field_id: fieldId,
            });
          }
        });
      });
    }
    // Filter unique products by product_id and row
    const uniqueProducts = new Map();
    value_objects.forEach((item) => {
      const key = `${item.product_id}_${item.row}`;
      if (!uniqueProducts.has(key) && item.field_id === fieldId) {
        uniqueProducts.set(key, item);
      }
    });

    // Convert to array of JSON strings for form submission
    const value_for_form = Array.from(uniqueProducts.values()).map((item) =>
      JSON.stringify(item)
    );

    handleChange(value_for_form);
  };

  // Check if product is selected
  const is_product_selected = (product_id, row) => {
    const is_included =
      Array.isArray(include_products) && include_products.includes(product_id);
    if (is_included) return true;

    return selectedByRow[row] && selectedByRow[row].includes(product_id);
  };

  // Render product item
  const render_product_item = (fieldId, product, row) => {
    const is_active = is_product_selected(product.id, row);
    const is_included =
      Array.isArray(include_products) && include_products.includes(product.id);
    const restriction = isRestricted(row);
    const is_restricted = restriction !== null;

    const handle_click = () => {
      if (is_restricted) {
        return;
      }
      handle_product_toggle(fieldId, product.id, row);
    };

    const handle_image_error = (e) => {
      if (window.wpcbooking_public?.placeholder_image) {
        e.target.src = window.wpcbooking_public.placeholder_image;
      }
    };

    return (
      <li
        key={`${product.id}_${row}`}
        className={`js-item col-span-1 grid grid-cols-5 gap-x-th-halfgap mb-20p rounded-r-[20px] ${
          is_restricted ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        } [box-shadow:0_0_10px_#e5e5e5] [&.is-active]:bg-th-orange-light/10 [&.is-active]:shadow-none ${
          is_included
            ? "is-included bg-th-orange-light/10 shadow-none"
            : is_active
            ? "is-active"
            : ""
        }`}
        onClick={handle_click}
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
          disabled={is_restricted}
        />

        {/* Image Section */}
        <div className="col-[1/-1] medium:col-[1/span_2] relative">
          <div
            className={`h-110p medium:h-full medium:aspect-w-10 medium:aspect-h-9 cs-coverbox max-medium:rounded-tr-[20px] overflow-hidden ${
              is_restricted ? "grayscale" : ""
            }`}
          >
            {product.image ? (
              <div
                dangerouslySetInnerHTML={{ __html: product.image }}
                ref={(el) => {
                  if (el) {
                    const img = el.querySelector("img");
                    if (img && !img.dataset.errorHandled) {
                      img.dataset.errorHandled = "true";
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

          {is_restricted ? (
            /* Restricted Badge */
            <div className="absolute top-3 right-4 medium:right-0 w-fit h-55p pl-20p pr-35p flex items-center bg-gray-500">
              <div className="text-white font-poppins uppercase font-medium text-[14px] mt-px">
                {__("UNAVAILABLE", "wpcbooking")}
              </div>
            </div>
          ) : is_included ? (
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
        <div className="col-[1/-1] medium:col-[3/span_3]">
          <div className="px-20p large:px-30p py-20p">
            <div
              className={`af-p28 ${
                is_restricted
                  ? "text-gray-400"
                  : "text-black [.is-active_&]:text-th-orange"
              }`}
            >
              {product.title || __("Product", "wpcbooking")}
            </div>
            {product.short_description && (
              <div
                className="af-p18 mt-15p"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}
            {/* Restriction Message */}
            {is_restricted && (
              <div className="mt-10p p-10p bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-700 text-sm">
                  <span className="text-lg">⚠️</span>
                  <span>{restriction.message}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </li>
    );
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedAttributeFilter) {
      result = result.filter((product) => {
        if (!Array.isArray(product.attribute_terms)) return false;
        return product.attribute_terms.some(
          (term) => term.id === selectedAttributeFilter
        );
      });
    }

    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter((product) => {
        const titleMatch = product.title?.toLowerCase().includes(searchLower);
        const descMatch = product.short_description
          ?.toLowerCase()
          .includes(searchLower);
        return titleMatch || descMatch;
      });
    }

    return result;
  }, [products, debouncedSearchTerm, selectedAttributeFilter]);

  const visibleProducts = useMemo(() => {
    if (loading_config.mode === LOADING_MODE.ALL_AT_ONCE) {
      return filteredProducts;
    }
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount, loading_config.mode]);

  const hasMoreProducts = useMemo(() => {
    return visibleCount < filteredProducts.length;
  }, [visibleCount, filteredProducts.length]);

  const handle_load_more = useCallback(() => {
    if (!hasMoreProducts || isLoadingMore) return;

    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + loading_config.items_per_load, filteredProducts.length)
      );
      setIsLoadingMore(false);
    }, 300);
  }, [
    hasMoreProducts,
    isLoadingMore,
    filteredProducts.length,
    loading_config.items_per_load,
  ]);

  useEffect(() => {
    if (loading_config.mode !== LOADING_MODE.INFINITE_SCROLL) return;
    if (!listEndRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreProducts && !isLoadingMore) {
          handle_load_more();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(listEndRef.current);

    return () => observer.disconnect();
  }, [hasMoreProducts, isLoadingMore, handle_load_more, loading_config.mode]);

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

  const products_by_row = useMemo(() => {
    const result = {};

    if (Array.isArray(visibleProducts) && visibleProducts.length > 0) {
      visibleProducts.forEach((product, index) => {
        // Get row from product_definitions mapping
        const row_index = productToDefinitionMap.get(product.id) ?? index;
        if (!result[row_index]) {
          result[row_index] = [];
        }
        result[row_index].push({ ...product, row: row_index });
      });
    }

    return result;
  }, [visibleProducts, productToDefinitionMap]);

  // Show number allowed message if applicable (check both cart conditions and general settings)
  const show_number_allowed_message = has_selection_limit;

  const handle_attribute_filter = (term_id) => {
    setSelectedAttributeFilter((prev) => (prev === term_id ? null : term_id));
    setVisibleCount(loading_config.items_per_load);
  };

  return (
    <div className="products-archive" data-name={attrs.field_id}>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {available_attribute_terms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {available_attribute_terms.map((term) => (
              <button
                key={term.id}
                type="button"
                onClick={() => handle_attribute_filter(term.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
                  selectedAttributeFilter === term.id
                    ? "bg-th-orange text-white border-th-orange"
                    : "bg-white text-gray-700 border-th-grey-form hover:border-th-orange hover:text-th-orange"
                }`}
              >
                {term.name}
              </button>
            ))}
          </div>
        )}
        <div className="relative flex-1 min-w-[200px] max-w-[50%] ml-auto">
          <input
            type="text"
            value={searchTerm}
            onInput={(e) => setSearchTerm(e.target.value)}
            placeholder={__("Search products...", "wpcbooking")}
            className="w-full border-2 border-th-blue rounded-[10px] h-[55px] pl-[15px] pr-[45px]"
          />
          <div className="absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none">
            <img
              decoding="async"
              src={`${
                window.wpcbooking_public?.plugin_url || ""
              }assets/img/search-icon.svg`}
              alt={__("Search Icon", "wpcbooking")}
              className="w-[20px] h-[20px]"
            />
          </div>
        </div>
      </div>

      {show_number_allowed_message && (
        <div className="mb-6 flex items-center gap-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              remaining_selections === 0
                ? "bg-red-100 text-red-700 border-2 border-red-300"
                : remaining_selections <= 2
                ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
                : "bg-th-orange/10 text-th-orange border-2 border-th-orange/30"
            }`}
          >
            <span
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
                remaining_selections === 0
                  ? "bg-red-500"
                  : remaining_selections <= 2
                  ? "bg-yellow-500"
                  : "bg-th-orange"
              }`}
            >
              {remaining_selections}
            </span>
            <span>
              {remaining_selections === 0
                ? __("Limit reached", "wpcbooking")
                : remaining_selections === 1
                ? __("product remaining", "wpcbooking")
                : __("products remaining", "wpcbooking")}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {sprintf(
              __("%d / %d selected", "wpcbooking"),
              selectedCount,
              maximumChoices
            )}
          </span>
        </div>
      )}

      {/* Products Grid */}
      <div className="relative">
        {isSearching && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-th-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <ul
          data-maximum-choices={maximumChoices}
          className="aff-choices-wrap grid medium:grid-cols-2 gap-10p medium:gap-50p mt-70p [&_*]:transition-all [&_*]:duration-300"
        >
          {Object.keys(products_by_row).length > 0 ? (
            Object.keys(products_by_row).map((row_index) => {
              const products = products_by_row[row_index];
              return products.map((product) =>
                render_product_item(fieldId, product, parseInt(row_index))
              );
            })
          ) : (
            <li className="text-center text-gray-500 py-8 col-span-full">
              <div className="text-2xl mb-2">📦</div>
              <p>{__("No products available", "wpcbooking")}</p>
            </li>
          )}
        </ul>

        {/* Infinite scroll trigger */}
        {loading_config.mode === LOADING_MODE.INFINITE_SCROLL &&
          hasMoreProducts && <div ref={listEndRef} className="h-10" />}

        {/* Load More Button */}
        {loading_config.mode === LOADING_MODE.LOAD_MORE_BUTTON &&
          hasMoreProducts && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                onClick={handle_load_more}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-th-orange text-white font-semibold rounded-full hover:bg-th-orange/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {isLoadingMore ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {__("Loading...", "wpcbooking")}
                  </>
                ) : (
                  sprintf(
                    __("Load more (%d remaining)", "wpcbooking"),
                    filteredProducts.length - visibleCount
                  )
                )}
              </button>
            </div>
          )}

        {/* Loading indicator for infinite scroll */}
        {loading_config.mode === LOADING_MODE.INFINITE_SCROLL &&
          isLoadingMore && (
            <div className="flex justify-center mt-6">
              <div className="w-10 h-10 border-4 border-th-orange border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductGrid;
