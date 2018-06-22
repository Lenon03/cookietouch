import Message from "@/protocol/network/messages/Message";

export default class TeleportBuddiesRequestedMessage extends Message {
  public invalidBuddiesIds: number[];
  public dungeonId: number;
  public inviterId: number;

  constructor(dungeonId = 0, inviterId = 0, invalidBuddiesIds: number[]) {
    super();
    this.invalidBuddiesIds = invalidBuddiesIds;
    this.dungeonId = dungeonId;
    this.inviterId = inviterId;

  }
}
