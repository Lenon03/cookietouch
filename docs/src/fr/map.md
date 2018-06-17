# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Map](#map)
  - [changeMap](#changemapwhere-string)
  - [moveToCell](#movetocellcellid-number)
  - [useById](#usebyidelementid-number-skillinstanceuid-number)
  - [use](#useelementcellid-number-skillinstanceuid-number)
  - [useLockedHouse](#uselockedhousedoorcellid-number-lockcode-string)
  - [useLockedStorage](#uselockedstorageelementcellid-number-lockcode-string)
  - [useZaap](#usezaapdestinationmapid-number)
  - [useZaapi](#usezaapidestinationmapid-number)
  - [saveZaap](#savezaapdestinationmapid-number)
  - [waitMapChange](#waitmapchangedelay-number)
  - [joinFriend](#joinfriendname-string)
  - [onCell](#oncellcellid-number)
  - [onMap](#onmapcoords-string)
  - [currentPos](#currentpos)
  - [currentMapId](#currentmapid)
  - [area](#area)
  - [subArea](#subarea)

# Map
Toutes les fonctions relatives aux maps.

## <code>yield*</code>changeMap(<code>where</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de changer de carte. Les directions suivantes sont acceptées:
- `top` pour aller vers le haut.
- `bottom` pour aller vers le bas.
- `right` pour aller vers la droite.
- `left` pour aller vers la gauche.

Retourne false si le bot n'a pas pu changer de map, sinon retourne true.

**Exemple:**
```js
if (yield* changeMap("top") !== true) { // Essaie d'aller sur la map du haut.
  yield* changeMap("right"); // Si la map du haut est inaccessible, alors va a droite.
}
```

## <code>yield*</code>moveToCell(<code>cellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de se déplacer sur une cellule. Les cellId vont de 0 à 559, vous pouvez les afficher dans l'onglet Map de CookieTouch.

Retourne false si la cellule est inaccessible, sinon retourne true.

**Exemple:**
```js
cellId = 0;
while (yield* moveToCell(cellId)) {
  cellId++; // Tant que la cellId est inaccessible ajouter 1 à cellId.
}
```

## <code>yield*</code>useById(<code>elementId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, skillInstanceUid?: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser une action d’un élement interactif à partir de son identifiant.

Retourne true si l'element est utilisable, sinon retourne false.

**Exemple:**
```js
TODO
```

## <code>yield*</code>use(<code>elementCellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, skillInstanceUid?: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser une action d’un élement interactif sur une cellule donnée.

Retourne true si le bot a pu interagir avec l'élement, sinon retourne false.

**Exemple:**
```js
TODO
```

## <code>yield*</code>useLockedHouse(<code>doorCellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, lockCode: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser une porte de maison protégée par un code.

Retourne true si le bot est entré, sinon retourne false.

**Exemple:**
```js
yield* useLockedHouse(239, 00000000); // Ouvre la porte en cellule 239 avec le code 00000000.
```

## <code>yield*</code>useLockedStorage(<code>elementCellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, lockCode: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser un coffre de maison protégé par un code.

Retourne true si le bot a ouvert le coffre, sinon retourne false.

**Exemple:**
```js
yield* useLockedStorage(127, 00000000); // Ouvre le coffre en cellule 127 avec le code 00000000.
```

## <code>yield*</code>useZaap(<code>destinationMapId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser un zaap.

Retourne true si le bot a pu utiliser le zaap, sinon retourne false.

**Exemple:**
```js
TODO
```

## <code>yield*</code>useZaapi(<code>destinationMapId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser un zaapi.

Retourne true si le bot a pu utiliser le zaapi, sinon retourne false.

**Exemple:**
```js
TODO
```

## <code>yield*</code>saveZaap()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de sauvegarder un zaap pour l’utiliser comme position par défaut de réapparition de votre personnage.

**Exemple:**
```js
if (onMap("0,-2")) {
  yield* saveZaap(); // Sauvegarde le Zaap en "0,-2".
}
```

## <code>yield*</code>waitMapChange(<code>delay?</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Met le script en pause jusqu’au prochain changement de map.

**Exemple:**
```js
yield* waitMapChange(2000); // Attend 2 secondes.
```

## <code>yield*</code>joinFriend(<code>name</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Vous permet de rejoindre un ami. Disponible seulement si vous êtes à Incarnam.

**Exemple:**
```js
yield* joinFriend("Eausa");
```

## onCell(<code>cellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est sur la cellule, sinon retourne false.

**Exemple:**
```js
let cellId = 0;
while (!onCell(cellId)) {
  cellId++; // À la fin de la boucle, cellId est égal à la cellule sur laquelle se trouve le personnage.
}
const characterCell = cellId;
```

## onMap(<code>coords</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est sur la map donnée, sinon retourne false.

**Exemple:**
```js
if (onMap("-2,0")) {
  // You are in "-2.0".
}
```

## currentPos
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne les coordonnées de la map actuelle.

**Exemple:**
```js
onMap(currentPos) // Retourne toujours true.
```

## currentMapId
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne la mapId de la map actuelle.

**Exemple:**
```js
if (currentMapId === 88081177) { // 88081177 est la map exterieure "9,2".
  yield* useLockedHouse(cellid, 00000000); // Lorsque le bot arrive sur la map de votre maison, entrer dans la maison.
}
```

## area
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne le nom de la zone.

**Exemple:**
```js
if (area === "Astrub") {
  // Nous sommes dans la zone Astrub.
}
```

## subArea
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne le nom de la sous-zone.

**Exemple:**
```js
if (subArea === "Cité d'Astrub") {
  // Nous sommes à l'intérieur de la ville d'Astrub.
}
```
