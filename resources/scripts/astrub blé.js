const config = {
  MAX_PODS: 90,
  ELEMENTS_TO_GATHER: [ 38 ],
  OPEN_BAGS: true
}

const move = [
  { map: "4,-28", path: "right|bottom", gather: true },
  { map: "5,-28", path: "right|bottom|left", gather: true },
  { map: "6,-28", path: "bottom|left", gather: true },
  { map: "4,-27", path: "top|right|bottom", gather: true },
  { map: "5,-27", path: "top|right|bottom|left", gather: true },
  { map: "6,-27", path: "top|bottom|left", gather: true },
  { map: "4,-26", path: "top|right|bottom", gather: true },
  { map: "5,-26", path: "top|right|bottom|left", gather: true },
  { map: "6,-26", path: "top|right|bottom|left", gather: true },
  { map: "7,-26", path: "right|bottom|left", gather: true },
  { map: "8,-26", path: "bottom|left", gather: true },
  { map: "4,-25", path: "top|right|bottom", gather: true },
  { map: "5,-25", path: "top|right|bottom|left", gather: true },
  { map: "6,-25", path: "top|right|bottom|left", gather: true },
  { map: "7,-25", path: "top|right|bottom|left", gather: true },
  { map: "8,-25", path: "top|left", gather: true },
  { map: "4,-24", path: "top|right", gather: true },
  { map: "5,-24", path: "top|right|left", gather: true },
  { map: "6,-24", path: "top|right|left", gather: true },
  { map: "7,-24", path: "top|left", gather: true },
]

const bank = [
  { map: "4,-28", custom: stopCustom },
  { map: "5,-28", custom: stopCustom },
  { map: "6,-28", custom: stopCustom },
  { map: "4,-27", custom: stopCustom },
  { map: "5,-27", custom: stopCustom },
  { map: "6,-27", custom: stopCustom },
  { map: "4,-26", custom: stopCustom },
  { map: "5,-26", custom: stopCustom },
  { map: "6,-26", custom: stopCustom },
  { map: "7,-26", custom: stopCustom },
  { map: "8,-26", custom: stopCustom },
  { map: "4,-25", custom: stopCustom },
  { map: "5,-25", custom: stopCustom },
  { map: "6,-25", custom: stopCustom },
  { map: "7,-25", custom: stopCustom },
  { map: "8,-25", custom: stopCustom },
  { map: "4,-24", custom: stopCustom },
  { map: "5,-24", custom: stopCustom },
  { map: "6,-24", custom: stopCustom },
  { map: "7,-24", custom: stopCustom },
]

function* stopCustom() {
  stopScript("Je m'arrete pour vendre.");
}
