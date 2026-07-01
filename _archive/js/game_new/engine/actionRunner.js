function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function normalizePayload(payload) {
  return payload && typeof payload === "object" ? payload : {};
}

export function createActionRunner(runtime) {
  const { conditions, state } = runtime;
  const tutorialTimers = new Map();

  function setTutorialPopupVisible(popupId, visible) {
    const node = document.getElementById(popupId);
    if (!node) return;

    node.hidden = !visible;
    node.classList.toggle("is-visible", visible);
  }

  function clearTutorialPopupTimer(popupId) {
    const timer = tutorialTimers.get(popupId);
    if (timer) {
      window.clearTimeout(timer);
      tutorialTimers.delete(popupId);
    }
  }

  async function runActions(actions, context = {}) {
    const actionList = Array.isArray(actions) ? actions : [];
    for (const action of actionList) {
      await runAction(action, context);
    }
  }

  async function runAction(action, context = {}) {
    if (!action || typeof action !== "object") return;

    switch (action.type) {
      case "conditional": {
        const result = conditions.evaluate(action.if, runtime, {
          eventName: context.eventName || null,
          payload: context.payload || null
        });

        if (result) {
          await runActions(action.then || [], context);
        } else {
          await runActions(action.else || [], context);
        }
        return;
      }

      case "set_flag": {
        state.world.flags[action.key] = action.value;
        runtime.render();
        return;
      }

      case "set_flag_once": {
        if (!state.world.flags[action.key]) {
          state.world.flags[action.key] = action.value;
          runtime.render();
        }
        return;
      }

      case "increment_stat": {
        const current = Number(state.world.stats[action.key] || 0);
        const amount = Number(action.amount || 1);
        state.world.stats[action.key] = current + amount;

        const { newlyUnlocked } = runtime.systems.achievements.evaluateAll();
        runtime.render();

        for (const achievementId of newlyUnlocked) {
          await runtime.emit("achievement_unlocked", { achievementId });
        }
        return;
      }

      case "set_object_state": {
        const sceneId = action.sceneId || state.currentSceneId;
        const objectState = state.sceneRuntime?.[sceneId]?.objectStates?.[action.objectId];
        if (!objectState) {
          console.warn("Tried to patch missing object state:", action);
          return;
        }

        const patch = action.patch || {};
        Object.assign(objectState, patch);
        runtime.render();
        return;
      }

      case "show_temporary_message": {
        state.ui.temporaryMessage = String(action.text || "");
        state.ui.temporaryMessageVisible = true;
        runtime.render();

        const duration = Number(action.duration || 2200);
        window.clearTimeout(runtime.__tempMessageTimer);
        runtime.__tempMessageTimer = window.setTimeout(() => {
          state.ui.temporaryMessageVisible = false;
          runtime.render();
        }, duration);

        return;
      }

      case "toggle_panel": {
        window.DungeonPrototypePanels?.toggle(action.panel);
        return;
      }

      case "select_item": {
        state.inventory.selectedItemId = action.itemId || null;
        runtime.render();
        return;
      }

      case "clear_selected_item": {
        state.inventory.selectedItemId = null;
        runtime.render();
        return;
      }

      case "consume_selected_item": {
        const itemId = state.inventory.selectedItemId;
        if (!itemId) return;

        const index = state.inventory.items.indexOf(itemId);
        if (index >= 0) {
          state.inventory.items.splice(index, 1);
        }

        state.inventory.selectedItemId = null;
        runtime.render();
        return;
      }

      case "grant_item": {
        if (action.itemId && !state.inventory.items.includes(action.itemId)) {
          state.inventory.items.push(action.itemId);
          runtime.render();
        }
        return;
      }

      case "go_to_scene": {
        await runtime.systems.scene.enterScene(action.sceneId);
        return;
      }

      case "start_dialogue": {
        runtime.systems.dialogue.start(action.nodeId);
        return;
      }

      case "close_dialogue": {
        runtime.systems.dialogue.close();
        return;
      }

      case "emit_event": {
        await runtime.emit(action.eventName, normalizePayload(action.payload));
        return;
      }

      case "delay": {
        await wait(Number(action.ms || 0));
        return;
      }

      case "batch": {
        await runActions(action.actions || [], context);
        return;
      }

      case "show_tutorial_popup": {
        const popupId = String(action.popupId || "");
        if (!popupId) return;

        clearTutorialPopupTimer(popupId);
        setTutorialPopupVisible(popupId, true);

        const duration = Number(action.duration || 0);
        if (duration > 0) {
          const timer = window.setTimeout(() => {
            setTutorialPopupVisible(popupId, false);
            tutorialTimers.delete(popupId);
          }, duration);

          tutorialTimers.set(popupId, timer);
        }

        return;
      }

      case "hide_tutorial_popup": {
        const popupId = String(action.popupId || "");
        if (!popupId) return;

        clearTutorialPopupTimer(popupId);
        setTutorialPopupVisible(popupId, false);
        return;
      }

      default:
        console.warn("Unknown action type:", action);
    }
  }

  return {
    runAction,
    runActions
  };
}
