export function getDom() {
    return {
      modal: document.getElementById("startupModal"),
  
      introScreen: document.getElementById("startupModalStep1"),
      sceneScreen: document.getElementById("startupModalStep2"),
      dialogueScreen: document.getElementById("startupModalStep3"),
  
      introContinueBtn: document.getElementById("startupModalContinue"),
      sceneProceedBtn: document.getElementById("startupModalEnterSite"),
      dialogueContinueBtn: document.getElementById("startupModalFinalContinue"),
  
      bagButton: document.getElementById("startupBagButton"),
      inventoryPanel: document.getElementById("startupInventoryPanel"),
      inventoryNote: document.getElementById("startupInventoryNote"),
      inventoryCloseBtn: document.getElementById("startupInventoryClose"),
  
      keyItem: document.getElementById("startupKeyItem"),
  
      sceneRoot: document.getElementById("startupGateScene"),
      objectTooltip: document.getElementById("startupObjectTooltip"),
  
      sceneTitle: document.getElementById("startupDungeonTitle"),
      sceneText: document.getElementById("startupDungeonText"),
  
      dialogueTitle: document.getElementById("startupFinalTitle"),
      dialogueText: document.getElementById("startupFinalText"),
      dialogueChoices: document.getElementById("startupFinalChoice"),
      dialogueResponseText: document.getElementById("startupFinalFollowup"),
  
      bagHelp: document.getElementById("startupBagHelp"),
      keyHelp: document.getElementById("startupKeyHelp"),
      viewportHelp: document.getElementById("startupViewportHelp"),
      textHelp: document.getElementById("startupTextHelp"),
      advanceHelp: document.getElementById("startupAdvanceHelp")
    };
  }