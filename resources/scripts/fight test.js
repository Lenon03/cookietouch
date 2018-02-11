const config = {
  DISPLAY_FIGHT_COUNT: true,
  DISPLAY_GATHER_COUNT: true,
  MAX_PODS: 90,
  AUTO_DELETE: [1, 2, 3],
  AUTO_REGEN: {
    items: [1, 2, 3],
    store: 100,
    minLife: 50,
    maxLife: 80,
  },
  OPEN_BAGS: true,
  ELEMENTS_TO_GATHER: [1, 2, 3],
  MIN_MONSTERS: 1,
  MAX_MONSTERS: 3,
  MAX_FIGHTS_PER_MAP: 10,
  MIN_MONSTERS_LEVEL: 1,
  MAX_MONSTERS_LEVEL: 20,
  FORBIDDEN_MONSTERS: [1, 2, 3],
  MANDATORY_MONSTERS: [],
  BANK_PUT_ITEMS: [
    { id: 1, quantity: 10 },
    { id: 2, quantity: 10 },
  ],
  BANK_GET_ITEMS: [
    { id: 1, quantity: 10 },
    { id: 2, quantity: 10 },
  ],
  BANK_PUT_KAMAS: 0,
  BANK_GET_KAMAS: 0,
}

const move = [
  { map: "6,-16", fight: true, path: "right" },
  { map: "7,-16", fight: true, path: "left" }
]
