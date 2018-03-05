export function sleep(ms = 0): any {
  if (ms <= 0) { return; }
  return new Promise((r) => global.setTimeout(r, ms));
}
