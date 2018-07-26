import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import ExchangeErrorMessage from "@/protocol/network/messages/ExchangeErrorMessage";
import ExchangeLeaveMessage from "@/protocol/network/messages/ExchangeLeaveMessage";
import ExchangeStartedBidBuyerMessage from "@/protocol/network/messages/ExchangeStartedBidBuyerMessage";
import ExchangeStartedBidSellerMessage from "@/protocol/network/messages/ExchangeStartedBidSellerMessage";
import ExchangeTypesItemsExchangerDescriptionForUserMessage from "@/protocol/network/messages/ExchangeTypesItemsExchangerDescriptionForUserMessage";

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
    message: ExchangeStartedBidBuyerMessage
  ) {
    account.game.bid.UpdateExchangeStartedBidBuyerMessage(message);
  }

  private async HandleExchangeTypesItemsExchangerDescriptionForUserMessage(
    account: Account,
    message: ExchangeTypesItemsExchangerDescriptionForUserMessage
  ) {
    account.game.bid.UpdateExchangeTypesItemsExchangerDescriptionForUserMessage(
      message
    );
  }

  private async HandleExchangeStartedBidSellerMessage(
    account: Account,
    message: ExchangeStartedBidSellerMessage
  ) {
    account.game.bid.UpdateExchangeStartedBidSellerMessage(message);
  }

  private async HandleExchangeErrorMessage(
    account: Account,
    message: ExchangeErrorMessage
  ) {
    account.game.bid.UpdateExchangeErrorMessage(message);
  }

  private async HandleExchangeLeaveMessage(
    account: Account,
    message: ExchangeLeaveMessage
  ) {
    account.game.bid.UpdateExchangeLeaveMessage(message);
  }
}
