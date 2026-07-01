function createGateLeaf(id, templateObjectId) {
  return {
    id,
    name: "Rusted Gate",
    templateObjectId,
    enabledWhen: { type: "flag_equals", key: "gate_unlocked", value: false },
    visibleWhen: { type: "flag_equals", key: "gate_unlocked", value: false },
    acceptsItems: ["tutorial_key"],
    actions: {
      inspect: [
        { type: "show_temporary_message", text: "A rusted gate bars the passage." }
      ],
      interact: [
        { type: "show_temporary_message", text: "Locked." }
      ],
      useItem: [
        {
          type: "conditional",
          if: {
            all: [
              { type: "selected_item_equals", itemId: "tutorial_key" },
              { type: "flag_equals", key: "gate_unlocked", value: false }
            ]
          },
          then: [
            { type: "consume_selected_item" },
            { type: "set_flag", key: "gate_unlocked", value: true },
            { type: "show_temporary_message", text: "The key turns. The gate unlocks." },
            {
              type: "emit_event",
              eventName: "gate_unlocked",
              payload: { sceneId: "intro_gate", objectId: id }
            },
            { type: "increment_stat", key: "doors_unlocked", amount: 1 }
          ],
          else: [
            { type: "show_temporary_message", text: "That won't work here." }
          ]
        }
      ]
    }
  };
}

