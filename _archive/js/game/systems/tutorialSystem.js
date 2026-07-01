export function createTutorialSystem({ state, dom }) {
  function show(el) {
    if (!el) return;
    el.hidden = false;
    el.classList.add("is-visible");
  }

  function hide(el) {
    if (!el) return;
    el.hidden = true;
    el.classList.remove("is-visible");
  }

  function hideAll() {
    hide(dom.bagHelp);
    hide(dom.keyHelp);
    hide(dom.viewportHelp);
    hide(dom.textHelp);
    hide(dom.advanceHelp);
  }

  function showBagHelp() {
    if (state.tutorial.hasShownBagHint) return;
    show(dom.bagHelp);
    state.tutorial.hasShownBagHint = true;
  }

  function hideBagHelp() {
    hide(dom.bagHelp);
  }

  function showKeyHelp() {
    if (state.tutorial.hasShownKeyHint) return;
    show(dom.keyHelp);
    state.tutorial.hasShownKeyHint = true;
  }

  function hideKeyHelp() {
    hide(dom.keyHelp);
  }

  function showViewportHelp() {
    if (state.tutorial.hasShownViewportHint) return;
    show(dom.viewportHelp);
    state.tutorial.hasShownViewportHint = true;
  }

  function hideViewportHelp() {
    hide(dom.viewportHelp);
  }

  function showTextHelp() {
    if (state.tutorial.hasShownTextHint) return;
    show(dom.textHelp);
    state.tutorial.hasShownTextHint = true;
  }

  function hideTextHelp() {
    hide(dom.textHelp);
  }

  function showAdvanceHelp() {
    if (state.tutorial.hasShownAdvanceHint) return;
    show(dom.advanceHelp);
    state.tutorial.hasShownAdvanceHint = true;
  }

  function hideAdvanceHelp() {
    hide(dom.advanceHelp);
  }

  return {
    hideAll,
    showBagHelp,
    hideBagHelp,
    showKeyHelp,
    hideKeyHelp,
    showViewportHelp,
    hideViewportHelp,
    showTextHelp,
    hideTextHelp,
    showAdvanceHelp,
    hideAdvanceHelp
  };
}