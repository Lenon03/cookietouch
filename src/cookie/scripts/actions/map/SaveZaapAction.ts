import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class SaveZaapAction extends ScriptAction {
  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise((resolve, reject) => {
      if (account.game.managers.teleportables.saveZaap()) {
        return ScriptAction.processingResult;
      }
      account.scripts.stopScript("reasonstopscript");
      return ScriptAction.failedResult;
    });
  }
}
