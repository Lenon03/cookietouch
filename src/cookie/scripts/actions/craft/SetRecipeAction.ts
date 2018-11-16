import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";
// import { sleep } from "@/utils/Time";

export default class SetRecipeAction extends ScriptAction {
  public _name: string = "SetRecipeAction";

  public gid: number;

  constructor(gid: number) {
    super();
    this.gid = gid;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.game.craft.setRecipe(this.gid)) {
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}