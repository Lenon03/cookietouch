import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";


export default class SellAction extends ScriptAction {
  public _name: string = "SellAction";
  public objectToSellId: number;
  public quantity: number;

  constructor(objectToSellId: number, quantity: number) {
    super();
    this.objectToSellId = objectToSellId;
    this.quantity = quantity;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.npcs.sellItem(this.objectToSellId, this.quantity)) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}
