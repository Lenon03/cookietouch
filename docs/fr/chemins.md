# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Paths](paths)
  - [move](#move)
  - [bank](#bank)
  - [phenix](#phenix)

### Paths
Les variables ci-dessous permettent de créer des trajets avec les paramètres suivants:

<table>
<thead>
<tr>
<th>Param&egrave;tres</th>
<th>Type</th>
<th>Description</th>
 <th>Exemple</th>
</tr>
</thead>
<tbody>
<tr>
<td>map</td>
<td>number | string</td>
<td>Correspond &agrave; <a href="Map.md#currentpos">currentPos</a> et &agrave; <a href="Map.md#currentmapid">currentMapId</a></td>
<td>map : 88081177 ou map : "-2,0"</td>
</tr>
<tr>
<td>path</td>
<td>string</td>
<td>Correspond &agrave; <a href="Map.md#changemapwhere-string">where</a>, peut aussi etre un cellId ou un changement de map par un cellid</td>
<td>path : "355" ou path : "top" ou path : "top(8)"</td>
</tr>
<tr>
<td>gather</td>
<td>boolean</td>
<td>True si le bot doit r&eacute;colter des ressources, sinon false</td>
<td>gather : true</td>
</tr>
<tr>
<td>fight</td>
<td>boolean</td>
<td>True si le bot doit combattre, sinon false</td>
<td>fight : true</td>
</tr>
<tr>
<td>npcBank</td>
<td>boolean</td>
<td>True si le bot doit ouvrir la banque, sinon false</td>
<td>npcBank = true</td>
</tr>
<tr>
<td>phenix</td>
<td>number</td>
<td>Correspond au cellId du phenix &agrave; utiliser</td>
<td>phenix : 355</td>
</tr>
<tr>
<td>door</td>
<td>number</td>
<td>Correspond au cellId de la porte &agrave; utiliser</td>
<td>door : 355</td>
</tr>
<tr>
<td>custom</td>
<td>GeneratorFunction</td>
<td>Permet d'executer un fonction custom</td>
<td>custom : MaFonction</td>
</tr>
</tbody>
</table>

**Exemple:**
*Dans cet exemple, nous utilisons une fonction custom qui nous permet d'utiliser une potion si nous sommes sur la map 88081177.*
```js
const move = [
    { map : 88081177, path : "top" },
    { map : 88081177, path : "355" },
    { map : 88081177, path : "top(8)" },
    { map : 88081177, gather: true},
    { map : 88081177, fight : true },
    { map : 88081177, door: 355},
    { map : 88081177, custom: MaFonction},
]
```
<hr>

<h2 id = "move">move</h2>

- Valeur: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contient le trajet et la plupart des actions du bot.

Il est important que le bot se trouve dans l'une des maps du chemin move pour commencer.

```js
const move = [
  { map: "67371008", custom: usePotion },
]

async function* usePotion() {
if (currentMapId === 67371008) {
  yield* await inventory.useItem(6965);
  yield* await delay(1000);
}
```
<hr>

<h2 id = "bank">bank</h2>
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

<hr>

<h2 id = "phenix">phenix</h2>
- Valeur: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

Contient le trajet vers le phenix.

Il est important que le bot se trouve dans l'une des maps du chemin phenix pour commencer.

```js 
const phenix = [ 
    { map: "67371008", phenix: 192 }, 
    { map: "13,19", path: "bottom" },
    { map: "13,20", path: "left" }
] 
```
  
Ce n'est pas un trajet obligatoire si le bot ne combat pas et n'a aucun risque de devenir un fantome.

