export function isEmpty(str: string): boolean {
  return !str || 0 === str.length;
}

export function isBlank(str: string): boolean {
  return !str || /^\s*$/.test(str);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
