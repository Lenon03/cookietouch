# CookieTouch API Documentation
[Summary](SUMMARY.md) | [Single page summary](singlepage.md)

<hr>

## Table of Contents
- [Gather](#fight)
  - [canGather](#cangatherresourcesids-number)
  - [gather](#gatherresourcesids-number)

# Gather
All functions related to gathering.

**resourcesIds can be found in [resources.txt](https://github.com/yovanoc/cookietouch/blob/master/resources/identifiants/resources.txt).**

## canGather(<code>...resourcesIds</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">string</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Check if it is possible to gather the resource(s) chosen in parameter.

Returns true if the map contains the searched resources, otherwise returns false.

**Example:**
```js
canGather([1, 28]) // True if it is possible to collect Ash and/or If on this map.
```

## <code>yield*</code>gather(<code>...resourcesIds</code>: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">string</a>)
- Return type: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type">boolean</a>

Gathers the resources passed in parameter after having checked whether it was possible to.

Returns true and collects resources if the map contains the searched resources, otherwise returns false.

**Example:**
```js
yield* gather([1, 28]) // Gather Ash and/or If if they are present on the map.
```
