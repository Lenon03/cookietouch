import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StartSellingAction extends ScriptAction {

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.bid.startSelling()) {
        return ScriptAction.processingResult;
      }
      return ScriptAction.doneResult;
    });
  }
}
