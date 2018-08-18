# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Mount](mount)
  - [isRiding](#mountisriding)
  - [hasMount](#mounthasmount)
  - [currentRatio](#mountcurrentratio)
  - [toggleRiding](#mount-toggle-riding)
  - [setRatio](#mount-set-ratio)

# Mount
Toutes les fonctions relatives à la monture du personnage.

<hr>

## mount.isRiding()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est sur la monture, sinon retourne false.

<hr>

## mount.hasMount()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage possède une monture, sinon retourne false.

<hr>

## mount.currentRatio()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Retourne le pourcentage d'experience donnée à la monture.

<hr>

<h2 id="mount-toggle-riding">
  mount.toggleRiding()
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de descendre ou de monter sur la monture.

Retourne false si le bot n'a pas pu monter sur la monture, sinon retourne true.

**Exemple:**
```js
if (!mount.isRiding()) {
  yield* await mount.toggleRiding(); // Si le personnage n'est pas sur la monture, alors monter sur la monture.
  yield* await delay(2000);
}
```
*Astuce : Une fois la fonction appelée, il faut entre une seconde et une seconde et-demi pour que l’action soit effective.
Si vous devez obligatoirement être sûr d’être monté/descendu de la monture pour continuer, vous pouvez utiliser delay(2000) après toggleRiding().*

<hr>

<h2 id="mount-set-ratio">
  mount.setRatio(<code>ratio</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
</h2>

- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Permet de modifier le pourcentage d'experience donnée à la monture.

Retourne false si le pourcentage donné est invalide, sinon retourne true.

**Exemple:**
```js
yield* await mount.setRatio(101); // false
yield* await mount.setRatio(100); // true
```
