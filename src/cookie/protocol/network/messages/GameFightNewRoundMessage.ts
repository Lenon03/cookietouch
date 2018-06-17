import Message from "./Message";

export default class GameFightNewRoundMessage extends Message {
  public roundNumber: number;

  constructor(roundNumber = 0) {
    super();
    this.roundNumber = roundNumber;

  }
}
