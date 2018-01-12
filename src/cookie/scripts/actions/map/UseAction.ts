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

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.managers.interactives.useInteractiveByCellId(this.elementCellId, this.skillInstanceUid)) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(`Error while using an interactive (cell: ${this.elementCellId})`);
    return ScriptAction.failedResult();
  }
}
