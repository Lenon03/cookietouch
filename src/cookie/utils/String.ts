export function isEmpty(str: string) {
  return (!str || 0 === str.length);
}

export function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
}
