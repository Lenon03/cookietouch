import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class SetRatioAction extends ScriptAction {
  public _name: string = "SetRatioAction";
  public ratio: number;

  constructor(ratio: number) {
    super();
    this.ratio = ratio;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.character.mount.hasMount) {
      account.game.character.mount.setRatio(this.ratio);
      await sleep(400);
    }
    return ScriptActionResults.DONE;
  }
}
