import { app, dialog } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

autoUpdater.logger = log;
(autoUpdater.logger as any).transports.file.level = "info";

export function appUpdater() {
  autoUpdater.on("error", (err) => log.info(err));
  autoUpdater.on("checking-for-update", () => log.info("checking-for-update"));
  autoUpdater.on("update-available", () => log.info("update-available"));
  autoUpdater.on("update-not-available", () => log.info("update-not-available"));
  autoUpdater.on("download-progress", (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
    log.info(log_message);
  });

  // Ask the user if update is available
  autoUpdater.on("update-downloaded", (info) => {
    let message = app.getName() +
      " " + info.releaseName + " (" + info.releaseDate + ") is now available. It will be installed the next time you restart the application.";
    if (info.releaseNotes) {
      const splitNotes = info.releaseNotes.split(/[^\r]\n/);
      message += "\n\nRelease notes:\n";
      splitNotes.forEach((notes: any) => {
        message += notes + "\n\n";
      });
    }
    // Ask user to update the app
    dialog.showMessageBox({
      buttons: ["Install and Relaunch", "Later"],
      defaultId: 0,
      detail: message,
      message: "A new version (" + info.version + ") of " + app.getName() + " has been downloaded",
      type: "question",
    }, (response) => {
      if (response === 0) {
        setTimeout(() => autoUpdater.quitAndInstall(), 1);
      }
    });
  });
  // init for updates
  autoUpdater.checkForUpdates();
}
