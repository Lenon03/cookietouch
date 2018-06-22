import ActorOrientation from "@/protocol/network/types/ActorOrientation";
import Message from "@/protocol/network/messages/Message";

export default class GameMapChangeOrientationsMessage extends Message {
  public orientations: ActorOrientation[];

  constructor(orientations: ActorOrientation[]) {
    super();
    this.orientations = orientations;

  }
}
