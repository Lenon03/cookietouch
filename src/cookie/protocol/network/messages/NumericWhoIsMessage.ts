import Message from "./Message";

export default class NumericWhoIsMessage extends Message {
  public playerId: number;
  public accountId: number;

  constructor(playerId = 0, accountId = 0) {
    super();
    this.playerId = playerId;
    this.accountId = accountId;

  }
}
