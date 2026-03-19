export function createInventorySystem(runtime) {
  function listItemDefs() {
    return runtime.state.inventory.items.map((itemId) => runtime.content.getItem(itemId));
  }

  function hasItem(itemId) {
    return runtime.state.inventory.items.includes(itemId);
  }

  function getSelectedItemId() {
    return runtime.state.inventory.selectedItemId;
  }

  function toggleOpen() {
    runtime.state.inventory.isOpen = !runtime.state.inventory.isOpen;
    runtime.render();
  }

  function selectItem(itemId) {
    if (!hasItem(itemId)) return;

    runtime.state.inventory.selectedItemId =
      runtime.state.inventory.selectedItemId === itemId ? null : itemId;

    runtime.emit("inventory_item_selected", {
      itemId: runtime.state.inventory.selectedItemId
    });

    runtime.render();
  }

  function clearSelection() {
    runtime.state.inventory.selectedItemId = null;
    runtime.render();
  }

  function grantItem(itemId) {
    if (!runtime.state.inventory.items.includes(itemId)) {
      runtime.state.inventory.items.push(itemId);
      runtime.render();
    }
  }

  function removeItem(itemId) {
    const index = runtime.state.inventory.items.indexOf(itemId);
    if (index < 0) return false;

    runtime.state.inventory.items.splice(index, 1);

    if (runtime.state.inventory.selectedItemId === itemId) {
      runtime.state.inventory.selectedItemId = null;
    }

    runtime.render();
    return true;
  }

  return {
    listItemDefs,
    hasItem,
    getSelectedItemId,
    toggleOpen,
    selectItem,
    clearSelection,
    grantItem,
    removeItem
  };
}