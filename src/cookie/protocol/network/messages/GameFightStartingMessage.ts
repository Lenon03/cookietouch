import Message from "./Message";

export default class GameFightStartingMessage extends Message {
  public fightType: number;

  constructor(fightType = 0) {
    super();
    this.fightType = fightType;

  }
}
