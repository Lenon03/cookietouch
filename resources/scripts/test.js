const config = {
  MAX_PODS: 90
}

const move = [
  {
    map: "8,3",
    custom: function* () {
      printMessage(`J'ai ${inventory.pods} pods !!!`)
    }
  }
]
