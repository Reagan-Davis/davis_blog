export function createTypingRenderer(runtime) {
  let typingRunId = 0;
  let typingTimer = null;

  function clearTyping() {
    typingRunId += 1;
    clearTimeout(typingTimer);
    typingTimer = null;
  }

  function tokenizeRichText(html) {
    const tokens = [];
    const regex = /(<[^>]+>)|\[\[pause=(\d+)\]\]|./gs;
    let match;

    while ((match = regex.exec(String(html || ""))) !== null) {
      if (match[1]) {
        tokens.push({ type: "tag", value: match[1] });
      } else if (match[2]) {
        tokens.push({ type: "pause", delay: Number(match[2]) });
      } else {
        tokens.push({ type: "char", value: match[0] });
      }
    }

    return tokens;
  }

  function renderRichText(element, html, {
    speed = 26,
    startDelay = 100,
    onComplete = null,
    preserveIfSame = false
  } = {}) {
    if (!element) return;

    const nextSource = String(html || "");
    if (preserveIfSame && element.dataset.typedSource === nextSource) {
      return;
    }

    clearTyping();
    typingRunId += 1;
    const runId = typingRunId;

    element.innerHTML = "";
    element.dataset.typedSource = nextSource;
    element.classList.add("is-typing");

    const tokens = tokenizeRichText(nextSource);
    const nodeStack = [element];

    function getCurrentParent() {
      return nodeStack[nodeStack.length - 1];
    }

    function appendTag(tagString) {
      const trimmed = tagString.trim();

      if (/^<br\s*\/?>$/i.test(trimmed)) {
        getCurrentParent().appendChild(document.createElement("br"));
        return;
      }

      const closingMatch = trimmed.match(/^<\/\s*([a-z0-9-]+)\s*>$/i);
      if (closingMatch) {
        if (nodeStack.length > 1) nodeStack.pop();
        return;
      }

      const openingMatch = trimmed.match(/^<\s*([a-z0-9-]+)([^>]*)>$/i);
      if (!openingMatch) return;

      const tagName = openingMatch[1].toLowerCase();
      const attrString = openingMatch[2] || "";
      const node = document.createElement(tagName);

      const attrRegex = /([a-zA-Z_:][a-zA-Z0-9:._-]*)(?:="([^"]*)")?/g;
      let attrMatch;

      while ((attrMatch = attrRegex.exec(attrString)) !== null) {
        const attrName = attrMatch[1];
        const attrValue = attrMatch[2] ?? "";
        node.setAttribute(attrName, attrValue);
      }

      getCurrentParent().appendChild(node);

      if (!/\/\s*>$/.test(trimmed)) {
        nodeStack.push(node);
      }
    }

    let i = 0;

    function step() {
      if (runId !== typingRunId) return;

      if (i >= tokens.length) {
        element.classList.remove("is-typing");
        if (typeof onComplete === "function") onComplete();
        return;
      }

      const token = tokens[i++];

      if (token.type === "tag") {
        appendTag(token.value);
        step();
        return;
      }

      if (token.type === "pause") {
        typingTimer = setTimeout(step, token.delay);
        return;
      }

      getCurrentParent().appendChild(document.createTextNode(token.value));
      typingTimer = setTimeout(step, speed);
    }

    typingTimer = setTimeout(step, startDelay);
  }

  function renderInstantRichText(element, html) {
    if (!element) return;
    clearTyping();
    element.innerHTML = String(html || "").replace(/\[\[pause=\d+\]\]/g, "");
    element.dataset.typedSource = String(html || "");
    element.classList.remove("is-typing");
  }

  return {
    clearTyping,
    renderRichText,
    renderInstantRichText
  };
}