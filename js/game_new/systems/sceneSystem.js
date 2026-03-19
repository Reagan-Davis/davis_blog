function clonePayload(payload) {
  return payload && typeof payload === "object"
    ? JSON.parse(JSON.stringify(payload))
    : payload;
}

export function createSceneSystem(runtime) {
  const enteredSceneIds = new Set();

  function getCurrentScene() {
    return runtime.content.getScene(runtime.state.currentSceneId);
  }

  function getScene(sceneId) {
    return runtime.content.getScene(sceneId);
  }

  function getSceneObject(sceneId, objectId) {
    const scene = getScene(sceneId);
    return (scene.objects || []).find((entry) => entry.id === objectId) || null;
  }

  function getObjectRuntimeState(sceneId, objectId) {
    return runtime.state.sceneRuntime?.[sceneId]?.objectStates?.[objectId] || null;
  }

  function isObjectVisible(sceneId, objectDef) {
    const runtimeState = getObjectRuntimeState(sceneId, objectDef.id);
    if (runtimeState && typeof runtimeState.visible === "boolean") {
      return runtimeState.visible;
    }

    return runtime.conditions.evaluate(objectDef.visibleWhen || { type: "always" }, runtime);
  }

  function isObjectEnabled(sceneId, objectDef) {
    const runtimeState = getObjectRuntimeState(sceneId, objectDef.id);
    if (runtimeState && typeof runtimeState.enabled === "boolean") {
      return runtimeState.enabled;
    }

    return runtime.conditions.evaluate(objectDef.enabledWhen || { type: "always" }, runtime);
  }

  async function enterScene(sceneId) {
    const scene = getScene(sceneId);

    runtime.state.currentSceneId = scene.id;
    runtime.state.editor.selectedSceneId = scene.id;
    runtime.systems.screen.setActiveScreen(scene.screen || "scene");
    runtime.systems.dialogue.close({ silent: true });

    runtime.render();

    const onEnterActions = Array.isArray(scene.onEnter) ? scene.onEnter : [];
    if (onEnterActions.length > 0) {
      await runtime.actionRunner.runActions(onEnterActions, {
        sceneId: scene.id
      });
    }

    runtime.emit("scene_entered", {
      sceneId: scene.id,
      firstVisit: !enteredSceneIds.has(scene.id)
    });

    enteredSceneIds.add(scene.id);
    runtime.render();
  }

  function patchObjectState(sceneId, objectId, patch) {
    const state = getObjectRuntimeState(sceneId, objectId);
    if (!state) return false;
    Object.assign(state, clonePayload(patch || {}));
    runtime.render();
    return true;
  }

  return {
    getCurrentScene,
    getScene,
    getSceneObject,
    getObjectRuntimeState,
    isObjectVisible,
    isObjectEnabled,
    enterScene,
    patchObjectState
  };
}