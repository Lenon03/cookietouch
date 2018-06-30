import Account from "@/account";
import Frames, { IFrame } from "@/frames";

export default class BidFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ExchangeStartedBidBuyerMessage",
      this.HandleExchangeStartedBidBuyerMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeTypesItemsExchangerDescriptionForUserMessage",
      this.HandleExchangeTypesItemsExchangerDescriptionForUserMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeStartedBidSellerMessage",
      this.HandleExchangeStartedBidSellerMessage,
      this
    );
    Frames.dispatcher.register(
      "ExchangeErrorMessage",
      this.HandleExchangeErrorMessage,
      this
    );
    Frames.dispatcher.register(
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
