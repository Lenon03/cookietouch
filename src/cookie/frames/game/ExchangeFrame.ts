import Account from "@/account";
import { sleep } from "@/utils/Time";

export default class ExchangeFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "ExchangeRequestedTradeMessage",
      this.HandleExchangeRequestedTradeMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeStartedWithPodsMessage",
      this.HandleExchangeStartedWithPodsMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeObjectAddedMessage",
      this.HandleExchangeObjectAddedMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeObjectModifiedMessage",
      this.HandleExchangeObjectModifiedMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeObjectRemovedMessage",
      this.HandleExchangeObjectRemovedMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeKamaModifiedMessage",
      this.HandleExchangeKamaModifiedMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeIsReadyMessage",
      this.HandleExchangeIsReadyMessage,
      this
    );
    this.account.dispatcher.register(
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
