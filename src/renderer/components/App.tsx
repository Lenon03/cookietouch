import { MapChangeDirections } from "@/game/managers/movements/MapChangeDirections";
import Account from "@account";
import DataManager from "@protocol/data";
import DTConstants from "@protocol/DTConstants";
import * as React from "react";
import Game from "./Game";
import Infos from "./Infos";

export class App extends React.Component<{}, {}> {

  public account: Account;

  constructor(props: {}) {
    super(props);
    const lang = "fr";
    DTConstants.Init();
    DataManager.Init(lang);
    this.account = new Account("cookieproject1", "azerty123456", lang);
  }

  public render() {
    return (
      <div>
        <Game />
        <h1>CookieTouch</h1>
        <button onClick={() => this.start()}>Start</button>
        <button onClick={() => this.stop()}>Stop</button>
        <hr />

        <button onClick={() => this.changeMap(MapChangeDirections.Top)}>Top</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Bottom)}>Bottom</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Left)}>Left</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Right)}>Right</button>
        <hr />
        <Infos account={this.account} />
      </div>
    );
  }

  private changeMap(dir: MapChangeDirections) {
    const res = this.account.game.managers.movements.changeMap(dir);
    this.account.logger.logDebug("", `Movement Result: ${res}`);
  }

  private start() {
    this.account.start();
  }

  private stop() {
    this.account.stop();
  }
}
