import { exists, mkdir, mkdirSync, readFile, writeFile } from "fs";
import { isAbsolute, resolve, sep } from "path";
import { promisify } from "util";

const existsAsync = promisify(exists);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);

/**
 * Recursively creates directories until `targetDir` is valid.
 * @param targetDir target directory path to be created recursively.
 * @param isRelative is the provided `targetDir` a relative path?
 */
export function mkdirRecursive(targetDir: string, { isRelativeToScript = false } = {}) {
  const initDir = isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = resolve(baseDir, parentDir, childDir);
    try {
      mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && targetDir === curDir) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

export { existsAsync, readFileAsync, writeFileAsync, mkdirAsync };
