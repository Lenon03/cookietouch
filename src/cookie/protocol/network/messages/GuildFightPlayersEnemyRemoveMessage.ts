import Message from "@/protocol/network/messages/Message";

export default class GuildFightPlayersEnemyRemoveMessage extends Message {
  public fightId: number;
  public playerId: number;

  constructor(fightId = 0, playerId = 0) {
    super();
    this.fightId = fightId;
    this.playerId = playerId;

  }
}
