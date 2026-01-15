export const initializeMultiGroupToggle = () => {
  const initMultiGroupToggle = () => {
    // Find all multi-group items
    const multiGroupItems = document.querySelectorAll('.wpifycf-field-multi-group__item');
    
    multiGroupItems.forEach((item) => {
      const header = item.querySelector('.wpifycf-field-multi-group__item-header');
      const content = item.querySelector('.wpifycf-field-multi-group__content');
      
      if (!header || !content) return;
      
      // Add click handler to header
      header.addEventListener('click', (e) => {
        // Don't trigger if clicking on buttons or interactive elements
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('select')) {
          return;
        }
        
        // Toggle the item
        toggleMultiGroupItem(item);
      });
      
      // Add visual indicator for clickable header
      header.style.cursor = 'pointer';
      header.style.userSelect = 'none';
      
      // Initialize state - check if item should be open by default
      const isOpen = !item.classList.contains('wpifycf-field-multi-group__item--closed');
      updateItemState(item, isOpen);
    });
  };

  const toggleMultiGroupItem = (item) => {
    const isCurrentlyOpen = !item.classList.contains('wpifycf-field-multi-group__item--closed');
    updateItemState(item, !isCurrentlyOpen);
  };

  const updateItemState = (item, isOpen) => {
    const content = item.querySelector('.wpifycf-field-multi-group__content');
    const header = item.querySelector('.wpifycf-field-multi-group__item-header');
    
    if (!content || !header) return;
    
    if (isOpen) {
      item.classList.remove('wpifycf-field-multi-group__item--closed');
      content.style.display = 'block';
      header.setAttribute('aria-expanded', 'true');
      
      // Add open indicator
      if (!header.querySelector('.wpifycf-field-multi-group__toggle-icon')) {
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'wpifycf-field-multi-group__toggle-icon';
        toggleIcon.innerHTML = '▼';
        toggleIcon.style.marginLeft = '8px';
        toggleIcon.style.transition = 'transform 0.2s ease';
        header.appendChild(toggleIcon);
      }
    } else {
      item.classList.add('wpifycf-field-multi-group__item--closed');
      content.style.display = 'none';
      header.setAttribute('aria-expanded', 'false');
      
      // Update toggle icon
      const toggleIcon = header.querySelector('.wpifycf-field-multi-group__toggle-icon');
      if (toggleIcon) {
        toggleIcon.innerHTML = '▶';
      }
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMultiGroupToggle);
  } else {
    initMultiGroupToggle();
  }

  // Re-initialize when new content is added (for dynamic content)
  const observer = new MutationObserver((mutations) => {
    let shouldReinit = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.classList && node.classList.contains('wpifycf-field-multi-group__item')) {
              shouldReinit = true;
            } else if (node.querySelector && node.querySelector('.wpifycf-field-multi-group__item')) {
              shouldReinit = true;
            }
          }
        });
      }
    });
    
    if (shouldReinit) {
      initMultiGroupToggle();
    }
  });

  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
};
