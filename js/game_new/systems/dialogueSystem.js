export function createDialogueSystem(runtime) {
  function isOpen() {
    return runtime.state.dialogue.isOpen === true;
  }

  function getActiveNode() {
    const nodeId = runtime.state.dialogue.activeNodeId;
    if (!nodeId) return null;
    return runtime.content.getDialogueNode(nodeId);
  }

  function start(nodeId) {
    runtime.state.dialogue.activeNodeId = nodeId;
    runtime.state.dialogue.isOpen = true;
    runtime.systems.screen.setActiveScreen("dialogue");

    runtime.emit("dialogue_started", { nodeId });
    runtime.render();
  }

  function close(options = {}) {
    runtime.state.dialogue.activeNodeId = null;
    runtime.state.dialogue.isOpen = false;

    if (!options.silent) {
      runtime.emit("dialogue_closed", {});
    }

    runtime.systems.screen.setActiveScreen("scene");
    runtime.render();
  }

  async function choose(choiceId) {
    const node = getActiveNode();
    if (!node) return;

    const choice = (node.choices || []).find((entry) => entry.id === choiceId);
    if (!choice) return;

    runtime.emit("dialogue_choice_selected", {
      nodeId: node.id,
      choiceId
    });

    await runtime.actionRunner.runActions(choice.actions || [], {
      nodeId: node.id,
      choiceId
    });
  }

  return {
    isOpen,
    getActiveNode,
    start,
    close,
    choose
  };
}