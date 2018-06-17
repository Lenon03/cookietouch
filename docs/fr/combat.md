# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Fight](#fight)
  - [canFight](#canfightforbiddenmonsters-mandatorymonsters-minmonsters-maxmonsters-minlevel-maxlevel)
  - [fight](#fightforbiddenmonsters-mandatorymonsters-minmonsters-maxmonsters-minlevel-maxlevel)

# Fight
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

## canFight(<code>forbiddenMonsters</code>, <code>mandatoryMonsters</code>, <code>minMonsters</code>, <code>maxMonsters</code>, <code>minLevel</code>, <code>maxLevel</code>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Verifie si un groupe de monstres de la map correspond aux paramètres passés à la fonction.

Retourne true si le groupe correspond, false si il ne correspond pas.

```js
canFight([64], [68], 2, 6, 200, 600); // Vérifie si, sur cette map, le bot peut combattre un groupe de 2 à 6 mobs avec un Wabbit au minimum et aucun Black Tiwabbit. Le groupe doit avoir un niveau supérieur ou égal à 200 et inférieur ou égal à 600.
```

## fight(<code>forbiddenMonsters</code>, <code>mandatoryMonsters</code>, <code>minMonsters</code>, <code>maxMonsters</code>, <code>minLevel</code>, <code>maxLevel</code>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Lance un combat sur un groupe qui correspond aux paramètres passés à la fonction.

Retourne true et attaque le groupe si un groupe correspond, false si il n'y en a aucun.

```js
fight([], [], 2, 6, 200, 600); // Attaque si, sur cette map, un groupe vérifie les paramètres: un groupe de 2 à 6 mobs avec un Wabbit au minimum et aucun Black Tiwabbit. Le groupe doit avoir un niveau supérieur ou égal à 200 et inférieur ou égal à 600.
```
