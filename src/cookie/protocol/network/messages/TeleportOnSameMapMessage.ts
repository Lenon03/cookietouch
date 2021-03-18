import Message from "@/protocol/network/messages/Message";

export default class TeleportOnSameMapMessage extends Message {
  public targetId: number;
  public cellId: number;

  constructor(targetId = 0, cellId = 0) {
    super();
    this.targetId = targetId;
    this.cellId = cellId;

  }
}
