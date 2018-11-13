import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
import { sleep } from "@/utils/Time";

export default class StartCraftAction extends ScriptAction {
  public _name: string = "StartCraftAction";



  constructor() {
    super();

  }

  public async process(account: Account): Promise<ScriptActionResults> {

    return ScriptAction.doneResult();

  }
}