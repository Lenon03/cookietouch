# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Fight](#fight-somm)
  - [canFight](#fight-can-fight)
  - [fight](#fight-fight)

<h2 id ="fight-somm">Fight</h2>

Toutes les fonctions relatives aux combats.

Pour les deux fonctions les paramètres sont tous facultatifs:
<table>
<thead>
<tr>
<th>Paramètres</th>
<th>Types</th>
<th>Valeur initiale</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>forbiddenMonsters</td>
<td>number[]</td>
<td>null</td>
<td>Liste d’IDs de monstres interdits</td>
</tr>
<tr>
<td>mandatoryMonsters</td>
<td>number[]</td>
<td>null</td>
<td>Liste d’IDs de monstres obligatoires</td>
</tr>
<tr>
<td>minMonsters</td>
<td>number</td>
<td>1</td>
<td>Nombre de monstres minimum dans le groupe</td>
</tr>
 <tr>
<td>maxMonsters</td>
<td>number</td>
<td>8</td>
<td>Nombre de monstres maximum dans le groupe</td>
</tr>
<tr>
<td>minMonstersLevel</td>
<td>number</td>
<td>1</td>
<td>Niveau minimum du groupe de monstres</td>
</tr>
<tr>
<td>maxMonstersLevel</td>
<td>number</td>
<td>1000</td>
<td>Niveau maximum du groupe de monstres</td>
</tr>
</tbody>
</table>

**Exemple:**
*Dans cet exemple, nous initialisons tout se qui concerne les combats dans la config.*
```js
const config =
{
  forbiddenMonsters: [150, 23],
  mandatoryMonsters: [99],
  minMonsters: 1,
  maxMonsters: 8,
  minMonstersLevel: 20,
  maxMonstersLevel: 150
}
```

<hr>

<h2 id ="fight-can-fight">canFight(<code>forbiddenMonsters</code>, <code>mandatoryMonsters</code>, <code>minMonsters</code>, <code>maxMonsters</code>, <code>minLevel</code>, <code>maxLevel</code>)</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Verifie si un groupe de monstres de la map correspond aux paramètres passés à la fonction.

Retourne true si le groupe correspond, false si il ne correspond pas.

```js
canFight([64], [68], 2, 6, 200, 600); // Vérifie si, sur cette map, le bot peut combattre un groupe de 2 à 6 mobs avec un Wabbit au minimum et aucun Black Tiwabbit. Le groupe doit avoir un niveau supérieur ou égal à 200 et inférieur ou égal à 600.
```

<hr>
<h2 id ="fight-fight">fight(<code>forbiddenMonsters</code>, <code>mandatoryMonsters</code>, <code>minMonsters</code>, <code>maxMonsters</code>, <code>minLevel</code>, <code>maxLevel</code>)</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Lance un combat sur un groupe qui correspond aux paramètres passés à la fonction.

Retourne true et attaque le groupe si un groupe correspond, false si il n'y en a aucun.

```js
yield* await fight([], [], 2, 6, 200, 600); // Attaque si, sur cette map, un groupe vérifie les paramètres: un groupe de 2 à 6 mobs avec un Wabbit au minimum et aucun Black Tiwabbit. Le groupe doit avoir un niveau supérieur ou égal à 200 et inférieur ou égal à 600.
```
