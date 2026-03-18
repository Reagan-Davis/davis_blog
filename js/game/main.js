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

const startupConfig = window.StartupDungeonConfig || {};
const INTRO_STORAGE_KEY = startupConfig.STORAGE_KEY || "rrr_site_notice_seen";
const DEBUG_ALWAYS_SHOW_INTRO = Boolean(startupConfig.DEBUG_ALWAYS_SHOW_INTRO);

function hasCompletedIntro() {
  try {
    return localStorage.getItem(INTRO_STORAGE_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function markIntroCompleted() {
  try {
    localStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch (error) {
    // ignore storage failures
  }
}

function clearIntroCompleted() {
  try {
    localStorage.removeItem(INTRO_STORAGE_KEY);
  } catch (error) {
    // ignore storage failures
  }
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

  function renderAchievements() {
    const current = state.achievements.stats.doorsUnlocked || 0;
    const target = 10;
    const percent = Math.max(0, Math.min(100, (current / target) * 100));

    if (dom.achievementsDoorsValue) {
      dom.achievementsDoorsValue.textContent = `${current}/${target}`;
    }

    if (dom.achievementsDoorsFill) {
      dom.achievementsDoorsFill.style.width = `${percent}%`;
    }
  }

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
    viewportSystem,
    content: CONTENT
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
        markIntroCompleted();
        dom.modal?.classList.remove("is-open");
        dom.modal?.setAttribute("aria-hidden", "true");
      }
    }
  });

  renderAchievements();

  dom.dialogueContinueBtn?.addEventListener("click", () => {
    const node = dialogueSystem.getActiveNode();
    if (!node?.continueAction) return;

    if (node.continueAction.type === "close_modal") {
      markIntroCompleted();
      dom.modal?.classList.remove("is-open");
      dom.modal?.setAttribute("aria-hidden", "true");
    }
  });

    const shouldShowIntro = DEBUG_ALWAYS_SHOW_INTRO || !hasCompletedIntro();

    if (shouldShowIntro) {
      dom.modal?.classList.add("is-open");
      dom.modal?.setAttribute("aria-hidden", "false");
      screenSystem.showScreen("intro");
      tutorialSystem.hideAll();
    } else {
      dom.modal?.classList.remove("is-open");
      dom.modal?.setAttribute("aria-hidden", "true");
    }

    dom.introContinueBtn?.addEventListener("click", () => {
      screenSystem.showScreen("scene");
      tutorialSystem.hideAll();
      sceneRenderer.renderCurrentScene();
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
      const selected = state.inventory.selectedItemId === "tutorial_key";

      if (selected) {
        inventorySystem.clearSelectedItem();
        dom.inventoryNote.textContent = "";
        dom.keyItem.classList.remove("is-selected");
        tutorialSystem.hideViewportHelp();
      } else {
        inventorySystem.setSelectedItem("tutorial_key");
        dom.inventoryNote.textContent = "Tutorial key selected.";
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

  dom.achievementsButton?.addEventListener("click", () => {
    const isHidden = dom.achievementsPanel?.hidden ?? true;

    if (dom.achievementsPanel) {
      dom.achievementsPanel.hidden = !isHidden;
    }

    dom.achievementsButton?.setAttribute("aria-expanded", String(isHidden));
  });

  dom.inventoryCloseBtn?.addEventListener("click", () => {
    if (dom.inventoryPanel) {
      dom.inventoryPanel.hidden = true;
    }
    dom.bagButton?.setAttribute("aria-expanded", "false");
    tutorialSystem.hideKeyHelp();
    tutorialSystem.hideViewportHelp();
  });

  dom.achievementsCloseBtn?.addEventListener("click", () => {
    if (dom.achievementsPanel) {
      dom.achievementsPanel.hidden = true;
    }
    dom.achievementsButton?.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (dom.inventoryPanel && !dom.inventoryPanel.hidden) {
        dom.inventoryPanel.hidden = true;
        dom.bagButton?.setAttribute("aria-expanded", "false");
      }

      if (dom.achievementsPanel && !dom.achievementsPanel.hidden) {
        dom.achievementsPanel.hidden = true;
        dom.achievementsButton?.setAttribute("aria-expanded", "false");
      }
    }
  });

  dragSystem.bindKeyDrag();
}

document.addEventListener("DOMContentLoaded", initGame);