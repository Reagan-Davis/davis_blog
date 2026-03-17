export function createDialogueSystem({ state, content }) {
    function getActiveNode() {
      return state.dialogue.activeNodeId
        ? content.dialogue[state.dialogue.activeNodeId] || null
        : null;
    }
  
    function startNode(nodeId) {
      state.dialogue.activeNodeId = nodeId;
    }
  
    function choose(choiceId) {
      const node = getActiveNode();
      if (!node?.choices) return null;
  
      const choice = node.choices.find(c => c.id === choiceId);
      if (!choice) return null;
  
      if (choice.nextNodeId) {
        state.dialogue.activeNodeId = choice.nextNodeId;
      }
  
      return choice;
    }
  
    function clear() {
      state.dialogue.activeNodeId = null;
    }
  
    return {
      getActiveNode,
      startNode,
      choose,
      clear
    };
  }