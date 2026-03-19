export function createViewportSystem(runtime) {
  function getCurrentTemplate() {
    const scene = runtime.systems.scene.getCurrentScene();
    if (!scene?.viewport?.enabled) return null;
    return runtime.content.getViewportTemplate(scene.viewport.templateId);
  }

  function getTemplateObject(templateId, templateObjectId) {
    const template = runtime.content.getViewportTemplate(templateId);
    return (template.templateObjects || []).find((entry) => entry.id === templateObjectId) || null;
  }

  function getRenderableObjectsForCurrentScene() {
    const scene = runtime.systems.scene.getCurrentScene();
    const template = getCurrentTemplate();
    if (!scene || !template) return [];

    return (scene.objects || [])
      .map((sceneObject) => {
        const templateObject = getTemplateObject(template.id, sceneObject.templateObjectId);
        if (!templateObject) {
          console.warn(
            `Missing template object "${sceneObject.templateObjectId}" in template "${template.id}".`
          );
          return null;
        }

        const visible = runtime.systems.scene.isObjectVisible(scene.id, sceneObject);
        const enabled = runtime.systems.scene.isObjectEnabled(scene.id, sceneObject);

        return {
          sceneId: scene.id,
          sceneObject,
          templateObject,
          visible,
          enabled
        };
      })
      .filter(Boolean);
  }

  async function interactWithObject(objectId) {
    const scene = runtime.systems.scene.getCurrentScene();
    if (!scene) return;

    const objectDef = runtime.systems.scene.getSceneObject(scene.id, objectId);
    if (!objectDef) return;

    const enabled = runtime.systems.scene.isObjectEnabled(scene.id, objectDef);
    const visible = runtime.systems.scene.isObjectVisible(scene.id, objectDef);
    if (!visible || !enabled) return;

    const hasSelectedItem = Boolean(runtime.state.inventory.selectedItemId);
    const actionList = hasSelectedItem
      ? objectDef.actions?.useItem || objectDef.actions?.interact || []
      : objectDef.actions?.interact || [];

    runtime.emit("object_interacted", {
      sceneId: scene.id,
      objectId: objectDef.id,
      usedSelectedItem: hasSelectedItem,
      selectedItemId: runtime.state.inventory.selectedItemId || null
    });

    await runtime.actionRunner.runActions(actionList, {
      sceneId: scene.id,
      objectId: objectDef.id
    });
  }

  async function inspectObject(objectId) {
    const scene = runtime.systems.scene.getCurrentScene();
    if (!scene) return;

    const objectDef = runtime.systems.scene.getSceneObject(scene.id, objectId);
    if (!objectDef) return;

    if (!runtime.systems.scene.isObjectVisible(scene.id, objectDef)) return;

    runtime.emit("object_inspected", {
      sceneId: scene.id,
      objectId: objectDef.id
    });

    await runtime.actionRunner.runActions(objectDef.actions?.inspect || [], {
      sceneId: scene.id,
      objectId: objectDef.id
    });
  }

  return {
    getCurrentTemplate,
    getTemplateObject,
    getRenderableObjectsForCurrentScene,
    interactWithObject,
    inspectObject
  };
}