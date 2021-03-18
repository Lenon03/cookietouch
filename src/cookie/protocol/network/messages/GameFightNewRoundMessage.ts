import Message from "@/protocol/network/messages/Message";

export default class GameFightNewRoundMessage extends Message {
  public roundNumber: number;

  constructor(roundNumber = 0) {
    super();
    this.roundNumber = roundNumber;

  }
}
