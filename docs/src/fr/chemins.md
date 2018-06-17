# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Paths](paths)
  - [move](#move)
  - [bank](#bank)
  - [phenix](#phenix)

# Paths
Les variables ci-dessous permettent de créer des trajets avec les paramètres suivants:

<table>
<thead>
<tr>
<th>Paramètres</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>map</td>
<td>number | string</td>
<td>Correspond à <a href="Map.md#currentpos">currentPos</a> et à <a href="Map.md#currentmapid">currentMapId</a></td>
</tr>
<tr>
<td>path</td>
<td>string</td>
<td>Correspond à <a href="Map.md#changemapwhere-string">where</a>, peut aussi etre un cellId</td>
</tr>
<tr>
<td>gather</td>
<td>boolean</td>
<td>True si le bot doit récolter des ressources, sinon false</td>
</tr>
<tr>
<td>fight</td>
<td>boolean</td>
<td>True si le bot doit combattre, sinon false</td>
</tr>
<tr>
<td>npcBank</td>
<td>boolean</td>
<td>True si le bot doit ouvrir la banque, sinon false</td>
</tr>
<tr>
<td>phenix</td>
<td>number</td>
<td>Correspond au cellId du phenix à utiliser</td>
</tr>
<tr>
<td>door</td>
<td>number</td>
<td>Correspond au cellId de la porte à utiliser</td>
</tr>
<tr>
<td>custom</td>
<td>GeneratorFunction</td>
<td>Permet d'executer un fonction custom</td>
</tr>
</tbody>
</table>

## move
- Valeur: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contient le trajet et la plupart des actions du bot.

Il est important que le bot se trouve dans l'une des maps du chemin move pour commencer.

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
- Valeur: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contient le trajet vers la banque.

Le bot utilisera automatiquement ce chemin lorsqu'il aura dépassé le pourcentage de pods maximum [MAX_PODS](Configuration.md#max_pods).

Il est important que le bot se trouve dans l'une des maps du chemin bank pour commencer.

```js
const bank = [
  { map: "11,9", path: "right" },
  { map: "12,9", path: "top" },
  { map: "12,8", path: "right" },
  { map: 88081177, door: 216 }, // Map extérieure de la banque
  { map: 99095051, npcBank: true, path: "410" } // Map intérieure de la banque. "410" correspond a la cellule pour sortir de la banque.
]
```
Ici, les mapId sont utilisés pour différencier l'interieur de l'exterieur de la banque (le bot ne change pas de map en entrant dans la banque, il reste en "13,8").

npcBank est définit à true, le bot va donc ouvrir la banque et executer les actions prédéfinies dans [Configuration](Configuration.md).

## phenix
- Valeur: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contient le trajet vers le phenix.

Il est important que le bot se trouve dans l'une des maps du chemin phenix pour commencer.

Ce n'est pas un trajet obligatoire si le bot ne combat pas et n'a aucun risque de devenir un fantome.
