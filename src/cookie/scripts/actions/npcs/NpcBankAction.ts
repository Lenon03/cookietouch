import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import ScriptAction, {ScriptActionResults} from "../ScriptAction";

export default class NpcBankAction extends ScriptAction {
  public _name: string = "NpcBankAction";
  public npcId: number;
  public replyId: number;

  constructor(npcId: number, replyId: number) {
    super();
    this.npcId = npcId;
    this.replyId = replyId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (!account.game.npcs.useNpc(this.npcId, 1)) {
      account.scripts.stopScript(LanguageManager.trans("errorBankNpc"));
      return ScriptAction.failedResult();
    }
    return ScriptAction.processingResult();
  }
}
