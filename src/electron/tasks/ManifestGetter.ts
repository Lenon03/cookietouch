import { app, BrowserWindow } from "electron";
import * as fs from "fs";
import Task from ".";
import Constants from "../Constants";
import DownloadManager from "./DownloadManager";

export default class ManifestGetter extends Task {
  public assets: any[];
  public tries: number;

  constructor(win: BrowserWindow) {
    super(win);
    this.assets = [];
    this.tries = 0;
  }

  public checkContent(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.inform("Checking manifest...", 10);
      const content = fs.readFileSync(this.path + "/manifest.json");
      try {
        const mani = JSON.parse(content.toString());
        this.assets = mani.files;
        resolve(true);
      } catch (e) {
        console.log(e);
        this.do();
      }
    });
  }

  public do(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let text = "Downloading configuration file...";
      if (++this.tries > 1) {
        text = "Downloading configuration file (" + this.tries + ")...";
      }
      if (this.tries > 3) {
        resolve(false);
      }
      this.inform(text, 5);
      DownloadManager.download({
        url: Constants.manifestUrl,
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
