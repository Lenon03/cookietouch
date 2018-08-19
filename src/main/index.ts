import {
  app,
  BrowserWindow,
  crashReporter,
  ipcMain,
  Menu,
  MenuItemConstructorOptions,
  screen
} from "electron";
import { appUpdater } from "./updater";

app.commandLine.appendSwitch("js-flags", "--harmony-async-iteration");

crashReporter.start({
  companyName: "DevChris",
  ignoreSystemCrashHandler: true,
  productName: "CookieTouch",
  submitURL:
    "https://sentry.io/api/1237788/minidump?sentry_key=c2de150c591046829235a291351779b7"
});

const template: MenuItemConstructorOptions[] = [
  {
    label: app.getVersion()
  }
];
if (process.platform === "darwin") {
  // OS X
  const name = app.getName();
  template.unshift({
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  });
  template.unshift({
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about"
      },
      {
        accelerator: "Command+Q",
        click() {
          app.quit();
        },
        label: "Quit"
      }
    ]
  });
}

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow;

function createMainWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const window = new BrowserWindow({
    // frame: false,
    height: size.height,
    webPreferences: {
      webSecurity: false
    },
    width: size.width,
    x: 0,
    y: 0
  });

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
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

app.on("ready", () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow = createMainWindow();
  if (!isDevelopment) {
    ipcMain.on("ask-update", (event, channel: string) =>
      appUpdater(mainWindow, channel)
    );
  }
});
