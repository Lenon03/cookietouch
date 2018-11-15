import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class StartShopAction extends ScriptAction {
  public _name: string = "StartShopAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    account.game.exchange.startShop();
    return ScriptAction.processingResult();
  }
}
