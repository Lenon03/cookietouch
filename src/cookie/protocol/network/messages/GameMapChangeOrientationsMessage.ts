import Message from "@/protocol/network/messages/Message";
import ActorOrientation from "@/protocol/network/types/ActorOrientation";

export default class GameMapChangeOrientationsMessage extends Message {
  public orientations: ActorOrientation[];

  constructor(orientations: ActorOrientation[]) {
    super();
    this.orientations = orientations;

  }
}
