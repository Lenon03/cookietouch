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
  if (await API.fight.fight.bind(API.fight)(forbiddenMonsters, mandatoryMonsters, minMonsters, maxMonsters, minMonstersLevel, maxMonstersLevel)) {
    yield;
  }
}
// Gather
const canGather = API.gather.canGather.bind(API.gather)
async function* gather(...resourcesIds) {
  if (await API.gather.gather.bind(API.gather)(...resourcesIds)) {
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
  await delayFunc(ms);
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
    if (await API.inventory.useItem.bind(API.inventory)(gid, qty)) {
      yield;
    }
  },
  equipItem: async function* (gid) {
    if (await API.inventory.equipItem.bind(API.inventory)(gid)) {
      yield;
    }
  },
  unEquipItem: async function* (gid) {
    if (await API.inventory.unEquipItem.bind(API.inventory)(gid)) {
      yield;
    }
  },
  dropItem: async function* (gid, qty) {
    if (await API.inventory.dropItem.bind(API.inventory)(gid, qty)) {
      yield;
    }
  },
  deleteItem: async function* (gid, qty) {
    if (await API.inventory.deleteItem.bind(API.inventory)(gid, qty)) {
      yield;
    }
  }
}
// Map
async function* changeMap(where) {
  if (await API.map.changeMap.bind(API.map)(where)) {
    yield;
  }
}
async function* moveToCell(cellId) {
  if (await API.map.moveToCell.bind(API.map)(cellId)) {
    yield;
  }
}
async function* useById(elementId, skillInstanceUid) {
  if (await API.map.useById.bind(API.map)(elementId, skillInstanceUid)) {
    yield;
  }
}
async function* use(elementCellId, skillInstanceUid) {
  if (await API.map.use.bind(API.map)(elementCellId, skillInstanceUid)) {
    yield;
  }
}
async function* useLockedHouse(doorCellId, lockCode) {
  if (await API.map.useLockedHouse.bind(API.map)(doorCellId, lockCode)) {
    yield;
  }
}
async function* useLockedStorage(elementCellId, lockCode) {
  if (await API.map.useLockedStorage.bind(API.map)(elementCellId, lockCode)) {
    yield;
  }
}
async function* useZaap(destinationMapId) {
  if (await API.map.useZaap.bind(API.map)(destinationMapId)) {
    yield;
  }
}
async function* useZaapi(destinationMapId) {
  if (await API.map.useZaapi.bind(API.map)(destinationMapId)) {
    yield;
  }
}
async function* saveZaap() {
  if (await API.map.saveZaap.bind(API.map)()) {
    yield;
  }
}
async function* waitMapChange(delay) {
  if (await API.map.waitMapChange.bind(API.map)(delay)) {
    yield;
  }
}
async function* joinFriend(name) {
  if (await API.map.joinFriend.bind(API.map)(name)) {
    yield;
  }
}
const onCell = API.map.onCell.bind(API.map);
const onMap = API.map.onMap.bind(API.map);
const currentPos = API.map.currentPos.bind(API.map);
const currentMapId = API.map.currentMapId.bind(API.map);
const area = API.map.area.bind(API.map);
const subArea = API.map.subArea.bind(API.map);
// Craft
const craft = {
  newCraft : async function* (guid,count)
  {
    if(await API.craft.newCraft.bind(API.craft)(guid, count)){
      yield;
    }
  }
}
// Npc
const npc = {
  npcBank: async function* (npcId, replyId) {
    if (await API.npc.npcBank.bind(API.npc)(npcId, replyId)) {
      yield;
    }
  },
  npc: async function* (npcId, actionIndex) {
    if (await API.npc.npc.bind(API.npc)(npcId, actionIndex)) {
      yield;
    }
  },
  reply: async function* (replyId) {
    await API.npc.reply.bind(API.npc)(replyId);
    yield;
  },
  buy: async function* (guid,quantity) {
    if(await API.npc.buy.bind(API.npc)(guid,quantity))
    {
      yield;
    }
  },
  sell: async function* (guid,quantity) {
      if(await API.npc.sell.bind(API.npc)(guid,quantity))
      {
        yield;
      }
  }
}
// Mount
const mount = {
  isRiding: API.mount.isRiding.bind(API.mount),
  hasMount: API.mount.hasMount.bind(API.mount),
  currentRatio: API.mount.currentRatio.bind(API.mount),
  currentLevel: API.mount.currentLevel.bind(API.mount),
  toggleRiding: async function* () {
    if (await API.mount.toggleRiding.bind(API.mount)()) {
      yield;
    }
  },
  setRatio: async function* (ratio) {
    if (await API.mount.setRatio.bind(API.mount)(ratio)) {
      yield;
    }
  }
}
// Storage
const storage = {
  itemCount: API.storage.itemCount.bind(API.storage),
  kamas: API.storage.kamas.bind(API.storage),
  putItem: async function* (gid, qty) {
    if (await API.storage.putItem.bind(API.storage)(gid, qty)) {
      yield;
    }
  },
  getItem: async function* (gid, qty) {
    if (await API.storage.getItem.bind(API.storage)(gid, qty)) {
      yield;
    }
  },
  putKamas: async function* (qty) {
    if (await API.storage.putKamas.bind(API.storage)(qty)) {
      yield;
    }
  },
  getKamas: async function* (qty) {
    if (await API.storage.getKamas.bind(API.storage)(qty)) {
      yield;
    }
  },
  putAllItems: async function* () {
    if (await API.storage.putAllItems.bind(API.storage)()) {
      yield;
    }
  },
  getAllItems: async function* () {
    if (await API.storage.getAllItems.bind(API.storage)()) {
      yield;
    }
  },
  putExistingItems: async function* () {
    if (await API.storage.putExistingItems.bind(API.storage)()) {
      yield;
    }
  },
  getExistingItems: async function* () {
    if (await API.storage.getExistingItems.bind(API.storage)()) {
      yield;
    }
  }
}
// Exchange
const exchange = {
  weightP: API.exchange.weightP.bind(API.exchange),
  targetWeightP: API.exchange.targetWeightP.bind(API.exchange),
  startExchange: async function* (playerId) {
    await API.exchange.startExchange.bind(API.exchange)(playerId)
    yield;
  },
  sendReady: async function* () {
    await API.exchange.sendReady.bind(API.exchange)()
    yield;
  },
  startShop: async function* () {
    await API.exchange.startShop.bind(API.exchange)()
    yield;
  },
  addItemShop: async function* (gid,qty,price) {
    await API.exchange.addItemShop.bind(API.exchange)(gid,qty,price)
    yield;
  },
  putItem: async function* (gid, qty) {
    await API.exchange.putItem.bind(API.exchange)(gid, qty)
    yield;
  },
  removeItem: async function* (gid, qty) {
    await API.exchange.removeItem.bind(API.exchange)(gid, qty)
    yield;
  },
  putKamas: async function* (qty) {
    await API.exchange.putKamas.bind(API.exchange)(qty)
    yield;
  },
  removeKamas: async function* (qty) {
    await API.exchange.removeKamas.bind(API.exchange)(qty)
    yield;
  },
  putAllItems: async function* () {
    await API.exchange.putAllItems.bind(API.exchange)()
    yield;
  },
  removeAllItems: async function* () {
    await API.exchange.removeAllItems.bind(API.exchange)()
    yield;
  }
}
// Bid
const bid = {
  startBuying: async function* () {
    if (await API.bid.startBuying.bind(API.bid)()) {
      yield;
    }
  },
  getItemPrice: async function (gid, lot) {
    return await API.bid.getItemPrice.bind(API.bid)(gid, lot);
  },
  buyItem: async function* (gid, lot) {
    if (await API.bid.buyItem.bind(API.bid)(gid, lot)) {
      yield;
    }
  },
  startSelling: async function* () {
    if (await API.bid.startSelling.bind(API.bid)()) {
      yield;
    }
  },
  itemsInSaleCount: API.bid.itemsInSaleCount.bind(API.bid),
  getItemsInSale: API.bid.getItemsInSale.bind(API.bid),
  sellItem: async function* (gid, lot, price) {
    if (await API.bid.sellItem.bind(API.bid)(gid, lot, price)) {
      yield;
    }
  },
  editItemInSalePrice: async function* (uid, newPrice) {
    if (await API.bid.editItemInSalePrice.bind(API.bid)(uid, newPrice)) {
      yield;
    }
  },
  removeItemInSale: async function* (uid) {
    if (await API.bid.removeItemInSale.bind(API.bid)(uid)) {
      yield;
    }
  }
}
