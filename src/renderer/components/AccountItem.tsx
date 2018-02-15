import Account from "@account";
import classnames from "classnames";
import * as React from "react";
import { ListGroupItem, NavLink } from "reactstrap";
import CookieMain from "../CookieMain";

interface IAccountItemProps {
  account: Account;
}

interface IAccountItemStates {
  selectedAccount: Account;
}

export default class AccountItem extends React.Component<IAccountItemProps, IAccountItemStates> {

  constructor(props: IAccountItemProps) {
    super(props);
    this.state = {
      selectedAccount: CookieMain.selectedAccount,
    };
  }

  public componentDidMount() {
    CookieMain.SelectedAccountChanged.on(this.selectedAccountChanged.bind(this));
  }

  public componentWillUnmount() {
    CookieMain.SelectedAccountChanged.off(this.selectedAccountChanged.bind(this));
  }

  public render() {
    const { account } = this.props;
    const { selectedAccount } = this.state;

    if (!selectedAccount) {
      return "";
    }

    return (
      <ListGroupItem
        color={account.hasGroup ? account.isGroupChief ? "warning" : "info" : "dark" }
        className={classnames({ active: account.accountConfig.username === selectedAccount.accountConfig.username })}
      >
        <NavLink onClick={() => this.changeAccount(account) }>
          {account.accountConfig.username}
        </NavLink>
      </ListGroupItem>
    );
  }

  private selectedAccountChanged(account: Account) {
    this.setState({ selectedAccount: account });
  }

  private changeAccount(account: Account) {
    CookieMain.selectedAccount = account;
  }
}
