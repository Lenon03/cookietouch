import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StoragePutExistingItemsAction extends ScriptAction {
  public _name: string = "StoragePutExistingItemsAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.putExistingItems()) {
      await sleep(1000);
    }
    return ScriptAction.doneResult();
  }
}
