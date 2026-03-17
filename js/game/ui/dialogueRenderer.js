export function createDialogueRenderer({
    dom,
    dialogueSystem,
    typePopupText,
    onChoiceSelected,
    onContinue
  }) {
    function clearChoices() {
      dom.dialogueChoices.innerHTML = "";
    }
  
    function renderActiveDialogue() {
      const node = dialogueSystem.getActiveNode();
      if (!node) return;
  
      dom.dialogueTitle.innerHTML = "";
      dom.dialogueText.innerHTML = "";
      dom.dialogueResponseText.innerHTML = "";
      dom.dialogueContinueBtn.hidden = true;
      clearChoices();
  
      typePopupText(dom.dialogueTitle, node.title || "", {
        speed: 30,
        startDelay: 100,
        onComplete: () => {
          typePopupText(dom.dialogueText, node.text || "", {
            speed: 22,
            startDelay: 140,
            onComplete: () => {
              if (Array.isArray(node.choices) && node.choices.length) {
                renderChoices(node.choices);
              } else if (node.continueAction) {
                dom.dialogueContinueBtn.hidden = false;
                dom.dialogueContinueBtn.onclick = () => onContinue?.(node.continueAction);
              }
            }
          });
        }
      });
    }
  
    function renderChoices(choices) {
      clearChoices();
  
      choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "startup-modal__button";
        btn.textContent = choice.label;
        btn.addEventListener("click", () => onChoiceSelected(choice.id));
        dom.dialogueChoices.appendChild(btn);
      });
  
      dom.dialogueChoices.hidden = false;
    }
  
    return { renderActiveDialogue };
  }