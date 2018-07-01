import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import Frames from "@/frames";
import DTConstants from "@/protocol/DTConstants";
import { initialize, presence } from "@renderer/FirebaseHelpers";
import "@renderer/FontAwesomeIcons";
import Main from "@renderer/pages/Main";
import { ipcRenderer, remote } from "electron";
import firebase from "firebase";
import "material-design-icons/iconfont/material-icons.css";
import * as React from "react";
import { render } from "react-dom";
import "typeface-roboto/index.css";
import "./main.scss";

let updated = false;

const app = initialize();

presence();

(global as any).API = new Array();

const authUnsub = firebase.auth().onAuthStateChanged(async user => {
  if (!updated) {
    updated = true;
    authUnsub();
    GlobalConfiguration.Init();
    await GlobalConfiguration.load();
    main();
    ipcRenderer.send("ask-update", GlobalConfiguration.updatesChannel);
  }
});

async function main() {
  LanguageManager.Init();
  await DTConstants.Init();
  await BreedsUtility.Init();
  MapPoint.Init();
  Frames.Init();

  render(<Main />, document.getElementById("app"));
}

ipcRenderer.on("go-update", (event, info) => {
  const message = LanguageManager.trans("releaseAvailable", info.version);
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
        setTimeout(() => remote.autoUpdater.quitAndInstall(), 1);
      }
    }
  );
});
