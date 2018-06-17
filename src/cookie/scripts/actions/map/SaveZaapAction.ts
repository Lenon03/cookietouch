import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class SaveZaapAction extends ScriptAction {
  public _name: string = "SaveZaapAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.managers.teleportables.saveZaap()) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(LanguageManager.trans("noZaap"));
    return ScriptAction.failedResult();
  }
}
