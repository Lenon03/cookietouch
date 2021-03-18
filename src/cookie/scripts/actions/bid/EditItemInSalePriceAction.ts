import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class EditItemInSalePriceAction extends ScriptAction {
  public _name: string = "EditItemInSalePriceAction";
  public uid: number;
  public newPrice: number;

  constructor(uid: number, newPrice: number) {
    super();
    this.uid = uid;
    this.newPrice = newPrice;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.bid.editItemInSalePrice(
      this.uid,
      this.newPrice
    );
    if (res) {
      await sleep(3000);
    }
    return ScriptAction.doneResult();
  }
}
