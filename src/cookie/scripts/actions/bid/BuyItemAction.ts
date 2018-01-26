import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class BuyItemAction extends ScriptAction {
  public _name: string = "BuyItemAction";
  public gid: number;
  public lot: number;

  constructor(gid: number, lot: number) {
    super();
    this.gid = gid;
    this.lot = lot;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.bid.buyItem(this.gid, this.lot);
    if (res) {
      await sleep(1500);
    }
    return ScriptActionResults.DONE;
  }
}
