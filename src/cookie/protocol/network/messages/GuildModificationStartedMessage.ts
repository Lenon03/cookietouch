import Message from "@/protocol/network/messages/Message";

export default class GuildModificationStartedMessage extends Message {
  public canChangeName: boolean;
  public canChangeEmblem: boolean;

  constructor(canChangeName = false, canChangeEmblem = false) {
    super();
    this.canChangeName = canChangeName;
    this.canChangeEmblem = canChangeEmblem;

  }
}
