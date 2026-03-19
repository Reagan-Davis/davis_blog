function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function createConditionEvaluator() {
  function evaluate(condition, runtime, extra = {}) {
    if (!condition) return true;

    if (Array.isArray(condition)) {
      return condition.every((entry) => evaluate(entry, runtime, extra));
    }

    if (condition.all) {
      return toArray(condition.all).every((entry) => evaluate(entry, runtime, extra));
    }

    if (condition.any) {
      return toArray(condition.any).some((entry) => evaluate(entry, runtime, extra));
    }

    if (condition.not) {
      return !evaluate(condition.not, runtime, extra);
    }

    const state = runtime.state;

    switch (condition.type) {
      case "always":
        return true;

      case "never":
        return false;

      case "flag_equals":
        return state.world.flags[condition.key] === condition.value;

      case "stat_gte":
        return Number(state.world.stats[condition.key] || 0) >= Number(condition.value);

      case "selected_item_equals":
        return state.inventory.selectedItemId === condition.itemId;

      case "inventory_has_item":
        return state.inventory.items.includes(condition.itemId);

      case "current_scene_is":
        return state.currentSceneId === condition.sceneId;

      case "dialogue_is_open":
        return state.dialogue.isOpen === true;

      case "object_state_equals": {
        const sceneId = condition.sceneId || state.currentSceneId;
        const objectState = state.sceneRuntime?.[sceneId]?.objectStates?.[condition.objectId];
        if (!objectState) return false;
        return objectState[condition.key] === condition.value;
      }

      case "event_matches":
        return extra.eventName === condition.eventName;

      default:
        console.warn("Unknown condition type:", condition);
        return false;
    }
  }

  return {
    evaluate
  };
}