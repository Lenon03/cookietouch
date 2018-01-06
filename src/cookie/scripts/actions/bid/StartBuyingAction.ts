import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StartBuyingAction extends ScriptAction {

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.bid.startBuying()) {
        return ScriptAction.processingResult;
      }
      return ScriptAction.doneResult;
    });
  }
}
