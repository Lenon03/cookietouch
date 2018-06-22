import Message from "@/protocol/network/messages/Message";

export default class GameRolePlayArenaFighterStatusMessage extends Message {
  public fightId: number;
  public playerId: number;
  public accepted: boolean;

  constructor(fightId = 0, playerId = 0, accepted = false) {
    super();
    this.fightId = fightId;
    this.playerId = playerId;
    this.accepted = accepted;

  }
}
