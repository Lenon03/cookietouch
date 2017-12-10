import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ExchangePutAllItemsAction extends ScriptAction {

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      const res = await account.game.exchange.putAllItems();
      if (res) {
        await sleep(2000);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
