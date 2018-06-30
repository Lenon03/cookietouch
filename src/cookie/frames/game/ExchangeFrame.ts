import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import { sleep } from "@/utils/Time";

export default class ExchangeFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ExchangeRequestedTradeMessage",
      this.HandleExchangeRequestedTradeMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeStartedWithPodsMessage",
      this.HandleExchangeStartedWithPodsMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeObjectAddedMessage",
      this.HandleExchangeObjectAddedMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeObjectModifiedMessage",
      this.HandleExchangeObjectModifiedMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeObjectRemovedMessage",
      this.HandleExchangeObjectRemovedMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeKamaModifiedMessage",
      this.HandleExchangeKamaModifiedMessage,
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
    );
  }

  private async HandleExchangeRequestedTradeMessage(
    account: Account,
    message: any
  ) {
    await sleep(200);
    account.game.exchange.UpdateExchangeRequestedTradeMessage(message);
  }

  private async HandleExchangeStartedWithPodsMessage(
    account: Account,
    message: any
  ) {
    account.game.exchange.UpdateExchangeStartedWithPodsMessage(message);
  }

  private async HandleExchangeObjectAddedMessage(
    account: Account,
    message: any
  ) {
    account.game.exchange.UpdateExchangeObjectAddedMessage(message);
  }

  private async HandleExchangeObjectModifiedMessage(
    account: Account,
    message: any
  ) {
    account.game.exchange.UpdateExchangeObjectModifiedMessage(message);
  }

  private async HandleExchangeObjectRemovedMessage(
    account: Account,
    message: any
  ) {
    account.game.exchange.UpdateExchangeObjectRemovedMessage(message);
  }

  private async HandleExchangeKamaModifiedMessage(
    account: Account,
    message: any
  ) {
    account.game.exchange.UpdateExchangeKamaModifiedMessage(message);
  }

  private async HandleExchangeIsReadyMessage(account: Account, message: any) {
    account.game.exchange.UpdateExchangeIsReadyMessage(message);
  }

  private async HandleExchangeLeaveMessage(account: Account, message: any) {
    account.game.exchange.UpdateExchangeLeaveMessage(message);
  }
}
