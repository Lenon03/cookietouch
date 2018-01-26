import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StorageGetAllItemsAction extends ScriptAction {
  public _name: string = "StorageGetAllItemsAction";
  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.getAllItems()) {
      await sleep(1000);
    }
    return ScriptActionResults.DONE;
  }
}
