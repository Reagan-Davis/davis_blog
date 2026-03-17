(function () {
    const {
        STORAGE_KEY,
        DEBUG_ALWAYS_SHOW_INTRO,
        LOCK_SVG_MARKUP,
        DUNGEON_ENTRY_TITLE,
        DUNGEON_LOCKED_TEXT,
        DUNGEON_OPEN_TEXT,
        FINAL_STEP_TITLE,
        FINAL_STEP_TEXT_BEFORE_CHOICE,
        FINAL_STEP_TEXT_AFTER_YES,
        FINAL_STEP_TEXT_AFTER_NO
    } = window.StartupDungeonConfig || {};

    const dom = {
        modal: document.getElementById("startupModal"),
        backdrop: document.getElementById("startupModal")?.querySelector(".startup-modal__backdrop"),
      
        step1: document.getElementById("startupModalStep1"),
        step2: document.getElementById("startupModalStep2"),
        step3: document.getElementById("startupModalStep3"),
      
        continueBtn: document.getElementById("startupModalContinue"),
        proceedBtn: document.getElementById("startupModalEnterSite"),
        finalContinueBtn: document.getElementById("startupModalFinalContinue"),
      
        bagButton: document.getElementById("startupBagButton"),
        inventoryPanel: document.getElementById("startupInventoryPanel"),
        inventoryNote: document.getElementById("startupInventoryNote"),
        keyItem: document.getElementById("startupKeyItem"),
        gateScene: document.getElementById("startupGateScene"),
        gateObject: document.getElementById("startupObjectGate"),
        advanceObject: document.getElementById("startupObjectAdvance"),
        objectTooltip: document.getElementById("startupObjectTooltip"),
        inventoryCloseBtn: document.getElementById("startupInventoryClose"),
      
        dungeonTitle: document.getElementById("startupDungeonTitle"),
        dungeonText: document.getElementById("startupDungeonText"),
        finalTitle: document.getElementById("startupFinalTitle"),
        finalText: document.getElementById("startupFinalText"),
        finalChoice: document.getElementById("startupFinalChoice"),
        finalYesBtn: document.getElementById("startupFinalYes"),
        finalNoBtn: document.getElementById("startupFinalNo"),
        finalFollowup: document.getElementById("startupFinalFollowup"),
      
        bagHelp: document.getElementById("startupBagHelp"),
        keyHelp: document.getElementById("startupKeyHelp"),
        viewportHelp: document.getElementById("startupViewportHelp"),
        textHelp: document.getElementById("startupTextHelp"),
        advanceHelp: document.getElementById("startupAdvanceHelp")
    };

    const {
        modal,
        backdrop,
        step1,
        step2,
        step3,
        continueBtn,
        proceedBtn,
        finalContinueBtn,
        bagButton,
        inventoryPanel,
        inventoryNote,
        keyItem,
        gateScene,
        gateObject,
        advanceObject,
        objectTooltip,
        inventoryCloseBtn,
        dungeonTitle,
        dungeonText,
        finalTitle,
        finalText,
        finalChoice,
        finalYesBtn,
        finalNoBtn,
        finalFollowup,
        bagHelp,
        keyHelp,
        viewportHelp,
        textHelp,
        advanceHelp
    } = dom;

    if (
        !modal || !step1 || !step2 || !step3 || !continueBtn || !proceedBtn || !finalContinueBtn ||
        !bagButton || !inventoryPanel || !inventoryNote || !keyItem ||
        !gateScene || !gateObject || !advanceObject || !objectTooltip ||
        !dungeonTitle || !dungeonText || !finalTitle || !finalText ||
        !finalChoice || !finalYesBtn || !finalNoBtn || !finalFollowup ||
        !inventoryCloseBtn || !bagHelp || !keyHelp || !viewportHelp || !textHelp || !advanceHelp
      ) return;

      const hasSeenModal = !DEBUG_ALWAYS_SHOW_INTRO && localStorage.getItem(STORAGE_KEY) === "true";

      const state = {
        lockedScrollY: 0,
      
        gateUnlocked: false,
        gateAnimationPlayed: false,
         bagHintTimer: null,
        textHintTimer: null,
        bagReturnTimer: null,
        advanceHintTimer: null,
        objectTooltipTimer: null,
         hasClickedBag: false,
        hasShownViewportHint: false,
        hasShownTextHint: false,
        hasShownBagHint: false,
        hasShownKeyHint: false,
        hasShownAdvanceHint: false,
        hasClickedGateOnce: false,
        hasShownGateLock: false,
         selectedInventoryItem: null
      };

    const viewportObjects = {
      gate: {
        id: "gate",
        element: gateObject,
        description: "A Rusted Gate",
        accepts: ["key"],
        enabled: true
      },
      advance: {
        id: "advance",
        element: advanceObject,
        description: "Move Forward",
        accepts: [],
        enabled: false
      }
    };

    function clearObjectHighlights() {
      Object.values(viewportObjects).forEach(obj => {
        obj.element.classList.remove(
          "is-active",
          "is-highlighted",
          "is-valid-target",
          "is-invalid-target"
        );
      });
    }

    function showObjectTooltip(text) {
      if (!objectTooltip) return;

      clearTimeout(state.objectTooltipTimer);
      objectTooltip.textContent = text;
      objectTooltip.hidden = false;

      requestAnimationFrame(() => {
        objectTooltip.classList.add("is-visible");
      });

      state.objectTooltipTimer = setTimeout(() => {
        hideObjectTooltip();
      }, 4800);
    }

    function hideObjectTooltip() {
      if (!objectTooltip) return;

      clearTimeout(state.objectTooltipTimer);
      objectTooltip.classList.remove("is-visible");

      setTimeout(() => {
        if (!objectTooltip.classList.contains("is-visible")) {
          objectTooltip.hidden = true;
        }
      }, 180);
    }

    function setViewportObjectState(objectId, stateName, enabled) {
      const obj = viewportObjects[objectId];
      if (!obj) return;
      obj.element.classList.toggle(stateName, !!enabled);
    }

    function setViewportObjectEnabled(objectId, enabled) {
      const obj = viewportObjects[objectId];
      if (!obj) return;

      obj.enabled = !!enabled;
      obj.element.hidden = !enabled;
      obj.element.setAttribute("aria-hidden", String(!enabled));
      obj.element.tabIndex = enabled ? 0 : -1;
      obj.element.classList.toggle("is-available", !!enabled);
    }

    function isViewportObjectEnabled(objectId) {
      const obj = viewportObjects[objectId];
      return !!obj?.enabled;
    }

    function getViewportObjectFromPoint(x, y) {
      const el = document.elementFromPoint(x, y)?.closest(".startup-viewport-object");
      if (!el) return null;

      const obj = viewportObjects[el.dataset.objectId] || null;
      if (!obj || !obj.enabled) return null;

      return obj;
    }

    function objectAcceptsSelectedItem(objectId) {
      const obj = viewportObjects[objectId];
      if (!obj || !state.selectedInventoryItem) return false;
      return Array.isArray(obj.accepts) && obj.accepts.includes(state.selectedInventoryItem);
    }

    function activateViewportObject(objectId) {
      const obj = viewportObjects[objectId];
      if (!obj || !obj.enabled) return;

      clearObjectHighlights();
      setViewportObjectState(objectId, "is-active", true);

      if (objectId === "advance") {
        if (!state.gateUnlocked || !state.gateAnimationPlayed || step2.classList.contains("is-opening")) {
          return;
        }

        showObjectTooltip(obj.description);
        showStep(3);
        return;
      }

      if (objectId === "gate" && state.gateUnlocked) {
        return;
      }

      if (state.selectedInventoryItem && objectAcceptsSelectedItem(objectId)) {
        if (objectId === "gate") {
          useSelectedItemOnGate();
        }
        return;
      }

      if (objectId === "gate") {
        ensureGateLockVisible();

        if (!state.hasClickedGateOnce) {
          state.hasClickedGateOnce = true;
          showTextTutorialHintThenBag();
        }
      }

      showObjectTooltip(obj.description);

      inventoryNote.textContent = state.selectedInventoryItem
        ? "That won't work here."
        : "You see " + obj.description + ".";
    }

    if (!hasSeenModal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      state.lockedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.classList.add("modal-lock");
      document.body.style.top = `-${state.lockedScrollY}px`;
      step1.classList.add("is-active");
      step2.classList.remove("is-active");
      step3.classList.remove("is-active");
    }

    function hideFinalChoice() {
        finalChoice.hidden = true;
        finalYesBtn.disabled = true;
        finalNoBtn.disabled = true;
      }
      
      function showFinalChoice() {
        finalChoice.hidden = false;
        finalYesBtn.disabled = false;
        finalNoBtn.disabled = false;
      }
      
      function continueFinalStepAfterChoice(choice) {
        hideFinalChoice();
      
        const nextText = choice === "yes"
          ? FINAL_STEP_TEXT_AFTER_YES
          : FINAL_STEP_TEXT_AFTER_NO;
      
        typePopupText(finalFollowup, nextText, {
          speed: 22,
          startDelay: 120,
          onComplete: () => {
            finalContinueBtn.hidden = false;
          }
        });
      }

    function showStep(stepNumber) {
    hideObjectTooltip();

      step1.classList.toggle("is-active", stepNumber === 1);
      step2.classList.toggle("is-active", stepNumber === 2);
      step3.classList.toggle("is-active", stepNumber === 3);

      if (stepNumber === 2) {
        dungeonTitle.innerHTML = "";
        dungeonText.innerHTML = "";

        setViewportObjectEnabled("gate", !state.gateUnlocked);
        setViewportObjectEnabled("advance", state.gateUnlocked && state.gateAnimationPlayed);

        typePopupText(dungeonTitle, DUNGEON_ENTRY_TITLE, {
          speed: 30,
          startDelay: 120,
          onComplete: () => {
            typePopupText(dungeonText, DUNGEON_LOCKED_TEXT, {
              speed: 24,
              startDelay: 180
            });
          }
        });

        if (!state.gateUnlocked) {
          hideHelpPopup(advanceHelp);
        }

        scheduleBagHint();
        return;
      }

      if (stepNumber === 3) {
        hideAllTutorialHints();
        setInventoryOpen(false);
        clearselectedInventoryItem();
        inventoryNote.textContent = "";
      
        finalTitle.innerHTML = "";
        finalText.innerHTML = "";
        finalFollowup.innerHTML = "";
      
        hideFinalChoice();
        finalContinueBtn.hidden = true;
      
        typePopupText(finalTitle, FINAL_STEP_TITLE, {
          speed: 30,
          startDelay: 100,
          onComplete: () => {
            typePopupText(finalText, FINAL_STEP_TEXT_BEFORE_CHOICE, {
              speed: 22,
              startDelay: 140,
              onComplete: () => {
                showFinalChoice();
              }
            });
          }
        });
      
        return;
      }

      hideAllTutorialHints();
    }

    function closeModal() {
      hideObjectTooltip();
      hideAllTutorialHints();
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-lock");
      document.body.style.top = "";
      window.scrollTo(0, state.lockedScrollY);
      localStorage.setItem(STORAGE_KEY, "true");
    }

    [gateObject, advanceObject].forEach((el) => {
      el?.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          const objectId = el.dataset.objectId;
          activateViewportObject(objectId);
        }
      });
    });

    function setInventoryOpen(isOpen) {
      inventoryPanel.hidden = !isOpen;
      bagButton.setAttribute("aria-expanded", String(isOpen));
    }

    function clearBagHintTimer() {
      if (state.bagHintTimer) {
        clearTimeout(state.bagHintTimer);
        state.bagHintTimer = null;
      }
    }

    function showHelpPopup(el) {
      if (!el) return;
      el.hidden = false;
      requestAnimationFrame(() => {
        el.classList.add("is-visible");
      });
    }

    function hideHelpPopup(el) {
      if (!el) return;
      el.classList.remove("is-visible");
      setTimeout(() => {
        if (!el.classList.contains("is-visible")) {
          el.hidden = true;
        }
      }, 220);
    }

    function scheduleBagHint() {
      clearBagHintTimer();
      hideHelpPopup(bagHelp);
      hideHelpPopup(keyHelp);
      hideHelpPopup(viewportHelp);
      hideHelpPopup(textHelp);
      hideHelpPopup(advanceHelp);

      if (state.gateUnlocked) return;
      if (!step2.classList.contains("is-active")) return;

      if (!state.hasShownViewportHint && !state.hasClickedGateOnce) {
        state.bagHintTimer = setTimeout(() => {
          if (
            !state.gateUnlocked &&
            step2.classList.contains("is-active") &&
            !state.hasClickedGateOnce &&
            !state.hasShownViewportHint
          ) {
            state.hasShownViewportHint = true;
            showHelpPopup(viewportHelp);
          }
        }, 6000);
        return;
      }

      if (!state.hasShownBagHint && !state.hasClickedBag) {
        state.bagHintTimer = setTimeout(() => {
          if (
            !state.hasClickedBag &&
            !state.gateUnlocked &&
            step2.classList.contains("is-active")
          ) {
            state.hasShownBagHint = true;
            showHelpPopup(bagHelp);
          }
        }, 3000);
      }
    }

    function showKeyTutorialHint() {
      hideHelpPopup(bagHelp);

      if (state.hasShownKeyHint || state.gateUnlocked) return;

      state.hasShownKeyHint = true;
      showHelpPopup(keyHelp);
    }

    function showTextTutorialHintThenBag() {
      if (state.hasShownTextHint || state.gateUnlocked) return;

      state.hasShownTextHint = true;

      hideHelpPopup(viewportHelp);
      hideHelpPopup(bagHelp);

      showHelpPopup(textHelp);

      state.textHintTimer = setTimeout(() => {
        hideHelpPopup(textHelp);

        state.bagReturnTimer = setTimeout(() => {
          if (
            !state.gateUnlocked &&
            !state.hasClickedBag &&
            step2.classList.contains("is-active")
          ) {
            state.hasShownBagHint = true;
            showHelpPopup(bagHelp);
          }
        }, 2400);
      }, 5000);
    }

    function showAdvanceTutorialHint() {
      if (state.hasShownAdvanceHint) return;
      if (!state.gateUnlocked || !state.gateAnimationPlayed) return;
      if (!step2.classList.contains("is-active")) return;

      state.hasShownAdvanceHint = true;

      if (state.advanceHintTimer) {
        clearTimeout(state.advanceHintTimer);
      }

      state.advanceHintTimer = setTimeout(() => {
        if (step2.classList.contains("is-active") && isViewportObjectEnabled("advance")) {
          showHelpPopup(advanceHelp);
        }
      }, 900);
    }

    function hideAllTutorialHints() {
      clearBagHintTimer();

      if (state.textHintTimer) {
        clearTimeout(state.textHintTimer);
        state.textHintTimer = null;
      }

      if (state.bagReturnTimer) {
        clearTimeout(state.bagReturnTimer);
        state.bagReturnTimer = null;
      }

      if (state.advanceHintTimer) {
        clearTimeout(state.advanceHintTimer);
        state.advanceHintTimer = null;
      }

      hideHelpPopup(bagHelp);
      hideHelpPopup(keyHelp);
      hideHelpPopup(viewportHelp);
      hideHelpPopup(textHelp);
      hideHelpPopup(advanceHelp);
    }

    function ensureGateLockVisible() {
      if (state.hasShownGateLock || state.gateUnlocked) return;

      const gateSvg = gateScene.querySelector(".startup-gate-svg");
      if (!gateSvg) return;

      gateSvg.insertAdjacentHTML("beforeend", LOCK_SVG_MARKUP);
      state.hasShownGateLock = true;
    }

    function setselectedInventoryItem(itemName) {
      state.selectedInventoryItem = itemName;

      keyItem.classList.toggle("is-selected", itemName === "key");

      clearObjectHighlights();

      if (itemName === "key" && !state.gateUnlocked) {
        setViewportObjectState("gate", "is-highlighted", true);
        inventoryNote.textContent = "Rusted key selected.";
        hideHelpPopup(keyHelp);
      }
    }

    function clearselectedInventoryItem() {
      state.selectedInventoryItem = null;
      keyItem.classList.remove("is-selected");
      clearObjectHighlights();
    }

    function useSelectedItemOnGate() {
      if (state.gateUnlocked) return false;
      if (state.selectedInventoryItem !== "key") return false;
      if (keyItem.disabled) return false;

      consumeKeyItem();
      clearselectedInventoryItem();
      unlockGate();
      return true;
    }

    function playGateAnimation() {
      if (step2.classList.contains("is-opening") || step2.classList.contains("is-opened")) return;

      step2.classList.add("is-opening");

      setViewportObjectEnabled("gate", false);
      setViewportObjectEnabled("advance", false);

      setTimeout(() => {
        step2.classList.remove("is-opening");
        step2.classList.add("is-opened");
        state.gateAnimationPlayed = true;
        proceedBtn.disabled = false;
        proceedBtn.textContent = "Proceed";
        inventoryNote.textContent = "";

        setViewportObjectEnabled("advance", true);
        showAdvanceTutorialHint();

        typePopupText(dungeonText, DUNGEON_OPEN_TEXT, {
          speed: 24,
          startDelay: 80
        });
      }, 1100);
    }

    function unlockGate() {
      if (state.gateUnlocked) return;

      state.gateUnlocked = true;
      hideAllTutorialHints();
      gateScene.dataset.locked = "false";
      clearObjectHighlights();
      gateObject.setAttribute("aria-label", "Open gate");
      hideObjectTooltip();

      inventoryNote.textContent = "The key turns in the lock.";
      proceedBtn.textContent = "Opening...";
      proceedBtn.disabled = true;

      setInventoryOpen(false);
      playGateAnimation();
    }

    continueBtn.addEventListener("click", () => {
      showStep(2);
    });

    bagButton.addEventListener("click", () => {
      const isExpanded = bagButton.getAttribute("aria-expanded") === "true";
      const willOpen = !isExpanded;

      state.hasClickedBag = true;
      clearBagHintTimer();
      hideHelpPopup(bagHelp);
      hideHelpPopup(viewportHelp);

      setInventoryOpen(willOpen);

      if (willOpen && !state.gateUnlocked) {
        showKeyTutorialHint();
      }
    });

    inventoryCloseBtn?.addEventListener("click", () => {
      setInventoryOpen(false);
      clearselectedInventoryItem();
      inventoryNote.textContent = "";
    });

    gateObject.addEventListener("click", (event) => {
      event.stopPropagation();
      hideHelpPopup(viewportHelp);
      activateViewportObject("gate");
    });

    advanceObject.addEventListener("click", (event) => {
      event.stopPropagation();
      hideHelpPopup(advanceHelp);
      activateViewportObject("advance");
    });

    function pointInsideRect(x, y, rect) {
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }

    function makeDragGhost() {
      const ghost = document.createElement("div");
      ghost.className = "startup-drag-ghost";
      ghost.innerHTML = `<span class="startup-key-icon" aria-hidden="true">🗝</span>`;
      document.body.appendChild(ghost);
      return ghost;
    }

    function setGhostPosition(ghost, x, y) {
      ghost.style.left = `${x}px`;
      ghost.style.top = `${y}px`;
    }

    function removeGhost(ghost) {
      if (ghost && ghost.parentNode) {
        ghost.parentNode.removeChild(ghost);
      }
    }

    function markObjectDragState(objectId, over, valid) {
      const obj = viewportObjects[objectId];
      if (!obj) return;

      obj.element.classList.remove("is-valid-target", "is-invalid-target");
      if (!over) return;

      obj.element.classList.add(valid ? "is-valid-target" : "is-invalid-target");
    }

    function clearAllObjectDragStates() {
      Object.values(viewportObjects).forEach(obj => {
        obj.element.classList.remove("is-valid-target", "is-invalid-target");
      });
    }

    function consumeKeyItem() {
      clearselectedInventoryItem();
      keyItem.classList.add("is-hidden");
      keyItem.disabled = true;
      keyItem.setAttribute("aria-hidden", "true");
      keyItem.tabIndex = -1;
    }

    function attachPointerKeyDrag() {
      let pointerId = null;
      let ghost = null;
      let dragging = false;
      let dragReady = false;
      let startX = 0;
      let startY = 0;
      let currentHoverObjectId = null;

      const DRAG_THRESHOLD = 8;

      keyItem.addEventListener("pointerdown", (event) => {
        if (state.gateUnlocked || keyItem.disabled) return;

        hideHelpPopup(keyHelp);
        hideObjectTooltip();

        pointerId = event.pointerId;
        dragReady = true;
        dragging = false;
        startX = event.clientX;
        startY = event.clientY;
        currentHoverObjectId = null;

        keyItem.setPointerCapture(pointerId);
        event.preventDefault();
      });

      keyItem.addEventListener("pointermove", (event) => {
        if (!dragReady || event.pointerId !== pointerId) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        const distance = Math.hypot(dx, dy);

        if (!dragging && distance >= DRAG_THRESHOLD) {
          dragging = true;

          clearselectedInventoryItem();

          ghost = makeDragGhost();
          setGhostPosition(ghost, event.clientX, event.clientY);

          keyItem.classList.add("dragging");
          clearAllObjectDragStates();
          inventoryNote.textContent = "";
        }

        if (!dragging || !ghost) return;

        setGhostPosition(ghost, event.clientX, event.clientY);

        const hoveredObject = getViewportObjectFromPoint(event.clientX, event.clientY);
        currentHoverObjectId = hoveredObject?.id || null;

        clearAllObjectDragStates();

        if (hoveredObject) {
          const valid = Array.isArray(hoveredObject.accepts) && hoveredObject.accepts.includes("key");
          markObjectDragState(hoveredObject.id, true, valid);
        }

        event.preventDefault();
      });

      function endPointerDrag(event) {
        if (!dragReady || event.pointerId !== pointerId) return;

        if (dragging) {
          const droppedObject = getViewportObjectFromPoint(event.clientX, event.clientY);

          keyItem.classList.remove("dragging");
          removeGhost(ghost);
          ghost = null;

          if (droppedObject?.id === "gate" && !state.gateUnlocked) {
            consumeKeyItem();
            clearAllObjectDragStates();
            unlockGate();
          } else {
            clearAllObjectDragStates();
            if (!state.gateUnlocked) {
              inventoryNote.textContent = "";
            }
          }
        } else {
          if (state.selectedInventoryItem === "key") {
            clearselectedInventoryItem();
            inventoryNote.textContent = "";
          } else {
            setselectedInventoryItem("key");
          }
        }

        try {
          keyItem.releasePointerCapture(pointerId);
        } catch (_) {}

        dragging = false;
        dragReady = false;
        pointerId = null;
        currentHoverObjectId = null;
        event.preventDefault();
      }

      keyItem.addEventListener("pointerup", endPointerDrag);
      keyItem.addEventListener("pointercancel", endPointerDrag);
    }

    attachPointerKeyDrag();

    proceedBtn.addEventListener("click", () => {
      if (!state.gateUnlocked) {
        ensureGateLockVisible();
        proceedBtn.textContent = "The Gate Appears Locked";
        inventoryNote.textContent = "The gate is locked.";
        return;
      }

      if (!state.gateAnimationPlayed || step2.classList.contains("is-opening")) {
        return;
      }

      showStep(3);
    });

    finalYesBtn.addEventListener("click", () => {
        continueFinalStepAfterChoice("yes");
      });
      
      finalNoBtn.addEventListener("click", () => {
        continueFinalStepAfterChoice("no");
      });
      
      finalContinueBtn.addEventListener("click", () => {
        closeModal();
      });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) return;

      if (event.key === "Escape" && !inventoryPanel.hidden) {
        setInventoryOpen(false);
      }
    });
  })();