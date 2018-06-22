import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class StartBuyingAction extends ScriptAction {
  public _name: string = "StartBuyingAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.bid.startBuying()) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}
