import Message from "@/protocol/network/messages/Message";

export default class GameMapMovementMessage extends Message {
  public keyMovements: number[];
  public actorId: number;

  constructor(actorId = 0, keyMovements: number[]) {
    super();
    this.keyMovements = keyMovements;
    this.actorId = actorId;
  }
}
