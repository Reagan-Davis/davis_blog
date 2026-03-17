import { createInitialState } from "./core/state.js";
import { CONTENT } from "./core/content.js";

import { getDom } from "./ui/dom.js";
import { createScreenSystem } from "./systems/screenSystem.js";
import { createViewportSystem } from "./systems/viewportSystem.js";
import { createInventorySystem } from "./systems/inventorySystem.js";
import { createDialogueSystem } from "./systems/dialogueSystem.js";
import { createInteractionSystem } from "./systems/interactionSystem.js";

import { createSceneRenderer } from "./ui/sceneRenderer.js";
import { createDialogueRenderer } from "./ui/dialogueRenderer.js";

import { createTypePopupText } from "./ui/typingSystem.js";

import { createTutorialSystem } from "./systems/tutorialSystem.js";
import { createDragSystem } from "./systems/dragSystem.js";

function createTooltipUI(dom, state) {
  function clearTimer() {
    if (state.ui.tooltipTimer) {
      window.clearTimeout(state.ui.tooltipTimer);
      state.ui.tooltipTimer = null;
    }
  }

  return {
    show(text, { autoHideMs = 2200 } = {}) {
      if (!dom.objectTooltip) return;

      clearTimer();

      dom.objectTooltip.textContent = text;
      dom.objectTooltip.hidden = false;
      dom.objectTooltip.classList.add("is-visible");

      if (autoHideMs > 0) {
        state.ui.tooltipTimer = window.setTimeout(() => {
          dom.objectTooltip?.classList.remove("is-visible");
          if (dom.objectTooltip) {
            dom.objectTooltip.hidden = true;
          }
          state.ui.tooltipTimer = null;
        }, autoHideMs);
      }
    },

    hide() {
      if (!dom.objectTooltip) return;
      clearTimer();
      dom.objectTooltip.classList.remove("is-visible");
      dom.objectTooltip.hidden = true;
    }
  };
}

