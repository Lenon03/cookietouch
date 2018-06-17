import Account from "@account";

export default class BidFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "ExchangeStartedBidBuyerMessage",
      this.HandleExchangeStartedBidBuyerMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeTypesItemsExchangerDescriptionForUserMessage",
      this.HandleExchangeTypesItemsExchangerDescriptionForUserMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeStartedBidSellerMessage",
      this.HandleExchangeStartedBidSellerMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeErrorMessage",
      this.HandleExchangeErrorMessage,
      this
    );
    this.account.dispatcher.register(
      "ExchangeLeaveMessage",
      this.HandleExchangeLeaveMessage,
      this
    );
  }

  private async HandleExchangeStartedBidBuyerMessage(
    account: Account,
    message: any
  ) {
    account.game.bid.UpdateExchangeStartedBidBuyerMessage(message);
  }

  private async HandleExchangeTypesItemsExchangerDescriptionForUserMessage(
    account: Account,
    message: any
  ) {
    account.game.bid.UpdateExchangeTypesItemsExchangerDescriptionForUserMessage(
      message
    );
  }

  private async HandleExchangeStartedBidSellerMessage(
    account: Account,
    message: any
  ) {
    account.game.bid.UpdateExchangeStartedBidSellerMessage(message);
  }

  private async HandleExchangeErrorMessage(account: Account, message: any) {
    account.game.bid.UpdateExchangeErrorMessage(message);
  }

  private async HandleExchangeLeaveMessage(account: Account, message: any) {
    account.game.bid.UpdateExchangeLeaveMessage(message);
  }
}
