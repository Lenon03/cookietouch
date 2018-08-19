import { exists, mkdir, readFile, writeFile } from "fs";
import { dirname } from "path";
import { promisify } from "util";

const existsAsync = promisify(exists);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);

export async function mkdirp(path: string, mode = 0o777) {
  try {
    await mkdirAsync(path, mode);
  } catch ({ errno }) {
    if (-2 !== errno) {
      return;
    } // enoent
    await mkdirp(dirname(path), mode);
    await mkdirp(path, mode);
  }
}

export { existsAsync, readFileAsync, writeFileAsync, mkdirAsync };
