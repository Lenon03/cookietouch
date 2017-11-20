import { app, BrowserWindow } from "electron";

export default class Task {
  public win: BrowserWindow;
  public path: string;

  constructor(win: BrowserWindow) {
    this.win = win;
    this.path = app.getPath("userData");
  }

  public inform(text: string, pct: number) {
    this.win.webContents.send("loadingData", { text, pct });
  }
}
