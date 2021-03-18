import Message from "@/protocol/network/messages/Message";

export default class TeleportToBuddyCloseMessage extends Message {
  public dungeonId: number;
  public buddyId: number;

  constructor(dungeonId = 0, buddyId = 0) {
    super();
    this.dungeonId = dungeonId;
    this.buddyId = buddyId;

  }
}
