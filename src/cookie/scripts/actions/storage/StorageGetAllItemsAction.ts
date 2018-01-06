import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StorageGetAllItemsAction extends ScriptAction {
  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.storage.getAllItems()) {
        await sleep(1000);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
