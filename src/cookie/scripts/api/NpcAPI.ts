import Account from "@/account";
import NpcAction from "@/scripts/actions/npcs/NpcAction";
import NpcBankAction from "@/scripts/actions/npcs/NpcBankAction";
import ReplyAction from "@/scripts/actions/npcs/ReplyAction";
import BuyAction from "../actions/npcs/BuyAction";
import SellAction from "../actions/npcs/SellAction";
export default class NpcAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public async npcBank(npcId: number, replyId: number): Promise<boolean> {
    if (npcId > 0 && !this.account.game.map.npcs.find(n => n.npcId === npcId)) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new NpcBankAction(npcId, replyId),
      true
    );
    return true;
  }
  public async sell(uid: number, quantity: number): Promise<boolean> {
    await this.account.scripts.actionsManager.enqueueAction(
      new SellAction(uid, quantity),
      true
    );
    return true;
  }
  public async buy(guid: number, quantity: number): Promise<boolean> {
    await this.account.scripts.actionsManager.enqueueAction(
      new BuyAction(guid, quantity),
      true
    );
    return true;
  }
  public async npc(npcId: number, actionIndex: number): Promise<boolean> {
    if (npcId > 0 && !this.account.game.map.npcs.find(n => n.npcId === npcId)) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new NpcAction(npcId, actionIndex),
      true
    );
    return true;
  }

  public async reply(replyId: number) {
    await this.account.scripts.actionsManager.enqueueAction(
      new ReplyAction(replyId),
      true
    );
  }
}
