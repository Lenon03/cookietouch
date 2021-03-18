import Message from "@/protocol/network/messages/Message";

export default class TeleportBuddiesMessage extends Message {
  public dungeonId: number;

  constructor(dungeonId = 0) {
    super();
    this.dungeonId = dungeonId;

  }
}
