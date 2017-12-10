import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ExchangeRemoveKamasAction extends ScriptAction {
  public quantity: number;

  constructor(quantity: number) {
    super();
    this.quantity = quantity;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.exchange.removeKamas(this.quantity)) {
        await sleep(2000);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
