function tokenizeTypedHtml(html) {
  const source = String(html || "");
  const tokens = [];
  let i = 0;

  while (i < source.length) {
    if (source.startsWith("[[pause=", i)) {
      const end = source.indexOf("]]", i);
      if (end !== -1) {
        const raw = source.slice(i + 8, end);
        const ms = Number.parseInt(raw, 10);

        tokens.push({
          type: "pause",
          duration: Number.isFinite(ms) ? ms : 0
        });

        i = end + 2;
        continue;
      }
    }

    if (source[i] === "<") {
      const end = source.indexOf(">", i);
      if (end !== -1) {
        tokens.push({
          type: "tag",
          value: source.slice(i, end + 1)
        });
        i = end + 1;
        continue;
      }
    }

    tokens.push({
      type: "char",
      value: source[i]
    });
    i += 1;
  }

  return tokens;
}

export function createTypePopupText() {
  let activeRunId = 0;
  let activeTimers = [];

  function clearTimers() {
    activeTimers.forEach(id => window.clearTimeout(id));
    activeTimers = [];
  }

  function cancel() {
    activeRunId += 1;
    clearTimers();
  }

  function typePopupText(element, html, {
    speed = 24,
    startDelay = 100,
    onComplete = null
  } = {}) {
    if (!element) return;

    cancel();
    const runId = activeRunId;
    const tokens = tokenizeTypedHtml(html);
    let index = 0;
    let output = "";

    element.innerHTML = "";

    function finish() {
      if (runId !== activeRunId) return;
      if (typeof onComplete === "function") {
        onComplete();
      }
    }

    function step() {
      if (runId !== activeRunId) return;

      if (index >= tokens.length) {
        finish();
        return;
      }

      const token = tokens[index++];
      if (!token) {
        finish();
        return;
      }

      if (token.type === "pause") {
        const timer = window.setTimeout(step, Math.max(0, token.duration));
        activeTimers.push(timer);
        return;
      }

      if (token.type === "tag") {
        output += token.value;
        element.innerHTML = output;
        step();
        return;
      }

      output += token.value;
      element.innerHTML = output;

      const timer = window.setTimeout(step, speed);
      activeTimers.push(timer);
    }

    const startTimer = window.setTimeout(step, startDelay);
    activeTimers.push(startTimer);
  }

  typePopupText.cancel = cancel;
  return typePopupText;
}