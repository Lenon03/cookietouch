import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class NpcAction extends ScriptAction {
  public _name: string = "NpcAction";
  public npcId: number;
  public actionIndex: number;

  constructor(npcId: number, actionIndex: number) {
    super();
    this.npcId = npcId;
    this.actionIndex = actionIndex;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    if (!account.game.npcs.useNpc(this.npcId, this.actionIndex)) {
      account.scripts.stopScript(
        LanguageManager.trans("errorNpc", this.npcId, this.actionIndex)
      );
      return ScriptAction.failedResult();
    }
    return ScriptAction.processingResult();
  }
}
