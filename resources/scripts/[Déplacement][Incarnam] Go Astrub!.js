const config = {
  MAX_PODS: 90
}

const move = [
  { map: "-5,-1", path: "bottom" },
  { map: "-4,0", path: "right" },
  { map: "-3,1", path: "right" },
  { map: "-2,2", path: "bottom" },
  { map: "0,3", path: "right" },
  { map: 80216580, path: "right" },
  { map: 80217092, path: "right" },
  { map: 80217604, path: "right" },
  { map: 80218116, path: "right" },
  { map: 80218628, path: "right" },
  { map: 80219140, path: "right" },
  { map: 80219652, path: "right" },
  { map: 80220164, path: "right" },
  { map: 80220676, custom: goAstrub }
]

async function* goAstrub() {
  yield* await npc.npc(-2, 1)
  if (isInDialog()) {
    printMessage("Je parle au mec pour descendre à Astrub.")
    yield* await npc.reply(-1)
    yield* await npc.reply(-1)
  }
}
