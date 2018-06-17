# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [NPC](npc)
  - [npcBank](#npcnpcbanknpcid-number-replyid-number)
  - [npc](#npcnpcnpcid-number-actionindex-number)
  - [reply](#npcreplyreplyid-number)

# NPC
Toutes les fonctions relatives aux personnages non-joueurs.

<table>
<thead>
<tr>
<th>Paramètres</th>
<th>Types</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>npcId</td>
<td>number</td>
<td>ID du PNJ ou -1 pour le premier PNJ de la map</td>
</tr>
<tr>
<td>replyId</td>
<td>number</td>
<td>ID de la réponse</td>
</tr>
<tr>
<td>actionIndex</td>
<td>number</td>
<td>Index de l’action</td>
</tr>
</tbody>
</table>

## <code>yield*</code>npc.npcBank(<code>npcId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>replyId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Permet d’ouvrir la banque.

**Exemple:**
```js
yield* npc.npcBank(-1, -1); // Choisi le premier npc de la map et choisi la première réponse.
```

## <code>yield*</code>npc.npc(<code>npcId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>actionIndex</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Permet de parler à un PNJ et de sélectionner l'action à utiliser.

**Exemple:**
```js
yield* npc.npc(-1, -1); // Choisi le premier npc de la map et choisi la première réponse.
```

## <code>yield*</code>npc.reply(<code>replyId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Permet de repondre à un PNJ.

**Exemple:**
```js
yield* npc.reply(-1); // Choisi la première réponse.
```
