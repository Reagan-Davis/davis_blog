function resolveSceneText(scene, runtime) {
  const text = scene?.text || {};
  const variants = Array.isArray(text.variants) ? text.variants : [];

  for (const variant of variants) {
    if (runtime.conditions.evaluate(variant.when, runtime)) {
      return variant.value || "";
    }
  }

  return text.default || "";
}

function isTopToolbarPanelButton(buttonDef = {}) {
  const actions = Array.isArray(buttonDef.actions) ? buttonDef.actions : [];

  return actions.some((action) => {
    if (!action || action.type !== "toggle_panel") return false;
    return ["inventory", "achievements", "map", "settings", "editor"].includes(action.panel);
  });
}

function getRenderableSceneButtons(scene) {
  return (scene.buttons || []).filter((buttonDef) => !isTopToolbarPanelButton(buttonDef));
}

function createSceneActions(scene, runtime) {
  const buttons = getRenderableSceneButtons(scene);
  if (!buttons.length) return null;

  const actions = document.createElement("div");
  actions.className = "startup-dungeon-actions";

  for (const buttonDef of buttons) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "startup-dungeon-actions__proceed";
    btn.textContent = buttonDef.label || buttonDef.id;

    btn.addEventListener("click", async () => {
      await runtime.actionRunner.runActions(buttonDef.actions || [], {
        sceneId: scene.id,
        buttonId: buttonDef.id
      });
    });

    actions.appendChild(btn);
  }

  return actions;
}

function getHelpNode(id) {
  return document.getElementById(id);
}

function setHelpVisible(id, visible) {
  const node = getHelpNode(id);
  if (!node) return;

  node.hidden = !visible;
  node.classList.toggle("is-visible", visible);
}

function hideAllTutorialHelp() {
  setHelpVisible("dpViewportHelp", false);
  setHelpVisible("dpTextHelp", false);
  setHelpVisible("dpAdvanceHelp", false);
}

function updateSceneTitle(scene) {
  const titleNode = document.getElementById("startupDungeonTitle");
  if (!titleNode || !scene?.title) return;

  titleNode.innerHTML = `<em>${scene.title}</em>`;
}

export function createSceneRenderer(runtime) {
  let currentSceneId = null;
  let currentSceneText = null;

  let tempMessageNode = null;
  let textBox = null;
  let actionsNode = null;

  function ensureBaseLayout(mount, scene) {
    if (mount.dataset.initialized === "true" && currentSceneId === scene.id) {
      return;
    }

    hideAllTutorialHelp();
    mount.innerHTML = "";
    mount.className = "startup-dungeon-scene-copy";
    mount.dataset.initialized = "true";

    tempMessageNode = document.createElement("div");
    tempMessageNode.className = "dp-temp-message startup-dungeon-temp-message";
    tempMessageNode.hidden = true;
    mount.appendChild(tempMessageNode);

    const textShell = document.createElement("div");
    textShell.className = "startup-dungeon-scene-text-shell";

    textBox = document.createElement("div");
    textBox.className = "dp-scene-text startup-dungeon-scene-text";
    textShell.appendChild(textBox);
    mount.appendChild(textShell);

    const inlineTextHelp = document.getElementById("dpTextHelp");
    if (inlineTextHelp && mount.contains(inlineTextHelp)) {
      inlineTextHelp.remove();
      const mainShell = mount.closest(".startup-dungeon-main-shell");
      const dialoguePanel = mainShell?.querySelector("#dialogue-panel");
      if (mainShell && dialoguePanel) {
        mainShell.insertBefore(inlineTextHelp, dialoguePanel);
      }
    }

    actionsNode = createSceneActions(scene, runtime);
    if (actionsNode) {
      mount.appendChild(actionsNode);
    }

    currentSceneId = scene.id;
    currentSceneText = null;
  }

  function render() {
    const mount = runtime.mounts.scenePanel;
    const scene = runtime.systems.scene.getCurrentScene();

    if (!scene) {
        mount.innerHTML = "";
        currentSceneId = null;
        currentSceneText = null;
        hideAllTutorialHelp();
        return;
    }

    ensureBaseLayout(mount, scene);
    updateSceneTitle(scene);

    if (runtime.state.ui.temporaryMessageVisible && runtime.state.ui.temporaryMessage) {
      tempMessageNode.hidden = false;
      tempMessageNode.textContent = runtime.state.ui.temporaryMessage;
    } else if (tempMessageNode) {
      tempMessageNode.hidden = true;
      tempMessageNode.textContent = "";
    }

    const nextText = resolveSceneText(scene, runtime);
    if (nextText !== currentSceneText) {
      currentSceneText = nextText;
      runtime.renderers.typing.renderRichText(textBox, nextText);
    }
  }

  return { render };
}