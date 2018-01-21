const config = {
  MAX_PODS: 90
}

const move = [
  {
    map: "6,-21",
    custom: function* () {
      printMessage(`J'ai ${inventory.pods} pods !!!`)
    }
  }
]
