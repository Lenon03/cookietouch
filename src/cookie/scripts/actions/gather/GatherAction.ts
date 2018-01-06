import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class GatherAction extends ScriptAction {
  public elements: number[];

  constructor(elements: number[]) {
    super();
    this.elements = elements;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      // In case there is no elements to gather in this map, just pass
      if (!account.game.managers.gathers.canGather(...this.elements)) {
        return ScriptAction.doneResult;
      }
      if (account.game.managers.gathers.gather(...this.elements)) {
        return ScriptAction.processingResult;
      }
      account.scripts.stopScript("reasonstopscript");
      return ScriptAction.failedResult;
    });
  }
}
