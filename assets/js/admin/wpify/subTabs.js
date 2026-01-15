function initializeSubTabs() {
    // Initialize existing tabs
    setupSubTabs();

    // Setup mutation observer for dynamically added content
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is a sub-tabs-container
                        if (node.classList && node.classList.contains('sub-tabs-container')) {
                            setupSubTabsForContainer(node);
                        }
                        // Check if the added node contains sub-tabs-container
                        const tabContainers = node.querySelectorAll ? node.querySelectorAll('.sub-tabs-container') : [];
                        if (tabContainers.length > 0) {
                            tabContainers.forEach(container => {
                                setupSubTabsForContainer(container);
                            });
                        }
                    }
                });
            }
        });
    });

    // Start observing the entire document
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function setupSubTabs() {
    const tabContainers = document.querySelectorAll('.sub-tabs-container');

    tabContainers.forEach((container, index) => {
        setupSubTabsForContainer(container);
    });
}

function setupSubTabsForContainer(container) {
    // Check if already initialized
    if (container.dataset.subTabsInitialized === 'true') {
        return;
    }

    const tabButtons = container.querySelectorAll('.sub-tab-button');

    // Process sub-tab-content labels and add data-tab attributes
    processSubTabContentLabels();

    // Set first tab as active by default
    if (tabButtons.length > 0) {
        const firstButton = tabButtons[0];
        const firstTabId = firstButton.getAttribute('data-tab');

        // Activate first button
        firstButton.classList.add('active');

        // Find and activate corresponding content
        const firstContent = document.querySelector(`.wpifycf-field__wrapper[data-tab="${firstTabId}"]`);
        if (firstContent) {
            firstContent.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach((button, index) => {
        // Remove existing listeners to prevent duplicates
        button.removeEventListener('click', handleTabClick);
        button.addEventListener('click', handleTabClick);
    });

    // Mark as initialized
    container.dataset.subTabsInitialized = 'true';
}

function processSubTabContentLabels() {
    // Find all labels with sub-tab-content-* classes
    const labels = document.querySelectorAll('label[class*="sub-tab-content-"]');

    labels.forEach((label, index) => {
        // Extract the tab name from the class
        const classList = label.className.split(' ');
        const subTabClass = classList.find(cls => cls.startsWith('sub-tab-content-'));

        if (subTabClass) {
            const tabName = subTabClass.replace('sub-tab-content-', '');
            const tabId = `sub-tab-${tabName}`;

            // Find the parent .wpifycf-field__wrapper
            const parentWrapper = label.closest('.wpifycf-field__wrapper');

            if (parentWrapper) {
                // Add data-tab attribute to the wrapper
                parentWrapper.setAttribute('data-tab', tabId);
            }
        }
    });
}

function handleTabClick() {
    const targetTabId = this.getAttribute('data-tab');
    const container = this.closest('.sub-tabs-container');

    if (!container) {
        return;
    }

    const tabButtons = container.querySelectorAll('.sub-tab-button');

    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Remove active class from all wpifycf-field__wrapper elements with data-tab
    const allContent = document.querySelectorAll('.wpifycf-field__wrapper[data-tab]');
    allContent.forEach(content => content.classList.remove('active'));

    // Add active class to clicked button
    this.classList.add('active');

    // Find and activate corresponding content
    const targetContent = document.querySelector(`.wpifycf-field__wrapper[data-tab="${targetTabId}"]`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Function to programmatically switch tabs (can be called from other scripts)
function switchSubTab(containerSelector, tabId) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const targetButton = container.querySelector(`[data-tab="${tabId}"]`);
    const targetPanel = document.getElementById(tabId);

    if (targetButton && targetPanel) {
        const tabButtons = container.querySelectorAll('.sub-tab-button');
        const tabPanels = container.querySelectorAll('.sub-tab-panel');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to target button and panel
        targetButton.classList.add('active');
        targetPanel.classList.add('active');
    }
}

// Export functions for use in other modules
export {
    initializeSubTabs,
    switchSubTab
};
