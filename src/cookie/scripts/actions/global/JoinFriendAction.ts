import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class JoinFriendAction extends ScriptAction {
  public _name: string = "JoinFriendAction";
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (account.isBusy) {
      return ScriptAction.failedResult();
    }
    account.network.sendMessageFree("FriendJoinRequestMessage", {
      name: this.name
    });
    return ScriptAction.doneResult();
  }
}
