import { remote } from "electron";
import { lstat, readdir } from "fs";
import { join } from "path";
import { promisify } from "util";

const readdirAsync = promisify(readdir);
const lstatAsync = promisify(lstat);

export function format(n: number) {
  return n.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}

export async function getFolderSize(path: string): Promise<number> {
  const childs = await readdirAsync(path);
  const filesPromises = childs.map(async fileName => {
    const filePath = join(path, fileName);
    const fileStats = await lstatAsync(filePath);
    if (fileStats.isDirectory()) {
      return getFolderSize(filePath);
    }

    return fileStats.size;
  });

  const fileSizes = await Promise.all(filesPromises);
  return fileSizes.reduce((total, fileSize) => total + fileSize, 0);
}

export const getCacheSize = () =>
  getFolderSize(join(remote.app.getPath("userData"), "assets"));
