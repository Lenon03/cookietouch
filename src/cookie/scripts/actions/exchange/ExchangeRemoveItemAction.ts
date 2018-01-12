import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ExchangeRemoveItemAction extends ScriptAction {
  public gid: number;
  public quantity: number;

  constructor(gid: number, quantity: number) {
    super();
    this.gid = gid;
    this.quantity = quantity;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.exchange.removeItem(this.gid, this.quantity)) {
      await sleep(2000);
    }
    return ScriptActionResults.DONE;
  }
}
