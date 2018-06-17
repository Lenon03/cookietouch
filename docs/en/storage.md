# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
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
All functions related to storage.

**All GID are available in [items.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/items.txt) file.**

## storage.itemCount(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the number of items in the inventory.

**Example:**
```js
const itemCount = storage.itemCount(289); // Returns the number of wheat in the inventory.
```

## storage.kamas
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the number of kamas in the inventory.

**Example:**
```js
const kamas = storage.kamas;
```

## <code>yield*</code>storage.putItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Puts a given item in a given quantity.

Returns true if the items could be put, otherwise returns false.

**Example:**
```js
yield* storage.putItem(367, 100); // Puts 100 Tofu eggs in the storage.
```

## <code>yield*</code>storage.getItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Gets a given item in a given amount.

Returns true if the items could be got, otherwise return false.

**Example:**
```js
yield* storage.getItem(371, 200); // Gets 200 Moskito Eyebrows from the storage.
```

## <code>yield*</code>storage.putKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Puts kamas in the storage.

Returns true if kamas could be put, otherwise return false.

**Example:**
```js
yield* storage.putKamas(1000000000); // Puts 1 billion kamas into the storage.
```

## <code>yield*</code>storage.getKamas(<code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Gets kamas in the storage.

Returns true if kamas can be got, otherwise returns false.

**Example:**
```js
yield* storage.getKamas(1000000000); // Gets 1 billion kamas from the chest.
```

## <code>yield*</code>storage.putAllItems()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Puts all the elements in the storage.

Returns true if items can be put, otherwise returns false.

**Example:**
```js
yield* storage.putAllItems(); // Puts all items.
```

## <code>yield*</code>storage.getAllItems()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Gets all the items in the storage.

Returns true if the items could be got, otherwise return false.

**Example:**
```js
yield* storage.getAllItems(); // Gets all items.
```

## <code>yield*</code>storage.putExistingItems()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Puts all existing items into the storage.

Returns true if the items could be put, otherwise returns false.

**Example:**
```js
yield* storage.putExistingItems(); // Puts all existing items into the storage.
```

## <code>yield*</code>storage.getExistingItems()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Gets all existing items in the inventory.

Returns true if the items could be got, otherwise return false.

**Example:**
```js
yield* storage.getExistingItems(); // Getx all existing items in the inventory.
```
