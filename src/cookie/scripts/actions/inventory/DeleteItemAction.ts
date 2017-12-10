import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class DeleteItemAction extends ScriptAction {
  public gid: number;
  public quantity: number;

  constructor(gid: number, quantity: number) {
    super();
    this.gid = gid;
    this.quantity = quantity;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      const obj = account.game.character.inventory.getObjectByGid(this.gid);

      if (obj !== null) {
        account.game.character.inventory.deleteObject(obj, this.quantity);
        await sleep(500);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
