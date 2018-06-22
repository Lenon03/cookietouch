import Message from "@/protocol/network/messages/Message";

export default class TitleSelectRequestMessage extends Message {
  public titleId: number;

  constructor(titleId = 0) {
    super();
    this.titleId = titleId;

  }
}
