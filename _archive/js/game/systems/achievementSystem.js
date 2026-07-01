const DOORS_TARGET = 10;

export function createAchievementSystem({ state, dom }) {
  function render() {
    const current = Number(state.achievements.stats.doorsUnlocked || 0);
    const percent = Math.max(0, Math.min(100, (current / DOORS_TARGET) * 100));
    const complete = current >= DOORS_TARGET;

    if (dom.achievementsDoorsValue) {
      dom.achievementsDoorsValue.textContent = complete ? "Unlocked" : `${current}/${DOORS_TARGET}`;
    }

    if (dom.achievementsDoorsFill) {
      dom.achievementsDoorsFill.style.width = `${percent}%`;
    }

    const entry = dom.achievementsPanel?.querySelector(".startup-achievement-entry");
    if (entry) {
      entry.classList.toggle("is-complete", current > 0);
      entry.classList.toggle("is-unlocked", complete);
    }

    const track = dom.achievementsPanel?.querySelector(".startup-achievement-progress");
    if (track) {
      track.setAttribute("aria-valuenow", String(Math.min(current, DOORS_TARGET)));
      track.setAttribute("aria-valuemin", "0");
      track.setAttribute("aria-valuemax", String(DOORS_TARGET));
    }
  }

  function recordDoorUnlock() {
    const current = Number(state.achievements.stats.doorsUnlocked || 0);
    if (current >= DOORS_TARGET) return false;

    state.achievements.stats.doorsUnlocked = current + 1;

    if (state.achievements.stats.doorsUnlocked >= DOORS_TARGET) {
      if (!state.achievements.unlocked.includes("doors_unlocked")) {
        state.achievements.unlocked.push("doors_unlocked");
      }
    }

    render();
    return true;
  }

  return {
    render,
    recordDoorUnlock,
    getTarget: () => DOORS_TARGET
  };
}
