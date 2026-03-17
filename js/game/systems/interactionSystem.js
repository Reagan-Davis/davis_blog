export function createInteractionSystem({
  state,
  dom,
  content,
  viewportSystem,
  inventorySystem,
  dialogueSystem,
  tooltipUI,
  screenSystem,
  tutorialSystem,
  sceneRenderer
}) {
  function interactWithObject(objectId) {
    const obj = viewportSystem.getSceneObject(objectId);
    if (!obj || !viewportSystem.isObjectEnabled(objectId)) return;

    viewportSystem.clearObjectHighlights();
    viewportSystem.setObjectClass(objectId, "is-active", true);

    const selectedItemId = state.inventory.selectedItemId;

    if (selectedItemId && Array.isArray(obj.acceptsItems) && obj.acceptsItems.includes(selectedItemId)) {
      useItemOnObject(selectedItemId, objectId);
      return;
    }

    tooltipUI.show(obj.description, { autoHideMs: 1800 });

    if (obj.id === "gate" && !state.tutorial.hasClickedGateOnce) {
      state.tutorial.hasClickedGateOnce = true;
      tutorialSystem?.hideViewportHelp();
      tutorialSystem?.showTextHelp();

      if (state.ui.textHelpHideTimer) {
        window.clearTimeout(state.ui.textHelpHideTimer);
        state.ui.textHelpHideTimer = null;
      }

      if (state.ui.bagHelpShowTimer) {
        window.clearTimeout(state.ui.bagHelpShowTimer);
        state.ui.bagHelpShowTimer = null;
      }

      state.ui.textHelpHideTimer = window.setTimeout(() => {
        tutorialSystem?.hideTextHelp();
        state.ui.textHelpHideTimer = null;

        state.ui.bagHelpShowTimer = window.setTimeout(() => {
          tutorialSystem?.showBagHelp();
          state.ui.bagHelpShowTimer = null;
        }, 1800);
      }, 2600);
    }

    if (obj.type === "exit") {
      tutorialSystem?.hideAdvanceHelp();
      tutorialSystem?.hideAll();

      if (obj.onInteract?.type === "go_to_dialogue") {
        dialogueSystem.startNode(obj.onInteract.targetNodeId);
        screenSystem.showScreen("dialogue");
      }
      return;
    }

    dom.inventoryNote.textContent = selectedItemId
      ? "That won't work here."
      : `You see ${obj.description}.`;
  }

  function useItemOnObject(itemId, objectId) {
    const obj = viewportSystem.getSceneObject(objectId);
    if (!obj) return false;

    if (!Array.isArray(obj.acceptsItems) || !obj.acceptsItems.includes(itemId)) {
      return false;
    }

    if (obj.type === "lockable") {
      const wasAlreadyUnlocked = !!state.world.unlockedObjects[objectId];
      if (wasAlreadyUnlocked) return false;

      inventorySystem.consumeItem(itemId);
      inventorySystem.clearSelectedItem();

      state.world.unlockedObjects[objectId] = true;

      state.achievements.stats.doorsUnlocked =
        (state.achievements.stats.doorsUnlocked || 0) + 1;

      tutorialSystem?.hideAll();
      dom.inventoryNote.textContent = "The key turns in the lock.";

      const currentDoorsUnlocked = state.achievements.stats.doorsUnlocked || 0;
      const targetDoorsUnlocked = 10;
      const percentDoorsUnlocked = Math.max(
        0,
        Math.min(100, (currentDoorsUnlocked / targetDoorsUnlocked) * 100)
      );

      if (dom.achievementsDoorsValue) {
        dom.achievementsDoorsValue.textContent = `${currentDoorsUnlocked}/${targetDoorsUnlocked}`;
      }

      if (dom.achievementsDoorsFill) {
        dom.achievementsDoorsFill.style.width = `${percentDoorsUnlocked}%`;
      }

      dom.sceneRoot?.classList.add("is-unlocking");

      window.setTimeout(() => {
        viewportSystem.setObjectEnabled("gate", false);
        viewportSystem.setObjectEnabled("advance", true);
        dom.sceneRoot?.classList.remove("is-unlocking");
        dom.sceneRoot?.classList.add("is-unlocked");

        sceneRenderer?.renderCurrentScene({ full: false });
        tutorialSystem?.showAdvanceHelp();
      }, 650);

      return true;
    }

    return false;
  }

  return {
    interactWithObject,
    useItemOnObject
  };
}