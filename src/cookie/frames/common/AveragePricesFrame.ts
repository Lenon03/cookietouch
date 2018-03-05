import LanguageManager from "@/configurations/language/LanguageManager";
import ObjectAveragePricesMessage from "@/protocol/network/messages/ObjectAveragePricesMessage";
import Account from "@account";
import * as firebase from "firebase";

export default class AveragePricesFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("ObjectAveragePricesMessage", this.HandleObjectAveragePricesMessage, this);
  }

  private async HandleObjectAveragePricesMessage(account: Account, data: ObjectAveragePricesMessage) {
    // const server = -1; // TODO
    // const ref = firebase.database().ref(`/averagePrices/${server}`);
    // const prices = [];
    // for (let x = 0; x < data.ids.length; x++) {
    //   const id = data.ids[x];
    //   const price = data.avgPrices[x];
    //   prices.push({ id, price });
    // }
    // ref.push(prices);
    // this.account.logger.logDofus("AveragePricesFrame", LanguageManager.trans("queueMessage", data.position, data.total));
  }
}
