import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

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
