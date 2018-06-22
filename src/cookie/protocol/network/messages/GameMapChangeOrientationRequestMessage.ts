import Message from "@/protocol/network/messages/Message";

export default class GameMapChangeOrientationRequestMessage extends Message {
  public direction: number;

  constructor(direction = 1) {
    super();
    this.direction = direction;

  }
}
