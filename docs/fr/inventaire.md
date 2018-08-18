# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Inventory](#inventory)
  - [pods](#inventorypods)
  - [podsMax](#inventorypodsmax)
  - [podsP](#inventorypodsp)
  - [itemCount](#inventaire-item-count)
  - [itemWeight](#inventaire-item-weight)
  - [useItem](#inventaire-item-use)
  - [equipItem](#inventaire-item-equip)
  - [unEquipItem](#inventaire-item-un-equip)
  - [dropItem](#inventaire-item-drop)
  - [deleteItem](#inventaire-item-delete)

# Inventory
Toutes les fonctions relatives à l’inventaire du personnage.

**Tous les GID sont disponibles dans le fichier [items.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/items.txt).**

## inventory.pods()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le nombre de pods utilisés.
```js
const pods = inventory.pods()
```

<hr>

## inventory.podsMax()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne les pods maximum du personnage.
```js
const podsMax = inventory.podsMax()
```

<hr>

## inventory.podsP()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le pourcentage de pods utilisés.
```js
const podsP = inventory.podsP()
```

<hr>

<h2 id="inventaire-item-count">
  inventory.itemCount(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le nombre d’objets dans l’inventaire.

**Exemple:**
```js
const nombreBle = inventory.itemCount(289); // Retourne le nombre de blé dans l'inventaire.
```

<hr>

<h2 id="inventaire-item-weight">
  inventory.itemWeight(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le poids d’un item dans l’inventaire.

**Exemple:**
```js
const wheatWeight = inventory.itemWeight(289); // Retourne le poids d'un blé (2).
```

<hr>

<h2 id="inventaire-item-use">
  inventory.useItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, quantity: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d’utiliser un objet.

Retourne true si l’objet a été utilisé, sinon retourne false.

**Exemple:**
```js
yield* await inventory.useItem(6965); // Utilise une Potion de Cité Bonta.
```

<hr>

<h2 id="inventaire-item-equip">
  inventory.equipItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet d'équiper un item.

Retourne true si l’objet a été équipé, sinon retourne false.

**Exemple:**
```js
yield* await sinventory.equipItem(8575); // Equipe votre Ramboton.
```

<hr>

<h2 id="inventaire-item-un-equip">
  inventory.unEquipItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de déséquiper un item.

Retourne true si l’objet a été déséquipé, sinon retourne false.

**Exemple:**
```js
yield* await inventory.unEquipItem(7865); // Désequipe votre Dragodinde Squelette.
```

<hr>

<h2 id="inventaire-item-drop">
  inventory.dropItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de jetter un item.

Retourne true si l’objet a été jeté, sinon retourne false.

**Exemple:**
```js
yield* await inventory.dropItem(289, 50); // Drop 50 blé.
```

<hr>

<h2 id="inventaire-item-delete">
  inventory.deleteItem(<code>gid</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>, <code>quantity</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de supprimer un item.

Retourne true si l’objet a été supprimé, sinon retourne false.

**Exemple:**
```js
yield* await inventory.deleteItem(289, 100); // Supprime 100 blé.
```
