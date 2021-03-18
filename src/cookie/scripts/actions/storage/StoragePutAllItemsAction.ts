import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StoragePutAllItemsAction extends ScriptAction {
  public _name: string = "StoragePutAllItemsAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.putAllItems()) {
      await sleep(1000);
    }
    return ScriptAction.doneResult();
  }
}
