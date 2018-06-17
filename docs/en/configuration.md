# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Configuration](#configuration)
  - [MAX_PODS](#max_pods)
  - [MIN_MONSTERS](#min_monsters)
  - [MAX_MONSTERS](#max_monsters)
  - [MIN_MONSTERS_LEVEL](#min_monsters_level)
  - [MAX_MONSTERS_LEVEL](#max_monsters_level)
  - [FORBIDDEN_MONSTERS](#forbidden_monsters)
  - [MANDATORY_MONSTERS](#mandatory_monsters)
  - [MAX_FIGHTS_PER_MAP](#max_fights_per_map)
  - [ELEMENTS_TO_GATHER](#elements_to_gather)
  - [BANK_PUT_ITEMS](#bank_put_items)
  - [BANK_GET_ITEMS](#bank_get_items)
  - [BANK_PUT_KAMAS](#bank_put_kamas)
  - [BANK_GET_KAMAS](#bank_get_kamas)
  - [AUTO_REGEN](#auto_regen)
  - [AUTO_DELETE](#auto_delete)
  - [OPEN_BAGS](#open_bags)
  - [DISPLAY_GATHER_COUNT](#display_gather_count)
  - [DISPLAY_FIGHT_COUNT](#display_fight_count)
  - [Advanced example](#advanced-example)

# Configuration
We will see how to configure the behavior of different actions in scripts.

The configuration is done with variables with very specific names that allow you to configure the behavior of the different actions in the scripts.

If you do not declare a variable, it will have a default value. You do not have to declare a variable if it does not help you.

**You can find all items ids in [items.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/items.txt).**

**You can find all the monsters ids in [monsters.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/monsters.txt).**

**You can find all resources ids in [resources.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/resources.txt).**

*Note: these variables must all be defined in the config object, otherwise it will be useless.*

## MAX_PODS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This variable allows you to configure the percentage of pods beyond which your character will return to the bank (using the **[bank](Paths.md#bank)** path).

**Example:**
```js
const config = { MAX_PODS: 100 } // Back to the bank at 100% pods
```
*Default: Back to 90% pods.*

## MIN_MONSTERS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This variable allows you to configure the minimum number of monsters to attack (when you use the action **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = { MIN_MONSTERS: 2 } // Fight groups of 2 monsters minimum
```
*Default: 1.*

## MAX_MONSTERS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This variable allows you to configure the maximum number of monsters to attack (when you use the action **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = { MAX_MONSTERS: 5 } // Fight groups up to 5 monsters
```
*Default: 8.*
  
## MIN_MONSTERS_LEVEL
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This variable is used to configure the minimum level of a group of monsters to attack (when you use the action **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = { MIN_MONSTERS_LEVEL: 200 } // Fight groups at least level 200.
```
*Default: level 1.*

## MAX_MONSTERS_LEVEL
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This variable is used to configure the minimum level of a group of monsters to attack (when you use the action **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = { MAX_MONSTERS_LEVEL: 500 } // Fight groups up to level 500
```
*Default: level 1000.*
  
## FORBIDDEN_MONSTERS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

This variable allows you to configure the forbidden monsters (when you use the action **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = { FORBIDDEN_MONSTERS: [ 148, 134 ] } // Don't attack Gobball War Chief or White Gobbly.
```
*Default: no forbidden monsters.*

## MANDATORY_MONSTERS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

This variable allows you to configure the mandatory monsters (when you use the action **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = { MANDATORY_MONSTERS: [ 149 ] } // Attack only if there is a Black Gobbly in the group.
```
*Default: no mandatory monsters.*

## MAX_FIGHTS_PER_MAP
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This setting allows you to configure the maximum number of fights per map (when you use the action **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = { MAX_FIGHTS_PER_MAP: 10 } // The bot will continue the script after 10 fights on the map.
```
*Default: no limit to the fight number.*

## ELEMENTS_TO_GATHER
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

This variable is used to configure the items to harvest (when you use the action **[gather](Paths.md) = true** on a map).

**Example:**
```js
const config = { ELEMENTS_TO_GATHER: [ 38, 43 ] } // Gather only Wheat and Barley.
```
*Default: gather all elements.*

## BANK_PUT_ITEMS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ id: number; quantity: number }></a>

Cette variable permet de configurer les éléments à déposer en banque (lorsque vous utilisez l'action **[npcBank](Paths.md) = true** sur une map).

**Example:**
```js
const config = {
  BANK_PUT_ITEMS: [
    { item: 289, quantity: 0 }, // Put all the wheat in bank.
    { item: 6965, quantity: 5 } // Put 5 Bontarian intercity-express potion in bank.
  ]
}
```
*Default: dont' put anything.*

If you put a quantity of 0, the whole amount of the item will be deposited.

## BANK_GET_ITEMS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">Array<{ map; path; gather; fight; npcBank; phenix; door; custom }></a>

This variable is used to configure the items to get in the bank (when you use the action **[npcBank](Paths.md) = true** on a map).

**Example:**
```js
const config = {
  BANK_GET_ITEMS: [
    { item: 6964, quantity: 5 } // Get 5 Brakmarian intercity-express potion from bank.
  ]
}
```
*Default: don't get anything.*

If you put a quantity of 0, the whole quantity of the item will be got.

## BANK_PUT_KAMAS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This variable is used to configure kamas to put in bank (when you use the action **[npcBank](Paths.md) = true** on a map).

**Example:**
```js
const config = { BANK_PUT_KAMAS: 2000 } // Put 2000 kamas in bank.
```
*Default: don't put any kamas.*

If you put 0, all kamas will be deposited.

## BANK_GET_KAMAS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

This variable is used to configure kamas to be got from the bank (when you use the action **[npcBank](Paths.md) = true** on a map).

**Example:**
```js
const config = { BANK_GET_KAMAS: 2000 } // Get 2000 kamas from the bank.
```
*Default: don't get any kamas.*

If you put 0, all kamas will be got.

## AUTO_REGEN
- Value: `{ items: number[]; store: number; minLife: number; maxLife: number }`

This variable is used to configure the automatic regeneration by items (when using the action **[gather](Paths.md) = true** or **[fight](Paths.md) = true** on a map).

**Example:**
```js
const config = {
  AUTO_REGEN: {
    minLife: 60, // Regeneration if below 60%
    maxLife: 90, // Regeneration up to 90%
    items: [ 1737, 528 ], // Items to use for prioritization regeneration
    store: 200 // Have 200 items total on either after the move to the bank
  }
}
```
*Default: no automatic regeneration.*

The maxLife attribute is optional, if it is not specified, it will be up to 100%
The items are used in order, when the first item is no longer available, it will use the second, etc.
When returning to the bank, it will take priority first item if it is available in sufficient quantity, otherwise it will fill with the second item until the desired quantity.
If there are no more items available, the character recover his health points before continuing.

## AUTO_DELETE
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">number[]</a>

This variable is used to configure automatic deletion when the character is full pods.

**Example:**
```js
const config = {
  AUTO_DELETE: [ 598, 1799 ] // Automatically deletes Grawn and Unique Kralove
}
```
*Default: no automatic deletion.*

This function is compatible with the bank return, if the character is full pods, the automatic deletion will be done and the character will go to the bank if after the automatic deletion it is still full pods.

The automatic deletion is done when MAX_PODS is reached.

## OPEN_BAGS
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

This variable is used to configure the automatic opening of gather bags.

**Example:**
```js
const config = { OPEN_BAGS: true }
```
*Default: false, no automatic opening of bags.*

## DISPLAY_GATHER_COUNT
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

This variable is used to configure the display of the gathering counter.

**Example:**
```js
const config = { DISPLAY_GATHER_COUNT: true } // Displays the gathering counter
```
*Default: no display of the gathering counter.*

## DISPLAY_FIGHT_COUNT
- Value: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

This variable is used to configure the display of the fight counter.

**Example:**
```js
const config = { DISPLAY_FIGHT_COUNT: true } // Displays the fight counter
```
*Default: no display of the fight counter.*

# Advanced example
```js
const config = {
  MAX_PODS: 90, // Back to the bank at 90% pods
  MIN_MONSTERS: 2, // 2 monsters minimum
  MAX_MONSTERS: 3, // 3 monsters maximum
  AUTO_DELETE: [ 384, 881, 885 ], // Delete Gobball Wool, White Gobbly Wool et Black Gobbly Wool
  BANK_GET_KAMAS: 200, // Get 200 kamas from the bank (you never know)
  BANK_GET_ITEMS: [
    { item: 548, quantity: 1 } // Get a Recall Potion every time you go to the bank
  ]
}
```
