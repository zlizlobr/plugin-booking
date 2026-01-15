import { initializeSubTabs } from "./wpify/subTabs.js";
import { FieldIdManager } from "./wpify/FieldIdManager.js";
import { initializeMultiGroupToggle } from "./multiGroupToggle.js";
import { initializeComponentLoader } from "./wpify/componentLoader.js";
import { initializeDynamicFieldsLoader } from "./fieldManagerInstance.js";
import { initializeAdminSummary } from "./summary/initAdminSummary.js";

const initAllScripts = async () => {
  const initFunctions = [
    { name: "componentLoader", fn: initializeComponentLoader, async: true },
    { name: "subTabs", fn: initializeSubTabs },
     { name: "fieldIdManager", fn: FieldIdManager },
    { name: "multiGroupToggle", fn: initializeMultiGroupToggle },
    { name: "fieldManagerInstance", fn: initializeDynamicFieldsLoader },
    { name: "adminSummary", fn: initializeAdminSummary },

  ];

  for (const item of initFunctions) {
    try {
      if (item.async) {
        await item.fn();
      } else {
        item.fn();
      }
    } catch (error) {

    }
  }
};

if (document.readyState === "complete") {
  initAllScripts();
} else {
  document.addEventListener("DOMContentLoaded", initAllScripts);
}
