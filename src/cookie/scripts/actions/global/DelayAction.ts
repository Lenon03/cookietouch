import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class DelayAction extends ScriptAction {
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
