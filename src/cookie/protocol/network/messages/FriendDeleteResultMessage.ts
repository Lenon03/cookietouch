import Message from "@/protocol/network/messages/Message";

export default class FriendDeleteResultMessage extends Message {
  public success: boolean;
  public name: string;

  constructor(success = false, name = "") {
    super();
    this.success = success;
    this.name = name;

  }
}
