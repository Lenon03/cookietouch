const config = {
  MAX_PODS: 90
}

const move = [
  { map: 80216580, direction: "right" },
  { map: 80217092, direction: "right" },
  { map: 80217604, direction: "right" },
  { map: 80218116, direction: "right" },
  { map: 80218628, direction: "right" },
  { map: 80219140, direction: "right" },
  { map: 80219652, direction: "right" },
  { map: 80220164, direction: "right" },
  { map: 80220676, custom: function* () {
    printSuccess("Super ça marche!")
    yield* npc.npc(-1, 1)
    printSuccess("After NPC! -> dialog? " + isInDialog)
    if (isInDialog) {
      printMessage("Je parle au mec pour descendre à Astrub.")
      yield* npc.reply(-1)
      yield* npc.reply(-1)
    }
  }}
]
