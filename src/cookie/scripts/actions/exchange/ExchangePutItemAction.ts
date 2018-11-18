import Account from "@/account";
import ScriptAction, {
  ScriptActionResults
} from "@/scripts/actions/ScriptAction";

export default class ExchangePutItemAction extends ScriptAction {
  public _name: string = "ExchangePutItemAction";
  public gid: number;
  public quantity: number;

  constructor(gid: number, quantity: number) {
    super();
    this.gid = gid;
    this.quantity = quantity;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.exchange.putItem(this.gid, this.quantity)) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}
