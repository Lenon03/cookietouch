# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [NPC](npc)
  - [npcBank](#npc-npc-bank)
  - [npc](#npc-npc)
  - [reply](#npc-reply)

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

<hr>

<h2 id="npc-npc-bank">
  npc.npcBank(<code>npcId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>replyId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

Permet d’ouvrir la banque.

**Exemple:**
```js
yield* await npc.npcBank(-1, -1); // Choisi le premier npc de la map et choisi la première réponse.
```

<hr>

<h2 id="npc-npc">
  npc.npc(<code>npcId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>actionIndex</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

Permet de parler à un PNJ et de sélectionner l'action à utiliser.

**Exemple:**
```js
yield* await npc.npc(-1, -1); // Choisi le premier npc de la map et choisi la première réponse.
```

<hr>

<h2 id="npc-reply">
  npc.reply(<code>replyId</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

Permet de repondre à un PNJ.

**Exemple:**
```js
yield* await npc.reply(-1); // Choisi la première réponse.
```
