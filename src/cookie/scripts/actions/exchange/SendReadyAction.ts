import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class SendReadyAction extends ScriptAction {
  public _name: string = "SendReadyAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    account.game.exchange.sendReady();
    return ScriptAction.processingResult();
  }
}
