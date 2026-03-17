export function createDragSystem({
  state,
  dom,
  inventorySystem,
  viewportSystem,
  interactionSystem,
  sceneRenderer,
  tutorialSystem
}) {
  const dragState = {
    active: false,
    pending: false,
    itemId: null,
    pointerId: null,
    ghostEl: null,
    hoveredObjectId: null,
    startX: 0,
    startY: 0
  };

  const DRAG_THRESHOLD = 8;

  function removeGhost() {
    if (dragState.ghostEl) {
      dragState.ghostEl.remove();
      dragState.ghostEl = null;
    }
  }

  function clearHoveredTarget() {
    if (dragState.hoveredObjectId) {
      viewportSystem.setObjectClass(dragState.hoveredObjectId, "is-valid-target", false);
      viewportSystem.setObjectClass(dragState.hoveredObjectId, "is-invalid-target", false);
      dragState.hoveredObjectId = null;
    }
  }

  function setGhostPosition(x, y) {
    if (!dragState.ghostEl) return;
    dragState.ghostEl.style.left = `${x}px`;
    dragState.ghostEl.style.top = `${y}px`;
  }

  function createGhost(itemId) {
    const ghost = document.createElement("div");
    ghost.className = "startup-drag-ghost";
    ghost.setAttribute("aria-hidden", "true");

    if (itemId === "rusted_key") {
      ghost.innerHTML = `<span class="startup-key-icon" aria-hidden="true">🗝</span>`;
    } else {
      ghost.textContent = itemId;
    }

    document.body.appendChild(ghost);
    return ghost;
  }

  function beginActualDrag(event) {
    dragState.active = true;
    dragState.pending = false;
    dragState.ghostEl = createGhost(dragState.itemId);

    inventorySystem.setSelectedItem(dragState.itemId);
    dom.keyItem?.classList.add("is-selected");
    tutorialSystem?.hideKeyHelp();
    tutorialSystem?.showViewportHelp();

    setGhostPosition(event.clientX, event.clientY);
    dom.keyItem?.setPointerCapture?.(event.pointerId);
  }

  function onPointerDown(event, itemId) {
    if (!inventorySystem.isOwned(itemId)) return;
    if (event.button !== 0) return;

    dragState.pending = true;
    dragState.active = false;
    dragState.itemId = itemId;
    dragState.pointerId = event.pointerId;
    dragState.startX = event.clientX;
    dragState.startY = event.clientY;
  }

  function updateDrag(event) {
    if (event.pointerId !== dragState.pointerId) return;

    if (dragState.pending && !dragState.active) {
      const dx = event.clientX - dragState.startX;
      const dy = event.clientY - dragState.startY;
      const dist = Math.hypot(dx, dy);

      if (dist >= DRAG_THRESHOLD) {
        event.preventDefault();
        beginActualDrag(event);
      }
    }

    if (!dragState.active) return;

    setGhostPosition(event.clientX, event.clientY);

    const obj = viewportSystem.getObjectFromPoint(event.clientX, event.clientY);

    clearHoveredTarget();

    if (!obj) return;

    const accepts = Array.isArray(obj.acceptsItems) && obj.acceptsItems.includes(dragState.itemId);
    dragState.hoveredObjectId = obj.id;
    viewportSystem.setObjectClass(obj.id, accepts ? "is-valid-target" : "is-invalid-target", true);
  }

  function endDrag(event) {
    if (event.pointerId !== dragState.pointerId) return;

    if (dragState.active) {
      const obj = viewportSystem.getObjectFromPoint(event.clientX, event.clientY);

      if (obj) {
        interactionSystem.useItemOnObject(dragState.itemId, obj.id);
        sceneRenderer.renderCurrentScene({ full: false });
      }
    }

    clearHoveredTarget();
    removeGhost();

    dragState.active = false;
    dragState.pending = false;
    dragState.itemId = null;
    dragState.pointerId = null;

    if (state.inventory.selectedItemId !== "rusted_key") {
      dom.keyItem?.classList.remove("is-selected");
    }
  }

  function bindKeyDrag() {
    if (!dom.keyItem || dom.keyItem.dataset.dragBound === "true") return;
    dom.keyItem.dataset.dragBound = "true";

    dom.keyItem.style.touchAction = "none";

    dom.keyItem.addEventListener("pointerdown", (event) => {
      onPointerDown(event, "rusted_key");
    });

    window.addEventListener("pointermove", updateDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  }

  return {
    bindKeyDrag
  };
}