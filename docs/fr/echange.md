# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Exchange](#exchange)
  - [weightP](#exchangeweightp)
  - [targetWeightP](#exchangetargetweightp)
  - [startExchange](#exchangestartexchangeplayerid-number)
  - [sendReady](#exchangesendready)
  - [putItem](#exchangeputitemgid-number-quantity-number)
  - [removeItem](#exchangeremoveitemgid-number-quantity-number)
  - [putKamas](#exchangeputkamasquantity-number)
  - [removeKamas](#exchangeremovekamasquantity-number)
  - [putAllItems](#exchangeputallitems)

# Exchange
Toutes les fonctions relatives aux échanges.

## exchange.weightP
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne les pods actuel du bot en pourcentage.

**Exemple:**
```js
while (exchange.weightP > 10) {
  exchange.putItem(289, 100); // Tant que vous avez plus de 10% de pods, ajoute 100 blé à l'échange.
}
```

## exchange.targetWeightP
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne les pods actuel de la cible de l’échange en pourcentage.

**Exemple:**
```js
while (exchange.targetWeightP < 90) {
  yield* exchange.putItem(289, 100); // Tant que la cible n'a pas plus de 90% de pods, ajoute 100 blé à l'échange.
}
```

## <code>yield*</code>exchange.startExchange(<code>playerId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Commence l'échange avec un joueur donné.

```js
yield* exchange.startExchange(TODO);
```
*Note: il est possible de récupérer le playerId à coté de votre nom dans l'onglet personnage.*

## <code>yield*</code>exchange.sendReady()
Valide l'échange.

```js
yield* exchange.sendReady()
```

## <code>yield*</code>exchange.putItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Insère un objet dans l’échange.

```js
yield* exchange.putItem(289, 100);
```

## <code>yield*</code>exchange.removeItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Récupère un objet dans l’échange.

```js
yield* exchange.removeItem(289, 100); // Enlève 100 blé à l'échange.
```

## <code>yield*</code>exchange.putKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Insère une quantité donnée de kamas dans l’échange.

```js
yield* exchange.putKamas(10000); // Ajoute 10 000 kamas à l'échange.
```

## <code>yield*</code>exchange.removeKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Retire une quantité donnée de kamas dans l'échange.

```js
yield* exchange.removeKamas(10000); // Retire 10 000 kamas à l'échange.
```

## <code>yield*</code>exchange.putAllItems()
Insère tous les objets de votre inventaire dans l’échange.

```js
yield* exchange.putAllItems();
```
