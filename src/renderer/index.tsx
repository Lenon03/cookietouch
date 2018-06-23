import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import InventoryHelper from "@/game/character/inventory/InventoryHelper";
import DTConstants from "@/protocol/DTConstants";
// import "typeface-roboto";
import { initialize, presence } from "@renderer/FirebaseHelpers";
import "@renderer/FontAwesomeIcons";
import Main from "@renderer/pages/Main";
import * as React from "react";
import { render } from "react-dom";

const app = initialize();
app
  .database()
  .ref("averagePrices")
  .remove();

presence();

(global as any).API = new Array();

async function init() {
  GlobalConfiguration.load();
  LanguageManager.Init();
  await DTConstants.Init();
  await BreedsUtility.Init();
  MapPoint.Init();
  InventoryHelper.Init();
}

init();

render(<Main />, document.getElementById("app"));
