import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class RemoveItemInSaleAction extends ScriptAction {
  public _name: string = "RemoveItemInSaleAction";
  public uid: number;

  constructor(uid: number) {
    super();
    this.uid = uid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = account.game.bid.removeItemInSale(this.uid);
    if (res) {
      await sleep(1500);
    }
    return ScriptActionResults.DONE;
  }
}
