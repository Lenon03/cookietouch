import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";


export default class SetQuantityAction extends ScriptAction {
  public _name: string = "SetQuantityAction";

  public count: number;

  constructor(count: number) {
    super();
    this.count = count;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.craft.setQuantity(this.count)) {
      return ScriptAction.processingResult();
    }

    return ScriptAction.doneResult();

  }
}