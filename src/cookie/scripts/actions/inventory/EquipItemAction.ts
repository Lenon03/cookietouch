import Account from "@account";
import {sleep} from "@utils/Time";
import ScriptAction, {ScriptActionResults} from "../ScriptAction";

export default class EquipItemAction extends ScriptAction {
  public _name: string = "EquipItemAction";
  public gid: number;

  constructor(gid: number) {
    super();
    this.gid = gid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const obj = account.game.character.inventory.getObjectByGid(this.gid);

    if (obj !== null && account.game.character.inventory.equipObject(obj)) {
      await sleep(500);
    }
    return ScriptActionResults.DONE;
  }
}
