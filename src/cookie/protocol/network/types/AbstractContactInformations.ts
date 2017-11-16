export default class AbstractContactInformations {
  public accountId: number;
  public accountName: string;

  constructor(accountId = 0, accountName = "") {
    this.accountId = accountId;
    this.accountName = accountName;
  }
}
