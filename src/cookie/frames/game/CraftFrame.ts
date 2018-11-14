import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ExchangeObjectAddedMessage from "@/protocol/network/messages/ExchangeObjectAddedMessage";
export default class CraftFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ExchangeObjectAddedMessage",
      this.HandleExchangeObjectAddedMessage,
      this
    );

  }
  private async HandleExchangeObjectAddedMessage(
    account: Account,
    message: ExchangeObjectAddedMessage
  ) {
    account.game.craft.UpdateExchangeObjectAddedMessage(message);
  }
}
