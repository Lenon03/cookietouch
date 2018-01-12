import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class SendReadyAction extends ScriptAction {

  public async process(account: Account): Promise<ScriptActionResults> {
    account.game.exchange.sendReady();
    return ScriptAction.processingResult();
  }
}
