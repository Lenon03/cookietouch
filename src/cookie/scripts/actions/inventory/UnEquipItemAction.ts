import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class UnEquipItemAction extends ScriptAction {
  public _name: string = "UnEquipItemAction";
  public gid: number;

  constructor(gid: number) {
    super();
    this.gid = gid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const obj = account.game.character.inventory.getObjectByGid(this.gid);

    if (obj !== null && account.game.character.inventory.unEquipObject(obj)) {
      await sleep(500);
    }
    return ScriptAction.doneResult();
  }
}
