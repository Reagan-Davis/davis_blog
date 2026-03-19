import { createContentRegistry } from "./engine/contentRegistry.js";
import { createInitialState } from "./engine/state.js";
import { createConditionEvaluator } from "./engine/conditions.js";
import { createActionRunner } from "./engine/actionRunner.js";

import { SCENES } from "./content/scenes.js";
import { DIALOGUE } from "./content/dialogue.js";
import { ITEMS } from "./content/items.js";
import { ACHIEVEMENTS } from "./content/achievements.js";
import { VIEWPORT_TEMPLATES } from "./content/viewportTemplates.js";
import { TUTORIAL_SCRIPTS } from "./content/tutorialScripts.js";

import { createScreenSystem } from "./systems/screenSystem.js";
import { createSceneSystem } from "./systems/sceneSystem.js";
import { createViewportSystem } from "./systems/viewportSystem.js";
import { createInventorySystem } from "./systems/inventorySystem.js";
import { createDialogueSystem } from "./systems/dialogueSystem.js";
import { createAchievementSystem } from "./systems/achievementSystem.js";
import { createEditorSystem } from "./systems/editorSystem.js";

import { createSceneRenderer } from "./renderers/sceneRenderer.js";
import { createViewportRenderer } from "./renderers/viewportRenderer.js";
import { createInventoryRenderer } from "./renderers/inventoryRenderer.js";
import { createDialogueRenderer } from "./renderers/dialogueRenderer.js";
import { createHudRenderer } from "./renderers/hudRenderer.js";
import { createEditorRenderer } from "./renderers/editorRenderer.js";
import { createTypingRenderer } from "./renderers/typingRenderer.js";

import { createTriggerSystem } from "./engine/triggerSystem.js";
import { createSaveLoad } from "./engine/saveLoad.js";

function getMount(id) {
  const node = document.getElementById(id);
  if (!node) {
    throw new Error(`Missing required mount node: #${id}`);
  }
  return node;
}

function createRuntime() {
  const mounts = {
    app: getMount("app"),
    scenePanel: getMount("scene-panel"),
    viewportPanel: getMount("viewport-panel"),
    dialoguePanel: getMount("dialogue-panel"),
    inventoryPanel: getMount("inventory-panel"),
    achievementsPanel: getMount("achievements-panel"),
    mapPanel: getMount("map-panel"),
    settingsPanel: getMount("settings-panel"),
    editorPanel: getMount("editor-panel")
  };

  const content = createContentRegistry({
    scenes: SCENES,
    dialogue: DIALOGUE,
    items: ITEMS,
    achievements: ACHIEVEMENTS,
    viewportTemplates: VIEWPORT_TEMPLATES,
    tutorialScripts: TUTORIAL_SCRIPTS
  });

  const state = createInitialState(content);
  const conditions = createConditionEvaluator();
  const saveLoad = createSaveLoad({ storageKey: "dungeon-prototype-save-v1" });

  const runtime = {
    mounts,
    content,
    state,
    conditions,
    saveLoad,
    systems: {},
    renderers: {},
    actionRunner: null,
    triggerSystem: null,
    render() {},
    emit() {}
  };

  runtime.systems.screen = createScreenSystem(runtime);
  runtime.systems.scene = createSceneSystem(runtime);
  runtime.systems.viewport = createViewportSystem(runtime);
  runtime.systems.inventory = createInventorySystem(runtime);
  runtime.systems.dialogue = createDialogueSystem(runtime);
  runtime.systems.achievements = createAchievementSystem(runtime);
  runtime.systems.editor = createEditorSystem(runtime);

  runtime.renderers.typing = createTypingRenderer(runtime);
  runtime.renderers.scene = createSceneRenderer(runtime);
  runtime.renderers.viewport = createViewportRenderer(runtime);
  runtime.renderers.inventory = createInventoryRenderer(runtime);
  runtime.renderers.dialogue = createDialogueRenderer(runtime);
  runtime.renderers.hud = createHudRenderer(runtime);
  runtime.renderers.editor = createEditorRenderer(runtime);

  runtime.actionRunner = createActionRunner(runtime);
  runtime.triggerSystem = createTriggerSystem(runtime);

  runtime.emit = function emit(eventName, payload = {}) {
    runtime.triggerSystem.handleEvent(eventName, payload);
  };

  runtime.render = function render() {
    runtime.renderers.scene.render();
    runtime.renderers.viewport.render();
    runtime.renderers.inventory.render();
    runtime.renderers.dialogue.render();
    runtime.renderers.hud.render();
    runtime.renderers.editor.render();
  };

  return runtime;
}

