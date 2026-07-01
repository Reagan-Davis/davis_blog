function createPanelCard() {
  const card = document.createElement("section");
  card.className = "dp-panel-card";

  const inner = document.createElement("div");
  inner.className = "dp-panel-inner dp-viewport-wrap";

  card.appendChild(inner);
  return { card, inner };
}

function createSvgShapeNode(templateObject) {
  let shapeNode = null;

  if (templateObject.shape === "circle") {
    shapeNode = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    shapeNode.setAttribute("cx", templateObject.cx);
    shapeNode.setAttribute("cy", templateObject.cy);
    shapeNode.setAttribute("r", templateObject.r);
  } else if (templateObject.shape === "rect") {
    shapeNode = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    shapeNode.setAttribute("x", templateObject.x);
    shapeNode.setAttribute("y", templateObject.y);
    shapeNode.setAttribute("width", templateObject.width);
    shapeNode.setAttribute("height", templateObject.height);
    if (templateObject.rx != null) shapeNode.setAttribute("rx", templateObject.rx);
    if (templateObject.ry != null) shapeNode.setAttribute("ry", templateObject.ry);
  } else if (templateObject.shape === "path") {
    shapeNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
    shapeNode.setAttribute("d", templateObject.d);
  } else if (templateObject.shape === "polygon") {
    shapeNode = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    shapeNode.setAttribute("points", templateObject.points);
  }

  return shapeNode;
}

function createAdvanceTriangleNode() {
  const triangle = document.createElementNS("http://www.w3.org/2000/svg", "path");
  triangle.setAttribute("class", "startup-svg-hit__triangle");
  triangle.setAttribute("d", "M500 290 L540 330 L460 330 Z");
  triangle.setAttribute("aria-hidden", "true");
  return triangle;
}

function setInteractiveState(group, enabled) {
  group.classList.toggle("is-disabled", !enabled);
  group.setAttribute("tabindex", enabled ? "0" : "-1");
  group.setAttribute("aria-disabled", enabled ? "false" : "true");
}

function clearTargetStates(stage) {
  if (!stage) return;

  stage.classList.remove("is-drag-over", "is-invalid-drop");

  stage.querySelectorAll(".startup-svg-hit").forEach((node) => {
    node.classList.remove("is-valid-target", "is-invalid-target", "is-highlighted");
  });
}

function isGateObject(entry) {
  return entry.sceneObject.id === "gate" || entry.sceneObject.id.startsWith("gate");
}

function getDraggedItemId(event, runtime) {
  return (
    event.dataTransfer?.getData("text/plain") ||
    runtime.state.inventory.selectedItemId ||
    null
  );
}

function acceptsDroppedItem(entry, itemId) {
  const accepts = Array.isArray(entry.sceneObject.acceptsItems)
    ? entry.sceneObject.acceptsItems
    : [];

  if (!accepts.length) return true;
  return Boolean(itemId && accepts.includes(itemId));
}

function updateDropClasses(group, stage, entry, valid) {
  group.classList.toggle("is-valid-target", valid);
  group.classList.toggle("is-invalid-target", !valid);

  if (isGateObject(entry)) {
    stage.classList.add("is-drag-over");
    stage.classList.toggle("is-invalid-drop", !valid);
  }
}

function clearDropClasses(group, stage, entry) {
  group.classList.remove("is-valid-target", "is-invalid-target");

  if (isGateObject(entry)) {
    stage.classList.remove("is-drag-over", "is-invalid-drop");
  }
}

