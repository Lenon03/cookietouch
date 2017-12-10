import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class SellItemAction extends ScriptAction {
  public gid: number;
  public lot: number;
  public price: number;

  constructor(gid: number, lot: number, price: number) {
    super();
    this.gid = gid;
    this.lot = lot;
    this.price = price;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      const res = await account.game.bid.sellItem(this.gid, this.lot, this.price);
      if (res) {
        await sleep(1500);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
