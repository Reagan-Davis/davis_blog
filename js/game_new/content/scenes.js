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
        <br><br>
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
            <br><br>
            The corridor beyond is finally accessible.
            <br><br>
            A small marker glows further ahead, waiting for you to proceed.
          `
        }
      ]
    },

    objects: [
      {
        id: "gate",
        name: "Rusted Gate",
        templateObjectId: "gate",
        enabledWhen: { type: "always" },
        visibleWhen: { type: "always" },
        acceptsItems: ["tutorial_key"],

        actions: {
          inspect: [
            {
              type: "show_temporary_message",
              text: "A rusted gate bars the passage."
            }
          ],

          interact: [
            {
              type: "conditional",
              if: {
                type: "flag_equals",
                key: "gate_unlocked",
                value: true
              },
              then: [
                {
                  type: "show_temporary_message",
                  text: "The gate is already open."
                }
              ],
              else: [
                {
                  type: "show_temporary_message",
                  text: "Locked."
                }
              ]
            }
          ],

          useItem: [
            {
              type: "conditional",
              if: {
                all: [
                  {
                    type: "selected_item_equals",
                    itemId: "tutorial_key"
                  },
                  {
                    type: "flag_equals",
                    key: "gate_unlocked",
                    value: false
                  }
                ]
              },
              then: [
                {
                  type: "consume_selected_item"
                },
                {
                  type: "set_flag",
                  key: "gate_unlocked",
                  value: true
                },
                {
                  type: "set_object_state",
                  sceneId: "intro_gate",
                  objectId: "advance",
                  patch: { enabled: true, visible: true }
                },
                {
                  type: "increment_stat",
                  key: "doors_unlocked",
                  amount: 1
                },
                {
                  type: "show_temporary_message",
                  text: "The key turns. The gate unlocks."
                },
                {
                  type: "emit_event",
                  eventName: "gate_unlocked",
                  payload: { sceneId: "intro_gate", objectId: "gate" }
                }
              ],
              else: [
                {
                  type: "show_temporary_message",
                  text: "That won't work here."
                }
              ]
            }
          ]
        }
      },

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
              type: "start_dialogue",
              nodeId: "intro_choice"
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
      templateId: "simple_hall"
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
        templateObjectId: "center_marker",
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
  }
};