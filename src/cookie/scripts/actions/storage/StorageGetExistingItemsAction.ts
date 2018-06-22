import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StorageGetExistingItemsAction extends ScriptAction {
  public _name: string = "StorageGetExistingItemsAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.getExistingItems()) {
      await sleep(1000);
    }
    return ScriptActionResults.DONE;
  }
}
