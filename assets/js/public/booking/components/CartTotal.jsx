import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { __ } from "@wordpress/i18n";
import { useBookingContext } from "../contexts/BookingContext.jsx";

const CartTotal = ({
  summary_options = {},
  blocks = [],
  shipping_total = 0,
}) => {
  const context = useBookingContext();
  const { bookingFormManager } = context || {};
  const cart = bookingFormManager ? bookingFormManager.getCart() : null;

  // State for cart totals (will be updated when cart changes)
  const [cartTotals, setCartTotals] = useState(() => {
    if (!cart) return { base_total: 0, percentage_total: 0, grand_total: 0 };
    return {
      base_total: cart.getBaseTotal?.() || 0,
      percentage_total: cart.getPercentageTotal?.() || 0,
      grand_total: cart.getGrandTotal?.() || cart.getCartTotal?.() || 0,
    };
  });

  // State for forcing re-render of step items
  const [refreshKey, setRefreshKey] = useState(0);

  // Subscribe to cart updates
  useEffect(() => {
    if (!cart || typeof cart.subscribe !== "function") {
      console.warn(
        "🛒 [CartTotal] Cart not available or subscribe not supported"
      );
      return;
    }

    const unsubscribe = cart.subscribe((totals) => {
      console.log("🛒 [CartTotal] Subscribing to cart updates", totals);
      setCartTotals({
        base_total: totals.base_total || 0,
        percentage_total: totals.percentage_total || 0,
        grand_total: totals.grand_total || 0,
      });
      // Force re-render of step items
      setRefreshKey((prev) => prev + 1);
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [cart]);

  // Listen to BookingFormManager events for cart updates
  useEffect(() => {
    if (!bookingFormManager) return;

    const handleCartUpdate = (event) => {
      if (event.type === "cart_updated_from_server") {
        setCartTotals(event.totals);
        // Force re-render of step items
        setRefreshKey((prev) => prev + 1);
      }
    };

    bookingFormManager.add_listener(handleCartUpdate);

    return () => {
      bookingFormManager.remove_listener(handleCartUpdate);
    };
  }, [bookingFormManager]);

  // Get values from state
  const currency =
    cart?.currency || window.wpcbooking_public?.currency || "DKK";
  const total_base = cartTotals.base_total;
  const total_percentage = cartTotals.percentage_total;
  const total_quote = cartTotals.grand_total;

  const cart_total = total_quote + shipping_total;
  let cartTotal = 0;
  let cartProcessedTotal = 0;
  const render_step_items = () => {
    if (!Array.isArray(blocks) || blocks.length === 0) {
      return null;
    }
    // Filter blocks to only show steps with price_step > 0
    const blocks_with_price = blocks.filter((block, index) => {
      if (!block) return false;
      const price_step = block.price_step || 0;
      const has_price = price_step > 0;
      return has_price;
    });

    return blocks_with_price.map((block, filtered_index) => {
      if (!block) {
        return null;
      }
      const data = block.data || {};
      const original_index = blocks.indexOf(block);
      const step_num = original_index + 1;
      const label_summary =
        data.label_summary ||
        data.title ||
        `${__("Step", "wpcbooking")} ${step_num}`;
      const price_step = block.price_step || 0;
      cartTotal += price_step;
      let step_items = [];
      console.log("🔍 [CartTotal] Step items: ", price_step);
      if (cart && typeof cart.get_items_by_step === "function") {
        step_items = cart.get_items_by_step(step_num) || [];
      }

      // Filter out items with total 0 and check if any items remain
      const valid_items = step_items.filter((item) => {
        const item_price = item.price || item.value || 0;

        const item_quantity = item.quantity || 1;
        const item_total = item_price * item_quantity;
        return item_total > 0;
      });

      return (
        <div key={`cart-step-${step_num}-${refreshKey}`} className="mb-3">
          <div className="af-p18-bold text-white mb-1.5">{label_summary}</div>

          <div className="ml-4">
            {valid_items.map((item, item_index) => {
              const item_name = item.name || item.label || item.title || "";
              const item_price = item.price || item.value || 0;
              const item_quantity = item.quantity || 1;
              const item_total = item_price * item_quantity;
              return (
                <div
                  key={`cart-item-${step_num}-${item_index}-${refreshKey}`}
                  className="py-2 border-b border-dashed border-white/30 last:border-b-0"
                >
                  <span className="af-p16 text-white/90 leading-tight flex items-baseline gap-1">
                    {item_name}
                  </span>
                </div>
              );
            })}
          </div>
          <span className="af-p16-bold text-white leading-tight block text-right mr-50p">
            {price_step.toLocaleString()}
            <span className="currnency_symbol text-white/80 ml-1 text-sm leading-none">
              {" "}
              {currency}
            </span>
          </span>
        </div>
      );
    });
  };

  return (
    <Fragment>
      {/* 💰 Cart Total - Price breakdown */}
      <div id="cart" className="bg-th-orange rounded-[35px] mt-5">
        <div className="flex items-center gap-x-5 pl-20p large:pl-40p pt-4">
          <div className="w-50p h-50p rounded-full bg-white flex justify-center items-center">
            <a
              href=""
              style={{
                "--mask-img": `url('${window.location.origin}/wp-content/themes/bartender/assets/img/form/coins.svg')`,
              }}
              className="w-25p h-25p bg-th-orange cs-mask"
            />
          </div>
        </div>

        <div className="ml-20p large:ml-100p pb-20p text-white">
          {/* Step items */}
          {render_step_items()}

          {/* Services total (base without percentages) */}
          <div className="flex justify-between items-center py-3 border-b border-dashed border-white">
            <span className="af-p25-reg">
              {summary_options.label_price || __("Tjenester", "wpcbooking")}
            </span>
            <span className="aff-total-contents af-p25-bold mr-50p">
              {total_base ?? 0}
              <span className="currnency_symbol"> {currency}</span>
            </span>
          </div>

          {/* Percentage adjustment (if any) */}
          {total_percentage !== 0 && (
            <div className="flex justify-between items-center py-3 border-b border-dashed border-white">
              <span className="af-p25-reg">
                {total_percentage > 0
                  ? __("Tilføjelse", "wpcbooking")
                  : __("Rabat", "wpcbooking")}
              </span>
              <span className="af-p25-bold mr-50p">
                {total_percentage > 0 ? "+" : ""}
                {total_percentage.toLocaleString()}
                <span className="currnency_symbol"> {currency}</span>
              </span>
            </div>
          )}

          {/* Shipping */}
          {shipping_total > 0 && (
            <Fragment>
              <div className="flex justify-between items-center py-3 border-b border-dashed border-white">
                <span className="af-p25-reg">
                  {__("Levering", "wpcbooking")}
                </span>
                <span className="af-p25-bold mr-50p">
                  {shipping_total}
                  <span className="currnency_symbol"> {currency}</span>
                </span>
              </div>
            </Fragment>
          )}

          {/* Grand total (base + percentages + shipping) */}
          <div className="flex justify-between items-center py-3">
            <span className="af-p30">
              {summary_options.label_total || __("Total", "wpcbooking")}
            </span>
            <span className="aff-total-price af-p30 mr-50p">
              {cartTotal ?? 0}
              <span className="currnency_symbol"> {currency}</span>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CartTotal;
