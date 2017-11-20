import { BrowserWindow } from "electron";
import * as fs from "fs";
import * as path from "path";
import Task from ".";
import Constants from "../Constants";
import DownloadManager from "./DownloadManager";

export default class DownloadAssets extends Task {
  public toDownload: any[];
  public assetsToDownload: any[];
  public versions: any;
  public manifest: any;
  public assetMap: any;
  public currentIndex: number;
  public currentAssetsIndex: number;
  public hasDownloaded: boolean;

  constructor(win: BrowserWindow, toDownload: any, assetsToDownload: any, versions: any, manifest: any, assetMap: any) {
    super(win);
    this.toDownload = toDownload;
    this.assetsToDownload = assetsToDownload;
    this.versions = versions;
    this.manifest = manifest;
    this.assetMap = assetMap;
    this.currentIndex = 0;
    this.currentAssetsIndex = 0;
    this.hasDownloaded = false;
  }

  public dlManifestAsset(asset: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.inform("Downloading new assets : " + asset.split("/").pop() + "...", 20 + this.currentIndex * 5);
      DownloadManager.download({
        path: "./build",
        url: Constants.host + "/" + asset,
      }, (error: boolean, resp: any) => {
        if (error) {
          resolve(false);
        } else {
          this.hasDownloaded = true;
          this.versions[asset] = this.manifest[asset].version;
          resolve(true);
        }
      });
    });
  }

  public dlManifestAssets(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      while (this.currentIndex < this.toDownload.length) {
        const asset = this.toDownload[this.currentIndex++];
        if (asset === undefined) {
          resolve(false);
        }
        const res = await this.dlManifestAsset(asset);
        if (res) {
          await this.dlManifestAssets();
        } else {
          console.error("ERROR WHILE DOWNLOADING!");
          resolve(false);
        }
      }
      resolve(true);
    });
  }

  public dlAsset(asset: any) {
    return new Promise((resolve, reject) => {
      this.inform("Downloading new assets : " + asset.split("/").pop() + "...", 30 + (this.currentAssetsIndex * 100 / this.assetsToDownload.length) / 2);
      DownloadManager.download({
        path: asset.replace(/^(.+)\/([^\/]+)$/, "$1"),
        url: Constants.host + "/" + asset,
      }, (error: boolean, resp: any) => {
        if (error) {
          resolve(false);
        } else {
          this.hasDownloaded = true;
          this.versions[asset] = this.assetMap[asset].version;
          resolve(true);
        }
      });
    });
  }

  public dlAssets(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      while (this.currentAssetsIndex < this.assetsToDownload.length) {
        const asset = this.assetsToDownload[this.currentAssetsIndex++];
        if (asset === undefined) {
          resolve(false);
        }
        const res = await this.dlAsset(asset);
        if (res) {
          await this.dlAssets();
        } else {
          console.error("ERROR WHILE DOWNLOADING!");
          resolve(false);
        }
      }
      resolve(true);
    });
  }

  public do(): Promise<{success: boolean, hasDownloaded: boolean}> {
    return new Promise(async (resolve, reject) => {
      this.inform("Downloading new assets...", 60);
      await this.dlManifestAssets();
      await this.dlAssets();
      if (this.hasDownloaded) {
        fs.writeFileSync(this.path + "/versions.json", JSON.stringify(this.versions));
      }
      resolve({success: true, hasDownloaded: true});
    });
  }
}
