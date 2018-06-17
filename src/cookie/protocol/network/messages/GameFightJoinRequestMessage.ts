import Message from "./Message";

export default class GameFightJoinRequestMessage extends Message {
  public fighterId: number;
  public fightId: number;

  constructor(fighterId = 0, fightId = 0) {
    super();
    this.fighterId = fighterId;
    this.fightId = fightId;

  }
}
