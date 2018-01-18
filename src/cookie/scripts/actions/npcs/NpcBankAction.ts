import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";
import LanguageManager from "@/configurations/language/LanguageManager";

export default class NpcBankAction extends ScriptAction {
  public npcId: number;
  public replyId: number;

  constructor(npcId: number, replyId: number) {
    super();
    this.npcId = npcId;
    this.replyId = replyId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (!account.game.npcs.useNpc(this.npcId, 1)) {
      account.scripts.stopScript(LanguageManager.trans("errorBankNpc"));
      return ScriptAction.failedResult();
    }
    return ScriptAction.processingResult();
  }
}
