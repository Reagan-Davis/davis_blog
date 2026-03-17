export const DIALOGUE = {
  intro_choice: {
    id: "intro_choice",
    title: "<em></em>",
    text: `
      <em>As you make your way down the corridor...</em> [[pause=2150]] <br><br>
      Heh. [[pause=1400]] <br><br>
      Did I make you think I was going to force you to play through a game to navigate this site?
    `,
    choices: [
      {
        id: "yes",
        label: "Yes",
        nextNodeId: "intro_choice_yes"
      },
      {
        id: "no",
        label: "No",
        nextNodeId: "intro_choice_no"
      }
    ]
  },

  intro_choice_yes: {
    id: "intro_choice_yes",
    title: "<em></em>",
    text: `
      Okay, yeah, you got me. That would be incredibly on-brand for me. [[pause=1200]] <br><br>
      Maybe I will go all in on it in the future.
    `,
    continueAction: {
      type: "close_modal"
    }
  },

  intro_choice_no: {
    id: "intro_choice_no",
    title: "<em></em>",
    text: `
      Really? [[pause=400]] Then I clearly need to lean harder into the bit. [[pause=1200]] <br><br>
      It will get there someday... [[pause=800]] eventually.
    `,
    continueAction: {
      type: "close_modal"
    }
  }
};