# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Sommaire
- [Global](#global)
  - [isFighting](#isfighting)
  - [isGathering](#isgathering)
  - [isInDialog](#isindialog)
  - [printMessage](#printmessagemessage-string)
  - [printDebug](#printdebugmessage-string)
  - [printSuccess](#printsuccessmessage-string)
  - [printError](#printerrormessage-string)
  - [stopScript](#stopscript)
  - [delay](#delayms-number)
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

## printMessage(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Affiche un message dans la console.

**Exemple:**
```js
printMessage("Ceci est un message.");
```

## printDebug(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Affiche un message de debug dans la console.

**Exemple:**
```js
printDebug("Ceci est un message de debug.");
```

## printSuccess(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Affiche un succès dans la console.

**Exemple:**
```js
printSuccess("Ceci est un message de succès.");
```

## printError(<code>message</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Affiche une erreur dans la console.

**Exemple:**
```js
printError("Ceci est un message d'erreur");
```

## stopScript()
Stoppe et termine le script immédiatement.

**Exemple:**
```js
stopScript();
```

## delay(<code>ms</code>: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Fait une pause dans le script.

**Exemple:**
```js
delay(3000); // Fait une pause de 3000ms (3 secondes).
```

## leaveDialogFunc()
- Return type: <a href="https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Retourne true et ferme la boite de dialogue si il y en a une d'ouverte, sinon retourne false.

**Exemple:**
```js
if (leaveDialogFunc()) {
  printMessage("Un dialogue était ouvert, on l'a fermé!");
}
```

## leaveDialog()
Ferme une boite de dialogue.

**Exemple:**
```js
if (isInDialog()) {
  printMessage("Un dialogue est ouvert, on le ferme !");
  leaveDialog();
}
```
