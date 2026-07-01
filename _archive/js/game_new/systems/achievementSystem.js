export function createAchievementSystem(runtime) {
  function getProgressForAchievement(achievementId) {
    const achievement = runtime.content.getAchievement(achievementId);
    const current = Number(runtime.state.world.stats[achievement.trackedStat] || 0);
    const target = Number(achievement.target || 1);
    const unlocked = runtime.state.world.unlockedAchievements.includes(achievementId);

    return {
      achievement,
      current,
      target,
      complete: current >= target,
      unlocked,
      percent: Math.max(0, Math.min(100, (current / target) * 100))
    };
  }

  function listProgress() {
    return runtime.content
      .listAchievements()
      .map((achievement) => getProgressForAchievement(achievement.id));
  }

  function evaluateAll() {
    const newlyUnlocked = [];

    for (const entry of listProgress()) {
      if (!entry.complete || entry.unlocked) continue;

      runtime.state.world.unlockedAchievements.push(entry.achievement.id);
      newlyUnlocked.push(entry.achievement.id);
    }

    return {
      progress: listProgress(),
      newlyUnlocked
    };
  }

  return {
    getProgressForAchievement,
    listProgress,
    evaluateAll
  };
}
