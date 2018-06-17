import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class UseLockedHouseAction extends ScriptAction {
  public _name: string = "UseLockedHouseAction";
  public doorCellId: number;
  public lockCode: string;

  constructor(doorCellId: number, lockCode: string) {
    super();
    this.doorCellId = doorCellId;
    this.lockCode = lockCode;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (
      account.game.managers.interactives.useLockedDoor(
        this.doorCellId,
        this.lockCode
      )
    ) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(LanguageManager.trans("errorLockedDoor"));
    return ScriptAction.failedResult();
  }
}
