# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
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

All functions related to maps.

## <code>yield*</code>changeMap(<code>where</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to change the map. The following directions are accepted:
- `top` to go up.
- `bottom` to go down.
- `right`to go right.
- `left` to go left.

Returns false if the bot could not change maps, otherwise returns true.

**Example:**
```js
if (yield* changeMap("top") !== true) { // Try to go to the top map.
  yield* changeMap("right"); // If the top map is inaccessible, then go right.
}
```

## <code>yield*</code>moveToCell(<code>cellId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows to move on a cell according to the cellId.

Returns false if the cell is unreachable, otherwise returns true.

**Example:**
```js
cellId = 0;
while (yield* moveToCell(cellId)) {
  cellId++; // As long as the cell is unreachable add 1 to cellId.
}
```

## <code>yield*</code>useById(<code>elementId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>skillInstanceUid?</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to use an action of an interactive element from its id.

Returns true if the element is usable, otherwise returns false.

**Example:**
```js
TODO
```

## <code>yield*</code>use(<code>elementCellId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>skillInstanceUid?</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to use an action of an interactive element on a given cell.

Returns true if the bot could interact with the element, otherwise return false.

**Example:**
```js
TODO
```

## <code>yield*</code>useLockedHouse(<code>doorCellId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lockCode</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to use a house door protected by a code.

Returns true if the bot is entered, otherwise returns false.

**Example:**
```js
yield* useLockedHouse(239, 00000000); // Opens the door in cell 239 with code 00000000.
```

## <code>yield*</code>useLockedStorage(<code>elementCellId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>lockCode</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to use a home safe protected by a code.

Returns true if the bot opened the storage, otherwise returns false.

**Example:**
```js
yield* useLockedStorage(127, 00000000); // Open the storage in cell 127 with code 00000000.
```

## <code>yield*</code>useZaap(<code>destinationMapId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to use a zaap.

Returns true if the bot is able to use the zaap, otherwise returns false.

**Example:**
```js
TODO
```

## <code>yield*</code>useZaapi(<code>destinationMapId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to use a zaapi.

Returns true if the bot is able to use the zaapi, otherwise returns false.

**Example:**
```js
TODO
```

## <code>yield*</code>saveZaap()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Saves a Zaap for use as a default position of reappearance for your character.

**Example:**
```js
if (onMap("0,-2")) {
  yield* saveZaap(); // Saves the Zaap in "0, -2".
}
```

## <code>yield*</code>waitMapChange(<code>delay?</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Pauses the script until the map changes.

**Example:**
```js
yield* waitMapChange(2000); // Wait 2 seconds.
```

## <code>yield*</code>joinFriend(<code>name</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Allows you to join a friend. Available only if you are on Incarnam.

**Example:**
```js
yield* joinFriend("Eausa");
```

## onCell(<code>cellId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is on the cell, otherwise returns false.

**Example:**
```js
let cellId = 0;
while (!onCell(cellId)) {
  cellId++; // At the end of the loop, cellId is equal to the cell on which the character is located.
}
const characterCell = cellId;
```

## onMap(<code>coords</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is on the given map, otherwise returns false.

**Example:**
```js
if (onMap("-2,0")) {
  // Vous etes en "-2,0"
}
```

## currentPos
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>

Returns the coordinates of the current map.

**Example:**
```js
onMap(currentPos) // Always returns true.
```

## currentMapId
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the mapId of the current map.

**Example:**
```js
if (currentMapId === 88081177) { // 88081177 is the external map "9,2".
  yield* useLockedHouse(cellId, 00000000); // When the bot arrives on the map of your house, enter the house.
}
```

## area
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>

Returns the name of the area.

**Example:**
```js
if (area === "Astrub") {
  // We are in the Astrub area.
}
```

## subArea
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>

Returns the name of the subarea.

**Example:**
```js
if (subArea === "Astrub city") {
  // We are inside the city of Astrub.
}
```
