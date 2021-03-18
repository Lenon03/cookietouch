import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StoragePutKamasAction extends ScriptAction {
  public _name: string = "StoragePutKamasAction";
  public amount: number;

  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.storage.putKamas(this.amount)) {
      await sleep(1000);
    }
    return ScriptAction.doneResult();
  }
}
