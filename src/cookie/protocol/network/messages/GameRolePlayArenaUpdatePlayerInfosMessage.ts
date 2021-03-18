import Message from "@/protocol/network/messages/Message";

export default class GameRolePlayArenaUpdatePlayerInfosMessage extends Message {
  public rank: number;
  public bestDailyRank: number;
  public bestRank: number;
  public victoryCount: number;
  public arenaFightcount: number;

  constructor(rank = 0, bestDailyRank = 0, bestRank = 0, victoryCount = 0, arenaFightcount = 0) {
    super();
    this.rank = rank;
    this.bestDailyRank = bestDailyRank;
    this.bestRank = bestRank;
    this.victoryCount = victoryCount;
    this.arenaFightcount = arenaFightcount;

  }
}
