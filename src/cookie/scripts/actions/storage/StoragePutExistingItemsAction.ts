import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StoragePutExistingItemsAction extends ScriptAction {
  public _name: string = "StoragePutExistingItemsAction";
  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.putExistingItems()) {
      await sleep(1000);
    }
    return ScriptActionResults.DONE;
  }
}
