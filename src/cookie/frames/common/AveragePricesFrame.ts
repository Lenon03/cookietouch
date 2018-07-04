import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ObjectAveragePricesMessage from "@/protocol/network/messages/ObjectAveragePricesMessage";

export default class AveragePricesFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ObjectAveragePricesMessage",
      this.HandleObjectAveragePricesMessage,
      this
    );
  }

  private async HandleObjectAveragePricesMessage(
    account: Account,
    data: ObjectAveragePricesMessage
  ) {
    /*
    const server = account.game.server.id;
    const ref = firebase.database().ref(`/averagePrices`);

    for (let x = 0; x < data.ids.length; x++) {
      const id = data.ids[x];
      const price = data.avgPrices[x];
      const entry = {
        price,
        server,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      ref.child(id.toString()).push(entry);
    }
    */
  }
}
