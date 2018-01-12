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

  public async process(account: Account): Promise<ScriptActionResults> {
    if (!account.game.npcs.useNpc(this.npcId, 1)) {
      account.scripts.stopScript("Error during a conversation with a bank NPC");
      return ScriptAction.failedResult();
    }
    return ScriptAction.processingResult();
  }
}
