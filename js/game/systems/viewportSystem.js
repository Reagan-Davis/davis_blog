export function createViewportSystem({ state, content, dom }) {
    function getCurrentScene() {
      return content.scenes[state.world.currentSceneId] || null;
    }
  
    function getSceneObject(objectId) {
      const scene = getCurrentScene();
      if (!scene) return null;
      return scene.viewportObjects.find(obj => obj.id === objectId) || null;
    }
  
    function getObjectElement(objectId) {
      const obj = getSceneObject(objectId);
      if (!obj) return null;
      return document.getElementById(obj.domId);
    }
  
    function isObjectEnabled(objectId) {
      const override = state.world.objectStates[objectId]?.enabled;
      if (typeof override === "boolean") return override;
  
      const obj = getSceneObject(objectId);
      return !!obj?.startsEnabled;
    }
  
    function setObjectEnabled(objectId, enabled) {
      state.world.objectStates[objectId] = {
        ...(state.world.objectStates[objectId] || {}),
        enabled: !!enabled
      };
  
      const el = getObjectElement(objectId);
      if (!el) return;
  
      el.hidden = !enabled;
      el.setAttribute("aria-hidden", String(!enabled));
      el.tabIndex = enabled ? 0 : -1;
      el.classList.toggle("is-available", !!enabled);
    }
  
    function clearObjectHighlights() {
      const scene = getCurrentScene();
      if (!scene) return;
  
      scene.viewportObjects.forEach(obj => {
        const el = getObjectElement(obj.id);
        el?.classList.remove(
          "is-active",
          "is-highlighted",
          "is-valid-target",
          "is-invalid-target"
        );
      });
    }
  
    function setObjectClass(objectId, className, enabled) {
      const el = getObjectElement(objectId);
      el?.classList.toggle(className, !!enabled);
    }
  
    function getObjectFromPoint(x, y) {
      const el = document.elementFromPoint(x, y)?.closest(".startup-viewport-object");
      if (!el) return null;
  
      const objectId = el.dataset.objectId;
      if (!objectId || !isObjectEnabled(objectId)) return null;
  
      return getSceneObject(objectId);
    }
  
    return {
      getCurrentScene,
      getSceneObject,
      getObjectElement,
      isObjectEnabled,
      setObjectEnabled,
      clearObjectHighlights,
      setObjectClass,
      getObjectFromPoint
    };
  }