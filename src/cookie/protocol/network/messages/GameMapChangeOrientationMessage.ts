import ActorOrientation from "@/protocol/network/types/ActorOrientation";
import Message from "@/protocol/network/messages/Message";

export default class GameMapChangeOrientationMessage extends Message {
  public orientation: ActorOrientation;

  constructor(orientation: ActorOrientation) {
    super();
    this.orientation = orientation;

  }
}
