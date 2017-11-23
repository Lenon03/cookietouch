export function union(arr: any[]): any[] {
  return [...new Set([].concat(...arr))];
}
