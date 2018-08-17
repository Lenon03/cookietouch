// Character
const character = {
  isAlive: API.character.isAlive.bind(API.character),
  isTombstone: API.character.isTombstone.bind(API.character),
  isPhantom: API.character.isPhantom.bind(API.character),
  name: API.character.name.bind(API.character),
  level: API.character.level.bind(API.character),
  sex: API.character.sex.bind(API.character),
  lifePoints: API.character.lifePoints.bind(API.character),
  maxLifePoints: API.character.maxLifePoints.bind(API.character),
  lifePointsP: API.character.lifePointsP.bind(API.character),
  experience: API.character.experience.bind(API.character),
  energyPoints: API.character.energyPoints.bind(API.character),
  maxEnergyPoints: API.character.maxEnergyPoints.bind(API.character),
  energyPointsP: API.character.energyPointsP.bind(API.character),
  kamas: API.character.kamas.bind(API.character),
  sit: API.character.sit.bind(API.character),
  freeSoul: API.character.freeSoul.bind(API.character)
}
// Jobs
const jobs = {
  hasJob: API.jobs.hasJob.bind(API.jobs),
  name: API.jobs.name.bind(API.jobs),
  level: API.jobs.level.bind(API.jobs),
  getCollectSkills: API.jobs.getCollectSkills.bind(API.jobs),
  allCollectSkills: API.jobs.allCollectSkills.bind(API.jobs),
}
// Fight
const canFight = API.fight.canFight.bind(API.fight)
async function* fight(forbiddenMonsters, mandatoryMonsters, minMonsters, maxMonsters, minMonstersLevel, maxMonstersLevel) {
  if (await API.fight.fight(forbiddenMonsters, mandatoryMonsters, minMonsters, maxMonsters, minMonstersLevel, maxMonstersLevel)) {
    yield;
  }
}
// Gather
const canGather = API.gather.canGather.bind(API.gather)
async function* gather(...resourcesIds) {
  if (await API.gather.gather(...resourcesIds)) {
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
async function* delay(ms) {
  await delayFunc(ms)
  yield;
}
async function* leaveDialog() {
  if (await leaveDialogFunc()) {
    yield;
  }
}
// Inventory
const inventory = {
  pods: API.inventory.pods.bind(API.inventory),
  podsMax: API.inventory.podsMax.bind(API.inventory),
  podsP: API.inventory.podsP.bind(API.inventory),
  itemCount: API.inventory.itemCount.bind(API.inventory),
  itemWeight: API.inventory.itemWeight.bind(API.inventory),
  useItem: async function* (gid, qty) {
    if (await API.inventory.useItem(gid, qty)) {
      yield;
    }
  },
  equipItem: async function* (gid) {
    if (await API.inventory.equipItem(gid)) {
      yield;
    }
  },
  unEquipItem: async function* (gid) {
    if (await API.inventory.unEquipItem(gid)) {
      yield;
    }
  },
  dropItem: async function* (gid, qty) {
    if (await API.inventory.dropItem(gid, qty)) {
      yield;
    }
  },
  deleteItem: async function* (gid, qty) {
    if (await API.inventory.deleteItem(gid, qty)) {
      yield;
    }
  }
}
// Map
async function* changeMap(where) {
  if (await API.map.changeMap(where)) {
    yield;
  }
}
async function* moveToCell(cellId) {
  if (await API.map.moveToCell(cellId)) {
    yield;
  }
}
async function* useById(elementId, skillInstanceUid) {
  if (await API.map.useById(elementId, skillInstanceUid)) {
    yield;
  }
}
async function* use(elementCellId, skillInstanceUid) {
  if (await API.map.use(elementCellId, skillInstanceUid)) {
    yield;
  }
}
async function* useLockedHouse(doorCellId, lockCode) {
  if (await API.map.useLockedHouse(doorCellId, lockCode)) {
    yield;
  }
}
async function* useLockedStorage(elementCellId, lockCode) {
  if (await API.map.useLockedStorage(elementCellId, lockCode)) {
    yield;
  }
}
async function* useZaap(destinationMapId) {
  if (await API.map.useZaap(destinationMapId)) {
    yield;
  }
}
async function* useZaapi(destinationMapId) {
  if (await API.map.useZaapi(destinationMapId)) {
    yield;
  }
}
async function* saveZaap() {
  if (await API.map.saveZaap()) {
    yield;
  }
}
async function* waitMapChange(delay) {
  if (await API.map.waitMapChange(delay)) {
    yield;
  }
}
function* joinFriend(name) {
  if (API.map.joinFriend(name)) {
    yield;
  }
}
const onCell = API.map.onCell.bind(API.map);
const onMap = API.map.onMap.bind(API.map);
const currentPos = API.map.currentPos.bind(API.map);
const currentMapId = API.map.currentMapId.bind(API.map);
const area = API.map.area.bind(API.map);
const subArea = API.map.subArea.bind(API.map);
// Npc
const npc = {
  npcBank: async function* (npcId, replyId) {
    if (await API.npc.npcBank(npcId, replyId)) {
      yield;
    }
  },
  npc: async function* (npcId, actionIndex) {
    if (await API.npc.npc(npcId, actionIndex)) {
      yield;
    }
  },
  reply: async function* (replyId) {
    await API.npc.reply(replyId);
    yield;
  }
}
// Mount
const mount = {
  isRiding: API.mount.isRiding.bind(API.mount),
  hasMount: API.mount.hasMount.bind(API.mount),
  currentRatio: API.mount.currentRatio.bind(API.mount),
  toggleRiding: async function* () {
    if (await API.mount.toggleRiding()) {
      yield;
    }
  },
  setRatio: async function* (ratio) {
    if (await API.mount.setRatio(ratio)) {
      yield;
    }
  }
}
// Storage
const storage = {
  itemCount: API.storage.itemCount.bind(API.storage),
  kamas: API.storage.kamas.bind(API.storage),
  putItem: async function* (gid, qty) {
    if (await API.storage.putItem(gid, qty)) {
      yield;
    }
  },
  getItem: async function* (gid, qty) {
    if (await API.storage.getItem(gid, qty)) {
      yield;
    }
  },
  putKamas: async function* (qty) {
    if (await API.storage.putKamas(qty)) {
      yield;
    }
  },
  getKamas: async function* (qty) {
    if (await API.storage.getKamas(qty)) {
      yield;
    }
  },
  putAllItems: async function* () {
    if (await API.storage.putAllItems()) {
      yield;
    }
  },
  getAllItems: async function* () {
    if (await API.storage.getAllItems()) {
      yield;
    }
  },
  putExistingItems: async function* () {
    if (await API.storage.putExistingItems()) {
      yield;
    }
  },
  getExistingItems: async function* () {
    if (await API.storage.getExistingItems()) {
      yield;
    }
  }
}
// Exchange
const exchange = {
  weightP: API.exchange.weightP.bind(API.exchange),
  targetWeightP: API.exchange.targetWeightP.bind(API.exchange),
  startExchange: async function* (playerId) {
    await API.exchange.startExchange(playerId)
    yield;
  },
  sendReady: async function* () {
    await API.exchange.sendReady()
    yield;
  },
  putItem: async function* (gid, qty) {
    await API.exchange.putItem(gid, qty)
    yield;
  },
  removeItem: async function* (gid, qty) {
    await API.exchange.removeItem(gid, qty)
    yield;
  },
  putKamas: async function* (qty) {
    await API.exchange.putKamas(qty)
    yield;
  },
  removeKamas: async function* (qty) {
    await API.exchange.removeKamas(qty)
    yield;
  },
  putAllItems: async function* () {
    await API.exchange.putAllItems()
    yield;
  },
  removeAllItems: async function* () {
    await API.exchange.removeAllItems()
    yield;
  }
}
// Bid
const bid = {
  startBuying: async function* () {
    if (await API.bid.startBuying()) {
      yield;
    }
  },
  getItemPrice: async function (gid, lot) {
    return await API.bid.getItemPrice(gid, lot);
  },
  buyItem: async function* (gid, lot) {
    if (await API.bid.buyItem(gid, lot)) {
      yield;
    }
  },
  startSelling: async function* () {
    if (await API.bid.startSelling()) {
      yield;
    }
  },
  itemsInSaleCount: API.bid.itemsInSaleCount.bind(API.bid),
  getItemsInSale: API.bid.getItemsInSale.bind(API.bid),
  sellItem: async function* (gid, lot, price) {
    if (await API.bid.sellItem(gid, lot, price)) {
      yield;
    }
  },
  editItemInSalePrice: async function* (uid, newPrice) {
    if (await API.bid.editItemInSalePrice(uid, newPrice)) {
      yield;
    }
  },
  removeItemInSale: async function* (uid) {
    if (await API.bid.removeItemInSale(uid)) {
      yield;
    }
  }
}
