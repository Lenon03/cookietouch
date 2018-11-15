import Account from "@/account";
import SetRecipeAction from "../actions/craft/SetRecipeAction";
import ReadyAction from "../actions/craft/ReadyAction";
import SetQuantityAction from "../actions/craft/SetQuantityAction";
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
  public async setQuantity(count: number): Promise<boolean> {
    await this.account.scripts.actionsManager.enqueueAction(
      new SetQuantityAction(count),
      true
    );
    return true;
  }
  public async ready() {
    await this.account.scripts.actionsManager.enqueueAction(
      new ReadyAction(),
      true
    );

  }

}