export const TUTORIAL_SCRIPTS = [
  {
    id: "show_gate_hint_on_start",
    trigger: "game_started",
    once: true,
    conditions: [
      {
        type: "current_scene_is",
        sceneId: "intro_gate"
      }
    ],
    actions: [
      {
        type: "show_temporary_message",
        text: "Try inspecting the gate, opening your inventory, and using the key."
      }
    ]
  },

  {
    id: "show_unlock_hint_after_gate_open",
    trigger: "gate_unlocked",
    once: true,
    actions: [
      {
        type: "show_temporary_message",
        text: "The advance marker is now active."
      }
    ]
  }
];