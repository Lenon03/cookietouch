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
import "material-design-icons/iconfont/material-icons.css";
import * as React from "react";
import { render } from "react-dom";
import "typeface-roboto/index.css";
import "./main.scss";

const app = initialize();
app
  .database()
  .ref("averagePrices")
  .remove();

presence();

(global as any).API = new Array();

async function main() {
  GlobalConfiguration.load();
  LanguageManager.Init();
  await DTConstants.Init();
  await BreedsUtility.Init();
  MapPoint.Init();
  Frames.Init();

  const channel = await getChannel();
  ipcRenderer.send("ask-update", channel);

  render(<Main />, document.getElementById("app"));
}

main();

async function getChannel(): Promise<string> {
  let channel = "latest";
  const user = app.auth().currentUser;
  if (user) {
    const snapshot = await app
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("config")
      .doc("updates")
      .get();

    if (snapshot.exists) {
      channel = snapshot.data().channel;
    } else {
      app
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("config")
        .doc("updates")
        .set({
          channel: "latest"
        });
    }
  }
  return channel;
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