export const SCENES = {
  intro_gate: {
    id: "intro_gate",
    title: "The Corridor Gate",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "gate_corridor"
    },

    text: {
      default: `
        <em>You stand in a narrow corridor of old stone.</em> [[pause=600]]
        An iron gate blocks the way forward.
        <br><br>
        There is a sense that this place expects you to do more than merely click through it.
      `,
      variants: [
        {
          when: {
            all: [
              { type: "flag_equals", key: "gate_unlocked", value: true }
            ]
          },
          value: `
            <em>The gate stands open now.</em> [[pause=500]]
            The corridor beyond is finally accessible.
            <br><br>
            A small marker glows further ahead, waiting for you to proceed.
          `
        }
      ]
    },

    objects: [
      createGateLeaf("gate_left", "gate_left_leaf"),
      createGateLeaf("gate_right", "gate_right_leaf"),
      {
        id: "advance",
        name: "Advance Marker",
        templateObjectId: "advance",
        enabledWhen: {
            type: "flag_equals",
            key: "gate_unlocked",
            value: true
        },
        visibleWhen: {
            type: "flag_equals",
            key: "gate_unlocked",
            value: true
        },

        actions: {
            interact: [
            {
                type: "go_to_scene",
                sceneId: "corridor_after_gate"
            }
            ],

            inspect: [
            {
                type: "show_temporary_message",
                text: "A marker indicating the way forward."
            }
            ]
        }
        }
    ],

    buttons: [
      {
        id: "open_inventory",
        label: "Inventory",
        actions: [
          {
            type: "toggle_panel",
            panel: "inventory"
          }
        ]
      },
      {
        id: "toggle_editor",
        label: "Editor",
        actions: [
          {
            type: "toggle_panel",
            panel: "editor"
          }
        ]
      }
    ],

    onEnter: [
      {
        type: "set_flag_once",
        key: "visited_intro_gate",
        value: true
      }
    ]
  },

  corridor_after_gate: {
    id: "corridor_after_gate",
    title: "Beyond the Gate",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "hall_dead_end"
    },

    text: {
      default: `
        The path ahead opens into a quieter stretch of corridor.
        <br><br>
        For now, this is enough to prove the new system works.
      `
    },

    objects: [
      {
        id: "back_marker",
        name: "Back Marker",
        templateObjectId: "back_wall",
        enabledWhen: { type: "always" },
        visibleWhen: { type: "always" },
        actions: {
          interact: [
            {
              type: "go_to_scene",
              sceneId: "intro_gate"
            }
          ]
        }
      }
    ],

    buttons: [
      {
        id: "return_to_gate",
        label: "Return",
        actions: [
          {
            type: "go_to_scene",
            sceneId: "intro_gate"
          }
        ]
      }
    ]
  },
    hall_single_door_demo: {
    id: "hall_single_door_demo",
    title: "Single Door Hall",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "hall_single_door_end"
    },

    text: {
      default: `
        A plain stone corridor ends in a single heavy wooden door.
      `
    },

    objects: [
      {
        id: "end_door",
        name: "Door",
        templateObjectId: "end_door",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A sturdy door at the end of the corridor." }
          ],
          interact: [
            { type: "show_temporary_message", text: "It is closed." }
          ]
        }
      }
    ],

    buttons: []
  },

  hall_turn_left_demo: {
    id: "hall_turn_left_demo",
    title: "Left Turn Hall",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "hall_turn_left"
    },

    text: {
      default: `
        The corridor bends away to the left.
      `
    },

    objects: [
      {
        id: "left_turn_exit",
        name: "Left Passage",
        templateObjectId: "left_turn_exit",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "The corridor continues left." }
          ],
          interact: [
            { type: "show_temporary_message", text: "You could head this way." }
          ]
        }
      },
      {
        id: "back_wall_right",
        name: "Back Wall",
        templateObjectId: "back_wall_right",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "Worn flagstones underfoot." }
          ]
        }
      }
    ],

    buttons: []
  },

  hall_turn_right_demo: {
    id: "hall_turn_right_demo",
    title: "Right Turn Hall",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "hall_turn_right"
    },

    text: {
      default: `
        The corridor bends away to the right.
      `
    },

    objects: [
      {
        id: "right_turn_exit",
        name: "Right Passage",
        templateObjectId: "right_turn_exit",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "The corridor continues right." }
          ],
          interact: [
            { type: "show_temporary_message", text: "You could head this way." }
          ]
        }
      },
      {
        id: "back_wall_left",
        name: "Back Wall",
        templateObjectId: "back_wall_left",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "Worn flagstones underfoot." }
          ]
        }
      }
    ],

    buttons: []
  },

  hall_four_way_demo: {
    id: "hall_four_way_demo",
    title: "Four-Way Junction",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "hall_four_way"
    },

    text: {
      default: `
        A broader junction opens here, with passages leading in several directions.
      `
    },

    objects: [
      {
        id: "left_exit",
        name: "Left Exit",
        templateObjectId: "left_exit",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A passage leads left." }
          ]
        }
      },
      {
        id: "right_exit",
        name: "Right Exit",
        templateObjectId: "right_exit",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A passage leads right." }
          ]
        }
      },
      {
        id: "forward_exit",
        name: "Forward Exit",
        templateObjectId: "forward_exit",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A passage continues ahead." }
          ]
        }
      },
      {
        id: "center_floor",
        name: "Center",
        templateObjectId: "center_floor",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "The center of the junction is worn smooth by passage." }
          ]
        }
      }
    ],

    buttons: []
  },

  hall_double_door_demo: {
    id: "hall_double_door_demo",
    title: "Hall with Side Doors",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "hall_double_door_run"
    },

    text: {
      default: `
        The hallway stretches onward, with doors set into both walls.
      `
    },

    objects: [
      {
        id: "left_door",
        name: "Left Door",
        templateObjectId: "left_door",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A closed door set into the left wall." }
          ]
        }
      },
      {
        id: "right_door",
        name: "Right Door",
        templateObjectId: "right_door",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A closed door set into the right wall." }
          ]
        }
      },
      {
        id: "forward_continue",
        name: "Continue Forward",
        templateObjectId: "forward_continue",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "The corridor continues into shadow." }
          ]
        }
      }
    ],

    buttons: []
  },

  side_room_demo: {
    id: "side_room_demo",
    title: "Side Room",
    screen: "scene",

    viewport: {
      enabled: true,
      templateId: "side_room_end"
    },

    text: {
      default: `
        A small stone chamber opens off the corridor. A table and cabinet sit against the back wall.
      `
    },

    objects: [
      {
        id: "back_exit",
        name: "Exit",
        templateObjectId: "back_exit",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "The way back out to the corridor." }
          ]
        }
      },
      {
        id: "left_painting",
        name: "Left Painting",
        templateObjectId: "left_painting",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A faded painting in a dusty frame." }
          ]
        }
      },
      {
        id: "right_painting",
        name: "Right Painting",
        templateObjectId: "right_painting",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "Another old painting, darkened with age." }
          ]
        }
      },
      {
        id: "table",
        name: "Table",
        templateObjectId: "table",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A narrow table with a worn surface." }
          ]
        }
      },
      {
        id: "cabinet",
        name: "Cabinet",
        templateObjectId: "cabinet",
        actions: {
          inspect: [
            { type: "show_temporary_message", text: "A squat cabinet pushed against the wall." }
          ]
        }
      }
    ],

    buttons: []
  }
};