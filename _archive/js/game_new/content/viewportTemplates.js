export const VIEWPORT_TEMPLATES = {
  gate_corridor: {
    id: "gate_corridor",
    width: 1000,
    height: 600,
    background: {
      type: "svg",
      markup: `
        <svg viewBox="0 0 1000 600" class="vp-svg startup-gate-scene" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="gc_bg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#14151b"/>
              <stop offset="100%" stop-color="#0d0e12"/>
            </linearGradient>
            <linearGradient id="gc_wall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#505159"/>
              <stop offset="100%" stop-color="#3a3b43"/>
            </linearGradient>
            <linearGradient id="gc_floor" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#6f5437"/>
              <stop offset="100%" stop-color="#4c3823"/>
            </linearGradient>
            <linearGradient id="gc_ceiling" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#6f5437"/>
              <stop offset="100%" stop-color="#5c432a"/>
            </linearGradient>
          </defs>

          <rect width="1000" height="600" fill="url(#gc_bg)"/>

          <polygon points="0,0 1000,0 760,130 240,130" fill="url(#gc_ceiling)"/>
          <polygon points="0,600 1000,600 760,470 240,470" fill="url(#gc_floor)"/>
          <polygon points="0,0 240,130 240,470 0,600" fill="#3d3e44"/>
          <polygon points="1000,0 760,130 760,470 1000,600" fill="#3d3e44"/>
          <rect x="240" y="130" width="520" height="340" fill="url(#gc_wall)"/>

          <circle cx="305" cy="165" r="14" fill="#d0a25a" opacity="0.8"/>
          <circle cx="695" cy="165" r="14" fill="#d0a25a" opacity="0.8"/>

          <rect x="392" y="150" width="216" height="290" fill="#1a1718" stroke="#9b7749" stroke-width="8"/>
          <rect x="392" y="150" width="108" height="290" fill="#4b3828"/>
          <rect x="500" y="150" width="108" height="290" fill="#453223"/>
          <line x1="500" y1="150" x2="500" y2="440" stroke="#6f5539" stroke-width="4"/>
          <circle cx="474" cy="295" r="6" fill="#d0a25a"/>
          <circle cx="526" cy="295" r="6" fill="#d0a25a"/>
        </svg>
      `
    },
    templateObjects: [
      {
        id: "gate_left_leaf",
        shape: "rect",
        x: 392,
        y: 150,
        width: 108,
        height: 290,
        label: "Left Gate Side",
        zIndex: 3
      },
      {
        id: "gate_right_leaf",
        shape: "rect",
        x: 500,
        y: 150,
        width: 108,
        height: 290,
        label: "Right Gate Side",
        zIndex: 3
      },
      {
        id: "advance",
        shape: "circle",
        cx: 500,
        cy: 315,
        r: 46,
        label: "Advance",
        zIndex: 2
      }
    ]
  },

  hall_dead_end: {
    id: "hall_dead_end",
    width: 1000,
    height: 600,
    background: {
      type: "svg",
      markup: `
        <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="1000" height="600" fill="#101115"/>

          <polygon points="0,0 1000,0 760,130 240,130" fill="#7b5a37"/>
          <polygon points="0,600 1000,600 760,470 240,470" fill="#7b5a37"/>
          <polygon points="0,0 240,130 240,470 0,600" fill="#3d3e43"/>
          <polygon points="1000,0 760,130 760,470 1000,600" fill="#3d3e43"/>
          <rect x="240" y="130" width="520" height="340" fill="#8a8a8a"/>
        </svg>
      `
    },
    templateObjects: [
      {
        id: "back_wall",
        shape: "rect",
        x: 240,
        y: 130,
        width: 520,
        height: 340,
        label: "Back Wall",
        zIndex: 2
      }
    ]
  },

  hall_single_door_end: {
    id: "hall_single_door_end",
    width: 1000,
    height: 600,
    background: {
      type: "svg",
      markup: `
        <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="1000" height="600" fill="#101115"/>

          <polygon points="0,0 1000,0 760,130 240,130" fill="#7b5a37"/>
          <polygon points="0,600 1000,600 760,470 240,470" fill="#7b5a37"/>
          <polygon points="0,0 240,130 240,470 0,600" fill="#3d3e43"/>
          <polygon points="1000,0 760,130 760,470 1000,600" fill="#3d3e43"/>
          <rect x="240" y="130" width="520" height="340" fill="#8a8a8a"/>

          <rect x="445" y="260" width="110" height="210" fill="#5a3b1f"/>
          <rect x="445" y="260" width="110" height="210" fill="none" stroke="#3a2613" stroke-width="8"/>
        </svg>
      `
    },
    templateObjects: [
      {
        id: "end_door",
        shape: "rect",
        x: 445,
        y: 260,
        width: 110,
        height: 210,
        label: "End Door",
        zIndex: 3
      }
    ]
  },

  hall_double_door_run: {
  id: "hall_double_door_run",
  width: 1000,
  height: 600,
  background: {
    type: "svg",
    markup: `
      <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="1000" height="600" fill="#101115"/>

        <!-- corridor shell -->
        <polygon points="0,0 1000,0 760,130 240,130" fill="#7b5a37"/>
        <polygon points="0,600 1000,600 760,470 240,470" fill="#7b5a37"/>
        <polygon points="0,0 240,130 240,470 0,600" fill="#3d3e43"/>
        <polygon points="1000,0 760,130 760,470 1000,600" fill="#3d3e43"/>
        <rect x="240" y="130" width="520" height="340" fill="#050608"/>

        <!-- left angled doorway -->
        <polygon points="96,310 184,284 184,472 96,520" fill="#1b140f"/>
        <polygon points="112,320 170,302 170,463 112,494" fill="#5a3b1f"/>
        <polygon points="96,310 112,320 112,494 96,520" fill="#3b2818"/>
        <polygon points="170,302 184,284 184,472 170,463" fill="#2f2014"/>

        <!-- right angled doorway -->
        <polygon points="816,284 904,310 904,520 816,472" fill="#1b140f"/>
        <polygon points="830,302 888,320 888,494 830,463" fill="#5a3b1f"/>
        <polygon points="888,320 904,310 904,520 888,494" fill="#3b2818"/>
        <polygon points="816,284 830,302 830,463 816,472" fill="#2f2014"/>

        <!-- forward arrow -->
        <g transform="translate(500 305)">
          <circle cx="0" cy="0" r="38" fill="rgba(255,255,255,0.05)"/>
          <path d="M0 -30 L24 -2 L12 -2 L12 28 L-12 28 L-12 -2 L-24 -2 Z"
            fill="#d4b083" stroke="#6e5538" stroke-width="4"/>
        </g>
      </svg>
    `
  },
  templateObjects: [
    {
      id: "left_door",
      shape: "polygon",
      points: "96,310 184,284 184,472 96,520",
      label: "Left Door",
      zIndex: 3
    },
    {
      id: "right_door",
      shape: "polygon",
      points: "816,284 904,310 904,520 816,472",
      label: "Right Door",
      zIndex: 3
    },
    {
      id: "forward_continue",
      shape: "circle",
      cx: 500,
      cy: 305,
      r: 48,
      label: "Continue Forward",
      zIndex: 2
    }
  ]
},

  hall_turn_left: {
  id: "hall_turn_left",
  width: 1000,
  height: 600,
  background: {
    type: "svg",
    markup: `
      <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="1000" height="600" fill="#101115"/>

        <!-- ceiling and floor -->
        <polygon points="0,0 1000,0 760,130 240,130" fill="#7b5a37"/>
        <polygon points="0,600 1000,600 760,470 240,470" fill="#7b5a37"/>

        <!-- right wall remains -->
        <polygon points="1000,0 760,130 760,470 1000,600" fill="#3d3e43"/>

        <!-- left side opens into turn -->
        <polygon points="480,130 760,130 760,470 480,470" fill="#8a8a8a"/>
        <polygon points="0,0 240,130 480,130 480,470 240,470 0,600" fill="#050608"/>

        <!-- left wall edge to imply turn -->
        <polygon points="0,0 240,130 240,180 140,180 0,120" fill="#2a2b30"/>
        <polygon points="0,480 140,420 240,420 240,470 0,600" fill="#2a2b30"/>

        <!-- turn arrow -->
        <g transform="translate(325 305)">
          <circle cx="0" cy="0" r="38" fill="rgba(255,255,255,0.05)"/>
          <path d="M-30 0 L-2 -24 L-2 -12 L28 -12 L28 12 L-2 12 L-2 24 Z"
            fill="#d4b083" stroke="#6e5538" stroke-width="4"/>
        </g>
      </svg>
    `
  },
  templateObjects: [
    {
      id: "left_turn_exit",
      shape: "circle",
      cx: 325,
      cy: 305,
      r: 54,
      label: "Turn Left",
      zIndex: 3
    },
    {
      id: "back_wall_right",
      shape: "rect",
      x: 480,
      y: 130,
      width: 280,
      height: 340,
      label: "Back Wall Section",
      zIndex: 2
    }
  ]
},

  hall_turn_right: {
  id: "hall_turn_right",
  width: 1000,
  height: 600,
  background: {
    type: "svg",
    markup: `
      <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="1000" height="600" fill="#101115"/>

        <!-- ceiling and floor -->
        <polygon points="0,0 1000,0 760,130 240,130" fill="#7b5a37"/>
        <polygon points="0,600 1000,600 760,470 240,470" fill="#7b5a37"/>

        <!-- left wall remains -->
        <polygon points="0,0 240,130 240,470 0,600" fill="#3d3e43"/>

        <!-- right side opens into turn -->
        <polygon points="240,130 520,130 520,470 240,470" fill="#8a8a8a"/>
        <polygon points="520,130 760,130 1000,0 1000,600 760,470 520,470" fill="#050608"/>

        <!-- right wall edge to imply turn -->
        <polygon points="760,130 1000,0 1000,120 860,180 760,180" fill="#2a2b30"/>
        <polygon points="760,420 860,420 1000,480 1000,600 760,470" fill="#2a2b30"/>

        <!-- turn arrow -->
        <g transform="translate(675 305)">
          <circle cx="0" cy="0" r="38" fill="rgba(255,255,255,0.05)"/>
          <path d="M30 0 L2 -24 L2 -12 L-28 -12 L-28 12 L2 12 L2 24 Z"
            fill="#d4b083" stroke="#6e5538" stroke-width="4"/>
        </g>
      </svg>
    `
  },
  templateObjects: [
    {
      id: "right_turn_exit",
      shape: "circle",
      cx: 675,
      cy: 305,
      r: 54,
      label: "Turn Right",
      zIndex: 3
    },
    {
      id: "back_wall_left",
      shape: "rect",
      x: 240,
      y: 130,
      width: 280,
      height: 340,
      label: "Back Wall Section",
      zIndex: 2
    }
  ]
},

  hall_four_way: {
    id: "hall_four_way",
    width: 1000,
    height: 600,
    background: {
      type: "svg",
      markup: `
        <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="1000" height="600" fill="#101115"/>

          <polygon points="0,0 1000,0 760,130 240,130" fill="#7b5a37"/>
          <polygon points="0,600 1000,600 760,470 240,470" fill="#7b5a37"/>
          <polygon points="0,0 240,130 240,470 0,600" fill="#3d3e43"/>
          <polygon points="1000,0 760,130 760,470 1000,600" fill="#3d3e43"/>
          <rect x="240" y="130" width="520" height="340" fill="#8a8a8a"/>

          <rect x="430" y="250" width="140" height="220" fill="#050608"/>

          <g transform="translate(305 300)">
            <circle cx="0" cy="0" r="34" fill="rgba(255,255,255,0.05)"/>
            <path d="M-28 0 L-2 -22 L-2 -10 L24 -10 L24 10 L-2 10 L-2 22 Z"
              fill="#d4b083" stroke="#6e5538" stroke-width="4"/>
          </g>

          <g transform="translate(695 300)">
            <circle cx="0" cy="0" r="34" fill="rgba(255,255,255,0.05)"/>
            <path d="M28 0 L2 -22 L2 -10 L-24 -10 L-24 10 L2 10 L2 22 Z"
              fill="#d4b083" stroke="#6e5538" stroke-width="4"/>
          </g>

          <g transform="translate(500 220)">
            <circle cx="0" cy="0" r="34" fill="rgba(255,255,255,0.05)"/>
            <path d="M0 -28 L22 -2 L10 -2 L10 24 L-10 24 L-10 -2 L-22 -2 Z"
              fill="#d4b083" stroke="#6e5538" stroke-width="4"/>
          </g>
        </svg>
      `
    },
    templateObjects: [
      {
        id: "left_exit",
        shape: "circle",
        cx: 305,
        cy: 300,
        r: 48,
        label: "Left Exit",
        zIndex: 3
      },
      {
        id: "right_exit",
        shape: "circle",
        cx: 695,
        cy: 300,
        r: 48,
        label: "Right Exit",
        zIndex: 3
      },
      {
        id: "forward_exit",
        shape: "circle",
        cx: 500,
        cy: 220,
        r: 48,
        label: "Forward Exit",
        zIndex: 3
      },
      {
        id: "center_floor",
        shape: "rect",
        x: 240,
        y: 130,
        width: 520,
        height: 340,
        label: "Center",
        zIndex: 2
      }
    ]
  },

  side_room_end: {
    id: "side_room_end",
    width: 1000,
    height: 600,
    background: {
      type: "svg",
      markup: `
        <svg viewBox="0 0 1000 600" class="vp-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="1000" height="600" fill="#101115"/>

          <polygon points="0,0 1000,0 760,130 240,130" fill="#7b5a37"/>
          <polygon points="0,600 1000,600 760,470 240,470" fill="#7b5a37"/>
          <polygon points="0,0 240,130 240,470 0,600" fill="#3d3e43"/>
          <polygon points="1000,0 760,130 760,470 1000,600" fill="#3d3e43"/>
          <rect x="240" y="130" width="520" height="340" fill="#8a8a8a"/>

          <rect x="300" y="180" width="110" height="80" fill="#6d5235" stroke="#4b3722" stroke-width="6"/>
          <rect x="590" y="180" width="110" height="80" fill="#6d5235" stroke="#4b3722" stroke-width="6"/>
          <rect x="430" y="300" width="140" height="36" fill="#5b4028"/>
          <rect x="450" y="230" width="100" height="70" fill="#5b4028"/>
        </svg>
      `
    },
    templateObjects: [
      {
        id: "back_exit",
        shape: "circle",
        cx: 500,
        cy: 515,
        r: 54,
        label: "Back",
        zIndex: 2
      },
      {
        id: "left_painting",
        shape: "rect",
        x: 300,
        y: 180,
        width: 110,
        height: 80,
        label: "Painting",
        zIndex: 3
      },
      {
        id: "right_painting",
        shape: "rect",
        x: 590,
        y: 180,
        width: 110,
        height: 80,
        label: "Painting",
        zIndex: 3
      },
      {
        id: "table",
        shape: "rect",
        x: 430,
        y: 300,
        width: 140,
        height: 36,
        label: "Table",
        zIndex: 3
      },
      {
        id: "cabinet",
        shape: "rect",
        x: 450,
        y: 230,
        width: 100,
        height: 70,
        label: "Cabinet",
        zIndex: 3
      }
    ]
  }
};