# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Mount](mount)
  - [isRiding](#mountisriding)
  - [hasMount](#mounthasmount)
  - [currentRatio](#mountcurrentratio)
  - [toggleRiding](#mounttoggleriding)
  - [setRatio](#mountsetratioratio-number)

# Mount
Toutes les fonctions relatives à la monture du personnage.

## mount.isRiding
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est sur la monture, sinon retourne false.

## mount.hasMount
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage possède une monture, sinon retourne false.

## mount.currentRatio
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le pourcentage d'experience donnée à la monture.

## <code>yield*</code>mount.toggleRiding()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de descendre ou de monter sur la monture.

Retourne false si le bot n'a pas pu monter sur la monture, sinon retourne true.

**Exemple:**
```js
if (!mount.isRiding) {
  yield* mount.toggleRiding(); // Si le personnage n'est pas sur la monture, alors monter sur la monture.
}
```
*Astuce : Une fois la fonction appelée, il faut entre une seconde et une seconde et-demi pour que l’action soit effective.
Si vous devez obligatoirement être sûr d’être monté/descendu de la monture pour continuer, vous pouvez utiliser delay(2000) après toggleRiding().*

## <code>yield*</code>mount.setRatio(<code>ratio</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de modifier le pourcentage d'experience donnée à la monture.

Retourne false si le pourcentage donné est invalide, sinon retourne true.

**Exemple:**
```js
yield* mount.setRatio(101); // false
yield* mount.setRatio(100); // true
```
