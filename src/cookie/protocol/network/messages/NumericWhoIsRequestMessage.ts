import Message from "@/protocol/network/messages/Message";

export default class NumericWhoIsRequestMessage extends Message {
  public playerId: number;

  constructor(playerId = 0) {
    super();
    this.playerId = playerId;

  }
}
