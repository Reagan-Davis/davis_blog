export const DIALOGUE = {
  intro_choice: {
    id: "intro_choice",
    title: "A Small Admission",
    text: `
      <em>As you move deeper into the corridor...</em> [[pause=900]]
      <br><br>
      All right.
      <br><br>
      This is the point.
      <br><br>
      The old setup was too hardcoded.
      <br><br>
      This one is meant to become something you can actually build on.
    `,
    choices: [
      {
        id: "continue_forward",
        label: "Continue Forward",
        actions: [
          {
            type: "close_dialogue"
          },
          {
            type: "go_to_scene",
            sceneId: "corridor_after_gate"
          }
        ]
      },
      {
        id: "stay_here",
        label: "Stay Here",
        actions: [
          {
            type: "close_dialogue"
          },
          {
            type: "show_temporary_message",
            text: "You remain where you are."
          }
        ]
      }
    ]
  }
};