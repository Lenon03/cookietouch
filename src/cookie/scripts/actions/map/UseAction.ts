import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class UseAction extends ScriptAction {
  public elementCellId: number;
  public skillInstanceUid: number;

  constructor(elementCellId: number, skillInstanceUid: number) {
    super();
    this.elementCellId = elementCellId;
    this.skillInstanceUid = skillInstanceUid;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.managers.interactives.useInteractiveByCellId(this.elementCellId, this.skillInstanceUid)) {
        return ScriptAction.processingResult;
      }
      account.scripts.stopScript("reasonstopscript");
      return ScriptAction.failedResult;
    });
  }
}
