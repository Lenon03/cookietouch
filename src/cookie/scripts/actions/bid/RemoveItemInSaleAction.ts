import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class RemoveItemInSaleAction extends ScriptAction {
  public uid: number;

  constructor(uid: number) {
    super();
    this.uid = uid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.bid.removeItemInSale(this.uid);
    if (res) {
      await sleep(1500);
    }
    return ScriptActionResults.DONE;
  }
}
