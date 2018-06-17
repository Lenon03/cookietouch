# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [BID](#bid)
  - [startBuying](#bidstartbuying)
  - [buyItem](#bidbuyitemgid-number-lot-number)
  - [startSelling](#bidstartselling)
  - [itemsInSaleCount](#biditemsInSaleCount)
  - [getItemPrice](#bidgetitempricegid-number-lot-number)
  - [getItemsInSale](#bidgetitemsinsale)
  - [sellItem](#bidsellitemgid-number-lot-number-price-number)
  - [editItemInSalePrice](#bidedititeminsalepriceuid-number-newprice-number)
  - [removeItemsInSale](#bidremoveitemsinsaleuid-number)

# BID
All functions related to bid.

The lots can be equal to 1, 10 or 100.

## <code>yield*</code>bid.startBuying()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Activates the purchase in bid, must be executed before buying items.

Returns true if enabled, otherwise returns false.

**Example:**
```js
yield* bid.startBuying(); // Activates buying.
```

## <code>yield*</code>bid.buyItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lot</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to buy a lot of a given item.

Returns true if the item lot can be purchased, otherwise returns false.

**Example:**
```js
yield* bid.startBuying(); // Activates buying.
yield* bid.buyItem(423, 10); // Buy 10 Flax.
```

## <code>yield*</code>bid.startSelling()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Activates the sale in bid, must be executed before all the functions below.

Returns true if the sale is enabled, otherwise returns false.

**Example:**
```js
yield* bid.startSelling(); // Activates selling.
```

## bid.itemsInSaleCount
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the number of items in sale.

**Example:**
```js
const itemsInSale = bid.itemsInSaleCount;
```

## bid.getItemPrice(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lot</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the price of a lot of items for sale.

**Example:**
```js
const wheatPrice = bid.getItemPrice(289, 100); // Returns the price of the lot of 100 wheat.
```

## bid.getItemsInSale()
- Return type: <a href="http://flaviocorpa.com/linq.ts/docs/classes/list/index.html">List<{ gid: number; uid: number; lot: number; price: number }></a>

Returns a list of lots of items for sale and the price of the lot.

**Example:**
```js
bid.getItemsInSale().forEach((itemInSale) => {
  const gid = itemInSale.gid;
  const uid = itemInSale.uid;
  const lot = itemInSale.lot;
  const price = itemInSale.price;
});
```

## <code>yield*</code>bid.sellItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lot</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>price</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to sell a lot of a given item at a given price.

Returns true if the item was put on sale, otherwise returns false.

**Example:**
```js
yield* bid.sellItem(289, 100, 200); // Puts on sell 100 wheat for 200 kamas.
```

## <code>yield*</code>bid.editItemInSalePrice(<code>uid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>newPrice</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to edit the price of a given item for sale.

Returns true if the price of the item has been changed, otherwise returns false.

**Example:**
```js
bid.getItemsInSale().forEach((itemInSale) => {
  if ((itemInSale.gid === 289) && (itemInSale.price <= 1000) && (itemInSale.lot <= 100)) {
    yield* bid.editItemInSalePrice(itemInSale.uid, 1200); // Increase price of 100 wheat.
  }
});
```
*Note: the uid can be found in [getItemsInSale](#bidgetitemsinsale). The uid is unique to each item (or item lot).*

## <code>yield*</code>bid.removeItemsInSale(<code>uid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Removes a given item from the sale.

Returns true if the item is removed from the sale, otherwise returns false.

**Example:**
```js
bid.getItemsInSale().forEach((itemInSale) => {
  if (itemInSale.gid === 289) {
    yield* bid.removeItemsInSale(itemInSale.uid); // Remove all wheat in sale
  }
});
```
*Note: the uid can be found in [getItemsInSale](#bidgetitemsinsale). The uid is unique to each item (or item lot).*
