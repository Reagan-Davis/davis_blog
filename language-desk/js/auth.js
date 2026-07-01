(function () {
  let sessionUser = null;
  let profileLogin = null;
  let avatarUrl = null;

  function el(id) {
    return document.getElementById(id);
  }

  function redirectUrl() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    return url.toString();
  }

  function showAuthError(message) {
    console.error(message);
    window.AppAuth.setSyncStatus('error');
    const label = el('userLabel');
    if (label) label.title = message;
  }

  function clearAuthError() {
    const label = el('userLabel');
    if (label) label.removeAttribute('title');
  }

  function updateAuthUi() {
    const signedIn = !!sessionUser;
    const label = el('userLabel');
    const signIn = el('signInBtn');
    const signOut = el('signOutBtn');
    const avatar = el('userAvatar');
    const subtitle = el('userSubtitle');
    const account = el('settingsAccount');
    const storageMode = el('settingsStorage');
    const configured = window.isSupabaseConfigured?.();

    if (label) {
      if (signedIn && profileLogin) label.textContent = '@' + profileLogin;
      else if (configured) label.textContent = 'Guest';
      else label.textContent = 'Offline';
    }

    if (signIn) {
      signIn.hidden = signedIn;
      signIn.disabled = !configured;
      signIn.title = configured ? '' : 'Add Supabase keys in js/config.js';
    }
    if (signOut) signOut.hidden = !signedIn;

    if (avatar) {
      if (signedIn && avatarUrl) {
        avatar.src = avatarUrl;
        avatar.alt = profileLogin || 'GitHub avatar';
        avatar.hidden = false;
      } else {
        avatar.hidden = true;
        avatar.removeAttribute('src');
      }
    }

    const syncText = signedIn
      ? 'Supabase cloud'
      : configured
        ? 'Local browser only'
        : 'Local (Supabase not configured)';
    if (subtitle) subtitle.textContent = signedIn ? 'Progress synced to your account' : syncText;
    if (account) account.textContent = signedIn ? 'GitHub @' + profileLogin : 'Not signed in';
    if (storageMode) storageMode.textContent = syncText;
  }

  async function applySession(session) {
    sessionUser = session?.user || null;
    profileLogin = null;
    avatarUrl = null;
    clearAuthError();

    if (sessionUser && window.isSupabaseConfigured()) {
      try {
        window.AppAuth.setSyncStatus('loading');
        const loaded = await window.AppStorage.activateCloudSession(session);
        window.user = loaded.user;
        window.store = loaded.store;
        profileLogin = loaded.user;
        avatarUrl = loaded.avatarUrl || sessionUser.user_metadata?.avatar_url || null;
        window.AppAuth.setSyncStatus('ready');
      } catch (err) {
        console.error('Failed to load cloud progress', err);
        showAuthError(err.message || 'Could not load cloud progress');
        const guest = window.AppStorage.activateGuestSession();
        window.user = guest.user;
        window.store = guest.store;
      }
    } else {
      const guest = window.AppStorage.activateGuestSession();
      window.user = guest.user;
      window.store = guest.store;
      window.AppAuth.setSyncStatus(window.isSupabaseConfigured() ? 'guest' : 'offline');
    }

    updateAuthUi();
    if (typeof window.initApp === 'function') window.initApp();
  }

  async function handleOAuthReturn(client) {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get('error_description') || params.get('error');
    if (authError) {
      showAuthError(decodeURIComponent(authError.replace(/\+/g, ' ')));
      history.replaceState({}, document.title, redirectUrl());
      return;
    }

    const authCode = params.get('code');
    if (authCode) {
      const { error } = await client.auth.exchangeCodeForSession(authCode);
      if (error) {
        showAuthError(error.message);
      }
      history.replaceState({}, document.title, redirectUrl());
      return;
    }

    if (window.location.hash.includes('access_token')) {
      history.replaceState({}, document.title, redirectUrl());
    }
  }

  window.AppAuth = {
    syncStatus: 'idle',

    setSyncStatus(status) {
      this.syncStatus = status;
      const node = el('syncStatus');
      if (!node) return;
      const labels = {
        idle: '',
        loading: 'Syncing…',
        ready: 'Cloud save on',
        saved: 'Saved',
        guest: 'Sign in to sync',
        offline: 'Local only',
        error: 'Sync error'
      };
      node.textContent = labels[status] || '';
      node.dataset.state = status;
    },

    getUser() {
      return sessionUser;
    },

    getDisplayName() {
      return profileLogin ? '@' + profileLogin : null;
    },

    isSignedIn() {
      return !!sessionUser;
    },

    updateAuthUi,

    async signInWithGitHub() {
      if (!window.supabaseClient) {
        alert(
          'Supabase is not configured yet.\n\n' +
            '1. Create a Supabase project\n' +
            '2. Copy js/config.example.js values into js/config.js\n' +
            '3. Enable GitHub auth in Supabase and add redirect URLs'
        );
        return;
      }
      window.AppAuth.setSyncStatus('loading');
      const { error } = await window.supabaseClient.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: redirectUrl() }
      });
      if (error) {
        console.error(error);
        window.AppAuth.setSyncStatus('error');
        alert('GitHub sign-in failed: ' + error.message);
      }
    },

    async signOut() {
      if (window.supabaseClient) {
        await window.supabaseClient.auth.signOut();
      }
      sessionUser = null;
      profileLogin = null;
      avatarUrl = null;
      const guest = window.AppStorage.activateGuestSession();
      window.user = guest.user;
      window.store = guest.store;
      updateAuthUi();
      if (typeof window.renderAll === 'function') window.renderAll();
      if (typeof window.newQuestion === 'function') window.newQuestion();
      this.setSyncStatus(window.isSupabaseConfigured() ? 'guest' : 'offline');
    },

    async init() {
      if (!window.supabaseClient) {
        await applySession(null);
        return;
      }

      const client = window.supabaseClient;
      await handleOAuthReturn(client);

      const { data, error } = await client.auth.getSession();
      if (error) showAuthError(error.message);
      await applySession(data.session);

      client.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
          await applySession(null);
          return;
        }
        if (session?.user?.id === sessionUser?.id) return;
        await applySession(session);
      });

      el('signInBtn')?.addEventListener('click', () => this.signInWithGitHub());
      el('signOutBtn')?.addEventListener('click', () => this.signOut());
    }
  };
})();