function wireGlobalDebug(runtime) {
  window.DungeonPrototype = runtime;
}

function wireModalControls(runtime) {
  const modal = document.getElementById("dungeon-prototype-modal");
  const closeButton = document.getElementById("dpCloseButton");
  const openButton = document.getElementById("openDungeonPrototype");

  if (!modal) return;

  let lastFocusedBeforeOpen = null;

  function openModal() {
    lastFocusedBeforeOpen = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    modal.classList.add("is-open");
    modal.removeAttribute("inert");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("dp-modal-open");
    document.body.classList.add("dp-modal-open");

    window.setTimeout(() => {
      const firstButton =
        modal.querySelector(".dp-toolbar-btn") ||
        modal.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");

      if (firstButton instanceof HTMLElement) {
        firstButton.focus();
      }
    }, 0);
  }

  function closeModal() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (window.DungeonPrototypeClosePanels) {
      window.DungeonPrototypeClosePanels();
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("inert", "");
    document.documentElement.classList.remove("dp-modal-open");
    document.body.classList.remove("dp-modal-open");

    if (lastFocusedBeforeOpen instanceof HTMLElement) {
      lastFocusedBeforeOpen.focus();
    } else if (openButton instanceof HTMLElement) {
      openButton.focus();
    }
  }

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
      closeModal();
    }
  });

  closeButton?.addEventListener("click", closeModal);
  openButton?.addEventListener("click", openModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  window.DungeonPrototypeModal = {
    open: openModal,
    close: closeModal
  };
}

function wireDungeonPanelToggles() {
  const buttons = document.querySelectorAll("[data-dp-panel-toggle]");
  const panels = document.querySelectorAll(".dp-overlay-panel");

  function closeAllPanels(exceptId = null) {
    panels.forEach((panel) => {
      if (exceptId && panel.id === exceptId) return;
      panel.hidden = true;
      panel.classList.remove("is-open");
    });

    buttons.forEach((button) => {
      const targetId = button.getAttribute("data-dp-panel-toggle");
      button.classList.toggle("is-active", Boolean(exceptId && targetId === exceptId));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-dp-panel-toggle");
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const isOpen = panel.classList.contains("is-open");
      closeAllPanels();

      if (!isOpen) {
        panel.hidden = false;
        panel.classList.add("is-open");
        button.classList.add("is-active");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllPanels();
    }
  });

  window.DungeonPrototypeClosePanels = closeAllPanels;
}

async function start() {
  const runtime = createRuntime();

  wireGlobalDebug(runtime);
  wireModalControls(runtime);
  wireDungeonPanelToggles();

  runtime.systems.screen.setActiveScreen("scene");
  await runtime.systems.scene.enterScene(runtime.state.currentSceneId);

  runtime.render();
  runtime.emit("game_started", { sceneId: runtime.state.currentSceneId });
}

start().catch((error) => {
  console.error("Failed to start dungeon prototype:", error);

  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = `
      <div style="padding:16px; color:#fff; background:#300; border:1px solid #933; font-family:system-ui,sans-serif;">
        <strong>Prototype failed to start.</strong>
        <pre style="white-space:pre-wrap; margin-top:12px;">${String(error?.stack || error)}</pre>
      </div>
    `;
  }
});