import Message from "./Message";
export default class GameFightTurnReadyMessage extends Message {
  public isReady: boolean;
  constructor(isReady = false) {
    super();
    this.isReady = isReady;

  }
}
