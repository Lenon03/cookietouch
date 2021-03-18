export function union(arr: any[]): any[] {
  return [...new Set([].concat(...arr))];
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
