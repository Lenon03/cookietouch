const config = {
  MAX_PODS: 90,
  BANK_PUT_ITEMS: [
    { id: 289, quantity: 0 },
  ],
  BANK_GET_ITEMS: [
    { id: 289, quantity: 1 },
  ],
}

const move = [
  { map: 99095051, custom: buyWheat },
]

const bank = [
  { map: 99095051, npcBank: true },
]

function* buyWheat() {
  const item = 289;
  const lot = 100;
  const prixMin = 300;
  const itemWeight = inventory.itemWeight(item);
  // Active l'achat.
  yield* bid.startBuying();
  if (isInDialog()) {
    printMessage("Je suis en mode achat.");
    // Retourne le prix du lot de 100 blé.
    bid.getItemPrice(item, lot).then((prixBle) => {
      printMessage(`Le prix de 100 blé est de ${prixBle}`);
      // Si le prix est inferieur à ce qu'on veut
      if (prixBle < prixMin) {
        // Nombre maximum qu'on peut avoir dans l'inventaire.
        const maxItems = Math.ceil((inventory.podsMax - inventory.pods) / itemWeight);
        // Nombre maimum de lots possible à acheter.
        const maxLots = Math.ceil(maxItems / lot);
        // Achat de tous les lots.
        printMessage(`Je peut acheter ${maxLots}.`);
        for (let i = 0; i < maxLots; i++) {
          yield* bid.buyItem(item, lot); // Achète 100 blé.
        }
        // On quitte le dialogue.
        yield leaveDialog();
        if (inventory.podsP < 90) {
          printMessage(`Je ne suis pas plein, j'attend 5 mins avant de réouvrir l'HDV.`);
          yield* delay(5 * 60 * 1000);
        } else {
          printMessage(`Je vais poser en banque.`);
        }
      } else {
        printMessage(`Je n'achète pas, ${prixBle - prixMin}k trop cher. Attente de 5 minutes...`);
        yield* delay(5 * 60 * 1000);
      }
    });
  }
}
