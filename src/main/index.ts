import { app, BrowserWindow, Menu } from "electron";
import { appUpdater } from "./Updater";

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

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    show: false,
    // webPreferences: {
    //   webSecurity: false,
    // },
  });
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
  if (!isDevelopment) {
    appUpdater();
  }
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow = createMainWindow();
});
