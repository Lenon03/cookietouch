# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Character](#character)
  - [isAlive](#characterisalive)
  - [isTombstone](#istombstone)
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
All functions related to the character.

## character.isAlive
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is alive, otherwise returns false.

**Example:**
```js
if (character.isAlive) {
  // The character is alive.
}
```

## character.isTombstone
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is a tombstone, otherwise returns false.

**Example:**
```js
if (character.isTombstone) {
  // The character is a tombstone.
}
```

## character.isPhantom
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is a ghost, otherwise returns false.

**Example:**
```js
if (character.isPhantom) {
  // The character is a phantom.
}
```

## character.name
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>

Returns the name of the character.

**Example:**
```js
character.name
```

## character.level
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the level of the character.

**Example:**
```js
character.level
```

## character.sex
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is a male, false if it is a female.

**Example:**
```js
character.sex
```

## character.lifePoints
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the life points of the character.

**Example:**
```js
character.lifePoints
```

## character.maxLifePoints
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the maximum life points of the character.

**Example:**
```js
character.maxLifePoints
```

## character.lifePointsP
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the percentage of life of the character.

**Example:**
```js
character.lifePointsP
```

## character.experience
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the character's experience.

**Example:**
```js
character.experience
```

## character.energyPoints
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the character's energy points.

**Example:**
```js
character.energyPoints
```

## character.maxEnergyPoints
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the maximum energy points of the character.

**Example:**
```js
character.maxEnergyPoints
```

## character.energyPointsP
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the energy percentage of the character.

**Example:**
```js
character.energyPoints
```

## character.kamas
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the number of kamas the character has.

**Example:**
```js
character.kamas
```

## character.sit()

Allows the character to sit down.

**Example:**
```js
character.sit()
```

## character.freeSoul()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Free the soul of the character.

Returns true if the character has successfully free his soul, otherwise returns false.

**Example:**
```js
if (character.isTombstone) {
  if (character.freeSoul()) { // If the character is a grave, then free his soul.
  // The soul has been released.
  } else {
  // The soul has not been released.
  }
}
```
