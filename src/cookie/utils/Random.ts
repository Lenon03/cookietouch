export function randomString(len: number, bits: number = 36) {
  let outStr = "";
  let newStr;
  while (outStr.length < len) {
    newStr = Math.random().toString(bits).slice(2);
    outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
  }
  return outStr.toUpperCase();
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
