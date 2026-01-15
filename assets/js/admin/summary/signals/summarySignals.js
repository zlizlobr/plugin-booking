import { signal, computed } from "@preact/signals";
import { getFormatConfig } from "../utils/priceFormatting.js";
import { getSummarySettings } from "../utils/configHelpers.js";

const format_config = getFormatConfig();
const summary_settings = getSummarySettings();

// ============================================================================
// SIGNALS - Block Prices (ceny jednotlivých bloků)
// ============================================================================

export const block_prices = signal({});
// Struktura: { stepId: { fieldId: blockTotal } }
// Příklad: { 1: { "field_123": 100, "field_456": 50 }, 2: { "field_789": 300 } }

// ============================================================================
// SIGNALS - Base Prices (čisté ceny z bloků) - LEGACY, použít block_prices
// ============================================================================

export const item_base_prices = signal({});
// Struktura: { stepId: basePrice }
// Příklad: { 1: 500, 2: 300 }

// ============================================================================
// SIGNALS - Percentage Configs (procentuální nastavení)
// ============================================================================

export const item_percentage_configs = signal({});
// Struktura: { stepId: { value: number, operation: 'add' | 'subtract' } }
// Příklad: { 3: { value: 10, operation: 'add' }, 4: { value: 5, operation: 'subtract' } }

// ============================================================================
// SIGNALS - Block Percentage Configs (procentuální nastavení per block)
// ============================================================================

export const block_percentage_configs = signal({});
// Struktura: { stepId: { fieldId: { value: number, operation: 'add' | 'subtract' } } }
// Příklad: { 1: { "field_123": { value: 10, operation: 'add' }, "field_456": { value: 5, operation: 'subtract' } } }

// ============================================================================
// SIGNALS - Config & UI
// ============================================================================

export const edit_mode = signal(summary_settings?.editSummary ?? true);
export const currency_symbol = signal(format_config?.currencySymbol || "kr.");

// Init values z PHP (pro fallback)
export const init_total_base = signal(
  window.wpcbookingAdminData?.totalPrice || 0
);
export const init_total_percentage = signal(
  window.wpcbookingAdminData?.percentagePrice || 0
);

// Loading states
export const is_initializing = signal(true);
export const is_recalculating = signal(false);

// Block loading tracking
export const blocks_loading = signal({});
// Struktura: { "stepId_fieldId": true }
// Příklad: { "1_field_123": true, "2_field_456": true }

// ============================================================================
// SIGNALS - Field Values (raw values from inputs)
// ============================================================================

export const field_values = signal(
  window.wpcbookingAdminData?.values || {}
);

// ============================================================================
// COMPUTED - Step Totals from Blocks (base prices)
// ============================================================================

// Agregace block prices na step level (automaticky reaktivní)
export const step_totals_from_blocks = computed(() => {
  const result = {};
  Object.entries(block_prices.value).forEach(([stepId, blocks]) => {
    result[stepId] = Object.values(blocks).reduce(
      (sum, price) => sum + (price || 0),
      0
    );
  });

  return result;
});

// ============================================================================
// COMPUTED - Totals (base price musí být před percentage)
// ============================================================================

// Suma všech step totals - kombinace block_prices + legacy item_base_prices
// MUSÍ být před step_percentage_totals_from_blocks
export const total_base_price = computed(() => {
  // Nový systém - block prices agregované per step
  const block_totals = step_totals_from_blocks.value;
  const block_sum = Object.values(block_totals).reduce(
    (acc, price) => acc + (price || 0),
    0
  );

  // Legacy systém - item_base_prices (z PHP init nebo starých bloků)
  const legacy_prices = item_base_prices.value;
  const legacy_sum = Object.values(legacy_prices).reduce(
    (acc, price) => acc + (price || 0),
    0
  );

  // OPRAVA: Pro každý step použít block_price pokud existuje, jinak legacy_price
  // Sečíst všechny steps správně
  const all_step_ids = new Set([
    ...Object.keys(block_totals),
    ...Object.keys(legacy_prices),
  ]);

  let total = 0;
  const step_breakdown = {};

  all_step_ids.forEach((stepId) => {
    const block_price = block_totals[stepId];
    const legacy_price = legacy_prices[stepId];

    // Priorita: block_price pokud existuje (i když je 0), jinak legacy_price
    const step_price =
      block_price !== undefined ? block_price || 0 : legacy_price || 0;
    total += step_price;

    step_breakdown[stepId] = {
      block_price: block_price,
      legacy_price: legacy_price,
      used_price: step_price,
    };
  });

  return total;
});

