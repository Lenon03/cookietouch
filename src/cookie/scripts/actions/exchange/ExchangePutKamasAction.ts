import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class ExchangePutKamasAction extends ScriptAction {
  public _name: string = "ExchangePutKamasAction";
  public quantity: number;

  constructor(quantity: number) {
    super();
    this.quantity = quantity;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.exchange.putKamas(this.quantity)) {
      await sleep(2000);
    }
    return ScriptAction.doneResult();
  }
}
