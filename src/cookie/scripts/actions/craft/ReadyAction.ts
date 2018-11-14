import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";


export default class ReadyAction extends ScriptAction {
  public _name: string = "ReadyAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    console.log("ReadyAction lancé");
    account.game.craft.ready();
    return ScriptAction.processingResult();

  }
}