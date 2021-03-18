# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Character](#character)
  - [isAlive](#characterisalive)
  - [isTombstone](#characteristombstone)
  - [isPhantom](#characterisphantom)
  - [name](#charactername)
  - [level](#characterlevel)
  - [sex](#charactersex)
  - [lifePoints](#characterlifepoints)
  - [maxLifePoints](#charactermaxlifepoints)
  - [lifePointsP](#characterlifepointsp)
  - [experience](#characterexperience)
  - [energyPoints](#characterenergypoints)
  - [maxEnergyPoints](#charactermaxenergypoints)
  - [energyPointsP](#characterenergypointsp)
  - [kamas](#characterkamas)
  - [sit](#charactersit)
  - [freeSoul](#characterfreesoul)

# Character
Toutes les fonctions relatives au personnage.

<hr>

## character.isAlive()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est en vie, sinon retourne false.

**Exemple:**
```js
if (character.isAlive()) {
  // Le personnage est en vie.
}
```

<hr>

## character.isTombstone()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est une tombe, sinon retourne false.

**Exemple:**
```js
if (character.isTombstone()) {
  // Le personnage est une tombe.
}
```

<hr>

## character.isPhantom()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est un fantôme, sinon retourne false.

**Exemple:**
```js
if (character.isPhantom()) {
  // Le personnage est un fantome.
}
```

<hr>

## character.name()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>

Retourne le nom du personnage.

**Exemple:**
```js
character.name();
```

<hr>

## character.level()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le niveau du personnage.

**Exemple:**
```js
character.level();
```

<hr>

## character.sex()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est un male, false si c'est une femelle.

**Exemple:**
```js
character.sex();
```

<hr>

## character.lifePoints()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne les points de vie du personnage.

**Exemple:**
```js
character.lifePoints();
```

<hr>

## character.maxLifePoints()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne les points de vie maximum du personnage.

**Exemple:**
```js
character.maxLifePoints();
```

<hr>

## character.lifePointsP()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le pourcentage de vie du personnage.

**Exemple:**
```js
character.lifePointsP();
```

<hr>

## character.experience()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne l’expérience du personnage.

**Exemple:**
```js
character.experience();
```

<hr>

## character.energyPoints()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne les points d’énergie du personnage.

**Exemple:**
```js
character.energyPoints();
```

<hr>

## character.maxEnergyPoints()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne les points d’énergie maximum du personnage.

**Exemple:**
```js
character.maxEnergyPoints();
```

<hr>

## character.energyPointsP()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le pourcentage d'energie du personnage.

**Exemple:**
```js
character.energyPoints();
```

<hr>

## character.kamas()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le nombre de kamas que possède le personnage.

**Exemple:**
```js
character.kamas();
```

<hr>

## character.sit()

Permet au personnage de s’asseoir.

**Exemple:**
```js
character.sit();
```

## character.freeSoul()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de libérer l’âme du personnage.

Retourne true si le personnage a réussi à libérer son âme, sinon retourne false.

**Exemple:**
```js
if (character.isTombstone) {
  if (character.freeSoul()) { // Si le personnage est une tombe, alors libère son âme.
  // L'âme a été libérée.
  } else {
  // L'âme n'a pas été libérée.
  }
}
```
