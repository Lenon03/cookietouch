import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class JoinFriendAction extends ScriptAction {
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (account.isBusy) {
        return ScriptAction.failedResult;
      }
      account.network.sendMessageFree("FriendJoinRequestMessage", { name: this.name });
      return ScriptAction.doneResult;
    });
  }
}
