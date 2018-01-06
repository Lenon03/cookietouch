import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class SendReadyAction extends ScriptAction {

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      account.game.exchange.sendReady();
      return ScriptAction.processingResult;
    });
  }
}
