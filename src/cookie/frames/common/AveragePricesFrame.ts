import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ObjectAveragePricesMessage from "@/protocol/network/messages/ObjectAveragePricesMessage";
import axios from "axios";

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
    const server = account.game.server.id;
    const prices = [];
    for (let x = 0; x < data.ids.length; x++) {
      const item = data.ids[x];
      const price = data.avgPrices[x];
      prices.push({ item, price });
    }
    axios.post("http://217.69.15.30:4000/prices", {
      prices,
      server,
      timestamp: Date.now()
    });
  }
}
