import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ExchangeObjectAddedMessage from "@/protocol/network/messages/ExchangeObjectAddedMessage";
import ExchangeStartOkCraftWithInformationMessage from "@/protocol/network/messages/ExchangeStartOkCraftWithInformationMessage";
import ExchangeReplayCountModifiedMessage from "@/protocol/network/messages/ExchangeReplayCountModifiedMessage";
import ExchangeLeaveMessage from "@/protocol/network/messages/ExchangeLeaveMessage";
import ExchangeIsReadyMessage from "@/protocol/network/messages/ExchangeIsReadyMessage"
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
    Frames.dispatcher.register(
      "ExchangeReplayCountModifiedMessage",
      this.HandleExchangeReplayCountModifiedMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeIsReadyMessage",
      this.HandleExchangeIsReadyMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeLeaveMessage",
      this.HandleExchangeLeaveMessage,
      this
    )
  }

  private async HandleExchangeStartOkCraftWithInformationMessage(
    account: Account,
    message: ExchangeStartOkCraftWithInformationMessage
  ) {
    account.game.craft.UpdateExchangeStartOkCraftWithInformationMessage(message);
  }
  private async HandleExchangeReplayCountModifiedMessage(
    account: Account,
    message: ExchangeReplayCountModifiedMessage
  ) {
    account.game.craft.UpdateExchangeReplayCountModifiedMessage(message);
  }
  private async HandleExchangeObjectAddedMessage(
    account: Account,
    message: ExchangeObjectAddedMessage
  ) {
    account.game.craft.UpdateExchangeObjectAddedMessage(message);
  }
  private async HandleExchangeLeaveMessage(
    account: Account,
    message: ExchangeLeaveMessage
  ) {
    account.game.craft.UpdateExchangeLeaveMessage(message);
  }
  private async HandleExchangeIsReadyMessage(
    account: Account,
    message: ExchangeIsReadyMessage
  ) {
    account.game.craft.UpdateExchangeIsReadyMessage(message);
  }

}
