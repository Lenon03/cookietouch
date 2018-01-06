import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class BuyItemAction extends ScriptAction {
  public gid: number;
  public lot: number;

  constructor(gid: number, lot: number) {
    super();
    this.gid = gid;
    this.lot = lot;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      const res = await account.game.bid.buyItem(this.gid, this.lot);
      if (res) {
        await sleep(1500);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
