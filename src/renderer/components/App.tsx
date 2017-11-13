import * as React from "react";
import { Account } from "../../bot/data/Account";

export class App extends React.Component<{}, {}> {

  public account: Account;

  constructor(props: {}) {
    super(props);

    this.account = new Account("cookieproject1", "azerty123456");
    this.account.connect();
  }

  public render() {
    return (
      <div>
        <h1>CookieTouch</h1>
      </div>
    );
  }
}
