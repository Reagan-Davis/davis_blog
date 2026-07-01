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

  function validateContent() {
    const errors = [];

    for (const scene of Object.values(scenes)) {
      const templateId = scene.viewport?.templateId;
      if (!scene.viewport?.enabled || !templateId) continue;

      const template = viewportTemplates[templateId];
      if (!template) {
        errors.push(`Scene "${scene.id}" references missing template "${templateId}"`);
        continue;
      }

      const templateObjectIds = new Set(
        (template.templateObjects || []).map((entry) => entry.id)
      );

      for (const objectDef of scene.objects || []) {
        if (!objectDef.templateObjectId) continue;
        if (!templateObjectIds.has(objectDef.templateObjectId)) {
          errors.push(
            `Scene "${scene.id}" object "${objectDef.id}" references missing template object "${objectDef.templateObjectId}"`
          );
        }
      }
    }

    if (errors.length > 0) {
      throw new Error(`Content validation failed:\n- ${errors.join("\n- ")}`);
    }
  }

  const registry = {
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
    },

    validateContent
  };

  validateContent();
  return registry;
}