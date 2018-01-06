import Account from "@account";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class NpcBankAction extends ScriptAction {
  public npcId: number;
  public replyId: number;

  constructor(npcId: number, replyId: number) {
    super();
    this.npcId = npcId;
    this.replyId = replyId;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (!account.game.npcs.useNpc(this.npcId, 1)) {
        account.scripts.stopScript("reasonstopscript");
        return ScriptAction.failedResult;
      }
      return ScriptAction.processingResult;
    });
  }
}
