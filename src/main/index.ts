import { app, BrowserWindow, Menu } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

autoUpdater.logger = log;
(autoUpdater.logger as any).transports.file.level = "info";
log.info("App starting...");

const template: any[] = [];
if (process.platform === "darwin") {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about",
      },
      {
        accelerator: "Command+Q",
        click() { app.quit(); },
        label: "Quit",
      },
    ],
  });
}

function logg(text: string) {
  log.info(text);
}

autoUpdater.on("checking-for-update", () => {
  logg("Checking for update...");
});
autoUpdater.on("update-available", (info) => {
  logg("Update available.");
});
autoUpdater.on("update-not-available", (info) => {
  logg("Update not available.");
});
autoUpdater.on("error", (err) => {
  logg("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
  logg(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  logg("Update downloaded");
});

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow;

function createMainWindow() {
  const window = new BrowserWindow({show: false});
  window.maximize();
  window.show();

  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`;

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  window.loadURL(url);

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") { app.quit(); }
});

app.on("activate", () => {
  if (mainWindow === null) { mainWindow = createMainWindow(); }
});

app.on("ready", () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow = createMainWindow();
});

app.on("ready", () => {
  autoUpdater.checkForUpdatesAndNotify();
});
