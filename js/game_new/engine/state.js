function buildInitialSceneRuntime(content) {
  const runtimeScenes = {};

  for (const scene of content.listScenes()) {
    runtimeScenes[scene.id] = {
      objectStates: {}
    };

    for (const objectDef of scene.objects || []) {
      runtimeScenes[scene.id].objectStates[objectDef.id] = {
        enabled: null,
        visible: null,
        custom: {}
      };
    }
  }

  return runtimeScenes;
}

export function createInitialState(content) {
  return {
    activeScreen: "scene",
    currentSceneId: "intro_gate",

    sceneRuntime: buildInitialSceneRuntime(content),

    dialogue: {
      activeNodeId: null,
      isOpen: false
    },

    inventory: {
      isOpen: true,
      selectedItemId: null,
      items: ["tutorial_key"]
    },

    editor: {
      isOpen: true,
      selectedSceneId: "intro_gate",
      selectedObjectId: null,
      mode: "scene"
    },

    ui: {
      temporaryMessage: "",
      temporaryMessageVisible: false
    },

    world: {
      flags: {
        gate_unlocked: false,
        visited_intro_gate: false
      },
      stats: {
        doors_unlocked: 0
      }
    },

    tutorial: {
      firedScriptIds: []
    }
  };
}