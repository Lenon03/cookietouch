import Message from "@/protocol/network/messages/Message";

export default class ChallengeFightJoinRefusedMessage extends Message {
  public playerId: number;
  public reason: number;

  constructor(playerId = 0, reason = 0) {
    super();
    this.playerId = playerId;
    this.reason = reason;

  }
}
