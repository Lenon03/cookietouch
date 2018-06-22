import Message from "@/protocol/network/messages/Message";

export default class FriendJoinRequestMessage extends Message {
  public name: string;

  constructor(name = "") {
    super();
    this.name = name;

  }
}
