import MoneyGoultinesAmountSuccess from "@/protocol/network/messages/moneyGoultinesAmountSuccess";
import LiteEvent from "@/utils/LiteEvent";

export default class AccountData {
  public accountCreation: number | undefined;
  public accountId: number | undefined;
  public communityId: number | undefined;
  public hasRights: boolean | undefined;
  public login: string | undefined;
  public secretQuestion: string | undefined;
  public subscriptionEndDate: Date | undefined;
  public wasAlreadyConnected: boolean | undefined;
  public nickname: string | undefined;
  public goultines: number | undefined;
  public bakHardToSoftCurrentRate: number | undefined;
  public bakSoftToHardCurrentRate: number | undefined;

  get isSubscriber(): boolean {
    if (!this.subscriptionEndDate) {
      return false;
    }
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
