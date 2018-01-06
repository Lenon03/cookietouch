import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class EquipItemAction extends ScriptAction {
  public gid: number;

  constructor(gid: number) {
    super();
    this.gid = gid;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      const obj = account.game.character.inventory.getObjectByGid(this.gid);

      if (obj !== null && account.game.character.inventory.equipObject(obj)) {
        await sleep(500);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
