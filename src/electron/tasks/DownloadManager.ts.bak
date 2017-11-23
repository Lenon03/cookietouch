import axios from "axios";
import { app, BrowserWindow } from "electron";
import * as fs from "fs";
import * as path from "path";

let downloadFolder = app.getPath("downloads");
let lastWindowCreated: BrowserWindow;

const queue: any[] = [];

export interface IDownloaderOptions {
  downloadFolder?: string;
}

function _registerListener(win: BrowserWindow, opts: IDownloaderOptions, cb?: void) {

  lastWindowCreated = win;
  downloadFolder = opts.downloadFolder || downloadFolder;

  const listener = (e: any, item: any, webContents: any) => {

    const queueItem = _popQueueItem(item.getURL());

    const filePath = path.join(downloadFolder, path.join(queueItem.path, item.getFilename()));

    const totalBytes = item.getTotalBytes();

    item.setSavePath(filePath);

    // Resuming an interupted download
    if (item.getState() === "interrupted") {
      item.resume();
    }

    item.on("updated", () => {
      const progress = item.getReceivedBytes() * 100 / totalBytes;

      if (typeof queueItem.onProgress === "function") {
        queueItem.onProgress(progress, item);
      }
    });

    item.on("done", (e2: any, state: any) => {

      const finishedDownloadCallback = queueItem.callback || (() => {/**/ });

      if (!win.isDestroyed()) {
        win.setProgressBar(-1);
      }

      if (state === "interrupted") {
        const message = `The download of ${item.getFilename()} was interrupted`;

        finishedDownloadCallback(new Error(message), item.getURL());

      } else if (state === "completed") {
        if (process.platform === "darwin") {
          app.dock.downloadFinished(filePath);
        }
        // TODO: remove this listener, and/or the listener that attach this listener to newly created windows
        // if (opts.unregisterWhenDone) {
        //     webContents.session.removeListener('will-download', listener);
        // }

        finishedDownloadCallback(null, { url: item.getURL(), filePath });

      }

    });
  };

  win.webContents.session.on("will-download", listener);
}

const register = (opts = {}) => {

  app.on("browser-window-created", (e, win) => {
    _registerListener(win, opts);
  });
};

const download = (options: any, callback: any) => {
  const win = BrowserWindow.getFocusedWindow() || lastWindowCreated;
  options = Object.assign({}, {
    path: "",
  }, options);

  axios.get(options.url).then((response) => {
    response.request.abort();

    queue.push({
      callback,
      onProgress: options.onProgress,
      path: options.path.toString(),
      url: options.url /* check if is right */,
    });

    const filename = path.basename(options.url /* check if is right */);

    const filePath = path.join(path.join(downloadFolder, options.path.toString()), filename);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);

      const fileOffset = stats.size;

      const serverFileSize = parseInt(response.headers["content-length"], 10);

      console.log(`${filename} exists, verifying file size: (${fileOffset} / ${serverFileSize} downloaded)`);

      // Check if size on disk is different than server
      if (fileOffset !== serverFileSize) {
        console.log("File needs re-downloaded as it was not completed");

        options = {
          lastModified: response.headers["last-modified"],
          length: serverFileSize,
          offset: fileOffset,
          path: filePath,
          urlChain: [options.url /* check if is right */],
        };

        win.webContents.session.createInterruptedDownload(options);
      } else {
        console.log(`${filename} verified, no download needed`);

        const finishedDownloadCallback = callback || (() => {/**/ });

        finishedDownloadCallback(null, { url: options.url /* check if is right */, filePath });
      }

    } else {
      console.log(`${filename} does not exist, download it now`);
      win.webContents.downloadURL(options.url);
    }
  }).catch((error) => console.log(error));
};

const bulkDownload = (options: any, callback: any) => {

  options = Object.assign({}, {
    path: "",
    urls: [],
  }, options);

  const urlsCount = options.urls.length;
  const finished: any[] = [];
  const errors: any[] = [];

  options.urls.forEach((url: string) => {
    download({
      path: options.path,
      url,
    }, (error: any, item: any) => {

      if (error) {
        errors.push(item);
      } else {
        finished.push(item);
      }

      const errorsCount = errors.length;
      const finishedCount = finished.length;

      if ((finishedCount + errorsCount) === urlsCount) {
        if (errorsCount > 0) {
          callback(new Error(`${errorsCount} downloads failed`), finished, errors);
        } else {
          callback(null, finished, []);
        }
      }
    });
  });
};

const _popQueueItem = (url: string) => {
  const queueItem = queue.find((item) => item.url === url);
  queue.splice(queue.indexOf(queueItem), 1);
  return queueItem;
};

export default {
  bulkDownload,
  download,
  register,
};
