import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class UseLockedHouseAction extends ScriptAction {
  public doorCellId: number;
  public lockCode: string;

  constructor(doorCellId: number, lockCode: string) {
    super();
    this.doorCellId = doorCellId;
    this.lockCode = lockCode;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.managers.interactives.useLockedDoor(this.doorCellId, this.lockCode)) {
        return ScriptAction.processingResult;
      }
      account.scripts.stopScript("reasonstopscript");
      return ScriptAction.failedResult;
    });
  }
}
