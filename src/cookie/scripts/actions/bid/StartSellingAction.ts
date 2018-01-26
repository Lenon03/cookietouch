import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StartSellingAction extends ScriptAction {
  public _name: string = "StartSellingAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.bid.startSelling()) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}
