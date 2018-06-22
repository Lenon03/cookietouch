import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class DelayAction extends ScriptAction {
  public _name: string = "DelayAction";
  public ms: number;

  constructor(ms: number) {
    super();
    this.ms = ms;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    await sleep(this.ms);
    return ScriptActionResults.DONE;
  }
}
