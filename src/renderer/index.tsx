import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import Frames from "@/frames";
import DTConstants from "@/protocol/DTConstants";
import Pushbullet from "@/utils/Pushbullet";
import { initialize, presence } from "@renderer/FirebaseHelpers";
import "@renderer/FontAwesomeIcons";
import { LoadingPage } from "@renderer/LoadingPage";
import Main from "@renderer/pages/Main";
import { spinnerService } from "@renderer/Spinner/Service";
// import "./test";
import { init } from "@sentry/electron";
import { ipcRenderer, remote } from "electron";
import "material-design-icons/iconfont/material-icons.css";
import * as React from "react";
import { render } from "react-dom";
import "typeface-roboto/index.css";
import "./main.scss";

init({
  dsn: "https://c2de150c591046829235a291351779b7@sentry.io/1237788"
});

render(<LoadingPage />, document.getElementById("app"));

spinnerService.show("mySpinner");

initialize();
presence();

(global as any).API = new Array();

const onGlobalConfigChanged = () => {
  ipcRenderer.send("ask-update", GlobalConfiguration.updatesChannel);
  GlobalConfiguration.Updated.off(onGlobalConfigChanged);
};

GlobalConfiguration.Updated.on(onGlobalConfigChanged);

async function main() {
  GlobalConfiguration.Init();
  await GlobalConfiguration.load();
  Pushbullet.changeToken(GlobalConfiguration.pushBulletAccessToken);
  LanguageManager.Init();
  await DTConstants.Init();
  await BreedsUtility.Init();
  MapPoint.Init();
  Frames.Init();

  spinnerService.hide("mySpinner");

  render(<Main />, document.getElementById("app"));
}

main();

ipcRenderer.on("go-update", (event, info) => {
  let message = LanguageManager.trans("releaseAvailable", info.version);
  if (info.releaseNotes) {
    message += LanguageManager.trans("releaseNotes", info.releaseNotes);
  }
  remote.dialog.showMessageBox(
    {
      buttons: [
        LanguageManager.trans("installRelaunch"),
        LanguageManager.trans("later")
      ],
      defaultId: 0,
      detail: message,
      message: LanguageManager.trans(
        "newVersionDownloaded",
        remote.app.getName()
      ),
      type: "question"
    },
    response => {
      if (response === 0) {
        setTimeout(() => ipcRenderer.send("ask-quitAndInstall"), 1);
      }
    }
  );
});
