import axios from "axios";
import Account from "../../../Account";
import { DataTypes } from "./DataTypes";

export default class DataManager {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public get(type: DataTypes, ids?: number[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const params = {
        lang: this.account.lang,
        v: this.account.network.assetsVersion,
      };
      axios.post(`${this.account.haapi.config.dataUrl}/data/map?lang=${params.lang}&v=${params.v}`,
        {
          class: DataTypes[type],
          ids,
        })
        .then((response) => resolve(response.data));
    });
  }
}
