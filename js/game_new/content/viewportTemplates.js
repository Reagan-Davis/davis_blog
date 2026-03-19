export const VIEWPORT_TEMPLATES = {
gate_corridor: {
  id: "gate_corridor",
  width: 1000,
  height: 600,

  background: {
    type: "svg",
    markup: `
      <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="hallBg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2a2a31"/>
            <stop offset="100%" stop-color="#121217"/>
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#4a4138"/>
            <stop offset="100%" stop-color="#1e1a18"/>
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1000" height="600" fill="url(#hallBg)"/>
        <polygon points="120,130 880,130 1000,600 0,600" fill="#26222a"/>
        <polygon points="260,220 740,220 840,600 160,600" fill="url(#floorGrad)"/>

        <circle cx="170" cy="170" r="18" fill="#e6b25c" opacity="0.8"/>
        <circle cx="830" cy="170" r="18" fill="#e6b25c" opacity="0.8"/>

        <rect x="392" y="122" width="216" height="270" rx="8" fill="#171418" stroke="#8a6d4d" stroke-width="6"/>
        <line x1="500" y1="122" x2="500" y2="392" stroke="#6b5741" stroke-width="4"/>

        <rect x="418" y="155" width="56" height="190" fill="#3d332c"/>
        <rect x="526" y="155" width="56" height="190" fill="#3d332c"/>

        <circle cx="492" cy="250" r="6" fill="#c79d55"/>
        <circle cx="508" cy="250" r="6" fill="#c79d55"/>
      </svg>
    `
  },

  templateObjects: [
    {
    id: "gate",
    shape: "rect",
    x: 392,
    y: 122,
    width: 216,
    height: 270,
    label: "Gate"
    },
    {
      id: "advance",
      shape: "circle",
      cx: 500,
      cy: 500,
      r: 34,
      label: "Advance"
    }
  ]
},

  simple_hall: {
    id: "simple_hall",
    width: 1000,
    height: 600,

    background: {
      type: "svg",
      markup: `
        <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="hall2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#20262f"/>
              <stop offset="100%" stop-color="#12161b"/>
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="600" fill="url(#hall2)"/>
          <polygon points="250,170 750,170 900,600 100,600" fill="#2f3540"/>
          <text x="500" y="84" text-anchor="middle" fill="#cfd6e0" font-size="28" font-family="Georgia, serif">
            Quiet Corridor
          </text>
        </svg>
      `
    },

    templateObjects: [
      {
        id: "center_marker",
        shape: "circle",
        cx: 500,
        cy: 420,
        r: 38,
        label: "Marker"
      }
    ]
  }
};