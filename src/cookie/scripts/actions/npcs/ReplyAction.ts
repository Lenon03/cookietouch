import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";
import LanguageManager from "@/configurations/language/LanguageManager";

export default class ReplyAction extends ScriptAction {
  public replyId: number;

  constructor(replyId: number) {
    super();
    this.replyId = replyId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (!account.game.npcs.reply(this.replyId)) {
      account.scripts.stopScript(LanguageManager.trans("errorReplyNpc", this.replyId));
      return ScriptAction.failedResult();
    }
    return ScriptAction.processingResult();
  }
}
