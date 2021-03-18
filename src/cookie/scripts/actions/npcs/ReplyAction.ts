import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class ReplyAction extends ScriptAction {
  public _name: string = "ReplyAction";
  public replyId: number;

  constructor(replyId: number) {
    super();
    this.replyId = replyId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (!account.game.npcs.reply(this.replyId)) {
      account.scripts.stopScript(
        LanguageManager.trans("errorReplyNpc", this.replyId)
      );
      return ScriptAction.failedResult();
    }
    return ScriptAction.processingResult();
  }
}
