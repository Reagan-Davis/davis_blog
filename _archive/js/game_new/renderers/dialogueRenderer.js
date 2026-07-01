function createPanelCard(titleText) {
  const card = document.createElement("section");
  card.className = "dp-panel-card";

  const inner = document.createElement("div");
  inner.className = "dp-panel-inner";

  if (titleText) {
    const title = document.createElement("h2");
    title.className = "dp-panel-title";
    title.textContent = titleText;
    inner.appendChild(title);
  }

  card.appendChild(inner);
  return { card, inner };
}

export function createDialogueRenderer(runtime) {
  function render() {
    const mount = runtime.mounts.dialoguePanel;
    mount.innerHTML = "";

    if (!runtime.systems.dialogue.isOpen()) return;

    const node = runtime.systems.dialogue.getActiveNode();
    if (!node) return;

    const { card, inner } = createPanelCard(node.title || node.id);

    const body = document.createElement("div");
    body.className = "dp-dialogue-text";

    const choices = document.createElement("div");
    choices.className = "dp-dialogue-choices";

    for (const choice of node.choices || []) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "dp-btn";
      btn.textContent = choice.label || choice.id;
      btn.addEventListener("click", async () => {
        await runtime.systems.dialogue.choose(choice.id);
      });
      choices.appendChild(btn);
    }

    inner.appendChild(body);
    inner.appendChild(choices);
    mount.appendChild(card);

    runtime.renderers.typing.renderRichText(body, node.text || "");
  }

  return { render };
}