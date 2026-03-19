export function createScreenSystem(runtime) {
  function setActiveScreen(screenId) {
    runtime.state.activeScreen = screenId;
    runtime.render();
  }

  function getActiveScreen() {
    return runtime.state.activeScreen;
  }

  return {
    setActiveScreen,
    getActiveScreen
  };
}