const config = {
  MAX_PODS: 100 - ((300 / inventory.podsMax) * 100),
}

const move = [
  { map: 80218115, custom: myCustom }
]

async function* myCustom() {
  printMessage(`J'ai ${inventory.pods} pods !!!`)
}
