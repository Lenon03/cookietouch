import Account from "@/account";
import MoneyGoultinesAmountSuccess from "@/protocol/network/messages/moneyGoultinesAmountSuccess";

export default class GoultinesFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
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
