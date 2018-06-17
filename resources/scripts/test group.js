const config = {
  MAX_PODS: 90,
  MAX_MONSTERS: 4,
  FORBIDDEN_MONSTERS: [ 98 ],
}

const move = [
  { map: "4,-28", path: "right|bottom", fight: true },
  { map: "5,-28", path: "right|bottom|left", fight: true },
  { map: "6,-28", path: "bottom|left", fight: true },
  { map: "4,-27", path: "top|right|bottom", fight: true },
  { map: "5,-27", path: "top|right|bottom|left", fight: true },
  { map: "6,-27", path: "top|bottom|left", fight: true },
  { map: "4,-26", path: "top|right|bottom", fight: true },
  { map: "5,-26", path: "top|right|bottom|left", fight: true },
  { map: "6,-26", path: "top|right|bottom|left", fight: true },
  { map: "7,-26", path: "right|bottom|left", fight: true },
  { map: "8,-26", path: "bottom|left", fight: true },
  { map: "4,-25", path: "top|right|bottom", fight: true },
  { map: "5,-25", path: "top|right|bottom|left", fight: true },
  { map: "6,-25", path: "top|right|bottom|left", fight: true },
  { map: "7,-25", path: "top|right|bottom|left", fight: true },
  { map: "8,-25", path: "top|left", fight: true },
  { map: "4,-24", path: "top|right", fight: true },
  { map: "5,-24", path: "top|right|left", fight: true },
  { map: "6,-24", path: "top|right|left", fight: true },
  { map: "7,-24", path: "top|left", fight: true },
]
