// Character
const character = {
  isAlive: API.character.isAlive,
  isTombstone: API.character.isTombstone,
  isPhantom: API.character.isPhantom,
  name: API.character.name,
  level: API.character.level,
  sex: API.character.sex,
  lifePoints: API.character.lifePoints,
  maxLifePoints: API.character.maxLifePoints,
  lifePointsP: API.character.lifePointsP,
  experience: API.character.experience,
  energyPoints: API.character.energyPoints,
  maxEnergyPoints: API.character.maxEnergyPoints,
  energyPointsP: API.character.energyPointsP,
  kamas: API.character.kamas,
  sit: API.character.sit,
  freeSoul: API.character.freeSoul
}
// Jobs
const jobs = {
  hasJob: API.jobs.hasJob,
  name: API.jobs.name,
  level: API.jobs.level,
  getCollectSkills: API.jobs.getCollectSkills,
  allCollectSkills: API.jobs.allCollectSkills,
}
// Fight
const canFight = API.fight.canFight
function* fight(forbiddenMonsters, mandatoryMonsters, minMonsters, maxMonsters, minMonstersLevel, maxMonstersLevel) {
  if (API.fight.fight(forbiddenMonsters, mandatoryMonsters, minMonsters, maxMonsters, minMonstersLevel, maxMonstersLevel)) {
    yield;
  }
}
// Gather
const canGather = API.gather.canGather
function* gather(...resourcesIds) {
  if (API.gather.gather(...resourcesIds)) {
    yield;
  }
}
// Global
const isFighting = API.isFighting
const isGathering = API.isGathering
const isInDialog = API.isInDialog
const printMessage = API.printMessage
const printDebug = API.printDebug
const printSuccess = API.printSuccess
const printError = API.printError
const stopScript = API.stopScript
const delayFunc = API.delayFunc
const leaveDialogFunc = API.leaveDialogFunc
function* delay(ms) {
  delayFunc(ms)
  yield;
}
function* leaveDialog() {
  if (leaveDialogFunc()) {
    yield;
  }
}
// Inventory
const inventory = {
  pods: API.inventory.pods,
  podsMax: API.inventory.podsMax,
  podsP: API.inventory.podsP,
  itemCount: API.inventory.itemCount,
  itemWeight: API.inventory.itemWeight,
  useItem: function* (gid, qty) {
    if (API.inventory.useItem(gid, qty)) {
      yield;
    }
  },
  equipItem: function* (gid) {
    if (API.inventory.equipItem(gid)) {
      yield;
    }
  },
  unEquipItem: function* (gid) {
    if (API.inventory.unEquipItem(gid)) {
      yield;
    }
  },
  dropItem: function* (gid, qty) {
    if (API.inventory.dropItem(gid)) {
      yield;
    }
  },
  deleteItem: function* (gid, qty) {
    if (API.inventory.deleteItem(gid)) {
      yield;
    }
  }
}
// Map
function* changeMap(where) {
  if (API.map.changeMap(where)) {
    yield;
  }
}
function* moveToCell(cellId) {
  if (API.map.moveToCell(cellId)) {
    yield;
  }
}
function* useById(elementId, skillInstanceUid) {
  if (API.map.useById(elementId, skillInstanceUid)) {
    yield;
  }
}
function* use(elementCellId, skillInstanceUid) {
  if (API.map.use(elementCellId, skillInstanceUid)) {
    yield;
  }
}
function* useLockedHouse(doorCellId, lockCode) {
  if (API.map.useLockedHouse(doorCellId, lockCode)) {
    yield;
  }
}
function* useLockedStorage(elementCellId, lockCode) {
  if (API.map.useLockedStorage(elementCellId, lockCode)) {
    yield;
  }
}
function* useZaap(destinationMapId) {
  if (API.map.useZaap(destinationMapId)) {
    yield;
  }
}
function* useZaapi(destinationMapId) {
  if (API.map.useZaapi(destinationMapId)) {
    yield;
  }
}
function* saveZaap() {
  if (API.map.saveZaap()) {
    yield;
  }
}
function* waitMapChange(delay) {
  if (API.map.waitMapChange(delay)) {
    yield;
  }
}
function* joinFriend(name) {
  if (API.map.joinFriend(name)) {
    yield;
  }
}
const onCell = API.map.onCell
const onMap = API.map.onMap
const currentPos = API.map.currentPos
const currentMapId = API.map.currentMapId
const area = API.map.area
const subArea = API.map.subArea
// Npc
const npc = {
  npcBank: function* (npcId, replyId) {
    if (API.npc.npcBank(npcId, replyId)) {
      yield;
    }
  },
  npc: function* (npcId, actionIndex) {
    if (API.npc.npc(npcId, actionIndex)) {
      yield;
    }
  },
  reply: function* (replyId) {
    API.npc.reply(replyId);
    yield;
  }
}
// Mount
const mount = {
  isRiding: API.mount.isRiding,
  hasMount: API.mount.hasMount,
  currentRatio: API.mount.currentRatio,
  toggleRiding: function* () {
    if (API.mount.toggleRiding()) {
      yield;
    }
  },
  setRatio: function* (ratio) {
    if (API.mount.setRatio(ratio)) {
      yield;
    }
  }
}
// Storage
const storage = {
  itemCount: API.storage.itemCount,
  kamas: API.storage.kamas,
  putItem: function* (gid, qty) {
    if (API.storage.putItem(gid, qty)) {
      yield;
    }
  },
  getItem: function* (gid, qty) {
    if (API.storage.getItem(gid, qty)) {
      yield;
    }
  },
  putKamas: function* (qty) {
    if (API.storage.putKamas(qty)) {
      yield;
    }
  },
  getKamas: function* (qty) {
    if (API.storage.getKamas(qty)) {
      yield;
    }
  },
  putAllItems: function* () {
    if (API.storage.putAllItems()) {
      yield;
    }
  },
  getAllItems: function* () {
    if (API.storage.getAllItems()) {
      yield;
    }
  },
  putExistingItems: function* () {
    if (API.storage.putExistingItems()) {
      yield;
    }
  },
  getExistingItems: function* () {
    if (API.storage.getExistingItems()) {
      yield;
    }
  }
}
// Exchange
const exchange = {
  weightP: API.exchange.weightP,
  targetWeightP: API.exchange.targetWeightP,
  startExchange: function* (playerId) {
    API.exchange.startExchange(playerId)
    yield;
  },
  sendReady: function* () {
    API.exchange.sendReady()
    yield;
  },
  putItem: function* (gid, qty) {
    API.exchange.putItem(gid, qty)
    yield;
  },
  removeItem: function* (gid, qty) {
    API.exchange.removeItem(gid, qty)
    yield;
  },
  putKamas: function* (qty) {
    API.exchange.putKamas(qty)
    yield;
  },
  removeKamas: function* (qty) {
    API.exchange.removeKamas(qty)
    yield;
  },
  putAllItems: function* () {
    API.exchange.putAllItems()
    yield;
  }
}
// Bid
const bid = {
  startBuying: function* () {
    if (API.bid.startBuying()) {
      yield;
    }
  },
  getItemPrice: async function (gid, lot) {
    return await API.bid.getItemPrice(gid, lot);
  },
  buyItem: function* (gid, lot) {
    if (API.bid.buyItem(gid, lot)) {
      yield;
    }
  },
  startSelling: function* () {
    if (API.bid.startSelling()) {
      yield;
    }
  },
  itemsInSaleCount: API.bid.itemsInSaleCount,
  getItemsInSale: API.bid.getItemsInSale,
  sellItem: function* (gid, lot, price) {
    if (API.bid.sellItem(gid, lot, price)) {
      yield;
    }
  },
  editItemInSalePrice: function* (uid, newPrice) {
    if (API.bid.editItemInSalePrice(uid, newPrice)) {
      yield;
    }
  },
  removeItemInSale: function* (uid) {
    if (API.bid.removeItemInSale(uid)) {
      yield;
    }
  }
}
