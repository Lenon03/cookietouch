import ClientUIOpenedMessage from "@/protocol/network/messages/ClientUIOpenedMessage";

export default class ClientUIOpenedByObjectMessage extends ClientUIOpenedMessage {
  public uid: number;

  constructor(type = 0, uid = 0) {
    super(type);
    this.uid = uid;

  }
}
