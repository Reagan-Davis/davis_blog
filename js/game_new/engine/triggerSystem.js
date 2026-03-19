export function createTriggerSystem(runtime) {
  const scripts = runtime.content.listTutorialScripts();

  async function handleEvent(eventName, payload = {}) {
    for (const script of scripts) {
      if (script.trigger !== eventName) continue;

      const alreadyFired = runtime.state.tutorial.firedScriptIds.includes(script.id);
      if (script.once && alreadyFired) continue;

      const passes = (script.conditions || []).every((condition) =>
        runtime.conditions.evaluate(condition, runtime, { eventName, payload })
      );

      if (!passes) continue;

      await runtime.actionRunner.runActions(script.actions || [], {
        eventName,
        payload,
        scriptId: script.id
      });

      if (script.once) {
        runtime.state.tutorial.firedScriptIds.push(script.id);
      }
    }
  }

  return {
    handleEvent
  };
}