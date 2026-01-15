/**
 * Univerzální Gutenberg nástroj - flexibilní řešení pro sledování a reakci na změny v editoru
 *
 * @param {Object} config - Konfigurační objekt
 * @param {Function} config.onInit - Funkce spuštěna při inicializaci
 * @param {Function} config.onNewBlocks - Funkce spuštěna při detekci nových bloků
 * @param {Function} config.onDomChange - Funkce spuštěna při změnách v DOM
 * @returns {Object} - Objekt s metodami pro ovládání nástroje
 */
export const useGutenbergWatchdog = (config = {}) => {
  
  // Výchozí konfigurace
  const settings = {
    onInit: () => {},
    onNewBlocks: () => {},
    onDomChange: () => {},
    ...config,
  };
  // Proměnné pro sledování stavu
  let observer = null;
  let unsubscribe = null;
  let previousBlockCount = 0;
  let isInitialized = false;

  /**
   * Ověří, zda jsme v Gutenberg editoru a upravujeme konkrétní post type
   */
  const isGutenbergEditor = () => {
    const isEditorLoaded =
      typeof wp !== "undefined" &&
      wp.blocks &&
      wp.blockEditor &&
      document.querySelector(".block-editor");
    return isEditorLoaded ? true :false;
  };

  /**
   * Inicializuje nástroj
   */
  const init = () => {
    if (!isGutenbergEditor() || isInitialized) {
       return false;
    }
    isInitialized = true;
    settings.onInit();
    watchForChanges();
    return true;
  };

  /**
   * Spustí sledování změn v editoru
   */
  const watchForChanges = () => {
    // 1. MutationObserver pro DOM změny
    setupMutationObserver();

    // 2. WordPress API pro sledování změn bloků
    setupWordPressSubscriber();
  };

  /**
   * Nastaví MutationObserver pro sledování DOM změn
   */
  const setupMutationObserver = () => {
    observer = new MutationObserver((mutations) => {
      let hasRelevantChanges = false;

      for (const mutation of mutations) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          hasRelevantChanges = true;
          break;
        }
        // Also track attribute changes, especially data-attributes
        if (mutation.type === "attributes" && mutation.attributeName === "data-attributes") {
          hasRelevantChanges = true;
          break;
        }
      }

      if (hasRelevantChanges) {
        settings.onDomChange(mutations);
      }
    });

    const editorContent =
      document.querySelector(
        ".editor-styles-wrapper, .block-editor, .edit-post-layout"
      ) || document.body;
    observer.observe(editorContent, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ["data-attributes"] 
    });
  };

  /**
   * Nastaví WordPress subscriber pro sledování změn bloků
   */
  const setupWordPressSubscriber = () => {
    if (typeof wp === "undefined" || !wp.data || !wp.data.subscribe) return;

    unsubscribe = wp.data.subscribe(() => {
      try {
        const select =
          wp.data.select("core/block-editor") || wp.data.select("core/editor");
        if (!select) return;

        const blocks = select.getBlocks();
        if (blocks.length !== previousBlockCount) {
          previousBlockCount = blocks.length;
          setTimeout(() => settings.onNewBlocks(blocks), 50);
        }
      } catch (error) {
        console.error("Chyba při sledování bloků:", error);
      }
    });

    // Inicializace při načtení WP
    if (wp.domReady) {
      wp.domReady(() => settings.onInit());
    }
  };

  /**
   * Ukončí činnost nástroje
   */
  const destroy = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }

    isInitialized = false;
  };

  // Automatická inicializace
  init();

  // Veřejné API
  return {
    init,
    destroy,
    isInitialized: () => isInitialized,
  };
};
