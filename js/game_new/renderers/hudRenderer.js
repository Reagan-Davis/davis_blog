function closePanel(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.hidden = true;
  panel.classList.remove("is-open");
  document.querySelector(`[data-dp-panel-toggle="${panelId}"]`)?.classList.remove("is-active");
}

function buildGenericPopover(panelId, titleText) {
  const head = document.createElement("div");
  head.className = panelId === "achievements-panel"
    ? "startup-achievements-popover__head"
    : "dp-generic-popover__head";

  const title = document.createElement("h2");
  title.className = panelId === "achievements-panel"
    ? "startup-achievements-title"
    : "dp-generic-popover__title";
  title.textContent = titleText;

  const close = document.createElement("button");
  close.type = "button";
  close.className = panelId === "achievements-panel"
    ? "startup-achievements-close"
    : "dp-generic-popover__close";
  close.textContent = "×";
  close.addEventListener("click", () => closePanel(panelId));

  head.appendChild(title);
  head.appendChild(close);

  return head;
}

function renderAchievementsPanel(runtime) {
  const mount = runtime.mounts.achievementsPanel;
  mount.innerHTML = "";
  mount.appendChild(buildGenericPopover("achievements-panel", "Achievements"));

  for (const entry of runtime.systems.achievements.listProgress()) {
    const row = document.createElement("div");
    row.className = "startup-achievement-entry";

    const top = document.createElement("div");
    top.className = "startup-achievement-entry__top";

    const label = document.createElement("div");
    label.className = "startup-achievement-entry__title";
    label.textContent = entry.achievement.title;

    const value = document.createElement("div");
    value.className = "startup-achievement-entry__value";
    value.textContent = `${entry.current}/${entry.target}`;

    top.appendChild(label);
    top.appendChild(value);

    const track = document.createElement("div");
    track.className = "startup-progress-track";

    const fill = document.createElement("div");
    fill.className = "startup-progress-fill";
    fill.style.width = `${entry.percent}%`;

    track.appendChild(fill);

    const desc = document.createElement("div");
    desc.className = "startup-achievement-entry__desc";
    desc.textContent = entry.achievement.description || "";

    row.appendChild(top);
    row.appendChild(track);
    row.appendChild(desc);
    mount.appendChild(row);
  }
}

function renderMapPanel(runtime) {
  const mount = runtime.mounts.mapPanel;
  mount.innerHTML = "";
  mount.appendChild(buildGenericPopover("map-panel", "Map"));

  const body = document.createElement("div");
  body.className = "dp-generic-popover__body";

  [
    ["Current Scene", runtime.state.currentSceneId],
    ["Viewport Template", runtime.systems.viewport.getCurrentTemplate()?.id || "None"],
    ["Status", "Placeholder map panel for now."]
  ].forEach(([title, text]) => {
    const row = document.createElement("div");
    row.className = "dp-generic-row";
    row.innerHTML = `<div class="dp-generic-row__title">${title}</div><div class="dp-generic-row__text">${text}</div>`;
    body.appendChild(row);
  });

  mount.appendChild(body);
}

function renderSettingsPanel(runtime) {
  const mount = runtime.mounts.settingsPanel;
  mount.innerHTML = "";
  mount.appendChild(buildGenericPopover("settings-panel", "Settings"));

  const body = document.createElement("div");
  body.className = "dp-generic-popover__body";

  [
    ["Active Screen", runtime.state.activeScreen],
    ["Gate Unlocked", runtime.state.world.flags.gate_unlocked ? "Yes" : "No"],
    ["Doors Unlocked", String(runtime.state.world.stats.doors_unlocked)],
    ["Temporary Message", runtime.state.ui.temporaryMessageVisible ? (runtime.state.ui.temporaryMessage || "Visible") : "Hidden"]
  ].forEach(([title, text]) => {
    const row = document.createElement("div");
    row.className = "dp-generic-row";
    row.innerHTML = `<div class="dp-generic-row__title">${title}</div><div class="dp-generic-row__text">${text}</div>`;
    body.appendChild(row);
  });

  mount.appendChild(body);
}

export function createHudRenderer(runtime) {
  function render() {
    renderAchievementsPanel(runtime);
    renderMapPanel(runtime);
    renderSettingsPanel(runtime);
  }

  return { render };
}