import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StorageGetItemAction extends ScriptAction {
  public _name: string = "StorageGetItemAction";
  public gid: number;
  public quantity: number;

  constructor(gid: number, quantity: number) {
    super();
    this.gid = gid;
    this.quantity = quantity;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.getItem(this.gid, this.quantity)) {
      await sleep(1000);
    }
    return ScriptAction.doneResult();
  }
}
