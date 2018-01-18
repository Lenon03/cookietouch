import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import axios from "axios";
import * as React from "react";
import Image from "./Image";

interface IInfosProps {
  account: Account;
}

interface IInfosStates {
  status: AccountStates;
  position: string;
  skinUrl: string;
}

export default class Infos extends React.Component<IInfosProps, IInfosStates> {

  constructor(props: IInfosProps) {
    super(props);
    this.state = {
      position: "",
      skinUrl: "",
      status: AccountStates.DISCONNECTED,
    };
  }

  public componentDidMount() {
    this.props.account.StateChanged.on(this.stateChanged.bind(this));
    this.props.account.game.map.MapChanged.on(this.mapChanged.bind(this));
  }

  public componentWillUnmount() {
    this.props.account.StateChanged.off(this.stateChanged.bind(this));
    this.props.account.game.map.MapChanged.off(this.mapChanged.bind(this));
  }

  public render() {
    return (
      <div>
        <div>Position: {this.state.position}</div>
        <div>Status: {AccountStates[this.state.status]}</div>
        <img src={this.state.skinUrl} />
      </div>
    );
  }

  private mapChanged() {
    this.setState({
      position: `${this.props.account.game.map.labelPosition} (${this.props.account.game.map.id})`,
    });
  }

  private stateChanged() {
    if (this.props.account.state === AccountStates.NONE) {
      this.setState({
        skinUrl: this.props.account.game.character.skinUrl,
      });
    } else if (this.props.account.state === AccountStates.DISCONNECTED) {
      this.setState({
        skinUrl: "",
      });
    }
    this.setState({ status: this.props.account.state });
  }
}
