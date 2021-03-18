# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [NPC](npc)
  - [npcBank](#npcnpcbanknpcid-number-replyid-number)
  - [npc](#npcnpcnpcid-number-actionindex-number)
  - [reply](#npcreplyreplyid-number)

# NPC
All functions related to npc.

<table>
<thead>
<tr>
<th>Parameters</th>
<th>Types</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>npcId</td>
<td>number</td>
<td>NPC ID or -1 for the first NPC on the map</td>
</tr>
<tr>
<td>replyId</td>
<td>number</td>
<td>ID of the response</td>
</tr>
<tr>
<td>actionIndex</td>
<td>number</td>
<td>Action indev</td>
</tr>
</tbody>
</table>

## <code>yield*</code>npc.npcBank(<code>npcId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>replyId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Allows you to open the bank.

**Example:**
```js
yield* npc.npcBank(-1, -1); // Choose the first npc of the map and choose the first answer.
```

## <code>yield*</code>npc.npc(<code>npcId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>actionIndex</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Allows you to talk to an NPC and select the action to use.

**Example:**
```js
yield* npc.npc(-1, -1); // Choose the first npc of the map and choose the first answer.
```

## <code>yield*</code>npc.reply(<code>replyId</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Allows you to answer to an NPC.

**Example:**
```js
yield* npc.reply(-1); // Choose the first answer.
```
