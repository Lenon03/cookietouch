import Account from "@/account";
import Frames, { IFrame } from "@/frames";
import MoneyGoultinesAmountSuccess from "@/protocol/network/messages/moneyGoultinesAmountSuccess";

export default class GoultinesFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "moneyGoultinesAmountSuccess",
      this.HandlemoneyGoultinesAmountSuccess,
      this
    );
  }

  private async HandlemoneyGoultinesAmountSuccess(
    account: Account,
    data: MoneyGoultinesAmountSuccess
  ) {
    account.data.UpdateMoneyGoultinesAmountSuccess(data);
  }
}
