import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import InventoryHelper from "@/game/character/inventory/InventoryHelper";
import DataManager from "@protocol/data";
import DTConstants from "@protocol/DTConstants";
import * as React from "react";
import Main from "./Main";

export class App extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
    (global as any).API = new Array();
    DTConstants.Init()
    .then(() => LanguageManager.Init())
    .then(() => MapPoint.Init())
    .then(() => BreedsUtility.Init())
    .then(() => InventoryHelper.Init());
    // .then(() => GlobalConfiguration.load());
  }

  public render() {
    return <Main />;
  }
}
