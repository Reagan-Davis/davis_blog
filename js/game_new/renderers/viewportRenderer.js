function createPanelCard() {
  const card = document.createElement("section");
  card.className = "dp-panel-card";

  const inner = document.createElement("div");
  inner.className = "dp-panel-inner dp-viewport-wrap";

  card.appendChild(inner);
  return { card, inner };
}

function applyShapeStyles(node, templateObject, template) {
  const templateWidth = template?.width || 1;
  const templateHeight = template?.height || 1;

  if (templateObject.shape === "rect") {
    node.style.left = `${(templateObject.x / templateWidth) * 100}%`;
    node.style.top = `${(templateObject.y / templateHeight) * 100}%`;
    node.style.width = `${(templateObject.width / templateWidth) * 100}%`;
    node.style.height = `${(templateObject.height / templateHeight) * 100}%`;
  } else if (templateObject.shape === "circle") {
    const diameter = (templateObject.r || 0) * 2;
    node.style.left = `${(((templateObject.cx || 0) - diameter / 2) / templateWidth) * 100}%`;
    node.style.top = `${(((templateObject.cy || 0) - diameter / 2) / templateHeight) * 100}%`;
    node.style.width = `${(diameter / templateWidth) * 100}%`;
    node.style.height = `${(diameter / templateHeight) * 100}%`;
    node.style.borderRadius = "999px";
  }
}

function clearTargetStates(stage) {
  if (!stage) return;
  stage.querySelectorAll(".dp-hotspot").forEach((node) => {
    node.classList.remove("is-valid-target", "is-invalid-target", "is-highlighted");
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

    const background = document.createElement("div");
    background.className = "dp-viewport-bg";
    background.innerHTML = template.background?.markup || "";
    stage.appendChild(background);

    const overlay = document.createElement("div");
    overlay.className = "startup-viewport-objects";

    for (const entry of objects) {
      if (!entry.visible) continue;

      const hotspot = document.createElement("button");
      hotspot.type = "button";
      hotspot.className = "startup-viewport-object dp-hotspot";
      hotspot.dataset.objectId = entry.sceneObject.id;
      hotspot.title = entry.sceneObject.name || entry.sceneObject.id;
      hotspot.setAttribute("aria-label", entry.sceneObject.name || entry.sceneObject.id);
      applyShapeStyles(hotspot, entry.templateObject, template);

      if (!entry.enabled) {
        hotspot.disabled = true;
        hotspot.classList.add("is-disabled");
      }

      const outline = document.createElement("span");
      outline.className = "startup-viewport-object__outline dp-hotspot__outline";
      outline.setAttribute("aria-hidden", "true");
      hotspot.appendChild(outline);

      const label = document.createElement("span");
      label.className = "dp-hotspot-label";
      label.textContent = entry.sceneObject.name || entry.sceneObject.id;
      hotspot.appendChild(label);

      hotspot.addEventListener("click", async () => {
        await runtime.systems.viewport.interactWithObject(entry.sceneObject.id);
      });

      hotspot.addEventListener("contextmenu", async (event) => {
        event.preventDefault();
        await runtime.systems.viewport.inspectObject(entry.sceneObject.id);
      });

      hotspot.addEventListener("dragenter", (event) => {
        event.preventDefault();
        hotspot.classList.add("is-valid-target");
      });

      hotspot.addEventListener("dragover", (event) => {
        event.preventDefault();
        hotspot.classList.add("is-valid-target");
      });

      hotspot.addEventListener("dragleave", () => {
        hotspot.classList.remove("is-valid-target", "is-invalid-target");
      });

      hotspot.addEventListener("drop", async (event) => {
        event.preventDefault();
        hotspot.classList.remove("is-valid-target", "is-invalid-target");
        await runtime.systems.viewport.interactWithObject(entry.sceneObject.id);
      });

      overlay.appendChild(hotspot);
    }

    stage.addEventListener("dragend", () => clearTargetStates(stage));
    stage.appendChild(overlay);
    stageShell.appendChild(stage);
    inner.appendChild(stageShell);
    mount.appendChild(card);
  }

  return { render };
}