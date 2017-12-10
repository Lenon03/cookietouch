import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class DelayAction extends ScriptAction {
  public ms: number;

  constructor(ms: number) {
    super();
    this.ms = ms;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      await sleep(this.ms);
      return resolve(ScriptActionResults.DONE);
    });
  }
}
