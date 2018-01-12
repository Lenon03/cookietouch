const config = {
  MAX_PODS: 90,
  AUTO_DELETE: [ 310, 16524 ], // Os de Chafer & Relique d'Incarnam
  MIN_MONSTERS: 1,
  MAW_MONSTERS: 3,
  DISPLAY_FIGHT_COUNT: true
}

const move = [
  { map: 153092354, door: 409 },
  { map: 152045573, direction: "right" },
  { map: "-2,-3", direction: "right" },
  { map: "-1,-3", direction: "right" },
  { map: "0,-3", direction: "right" },
  { map: "1,-3", direction: "right" },
  { map: "2,-3", direction: "right" },
  { map: "3,-3", direction: "bottom" },
  { map: "3,-2", direction: "bottom" },
  { map: "3,-1", direction: "bottom" },
  { map: "3,0", direction: "bottom|right" },
  { map: "3,1", direction: "top|right", fight: true },
  { map: "4,-1", direction: "bttom|right", fight: true },
  { map: "4,0", direction: "top|right|bottom|left", fight: true },
  { map: "4,1", direction: "top|left", fight: true },
  { map: "5,-1", direction: "bottom|left", fight: true },
  { map: "5,0", direction: "top|left", fight: true }
]
