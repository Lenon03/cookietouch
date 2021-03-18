import Account from "@/account";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class LeaveDialogAction extends ScriptAction {
  public _name: string = "LeaveDialogAction";

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.isInDialog) {
      account.network.sendMessageFree("LeaveDialogRequestMessage");
      return ScriptAction.processingResult();
    }
    return ScriptAction.doneResult();
  }
}
