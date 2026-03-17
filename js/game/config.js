window.StartupDungeonConfig = {
    STORAGE_KEY: "rrr_site_notice_seen",
    DEBUG_ALWAYS_SHOW_INTRO: false,
  
    LOCK_SVG_MARKUP: `
      <g class="startup-gate-lock" id="startupGeneratedLock" transform="translate(320 250)">
        <rect x="-30" y="-10" width="60" height="70" rx="10" fill="#51463a" stroke="#9f835e" stroke-width="4"/>
        <path
          d="M-14 -10 L-14 -26 Q-14 -48 0 -48 Q14 -48 14 -26 L14 -10"
          fill="none"
          stroke="#b69467"
          stroke-width="8"
          stroke-linecap="round"
        />
        <circle cx="0" cy="18" r="8" fill="#b69467"/>
        <rect x="-3" y="18" width="6" height="20" rx="3" fill="#b69467"/>
      </g>
    `,
  
    DUNGEON_ENTRY_TITLE: "<em>You enter the dungeon.</em>",
  
    DUNGEON_LOCKED_TEXT: `
      You are standing in a narrow stone corridor.<br>
      A rusted gate lies before you.
    `,
  
    DUNGEON_OPEN_TEXT: `
      The rusted gate swings open, clanging against the stone facings on either side.<br>
      The path beyond is dark, save for the faint glow of a torch.
    `,
  
    FINAL_STEP_TITLE: "<em></em>",
  
    FINAL_STEP_TEXT_BEFORE_CHOICE: `
      <em>As you make your way down the corridor...</em> [[pause=2150]] <br><br>
      Heh. [[pause=1400]] <br><br>
      Did I make you think I was going to force you to play through a game to navigate this site?
    `,
  
    FINAL_STEP_TEXT_AFTER_YES: `
      Okay, yeah, you got me. That would be incredibly on-brand for me. [[pause=1200]] <br><br>
      Maybe I will go all in on it in the future.
    `,
  
    FINAL_STEP_TEXT_AFTER_NO: `
      Really? [[pause=400]] Then I clearly need to lean harder into the bit. [[pause=1200]] <br><br>
      It will get there someday... [[pause=800]] eventually.
    `
  };