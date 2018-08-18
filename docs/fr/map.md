# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Map](#map)
  - [changeMap](#map-change-map)
  - [moveToCell](#map-move-to-cell)
  - [useById](#map-use-by-id)
  - [use](#map-use)
  - [useLockedHouse](#map-use-locked-house)
  - [useLockedStorage](#map-use-locked-storage)
  - [useZaap](#map-use-zaap)
  - [useZaapi](#map-use-zaapi)
  - [saveZaap](#savezaap)
  - [waitMapChange](#map-wait-map-change)
  - [joinFriend](#map-join-friend)
  - [onCell](#map-on-cell)
  - [onMap](#map-on-map)
  - [currentPos](#currentpos)
  - [currentMapId](#currentmapid)
  - [area](#area)
  - [subArea](#subarea)

# Map
Toutes les fonctions relatives aux maps.


Les cellId vont de 0 à 559, vous pouvez les afficher dans l'onglet Map de CookieTouch.

<hr>

<h2 id="map-change-map">
  changeMap(<code>where</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de changer de carte. Les directions suivantes sont acceptées:
- `top` pour aller vers le haut.
- `bottom` pour aller vers le bas.
- `right` pour aller vers la droite.
- `left` pour aller vers la gauche.

Retourne false si le bot n'a pas pu changer de map, sinon retourne true.

**Exemple:**
```js
if (yield* await changeMap("top") !== true) // Essaie d'aller sur la map du haut.
{ 
  yield* await changeMap("right"); // Si la map du haut est inaccessible, alors va a droite.
}
```

<hr>

<h2 id="map-move-to-cell">
  moveToCell(<code>cellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de se déplacer sur une cellule. Les cellId vont de 0 à 559, vous pouvez les afficher dans l'onglet Map de CookieTouch.

Retourne false si la cellule est inaccessible, sinon retourne true.

**Exemple:**
```js
cellId = 0;
while (yield* await moveToCell(cellId)) {
  cellId++; // Tant que la cellId est inaccessible ajouter 1 à cellId.
}
```

<hr>

<h2 id="map-use-by-id">
  useById(<code>elementId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, skillInstanceUid?: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser une action d’un élement interactif à partir de son identifiant.

Retourne true si l'element est utilisable, sinon retourne false.

**Exemple:**
```js
yield* await useById(1545, 1);
```

<hr>

<h2 id="map-use">
  use(<code>elementCellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, skillInstanceUid?: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser une action d’un élement interactif sur une cellule donnée.

Retourne true si le bot a pu interagir avec l'élement, sinon retourne false.

**Exemple:**
```js
yield* await use(1545, 1);
```

<hr>

<h2 id="map-use-locked-house">
  useLockedHouse(<code>doorCellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, lockCode: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser une porte de maison protégée par un code.

Retourne true si le bot est entré, sinon retourne false.

**Exemple:**
```js
yield* await useLockedHouse(239, 00000000); // Ouvre la porte en cellule 239 avec le code 00000000.
```

<hr>

<h2 id="map-use-locked-storage">
  useLockedStorage(<code>elementCellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, lockCode: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser un coffre de maison protégé par un code.

Retourne true si le bot a ouvert le coffre, sinon retourne false.

**Exemple:**
```js
yield* await useLockedStorage(127, 00000000); // Ouvre le coffre en cellule 127 avec le code 00000000.
```
<hr>

<h2 id="map-use-zaap">
  useZaap(<code>destinationMapId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser un zaap.

Retourne true si le bot a pu utiliser le zaap, sinon retourne false.

**Exemple:**
```js
yield* await useZaap(2545); // se téléporte sur le zaap de la map 2545.
```

<hr>

<h2 id="map-use-zaapi">
  useZaapi(<code>destinationMapId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser un zaapi.

Retourne true si le bot a pu utiliser le zaapi, sinon retourne false.

**Exemple:**
```js
yield* await useZaapi(3545); // se téléporte sur le zaapi de la map 3545.
```

<hr>

## saveZaap()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de sauvegarder un zaap pour l’utiliser comme position par défaut de réapparition de votre personnage.

**Exemple:**
```js
if (onMap("0,-2")) {
  yield* await saveZaap(); // Sauvegarde le Zaap en "0,-2".
}
```

<hr>

<h2 id="map-wait-map-change">
  waitMapChange(<code>delay?</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

Met le script en pause jusqu’au prochain changement de map.

**Exemple:**
```js
yield* await waitMapChange(2000); // Attend 2 secondes.
```

<hr>

<h2 id="map-join-friend">
  joinFriend(<code>name</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
</h2>

Vous permet de rejoindre un ami. Disponible seulement si vous êtes à Incarnam.

**Exemple:**
```js
yield* await joinFriend("Eausa"); // Se téléporte syr le personnage nommé "Eausa"
```

<hr>

<h2 id="map-on-cell">
  onCell(<code>cellId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

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

<hr>

<h2 id="map-on-map">
  onMap(<code>coords</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est sur la map donnée, sinon retourne false.

**Exemple:**
```js
if (onMap("-2,0")) {
  // You are in "-2.0".
}
```

<hr>

## currentPos()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne les coordonnées de la map actuelle.

**Exemple:**
```js
onMap(currentPos()) // Retourne toujours true.
```

<hr>

## currentMapId()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne la mapId de la map actuelle.

**Exemple:**
```js
if (currentMapId() === 88081177) { // 88081177 est la map exterieure "9,2".
  yield* useLockedHouse(cellid, 00000000); // Lorsque le bot arrive sur la map de votre maison, entrer dans la maison.
}
```

<hr>

## area()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne le nom de la zone.

**Exemple:**
```js
if (area() === "Astrub") {
  // Nous sommes dans la zone Astrub.
}
```

<hr>

## subArea
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne le nom de la sous-zone.

**Exemple:**
```js
if (subArea() === "Cité d'Astrub") {
  // Nous sommes à l'intérieur de la ville d'Astrub.
}
```
