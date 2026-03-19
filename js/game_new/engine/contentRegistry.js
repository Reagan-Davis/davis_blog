export function createContentRegistry({
  scenes,
  dialogue,
  items,
  achievements,
  viewportTemplates,
  tutorialScripts
}) {
  function requireById(collectionName, collection, id) {
    const entry = collection[id];
    if (!entry) {
      throw new Error(`Missing ${collectionName} entry: ${id}`);
    }
    return entry;
  }

  return {
    scenes,
    dialogue,
    items,
    achievements,
    viewportTemplates,
    tutorialScripts,

    getScene(sceneId) {
      return requireById("scene", scenes, sceneId);
    },

    getDialogueNode(nodeId) {
      return requireById("dialogue node", dialogue, nodeId);
    },

    getItem(itemId) {
      return requireById("item", items, itemId);
    },

    getAchievement(achievementId) {
      return requireById("achievement", achievements, achievementId);
    },

    getViewportTemplate(templateId) {
      return requireById("viewport template", viewportTemplates, templateId);
    },

    listScenes() {
      return Object.values(scenes);
    },

    listItems() {
      return Object.values(items);
    },

    listAchievements() {
      return Object.values(achievements);
    },

    listTutorialScripts() {
      return [...tutorialScripts];
    }
  };
}