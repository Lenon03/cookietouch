import Message from "@/protocol/network/messages/Message";
import FriendInformations from "@/protocol/network/types/FriendInformations";

export default class FriendAddedMessage extends Message {
  public friendAdded: FriendInformations;

  constructor(friendAdded: FriendInformations) {
    super();
    this.friendAdded = friendAdded;

  }
}
