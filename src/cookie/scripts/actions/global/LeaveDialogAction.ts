import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class LeaveDialogAction extends ScriptAction {
  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.isInDialog) {
        account.network.sendMessage("LeaveDialogRequestMessage");
        return ScriptAction.processingResult;
      }
      return ScriptAction.doneResult;
    });
  }
}
