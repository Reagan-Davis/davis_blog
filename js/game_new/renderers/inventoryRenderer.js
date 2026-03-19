function createGhost(iconText) {
  const ghost = document.createElement("div");
  ghost.className = "startup-drag-ghost";
  ghost.innerHTML = `<span class="startup-key-icon">${iconText}</span>`;
  document.body.appendChild(ghost);
  return ghost;
}

function moveGhost(ghost, x, y) {
  if (!ghost) return;
  ghost.style.left = `${x}px`;
  ghost.style.top = `${y}px`;
}

export function createInventoryRenderer(runtime) {
  let dragGhost = null;

  function closePanel() {
    const panel = runtime.mounts.inventoryPanel;
    panel.hidden = true;
    panel.classList.remove("is-open");
    document.querySelector(`[data-dp-panel-toggle="inventory-panel"]`)?.classList.remove("is-active");
  }

  function render() {
    const mount = runtime.mounts.inventoryPanel;
    mount.innerHTML = "";

    const head = document.createElement("div");
    head.className = "startup-inventory-popover__head";

    const title = document.createElement("h2");
    title.className = "startup-inventory-title";
    title.textContent = "Inventory";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "startup-inventory-close";
    close.setAttribute("aria-label", "Close inventory");
    close.textContent = "×";
    close.addEventListener("click", closePanel);

    head.appendChild(title);
    head.appendChild(close);

    const grid = document.createElement("div");
    grid.className = "startup-inventory-grid";

    const items = runtime.state.inventory.items.map((itemId) => runtime.content.getItem(itemId));
    const slotCount = Math.max(6, items.length + 5);

    for (let index = 0; index < slotCount; index += 1) {
      const slot = document.createElement("div");
      slot.className = "startup-inventory-slot";

      const base = document.createElement("div");
      base.className = "startup-slot-base";
      slot.appendChild(base);

      const item = items[index];
      if (item) {
        const itemButton = document.createElement("button");
        itemButton.type = "button";
        itemButton.className = "startup-item";
        itemButton.draggable = true;
        itemButton.setAttribute("aria-label", item.name || item.id);
        itemButton.title = item.description || item.name || item.id;

        if (runtime.state.inventory.selectedItemId === item.id) {
          itemButton.classList.add("is-selected");
        }

        itemButton.innerHTML = `<span class="startup-key-icon">${item.icon || "•"}</span>`;

        itemButton.addEventListener("click", () => {
          runtime.systems.inventory.selectItem(item.id);
        });

        itemButton.addEventListener("dragstart", (event) => {
          runtime.systems.inventory.selectItem(item.id);
          itemButton.classList.add("dragging");

          dragGhost = createGhost(item.icon || "•");
          if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", item.id);
          }

          moveGhost(dragGhost, event.clientX || 0, event.clientY || 0);
        });

        itemButton.addEventListener("dragend", () => {
          itemButton.classList.remove("dragging");
          if (dragGhost) {
            dragGhost.remove();
            dragGhost = null;
          }
        });

        itemButton.addEventListener("pointerdown", () => {
          runtime.state.ui.temporaryMessage = item.inspectText || item.description || item.name || "";
          runtime.state.ui.temporaryMessageVisible = true;
          runtime.render();
        });

        slot.appendChild(itemButton);
      }

      grid.appendChild(slot);
    }

    const note = document.createElement("div");
    note.className = "startup-inventory-note";
    if (runtime.state.inventory.selectedItemId) {
      const selected = runtime.content.getItem(runtime.state.inventory.selectedItemId);
      note.textContent = selected?.description || selected?.name || "";
    } else {
      note.textContent = "Click or drag an item to use it.";
    }

    mount.appendChild(head);
    mount.appendChild(grid);
    mount.appendChild(note);

    document.onmousemove = (event) => {
      if (dragGhost) {
        moveGhost(dragGhost, event.clientX, event.clientY);
      }
    };
  }

  return { render };
}