import Account from "@/account";
import NewCraftAction from "../actions/craft/NewCraftAction";

export default class CraftAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public async newCraft(guid: number, count: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new NewCraftAction(guid, count),
      true
    );
  }
}