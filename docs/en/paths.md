# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Paths](paths)
  - [move](#move)
  - [bank](#bank)
  - [phenix](#phenix)

# Paths
The following variables are used to create paths with the following parameters:

<table>
<thead>
<tr>
<th>Parameters</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>map</td>
<td>number | string</td>
<td>Correspond to <a href="Map.md#currentpos">currentPos</a> and to <a href="Map.md#currentmapid">currentMapId</a></td>
</tr>
<tr>
<td>path</td>
<td>string</td>
<td>Correspond to <a href="Map.md#changemapwhere-string">where</a>, can also be a cellId</td>
</tr>
<tr>
<td>gather</td>
<td>boolean</td>
<td>True if the bot has to harvest resources, otherwise false</td>
</tr>
<tr>
<td>fight</td>
<td>boolean</td>
<td>True if the bot has to fight, otherwise false</td>
</tr>
<tr>
<td>npcBank</td>
<td>boolean</td>
<td>True if the bot has to open bank, otherwise false</td>
</tr>
<tr>
<td>phenix</td>
<td>number</td>
<td>Corresponds to the cellId of the phenix to use</td>
</tr>
<tr>
<td>door</td>
<td>number</td>
<td>Corresponds to the cellId of the door to use</td>
</tr>
<tr>
<td>custom</td>
<td>GeneratorFunction</td>
<td>Allows you to execute a custom function</td>
</tr>
</tbody>
</table>

## move
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contains the path and most actions of the bot.

It is important that the bot is in one of the maps of the move path to start it.

```js
const move = [
  { map: "67371008", custom: usePotion },
]

function* usePotion() {
if (currentMapId === 67371008) {
  yield* inventory.useItem(6965);
  yield* delay(1000);
}
```

## bank
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contains the path to the bank.

The bot will automatically use this path when it has exceeded the maximum pod percentage [MAX_PODS](Configuration.md#max_pods).

It is important that the bot is in one of the bank path maps to start it.

```js
const bank = [
  { map: "11,9", path: "right" },
  { map: "12,9", path: "top" },
  { map: "12,8", path: "right" },
  { map: 88081177, door: 216 }, // External map of the bank
  { map: 99095051, npcBank: true, path: "410" } // Inside the bank. "410" corresponds to the cell to exit the bank.
]
```
Here, the mapId are used to differentiate the inside from the outside of the bank (the bot does not change map by entering the bank, it remains in "13.8").

npcBank is set to true, so the bot will open the bank and execute the predefined actions in [Configuration](Configuration.md).

## phenix
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contains the path to the phenix.

It is important that the bot is in one of the maps of the phenix path to start it.

This is not a mandatory route if the bot does not fight and has no risk of becoming a ghost.
