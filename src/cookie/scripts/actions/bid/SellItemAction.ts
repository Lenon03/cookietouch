import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class SellItemAction extends ScriptAction {
  public _name: string = "SellItemAction";
  public gid: number;
  public lot: number;
  public price: number;

  constructor(gid: number, lot: number, price: number) {
    super();
    this.gid = gid;
    this.lot = lot;
    this.price = price;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.bid.sellItem(this.gid, this.lot, this.price);
    if (res) {
      await sleep(1500);
    }
    return ScriptActionResults.DONE;
  }
}
