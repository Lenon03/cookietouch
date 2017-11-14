import * as React from "react";
import Account from "../../cookie/game/Account";

export class App extends React.Component<{}, {}> {

  public account: Account;

  constructor(props: {}) {
    super(props);

    this.account = new Account("cookieproject1", "azerty123456", "en");
    this.account.start();
  }

  public render() {
    return (
      <div>
        <h1>CookieTouch</h1>
      </div>
    );
  }
}
