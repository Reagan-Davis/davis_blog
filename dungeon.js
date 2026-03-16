(function () {
    const STORAGE_KEY = "rrr_site_notice_seen";
    const DEBUG_ALWAYS_SHOW_INTRO = true;

    const modal = document.getElementById("startupModal");
    const backdrop = modal?.querySelector(".startup-modal__backdrop");

    const step1 = document.getElementById("startupModalStep1");
    const step2 = document.getElementById("startupModalStep2");
    const step3 = document.getElementById("startupModalStep3");

    const continueBtn = document.getElementById("startupModalContinue");
    const proceedBtn = document.getElementById("startupModalEnterSite");
    const finalContinueBtn = document.getElementById("startupModalFinalContinue");

    const bagButton = document.getElementById("startupBagButton");
    const inventoryPanel = document.getElementById("startupInventoryPanel");
    const inventoryNote = document.getElementById("startupInventoryNote");
    const keyItem = document.getElementById("startupKeyItem");
    const gateScene = document.getElementById("startupGateScene");
    const gateObject = document.getElementById("startupObjectGate");
    const advanceObject = document.getElementById("startupObjectAdvance");
    const objectTooltip = document.getElementById("startupObjectTooltip");
    const inventoryCloseBtn = document.getElementById("startupInventoryClose");

    const dungeonTitle = document.getElementById("startupDungeonTitle");
    const dungeonText = document.getElementById("startupDungeonText");
    const finalTitle = document.getElementById("startupFinalTitle");
    const finalText = document.getElementById("startupFinalText");
    const finalChoice = document.getElementById("startupFinalChoice");
    const finalYesBtn = document.getElementById("startupFinalYes");
    const finalNoBtn = document.getElementById("startupFinalNo");
    const finalFollowup = document.getElementById("startupFinalFollowup");
    
    const bagHelp = document.getElementById("startupBagHelp");
    const keyHelp = document.getElementById("startupKeyHelp");
    const viewportHelp = document.getElementById("startupViewportHelp");
    const textHelp = document.getElementById("startupTextHelp");
    const advanceHelp = document.getElementById("startupAdvanceHelp");

    const LOCK_SVG_MARKUP = `
      <g class="startup-gate-lock" id="startupGeneratedLock" transform="translate(320 250)">
        <rect x="-30" y="-10" width="60" height="70" rx="10" fill="#51463a" stroke="#9f835e" stroke-width="4"/>
        <path
          d="M-14 -10 L-14 -26 Q-14 -48 0 -48 Q14 -48 14 -26 L14 -10"
          fill="none"
          stroke="#b69467"
          stroke-width="8"
          stroke-linecap="round"
        />
        <circle cx="0" cy="18" r="8" fill="#b69467"/>
        <rect x="-3" y="18" width="6" height="20" rx="3" fill="#b69467"/>
      </g>
    `;

    const DUNGEON_ENTRY_TITLE = "<em>You enter the dungeon.</em>";

    const DUNGEON_LOCKED_TEXT = `
      You are standing in a narrow stone corridor.<br>
      A rusted gate lies before you.
    `;

    const DUNGEON_OPEN_TEXT = `
      The rusted gate swings open, clanging against the stone facings on either side.<br>
      The path beyond is dark, save for the faint glow of a torch.
    `;

    const FINAL_STEP_TITLE = "<em></em>";

    const FINAL_STEP_TEXT_BEFORE_CHOICE = `
        <em>As you make your way down the corridor...</em> [[pause=2150]] <br><br>
        Heh. [[pause=1400]] <br><br>
        Did I make you think I was going to force you to play through a game to navigate this site?
    `;
    
    const FINAL_STEP_TEXT_AFTER_YES = `
        Okay, yeah, you got me. That would be incredibly on-brand for me. [[pause=1200]] <br><br>
        Maybe I will commit to the bit harder next time.
    `;
    
    const FINAL_STEP_TEXT_AFTER_NO = `
        Really? Then I clearly need to lean harder into the bit. [[pause=1200]] <br><br>
        It will get there someday.
    `;

    if (
        !modal || !step1 || !step2 || !step3 || !continueBtn || !proceedBtn || !finalContinueBtn ||
        !bagButton || !inventoryPanel || !inventoryNote || !keyItem ||
        !gateScene || !gateObject || !advanceObject || !objectTooltip ||
        !dungeonTitle || !dungeonText || !finalTitle || !finalText ||
        !finalChoice || !finalYesBtn || !finalNoBtn || !finalFollowup ||
        !inventoryCloseBtn || !bagHelp || !keyHelp || !viewportHelp || !textHelp || !advanceHelp
      ) return;

    const hasSeenModal = !DEBUG_ALWAYS_SHOW_INTRO && localStorage.getItem(STORAGE_KEY) === "true";

    let gateUnlocked = false;
    let gateAnimationPlayed = false;
    let bagHintTimer = null;
    let textHintTimer = null;
    let bagReturnTimer = null;
    let advanceHintTimer = null;

    let hasClickedBag = false;
    let hasShownViewportHint = false;
    let hasShownTextHint = false;
    let hasShownBagHint = false;
    let hasShownKeyHint = false;
    let hasShownAdvanceHint = false;
    let hasClickedGateOnce = false;
    let hasShownGateLock = false;
    let selectedInventoryItem = null;

    let objectTooltipTimer = null;

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

      clearTimeout(objectTooltipTimer);
      objectTooltip.textContent = text;
      objectTooltip.hidden = false;

      requestAnimationFrame(() => {
        objectTooltip.classList.add("is-visible");
      });

      objectTooltipTimer = setTimeout(() => {
        hideObjectTooltip();
      }, 4800);
    }

    function hideObjectTooltip() {
      if (!objectTooltip) return;

      clearTimeout(objectTooltipTimer);
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
      if (!obj || !selectedInventoryItem) return false;
      return Array.isArray(obj.accepts) && obj.accepts.includes(selectedInventoryItem);
    }

    function activateViewportObject(objectId) {
      const obj = viewportObjects[objectId];
      if (!obj || !obj.enabled) return;

      clearObjectHighlights();
      setViewportObjectState(objectId, "is-active", true);

      if (objectId === "advance") {
        if (!gateUnlocked || !gateAnimationPlayed || step2.classList.contains("is-opening")) {
          return;
        }

        showObjectTooltip(obj.description);
        showStep(3);
        return;
      }

      if (objectId === "gate" && gateUnlocked) {
        return;
      }

      if (selectedInventoryItem && objectAcceptsSelectedItem(objectId)) {
        if (objectId === "gate") {
          useSelectedItemOnGate();
        }
        return;
      }

      if (objectId === "gate") {
        ensureGateLockVisible();

        if (!hasClickedGateOnce) {
          hasClickedGateOnce = true;
          showTextTutorialHintThenBag();
        }
      }

      showObjectTooltip(obj.description);

      inventoryNote.textContent = selectedInventoryItem
        ? "That won't work here."
        : "You see " + obj.description + ".";
    }

    if (!hasSeenModal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.classList.add("modal-lock");
      document.body.style.top = `-${lockedScrollY}px`;
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

        setViewportObjectEnabled("gate", !gateUnlocked);
        setViewportObjectEnabled("advance", gateUnlocked && gateAnimationPlayed);

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

        if (!gateUnlocked) {
          hideHelpPopup(advanceHelp);
        }

        scheduleBagHint();
        return;
      }

      if (stepNumber === 3) {
        hideAllTutorialHints();
        setInventoryOpen(false);
        clearSelectedInventoryItem();
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
      window.scrollTo(0, lockedScrollY);
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
      if (bagHintTimer) {
        clearTimeout(bagHintTimer);
        bagHintTimer = null;
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

      if (gateUnlocked) return;
      if (!step2.classList.contains("is-active")) return;

      if (!hasShownViewportHint && !hasClickedGateOnce) {
        bagHintTimer = setTimeout(() => {
          if (
            !gateUnlocked &&
            step2.classList.contains("is-active") &&
            !hasClickedGateOnce &&
            !hasShownViewportHint
          ) {
            hasShownViewportHint = true;
            showHelpPopup(viewportHelp);
          }
        }, 6000);
        return;
      }

      if (!hasShownBagHint && !hasClickedBag) {
        bagHintTimer = setTimeout(() => {
          if (
            !hasClickedBag &&
            !gateUnlocked &&
            step2.classList.contains("is-active")
          ) {
            hasShownBagHint = true;
            showHelpPopup(bagHelp);
          }
        }, 3000);
      }
    }

    function showKeyTutorialHint() {
      hideHelpPopup(bagHelp);

      if (hasShownKeyHint || gateUnlocked) return;

      hasShownKeyHint = true;
      showHelpPopup(keyHelp);
    }

    function showTextTutorialHintThenBag() {
      if (hasShownTextHint || gateUnlocked) return;

      hasShownTextHint = true;

      hideHelpPopup(viewportHelp);
      hideHelpPopup(bagHelp);

      showHelpPopup(textHelp);

      textHintTimer = setTimeout(() => {
        hideHelpPopup(textHelp);

        bagReturnTimer = setTimeout(() => {
          if (
            !gateUnlocked &&
            !hasClickedBag &&
            step2.classList.contains("is-active")
          ) {
            hasShownBagHint = true;
            showHelpPopup(bagHelp);
          }
        }, 2400);
      }, 5000);
    }

    function showAdvanceTutorialHint() {
      if (hasShownAdvanceHint) return;
      if (!gateUnlocked || !gateAnimationPlayed) return;
      if (!step2.classList.contains("is-active")) return;

      hasShownAdvanceHint = true;

      if (advanceHintTimer) {
        clearTimeout(advanceHintTimer);
      }

      advanceHintTimer = setTimeout(() => {
        if (step2.classList.contains("is-active") && isViewportObjectEnabled("advance")) {
          showHelpPopup(advanceHelp);
        }
      }, 900);
    }

    function hideAllTutorialHints() {
      clearBagHintTimer();

      if (textHintTimer) {
        clearTimeout(textHintTimer);
        textHintTimer = null;
      }

      if (bagReturnTimer) {
        clearTimeout(bagReturnTimer);
        bagReturnTimer = null;
      }

      if (advanceHintTimer) {
        clearTimeout(advanceHintTimer);
        advanceHintTimer = null;
      }

      hideHelpPopup(bagHelp);
      hideHelpPopup(keyHelp);
      hideHelpPopup(viewportHelp);
      hideHelpPopup(textHelp);
      hideHelpPopup(advanceHelp);
    }

    function ensureGateLockVisible() {
      if (hasShownGateLock || gateUnlocked) return;

      const gateSvg = gateScene.querySelector(".startup-gate-svg");
      if (!gateSvg) return;

      gateSvg.insertAdjacentHTML("beforeend", LOCK_SVG_MARKUP);
      hasShownGateLock = true;
    }

    function setSelectedInventoryItem(itemName) {
      selectedInventoryItem = itemName;

      keyItem.classList.toggle("is-selected", itemName === "key");

      clearObjectHighlights();

      if (itemName === "key" && !gateUnlocked) {
        setViewportObjectState("gate", "is-highlighted", true);
        inventoryNote.textContent = "Rusted key selected.";
        hideHelpPopup(keyHelp);
      }
    }

    function clearSelectedInventoryItem() {
      selectedInventoryItem = null;
      keyItem.classList.remove("is-selected");
      clearObjectHighlights();
    }

    function useSelectedItemOnGate() {
      if (gateUnlocked) return false;
      if (selectedInventoryItem !== "key") return false;
      if (keyItem.disabled) return false;

      consumeKeyItem();
      clearSelectedInventoryItem();
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
        gateAnimationPlayed = true;
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
      if (gateUnlocked) return;

      gateUnlocked = true;
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

      hasClickedBag = true;
      clearBagHintTimer();
      hideHelpPopup(bagHelp);
      hideHelpPopup(viewportHelp);

      setInventoryOpen(willOpen);

      if (willOpen && !gateUnlocked) {
        showKeyTutorialHint();
      }
    });

    inventoryCloseBtn?.addEventListener("click", () => {
      setInventoryOpen(false);
      clearSelectedInventoryItem();
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
      clearSelectedInventoryItem();
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
        if (gateUnlocked || keyItem.disabled) return;

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

          clearSelectedInventoryItem();

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

          if (droppedObject?.id === "gate" && !gateUnlocked) {
            consumeKeyItem();
            clearAllObjectDragStates();
            unlockGate();
          } else {
            clearAllObjectDragStates();
            if (!gateUnlocked) {
              inventoryNote.textContent = "";
            }
          }
        } else {
          if (selectedInventoryItem === "key") {
            clearSelectedInventoryItem();
            inventoryNote.textContent = "";
          } else {
            setSelectedInventoryItem("key");
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
      if (!gateUnlocked) {
        ensureGateLockVisible();
        proceedBtn.textContent = "The Gate Appears Locked";
        inventoryNote.textContent = "The gate is locked.";
        return;
      }

      if (!gateAnimationPlayed || step2.classList.contains("is-opening")) {
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