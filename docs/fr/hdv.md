# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [BID](#bid)
  - [startBuying](#bidstartbuying)
  - [buyItem](#hdv-buy-item)
  - [startSelling](#bidstartselling)
  - [itemsInSaleCount](#biditemsInSaleCount)
  - [getItemPrice](#hdv-get-item-price)
  - [getItemsInSale](#bidgetitemsinsale)
  - [sellItem](#hdv-sell-item)
  - [editItemInSalePrice](#hdv-edit-item-in-sale-price)
  - [removeItemsInSale](#hdv-remove-item-in-sale)

# BID
Toutes les fonctions relatives à l'hotel de vente.

Les lots peuvent etre egaux à 1, 10 ou 100.

<hr>

## bid.startBuying()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Active l'achat dans l'hdv, doit etre executé avant d'acheter des items.

Retourne true si l'achat est activé, sinon retourne false.

**Exemple:**

```js
yield* await bid.startBuying(); // Active l'achat.
```
<hr>

<h2 id="hdv-buy-item">
  bid.buyItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lot</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>


Permet d'acheter un lot d'item donné.

Retourne true si le lot d'item peut etre acheté, sinon retourne false.

**Exemple:**
```js
yield* await bid.startBuying(); // Active l'achat.
yield* await bid.buyItem(423, 10); // Achète 10 Lin.
```
<hr>

## bid.startSelling()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Active la vente dans l'hotel de vente, doit etre executé avant toutes les fonctions ci-dessous.

Retourne true si la vente est activée, sinon retourne false.

**Exemple:**
```js
yield* await bid.startSelling(); // Active la vente.
```
<hr>

## bid.itemsInSaleCount()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le nombre d'items en vente.

**Exemple:**
```js
const itemsInSale = bid.itemsInSaleCount();
```

<hr>

<h2 id="hdv-get-item-price">
  bid.getItemPrice(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lot</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le prix d'un lot d'item en vente.

**Exemple:**
```js
const prixBle = await bid.getItemPrice(289, 100); // Retourne le prix du lot de 100 blé.
```

<hr> 

## bid.getItemsInSale()
- Return type: <a href="http://flaviocorpa.com/linq.ts/docs/classes/list/index.html">List<{ gid: number; uid: number; lot: number; price: number }></a>

Retourne une liste de lots d'objets en vente et le prix du lot.

**Exemple:**
```js
bid.getItemsInSale().forEach((itemInSale) => {
  const gid = itemInSale.gid;
  const uid = itemInSale.uid;
  const lot = itemInSale.lot;
  const price = itemInSale.price;
});
```

<h2 id="hdv-sell-item">
  bid.sellItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lot</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>price</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de vendre un lot d'un item donné à un prix donné.

Retourne true si l'item a été mis en vente, sinon retourne false.

**Exemple:**
```js
yield* await bid.sellItem(289, 100, 200); // Vend 100 blé pour 200 kamas.
```

<hr>

<h2 id="hdv-edit-item-in-sale-price">
  bid.editItemInSalePrice(<code>uid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>newPrice</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d'éditer le prix d'un item donné en vente.

Retourne true si le prix de l'item a été modifié, sinon retourne false.

**Exemple:**
```js
bid.getItemsInSale().forEach((itemInSale) => {
  if ((itemInSale.gid === 289) && (itemInSale.price <= 1000) && (itemInSale.lot <= 100)) 
  {
    yield* await bid.editItemInSalePrice(itemInSale.uid, 1200); // On augmente le prix des lots de 100 blé.
  }
});
```
*Le uid peut etre trouvé dans [getItemsInSale](#bidgetitemsinsale). Il est unique à chaque item (ou lot d'item).*
<hr>

<h2 id="hdv-remove-item-in-sale">
  bid.removeItemInSale(<code>uid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retire un item donné de la vente.

Retourne true si l'item est retiré de la vente, sinon retourne false.

**Exemple:**
```js
bid.getItemsInSale().forEach((itemInSale) => {
  if (itemInSale.gid === 289) {
    yield* await bid.removeItemInSale(itemInSale.uid); // On retire tous les lots de blé de la vente.
  }
});
```
*Le uid peut etre trouvé dans [getItemsInSale](#bidgetitemsinsale). Il est unique à chaque item (ou lot d'item).*
