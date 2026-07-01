// Copy this file to config.js and fill in your Supabase project values.
// Dashboard: Project Settings → API
//
// === One-time Supabase setup ===
// 1. Create a project at https://supabase.com
// 2. SQL Editor → run supabase/schema.sql
// 3. Authentication → URL configuration:
//      Site URL: https://www.reagandavis.me/language-desk/
//      Redirect URLs (add both while using branch deploy):
//        https://www.reagandavis.me/language-desk/
//        https://www.reagandavis.me/
// 4. Authentication → Providers → GitHub → Enable
// 5. Create a GitHub OAuth App (Settings → Developer settings → OAuth Apps):
//      Homepage URL: https://www.reagandavis.me/language-desk/
//      Callback URL: https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
//    Paste Client ID + Secret into Supabase GitHub provider settings.
//
// === Deploy ===
// Branch deploy (current): edit js/config.js below and push.
// GitHub Actions deploy: add repo secrets SUPABASE_URL and SUPABASE_ANON_KEY;
//   switch Pages source to "GitHub Actions" in repo Settings → Pages.
//
window.APP_CONFIG = {
  supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY'
};
