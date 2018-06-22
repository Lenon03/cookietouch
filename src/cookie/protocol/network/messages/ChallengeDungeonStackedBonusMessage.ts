import Message from "@/protocol/network/messages/Message";

export default class ChallengeDungeonStackedBonusMessage extends Message {
  public dungeonId: number;
  public xpBonus: number;
  public dropBonus: number;

  constructor(dungeonId = 0, xpBonus = 0, dropBonus = 0) {
    super();
    this.dungeonId = dungeonId;
    this.xpBonus = xpBonus;
    this.dropBonus = dropBonus;

  }
}
