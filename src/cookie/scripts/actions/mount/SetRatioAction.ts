import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class SetRatioAction extends ScriptAction {
  public ratio: number;

  constructor(ratio: number) {
    super();
    this.ratio = ratio;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.character.mount.hasMount) {
        account.game.character.mount.setRatio(this.ratio);
        await sleep(400);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
