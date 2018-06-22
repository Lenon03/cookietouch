import Message from "@/protocol/network/messages/Message";

export default class GameFightReadyMessage extends Message {
  public isReady: boolean;

  constructor(isReady = false) {
    super();
    this.isReady = isReady;

  }
}
