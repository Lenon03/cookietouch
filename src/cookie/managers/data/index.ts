import axios from "axios";
import { Account } from "../../game/Account";
import { DataTypes } from "./DataTypes";

export default class DataManager {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public get(type: DataTypes, ids?: number[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      axios.post(`${this.account.haapi.config.dataUrl}/data/map?lang=fr&v=${this.account.client.assetsVersion}`,
      { class: DataTypes[type], ids })
      .then((response) => resolve(response.data));
    });
  }
}
