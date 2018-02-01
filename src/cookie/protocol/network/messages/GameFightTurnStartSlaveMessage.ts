import GameFightTurnStartMessage from "./GameFightTurnStartMessage";

export default class GameFightTurnStartSlaveMessage extends GameFightTurnStartMessage {
  public idSummoner: number;

  constructor(id = 0, waitTime = 0, idSummoner = 0) {
    super(id, waitTime);
    this.idSummoner = idSummoner;

  }
}
