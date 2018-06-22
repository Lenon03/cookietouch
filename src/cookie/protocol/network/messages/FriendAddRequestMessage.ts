import Message from "@/protocol/network/messages/Message";

export default class FriendAddRequestMessage extends Message {
  public name: string;

  constructor(name = "") {
    super();
    this.name = name;

  }
}
