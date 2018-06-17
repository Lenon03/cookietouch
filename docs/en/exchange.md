# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
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
All functions related to exchanges.

## exchange.weightP
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the current bot pods as a percentage.

**Example:**
```js
while (exchange.weightP > 10) {
  exchange.putItem(289, 100); // While you have more than 10% pods, add 100 wheat to the exchange.
}
```

## exchange.targetWeightP
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the current pods of the exchange's target as a percentage.

**Example:**
```js
while (exchange.targetWeightP < 90) {
  yield* exchange.putItem(289, 100); // While the target hasn't more than 90% pods, add 100 wheat to the exchange.
}
```

## <code>yield*</code>exchange.startExchange(<code>playerId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Start the exchange with a given player.

**Example:**
```js
yield* exchange.startExchange(TODO);
```

## <code>yield*</code>exchange.sendReady()
Validate the exchange.

**Example:**
```js
yield* exchange.sendReady()
```

## <code>yield*</code>exchange.putItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, quantity: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Put an item in the exchange.

**Example:**
```js
yield* exchange.putItem(289, 100);
```

## <code>yield*</code>exchange.removeItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, quantity: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Remove an item from the exchange.

**Example:**
```js
yield* exchange.removeItem(289, 100); // Remove 100 wheat from the exchange.
```

## <code>yield*</code>exchange.putKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Put a given amount of kamas into the exchange.

**Example:**
```js
yield* exchange.putKamas(10000); // Add 10 000 kamas to the exchange.
```

## <code>yield*</code>exchange.removeKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Remove a given amount of kamas from the exchange.

**Example:**
```js
yield* exchange.removeKamas(10000); // Remove 10 000 kamas from the exchange.
```

## <code>yield*</code>exchange.putAllItems()
Put all the items in your inventory in the exchange.

**Example:**
```js
yield* exchange.putAllItems();
```
