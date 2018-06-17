# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Gather](#fight)
  - [canGather](#cangatherresourcesids-number)
  - [gather](#gatherresourcesids-number)

# Gather
Toutes les fonctions relatives à la récolte.

**Les resourcesIds se trouvent dans [resources.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/resources.txt).**

## canGather(<code>...resourcesIds</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">string</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Vérifie si il est possible de récolter la ou les ressources choisies en paramètre.

Retourne true si la map contient les ressources recherchées, sinon retourne false.

**Exemple:**
```js
canGather([1, 28]) // True si il est possible de recolter du Frene et/ou de l'If sur cette map.
```

## <code>yield*</code>gather(<code>...resourcesIds</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Reference/Global_Objects/Array">string</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Récolte les ressources passées en paramètre après avoir vérifié si il etait possible de récolter la ou les ressources choisies en paramètre.

Retourne true et récolte les ressources si la map contient les ressources recherchées, sinon retourne false.

**Exemple:**
```js
yield* gather([1, 28]) // Récolte le Frene et/ou l'If si ils sont présents sur la map.
```