// ============================================================================
// COMPUTED - Step Percentage Totals from Blocks
// ============================================================================

// Agregace block percentage amounts na step level (automaticky reaktivní)
// Procenta se počítají z CELKOVÉ base price (všech stepů bez procent)!
export const step_percentage_totals_from_blocks = computed(() => {
  const configs = block_percentage_configs.value;
  const total_base = total_base_price.value;
  const result = {};

  Object.entries(configs).forEach(([stepId, blocks]) => {
    let step_total = 0;
    Object.values(blocks).forEach((config) => {
      if (!config) return;

      let signed_amount = 0;

      // Pokud máme přímo amount
      if (config.amount !== undefined) {
        signed_amount =
          config.operation === "subtract" ? -config.amount : config.amount;
      }
      // Pokud máme procenta - počítá z CELKOVÉ base price
      else if (config.value && config.value !== 0) {
        const percentage_amount = total_base * (Math.abs(config.value) / 100);
        signed_amount =
          config.operation === "subtract"
            ? -percentage_amount
            : percentage_amount;
      }

      step_total += signed_amount;
    });
    
    result[stepId] = step_total;
  });

  return result;
});

// Suma všech percentage prices (počítá z CELKOVÉ base price)
export const total_percentage_price = computed(() => {
  // Suma z block-level percentages (už jsou správně vypočtené z total_base)
  const block_percentages = step_percentage_totals_from_blocks.value;
  const block_sum = Object.values(block_percentages).reduce(
    (acc, amount) => acc + (amount || 0),
    0
  );

  // Suma z legacy item-level percentages (pro zpětnou kompatibilitu)
  const total_base = total_base_price.value;
  const legacy_configs = item_percentage_configs.value;
  
  const legacy_sum = Object.entries(legacy_configs).reduce(
    (acc, [stepId, config]) => {
      if (!config) return acc;

      let signed_amount = 0;

      // Pokud máme přímo amount (z PHP init)
      if (config.amount !== undefined) {
        signed_amount =
          config.operation === "subtract" ? -config.amount : config.amount;
      }
      // Pokud máme procenta (z editace) - počítá z CELKOVÉ base price
      else if (config.value && config.value !== 0) {
        const percentage_amount = total_base * (Math.abs(config.value) / 100);
        signed_amount =
          config.operation === "subtract"
            ? -percentage_amount
            : percentage_amount;
      }

      return acc + signed_amount;
    },
    0
  );

  const total = block_sum + legacy_sum;

  return total;
});

// Finální cena = base + percentage
export const final_price = computed(() => {
  const base = total_base_price.value;
  const percentage = total_percentage_price.value;
  const final = base + percentage;

  // Fallback na init hodnoty pokud nic není vypočteno
  const result =
    final === 0 && init_total_base.value > 0 ? init_total_base.value : final;

  return result;
});

// ============================================================================
// COMPUTED - Step Helpers
// ============================================================================

// Získat base price pro konkrétní step
export const get_step_base_price = (step_id) => {
  const block_total = step_totals_from_blocks.value[step_id];
  const legacy_total = item_base_prices.value[step_id];
  return block_total ?? legacy_total ?? 0;
};

