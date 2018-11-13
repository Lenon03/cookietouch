import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class ReadyAction extends ScriptAction {
  public _name: string = "ReadyAction";



  constructor() {
    super();

  }

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.craft.ready();
    if (res) {
      await sleep(1500);
    }
    return ScriptAction.doneResult();

  }
}