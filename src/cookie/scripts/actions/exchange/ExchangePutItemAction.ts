import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ExchangePutItemAction extends ScriptAction {
  public gid: number;
  public quantity: number;

  constructor(gid: number, quantity: number) {
    super();
    this.gid = gid;
    this.quantity = quantity;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.exchange.putItem(this.gid, this.quantity)) {
        await sleep(2000);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