// Získat percentage amount pro konkrétní step
export const get_step_percentage_amount = (step_id) => {
  // Block-level percentage (nový systém)
  const block_amount = step_percentage_totals_from_blocks.value[step_id] || 0;

  // Legacy item-level percentage (pro zpětnou kompatibilitu)
  let legacy_amount = 0;
  const config = item_percentage_configs.value[step_id];
  
  if (config) {
    // VAROVÁNÍ: Pokud máme block percentage configs, legacy by se neměl používat
    const has_block_configs = block_percentage_configs.value[step_id] && 
                               Object.keys(block_percentage_configs.value[step_id]).length > 0;
    
    if (has_block_configs) {
      console.warn(`[PERCENTAGE] Step ${step_id} - ⚠️ MIXOVÁNÍ! Block configs existují, ale používá se i legacy config!`, {
        block_configs: block_percentage_configs.value[step_id],
        legacy_config: config
      });
    }
    
    // Pokud máme přímo amount (z PHP init)
    if (config.amount !== undefined) {
      legacy_amount =
        config.operation === "subtract" ? -config.amount : config.amount;
    }
    // Pokud máme procenta (z editace) - počítá z CELKOVÉ base price
    else if (config.value && config.value !== 0) {
      const total_base = total_base_price.value;
      
      const percentage_amount = total_base * (Math.abs(config.value) / 100);
      legacy_amount =
        config.operation === "subtract"
          ? -percentage_amount
          : percentage_amount;
    }
  }

  const result = block_amount + legacy_amount;

  return result;
};

// Získat celkovou cenu pro step (base + percentage)
export const get_step_total = (step_id) => {
  const base = item_base_prices.value[step_id] || 0;
  const percentage_amount = get_step_percentage_amount(step_id);
  return base + percentage_amount;
};

// ============================================================================
// ACTIONS - Base Prices
// ============================================================================

export const update_base_price = (step_id, price) => {
  item_base_prices.value = { ...item_base_prices.value, [step_id]: price };
};

export const init_base_price = (step_id, price) => {
  const current_value = item_base_prices.value[step_id];

  if (current_value === undefined && price > 0) {
    item_base_prices.value = { ...item_base_prices.value, [step_id]: price };
  }
};

export const init_base_prices_batch = (prices_obj) => {
  const current = item_base_prices.value;
  const new_prices = { ...current };
  let has_changes = false;

  Object.entries(prices_obj).forEach(([step_id, price]) => {
    if (current[step_id] === undefined && price > 0) {
      new_prices[step_id] = price;
      has_changes = true;
    }
  });

  if (has_changes) {
    item_base_prices.value = new_prices;
  }
};

// ============================================================================
// ACTIONS - Block Prices
// ============================================================================

export const update_block_price = (step_id, field_id, price) => {
  const current = block_prices.value;
  const step_blocks = current[step_id] || {};

  block_prices.value = {
    ...current,
    [step_id]: {
      ...step_blocks,
      [field_id]: price,
    },
  };
};

export const init_block_price = (step_id, field_id, price) => {
  const current = block_prices.value;
  const step_blocks = current[step_id] || {};

  if (step_blocks[field_id] === undefined && price > 0) {
    block_prices.value = {
      ...current,
      [step_id]: {
        ...step_blocks,
        [field_id]: price,
      },
    };
  }
};

export const remove_block_price = (step_id, field_id) => {
  const current = block_prices.value;
  const step_blocks = { ...(current[step_id] || {}) };

  delete step_blocks[field_id];

  block_prices.value = {
    ...current,
    [step_id]: step_blocks,
  };
};

// ============================================================================
// ACTIONS - Percentage Configs (legacy - step level)
// ============================================================================

export const update_percentage = (step_id, value, operation = "add") => {
  item_percentage_configs.value = {
    ...item_percentage_configs.value,
    [step_id]: { value: parseFloat(value) || 0, operation },
  };
};

export const init_percentage = (step_id, value, operation = "add") => {
  const current = item_percentage_configs.value[step_id];

  if (current === undefined && value > 0) {
    item_percentage_configs.value = {
      ...item_percentage_configs.value,
      [step_id]: { value: parseFloat(value) || 0, operation },
    };
  }
};

export const init_percentage_from_amount = (step_id, amount) => {
  const current = item_percentage_configs.value[step_id];

  if (current === undefined && amount !== 0) {
    const operation = amount >= 0 ? "add" : "subtract";
    const new_config = { amount: Math.abs(parseFloat(amount)) || 0, operation };
    
    item_percentage_configs.value = {
      ...item_percentage_configs.value,
      [step_id]: new_config,
    };
  }
};

// ============================================================================
// ACTIONS - Block Percentage Configs (per block)
// ============================================================================

