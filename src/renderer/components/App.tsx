import * as React from "react";
import Account from "../../cookie/Account";
import DTConstants from "../../cookie/protocol/DTConstants";

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
      </div>
    );
  }

  private start() {
    this.account.start();
  }

  private stop() {
    this.account.stop();
  }
}
