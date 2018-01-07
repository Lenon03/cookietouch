import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import axios from "axios";
import * as React from "react";

interface IInfosProps {
  account: Account;
}

interface IInfosStates {
  status: AccountStates;
  position: string;
  skinUrl: string;
  itemUrl: string;
  spellUrl: string;
  jobUrl: string;
}

export default class Infos extends React.Component<IInfosProps, IInfosStates> {

  constructor(props: IInfosProps) {
    super(props);
    this.state = {
      itemUrl: "",
      jobUrl: "",
      position: "",
      skinUrl: "",
      spellUrl: "",
      status: AccountStates.DISCONNECTED,
    };
    this.props.account.StateChanged.on(() => {
      if (this.props.account.state === AccountStates.NONE) {
        let itemUrl = "";
        if (this.props.account.game.character.inventory.equipments.Count() > 0) {
          itemUrl = this.props.account.game.character.inventory.equipments.First().iconUrl;
        }
        let jobUrl = "";
        if (this.props.account.game.character.jobs.jobs.Count() > 0) {
          jobUrl = this.props.account.game.character.jobs.jobs.First().iconUrl;
        }
        let spellUrl = "";
        if (this.props.account.game.character.spells.length > 0) {
          spellUrl = this.props.account.game.character.spells[0].iconUrl;
        }
        this.setState({
          itemUrl,
          jobUrl,
          skinUrl: this.props.account.game.character.getSkinUrl("full", 1, 100, 200, 1),
          spellUrl,
        });
      } else if (this.props.account.state === AccountStates.DISCONNECTED) {
        this.setState({
          itemUrl: "",
          jobUrl: "",
          skinUrl: "",
          spellUrl: "",
        });
      }
      this.setState({ status: this.props.account.state });
    });
    this.props.account.game.map.MapChanged.on((data) =>
      this.setState({position: this.props.account.game.map.labelPosition}));
  }

  public render() {
    return (
      <div>
        <div>Position: {this.state.position}</div>
        <div>Status: {AccountStates[this.state.status]}</div>
        <img src="https://s.ankama.com/www/static.ankama.com/dofus/ng/img/logo_dofus.jpg" />
        <img src={this.state.skinUrl} />
        <img src={this.state.itemUrl} />
        <img src={this.state.spellUrl} />
        <img src={this.state.jobUrl} />
      </div>
    );
  }
}
