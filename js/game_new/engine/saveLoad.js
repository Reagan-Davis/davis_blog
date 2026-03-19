export function createSaveLoad({ storageKey }) {
  function save(state) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error("Failed to save prototype state:", error);
      return false;
    }
  }

  function load() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      console.error("Failed to load prototype state:", error);
      return null;
    }
  }

  function clear() {
    try {
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error("Failed to clear prototype state:", error);
      return false;
    }
  }

  return {
    save,
    load,
    clear
  };
}