function initGame() {
  const dom = getDom();

  const required = [
    dom.modal,
    dom.introScreen,
    dom.sceneScreen,
    dom.dialogueScreen,
    dom.introContinueBtn,
    dom.sceneTitle,
    dom.sceneText,
    dom.dialogueTitle,
    dom.dialogueText,
    dom.dialogueChoices,
    dom.dialogueContinueBtn,
    dom.bagButton,
    dom.inventoryPanel,
    dom.keyItem
  ];

  if (required.some(el => !el)) {
    console.error("Startup dungeon DOM is incomplete.", dom);
    return;
  }

  const state = createInitialState();
  const tooltipUI = createTooltipUI(dom, state);
  const typePopupText = createTypePopupText();
  const tutorialSystem = createTutorialSystem({ state, dom });

  const screenSystem = createScreenSystem({ state, dom });
  const viewportSystem = createViewportSystem({
    state,
    content: CONTENT,
    dom
  });

  const inventorySystem = createInventorySystem({
    state,
    dom,
    viewportSystem
  });

  const dialogueSystem = createDialogueSystem({
    state,
    content: CONTENT
  });

  const sceneRenderer = createSceneRenderer({
    state,
    content: CONTENT,
    dom,
    viewportSystem,
    typePopupText,
    tutorialSystem
  });

  let dialogueRenderer;

  const interactionSystem = createInteractionSystem({
    state,
    dom,
    content: CONTENT,
    viewportSystem,
    inventorySystem,
    dialogueSystem,
    tooltipUI,
    screenSystem,
    tutorialSystem,
    sceneRenderer
  });

  const dragSystem = createDragSystem({
    state,
    dom,
    inventorySystem,
    viewportSystem,
    interactionSystem,
    sceneRenderer,
    tutorialSystem
  });

  dialogueRenderer = createDialogueRenderer({
    dom,
    dialogueSystem,
    typePopupText,
    onChoiceSelected: (choiceId) => {
      dialogueSystem.choose(choiceId);
      dialogueRenderer.renderActiveDialogue();
    },
    onContinue: (action) => {
      if (action?.type === "close_modal") {
        dom.modal?.classList.remove("is-open");
        dom.modal?.setAttribute("aria-hidden", "true");
      }
    }
  });

  dom.dialogueContinueBtn?.addEventListener("click", () => {
    const node = dialogueSystem.getActiveNode();
    if (!node?.continueAction) return;

    if (node.continueAction.type === "close_modal") {
      dom.modal?.classList.remove("is-open");
      dom.modal?.setAttribute("aria-hidden", "true");
    }
  });

  // Always show on page load for now.
  dom.modal?.classList.add("is-open");
  dom.modal?.setAttribute("aria-hidden", "false");

  screenSystem.showScreen("intro");

  tutorialSystem.hideAll();

  dom.introContinueBtn?.addEventListener("click", () => {
    screenSystem.showScreen("scene");
    tutorialSystem.hideAll();
    sceneRenderer.renderCurrentScene({ full: true });
  });

  dom.sceneProceedBtn?.addEventListener("click", () => {
    if (!state.world.unlockedObjects.gate) return;

    tutorialSystem.hideAll();
    dialogueSystem.startNode("intro_choice");
    screenSystem.showScreen("dialogue");
    dialogueRenderer.renderActiveDialogue();
  });

  document.querySelectorAll(".startup-viewport-object").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      const objectId = el.dataset.objectId;
      if (!objectId) return;

      interactionSystem.interactWithObject(objectId);

      if (state.ui.activeScreen === "dialogue") {
        dialogueRenderer.renderActiveDialogue();
      }
    });

    el.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      const objectId = el.dataset.objectId;
      if (!objectId) return;

      interactionSystem.interactWithObject(objectId);

      if (state.ui.activeScreen === "dialogue") {
        dialogueRenderer.renderActiveDialogue();
      } else {
        sceneRenderer.renderCurrentScene();
      }
    });
  });

  dom.keyItem?.addEventListener("click", () => {
    const selected = state.inventory.selectedItemId === "rusted_key";

    if (selected) {
      inventorySystem.clearSelectedItem();
      dom.inventoryNote.textContent = "";
      dom.keyItem.classList.remove("is-selected");
      tutorialSystem.hideViewportHelp();
    } else {
      inventorySystem.setSelectedItem("rusted_key");
      dom.inventoryNote.textContent = "Rusted key selected.";
      dom.keyItem.classList.add("is-selected");
      tutorialSystem.hideKeyHelp();
      tutorialSystem.hideTextHelp();
      tutorialSystem.hideBagHelp();
      tutorialSystem.showViewportHelp();
    }
  });

  dom.bagButton?.addEventListener("click", () => {
    const isHidden = dom.inventoryPanel?.hidden ?? true;

    if (dom.inventoryPanel) {
      dom.inventoryPanel.hidden = !isHidden;
    }

    dom.bagButton?.setAttribute("aria-expanded", String(isHidden));

    if (isHidden) {
      state.tutorial.hasClickedBag = true;
      tutorialSystem.hideBagHelp();
      tutorialSystem.hideTextHelp();
      tutorialSystem.hideAdvanceHelp();
      tutorialSystem.showKeyHelp();
    }
  });

  dom.inventoryCloseBtn?.addEventListener("click", () => {
    if (dom.inventoryPanel) {
      dom.inventoryPanel.hidden = true;
    }
    dom.bagButton?.setAttribute("aria-expanded", "false");
    tutorialSystem.hideKeyHelp();
    tutorialSystem.hideViewportHelp();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dom.inventoryPanel && !dom.inventoryPanel.hidden) {
      dom.inventoryPanel.hidden = true;
      dom.bagButton?.setAttribute("aria-expanded", "false");
    }
  });

  dragSystem.bindKeyDrag();
}

document.addEventListener("DOMContentLoaded", initGame);