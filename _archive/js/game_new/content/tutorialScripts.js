export const TUTORIAL_SCRIPTS = [
  {
    id: "show_gate_hint_on_start",
    trigger: "game_started",
    once: true,
    conditions: [
      { type: "current_scene_is", sceneId: "intro_gate" }
    ],
    actions: [
      {
        type: "show_tutorial_popup",
        popupId: "dpViewportHelp",
        duration: 3200
      }
    ]
  },

  {
    id: "show_text_hint_after_gate_click",
    trigger: "object_interacted",
    once: true,
    conditions: [
      { type: "event_matches", eventName: "object_interacted" },
      { type: "current_scene_is", sceneId: "intro_gate" }
    ],
    actions: [
      {
        type: "conditional",
        if: {
          any: [
            { type: "flag_equals", key: "gate_unlocked", value: false }
          ]
        },
        then: [
          {
            type: "show_tutorial_popup",
            popupId: "dpTextHelp",
            duration: 2600
          }
        ]
      }
    ]
  },

  {
    id: "show_advance_hint_after_gate_open",
    trigger: "gate_unlocked",
    once: true,
    actions: [
      {
        type: "show_tutorial_popup",
        popupId: "dpAdvanceHelp",
        duration: 3200
      }
    ]
  }
];