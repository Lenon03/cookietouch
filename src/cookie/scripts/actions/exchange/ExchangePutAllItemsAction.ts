import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ExchangePutAllItemsAction extends ScriptAction {

  public async process(account: Account): Promise<ScriptActionResults> {
    const res = await account.game.exchange.putAllItems();
    if (res) {
      await sleep(2000);
    }
    return ScriptActionResults.DONE;
  }
}
