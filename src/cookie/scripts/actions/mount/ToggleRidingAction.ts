import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ToggleRidingAction extends ScriptAction {
  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.character.mount.hasMount) {
        account.game.character.mount.toggleRiding();
        await sleep(1000);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
