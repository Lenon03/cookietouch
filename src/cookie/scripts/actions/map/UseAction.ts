import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class UseAction extends ScriptAction {
  public _name: string = "UseAction";
  public elementCellId: number;
  public skillInstanceUid: number;

  constructor(elementCellId: number, skillInstanceUid: number) {
    super();
    this.elementCellId = elementCellId;
    this.skillInstanceUid = skillInstanceUid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (
      account.game.managers.interactives.useInteractiveByCellId(
        this.elementCellId,
        this.skillInstanceUid
      )
    ) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(
      LanguageManager.trans("errorInteractiveCell", this.elementCellId)
    );
    return ScriptAction.failedResult();
  }
}
