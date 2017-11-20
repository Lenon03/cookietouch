import { BrowserWindow } from "electron";
import * as fs from "fs";
import Task from ".";

export default class CheckAssets extends Task {
  public assets: any;
  public assets2: any;
  public toDownload: any[];
  public assetsToDownload: any[];
  public versions: any;

  constructor(win: BrowserWindow, assets: any, assets2: any) {
    super(win);
    this.assets = assets;
    this.assets2 = assets2;
    this.toDownload = [];
    this.assetsToDownload = [];
    this.versions = {};
  }

  public loadCurrentManifestVersions() {
    const keys = Object.keys(this.assets);
    try {
      const content = fs.readFileSync(this.path + "/versions.json");
      try {
        const v = JSON.parse(content.toString());
        this.versions = v;
        for (const key of keys) {
          const asset = this.assets[key];
          if (!v[asset.filename] || v[asset.filename] !== asset.version) {
            this.toDownload.push(asset.filename);
          }
        }
        return;
      } catch (e) {/**/}
    } catch (e) {/**/}
    for (const asset of keys) {
      this.toDownload.push(asset);
    }
  }

  public loadCurrentAssetVersions() {
    const keys = Object.keys(this.assets2);
    try {
      const content = fs.readFileSync(this.path + "/versions.json");
      try {
        const v = JSON.parse(content.toString());
        this.versions = Object.assign(v, this.versions);
        for (const key of keys) {
          const asset = this.assets2[key];
          if (!v[asset.filename] || v[asset.filename] !== asset.version) {
            this.assetsToDownload.push(asset.filename);
          }
        }
        return;
      } catch (e) {/**/}
    } catch (e) {/**/}
    for (const asset of keys) {
      this.assetsToDownload.push(asset);
    }

  }

  public do(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.inform("Checking existing assets...", 35);
      this.loadCurrentManifestVersions();
      this.loadCurrentAssetVersions();
      resolve(true);
    });
  }
}
