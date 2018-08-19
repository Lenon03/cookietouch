# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Fonction](#fonctions)
- [Mise en pratique](#mise-en-pratique)


<h2 id="fonctions">Fonction</h2>

Par habitude il est préférable de mettre sa fonction en async directement pour pouvoir utiliser des actions qui seront async elles aussi.


**Exemple:**


```js
async function* usePotion() {
if (currentMapId() === 67371008) {
  yield* await inventory.useItem(6965);
  yield* await delay(1000);
}
```
<hr>

<h2 id="mise-en-pratique">Mise en pratique</h2>

Voici quelques exemples de fonctions possibles avec CookieTouch.

```js
async function* buyWheat() {
  const item = 289;
  const lot = 100;
  const prixMin = 300;
  const itemWeight = inventory.itemWeight(item);
  printMessage(`Le poid d'un item ${item} est de ${itemWeight} pods.`);
  // Active l'achat.
  yield* await bid.startBuying();
  if (isInDialog()) {
    printMessage("Je suis en mode achat.");
    // Retourne le prix du lot de 100 items.
    const prixBle = await bid.getItemPrice(item, lot);
    printMessage(`Le prix de ${lot} items ${item} est de ${prixBle}k`);
    // Si le prix est inferieur à ce qu'on veut
    if (prixBle < prixMin) {
      // Nombre maximum qu'on peut avoir dans l'inventaire.
      const maxItems = Math.ceil((inventory.podsMax - inventory.pods) / itemWeight);
      // Nombre maimum de lots possible à acheter.
      const maxLots = Math.ceil(maxItems / lot);
      // Achat de tous les lots.
      printMessage(`Je peut acheter ${maxLots}.`);
      for (let i = 0; i < maxLots; i++) {
        yield* await bid.buyItem(item, lot); // Achète 100 items.
      }
      // On quitte le dialogue.
      yield* await leaveDialog();
      if (inventory.podsP < 90) {
        printMessage(`Je ne suis pas plein, j'attend 1 min avant de réouvrir l'HDV.`);
        yield* await delay(1 * 60 * 1000);
      } else {
        printMessage(`Je vais poser en banque.`);
      }
    } else {
      // On quitte le dialogue.
      yield* await leaveDialog();
      printMessage(`Je n'achète pas, ${prixBle - prixMin}k trop cher. Attente de 1 minute...`);
      yield* await delay(1 * 60 * 1000);
    }
  }
}
```

<hr>

```js
let config = {
	MAX_PODS : 90,
	OPEN_BAGS : false,
	AUTO_DELETE : [  ],
	MIN_MONSTERS : 1,
	MAX_MONSTERS : 8,
	FORBIDDEN_MONSTERS : [  ],
	MANDATORY_MONSTERS : [  ],
}

// ON DECLARE D'ABORD LES TABLEAUX DE BASE (phenix, move, bank)
let bank = [];
let move = [];


switch(true){
        // -------------------
	// BOT DU LEVEL 1 à 11
	// -------------------
	case (character.level <= 11):
	        // --------------------------------------------------
		// --------------- CONFIGURATION --------------------
		// --------------------------------------------------
                // ON PEUT CHANGER LA CONFIG AVEC DES CONDITIONS
                // --------------------------------------------------
		config.AUTO_DELETE = [2425, 2422, 2419, 395, 385, 885, 882, 887, 304];
		if(character.level < 4){
			config.MAX_MONSTERS = 2;
		}
		if(character.level < 6 && character.level > 4){
			config.MAX_MONSTERS = 3;
		}
                move = [
                          // VOTRE TRAJET COMBAT
			  { map: "4,-19", path: "top" }, //( Zaap astrub )
			  { map: "4,-20", fight: true, path: "top" },
		];
		bank = [
                        // VOTRE TRAJET BANQUE
			{ map: "4,-19", path: "bottom" },
		];
        break;
	// -------------------
	// BOT DU LEVEL 12 à 41
	// -------------------
        case (character.level >= 12 && character.level <= 41): 
		// --------------------------------------------------
		// --------------- CONFIGURATION --------------------
		// --------------------------------------------------
                // ON PEUT CHANGER LA CONFIG AVEC DES CONDITIONS
                // --------------------------------------------------
		if(character.level <= 16){
			config.MAX_MONSTERS = 2;
		}
		if(character.level >= 17 && character.level <= 20){
			config.MAX_MONSTERS = 3;
		}
                move = [
                          // VOTRE TRAJET COMBAT
			  { map: "4,-19", path: "top" }, //( Zaap astrub )
			  { map: "4,-20", fight: true, path: "top" },
		];
		bank = [
                        // VOTRE TRAJET BANQUE
			{ map: "4,-19", path: "bottom" },
		];
        break;
    default:
        printMessage("N'a pas de trajet pour ce level.");
}

```

<hr>

