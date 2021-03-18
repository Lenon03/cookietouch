import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class ReadyAction extends ScriptAction {
  public _name: string = "NewCraftAction";
  public count: number;
  public guid: number;

  constructor(guid: number, count: number) {
    super();
    this.count = count;
    this.guid = guid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.craft.newCraft(this.guid, this.count)) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}