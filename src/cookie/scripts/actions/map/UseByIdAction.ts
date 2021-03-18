import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class UseByIdAction extends ScriptAction {
  public _name: string = "UseByIdAction";
  public elementId: number;
  public skillInstanceUid: number;

  constructor(elementId: number, skillInstanceUid: number) {
    super();
    this.elementId = elementId;
    this.skillInstanceUid = skillInstanceUid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (
      account.game.managers.interactives.useInteractive(
        this.elementId,
        this.skillInstanceUid
      )
    ) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(
      LanguageManager.trans("errorInteractive", this.elementId)
    );
    return ScriptAction.failedResult();
  }
}
