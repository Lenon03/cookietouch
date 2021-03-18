import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StorageGetAllItemsAction extends ScriptAction {
  public _name: string = "StorageGetAllItemsAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.getAllItems()) {
      await sleep(1000);
    }
    return ScriptAction.doneResult();
  }
}
