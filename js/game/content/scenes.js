export const SCENES = {
  intro_gate: {
    id: "intro_gate",
    title: "<em>You enter the dungeon.</em>",
    lockedText: `
      You are standing in a narrow stone corridor.<br>
      A rusted gate lies before you.
    `,
    unlockedText: `
      The rusted gate swings open, clanging against the stone facings on either side.<br>
      The path beyond is dark, save for the faint glow of a torch.
    `,
    domSceneId: "startupGateScene",
    viewportObjects: [
      {
        id: "gate",
        domId: "startupObjectGate",
        label: "A Rusted Gate",
        description: "A Rusted Gate",
        type: "lockable",
        startsEnabled: true,
        acceptsItems: ["rusted_key"],
        locked: true,
        lockVisual: {
          type: "svg_markup",
          markupKey: "LOCK_SVG_MARKUP"
        },
        onInteract: {
          type: "inspect_locked"
        },
        onUnlock: {
          type: "enable_object",
          targetId: "advance"
        }
      },
      {
        id: "advance",
        domId: "startupObjectAdvance",
        label: "Move Forward",
        description: "Move Forward",
        type: "exit",
        startsEnabled: false,
        acceptsItems: [],
        onInteract: {
          type: "go_to_dialogue",
          targetNodeId: "intro_choice"
        }
      }
    ]
  }
};