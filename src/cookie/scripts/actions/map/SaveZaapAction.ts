import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";
import LanguageManager from "@/configurations/language/LanguageManager";

export default class SaveZaapAction extends ScriptAction {
  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.managers.teleportables.saveZaap()) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(LanguageManager.trans("noZaap"));
    return ScriptAction.failedResult();
  }
}
