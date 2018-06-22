import FriendInformations from "@/protocol/network/types/FriendInformations";
import Message from "@/protocol/network/messages/Message";

export default class FriendAddedMessage extends Message {
  public friendAdded: FriendInformations;

  constructor(friendAdded: FriendInformations) {
    super();
    this.friendAdded = friendAdded;

  }
}
