import { app, dialog } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

autoUpdater.channel = "alpha";

autoUpdater.logger = log;
(autoUpdater.logger as any).transports.file.level = "info";

export function appUpdater() {
  autoUpdater.on("error", err => log.info(err));
  autoUpdater.on("checking-for-update", () => log.info("checking-for-update"));
  autoUpdater.on("update-available", () => log.info("update-available"));
  autoUpdater.on("update-not-available", () =>
    log.info("update-not-available")
  );
  autoUpdater.on("download-progress", progressObj => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    log.info(log_message);
  });

  autoUpdater.on("update-downloaded", info => {
    let message = `${app.getName()} ${
      info.releaseName
    } is now available. It will be installed the next time you restart the application.`;

    if (info.releaseNotes) {
      message += `\n\nRelease notes:\n${info.releaseNotes}`;
    }
    dialog.showMessageBox(
      {
        buttons: ["Install and relaunch", "Later"],
        defaultId: 0,
        detail: message,
        message: `A new version (${
          info.version
        }) of ${app.getName()} has been downloaded`,
        type: "question"
      },
      response => {
        if (response === 0) {
          setTimeout(() => autoUpdater.quitAndInstall(), 1);
        }
      }
    );
  });

  autoUpdater.checkForUpdates();
}

/*import LanguageManager from "@/configurations/language/LanguageManager";
import { app, dialog } from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";

autoUpdater.logger = log;
(autoUpdater.logger as any).transports.file.level = "info";

export function appUpdater() {
  autoUpdater.channel = "alpha";
  autoUpdater.on("error", err => log.info(err));
  autoUpdater.on("checking-for-update", () => log.info("checking-for-update"));
  autoUpdater.on("update-available", () => log.info("update-available"));
  autoUpdater.on("update-not-available", () =>
    log.info("update-not-available")
  );
  autoUpdater.on("download-progress", progressObj => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    log.info(log_message);
  });

  autoUpdater.on("update-downloaded", info => {
    let message = LanguageManager.trans(
      "releaseAvailable",
      app.getName(),
      info.releaseName
    );
    if (info.releaseNotes) {
      message += LanguageManager.trans("releaseNotes", info.releaseNotes);
    }
    dialog.showMessageBox(
      {
        buttons: [
          LanguageManager.trans("installRelaunch"),
          LanguageManager.trans("later")
        ],
        defaultId: 0,
        detail: message,
        message: LanguageManager.trans(
          "newVersionDownloaded",
          info.version,
          app.getName()
        ),
        type: "question"
      },
      response => {
        if (response === 0) {
          setTimeout(() => autoUpdater.quitAndInstall(), 1);
        }
      }
    );
  });

  autoUpdater.checkForUpdates();
}
*/
