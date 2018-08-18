# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Fight](#fight)
  - [canFight](#canfightforbiddenmonsters-mandatorymonsters-minmonsters-maxmonsters-minlevel-maxlevel)
  - [fight](#fightforbiddenmonsters-mandatorymonsters-minmonsters-maxmonsters-minlevel-maxlevel)

# Fight
All functions related to fights.

For both functions the parameters are all optional:
<table>
<thead>
<tr>
<th>Parameters</th>
<th>Types</th>
<th>Initial value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>forbiddenMonsters</td>
<td>number[]</td>
<td>null</td>
<td>ID list of forbidden monsters</td>
</tr>
<tr>
<td>mandatoryMonsters</td>
<td>number[]</td>
<td>null</td>
<td>ID list of mandatory monsters</td>
</tr>
<tr>
<td>minMonsters</td>
<td>number</td>
<td>1</td>
<td>Number of monsters minimum in the group</td>
</tr>
 <tr>
<td>maxMonsters</td>
<td>number</td>
<td>8</td>
<td>Number of monsters maximum in the group</td>
</tr>
<tr>
<td>minMonstersLevel</td>
<td>number</td>
<td>1</td>
<td>Minimum level of the group of monsters</td>
</tr>
<tr>
<td>maxMonstersLevel</td>
<td>number</td>
<td>1000</td>
<td>Maximum level of the group of monsters</td>
</tr>
</tbody>
</table>

## canFight(<code>forbiddenMonsters</code>, <code>mandatoryMonsters</code>, <code>minMonsters</code>, <code>maxMonsters</code>, <code>minLevel</code>, <code>maxLevel</code>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Checks if a group of monsters in the map match the parameters passed to the function.

Returns true if a group(s) matches, false if there is none.

```js
canFight([64], [68], 2, 6, 200, 600); // Check if, on this map, the bot can fight a group of 2 to 6 mobs with 1 Wabbit minimum and no Black Tiwabbit. The group must have a level greater than or equal to 200 and less than or equal to 600.
```

## fight(<code>forbiddenMonsters</code>, <code>mandatoryMonsters</code>, <code>minMonsters</code>, <code>maxMonsters</code>, <code>minLevel</code>, <code>maxLevel</code>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Starts a fight on a group that matches the parameters passed to the function.

Returns true and attacks the group if a group matches, false if there is none.

```js
fight(null, null, 2, 6, 200, 600); // Attack if, on this map, a group checks the parameters: a group of 2 to 6 mobs with a level greater than or equal to 200 and less than or equal to 600.
```
