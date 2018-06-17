const config = {
  MAX_PODS: 90,
  ELEMENTS_TO_GATHER: [ 38 ],
  OPEN_BAGS: true
}

const move = [
  { map: "4,-17", path: "top", gather: true },
  { map: "4,-18", path: "top", gather: true },
  { map: "4,-19", path: "right", gather: true },
  { map: "5,-19", path: "top", gather: true },
  { map: "5,-20", path: "top", gather: true },
  { map: "5,-21", path: "top", gather: true },
  { map: "5,-22", path: "top", gather: true },
  { map: "5,-23", path: "top", gather: true },
  { map: "5,-24", path: "top", gather: true },
  { map: "5,-25", path: "top", gather: true },
  { map: "5,-26", path: "top", gather: true },
  { map: "5,-27", path: "top", gather: true },
  { map: "5,-28", path: "top", gather: true },
  { map: "5,-29", path: "right", gather: true },
  { map: "6,-29", path: "bottom", gather: true },
  { map: "6,-24", path: "left", gather: true },
  { map: "6,-25", path: "bottom", gather: true },
  { map: "6,-26", path: "bottom", gather: true },
  { map: "6,-27", path: "bottom", gather: true },
  { map: "6,-28", path: "bottom", gather: true },
  { map: 84674566, path: "top" },
  { map: 83887104, path: "396" },
]

const bank = [
  { map: "5,-28", path: "bottom"},
  { map: "5,-27", path: "bottom"},
  { map: "5,-26", path: "bottom"},
  { map: "5,-25", path: "bottom"},
  { map: "5,-24", path: "bottom"},
  { map: "5,-23", path: "bottom"},
  { map: "5,-22", path: "bottom"},
  { map: "5,-21", path: "bottom"},
  { map: "5,-20", path: "bottom"},
  { map: "5,-19", path: "left"},
  { map: "4,-19", path: "bottom"},
  { map: "4,-18", path: "bottom"},
  { map: "4,-17", path: "bottom"},
  { map: "4,-16", path: "bottom"},
  { map: "6,-28", path: "left"},
  { map: "6,-27", path: "left"},
  { map: "6,-26", path: "left"},
  { map: "6,-25", path: "left"},
  { map: "6,-24", path: "left"},
  { map: 84674566, door: 303 }, // Map extérieure de la banque
  { map: 83887104, npcBank: true, path: "330" } // Map intérieure de la banque
]
