import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StorageGetKamasAction extends ScriptAction {
  public amount: number;

  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.game.storage.getKamas(this.amount)) {
        await sleep(1000);
      }
      return resolve(ScriptActionResults.DONE);
    });
  }
}
