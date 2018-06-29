import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import InventoryHelper from "@/game/character/inventory/InventoryHelper";
import DTConstants from "@/protocol/DTConstants";
import { initialize, presence } from "@renderer/FirebaseHelpers";
import "@renderer/FontAwesomeIcons";
import Main from "@renderer/pages/Main";
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

function getCoords(mapId: number): { x: number; y: number } {
  let x = (mapId & 0x3fe00) >> 9;
  if ((x & 0x100) === 0x100) {
    x = -(x & 0xff);
  }
  let y = mapId & 0x01ff;
  if ((y & 0x100) === 0x100) {
    y = -(y & 0xff);
  }
  return { x, y };
}

console.log(getCoords(88212247));
