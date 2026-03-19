export function createAchievementSystem(runtime) {
  function getProgressForAchievement(achievementId) {
    const achievement = runtime.content.getAchievement(achievementId);
    const current = Number(runtime.state.world.stats[achievement.trackedStat] || 0);
    const target = Number(achievement.target || 1);

    return {
      achievement,
      current,
      target,
      complete: current >= target,
      percent: Math.max(0, Math.min(100, (current / target) * 100))
    };
  }

  function listProgress() {
    return runtime.content
      .listAchievements()
      .map((achievement) => getProgressForAchievement(achievement.id));
  }

  function evaluateAll() {
    return listProgress();
  }

  return {
    getProgressForAchievement,
    listProgress,
    evaluateAll
  };
}