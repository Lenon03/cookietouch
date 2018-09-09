import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class ToggleRidingAction extends ScriptAction {
  public _name: string = "ToggleRidingAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.character.mount.hasMount) {
      account.game.character.mount.toggleRiding();
      await sleep(1000);
    }
    return ScriptAction.doneResult();
  }
}
