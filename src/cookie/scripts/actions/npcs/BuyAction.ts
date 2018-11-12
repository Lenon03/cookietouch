import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

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
    const res = await account.game.npcs.buyItem(this.objectToBuyId, this.quantity);
    if (res) {
      await sleep(1500);
    }
    return ScriptAction.doneResult();

  }
}
