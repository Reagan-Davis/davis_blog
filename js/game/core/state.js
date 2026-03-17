export function createInitialState() {
  return {
    ui: {
      modalOpen: false,
      activeScreen: "intro",
      lockedScrollY: 0,
      tooltipTimer: null,
      helpTimers: {
        bagHint: null,
        textHint: null,
        bagReturn: null,
        advanceHint: null
      }
    },

    world: {
      currentSceneId: "intro_gate",
      discoveredScenes: ["intro_gate"],
      unlockedObjects: {},
      objectStates: {},
      flags: {}
    },

    inventory: {
      selectedItemId: null,
      items: {
        tutorial_key: {
          id: "tutorial_key",
          owned: true,
          consumed: false
        }
      }
    },

    dialogue: {
      activeNodeId: null
    },

    relations: {},

    achievements: {
      unlocked: [],
      stats: {
        doorsUnlocked: 0
      }
    },

    tutorial: {
      hasClickedBag: false,
      hasShownViewportHint: false,
      hasShownTextHint: false,
      hasShownBagHint: false,
      hasShownKeyHint: false,
      hasShownAdvanceHint: false,
      hasClickedGateOnce: false,
      hasShownGateLock: false
    }
  };
}