function bindInteractiveGroup(group, stage, entry, runtime) {
  const activate = async () => {
    if (!entry.enabled) return;
    await runtime.systems.viewport.interactWithObject(entry.sceneObject.id);
  };

  group.addEventListener("click", async (event) => {
    event.preventDefault();
    await activate();
  });

  group.addEventListener("contextmenu", async (event) => {
    event.preventDefault();
    if (!entry.enabled) return;
    await runtime.systems.viewport.inspectObject(entry.sceneObject.id);
  });

  group.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      await activate();
    }
  });

  group.addEventListener("dragenter", (event) => {
    if (!entry.enabled) return;
    event.preventDefault();

    const itemId = getDraggedItemId(event, runtime);
    const valid = acceptsDroppedItem(entry, itemId);
    updateDropClasses(group, stage, entry, valid);
  });

  group.addEventListener("dragover", (event) => {
    if (!entry.enabled) return;
    event.preventDefault();

    const itemId = getDraggedItemId(event, runtime);
    const valid = acceptsDroppedItem(entry, itemId);

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = valid ? "move" : "none";
    }

    updateDropClasses(group, stage, entry, valid);
  });

  group.addEventListener("dragleave", (event) => {
    const related = event.relatedTarget;
    if (related && group.contains?.(related)) return;

    clearDropClasses(group, stage, entry);
  });

  group.addEventListener("drop", async (event) => {
    event.preventDefault();

    const itemId = getDraggedItemId(event, runtime);
    const valid = acceptsDroppedItem(entry, itemId);

    clearDropClasses(group, stage, entry);

    if (!entry.enabled || !valid) return;

    await runtime.systems.viewport.interactWithObject(entry.sceneObject.id, {
      itemId
    });
  });
}

export function createViewportRenderer(runtime) {
  function render() {
    const mount = runtime.mounts.viewportPanel;
    mount.innerHTML = "";

    const scene = runtime.systems.scene.getCurrentScene();
    if (!scene?.viewport?.enabled) return;

    const template = runtime.systems.viewport.getCurrentTemplate();
    const objects = runtime.systems.viewport.getRenderableObjectsForCurrentScene();

    const { card, inner } = createPanelCard();

    const stageShell = document.createElement("div");
    stageShell.className = "dp-viewport-stage-shell";

    const stage = document.createElement("div");
    stage.className = "startup-gate-wrap dp-viewport-stage";
    stage.style.maxWidth = `${template.width}px`;
    stage.style.aspectRatio = `${template.width} / ${template.height}`;
    stage.classList.toggle("is-gate-open", Boolean(runtime.state.world.flags.gate_unlocked));
    stage.classList.toggle(
      "is-drop-ready",
      Boolean(runtime.state.inventory.selectedItemId)
    );

    const background = document.createElement("div");
    background.className = "dp-viewport-bg";
    background.innerHTML = template.background?.markup || "";
    stage.appendChild(background);

    const overlaySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    overlaySvg.setAttribute("viewBox", `0 0 ${template.width} ${template.height}`);
    overlaySvg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    overlaySvg.setAttribute("class", "startup-viewport-overlay-svg");
    overlaySvg.setAttribute("aria-hidden", "false");

    const sortedObjects = [...objects]
      .filter((entry) => entry.visible)
      .sort((a, b) => (a.templateObject?.zIndex || 0) - (b.templateObject?.zIndex || 0));

    for (const entry of sortedObjects) {
      const shape = createSvgShapeNode(entry.templateObject);
      if (!shape) continue;

      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute("class", `startup-svg-hit startup-svg-hit--${entry.sceneObject.id}`);
      group.setAttribute("data-object-id", entry.sceneObject.id);
      group.setAttribute("role", "button");
      group.setAttribute("aria-label", entry.sceneObject.name || entry.sceneObject.id);

      if (entry.sceneObject.id === "advance") {
        group.classList.add("is-available", "startup-svg-hit--advance");
      }

      if (entry.sceneObject.id === "gate" || entry.sceneObject.id.startsWith("gate")) {
        group.classList.add("startup-svg-hit--gate");
      }

      setInteractiveState(group, entry.enabled);

      shape.setAttribute("class", "startup-svg-hit__shape");
      group.appendChild(shape);

      if (entry.sceneObject.id === "advance") {
        group.appendChild(createAdvanceTriangleNode());
      }

      bindInteractiveGroup(group, stage, entry, runtime);
      overlaySvg.appendChild(group);
    }

    stage.addEventListener("dragend", () => clearTargetStates(stage));
    stage.addEventListener("drop", () => clearTargetStates(stage));

    stage.appendChild(overlaySvg);
    stageShell.appendChild(stage);
    inner.appendChild(stageShell);
    mount.appendChild(card);
  }

  return { render };
}