export function sleep(ms = 0) {
  return new Promise((r) => global.setTimeout(r, ms));
}
