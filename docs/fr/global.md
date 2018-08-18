# CookieTouch API Documentation
[Sommaire](SUMMARY.md) | [Sommaire détaillé](singlepage.md)

<hr>

## Sommaire
- [Global](#global)
  - [isFighting](#isfighting)
  - [isGathering](#isgathering)
  - [isInDialog](#isindialog)
  - [printMessage](#global-print-message)
  - [printDebug](#global-print-debug)
  - [printSuccess](#global-print-success)
  - [printError](#global-print-error)
  - [stopScript](#stopscript)
  - [delay](#global-delay)
  - [leaveDialogFunc](#leavedialogfunc)
  - [leaveDialog](#leavedialog)

# Global
Toutes les fonctions utiles en toutes circonstances.

## isFighting()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est en combat, sinon retourne false.

**Exemple:**
```js
if (isFighting()) {
  printMessage("Le personnage est en train de combattre!");
}
```

## isGathering()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est en train de récolter, sinon retourne false.

**Exemple:**
```js
if (isGathering()) {
  printMessage("Le personnage est en train de récolter.");
}
```

## isInDialog()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true si le personnage est dans un dialogue (échange, défi, banque, PNJ, etc…), sinon retourne false.

**Exemple:**
```js
if (isInDialog()) {
  printMessage("Un dialogue est ouvert !");
}
```
<hr>
<h2 id="global-print-message">printMessage(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)</h2>

Affiche un message dans la console.

**Exemple:**
```js
printMessage("Ceci est un message.");
```
<hr>
<h2 id="global-print-debug">printDebug(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)</h2>

Affiche un message de debug dans la console.

**Exemple:**
```js
printDebug("Ceci est un message de debug.");
```
<hr>
<h2 id="global-print-success">printSuccess(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)</h2>

Affiche un succès dans la console.

**Exemple:**
```js
printSuccess("Ceci est un message de succès.");
```
<hr>
<h2 id="global-print-error">printError(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)</h2>


Affiche une erreur dans la console.

**Exemple:**
```js
printError("Ceci est un message d'erreur");
```
<hr>

## stopScript()
Stoppe et termine le script immédiatement.

**Exemple:**
```js
stopScript();
```
<hr>
<h2 id="global-delay">delay(<code>ms</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)</h2>

Fait une pause dans le script.

**Exemple:**
```js
yield* await delay(3000); // Fait une pause de 3000ms (3 secondes).
```
<hr>

## leaveDialogFunc()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true et ferme la boite de dialogue si il y en a une d'ouverte, sinon retourne false.

**Exemple:**
```js
if (leaveDialogFunc()) {
  printMessage("Un dialogue était ouvert, on l'a fermé!");
}
```
<hr>

## leaveDialog()
Ferme une boite de dialogue.

**Exemple:**
```js
if (isInDialog()) {
  printMessage("Un dialogue est ouvert, on le ferme !");
  yield* await leaveDialog();
}
```
