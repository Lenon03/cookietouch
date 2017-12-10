import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ReplyAction extends ScriptAction {
  public replyId: number;

  constructor(replyId: number) {
    super();
    this.replyId = replyId;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (!account.game.npcs.reply(this.replyId)) {
        account.scripts.stopScript("reasonstopscript");
        return ScriptAction.failedResult;
      }
      return ScriptAction.processingResult;
    });
  }
}
