import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import InventoryHelper from "@/game/character/inventory/InventoryHelper";
import DTConstants from "@/protocol/DTConstants";
import * as React from "react";
import * as ReactDOM from "react-dom";
// import "typeface-roboto";
import { initialize, presence } from "./FirebaseHelpers";
import Main from "./pages/Main";

initialize();
presence();

(global as any).API = new Array();

GlobalConfiguration.load();
LanguageManager.Init();
DTConstants.Init().then(async () => {
  await BreedsUtility.Init();
  MapPoint.Init();
  InventoryHelper.Init();
});

ReactDOM.render(
  <Main />,
  document.getElementById("app"),
);
