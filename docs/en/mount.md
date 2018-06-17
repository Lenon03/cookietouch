# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Mount](mount)
  - [isRiding](#mountisriding)
  - [hasMount](#mounthasmount)
  - [currentRatio](#mountcurrentratio)
  - [toggleRiding](#mounttoggleriding)
  - [setRatio](#mountsetratioratio-number)

# Mount
All functions related to mounts.

## mount.isRiding
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character is riding the mount, otherwise returns false.

## mount.hasMount
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Returns true if the character has a mount, otherwise returns false.

## mount.currentRatio
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>

Returns the percentage of experience given to the mount.

## <code>yield*</code>mount.toggleRiding()
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows you to go off or ride on the mount.

Returns false if the bot was unable to mount, otherwise returns true.

**Example:**
```js
if (!mount.isRiding) {
  yield* mount.toggleRiding(); // If the character is not on the mount, then ride on the mount.
}
```
*Tip: Once the function is called, it takes between a second and a second and a half for the action to be effective.
If you must be sure to get on/off the mount to continue, you can use delay(2000) after toggleRiding().*

## <code>yield*</code>mount.setRatio(<code>ratio</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">number</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Allows to modify the percentage of experience given to the mount.

Returns false if the given percentage is invalid, otherwise returns true.

**Example:**
```js
yield* mount.setRatio(101); // false
yield* mount.setRatio(100); // true
```