export const update_block_percentage = (
  step_id,
  field_id,
  value,
  operation = "add"
) => {
  const current = block_percentage_configs.value;
  const step_blocks = current[step_id] || {};

  block_percentage_configs.value = {
    ...current,
    [step_id]: {
      ...step_blocks,
      [field_id]: { value: parseFloat(value) || 0, operation },
    },
  };
  
  // OPRAVA: Když začneme používat block systém, vyčistit legacy systém pro tento step
  const legacy_config = item_percentage_configs.value[step_id];
  if (legacy_config) {
    const new_legacy = { ...item_percentage_configs.value };
    delete new_legacy[step_id];
    item_percentage_configs.value = new_legacy;
  }
};

export const init_block_percentage = (
  step_id,
  field_id,
  value,
  operation = "add"
) => {
  const current = block_percentage_configs.value;
  const step_blocks = current[step_id] || {};

  if (step_blocks[field_id] === undefined && value > 0) {
    block_percentage_configs.value = {
      ...current,
      [step_id]: {
        ...step_blocks,
        [field_id]: { value: parseFloat(value) || 0, operation },
      },
    };
  }
};

export const remove_block_percentage = (step_id, field_id) => {
  const current = block_percentage_configs.value;
  const step_blocks = { ...(current[step_id] || {}) };

  delete step_blocks[field_id];

  block_percentage_configs.value = {
    ...current,
    [step_id]: step_blocks,
  };
};

// ============================================================================
// ACTIONS - Field Values
// ============================================================================

export const update_field_value = (field_id, value) => {
  field_values.value = {
    ...field_values.value,
    [field_id]: value,
  };
};

export const get_field_value = (field_id) => {
  return field_values.value[field_id];
};

export const remove_field_value = (field_id) => {
  const current = { ...field_values.value };
  delete current[field_id];
  field_values.value = current;
};

// ============================================================================
// ACTIONS - Remove & Reset
// ============================================================================

export const remove_step_prices = (step_id) => {
  const new_base = { ...item_base_prices.value };
  const new_percentage = { ...item_percentage_configs.value };

  delete new_base[step_id];
  delete new_percentage[step_id];

  item_base_prices.value = new_base;
  item_percentage_configs.value = new_percentage;
};

export const reset_all_prices = () => {
  item_base_prices.value = {};
  item_percentage_configs.value = {};
};

// ============================================================================
// ACTIONS - UI
// ============================================================================

export const set_edit_mode = (mode) => {
  edit_mode.value = mode;
};

export const toggle_edit_mode = () => {
  edit_mode.value = !edit_mode.value;
};

export const set_initializing = (value) => {
  is_initializing.value = value;
};

export const set_recalculating = (value) => {
  is_recalculating.value = value;
};

// ============================================================================
// ACTIONS - Block Loading Tracking
// ============================================================================

export const mark_block_loading = (step_id, field_id) => {
  const key = `${step_id}_${field_id}`;
  blocks_loading.value = { ...blocks_loading.value, [key]: true };
};

export const mark_block_loaded = (step_id, field_id) => {
  const key = `${step_id}_${field_id}`;
  const updated = { ...blocks_loading.value };
  delete updated[key];
  blocks_loading.value = updated;
};

export const reset_blocks_loading = () => {
  blocks_loading.value = {};
};

// ============================================================================
// COMPUTED - Block Loading State
// ============================================================================

export const all_blocks_loaded = computed(() => {
  return Object.keys(blocks_loading.value).length === 0;
});

export const blocks_loading_count = computed(() => {
  return Object.keys(blocks_loading.value).length;
});

// ============================================================================
// LEGACY ALIASES (pro zpětnou kompatibilitu během migrace)
// ============================================================================

// Tyto aliasy umožní postupnou migraci bez breaking changes
export const item_prices = item_base_prices;
export const total_price = total_base_price;
export const final_total_price = final_price;
export const update_item_price = update_base_price;
export const init_item_price = init_base_price;
export const init_item_prices_batch = init_base_prices_batch;
export const remove_item_price = remove_step_prices;
export const reset_prices = reset_all_prices;

// ============================================================================
// NAMED EXPORTS SUMMARY
// ============================================================================
// Signals: block_prices, block_percentage_configs, item_base_prices, item_percentage_configs
// Computed: step_totals_from_blocks, step_percentage_totals_from_blocks, total_base_price, total_percentage_price, final_price
// Actions: update_block_price, update_block_percentage, update_percentage, etc.
