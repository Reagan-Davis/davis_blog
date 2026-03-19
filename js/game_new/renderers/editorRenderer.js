function closePanel() {
  const panel = document.getElementById("editor-panel");
  if (!panel) return;
  panel.hidden = true;
  panel.classList.remove("is-open");
  document.querySelector(`[data-dp-panel-toggle="editor-panel"]`)?.classList.remove("is-active");
}

function createNumberInput(value, onInput) {
  const input = document.createElement("input");
  input.type = "number";
  input.value = Number(value || 0);
  input.className = "dp-input";
  input.addEventListener("input", () => onInput(Number(input.value || 0)));
  return input;
}

export function createEditorRenderer(runtime) {
  function render() {
    const mount = runtime.mounts.editorPanel;
    mount.innerHTML = "";

    const head = document.createElement("div");
    head.className = "dp-generic-popover__head";

    const title = document.createElement("h2");
    title.className = "dp-generic-popover__title";
    title.textContent = "Editor";

    const close = document.createElement("button");
    close.type = "button";
    close.className = "dp-generic-popover__close";
    close.textContent = "×";
    close.addEventListener("click", closePanel);

    head.appendChild(title);
    head.appendChild(close);

    const body = document.createElement("div");
    body.className = "dp-generic-popover__body dp-editor-panel-grid";

    const scene = runtime.systems.editor.getSelectedScene();

    const sceneSelectWrap = document.createElement("label");
    sceneSelectWrap.className = "dp-editor-field";
    sceneSelectWrap.innerHTML = `<span class="dp-editor-label">Scene</span>`;

    const sceneSelect = document.createElement("select");
    sceneSelect.className = "dp-select";
    runtime.content.listScenes().forEach((sceneDef) => {
      const option = document.createElement("option");
      option.value = sceneDef.id;
      option.textContent = sceneDef.title || sceneDef.id;
      option.selected = sceneDef.id === runtime.state.editor.selectedSceneId;
      sceneSelect.appendChild(option);
    });
    sceneSelect.addEventListener("change", () => runtime.systems.editor.selectScene(sceneSelect.value));
    sceneSelectWrap.appendChild(sceneSelect);

    const titleWrap = document.createElement("label");
    titleWrap.className = "dp-editor-field";
    titleWrap.innerHTML = `<span class="dp-editor-label">Title</span>`;
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.className = "dp-input";
    titleInput.value = scene.title || "";
    titleInput.addEventListener("input", () => runtime.systems.editor.updateSceneTitle(titleInput.value));
    titleWrap.appendChild(titleInput);

    const textWrap = document.createElement("label");
    textWrap.className = "dp-editor-field";
    textWrap.innerHTML = `<span class="dp-editor-label">Main Text</span>`;
    const textArea = document.createElement("textarea");
    textArea.className = "dp-textarea";
    textArea.value = scene.text?.default || "";
    textArea.addEventListener("input", () => runtime.systems.editor.updateSceneText(textArea.value));
    textWrap.appendChild(textArea);

    body.appendChild(sceneSelectWrap);
    body.appendChild(titleWrap);
    body.appendChild(textWrap);

    const objectTitle = document.createElement("div");
    objectTitle.className = "dp-generic-row";
    objectTitle.innerHTML = `<div class="dp-generic-row__title">Objects</div><div class="dp-generic-row__text">Select one to edit its geometry.</div>`;
    body.appendChild(objectTitle);

    (scene.objects || []).forEach((objectDef) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dp-editor-object-button";
      btn.textContent = objectDef.name || objectDef.id;
      btn.addEventListener("click", () => {
        runtime.systems.editor.selectObject(objectDef.id);
      });
      body.appendChild(btn);
    });

    const selectedObject = runtime.systems.editor.getSelectedObject();
    if (selectedObject) {
      const template = runtime.content.getViewportTemplate(scene.viewport.templateId);
      const templateObject = (template.templateObjects || []).find(
        (entry) => entry.id === selectedObject.templateObjectId
      );

      if (templateObject) {
        const subtitle = document.createElement("div");
        subtitle.className = "dp-generic-row";
        subtitle.innerHTML = `<div class="dp-generic-row__title">Editing: ${selectedObject.id}</div><div class="dp-generic-row__text">Adjust hotspot placement.</div>`;
        body.appendChild(subtitle);

        if (templateObject.shape === "rect") {
          const fields = [
            ["X", "x"],
            ["Y", "y"],
            ["Width", "width"],
            ["Height", "height"]
          ];

          fields.forEach(([labelText, key]) => {
            const wrap = document.createElement("label");
            wrap.className = "dp-editor-field";
            wrap.innerHTML = `<span class="dp-editor-label">${labelText}</span>`;
            wrap.appendChild(
              createNumberInput(templateObject[key], (value) => {
                runtime.systems.editor.updateTemplateObjectGeometry(selectedObject.id, { [key]: value });
              })
            );
            body.appendChild(wrap);
          });
        }

        if (templateObject.shape === "circle") {
          const fields = [
            ["Center X", "cx"],
            ["Center Y", "cy"],
            ["Radius", "r"]
          ];

          fields.forEach(([labelText, key]) => {
            const wrap = document.createElement("label");
            wrap.className = "dp-editor-field";
            wrap.innerHTML = `<span class="dp-editor-label">${labelText}</span>`;
            wrap.appendChild(
              createNumberInput(templateObject[key], (value) => {
                runtime.systems.editor.updateTemplateObjectGeometry(selectedObject.id, { [key]: value });
              })
            );
            body.appendChild(wrap);
          });
        }
      }
    }

    mount.appendChild(head);
    mount.appendChild(body);
  }

  return { render };
}