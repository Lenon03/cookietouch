import Message from "@/protocol/network/messages/Message";

export default class SpouseStatusMessage extends Message {
  public hasSpouse: boolean;

  constructor(hasSpouse = false) {
    super();
    this.hasSpouse = hasSpouse;

  }
}
