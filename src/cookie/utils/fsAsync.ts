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
export function mkdirRecursive(targetDir: string, isRelative = false) {
  const initDir = isAbsolute(targetDir) ? sep : "";
  const baseDir = isRelative ? __dirname : ".";

  targetDir.split(sep).reduce((prevDirPath, dirToCreate) => {
    const curDirPathToCreate = resolve(baseDir, prevDirPath, dirToCreate);
    try {
      mkdirSync(curDirPathToCreate);
    } catch (err) {
      if (err.code !== "EEXIST") {
        throw err;
      }
      // caught EEXIST error if curDirPathToCreate already existed (not a problem for us).
    }

    return curDirPathToCreate; // becomes prevDirPath on next call to reduce
  }, initDir);
}

export { existsAsync, readFileAsync, writeFileAsync, mkdirAsync };
