import Message from "@/protocol/network/messages/Message";

export default class CharacterSelectedForceMessage extends Message {
  public id: number;

  constructor(id = 0) {
    super();
    this.id = id;

  }
}
