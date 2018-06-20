import DTConstants from "@/protocol/DTConstants";
import { remote } from "electron";
import * as fs from "fs";
import { flatten } from "lodash";
import { join } from "path";

export function format(n: number) {
  return n.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,");
}
export function getFiles(dir: string): string[] {
  dir = dir.replace(/\/$/, "");
  return flatten(
    fs.readdirSync(dir).map(file => {
      const fileOrDir = fs.statSync([dir, file].join("/"));
      if (fileOrDir.isFile()) {
        return (dir + "/" + file).replace(/^\.\/\/?/, "");
      } else if (fileOrDir.isDirectory()) {
        return getFiles([dir, file].join("/"));
      } else {
        return null;
      }
    })
  );
}

export function getSizeString(path: string): string {
  const buffers = getFiles(path)
    .map(file => fs.readFileSync(file))
    .join("\n");
  return format(buffers.length);
}

export function getSize(path: string): number {
  const buffers = getFiles(path)
    .map(file => fs.readFileSync(file))
    .join("\n");
  return buffers.length;
}

export const getCacheSize = () =>
  DTConstants.assetsVersion &&
  getSize(join(remote.app.getPath("userData"), DTConstants.assetsVersion));
