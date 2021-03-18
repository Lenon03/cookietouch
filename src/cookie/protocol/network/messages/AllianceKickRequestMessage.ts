import Message from "@/protocol/network/messages/Message";

export default class AllianceKickRequestMessage extends Message {
  public kickedId: number;

  constructor(kickedId = 0) {
    super();
    this.kickedId = kickedId;

  }
}
