import BreedsUtility from "@/core/BreedsUtility";
import MapPoint from "@/core/pathfinder/MapPoint";
import DataManager from "@protocol/data";
import DTConstants from "@protocol/DTConstants";
import * as React from "react";
import Main from "./Main";

export class App extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
    const lang = "fr";
    DTConstants.Init()
    .then(() => MapPoint.Init())
    .then(() => DataManager.Init(lang))
    .then(() => BreedsUtility.Init());
  }

  public render() {
    return <Main />;
  }
}
