# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Inventory](#inventory)
  - [pods](#inventorypods)
  - [podsMax](#inventorypodsmax)
  - [podsP](#inventorypodsp)
  - [itemCount](#inventoryitemcountgid-number)
  - [itemWeight](#inventoryitemweightgid-number)
  - [useItem](#inventoryuseitemgid-number-quantity-number)
  - [equipItem](#inventoryequipitemgid-number)
  - [unEquipItem](#inventoryunequipitemgid-number)
  - [dropItem](#inventorydropitemgid-number-quantity-number)
  - [deleteItem](#inventorydeleteitemgid-number-quantity-number)

# Inventory
All functions related to the character's inventory.

**All GID are available in [items.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/items.txt).**

## inventory.pods
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the number of pods used.
```js
const pods = inventory.pods
```

## inventory.podsMax
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the maximum pods of the character.
```js
const podsMax = inventory.podsMax
```

## inventory.podsP
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the number of pods used as a percentage.
```js
const podsP = inventory.podsP
```

## inventory.itemCount(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the number of items in the inventory.

**Example:**
```js
const numberOfWheat = inventory.itemCount(289);
```

## inventory.itemWeight(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the weight of an item in the inventory.

**Example:**
```js
const wheatWeight = inventory.itemWeight(289); // Returns the weight of a wheat (2 pods).
```

## <code>yield*</code>inventory.useItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, quantity: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to use an item.

Returns true if the item was used, otherwise returns false.

**Example:**
```js
yield* inventory.useItem(6965); // Use a Bontarian intercity-express potion
```

## <code>yield*</code>inventory.equipItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to equip an item.

Returns true if the object was equipped, otherwise returns false.

**Example:**
```js
yield* inventory.equipItem(8575); // Equip your Ramboton.
```

## <code>yield*</code>inventory.unEquipItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to unequip an item.

Returns true if the object was unequiped, otherwise returns false.

**Example:**
```js
yield* inventory.unEquipItem(7865); // Unequip your Skeleton DragoTurkey
```

## <code>yield*</code>inventory.dropItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to drop an item.

Returns true if the object was dropped, otherwise returns false.

**Example:**
```js
yield* inventory.dropItem(289, 50); // Drop 50 wheat.
```

## <code>yield*</code>inventory.deleteItem(<code>gid</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to delete an item.

Returns true if the object was deleted, otherwise returns false.

**Example:**
```js
yield* inventory.deleteItem(289, 100); // Delete 100 wheat.
```
