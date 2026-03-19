function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createEditorSystem(runtime) {
  function isOpen() {
    return runtime.state.editor.isOpen === true;
  }

  function toggleOpen() {
    runtime.state.editor.isOpen = !runtime.state.editor.isOpen;
    runtime.render();
  }

  function selectScene(sceneId) {
    runtime.state.editor.selectedSceneId = sceneId;
    runtime.state.editor.selectedObjectId = null;
    runtime.render();
  }

  function selectObject(objectId) {
    runtime.state.editor.selectedObjectId = objectId || null;
    runtime.render();
  }

  function getSelectedScene() {
    const sceneId = runtime.state.editor.selectedSceneId || runtime.state.currentSceneId;
    return runtime.content.getScene(sceneId);
  }

  function getSelectedObject() {
    const scene = getSelectedScene();
    const objectId = runtime.state.editor.selectedObjectId;
    if (!scene || !objectId) return null;
    return (scene.objects || []).find((entry) => entry.id === objectId) || null;
  }

  function updateSceneText(newText) {
    const scene = getSelectedScene();
    if (!scene) return;
    scene.text = scene.text || {};
    scene.text.default = String(newText || "");
    runtime.render();
  }

  function updateSceneTitle(newTitle) {
    const scene = getSelectedScene();
    if (!scene) return;
    scene.title = String(newTitle || "");
    runtime.render();
  }

  function updateObjectName(objectId, newName) {
    const scene = getSelectedScene();
    if (!scene) return;

    const objectDef = (scene.objects || []).find((entry) => entry.id === objectId);
    if (!objectDef) return;

    objectDef.name = String(newName || "");
    runtime.render();
  }

  function updateTemplateObjectGeometry(objectId, patch) {
    const scene = getSelectedScene();
    if (!scene) return;

    const objectDef = (scene.objects || []).find((entry) => entry.id === objectId);
    if (!objectDef) return;

    const template = runtime.content.getViewportTemplate(scene.viewport.templateId);
    const templateObject = (template.templateObjects || []).find(
      (entry) => entry.id === objectDef.templateObjectId
    );

    if (!templateObject) return;

    Object.assign(templateObject, deepClone(patch || {}));
    runtime.render();
  }

  return {
    isOpen,
    toggleOpen,
    selectScene,
    selectObject,
    getSelectedScene,
    getSelectedObject,
    updateSceneText,
    updateSceneTitle,
    updateObjectName,
    updateTemplateObjectGeometry
  };
}