import Message from "@/protocol/network/messages/Message";
import FriendInformations from "@/protocol/network/types/FriendInformations";

export default class FriendUpdateMessage extends Message {
  public friendUpdated: FriendInformations;

  constructor(friendUpdated: FriendInformations) {
    super();
    this.friendUpdated = friendUpdated;

  }
}
