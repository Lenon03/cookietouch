# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Storage](#storage)
  - [itemCount](#storageitemcountgid-number)
  - [kamas](#storagekamas)
  - [putItem](#storageputitemgid-number-quantity-number)
  - [getItem](#storagegetitemgid-number-quantity-number)
  - [putKamas](#storageputkamasquantity-number)
  - [getKamas](#storagegetkamasquantity-number)
  - [putAllItems](#storageputallitems)
  - [getAllItems](#storagegetallItems)
  - [putExistingItems](#storageputexistingitems)
  - [getExistingItems](#storagegetexistingitems)

# Storage
Toutes les fonctions relatives au stockage.

**Tous les GID sont disponibles dans le fichier [items.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/items.txt).**

## storage.itemCount(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le nombre d’objets dans l’inventaire.

**Exemple:**
```js
const itemCount = storage.itemCount(289); // Retourne le nombre de blé présents dans l'inventaire.
```

## storage.kamas
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le nombre de kamas dans l’inventaire.

**Exemple:**
```js
const kamas = storage.kamas;
```

## <code>yield*</code>storage.putItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Insère un item donné dans une quantité donnée.

Retourne true si les items ont pu etre insérés, sinon retourne false.

**Exemple:**
```js
yield* storage.putItem(367, 100); // Insère 100 Oeufs de Tofu dans le coffre.
```

## <code>yield*</code>storage.getItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Récupère un item donné dans une quantité donnée.

Retourne true si les items ont pu etre récupérés, sinon retourne false.

**Exemple:**
```js
yield* storage.getItem(371, 200); // Récupère 200 Sourcils de Moskito du coffre.
```

## <code>yield*</code>storage.putKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Insère des kamas dans le stockage.

Retourne true si les kamas ont pu etre insérés, sinon retourne false.

**Exemple:**
```js
yield* storage.putKamas(1000000000); // Insère 1 milliard de kamas dans le coffre.
```

## <code>yield*</code>storage.getKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Récupère des kamas dans le stockage.

Retourne true si les kamas ont pu etre récupérés, sinon retourne false.

**Exemple:**
```js
yield* storage.getKamas(1000000000); // Récupère 1 milliard de kamas du coffre.
```

## <code>yield*</code>storage.putAllItems()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Insère tous les items dans le stockage.

Retourne true si les items ont pu etre insérés, sinon retourne false.

**Exemple:**
```js
yield* storage.putAllItems(); // Insère tous les items
```

## <code>yield*</code>storage.getAllItems()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Récupère tous les items dans le stockage.

Retourne true si les items ont pu etre récupérés, sinon retourne false.

**Exemple:**
```js
yield* storage.getAllItems(); // Récupère tous les items.
```

## <code>yield*</code>storage.putExistingItems()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Insère tous les items déjà existants dans le stockage.

Retourne true si les items ont pu etre insérés, sinon retourne false.

**Exemple:**
```js
yield* storage.putExistingItems(); // Insère tous les items déjà existants dans le stockage.
```

## <code>yield*</code>storage.getExistingItems()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Récupère tous les items déjà existants dans l'inventaire.

Retourne true si les items ont pu etre récupérés, sinon retourne false.

**Exemple:**
```js
yield* storage.getExistingItems(); // Récupère tous les items déjà existants dans l'inventaire.
```
