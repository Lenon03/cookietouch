import Message from "@/protocol/network/messages/Message";

export default class GuildCharacsUpgradeRequestMessage extends Message {
  public charaTypeTarget: number;

  constructor(charaTypeTarget = 0) {
    super();
    this.charaTypeTarget = charaTypeTarget;

  }
}
