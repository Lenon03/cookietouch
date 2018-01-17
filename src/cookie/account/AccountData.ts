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

  get isSubscriber(): boolean {
    return new Date() < this.subscriptionEndDate;
  }
}
