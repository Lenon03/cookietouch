import Message from "@/protocol/network/messages/Message";

export default class GuildGetInformationsMessage extends Message {
  public infoType: number;

  constructor(infoType = 0) {
    super();
    this.infoType = infoType;

  }
}
