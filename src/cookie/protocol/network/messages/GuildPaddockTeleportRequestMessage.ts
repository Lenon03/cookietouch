import Message from "@/protocol/network/messages/Message";

export default class GuildPaddockTeleportRequestMessage extends Message {
  public paddockId: number;

  constructor(paddockId = 0) {
    super();
    this.paddockId = paddockId;

  }
}
