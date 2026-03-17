export function createInventorySystem({ state, dom, viewportSystem }) {
    function isOwned(itemId) {
      const item = state.inventory.items[itemId];
      return !!item && item.owned && !item.consumed;
    }
  
    function setSelectedItem(itemId) {
      state.inventory.selectedItemId = itemId;
  
      viewportSystem.clearObjectHighlights();
  
      if (itemId) {
        const currentScene = viewportSystem.getCurrentScene();
        const validObjects = currentScene?.viewportObjects.filter(obj =>
          Array.isArray(obj.acceptsItems) && obj.acceptsItems.includes(itemId)
        ) || [];
  
        validObjects.forEach(obj => {
          viewportSystem.setObjectClass(obj.id, "is-highlighted", true);
        });
      }
    }
  
    function clearSelectedItem() {
      state.inventory.selectedItemId = null;
      viewportSystem.clearObjectHighlights();
    }
  
    function consumeItem(itemId) {
      const item = state.inventory.items[itemId];
      if (!item) return;
      item.consumed = true;
      if (itemId === "rusted_key") {
        dom.keyItem.classList.add("is-hidden");
        dom.keyItem.disabled = true;
        dom.keyItem.setAttribute("aria-hidden", "true");
        dom.keyItem.tabIndex = -1;
      }
    }
  
    return {
      isOwned,
      setSelectedItem,
      clearSelectedItem,
      consumeItem
    };
  }