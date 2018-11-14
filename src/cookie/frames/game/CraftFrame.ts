import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ExchangeObjectAddedMessage from "@/protocol/network/messages/ExchangeObjectAddedMessage";
import ExchangeStartOkCraftWithInformationMessage from "@/protocol/network/messages/ExchangeStartOkCraftWithInformationMessage";

export default class CraftFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ExchangeObjectAddedMessage",
      this.HandleExchangeObjectAddedMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeStartOkCraftWithInformationMessage",
      this.HandleExchangeStartOkCraftWithInformationMessage,
      this
    );


  }
  private async HandleExchangeStartOkCraftWithInformationMessage(
    account: Account,
    message: ExchangeStartOkCraftWithInformationMessage
  ) {
    account.game.craft.UpdateExchangeStartOkCraftWithInformationMessage(message);
  }
  private async HandleExchangeObjectAddedMessage(
    account: Account,
    message: ExchangeObjectAddedMessage
  ) {
    account.game.craft.UpdateExchangeObjectAddedMessage(message);
  }
}
