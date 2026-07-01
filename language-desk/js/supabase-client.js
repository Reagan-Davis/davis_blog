(function () {
  const cfg = window.APP_CONFIG || {};
  const url = (cfg.supabaseUrl || '').trim();
  const key = (cfg.supabaseAnonKey || '').trim();

  window.supabaseClient =
    url && key && window.supabase
      ? window.supabase.createClient(url, key, {
          auth: {
            flowType: 'pkce',
            detectSessionInUrl: true,
            persistSession: true,
            autoRefreshToken: true,
            storage: window.localStorage
          }
        })
      : null;

  window.isSupabaseConfigured = () => !!window.supabaseClient;
})();
