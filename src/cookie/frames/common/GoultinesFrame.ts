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
    Frames.dispatcher.register(
      "bakHardToSoftCurrentRateSuccess",
      this.HandlebakHardToSoftCurrentRateSuccess,
      this
    );
    Frames.dispatcher.register(
      "bakSoftToHardCurrentRateSuccess",
      this.HandlebakSoftToHardCurrentRateSuccess,
      this
    );
  }

  private async HandlemoneyGoultinesAmountSuccess(
    account: Account,
    data: MoneyGoultinesAmountSuccess
  ) {
    account.data.UpdateMoneyGoultinesAmountSuccess(data);
  }

  private async HandlebakHardToSoftCurrentRateSuccess(
    account: Account,
    data: any
  ) {
    account.data.bakHardToSoftCurrentRate = data.rate;
  }

  private async HandlebakSoftToHardCurrentRateSuccess(
    account: Account,
    data: any
  ) {
    account.data.bakSoftToHardCurrentRate = data.rate;
  }
}
