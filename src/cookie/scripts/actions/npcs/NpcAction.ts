import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class NpcAction extends ScriptAction {
  public npcId: number;
  public actionIndex: number;

  constructor(npcId: number, actionIndex: number) {
    super();
    this.npcId = npcId;
    this.actionIndex = actionIndex;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (!account.game.npcs.useNpc(this.npcId, this.actionIndex)) {
        account.scripts.stopScript("reasonstopscript");
        return ScriptAction.failedResult;
      }
      return ScriptAction.processingResult;
    });
  }
}
