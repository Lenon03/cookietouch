import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ExchangeIsReadyMessage from "@/protocol/network/messages/ExchangeIsReadyMessage";
import ExchangeKamaModifiedMessage from "@/protocol/network/messages/ExchangeKamaModifiedMessage";
import ExchangeLeaveMessage from "@/protocol/network/messages/ExchangeLeaveMessage";
import ExchangeObjectAddedMessage from "@/protocol/network/messages/ExchangeObjectAddedMessage";
import ExchangeObjectModifiedMessage from "@/protocol/network/messages/ExchangeObjectModifiedMessage";
import ExchangeObjectRemovedMessage from "@/protocol/network/messages/ExchangeObjectRemovedMessage";
import ExchangeRequestedTradeMessage from "@/protocol/network/messages/ExchangeRequestedTradeMessage";
import ExchangeStartedWithPodsMessage from "@/protocol/network/messages/ExchangeStartedWithPodsMessage";
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
    message: ExchangeRequestedTradeMessage
  ) {
    await sleep(200);
    account.game.exchange.UpdateExchangeRequestedTradeMessage(message);
  }

  private async HandleExchangeStartedWithPodsMessage(
    account: Account,
    message: ExchangeStartedWithPodsMessage
  ) {
    account.game.exchange.UpdateExchangeStartedWithPodsMessage(message);
  }

  private async HandleExchangeObjectAddedMessage(
    account: Account,
    message: ExchangeObjectAddedMessage
  ) {
    account.game.exchange.UpdateExchangeObjectAddedMessage(message);
  }

  private async HandleExchangeObjectModifiedMessage(
    account: Account,
    message: ExchangeObjectModifiedMessage
  ) {
    account.game.exchange.UpdateExchangeObjectModifiedMessage(message);
  }

  private async HandleExchangeObjectRemovedMessage(
    account: Account,
    message: ExchangeObjectRemovedMessage
  ) {
    account.game.exchange.UpdateExchangeObjectRemovedMessage(message);
  }

  private async HandleExchangeKamaModifiedMessage(
    account: Account,
    message: ExchangeKamaModifiedMessage
  ) {
    account.game.exchange.UpdateExchangeKamaModifiedMessage(message);
  }

  private async HandleExchangeIsReadyMessage(
    account: Account,
    message: ExchangeIsReadyMessage
  ) {
    account.game.exchange.UpdateExchangeIsReadyMessage(message);
  }

  private async HandleExchangeLeaveMessage(
    account: Account,
    message: ExchangeLeaveMessage
  ) {
    account.game.exchange.UpdateExchangeLeaveMessage(message);
  }
}
