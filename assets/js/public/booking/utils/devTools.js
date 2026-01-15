import { loadDraft } from "./storage.js";

// ═══════════════════════════════════════════════════════════
// 🔧 DEV TOOLS - Development and debugging tools
// ═══════════════════════════════════════════════════════════
//
// 🗑️ DEV_RESET_FORM_DATA: Clears all saved data on load
//    Usage: Set to `true` to reset localStorage data
//    Useful for: Testing clean form from scratch
//
// 📊 DEV_LOG_STORAGE_DATA: Logs saved data to console
//    Usage: Set to `true` to display storage data
//    Shows: Booking ID, step, form data, summary data, statistics
//    Logging occurs: on load, step change, and data change
//    Useful for: Monitoring form state in real-time
//
// ═══════════════════════════════════════════════════════════

export const DEV_RESET_FORM_DATA = false;
export const DEV_LOG_STORAGE_DATA = false;

/**
 * Playful function for logging storage data to console
 * @param {string} bookingID - Booking ID
 */
export const logStorageData = (bookingID) => {
  const draft = loadDraft(bookingID);

  if (!draft) {
    console.log(
      "%c📦 STORAGE DEBUG ",
      "background: #ff6b6b; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
    );
    console.log("%c❌ No data found", "color: #ff6b6b; font-size: 12px;");
    return;
  }

  const now = Date.now();
  const savedAgo = now - draft.savedAt;
  const minutes = Math.floor(savedAgo / 60000);
  const seconds = Math.floor((savedAgo % 60000) / 1000);
  const timeAgo =
    minutes > 0 ? `${minutes}m ${seconds}s ago` : `${seconds}s ago`;

  const formDataKeys = Object.keys(draft.formData || {});
  const formDataSize = JSON.stringify(draft.formData).length;
  const hasSummaryData = !!draft.summaryData;

  console.log(
    "%c📦 STORAGE DEBUG ",
    "background: #4ecdc4; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );
  console.log(
    "%c┌─────────────────────────────────────────┐",
    "color: #95a5a6;"
  );

  // Základní info
  console.log(
    "%c│ 🆔 Booking ID: %c" + draft.bookingId,
    "color: #95a5a6;",
    "color: #3498db; font-weight: bold;"
  );

  console.log(
    "%c│ 📊 Version: %cv" + draft.version,
    "color: #95a5a6;",
    "color: #9b59b6;"
  );

  console.log(
    "%c│ 🔢 Current step: %c" + draft.step,
    "color: #95a5a6;",
    "color: #e74c3c; font-weight: bold; font-size: 14px;"
  );

  console.log(
    "%c│ ⏰ Saved: %c" + timeAgo,
    "color: #95a5a6;",
    "color: #f39c12;"
  );

  console.log(
    "%c│ 📅 Time: %c" + new Date(draft.savedAt).toLocaleString("en-US"),
    "color: #95a5a6;",
    "color: #7f8c8d;"
  );

  console.log(
    "%c├─────────────────────────────────────────┤",
    "color: #95a5a6;"
  );

  // Form Data Stats
  console.log(
    "%c│ 📝 Form Data: %c" +
      formDataKeys.length +
      " fields %c(" +
      (formDataSize / 1024).toFixed(2) +
      " KB)",
    "color: #95a5a6;",
    "color: #2ecc71; font-weight: bold;",
    "color: #7f8c8d; font-size: 11px;"
  );

  if (formDataKeys.length > 0) {
    console.log("%c│   Fields:", "color: #95a5a6;");
    formDataKeys.forEach((key, index) => {
      const value = draft.formData[key];
      const valueStr =
        typeof value === "object"
          ? `{${Object.keys(value).length} items}`
          : String(value).substring(0, 30) +
            (String(value).length > 30 ? "..." : "");

      const icon = index === formDataKeys.length - 1 ? "└─" : "├─";
      console.log(
        "%c│   " + icon + " %c" + key + ": %c" + valueStr,
        "color: #95a5a6;",
        "color: #3498db;",
        "color: #2c3e50;"
      );
    });
  }

  console.log(
    "%c├─────────────────────────────────────────┤",
    "color: #95a5a6;"
  );

  // Summary Data
  if (hasSummaryData) {
    const summarySize = JSON.stringify(draft.summaryData).length;
    console.log(
      "%c│ ✅ Summary Data: %cLoaded %c(" +
        (summarySize / 1024).toFixed(2) +
        " KB)",
      "color: #95a5a6;",
      "color: #2ecc71; font-weight: bold;",
      "color: #7f8c8d; font-size: 11px;"
    );
  } else {
    console.log(
      "%c│ ❌ Summary Data: %cNot available",
      "color: #95a5a6;",
      "color: #e67e22;"
    );
  }

  console.log(
    "%c└─────────────────────────────────────────┘",
    "color: #95a5a6;"
  );

  // Detailed data
  console.log(
    "%c🔍 Detailed data:",
    "color: #3498db; font-weight: bold; font-size: 13px; margin-top: 8px;"
  );
  console.log("%c├─ Form Data:", "color: #2ecc71; font-weight: bold;");
  console.table(draft.formData);

  if (hasSummaryData) {
    console.log("%c├─ Summary Data:", "color: #9b59b6; font-weight: bold;");
    console.log(draft.summaryData);
  }

  console.log(
    "%c└─ Complete Draft Object:",
    "color: #e74c3c; font-weight: bold;"
  );
  console.log(draft);

  console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #95a5a6;");
};
