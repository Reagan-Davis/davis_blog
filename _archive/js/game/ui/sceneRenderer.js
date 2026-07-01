export function createSceneRenderer({
  state,
  content,
  dom,
  viewportSystem,
  typePopupText,
  tutorialSystem
}) {
  function clearHelpTimer(name) {
    const timers = state.ui.helpTimers;
    if (!timers || !timers[name]) return;
    window.clearTimeout(timers[name]);
    timers[name] = null;
  }

  function scheduleViewportHint() {
    if (state.world.unlockedObjects.gate) return;
    if (state.tutorial.hasShownViewportHint) return;

    clearHelpTimer("textHint");

    state.ui.helpTimers.textHint = window.setTimeout(() => {
      tutorialSystem?.showViewportHelp();
      state.ui.helpTimers.textHint = null;
    }, 1600);
  }

  function renderCurrentScene() {
    const scene = content.scenes[state.world.currentSceneId];
    if (!scene) return;

    dom.sceneTitle.innerHTML = "";
    dom.sceneText.innerHTML = "";

    tutorialSystem?.hideViewportHelp();

    const sceneText = state.world.unlockedObjects.gate
      ? scene.unlockedText
      : scene.lockedText;

    typePopupText(dom.sceneTitle, scene.title, {
      speed: 30,
      startDelay: 120,
      onComplete: () => {
        typePopupText(dom.sceneText, sceneText, {
          speed: 24,
          startDelay: 180,
          onComplete: () => {
            scheduleViewportHint();
          }
        });
      }
    });

    scene.viewportObjects.forEach(obj => {
      viewportSystem.setObjectEnabled(obj.id, viewportSystem.isObjectEnabled(obj.id));
    });
  }

  return { renderCurrentScene };
}