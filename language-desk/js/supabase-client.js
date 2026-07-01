(function () {
  const cfg = window.APP_CONFIG || {};
  const url = (cfg.supabaseUrl || '').trim();
  const key = (cfg.supabaseAnonKey || '').trim();

  window.supabaseClient =
    url && key && window.supabase
      ? window.supabase.createClient(url, key)
      : null;

  window.isSupabaseConfigured = () => !!window.supabaseClient;
})();
