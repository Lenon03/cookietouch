import Message from "./Message";

export default class GameFightTurnStartMessage extends Message {
  public id: number;
  public waitTime: number;

  constructor(id = 0, waitTime = 0) {
    super();
    this.id = id;
    this.waitTime = waitTime;
  }
}
