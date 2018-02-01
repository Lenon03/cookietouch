import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import ScriptAction, {ScriptActionResults} from "../ScriptAction";

export default class GatherAction extends ScriptAction {
  public _name: string = "GatherAction";
  public elements: number[];

  constructor(elements: number[]) {
    super();
    this.elements = elements;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    // In case there is no elements to gather in this map, just pass
    if (!account.game.managers.gathers.canGather(...this.elements)) {
      return ScriptAction.doneResult();
    }
    if (account.game.managers.gathers.gather(...this.elements)) {
      return ScriptAction.processingResult();
    }
    account.scripts.stopScript(LanguageManager.trans("gatherError"));
    return ScriptAction.failedResult();
  }
}
