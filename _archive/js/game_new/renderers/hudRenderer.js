function closePanel(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;

  panel.hidden = true;
  panel.classList.remove("is-open");
  document.querySelector(`[data-dp-panel-toggle="${panelId}"]`)?.classList.remove("is-active");
}

function isPanelOpen(panelId) {
  const panel = document.getElementById(panelId);
  return Boolean(panel && panel.classList.contains("is-open"));
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
  close.setAttribute("aria-label", `Close ${titleText}`);
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

  const body = document.createElement("div");
  body.className = "startup-achievements-popover__body";

  const progress = runtime.systems.achievements.listProgress();
  if (!progress.length) {
    const empty = document.createElement("p");
    empty.className = "startup-achievements-empty";
    empty.textContent = "No achievements yet.";
    body.appendChild(empty);
  }

  for (const entry of progress) {
    const row = document.createElement("div");
    row.className = "startup-achievement-entry";
    if (entry.complete) {
      row.classList.add("is-complete");
    }
    if (entry.unlocked) {
      row.classList.add("is-unlocked");
    }

    const top = document.createElement("div");
    top.className = "startup-achievement-entry__top";

    const label = document.createElement("div");
    label.className = "startup-achievement-entry__title";
    label.textContent = entry.achievement.title;

    const value = document.createElement("div");
    value.className = "startup-achievement-entry__value";
    value.textContent = entry.unlocked ? "Unlocked" : `${entry.current}/${entry.target}`;

    top.appendChild(label);
    top.appendChild(value);

    const track = document.createElement("div");
    track.className = "startup-progress-track";
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", String(entry.target));
    track.setAttribute("aria-valuenow", String(Math.min(entry.current, entry.target)));

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
    body.appendChild(row);
  }

  mount.appendChild(body);
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

  const unlockedCount = runtime.state.world.unlockedAchievements.length;

  [
    ["Active Screen", runtime.state.activeScreen],
    ["Gate Unlocked", runtime.state.world.flags.gate_unlocked ? "Yes" : "No"],
    ["Doors Unlocked", String(runtime.state.world.stats.doors_unlocked)],
    ["Achievements Unlocked", String(unlockedCount)],
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
    if (isPanelOpen("achievements-panel")) {
      renderAchievementsPanel(runtime);
    }

    if (isPanelOpen("map-panel")) {
      renderMapPanel(runtime);
    }

    if (isPanelOpen("settings-panel")) {
      renderSettingsPanel(runtime);
    }
  }

  return { render };
}
