function startApp() {
  window.AppAuth.init().catch((err) => {
    console.error('Auth init failed', err);
    if (typeof window.initApp === 'function') window.initApp();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
