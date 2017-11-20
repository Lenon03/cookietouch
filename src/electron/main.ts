import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import DownloadManager from "./tasks/DownloadManager";

import AssetMapGetter from "./tasks/AssetMapGetter";
import CheckAssets from "./tasks/CheckAssets";
import DownloadAssets from "./tasks/DownloadAssets";
import FileManipulator from "./tasks/FileManipulator";
import ManifestGetter from "./tasks/ManifestGetter";

DownloadManager.register({ downloadFolder: app.getPath("userData") });

let win: BrowserWindow;
let mainWindow: BrowserWindow;

const createWindow = () => {
  win = new BrowserWindow({
    frame: false,
    width: 500,
    height: 350,
    transparent: true,
    resizable: false,
    movable: false,
  });
  win.loadURL(url.format({
    pathname: path.join(app.getAppPath(), "/static/load.html"),
    protocol: "file:",
    slashes: true,
  }));
  // win.webContents.openDevTools();
  win.webContents.on("did-finish-load", async (event: any, input: any) => {
    await checkAssets();
  });

  win.on("closed", () => {
    win = null;
  });
};

function readyGo() {
  inform(win, "I think it's now ready", 100);
  setTimeout(() => {
    mainWindow = new BrowserWindow({
      height: 1000,
      title: "CookieTouch",
      webPreferences: {
        backgroundThrottling: false,
      },
      width: 1800,
    });
    mainWindow.loadURL(url.format({
      pathname: path.join(app.getAppPath(), "/static/index.html"),
      protocol: "file:",
      slashes: true,
    }));
    mainWindow.webContents.setUserAgent("Mozilla/5.0 (Linux; Android 7.1.1; ONEPLUS A5000 Build/NMF26X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Crosswalk/15.44.384.13 Mobile Safari/537.36");
    // mainWindow.webContents.setFrameRate(5);
    // mainWindow.setMinimizable(false);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", () => {
      mainWindow = null;
    });
    win.close();
  }, 1000);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

function inform(win2: BrowserWindow, text: string, pct: number) {
  win2.webContents.send("loadingData", { pct, text });
}

function inform_err(win2: BrowserWindow, text: string) {
  win2.webContents.send("error", text);
}

async function checkAssets() {
  const manifestGetter = new ManifestGetter(win);
  const res = await manifestGetter.do();
  if (!res) {
    inform_err(win, "We can't download the file. Do you have enough space on your hard drive ?");
    return;
  }
  const assetMapGetter = new AssetMapGetter(win);
  const res2 = await assetMapGetter.do();
  if (!res2) {
    inform_err(win, "We can't download the file. Do you have enough space on your hard drive ?");
    return;
  }
  const assetsChecker = new CheckAssets(win, manifestGetter.assets, assetMapGetter.assets);
  await assetsChecker.do();
  const assetDownloader = new DownloadAssets(win, assetsChecker.toDownload, assetsChecker.assetsToDownload, assetsChecker.versions, manifestGetter.assets, assetMapGetter.assets);
  const res3 = await assetDownloader.do();
  if (!res3.success) {
    inform_err(win, "We can't download assets. Do you have enough space on your hard drive ?");
    return;
  } else {
    if (res3.hasDownloaded) {
      const fileManipulator = new FileManipulator(win);
      await fileManipulator.do();
      readyGo();
    } else {
      readyGo();
    }
  }
}
