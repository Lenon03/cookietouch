const config = {
  MAX_PODS: 90
}

const move = [
  { map: 145720, custom: usePotion },
  { map: 7340292, custom: usePotion },
]

async function* usePotion() {
  if (currentMapId() === 145720) {
    yield* await useLockedHouse(480, "10203040");
  }

  if (currentMapId() === 7340292) {
    yield* await useLockedStorage(298, "10203040");
    yield* await storage.putAllItems();
    yield* await storage.getItem(6965, 1);
    yield* await leaveDialog();
    yield* await inventory.useItem(6965);
  }

}
