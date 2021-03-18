# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
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
All useful functions in all circumstances.

## isFighting()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is fighting, otherwise returns false.

**Example:**
```js
if (isFighting()) {
  printMessage("The character is fighting!");
}
```

## isGathering()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is gathering, otherwise returns false.

**Example:**
```js
if (isGathering()) {
  printMessage("The character is gathering.");
}
```

## isInDialog()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is in a dialog (exchange, challenge, bank, NPC, etc…), otherwise returns false.

**Example:**
```js
if (isInDialog()) {
  printMessage("A dialog is open!");
}
```

## printMessage(<code>message</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Prints a message in the console.

**Example:**
```js
printMessage("This is a message.");
```

## printDebug(<code>message</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Prints a debug message in the console.

**Example:**
```js
printDebug("This is a debug message.");
```

## printSuccess(<code>message</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Prints a success message in the console.

**Example:**
```js
printSuccess("This is a succes message.");
```

## printError(<code>message</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">string</a>)
Prints an error in the console.

**Example:**
```js
printError("This is an error.");
```

## stopScript()
Stops and ends the script immediately.

**Example:**
```js
stopScript();
```

## delay(<code>ms</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
Delays the script.

**Example:**
```js
delay(3000); // Pauses 3000ms (3 seconds).
```

## leaveDialogFunc()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true and closes the dialog if there is one open, otherwise return false.

**Example:**
```js
if (leaveDialogFunc()) {
  printMessage("A dialog was opened, now it's closed!");
}
```

## leaveDialog()
Closes a dialog.

**Example:**
```js
if (isInDialog()) {
  printMessage("A dialog is open, let's close it!");
  leaveDialog();
}
```
