import MoneyGoultinesAmountSuccess from "@/protocol/network/messages/moneyGoultinesAmountSuccess";
import LiteEvent from "@/utils/LiteEvent";

export default class AccountData {
  public accountCreation: number;
  public accountId: number;
  public communityId: number;
  public hasRights: boolean;
  public login: string;
  public secretQuestion: string;
  public subscriptionEndDate: Date;
  public wasAlreadyConnected: boolean;
  public nickname: string;
  public goultines: number;

  get isSubscriber(): boolean {
    return new Date() < this.subscriptionEndDate;
  }

  private readonly onGoultinesUpdated = new LiteEvent();

  public get GoultinesUpdated() {
    return this.onGoultinesUpdated.expose();
  }

  public async UpdateMoneyGoultinesAmountSuccess(
    message: MoneyGoultinesAmountSuccess
  ) {
    this.goultines = message.goultinesAmount;
    this.onGoultinesUpdated.trigger();
  }
}
