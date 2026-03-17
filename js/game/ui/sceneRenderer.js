export function createSceneRenderer({
  state,
  content,
  dom,
  viewportSystem,
  typePopupText
}) {
  function getSceneText(scene) {
    return state.world.unlockedObjects.gate
      ? scene.unlockedText
      : scene.lockedText;
  }

  function syncViewportObjects(scene) {
    scene.viewportObjects.forEach(obj => {
      viewportSystem.setObjectEnabled(obj.id, viewportSystem.isObjectEnabled(obj.id));
    });
  }

  function renderCurrentScene({ full = true } = {}) {
    const scene = content.scenes[state.world.currentSceneId];
    if (!scene) return;

    const sceneText = getSceneText(scene);

    if (full) {
      dom.sceneTitle.innerHTML = "";
      dom.sceneText.innerHTML = "";

      typePopupText(dom.sceneTitle, scene.title, {
        speed: 30,
        startDelay: 120,
        onComplete: () => {
          typePopupText(dom.sceneText, sceneText, {
            speed: 24,
            startDelay: 180
          });
        }
      });
    } else {
      typePopupText(dom.sceneText, sceneText, {
        speed: 24,
        startDelay: 60
      });
    }

    syncViewportObjects(scene);
  }

  return { renderCurrentScene };
}