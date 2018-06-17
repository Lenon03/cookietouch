import Type from "./Type";

export default class AbstractContactInformations extends Type {
  public accountId: number;
  public accountName: string;

  constructor(accountId = 0, accountName = "") {
    super();
    this.accountId = accountId;
    this.accountName = accountName;
  }
}
