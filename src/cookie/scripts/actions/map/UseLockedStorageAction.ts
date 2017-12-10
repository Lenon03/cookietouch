import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class UseLockedStorageAction extends ScriptAction {
  public elementCellId: number;
  public lockCode: string;

  constructor(elementCellId: number, lockCode: string) {
    super();
    this.elementCellId = elementCellId;
    this.lockCode = lockCode;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.managers.interactives.useLockedStorage(this.elementCellId, this.lockCode)) {
        return ScriptAction.processingResult;
      }
      account.scripts.stopScript("reasonstopscript");
      return ScriptAction.failedResult;
    });
  }
}
