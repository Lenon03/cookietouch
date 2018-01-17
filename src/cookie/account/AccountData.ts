export default class AccountData {
  public accountCreation: number;
  public accountId: number;
  public communityId: number;
  public hasRights: boolean;
  public login: number;
  public secretQuestion: string;
  public subscriptionEndDate: Date;
  public wasAlreadyConnected: boolean;

  get isSubscriber(): boolean {
    return new Date() < this.subscriptionEndDate;
  }
}
