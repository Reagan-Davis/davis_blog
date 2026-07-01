(function () {
  const LEGACY_KEY = 'languageAtelier.v2';
  const MIGRATED_KEY = 'languageAtelier.cloudMigrated';
  const GUEST_KEY = 'local';
  const saveTimers = new Map();

  function defaultProgress() {
    return { xp: 0, correct: 0, streak: 0, touched: {}, skills: {}, built: 0 };
  }

  function rowToState(row) {
    if (!row) return defaultProgress();
    return {
      xp: row.xp || 0,
      correct: row.correct || 0,
      streak: row.streak || 0,
      built: row.built || 0,
      skills: row.skills || {},
      touched: row.touched || {}
    };
  }

  function stateToRow(userId, langCode, state) {
    return {
      user_id: userId,
      lang_code: langCode,
      xp: state.xp || 0,
      correct: state.correct || 0,
      streak: state.streak || 0,
      built: state.built || 0,
      skills: state.skills || {},
      touched: state.touched || {},
      updated_at: new Date().toISOString()
    };
  }

  function readLegacyLocal() {
    try {
      const raw = localStorage.getItem(LEGACY_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function writeLegacyLocal(store, userKey) {
    localStorage.setItem(LEGACY_KEY, JSON.stringify(store));
    localStorage.setItem('languageAtelier.activeUser', userKey);
  }

  function mergeProgress(localState, remoteState) {
    if (!remoteState) return localState;
    if (!localState) return remoteState;
    const localXp = localState.xp || 0;
    const remoteXp = remoteState.xp || 0;
    if (localXp > remoteXp) return localState;
    if (remoteXp > localXp) return remoteState;
    const localCorrect = localState.correct || 0;
    const remoteCorrect = remoteState.correct || 0;
    if (localCorrect > remoteCorrect) return localState;
    return remoteState;
  }

  window.AppStorage = {
    GUEST_KEY,
    defaultProgress,
    cloudUserId: null,
    mode: 'local',

    isCloudActive() {
      return this.mode === 'cloud' && !!this.cloudUserId && !!window.supabaseClient;
    },

    createGuestStore() {
      const legacy = readLegacyLocal();
      const activeUser = localStorage.getItem('languageAtelier.activeUser') || GUEST_KEY;
      if (legacy?.users) {
        return { user: activeUser, store: legacy };
      }
      return {
        user: GUEST_KEY,
        store: { users: { [GUEST_KEY]: { languages: {} } } }
      };
    },

    async loadCloudProgress(userId) {
      const client = window.supabaseClient;
      const { data, error } = await client
        .from('language_progress')
        .select('lang_code,xp,correct,streak,built,skills,touched')
        .eq('user_id', userId);
      if (error) throw error;

      const languages = {};
      (data || []).forEach((row) => {
        languages[row.lang_code] = rowToState(row);
      });
      return languages;
    },

    async upsertCloudProgress(userId, langCode, state) {
      const client = window.supabaseClient;
      const { error } = await client
        .from('language_progress')
        .upsert(stateToRow(userId, langCode, state), { onConflict: 'user_id,lang_code' });
      if (error) throw error;
    },

    githubIdentity(user) {
      return user.identities?.find((identity) => identity.provider === 'github') || null;
    },

    async ensureProfile(session) {
      const client = window.supabaseClient;
      const meta = session.user.user_metadata || {};
      const identity = this.githubIdentity(session.user);
      const identityData = identity?.identity_data || {};
      const login =
        identityData.user_name ||
        identityData.preferred_username ||
        meta.user_name ||
        meta.preferred_username ||
        meta.name ||
        session.user.email?.split('@')[0] ||
        'github-user';
      const githubRaw = identity?.id || meta.provider_id || meta.sub;
      const githubId = githubRaw ? Number(githubRaw) : null;

      const { error } = await client.from('profiles').upsert(
        {
          id: session.user.id,
          github_id: Number.isFinite(githubId) ? githubId : null,
          login,
          avatar_url: identityData.avatar_url || meta.avatar_url || null,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'id' }
      );
      if (error) throw error;

      const { data, error: readErr } = await client
        .from('profiles')
        .select('login,avatar_url')
        .eq('id', session.user.id)
        .single();
      if (readErr) throw readErr;
      return data;
    },

    async migrateLocalToCloud(userId) {
      if (localStorage.getItem(MIGRATED_KEY) === userId) return;

      const legacy = readLegacyLocal();
      const localLangs =
        legacy?.users?.[GUEST_KEY]?.languages ||
        legacy?.users?.['github-placeholder']?.languages ||
        {};

      const remoteLangs = await this.loadCloudProgress(userId);
      for (const [langCode, localState] of Object.entries(localLangs)) {
        const merged = mergeProgress(localState, remoteLangs[langCode]);
        await this.upsertCloudProgress(userId, langCode, merged);
      }

      localStorage.setItem(MIGRATED_KEY, userId);
      localStorage.removeItem(LEGACY_KEY);
    },

    async activateCloudSession(session) {
      const profile = await this.ensureProfile(session);
      await this.migrateLocalToCloud(session.user.id);
      const languages = await this.loadCloudProgress(session.user.id);

      this.mode = 'cloud';
      this.cloudUserId = session.user.id;

      return {
        user: profile.login,
        avatarUrl: profile.avatar_url,
        store: { users: { [profile.login]: { languages } } }
      };
    },

    activateGuestSession() {
      this.mode = 'local';
      this.cloudUserId = null;
      const guest = this.createGuestStore();
      return { user: guest.user, avatarUrl: null, store: guest.store };
    },

    persist(userKey, langCode, state, store) {
      if (this.isCloudActive()) {
        const key = `${this.cloudUserId}:${langCode}`;
        clearTimeout(saveTimers.get(key));
        saveTimers.set(
          key,
          setTimeout(async () => {
            try {
              await this.upsertCloudProgress(this.cloudUserId, langCode, state);
              window.AppAuth?.setSyncStatus?.('saved');
            } catch (err) {
              console.error('Cloud save failed', err);
              window.AppAuth?.setSyncStatus?.('error');
            }
          }, 400)
        );
        return;
      }

      store.users[userKey] ||= { languages: {} };
      store.users[userKey].languages[langCode] = state;
      writeLegacyLocal(store, userKey);
    },

    async deleteLanguageProgress(userId, langCode) {
      const client = window.supabaseClient;
      const { error } = await client
        .from('language_progress')
        .delete()
        .eq('user_id', userId)
        .eq('lang_code', langCode);
      if (error) throw error;
    }
  };
})();
