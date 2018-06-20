import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import InventoryHelper from "@/game/character/inventory/InventoryHelper";
import DTConstants from "@/protocol/DTConstants";
import { getSize } from "@utils/Sizes";
import { remote } from "electron";
import * as path from "path";
import * as React from "react";
import * as ReactDOM from "react-dom";
// import "typeface-roboto";
import { initialize, presence } from "./FirebaseHelpers";
import Main from "./pages/Main";

initialize();
presence();

(global as any).API = new Array();

async function init() {
  GlobalConfiguration.load();
  LanguageManager.Init();
  await DTConstants.Init();
  await BreedsUtility.Init();
  MapPoint.Init();
  InventoryHelper.Init();

  console.log(
    getSize(
      path.join(remote.app.getPath("userData"), DTConstants.assetsVersion)
    )
  );
}

init();

ReactDOM.render(<Main />, document.getElementById("app"));
