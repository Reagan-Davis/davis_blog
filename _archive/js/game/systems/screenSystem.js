export function createScreenSystem({ state, dom }) {
    function showScreen(screenName) {
      state.ui.activeScreen = screenName;
  
      dom.introScreen.classList.toggle("is-active", screenName === "intro");
      dom.sceneScreen.classList.toggle("is-active", screenName === "scene");
      dom.dialogueScreen.classList.toggle("is-active", screenName === "dialogue");
    }
  
    return { showScreen };
  }