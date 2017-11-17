import * as React from "react";
import Account from "../../cookie/Account";
import { AccountStates } from "../../cookie/AccountStates";
import { MapChangeDirections } from "../../cookie/game/managers/movements/MapChangeDirections";
import DataManager from "../../cookie/protocol/data";
import DTConstants from "../../cookie/protocol/DTConstants";

interface IAppStates {
  status: AccountStates;
  position: string;
}

export class App extends React.Component<{}, IAppStates> {

  public account: Account;

  constructor(props: {}) {
    super(props);
    this.state = {
      position: "",
      status: AccountStates.DISCONNECTED,
    };
    const lang = "fr";
    DTConstants.Init();
    DataManager.Init(lang);
    this.account = new Account("cookieproject1", "azerty123456", lang);
    this.account.StateChanged.on(() => {
      this.setState({
        status: this.account.state,
      });
    });
    this.account.game.map.MapChanged.on((data) => {
      this.setState({
        position: this.account.game.map.currentPosition,
      });
    });
  }

  public render() {
    return (
      <div>
        <h1>CookieTouch</h1>
        <button onClick={() => this.start()}>Start</button>
        <button onClick={() => this.stop()}>Stop</button>
        <hr />

        <button onClick={() => this.changeMap(MapChangeDirections.Top)}>Top</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Bottom)}>Bottom</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Left)}>Left</button>
        <button onClick={() => this.changeMap(MapChangeDirections.Right)}>Right</button>
        <hr />
        <div>Position: {this.state.position}</div>
        <div>Status: {AccountStates[this.state.status]}</div>
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
