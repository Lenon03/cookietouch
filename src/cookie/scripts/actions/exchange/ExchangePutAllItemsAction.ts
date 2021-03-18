import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class ExchangePutAllItemsAction extends ScriptAction {
  public _name: string = "ExchangePutAllItemsAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.exchange.putAllItems();
    if (res) {
      await sleep(2000);
    }
    return ScriptAction.doneResult();
  }
}
