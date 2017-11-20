import { BrowserWindow } from "electron";
import * as fs from "fs";
import Task from ".";
import Constants from "../Constants";
import DownloadManager from "./DownloadManager";

export default class AssetMapGetter extends Task {
  public assets: string[];
  public tries: number;

  constructor(win: BrowserWindow) {
    super(win);
    this.assets = [];
    this.tries = 0;
  }

  public checkContent(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.inform("Checking AssetMap...", 20);
      const content = fs.readFileSync(this.path + "/assetMap.json");
      try {
        const mani = JSON.parse(content.toString());
        this.assets = mani.files;
        resolve(true);
      } catch (e) {
        this.do();
      }
    });
  }

  public do(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let text = "Downloading UI map file...";
      if (++this.tries > 1) {
        text = "Downloading UI map file (" + this.tries + ")...";
      }
      if (this.tries > 3) {
        resolve(false);
      }
      this.inform(text, 15);

      DownloadManager.download({
        path: ".",
        url: Constants.assetMapUrl,
      }, async (error: boolean, resp: any) => {
        if (error) {
          resolve(false);
        }
        await this.checkContent();
        resolve(true);
      });
    });
  }
}
