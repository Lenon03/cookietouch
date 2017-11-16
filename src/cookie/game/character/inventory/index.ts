import Account from "../../../Account";

export default class Inventory {
  private account: Account;

  // public get JobsUpdated() { return this.onJobsUpdated.expose(); }
  // private readonly onJobsUpdated = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
  }
}
