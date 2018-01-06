import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class UseByIdAction extends ScriptAction {
  public elementId: number;
  public skillInstanceUid: number;

  constructor(elementId: number, skillInstanceUid: number) {
    super();
    this.elementId = elementId;
    this.skillInstanceUid = skillInstanceUid;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.managers.interactives.useInteractive(this.elementId, this.skillInstanceUid)) {
        return ScriptAction.processingResult;
      }
      account.scripts.stopScript("reasonstopscript");
      return ScriptAction.failedResult;
    });
  }
}
