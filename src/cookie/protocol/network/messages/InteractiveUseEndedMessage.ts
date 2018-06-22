import Message from "@/protocol/network/messages/Message";

export default class InteractiveUseEndedMessage extends Message {
  public elemId: number;
  public skillId: number;

  constructor(elemId = 0, skillId = 0) {
    super();
    this.elemId = elemId;
    this.skillId = skillId;

  }
}
