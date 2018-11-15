import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class SetQuantityAction extends ScriptAction {
  public _name: string = "SetQuantityAction";

  public count: number;

  constructor(count: number) {
    super();
    this.count = count;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.craft.setQuantity(this.count);
    if (res) {
      await sleep(1500);
    }
    return ScriptAction.doneResult();

  }
}