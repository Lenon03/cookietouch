import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import * as React from "react";

interface IInfosProps {
  account: Account;
}

interface IInfosStates {
  status: AccountStates;
  position: string;
}

export default class Infos extends React.Component<IInfosProps, IInfosStates> {

  constructor(props: IInfosProps) {
    super(props);
    this.state = {
      position: "",
      status: AccountStates.DISCONNECTED,
    };
    this.props.account.StateChanged.on(() => this.setState({status: this.props.account.state}));
    this.props.account.game.map.MapChanged.on((data) =>
      this.setState({position: this.props.account.game.map.labelPosition}));
  }

  public render() {
    return (
      <div>
        <div>Position: {this.state.position}</div>
        <div>Status: {AccountStates[this.state.status]}</div>
      </div>
    );
  }
}
