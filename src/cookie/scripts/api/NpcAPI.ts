import Account from "@/account";
import NpcAction from "@/scripts/actions/npcs/NpcAction";
import NpcBankAction from "@/scripts/actions/npcs/NpcBankAction";
import ReplyAction from "@/scripts/actions/npcs/ReplyAction";

export default class NpcAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public npcBank(npcId: number, replyId: number): boolean {
    if (npcId > 0 && !this.account.game.map.npcs.find(n => n.npcId === npcId)) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(
      new NpcBankAction(npcId, replyId),
      true
    );
    return true;
  }

  public npc(npcId: number, actionIndex: number): boolean {
    if (npcId > 0 && !this.account.game.map.npcs.find(n => n.npcId === npcId)) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(
      new NpcAction(npcId, actionIndex),
      true
    );
    return true;
  }

  public reply(replyId: number) {
    this.account.scripts.actionsManager.enqueueAction(
      new ReplyAction(replyId),
      true
    );
  }
}
