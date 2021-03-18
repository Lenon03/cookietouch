import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";


export default class BuyAction extends ScriptAction {
  public _name: string = "BuyAction";
  public objectToBuyId: number;
  public quantity: number;

  constructor(objectToBuyId: number, quantity: number) {
    super();
    this.objectToBuyId = objectToBuyId;
    this.quantity = quantity;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.npcs.buyItem(this.objectToBuyId, this.quantity)) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();

  }
}
