import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class StorageGetKamasAction extends ScriptAction {
  public _name: string = "StorageGetKamasAction";
  public amount: number;

  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.getKamas(this.amount)) {
      await sleep(1000);
    }
    return ScriptActionResults.DONE;
  }
}
