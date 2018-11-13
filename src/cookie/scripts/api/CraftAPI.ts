import Account from "@/account";
import SetRecipeAction from "../actions/craft/SetRecipeAction";

export default class CraftAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }
  public async setRecipe(uid: number): Promise<boolean> {
    await this.account.scripts.actionsManager.enqueueAction(
      new SetRecipeAction(uid),
      true
    );
    return true;
  }
}