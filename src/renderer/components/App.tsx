import * as React from "react";
import Account from "../../cookie/Account";
import { MapChangeDirections } from "../../cookie/game/managers/movements/MapChangeDirections";

export class App extends React.Component<{}, {}> {

  public account: Account;

  constructor(props: {}) {
    super(props);

    this.account = new Account("cookieproject1", "azerty123456");
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
      </div>
    );
  }

  private changeMap(dir: MapChangeDirections) {
    const res = this.account.game.managers.movements.changeMap(dir);
    console.log("Movement Result: ", res);
  }

  private start() {
    this.account.start();
  }

  private stop() {
    this.account.stop();
  }
}
