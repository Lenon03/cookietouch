import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class AddItemShopAction extends ScriptAction {
  public _name: string = "AddItemShopAction";
  public gid: number;
  public quantity: number;
  public price: number;

  constructor(gid: number, quantity: number, price: number) {
    super();
    this.gid = gid;
    this.quantity = quantity;
    this.price = price;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.exchange.addShopItem(this.gid, this.quantity, this.price)) {
      await sleep(2000);
    }
    return ScriptAction.doneResult();
  }
}
