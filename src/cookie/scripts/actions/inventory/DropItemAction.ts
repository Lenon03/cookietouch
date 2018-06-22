import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class DropItemAction extends ScriptAction {
  public _name: string = "DropItemAction";
  public gid: number;
  public quantity: number;

  constructor(gid: number, quantity: number) {
    super();
    this.gid = gid;
    this.quantity = quantity;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const obj = account.game.character.inventory.getObjectByGid(this.gid);

    if (obj !== null) {
      account.game.character.inventory.dropObject(obj, this.quantity);
      await sleep(500);
    }
    return ScriptActionResults.DONE;
  }
}
